/// <reference lib="webworker" />
import './workerPolyfills';

import type {
  BNGLModel,
  SimulationOptions,
  WorkerRequest,
  WorkerResponse,
  SerializedWorkerError,
  NetworkGeneratorOptions,
} from '../types';

// SafeExpressionEvaluator will be dynamically imported only when functional rates are enabled to avoid bundling vulnerable libs
// Using official ANTLR parser for bng2.pl parity (util polyfill added in vite.config.ts)
import { parseBNGLStrict as parseBNGLModel } from '../src/parser/BNGLParserWrapper';

const ctx: DedicatedWorkerGlobalScope = typeof self !== 'undefined'
  ? (self as unknown as DedicatedWorkerGlobalScope)
  : ({} as unknown as DedicatedWorkerGlobalScope);

// Feature flags & runtime configuration moved to a small module
// (keeps the worker file smaller and test-friendly)
// featureFlags import removed as unused in worker shell
import { generateExpandedNetwork as generateExpandedNetworkService } from './simulation/NetworkExpansion';
import {
  getCacheSizes as getEvaluatorCacheSizes,
  loadEvaluator
} from './simulation/ExpressionEvaluator';
import { simulate } from './simulation/SimulationLoop';

type JobState = {
  cancelled: boolean;
  controller?: AbortController;
};

const jobStates = new Map<number, JobState>();

// Ring buffer for logs to prevent memory blowup
// Default size (1000) chosen to capture ~5-10 minutes of active simulation logs
class LogRingBuffer {
  private buffer: string[] = [];
  private maxSize: number;
  private writeIndex = 0;

  constructor(maxSize: number = 1000) {
    this.maxSize = maxSize;
  }

  add(message: string) {
    this.buffer[this.writeIndex] = `[${new Date().toISOString()}] ${message}`;
    this.writeIndex = (this.writeIndex + 1) % this.maxSize;
  }

  getAll(): string[] {
    const result: string[] = [];
    for (let i = 0; i < this.maxSize; i++) {
      const index = (this.writeIndex - 1 - i + this.maxSize) % this.maxSize;
      if (this.buffer[index]) {
        result.push(this.buffer[index]);
      } else {
        break;
      }
    }
    return result.reverse();
  }

  clear() {
    this.buffer = [];
    this.writeIndex = 0;
  }
}

const logBuffer = new LogRingBuffer(1000);

const safeStringify = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (value instanceof Error) {
    return `${value.name}: ${value.message}`;
  }
  try {
    const seen = new WeakSet<object>();
    return JSON.stringify(value, (_key, v) => {
      if (typeof v === 'object' && v !== null) {
        if (seen.has(v)) return '[Circular]';
        seen.add(v);
      }
      return v;
    });
  } catch {
    try {
      return String(value);
    } catch {
      return '[Unserializable]';
    }
  }
};

// Override console.log/warn/error to use ring buffer and prevent circular object crashes
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;
const originalConsoleDebug = console.debug;

console.log = (...args: any[]) => {
  const message = args.map((arg) => safeStringify(arg)).join(' ');
  logBuffer.add(message);
  originalConsoleLog(...args); // Still log to actual console for debugging
};

console.warn = (...args: any[]) => {
  const message = '[WARN] ' + args.map((arg) => safeStringify(arg)).join(' ');
  logBuffer.add(message);
  originalConsoleWarn(...args);
};

console.error = (...args: any[]) => {
  const message = '[ERROR] ' + args.map((arg) => safeStringify(arg)).join(' ');
  logBuffer.add(message);
  originalConsoleError(...args);
};
console.debug = (...args: any[]) => {
  const message = '[DEBUG] ' + args.map((arg) => safeStringify(arg)).join(' ');
  logBuffer.add(message);
  originalConsoleDebug?.(...args);
};
const cachedModels = new Map<number, BNGLModel>();
let nextModelId = 1;
// LRU cache size limit for cached models inside the worker
// Limit chosen to support multiple open tabs/models without excessive memory (8 × ~1MB avg = ~8MB)
const MAX_CACHED_MODELS = 8;

const touchCachedModel = (modelId: number) => {
  const m = cachedModels.get(modelId);
  if (!m) return;
  // move to the end to mark as recently used
  cachedModels.delete(modelId);
  cachedModels.set(modelId, m);
};

const registerJob = (id: number) => {
  if (typeof id !== 'number' || Number.isNaN(id)) return;
  jobStates.set(id, { cancelled: false, controller: new AbortController() });
};

const markJobComplete = (id: number) => {
  jobStates.delete(id);
};

const cancelJob = (id: number) => {
  const entry = jobStates.get(id);
  if (entry) {
    entry.cancelled = true;
    if (entry.controller) {
      entry.controller.abort();
    }
  }
};

const ensureNotCancelled = (id: number) => {
  const entry = jobStates.get(id);
  if (entry && entry.cancelled) {
    throw new DOMException('Operation cancelled by main thread', 'AbortError');
  }
};

const serializeError = (error: unknown): SerializedWorkerError => {
  if (error instanceof DOMException) {
    return { name: error.name, message: error.message, stack: error.stack ?? undefined };
  }
  if (error instanceof Error) {
    return { name: error.name, message: error.message, stack: error.stack ?? undefined };
  }
  if (error && typeof error === 'object' && 'message' in error) {
    const message = typeof (error as { message?: unknown }).message === 'string' ? (error as { message: string }).message : 'Unknown error';
    const name = 'name' in error && typeof (error as { name?: unknown }).name === 'string' ? (error as { name: string }).name : undefined;
    const stack = 'stack' in error && typeof (error as { stack?: unknown }).stack === 'string' ? (error as { stack: string }).stack : undefined;
    return { name, message, stack };
  }
  return { message: typeof error === 'string' ? error : 'Unknown error' };
};

// --- Type Guards for Worker Payloads ---
const isRecord = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);

const isSimulateModelPayload = (p: unknown): p is { model: BNGLModel; options: SimulationOptions } => {
  if (!isRecord(p)) return false;
  return 'model' in p && 'options' in p;
};

const isSimulateModelIdPayload = (
  p: unknown
): p is { modelId: number; parameterOverrides?: Record<string, number>; options: SimulationOptions } => {
  if (!isRecord(p)) return false;
  const idVal = (p as Record<string, unknown>).modelId;
  return 'modelId' in p && typeof idVal === 'number' && 'options' in p;
};

const isCacheModelPayload = (p: unknown): p is { model: BNGLModel } => {
  return isRecord(p) && 'model' in p;
};

const isReleaseModelPayload = (p: unknown): p is { modelId: number } => {
  if (!isRecord(p) || !('modelId' in p)) return false;
  const idVal = (p as Record<string, unknown>).modelId;
  return typeof idVal === 'number';
};

const safePostMessage = (msg: any) => {
  if (typeof ctx !== 'undefined' && ctx.postMessage) {
    ctx.postMessage(msg);
  }
};

if (typeof ctx.addEventListener === 'function') {
  ctx.addEventListener('error', (event) => {
    const payload: SerializedWorkerError = {
      ...serializeError(event.error ?? event.message ?? 'Unknown worker error'),
      details: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
    };
    safePostMessage({ id: -1, type: 'worker_internal_error', payload });
    event.preventDefault();
  });
}

if (typeof ctx.addEventListener === 'function') {
  ctx.addEventListener('unhandledrejection', (event) => {
    const payload: SerializedWorkerError = serializeError(event.reason ?? 'Unhandled rejection in worker');
    safePostMessage({ id: -1, type: 'worker_internal_error', payload });
    event.preventDefault();
  });
}

// Re-export getCacheSizes or proxy it
export function getCacheSizes() {
  return getEvaluatorCacheSizes();
}

function parseBNGL(jobId: number, bnglCode: string): BNGLModel {
  ensureNotCancelled(jobId);
  return parseBNGLModel(bnglCode);
}


if (typeof ctx.addEventListener === 'function') {
  ctx.addEventListener('message', (event: MessageEvent<WorkerRequest>) => {
    const message = event.data;
    if (!message || typeof message !== 'object') {
      console.warn('[Worker] Received malformed message', message);
      return;
    }

    const { id, type, payload } = message;

    if (typeof id !== 'number' || typeof type !== 'string') {
      console.warn('[Worker] Missing id or type on message', message);
      return;
    }

    if (type === 'cancel') {
      const targetId = payload && typeof payload === 'object' ? (payload as { targetId?: unknown }).targetId : undefined;
      if (typeof targetId === 'number') {
        cancelJob(targetId);
      }
      return;
    }

    if (type === 'parse') {
      registerJob(id);
      try {
        const code = typeof payload === 'string' ? payload : '';
        const model = parseBNGL(id, code);
        const response: WorkerResponse = { id, type: 'parse_success', payload: model };
        ctx.postMessage(response);
      } catch (error) {
        console.error(`[Worker] Parse error for job ${id}:`, error);
        const response: WorkerResponse = { id, type: 'parse_error', payload: serializeError(error) };
        ctx.postMessage(response);
      } finally {
        markJobComplete(id);
      }
      return;
    }

    if (type === 'simulate') {
      registerJob(id);
      const jobEntry = jobStates.get(id);
      if (!jobEntry) return; // Should not happen
      (async () => {
        try {
          if (!payload || typeof payload !== 'object') {
            throw new Error('Simulation payload missing');
          }

          // Backwards-compatible: payload can be { model, options } or { modelId, parameterOverrides?, options }
          const p = payload as unknown;
          let model: BNGLModel | undefined;
          let options: SimulationOptions | undefined;

          if (isSimulateModelPayload(p)) {
            model = p.model;
            options = p.options;
          } else if (isSimulateModelIdPayload(p)) {
            const cached = cachedModels.get(p.modelId);
            if (!cached) throw new Error('Cached model not found in worker');
            touchCachedModel(p.modelId);
            options = p.options;

            if (!p.parameterOverrides || Object.keys(p.parameterOverrides).length === 0) {
              model = cached;
            } else {
              const overrides: Record<string, number> = p.parameterOverrides;
              const nextModel: BNGLModel = {
                ...cached,
                parameters: { ...(cached.parameters || {}), ...overrides },
                reactions: [],
              } as BNGLModel;

              (cached.reactions || []).forEach((r) => {
                const rateConst = nextModel.parameters[r.rate] ?? Number.parseFloat(r.rate);
                nextModel.reactions.push({ ...r, rateConstant: rateConst });
              });
              model = nextModel;
            }
          }

          if (!model || !options) {
            throw new Error('Simulation payload incomplete');
          }

          // Auto-generate network if model has reaction rules but no reactions
          const hasRules = (model.reactionRules && model.reactionRules.length > 0);
          const hasReactions = (model.reactions && model.reactions.length > 0);

          if (hasRules && !hasReactions) {
            console.log('[Worker] Auto-generating network from reaction rules...');
            console.log('[Worker] Model parameters:', model.parameters);
            console.log('[Worker] Model reactionRules:', model.reactionRules.map((r, i) => `${i}: ${r.rate}`));
            try {
              // Ensure evaluator is loaded for network generation
              // CRITICAL: We MUST load the evaluator - the fallback returns zeros for all expressions
              await loadEvaluator();

              model = await generateExpandedNetworkService(
                model,
                () => ensureNotCancelled(id),
                (p) => safePostMessage({ id, type: 'generate_network_progress', payload: p })
              );
              console.log(`[Worker] Network auto-generation complete: ${model.species.length} species, ${model.reactions?.length ?? 0} reactions`);
            } catch (genError) {
              console.error('[Worker] Network auto-generation failed:', genError);
              throw new Error(`Network generation failed: ${genError instanceof Error ? genError.message : String(genError)}`);
            }
          }

          // Delegate to SimulationLoop service
          const phases = model.simulationPhases || [];
          console.log(`[Worker] Received 'simulate' request. Model has ${phases.length} phases. Options: t_end=${options.t_end}`);
          const results = await simulate(id, model, options, {
            checkCancelled: () => ensureNotCancelled(id),
            postMessage: (msg) => safePostMessage(msg)
          });

          const response: WorkerResponse = { id, type: 'simulate_success', payload: results };
          ctx.postMessage(response);
        } catch (error) {
          console.error(`[Worker] Simulation error for job ${id}:`, error);
          const response: WorkerResponse = { id, type: 'simulate_error', payload: serializeError(error) };
          safePostMessage(response);
        } finally {
          markJobComplete(id);
        }
      })();
      return;
    }

    if (type === 'cache_model') {
      registerJob(id);
      try {
        const p = payload as unknown;
        const model = isCacheModelPayload(p) ? p.model : undefined;
        if (!model) throw new Error('Cache model payload missing');
        const modelId = nextModelId++;
        // Store a shallow clone to avoid accidental mutation from main thread
        const stored: BNGLModel = {
          ...model,
          parameters: { ...(model.parameters || {}) },
          moleculeTypes: (model.moleculeTypes || []).map((m) => ({ ...m })),
          species: (model.species || []).map((s) => ({ ...s })),
          observables: (model.observables || []).map((o) => ({ ...o })),
          reactions: (model.reactions || []).map((r) => ({ ...r })),
          reactionRules: (model.reactionRules || []).map((r) => ({ ...r })),
          // Preserve action-derived simulation simulationOptions for parity and for simulateCached callers
          simulationOptions: model.simulationOptions ? { ...(model.simulationOptions as any) } : model.simulationOptions,
          simulationPhases: (model.simulationPhases || []).map((p: any) => ({ ...p })),
          concentrationChanges: (model.concentrationChanges || []).map((c: any) => ({ ...c })),
          parameterChanges: (model.parameterChanges || []).map((c: any) => ({ ...c })),
        };
        cachedModels.set(modelId, stored);
        // Enforce LRU eviction if we exceed the cache size
        try {
          if (cachedModels.size > MAX_CACHED_MODELS) {
            const it = cachedModels.keys();
            const oldest = it.next().value as number | undefined;
            if (typeof oldest === 'number') {
              cachedModels.delete(oldest);
              // best-effort notification

              console.warn('[Worker] Evicted cached model (LRU) id=', oldest);
            }
          }
        } catch (e) {
          // ignore eviction errors
        }
        const response: WorkerResponse = { id, type: 'cache_model_success', payload: { modelId } };
        safePostMessage(response);
      } catch (error) {
        console.error(`[Worker] Cache model error for job ${id}:`, error);
        const response: WorkerResponse = { id, type: 'cache_model_error', payload: serializeError(error) };
        safePostMessage(response);
      } finally {
        markJobComplete(id);
      }
      return;
    }

    if (type === 'release_model') {
      registerJob(id);
      try {
        const p = payload as unknown;
        const modelId = isReleaseModelPayload(p) ? p.modelId : undefined;
        if (typeof modelId !== 'number') throw new Error('release_model payload missing modelId');
        cachedModels.delete(modelId);
        const response: WorkerResponse = { id, type: 'release_model_success', payload: { modelId } };
        safePostMessage(response);
      } catch (error) {
        console.error(`[Worker] Release model error for job ${id}:`, error);
        const response: WorkerResponse = { id, type: 'release_model_error', payload: serializeError(error) };
        safePostMessage(response);
      } finally {
        markJobComplete(id);
      }
      return;
    }

    if (type === 'generate_network') {
      registerJob(id);
      const jobEntry = jobStates.get(id);
      if (!jobEntry) return; // Should not happen
      (async () => {
        try {
          // Initialize evaluator for functional rates
          await loadEvaluator();

          if (!payload || typeof payload !== 'object') {
            throw new Error('Generate network payload missing');
          }

          const p = payload as { model: BNGLModel; options?: NetworkGeneratorOptions };
          const { model, options } = p;

          if (!model) {
            throw new Error('Model missing in generate_network payload');
          }

          // Prepare model with options
          const modelWithOptions = {
            ...model,
            networkOptions: {
              ...(model.networkOptions || {}),
              maxSpecies: options?.maxSpecies,
              maxReactions: options?.maxReactions,
              maxIter: options?.maxIterations,
              maxAgg: options?.maxAgg,
              maxStoich: options?.maxStoich instanceof Map ? undefined : (options?.maxStoich as any), // Types might differ, simplifying
            }
          };

          // Call service
          const generatedModel = await generateExpandedNetworkService(
            modelWithOptions,
            () => ensureNotCancelled(id),
            (p) => safePostMessage({ id, type: 'generate_network_progress', payload: p })
          );


          const response: WorkerResponse = { id, type: 'generate_network_success', payload: generatedModel };
          safePostMessage(response);
        } catch (error) {
          console.error(`[Worker] Generate network error for job ${id}:`, error);
          const response: WorkerResponse = { id, type: 'generate_network_error', payload: serializeError(error) };
          safePostMessage(response);
        } finally {
          markJobComplete(id);
        }
      })();
      return;
    }

    console.warn('[Worker] Unknown message type received:', type);
  });
}

export { };