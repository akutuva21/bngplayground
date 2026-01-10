
import { BNGLParser } from '../src/services/graph/core/BNGLParser';
import { GraphMatcher } from '../src/services/graph/core/Matcher';

async function main() {
    console.log("Verifying cBNGL Observable Logic...");

    // Pattern: @NU:TF()
    const pattern = BNGLParser.parseSpeciesGraph("@NU:TF()");
    console.log("Pattern Compartment:", pattern.compartment); // Should be NU

    // Case 1: TF in NU
    const speciesNU = BNGLParser.parseSpeciesGraph("@NU:TF(d~pY)");
    const matchesNU = GraphMatcher.findAllMaps(pattern, speciesNU);
    console.log("Matches in NU:", matchesNU.length);
    // Note: If Matcher ignores compartment, this matches. 
    // We also need to check if the surrounding code checks compartment.

    // Case 2: TF in CP
    const speciesCP = BNGLParser.parseSpeciesGraph("@CP:TF(d~Y)");
    const matchesCP = GraphMatcher.findAllMaps(pattern, speciesCP);
    console.log("Matches in CP:", matchesCP.length);

    // Case 3: Complex in NU (if it existed)
    // Theoretically if TF binds something in NU
    const speciesComplexNU = BNGLParser.parseSpeciesGraph("@NU:TF(d!1).DNA(bind!1)");
    const matchesComplexNU = GraphMatcher.findAllMaps(pattern, speciesComplexNU);
    console.log("Matches Complex in NU:", matchesComplexNU.length);
    
    // Logic Verification:
    // If Matcher returns > 0 for CP, then we rely on filtering in the worker.
    // If Matcher returns 0 for CP, then Matcher enforces compartment.
}

main();
