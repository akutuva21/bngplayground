/**
 * Direct WASM File Test
 * Test different URL paths to find where WASM is served
 */
import { test, expect } from '@playwright/test';

test.describe('WASM File Location Test', () => {
  test('should find nfsim.wasm at various paths', async ({ page }) => {
    const paths = [
      '/nfsim.wasm',
      '/bngplayground/nfsim.wasm',
      'nfsim.wasm',
      '/public/nfsim.wasm',
      '/bngplayground/public/nfsim.wasm',
    ];
    
    console.log('[WASM Test] Testing WASM file at different paths...');
    
    for (const path of paths) {
      try {
        const response = await page.goto(`http://localhost:3001${path.startsWith('/') ? '' : '/bngplayground/'}${path}`);
        const status = response?.status();
        console.log(`[WASM Test] ${path} -> ${status}`);
        
        if (status === 200) {
          const contentType = response?.headers()['content-type'];
          const contentLength = response?.headers()['content-length'];
          console.log(`[WASM Test] ✅ Found at ${path}`);
          console.log(`[WASM Test] Content-Type: ${contentType}`);
          console.log(`[WASM Test] Size: ${contentLength} bytes`);
          expect(status).toBe(200);
          return; // Success!
        }
      } catch (error) {
        console.log(`[WASM Test] ${path} -> Error: ${error}`);
      }
    }
    
    console.log('[WASM Test] ❌ WASM file not found at any tested path');
  });

  test('should check public directory structure', async ({ page }) => {
    console.log('[WASM Test] Checking what files are accessible...');
    
    // Try to access known files in public directory
    const testFiles = [
      '/cvode.wasm',
      '/logo.jpg',
      '/favicon.png',
      '/models.json',
    ];
    
    for (const file of testFiles) {
      const response = await page.goto(`http://localhost:3001/bngplayground${file}`);
      const status = response?.status();
      console.log(`[WASM Test] ${file} -> ${status}`);
    }
  });
});
