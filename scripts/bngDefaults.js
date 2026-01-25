import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Default to the bundled BioNetGen entrypoint in the repository (patched NFsim support).
export const DEFAULT_BNG2_PATH = resolve(__dirname, '..', 'bionetgen_python', 'bng-win', 'BNG2.pl');
export const DEFAULT_PERL_CMD = 'perl';
