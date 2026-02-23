import { NFsimExecutionWrapper, type NFsimExecutionOptions } from './NFsimExecutionWrapper';

export interface ConcurrencyConfig {
  maxConcurrentSimulations?: number;
  maxModuleInstances?: number;
  moduleReuseLimit?: number;
  moduleIdleTimeoutMs?: number;
  queueMaxSize?: number;
  enableModulePooling?: boolean;
}

export type TaskStatus = {
  id: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  result?: unknown;
  error?: string;
};

export class NFsimConcurrencyManager {
  private wrapper: NFsimExecutionWrapper;
  private tasks = new Map<string, TaskStatus>();
  private counter = 0;
  private stats = {
    peakConcurrency: 0,
    totalModules: 0,
    completedSimulations: 0,
    failedSimulations: 0,
    cancelledSimulations: 0,
    activeSimulations: 0,
    queuedSimulations: 0
  };

  constructor(moduleLoader?: () => Promise<any>, _config?: ConcurrencyConfig) {
    this.wrapper = new NFsimExecutionWrapper(moduleLoader);
  }

  async submitSimulation(xml: string, options: NFsimExecutionOptions, _priority = 0): Promise<string> {
    const id = `nfsim-task-${++this.counter}`;
    const status: TaskStatus = { id, status: 'running' };
    this.tasks.set(id, status);
    this.stats.activeSimulations += 1;
    this.stats.peakConcurrency = Math.max(this.stats.peakConcurrency, this.stats.activeSimulations);

    try {
      const result = await this.wrapper.executeSimulation(xml, options);
      status.status = result.success ? 'completed' : 'failed';
      status.result = result;
      if (result.success) this.stats.completedSimulations += 1;
      else this.stats.failedSimulations += 1;
    } catch (error) {
      status.status = 'failed';
      status.error = error instanceof Error ? error.message : String(error);
      this.stats.failedSimulations += 1;
    } finally {
      this.stats.activeSimulations = Math.max(0, this.stats.activeSimulations - 1);
    }

    return id;
  }

  getTaskStatus(taskId: string): TaskStatus | null {
    return this.tasks.get(taskId) ?? null;
  }

  getStats() {
    return { ...this.stats, queuedSimulations: 0, totalModules: this.stats.totalModules };
  }

  cancelTask(taskId: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task || task.status === 'completed' || task.status === 'failed') return false;
    task.status = 'cancelled';
    this.stats.cancelledSimulations += 1;
    this.stats.activeSimulations = Math.max(0, this.stats.activeSimulations - 1);
    return true;
  }
}

let sharedManager: NFsimConcurrencyManager | null = null;

export function getConcurrencyManager(): NFsimConcurrencyManager {
  if (!sharedManager) sharedManager = new NFsimConcurrencyManager();
  return sharedManager;
}

export async function resetConcurrencyManager(): Promise<void> {
  sharedManager = null;
}
