@echo off
setlocal

REM Build NFsim to WebAssembly (Windows)
set SCRIPT_DIR=%~dp0
if defined NFSIM_SRC (
  set NFSIM_SRC=%NFSIM_SRC%
) else (
  set NFSIM_SRC=%SCRIPT_DIR%..\..\..\nfsim
)

if not exist "%NFSIM_SRC%\src\NFsim.cpp" (
  echo NFsim sources not found at %NFSIM_SRC%\src\NFsim.cpp
  echo Please clone https://github.com/RuleWorld/nfsim into %NFSIM_SRC% first.
  exit /b 1
)

REM Activate Emscripten SDK environment (if EMSDK env var is set)
if defined EMSDK (
  call "%EMSDK%\emsdk_env.bat"
) else (
  echo EMSDK environment variable not set. Assuming Emscripten is already in PATH.
)

REM Create a clean build directory
set BUILD_DIR=%SCRIPT_DIR%build_ems
if exist "%BUILD_DIR%" rmdir /s /q "%BUILD_DIR%"
mkdir "%BUILD_DIR%"
pushd "%BUILD_DIR%"

set POST_JS=%SCRIPT_DIR%nfsim_post.js

REM Configure with emcmake
emcmake cmake "%NFSIM_SRC%" -DCMAKE_BUILD_TYPE=Release ^
 -DCMAKE_CXX_FLAGS="-O3 -fexceptions -std=c++11" ^
 -DCMAKE_C_FLAGS="-O3" ^
 -DCMAKE_EXE_LINKER_FLAGS="-s MODULARIZE=1 -s EXPORT_NAME=createNFsimModule -s EXPORTED_FUNCTIONS=['_main','_malloc','_free'] -s EXPORTED_RUNTIME_METHODS=['callMain','FS','cwrap','UTF8ToString','stringToUTF8','lengthBytesUTF8','print','printErr'] -s ALLOW_MEMORY_GROWTH=1 -s INITIAL_MEMORY=134217728 -s MAXIMUM_MEMORY=536870912 -s STACK_SIZE=5242880 -s ASSERTIONS=2 -s ENVIRONMENT=web,worker -s FORCE_FILESYSTEM=1 -s DISABLE_EXCEPTION_CATCHING=0 -s INVOKE_RUN=0 --post-js \"%POST_JS%\""
if errorlevel 1 exit /b 1

REM Build
where make >nul 2>nul
if errorlevel 1 (
  emmake mingw32-make -j4
) else (
  emmake make -j4
)
if errorlevel 1 exit /b 1

REM Install artifacts to app
if exist "NFsim.js" (
  copy /Y "NFsim.js" "%SCRIPT_DIR%..\..\..\public\nfsim.js"
  echo.>> "%SCRIPT_DIR%..\..\..\public\nfsim.js"
  echo export default createNFsimModule;>> "%SCRIPT_DIR%..\..\..\public\nfsim.js"
) else if exist "nfsim.js" (
  copy /Y "nfsim.js" "%SCRIPT_DIR%..\..\..\public\nfsim.js"
  echo.>> "%SCRIPT_DIR%..\..\..\public\nfsim.js"
  echo export default createNFsimModule;>> "%SCRIPT_DIR%..\..\..\public\nfsim.js"
)

if exist "NFsim.wasm" (
  copy /Y "NFsim.wasm" "%SCRIPT_DIR%..\..\..\public\nfsim.wasm"
  copy /Y "NFsim.wasm" "%SCRIPT_DIR%..\..\..\public\NFsim.wasm"
) else if exist "nfsim.wasm" (
  copy /Y "nfsim.wasm" "%SCRIPT_DIR%..\..\..\public\nfsim.wasm"
  copy /Y "nfsim.wasm" "%SCRIPT_DIR%..\..\..\public\NFsim.wasm"
)

echo Build complete.

popd
endlocal
