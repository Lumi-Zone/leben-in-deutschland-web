import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';

async function moduleUrlFromSource(path, replacements = []) {
  const source = await readFile(new URL(path, import.meta.url), 'utf8');
  let compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
  for (const [from, to] of replacements) compiled = compiled.replace(from, to);
  return `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`;
}
const { launchAppOrStore } = await import(await moduleUrlFromSource('../src/utils/appLaunch.ts'));
// CI uses Node 20, which cannot import a raw .ts file. Compile dependencies too.
const siteIdentityUrl = await moduleUrlFromSource('../src/utils/siteIdentity.ts');
const { buildStoreUrl, prefixAppleCampaignOrigin } = await import(await moduleUrlFromSource('../src/utils/appLinks.ts', [
  ["'./siteIdentity'", JSON.stringify(siteIdentityUrl)],
]));

function launcher() {
  const navigations = [], events = [], timers = new Set(), visibility = new Set(), hides = new Set();
  let hidden = false;
  const environment = {
    isHidden: () => hidden,
    navigate: (url) => navigations.push(url),
    open: (url) => navigations.push(url),
    delay: (callback) => { timers.add(callback); return () => timers.delete(callback); },
    onVisibilityChange: (callback) => { visibility.add(callback); return () => visibility.delete(callback); },
    onPageHide: (callback) => { hides.add(callback); return () => hides.delete(callback); },
  };
  const options = { appUrl: 'lebenindeutschland://question/19', storeUrl: 'https://apps.apple.com/app/id6723899981', isMobile: true, onStoreRedirect: () => events.push('store') };
  return {
    environment, options, navigations, events,
    tick: () => [...timers].forEach((callback) => callback()),
    background: () => { hidden = true; [...visibility].forEach((callback) => callback()); },
    foreground: () => { hidden = false; },
    hide: () => [...hides].forEach((callback) => callback()),
    resourceCount: () => timers.size + visibility.size + hides.size,
  };
}

test('installed-app handoff is not a store exit and cannot redirect when the visitor returns', () => {
  const f = launcher();
  launchAppOrStore(f.options, f.environment);
  f.background(); f.foreground(); f.tick();
  assert.deepEqual(f.navigations, [f.options.appUrl]);
  assert.deepEqual(f.events, []);
  assert.equal(f.resourceCount(), 0);
});

test('unhandled mobile scheme falls back once, reports the store attempt, and clears handlers', () => {
  const f = launcher();
  launchAppOrStore(f.options, f.environment);
  f.tick(); f.tick(); f.hide();
  assert.deepEqual(f.navigations, [f.options.appUrl, f.options.storeUrl]);
  assert.deepEqual(f.events, ['store']);
  assert.equal(f.resourceCount(), 0);
});

test('a superseded attempt or pagehide cannot leave a second fallback behind', () => {
  const f = launcher();
  const cancel = launchAppOrStore(f.options, f.environment);
  cancel();
  launchAppOrStore(f.options, f.environment);
  f.tick();
  assert.equal(f.navigations.filter((url) => url === f.options.storeUrl).length, 1);
  assert.equal(f.events.length, 1);
  const other = launcher();
  launchAppOrStore(other.options, other.environment);
  other.hide(); other.tick();
  assert.equal(other.events.length, 0);
  assert.equal(other.resourceCount(), 0);
});

test('desktop and synchronous scheme failure report store attempts without blocking on analytics', () => {
  const desktop = launcher();
  launchAppOrStore({ ...desktop.options, isMobile: false }, desktop.environment);
  assert.deepEqual(desktop.navigations, [desktop.options.storeUrl]);
  assert.equal(desktop.events.length, 1);
  assert.equal(desktop.resourceCount(), 0);
  const mobile = launcher();
  const navigate = mobile.environment.navigate;
  mobile.environment.navigate = (url) => { if (url === mobile.options.appUrl) throw new Error('unsupported'); navigate(url); };
  launchAppOrStore({ ...mobile.options, onStoreRedirect: () => { throw new Error('tracker unavailable'); } }, mobile.environment);
  mobile.tick();
  assert.deepEqual(mobile.navigations, [mobile.options.storeUrl]);
  assert.equal(mobile.resourceCount(), 0);
});

test('Apple campaigns fit 30 characters, retain placements, and avoid per-question/language fragmentation', () => {
  const short = new URL(buildStoreUrl({ platform: 'ios', source: 'question-page', lang: 'de', itemId: 1 }));
  const other = new URL(buildStoreUrl({ platform: 'ios', source: 'question-page', lang: 'ar', itemId: 460 }));
  assert.equal(short.searchParams.get('ct'), other.searchParams.get('ct'));
  assert.ok(short.searchParams.get('pt'));
  const long = new URL(buildStoreUrl({ platform: 'ios', source: 'app-page-cta', variant: 'a'.repeat(80) }));
  assert.equal(long.searchParams.get('ct').length, 30);
  for (const placement of ['home-app', 'app-page-hero', 'app-page-cta-review', 'app-page-sticky', 'question-page', 'smart-banner']) {
    const campaign = prefixAppleCampaignOrigin(placement, 'very-long-arrival-source-name');
    assert.ok(campaign.length <= 30);
    assert.ok(campaign.endsWith(placement));
  }
  assert.equal(prefixAppleCampaignOrigin('home-app', '!!!'), 'home-app');
  assert.equal(prefixAppleCampaignOrigin('a'.repeat(30), 'instagram'), 'a'.repeat(30));
  const play = new URL(buildStoreUrl({ platform: 'android', source: 'question-page', lang: 'ar', itemId: 19 }));
  const referrer = new URLSearchParams(play.searchParams.get('referrer'));
  assert.equal(referrer.get('utm_content'), 'ar');
  assert.equal(referrer.get('utm_term'), '19');
});

const layout = await readFile(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
const bannerScript = [...layout.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)]
  .map((match) => match[1]).find((script) => script.includes("const banner = document.getElementById('smart-app-banner')"));
assert.ok(bannerScript, 'expected the real banner implementation');

function bannerFixture(storageFails = false) {
  const events = [], listeners = {}, storage = new Map();
  let now = 1_800_000_000_000;
  const storageApi = { getItem: (key) => { if (storageFails) throw new Error('blocked'); return storage.get(key) ?? null; }, setItem: (key, value) => storage.set(key, value), removeItem: (key) => storage.delete(key) };
  const elements = Object.fromEntries(['smart-app-banner', 'smart-banner-close', 'smart-banner-open'].map((id) => [id, { hidden: true, addEventListener: (name, callback) => { listeners[`${id}:${name}`] = callback; } }]));
  const context = vm.createContext({
    document: { getElementById: (id) => elements[id] },
    navigator: { userAgent: 'Mozilla/5.0 (Linux; Android 14) Chrome/130 Safari/537.36', maxTouchPoints: 1 },
    window: { umami: { track: (name, data) => events.push({ name, data }) } },
    localStorage: storageApi, sessionStorage: storageApi,
    Date: { now: () => now }, iosStoreUrl: 'https://apps.apple.com/app/id6723899981', androidStoreUrl: 'https://play.google.com/store/apps/details?id=com.einbuergerungapp',
  });
  return { events, elements, render: () => vm.runInContext(bannerScript, context), click: () => listeners['smart-banner-open:click'](), later: () => { now += 30 * 60 * 1000; } };
}

test('100 question-page banner renders cost one impression, with deliberate store clicks preserved', () => {
  const f = bannerFixture();
  for (let page = 0; page < 100; page++) f.render();
  assert.equal(f.events.filter((event) => event.name === 'smart-banner-shown').length, 1);
  assert.equal(f.elements['smart-app-banner'].hidden, false);
  f.click(); f.click();
  assert.equal(f.events.filter((event) => event.name === 'play-store-click').length, 2);
  f.later(); f.render();
  assert.equal(f.events.filter((event) => event.name === 'smart-banner-shown').length, 2);
});

test('blocked browser storage skips optional impressions while preserving banner and store navigation', () => {
  const f = bannerFixture(true);
  f.render(); f.render(); f.click();
  assert.equal(f.events.filter((event) => event.name === 'smart-banner-shown').length, 0);
  assert.equal(f.events.filter((event) => event.name === 'play-store-click').length, 1);
  assert.equal(f.elements['smart-app-banner'].hidden, false);
  assert.match(f.elements['smart-banner-open'].href, /play.google.com/);
});
