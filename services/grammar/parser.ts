// import { v4 as uuidv4 } from 'uuid';
const uuidv4 = () => Math.random().toString(36).substring(2, 9);
import {
    BioSentence,
    InteractionSentence,
    DefinitionSentence,
    InitializationSentence,
    SimulationSentence
} from './types';

// Regex Patterns
const PATTERNS = {
    DEFINITION: /^Define\s+(?:molecule|protein|species)?\s*(\w+)(?:\s+with\s+sites\s+(.+))?/i,
    INTERACTION_BIND: /^(\w+)\s+binds\s+(\w+)(?:\s+with\s+rate\s+([0-9.e-]+)(?:,\s*([0-9.e-]+))?)?/i,
    INTERACTION_PHOSPHORYLATE: /^(\w+)\s+phosphorylates\s+(\w+)(?:\s+at\s+(\w+))?(?:\s+with\s+rate\s+([0-9.e-]+))?/i,
    INTERACTION_DEPHOSPHORYLATE: /^(\w+)\s+dephosphorylates\s+(\w+)(?:\s+at\s+(\w+))?(?:\s+with\s+rate\s+([0-9.e-]+))?/i,
    INITIALIZATION: /^Start\s+with\s+(\d+|[0-9.e]+)\s+(?:of\s+)?(.+)/i,
    SIMULATION: /^Simulate\s+(?:for\s+)?([0-9.e]+)(?:s| seconds?)?(?:\s+with\s+([0-9]+)\s+steps?)?/i,
    COMMENT: /^#/
};

export class BioParser {

    static parseDocument(text: string): BioSentence[] {
        const lines = text.split('\n');
        return lines.map(line => this.parseSentence(line.trim())).filter(s => s !== null) as BioSentence[];
    }

    static parseSentence(text: string): BioSentence {
        if (!text || text.trim() === '') return { id: uuidv4(), text, type: 'COMMENT', isValid: true };
        if (PATTERNS.COMMENT.test(text)) return { id: uuidv4(), text, type: 'COMMENT', isValid: true };

        // Try Definition
        const defMatch = text.match(PATTERNS.DEFINITION);
        if (defMatch) {
            return this.parseDefinition(text, defMatch);
        }

        // Try Interaction: Bind
        const bindMatch = text.match(PATTERNS.INTERACTION_BIND);
        if (bindMatch) {
            return this.parseBinding(text, bindMatch);
        }

        // Try Interaction: Phosphorylate
        const phosMatch = text.match(PATTERNS.INTERACTION_PHOSPHORYLATE);
        if (phosMatch) {
            return this.parsePhosphorylation(text, phosMatch);
        }

        // Try Interaction: Dephosphorylate
        const dephosMatch = text.match(PATTERNS.INTERACTION_DEPHOSPHORYLATE);
        if (dephosMatch) {
            return this.parseDephosphorylation(text, dephosMatch);
        }

        // Try Initialization
        const initMatch = text.match(PATTERNS.INITIALIZATION);
        if (initMatch) {
            return this.parseInitialization(text, initMatch);
        }

        // Try Simulation
        const simMatch = text.match(PATTERNS.SIMULATION);
        if (simMatch) {
            return this.parseSimulation(text, simMatch);
        }

        return {
            id: uuidv4(),
            text,
            type: 'INVALID',
            isValid: false,
            error: { message: 'Unrecognized sentence format', startColumn: 0, endColumn: text.length }
        };
    }

    private static parseDefinition(text: string, match: RegExpMatchArray): DefinitionSentence {
        const name = match[1];
        const sitesStr = match[2];

        // Parse sites: "x, y" -> ["x", "y"]
        // "x~p~u, y" -> complex state parsing needed
        const sites: string[] = [];
        const states: Record<string, string[]> = {};

        if (sitesStr) {
            const parts = sitesStr.split(',').map(s => s.trim());
            parts.forEach(part => {
                // Handle "site~state1~state2"
                if (part.includes('~')) {
                    const [siteName, ...siteStates] = part.split('~');
                    sites.push(siteName);
                    states[siteName] = siteStates;
                } else {
                    sites.push(part);
                    states[part] = []; // Stateless site (e.g. binding only)
                }
            });
        }

        return {
            id: uuidv4(),
            text,
            type: 'DEFINITION',
            isValid: true,
            agent: { name, sites, states }
        };
    }

    private static parseBinding(text: string, match: RegExpMatchArray): InteractionSentence {
        const subject = { name: match[1], stateConstraints: {} };
        const object = { name: match[2], stateConstraints: {} };
        const fwdRate = match[3] || 'k_on';
        const revRate = match[4] || 'k_off';

        return {
            id: uuidv4(),
            text,
            type: 'INTERACTION',
            isValid: true,
            action: 'binds',
            subject,
            object,
            isBidirectional: true,
            rate: fwdRate,
            reverseRate: revRate
        };
    }

    private static parsePhosphorylation(text: string, match: RegExpMatchArray): InteractionSentence {
        const kinase = { name: match[1], stateConstraints: {} };
        const target = { name: match[2], stateConstraints: {} };
        // const site = match[3]; // Optional specific site logic TODO
        const rate = match[4] || 'k_cat';

        // If site is specified, we conceptually add it to constraints or logic
        // For now, simple AST

        return {
            id: uuidv4(),
            text,
            type: 'INTERACTION',
            isValid: true,
            action: 'phosphorylates',
            subject: kinase, // Kinase is the subject doing the action
            object: target,
            rate,
            isBidirectional: false
        };
    }

    private static parseDephosphorylation(text: string, match: RegExpMatchArray): InteractionSentence {
        const phosphatase = { name: match[1], stateConstraints: {} };
        const target = { name: match[2], stateConstraints: {} };
        // const site = match[3]; // TODO
        const rate = match[4] || 'k_dephos';

        return {
            id: uuidv4(),
            text,
            type: 'INTERACTION',
            isValid: true,
            action: 'dephosphorylates',
            subject: phosphatase,
            object: target,
            rate,
            isBidirectional: false
        };
    }

    private static parseInitialization(text: string, match: RegExpMatchArray): InitializationSentence {
        const count = match[1];
        const moleculeStr = match[2];

        // Naive molecule parsing for now: "A" or "A(site~p)"
        // We treat the whole string as the name if simpl.
        // Real Robustness would require a BNG-Expression parser here.

        return {
            id: uuidv4(),
            text,
            type: 'INITIALIZATION',
            isValid: true,
            molecule: { name: moleculeStr, stateConstraints: {} },
            count
        };
    }

    private static parseSimulation(text: string, match: RegExpMatchArray): SimulationSentence {
        const duration = parseFloat(match[1]);
        const steps = match[2] ? parseInt(match[2], 10) : 100;

        return {
            id: uuidv4(),
            text,
            type: 'SIMULATION',
            isValid: !isNaN(duration),
            duration,
            steps
        };
    }
}

