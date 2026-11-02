import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

import { GERMAN_STATES } from '../../src/data/germanStates.ts';
import { renderQrSvg } from '../../src/utils/qrcode.ts';
import {
  PDF_LANGUAGES,
  appUrl,
  buildCatalogEntries,
  catalogHash,
  pdfFileName,
  renderCatalogHtml,
} from './catalog-core.mjs';

// Local tool, not part of the site build: run `npm run pdf:catalog` after the
// questions change, and commit the PDFs and src/data/questionPdfs.json. The
// postbuild test fails until then. Needs Node 24 and Google Chrome.
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUTPUT_DIRECTORY = 'public/downloads';
const FONT_FILES = [
  ...['latin', 'latin-ext', 'cyrillic'].flatMap((subset) => [400, 700].map((weight) => ['Noto Sans', weight, `noto-sans/files/noto-sans-${subset}-${weight}-normal.woff2`])),
  ['Noto Sans Arabic', 400, 'noto-sans-arabic/files/noto-sans-arabic-arabic-400-normal.woff2'],
  ['Noto Sans Arabic', 700, 'noto-sans-arabic/files/noto-sans-arabic-arabic-700-normal.woff2'],
];

// Subsets of one family need a unicode-range, or the last declared file would win for every character.
const UNICODE_RANGES = {
  latin: 'U+0000-00FF,U+2000-206F,U+20AC',
  'latin-ext': 'U+0100-02AF,U+1E00-1EFF',
  cyrillic: 'U+0400-052F,U+2116',
  arabic: 'U+0600-06FF,U+0750-077F,U+FB50-FDFF,U+FE70-FEFF',
};

function fontFaces() {
  return FONT_FILES.map(([family, weight, file]) => {
    const url = pathToFileURL(path.resolve('node_modules/@fontsource', file)).href;
    const subset = file.match(/-(latin-ext|latin|cyrillic|arabic)-\d+-normal/)[1];
    return `@font-face { font-family: '${family}'; font-weight: ${weight}; src: url('${url}') format('woff2'); unicode-range: ${UNICODE_RANGES[subset]}; }`;
  }).join('\n');
}

/** Print-sized JPEGs on white: the source PNGs have alpha and would otherwise dominate the file size. */
async function prepareImages(entries, directory) {
  const images = {};
  for (const image of new Set(entries.map((entry) => entry.image).filter(Boolean))) {
    const target = path.join(directory, `${path.basename(image, '.png')}.jpg`);
    const { width, height } = await sharp(image).metadata();
    await sharp(image).flatten({ background: '#ffffff' }).jpeg({ quality: 82, mozjpeg: true }).toFile(target);
    images[image] = { src: pathToFileURL(target).href, wide: width / height >= 1.6 };
  }
  return images;
}

function startChrome(profile) {
  const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
  const endpoint = new Promise((resolve, reject) => {
    let output = '';
    chrome.stderr.on('data', (chunk) => {
      output += chunk;
      const match = output.match(/ws:\/\/\S+/);
      if (match) resolve(match[0]);
    });
    chrome.on('exit', () => reject(new Error(`Chrome exited early:\n${output}`)));
  });
  return { chrome, endpoint };
}

/** Minimal CDP client; the document outline and tagged PDF are not reachable through --print-to-pdf. */
async function connect(endpoint) {
  const socket = new WebSocket(endpoint);
  await new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = reject;
  });
  let nextId = 0;
  const pending = new Map();
  const listeners = new Map();
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.id !== undefined) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    } else {
      listeners.get(message.method)?.();
    }
  };
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const once = (method) => new Promise((resolve) => listeners.set(method, resolve));
  return { send, once, close: () => socket.close() };
}

async function printPdf(client, htmlFile) {
  const { targetId } = await client.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await client.send('Target.attachToTarget', { targetId, flatten: true });
  await client.send('Page.enable', {}, sessionId);
  const loaded = client.once('Page.loadEventFired');
  await client.send('Page.navigate', { url: pathToFileURL(htmlFile).href }, sessionId);
  await loaded;
  await client.send('Runtime.evaluate', { expression: 'document.fonts.ready', awaitPromise: true }, sessionId);
  const { data } = await client.send('Page.printToPDF', {
    preferCSSPageSize: true,
    printBackground: true,
    generateTaggedPDF: true,
    generateDocumentOutline: true,
  }, sessionId);
  await client.send('Target.closeTarget', { targetId });
  return Buffer.from(data, 'base64');
}

function countPages(pdf) {
  const counts = [...pdf.toString('latin1').matchAll(/\/Type\s*\/Pages[^>]*?\/Count\s+(\d+)/g)].map((match) => Number(match[1]));
  if (!counts.length) throw new Error('Could not read the page count');
  return Math.max(...counts);
}

const siteQuestions = JSON.parse(await readFile('src/data/questions.json', 'utf8'));
const official = JSON.parse(await readFile('scripts/pdf/official-questions.de.json', 'utf8'));
const entries = buildCatalogEntries(siteQuestions, official);

const workDirectory = await mkdtemp(path.join(tmpdir(), 'lid-catalog-'));
const { chrome, endpoint } = startChrome(path.join(workDirectory, 'profile'));
try {
  await mkdir(OUTPUT_DIRECTORY, { recursive: true });
  const images = await prepareImages(entries, workDirectory);
  const client = await connect(await endpoint);
  const files = {};
  for (const lang of PDF_LANGUAGES) {
    const qrSvg = renderQrSvg(appUrl(lang), { title: 'App', dark: '#182d26', light: '#eaf3ee' });
    const localNames = Object.fromEntries(GERMAN_STATES.map((state) => [state.name, state.localNames[lang]]));
    const html = renderCatalogHtml({ lang, entries, official, images, fonts: fontFaces(), qrSvg, localNames });
    const htmlFile = path.join(workDirectory, `${lang}.html`);
    await writeFile(htmlFile, html);
    const pdf = await printPdf(client, htmlFile);
    const target = path.join(OUTPUT_DIRECTORY, pdfFileName(lang));
    await writeFile(target, pdf);
    files[lang] = { path: `/downloads/${pdfFileName(lang)}`, bytes: (await stat(target)).size, pages: countPages(pdf) };
    console.log(`${target}: ${files[lang].pages} pages, ${(files[lang].bytes / 1048576).toFixed(1)} MB`);
  }
  client.close();
  const metadata = {
    catalogueStand: official.catalogueStand,
    answersCheckedOn: official.answersCheckedOn,
    sourceHash: catalogHash(entries, official),
    files,
  };
  await writeFile('src/data/questionPdfs.json', `${JSON.stringify(metadata, null, 2)}\n`);
} finally {
  chrome.kill();
  await rm(workDirectory, { recursive: true, force: true, maxRetries: 3 });
}
