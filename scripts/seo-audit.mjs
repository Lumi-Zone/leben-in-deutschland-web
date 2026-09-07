import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

// Audit the generated HTML, including content available without JavaScript.
const root = path.resolve('dist');
const origin = 'https://lid-einbuergerung.de';
const errors = [];
const pages = new Map();
const assertPage = (condition, message) => { if (!condition) errors.push(message); };
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
const attr = (tag, name) => decode(tag.match(new RegExp(`(?:\\s|^)${name}="([^"]*)"`, 'i'))?.[1] ?? '');
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(([tag]) => tag);
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.name === 'index.html') {
      const html = await readFile(file, 'utf8');
      const url = `${origin}/${path.relative(root, directory).split(path.sep).filter(Boolean).join('/')}${directory === root ? '' : '/'}`;
      const links = tags(html, 'link');
      const canonicalTags = links.filter((tag) => attr(tag, 'rel') === 'canonical');
      const canonical = attr(canonicalTags[0] ?? '', 'href');
      const meta = tags(html, 'meta');
      const noindex = meta.some((tag) => attr(tag, 'name') === 'robots' && attr(tag, 'content').includes('noindex'));
      const alternates = links.filter((tag) => attr(tag, 'hreflang')).map((tag) => ({ lang: attr(tag, 'hreflang'), href: attr(tag, 'href') }));
      const body = html.slice(html.indexOf('<body'));
      const anchors = tags(body, 'a').map((tag) => attr(tag, 'href'));
      pages.set(url, { canonical, noindex, alternates, anchors });
      assertPage(canonicalTags.length === 1, `${url}: expected one canonical`);
      assertPage(/<title>[^<]+<\/title>/.test(html), `${url}: missing title`);
      assertPage(meta.some((tag) => attr(tag, 'name') === 'description' && attr(tag, 'content').trim()), `${url}: missing description`);
      if (!noindex) {
        assertPage(canonical === url, `${url}: canonical mismatch: ${canonical}`);
        assertPage((body.match(/<h1\b/g) ?? []).length === 1, `${url}: expected one rendered H1`);
      }
      for (const [, json] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
        try { JSON.parse(json); } catch { errors.push(`${url}: invalid JSON-LD`); }
      }
      if (/\/frage\/\d+\/$/.test(url)) {
        assertPage(/<details[\s>]/.test(body), `${url}: missing accessible answer disclosure`);
        assertPage(body.includes('oet.bamf.de'), `${url}: missing official source`);
      }
      if (/\/fragen\/$/.test(url)) {
        const questionLinks = anchors.filter((href) => /\/frage\/\d+\/$/.test(href));
        assertPage(new Set(questionLinks).size === 300, `${url}: expected 300 crawlable general questions`);
      }
    }
  }
}
await access(root);
await walk(root);
const sitemapUrls = new Set();
const sitemapFiles = (await readdir(root)).filter((file) => /^sitemap-\d+\.xml$/.test(file));
assert(sitemapFiles.length > 0, 'No generated sitemap found; run npm run build first.');
for (const file of sitemapFiles) {
  const xml = await readFile(path.join(root, file), 'utf8');
  for (const [, raw] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = decode(raw);
    sitemapUrls.add(url);
    const page = pages.get(url);
    assertPage(page && !page.noindex && page.canonical === url, `${url}: sitemap target missing, noindex, or noncanonical`);
  }
  for (const tag of tags(xml, 'xhtml:link')) {
    const target = pages.get(attr(tag, 'href'));
    assertPage(target && !target.noindex, `${file}: invalid sitemap alternate ${attr(tag, 'href')}`);
  }
}
for (const [url, page] of pages) {
  if (!page.noindex) assertPage(sitemapUrls.has(url), `${url}: missing from sitemap`);
  for (const alternate of page.alternates) {
    const target = pages.get(alternate.href);
    assertPage(target && !target.noindex && target.canonical === alternate.href, `${url}: invalid hreflang ${alternate.href}`);
    if (alternate.lang !== 'x-default' && target && !page.noindex) {
      assertPage(target.alternates.some((back) => back.href === url), `${url}: missing reciprocal hreflang from ${alternate.href}`);
    }
  }
}
for (const lang of ['de', 'en', 'tr', 'ar', 'ua', 'ru', 'pl', 'fa', 'ps', 'ro', 'it', 'es']) {
  assertPage(pages.get(`${origin}/${lang}/`)?.anchors.includes(`/${lang}/fragen/`), `${lang}: home must link to question catalogue`);
}
const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
assertPage(/User-agent: OAI-SearchBot\s+Allow: \//.test(robots), 'ChatGPT Search crawler must be allowed');
assertPage(robots.includes(`${origin}/sitemap-index.xml`), 'robots.txt sitemap missing');
if (errors.length) {
  console.error(errors.slice(0, 40).join('\n'));
  console.error(`${errors.length} SEO errors across ${pages.size} pages.`);
  process.exitCode = 1;
} else {
  console.log(`SEO audit passed: ${pages.size} HTML pages, ${sitemapUrls.size} sitemap URLs, reciprocal hreflang, JSON-LD, 12 catalogues and server-rendered answers.`);
}
