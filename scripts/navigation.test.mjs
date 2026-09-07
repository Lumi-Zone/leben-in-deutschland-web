import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { SUPPORTED_LANGUAGES } from '../src/types/language.ts';

// Supply Vite's build-time environment while exercising the actual navigation module.
async function navigation(base = '/') {
  const source = await readFile(new URL('../src/utils/navigation.ts', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText
    .replaceAll('import.meta.env.BASE_URL', JSON.stringify(base))
    .replace("'../types/language'", JSON.stringify(new URL('../src/types/language.ts', import.meta.url).href));
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
}

test('localized home and nested routes always end in one slash', async () => {
  const { getPath } = await navigation();
  for (const lang of SUPPORTED_LANGUAGES) {
    for (const route of ['', '/frage/12', '/exam', '/berlin-fragen', '/blog/example']) {
      assert.equal(getPath(`${lang}${route}`), `/${lang}${route}/`);
      assert.equal(getPath(`/${lang}${route}/`), `/${lang}${route}/`);
    }
  }
});

test('language changes preserve the current question and support every language pair', async () => {
  const { getLanguageSwitchUrl } = await navigation();
  for (const from of SUPPORTED_LANGUAGES) {
    for (const to of SUPPORTED_LANGUAGES) {
      assert.equal(getLanguageSwitchUrl(`/${from}/`, to, SUPPORTED_LANGUAGES), `/${to}/`);
      assert.equal(getLanguageSwitchUrl(`/${from}/frage/42/`, to, SUPPORTED_LANGUAGES), `/${to}/frage/42/`);
    }
  }
});

test('file URLs and extensionless screenshot prefixes remain intact', async () => {
  const { getPath } = await navigation();
  for (const asset of ['logo.svg', 'rss.xml', '.well-known/apple-app-site-association', 'app-screenshots/tr/01-hero', 'question-images/general/deutschland21.png']) {
    assert.equal(getPath(asset), `/${asset}`);
  }
});

test('queries, fragments and external destinations are not corrupted', async () => {
  const { getPath } = await navigation();
  assert.equal(getPath('de/focus?mode=wrong#practice'), '/de/focus/?mode=wrong#practice');
  assert.equal(getPath('logo.svg?v=2#logo'), '/logo.svg?v=2#logo');
  assert.equal(getPath('/'), '/');
  for (const url of ['https://example.com/app?id=1', 'mailto:support@example.com', '//example.com/logo.svg']) {
    assert.equal(getPath(url), url);
  }
});

test('subdirectory hosting adds the base exactly once during language switching', async () => {
  const { getPath, getLanguageSwitchUrl, getAppRelativePath } = await navigation('/my-app/');
  assert.equal(getPath('en'), '/my-app/en/');
  assert.equal(getPath('logo.svg'), '/my-app/logo.svg');
  assert.equal(getAppRelativePath('/my-app/de/exam/'), '/de/exam/');
  assert.equal(getLanguageSwitchUrl('/my-app/de/exam/', 'tr', SUPPORTED_LANGUAGES), '/my-app/tr/exam/');
});
