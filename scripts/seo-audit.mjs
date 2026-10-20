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
// Native-language guides (e.g. Persian) are published under /de/blog/ with a contentLang frontmatter field.
const blogDirectory = path.resolve('src/content/blog');
const blogFiles = await Promise.all((await readdir(blogDirectory)).filter((name) => /^[^.]+\.md$/.test(name)).map(async (name) => ({
  slug: name.replace(/\.md$/, ''),
  contentLang: (await readFile(path.join(blogDirectory, name), 'utf8')).match(/^contentLang:\s*(\S+)/m)?.[1],
})));
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
      pages.set(url, { canonical, noindex, alternates, anchors, html, body });
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

const priorityLanguages = ['de', 'en', 'tr'];
const answerLandings = ['leben-in-deutschland-online', 'einbuergerungstest-online'];
for (const lang of ['de', 'en', 'tr', 'ar', 'ua', 'ru', 'pl', 'fa', 'ps', 'ro', 'it', 'es']) {
  for (const route of answerLandings) {
    const url = `${origin}/${lang}/${route}/`;
    const page = pages.get(url);
    assertPage(page && !page.noindex, `${url}: translated answer page must be indexable`);
    assertPage(page?.body.includes('bamf.de') && page?.body.includes('oet.bamf.de'), `${url}: official sources must be rendered beside the answer`);
  }
  if (lang !== 'de') {
    const stateTitle = pages.get(`${origin}/${lang}/bayern-fragen/`)?.html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
    assertPage(!stateTitle.includes('Bundesland 2026'), `${lang}: state page title is still the German fallback`);
  }
}
for (const lang of priorityLanguages) {

  for (let id = 1; id <= 30; id += 1) {
    const url = `${origin}/${lang}/frage/${id}/`;
    assertPage(pages.get(url)?.body.includes('data-question-explanation'), `${url}: missing server-rendered reviewed explanation`);
  }

  for (const slug of [
    'unterschied-lid-test-einbuergerungstest',
    'wie-viele-richtige-antworten-brauche-ich-einbuergerungstest',
    'wie-viele-fragen-hat-der-einbuergerungstest',
    'anmeldung-pruefung-schritte',
    'kann-ich-den-einbuergerungstest-online-machen',
    'einbuergerungstest-app-2026',
  ]) {
    const url = `${origin}/${lang}/blog/${slug}/`;
    const page = pages.get(url);
    assertPage(page && !page.noindex, `${url}: translated guide must be indexable`);
    assertPage(page?.body.includes('official-sources-title'), `${url}: translated guide must render sources and review status`);
  }
}

const canonicalAppId = `${origin}/de/app/#mobile-app`;
const priorityPaths = [
  'de/', 'de/fragen/', 'de/einbuergerungstest-online/', 'de/leben-in-deutschland-online/', 'de/exam/',
  ...['einbuergerungstest-berlin', 'einbuergerungstest-hamburg', 'einbuergerungstest-frankfurt', 'schwierige-fragen', 'einbuergerungstest-schnell-lernen-7-tage-plan'].map((slug) => `de/blog/${slug}/`),
  ...['berlin', 'hamburg', 'hessen', 'bayern', 'nordrhein-westfalen'].map((state) => `de/${state}-fragen/`),
  'fa/', 'fa/fragen/', 'ar/', 'ar/fragen/', 'tr/fragen/',
];
for (const route of priorityPaths) {
  const url = `${origin}/${route}`;
  const page = pages.get(url);
  assertPage(page && !page.noindex && page.canonical === url && sitemapUrls.has(url), `${route}: priority page must remain indexable, canonical and in the sitemap`);
  if (route.startsWith('de/blog/')) {
    assertPage((page?.body.match(/data-guide-placement="(?:top|bottom)"/g) ?? []).length === 2, `${route}: priority guide must keep both practice cards`);
    assertPage(page?.anchors.includes('/de/exam/'), `${route}: priority guide must link to the test`);
  }
}

for (const lang of ['de', 'tr', 'ar', 'fa']) {
  const targets = [`${origin}/${lang}/fragen/`, ...(lang === 'de' ? answerLandings.map((route) => `${origin}/de/${route}/`) : [])];
  for (const url of targets) {
    const page = pages.get(url);
    assertPage(page?.body.includes(`data-explained-examples="${lang}"`), `${url}: missing localized worked examples`);
    for (const id of [1, 19, 20]) assertPage(page?.body.includes(`data-explained-example="${id}"`) && page?.anchors.includes(`/${lang}/frage/${id}/`), `${url}: missing example ${id} or its practice link`);
  }
}
const stateGuides = { berlin: 'berlin', hamburg: 'hamburg', hessen: 'frankfurt', bayern: 'muenchen', 'nordrhein-westfalen': 'koeln' };
for (const [state, city] of Object.entries(stateGuides)) {
  const page = pages.get(`${origin}/de/${state}-fragen/`);
  assertPage(page?.body.includes(`data-state-study="${state}"`), `${state}: missing state study context`);
  assertPage(page?.anchors.includes(`/de/exam/?state=${state}`), `${state}: missing state-specific test entry`);
  assertPage(page?.anchors.includes(`/de/blog/einbuergerungstest-${city}/`), `${state}: missing city guide`);
  assertPage(page?.body.includes('oet.bamf.de') && page?.body.includes('bamf.de/'), `${state}: missing official sources`);
}
for (const lang of ['de', 'en', 'tr', 'ar', 'ua', 'ru', 'pl', 'fa', 'ps', 'ro', 'it', 'es']) {
  const exam = pages.get(`${origin}/${lang}/exam/`);
  assertPage(exam?.body.includes('data-exam-state'), `${lang}: exam must offer state selection before starting`);
  const home = pages.get(`${origin}/${lang}/`);
  assertPage(home?.anchors.includes(`/${lang}/fragen/#bundeslaender`), `${lang}: general state shortcut must open the state selector`);
}
for (const lang of ['en', 'tr', 'ar', 'fa']) {
  const home = pages.get(`${origin}/${lang}/`);
  const section = home?.body.match(/<section\b[^>]*data-home-guides="[^"]+"[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? '';
  const links = tags(section, 'a').map((tag) => attr(tag, 'href')).filter((href) => /\/blog\/[^/#]+\/$/.test(href));
  const explainer = { ar: 'arabisch', fa: 'persisch-dari' }[lang];
  const nativeGuides = new Set(blogFiles.filter((file) => file.contentLang === lang).map((file) => `/de/blog/${file.slug}/`));
  assertPage(links.length > 0 && links.every((href) => explainer ? nativeGuides.has(href) : href.startsWith(`/${lang}/blog/`)), `${lang}: home guide cards must match the reader's language`);
  if (explainer) assertPage(links.includes(`/de/blog/einbuergerungstest-auf-${explainer}-erklaert/`), `${lang}: home must link the native-language test explainer`);
}

for (const lang of priorityLanguages) {
  const hub = pages.get(`${origin}/${lang}/blog/`);
  assertPage(hub?.body.includes('id="lernwege"'), `${lang}: blog is missing study paths`);
  const paths = [...(hub?.body ?? '').matchAll(/<section\b[^>]*data-study-intent="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g)];
  assertPage(paths.length === 3, `${lang}: expected three study intent groups`);
  const practiceRoutes = { understand: 'frage/1/', prepare: 'fragen/', check: 'exam/' };
  const clusteredGuides = new Set();
  for (const [, intent, content] of paths) {
    const links = tags(content, 'a').map((tag) => attr(tag, 'href'));
    assertPage(links.includes(`/${lang}/${practiceRoutes[intent]}`), `${lang}/${intent}: missing matching practice destination`);
    const guides = links.filter((href) => /^\/[a-z]{2}\/blog\/[^/#]+\/$/.test(href));
    assertPage(guides.length > 0, `${lang}/${intent}: no published guides`);
    for (const href of guides) {
      assertPage(href.startsWith(`/${lang}/blog/`), `${href}: study guide language does not match hub`);
      assertPage(!clusteredGuides.has(href), `${href}: guide belongs to multiple study intents`);
      clusteredGuides.add(href);
      const guide = pages.get(`${origin}${href}`);
      const navigation = guide?.body.match(/<section\b[^>]*data-study-guide-group="([^"]+)"[^>]*>([\s\S]*?)<\/section>/);
      assertPage(navigation?.[1] === intent, `${href}: missing reciprocal study intent navigation`);
      const guideLinks = tags(navigation?.[2] ?? '', 'a').map((tag) => attr(tag, 'href'));
      assertPage(guideLinks.includes(`/${lang}/blog/#lernwege`), `${href}: missing link back to study paths`);
      assertPage(guideLinks.includes(`/${lang}/${practiceRoutes[intent]}`), `${href}: missing practice destination`);
      assertPage(!guideLinks.includes(href), `${href}: next step must not link to itself`);
    }
  }
  assertPage(hub?.anchors.includes(`/${lang}/fragen/#bundeslaender`), `${lang}: study paths must link to state practice`);
}

for (const lang of ['ar', 'fa']) {
  for (let id = 1; id <= 20; id += 1) {
    const url = `${origin}/${lang}/frage/${id}/`;
    const page = pages.get(url);
    assertPage(page?.body.includes(`data-explanation-language="${lang}"`), `${url}: missing explanation in the page language`);
    assertPage(page?.html.includes('dir="rtl"'), `${url}: explanation page must use right-to-left layout`);
  }
  const outsidePilot = pages.get(`${origin}/${lang}/frage/21/`);
  assertPage(!outsidePilot?.body.includes('data-question-explanation'), `${lang}: untranslated explanation must not appear as localized content`);
  const catalogue = pages.get(`${origin}/${lang}/fragen/`);
  assertPage(catalogue?.body.includes('explanation-pilot-title') && catalogue.anchors.includes(`/${lang}/frage/19/`), `${lang}: catalogue must link to the explanation pilot`);
}

const canonicalOrganizationId = `${origin}/de/#organization`;
for (const lang of priorityLanguages) {
  const homeHtml = pages.get(`${origin}/${lang}/`)?.html ?? '';
  const appHtml = pages.get(`${origin}/${lang}/app/`)?.html ?? '';
  assertPage(homeHtml.includes(canonicalAppId) && appHtml.includes(canonicalAppId), `${lang}: canonical mobile app @id mismatch`);
  assertPage(homeHtml.includes(canonicalOrganizationId) && appHtml.includes(canonicalOrganizationId), `${lang}: canonical organization @id mismatch`);
  assertPage(appHtml.includes('Leben in Deutschland 2026 LiD'), `${lang}: canonical app name missing`);
  assertPage(!appHtml.includes('4.8 ★') && !appHtml.includes('"@type":"Review"'), `${lang}: unverifiable aggregate rating or Review JSON-LD found`);
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
