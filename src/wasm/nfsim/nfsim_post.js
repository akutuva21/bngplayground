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

  // Helper to safely unlink a file
  const safeUnlink = (path) => {
    try {
      moduleRef.FS.unlink(path);
    } catch {
      // Ignore - file doesn't exist
    }
  };

  // Helper to check if file exists
  const fileExists = (path) => {
    try {
      moduleRef.FS.stat(path);
      return true;
    } catch {
      return false;
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

    // Clean up any previous files
    safeUnlink(xmlPath);
    safeUnlink(outPath);

    // Write input XML
    moduleRef.FS.writeFile(xmlPath, xml);

    // Build command line arguments
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

    // Default UTL to 10000 for complex models (polymer chains, etc.)
    const utl = opts.utl !== undefined ? opts.utl : 10000;
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

    // Call NFsim main() and capture return code
    let exitCode = 0;
    try {
      exitCode = moduleRef.callMain(args);
    } catch (e) {
      // Emscripten can throw on exit() or abort()
      if (e.name === 'ExitStatus') {
        exitCode = e.status;
      } else {
        throw new Error(`NFsim crashed: ${e.message || e}`);
      }
    }

    // Check exit code - 0 is success, anything else is an error
    // Note: Garbage values like 630232 indicate memory corruption
    if (exitCode !== 0) {
      // Try to provide useful error info
      let errorMsg = `NFsim failed with exit code ${exitCode}`;
      
      // Large positive numbers usually indicate memory corruption
      if (exitCode > 1000) {
        errorMsg += ' (likely memory corruption - try reducing model complexity or increasing memory limits)';
      }
      
      throw new Error(errorMsg);
    }

    // Verify output file exists before reading
    if (!fileExists(outPath)) {
      throw new Error(`NFsim completed but output file ${outPath} not found`);
    }

    const output = moduleRef.FS.readFile(outPath, { encoding: 'utf8' });
    return output;
  };

  // Expose a way to reset the module state (useful between runs)
  Module.resetNFsim = function resetNFsim() {
    // Clean up common temp files
    const commonFiles = ['/model.xml', '/model.gdat', '/model.species'];
    commonFiles.forEach(safeUnlink);
  };
})();
