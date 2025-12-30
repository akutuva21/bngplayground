import { bnglService } from '../../services/bnglService';
import { MODEL_CATEGORIES } from '../../constants';
import { BNGLModel, SimulationResults } from '../../types';

// Extract default simulation parameters if not specified in the model
const DEFAULT_SIM_OPTIONS = {
    method: 'ode' as const,
    t_end: 100,
    n_steps: 100,
    solver: 'cvode' as const
};

// Helper to download data as CSV (copied/adapted from ResultsChart)
function downloadCSV(filename: string, data: Record<string, any>[], headers: string[]) {
    if (!data || data.length === 0) return;

    const csvHeaders = ['time', ...headers.filter(h => h !== 'time')];
    const csvRows = data.map(row =>
        csvHeaders.map(h => row[h] ?? '').join(',')
    );
    const csv = [csvHeaders.join(','), ...csvRows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a); // Append to body to ensure click works
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Regex to extract simulate options from BNGL code (simplified version of EditorPanel logic)
function extractSimOptions(code: string) {
    const t_end_match = code.match(/t_end\s*=>\s*([\d\.e\-\+]+)/i);
    const n_steps_match = code.match(/n_steps\s*=>\s*(\d+)/i);
    return {
        t_end: t_end_match ? parseFloat(t_end_match[1]) : DEFAULT_SIM_OPTIONS.t_end,
        n_steps: n_steps_match ? parseInt(n_steps_match[1]) : DEFAULT_SIM_OPTIONS.n_steps
    };
}

export async function runAllModels() {
    const allModels = MODEL_CATEGORIES.flatMap(c => c.models);
    console.group('🚀 Batch Model Runner');
    console.log(`Found ${allModels.length} models to process.`);

    let successCount = 0;
    let failCount = 0;

    for (const modelDef of allModels) {
        console.group(`Processing: ${modelDef.name}`);
        try {
            // 1. Parse
            console.time('Parse');
            const model: BNGLModel = await bnglService.parse(modelDef.code, { description: `Batch Parse: ${modelDef.name}` });
            console.timeEnd('Parse');

            // 2. Determine Simulation Options
            const options = extractSimOptions(modelDef.code);
            console.log('Simulation Options:', options);

            // 3. Simulate
            console.time('Simulate');
            const results: SimulationResults = await bnglService.simulate(model, {
                method: 'ode',
                t_end: options.t_end,
                n_steps: options.n_steps,
                solver: 'cvode' // Force CVODE for robustness
            }, { description: `Batch Sim: ${modelDef.name}` });
            console.timeEnd('Simulate');

            // 4. Export
            const headers = results.headers || [];
            const safeName = modelDef.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            downloadCSV(`results_${safeName}.csv`, results.data, headers);

            console.log('✅ Exported CSV');
            successCount++;
        } catch (e: any) {
            console.error('❌ Failed:', e);
            failCount++;
            // If the worker crashed or was terminated, we MUST restart it to continue processing subsequent models
            if (e.message?.includes('terminated') || e.message?.includes('Worker')) {
                console.warn('⚠️ Worker terminated/crashed. Restarting service for next model...');
                bnglService.restart();
            }
        }
        console.groupEnd();

        // Slight delay to allow browser to breathe/download
        await new Promise(r => setTimeout(r, 500));
    }

    console.log(`Batch Run Complete. Success: ${successCount}, Failed: ${failCount}`);
    console.groupEnd();
    return { success: successCount, failed: failCount };
}
