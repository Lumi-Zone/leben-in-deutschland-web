import { readFile, readdir, access, stat } from 'node:fs/promises';
import path from 'node:path';

// Check generated links as exact URLs: a file existing at /en/index.html does
// not mean /en is valid when Astro enforces trailingSlash: 'always'.
const root = path.resolve('dist');
const origin = 'https://lid-einbuergerung.de';
const targets = new Map();
let pageCount = 0;
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.name.endsWith('.html')) {
      pageCount++;
      const pageUrl = new URL(path.relative(root, file).split(path.sep).join('/').replace(/index\.html$/, ''), `${origin}/`);
      const html = await readFile(file, 'utf8');
      for (const [tag] of html.matchAll(/<(?:a|link|img|script)\b[^>]*>/gi)) {
        const value = tag.match(/\s(?:href|src)="([^"]+)"/i)?.[1];
        if (!value) continue;
        const url = new URL(decode(value), pageUrl);
        if (url.origin === origin && !targets.has(url.pathname)) targets.set(url.pathname, pageUrl.pathname);
      }
    }
  }
}

await walk(root);
const errors = [];
for (const [pathname, source] of targets) {
  const relative = decodeURIComponent(pathname).replace(/^\/+/, '');
  const target = path.join(root, relative, pathname.endsWith('/') ? 'index.html' : '');
  if (!pathname.endsWith('/') && !path.extname(pathname)) {
    // Extensionless public assets, such as apple-app-site-association, are valid files.
    const info = await stat(target).catch(() => null);
    if (!info?.isFile()) { errors.push(`${source} → ${pathname}: missing trailing slash or target`); continue; }
  }
  try { await access(target); } catch { errors.push(`${source} → ${pathname}: missing target`); }
}
if (errors.length) {
  console.error(errors.slice(0, 40).join('\n'));
  console.error(`${errors.length} broken local URLs across ${pageCount} pages.`);
  process.exitCode = 1;
} else {
  console.log(`Link audit passed: ${pageCount} pages, ${targets.size} exact local URLs; no missing targets or trailing slashes.`);
}
