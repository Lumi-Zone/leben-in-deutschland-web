import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { getEligibleQuestions } from './daily-question-core.mjs';
import { ACCOUNT } from './instagram-series-core.mjs';
import {
  GROWTH_SCHEDULE,
  growthSourceFingerprint,
  reelContent,
  renderGrowthCard,
  storyContent,
} from './instagram-growth-core.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const output = path.join(root, 'public/instagram/growth-v1');

async function run(command, args) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let errorOutput = '';
    child.stderr.on('data', chunk => { errorOutput += chunk; });
    child.on('error', reject);
    child.on('close', code => code === 0 ? resolve() : reject(new Error(`${command} failed (${code}): ${errorOutput.slice(-1200)}`)));
  });
}

async function encodeReel(question, target) {
  const content = reelContent(question);
  const temp = path.join(root, '.daily-instagram/build/growth', String(question.id));
  await fs.mkdir(temp, { recursive: true });
  const frames = [
    ['reel-hook', 2.5],
    ['reel-question', 4.5],
    ['reel-translation', 4],
    ['reel-answer', 4],
  ];
  const list = [];
  for (const [type, duration] of frames) {
    const frame = path.join(temp, `${type}.jpg`);
    await renderGrowthCard({ type, question, outputPath: frame, language: content.language });
    list.push(`file '${frame.replaceAll("'", "'\\''")}'\nduration ${duration}`);
  }
  list.push(`file '${path.join(temp, 'reel-answer.jpg').replaceAll("'", "'\\''")}'`);
  const concatFile = path.join(temp, 'frames.txt');
  await fs.writeFile(concatFile, `${list.join('\n')}\n`);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await run(process.env.FFMPEG_PATH || 'ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-f', 'concat', '-safe', '0', '-i', concatFile,
    '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=48000',
    '-t', '15', '-shortest', '-vf', 'scale=720:1280:flags=lanczos,format=yuv420p',
    '-r', '24', '-c:v', 'libx264', '-preset', 'ultrafast', '-tune', 'stillimage', '-crf', '30',
    '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', target,
  ]);
  await fs.rm(temp, { recursive: true, force: true });
}

async function mapLimit(items, limit, worker) {
  let index = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const item = items[index];
      index += 1;
      await worker(item);
    }
  });
  await Promise.all(runners);
}

async function hashFile(manifest, filename) {
  const bytes = await fs.readFile(path.join(output, filename));
  manifest.files[filename] = createHash('sha256').update(bytes).digest('hex');
}

export async function generateGrowthAssets({ questionId = null } = {}) {
  const questions = getEligibleQuestions(JSON.parse(await fs.readFile(path.join(root, 'src/data/questions.json'), 'utf8')));
  const selected = questionId === null ? questions : questions.filter(question => question.id === questionId);
  if (!selected.length) throw new Error(`Invalid preview question: ${questionId}`);
  const fingerprint = await growthSourceFingerprint(root);
  if (questionId === null) {
    try {
      const cached = JSON.parse(await fs.readFile(path.join(output, 'manifest.json'), 'utf8'));
      const expectedCount = 3 + questions.length * 4;
      const filenames = Object.keys(cached.files || {});
      const complete = cached.sourceFingerprint === fingerprint
        && filenames.length === expectedCount
        && (await Promise.all(filenames.map(filename => fs.access(path.join(output, filename)).then(() => true, () => false)))).every(Boolean);
      if (complete) {
        console.log(`${expectedCount} cached Instagram growth assets reused.`);
        return { output, manifest: cached };
      }
    } catch { /* Missing or stale cache: regenerate all approved assets. */ }
  }
  const manifest = { version: 1, account: ACCOUNT, sourceFingerprint: fingerprint, schedule: GROWTH_SCHEDULE, files: {} };
  await fs.mkdir(output, { recursive: true });

  for (const [type, filename] of [
    ['carousel-cover', 'carousel/weekly-cover.jpg'],
    ['carousel-method', 'carousel/review-method.jpg'],
    ['carousel-cta', 'carousel/cta.jpg'],
  ]) {
    await renderGrowthCard({ type, outputPath: path.join(output, filename) });
    await hashFile(manifest, filename);
  }

  await mapLimit(selected, 3, async question => {
    for (const [type, filename] of [
      ['story-question', storyContent(question, 'question').filename],
      ['story-answer', storyContent(question, 'answer').filename],
      ['carousel-review', `carousel/frage-${question.id}-review.jpg`],
    ]) {
      await renderGrowthCard({ type, question, outputPath: path.join(output, filename) });
      await hashFile(manifest, filename);
    }
    const reel = reelContent(question).filename;
    await encodeReel(question, path.join(output, reel));
    await hashFile(manifest, reel);
  });

  await fs.writeFile(path.join(output, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`${Object.keys(manifest.files).length} Instagram growth assets generated (${selected.length} questions).`);
  return { output, manifest };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const questionIndex = process.argv.indexOf('--question');
  const questionId = questionIndex >= 0 ? Number(process.argv[questionIndex + 1]) : null;
  generateGrowthAssets({ questionId }).catch(error => { console.error(error.message); process.exitCode = 1; });
}
