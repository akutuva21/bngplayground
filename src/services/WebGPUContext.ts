/**
 * WebGPUContext.ts - WebGPU device initialization and capability detection
 * 
 * Provides GPU context management for WebGPU-accelerated ODE solving.
 * Automatically detects WebGPU availability and handles fallback.
 */

// WebGPU availability state
let gpuDevice: GPUDevice | null = null;
let gpuAdapter: GPUAdapter | null = null;
let initPromise: Promise<boolean> | null = null;

/**
 * Check if WebGPU is available in the current browser
 */
export function isWebGPUSupported(): boolean {
    return typeof navigator !== 'undefined' && 'gpu' in navigator;
}

/**
 * Initialize WebGPU context
 * @returns true if WebGPU is available and initialized, false otherwise
 */
export async function initWebGPU(): Promise<boolean> {
    // Return existing promise if initialization is in progress
    if (initPromise) {
        return initPromise;
    }

    initPromise = (async (): Promise<boolean> => {
        if (!isWebGPUSupported()) {
            console.info('[WebGPU] Not supported in this browser');
            return false;
        }


        try {
            // Request adapter (GPU)
            gpuAdapter = await navigator.gpu.requestAdapter({
                powerPreference: 'high-performance'
            });

            if (!gpuAdapter) {
                console.warn('[WebGPU] No GPU adapter found');
                return false;
            }

            // Log adapter info (optional - not supported in all browsers like Firefox)
            try {
                if (typeof gpuAdapter.requestAdapterInfo === 'function') {
                    const adapterInfo = await gpuAdapter.requestAdapterInfo();
                    console.info('[WebGPU] Adapter:', adapterInfo.vendor, adapterInfo.architecture);
                } else {
                    console.info('[WebGPU] Adapter found (info not available)');
                }
            } catch (infoError) {
                console.info('[WebGPU] Adapter found (info query failed)');
            }

            // Request device with default limits for maximum compatibility
            // ODE solving typically needs minimal resources (< 1MB buffers)
            gpuDevice = await gpuAdapter.requestDevice({
                requiredFeatures: [],
                // Use default limits - our ODE solver has modest requirements
            });

            // Handle device loss
            gpuDevice.lost.then((info) => {
                console.error('[WebGPU] Device lost:', info.message);
                gpuDevice = null;
                initPromise = null;
            });

            console.info('[WebGPU] Device initialized successfully');
            return true;
        } catch (error) {
            console.error('[WebGPU] Initialization failed:', error);
            return false;
        }
    })();

    return initPromise;
}

/**
 * Get the current GPU device (must call initWebGPU first)
 */
export function getGPUDevice(): GPUDevice | null {
    return gpuDevice;
}

/**
 * Get the current GPU adapter
 */
export function getGPUAdapter(): GPUAdapter | null {
    return gpuAdapter;
}

/**
 * Check if WebGPU is initialized and ready
 */
export function isWebGPUReady(): boolean {
    return gpuDevice !== null;
}

/**
 * Create a GPU buffer with data
 */
export function createBuffer(
    device: GPUDevice,
    data: Float32Array | Float64Array | Uint32Array,
    usage: GPUBufferUsageFlags
): GPUBuffer {
    const buffer = device.createBuffer({
        size: data.byteLength,
        usage: usage | GPUBufferUsage.COPY_DST,
        mappedAtCreation: true
    });

    if (data instanceof Float32Array) {
        new Float32Array(buffer.getMappedRange()).set(data);
    } else if (data instanceof Float64Array) {
        new Float64Array(buffer.getMappedRange()).set(data);
    } else {
        new Uint32Array(buffer.getMappedRange()).set(data);
    }

    buffer.unmap();
    return buffer;
}

/**
 * Create a GPU buffer for reading results back to CPU
 */
export function createReadBuffer(device: GPUDevice, size: number): GPUBuffer {
    return device.createBuffer({
        size,
        usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
    });
}

/**
 * Create a storage buffer (for compute shader read/write)
 */
export function createStorageBuffer(
    device: GPUDevice,
    size: number,
    usage: GPUBufferUsageFlags = 0
): GPUBuffer {
    return device.createBuffer({
        size,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST | usage
    });
}

/**
 * Create a uniform buffer
 */
export function createUniformBuffer(device: GPUDevice, size: number): GPUBuffer {
    // Uniform buffers must be 16-byte aligned
    const alignedSize = Math.ceil(size / 16) * 16;
    return device.createBuffer({
        size: alignedSize,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });
}

/**
 * Read data from GPU buffer to CPU
 */
export async function readBuffer(buffer: GPUBuffer): Promise<Float32Array> {
    await buffer.mapAsync(GPUMapMode.READ);
    const copyArrayBuffer = buffer.getMappedRange();
    const data = new Float32Array(copyArrayBuffer.slice(0));
    buffer.unmap();
    return data;
}

/**
 * Compile a compute shader
 */
export function createComputePipeline(
    device: GPUDevice,
    shaderCode: string,
    entryPoint: string = 'main'
): GPUComputePipeline {
    const shaderModule = device.createShaderModule({
        code: shaderCode
    });

    return device.createComputePipeline({
        layout: 'auto',
        compute: {
            module: shaderModule,
            entryPoint
        }
    });
}

/**
 * Execute a compute pass
 */
export function executeComputePass(
    device: GPUDevice,
    pipeline: GPUComputePipeline,
    bindGroup: GPUBindGroup,
    workgroupsX: number,
    workgroupsY: number = 1,
    workgroupsZ: number = 1
): void {
    const commandEncoder = device.createCommandEncoder();
    const passEncoder = commandEncoder.beginComputePass();

    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.dispatchWorkgroups(workgroupsX, workgroupsY, workgroupsZ);
    passEncoder.end();

    device.queue.submit([commandEncoder.finish()]);
}

/**
 * Get device limits
 */
export function getDeviceLimits(): GPUSupportedLimits | null {
    return gpuDevice?.limits ?? null;
}

/**
 * Clean up WebGPU resources
 */
export function disposeWebGPU(): void {
    if (gpuDevice) {
        gpuDevice.destroy();
        gpuDevice = null;
    }
    gpuAdapter = null;
    initPromise = null;
}

/**
 * WebGPU context wrapper for ODE solver
 */
export class WebGPUContext {
    private device: GPUDevice;
    private pipelines: Map<string, GPUComputePipeline> = new Map();
    private buffers: Map<string, GPUBuffer> = new Map();

    constructor(device: GPUDevice) {
        this.device = device;
    }

    static async create(): Promise<WebGPUContext | null> {
        const success = await initWebGPU();
        if (!success || !gpuDevice) {
            return null;
        }
        return new WebGPUContext(gpuDevice);
    }

    getDevice(): GPUDevice {
        return this.device;
    }

    createPipeline(name: string, shaderCode: string, entryPoint: string = 'main'): GPUComputePipeline {
        const pipeline = createComputePipeline(this.device, shaderCode, entryPoint);
        this.pipelines.set(name, pipeline);
        return pipeline;
    }

    getPipeline(name: string): GPUComputePipeline | undefined {
        return this.pipelines.get(name);
    }

    createNamedBuffer(name: string, data: Float32Array, usage: GPUBufferUsageFlags): GPUBuffer {
        const buffer = createBuffer(this.device, data, usage);
        this.buffers.set(name, buffer);
        return buffer;
    }

    getBuffer(name: string): GPUBuffer | undefined {
        return this.buffers.get(name);
    }

    dispose(): void {
        for (const buffer of this.buffers.values()) {
            buffer.destroy();
        }
        this.buffers.clear();
        this.pipelines.clear();
    }
}
