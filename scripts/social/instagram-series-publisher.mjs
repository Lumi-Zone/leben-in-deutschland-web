import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { loadEnvFile, saveState, getEligibleQuestions } from './daily-question-core.mjs';
import { ACCOUNT, ACCOUNT_ID, SLOTS, contentFor, emptySeriesState, planPost, renderSeriesCard, sourceFingerprint } from './instagram-series-core.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const stateDirectory = path.join(root, '.daily-instagram', ACCOUNT_ID);
const statePath = path.join(stateDirectory, 'state-v2.json');
const lockPath = path.join(stateDirectory, 'post.lock');

export async function publishPlanned({ plan, state, save, request, imageUrl, caption, altText, wait = ms => new Promise(resolve => setTimeout(resolve, ms)), now = () => new Date() }) {
  // Persist intent before any mutating request. An ambiguous outcome must never be retried.
  const key = `${state.accountId}/${plan.date}/${plan.slot}`;
  if (state.inFlight) throw new Error('Unresolved publication; manual reconciliation required.');
  if (state.posts.some(p => p.key === key)) throw new Error('Slot already published.');
  state.inFlight = { key, date: plan.date, slot: plan.slot, questionId: plan.question.id, startedAt: now().toISOString(), stage: 'creating' };
  await save(state);
  const container = await request(`${state.accountId}/media`, { method: 'POST', body: { image_url: imageUrl, caption, alt_text: altText } });
  if (!container.id) throw new Error('Missing container ID; publication remains blocked.');
  state.inFlight.containerId = container.id;
  state.inFlight.stage = 'processing';
  await save(state);
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const status = await request(`${container.id}?fields=status_code`);
    if (status.status_code === 'FINISHED') { ready = true; break; }
    if (['ERROR', 'EXPIRED', 'PUBLISHED'].includes(status.status_code)) throw new Error(`Unexpected container state ${status.status_code}; manual reconciliation required.`);
    await wait(3000);
  }
  if (!ready) throw new Error('Media processing timed out; publication remains blocked.');
  state.inFlight.stage = 'publishing';
  await save(state);
  const published = await request(`${state.accountId}/media_publish`, { method: 'POST', body: { creation_id: container.id } });
  if (!published.id) throw new Error('Missing media ID; publication remains blocked.');
  const post = { key, date: plan.date, slot: plan.slot, questionId: plan.question.id, cycle: plan.cycle, mediaId: published.id, imageUrl, postedAt: now().toISOString() };
  state.posts.push(post);
  state.cycle = plan.cycle;
  state.inFlight = null;
  // Save success before asking for the permalink. A failed permalink lookup must not cause a repost.
  await save(state);
  try {
    const media = await request(`${published.id}?fields=id,permalink`);
    if (media.permalink) { post.permalink = media.permalink; await save(state); }
  } catch { /* The publication is already recorded durably. */ }
  return post;
}

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
      method, headers: { Authorization: `Bearer ${process.env.INSTAGRAM_ACCESS_TOKEN}`, ...(body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}) },
      body: body ? new URLSearchParams(body) : undefined, signal: AbortSignal.timeout(30000),
    });
  } catch { throw new Error('Instagram network request failed. No automatic retry.'); }
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.error) throw new Error(`Instagram API failed (HTTP ${response.status}, code ${data.error?.code || 'unknown'}).`);
  return data;
}

async function authenticatedAccount() {
  const account = await graphRequest(`${ACCOUNT_ID}?fields=id,username`);
  if (account.username?.toLowerCase() !== ACCOUNT) throw new Error('Instagram username mismatch; publication blocked.');
  return account;
}

function mediaBase() {
  const site = process.env.INSTAGRAM_SITE_URL || 'https://lid-einbuergerung.de';
  const parsed = new URL(site);
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password) throw new Error('A public HTTPS site URL is required.');
  return `${site.replace(/\/$/, '')}/instagram/series-v1`;
}

async function checkPublicImage(filename) {
  const manifestResponse = await fetch(`${mediaBase()}/manifest.json`, { signal: AbortSignal.timeout(30000) });
  if (!manifestResponse.ok) throw new Error('Published Instagram manifest is missing.');
  const manifest = await manifestResponse.json();
  if (manifest.version !== 1 || manifest.account !== ACCOUNT || manifest.sourceFingerprint !== await sourceFingerprint(root)) throw new Error('Published cards are based on different source content. Deploy the approved cards first.');
  const url = `${mediaBase()}/${filename}`;
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok || !response.headers.get('content-type')?.startsWith('image/jpeg')) throw new Error(`Public JPEG is not ready: ${filename} (HTTP ${response.status}).`);
  const remote = Buffer.from(await response.arrayBuffer());
  const hash = bytes => createHash('sha256').update(bytes).digest('hex');
  if (manifest.images?.[filename] !== hash(remote)) throw new Error(`Public card differs from the approved local card: ${filename}.`);
  return url;
}

async function readState() {
  try { return JSON.parse(await fs.readFile(statePath, 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return emptySeriesState(); throw error; }
}

async function withLock(action) {
  await fs.mkdir(stateDirectory, { recursive: true });
  let lock;
  try { lock = await fs.open(lockPath, 'wx', 0o600); }
  catch (error) { if (error.code === 'EEXIST') throw new Error('Instagram publication is locked. Do not delete the lock without checking for an active process.'); throw error; }
  try { await lock.writeFile(`${process.pid}\n`); return await action(); }
  finally { await lock.close(); await fs.unlink(lockPath); }
}

export async function main(argv = process.argv.slice(2)) {
  await loadEnvFile(path.join(root, '.env.instagram.local'));
  const mode = argv.includes('--post') ? 'post' : argv.includes('--check-ready') ? 'check' : argv.includes('--verify') ? 'verify' : 'preview';
  if (mode === 'verify' || mode === 'check') {
    await authenticatedAccount();
    if (mode === 'check') {
      await graphRequest(`${ACCOUNT_ID}/content_publishing_limit`);
      for (const slot of SLOTS) await checkPublicImage(`frage-1-${slot.id}.jpg`);
    }
    console.log(`Instagram ${mode === 'check' ? 'account and three public cards' : 'connection'} verified: @${ACCOUNT}. No publication performed.`);
    return;
  }
  const questions = JSON.parse(await fs.readFile(path.join(root, 'src/data/questions.json'), 'utf8'));
  if (mode === 'preview') {
    const index = argv.indexOf('--question');
    const id = index >= 0 ? Number(argv[index + 1]) : 1;
    const question = getEligibleQuestions(questions).find(q => q.id === id);
    if (!question) throw new Error('Invalid question ID.');
    for (const slot of SLOTS) {
      const content = contentFor(question, slot.id);
      const target = path.join(root, '.daily-instagram/output', content.filename);
      await renderSeriesCard({ question, slot: slot.id, outputPath: target, imageDirectory: path.join(root, 'public/question-images/general') });
      await fs.writeFile(target.replace('.jpg', '.txt'), content.caption);
      console.log(`${slot.time} ${slot.label}: ${target}`);
    }
    console.log('Preview only. No publication performed.');
    return;
  }
  if (process.env.INSTAGRAM_ENABLE_POSTING !== 'true') throw new Error('Instagram publication is disabled.');
  const startDate = process.env.INSTAGRAM_START_DATE;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate || '')) throw new Error('Set INSTAGRAM_START_DATE (YYYY-MM-DD) before scheduling.');
  await withLock(async () => {
    const state = await readState();
    const plan = planPost({ questions, state, startDate });
    if (plan.skip) { console.log(plan.skip); return; }
    await authenticatedAccount();
    const content = contentFor(plan.question, plan.slot, process.env.INSTAGRAM_SITE_URL);
    const imageUrl = await checkPublicImage(content.filename);
    // Do not publish in a different time slot if a slow network crossed a boundary.
    const current = planPost({ questions, state, startDate });
    if (current.skip || current.date !== plan.date || current.slot !== plan.slot) throw new Error('Time slot changed during verification; nothing published.');
    const post = await publishPlanned({ plan, state, save: s => saveState(statePath, s), request: graphRequest, imageUrl, caption: content.caption, altText: content.altText });
    console.log(`Published ${post.slot}, Frage #${post.questionId}, @${ACCOUNT}: ${post.permalink || `media ID ${post.mediaId}`}`);
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
