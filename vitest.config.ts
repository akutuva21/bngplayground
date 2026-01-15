import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Limit default test discovery to the formal suite.
    // Other test/benchmark files under src/ or root can be run explicitly.
    include: ['tests/**/*.{test,spec}.ts', 'tests/**/*.{test,spec}.tsx'],

    // Exclude local debugging / reproduction specs from the default run.
    // (These can be invoked explicitly via `npx vitest run <file>`.)
    exclude: [
      '**/node_modules/**',
      'tests/debug-*.{test,spec}.ts',
      'tests/*isolated*.{test,spec}.ts',
      'tests/*repro*.{test,spec}.ts',
      'tests/*spawnsync*.{test,spec}.ts',
    ],

    // Increase timeout to handle slow models
    testTimeout: 300_000,  // 5 minutes
    hookTimeout: 60_000,
    
    // Disable worker threads to avoid async issues
    pool: 'forks',
    
    // Run tests sequentially
    sequence: {
      concurrent: false,
    },
    
    // No fake timers - use real timers
    fakeTimers: {
      toFake: [],
    },
    
    // Handle CJS/ESM interop for cvode_loader
    deps: {
      interopDefault: true,
    },
    
    setupFiles: ['./tests/setup.ts'],
  },
});
