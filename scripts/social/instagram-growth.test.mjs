import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs/promises';
import { getEligibleQuestions } from './daily-question-core.mjs';
import { ACCOUNT_ID } from './instagram-series-core.mjs';
import {
  carouselContent,
  defaultGrowthStartDate,
  emptyGrowthState,
  planGrowthPost,
  reelFrameSvg,
  reelContent,
  storySvg,
  storyContent,
} from './instagram-growth-core.mjs';
import { assertGrowthAccount, formatGraphApiError, publishGrowthPlanned } from './instagram-growth-publisher.mjs';

const questions = getEligibleQuestions(JSON.parse(await fs.readFile(new URL('../../src/data/questions.json', import.meta.url), 'utf8')));
const questionById = id => questions.find(question => question.id === id);
const feedPost = (date, slot, questionId) => ({ date, slot, questionId, key: `${ACCOUNT_ID}/${date}/${slot}` });

test('growth starts seven days after the Feed baseline by default', () => {
  assert.equal(defaultGrowthStartDate('2026-09-08'), '2026-09-15');
});

test('Stories follow the published Feed question and answer', () => {
  const seriesState = { posts: [feedPost('2026-09-16', 'question', 1)] };
  const growthState = emptyGrowthState();
  const morning = planGrowthPost({ kind: 'story', seriesState, growthState, now: new Date('2026-09-16T07:00:00Z'), growthStartDate: '2026-09-15' });
  assert.equal(morning.variant, 'question');
  assert.equal(morning.questionId, 1);
  assert.match(planGrowthPost({ kind: 'story', seriesState, growthState, now: new Date('2026-09-16T15:00:00Z'), growthStartDate: '2026-09-15' }).skip, /answer Feed post is missing/);
  seriesState.posts.push(feedPost('2026-09-16', 'answer', 1));
  assert.equal(planGrowthPost({ kind: 'story', seriesState, growthState, now: new Date('2026-09-16T15:00:00Z'), growthStartDate: '2026-09-15' }).variant, 'answer');
});

test('Reels run Monday, Wednesday and Friday only after the daily Feed sequence', () => {
  const seriesState = { posts: [
    feedPost('2026-09-16', 'question', 3),
    feedPost('2026-09-16', 'answer', 3),
    feedPost('2026-09-16', 'lesson', 3),
  ] };
  const growthState = emptyGrowthState();
  const plan = planGrowthPost({ kind: 'reel', seriesState, growthState, now: new Date('2026-09-16T18:30:00Z'), growthStartDate: '2026-09-15' });
  assert.equal(plan.questionId, 3);
  assert.match(planGrowthPost({ kind: 'reel', seriesState, growthState, now: new Date('2026-09-17T18:30:00Z'), growthStartDate: '2026-09-15' }).skip, /Outside/);
});

test('Sunday carousel uses the five most recent unique published questions', () => {
  const dates = ['2026-09-15', '2026-09-16', '2026-09-17', '2026-09-18', '2026-09-19', '2026-09-20'];
  const seriesState = { posts: dates.flatMap((date, index) => [
    feedPost(date, 'question', index + 1),
    feedPost(date, 'answer', index + 1),
  ]) };
  const plan = planGrowthPost({ kind: 'carousel', seriesState, growthState: emptyGrowthState(), now: new Date('2026-09-20T18:30:00Z'), growthStartDate: '2026-09-15' });
  assert.deepEqual(plan.questionIds, [2, 3, 4, 5, 6]);
});

test('growth content has stable public asset names and valid captions', () => {
  const question = questionById(1);
  assert.equal(storyContent(question, 'question').filename, 'story/frage-1-question.jpg');
  const reel = reelContent(question);
  assert.equal(reel.language, 'tr');
  assert.ok(reel.caption.length <= 2200);
  const carousel = carouselContent(questions.slice(0, 5));
  assert.equal(carousel.items.length, 8);
  assert.ok(carousel.caption.length <= 2200);
});

test('Story artwork contains the question and all four answer choices with minimal supporting copy', () => {
  const question = questionById(3);
  const answer = { label: 'A' };
  const questionArtwork = storySvg({ question, answer, reveal: false });
  const answerArtwork = storySvg({ question, answer, reveal: true });
  for (const value of [question.q_de, question.a1_de, question.a2_de, question.a3_de, question.a4_de]) {
    assert.ok(questionArtwork.includes(value.split(/\s+/).slice(0, 2).join(' ')));
  }
  assert.doesNotMatch(questionArtwork, /Schon mitgemacht|Zum Profil|Feed-Beitrag/);
  assert.match(answerArtwork, /LÖSUNG A/);
  assert.match(answerArtwork, /fill="#F7D44B" stroke="#F7D44B"/);
});

test('Reel artwork uses a localized hook, four choices and a highlighted answer', () => {
  const turkishQuestion = questionById(1);
  const arabicQuestion = questionById(2);
  const answer = { label: 'D' };
  const hook = reelFrameSvg({ type: 'reel-hook', question: turkishQuestion, answer, language: 'tr' });
  const translation = reelFrameSvg({ type: 'reel-translation', question: arabicQuestion, answer, language: 'ar' });
  const question = reelFrameSvg({ type: 'reel-question', question: turkishQuestion, answer, language: 'tr' });
  const reveal = reelFrameSvg({ type: 'reel-answer', question: turkishQuestion, answer, language: 'tr' });
  assert.match(hook, /Bu soruyu 15/);
  assert.match(hook, /saniyede çözebilir/);
  assert.match(hook, />15<|>15<\/text>/);
  assert.ok(translation.includes(arabicQuestion.q_ar.split(/\s+/).slice(0, 2).join(' ')));
  for (const label of ['A', 'B', 'C', 'D']) assert.match(question, new RegExp(`>${label}<`));
  assert.match(reveal, /LÖSUNG D/);
  assert.doesNotMatch(reveal, /Mehr Fragen|Link im Profil/);
});

function publicationFixture(kind, failure = null) {
  const state = emptyGrowthState();
  const plan = { kind, key: `${ACCOUNT_ID}/2026-09-20/${kind}`, date: '2026-09-20', questionId: 1, questionIds: [1, 2, 3, 4, 5] };
  const writes = [];
  const calls = [];
  let child = 0;
  const request = async (endpoint, options = {}) => {
    calls.push([endpoint, options]);
    if (endpoint.endsWith('/media_publish')) {
      if (failure === 'publish') throw new Error('timeout');
      return { id: 'published-media' };
    }
    if (endpoint.endsWith('/media')) {
      if (options.body.media_type === 'CAROUSEL') return { id: 'carousel-parent' };
      child += 1;
      return { id: `container-${child}` };
    }
    if (endpoint.includes('?fields=status_code')) return { status_code: 'FINISHED' };
    return { id: 'published-media', permalink: 'https://www.instagram.com/p/example/' };
  };
  const content = kind === 'carousel'
    ? carouselContent(questions.slice(0, 5))
    : kind === 'story'
      ? storyContent(questionById(1), 'question')
      : reelContent(questionById(1));
  const assets = kind === 'carousel' ? content.items.map((_, index) => `https://example.com/${index}.jpg`) : [`https://example.com/media.${kind === 'reel' ? 'mp4' : 'jpg'}`];
  return { plan, state, save: async value => writes.push(structuredClone(value)), request, assets, content, wait: async () => {}, writes, calls };
}

test('Reels publish outside the main Feed and save success before permalink lookup', async () => {
  const fixture = publicationFixture('reel');
  await publishGrowthPlanned(fixture);
  const create = fixture.calls.find(([endpoint]) => endpoint.endsWith('/media'))[1];
  assert.equal(create.body.media_type, 'REELS');
  assert.equal(create.body.share_to_feed, 'false');
  assert.equal(fixture.state.inFlight, null);
  assert.equal(fixture.state.posts.length, 1);
});

test('Stories send only the supported container parameters', async () => {
  const fixture = publicationFixture('story');
  await publishGrowthPlanned(fixture);
  const create = fixture.calls.find(([endpoint]) => endpoint.endsWith('/media'))[1];
  assert.deepEqual(create.body, {
    media_type: 'STORIES',
    image_url: 'https://example.com/media.jpg',
  });
});

test('Graph API errors retain safe diagnostic fields', () => {
  const formatted = formatGraphApiError(400, {
    code: 100,
    error_subcode: 2207003,
    type: 'OAuthException',
    message: 'Invalid parameter\nvalue; access_token=secret-token',
    fbtrace_id: 'trace-id',
  });
  assert.equal(formatted, 'Instagram API failed (HTTP 400, code 100, subcode 2207003, type OAuthException, message Invalid parameter value; access_token=[redacted], trace trace-id).');
});

test('Story publishing requires the approved Business account', () => {
  assert.equal(assertGrowthAccount({ username: 'einbuergerungstest2026', account_type: 'BUSINESS' }, { requireBusiness: true }).account_type, 'BUSINESS');
  assert.throws(
    () => assertGrowthAccount({ username: 'einbuergerungstest2026', account_type: 'MEDIA_CREATOR' }, { requireBusiness: true }),
    /require a Business account/,
  );
  assert.equal(assertGrowthAccount({ username: 'einbuergerungstest2026', account_type: 'MEDIA_CREATOR' }).account_type, 'MEDIA_CREATOR');
});

test('carousel creates eight children, one parent and publishes only the parent', async () => {
  const fixture = publicationFixture('carousel');
  await publishGrowthPlanned(fixture);
  const creates = fixture.calls.filter(([endpoint]) => endpoint.endsWith('/media'));
  assert.equal(creates.length, 9);
  assert.equal(creates.at(-1)[1].body.media_type, 'CAROUSEL');
  assert.equal(creates.at(-1)[1].body.children.split(',').length, 8);
  assert.equal(fixture.calls.filter(([endpoint]) => endpoint.endsWith('/media_publish')).length, 1);
});

test('uncertain publish outcome leaves growth state blocked against duplicates', async () => {
  const fixture = publicationFixture('story', 'publish');
  await assert.rejects(publishGrowthPlanned(fixture), /timeout/);
  assert.equal(fixture.state.inFlight.stage, 'publishing');
  await assert.rejects(publishGrowthPlanned(fixture), /Unresolved/);
  assert.equal(fixture.calls.filter(([endpoint]) => endpoint.endsWith('/media_publish')).length, 1);
});
