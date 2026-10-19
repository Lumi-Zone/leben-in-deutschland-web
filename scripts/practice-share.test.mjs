import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../src/utils/practiceShare.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { buildPracticeShareUrl, sharePracticeLink } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

test('share links retain the public page and replace incoming tracking or private result parameters', () => {
    const link = new URL(buildPracticeShareUrl('https://lid-einbuergerung.de/fa/frage/19/?score=24&utm_source=partner#result', 'question'));
    assert.equal(link.pathname, '/fa/frage/19/');
    assert.equal(link.hash, '');
    assert.deepEqual(Object.fromEntries(link.searchParams), {
        utm_source: 'learner_share', utm_medium: 'referral', utm_campaign: 'question_share',
    });
    assert.equal(new URL(buildPracticeShareUrl('https://lid-einbuergerung.de/tr/exam/', 'exam')).searchParams.get('utm_campaign'), 'exam_share');
    assert.throws(() => buildPracticeShareUrl('http://127.0.0.1:4321/de/', 'exam'));
});

test('native sharing keeps the platform method receiver and does not copy the link', async () => {
    const api = {
        async share(data) { assert.equal(this, api); assert.deepEqual(data, { title: 'Frage teilen', url: 'https://example.com/' }); },
        clipboard: { async writeText() { assert.fail('Native sharing must not also copy'); } },
    };
    assert.equal(await sharePracticeLink(api, 'Frage teilen', 'https://example.com/'), 'native');
});

test('closing the native share sheet does not trigger clipboard fallback', async () => {
    assert.equal(await sharePracticeLink({
        async share() { throw Object.assign(new Error('Cancelled'), { name: 'AbortError' }); },
        clipboard: { async writeText() { assert.fail('Cancellation must not copy'); } },
    }, 'Question', 'https://example.com/'), 'cancelled');
});

test('unsupported or failed native sharing copies the same link with the clipboard receiver', async () => {
    for (const share of [undefined, async () => { throw new Error('Unavailable'); }]) {
        const clipboard = { async writeText(value) { assert.equal(this, clipboard); assert.equal(value, 'https://example.com/'); } };
        assert.equal(await sharePracticeLink({ share, clipboard }, 'Question', 'https://example.com/'), 'copied');
    }
});

test('blocked or absent clipboard offers a manually selectable link', async () => {
    assert.equal(await sharePracticeLink({}, 'Question', 'https://example.com/'), 'manual');
    assert.equal(await sharePracticeLink({ clipboard: { async writeText() { throw new Error('Permission denied'); } } }, 'Question', 'https://example.com/'), 'manual');
});
