import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_ORIGIN = 'https://lid-einbuergerung.de';

const decodeXml = (value) => value
  .replaceAll('&amp;', '&')
  .replaceAll('&quot;', '"')
  .replaceAll('&apos;', "'")
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>');

const escapeXml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

/** Keep date-only values honest; normalize timestamps to the ISO 8601 format Bing expects. */
export function normalizeLastModified(value) {
  const candidate = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(candidate)) {
    const parsed = new Date(`${candidate}T00:00:00.000Z`);
    return Number.isNaN(parsed.valueOf()) ? undefined : candidate;
  }

  const parsed = new Date(candidate);
  return Number.isNaN(parsed.valueOf()) ? undefined : parsed.toISOString();
}

/** Read only explicit page-level freshness signals. Build time is not a content modification date. */
export function extractLastModified(html) {
  const candidates = [];

  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const property = tag.match(/\bproperty="([^"]+)"/i)?.[1];
    const content = tag.match(/\bcontent="([^"]+)"/i)?.[1];
    if (property === 'article:modified_time' && content) candidates.push(content);
  }

  for (const [, value] of html.matchAll(/"dateModified"\s*:\s*"([^"]+)"/g)) {
    candidates.push(value);
  }

  return candidates
    .map(normalizeLastModified)
    .filter(Boolean)
    .sort((left, right) => new Date(right).valueOf() - new Date(left).valueOf())[0];
}

export function addLastModifiedToSitemap(xml, datesByUrl) {
  return xml.replace(/<url>([\s\S]*?)<\/url>/g, (entry, contents) => {
    if (/<lastmod>[^<]+<\/lastmod>/.test(contents)) return entry;
    const rawUrl = contents.match(/<loc>([^<]+)<\/loc>/)?.[1];
    if (!rawUrl) return entry;
    const lastModified = datesByUrl.get(decodeXml(rawUrl));
    if (!lastModified) return entry;
    return entry.replace('</loc>', `</loc><lastmod>${escapeXml(lastModified)}</lastmod>`);
  });
}

async function collectPageDates(dist, xml) {
  const datesByUrl = new Map();

  for (const [, rawUrl] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = new URL(decodeXml(rawUrl));
    if (url.origin !== SITE_ORIGIN) continue;
    const relativePath = decodeURIComponent(url.pathname).replace(/^\/+|\/+$/g, '');
    const htmlPath = path.join(dist, relativePath, 'index.html');

    try {
      const lastModified = extractLastModified(await readFile(htmlPath, 'utf8'));
      if (lastModified) datesByUrl.set(url.href, lastModified);
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
    }
  }

  return datesByUrl;
}

export async function enrichSitemaps(dist = path.resolve('dist')) {
  const sitemapFiles = (await readdir(dist)).filter((name) => /^sitemap-\d+\.xml$/.test(name));
  let datedUrls = 0;
  let totalUrls = 0;

  for (const file of sitemapFiles) {
    const filePath = path.join(dist, file);
    const xml = await readFile(filePath, 'utf8');
    const datesByUrl = await collectPageDates(dist, xml);
    const enrichedXml = addLastModifiedToSitemap(xml, datesByUrl);
    totalUrls += [...xml.matchAll(/<url>/g)].length;
    datedUrls += datesByUrl.size;
    await writeFile(filePath, enrichedXml);
  }

  return { sitemapFiles: sitemapFiles.length, totalUrls, datedUrls };
}

async function main() {
  const distArgument = process.argv.indexOf('--dist');
  const dist = path.resolve(distArgument === -1 ? 'dist' : process.argv[distArgument + 1]);
  const result = await enrichSitemaps(dist);
  if (!result.sitemapFiles) throw new Error(`No sitemap files found in ${dist}`);
  console.log(`Sitemap freshness: ${result.datedUrls}/${result.totalUrls} URLs have verified lastmod values.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
