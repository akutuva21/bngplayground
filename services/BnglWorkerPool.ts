/**
 * services/BnglWorkerPool.ts
 * 
 * Manages a pool of Web Workers for parallel processing of BNGL simulations.
 * Particularly useful for ensembles and parameter sweeps.
 */

import { BNGLModel, SimulationOptions, SimulationResults, WorkerRequest, WorkerResponse } from '../types';

export class BnglWorkerPool {
    private workers: Worker[] = [];
    private poolSize: number;
    private nextWorkerIdx = 0;
    private isInitialized = false;

    constructor(poolSize?: number) {
        // Default to hardware concurrency - 1 (leave one for UI)
        this.poolSize = poolSize ?? Math.max(1, (navigator.hardwareConcurrency || 4) - 1);
    }

    async initialize(): Promise<void> {
        if (this.isInitialized) return;

        for (let i = 0; i < this.poolSize; i++) {
            // Use the same worker as BnglService
            const worker = new Worker(new URL('./bnglWorker.ts', import.meta.url), { type: 'module' });
            
            // Add global error handler to catch worker crashes
            worker.addEventListener('error', (err) => {
                console.error(`[Pool] Worker ${i} global error:`, err);
            });
            
            // Listen for internal error messages from our own error trapping in the worker
            worker.addEventListener('message', (event: MessageEvent<WorkerResponse>) => {
                if (event.data.type === 'worker_internal_error') {
                   console.error(`[Pool] Worker ${i} internal error reported:`, event.data.payload);
                }
            });

            this.workers.push(worker);
        }
        this.isInitialized = true;
    }

    /**
     * Run a single simulation on a specific worker or the next available one.
     */
    async simulate(model: BNGLModel, options: SimulationOptions, workerIdx?: number): Promise<SimulationResults> {
        if (!this.isInitialized) await this.initialize();

        const idx = workerIdx ?? (this.nextWorkerIdx++ % this.poolSize);
        const worker = this.workers[idx];

        return new Promise((resolve, reject) => {
            const messageId = Math.floor(Math.random() * 1000000);

            const handler = (event: MessageEvent<WorkerResponse>) => {
                const { id, type, payload } = event.data;
                if (id !== messageId) return;

                if (type === 'simulate_success') {
                    worker.removeEventListener('message', handler);
                    resolve(payload as SimulationResults);
                } else if (type === 'simulate_error') {
                    worker.removeEventListener('message', handler);
                    const errorMsg = (payload as any)?.message || 'Simulation failed';
                    console.error(`[Pool] Worker simulate_error: ${errorMsg}`, payload);
                    reject(new Error(errorMsg));
                }
                // Ignore other types like 'progress'
            };

            worker.addEventListener('message', handler);

            const request: WorkerRequest = {
                id: messageId,
                type: 'simulate',
                payload: { model, options }
            };

            worker.postMessage(request);
        });
    }

    /**
     * Run an ensemble of simulations in parallel across the pool.
     */
    async runEnsemble(
        model: BNGLModel,
        options: SimulationOptions,
        count: number,
        onProgress?: (index: number) => void
    ): Promise<SimulationResults[]> {
        if (!this.isInitialized) await this.initialize();

        // Prepare model on ALL workers for cached simulation
        const modelIds = await Promise.all(this.workers.map(w => this.prepareModelOnWorker(w, model)));

        const results: SimulationResults[] = new Array(count);
        const tasks = Array.from({ length: count }, (_, i) => i);
        let completed = 0;

        // Run tasks in parallel using the pool
        const runTask = async (taskIdx: number) => {
            const workerIdx = taskIdx % this.poolSize;
            const worker = this.workers[workerIdx];
            const modelId = modelIds[workerIdx];

            const res = await this.simulateCachedOnWorker(worker, modelId, { ...options, seed: taskIdx });
            results[taskIdx] = res;
            completed++;
            onProgress?.(completed);
        };

        // Execute in batches or all at once? All at once is fine for Web Workers as they queue.
        await Promise.all(tasks.map(i => runTask(i)));

        // Cleanup cached models
        await Promise.all(this.workers.map((w, i) => this.releaseModelOnWorker(w, modelIds[i])));

        return results;
    }

    private prepareModelOnWorker(worker: Worker, model: BNGLModel): Promise<number> {
        return new Promise((resolve, reject) => {
            const messageId = Math.floor(Math.random() * 1000000);
            const handler = (event: MessageEvent<WorkerResponse>) => {
                const { id, type, payload } = event.data;
                if (id !== messageId) return;

                if (type === 'cache_model_success') {
                    worker.removeEventListener('message', handler);
                    resolve((payload as any).modelId);
                } else if (type === 'cache_model_error') {
                    worker.removeEventListener('message', handler);
                    const errorMsg = (payload as any)?.message || 'Failed to cache model';
                    console.error(`[Pool] Worker cache_model_error: ${errorMsg}`, payload);
                    reject(new Error(errorMsg));
                }
            };
            worker.addEventListener('message', handler);
            worker.postMessage({ id: messageId, type: 'cache_model', payload: { model } });
        });
    }

    private simulateCachedOnWorker(worker: Worker, modelId: number, options: SimulationOptions): Promise<SimulationResults> {
        return new Promise((resolve, reject) => {
            const messageId = Math.floor(Math.random() * 1000000);
            const handler = (event: MessageEvent<WorkerResponse>) => {
                const { id, type, payload } = event.data;
                if (id !== messageId) return;

                if (type === 'simulate_success') {
                    worker.removeEventListener('message', handler);
                    resolve(payload as SimulationResults);
                } else if (type === 'simulate_error') {
                    worker.removeEventListener('message', handler);
                    const errorMsg = (payload as any)?.message || 'Simulation failed';
                    console.error(`[Pool] Worker simulate_error: ${errorMsg}`, payload);
                    reject(new Error(errorMsg));
                }
            };
            worker.addEventListener('message', handler);
            worker.postMessage({ id: messageId, type: 'simulate', payload: { modelId, options } });
        });
    }

    private releaseModelOnWorker(worker: Worker, modelId: number): Promise<void> {
        return new Promise((resolve) => {
            const messageId = Math.floor(Math.random() * 1000000);
            const handler = (event: MessageEvent<WorkerResponse>) => {
                if (event.data.id !== messageId) return;
                worker.removeEventListener('message', handler);
                resolve();
            };
            worker.addEventListener('message', handler);
            worker.postMessage({ id: messageId, type: 'release_model', payload: { modelId } });
        });
    }

    terminate(): void {
        this.workers.forEach(w => w.terminate());
        this.workers = [];
        this.isInitialized = false;
    }
}

export const bnglWorkerPool = new BnglWorkerPool();
