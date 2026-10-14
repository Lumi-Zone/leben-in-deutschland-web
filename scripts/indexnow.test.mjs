import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { INDEXNOW_KEY, ORIGIN, diffManifests, pageFingerprint } from './indexnow.mjs';

const page = (main, title = 'Frage 1') =>
  `<html><head><title>${title}</title><meta name="description" content="Beschreibung"><script src="/_astro/a.js"></script></head>` +
  `<body><header>Navigation</header><main>${main}</main><footer>© 2026</footer></body></html>`;

test('key file is published next to the site root', async () => {
  const key = await readFile(new URL(`../public/${INDEXNOW_KEY}.txt`, import.meta.url), 'utf8');
  assert.equal(key.trim(), INDEXNOW_KEY);
  assert.match(INDEXNOW_KEY, /^[a-f0-9]{32}$/);
});

test('fingerprint ignores markup, asset hashes and island props', () => {
  const before = page('<astro-island component-url="/_astro/Quiz.abc.js" props="{}"><p class="a">Antwort</p></astro-island>');
  const after = page('<astro-island component-url="/_astro/Quiz.xyz.js" props="{&quot;x&quot;:1}"><p class="b">Antwort</p></astro-island><script>window.x=1</script>');
  assert.equal(pageFingerprint(before), pageFingerprint(after));
});

test('fingerprint changes when visible content or title changes', () => {
  const base = pageFingerprint(page('<p>Antwort</p>'));
  assert.notEqual(base, pageFingerprint(page('<p>Neue Antwort</p>')));
  assert.notEqual(base, pageFingerprint(page('<p>Antwort</p>', 'Frage 2')));
});

test('fingerprint ignores content outside <main>', () => {
  assert.equal(pageFingerprint(page('<p>x</p>')), pageFingerprint(page('<p>x</p>').replace('Navigation', 'Menü')));
});

test('diff reports new, changed and removed pages only', () => {
  const previous = { version: 1, pages: { '/de/': 'a', '/de/frage/1/': 'b', '/de/alt/': 'c' } };
  const current = { version: 1, pages: { '/de/': 'a', '/de/frage/1/': 'B', '/de/neu/': 'd' } };
  assert.deepEqual(diffManifests(previous, current).sort(), [
    `${ORIGIN}/de/alt/`,
    `${ORIGIN}/de/frage/1/`,
    `${ORIGIN}/de/neu/`,
  ]);
});

test('first deploy without a live manifest submits every page', () => {
  const current = { version: 1, pages: { '/de/': 'a', '/en/': 'b' } };
  assert.equal(diffManifests({ version: 1, pages: {} }, current).length, 2);
});
