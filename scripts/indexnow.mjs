import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Notify IndexNow (Bing, Yandex, Seznam, ...) about pages whose content changed
// since the last deploy. Each build publishes a fingerprint per sitemap URL in
// /indexnow-manifest.json; before deploying, the new manifest is compared with
// the live one and only the changed or removed URLs are submitted.
export const ORIGIN = 'https://lid-einbuergerung.de';
export const INDEXNOW_KEY = '40759eb794eea0a7e71adecb37d9bcce';
export const MANIFEST_FILE = 'indexnow-manifest.json';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS_PER_REQUEST = 10_000;

const decode = (value) => value
  .replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'")
  .replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&nbsp;', ' ');

/** Hash only what search engines care about, so asset hashes and island props don't count as changes. */
export function pageFingerprint(html) {
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '';
  const description = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? '';
  const main = ['main', 'article', 'body']
    .map((tag) => html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))?.[1])
    .find((content) => content !== undefined) ?? html;
  const text = main
    .replace(/<(script|style|template)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  const content = [title, description, text].map((part) => decode(part).replace(/\s+/g, ' ').trim()).join('\n');
  return createHash('sha256').update(content).digest('hex').slice(0, 16);
}

/** Returns absolute URLs that are new, changed or removed between two manifests. */
export function diffManifests(previous, current) {
  const changed = Object.entries(current.pages)
    .filter(([pathname, hash]) => previous.pages[pathname] !== hash)
    .map(([pathname]) => pathname);
  const removed = Object.keys(previous.pages).filter((pathname) => !(pathname in current.pages));
  return [...changed, ...removed].map((pathname) => `${ORIGIN}${pathname}`);
}

async function sitemapPaths(dist) {
  const files = (await readdir(dist)).filter((name) => /^sitemap-\d+\.xml$/.test(name));
  const paths = [];
  for (const file of files) {
    const xml = await readFile(path.join(dist, file), 'utf8');
    for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) paths.push(new URL(decode(loc)).pathname);
  }
  return paths;
}

async function buildManifest(dist) {
  const pages = {};
  for (const pathname of (await sitemapPaths(dist)).sort()) {
    const html = await readFile(path.join(dist, decodeURIComponent(pathname), 'index.html'), 'utf8');
    pages[pathname] = pageFingerprint(html);
  }
  return { version: 1, pages };
}

async function fetchLiveManifest() {
  const response = await fetch(`${ORIGIN}/${MANIFEST_FILE}`, { headers: { 'cache-control': 'no-cache' } });
  if (response.status === 404) return { version: 1, pages: {} };
  if (!response.ok) throw new Error(`live manifest: HTTP ${response.status}`);
  return response.json();
}

async function submit(urls) {
  for (let start = 0; start < urls.length; start += MAX_URLS_PER_REQUEST) {
    const urlList = urls.slice(start, start + MAX_URLS_PER_REQUEST);
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: new URL(ORIGIN).host,
        key: INDEXNOW_KEY,
        keyLocation: `${ORIGIN}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });
    if (response.status !== 200 && response.status !== 202) {
      throw new Error(`IndexNow rejected ${urlList.length} URLs: HTTP ${response.status} ${await response.text()}`);
    }
    console.log(`IndexNow accepted ${urlList.length} URLs (HTTP ${response.status}).`);
  }
}

async function main([command, ...args]) {
  const option = (name, fallback) => {
    const index = args.indexOf(`--${name}`);
    return index === -1 ? fallback : args[index + 1];
  };
  const dist = path.resolve(option('dist', 'dist'));
  const urlsFile = path.resolve(option('urls', 'indexnow-urls.json'));

  if (command === 'manifest') {
    const manifest = await buildManifest(dist);
    await writeFile(path.join(dist, MANIFEST_FILE), JSON.stringify(manifest));
    console.log(`IndexNow manifest: ${Object.keys(manifest.pages).length} pages.`);
  } else if (command === 'diff') {
    const current = JSON.parse(await readFile(path.join(dist, MANIFEST_FILE), 'utf8'));
    // If the live manifest can't be read, skip this round instead of resubmitting every page.
    const live = await fetchLiveManifest().catch((error) => {
      console.warn(`IndexNow: skipped, ${error.message}`);
      return current;
    });
    const urls = diffManifests(live, current);
    await writeFile(urlsFile, JSON.stringify({ urls }, null, 2));
    console.log(`IndexNow: ${urls.length} changed URLs.`);
    for (const url of urls.slice(0, 20)) console.log(`  ${url}`);
  } else if (command === 'submit') {
    const { urls } = JSON.parse(await readFile(urlsFile, 'utf8'));
    if (!urls.length) console.log('IndexNow: nothing to submit.');
    else if (args.includes('--dry-run')) console.log(`IndexNow dry run: would submit ${urls.length} URLs.`);
    else await submit(urls);
  } else {
    throw new Error('usage: node scripts/indexnow.mjs manifest|diff|submit [--dist dir] [--urls file] [--dry-run]');
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
