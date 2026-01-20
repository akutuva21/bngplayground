import { runNFsim, type NFsimRunOptions } from './NFsimLoader';
import { getMemoryManager } from './NFsimMemoryManager';

export interface NFsimExecutionOptions extends NFsimRunOptions {
  method?: 'nfsim';
}

export interface NFsimExecutionResult {
  success: boolean;
  executionTime: number;
  memoryUsed: number;
  retryCount: number;
  gdat?: string;
  error?: string;
}

export class NFsimExecutionWrapper {
  private moduleLoader?: () => Promise<any>;

  constructor(moduleLoader?: () => Promise<any>) {
    this.moduleLoader = moduleLoader;
  }

  async executeSimulation(xml: string, options: NFsimExecutionOptions): Promise<NFsimExecutionResult> {
    const start = performance.now();
    try {
      // moduleLoader is unused in minimal implementation but retained for API compatibility
      if (this.moduleLoader) {
        await this.moduleLoader();
      }

      const gdat = await runNFsim(xml, options);
      const stats = getMemoryManager().getStats();
      return {
        success: true,
        executionTime: performance.now() - start,
        memoryUsed: stats.allocatedBytes,
        retryCount: 0,
        gdat
      };
    } catch (error) {
      const stats = getMemoryManager().getStats();
      return {
        success: false,
        executionTime: performance.now() - start,
        memoryUsed: stats.allocatedBytes,
        retryCount: 0,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
}