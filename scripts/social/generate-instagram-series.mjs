import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { getEligibleQuestions } from './daily-question-core.mjs';
import { SLOTS, contentFor, renderSeriesCard, sourceFingerprint } from './instagram-series-core.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const output = path.join(root, 'public/instagram/series-v1');
const pool = getEligibleQuestions(JSON.parse(await fs.readFile(path.join(root, 'src/data/questions.json'), 'utf8')));
const manifest = { sourceFingerprint: await sourceFingerprint(root), version: 1, account: 'einbuergerungstest2026', schedule: SLOTS, images: {} };
for (const question of pool) {
  for (const slot of SLOTS) {
    const { filename } = contentFor(question, slot.id);
    const outputPath = path.join(output, filename);
    await renderSeriesCard({ question, slot: slot.id, outputPath, imageDirectory: path.join(root, 'public/question-images/general') });
    manifest.images[filename] = createHash('sha256').update(await fs.readFile(outputPath)).digest('hex');
  }
}
await fs.writeFile(path.join(output, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`${Object.keys(manifest.images).length} German Instagram cards generated (08:00, 16:00, 18:00 Europe/Berlin).`);
