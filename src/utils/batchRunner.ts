import { bnglService } from '../../services/bnglService';
import { MODEL_CATEGORIES } from '../../constants';
import { BNGLModel, SimulationResults } from '../../types';
import { getSimulationOptionsFromParsedModel } from './simulationOptions';
import { downloadCsv } from './download';

function normalizeFilterNames(names?: string[]) {
    if (!names || names.length === 0) return null;
    const normalized = names
        .map(n => String(n ?? '').trim())
        .filter(Boolean)
        .map(n => n.toLowerCase());
    return normalized.length ? normalized : null;
}

function safeModelName(name: string) {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

export async function runModels(modelNames?: string[]) {
    const filter = normalizeFilterNames(modelNames);
    const allModels = MODEL_CATEGORIES.flatMap(c => c.models);
    const modelsToProcess = filter
        ? allModels.filter(m => {
            const n = m.name.toLowerCase();
            const safe = safeModelName(m.name);
            return filter.includes(n) || filter.includes(safe);
        })
        : allModels;

    console.group('🚀 Batch Model Runner');
    console.log(`Found ${modelsToProcess.length} models to process.`);
    if (filter) console.log('Model filter:', filter);

    let successCount = 0;
    let failCount = 0;

    for (const modelDef of modelsToProcess) {
        console.group(`Processing: ${modelDef.name}`);
        try {
            // 1. Parse
            console.time('Parse');
            const model: BNGLModel = await bnglService.parse(modelDef.code, { description: `Batch Parse: ${modelDef.name}` });
            console.timeEnd('Parse');

            // 2. Determine Simulation Options
            const options = getSimulationOptionsFromParsedModel(model, 'ode', { solver: 'cvode' });
            console.log('Simulation Options:', { t_end: options.t_end, n_steps: options.n_steps, solver: options.solver });

            // 3. Simulate
            console.time('Simulate');
            const results: SimulationResults = await bnglService.simulate(model, {
                ...options
            }, { description: `Batch Sim: ${modelDef.name}` });
            console.timeEnd('Simulate');

            // 4. Export
            const headers = results.headers || [];
            const safeName = safeModelName(modelDef.name);
            downloadCsv(results.data, headers, `results_${safeName}.csv`);

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

export async function runAllModels() {
    return runModels();
}
