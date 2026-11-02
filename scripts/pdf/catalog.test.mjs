import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

import {
  PDF_LANGUAGES,
  appUrl,
  buildCatalogEntries,
  catalogHash,
  pdfCopy,
  renderCatalogHtml,
} from './catalog-core.mjs';

const siteQuestions = JSON.parse(await readFile('src/data/questions.json', 'utf8'));
const official = JSON.parse(await readFile('scripts/pdf/official-questions.de.json', 'utf8'));
const metadata = JSON.parse(await readFile('src/data/questionPdfs.json', 'utf8'));
const entries = buildCatalogEntries(siteQuestions, official);

function render(lang) {
  const images = Object.fromEntries(entries.filter((entry) => entry.image).map((entry) => [entry.image, { src: 'image.jpg', wide: true }]));
  const localNames = Object.fromEntries(entries.map((entry) => [entry.state, `local ${entry.state}`]));
  return renderCatalogHtml({ lang, entries, official, images, fonts: '', qrSvg: '<svg></svg>', localNames });
}

test('the catalogue holds 300 general questions and 10 for each of the 16 states', () => {
  assert.equal(entries.length, 460);
  assert.equal(entries.filter((entry) => !entry.state).length, 300);
  const states = new Map();
  for (const entry of entries.filter((item) => item.state)) states.set(entry.state, [...(states.get(entry.state) ?? []), entry.number]);
  assert.equal(states.size, 16);
  for (const numbers of states.values()) assert.deepEqual(numbers, [301, 302, 303, 304, 305, 306, 307, 308, 309, 310]);
});

test('a site answer that contradicts the official answer stops the run', () => {
  const changed = siteQuestions.map((question) => (question.id === 1 ? { ...question, solution: 'a' } : question));
  assert.throws(() => buildCatalogEntries(changed, official), /Question 1/);
});

test('every question has four options and one correct answer in every language', () => {
  for (const entry of entries) {
    assert.ok(entry.correct >= 0 && entry.correct < 4, `question ${entry.id}`);
    for (const lang of PDF_LANGUAGES) {
      assert.ok(entry[lang].question.trim(), `question ${entry.id} ${lang}`);
      assert.equal(entry[lang].options.filter((option) => option.trim()).length, 4, `options ${entry.id} ${lang}`);
    }
  }
});

test('different German options stay different in every translation', () => {
  for (const entry of entries) {
    if (new Set(entry.de.options).size < 4) continue;
    for (const lang of PDF_LANGUAGES) {
      assert.equal(new Set(entry[lang].options).size, 4, `question ${entry.id} ${lang}: ${entry[lang].options.join(' | ')}`);
    }
  }
});

test('picture answers carry a label instead of a bare digit', () => {
  for (const entry of entries.filter((item) => /^(Bild|Nummer|Stimmzettel) \d$/.test(item.de.options[0]))) {
    for (const lang of PDF_LANGUAGES) assert.ok(entry[lang].options.every((option) => !/^\d$/.test(option)), `question ${entry.id} ${lang}`);
  }
});

for (const lang of PDF_LANGUAGES) {
  test(`${lang}: the printed document marks exactly one answer per question`, () => {
    const html = render(lang);
    const blocks = html.split('<article class="q"').slice(1);
    assert.equal(blocks.length, 460);
    const markers = lang === 'de' ? /<li class="ok">/g : /<div class="row ok">/g;
    blocks.forEach((block, index) => assert.equal(block.match(markers)?.length, 1, `article ${index}`));
  });

  test(`${lang}: the document carries the app code, sources and independence note`, () => {
    const html = render(lang);
    assert.ok(html.includes(appUrl(lang).replaceAll('&', '&amp;')));
    assert.ok(html.includes(pdfCopy[lang].independence));
    assert.ok(html.includes('BAMF'));
  });

  test(`${lang}: the published PDF matches its metadata`, async () => {
    const file = metadata.files[lang];
    const info = await stat(`public${file.path}`);
    assert.equal(info.size, file.bytes);
    assert.ok(file.pages > 30, 'unexpectedly short PDF');
  });
}

test('published PDFs are in step with the questions; run `npm run pdf:catalog` if this fails', () => {
  assert.equal(metadata.sourceHash, catalogHash(entries, official));
  assert.equal(metadata.answersCheckedOn, official.answersCheckedOn);
});
