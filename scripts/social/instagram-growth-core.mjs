import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { berlinDate, berlinMinutes, escapeXml, getCorrectAnswer, wrapText } from './daily-question-core.mjs';
import { ACCOUNT, ACCOUNT_ID } from './instagram-series-core.mjs';

export const GROWTH_STATE_VERSION = 1;
export const GROWTH_SCHEDULE = {
  stories: ['09:00', '17:00'],
  reels: ['Montag 20:30', 'Mittwoch 20:30', 'Freitag 20:30'],
  carousel: ['Sonntag 20:30'],
};

export function emptyGrowthState(accountId = ACCOUNT_ID) {
  return { version: GROWTH_STATE_VERSION, accountId, posts: [], inFlight: null };
}

export function defaultGrowthStartDate(feedStartDate) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(feedStartDate || '')) throw new Error('A valid Instagram feed start date is required.');
  const [year, month, day] = feedStartDate.split('-').map(Number);
  const value = new Date(Date.UTC(year, month - 1, day + 7));
  return value.toISOString().slice(0, 10);
}

export function berlinWeekday(date = new Date()) {
  return new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Berlin', weekday: 'short' }).format(date);
}

function assertState(state) {
  if (state.version !== GROWTH_STATE_VERSION || state.accountId !== ACCOUNT_ID || !Array.isArray(state.posts)) {
    throw new Error('Instagram growth state/account mismatch.');
  }
  if (state.inFlight) throw new Error('Previous Instagram growth publication is unresolved. Do not retry or edit state automatically.');
}

function feedPost(seriesState, date, slot) {
  return seriesState.posts?.find(post => post.date === date && post.slot === slot);
}

function alreadyPublished(state, key) {
  return state.posts.some(post => post.key === key);
}

export function planGrowthPost({ kind, seriesState, growthState, now = new Date(), growthStartDate }) {
  assertState(growthState);
  const date = berlinDate(now);
  if (growthStartDate && date < growthStartDate) return { skip: `Growth schedule starts on ${growthStartDate}.` };
  const minutes = berlinMinutes(now);
  const weekday = berlinWeekday(now);
  const questionPost = feedPost(seriesState, date, 'question');

  if (kind === 'story') {
    const variant = minutes >= 17 * 60 ? 'answer' : minutes >= 9 * 60 ? 'question' : null;
    if (!variant) return { skip: 'Before the first Story slot.' };
    const requiredSlot = variant === 'answer' ? 'answer' : 'question';
    const sourcePost = feedPost(seriesState, date, requiredSlot);
    if (!sourcePost) return { skip: `The ${requiredSlot} Feed post is missing; Story skipped.` };
    const key = `${ACCOUNT_ID}/${date}/story-${variant}`;
    if (alreadyPublished(growthState, key)) return { skip: `${date}/story-${variant} already published.` };
    return { kind, variant, key, date, questionId: sourcePost.questionId };
  }

  if (kind === 'reel') {
    if (!['Mon', 'Wed', 'Fri'].includes(weekday) || minutes < 20 * 60 + 30) return { skip: 'Outside the Reel schedule.' };
    if (!questionPost || !feedPost(seriesState, date, 'lesson')) return { skip: 'The daily Feed sequence is incomplete; Reel skipped.' };
    const key = `${ACCOUNT_ID}/${date}/reel`;
    if (alreadyPublished(growthState, key)) return { skip: `${date}/reel already published.` };
    return { kind, key, date, questionId: questionPost.questionId };
  }

  if (kind === 'carousel') {
    if (weekday !== 'Sun' || minutes < 20 * 60 + 30) return { skip: 'Outside the weekly carousel schedule.' };
    const key = `${ACCOUNT_ID}/${date}/weekly-carousel`;
    if (alreadyPublished(growthState, key)) return { skip: `${date}/weekly-carousel already published.` };
    const recent = [...(seriesState.posts || [])]
      .filter(post => post.slot === 'question' && post.date <= date)
      .sort((a, b) => b.date.localeCompare(a.date))
      .filter((post, index, posts) => posts.findIndex(other => other.date === post.date) === index)
      .slice(0, 5)
      .reverse();
    if (recent.length < 5) return { skip: 'Fewer than five published daily questions; weekly carousel skipped.' };
    return { kind, key, date, questionIds: recent.map(post => post.questionId) };
  }

  throw new Error(`Unknown Instagram growth kind: ${kind}`);
}

export function reelLanguage(question) {
  return ['tr', 'ar', 'de'][(Number(question.id) - 1) % 3];
}

function localizedAnswer(question, language) {
  const answer = getCorrectAnswer(question);
  return String(question[`a${answer.index + 1}_${language}`] || answer.text).trim();
}

export function storyContent(question, variant, siteUrl = 'https://lid-einbuergerung.de') {
  const answer = getCorrectAnswer(question);
  const filename = `story/frage-${question.id}-${variant}.jpg`;
  const altText = variant === 'question'
    ? `Hinweis auf die heutige Einbürgerungstest-Frage ${question.id}: ${question.q_de}`
    : `Auflösung der heutigen Frage ${question.id}. Richtige Antwort ${answer.label}: ${answer.text}`;
  return { filename, altText, siteUrl: `${siteUrl.replace(/\/$/, '')}/de/frage/${question.id}` };
}

export function reelContent(question, siteUrl = 'https://lid-einbuergerung.de') {
  const language = reelLanguage(question);
  const answer = getCorrectAnswer(question);
  const languageLabel = language === 'tr' ? 'Deutsch + Türkçe' : language === 'ar' ? 'Deutsch + العربية' : 'Deutsch';
  const caption = [
    `Prüfungsfrage #${question.id} in 15 Sekunden 🇩🇪`,
    '',
    question.q_de,
    '',
    `Richtig ist ${answer.label}: ${answer.text}`,
    '',
    `Mehr üben: ${siteUrl.replace(/\/$/, '')}/de/frage/${question.id}`,
    '',
    '#Einbürgerungstest #LebenInDeutschland #DeutschLernen',
  ].join('\n');
  return { filename: `reel/frage-${question.id}.mp4`, caption, language, languageLabel, answer, localizedAnswer: localizedAnswer(question, language) };
}

export function carouselContent(questions, siteUrl = 'https://lid-einbuergerung.de') {
  if (questions.length !== 5) throw new Error('Weekly carousel requires exactly five questions.');
  const ids = questions.map(question => question.id);
  const caption = [
    'Wochenwiederholung: 5 wichtige Fragen 🇩🇪',
    '',
    'Wische durch die Fragen und prüfe, welche Antworten du noch weißt. Speichere den Beitrag für deine nächste Wiederholung.',
    '',
    `Mehr üben: ${siteUrl.replace(/\/$/, '')}/de`,
    '',
    '#Einbürgerungstest #LebenInDeutschland #DeutschLernen #Wochenwiederholung',
  ].join('\n');
  return {
    caption,
    questionIds: ids,
    items: [
      { filename: 'carousel/weekly-cover.jpg', altText: 'Wochenwiederholung mit fünf wichtigen Fragen zum Einbürgerungstest.' },
      ...questions.map(question => ({ filename: `carousel/frage-${question.id}-review.jpg`, altText: `Frage ${question.id}: ${question.q_de}. Richtige Antwort: ${getCorrectAnswer(question).text}` })),
      { filename: 'carousel/review-method.jpg', altText: 'Lernmethode: erst erinnern, dann prüfen und schwierige Fragen wiederholen.' },
      { filename: 'carousel/cta.jpg', altText: 'In der Leben in Deutschland App mit fünf Fragen starten.' },
    ],
  };
}

const text = (x, y, value, size = 42, color = '#11283E', weight = 500, extra = '') => `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}" ${extra}>${escapeXml(value)}</text>`;
const textLines = (values, x, y, size, color = '#11283E', weight = 500, gap = size * 1.25, extra = '') => values.map((value, index) => text(x, y + index * gap, value, size, color, weight, extra)).join('');

function fittedLines(value, width, maxHeight, maxSize = 60, minSize = 28) {
  for (let size = maxSize; size >= minSize; size -= 2) {
    const wrapped = wrapText(value, Math.max(14, Math.floor(width / (size * 0.57))));
    if (wrapped.length * size * 1.25 <= maxHeight) return { wrapped, size };
  }
  throw new Error(`Text does not fit growth card: ${String(value).slice(0, 80)}`);
}

function paragraph(value, x, y, width, height, maxSize = 60, color = '#11283E', weight = 500, align = 'start') {
  const fitted = fittedLines(value, width, height, maxSize);
  const textX = align === 'end' ? x + width : x;
  const extra = align === 'end' ? 'text-anchor="start" direction="rtl" unicode-bidi="plaintext"' : '';
  return textLines(fitted.wrapped, textX, y + fitted.size, fitted.size, color, weight, fitted.size * 1.25, extra);
}

function baseSvg({ width, height, eyebrow, step, body }) {
  const footerY = height - 105;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" fill="#F6F3EC"/><rect width="${width}" height="220" fill="#11283E"/><rect x="64" y="54" width="8" height="106" fill="#F7D44B"/>${textLines(['LEBEN IN', 'DEUTSCHLAND'], 98, 101, 38, '#F6F3EC', 700, 46)}${text(width - 64, 104, eyebrow, 22, '#F7D44B', 700, 'text-anchor="end"')}${step ? text(width - 64, 148, step, 26, '#F6F3EC', 500, 'text-anchor="end"') : ''}${body}<line x1="64" x2="${width - 64}" y1="${footerY - 42}" y2="${footerY - 42}" stroke="#CBCFCB"/>${text(64, footerY, `@${ACCOUNT}`, 29, '#11283E', 700)}${text(64, footerY + 44, 'lid-einbuergerung.de', 25, '#516571')}</svg>`;
}

export async function renderGrowthCard({ type, question, outputPath, language = null }) {
  const story = type.startsWith('story-');
  const width = 1080;
  const height = story || type.startsWith('reel-') ? 1920 : 1350;
  const answer = question ? getCorrectAnswer(question) : null;
  let body = '';
  let eyebrow = 'TÄGLICH LERNEN';
  let step = question ? `FRAGE ${question.id}` : '';

  if (type === 'story-question') {
    eyebrow = 'HEUTIGE FRAGE';
    body += text(64, 355, 'Schon mitgemacht?', 66, '#11283E', 700);
    body += paragraph(question.q_de, 64, 425, 952, 410, 54);
    body += `<rect x="64" y="1010" width="952" height="250" rx="32" fill="#11283E"/>`;
    body += text(540, 1105, 'A, B, C oder D?', 52, '#F7D44B', 700, 'text-anchor="middle"');
    body += text(540, 1175, 'Antworte im heutigen Feed-Beitrag.', 32, '#F6F3EC', 500, 'text-anchor="middle"');
    body += text(64, 1425, '→ Zum Profil', 48, '#D6493E', 700);
  } else if (type === 'story-answer') {
    eyebrow = 'AUFLÖSUNG';
    body += text(64, 365, `Richtig ist ${answer.label}.`, 78, '#11283E', 700);
    body += `<rect x="64" y="485" width="952" height="360" rx="32" fill="#F7D44B"/>`;
    body += paragraph(answer.text, 110, 535, 860, 250, 60, '#11283E', 700);
    body += text(64, 985, 'Warum?', 34, '#516571', 700);
    body += paragraph(question.q_de, 64, 1025, 952, 300, 44);
    body += paragraph('Speichern. Wiederholen. Sicherer werden.', 64, 1410, 952, 120, 38, '#D6493E', 700);
  } else if (type === 'carousel-cover') {
    eyebrow = 'WOCHENRÜCKBLICK'; step = 'START';
    body += textLines(['5 wichtige', 'Prüfungsfragen'], 64, 440, 82, '#11283E', 700, 98);
    body += `<rect x="64" y="700" width="760" height="120" rx="60" fill="#F7D44B"/>`;
    body += text(444, 777, 'WISCHEN & WIEDERHOLEN', 31, '#11283E', 700, 'text-anchor="middle"');
    body += text(64, 1010, 'Wie viele Antworten weißt du noch?', 39, '#516571');
  } else if (type === 'carousel-review') {
    eyebrow = 'WOCHENRÜCKBLICK';
    body += paragraph(question.q_de, 64, 340, 952, 300, 48, '#11283E', 600);
    body += `<rect x="64" y="710" width="952" height="250" rx="26" fill="#11283E"/>`;
    body += text(105, 770, `RICHTIG: ${answer.label}`, 27, '#F7D44B', 700);
    body += paragraph(answer.text, 105, 800, 860, 120, 42, '#F6F3EC', 700);
    body += paragraph('Gewusst? Dann weiterwischen.', 64, 1015, 952, 100, 34, '#516571');
  } else if (type === 'carousel-method') {
    eyebrow = 'LERNMETHODE'; step = '';
    body += textLines(['Erst erinnern.', 'Dann prüfen.'], 64, 415, 74, '#11283E', 700, 91);
    body += textLines(['1  Frage ohne Hilfe beantworten', '2  Lösung kontrollieren', '3  Schwierige Frage morgen wiederholen'], 64, 700, 38, '#516571', 500, 92);
  } else if (type === 'carousel-cta') {
    eyebrow = 'WEITERLERNEN'; step = '';
    body += textLines(['Heute 5 Fragen.', 'Morgen sicherer.'], 64, 430, 76, '#11283E', 700, 94);
    body += `<rect x="64" y="720" width="700" height="120" rx="60" fill="#D6493E"/>`;
    body += text(414, 798, 'JETZT ÜBEN', 39, '#F6F3EC', 700, 'text-anchor="middle"');
    body += text(64, 990, 'App-Link im Profil', 38, '#516571');
  } else if (type === 'reel-hook') {
    eyebrow = '15 SEKUNDEN';
    const hook = language === 'tr' ? 'Bu Almanca soru ne soruyor?' : language === 'ar' ? 'ماذا يعني هذا السؤال الألماني؟' : 'Schaffst du diese Prüfungsfrage?';
    body += paragraph(hook, 64, 500, 952, 520, 78, '#11283E', 700, language === 'ar' ? 'end' : 'start');
    body += text(64, 1250, language === 'tr' ? 'Deutsch + Türkçe' : language === 'ar' ? 'Deutsch + العربية' : 'Deutsch', 40, '#D6493E', 700);
  } else if (type === 'reel-question') {
    eyebrow = 'PRÜFUNGSFRAGE';
    body += paragraph(question.q_de, 64, 420, 952, 600, 60, '#11283E', 650);
    body += `<rect x="64" y="1190" width="952" height="150" rx="28" fill="#11283E"/>`;
    body += text(540, 1284, 'A, B, C oder D?', 48, '#F7D44B', 700, 'text-anchor="middle"');
  } else if (type === 'reel-translation') {
    eyebrow = language === 'tr' ? 'TÜRKÇE AÇIKLAMA' : language === 'ar' ? 'شرح بالعربية' : 'KURZER LERNTIPP';
    const value = language === 'tr' ? question.q_tr : language === 'ar' ? question.q_ar : 'Achte zuerst auf Wörter wie „nicht“, „kein“ und „dürfen“.';
    body += paragraph(value, 64, 450, 952, 690, 64, '#11283E', 650, language === 'ar' ? 'end' : 'start');
    body += text(64, 1280, 'Erst verstehen. Dann antworten.', 38, '#D6493E', 700);
  } else if (type === 'reel-answer') {
    eyebrow = 'AUFLÖSUNG';
    body += text(64, 410, `Antwort ${answer.label}`, 82, '#11283E', 700);
    body += `<rect x="64" y="535" width="952" height="400" rx="34" fill="#F7D44B"/>`;
    body += paragraph(answer.text, 110, 600, 860, 260, 60, '#11283E', 700);
    body += text(64, 1135, 'Mehr Fragen in der App', 48, '#D6493E', 700);
    body += text(64, 1210, 'Link im Profil', 38, '#516571');
  } else {
    throw new Error(`Unknown growth card type: ${type}`);
  }

  const svg = baseSvg({ width, height, eyebrow, step, body });
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 90, mozjpeg: true }).toFile(outputPath);
  return outputPath;
}

export async function growthSourceFingerprint(root) {
  const hash = createHash('sha256');
  for (const file of ['scripts/social/instagram-growth-core.mjs', 'src/data/questions.json']) {
    hash.update(file);
    hash.update(await fs.readFile(path.join(root, file)));
  }
  return hash.digest('hex');
}
