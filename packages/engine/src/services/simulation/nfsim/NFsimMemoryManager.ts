export interface MemoryStats {
  allocatedBytes: number;
  peakBytes: number;
}

export class NFsimMemoryManager {
  private allocatedBytes = 0;
  private peakBytes = 0;

  allocate(bytes: number): number {
    this.allocatedBytes += Math.max(0, bytes);
    this.peakBytes = Math.max(this.peakBytes, this.allocatedBytes);
    return this.allocatedBytes;
  }

  free(bytes: number): void {
    this.allocatedBytes = Math.max(0, this.allocatedBytes - Math.max(0, bytes));
  }

  getStats(): MemoryStats {
    return { allocatedBytes: this.allocatedBytes, peakBytes: this.peakBytes };
  }
}

let memoryManager = new NFsimMemoryManager();

export function resetMemoryManager(): void {
  memoryManager = new NFsimMemoryManager();
}

export function getMemoryManager(): NFsimMemoryManager {
  return memoryManager;
}
