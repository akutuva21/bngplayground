/**
 * ANTLR4 Parser Grammar for BNGL
 * Inspired by RuleWorld/BNGParser
 * Simplified unified grammar for web simulator
 */
parser grammar BNGParser;

options {
    tokenVocab = BNGLexer;
}

// Entry point
prog
    : LB* header_block* ((BEGIN MODEL LB+ program_block* END MODEL LB*) | program_block*) actions_block? EOF
    ;

header_block
    : version_def
    | substance_def
    | set_option
    | set_model_name
    ;

version_def
    : VERSION LPAREN DBQUOTES VERSION_NUMBER STRING? DBQUOTES RPAREN SEMI? LB+
    ;

substance_def
    : SUBSTANCEUNITS LPAREN DBQUOTES STRING DBQUOTES RPAREN SEMI? LB+
    ;

set_option
    : SET_OPTION LPAREN DBQUOTES STRING DBQUOTES COMMA (DBQUOTES STRING DBQUOTES | INT | FLOAT)
      (COMMA DBQUOTES STRING DBQUOTES COMMA (DBQUOTES STRING DBQUOTES | INT | FLOAT))* RPAREN SEMI? LB+
    ;

set_model_name
    : SET_MODEL_NAME LPAREN DBQUOTES STRING DBQUOTES RPAREN SEMI? LB+
    ;

// Program blocks
program_block
    : parameters_block
    | molecule_types_block
    | seed_species_block
    | observables_block
    | reaction_rules_block
    | functions_block
    | compartments_block
    | energy_patterns_block
    | population_maps_block
    ;

// Parameters block
parameters_block
    : BEGIN PARAMETERS LB+ (parameter_def LB+)* END PARAMETERS LB*
    ;

parameter_def
    : (STRING COLON)? STRING BECOMES? expression?
    ;

// Molecule types block
molecule_types_block
    : BEGIN MOLECULE TYPES LB+ (molecule_type_def LB+)* END MOLECULE TYPES LB*
    ;

molecule_type_def
    : (STRING COLON)? molecule_def
    ;

molecule_def
    : STRING LPAREN component_def_list? RPAREN
    ;

component_def_list
    : component_def (COMMA component_def)*
    ;

component_def
    : STRING (TILDE state_list)?
    ;

state_list
    : STRING (TILDE STRING)*
    ;

// Seed species block
seed_species_block
    : BEGIN (SEED SPECIES | SPECIES) LB+ (seed_species_def LB+)* END (SEED SPECIES | SPECIES) LB*
    ;

seed_species_def
    : (STRING COLON)? DOLLAR? species_def expression
    ;

species_def
    : molecule_pattern (DOT molecule_pattern)* (AT STRING)?
    ;

molecule_pattern
    : STRING LPAREN component_pattern_list? RPAREN
    ;

component_pattern_list
    : component_pattern (COMMA component_pattern)*
    ;

component_pattern
    : STRING (TILDE state_value)? bond_spec?
    ;

state_value
    : STRING | QMARK
    ;

bond_spec
    : EMARK bond_id
    | EMARK PLUS
    | EMARK QMARK
    ;

bond_id
    : INT | STRING
    ;

// Observables block
observables_block
    : BEGIN OBSERVABLES LB+ (observable_def LB+)* END OBSERVABLES LB*
    ;

observable_def
    : (STRING COLON)? observable_type STRING observable_pattern_list
    ;

observable_type
    : MOLECULES | SPECIES | STRING  // Molecules, Species, or custom type
    ;

observable_pattern_list
    : species_def (COMMA species_def)*
    ;

// Reaction rules block
reaction_rules_block
    : BEGIN REACTION RULES LB+ (reaction_rule_def LB+)* END REACTION RULES LB*
    ;

reaction_rule_def
    : (label_def COLON)? reactant_patterns reaction_sign product_patterns rate_law rule_modifiers?
    ;

label_def
    : STRING | INT
    ;

reactant_patterns
    : species_def (PLUS species_def)*
    | INT  // 0 for null pattern
    ;

product_patterns
    : species_def (PLUS species_def)*
    | INT  // 0 for null pattern
    ;

reaction_sign
    : UNI_REACTION_SIGN
    | BI_REACTION_SIGN
    ;

rate_law
    : expression (COMMA expression)?
    ;

rule_modifiers
    : DELETEMOLECULES
    | MOVECONNECTED
    | MATCHONCE
    | TOTALRATE
    | INCLUDE_REACTANTS LPAREN INT COMMA pattern_list RPAREN
    | EXCLUDE_REACTANTS LPAREN INT COMMA pattern_list RPAREN
    | INCLUDE_PRODUCTS LPAREN INT COMMA pattern_list RPAREN
    | EXCLUDE_PRODUCTS LPAREN INT COMMA pattern_list RPAREN
    ;

pattern_list
    : species_def (COMMA species_def)*
    ;

// Functions block
functions_block
    : BEGIN FUNCTIONS LB+ (function_def LB+)* END FUNCTIONS LB*
    ;

function_def
    : (STRING COLON)? STRING LPAREN param_list? RPAREN BECOMES? expression
    ;

param_list
    : STRING (COMMA STRING)*
    ;

// Compartments block
compartments_block
    : BEGIN COMPARTMENTS LB+ (compartment_def LB+)* END COMPARTMENTS LB*
    ;

compartment_def
    : (STRING COLON)? STRING INT expression STRING?
    ;

// Energy patterns block
energy_patterns_block
    : BEGIN ENERGY PATTERNS LB+ (energy_pattern_def LB+)* END ENERGY PATTERNS LB*
    ;

energy_pattern_def
    : (STRING COLON)? species_def expression
    ;

// Population maps block
population_maps_block
    : BEGIN POPULATION MAPS LB+ (population_map_def LB+)* END POPULATION MAPS LB*
    ;

population_map_def
    : (STRING COLON)? species_def UNI_REACTION_SIGN STRING LPAREN param_list? RPAREN
    ;

// Actions block
actions_block
    : action_command+
    ;

action_command
    : generate_network_cmd
    | simulate_cmd
    | write_cmd
    | set_cmd
    | other_action_cmd
    ;

generate_network_cmd
    : GENERATENETWORK LPAREN action_args? RPAREN SEMI? LB*
    ;

simulate_cmd
    : (SIMULATE | SIMULATE_ODE | SIMULATE_SSA | SIMULATE_PLA | SIMULATE_NF) 
      LPAREN action_args? RPAREN SEMI? LB*
    ;

write_cmd
    : (WRITEFILE | WRITEXML | WRITESBML | WRITENETWORK | WRITEMODEL | WRITEMFILE | WRITEMEXFILE)
      LPAREN action_args? RPAREN SEMI? LB*
    ;

set_cmd
    : (SETCONCENTRATION | ADDCONCENTRATION | SETPARAMETER) 
      LPAREN DBQUOTES species_def DBQUOTES COMMA expression RPAREN SEMI? LB*
    ;

other_action_cmd
    : (SAVECONCENTRATIONS | RESETCONCENTRATIONS | SAVEPARAMETERS | RESETPARAMETERS | QUIT
       | PARAMETER_SCAN | BIFURCATE | VISUALIZE | GENERATEHYBRIDMODEL | READFILE)
      LPAREN action_args? RPAREN SEMI? LB*
    ;

action_args
    : LBRACKET action_arg_list RBRACKET
    ;

action_arg_list
    : action_arg (COMMA action_arg)*
    ;

action_arg
    : arg_name ASSIGNS (expression | DBQUOTES (~DBQUOTES)* DBQUOTES | LSBRACKET expression_list RSBRACKET)
    ;

// Allow keywords to be used as argument names in action calls
// This includes all possible BNG2.pl action options for full compatibility
arg_name
    : STRING
    // generate_network options
    | OVERWRITE | MAX_AGG | MAX_ITER | MAX_STOICH | PRINT_ITER | CHECK_ISO
    // simulate options
    | METHOD | T_START | T_END | N_STEPS | N_OUTPUT_STEPS | ATOL | RTOL | STEADY_STATE | SPARSE
    | VERBOSE | NETFILE | CONTINUE | PREFIX | SUFFIX | FORMAT | FILE
    // Additional simulate options
    | PRINT_CDAT | PRINT_FUNCTIONS | PRINT_NET | PRINT_END | STOP_IF | PRINT_ON_STOP
    | SAVE_PROGRESS | MAX_SIM_STEPS | OUTPUT_STEP_INTERVAL | SAMPLE_TIMES
    // SSA/PLA options
    | PLA_CONFIG | PLA_OUTPUT
    // NFsim options
    | PARAM | COMPLEX | GET_FINAL_STATE | GML | NOCSLF | NOTF | BINARY_OUTPUT | UTL | EQUIL
    // Parameter scan options
    | PARAMETER | PAR_MIN | PAR_MAX | N_SCAN_PTS | LOG_SCALE | RESET_CONC
    // Mfile options
    | BDF | MAX_STEP | MAXORDER | STATS | MAX_NUM_STEPS | MAX_ERR_TEST_FAILS | MAX_CONV_FAILS | STIFF
    // Read/write options
    | ATOMIZE | BLOCKS | SKIPACTIONS | INCLUDE_MODEL | INCLUDE_NETWORK | PRETTY_FORMATTING | EVALUATE_EXPRESSIONS
    // Visualize options
    | TYPE | BACKGROUND | COLLAPSE | OPTS
    // Safe/execute
    | SAFE | EXECUTE
    ;

expression_list
    : expression (COMMA expression)*
    ;

// Expressions
expression
    : conditional_expr
    ;

conditional_expr
    : or_expr (QMARK expression COLON expression)?
    ;

or_expr
    : and_expr (PIPE PIPE and_expr)*
    ;

and_expr
    : equality_expr (AMPERSAND AMPERSAND equality_expr)*
    ;

equality_expr
    : relational_expr ((EQUALS | GTE | GT | LTE | LT) relational_expr)*
    ;

relational_expr
    : additive_expr
    ;

additive_expr
    : multiplicative_expr ((PLUS | MINUS) multiplicative_expr)*
    ;

multiplicative_expr
    : power_expr ((TIMES | DIV | MOD) power_expr)*
    ;

power_expr
    : unary_expr (POWER unary_expr)*
    ;

unary_expr
    : (PLUS | MINUS)? primary_expr
    ;

primary_expr
    : LPAREN expression RPAREN
    | function_call
    | observable_ref
    | literal
    | STRING
    ;

function_call
    : (EXP | LN | LOG10 | LOG2 | SQRT | ABS | SIN | COS | TAN | ASIN | ACOS | ATAN 
       | SINH | COSH | TANH | ASINH | ACOSH | ATANH | RINT | MIN | MAX | SUM | AVG
       | IF | SAT | MM | HILL | ARRHENIUS | TIME) 
      LPAREN expression_list? RPAREN
    ;

observable_ref
    : STRING LPAREN expression RPAREN
    ;

literal
    : INT
    | FLOAT
    | PI
    | EULERIAN
    ;
