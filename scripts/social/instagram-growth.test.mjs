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
  reelContent,
  storyContent,
} from './instagram-growth-core.mjs';
import { publishGrowthPlanned } from './instagram-growth-publisher.mjs';

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
