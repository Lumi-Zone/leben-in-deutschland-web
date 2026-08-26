import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  buildAltText,
  buildAnswerText,
  buildPostText,
  berlinMinutes,
  createEmptyState,
  getEligibleQuestions,
  parseAutomationSchedule,
  selectNextQuestion,
  shouldRunCatchUp,
  wrapText,
} from './daily-question-core.mjs';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '../..');

const questions = [
  {
    id: 1,
    type: 'General',
    image: '-',
    solution: 'b',
    q_de: 'Eine kurze Frage mit mehreren Wörtern?',
    a1_de: 'Antwort eins',
    a2_de: 'Antwort zwei',
    a3_de: 'Antwort drei',
    a4_de: 'Antwort vier',
  },
  {
    id: 2,
    type: 'General',
    image: 'frage_2',
    solution: 'a',
    q_de: 'Benötigt ein Bild?',
    a1_de: 'Ja',
    a2_de: 'Nein',
    a3_de: 'Vielleicht',
    a4_de: 'Unklar',
  },
  {
    id: 3,
    type: 'General',
    image: '-',
    solution: 'd',
    q_de: 'Noch eine Frage?',
    a1_de: 'Eins',
    a2_de: 'Zwei',
    a3_de: 'Drei',
    a4_de: 'Vier',
  },
  {
    id: 301,
    type: 'State',
    image: '-',
    solution: 'a',
    q_de: 'Eine Bundeslandfrage?',
    a1_de: 'Eins',
    a2_de: 'Zwei',
    a3_de: 'Drei',
    a4_de: 'Vier',
  },
];

test('wrapText preserves words and respects the target where possible', () => {
  const lines = wrapText('eins zwei drei vier fünf', 10);
  assert.deepEqual(lines, ['eins zwei', 'drei vier', 'fünf']);
});

test('all general questions are eligible and state questions are skipped', () => {
  assert.deepEqual(getEligibleQuestions(questions).map((question) => question.id), [1, 2, 3]);
});

test('production pool contains all 300 general questions and every required image', async () => {
  const source = await fs.readFile(path.join(projectRoot, 'src/data/questions.json'), 'utf8');
  const eligible = getEligibleQuestions(JSON.parse(source));
  const imageQuestions = eligible.filter((question) => question.image !== '-');

  assert.equal(eligible.length, 300);
  assert.equal(imageQuestions.length, 11);
  assert.equal(eligible.some((question) => question.type === 'State'), false);

  await Promise.all(imageQuestions.map((question) => fs.access(
    path.join(projectRoot, 'public/question-images/general', `deutschland${question.id}.png`),
  )));
});

test('selection is sequential, repeat-free, and starts a new cycle', () => {
  const state = createEmptyState();
  assert.equal(selectNextQuestion(questions, state).question.id, 1);
  state.posts.push({ cycle: 1, questionId: 1 });
  assert.equal(selectNextQuestion(questions, state).question.id, 2);
  state.posts.push({ cycle: 1, questionId: 2 });
  assert.equal(selectNextQuestion(questions, state).question.id, 3);
  state.posts.push({ cycle: 1, questionId: 3 });
  const restarted = selectNextQuestion(questions, state);
  assert.equal(restarted.question.id, 1);
  assert.equal(restarted.cycle, 2);
});

test('post and next-day answer text stay suitable for X', () => {
  const postText = buildPostText(questions[0]);
  assert.ok(postText.length <= 280);
  assert.match(postText, /Tagesfrage #1/);
  assert.equal(buildAnswerText(questions[0]), 'Auflösung zu Frage #1: B – Antwort zwei ✅');
  assert.match(buildAltText(questions[0]), /A: Antwort eins B: Antwort zwei/);
});

test('catch-up schedule is parsed and only runs after the due time', () => {
  const schedule = parseAutomationSchedule('rrule = "RRULE:FREQ=DAILY;BYHOUR=14;BYMINUTE=39"');
  assert.deepEqual(schedule, { hour: 14, minute: 39, totalMinutes: 879 });
  assert.equal(berlinMinutes(new Date('2026-08-21T12:40:00Z')), 880);

  const state = createEmptyState();
  assert.equal(shouldRunCatchUp({
    state,
    today: '2026-08-21',
    currentMinutes: 878,
    scheduledMinutes: schedule.totalMinutes,
  }), false);
  assert.equal(shouldRunCatchUp({
    state,
    today: '2026-08-21',
    currentMinutes: 879,
    scheduledMinutes: schedule.totalMinutes,
  }), true);

  state.posts.push({ date: '2026-08-21', questionId: 1 });
  assert.equal(shouldRunCatchUp({
    state,
    today: '2026-08-21',
    currentMinutes: 900,
    scheduledMinutes: schedule.totalMinutes,
  }), false);
});
