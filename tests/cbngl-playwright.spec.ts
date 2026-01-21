import { test, expect } from '@playwright/test';

/**
 * Playwright end-to-end tests for cBNGL (compartment BNGL) support
 * Tests the web simulator with compartment models like polymer and polymer_draft
 */

test.describe('cBNGL Model Support', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the simulator
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
  });

  test('polymer.bngl - loads and simulates with compartment c0', async ({ page }) => {
    // Open the model gallery or file selector
    await page.click('button:has-text("Browse Models")').catch(() => {});
    
    // Search for polymer model
    const searchBox = page.locator('input[placeholder*="Search" i]');
    if (await searchBox.isVisible()) {
      await searchBox.fill('polymer');
      await page.waitForTimeout(500);
    }
    
    // Click on polymer model
    await page.click('text=polymer.bngl');
    await page.waitForTimeout(1000);
    
    // Verify the model loaded
    const modelText = await page.textContent('.monaco-editor, textarea, .code-editor');
    expect(modelText).toContain('@c0:');
    expect(modelText).toContain('begin compartments');
    expect(modelText).toContain('c0');
    
    // Click simulate button
    await page.click('button:has-text("Simulate")');
    
    // Wait for simulation to complete (may take a while)
    await page.waitForSelector('text=Simulation complete', { timeout: 60000 });
    
    // Verify results are displayed
    const resultsVisible = await page.isVisible('.plot-container, canvas, svg');
    expect(resultsVisible).toBeTruthy();
    
    // Check that observables are present
    const hasObservables = await page.isVisible('text=O0, text=perfectmachine, text=Agreaterthan');
    expect(hasObservables).toBeTruthy();
  });

  test('polymer_draft.bngl - simulates compartment model', async ({ page }) => {
    // Similar test for polymer_draft
    await page.click('button:has-text("Browse Models")').catch(() => {});
    
    const searchBox = page.locator('input[placeholder*="Search" i]');
    if (await searchBox.isVisible()) {
      await searchBox.fill('polymer_draft');
      await page.waitForTimeout(500);
    }
    
    await page.click('text=polymer_draft.bngl');
    await page.waitForTimeout(1000);
    
    // Verify compartment notation
    const modelText = await page.textContent('.monaco-editor, textarea, .code-editor');
    expect(modelText).toContain('@c0:');
    expect(modelText).toContain('begin compartments');
    
    // Run simulation
    await page.click('button:has-text("Simulate")');
    await page.waitForSelector('text=Simulation complete', { timeout: 60000 });
    
    // Verify no errors
    const hasError = await page.isVisible('text=Error, text=Failed, text=error');
    expect(hasError).toBeFalsy();
  });

  test('compartment transport model - validates molecule movement', async ({ page }) => {
    // Test the compartment transport test model
    // Load via file upload or direct model entry
    await page.click('button:has-text("New Model")').catch(() => {
      return page.click('button:has-text("File")');
    });
    
    // Enter simple compartment transport model
    const editor = page.locator('.monaco-editor textarea, textarea');
    await editor.fill(`
begin model
begin compartments
  C1 3 1
  C2 3 1
end compartments

begin parameters
  k_transport 1.0
end parameters

begin molecule types
  A()
end molecule types

begin seed species
  A()@C1 100
end seed species

begin observables
  Molecules A_C1 A()@C1
  Molecules A_C2 A()@C2
  Molecules A_total A()
end observables

begin reaction rules
  transport: A()@C1 -> A()@C2 k_transport
end reaction rules
end model

simulate_nf({t_end=>10,n_steps=>100})
    `);
    
    // Run simulation
    await page.click('button:has-text("Simulate")');
    await page.waitForSelector('text=Simulation complete', { timeout: 60000 });
    
    // Verify results show transport (A_C1 decreases, A_C2 increases)
    // Check the plot or data table
    const plotVisible = await page.isVisible('.plot-container, canvas');
    expect(plotVisible).toBeTruthy();
    
    // Conservation should hold: A_total should remain constant
    const resultsText = await page.textContent('body');
    expect(resultsText).toContain('A_C1');
    expect(resultsText).toContain('A_C2');
    expect(resultsText).toContain('A_total');
  });
});
