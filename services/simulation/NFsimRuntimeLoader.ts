export type NFsimModuleFactory = (options?: Record<string, unknown>) => Promise<any> | any;

export type NFsimRuntime = {
  run: (xml: string, options: Record<string, unknown>) => Promise<string> | string;
  reset?: () => void;
};

const getGlobalRuntime = (): NFsimRuntime | null => {
  const globalAny = globalThis as unknown as { __nfsimRuntime?: NFsimRuntime };
  return globalAny.__nfsimRuntime ?? null;
};

const setGlobalRuntime = (runtime: NFsimRuntime): void => {
  const globalAny = globalThis as unknown as { __nfsimRuntime?: NFsimRuntime };
  globalAny.__nfsimRuntime = runtime;
};

const getRuntimeHints = () => {
  const globalAny = globalThis as unknown as {
    __nfsimModuleUrl?: string;
    __nfsimWasmUrl?: string;
    __nfsimModuleFactory?: NFsimModuleFactory;
  };
  return {
    moduleUrl: globalAny.__nfsimModuleUrl,
    wasmUrl: globalAny.__nfsimWasmUrl,
    factory: globalAny.__nfsimModuleFactory
  };
};

const createRuntimeFromModule = (module: any): NFsimRuntime | null => {
  if (!module) return null;

  const hasFs = module.FS && typeof module.FS.writeFile === 'function' && typeof module.FS.readFile === 'function';
  const hasCallMain = typeof module.callMain === 'function';

  if (hasFs && hasCallMain) {
    const run = (xml: string, options: Record<string, unknown> = {}) => {
      if (typeof xml !== 'string') {
        throw new Error('NFsim run expects XML text input.');
      }
      const opts = options ?? {};
      const progressCb = typeof (opts as any).progressCallback === 'function' ? (opts as any).progressCallback as (msg: string) => void : undefined;
      const modelName = (opts as any).modelName || 'model';
      const xmlPath = (opts as any).xmlPath || `/${modelName}.xml`;
      const outPath = (opts as any).outputPath || `/${modelName}.gdat`;

      try {
        module.FS.unlink(xmlPath);
      } catch {
        // ignore
      }
      try {
        module.FS.unlink(outPath);
      } catch {
        // ignore
      }

      // If the module honors Module.print/printErr, temporarily wire them to the supplied progress callback
      let oldPrint: ((s: string) => void) | undefined;
      let oldPrintErr: ((s: string) => void) | undefined;
      let origConsoleLog: typeof console.log | undefined;
      let origConsoleError: typeof console.error | undefined;

      if (progressCb) {
        if (module && typeof module.print === 'function') {
          oldPrint = module.print.bind(module);
          module.print = (s: any) => {
            try {
              progressCb(String(s));
            } catch {}
            try {
              oldPrint?.(s);
            } catch {}
          };
        }
        if (module && typeof module.printErr === 'function') {
          oldPrintErr = module.printErr.bind(module);
          module.printErr = (s: any) => {
            try {
              progressCb(String(s));
            } catch {}
            try {
              oldPrintErr?.(s);
            } catch {}
          };
        }

        // Also wrap global console so modules that use console.log still emit progress
        origConsoleLog = console.log;
        origConsoleError = console.error;
        console.log = (...args: any[]) => {
          try {
            progressCb(args.map(String).join(' '));
          } catch {}
          origConsoleLog(...args);
        };
        console.error = (...args: any[]) => {
          try {
            progressCb(args.map(String).join(' '));
          } catch {}
          origConsoleError(...args);
        };
      }

      module.FS.writeFile(xmlPath, xml);

      const args: string[] = ['-xml', xmlPath, '-o', outPath];
      if ((opts as any).t_end !== undefined) {
        args.push('-sim', String((opts as any).t_end));
      }
      if ((opts as any).n_steps !== undefined) {
        args.push('-oSteps', String((opts as any).n_steps));
      }
      if ((opts as any).seed !== undefined) {
        args.push('-seed', String((opts as any).seed));
      }
      if ((opts as any).cb) {
        args.push('-cb');
      }
      if ((opts as any).speciesPath) {
        args.push('-ss', String((opts as any).speciesPath));
      }
      if ((opts as any).verbose) {
        args.push('-v');
      }

      try {
        module.callMain(args);
      } finally {
        // restore wrapped functions
        if (progressCb) {
          if (oldPrint) module.print = oldPrint;
          if (oldPrintErr) module.printErr = oldPrintErr;
          if (origConsoleLog) console.log = origConsoleLog;
          if (origConsoleError) console.error = origConsoleError;
        }
      }

      const output = module.FS.readFile(outPath, { encoding: 'utf8' });
      return typeof output === 'string' ? output : String(output);
    };

    return { run, reset: module.reset?.bind(module) };
  }

  if (typeof module.run === 'function') {
    const run = (xml: string, options: Record<string, unknown> = {}) => {
      const opts = options ?? {};
      const progressCb = typeof (opts as any).progressCallback === 'function' ? (opts as any).progressCallback as (msg: string) => void : undefined;
      let origConsoleLog: typeof console.log | undefined;
      let origConsoleError: typeof console.error | undefined;
      if (progressCb) {
        origConsoleLog = console.log;
        origConsoleError = console.error;
        console.log = (...args: any[]) => {
          try { progressCb(args.map(String).join(' ')); } catch {}
          origConsoleLog(...args);
        };
        console.error = (...args: any[]) => {
          try { progressCb(args.map(String).join(' ')); } catch {}
          origConsoleError(...args);
        };
      }
      try {
        return module.run(xml, options);
      } finally {
        if (progressCb) {
          if (origConsoleLog) console.log = origConsoleLog;
          if (origConsoleError) console.error = origConsoleError;
        }
      }
    };
    return { run, reset: module.reset?.bind(module) };
  }

  if (typeof module.runNFsim === 'function') {
    const run = (xml: string, options: Record<string, unknown> = {}) => {
      const opts = options ?? {};
      const progressCb = typeof (opts as any).progressCallback === 'function' ? (opts as any).progressCallback as (msg: string) => void : undefined;
      let origConsoleLog: typeof console.log | undefined;
      let origConsoleError: typeof console.error | undefined;
      if (progressCb) {
        origConsoleLog = console.log;
        origConsoleError = console.error;
        console.log = (...args: any[]) => {
          try { progressCb(args.map(String).join(' ')); } catch {}
          origConsoleLog(...args);
        };
        console.error = (...args: any[]) => {
          try { progressCb(args.map(String).join(' ')); } catch {}
          origConsoleError(...args);
        };
      }
      try {
        return module.runNFsim(xml, options);
      } finally {
        if (progressCb) {
          if (origConsoleLog) console.log = origConsoleLog;
          if (origConsoleError) console.error = origConsoleError;
        }
      }
    };
    return { run, reset: module.reset?.bind(module) };
  }

  return null;
};

const importModuleFromUrl = async (url: string): Promise<any> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} while fetching ${url}`);
  }
  const text = await response.text();
  const blobUrl = URL.createObjectURL(new Blob([text], { type: 'text/javascript' }));
  try {
    return await import(/* @vite-ignore */ blobUrl);
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
};

let initPromise: Promise<NFsimRuntime | null> | null = null;

export async function ensureNFsimRuntime(): Promise<NFsimRuntime | null> {
  const existing = getGlobalRuntime();
  if (existing) return existing;

  if (!initPromise) {
    initPromise = (async () => {
      const { moduleUrl, wasmUrl, factory } = getRuntimeHints();

      const baseUrl = typeof import.meta !== 'undefined' && (import.meta as any).env?.BASE_URL
        ? (import.meta as any).env.BASE_URL
        : '/';
      const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      const resolvedWasmUrl = wasmUrl ?? `${normalizedBase}nfsim.wasm`;

      if (factory && typeof factory === 'function') {
        const moduleArg = {
          locateFile: (p: string) => (p.endsWith('.wasm') ? resolvedWasmUrl : p)
        } as Record<string, unknown>;
        (globalThis as unknown as { Module?: Record<string, unknown> }).Module = moduleArg;
        const module = await factory(moduleArg);
        const runtime = createRuntimeFromModule(module);
        if (!runtime) {
          throw new Error('NFsim module factory did not provide a compatible runtime. Expected run(xml, options).');
        }
        setGlobalRuntime(runtime);
        return runtime;
      }

      const url = moduleUrl || `${normalizedBase}nfsim.js`;
      try {
        const mod = await importModuleFromUrl(url);
        const factoryFn = (mod?.default ?? mod?.createNFsimModule ?? mod?.NFsimModule) as NFsimModuleFactory | undefined;
        if (typeof factoryFn === 'function') {
          const moduleArg = {
            locateFile: (p: string) => (p.endsWith('.wasm') ? resolvedWasmUrl : p)
          } as Record<string, unknown>;
          (globalThis as unknown as { Module?: Record<string, unknown> }).Module = moduleArg;
          const module = await factoryFn(moduleArg);
          const runtime = createRuntimeFromModule(module) ?? createRuntimeFromModule(mod);
          if (!runtime) {
            throw new Error('NFsim JS module loaded but no compatible runtime was found. Export run(xml, options) or runNFsim(xml, options).');
          }
          setGlobalRuntime(runtime);
          return runtime;
        }

        const directRuntime = createRuntimeFromModule(mod);
        if (directRuntime) {
          setGlobalRuntime(directRuntime);
          return directRuntime;
        }

        throw new Error('NFsim JS module loaded but no factory/runtime was found.');
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`NFsim runtime loader failed. Ensure ${url} exists and exports a run(xml, options) function or a factory (default export). (${message})`);
      }
    })();
  }

  return initPromise;
}

export function resetNFsimRuntime(): void {
  initPromise = null;
  const globalAny = globalThis as unknown as { __nfsimRuntime?: NFsimRuntime };
  delete globalAny.__nfsimRuntime;
}
