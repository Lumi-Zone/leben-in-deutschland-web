import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { getEligibleQuestions, loadEnvFile, saveState } from './daily-question-core.mjs';
import { ACCOUNT, ACCOUNT_ID } from './instagram-series-core.mjs';
import {
  carouselContent,
  defaultGrowthStartDate,
  emptyGrowthState,
  growthSourceFingerprint,
  planGrowthPost,
  reelContent,
  storyContent,
} from './instagram-growth-core.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const stateDirectory = path.join(root, '.daily-instagram', ACCOUNT_ID);
const seriesStatePath = path.join(stateDirectory, 'state-v2.json');
const growthStatePath = path.join(stateDirectory, 'growth-state-v1.json');
const lockPath = path.join(stateDirectory, 'growth-post.lock');

function requireCredentials() {
  if (!process.env.INSTAGRAM_ACCESS_TOKEN) throw new Error('INSTAGRAM_ACCESS_TOKEN is missing.');
  if (process.env.INSTAGRAM_USER_ID !== ACCOUNT_ID || process.env.INSTAGRAM_ACCOUNT_USERNAME?.toLowerCase() !== ACCOUNT) {
    throw new Error('Configured Instagram account does not match the approved account.');
  }
}

async function graphRequest(endpoint, { method = 'GET', body } = {}) {
  requireCredentials();
  const version = process.env.INSTAGRAM_API_VERSION || 'v25.0';
  if (!/^v\d+\.\d+$/.test(version)) throw new Error('Invalid Instagram API version.');
  let response;
  try {
    response = await fetch(`https://graph.instagram.com/${version}/${endpoint}`, {
      method,
      headers: { Authorization: `Bearer ${process.env.INSTAGRAM_ACCESS_TOKEN}`, ...(body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}) },
      body: body ? new URLSearchParams(body) : undefined,
      signal: AbortSignal.timeout(30000),
    });
  } catch { throw new Error('Instagram network request failed. No automatic retry.'); }
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.error) throw new Error(`Instagram API failed (HTTP ${response.status}, code ${data.error?.code || 'unknown'}).`);
  return data;
}

async function authenticatedAccount(request = graphRequest) {
  const account = await request(`${ACCOUNT_ID}?fields=id,username`);
  if (account.username?.toLowerCase() !== ACCOUNT) throw new Error('Instagram username mismatch; publication blocked.');
}

function mediaBase() {
  const site = process.env.INSTAGRAM_SITE_URL || 'https://lid-einbuergerung.de';
  const parsed = new URL(site);
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password) throw new Error('A public HTTPS site URL is required.');
  return `${site.replace(/\/$/, '')}/instagram/growth-v1`;
}

async function publicManifest() {
  const response = await fetch(`${mediaBase()}/manifest.json`, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error('Published Instagram growth manifest is missing. Deploy the growth assets first.');
  const manifest = await response.json();
  if (manifest.version !== 1 || manifest.account !== ACCOUNT || manifest.sourceFingerprint !== await growthSourceFingerprint(root)) {
    throw new Error('Published growth assets are based on different source content. Deploy the approved assets first.');
  }
  return manifest;
}

async function checkPublicAsset(filename, manifest) {
  const url = `${mediaBase()}/${filename}`;
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  const expectedType = filename.endsWith('.mp4') ? 'video/mp4' : 'image/jpeg';
  if (!response.ok || !response.headers.get('content-type')?.startsWith(expectedType)) throw new Error(`Public media is not ready: ${filename} (HTTP ${response.status}).`);
  const remote = Buffer.from(await response.arrayBuffer());
  const hash = createHash('sha256').update(remote).digest('hex');
  if (manifest.files?.[filename] !== hash) throw new Error(`Public media differs from the approved manifest: ${filename}.`);
  return url;
}

async function readJson(file, fallback = null) {
  try { return JSON.parse(await fs.readFile(file, 'utf8')); }
  catch (error) { if (error.code === 'ENOENT' && fallback) return fallback(); throw error; }
}

async function waitForContainer(id, request, wait) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const status = await request(`${id}?fields=status_code`);
    if (status.status_code === 'FINISHED') return;
    if (['ERROR', 'EXPIRED', 'PUBLISHED'].includes(status.status_code)) throw new Error(`Unexpected container state ${status.status_code}; manual reconciliation required.`);
    await wait(3000);
  }
  throw new Error('Media processing timed out; publication remains blocked.');
}

export async function publishGrowthPlanned({ plan, state, save, request, assets, content, wait = ms => new Promise(resolve => setTimeout(resolve, ms)), now = () => new Date() }) {
  if (state.inFlight) throw new Error('Unresolved growth publication; manual reconciliation required.');
  if (state.posts.some(post => post.key === plan.key)) throw new Error('Growth slot already published.');
  state.inFlight = { key: plan.key, kind: plan.kind, date: plan.date, startedAt: now().toISOString(), stage: 'creating', containerIds: [] };
  await save(state);

  let publishContainerId;
  if (plan.kind === 'story') {
    const container = await request(`${ACCOUNT_ID}/media`, { method: 'POST', body: { media_type: 'STORIES', image_url: assets[0], alt_text: content.altText } });
    if (!container.id) throw new Error('Missing Story container ID; publication remains blocked.');
    state.inFlight.containerIds.push(container.id);
    state.inFlight.stage = 'processing';
    await save(state);
    await waitForContainer(container.id, request, wait);
    publishContainerId = container.id;
  } else if (plan.kind === 'reel') {
    const container = await request(`${ACCOUNT_ID}/media`, { method: 'POST', body: { media_type: 'REELS', video_url: assets[0], caption: content.caption, share_to_feed: 'false' } });
    if (!container.id) throw new Error('Missing Reel container ID; publication remains blocked.');
    state.inFlight.containerIds.push(container.id);
    state.inFlight.stage = 'processing';
    await save(state);
    await waitForContainer(container.id, request, wait);
    publishContainerId = container.id;
  } else if (plan.kind === 'carousel') {
    for (let index = 0; index < assets.length; index += 1) {
      const child = await request(`${ACCOUNT_ID}/media`, { method: 'POST', body: { image_url: assets[index], is_carousel_item: 'true', alt_text: content.items[index].altText } });
      if (!child.id) throw new Error('Missing carousel child container ID; publication remains blocked.');
      state.inFlight.containerIds.push(child.id);
      await save(state);
      await waitForContainer(child.id, request, wait);
    }
    const parent = await request(`${ACCOUNT_ID}/media`, { method: 'POST', body: { media_type: 'CAROUSEL', children: state.inFlight.containerIds.join(','), caption: content.caption } });
    if (!parent.id) throw new Error('Missing carousel container ID; publication remains blocked.');
    state.inFlight.parentContainerId = parent.id;
    state.inFlight.stage = 'processing';
    await save(state);
    await waitForContainer(parent.id, request, wait);
    publishContainerId = parent.id;
  } else throw new Error(`Unsupported growth publication: ${plan.kind}`);

  state.inFlight.stage = 'publishing';
  state.inFlight.publishContainerId = publishContainerId;
  await save(state);
  const published = await request(`${ACCOUNT_ID}/media_publish`, { method: 'POST', body: { creation_id: publishContainerId } });
  if (!published.id) throw new Error('Missing media ID; publication remains blocked.');
  const post = {
    key: plan.key,
    kind: plan.kind,
    variant: plan.variant,
    date: plan.date,
    questionId: plan.questionId,
    questionIds: plan.questionIds,
    mediaId: published.id,
    postedAt: now().toISOString(),
  };
  state.posts.push(post);
  state.inFlight = null;
  await save(state);
  try {
    const media = await request(`${published.id}?fields=id,permalink`);
    if (media.permalink) { post.permalink = media.permalink; await save(state); }
  } catch { /* Publication is already recorded durably. */ }
  return post;
}

async function withLock(action) {
  await fs.mkdir(stateDirectory, { recursive: true });
  let lock;
  try { lock = await fs.open(lockPath, 'wx', 0o600); }
  catch (error) { if (error.code === 'EEXIST') throw new Error('Instagram growth publication is locked. Do not delete the lock without checking for an active process.'); throw error; }
  try { await lock.writeFile(`${process.pid}\n`); return await action(); }
  finally { await lock.close(); await fs.unlink(lockPath); }
}

export async function main(argv = process.argv.slice(2)) {
  await loadEnvFile(path.join(root, '.env.instagram.local'));
  const kind = argv.includes('--story') ? 'story' : argv.includes('--reel') ? 'reel' : argv.includes('--carousel') ? 'carousel' : null;
  if (!kind) throw new Error('Choose --story, --reel, or --carousel.');
  if (process.env.INSTAGRAM_ENABLE_POSTING !== 'true') throw new Error('Instagram publication is disabled.');
  const feedStartDate = process.env.INSTAGRAM_START_DATE;
  const growthStartDate = process.env.INSTAGRAM_GROWTH_START_DATE || defaultGrowthStartDate(feedStartDate);
  const questions = getEligibleQuestions(JSON.parse(await fs.readFile(path.join(root, 'src/data/questions.json'), 'utf8')));
  await withLock(async () => {
    const seriesState = await readJson(seriesStatePath, () => ({ posts: [] }));
    const state = await readJson(growthStatePath, emptyGrowthState);
    const plan = planGrowthPost({ kind, seriesState, growthState: state, growthStartDate });
    if (plan.skip) { console.log(plan.skip); return; }
    await authenticatedAccount();
    const manifest = await publicManifest();
    let content;
    if (kind === 'story') {
      const question = questions.find(item => item.id === plan.questionId);
      content = storyContent(question, plan.variant, process.env.INSTAGRAM_SITE_URL);
    } else if (kind === 'reel') {
      const question = questions.find(item => item.id === plan.questionId);
      content = reelContent(question, process.env.INSTAGRAM_SITE_URL);
    } else {
      content = carouselContent(plan.questionIds.map(id => questions.find(item => item.id === id)), process.env.INSTAGRAM_SITE_URL);
    }
    const filenames = kind === 'carousel' ? content.items.map(item => item.filename) : [content.filename];
    const assets = [];
    for (const filename of filenames) assets.push(await checkPublicAsset(filename, manifest));
    const post = await publishGrowthPlanned({ plan, state, save: value => saveState(growthStatePath, value), request: graphRequest, assets, content });
    console.log(`Published Instagram ${post.variant ? `${post.variant} ` : ''}${post.kind}: ${post.permalink || `media ID ${post.mediaId}`}`);
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
