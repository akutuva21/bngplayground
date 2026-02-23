# NFsim WASM Build

Build scripts for compiling [NFsim](https://github.com/RuleWorld/nfsim) to WebAssembly via Emscripten.

The C++ source lives in the **akutuva21/nfsim** fork (not in this repo).
These scripts were moved here from `src/wasm/nfsim/` as part of the engine modularisation.

## Prerequisites

- [Emscripten SDK](https://emscripten.org/docs/getting_started/downloads.html) ≥ 3.1.51
- CMake ≥ 3.16
- C++ source: clone `akutuva21/nfsim` and set `NFSIM_SRC` to its path

## Rebuild (local)

**Linux / macOS:**
```bash
export NFSIM_SRC=/path/to/akutuva21/nfsim
source $EMSDK/emsdk_env.sh
cd wasm-nfsim && ./build_wasm.sh
```

**Windows:**
```bat
set NFSIM_SRC=C:\path\to\akutuva21\nfsim
call %EMSDK%\emsdk_env.bat
cd wasm-nfsim && build_wasm.bat
```

Outputs are written to `../public/nfsim.js` and `../public/nfsim.wasm`.

## Fetch pre-built artifacts (CI)

If you don't need to modify the C++ source, download from the `akutuva21/nfsim` GitHub Actions CI:

```bash
./tools/fetch-nfsim-wasm.sh
```

Requires the [GitHub CLI](https://cli.github.com/) to be installed and authenticated.

## Set up CI in akutuva21/nfsim

Copy `build-wasm.github-actions-template.yml` to `.github/workflows/build-wasm.yml`
in the `akutuva21/nfsim` repository and also move `build_wasm.sh`, `build_wasm.bat`,
and `nfsim_post.js` into a `wasm/` subdirectory there.
