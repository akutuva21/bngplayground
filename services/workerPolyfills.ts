// Polyfills for Node.js globals in Web Worker environment
// Required for antlr4ts and Emscripten modules (cvode)

if (typeof self !== 'undefined') {
    // Global alias
    (self as any).global = self;

    // Process polyfill
    if (!(self as any).process) {
        (self as any).process = {
            env: {},
            version: '',
            platform: 'browser',
            cwd: () => '/',
            nextTick: (fn: Function) => setTimeout(fn, 0)
        };
    }

    // Buffer polyfill (minimal)
    if (!(self as any).Buffer) {
        (self as any).Buffer = {
            isBuffer: () => false,
            from: (data: any) => data,
            alloc: (size: number) => new Uint8Array(size)
        };
    }
}
