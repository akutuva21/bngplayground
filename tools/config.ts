import { existsSync } from 'fs';

function readEnv(): Record<string, string> {
    // Try to load dotenv if available (for Node scripts)
    try {
        // @ts-ignore
        const dotenv = require('dotenv');
        dotenv.config();
    } catch {
        // dotenv not installed or other error — use process.env only
    }
    return process.env as Record<string, string>;
}

const env = readEnv();

export const BNG2_PATH = env.BNG2_PATH || null;
export const PERL_PATH = env.PERL_PATH || 'perl';
export const bng2Available = BNG2_PATH !== null && existsSync(BNG2_PATH);

export function getBNG2Command(): string[] | null {
    if (!bng2Available) return null;
    return [PERL_PATH, BNG2_PATH!];
}
