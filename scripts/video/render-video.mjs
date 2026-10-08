#!/usr/bin/env node
// Renders the "Alle 300 Fragen" YouTube videos.
//
// Frames are laid out by headless Chrome from template.html (same tokens as the
// website), then ffmpeg adds the motion: fade-in, countdown bar, answer reveal.
// Questions and answers come from questions.de.json, which follows the official
// BAMF catalogue (see CATALOG_STAND).
//
//   node scripts/video/render-video.mjs                 all parts + full video
//   node scripts/video/render-video.mjs --preview 5,21  only PNG frames for these questions
//   node scripts/video/render-video.mjs --from 1 --to 10 --parts 1 --no-full
//   node scripts/video/render-video.mjs --states        one video per Bundesland (10 questions each)
//   node scripts/video/render-video.mjs --states bayern,berlin [--preview 1,8]
import fs from 'node:fs/promises';
import { createWriteStream, existsSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const OUT = path.join(ROOT, 'video-output');
const WORK = path.join(OUT, '.work');
const FRAMES = path.join(WORK, 'frames');
const SEGMENTS = path.join(WORK, 'segments');

const CATALOG_STAND = '07.05.2025';
const SITE = 'lid-einbuergerung.de';
const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;
// Geometry of the countdown track in template.html (.timer-track).
const TRACK = { x: 96, y: 986, width: 1728, height: 12 };
// Seconds.
const FADE_IN = 0.35;
const FADE_REVEAL = 0.35;
const FADE_OUT = 0.3;
const ANSWER_HOLD = 4.2;
const CARD_HOLD = 9;
const SAMPLE_RATE = 48000;

const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

function parseArgs(argv) {
  const args = { from: 1, to: 300, parts: 6, jobs: Math.max(2, Math.min(6, os.cpus().length - 2)), full: true, sound: true, preview: null, states: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--states') args.states = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i].split(',') : true;
    else if (a === '--from') args.from = Number(argv[++i]);
    else if (a === '--to') args.to = Number(argv[++i]);
    else if (a === '--parts') args.parts = Number(argv[++i]);
    else if (a === '--jobs') args.jobs = Number(argv[++i]);
    else if (a === '--no-full') args.full = false;
    else if (a === '--no-sound') args.sound = false;
    else if (a === '--preview') args.preview = argv[++i].split(',').map(Number);
    else throw new Error(`Unknown argument: ${a}`);
  }
  return args;
}

// ---------- timing ----------

const countWords = text => text.split(/[\s/]+/).filter(Boolean).length;

// Reading time grows with the amount of text; learners read German slowly, and
// anyone who needs longer can pause.
function questionTiming(q) {
  const words = countWords(q.question) + q.options.reduce((n, o) => n + countWords(o), 0);
  const think = Math.min(22, Math.max(8, 3.5 + 0.38 * words)) + (q.image ? 2 : 0);
  const thinkFrames = Math.round(think * FPS);
  return { thinkFrames, totalFrames: thinkFrames + Math.round(ANSWER_HOLD * FPS) };
}

const pad3 = n => String(n).padStart(3, '0');
const clock = seconds => {
  const s = Math.floor(seconds);
  const h = Math.floor(s / 3600);
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

// ---------- headless Chrome over the DevTools protocol ----------

async function launchChrome() {
  const profile = path.join(WORK, 'chrome-profile');
  await fs.rm(profile, { recursive: true, force: true });
  const proc = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--no-first-run', '--hide-scrollbars',
    '--force-device-scale-factor=1', '--allow-file-access-from-files', `--window-size=${WIDTH},${HEIGHT}`, 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
  const wsUrl = await new Promise((resolve, reject) => {
    let buffer = '';
    const timer = setTimeout(() => reject(new Error('Chrome did not start in time.')), 30000);
    proc.stderr.on('data', chunk => {
      buffer += chunk;
      const match = buffer.match(/DevTools listening on (ws:\/\/\S+)/);
      if (match) { clearTimeout(timer); resolve(match[1]); }
    });
    proc.on('error', reject);
    proc.on('exit', code => reject(new Error(`Chrome exited early (${code}). Set CHROME_PATH if it is installed elsewhere.`)));
  });

  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => { ws.addEventListener('open', resolve); ws.addEventListener('error', reject); });
  let nextId = 0;
  const pending = new Map();
  ws.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(message.error.message));
    else waiter.resolve(message.result);
  });
  let sessionId;
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });

  const { targetId } = await send('Target.createTarget', { url: pathToFileURL(path.join(HERE, 'template.html')).href });
  ({ sessionId } = await send('Target.attachToTarget', { targetId, flatten: true }));
  await send('Emulation.setDeviceMetricsOverride', { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: false });
  for (let attempt = 0; ; attempt++) {
    const { result } = await send('Runtime.evaluate', { expression: 'window.__ready === true' });
    if (result.value) break;
    if (attempt > 100) throw new Error('template.html did not load.');
    await new Promise(r => setTimeout(r, 100));
  }

  const assetBase = pathToFileURL(path.join(ROOT, 'public')).href + '/';
  let transparent = false;
  async function shot(spec, file, { clip, alpha = false } = {}) {
    if (alpha !== transparent) {
      await send('Emulation.setDefaultBackgroundColorOverride', alpha ? { color: { r: 0, g: 0, b: 0, a: 0 } } : {});
      transparent = alpha;
    }
    const evaluated = await send('Runtime.evaluate', {
      expression: `window.renderScene(${JSON.stringify({ ...spec, assetBase })})`, awaitPromise: true, returnByValue: true,
    });
    if (evaluated.exceptionDetails) throw new Error(`Frame ${file}: ${evaluated.exceptionDetails.exception?.description || evaluated.exceptionDetails.text}`);
    const { data } = await send('Page.captureScreenshot', {
      format: 'png', clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT, scale: 1, ...clip },
    });
    await fs.writeFile(file, Buffer.from(data, 'base64'));
    return evaluated.result.value || {};
  }
  return { shot, close: () => { ws.close(); proc.kill(); } };
}

// ---------- ffmpeg ----------

function run(command, args, timeoutMs = 0) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let stderr = '';
    const timer = timeoutMs ? setTimeout(() => { stderr += '\nTimed out.'; proc.kill('SIGKILL'); }, timeoutMs) : null;
    proc.stderr.on('data', chunk => { stderr += chunk; });
    proc.on('error', reject);
    proc.on('exit', code => {
      clearTimeout(timer);
      if (code === 0) resolve();
      else reject(new Error(`${command} failed (${code}):\n${stderr.slice(-2000)}`));
    });
  });
}

async function pool(items, limit, worker) {
  let index = 0;
  let done = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const item = items[index++];
      await worker(item);
      done++;
      if (done % 10 === 0 || done === items.length) process.stdout.write(`\r  ${done}/${items.length}`);
    }
  }));
  if (items.length) process.stdout.write('\n');
}

// Each PNG is decoded once and held by the filter graph. Looping the inputs
// with `-loop 1` made ffmpeg 8 deadlock on roughly one clip in eight.
const still = file => ['-framerate', String(FPS), '-i', file];
const hold = seconds => `tpad=stop_mode=clone:stop_duration=${seconds.toFixed(3)}`;

// A stuck encoder would stall the whole render, so give each clip a deadline.
async function encode(args) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await run(FFMPEG, ['-v', 'error', '-y', ...args], 180000);
    } catch (error) {
      if (attempt === 3) throw error;
    }
  }
}
const ENCODE = [
  '-r', String(FPS), '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-g', String(FPS * 2), '-bf', '0',
  '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv', '-an', '-movflags', '+faststart',
];
const TO_YUV = 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p';

// blank -> question (countdown bar runs) -> answer -> blank
async function encodeQuestion(q, file) {
  const { thinkFrames, totalFrames } = questionTiming(q);
  const think = thinkFrames / FPS;
  const total = totalFrames / FPS;
  const frame = state => path.join(FRAMES, `${q.key}-${state}.png`);
  const progress = `clip((t-${FADE_IN})/${(think - FADE_IN).toFixed(3)},0,1)`;
  const graph = [
    `[0:v]format=gbrp,${hold(total)},split=2[b0][b1]`,
    `[1:v]format=gbrp,${hold(total)}[q0]`,
    // bar.png and mask.png stay single frames; overlay repeats them.
    `[q0][3:v]overlay=x='${TRACK.x}-${TRACK.width}*${progress}':y=${TRACK.y}:format=gbrp[q1]`,
    '[q1][4:v]overlay=0:0:format=gbrp[q2]',
    `[2:v]format=gbrp,${hold(total)}[a0]`,
    `[b0][q2]xfade=transition=fade:duration=${FADE_IN}:offset=0[s1]`,
    `[s1][a0]xfade=transition=fade:duration=${FADE_REVEAL}:offset=${think.toFixed(3)}[s2]`,
    `[s2][b1]xfade=transition=fade:duration=${FADE_OUT}:offset=${(total - FADE_OUT).toFixed(3)},${TO_YUV}[v]`,
  ].join(';');
  await encode([
    ...still(frame('blank')), ...still(frame('q')), ...still(frame('a')),
    ...still(path.join(FRAMES, 'bar.png')), ...still(path.join(FRAMES, 'mask.png')),
    '-filter_complex', graph, '-map', '[v]', '-t', total.toFixed(3), ...ENCODE, file,
  ]);
}

// Intro holds the card and dissolves into the first question's empty frame;
// the outro does the reverse.
async function encodeCard(cardFrame, blankFrame, file, { cardFirst }) {
  const fade = 0.5;
  const [first, second] = cardFirst ? [cardFrame, blankFrame] : [blankFrame, cardFrame];
  const offset = cardFirst ? CARD_HOLD - fade : 0;
  await encode([
    ...still(first), ...still(second),
    '-filter_complex', `[0:v]format=gbrp,${hold(CARD_HOLD)}[x];[1:v]format=gbrp,${hold(CARD_HOLD)}[y];[x][y]xfade=transition=fade:duration=${fade}:offset=${offset},${TO_YUV}[v]`,
    '-map', '[v]', '-t', String(CARD_HOLD), ...ENCODE, file,
  ]);
}

// ---------- sound ----------

// A short two-note chime marks the reveal, so the video also works when the
// viewer is looking away for a moment.
function buildChime() {
  const samples = new Float32Array(Math.round(1.5 * SAMPLE_RATE));
  for (const note of [{ freq: 659.25, at: 0, gain: 0.5 }, { freq: 987.77, at: 0.11, gain: 0.42 }]) {
    const start = Math.round(note.at * SAMPLE_RATE);
    for (let i = start; i < samples.length; i++) {
      const t = (i - start) / SAMPLE_RATE;
      const envelope = Math.min(1, t / 0.006) * Math.exp(-t / 0.3);
      const tone = Math.sin(2 * Math.PI * note.freq * t) + 0.18 * Math.sin(4 * Math.PI * note.freq * t) * Math.exp(-t / 0.1);
      samples[i] += note.gain * envelope * tone;
    }
  }
  const tail = Math.round(0.05 * SAMPLE_RATE);
  for (let i = 0; i < tail; i++) samples[samples.length - 1 - i] *= i / tail;
  return samples.map(v => v * 0.3);
}

async function writeSoundtrack(timeline, file, withSound) {
  const chime = buildChime();
  const samplesPerFrame = SAMPLE_RATE / FPS;
  const totalSamples = timeline.reduce((n, item) => n + item.frames * samplesPerFrame, 0);
  const header = Buffer.alloc(44);
  header.write('RIFF', 0); header.writeUInt32LE(36 + totalSamples * 2, 4); header.write('WAVEfmt ', 8);
  header.writeUInt32LE(16, 16); header.writeUInt16LE(1, 20); header.writeUInt16LE(1, 22);
  header.writeUInt32LE(SAMPLE_RATE, 24); header.writeUInt32LE(SAMPLE_RATE * 2, 28); header.writeUInt16LE(2, 32); header.writeUInt16LE(16, 34);
  header.write('data', 36); header.writeUInt32LE(totalSamples * 2, 40);
  const stream = createWriteStream(file);
  stream.write(header);
  for (const item of timeline) {
    const length = item.frames * samplesPerFrame;
    const pcm = Buffer.alloc(length * 2);
    if (withSound && item.chimeFrame != null) {
      const start = item.chimeFrame * samplesPerFrame;
      for (let i = 0; i < chime.length && start + i < length; i++) pcm.writeInt16LE(Math.round(chime[i] * 32767), (start + i) * 2);
    }
    stream.write(pcm);
  }
  await new Promise((resolve, reject) => { stream.on('error', reject); stream.end(resolve); });
}

async function assemble(name, timeline, withSound) {
  const list = path.join(WORK, `${name}.txt`);
  const wav = path.join(WORK, `${name}.wav`);
  await fs.writeFile(list, timeline.map(item => `file '${item.file}'\nduration ${(item.frames / FPS).toFixed(6)}\n`).join(''));
  await writeSoundtrack(timeline, wav, withSound);
  const output = path.join(OUT, `${name}.mp4`);
  await run(FFMPEG, [
    '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-i', wav,
    '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '128k', '-ar', String(SAMPLE_RATE), '-ac', '2',
    '-shortest', '-movflags', '+faststart', output,
  ]);
  await fs.rm(wav);
  return output;
}

// ---------- copy for cards, thumbnails and YouTube ----------

const SOURCE_NOTE = `Fragen und Antworten: BAMF-Gesamtfragenkatalog, Stand ${CATALOG_STAND}`;
const STEPS = [
  { title: 'Frage lesen', text: 'Lesen Sie die Frage und die vier Antworten in Ruhe durch.' },
  { title: 'Selbst antworten', text: 'Entscheiden Sie sich, bevor der grüne Balken abgelaufen ist.' },
  { title: 'Antwort prüfen', text: 'Die richtige Antwort wird grün markiert. Pausieren Sie, wenn Sie mehr Zeit brauchen.' },
];
const FACTS = [
  { n: '33', title: 'Fragen im Test', text: '30 allgemeine Fragen und 3 Fragen zu Ihrem Bundesland.' },
  { n: '60', title: 'Minuten Zeit', text: 'So lange dauert der Test höchstens.' },
  { n: '17', title: 'richtige Antworten', text: 'So viele brauchen Sie mindestens, um zu bestehen.' },
];

function introSpec(part) {
  return {
    scene: 'intro', part: part.label, eyebrow: 'Leben in Deutschland · Einbürgerungstest',
    titleHtml: 'Alle 300 Fragen<br><em>mit Antworten</em>',
    lead: part.label
      ? `${part.label} · Fragen ${part.first} bis ${part.last} aus dem offiziellen Gesamtfragenkatalog.`
      : `Fragen ${part.first} bis ${part.last} aus dem offiziellen Gesamtfragenkatalog in einem Video.`,
    steps: STEPS, foot: SOURCE_NOTE,
  };
}

function outroSpec(part, next) {
  return {
    scene: 'outro', part: part.label, eyebrow: part.label ? `${part.label.split(' von ')[0]} geschafft` : 'Geschafft',
    titleHtml: next ? `Weiter mit<br><em>Teil ${next.number}</em>` : 'Alle 300 Fragen<br><em>geschafft!</em>',
    lead: next
      ? `Im nächsten Video: Fragen ${next.first} bis ${next.last}.`
      : 'Wiederholen Sie die Fragen, bei denen Sie unsicher waren – und üben Sie auch die 10 Fragen zu Ihrem Bundesland.',
    steps: FACTS, foot: 'Kostenlos online und in der App üben',
  };
}

function youtubeText(part, chapters, partCount) {
  const range = `Fragen ${part.first}–${part.last}`;
  const title = part.label
    ? `Einbürgerungstest 2026: Alle 300 Fragen mit Antworten – Teil ${part.number}/${partCount} (${range}) | Leben in Deutschland`
    : 'Einbürgerungstest 2026: Alle 300 Fragen mit Antworten | Leben in Deutschland Test';
  return [
    'TITEL', title, '',
    'BESCHREIBUNG',
    `${part.label ? `Teil ${part.number} von ${partCount}: ${range}` : 'Alle 300 allgemeinen Fragen'} für den Einbürgerungstest und den Test „Leben in Deutschland“ – mit den richtigen Antworten.`,
    '',
    'So lernen Sie mit dem Video: Frage lesen, selbst antworten, dann erscheint die richtige Antwort in Grün. Wenn Sie mehr Zeit brauchen, pausieren Sie einfach.',
    '',
    `Die Fragen und Antworten folgen dem offiziellen Gesamtfragenkatalog des Bundesamts für Migration und Flüchtlinge (BAMF), Stand ${CATALOG_STAND}.`,
    'Im Test bekommen Sie 33 Fragen (30 allgemeine und 3 zu Ihrem Bundesland), haben 60 Minuten Zeit und brauchen 17 richtige Antworten.',
    '',
    `Kostenlos online üben: https://${SITE}`,
    'App (iOS): https://apps.apple.com/app/leben-in-deutschland-2026-lid/id6723899981',
    'App (Android): https://play.google.com/store/apps/details?id=com.einbuergerungapp',
    '',
    'KAPITEL',
    ...chapters.map(c => `${clock(c.at)} ${c.title}`),
    '',
    '#einbürgerungstest #lebenindeutschland #einbürgerung',
    '',
  ].join('\n');
}

const APP_LINKS = [
  `Kostenlos online üben: https://${SITE}`,
  'App (iOS): https://apps.apple.com/app/leben-in-deutschland-2026-lid/id6723899981',
  'App (Android): https://play.google.com/store/apps/details?id=com.einbuergerungapp',
];

// One video per Bundesland: its ten questions, numbered 1–10 as in the catalogue.
function stateVideo(s) {
  const subtitle = `Leben in Deutschland · ${s.state}`;
  const questions = s.questions.map(q => ({
    ...q, key: `${s.slug}-q${String(q.id).padStart(2, '0')}`,
    shot: { total: s.questions.length, subtitle, label: `${s.state} · Aufgabe ${q.id}` },
  }));
  const sample = questions[6];
  return {
    name: `bundesland-${s.slug}`, questions,
    intro: {
      scene: 'intro', subtitle, part: s.state, eyebrow: 'Einbürgerungstest · Fragen zum Bundesland',
      titleHtml: `${s.state}<br><em>10 Fragen mit Antworten</em>`,
      lead: 'Die 10 offiziellen Fragen für dieses Bundesland. Im Test kommen 3 davon vor.',
      steps: STEPS, foot: SOURCE_NOTE,
    },
    outro: {
      scene: 'outro', subtitle, part: s.state, eyebrow: 'Geschafft',
      titleHtml: `${s.state}<br><em>geschafft!</em>`,
      lead: 'Üben Sie jetzt auch die 300 allgemeinen Fragen – im Test kommen 30 davon vor.',
      steps: FACTS, foot: 'Kostenlos online und in der App üben',
    },
    thumb: {
      scene: 'thumb', eyebrow: 'Einbürgerungstest 2026', big: '10', sub: 'zu Ihrem Bundesland', p1: s.state, p2: '',
      card: { question: sample.question, options: sample.options, correct: sample.correct },
    },
    chapter: q => `Frage ${q.id}`,
    youtube: chapters => [
      'TITEL', `Einbürgerungstest 2026 ${s.state}: Alle 10 Fragen zum Bundesland mit Antworten | Leben in Deutschland`, '',
      'BESCHREIBUNG',
      `Alle 10 Fragen für das Bundesland ${s.state} aus dem Einbürgerungstest und dem Test „Leben in Deutschland“ – mit den richtigen Antworten.`,
      '',
      'So lernen Sie mit dem Video: Frage lesen, selbst antworten, dann erscheint die richtige Antwort in Grün. Wenn Sie mehr Zeit brauchen, pausieren Sie einfach.',
      '',
      `Die Fragen und Antworten folgen dem offiziellen Gesamtfragenkatalog des Bundesamts für Migration und Flüchtlinge (BAMF), Stand ${CATALOG_STAND}.`,
      'Im Test bekommen Sie 33 Fragen: 30 allgemeine und 3 zu Ihrem Bundesland. Sie haben 60 Minuten Zeit und brauchen 17 richtige Antworten.',
      '',
      ...APP_LINKS, '',
      'KAPITEL', ...chapters.map(c => `${clock(c.at)} ${c.title}`), '',
      `#einbürgerungstest #lebenindeutschland #${s.slug.replace(/-/g, '')}`, '',
    ].join('\n'),
  };
}

// ---------- main ----------

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const all = JSON.parse(await fs.readFile(path.join(HERE, 'questions.de.json'), 'utf8'))
    .map((q, _, list) => ({ ...q, key: `q${pad3(q.id)}`, shot: { total: list.length } }));
  const states = JSON.parse(await fs.readFile(path.join(HERE, 'questions.states.de.json'), 'utf8'));

  // Frames and clips are only reused while template, data and this script are unchanged.
  const stamp = createHash('sha256');
  for (const name of ['template.html', 'questions.de.json', 'questions.states.de.json', 'render-video.mjs']) stamp.update(await fs.readFile(path.join(HERE, name)));
  const stampFile = path.join(WORK, 'stamp');
  const digest = stamp.digest('hex');
  if (!existsSync(stampFile) || (await fs.readFile(stampFile, 'utf8')) !== digest) await fs.rm(WORK, { recursive: true, force: true });
  await fs.mkdir(FRAMES, { recursive: true });
  await fs.mkdir(SEGMENTS, { recursive: true });
  await fs.writeFile(stampFile, digest);

  const chrome = await launchChrome();
  try {
    let questions;
    let videos;
    if (args.states) {
      const wanted = args.states === true ? states : states.filter(s => args.states.includes(s.slug));
      if (!wanted.length) throw new Error(`Unknown Bundesland. Known: ${states.map(s => s.slug).join(', ')}`);
      videos = wanted.map(stateVideo);
      questions = videos.flatMap(video => video.questions);
    } else {
      questions = all.filter(q => q.id >= args.from && q.id <= args.to);
      const size = Math.ceil(questions.length / args.parts);
      const parts = Array.from({ length: args.parts }, (_, i) => {
        const slice = questions.slice(i * size, (i + 1) * size);
        return { number: i + 1, label: args.parts > 1 ? `Teil ${i + 1} von ${args.parts}` : '', first: slice[0].id, last: slice.at(-1).id, questions: slice, name: `teil-${i + 1}` };
      });
      const whole = { number: 0, label: '', first: questions[0].id, last: questions.at(-1).id, questions, name: 'komplett' };
      const sample = all[5];
      videos = (args.full && args.parts > 1 ? [...parts, whole] : parts).map(video => ({
        ...video,
        intro: introSpec(video),
        outro: outroSpec(video, video.number ? parts[video.number] : null),
        thumb: {
          scene: 'thumb', eyebrow: 'Einbürgerungstest 2026', big: '300', sub: 'mit allen richtigen Antworten',
          p1: video.label ? `Teil ${video.number}` : 'Alle Fragen', p2: `Fragen ${video.first}–${video.last}`,
          card: { question: sample.question, options: sample.options, correct: sample.correct },
        },
        chapter: (q, i, list) => (i % 10 === 0 ? `Fragen ${q.id}–${list[Math.min(i + 9, list.length - 1)].id}` : null),
        youtube: chapters => youtubeText(video, chapters, parts.length),
      }));
    }
    const shotFor = (q, state) => ({ scene: 'question', state, q, ...q.shot });
    const thumbClip = { clip: { width: 1280, height: 720 } };

    if (args.preview) {
      const dir = path.join(OUT, 'preview');
      await fs.mkdir(dir, { recursive: true });
      for (const q of questions.filter(item => args.preview.includes(item.id))) {
        for (const state of ['q', 'a']) {
          const info = await chrome.shot(shotFor(q, state), path.join(dir, `${q.key}-${state}.png`));
          if (state === 'q') console.log(`${q.key}: scale ${info.k}${info.overflow ? ' OVERFLOW' : ''}`);
        }
      }
      await chrome.shot(videos[0].intro, path.join(dir, `${videos[0].name}-intro.png`));
      await chrome.shot(videos[0].outro, path.join(dir, `${videos[0].name}-outro.png`));
      await chrome.shot(videos[0].thumb, path.join(dir, `${videos[0].name}-thumbnail.png`), thumbClip);
      console.log(`Preview frames in ${dir}`);
      return;
    }

    console.log('Rendering frames…');
    await chrome.shot({ scene: 'bar' }, path.join(FRAMES, 'bar.png'), { alpha: true, clip: { width: TRACK.width, height: TRACK.height } });
    await chrome.shot({ scene: 'mask' }, path.join(FRAMES, 'mask.png'), { alpha: true });
    const tight = [];
    const scales = [];
    for (const [index, q] of questions.entries()) {
      for (const state of ['blank', 'q', 'a']) {
        const file = path.join(FRAMES, `${q.key}-${state}.png`);
        if (existsSync(file)) continue;
        const info = await chrome.shot(shotFor(q, state), file);
        if (state === 'q') scales.push({ key: q.key, k: info.k });
        if (state === 'q' && info.overflow) tight.push(q.key);
      }
      if ((index + 1) % 25 === 0) process.stdout.write(`\r  ${index + 1}/${questions.length}`);
    }
    process.stdout.write('\n');
    if (tight.length) throw new Error(`Text does not fit the card for: ${tight.join(', ')}`);
    const smallest = scales.sort((a, b) => a.k - b.k).slice(0, 8).filter(s => s.k < 1);
    if (smallest.length) console.log(`  Smallest type scale: ${smallest.map(s => `${s.key} ×${s.k}`).join(', ')}`);
    for (const video of videos) {
      await chrome.shot(video.intro, path.join(FRAMES, `${video.name}-intro.png`));
      await chrome.shot(video.outro, path.join(FRAMES, `${video.name}-outro.png`));
      await chrome.shot(video.thumb, path.join(OUT, `${video.name}-thumbnail.png`), thumbClip);
    }
    chrome.close();

    console.log(`Encoding question clips (${args.jobs} at a time)…`);
    const clip = q => path.join(SEGMENTS, `${q.key}.mp4`);
    await pool(questions.filter(q => !existsSync(clip(q))), args.jobs, q => encodeQuestion(q, clip(q)));

    for (const video of videos) {
      console.log(`Assembling ${video.name}…`);
      const blank = q => path.join(FRAMES, `${q.key}-blank.png`);
      const intro = path.join(SEGMENTS, `${video.name}-intro.mp4`);
      const outro = path.join(SEGMENTS, `${video.name}-outro.mp4`);
      await encodeCard(path.join(FRAMES, `${video.name}-intro.png`), blank(video.questions[0]), intro, { cardFirst: true });
      await encodeCard(path.join(FRAMES, `${video.name}-outro.png`), blank(video.questions.at(-1)), outro, { cardFirst: false });

      const cardFrames = CARD_HOLD * FPS;
      const timeline = [{ file: intro, frames: cardFrames }];
      const chapters = [{ at: 0, title: 'So funktioniert das Video' }];
      let cursor = cardFrames;
      video.questions.forEach((q, i) => {
        const title = video.chapter(q, i, video.questions);
        if (title) chapters.push({ at: cursor / FPS, title });
        const { thinkFrames, totalFrames } = questionTiming(q);
        timeline.push({ file: clip(q), frames: totalFrames, chimeFrame: thinkFrames });
        cursor += totalFrames;
      });
      timeline.push({ file: outro, frames: cardFrames });
      const output = await assemble(video.name, timeline, args.sound);
      await fs.writeFile(path.join(OUT, `${video.name}-youtube.txt`), video.youtube(chapters));
      console.log(`  ${path.relative(ROOT, output)}  ${clock((cursor + cardFrames) / FPS)}`);
    }
  } finally {
    chrome.close();
  }
}

main().catch(error => { console.error(error); process.exit(1); });
