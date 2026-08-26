#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DEFAULT_ACCOUNT_USERNAME,
  DEFAULT_SITE_URL,
  berlinDate,
  buildAltText,
  buildAnswerText,
  buildPostText,
  loadEnvFile,
  loadState,
  renderQuestionCard,
  saveState,
  selectNextQuestion,
} from './daily-question-core.mjs';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '../..');
const questionsPath = path.join(projectRoot, 'src/data/questions.json');
const logoPath = path.join(projectRoot, 'public/logo.png');
const generalQuestionImagesDirectory = path.join(projectRoot, 'public/question-images/general');
const localDirectory = path.join(projectRoot, '.daily-x');
const outputDirectory = path.join(localDirectory, 'output');
const statePath = path.join(localDirectory, 'state.json');
const postLockPath = path.join(localDirectory, 'post.lock');
const envPath = path.join(projectRoot, '.env.x.local');

function parseArguments(argv) {
  const mode = argv.includes('--post') ? 'post' : argv.includes('--verify') ? 'verify' : 'preview';
  const questionIndex = argv.indexOf('--question');
  const questionId = questionIndex >= 0 ? Number.parseInt(argv[questionIndex + 1], 10) : null;
  if (questionIndex >= 0 && !Number.isInteger(questionId)) {
    throw new Error('--question için geçerli bir sayı verin.');
  }
  return { mode, questionId };
}

function requireCredentials() {
  const names = ['X_API_KEY', 'X_API_SECRET', 'X_ACCESS_TOKEN', 'X_ACCESS_TOKEN_SECRET'];
  const missing = names.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    throw new Error(`Eksik X bilgileri: ${missing.join(', ')}. .env.x.local dosyasını tamamlayın.`);
  }

  return {
    appKey: process.env.X_API_KEY,
    appSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
  };
}

async function createAuthenticatedClient({ requirePostingEnabled = true } = {}) {
  if (requirePostingEnabled && process.env.X_ENABLE_POSTING !== 'true') {
    throw new Error('Gerçek paylaşım kilitli. .env.x.local içinde X_ENABLE_POSTING=true ayarlanmalı.');
  }

  const { TwitterApi } = await import('twitter-api-v2');
  const client = new TwitterApi(requireCredentials());
  const expectedUsername = process.env.X_ACCOUNT_USERNAME || DEFAULT_ACCOUNT_USERNAME;
  const me = await client.v2.me({ 'user.fields': ['username'] });
  const actualUsername = me.data.username;
  if (actualUsername.toLowerCase() !== expectedUsername.toLowerCase()) {
    throw new Error(
      `Güvenlik kontrolü başarısız: @${actualUsername} bağlı, @${expectedUsername} bekleniyordu.`,
    );
  }
  return { client, username: actualUsername };
}

async function run({ mode, questionId }) {
  await loadEnvFile(envPath);

  if (mode === 'verify') {
    const { username } = await createAuthenticatedClient({ requirePostingEnabled: false });
    console.log(`X bağlantısı doğrulandı: @${username}. Gerçek paylaşım yapılmadı.`);
    return;
  }

  const questions = JSON.parse(await fs.readFile(questionsPath, 'utf8'));
  const state = await loadState(statePath);
  const today = berlinDate();

  if (mode === 'post' && state.inFlight) {
    throw new Error(
      `Önceki paylaşımın sonucu belirsiz (Frage #${state.inFlight.questionId}, ${state.inFlight.startedAt}). ` +
      'state.json kontrol edilmeden yeniden gönderim yapılmayacak.',
    );
  }

  const alreadyPostedToday = state.posts.some((post) => post.date === today);
  if (mode === 'post' && alreadyPostedToday) {
    console.log(`${today} için soru zaten paylaşılmış; ikinci paylaşım engellendi.`);
    return;
  }

  const selection = selectNextQuestion(questions, state, questionId);
  const question = selection.question;
  const outputPath = path.join(outputDirectory, `${today}-frage-${question.id}.png`);
  const questionImagePath = question.image === '-'
    ? null
    : path.join(generalQuestionImagesDirectory, `deutschland${question.id}.png`);
  if (questionImagePath) {
    try {
      await fs.access(questionImagePath);
    } catch {
      throw new Error(`Frage #${question.id} için kaynak görsel bulunamadı: ${questionImagePath}`);
    }
  }
  await renderQuestionCard({ question, logoPath, outputPath, questionImagePath });

  const postText = buildPostText(question, process.env.X_SITE_URL || DEFAULT_SITE_URL);
  if (postText.length > 280) throw new Error(`Gönderi metni ${postText.length} karakter; X sınırını aşıyor.`);

  if (mode === 'preview') {
    console.log(`Önizleme hazır: ${outputPath}`);
    console.log(`\n${postText}\n`);
    console.log('Gerçek paylaşım yapılmadı.');
    return;
  }

  const { client, username } = await createAuthenticatedClient();

  const pendingAnswers = state.posts.filter((post) => post.date < today && !post.answerPostId);
  for (const pending of pendingAnswers) {
    const previousQuestion = questions.find((candidate) => candidate.id === pending.questionId);
    if (!previousQuestion) continue;
    try {
      const answer = await client.v2.reply(buildAnswerText(previousQuestion), pending.postId);
      pending.answerPostId = answer.data.id;
      pending.answeredAt = new Date().toISOString();
      await saveState(statePath, state);
      console.log(`Frage #${pending.questionId} cevabı paylaşıldı.`);
    } catch (error) {
      console.warn(`Frage #${pending.questionId} cevabı paylaşılmadı: ${error.message}`);
    }
  }

  state.inFlight = {
    questionId: question.id,
    date: today,
    startedAt: new Date().toISOString(),
  };
  await saveState(statePath, state);

  const mediaId = await client.v1.uploadMedia(outputPath, { mimeType: 'image/png' });
  await client.v1.createMediaMetadata(mediaId, {
    alt_text: { text: buildAltText(question) },
  });
  const post = await client.v2.tweet({
    text: postText,
    media: { media_ids: [mediaId] },
  });

  state.cycle = selection.cycle;
  state.posts.push({
    cycle: selection.cycle,
    questionId: question.id,
    date: today,
    postId: post.data.id,
    postedAt: new Date().toISOString(),
    imagePath: path.relative(projectRoot, outputPath),
  });
  state.inFlight = null;
  await saveState(statePath, state);

  console.log(`Frage #${question.id} @${username} hesabında paylaşıldı: https://x.com/${username}/status/${post.data.id}`);
}

async function acquirePostLock() {
  await fs.mkdir(localDirectory, { recursive: true });

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const handle = await fs.open(postLockPath, 'wx', 0o600);
      await handle.writeFile(`${process.pid} ${new Date().toISOString()}\n`);
      return handle;
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;

      const stats = await fs.stat(postLockPath);
      const isStale = Date.now() - stats.mtimeMs > 30 * 60 * 1000;
      if (!isStale || attempt === 1) return null;
      await fs.unlink(postLockPath);
    }
  }

  return null;
}

async function main() {
  const args = parseArguments(process.argv.slice(2));
  if (args.mode !== 'post') {
    await run(args);
    return;
  }

  const lockHandle = await acquirePostLock();
  if (!lockHandle) {
    console.log('Başka bir paylaşım işlemi çalışıyor; yinelenen gönderim engellendi.');
    return;
  }

  try {
    await run(args);
  } finally {
    await lockHandle.close();
    await fs.unlink(postLockPath).catch((error) => {
      if (error.code !== 'ENOENT') throw error;
    });
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
