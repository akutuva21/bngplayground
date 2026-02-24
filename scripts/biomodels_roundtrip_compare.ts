import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';

import { fetchBioModelsSbml } from '../services/bioModelsImport';
import { Atomizer, SBMLParser } from '../src/lib/atomizer';
import { parseBNGLStrict } from '../src/parser/BNGLParserWrapper';
import { generateExpandedNetwork } from '../services/simulation/NetworkExpansion';
import { loadEvaluator } from '../services/simulation/ExpressionEvaluator';
import { requiresCompartmentResolution, resolveCompartmentVolumes } from '../services/simulation/CompartmentResolver';
import { exportToSBML } from '../services/exportSBML';
import type { BNGLModel } from '../types';

type RoundtripResult = {
  modelId: string;
  ok: boolean;
  error?: string;
  timedOut?: boolean;
  sourceUrl?: string;
  sourceEntry?: string;
  originalSbmlPath?: string;
  roundtripSbmlPath?: string;
  bnglPath?: string;
  bnglLength?: number;
  phaseTimingsMs?: Record<string, number>;
  compare?: {
    exactXmlMatch: boolean;
    normalizedXmlMatch: boolean;
    countsOriginal: ReturnType<typeof summarizeModel>;
    countsRoundtrip: ReturnType<typeof summarizeModel>;
    countDiff: Record<string, number>;
    speciesIdDelta: { onlyInOriginal: number; onlyInRoundtrip: number };
    reactionIdDelta: { onlyInOriginal: number; onlyInRoundtrip: number };
  };
  durationMs: number;
};

const DEFAULT_IDS = [
  'BIOMD0000000001',
  'BIOMD0000000002',
  'BIOMD0000000007',
  'BIOMD0000000059',
  'BIOMD0000000964',
];

const MODEL_IDS = (process.env.BIOMODELS_IDS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const TARGET_IDS = MODEL_IDS.length > 0 ? MODEL_IDS : DEFAULT_IDS;
const OUT_DIR = path.resolve('artifacts', 'biomodels-roundtrip');
const PER_MODEL_TIMEOUT_MS = Number(process.env.BIOMODELS_ROUNDTRIP_MODEL_TIMEOUT_MS || '90000');
const BATCH_TIMEOUT_MS = Number(process.env.BIOMODELS_ROUNDTRIP_MAX_MS || '600000');

const arg = (name: string): string | null => {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return null;
  return process.argv[idx + 1] ?? null;
};

const singleId = arg('--single');
const cliOutDir = arg('--outdir');
const effectiveOutDir = cliOutDir ? path.resolve(cliOutDir) : OUT_DIR;

const nowIso = () => new Date().toISOString();
const log = (modelId: string, phase: string, msg: string) => {
  console.log(`[roundtrip][${modelId}][${phase}][${nowIso()}] ${msg}`);
};

const withTimeout = async <T>(promise: Promise<T>, ms: number, label: string): Promise<T> => {
  let timer: NodeJS.Timeout | null = null;
  try {
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms} ms`)), ms);
    });
    return await Promise.race([promise, timeout]);
  } finally {
    if (timer) clearTimeout(timer);
  }
};

const normalizeXmlForHash = (xml: string): string =>
  xml
    .replace(/\r\n/g, '\n')
    .replace(/>\s+</g, '><')
    .replace(/\s+/g, ' ')
    .trim();

const hashText = (text: string): string => crypto.createHash('sha256').update(text, 'utf8').digest('hex');

const summarizeModel = (model: any) => ({
  compartments: model.compartments?.size ?? 0,
  species: model.species?.size ?? 0,
  parameters: model.parameters?.size ?? 0,
  reactions: model.reactions?.size ?? 0,
  rules: model.rules?.length ?? 0,
  events: model.events?.length ?? 0,
  functionDefinitions: model.functionDefinitions?.size ?? 0,
  initialAssignments: model.initialAssignments?.length ?? 0,
  unitDefinitions: model.unitDefinitions?.size ?? 0,
});

const mapKeys = (m: any): Set<string> => {
  if (!m || typeof m.keys !== 'function') return new Set<string>();
  return new Set<string>(Array.from(m.keys()).map((x) => String(x)));
};

const setDeltaCount = (a: Set<string>, b: Set<string>): number => {
  let n = 0;
  for (const x of a) {
    if (!b.has(x)) n++;
  }
  return n;
};

const toBnglThenSbml = async (bngl: string): Promise<string> => {
  let model: BNGLModel = parseBNGLStrict(bngl);
  if (requiresCompartmentResolution(model)) {
    model = await resolveCompartmentVolumes(model);
  }

  const hasRules = (model.reactionRules?.length || 0) > 0;
  const hasReactions = (model.reactions?.length || 0) > 0;
  if (hasRules && !hasReactions) {
    await loadEvaluator();
    model = await generateExpandedNetwork(model, () => undefined, () => undefined);
  }

  return await exportToSBML(model);
};

const writeSingleResult = async (result: RoundtripResult) => {
  const modelDir = path.join(effectiveOutDir, result.modelId);
  await fs.mkdir(modelDir, { recursive: true });
  const resultPath = path.join(modelDir, 'result.json');
  await fs.writeFile(resultPath, JSON.stringify(result, null, 2), 'utf8');
  return resultPath;
};

async function roundtripOne(modelId: string): Promise<RoundtripResult> {
  const start = Date.now();
  const parser = new SBMLParser();
  const phaseTimingsMs: Record<string, number> = {};
  const phaseStart = (phase: string) => {
    const t0 = Date.now();
    log(modelId, phase, 'start');
    return () => {
      phaseTimingsMs[phase] = Date.now() - t0;
      log(modelId, phase, `done in ${phaseTimingsMs[phase]} ms`);
    };
  };

  try {
    const endFetch = phaseStart('fetch_sbml');
    const fetched = await withTimeout(fetchBioModelsSbml(modelId), PER_MODEL_TIMEOUT_MS, `${modelId} fetch SBML`);
    endFetch();

    const originalSbml = fetched.sbmlText;
    if (!/<\s*sbml(?:\s|>)/i.test(originalSbml)) {
      throw new Error(`${modelId} payload is not SBML (missing <sbml> root tag).`);
    }
    log(modelId, 'fetch_sbml', `confirmed SBML root; length=${originalSbml.length}`);

    const endAtomize = phaseStart('atomize');
    const atomizer = new Atomizer();
    await withTimeout(atomizer.initialize(), PER_MODEL_TIMEOUT_MS, `${modelId} atomizer init`);
    const atomized = await withTimeout(atomizer.atomize(originalSbml), PER_MODEL_TIMEOUT_MS, `${modelId} atomize`);
    endAtomize();
    if (!atomized.success || !atomized.bngl) {
      throw new Error(atomized.error || 'Atomization returned unsuccessful result.');
    }

    const endBack = phaseStart('bngl_to_sbml');
    const roundtripSbml = await withTimeout(toBnglThenSbml(atomized.bngl), PER_MODEL_TIMEOUT_MS, `${modelId} BNGL->SBML`);
    endBack();

    const endParse = phaseStart('parse_compare');
    await withTimeout(parser.initialize(), PER_MODEL_TIMEOUT_MS, `${modelId} parser init`);
    const parsedOriginal = await withTimeout(parser.parse(originalSbml), PER_MODEL_TIMEOUT_MS, `${modelId} parse original SBML`);
    const parsedRoundtrip = await withTimeout(parser.parse(roundtripSbml), PER_MODEL_TIMEOUT_MS, `${modelId} parse roundtrip SBML`);
    endParse();

    const modelDir = path.join(effectiveOutDir, modelId);
    await fs.mkdir(modelDir, { recursive: true });
    const originalSbmlPath = path.join(modelDir, 'original.sbml.xml');
    const bnglPath = path.join(modelDir, 'atomized.bngl');
    const roundtripSbmlPath = path.join(modelDir, 'roundtrip.sbml.xml');
    await fs.writeFile(originalSbmlPath, originalSbml, 'utf8');
    await fs.writeFile(bnglPath, atomized.bngl, 'utf8');
    await fs.writeFile(roundtripSbmlPath, roundtripSbml, 'utf8');

    const countsOriginal = summarizeModel(parsedOriginal);
    const countsRoundtrip = summarizeModel(parsedRoundtrip);
    const countDiff: Record<string, number> = {};
    for (const key of Object.keys(countsOriginal)) {
      countDiff[key] = (countsRoundtrip as any)[key] - (countsOriginal as any)[key];
    }

    const originalSpecies = mapKeys(parsedOriginal.species);
    const roundtripSpecies = mapKeys(parsedRoundtrip.species);
    const originalReactions = mapKeys(parsedOriginal.reactions);
    const roundtripReactions = mapKeys(parsedRoundtrip.reactions);

    const exactXmlMatch = originalSbml === roundtripSbml;
    const normalizedXmlMatch = hashText(normalizeXmlForHash(originalSbml)) === hashText(normalizeXmlForHash(roundtripSbml));

    return {
      modelId,
      ok: true,
      sourceUrl: fetched.sourceUrl,
      sourceEntry: fetched.sourceEntry,
      originalSbmlPath,
      bnglPath,
      roundtripSbmlPath,
      bnglLength: atomized.bngl.length,
      phaseTimingsMs,
      compare: {
        exactXmlMatch,
        normalizedXmlMatch,
        countsOriginal,
        countsRoundtrip,
        countDiff,
        speciesIdDelta: {
          onlyInOriginal: setDeltaCount(originalSpecies, roundtripSpecies),
          onlyInRoundtrip: setDeltaCount(roundtripSpecies, originalSpecies),
        },
        reactionIdDelta: {
          onlyInOriginal: setDeltaCount(originalReactions, roundtripReactions),
          onlyInRoundtrip: setDeltaCount(roundtripReactions, originalReactions),
        },
      },
      durationMs: Date.now() - start,
    };
  } catch (error) {
    return {
      modelId,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
      phaseTimingsMs,
      durationMs: Date.now() - start,
    };
  }
}

const killProcessTree = async (pid: number): Promise<void> => {
  if (!pid) return;
  if (process.platform === 'win32') {
    await new Promise<void>((resolve) => {
      const killer = spawn('taskkill', ['/pid', String(pid), '/t', '/f'], { stdio: 'ignore' });
      killer.on('error', () => resolve());
      killer.on('exit', () => resolve());
    });
    return;
  }
  try {
    process.kill(pid, 'SIGKILL');
  } catch {
    // ignore
  }
};

async function runSingleMode() {
  if (!singleId) throw new Error('--single requires a model id');
  const result = await roundtripOne(singleId);
  const resultPath = await writeSingleResult(result);
  console.log(`SINGLE_RESULT_PATH=${resultPath}`);
  console.log(`SINGLE_RESULT_STATUS=${result.ok ? 'PASS' : 'FAIL'}`);
  if (!result.ok) process.exitCode = 1;
}

async function runBatchMode() {
  await fs.mkdir(effectiveOutDir, { recursive: true });
  const startedAt = nowIso();

  const watchdog = setTimeout(() => {
    console.error(`[roundtrip] Global kill switch fired at ${BATCH_TIMEOUT_MS} ms`);
    process.exit(124);
  }, BATCH_TIMEOUT_MS);

  try {
    const results: RoundtripResult[] = [];
    for (const id of TARGET_IDS) {
      console.log(`[roundtrip] Spawning child for ${id} (timeout=${PER_MODEL_TIMEOUT_MS}ms)`);
      const modelDir = path.join(effectiveOutDir, id);
      await fs.mkdir(modelDir, { recursive: true });
      const childLogPath = path.join(modelDir, 'child.log');
      await fs.writeFile(childLogPath, '', 'utf8');

      const cmd = `npx tsx scripts/biomodels_roundtrip_compare.ts --single ${id} --outdir "${effectiveOutDir}"`;
      const child = spawn(
        process.platform === 'win32' ? 'cmd.exe' : 'sh',
        process.platform === 'win32' ? ['/d', '/s', '/c', cmd] : ['-lc', cmd],
        { cwd: process.cwd(), stdio: ['ignore', 'pipe', 'pipe'] }
      );

      let timedOut = false;
      const timer = setTimeout(async () => {
        timedOut = true;
        console.error(`[roundtrip] ${id} exceeded ${PER_MODEL_TIMEOUT_MS}ms; killing child PID ${child.pid}`);
        await killProcessTree(child.pid ?? 0);
      }, PER_MODEL_TIMEOUT_MS);

      const appendLog = async (data: string) => {
        await fs.appendFile(childLogPath, data, 'utf8');
      };

      child.stdout.on('data', (d) => {
        const s = String(d);
        process.stdout.write(`[child:${id}] ${s}`);
        void appendLog(s);
      });
      child.stderr.on('data', (d) => {
        const s = String(d);
        process.stderr.write(`[child:${id}:err] ${s}`);
        void appendLog(s);
      });

      const exitCode = await new Promise<number>((resolve) => {
        child.on('exit', (code) => resolve(code ?? 0));
        child.on('error', () => resolve(1));
      });
      clearTimeout(timer);

      const resultPath = path.join(modelDir, 'result.json');
      let result: RoundtripResult;
      try {
        const raw = await fs.readFile(resultPath, 'utf8');
        result = JSON.parse(raw) as RoundtripResult;
      } catch {
        result = {
          modelId: id,
          ok: false,
          timedOut,
          error: timedOut
            ? `Child timed out after ${PER_MODEL_TIMEOUT_MS} ms`
            : `Child exited with code ${exitCode} before writing result.json`,
          durationMs: PER_MODEL_TIMEOUT_MS,
        };
      }

      if (timedOut) {
        result.ok = false;
        result.timedOut = true;
        result.error = result.error || `Child timed out after ${PER_MODEL_TIMEOUT_MS} ms`;
      }
      results.push(result);
      console.log(`[roundtrip] ${result.ok ? 'PASS' : 'FAIL'} ${id} (${result.durationMs} ms) ${result.error ? '- ' + result.error : ''}`);
    }

    const summary = {
      startedAt,
      finishedAt: nowIso(),
      total: results.length,
      passed: results.filter((r) => r.ok).length,
      failed: results.filter((r) => !r.ok).length,
      timeouts: results.filter((r) => r.timedOut).length,
      perModelTimeoutMs: PER_MODEL_TIMEOUT_MS,
      results,
    };

    const reportPath = path.join(
      effectiveOutDir,
      `roundtrip_report_${new Date().toISOString().replace(/[:.]/g, '-')}.json`
    );
    await fs.writeFile(reportPath, JSON.stringify(summary, null, 2), 'utf8');
    console.log(`[roundtrip] Report: ${reportPath}`);
    if (summary.failed > 0) process.exitCode = 1;
  } finally {
    clearTimeout(watchdog);
  }
}

async function main() {
  if (singleId) {
    await runSingleMode();
    return;
  }
  await runBatchMode();
}

main().catch((err) => {
  console.error('[roundtrip] Fatal:', err);
  process.exit(1);
});
