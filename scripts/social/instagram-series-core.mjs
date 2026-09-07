import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { escapeXml, wrapText, getCorrectAnswer, getQuestionOptions, getEligibleQuestions, berlinDate, berlinMinutes } from './daily-question-core.mjs';

export const ACCOUNT = 'einbuergerungstest2026';
export const ACCOUNT_ID = '17841408563989755';
export const SLOTS = [
  { id: 'question', time: '08:00', minutes: 480, label: 'Tagesfrage' },
  { id: 'answer', time: '16:00', minutes: 960, label: 'Auflösung' },
  { id: 'lesson', time: '18:00', minutes: 1080, label: 'Wortschatz' },
];

// Editorial vocabulary, selected only when the word occurs in the source question/answer.
const VOCABULARY = [
  ['meinungsfreiheit', 'Meinungsfreiheit', 'Meinung + s + Freiheit', 'Das „s“ verbindet die beiden Wörter.', 'Ich sage meine Meinung.'],
  ['religionsfreiheit', 'Religionsfreiheit', 'Religion + s + Freiheit', 'Das „s“ verbindet die beiden Wörter.', 'Religion ist das erste Wort.'],
  ['grundgesetz', 'das Grundgesetz', 'Grund + Gesetz', 'Zwei Wörter bilden ein neues Wort.', 'Das Grundgesetz hat mehrere Artikel.'],
  ['bundestag', 'der Bundestag', 'Bund + es + Tag', 'Das ganze Wort hat einen eigenen Sinn.', 'Der Bundestag ist ein Parlament.'],
  ['bundesrat', 'der Bundesrat', 'Bund + es + Rat', 'Achte auf den Unterschied zum Bundestag.', 'Bundesrat und Bundestag sind verschiedene Wörter.'],
  ['wahlrecht', 'das Wahlrecht', 'Wahl + Recht', 'Achte auf das letzte Wort: das Recht.', 'Das Wahlrecht ist ein wichtiges Thema.'],
  ['bundesland', 'das Bundesland', 'Einzahl und Mehrzahl', 'das Bundesland → die Bundesländer', 'Deutschland hat 16 Bundesländer.'],
  ['bundesländer', 'das Bundesland', 'Einzahl und Mehrzahl', 'das Bundesland → die Bundesländer', 'Deutschland hat 16 Bundesländer.'],
  ['regierung', 'die Regierung', 'Verb und Nomen', 'regieren → die Regierung', 'Die Regierung ist ein Thema im Test.'],
  ['demokratie', 'die Demokratie', 'Wortfamilie', 'Demokratie → demokratisch', 'Wir sprechen über demokratische Wahlen.'],
  ['verfassung', 'die Verfassung', 'Einzahl und Mehrzahl', 'die Verfassung → die Verfassungen', 'Wir lesen einen Text über die Verfassung.'],
  ['gericht', 'das Gericht', 'Einzahl und Mehrzahl', 'das Gericht → die Gerichte', 'Das Gericht entscheidet über einen Fall.'],
  ['partei', 'die Partei', 'Einzahl und Mehrzahl', 'die Partei → die Parteien', 'Mehrere Parteien nehmen an der Wahl teil.'],
  ['wahlen', 'die Wahl', 'Verb und Nomen', 'wählen → die Wahl', 'Die Wahl findet am Sonntag statt.'],
  ['wählen', 'wählen', 'Verb und Nomen', 'wählen → die Wahl', 'Die Wahl findet am Sonntag statt.'],
  ['bürger', 'der Bürger', 'Wortformen', 'der Bürger · die Bürgerin', 'Bürgerinnen und Bürger leben in einer Stadt.'],
  ['gemeinde', 'die Gemeinde', 'Einzahl und Mehrzahl', 'die Gemeinde → die Gemeinden', 'Ich wohne in dieser Gemeinde.'],
  ['bürgermeister', 'der Bürgermeister', 'Zwei Wörter', 'Bürger + Meister', 'Die Bürgermeisterin besucht die Schule.'],
  ['arbeit', 'die Arbeit', 'Verb und Nomen', 'arbeiten → die Arbeit', 'Ich gehe heute zur Arbeit.'],
  ['versicherung', 'die Versicherung', 'Verb und Nomen', 'versichern → die Versicherung', 'Ich lese einen Brief von der Versicherung.'],
  ['gleichberechtigung', 'die Gleichberechtigung', 'Wortfamilie', 'gleichberechtigt → Gleichberechtigung', 'Gleichberechtigung ist ein Thema im Test.'],
  ['geschichte', 'die Geschichte', 'Ein Wort, mehrere Bedeutungen', 'Geschichte: Vergangenheit oder Erzählung', 'Wir lernen deutsche Geschichte.'],
  ['europ', 'Europa', 'Wortfamilie', 'Europa → europäisch', 'Wir sprechen über europäische Länder.'],
  ['schule', 'die Schule', 'Wortfamilie', 'Schule → schulisch', 'Die Schule beginnt am Montag.'],
  ['familie', 'die Familie', 'Einzahl und Mehrzahl', 'die Familie → die Familien', 'Meine Familie wohnt in Deutschland.'],
  ['recht', 'das Recht', 'Einzahl und Mehrzahl', 'das Recht → die Rechte', 'Wir lernen etwas über Rechte und Pflichten.'],
];
const TIPS = [
  ['Erst lesen, dann wählen.', 'Lies zuerst die ganze Frage.', 'Vergleiche danach alle vier Antworten.', 'Welche Wörter helfen dir bei dieser Frage?'],
  ['Achte auf „nicht“.', 'Suche nach Wörtern wie „nicht“ oder „kein“.', 'Sie können die Bedeutung einer Frage ändern.', 'Lies die heutige Frage noch einmal genau.'],
  ['Wiederholen hilft.', 'Decke die Antwort zur Tagesfrage ab.', 'Versuche, die richtige Lösung zu nennen.', 'Prüfe dich morgen noch einmal.'],
  ['Lerne mit eigenen Worten.', 'Lies die richtige Antwort zur Tagesfrage.', 'Erkläre sie danach in einem kurzen Satz.', 'So merkst du, was du schon verstanden hast.'],
];

export function lessonFor(question) {
  const source = `${question.q_de} ${getCorrectAnswer(question).text}`.toLowerCase();
  const entry = VOCABULARY.find(([word]) => source.includes(word));
  if (entry) return { kind: 'vocabulary', word: entry[1], heading: entry[2], detail: entry[3], example: entry[4] };
  const tip = TIPS[(question.id - 1) % TIPS.length];
  return { kind: 'tip', word: tip[0], heading: tip[1], detail: tip[2], example: tip[3] };
}

export function currentSlot(now = new Date()) {
  const minutes = berlinMinutes(now);
  return [...SLOTS].reverse().find(slot => minutes >= slot.minutes) || null;
}

export function emptySeriesState(accountId = ACCOUNT_ID) {
  return { version: 2, accountId, cycle: 1, posts: [], inFlight: null };
}

export function planPost({ questions, state, now = new Date(), startDate, accountId = ACCOUNT_ID }) {
  if (state.version !== 2 || state.accountId !== accountId || !Array.isArray(state.posts)) throw new Error('Instagram state/account mismatch.');
  if (state.inFlight) throw new Error('Previous Instagram publication is unresolved. Do not retry or edit state automatically.');
  const date = berlinDate(now);
  if (startDate && date < startDate) return { skip: `Scheduled start: ${startDate} at 08:00 Europe/Berlin.` };
  const slot = currentSlot(now);
  if (!slot) return { skip: 'Before the first daily slot (08:00 Europe/Berlin).' };
  if (state.posts.some(p => p.date === date && p.slot === slot.id)) return { skip: `${date}/${slot.id} already published.` };
  const today = state.posts.filter(p => p.date === date);
  const morning = today.find(p => p.slot === 'question');
  if (slot.id !== 'question' && !morning) return { skip: 'Morning question was not published; follow-up skipped.' };
  if (slot.id === 'lesson' && !today.some(p => p.slot === 'answer')) return { skip: 'Answer was not published; lesson skipped.' };
  const pool = getEligibleQuestions(questions);
  let cycle = state.cycle || 1;
  let question;
  if (morning) {
    question = pool.find(q => q.id === morning.questionId);
    cycle = morning.cycle;
  } else {
    const used = new Set(state.posts.filter(p => p.slot === 'question' && p.cycle === cycle).map(p => p.questionId));
    question = pool.find(q => !used.has(q.id));
    if (!question) { cycle += 1; question = pool[0]; }
  }
  if (!question) throw new Error('No matching source question.');
  return { date, slot: slot.id, question, cycle };
}

export function contentFor(question, slot, site = 'https://lid-einbuergerung.de') {
  if (!SLOTS.some(s => s.id === slot)) throw new Error('Unknown Instagram slot.');
  const answer = getCorrectAnswer(question);
  const lesson = lessonFor(question);
  const url = `${site.replace(/\/$/, '')}/de/frage/${question.id}`;
  const hashtags = '#Einbürgerungstest #LebenInDeutschland #DeutschLernen #Tagesfrage';
  const caption = slot === 'question'
    ? `Tagesfrage #${question.id} 🇩🇪\n\n${question.q_de}\n\nWelche Antwort ist richtig? Schreib A, B, C oder D in die Kommentare.\nDie Auflösung kommt heute um 16:00 Uhr (deutsche Zeit).\n\nMehr üben: ${url}\n\n${hashtags}`
    : slot === 'answer'
      ? `Auflösung zu Frage #${question.id} ✅\n\n${question.q_de}\n\nRichtig ist ${answer.label}: ${answer.text}\n\nLies Frage und Lösung noch einmal zusammen. Speichere den Beitrag für deine Wiederholung.\n\nMehr üben: ${url}\n\n${hashtags}`
      : `${lesson.kind === 'tip' ? 'Lerntipp' : 'Wortschatz'} zur Tagesfrage #${question.id} 💡\n\n${lesson.word}\n${lesson.heading}\n${lesson.detail}\n\n${lesson.example}\n\nWelches Wort aus dem Test findest du schwierig?\n\nMehr üben: ${url}\n\n${hashtags}`;
  const altText = slot === 'question'
    ? `${question.q_de} ${getQuestionOptions(question).map((s, i) => `${'ABCD'[i]}: ${s}`).join(' ')}`
    : slot === 'answer' ? `Frage ${question.id}. ${question.q_de} Richtige Antwort ${answer.label}: ${answer.text}`
      : `${lesson.word}. ${lesson.heading}. ${lesson.detail}. ${lesson.example}`;
  if (caption.length > 2200 || altText.length > 1000) throw new Error(`Content too long for question ${question.id}.`);
  return { caption, altText, lesson, filename: `frage-${question.id}-${slot}.jpg` };
}

const text = (x, y, value, size = 38, color = '#11283E', weight = 500) => `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${escapeXml(value)}</text>`;
const lines = (values, x, y, size, color = '#11283E', weight = 500, gap = size * 1.25) => values.map((value, i) => text(x, y + i * gap, value, size, color, weight)).join('');
function fit(value, width, maxHeight, maxSize = 46, minSize = 24) {
  for (let size = maxSize; size >= minSize; size -= 2) {
    const wrapped = wrapText(value, Math.floor(width / (size * 0.57)));
    if (wrapped.length * size * 1.25 <= maxHeight) return { wrapped, size, height: wrapped.length * size * 1.25 };
  }
  throw new Error(`Text does not fit card: ${value.slice(0, 70)}`);
}
function paragraph(value, x, y, width, height, maxSize = 46, color = '#11283E', weight = 500) {
  const f = fit(value, width, height, maxSize);
  return lines(f.wrapped, x, y + f.size, f.size, color, weight);
}

export async function renderSeriesCard({ question, slot, outputPath, imageDirectory }) {
  const answer = getCorrectAnswer(question);
  const lesson = lessonFor(question);
  const index = SLOTS.findIndex(s => s.id === slot);
  if (index < 0) throw new Error('Unknown card type.');
  const category = slot === 'question' ? 'TAGESFRAGE' : slot === 'answer' ? 'AUFLÖSUNG' : lesson.kind === 'tip' ? 'LERNTIPP' : 'WORTSCHATZ';
  let body = '';
  if (slot === 'question') {
    const withImage = question.image && question.image !== '-';
    if (!withImage) body += text(64, 400, 'Was meinst du?', 64, '#11283E', 700);
    const f = fit(question.q_de, 940, withImage ? 240 : 215, withImage ? 36 : 44, 24);
    body += lines(f.wrapped, 64, withImage ? 350 + f.size : 453, f.size);
    let top = withImage ? 368 + f.height : 465 + f.height;
    if (withImage) {
      const bytes = await fs.readFile(path.join(imageDirectory, `deutschland${question.id}.png`));
      body += `<rect x="64" y="${top}" width="952" height="180" rx="16" fill="white"/><image href="data:image/png;base64,${bytes.toString('base64')}" x="80" y="${top + 8}" width="920" height="164" preserveAspectRatio="xMidYMid meet"/>`;
      top += 194;
    } else top = top + 18;
    const options = getQuestionOptions(question);
    let layout;
    for (let size = 32; size >= 20; size -= 2) {
      const wrapped = options.map(s => wrapText(s, Math.floor(820 / (size * 0.57))));
      const heights = wrapped.map(w => Math.max(withImage ? 56 : 70, w.length * size * 1.25 + 26));
      if (heights.reduce((a, b) => a + b, 0) + 36 <= 1105 - top) { layout = { size, wrapped, heights }; break; }
    }
    if (!layout) throw new Error(`Question ${question.id}: options do not fit.`);
    layout.wrapped.forEach((w, i) => {
      const height = layout.heights[i];
      body += `<rect x="64" y="${top}" width="952" height="${height}" rx="16" fill="white" stroke="#D6DDDA"/><circle cx="112" cy="${top + height / 2}" r="24" fill="#11283E"/>`;
      body += text(101, top + height / 2 + 10, 'ABCD'[i], 28, 'white', 700);
      body += lines(w, 157, top + (height - w.length * layout.size * 1.25) / 2 + layout.size, layout.size);
      top += height + 12;
    });
    body += text(64, 1150, 'A, B, C oder D? Schreib deine Antwort.', 30, '#516571');
  } else if (slot === 'answer') {
    body += lines(['Die richtige', `Antwort ist ${answer.label}.`], 64, 420, 74, '#11283E', 700, 88);
    body += `<rect x="64" y="570" width="952" height="245" rx="24" fill="#F7D44B"/>`;
    body += paragraph(answer.text, 100, 595, 870, 195, 53, '#11283E', 700);
    body += text(64, 876, 'ZUR ERINNERUNG', 24, '#516571', 700);
    body += paragraph(question.q_de, 64, 905, 952, 155, 35);
    body += text(64, 1140, 'Richtig getippt? Speichere die Auflösung.', 29, '#516571');
  } else {
    body += lines(lesson.kind === 'tip' ? ['Kleine Schritte.', 'Besser lernen.'] : ['Ein Wort.', 'Besser verstehen.'], 64, 410, 65, '#11283E', 700, 80);
    body += `<rect x="64" y="566" width="952" height="278" rx="24" fill="#11283E"/>`;
    body += paragraph(lesson.word, 100, 593, 866, 85, 49, '#F7D44B', 700);
    body += paragraph(lesson.heading, 100, 688, 866, 60, 33, 'white', 700);
    body += paragraph(lesson.detail, 100, 767, 866, 57, 27, '#CAD6DE');
    body += text(64, 919, lesson.kind === 'tip' ? 'PROBIER ES AUS' : 'SO VERWENDEST DU ES', 24, '#516571', 700);
    body += paragraph(lesson.example, 64, 947, 952, 126, 40);
    body += text(64, 1140, 'Welches Wort soll als Nächstes kommen?', 29, '#516571');
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350"><rect width="1080" height="1350" fill="#F6F3EC"/><rect width="1080" height="214" fill="#11283E"/><rect x="64" y="52" width="8" height="98" fill="#F7D44B"/>${lines(['LEBEN IN', 'DEUTSCHLAND'], 98, 94, 36, '#F6F3EC', 700, 43)}${text(720, 91, 'TÄGLICH LERNEN', 19, '#F7D44B', 700)}${text(720, 129, 'Einbürgerungstest', 24, '#F6F3EC')}<rect x="64" y="258" width="650" height="48" rx="24" fill="#E6EAE7"/>${text(88, 290, `0${index + 1} / ${category}`, 22, '#11283E', 700)}${text(850, 291, `FRAGE ${question.id}`, 24, '#11283E', 700)}${body}<line x1="64" x2="1016" y1="1196" y2="1196" stroke="#CBCFCB"/>${text(64, 1241, `@${ACCOUNT}`, 28, '#11283E', 700)}${text(64, 1284, 'lid-einbuergerung.de', 25, '#516571')}<rect x="940" y="1230" width="24" height="12" fill="#11283E"/><rect x="964" y="1230" width="24" height="12" fill="#D6493E"/><rect x="988" y="1230" width="24" height="12" fill="#F7D44B"/></svg>`;
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 92, mozjpeg: true }).toFile(outputPath);
  return outputPath;
}

export async function sourceFingerprint(root) {
  const hash = createHash('sha256');
  const files = ['scripts/social/instagram-series-core.mjs', 'src/data/questions.json'];
  const imageRoot = path.join(root, 'public/question-images/general');
  for (const file of (await fs.readdir(imageRoot)).filter(f => /^deutschland\d+\.png$/.test(f)).sort()) files.push(`public/question-images/general/${file}`);
  for (const file of files) { hash.update(file); hash.update(await fs.readFile(path.join(root, file))); }
  return hash.digest('hex');
}
