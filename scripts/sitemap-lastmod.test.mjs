import assert from 'node:assert/strict';
import test from 'node:test';

import {
  addLastModifiedToSitemap,
  extractLastModified,
  normalizeLastModified,
} from './sitemap-lastmod.mjs';

test('normalizes timestamps while preserving honest date-only values', () => {
  assert.equal(normalizeLastModified('2026-10-08'), '2026-10-08');
  assert.equal(normalizeLastModified('2026-10-08T09:15:00+02:00'), '2026-10-08T07:15:00.000Z');
  assert.equal(normalizeLastModified('not-a-date'), undefined);
});

test('extracts the newest explicit page modification date', () => {
  const html = `
    <meta property="article:modified_time" content="2026-10-08T00:00:00.000Z">
    <script type="application/ld+json">{"dateModified":"2026-10-21"}</script>
  `;
  assert.equal(extractLastModified(html), '2026-10-21');
});

test('does not invent freshness for pages without modification metadata', () => {
  assert.equal(extractLastModified('<html><head><title>Stable page</title></head></html>'), undefined);
});

test('adds lastmod only to matching sitemap URLs and preserves existing values', () => {
  const xml = '<urlset>'
    + '<url><loc>https://lid-einbuergerung.de/de/blog/a/</loc></url>'
    + '<url><loc>https://lid-einbuergerung.de/de/</loc></url>'
    + '<url><loc>https://lid-einbuergerung.de/de/blog/b/</loc><lastmod>2026-01-01</lastmod></url>'
    + '</urlset>';
  const dates = new Map([
    ['https://lid-einbuergerung.de/de/blog/a/', '2026-10-21'],
    ['https://lid-einbuergerung.de/de/blog/b/', '2026-10-22'],
  ]);

  assert.equal(
    addLastModifiedToSitemap(xml, dates),
    '<urlset>'
      + '<url><loc>https://lid-einbuergerung.de/de/blog/a/</loc><lastmod>2026-10-21</lastmod></url>'
      + '<url><loc>https://lid-einbuergerung.de/de/</loc></url>'
      + '<url><loc>https://lid-einbuergerung.de/de/blog/b/</loc><lastmod>2026-01-01</lastmod></url>'
      + '</urlset>',
  );
});
