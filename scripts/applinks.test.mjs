import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

import { SUPPORTED_LANGUAGES } from '../src/types/language.ts';
import { GERMAN_STATES } from '../src/data/germanStates.ts';

const aasa = JSON.parse(
  await readFile(new URL('../public/.well-known/apple-app-site-association', import.meta.url), 'utf8')
);

const details = aasa.applinks.details;
assert.equal(details.length, 1, 'expected a single app entry');
const { appID, paths } = details[0];

/**
 * Legacy AASA wildcards: `*` matches any sequence of characters, `/` included.
 * Apple walks the list in order and stops at the first match, so a leading
 * `NOT ` rule wins over a later inclusion.
 */
function toRegExp(pattern) {
  const escaped = pattern.split('*').map((part) => part.replace(/[.+?^${}()|[\]\\]/g, '\\$&'));
  return new RegExp(`^${escaped.join('.*')}$`);
}

const rules = paths.map((pattern) =>
  pattern.startsWith('NOT ')
    ? { exclude: true, test: toRegExp(pattern.slice(4)) }
    : { exclude: false, test: toRegExp(pattern) }
);

function opensApp(url) {
  for (const rule of rules) {
    if (rule.test.test(url)) return !rule.exclude;
  }
  return false;
}

test('the app identifier is fully qualified', () => {
  assert.match(appID, /^[A-Z0-9]{10}\.[A-Za-z0-9.-]+$/, `appID looks unresolved: ${appID}`);
  assert.ok(!appID.includes('TEAMID'), 'the Team ID placeholder is still in place');
});

test('study surfaces open in the app in every supported language', () => {
  for (const lang of SUPPORTED_LANGUAGES) {
    for (const url of [
      `/${lang}/frage/1/`,
      `/${lang}/frage/460/`,
      `/${lang}/fragen/`,
      `/${lang}/exam/`,
      `/${lang}/app/`,
      ...GERMAN_STATES.map((state) => `/${lang}/${state.slug}-fragen/`),
    ]) {
      assert.ok(opensApp(url), `${url} should open the app`);
    }
  }
});

test('reading, legal, support and web-only tools stay on the web', () => {
  for (const lang of SUPPORTED_LANGUAGES) {
    for (const url of [
      `/${lang}/`,
      `/${lang}/blog/`,
      `/${lang}/impressum/`,
      `/${lang}/datenschutz/`,
      `/${lang}/terms-of-service/`,
      `/${lang}/subscription-terms/`,
      `/${lang}/support/`,
      // Progress lives in this browser's storage and does not transfer, so
      // handing these to the app would show an empty, confusing screen.
      `/${lang}/progress/`,
      `/${lang}/favorites/`,
      `/${lang}/focus/`,
      `/${lang}/einbuergerungstest-online/`,
      `/${lang}/leben-in-deutschland-online/`,
    ]) {
      assert.ok(!opensApp(url), `${url} should stay on the web`);
    }
  }
});

test('no blog post is captured, however its slug happens to end', async () => {
  // A slug ending in `-fragen` matches the Bundesland pattern, which is exactly
  // how five posts were being handed to the app before the exclusion was added.
  const entries = await readdir(new URL('../src/content/blog', import.meta.url));
  const slugs = entries.filter((name) => name.endsWith('.md')).map((name) => name.slice(0, -3));
  assert.ok(slugs.length > 0, 'expected blog posts to be present');

  const trapSlugs = slugs.filter((slug) => slug.endsWith('-fragen'));
  for (const slug of [...slugs, ...trapSlugs, 'schwierige-fragen', 'bundesland-fragen']) {
    for (const url of [`/de/blog/${slug}/`, `/de/blog/topic/${slug}/`, `/de/blog/author/${slug}/`]) {
      assert.ok(!opensApp(url), `blog URL ${url} must not open the app`);
    }
  }
});
