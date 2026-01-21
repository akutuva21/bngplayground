// Emscripten post-js hook for NFsim
// Adds a minimal JS runtime API for the web app.

(function () {
  const moduleRef = globalThis.Module ?? null;
  if (!moduleRef) {
    return;
  }

  const ensureFs = () => {
    if (!moduleRef.FS || !moduleRef.FS.writeFile || !moduleRef.FS.readFile) {
      throw new Error('NFsim FS runtime not available. Ensure FS is in EXPORTED_RUNTIME_METHODS.');
    }
  };

  Module.runNFsim = function runNFsim(xml, options) {
    if (typeof xml !== 'string') {
      throw new Error('NFsim runNFsim expects XML text input.');
    }
    const opts = options || {};
    const modelName = opts.modelName || 'model';
    const xmlPath = opts.xmlPath || `/${modelName}.xml`;
    const outPath = opts.outputPath || `/${modelName}.gdat`;

    ensureFs();

    try {
      moduleRef.FS.unlink(xmlPath);
    } catch {
      // Ignore missing files.
    }
    try {
      moduleRef.FS.unlink(outPath);
    } catch {
      // Ignore missing files.
    }

    moduleRef.FS.writeFile(xmlPath, xml);

    const args = ['-xml', xmlPath, '-o', outPath];
    if (opts.t_end !== undefined) {
      args.push('-sim', String(opts.t_end));
    }
    if (opts.n_steps !== undefined) {
      args.push('-oSteps', String(opts.n_steps));
    }
    if (opts.seed !== undefined) {
      args.push('-seed', String(opts.seed));
    }
    // Default UTL to -1 (unlimited) to match NFsim's default behavior
    const utl = opts.utl !== undefined ? opts.utl : -1;
    args.push('-utl', String(utl));
    if (opts.cb) {
      args.push('-cb');
    }
    if (opts.speciesPath) {
      args.push('-ss', String(opts.speciesPath));
    }
    if (opts.verbose) {
      args.push('-v');
    }

    if (typeof moduleRef.callMain !== 'function') {
      throw new Error('NFsim runtime missing callMain; ensure it is exported.');
    }

    moduleRef.callMain(args);

    const output = moduleRef.FS.readFile(outPath, { encoding: 'utf8' });
    return output;
  };
})();
