import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

async function loadModule(path) {
  const source = await readFile(new URL(path, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
}
const { buildExamSession } = await loadModule('../src/utils/examSession.ts');
const { buildQuestionSessionPool } = await loadModule('../src/utils/questions.ts');
const data = JSON.parse(await readFile(new URL('../src/data/questions.json', import.meta.url), 'utf8'));
const pool = buildQuestionSessionPool(data, 'de');
const states = [...new Set(data.filter(question=>question.area_code==='land').map(question=>question.thema))];

test('every state receives 30 unique general questions and exactly 3 of its own questions', () => {
  assert.equal(states.length, 16);
  const originalIds = pool.map(question=>question.id);
  for (const state of states) {
    for (const random of [()=>0, ()=>0.999, Math.random]) {
      const session = buildExamSession(pool, state, random);
      assert.equal(session.length,33);
      assert.equal(new Set(session.map(question=>question.id)).size,33);
      assert.equal(session.filter(question=>!question.stateName).length,30);
      assert.equal(session.filter(question=>question.stateName===state).length,3);
      assert.ok(session.every(question=>!question.stateName || question.stateName===state));
    }
  }
  assert.deepEqual(pool.map(question=>question.id),originalIds);
});

test('empty, unknown, or incomplete state pools cannot start a misleading test', () => {
  assert.deepEqual(buildExamSession(pool,''),[]);
  assert.deepEqual(buildExamSession(pool,'unknown'),[]);
  assert.deepEqual(buildExamSession(pool.filter(question=>question.stateName),states[0]),[]);
  assert.deepEqual(buildExamSession(pool.filter(question=>!question.stateName),states[0]),[]);
});
