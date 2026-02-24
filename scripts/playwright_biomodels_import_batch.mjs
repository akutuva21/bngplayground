import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_MODELS = [
  'BIOMD0000000001',
  'BIOMD0000000002',
  'BIOMD0000000003',
  'BIOMD0000000004',
  'BIOMD0000000005',
  'BIOMD0000000006',
  'BIOMD0000000007',
  'BIOMD0000000008',
  'BIOMD0000000009',
  'BIOMD0000000010',
  'BIOMD0000000049',
  'BIOMD0000000059',
  'BIOMD0000000063',
  'BIOMD0000000066',
  'BIOMD0000000145',
  'BIOMD0000000295',
  'BIOMD0000000964',
  'BIOMD0000000968',
  'BIOMD0000000969',
  'BIOMD0000000970',
];

const PORT = Number(process.env.BIOMODELS_PLAYWRIGHT_PORT || '3000');
const BASE_PATH = '/bngplayground/';
const BASE_URL = process.env.APP_URL || `http://127.0.0.1:${PORT}${BASE_PATH}`;
const PER_MODEL_TIMEOUT_MS = Number(process.env.BIOMODELS_MODEL_TIMEOUT_MS || '240000');
const STARTUP_TIMEOUT_MS = Number(process.env.BIOMODELS_STARTUP_TIMEOUT_MS || '60000');
const BATCH_MAX_MS = Number(process.env.BIOMODELS_BATCH_MAX_MS || '1800000'); // 30 min
const OUTPUT_DIR = path.resolve('artifacts');
const MODEL_IDS = (process.env.BIOMODELS_IDS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const TARGET_MODELS = MODEL_IDS.length > 0 ? MODEL_IDS : DEFAULT_MODELS;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function stripAnsi(s) {
  return String(s).replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, '');
}

async function isUrlReachable(url) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(url, { method: 'GET', signal: controller.signal });
    clearTimeout(timer);
    return res.ok || (res.status >= 200 && res.status < 500);
  } catch {
    return false;
  }
}

function startDevServer(port) {
  return new Promise((resolve, reject) => {
    const command = `npm run dev -- --port ${port} --strictPort`;
    const proc = spawn('cmd.exe', ['/d', '/s', '/c', command], {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, BROWSER: 'none' },
    });

    let buffer = '';
    const startedRegex = /Local:\s*(https?:\/\/[^\s]+)/i;

    const onData = (chunk) => {
      const raw = String(chunk);
      process.stdout.write(raw);
      buffer += stripAnsi(raw);
      const match = buffer.match(startedRegex);
      if (match) {
        resolve(proc);
      }
    };

    proc.stdout.on('data', onData);
    proc.stderr.on('data', onData);
    proc.on('error', reject);

    setTimeout(() => {
      reject(new Error(`Timed out waiting for Vite dev server on port ${port}`));
    }, STARTUP_TIMEOUT_MS);
  });
}

async function stopDevServer(proc) {
  if (!proc || proc.killed) return;
  await new Promise((resolve) => {
    const killer = spawn('taskkill', ['/pid', String(proc.pid), '/t', '/f'], {
      stdio: ['ignore', 'ignore', 'ignore'],
    });
    killer.on('error', () => resolve());
    killer.on('exit', () => resolve());
  });
}

async function getEditorCode(page) {
  return await page.evaluate(() => {
    const monacoObj = globalThis.monaco;
    const model = monacoObj?.editor?.getModels?.()?.[0];
    if (!model || typeof model.getValue !== 'function') return '';
    return model.getValue();
  });
}

async function openBioModelsModal(page) {
  const editorPanel = page.getByTestId('editor-panel');
  const loadButton = editorPanel.getByRole('button', { name: 'Load' }).first();
  await loadButton.click();
  await page.getByText('Import from BioModels...').first().click();
  const dialog = page.getByRole('dialog').filter({ hasText: 'Import from BioModels' }).first();
  await dialog.waitFor({ state: 'visible', timeout: 10000 });
  return dialog;
}

async function waitForModalOutcome(page, dialog, timeoutMs) {
  const modalError = dialog.locator('.text-red-600').first();
  const closePromise = dialog.waitFor({ state: 'hidden', timeout: timeoutMs }).then(() => ({ kind: 'closed' }));
  const modalErrorPromise = modalError.waitFor({ state: 'visible', timeout: timeoutMs }).then(async () => ({
    kind: 'modal_error',
    message: (await modalError.textContent())?.trim() || 'Unknown BioModels modal error',
  }));

  return await Promise.race([closePromise, modalErrorPromise]);
}

async function waitForAtomizeOutcome(page, timeoutMs) {
  const successLocator = page.getByText('SBML imported successfully!').first();
  const errorLocator = page
    .locator('p.text-sm.font-medium')
    .filter({ hasText: /Import failed:|Failed to read SBML file\./ })
    .first();

  const successPromise = successLocator.waitFor({ state: 'visible', timeout: timeoutMs }).then(() => ({
    kind: 'success',
  }));
  const errorPromise = errorLocator.waitFor({ state: 'visible', timeout: timeoutMs }).then(async () => ({
    kind: 'status_error',
    message: (await errorLocator.textContent())?.trim() || 'Unknown atomization error',
  }));

  return await Promise.race([successPromise, errorPromise]);
}

async function runOneImport(page, modelId) {
  const startTs = Date.now();
  const result = {
    modelId,
    ok: false,
    durationMs: 0,
    phase: 'init',
    error: null,
    codeLength: 0,
  };

  try {
    const codeBefore = await getEditorCode(page);
    const dialog = await openBioModelsModal(page);
    result.phase = 'fetch';

    const input = dialog.getByPlaceholder('BioModels ID');
    await input.fill(modelId);
    await dialog.getByRole('button', { name: 'Fetch & Import' }).click();

    const modalOutcome = await waitForModalOutcome(page, dialog, PER_MODEL_TIMEOUT_MS);
    if (modalOutcome.kind === 'modal_error') {
      result.phase = 'fetch';
      result.error = modalOutcome.message;
      try {
        await dialog.getByRole('button', { name: 'Cancel' }).click({ timeout: 1000 });
      } catch {
        // ignore
      }
      return result;
    }

    result.phase = 'atomize';
    const atomizeOutcome = await waitForAtomizeOutcome(page, PER_MODEL_TIMEOUT_MS);
    if (atomizeOutcome.kind === 'status_error') {
      result.error = atomizeOutcome.message;
      return result;
    }

    await delay(250);
    const codeAfter = await getEditorCode(page);
    result.codeLength = codeAfter.length;

    if (!/begin\s+model/i.test(codeAfter)) {
      result.error = 'BNGL editor content missing "begin model" after reported success.';
      return result;
    }

    // Guard against stale no-op success.
    if (codeAfter === codeBefore) {
      result.error = 'Editor code did not change after import.';
      return result;
    }

    result.ok = true;
    result.phase = 'done';
    return result;
  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
    return result;
  } finally {
    result.durationMs = Date.now() - startTs;
  }
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const reportPath = path.join(
    OUTPUT_DIR,
    `biomodels_playwright_batch_${new Date().toISOString().replace(/[:.]/g, '-')}.json`
  );

  let devServer = null;
  const results = [];
  let watchdog = null;
  let timedOut = false;

  try {
    watchdog = setTimeout(() => {
      timedOut = true;
      console.error(`[biomodels-batch] Kill switch reached after ${BATCH_MAX_MS}ms. Exiting.`);
      process.exitCode = 124;
      // Force exit to avoid hanging terminal sessions.
      process.exit(124);
    }, BATCH_MAX_MS);

    const reachable = await isUrlReachable(BASE_URL);
    if (!reachable) {
      console.log(`[biomodels-batch] Starting dev server (target ${BASE_URL})`);
      devServer = await startDevServer(PORT);
      const ok = await isUrlReachable(BASE_URL);
      if (!ok) {
        throw new Error(`Dev server started but URL still unreachable: ${BASE_URL}`);
      }
    } else {
      console.log(`[biomodels-batch] Reusing existing server at ${BASE_URL}`);
    }

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const consoleErrors = [];
    page.on('pageerror', (err) => consoleErrors.push(`[pageerror] ${err.message}`));
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(`[console.error] ${msg.text()}`);
      }
    });

    await page.goto(BASE_URL, { waitUntil: 'load', timeout: 60000 });
    await page.waitForFunction(() => !!globalThis.monaco, null, { timeout: 60000 });
    await page.getByTestId('editor-panel').waitFor({ state: 'visible', timeout: 10000 });

    for (const modelId of TARGET_MODELS) {
      console.log(`[biomodels-batch] Importing ${modelId} ...`);
      const res = await runOneImport(page, modelId);
      results.push(res);
      if (res.ok) {
        console.log(`[biomodels-batch] PASS ${modelId} (${res.durationMs} ms)`);
      } else {
        console.log(`[biomodels-batch] FAIL ${modelId} (${res.durationMs} ms): ${res.error}`);
      }
    }

    await browser.close();

    const passed = results.filter((r) => r.ok).length;
    const failed = results.length - passed;
    const report = {
      baseUrl: BASE_URL,
      perModelTimeoutMs: PER_MODEL_TIMEOUT_MS,
      startedAt: new Date(Date.now() - results.reduce((sum, r) => sum + (r.durationMs || 0), 0)).toISOString(),
      finishedAt: new Date().toISOString(),
      totals: {
        total: results.length,
        passed,
        failed,
      },
      results,
      consoleErrors,
    };

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

    console.log(`[biomodels-batch] Report written to ${reportPath}`);
    console.log(`[biomodels-batch] Summary: ${passed}/${results.length} passed`);
    if (failed > 0 && !timedOut) process.exitCode = 1;
  } catch (error) {
    console.error('[biomodels-batch] Fatal error:', error);
    process.exitCode = 1;
  } finally {
    if (watchdog) clearTimeout(watchdog);
    await stopDevServer(devServer);
  }
}

main();
