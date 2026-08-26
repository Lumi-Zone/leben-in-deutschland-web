#!/usr/bin/env node

import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  berlinDate,
  berlinMinutes,
  loadState,
  parseAutomationSchedule,
  shouldRunCatchUp,
} from './daily-question-core.mjs';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '../..');
const localDirectory = path.join(projectRoot, '.daily-x');
const statePath = path.join(localDirectory, 'state.json');
const activationPath = path.join(localDirectory, 'catch-up-activation.json');
const postingScriptPath = path.join(scriptDirectory, 'daily-x-question.mjs');
const automationPath = path.join(
  os.homedir(),
  '.codex/automations/her-g-n-x-te-soru-payla/automation.toml',
);

async function runPostingCommand() {
  const child = spawn(process.execPath, [postingScriptPath, '--post'], {
    cwd: projectRoot,
    stdio: 'inherit',
    env: process.env,
  });

  const exitCode = await new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('exit', (code) => resolve(code));
  });

  if (exitCode !== 0) throw new Error(`Telafi paylaşımı ${exitCode} koduyla durdu.`);
}

async function main() {
  const now = new Date();
  const today = berlinDate(now);
  const currentMinutes = berlinMinutes(now);
  try {
    const activation = JSON.parse(await fs.readFile(activationPath, 'utf8'));
    if (activation.notBefore && today < activation.notBefore) {
      console.log(`${today}: telafi kontrolü ${activation.notBefore} tarihinde etkinleşecek.`);
      return;
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const state = await loadState(statePath);
  const automationToml = await fs.readFile(automationPath, 'utf8');
  const schedule = parseAutomationSchedule(automationToml);

  if (!shouldRunCatchUp({
    state,
    today,
    currentMinutes,
    scheduledMinutes: schedule.totalMinutes,
  })) {
    console.log(
      `${today}: telafi gerekmiyor; paylaşım yapılmış veya ${String(schedule.hour).padStart(2, '0')}:${String(schedule.minute).padStart(2, '0')} henüz gelmedi.`,
    );
    return;
  }

  console.log(`${today}: planlanan saat geçmiş ve paylaşım yok; telafi başlatılıyor.`);
  await runPostingCommand();
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
