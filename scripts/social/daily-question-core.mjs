import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export const DEFAULT_TIME_ZONE = 'Europe/Berlin';
export const DEFAULT_ACCOUNT_USERNAME = '300Fragen';
export const DEFAULT_SITE_URL = 'https://lid-einbuergerung.de';
export const STATE_VERSION = 1;

const OPTION_KEYS = ['a1_de', 'a2_de', 'a3_de', 'a4_de'];
const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function wrapText(value, maxCharacters) {
  const words = String(value).trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [''];

  const lines = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxCharacters || current.length === 0) {
      current = candidate;
      continue;
    }
    lines.push(current);
    current = word;
  }

  if (current) lines.push(current);
  return lines;
}

export function getQuestionOptions(question) {
  return OPTION_KEYS.map((key) => String(question[key] || '').trim());
}

export function getCorrectAnswer(question) {
  const normalized = String(question.solution || '').trim().toLowerCase();
  const index = normalized.charCodeAt(0) - 97;
  if (!Number.isInteger(index) || index < 0 || index >= OPTION_LABELS.length) {
    throw new Error(`Frage #${question.id}: ungültige Lösung "${question.solution}".`);
  }

  return {
    index,
    label: OPTION_LABELS[index],
    text: getQuestionOptions(question)[index],
  };
}

export function getEligibleQuestions(questions) {
  return questions
    .filter((question) => question.type === 'General')
    .filter((question) => question.q_de && getQuestionOptions(question).every(Boolean))
    .sort((left, right) => left.id - right.id);
}

export function createEmptyState() {
  return {
    version: STATE_VERSION,
    cycle: 1,
    posts: [],
    inFlight: null,
  };
}

export function selectNextQuestion(questions, state, requestedQuestionId = null) {
  const eligible = getEligibleQuestions(questions);
  if (eligible.length === 0) throw new Error('Keine veröffentlichbaren Fragen gefunden.');

  if (requestedQuestionId !== null) {
    const requested = eligible.find((question) => question.id === requestedQuestionId);
    if (!requested) {
      throw new Error(
        `Frage #${requestedQuestionId} ist keine veröffentlichbare allgemeine Frage.`,
      );
    }
    return { question: requested, cycle: state.cycle || 1 };
  }

  let cycle = state.cycle || 1;
  const usedIds = new Set(
    state.posts
      .filter((post) => (post.cycle || 1) === cycle)
      .map((post) => post.questionId),
  );
  let question = eligible.find((candidate) => !usedIds.has(candidate.id));

  if (!question) {
    cycle += 1;
    question = eligible[0];
  }

  return { question, cycle };
}

export function berlinDate(date = new Date()) {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: DEFAULT_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function berlinMinutes(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: DEFAULT_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return Number.parseInt(values.hour, 10) * 60 + Number.parseInt(values.minute, 10);
}

export function parseAutomationSchedule(automationToml) {
  const rule = automationToml.match(/^rrule\s*=\s*"([^"]+)"/m)?.[1];
  const hour = Number.parseInt(rule?.match(/(?:^|;)BYHOUR=(\d{1,2})(?:;|$)/)?.[1] || '', 10);
  const minute = Number.parseInt(rule?.match(/(?:^|;)BYMINUTE=(\d{1,2})(?:;|$)/)?.[1] || '', 10);

  if (!Number.isInteger(hour) || hour < 6 || hour > 23 ||
      !Number.isInteger(minute) || minute < 0 || minute > 59) {
    throw new Error('X paylaşım otomasyonunda geçerli bir 06:00–23:59 saati bulunamadı.');
  }

  return { hour, minute, totalMinutes: hour * 60 + minute };
}

export function shouldRunCatchUp({ state, today, currentMinutes, scheduledMinutes }) {
  if (state.posts.some((post) => post.date === today)) return false;
  return currentMinutes >= scheduledMinutes && currentMinutes <= 23 * 60 + 59;
}

export function buildPostText(question, siteUrl = DEFAULT_SITE_URL) {
  const url = `${siteUrl.replace(/\/$/, '')}/de/frage/${question.id}`;
  return [
    `Tagesfrage #${question.id} 🇩🇪`,
    '',
    'Welche Antwort ist richtig? Schreib A, B, C oder D in die Kommentare.',
    '',
    `👉 ${url}`,
    '',
    '#Einbürgerungstest #LebenInDeutschland',
  ].join('\n');
}

export function buildAnswerText(question) {
  const answer = getCorrectAnswer(question);
  return `Auflösung zu Frage #${question.id}: ${answer.label} – ${answer.text} ✅`;
}

export function buildAltText(question) {
  const options = getQuestionOptions(question)
    .map((option, index) => `${OPTION_LABELS[index]}: ${option}`)
    .join(' ');
  return `Tagesfrage ${question.id}. ${question.q_de} ${options}`;
}

function renderTextLines(lines, { x, y, lineHeight, fontSize, weight = 500, fill = '#0f172a' }) {
  return `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="${weight}" fill="${fill}">${lines
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join('')}</text>`;
}

function calculateOptionLayout(options, top, bottom) {
  const candidates = [30, 28, 26, 24, 22];

  for (const fontSize of candidates) {
    const maxCharacters = Math.round(52 * (28 / fontSize));
    const lineHeight = Math.round(fontSize * 1.24);
    const wrapped = options.map((option) => wrapText(option, maxCharacters));
    const heights = wrapped.map((lines) => Math.max(92, lines.length * lineHeight + 42));
    const gaps = 14 * (options.length - 1);
    if (heights.reduce((sum, height) => sum + height, 0) + gaps <= bottom - top) {
      return { fontSize, lineHeight, wrapped, heights, gap: 14 };
    }
  }

  const fontSize = 20;
  const lineHeight = 25;
  const wrapped = options.map((option) => wrapText(option, 68));
  const available = bottom - top - 10 * (options.length - 1);
  const naturalHeights = wrapped.map((lines) => Math.max(82, lines.length * lineHeight + 34));
  const scale = Math.min(1, available / naturalHeights.reduce((sum, height) => sum + height, 0));
  return {
    fontSize,
    lineHeight,
    wrapped,
    heights: naturalHeights.map((height) => Math.floor(height * scale)),
    gap: 10,
  };
}

export async function renderQuestionCard({ question, logoPath, outputPath, questionImagePath = null }) {
  const logo = await fs.readFile(logoPath);
  const logoData = `data:image/png;base64,${logo.toString('base64')}`;
  const questionImage = questionImagePath ? await fs.readFile(questionImagePath) : null;
  const questionImageData = questionImage
    ? `data:image/png;base64,${questionImage.toString('base64')}`
    : null;
  const hasQuestionImage = Boolean(questionImageData);
  const canvasHeight = hasQuestionImage ? 1350 : 1080;
  const questionFontSize = question.q_de.length > 210 ? 29 : question.q_de.length > 165 ? 33 : question.q_de.length > 115 ? 36 : 40;
  const questionMaxCharacters = questionFontSize <= 29 ? 57 : questionFontSize <= 33 ? 49 : questionFontSize <= 36 ? 45 : 40;
  const questionLineHeight = Math.round(questionFontSize * 1.18);
  const questionLines = wrapText(question.q_de, questionMaxCharacters);
  const questionTop = 202;
  const questionHeight = Math.max(hasQuestionImage ? 130 : 150, questionLines.length * questionLineHeight + 58);
  const questionBottom = questionTop + questionHeight;
  const imageTop = questionBottom + 18;
  const imageHeight = hasQuestionImage ? 310 : 0;
  const imageBottom = imageTop + imageHeight;
  const options = getQuestionOptions(question);
  const optionTop = hasQuestionImage ? imageBottom + 18 : questionBottom + 22;
  const optionBottom = canvasHeight - 128;
  const optionLayout = calculateOptionLayout(options, optionTop, optionBottom);

  let optionY = optionTop;
  const optionRows = optionLayout.wrapped.map((lines, index) => {
    const height = optionLayout.heights[index];
    const circleY = optionY + height / 2;
    const textBlockHeight = lines.length * optionLayout.lineHeight;
    const textY = optionY + (height - textBlockHeight) / 2 + optionLayout.fontSize;
    const row = `
      <rect x="62" y="${optionY}" width="956" height="${height}" rx="24" fill="#ffffff" fill-opacity="0.98" stroke="#dbe7ff" stroke-width="2"/>
      <circle cx="116" cy="${circleY}" r="30" fill="#eff6ff" stroke="#2563eb" stroke-width="3"/>
      <text x="116" y="${circleY + 10}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="800" fill="#1d4ed8">${OPTION_LABELS[index]}</text>
      ${renderTextLines(lines, {
        x: 166,
        y: textY,
        lineHeight: optionLayout.lineHeight,
        fontSize: optionLayout.fontSize,
        weight: 600,
      })}`;
    optionY += height + optionLayout.gap;
    return row;
  }).join('');

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="1080" height="${canvasHeight}" viewBox="0 0 1080 ${canvasHeight}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1080" y2="1080" gradientUnits="userSpaceOnUse">
        <stop stop-color="#10275f"/>
        <stop offset="0.55" stop-color="#1d4ed8"/>
        <stop offset="1" stop-color="#0ea5e9"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#0f172a" flood-opacity="0.22"/>
      </filter>
      <clipPath id="logoClip"><rect x="64" y="44" width="116" height="116" rx="28"/></clipPath>
    </defs>
    <rect width="1080" height="${canvasHeight}" fill="url(#bg)"/>
    <circle cx="920" cy="90" r="190" fill="#ffffff" fill-opacity="0.07"/>
    <circle cx="75" cy="${canvasHeight - 100}" r="210" fill="#ffffff" fill-opacity="0.05"/>
    <rect x="0" y="0" width="360" height="10" fill="#151515"/>
    <rect x="360" y="0" width="360" height="10" fill="#dd1e2f"/>
    <rect x="720" y="0" width="360" height="10" fill="#f6c500"/>

    <rect x="64" y="44" width="116" height="116" rx="28" fill="#ffffff"/>
    <image href="${logoData}" x="64" y="44" width="116" height="116" preserveAspectRatio="xMidYMid slice" clip-path="url(#logoClip)"/>
    <text x="204" y="86" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#dbeafe">LEBEN IN DEUTSCHLAND</text>
    <text x="204" y="130" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="800" fill="#ffffff">Tagesfrage #${question.id}</text>
    <text x="1018" y="91" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="#ffffff">@300Fragen</text>
    <text x="1018" y="128" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="500" fill="#bfdbfe">Welche Antwort ist richtig?</text>

    <g filter="url(#shadow)">
      <rect x="62" y="${questionTop}" width="956" height="${questionHeight}" rx="30" fill="#f8fbff"/>
    </g>
    <rect x="62" y="${questionTop}" width="10" height="${questionHeight}" rx="5" fill="#f6c500"/>
    ${renderTextLines(questionLines, {
      x: 104,
      y: questionTop + 54,
      lineHeight: questionLineHeight,
      fontSize: questionFontSize,
      weight: 800,
    })}
    ${hasQuestionImage ? `
    <rect x="62" y="${imageTop}" width="956" height="${imageHeight}" rx="26" fill="#ffffff" stroke="#dbe7ff" stroke-width="2"/>
    <image href="${questionImageData}" x="82" y="${imageTop + 14}" width="916" height="${imageHeight - 28}" preserveAspectRatio="xMidYMid meet"/>
    ` : ''}
    ${optionRows}

    <text x="62" y="${canvasHeight - 52}" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="#ffffff">Antwort in die Kommentare: A, B, C oder D</text>
    <text x="1018" y="${canvasHeight - 52}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="#ffffff">lid-einbuergerung.de</text>
  </svg>`;

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(outputPath);
  return outputPath;
}

export async function loadState(statePath) {
  try {
    const parsed = JSON.parse(await fs.readFile(statePath, 'utf8'));
    if (parsed.version !== STATE_VERSION || !Array.isArray(parsed.posts)) {
      throw new Error('Unbekanntes Statusformat.');
    }
    return parsed;
  } catch (error) {
    if (error.code === 'ENOENT') return createEmptyState();
    throw error;
  }
}

export async function saveState(statePath, state) {
  await fs.mkdir(path.dirname(statePath), { recursive: true });
  const temporaryPath = `${statePath}.tmp`;
  await fs.writeFile(temporaryPath, `${JSON.stringify(state, null, 2)}\n`, { mode: 0o600 });
  await fs.rename(temporaryPath, statePath);
}

export async function loadEnvFile(envPath) {
  try {
    const content = await fs.readFile(envPath, 'utf8');
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const separator = line.indexOf('=');
      if (separator < 1) continue;
      const key = line.slice(0, separator).trim();
      let value = line.slice(separator + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}
