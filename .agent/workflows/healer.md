---
description: Triple Gate code healer - automatically fix lint, type, and test errors using Gemini CLI
---

# Code Healer Workflow (`/healer`)

This workflow implements a "Triple Gate" healing system. It sequentially runs linting, type checks, and tests. If any step fails, it uses the local `gemini` CLI to fix the errors and verifies the fix.

## When to Use

Use this workflow to quickly clean up a codebase or fix persistent lint/type errors without manual intervention.

## Triple Gate Process

### Gate 1: Linting

   ```powershell
   npm run lint
   ```

2. **Heal**: If it fails, the agent must identify the failing file and run:

   ```powershell
   // turbo
   gemini -p "Fix the following lint errors in this file. Provide ONLY the corrected code without markdown blocks: <ERRORS> <FILE_CONTENT>"
   ```

3. **Verify**: Re-run `npm run lint` on the fixed file.

### Gate 2: Type Checking

1. **Check**: Run `npm run type-check`.
2. **Heal**: If it fails, the agent must identify the failing file and run:

   ```powershell
   // turbo
   gemini -p "Fix the following TypeScript type errors. Provide ONLY the corrected code: <ERRORS> <FILE_CONTENT>"
   ```

3. **Verify**: Re-run `npm run type-check`.

### Gate 3: Unit Testing

1. **Check**: Run `npm run test`.
2. **Heal**: If it fails, the agent must identify the failing file and run:

   ```powershell
   // turbo
   gemini -p "The following test is failing. Fix the code to make it pass. Provide ONLY the corrected code for the failing file: <TEST_FAILURE> <FILE_CONTENT>"
   ```

3. **Verify**: Re-run `npm run test`.

## Usage

Simply trigger this workflow by typing `/healer` in the terminal.

// turbo-all

```powershell
# Master Command to trigger the full Triple Gate sequence
npm run lint; npm run type-check; npm run test
```
