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
  const extra = align === 'end' ? 'text-anchor="end"' : '';
  return textLines(fitted.wrapped, textX, y + fitted.size, fitted.size, color, weight, fitted.size * 1.25, extra);
}

function baseSvg({ width, height, eyebrow, step, body }) {
  const footerY = height - 105;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" fill="#F6F3EC"/><rect width="${width}" height="220" fill="#11283E"/><rect x="64" y="54" width="8" height="106" fill="#F7D44B"/>${textLines(['LEBEN IN', 'DEUTSCHLAND'], 98, 101, 38, '#F6F3EC', 700, 46)}${text(width - 64, 104, eyebrow, 22, '#F7D44B', 700, 'text-anchor="end"')}${step ? text(width - 64, 148, step, 26, '#F6F3EC', 500, 'text-anchor="end"') : ''}${body}<line x1="64" x2="${width - 64}" y1="${footerY - 42}" y2="${footerY - 42}" stroke="#CBCFCB"/>${text(64, footerY, `@${ACCOUNT}`, 29, '#11283E', 700)}${text(64, footerY + 44, 'lid-einbuergerung.de', 25, '#516571')}</svg>`;
}

function storyOptionCard({ label, value, y, correct = false, reveal = false }) {
  const height = 208;
  const fitted = fittedLines(value, 760, 148, 38, 22);
  const gap = fitted.size * 1.18;
  const textHeight = fitted.size + (fitted.wrapped.length - 1) * gap;
  const firstBaseline = y + (height - textHeight) / 2 + fitted.size * 0.82;
  const fill = correct ? '#F7D44B' : '#F9F7F1';
  const border = correct ? '#F7D44B' : '#DDE5E8';
  const circle = correct ? '#11283E' : '#173A55';
  const opacity = reveal && !correct ? 0.72 : 1;
  return `<g opacity="${opacity}" filter="url(#story-shadow)"><rect x="64" y="${y}" width="952" height="${height}" rx="30" fill="${fill}" stroke="${border}" stroke-width="2"/><circle cx="132" cy="${y + height / 2}" r="43" fill="${circle}"/>${text(132, y + height / 2 + 14, label, 38, '#FFFFFF', 700, 'text-anchor="middle"')}${textLines(fitted.wrapped, 205, firstBaseline, fitted.size, '#11283E', correct ? 700 : 600, gap)}</g>`;
}

export function storySvg({ question, answer, reveal }) {
  const labels = ['A', 'B', 'C', 'D'];
  const options = labels.map((label, index) => ({ label, value: String(question[`a${index + 1}_de`] || '') }));
  const optionBody = options.map((option, index) => storyOptionCard({
    ...option,
    y: 710 + index * 230,
    correct: reveal && option.label === answer.label,
    reveal,
  })).join('');
  const pill = reveal ? `LÖSUNG ${answer.label}` : `FRAGE ${question.id}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920"><defs><linearGradient id="story-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0D263A"/><stop offset="0.58" stop-color="#153A55"/><stop offset="1" stop-color="#0F2B42"/></linearGradient><filter id="story-shadow" x="-10%" y="-20%" width="120%" height="150%"><feDropShadow dx="0" dy="12" stdDeviation="15" flood-color="#061521" flood-opacity="0.24"/></filter></defs><rect width="1080" height="1920" fill="url(#story-bg)"/><circle cx="1030" cy="250" r="330" fill="#F7D44B" opacity="0.07"/><circle cx="-110" cy="1660" r="360" fill="#D6493E" opacity="0.08"/><rect x="64" y="72" width="8" height="78" rx="4" fill="#F7D44B"/>${textLines(['LEBEN IN', 'DEUTSCHLAND'], 94, 103, 31, '#F6F3EC', 700, 38)}<rect x="798" y="78" width="218" height="62" rx="31" fill="${reveal ? '#D6493E' : '#F7D44B'}"/>${text(907, 119, pill, 25, reveal ? '#FFFFFF' : '#11283E', 700, 'text-anchor="middle"')}<rect x="64" y="225" width="74" height="8" rx="4" fill="#D6493E"/>${paragraph(question.q_de, 64, 258, 900, 390, 60, '#F6F3EC', 700)}${optionBody}${text(64, 1815, `@${ACCOUNT}`, 27, '#F6F3EC', 700)}<rect x="910" y="1794" width="34" height="10" rx="5" fill="#F6F3EC"/><rect x="946" y="1794" width="34" height="10" rx="5" fill="#D6493E"/><rect x="982" y="1794" width="34" height="10" rx="5" fill="#F7D44B"/></svg>`;
}

function reelProgress(active) {
  return [0, 1, 2, 3].map(index => `<rect x="${760 + index * 66}" y="1797" width="52" height="10" rx="5" fill="${index === active ? '#F7D44B' : '#F6F3EC'}" opacity="${index === active ? 1 : 0.34}"/>`).join('');
}

function reelShell({ badge, body, active, accent = '#F7D44B', badgeText = '#11283E' }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920"><defs><linearGradient id="reel-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0D263A"/><stop offset="0.58" stop-color="#153A55"/><stop offset="1" stop-color="#0F2B42"/></linearGradient><filter id="reel-shadow" x="-10%" y="-20%" width="120%" height="150%"><feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#061521" flood-opacity="0.28"/></filter></defs><rect width="1080" height="1920" fill="url(#reel-bg)"/><circle cx="990" cy="260" r="350" fill="#F7D44B" opacity="0.07"/><circle cx="-120" cy="1650" r="390" fill="#D6493E" opacity="0.08"/><rect x="64" y="72" width="8" height="78" rx="4" fill="#F7D44B"/>${textLines(['LEBEN IN', 'DEUTSCHLAND'], 94, 103, 31, '#F6F3EC', 700, 38)}<rect x="760" y="78" width="256" height="62" rx="31" fill="${accent}"/>${text(888, 119, badge, 24, badgeText, 700, 'text-anchor="middle"')}${body}${text(64, 1815, `@${ACCOUNT}`, 27, '#F6F3EC', 700)}${reelProgress(active)}</svg>`;
}

export function reelFrameSvg({ type, question, answer, language }) {
  if (type === 'reel-question') return storySvg({ question, answer, reveal: false });
  if (type === 'reel-answer') return storySvg({ question, answer, reveal: true });
  if (type === 'reel-hook') {
    const hook = language === 'tr'
      ? 'Bu soruyu 15 saniyede çözebilir misin?'
      : language === 'ar'
        ? 'هل يمكنك حل هذا السؤال خلال 15 ثانية؟'
        : 'Schaffst du diese Frage in 15 Sekunden?';
    const languageLabel = language === 'tr' ? 'DEUTSCH + TÜRKÇE' : language === 'ar' ? 'DEUTSCH + العربية' : 'DEUTSCH';
    const align = language === 'ar' ? 'end' : 'start';
    const body = `<rect x="64" y="256" width="108" height="10" rx="5" fill="#D6493E"/>${paragraph(hook, 64, 320, 900, 520, 82, '#F6F3EC', 700, align)}<g filter="url(#reel-shadow)"><circle cx="540" cy="1195" r="245" fill="#F7D44B"/><circle cx="540" cy="1195" r="205" fill="#11283E"/>${text(540, 1190, '15', 176, '#F7D44B', 700, 'text-anchor="middle"')}${text(540, 1280, 'SEKUNDEN', 35, '#F6F3EC', 700, 'text-anchor="middle"')}</g>`;
    return reelShell({ badge: languageLabel, body, active: 0 });
  }
  if (type === 'reel-translation') {
    const value = language === 'tr'
      ? question.q_tr
      : language === 'ar'
        ? question.q_ar
        : 'Achte auf Schlüsselwörter wie „nicht“, „kein“ und „dürfen“.';
    const badge = language === 'tr' ? 'TÜRKÇE' : language === 'ar' ? 'العربية' : 'LERNTIPP';
    const align = language === 'ar' ? 'end' : 'start';
    const body = `<rect x="64" y="256" width="108" height="10" rx="5" fill="#D6493E"/><g filter="url(#reel-shadow)"><rect x="64" y="330" width="952" height="1030" rx="46" fill="#F9F7F1"/><rect x="64" y="330" width="20" height="1030" rx="10" fill="#F7D44B"/>${paragraph(value, 120, 450, 840, 700, 66, '#11283E', 700, align)}</g>`;
    return reelShell({ badge, body, active: 2, accent: language === 'ar' ? '#D6493E' : '#F7D44B', badgeText: language === 'ar' ? '#FFFFFF' : '#11283E' });
  }
  throw new Error(`Unknown Reel frame type: ${type}`);
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
    body = null;
  } else if (type === 'story-answer') {
    body = null;
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
  } else if (type.startsWith('reel-')) {
    body = null;
  } else {
    throw new Error(`Unknown growth card type: ${type}`);
  }

  const svg = type.startsWith('reel-')
    ? reelFrameSvg({ type, question, answer, language })
    : type === 'story-question'
      ? storySvg({ question, answer, reveal: false })
      : type === 'story-answer'
        ? storySvg({ question, answer, reveal: true })
        : baseSvg({ width, height, eyebrow, step, body });
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
