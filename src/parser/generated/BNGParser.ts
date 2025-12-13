// Generated from src/parser/grammar/BNGParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { BNGParserListener } from "./BNGParserListener";
import { BNGParserVisitor } from "./BNGParserVisitor";


export class BNGParser extends Parser {
	public static readonly LINE_COMMENT = 1;
	public static readonly LB = 2;
	public static readonly WS = 3;
	public static readonly BEGIN = 4;
	public static readonly END = 5;
	public static readonly MODEL = 6;
	public static readonly PARAMETERS = 7;
	public static readonly COMPARTMENTS = 8;
	public static readonly MOLECULE = 9;
	public static readonly MOLECULES = 10;
	public static readonly TYPES = 11;
	public static readonly SEED = 12;
	public static readonly SPECIES = 13;
	public static readonly OBSERVABLES = 14;
	public static readonly FUNCTIONS = 15;
	public static readonly REACTION = 16;
	public static readonly REACTIONS = 17;
	public static readonly RULES = 18;
	public static readonly GROUPS = 19;
	public static readonly ACTIONS = 20;
	public static readonly POPULATION = 21;
	public static readonly MAPS = 22;
	public static readonly ENERGY = 23;
	public static readonly PATTERNS = 24;
	public static readonly MATCHONCE = 25;
	public static readonly DELETEMOLECULES = 26;
	public static readonly MOVECONNECTED = 27;
	public static readonly INCLUDE_REACTANTS = 28;
	public static readonly INCLUDE_PRODUCTS = 29;
	public static readonly EXCLUDE_REACTANTS = 30;
	public static readonly EXCLUDE_PRODUCTS = 31;
	public static readonly TOTALRATE = 32;
	public static readonly VERSION = 33;
	public static readonly SET_OPTION = 34;
	public static readonly SET_MODEL_NAME = 35;
	public static readonly SUBSTANCEUNITS = 36;
	public static readonly PREFIX = 37;
	public static readonly SUFFIX = 38;
	public static readonly GENERATENETWORK = 39;
	public static readonly OVERWRITE = 40;
	public static readonly MAX_AGG = 41;
	public static readonly MAX_ITER = 42;
	public static readonly MAX_STOICH = 43;
	public static readonly PRINT_ITER = 44;
	public static readonly CHECK_ISO = 45;
	public static readonly GENERATEHYBRIDMODEL = 46;
	public static readonly SAFE = 47;
	public static readonly EXECUTE = 48;
	public static readonly SIMULATE = 49;
	public static readonly METHOD = 50;
	public static readonly ODE = 51;
	public static readonly SSA = 52;
	public static readonly PLA = 53;
	public static readonly NF = 54;
	public static readonly VERBOSE = 55;
	public static readonly NETFILE = 56;
	public static readonly ARGFILE = 57;
	public static readonly CONTINUE = 58;
	public static readonly T_START = 59;
	public static readonly T_END = 60;
	public static readonly N_STEPS = 61;
	public static readonly N_OUTPUT_STEPS = 62;
	public static readonly MAX_SIM_STEPS = 63;
	public static readonly OUTPUT_STEP_INTERVAL = 64;
	public static readonly SAMPLE_TIMES = 65;
	public static readonly SAVE_PROGRESS = 66;
	public static readonly PRINT_CDAT = 67;
	public static readonly PRINT_FUNCTIONS = 68;
	public static readonly PRINT_NET = 69;
	public static readonly PRINT_END = 70;
	public static readonly STOP_IF = 71;
	public static readonly PRINT_ON_STOP = 72;
	public static readonly SIMULATE_ODE = 73;
	public static readonly ATOL = 74;
	public static readonly RTOL = 75;
	public static readonly STEADY_STATE = 76;
	public static readonly SPARSE = 77;
	public static readonly SIMULATE_SSA = 78;
	public static readonly SIMULATE_PLA = 79;
	public static readonly PLA_CONFIG = 80;
	public static readonly PLA_OUTPUT = 81;
	public static readonly SIMULATE_NF = 82;
	public static readonly PARAM = 83;
	public static readonly COMPLEX = 84;
	public static readonly GET_FINAL_STATE = 85;
	public static readonly GML = 86;
	public static readonly NOCSLF = 87;
	public static readonly NOTF = 88;
	public static readonly BINARY_OUTPUT = 89;
	public static readonly UTL = 90;
	public static readonly EQUIL = 91;
	public static readonly PARAMETER_SCAN = 92;
	public static readonly BIFURCATE = 93;
	public static readonly PARAMETER = 94;
	public static readonly PAR_MIN = 95;
	public static readonly PAR_MAX = 96;
	public static readonly N_SCAN_PTS = 97;
	public static readonly LOG_SCALE = 98;
	public static readonly RESET_CONC = 99;
	public static readonly READFILE = 100;
	public static readonly FILE = 101;
	public static readonly ATOMIZE = 102;
	public static readonly BLOCKS = 103;
	public static readonly SKIPACTIONS = 104;
	public static readonly VISUALIZE = 105;
	public static readonly TYPE = 106;
	public static readonly BACKGROUND = 107;
	public static readonly COLLAPSE = 108;
	public static readonly OPTS = 109;
	public static readonly WRITESSC = 110;
	public static readonly WRITESSCCFG = 111;
	public static readonly FORMAT = 112;
	public static readonly WRITEFILE = 113;
	public static readonly WRITEMODEL = 114;
	public static readonly WRITEXML = 115;
	public static readonly WRITENETWORK = 116;
	public static readonly WRITESBML = 117;
	public static readonly WRITEMDL = 118;
	public static readonly INCLUDE_MODEL = 119;
	public static readonly INCLUDE_NETWORK = 120;
	public static readonly PRETTY_FORMATTING = 121;
	public static readonly EVALUATE_EXPRESSIONS = 122;
	public static readonly TEXTREACTION = 123;
	public static readonly TEXTSPECIES = 124;
	public static readonly WRITEMFILE = 125;
	public static readonly WRITEMEXFILE = 126;
	public static readonly BDF = 127;
	public static readonly MAX_STEP = 128;
	public static readonly MAXORDER = 129;
	public static readonly STATS = 130;
	public static readonly MAX_NUM_STEPS = 131;
	public static readonly MAX_ERR_TEST_FAILS = 132;
	public static readonly MAX_CONV_FAILS = 133;
	public static readonly STIFF = 134;
	public static readonly SETCONCENTRATION = 135;
	public static readonly ADDCONCENTRATION = 136;
	public static readonly SAVECONCENTRATIONS = 137;
	public static readonly RESETCONCENTRATIONS = 138;
	public static readonly SETPARAMETER = 139;
	public static readonly SAVEPARAMETERS = 140;
	public static readonly RESETPARAMETERS = 141;
	public static readonly QUIT = 142;
	public static readonly SAT = 143;
	public static readonly MM = 144;
	public static readonly HILL = 145;
	public static readonly ARRHENIUS = 146;
	public static readonly IF = 147;
	public static readonly EXP = 148;
	public static readonly LN = 149;
	public static readonly LOG10 = 150;
	public static readonly LOG2 = 151;
	public static readonly SQRT = 152;
	public static readonly RINT = 153;
	public static readonly ABS = 154;
	public static readonly SIN = 155;
	public static readonly COS = 156;
	public static readonly TAN = 157;
	public static readonly ASIN = 158;
	public static readonly ACOS = 159;
	public static readonly ATAN = 160;
	public static readonly SINH = 161;
	public static readonly COSH = 162;
	public static readonly TANH = 163;
	public static readonly ASINH = 164;
	public static readonly ACOSH = 165;
	public static readonly ATANH = 166;
	public static readonly PI = 167;
	public static readonly EULERIAN = 168;
	public static readonly MIN = 169;
	public static readonly MAX = 170;
	public static readonly SUM = 171;
	public static readonly AVG = 172;
	public static readonly TIME = 173;
	public static readonly FLOAT = 174;
	public static readonly INT = 175;
	public static readonly STRING = 176;
	public static readonly SEMI = 177;
	public static readonly COLON = 178;
	public static readonly LSBRACKET = 179;
	public static readonly RSBRACKET = 180;
	public static readonly LBRACKET = 181;
	public static readonly RBRACKET = 182;
	public static readonly COMMA = 183;
	public static readonly DOT = 184;
	public static readonly LPAREN = 185;
	public static readonly RPAREN = 186;
	public static readonly UNI_REACTION_SIGN = 187;
	public static readonly BI_REACTION_SIGN = 188;
	public static readonly DOLLAR = 189;
	public static readonly TILDE = 190;
	public static readonly AT = 191;
	public static readonly GTE = 192;
	public static readonly GT = 193;
	public static readonly LTE = 194;
	public static readonly LT = 195;
	public static readonly ASSIGNS = 196;
	public static readonly EQUALS = 197;
	public static readonly BECOMES = 198;
	public static readonly DIV = 199;
	public static readonly TIMES = 200;
	public static readonly MINUS = 201;
	public static readonly PLUS = 202;
	public static readonly POWER = 203;
	public static readonly MOD = 204;
	public static readonly PIPE = 205;
	public static readonly QMARK = 206;
	public static readonly EMARK = 207;
	public static readonly DBQUOTES = 208;
	public static readonly AMPERSAND = 209;
	public static readonly VERSION_NUMBER = 210;
	public static readonly ULB = 211;
	public static readonly RULE_prog = 0;
	public static readonly RULE_header_block = 1;
	public static readonly RULE_version_def = 2;
	public static readonly RULE_substance_def = 3;
	public static readonly RULE_set_option = 4;
	public static readonly RULE_set_model_name = 5;
	public static readonly RULE_program_block = 6;
	public static readonly RULE_parameters_block = 7;
	public static readonly RULE_parameter_def = 8;
	public static readonly RULE_molecule_types_block = 9;
	public static readonly RULE_molecule_type_def = 10;
	public static readonly RULE_molecule_def = 11;
	public static readonly RULE_component_def_list = 12;
	public static readonly RULE_component_def = 13;
	public static readonly RULE_state_list = 14;
	public static readonly RULE_seed_species_block = 15;
	public static readonly RULE_seed_species_def = 16;
	public static readonly RULE_species_def = 17;
	public static readonly RULE_molecule_pattern = 18;
	public static readonly RULE_component_pattern_list = 19;
	public static readonly RULE_component_pattern = 20;
	public static readonly RULE_state_value = 21;
	public static readonly RULE_bond_spec = 22;
	public static readonly RULE_bond_id = 23;
	public static readonly RULE_observables_block = 24;
	public static readonly RULE_observable_def = 25;
	public static readonly RULE_observable_type = 26;
	public static readonly RULE_observable_pattern_list = 27;
	public static readonly RULE_reaction_rules_block = 28;
	public static readonly RULE_reaction_rule_def = 29;
	public static readonly RULE_label_def = 30;
	public static readonly RULE_reactant_patterns = 31;
	public static readonly RULE_product_patterns = 32;
	public static readonly RULE_reaction_sign = 33;
	public static readonly RULE_rate_law = 34;
	public static readonly RULE_rule_modifiers = 35;
	public static readonly RULE_pattern_list = 36;
	public static readonly RULE_functions_block = 37;
	public static readonly RULE_function_def = 38;
	public static readonly RULE_param_list = 39;
	public static readonly RULE_compartments_block = 40;
	public static readonly RULE_compartment_def = 41;
	public static readonly RULE_energy_patterns_block = 42;
	public static readonly RULE_energy_pattern_def = 43;
	public static readonly RULE_population_maps_block = 44;
	public static readonly RULE_population_map_def = 45;
	public static readonly RULE_actions_block = 46;
	public static readonly RULE_action_command = 47;
	public static readonly RULE_generate_network_cmd = 48;
	public static readonly RULE_simulate_cmd = 49;
	public static readonly RULE_write_cmd = 50;
	public static readonly RULE_set_cmd = 51;
	public static readonly RULE_other_action_cmd = 52;
	public static readonly RULE_action_args = 53;
	public static readonly RULE_action_arg_list = 54;
	public static readonly RULE_action_arg = 55;
	public static readonly RULE_arg_name = 56;
	public static readonly RULE_expression_list = 57;
	public static readonly RULE_expression = 58;
	public static readonly RULE_conditional_expr = 59;
	public static readonly RULE_or_expr = 60;
	public static readonly RULE_and_expr = 61;
	public static readonly RULE_equality_expr = 62;
	public static readonly RULE_relational_expr = 63;
	public static readonly RULE_additive_expr = 64;
	public static readonly RULE_multiplicative_expr = 65;
	public static readonly RULE_power_expr = 66;
	public static readonly RULE_unary_expr = 67;
	public static readonly RULE_primary_expr = 68;
	public static readonly RULE_function_call = 69;
	public static readonly RULE_observable_ref = 70;
	public static readonly RULE_literal = 71;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"prog", "header_block", "version_def", "substance_def", "set_option", 
		"set_model_name", "program_block", "parameters_block", "parameter_def", 
		"molecule_types_block", "molecule_type_def", "molecule_def", "component_def_list", 
		"component_def", "state_list", "seed_species_block", "seed_species_def", 
		"species_def", "molecule_pattern", "component_pattern_list", "component_pattern", 
		"state_value", "bond_spec", "bond_id", "observables_block", "observable_def", 
		"observable_type", "observable_pattern_list", "reaction_rules_block", 
		"reaction_rule_def", "label_def", "reactant_patterns", "product_patterns", 
		"reaction_sign", "rate_law", "rule_modifiers", "pattern_list", "functions_block", 
		"function_def", "param_list", "compartments_block", "compartment_def", 
		"energy_patterns_block", "energy_pattern_def", "population_maps_block", 
		"population_map_def", "actions_block", "action_command", "generate_network_cmd", 
		"simulate_cmd", "write_cmd", "set_cmd", "other_action_cmd", "action_args", 
		"action_arg_list", "action_arg", "arg_name", "expression_list", "expression", 
		"conditional_expr", "or_expr", "and_expr", "equality_expr", "relational_expr", 
		"additive_expr", "multiplicative_expr", "power_expr", "unary_expr", "primary_expr", 
		"function_call", "observable_ref", "literal",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, "'begin'", "'end'", "'model'", 
		"'parameters'", "'compartments'", undefined, undefined, "'types'", "'seed'", 
		undefined, "'observables'", "'functions'", "'reaction'", undefined, "'rules'", 
		"'groups'", "'actions'", "'population'", "'maps'", "'energy'", "'patterns'", 
		"'MatchOnce'", "'DeleteMolecules'", "'MoveConnected'", "'include_reactants'", 
		"'include_products'", "'exclude_reactants'", "'exclude_products'", "'TotalRate'", 
		"'version'", "'setOption'", "'setModelName'", "'substanceUnits'", "'prefix'", 
		"'suffix'", "'generate_network'", "'overwrite'", "'max_agg'", "'max_iter'", 
		"'max_stoich'", "'print_iter'", "'check_iso'", "'generate_hybrid_model'", 
		"'safe'", "'execute'", "'simulate'", "'method'", "'ode'", "'ssa'", "'pla'", 
		"'nf'", "'verbose'", "'netfile'", "'argfile'", "'continue'", "'t_start'", 
		"'t_end'", "'n_steps'", "'n_output_steps'", "'max_sim_steps'", "'output_step_interval'", 
		"'sample_times'", "'save_progress'", "'print_CDAT'", "'print_functions'", 
		"'print_net'", "'print_end'", "'stop_if'", "'print_on_stop'", "'simulate_ode'", 
		"'atol'", "'rtol'", "'steady_state'", "'sparse'", "'simulate_ssa'", "'simulate_pla'", 
		"'pla_config'", "'pla_output'", "'simulate_nf'", "'param'", "'complex'", 
		"'get_final_state'", "'gml'", "'nocslf'", "'notf'", "'binary_output'", 
		"'utl'", "'equil'", "'parameter_scan'", "'bifurcate'", "'parameter'", 
		"'par_min'", "'par_max'", "'n_scan_pts'", "'log_scale'", "'reset_conc'", 
		"'readFile'", "'file'", "'atomize'", "'blocks'", "'skip_actions'", "'visualize'", 
		"'type'", "'background'", "'collapse'", "'opts'", "'writeSSC'", "'writeSSCcfg'", 
		"'format'", "'writeFile'", "'writeModel'", "'writeXML'", "'writeNetwork'", 
		"'writeSBML'", "'writeMDL'", "'include_model'", "'include_network'", "'pretty_formatting'", 
		"'evaluate_expressions'", "'TextReaction'", "'TextSpecies'", "'writeMfile'", 
		"'writeMexfile'", "'bdf'", "'max_step'", "'maxOrder'", "'stats'", "'max_num_steps'", 
		"'max_err_test_fails'", "'max_conv_fails'", "'stiff'", "'setConcentration'", 
		"'addConcentration'", "'saveConcentrations'", "'resetConcentrations'", 
		"'setParameter'", "'saveParameters'", "'resetParameters'", "'quit'", "'Sat'", 
		"'MM'", "'Hill'", "'Arrhenius'", "'if'", "'exp'", "'ln'", "'log10'", "'log2'", 
		"'sqrt'", "'rint'", "'abs'", "'sin'", "'cos'", "'tan'", "'asin'", "'acos'", 
		"'atan'", "'sinh'", "'cosh'", "'tanh'", "'asinh'", "'acosh'", "'atanh'", 
		"'_pi'", "'_e'", "'min'", "'max'", "'sum'", "'avg'", "'time'", undefined, 
		undefined, undefined, "';'", "':'", "'['", "']'", "'{'", "'}'", "','", 
		"'.'", "'('", "')'", "'->'", "'<->'", "'$'", "'~'", "'@'", "'>='", "'>'", 
		"'<='", "'<'", "'=>'", "'=='", "'='", "'/'", "'*'", "'-'", "'+'", "'^'", 
		"'%'", "'|'", "'?'", "'!'", "'\"'", "'&'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "LINE_COMMENT", "LB", "WS", "BEGIN", "END", "MODEL", "PARAMETERS", 
		"COMPARTMENTS", "MOLECULE", "MOLECULES", "TYPES", "SEED", "SPECIES", "OBSERVABLES", 
		"FUNCTIONS", "REACTION", "REACTIONS", "RULES", "GROUPS", "ACTIONS", "POPULATION", 
		"MAPS", "ENERGY", "PATTERNS", "MATCHONCE", "DELETEMOLECULES", "MOVECONNECTED", 
		"INCLUDE_REACTANTS", "INCLUDE_PRODUCTS", "EXCLUDE_REACTANTS", "EXCLUDE_PRODUCTS", 
		"TOTALRATE", "VERSION", "SET_OPTION", "SET_MODEL_NAME", "SUBSTANCEUNITS", 
		"PREFIX", "SUFFIX", "GENERATENETWORK", "OVERWRITE", "MAX_AGG", "MAX_ITER", 
		"MAX_STOICH", "PRINT_ITER", "CHECK_ISO", "GENERATEHYBRIDMODEL", "SAFE", 
		"EXECUTE", "SIMULATE", "METHOD", "ODE", "SSA", "PLA", "NF", "VERBOSE", 
		"NETFILE", "ARGFILE", "CONTINUE", "T_START", "T_END", "N_STEPS", "N_OUTPUT_STEPS", 
		"MAX_SIM_STEPS", "OUTPUT_STEP_INTERVAL", "SAMPLE_TIMES", "SAVE_PROGRESS", 
		"PRINT_CDAT", "PRINT_FUNCTIONS", "PRINT_NET", "PRINT_END", "STOP_IF", 
		"PRINT_ON_STOP", "SIMULATE_ODE", "ATOL", "RTOL", "STEADY_STATE", "SPARSE", 
		"SIMULATE_SSA", "SIMULATE_PLA", "PLA_CONFIG", "PLA_OUTPUT", "SIMULATE_NF", 
		"PARAM", "COMPLEX", "GET_FINAL_STATE", "GML", "NOCSLF", "NOTF", "BINARY_OUTPUT", 
		"UTL", "EQUIL", "PARAMETER_SCAN", "BIFURCATE", "PARAMETER", "PAR_MIN", 
		"PAR_MAX", "N_SCAN_PTS", "LOG_SCALE", "RESET_CONC", "READFILE", "FILE", 
		"ATOMIZE", "BLOCKS", "SKIPACTIONS", "VISUALIZE", "TYPE", "BACKGROUND", 
		"COLLAPSE", "OPTS", "WRITESSC", "WRITESSCCFG", "FORMAT", "WRITEFILE", 
		"WRITEMODEL", "WRITEXML", "WRITENETWORK", "WRITESBML", "WRITEMDL", "INCLUDE_MODEL", 
		"INCLUDE_NETWORK", "PRETTY_FORMATTING", "EVALUATE_EXPRESSIONS", "TEXTREACTION", 
		"TEXTSPECIES", "WRITEMFILE", "WRITEMEXFILE", "BDF", "MAX_STEP", "MAXORDER", 
		"STATS", "MAX_NUM_STEPS", "MAX_ERR_TEST_FAILS", "MAX_CONV_FAILS", "STIFF", 
		"SETCONCENTRATION", "ADDCONCENTRATION", "SAVECONCENTRATIONS", "RESETCONCENTRATIONS", 
		"SETPARAMETER", "SAVEPARAMETERS", "RESETPARAMETERS", "QUIT", "SAT", "MM", 
		"HILL", "ARRHENIUS", "IF", "EXP", "LN", "LOG10", "LOG2", "SQRT", "RINT", 
		"ABS", "SIN", "COS", "TAN", "ASIN", "ACOS", "ATAN", "SINH", "COSH", "TANH", 
		"ASINH", "ACOSH", "ATANH", "PI", "EULERIAN", "MIN", "MAX", "SUM", "AVG", 
		"TIME", "FLOAT", "INT", "STRING", "SEMI", "COLON", "LSBRACKET", "RSBRACKET", 
		"LBRACKET", "RBRACKET", "COMMA", "DOT", "LPAREN", "RPAREN", "UNI_REACTION_SIGN", 
		"BI_REACTION_SIGN", "DOLLAR", "TILDE", "AT", "GTE", "GT", "LTE", "LT", 
		"ASSIGNS", "EQUALS", "BECOMES", "DIV", "TIMES", "MINUS", "PLUS", "POWER", 
		"MOD", "PIPE", "QMARK", "EMARK", "DBQUOTES", "AMPERSAND", "VERSION_NUMBER", 
		"ULB",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(BNGParser._LITERAL_NAMES, BNGParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return BNGParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "BNGParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return BNGParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return BNGParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(BNGParser._ATN, this);
	}
	// @RuleVersion(0)
	public prog(): ProgContext {
		let _localctx: ProgContext = new ProgContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, BNGParser.RULE_prog);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 147;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 144;
				this.match(BNGParser.LB);
				}
				}
				this.state = 149;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 153;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (BNGParser.VERSION - 33)) | (1 << (BNGParser.SET_OPTION - 33)) | (1 << (BNGParser.SET_MODEL_NAME - 33)) | (1 << (BNGParser.SUBSTANCEUNITS - 33)))) !== 0)) {
				{
				{
				this.state = 150;
				this.header_block();
				}
				}
				this.state = 155;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 183;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				{
				{
				this.state = 156;
				this.match(BNGParser.BEGIN);
				this.state = 157;
				this.match(BNGParser.MODEL);
				this.state = 159;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 158;
					this.match(BNGParser.LB);
					}
					}
					this.state = 161;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				this.state = 166;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === BNGParser.BEGIN) {
					{
					{
					this.state = 163;
					this.program_block();
					}
					}
					this.state = 168;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 169;
				this.match(BNGParser.END);
				this.state = 170;
				this.match(BNGParser.MODEL);
				this.state = 174;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === BNGParser.LB) {
					{
					{
					this.state = 171;
					this.match(BNGParser.LB);
					}
					}
					this.state = 176;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				}
				break;

			case 2:
				{
				this.state = 180;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === BNGParser.BEGIN) {
					{
					{
					this.state = 177;
					this.program_block();
					}
					}
					this.state = 182;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			}
			this.state = 186;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & ((1 << (BNGParser.GENERATENETWORK - 39)) | (1 << (BNGParser.GENERATEHYBRIDMODEL - 39)) | (1 << (BNGParser.SIMULATE - 39)))) !== 0) || ((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & ((1 << (BNGParser.SIMULATE_ODE - 73)) | (1 << (BNGParser.SIMULATE_SSA - 73)) | (1 << (BNGParser.SIMULATE_PLA - 73)) | (1 << (BNGParser.SIMULATE_NF - 73)) | (1 << (BNGParser.PARAMETER_SCAN - 73)) | (1 << (BNGParser.BIFURCATE - 73)) | (1 << (BNGParser.READFILE - 73)))) !== 0) || ((((_la - 105)) & ~0x1F) === 0 && ((1 << (_la - 105)) & ((1 << (BNGParser.VISUALIZE - 105)) | (1 << (BNGParser.WRITEFILE - 105)) | (1 << (BNGParser.WRITEMODEL - 105)) | (1 << (BNGParser.WRITEXML - 105)) | (1 << (BNGParser.WRITENETWORK - 105)) | (1 << (BNGParser.WRITESBML - 105)) | (1 << (BNGParser.WRITEMFILE - 105)) | (1 << (BNGParser.WRITEMEXFILE - 105)) | (1 << (BNGParser.SETCONCENTRATION - 105)) | (1 << (BNGParser.ADDCONCENTRATION - 105)))) !== 0) || ((((_la - 137)) & ~0x1F) === 0 && ((1 << (_la - 137)) & ((1 << (BNGParser.SAVECONCENTRATIONS - 137)) | (1 << (BNGParser.RESETCONCENTRATIONS - 137)) | (1 << (BNGParser.SETPARAMETER - 137)) | (1 << (BNGParser.SAVEPARAMETERS - 137)) | (1 << (BNGParser.RESETPARAMETERS - 137)) | (1 << (BNGParser.QUIT - 137)))) !== 0)) {
				{
				this.state = 185;
				this.actions_block();
				}
			}

			this.state = 188;
			this.match(BNGParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public header_block(): Header_blockContext {
		let _localctx: Header_blockContext = new Header_blockContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, BNGParser.RULE_header_block);
		try {
			this.state = 194;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BNGParser.VERSION:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 190;
				this.version_def();
				}
				break;
			case BNGParser.SUBSTANCEUNITS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 191;
				this.substance_def();
				}
				break;
			case BNGParser.SET_OPTION:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 192;
				this.set_option();
				}
				break;
			case BNGParser.SET_MODEL_NAME:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 193;
				this.set_model_name();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public version_def(): Version_defContext {
		let _localctx: Version_defContext = new Version_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, BNGParser.RULE_version_def);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 196;
			this.match(BNGParser.VERSION);
			this.state = 197;
			this.match(BNGParser.LPAREN);
			this.state = 198;
			this.match(BNGParser.DBQUOTES);
			this.state = 199;
			this.match(BNGParser.VERSION_NUMBER);
			this.state = 201;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.STRING) {
				{
				this.state = 200;
				this.match(BNGParser.STRING);
				}
			}

			this.state = 203;
			this.match(BNGParser.DBQUOTES);
			this.state = 204;
			this.match(BNGParser.RPAREN);
			this.state = 206;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.SEMI) {
				{
				this.state = 205;
				this.match(BNGParser.SEMI);
				}
			}

			this.state = 209;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 208;
				this.match(BNGParser.LB);
				}
				}
				this.state = 211;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public substance_def(): Substance_defContext {
		let _localctx: Substance_defContext = new Substance_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, BNGParser.RULE_substance_def);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 213;
			this.match(BNGParser.SUBSTANCEUNITS);
			this.state = 214;
			this.match(BNGParser.LPAREN);
			this.state = 215;
			this.match(BNGParser.DBQUOTES);
			this.state = 216;
			this.match(BNGParser.STRING);
			this.state = 217;
			this.match(BNGParser.DBQUOTES);
			this.state = 218;
			this.match(BNGParser.RPAREN);
			this.state = 220;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.SEMI) {
				{
				this.state = 219;
				this.match(BNGParser.SEMI);
				}
			}

			this.state = 223;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 222;
				this.match(BNGParser.LB);
				}
				}
				this.state = 225;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public set_option(): Set_optionContext {
		let _localctx: Set_optionContext = new Set_optionContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, BNGParser.RULE_set_option);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 227;
			this.match(BNGParser.SET_OPTION);
			this.state = 228;
			this.match(BNGParser.LPAREN);
			this.state = 229;
			this.match(BNGParser.DBQUOTES);
			this.state = 230;
			this.match(BNGParser.STRING);
			this.state = 231;
			this.match(BNGParser.DBQUOTES);
			this.state = 232;
			this.match(BNGParser.COMMA);
			this.state = 238;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BNGParser.DBQUOTES:
				{
				this.state = 233;
				this.match(BNGParser.DBQUOTES);
				this.state = 234;
				this.match(BNGParser.STRING);
				this.state = 235;
				this.match(BNGParser.DBQUOTES);
				}
				break;
			case BNGParser.INT:
				{
				this.state = 236;
				this.match(BNGParser.INT);
				}
				break;
			case BNGParser.FLOAT:
				{
				this.state = 237;
				this.match(BNGParser.FLOAT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 254;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.COMMA) {
				{
				{
				this.state = 240;
				this.match(BNGParser.COMMA);
				this.state = 241;
				this.match(BNGParser.DBQUOTES);
				this.state = 242;
				this.match(BNGParser.STRING);
				this.state = 243;
				this.match(BNGParser.DBQUOTES);
				this.state = 244;
				this.match(BNGParser.COMMA);
				this.state = 250;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case BNGParser.DBQUOTES:
					{
					this.state = 245;
					this.match(BNGParser.DBQUOTES);
					this.state = 246;
					this.match(BNGParser.STRING);
					this.state = 247;
					this.match(BNGParser.DBQUOTES);
					}
					break;
				case BNGParser.INT:
					{
					this.state = 248;
					this.match(BNGParser.INT);
					}
					break;
				case BNGParser.FLOAT:
					{
					this.state = 249;
					this.match(BNGParser.FLOAT);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 256;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 257;
			this.match(BNGParser.RPAREN);
			this.state = 259;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.SEMI) {
				{
				this.state = 258;
				this.match(BNGParser.SEMI);
				}
			}

			this.state = 262;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 261;
				this.match(BNGParser.LB);
				}
				}
				this.state = 264;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public set_model_name(): Set_model_nameContext {
		let _localctx: Set_model_nameContext = new Set_model_nameContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, BNGParser.RULE_set_model_name);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 266;
			this.match(BNGParser.SET_MODEL_NAME);
			this.state = 267;
			this.match(BNGParser.LPAREN);
			this.state = 268;
			this.match(BNGParser.DBQUOTES);
			this.state = 269;
			this.match(BNGParser.STRING);
			this.state = 270;
			this.match(BNGParser.DBQUOTES);
			this.state = 271;
			this.match(BNGParser.RPAREN);
			this.state = 273;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.SEMI) {
				{
				this.state = 272;
				this.match(BNGParser.SEMI);
				}
			}

			this.state = 276;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 275;
				this.match(BNGParser.LB);
				}
				}
				this.state = 278;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public program_block(): Program_blockContext {
		let _localctx: Program_blockContext = new Program_blockContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, BNGParser.RULE_program_block);
		try {
			this.state = 289;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 21, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 280;
				this.parameters_block();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 281;
				this.molecule_types_block();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 282;
				this.seed_species_block();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 283;
				this.observables_block();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 284;
				this.reaction_rules_block();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 285;
				this.functions_block();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 286;
				this.compartments_block();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 287;
				this.energy_patterns_block();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 288;
				this.population_maps_block();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parameters_block(): Parameters_blockContext {
		let _localctx: Parameters_blockContext = new Parameters_blockContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, BNGParser.RULE_parameters_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 291;
			this.match(BNGParser.BEGIN);
			this.state = 292;
			this.match(BNGParser.PARAMETERS);
			this.state = 294;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 293;
				this.match(BNGParser.LB);
				}
				}
				this.state = 296;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 306;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.STRING) {
				{
				{
				this.state = 298;
				this.parameter_def();
				this.state = 300;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 299;
					this.match(BNGParser.LB);
					}
					}
					this.state = 302;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				}
				}
				this.state = 308;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 309;
			this.match(BNGParser.END);
			this.state = 310;
			this.match(BNGParser.PARAMETERS);
			this.state = 314;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 311;
				this.match(BNGParser.LB);
				}
				}
				this.state = 316;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parameter_def(): Parameter_defContext {
		let _localctx: Parameter_defContext = new Parameter_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, BNGParser.RULE_parameter_def);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 319;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 26, this._ctx) ) {
			case 1:
				{
				this.state = 317;
				this.match(BNGParser.STRING);
				this.state = 318;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 321;
			this.match(BNGParser.STRING);
			this.state = 323;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 143)) & ~0x1F) === 0 && ((1 << (_la - 143)) & ((1 << (BNGParser.SAT - 143)) | (1 << (BNGParser.MM - 143)) | (1 << (BNGParser.HILL - 143)) | (1 << (BNGParser.ARRHENIUS - 143)) | (1 << (BNGParser.IF - 143)) | (1 << (BNGParser.EXP - 143)) | (1 << (BNGParser.LN - 143)) | (1 << (BNGParser.LOG10 - 143)) | (1 << (BNGParser.LOG2 - 143)) | (1 << (BNGParser.SQRT - 143)) | (1 << (BNGParser.RINT - 143)) | (1 << (BNGParser.ABS - 143)) | (1 << (BNGParser.SIN - 143)) | (1 << (BNGParser.COS - 143)) | (1 << (BNGParser.TAN - 143)) | (1 << (BNGParser.ASIN - 143)) | (1 << (BNGParser.ACOS - 143)) | (1 << (BNGParser.ATAN - 143)) | (1 << (BNGParser.SINH - 143)) | (1 << (BNGParser.COSH - 143)) | (1 << (BNGParser.TANH - 143)) | (1 << (BNGParser.ASINH - 143)) | (1 << (BNGParser.ACOSH - 143)) | (1 << (BNGParser.ATANH - 143)) | (1 << (BNGParser.PI - 143)) | (1 << (BNGParser.EULERIAN - 143)) | (1 << (BNGParser.MIN - 143)) | (1 << (BNGParser.MAX - 143)) | (1 << (BNGParser.SUM - 143)) | (1 << (BNGParser.AVG - 143)) | (1 << (BNGParser.TIME - 143)) | (1 << (BNGParser.FLOAT - 143)))) !== 0) || ((((_la - 175)) & ~0x1F) === 0 && ((1 << (_la - 175)) & ((1 << (BNGParser.INT - 175)) | (1 << (BNGParser.STRING - 175)) | (1 << (BNGParser.LPAREN - 175)) | (1 << (BNGParser.MINUS - 175)) | (1 << (BNGParser.PLUS - 175)))) !== 0)) {
				{
				this.state = 322;
				this.expression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public molecule_types_block(): Molecule_types_blockContext {
		let _localctx: Molecule_types_blockContext = new Molecule_types_blockContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, BNGParser.RULE_molecule_types_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 325;
			this.match(BNGParser.BEGIN);
			this.state = 326;
			this.match(BNGParser.MOLECULE);
			this.state = 327;
			this.match(BNGParser.TYPES);
			this.state = 329;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 328;
				this.match(BNGParser.LB);
				}
				}
				this.state = 331;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 341;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.STRING) {
				{
				{
				this.state = 333;
				this.molecule_type_def();
				this.state = 335;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 334;
					this.match(BNGParser.LB);
					}
					}
					this.state = 337;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				}
				}
				this.state = 343;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 344;
			this.match(BNGParser.END);
			this.state = 345;
			this.match(BNGParser.MOLECULE);
			this.state = 346;
			this.match(BNGParser.TYPES);
			this.state = 350;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 347;
				this.match(BNGParser.LB);
				}
				}
				this.state = 352;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public molecule_type_def(): Molecule_type_defContext {
		let _localctx: Molecule_type_defContext = new Molecule_type_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, BNGParser.RULE_molecule_type_def);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 355;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 32, this._ctx) ) {
			case 1:
				{
				this.state = 353;
				this.match(BNGParser.STRING);
				this.state = 354;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 357;
			this.molecule_def();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public molecule_def(): Molecule_defContext {
		let _localctx: Molecule_defContext = new Molecule_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, BNGParser.RULE_molecule_def);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 359;
			this.match(BNGParser.STRING);
			this.state = 360;
			this.match(BNGParser.LPAREN);
			this.state = 362;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.STRING) {
				{
				this.state = 361;
				this.component_def_list();
				}
			}

			this.state = 364;
			this.match(BNGParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public component_def_list(): Component_def_listContext {
		let _localctx: Component_def_listContext = new Component_def_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, BNGParser.RULE_component_def_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 366;
			this.component_def();
			this.state = 371;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.COMMA) {
				{
				{
				this.state = 367;
				this.match(BNGParser.COMMA);
				this.state = 368;
				this.component_def();
				}
				}
				this.state = 373;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public component_def(): Component_defContext {
		let _localctx: Component_defContext = new Component_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, BNGParser.RULE_component_def);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 374;
			this.match(BNGParser.STRING);
			this.state = 377;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.TILDE) {
				{
				this.state = 375;
				this.match(BNGParser.TILDE);
				this.state = 376;
				this.state_list();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public state_list(): State_listContext {
		let _localctx: State_listContext = new State_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, BNGParser.RULE_state_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 379;
			this.match(BNGParser.STRING);
			this.state = 384;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.TILDE) {
				{
				{
				this.state = 380;
				this.match(BNGParser.TILDE);
				this.state = 381;
				this.match(BNGParser.STRING);
				}
				}
				this.state = 386;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public seed_species_block(): Seed_species_blockContext {
		let _localctx: Seed_species_blockContext = new Seed_species_blockContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, BNGParser.RULE_seed_species_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 387;
			this.match(BNGParser.BEGIN);
			this.state = 391;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BNGParser.SEED:
				{
				this.state = 388;
				this.match(BNGParser.SEED);
				this.state = 389;
				this.match(BNGParser.SPECIES);
				}
				break;
			case BNGParser.SPECIES:
				{
				this.state = 390;
				this.match(BNGParser.SPECIES);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 394;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 393;
				this.match(BNGParser.LB);
				}
				}
				this.state = 396;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 406;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.STRING || _la === BNGParser.DOLLAR) {
				{
				{
				this.state = 398;
				this.seed_species_def();
				this.state = 400;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 399;
					this.match(BNGParser.LB);
					}
					}
					this.state = 402;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				}
				}
				this.state = 408;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 409;
			this.match(BNGParser.END);
			this.state = 413;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BNGParser.SEED:
				{
				this.state = 410;
				this.match(BNGParser.SEED);
				this.state = 411;
				this.match(BNGParser.SPECIES);
				}
				break;
			case BNGParser.SPECIES:
				{
				this.state = 412;
				this.match(BNGParser.SPECIES);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 418;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 415;
				this.match(BNGParser.LB);
				}
				}
				this.state = 420;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public seed_species_def(): Seed_species_defContext {
		let _localctx: Seed_species_defContext = new Seed_species_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, BNGParser.RULE_seed_species_def);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 423;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 43, this._ctx) ) {
			case 1:
				{
				this.state = 421;
				this.match(BNGParser.STRING);
				this.state = 422;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 426;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.DOLLAR) {
				{
				this.state = 425;
				this.match(BNGParser.DOLLAR);
				}
			}

			this.state = 428;
			this.species_def();
			this.state = 429;
			this.expression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public species_def(): Species_defContext {
		let _localctx: Species_defContext = new Species_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, BNGParser.RULE_species_def);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 431;
			this.molecule_pattern();
			this.state = 436;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.DOT) {
				{
				{
				this.state = 432;
				this.match(BNGParser.DOT);
				this.state = 433;
				this.molecule_pattern();
				}
				}
				this.state = 438;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 441;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.AT) {
				{
				this.state = 439;
				this.match(BNGParser.AT);
				this.state = 440;
				this.match(BNGParser.STRING);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public molecule_pattern(): Molecule_patternContext {
		let _localctx: Molecule_patternContext = new Molecule_patternContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, BNGParser.RULE_molecule_pattern);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 443;
			this.match(BNGParser.STRING);
			this.state = 444;
			this.match(BNGParser.LPAREN);
			this.state = 446;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.STRING) {
				{
				this.state = 445;
				this.component_pattern_list();
				}
			}

			this.state = 448;
			this.match(BNGParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public component_pattern_list(): Component_pattern_listContext {
		let _localctx: Component_pattern_listContext = new Component_pattern_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, BNGParser.RULE_component_pattern_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 450;
			this.component_pattern();
			this.state = 455;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.COMMA) {
				{
				{
				this.state = 451;
				this.match(BNGParser.COMMA);
				this.state = 452;
				this.component_pattern();
				}
				}
				this.state = 457;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public component_pattern(): Component_patternContext {
		let _localctx: Component_patternContext = new Component_patternContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, BNGParser.RULE_component_pattern);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 458;
			this.match(BNGParser.STRING);
			this.state = 461;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.TILDE) {
				{
				this.state = 459;
				this.match(BNGParser.TILDE);
				this.state = 460;
				this.state_value();
				}
			}

			this.state = 464;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.EMARK) {
				{
				this.state = 463;
				this.bond_spec();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public state_value(): State_valueContext {
		let _localctx: State_valueContext = new State_valueContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, BNGParser.RULE_state_value);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 466;
			_la = this._input.LA(1);
			if (!(_la === BNGParser.STRING || _la === BNGParser.QMARK)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public bond_spec(): Bond_specContext {
		let _localctx: Bond_specContext = new Bond_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, BNGParser.RULE_bond_spec);
		try {
			this.state = 474;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 51, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 468;
				this.match(BNGParser.EMARK);
				this.state = 469;
				this.bond_id();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 470;
				this.match(BNGParser.EMARK);
				this.state = 471;
				this.match(BNGParser.PLUS);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 472;
				this.match(BNGParser.EMARK);
				this.state = 473;
				this.match(BNGParser.QMARK);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public bond_id(): Bond_idContext {
		let _localctx: Bond_idContext = new Bond_idContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, BNGParser.RULE_bond_id);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 476;
			_la = this._input.LA(1);
			if (!(_la === BNGParser.INT || _la === BNGParser.STRING)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public observables_block(): Observables_blockContext {
		let _localctx: Observables_blockContext = new Observables_blockContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, BNGParser.RULE_observables_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 478;
			this.match(BNGParser.BEGIN);
			this.state = 479;
			this.match(BNGParser.OBSERVABLES);
			this.state = 481;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 480;
				this.match(BNGParser.LB);
				}
				}
				this.state = 483;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 493;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.MOLECULES || _la === BNGParser.SPECIES || _la === BNGParser.STRING) {
				{
				{
				this.state = 485;
				this.observable_def();
				this.state = 487;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 486;
					this.match(BNGParser.LB);
					}
					}
					this.state = 489;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				}
				}
				this.state = 495;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 496;
			this.match(BNGParser.END);
			this.state = 497;
			this.match(BNGParser.OBSERVABLES);
			this.state = 501;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 498;
				this.match(BNGParser.LB);
				}
				}
				this.state = 503;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public observable_def(): Observable_defContext {
		let _localctx: Observable_defContext = new Observable_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, BNGParser.RULE_observable_def);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 506;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 56, this._ctx) ) {
			case 1:
				{
				this.state = 504;
				this.match(BNGParser.STRING);
				this.state = 505;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 508;
			this.observable_type();
			this.state = 509;
			this.match(BNGParser.STRING);
			this.state = 510;
			this.observable_pattern_list();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public observable_type(): Observable_typeContext {
		let _localctx: Observable_typeContext = new Observable_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, BNGParser.RULE_observable_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 512;
			_la = this._input.LA(1);
			if (!(_la === BNGParser.MOLECULES || _la === BNGParser.SPECIES || _la === BNGParser.STRING)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public observable_pattern_list(): Observable_pattern_listContext {
		let _localctx: Observable_pattern_listContext = new Observable_pattern_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, BNGParser.RULE_observable_pattern_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 514;
			this.species_def();
			this.state = 519;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.COMMA) {
				{
				{
				this.state = 515;
				this.match(BNGParser.COMMA);
				this.state = 516;
				this.species_def();
				}
				}
				this.state = 521;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public reaction_rules_block(): Reaction_rules_blockContext {
		let _localctx: Reaction_rules_blockContext = new Reaction_rules_blockContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, BNGParser.RULE_reaction_rules_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 522;
			this.match(BNGParser.BEGIN);
			this.state = 523;
			this.match(BNGParser.REACTION);
			this.state = 524;
			this.match(BNGParser.RULES);
			this.state = 526;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 525;
				this.match(BNGParser.LB);
				}
				}
				this.state = 528;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 538;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.INT || _la === BNGParser.STRING) {
				{
				{
				this.state = 530;
				this.reaction_rule_def();
				this.state = 532;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 531;
					this.match(BNGParser.LB);
					}
					}
					this.state = 534;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				}
				}
				this.state = 540;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 541;
			this.match(BNGParser.END);
			this.state = 542;
			this.match(BNGParser.REACTION);
			this.state = 543;
			this.match(BNGParser.RULES);
			this.state = 547;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 544;
				this.match(BNGParser.LB);
				}
				}
				this.state = 549;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public reaction_rule_def(): Reaction_rule_defContext {
		let _localctx: Reaction_rule_defContext = new Reaction_rule_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, BNGParser.RULE_reaction_rule_def);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 553;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 62, this._ctx) ) {
			case 1:
				{
				this.state = 550;
				this.label_def();
				this.state = 551;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 555;
			this.reactant_patterns();
			this.state = 556;
			this.reaction_sign();
			this.state = 557;
			this.product_patterns();
			this.state = 558;
			this.rate_law();
			this.state = 560;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 25)) & ~0x1F) === 0 && ((1 << (_la - 25)) & ((1 << (BNGParser.MATCHONCE - 25)) | (1 << (BNGParser.DELETEMOLECULES - 25)) | (1 << (BNGParser.MOVECONNECTED - 25)) | (1 << (BNGParser.INCLUDE_REACTANTS - 25)) | (1 << (BNGParser.INCLUDE_PRODUCTS - 25)) | (1 << (BNGParser.EXCLUDE_REACTANTS - 25)) | (1 << (BNGParser.EXCLUDE_PRODUCTS - 25)) | (1 << (BNGParser.TOTALRATE - 25)))) !== 0)) {
				{
				this.state = 559;
				this.rule_modifiers();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public label_def(): Label_defContext {
		let _localctx: Label_defContext = new Label_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, BNGParser.RULE_label_def);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 562;
			_la = this._input.LA(1);
			if (!(_la === BNGParser.INT || _la === BNGParser.STRING)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public reactant_patterns(): Reactant_patternsContext {
		let _localctx: Reactant_patternsContext = new Reactant_patternsContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, BNGParser.RULE_reactant_patterns);
		let _la: number;
		try {
			this.state = 573;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BNGParser.STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 564;
				this.species_def();
				this.state = 569;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === BNGParser.PLUS) {
					{
					{
					this.state = 565;
					this.match(BNGParser.PLUS);
					this.state = 566;
					this.species_def();
					}
					}
					this.state = 571;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case BNGParser.INT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 572;
				this.match(BNGParser.INT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public product_patterns(): Product_patternsContext {
		let _localctx: Product_patternsContext = new Product_patternsContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, BNGParser.RULE_product_patterns);
		try {
			let _alt: number;
			this.state = 584;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BNGParser.STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 575;
				this.species_def();
				this.state = 580;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 66, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 576;
						this.match(BNGParser.PLUS);
						this.state = 577;
						this.species_def();
						}
						}
					}
					this.state = 582;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 66, this._ctx);
				}
				}
				break;
			case BNGParser.INT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 583;
				this.match(BNGParser.INT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public reaction_sign(): Reaction_signContext {
		let _localctx: Reaction_signContext = new Reaction_signContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, BNGParser.RULE_reaction_sign);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 586;
			_la = this._input.LA(1);
			if (!(_la === BNGParser.UNI_REACTION_SIGN || _la === BNGParser.BI_REACTION_SIGN)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public rate_law(): Rate_lawContext {
		let _localctx: Rate_lawContext = new Rate_lawContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, BNGParser.RULE_rate_law);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 588;
			this.expression();
			this.state = 591;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.COMMA) {
				{
				this.state = 589;
				this.match(BNGParser.COMMA);
				this.state = 590;
				this.expression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public rule_modifiers(): Rule_modifiersContext {
		let _localctx: Rule_modifiersContext = new Rule_modifiersContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, BNGParser.RULE_rule_modifiers);
		try {
			this.state = 625;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BNGParser.DELETEMOLECULES:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 593;
				this.match(BNGParser.DELETEMOLECULES);
				}
				break;
			case BNGParser.MOVECONNECTED:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 594;
				this.match(BNGParser.MOVECONNECTED);
				}
				break;
			case BNGParser.MATCHONCE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 595;
				this.match(BNGParser.MATCHONCE);
				}
				break;
			case BNGParser.TOTALRATE:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 596;
				this.match(BNGParser.TOTALRATE);
				}
				break;
			case BNGParser.INCLUDE_REACTANTS:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 597;
				this.match(BNGParser.INCLUDE_REACTANTS);
				this.state = 598;
				this.match(BNGParser.LPAREN);
				this.state = 599;
				this.match(BNGParser.INT);
				this.state = 600;
				this.match(BNGParser.COMMA);
				this.state = 601;
				this.pattern_list();
				this.state = 602;
				this.match(BNGParser.RPAREN);
				}
				break;
			case BNGParser.EXCLUDE_REACTANTS:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 604;
				this.match(BNGParser.EXCLUDE_REACTANTS);
				this.state = 605;
				this.match(BNGParser.LPAREN);
				this.state = 606;
				this.match(BNGParser.INT);
				this.state = 607;
				this.match(BNGParser.COMMA);
				this.state = 608;
				this.pattern_list();
				this.state = 609;
				this.match(BNGParser.RPAREN);
				}
				break;
			case BNGParser.INCLUDE_PRODUCTS:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 611;
				this.match(BNGParser.INCLUDE_PRODUCTS);
				this.state = 612;
				this.match(BNGParser.LPAREN);
				this.state = 613;
				this.match(BNGParser.INT);
				this.state = 614;
				this.match(BNGParser.COMMA);
				this.state = 615;
				this.pattern_list();
				this.state = 616;
				this.match(BNGParser.RPAREN);
				}
				break;
			case BNGParser.EXCLUDE_PRODUCTS:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 618;
				this.match(BNGParser.EXCLUDE_PRODUCTS);
				this.state = 619;
				this.match(BNGParser.LPAREN);
				this.state = 620;
				this.match(BNGParser.INT);
				this.state = 621;
				this.match(BNGParser.COMMA);
				this.state = 622;
				this.pattern_list();
				this.state = 623;
				this.match(BNGParser.RPAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public pattern_list(): Pattern_listContext {
		let _localctx: Pattern_listContext = new Pattern_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, BNGParser.RULE_pattern_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 627;
			this.species_def();
			this.state = 632;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.COMMA) {
				{
				{
				this.state = 628;
				this.match(BNGParser.COMMA);
				this.state = 629;
				this.species_def();
				}
				}
				this.state = 634;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functions_block(): Functions_blockContext {
		let _localctx: Functions_blockContext = new Functions_blockContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, BNGParser.RULE_functions_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 635;
			this.match(BNGParser.BEGIN);
			this.state = 636;
			this.match(BNGParser.FUNCTIONS);
			this.state = 638;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 637;
				this.match(BNGParser.LB);
				}
				}
				this.state = 640;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 650;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.STRING) {
				{
				{
				this.state = 642;
				this.function_def();
				this.state = 644;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 643;
					this.match(BNGParser.LB);
					}
					}
					this.state = 646;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				}
				}
				this.state = 652;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 653;
			this.match(BNGParser.END);
			this.state = 654;
			this.match(BNGParser.FUNCTIONS);
			this.state = 658;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 655;
				this.match(BNGParser.LB);
				}
				}
				this.state = 660;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_def(): Function_defContext {
		let _localctx: Function_defContext = new Function_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, BNGParser.RULE_function_def);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 663;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 75, this._ctx) ) {
			case 1:
				{
				this.state = 661;
				this.match(BNGParser.STRING);
				this.state = 662;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 665;
			this.match(BNGParser.STRING);
			this.state = 666;
			this.match(BNGParser.LPAREN);
			this.state = 668;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.STRING) {
				{
				this.state = 667;
				this.param_list();
				}
			}

			this.state = 670;
			this.match(BNGParser.RPAREN);
			this.state = 672;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.BECOMES) {
				{
				this.state = 671;
				this.match(BNGParser.BECOMES);
				}
			}

			this.state = 674;
			this.expression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public param_list(): Param_listContext {
		let _localctx: Param_listContext = new Param_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, BNGParser.RULE_param_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 676;
			this.match(BNGParser.STRING);
			this.state = 681;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.COMMA) {
				{
				{
				this.state = 677;
				this.match(BNGParser.COMMA);
				this.state = 678;
				this.match(BNGParser.STRING);
				}
				}
				this.state = 683;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public compartments_block(): Compartments_blockContext {
		let _localctx: Compartments_blockContext = new Compartments_blockContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, BNGParser.RULE_compartments_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 684;
			this.match(BNGParser.BEGIN);
			this.state = 685;
			this.match(BNGParser.COMPARTMENTS);
			this.state = 687;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 686;
				this.match(BNGParser.LB);
				}
				}
				this.state = 689;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 699;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.STRING) {
				{
				{
				this.state = 691;
				this.compartment_def();
				this.state = 693;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 692;
					this.match(BNGParser.LB);
					}
					}
					this.state = 695;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				}
				}
				this.state = 701;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 702;
			this.match(BNGParser.END);
			this.state = 703;
			this.match(BNGParser.COMPARTMENTS);
			this.state = 707;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 704;
				this.match(BNGParser.LB);
				}
				}
				this.state = 709;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public compartment_def(): Compartment_defContext {
		let _localctx: Compartment_defContext = new Compartment_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, BNGParser.RULE_compartment_def);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 712;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 83, this._ctx) ) {
			case 1:
				{
				this.state = 710;
				this.match(BNGParser.STRING);
				this.state = 711;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 714;
			this.match(BNGParser.STRING);
			this.state = 715;
			this.match(BNGParser.INT);
			this.state = 716;
			this.expression();
			this.state = 718;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.STRING) {
				{
				this.state = 717;
				this.match(BNGParser.STRING);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public energy_patterns_block(): Energy_patterns_blockContext {
		let _localctx: Energy_patterns_blockContext = new Energy_patterns_blockContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, BNGParser.RULE_energy_patterns_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 720;
			this.match(BNGParser.BEGIN);
			this.state = 721;
			this.match(BNGParser.ENERGY);
			this.state = 722;
			this.match(BNGParser.PATTERNS);
			this.state = 724;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 723;
				this.match(BNGParser.LB);
				}
				}
				this.state = 726;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 736;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.STRING) {
				{
				{
				this.state = 728;
				this.energy_pattern_def();
				this.state = 730;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 729;
					this.match(BNGParser.LB);
					}
					}
					this.state = 732;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				}
				}
				this.state = 738;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 739;
			this.match(BNGParser.END);
			this.state = 740;
			this.match(BNGParser.ENERGY);
			this.state = 741;
			this.match(BNGParser.PATTERNS);
			this.state = 745;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 742;
				this.match(BNGParser.LB);
				}
				}
				this.state = 747;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public energy_pattern_def(): Energy_pattern_defContext {
		let _localctx: Energy_pattern_defContext = new Energy_pattern_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, BNGParser.RULE_energy_pattern_def);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 750;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 89, this._ctx) ) {
			case 1:
				{
				this.state = 748;
				this.match(BNGParser.STRING);
				this.state = 749;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 752;
			this.species_def();
			this.state = 753;
			this.expression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public population_maps_block(): Population_maps_blockContext {
		let _localctx: Population_maps_blockContext = new Population_maps_blockContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, BNGParser.RULE_population_maps_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 755;
			this.match(BNGParser.BEGIN);
			this.state = 756;
			this.match(BNGParser.POPULATION);
			this.state = 757;
			this.match(BNGParser.MAPS);
			this.state = 759;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 758;
				this.match(BNGParser.LB);
				}
				}
				this.state = 761;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 771;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.STRING) {
				{
				{
				this.state = 763;
				this.population_map_def();
				this.state = 765;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 764;
					this.match(BNGParser.LB);
					}
					}
					this.state = 767;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				}
				}
				this.state = 773;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 774;
			this.match(BNGParser.END);
			this.state = 775;
			this.match(BNGParser.POPULATION);
			this.state = 776;
			this.match(BNGParser.MAPS);
			this.state = 780;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 777;
				this.match(BNGParser.LB);
				}
				}
				this.state = 782;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public population_map_def(): Population_map_defContext {
		let _localctx: Population_map_defContext = new Population_map_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, BNGParser.RULE_population_map_def);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 785;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 94, this._ctx) ) {
			case 1:
				{
				this.state = 783;
				this.match(BNGParser.STRING);
				this.state = 784;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 787;
			this.species_def();
			this.state = 788;
			this.match(BNGParser.UNI_REACTION_SIGN);
			this.state = 789;
			this.match(BNGParser.STRING);
			this.state = 790;
			this.match(BNGParser.LPAREN);
			this.state = 792;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.STRING) {
				{
				this.state = 791;
				this.param_list();
				}
			}

			this.state = 794;
			this.match(BNGParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public actions_block(): Actions_blockContext {
		let _localctx: Actions_blockContext = new Actions_blockContext(this._ctx, this.state);
		this.enterRule(_localctx, 92, BNGParser.RULE_actions_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 797;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 796;
				this.action_command();
				}
				}
				this.state = 799;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & ((1 << (BNGParser.GENERATENETWORK - 39)) | (1 << (BNGParser.GENERATEHYBRIDMODEL - 39)) | (1 << (BNGParser.SIMULATE - 39)))) !== 0) || ((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & ((1 << (BNGParser.SIMULATE_ODE - 73)) | (1 << (BNGParser.SIMULATE_SSA - 73)) | (1 << (BNGParser.SIMULATE_PLA - 73)) | (1 << (BNGParser.SIMULATE_NF - 73)) | (1 << (BNGParser.PARAMETER_SCAN - 73)) | (1 << (BNGParser.BIFURCATE - 73)) | (1 << (BNGParser.READFILE - 73)))) !== 0) || ((((_la - 105)) & ~0x1F) === 0 && ((1 << (_la - 105)) & ((1 << (BNGParser.VISUALIZE - 105)) | (1 << (BNGParser.WRITEFILE - 105)) | (1 << (BNGParser.WRITEMODEL - 105)) | (1 << (BNGParser.WRITEXML - 105)) | (1 << (BNGParser.WRITENETWORK - 105)) | (1 << (BNGParser.WRITESBML - 105)) | (1 << (BNGParser.WRITEMFILE - 105)) | (1 << (BNGParser.WRITEMEXFILE - 105)) | (1 << (BNGParser.SETCONCENTRATION - 105)) | (1 << (BNGParser.ADDCONCENTRATION - 105)))) !== 0) || ((((_la - 137)) & ~0x1F) === 0 && ((1 << (_la - 137)) & ((1 << (BNGParser.SAVECONCENTRATIONS - 137)) | (1 << (BNGParser.RESETCONCENTRATIONS - 137)) | (1 << (BNGParser.SETPARAMETER - 137)) | (1 << (BNGParser.SAVEPARAMETERS - 137)) | (1 << (BNGParser.RESETPARAMETERS - 137)) | (1 << (BNGParser.QUIT - 137)))) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public action_command(): Action_commandContext {
		let _localctx: Action_commandContext = new Action_commandContext(this._ctx, this.state);
		this.enterRule(_localctx, 94, BNGParser.RULE_action_command);
		try {
			this.state = 806;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BNGParser.GENERATENETWORK:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 801;
				this.generate_network_cmd();
				}
				break;
			case BNGParser.SIMULATE:
			case BNGParser.SIMULATE_ODE:
			case BNGParser.SIMULATE_SSA:
			case BNGParser.SIMULATE_PLA:
			case BNGParser.SIMULATE_NF:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 802;
				this.simulate_cmd();
				}
				break;
			case BNGParser.WRITEFILE:
			case BNGParser.WRITEMODEL:
			case BNGParser.WRITEXML:
			case BNGParser.WRITENETWORK:
			case BNGParser.WRITESBML:
			case BNGParser.WRITEMFILE:
			case BNGParser.WRITEMEXFILE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 803;
				this.write_cmd();
				}
				break;
			case BNGParser.SETCONCENTRATION:
			case BNGParser.ADDCONCENTRATION:
			case BNGParser.SETPARAMETER:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 804;
				this.set_cmd();
				}
				break;
			case BNGParser.GENERATEHYBRIDMODEL:
			case BNGParser.PARAMETER_SCAN:
			case BNGParser.BIFURCATE:
			case BNGParser.READFILE:
			case BNGParser.VISUALIZE:
			case BNGParser.SAVECONCENTRATIONS:
			case BNGParser.RESETCONCENTRATIONS:
			case BNGParser.SAVEPARAMETERS:
			case BNGParser.RESETPARAMETERS:
			case BNGParser.QUIT:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 805;
				this.other_action_cmd();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public generate_network_cmd(): Generate_network_cmdContext {
		let _localctx: Generate_network_cmdContext = new Generate_network_cmdContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, BNGParser.RULE_generate_network_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 808;
			this.match(BNGParser.GENERATENETWORK);
			this.state = 809;
			this.match(BNGParser.LPAREN);
			this.state = 811;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.LBRACKET) {
				{
				this.state = 810;
				this.action_args();
				}
			}

			this.state = 813;
			this.match(BNGParser.RPAREN);
			this.state = 815;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.SEMI) {
				{
				this.state = 814;
				this.match(BNGParser.SEMI);
				}
			}

			this.state = 820;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 817;
				this.match(BNGParser.LB);
				}
				}
				this.state = 822;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simulate_cmd(): Simulate_cmdContext {
		let _localctx: Simulate_cmdContext = new Simulate_cmdContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, BNGParser.RULE_simulate_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 823;
			_la = this._input.LA(1);
			if (!(((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & ((1 << (BNGParser.SIMULATE - 49)) | (1 << (BNGParser.SIMULATE_ODE - 49)) | (1 << (BNGParser.SIMULATE_SSA - 49)) | (1 << (BNGParser.SIMULATE_PLA - 49)))) !== 0) || _la === BNGParser.SIMULATE_NF)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 824;
			this.match(BNGParser.LPAREN);
			this.state = 826;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.LBRACKET) {
				{
				this.state = 825;
				this.action_args();
				}
			}

			this.state = 828;
			this.match(BNGParser.RPAREN);
			this.state = 830;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.SEMI) {
				{
				this.state = 829;
				this.match(BNGParser.SEMI);
				}
			}

			this.state = 835;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 832;
				this.match(BNGParser.LB);
				}
				}
				this.state = 837;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public write_cmd(): Write_cmdContext {
		let _localctx: Write_cmdContext = new Write_cmdContext(this._ctx, this.state);
		this.enterRule(_localctx, 100, BNGParser.RULE_write_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 838;
			_la = this._input.LA(1);
			if (!(((((_la - 113)) & ~0x1F) === 0 && ((1 << (_la - 113)) & ((1 << (BNGParser.WRITEFILE - 113)) | (1 << (BNGParser.WRITEMODEL - 113)) | (1 << (BNGParser.WRITEXML - 113)) | (1 << (BNGParser.WRITENETWORK - 113)) | (1 << (BNGParser.WRITESBML - 113)) | (1 << (BNGParser.WRITEMFILE - 113)) | (1 << (BNGParser.WRITEMEXFILE - 113)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 839;
			this.match(BNGParser.LPAREN);
			this.state = 841;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.LBRACKET) {
				{
				this.state = 840;
				this.action_args();
				}
			}

			this.state = 843;
			this.match(BNGParser.RPAREN);
			this.state = 845;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.SEMI) {
				{
				this.state = 844;
				this.match(BNGParser.SEMI);
				}
			}

			this.state = 850;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 847;
				this.match(BNGParser.LB);
				}
				}
				this.state = 852;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public set_cmd(): Set_cmdContext {
		let _localctx: Set_cmdContext = new Set_cmdContext(this._ctx, this.state);
		this.enterRule(_localctx, 102, BNGParser.RULE_set_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 853;
			_la = this._input.LA(1);
			if (!(((((_la - 135)) & ~0x1F) === 0 && ((1 << (_la - 135)) & ((1 << (BNGParser.SETCONCENTRATION - 135)) | (1 << (BNGParser.ADDCONCENTRATION - 135)) | (1 << (BNGParser.SETPARAMETER - 135)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 854;
			this.match(BNGParser.LPAREN);
			this.state = 855;
			this.match(BNGParser.DBQUOTES);
			this.state = 856;
			this.species_def();
			this.state = 857;
			this.match(BNGParser.DBQUOTES);
			this.state = 858;
			this.match(BNGParser.COMMA);
			this.state = 859;
			this.expression();
			this.state = 860;
			this.match(BNGParser.RPAREN);
			this.state = 862;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.SEMI) {
				{
				this.state = 861;
				this.match(BNGParser.SEMI);
				}
			}

			this.state = 867;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 864;
				this.match(BNGParser.LB);
				}
				}
				this.state = 869;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public other_action_cmd(): Other_action_cmdContext {
		let _localctx: Other_action_cmdContext = new Other_action_cmdContext(this._ctx, this.state);
		this.enterRule(_localctx, 104, BNGParser.RULE_other_action_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 870;
			_la = this._input.LA(1);
			if (!(_la === BNGParser.GENERATEHYBRIDMODEL || ((((_la - 92)) & ~0x1F) === 0 && ((1 << (_la - 92)) & ((1 << (BNGParser.PARAMETER_SCAN - 92)) | (1 << (BNGParser.BIFURCATE - 92)) | (1 << (BNGParser.READFILE - 92)) | (1 << (BNGParser.VISUALIZE - 92)))) !== 0) || ((((_la - 137)) & ~0x1F) === 0 && ((1 << (_la - 137)) & ((1 << (BNGParser.SAVECONCENTRATIONS - 137)) | (1 << (BNGParser.RESETCONCENTRATIONS - 137)) | (1 << (BNGParser.SAVEPARAMETERS - 137)) | (1 << (BNGParser.RESETPARAMETERS - 137)) | (1 << (BNGParser.QUIT - 137)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 871;
			this.match(BNGParser.LPAREN);
			this.state = 873;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.LBRACKET) {
				{
				this.state = 872;
				this.action_args();
				}
			}

			this.state = 875;
			this.match(BNGParser.RPAREN);
			this.state = 877;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.SEMI) {
				{
				this.state = 876;
				this.match(BNGParser.SEMI);
				}
			}

			this.state = 882;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 879;
				this.match(BNGParser.LB);
				}
				}
				this.state = 884;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public action_args(): Action_argsContext {
		let _localctx: Action_argsContext = new Action_argsContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, BNGParser.RULE_action_args);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 885;
			this.match(BNGParser.LBRACKET);
			this.state = 886;
			this.action_arg_list();
			this.state = 887;
			this.match(BNGParser.RBRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public action_arg_list(): Action_arg_listContext {
		let _localctx: Action_arg_listContext = new Action_arg_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, BNGParser.RULE_action_arg_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 889;
			this.action_arg();
			this.state = 894;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.COMMA) {
				{
				{
				this.state = 890;
				this.match(BNGParser.COMMA);
				this.state = 891;
				this.action_arg();
				}
				}
				this.state = 896;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public action_arg(): Action_argContext {
		let _localctx: Action_argContext = new Action_argContext(this._ctx, this.state);
		this.enterRule(_localctx, 110, BNGParser.RULE_action_arg);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 897;
			this.arg_name();
			this.state = 898;
			this.match(BNGParser.ASSIGNS);
			this.state = 912;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BNGParser.SAT:
			case BNGParser.MM:
			case BNGParser.HILL:
			case BNGParser.ARRHENIUS:
			case BNGParser.IF:
			case BNGParser.EXP:
			case BNGParser.LN:
			case BNGParser.LOG10:
			case BNGParser.LOG2:
			case BNGParser.SQRT:
			case BNGParser.RINT:
			case BNGParser.ABS:
			case BNGParser.SIN:
			case BNGParser.COS:
			case BNGParser.TAN:
			case BNGParser.ASIN:
			case BNGParser.ACOS:
			case BNGParser.ATAN:
			case BNGParser.SINH:
			case BNGParser.COSH:
			case BNGParser.TANH:
			case BNGParser.ASINH:
			case BNGParser.ACOSH:
			case BNGParser.ATANH:
			case BNGParser.PI:
			case BNGParser.EULERIAN:
			case BNGParser.MIN:
			case BNGParser.MAX:
			case BNGParser.SUM:
			case BNGParser.AVG:
			case BNGParser.TIME:
			case BNGParser.FLOAT:
			case BNGParser.INT:
			case BNGParser.STRING:
			case BNGParser.LPAREN:
			case BNGParser.MINUS:
			case BNGParser.PLUS:
				{
				this.state = 899;
				this.expression();
				}
				break;
			case BNGParser.DBQUOTES:
				{
				this.state = 900;
				this.match(BNGParser.DBQUOTES);
				this.state = 904;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << BNGParser.LINE_COMMENT) | (1 << BNGParser.LB) | (1 << BNGParser.WS) | (1 << BNGParser.BEGIN) | (1 << BNGParser.END) | (1 << BNGParser.MODEL) | (1 << BNGParser.PARAMETERS) | (1 << BNGParser.COMPARTMENTS) | (1 << BNGParser.MOLECULE) | (1 << BNGParser.MOLECULES) | (1 << BNGParser.TYPES) | (1 << BNGParser.SEED) | (1 << BNGParser.SPECIES) | (1 << BNGParser.OBSERVABLES) | (1 << BNGParser.FUNCTIONS) | (1 << BNGParser.REACTION) | (1 << BNGParser.REACTIONS) | (1 << BNGParser.RULES) | (1 << BNGParser.GROUPS) | (1 << BNGParser.ACTIONS) | (1 << BNGParser.POPULATION) | (1 << BNGParser.MAPS) | (1 << BNGParser.ENERGY) | (1 << BNGParser.PATTERNS) | (1 << BNGParser.MATCHONCE) | (1 << BNGParser.DELETEMOLECULES) | (1 << BNGParser.MOVECONNECTED) | (1 << BNGParser.INCLUDE_REACTANTS) | (1 << BNGParser.INCLUDE_PRODUCTS) | (1 << BNGParser.EXCLUDE_REACTANTS) | (1 << BNGParser.EXCLUDE_PRODUCTS))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (BNGParser.TOTALRATE - 32)) | (1 << (BNGParser.VERSION - 32)) | (1 << (BNGParser.SET_OPTION - 32)) | (1 << (BNGParser.SET_MODEL_NAME - 32)) | (1 << (BNGParser.SUBSTANCEUNITS - 32)) | (1 << (BNGParser.PREFIX - 32)) | (1 << (BNGParser.SUFFIX - 32)) | (1 << (BNGParser.GENERATENETWORK - 32)) | (1 << (BNGParser.OVERWRITE - 32)) | (1 << (BNGParser.MAX_AGG - 32)) | (1 << (BNGParser.MAX_ITER - 32)) | (1 << (BNGParser.MAX_STOICH - 32)) | (1 << (BNGParser.PRINT_ITER - 32)) | (1 << (BNGParser.CHECK_ISO - 32)) | (1 << (BNGParser.GENERATEHYBRIDMODEL - 32)) | (1 << (BNGParser.SAFE - 32)) | (1 << (BNGParser.EXECUTE - 32)) | (1 << (BNGParser.SIMULATE - 32)) | (1 << (BNGParser.METHOD - 32)) | (1 << (BNGParser.ODE - 32)) | (1 << (BNGParser.SSA - 32)) | (1 << (BNGParser.PLA - 32)) | (1 << (BNGParser.NF - 32)) | (1 << (BNGParser.VERBOSE - 32)) | (1 << (BNGParser.NETFILE - 32)) | (1 << (BNGParser.ARGFILE - 32)) | (1 << (BNGParser.CONTINUE - 32)) | (1 << (BNGParser.T_START - 32)) | (1 << (BNGParser.T_END - 32)) | (1 << (BNGParser.N_STEPS - 32)) | (1 << (BNGParser.N_OUTPUT_STEPS - 32)) | (1 << (BNGParser.MAX_SIM_STEPS - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (BNGParser.OUTPUT_STEP_INTERVAL - 64)) | (1 << (BNGParser.SAMPLE_TIMES - 64)) | (1 << (BNGParser.SAVE_PROGRESS - 64)) | (1 << (BNGParser.PRINT_CDAT - 64)) | (1 << (BNGParser.PRINT_FUNCTIONS - 64)) | (1 << (BNGParser.PRINT_NET - 64)) | (1 << (BNGParser.PRINT_END - 64)) | (1 << (BNGParser.STOP_IF - 64)) | (1 << (BNGParser.PRINT_ON_STOP - 64)) | (1 << (BNGParser.SIMULATE_ODE - 64)) | (1 << (BNGParser.ATOL - 64)) | (1 << (BNGParser.RTOL - 64)) | (1 << (BNGParser.STEADY_STATE - 64)) | (1 << (BNGParser.SPARSE - 64)) | (1 << (BNGParser.SIMULATE_SSA - 64)) | (1 << (BNGParser.SIMULATE_PLA - 64)) | (1 << (BNGParser.PLA_CONFIG - 64)) | (1 << (BNGParser.PLA_OUTPUT - 64)) | (1 << (BNGParser.SIMULATE_NF - 64)) | (1 << (BNGParser.PARAM - 64)) | (1 << (BNGParser.COMPLEX - 64)) | (1 << (BNGParser.GET_FINAL_STATE - 64)) | (1 << (BNGParser.GML - 64)) | (1 << (BNGParser.NOCSLF - 64)) | (1 << (BNGParser.NOTF - 64)) | (1 << (BNGParser.BINARY_OUTPUT - 64)) | (1 << (BNGParser.UTL - 64)) | (1 << (BNGParser.EQUIL - 64)) | (1 << (BNGParser.PARAMETER_SCAN - 64)) | (1 << (BNGParser.BIFURCATE - 64)) | (1 << (BNGParser.PARAMETER - 64)) | (1 << (BNGParser.PAR_MIN - 64)))) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & ((1 << (BNGParser.PAR_MAX - 96)) | (1 << (BNGParser.N_SCAN_PTS - 96)) | (1 << (BNGParser.LOG_SCALE - 96)) | (1 << (BNGParser.RESET_CONC - 96)) | (1 << (BNGParser.READFILE - 96)) | (1 << (BNGParser.FILE - 96)) | (1 << (BNGParser.ATOMIZE - 96)) | (1 << (BNGParser.BLOCKS - 96)) | (1 << (BNGParser.SKIPACTIONS - 96)) | (1 << (BNGParser.VISUALIZE - 96)) | (1 << (BNGParser.TYPE - 96)) | (1 << (BNGParser.BACKGROUND - 96)) | (1 << (BNGParser.COLLAPSE - 96)) | (1 << (BNGParser.OPTS - 96)) | (1 << (BNGParser.WRITESSC - 96)) | (1 << (BNGParser.WRITESSCCFG - 96)) | (1 << (BNGParser.FORMAT - 96)) | (1 << (BNGParser.WRITEFILE - 96)) | (1 << (BNGParser.WRITEMODEL - 96)) | (1 << (BNGParser.WRITEXML - 96)) | (1 << (BNGParser.WRITENETWORK - 96)) | (1 << (BNGParser.WRITESBML - 96)) | (1 << (BNGParser.WRITEMDL - 96)) | (1 << (BNGParser.INCLUDE_MODEL - 96)) | (1 << (BNGParser.INCLUDE_NETWORK - 96)) | (1 << (BNGParser.PRETTY_FORMATTING - 96)) | (1 << (BNGParser.EVALUATE_EXPRESSIONS - 96)) | (1 << (BNGParser.TEXTREACTION - 96)) | (1 << (BNGParser.TEXTSPECIES - 96)) | (1 << (BNGParser.WRITEMFILE - 96)) | (1 << (BNGParser.WRITEMEXFILE - 96)) | (1 << (BNGParser.BDF - 96)))) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & ((1 << (BNGParser.MAX_STEP - 128)) | (1 << (BNGParser.MAXORDER - 128)) | (1 << (BNGParser.STATS - 128)) | (1 << (BNGParser.MAX_NUM_STEPS - 128)) | (1 << (BNGParser.MAX_ERR_TEST_FAILS - 128)) | (1 << (BNGParser.MAX_CONV_FAILS - 128)) | (1 << (BNGParser.STIFF - 128)) | (1 << (BNGParser.SETCONCENTRATION - 128)) | (1 << (BNGParser.ADDCONCENTRATION - 128)) | (1 << (BNGParser.SAVECONCENTRATIONS - 128)) | (1 << (BNGParser.RESETCONCENTRATIONS - 128)) | (1 << (BNGParser.SETPARAMETER - 128)) | (1 << (BNGParser.SAVEPARAMETERS - 128)) | (1 << (BNGParser.RESETPARAMETERS - 128)) | (1 << (BNGParser.QUIT - 128)) | (1 << (BNGParser.SAT - 128)) | (1 << (BNGParser.MM - 128)) | (1 << (BNGParser.HILL - 128)) | (1 << (BNGParser.ARRHENIUS - 128)) | (1 << (BNGParser.IF - 128)) | (1 << (BNGParser.EXP - 128)) | (1 << (BNGParser.LN - 128)) | (1 << (BNGParser.LOG10 - 128)) | (1 << (BNGParser.LOG2 - 128)) | (1 << (BNGParser.SQRT - 128)) | (1 << (BNGParser.RINT - 128)) | (1 << (BNGParser.ABS - 128)) | (1 << (BNGParser.SIN - 128)) | (1 << (BNGParser.COS - 128)) | (1 << (BNGParser.TAN - 128)) | (1 << (BNGParser.ASIN - 128)) | (1 << (BNGParser.ACOS - 128)))) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & ((1 << (BNGParser.ATAN - 160)) | (1 << (BNGParser.SINH - 160)) | (1 << (BNGParser.COSH - 160)) | (1 << (BNGParser.TANH - 160)) | (1 << (BNGParser.ASINH - 160)) | (1 << (BNGParser.ACOSH - 160)) | (1 << (BNGParser.ATANH - 160)) | (1 << (BNGParser.PI - 160)) | (1 << (BNGParser.EULERIAN - 160)) | (1 << (BNGParser.MIN - 160)) | (1 << (BNGParser.MAX - 160)) | (1 << (BNGParser.SUM - 160)) | (1 << (BNGParser.AVG - 160)) | (1 << (BNGParser.TIME - 160)) | (1 << (BNGParser.FLOAT - 160)) | (1 << (BNGParser.INT - 160)) | (1 << (BNGParser.STRING - 160)) | (1 << (BNGParser.SEMI - 160)) | (1 << (BNGParser.COLON - 160)) | (1 << (BNGParser.LSBRACKET - 160)) | (1 << (BNGParser.RSBRACKET - 160)) | (1 << (BNGParser.LBRACKET - 160)) | (1 << (BNGParser.RBRACKET - 160)) | (1 << (BNGParser.COMMA - 160)) | (1 << (BNGParser.DOT - 160)) | (1 << (BNGParser.LPAREN - 160)) | (1 << (BNGParser.RPAREN - 160)) | (1 << (BNGParser.UNI_REACTION_SIGN - 160)) | (1 << (BNGParser.BI_REACTION_SIGN - 160)) | (1 << (BNGParser.DOLLAR - 160)) | (1 << (BNGParser.TILDE - 160)) | (1 << (BNGParser.AT - 160)))) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & ((1 << (BNGParser.GTE - 192)) | (1 << (BNGParser.GT - 192)) | (1 << (BNGParser.LTE - 192)) | (1 << (BNGParser.LT - 192)) | (1 << (BNGParser.ASSIGNS - 192)) | (1 << (BNGParser.EQUALS - 192)) | (1 << (BNGParser.BECOMES - 192)) | (1 << (BNGParser.DIV - 192)) | (1 << (BNGParser.TIMES - 192)) | (1 << (BNGParser.MINUS - 192)) | (1 << (BNGParser.PLUS - 192)) | (1 << (BNGParser.POWER - 192)) | (1 << (BNGParser.MOD - 192)) | (1 << (BNGParser.PIPE - 192)) | (1 << (BNGParser.QMARK - 192)) | (1 << (BNGParser.EMARK - 192)) | (1 << (BNGParser.AMPERSAND - 192)) | (1 << (BNGParser.VERSION_NUMBER - 192)) | (1 << (BNGParser.ULB - 192)))) !== 0)) {
					{
					{
					this.state = 901;
					_la = this._input.LA(1);
					if (_la <= 0 || (_la === BNGParser.DBQUOTES)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					}
					}
					this.state = 906;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 907;
				this.match(BNGParser.DBQUOTES);
				}
				break;
			case BNGParser.LSBRACKET:
				{
				this.state = 908;
				this.match(BNGParser.LSBRACKET);
				this.state = 909;
				this.expression_list();
				this.state = 910;
				this.match(BNGParser.RSBRACKET);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arg_name(): Arg_nameContext {
		let _localctx: Arg_nameContext = new Arg_nameContext(this._ctx, this.state);
		this.enterRule(_localctx, 112, BNGParser.RULE_arg_name);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 914;
			_la = this._input.LA(1);
			if (!(((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & ((1 << (BNGParser.PREFIX - 37)) | (1 << (BNGParser.SUFFIX - 37)) | (1 << (BNGParser.OVERWRITE - 37)) | (1 << (BNGParser.MAX_AGG - 37)) | (1 << (BNGParser.MAX_ITER - 37)) | (1 << (BNGParser.MAX_STOICH - 37)) | (1 << (BNGParser.PRINT_ITER - 37)) | (1 << (BNGParser.CHECK_ISO - 37)) | (1 << (BNGParser.METHOD - 37)) | (1 << (BNGParser.VERBOSE - 37)) | (1 << (BNGParser.NETFILE - 37)) | (1 << (BNGParser.CONTINUE - 37)) | (1 << (BNGParser.T_START - 37)) | (1 << (BNGParser.T_END - 37)) | (1 << (BNGParser.N_STEPS - 37)) | (1 << (BNGParser.N_OUTPUT_STEPS - 37)))) !== 0) || ((((_la - 74)) & ~0x1F) === 0 && ((1 << (_la - 74)) & ((1 << (BNGParser.ATOL - 74)) | (1 << (BNGParser.RTOL - 74)) | (1 << (BNGParser.STEADY_STATE - 74)) | (1 << (BNGParser.SPARSE - 74)) | (1 << (BNGParser.FILE - 74)))) !== 0) || _la === BNGParser.FORMAT || _la === BNGParser.STRING)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expression_list(): Expression_listContext {
		let _localctx: Expression_listContext = new Expression_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 114, BNGParser.RULE_expression_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 916;
			this.expression();
			this.state = 921;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.COMMA) {
				{
				{
				this.state = 917;
				this.match(BNGParser.COMMA);
				this.state = 918;
				this.expression();
				}
				}
				this.state = 923;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 116, BNGParser.RULE_expression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 924;
			this.conditional_expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public conditional_expr(): Conditional_exprContext {
		let _localctx: Conditional_exprContext = new Conditional_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 118, BNGParser.RULE_conditional_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 926;
			this.or_expr();
			this.state = 932;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.QMARK) {
				{
				this.state = 927;
				this.match(BNGParser.QMARK);
				this.state = 928;
				this.expression();
				this.state = 929;
				this.match(BNGParser.COLON);
				this.state = 930;
				this.expression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public or_expr(): Or_exprContext {
		let _localctx: Or_exprContext = new Or_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 120, BNGParser.RULE_or_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 934;
			this.and_expr();
			this.state = 940;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.PIPE) {
				{
				{
				this.state = 935;
				this.match(BNGParser.PIPE);
				this.state = 936;
				this.match(BNGParser.PIPE);
				this.state = 937;
				this.and_expr();
				}
				}
				this.state = 942;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public and_expr(): And_exprContext {
		let _localctx: And_exprContext = new And_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 122, BNGParser.RULE_and_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 943;
			this.equality_expr();
			this.state = 949;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.AMPERSAND) {
				{
				{
				this.state = 944;
				this.match(BNGParser.AMPERSAND);
				this.state = 945;
				this.match(BNGParser.AMPERSAND);
				this.state = 946;
				this.equality_expr();
				}
				}
				this.state = 951;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public equality_expr(): Equality_exprContext {
		let _localctx: Equality_exprContext = new Equality_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 124, BNGParser.RULE_equality_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 952;
			this.relational_expr();
			this.state = 957;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & ((1 << (BNGParser.GTE - 192)) | (1 << (BNGParser.GT - 192)) | (1 << (BNGParser.LTE - 192)) | (1 << (BNGParser.LT - 192)) | (1 << (BNGParser.EQUALS - 192)))) !== 0)) {
				{
				{
				this.state = 953;
				_la = this._input.LA(1);
				if (!(((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & ((1 << (BNGParser.GTE - 192)) | (1 << (BNGParser.GT - 192)) | (1 << (BNGParser.LTE - 192)) | (1 << (BNGParser.LT - 192)) | (1 << (BNGParser.EQUALS - 192)))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 954;
				this.relational_expr();
				}
				}
				this.state = 959;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public relational_expr(): Relational_exprContext {
		let _localctx: Relational_exprContext = new Relational_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 126, BNGParser.RULE_relational_expr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 960;
			this.additive_expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public additive_expr(): Additive_exprContext {
		let _localctx: Additive_exprContext = new Additive_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 128, BNGParser.RULE_additive_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 962;
			this.multiplicative_expr();
			this.state = 967;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.MINUS || _la === BNGParser.PLUS) {
				{
				{
				this.state = 963;
				_la = this._input.LA(1);
				if (!(_la === BNGParser.MINUS || _la === BNGParser.PLUS)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 964;
				this.multiplicative_expr();
				}
				}
				this.state = 969;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public multiplicative_expr(): Multiplicative_exprContext {
		let _localctx: Multiplicative_exprContext = new Multiplicative_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 130, BNGParser.RULE_multiplicative_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 970;
			this.power_expr();
			this.state = 975;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 199)) & ~0x1F) === 0 && ((1 << (_la - 199)) & ((1 << (BNGParser.DIV - 199)) | (1 << (BNGParser.TIMES - 199)) | (1 << (BNGParser.MOD - 199)))) !== 0)) {
				{
				{
				this.state = 971;
				_la = this._input.LA(1);
				if (!(((((_la - 199)) & ~0x1F) === 0 && ((1 << (_la - 199)) & ((1 << (BNGParser.DIV - 199)) | (1 << (BNGParser.TIMES - 199)) | (1 << (BNGParser.MOD - 199)))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 972;
				this.power_expr();
				}
				}
				this.state = 977;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public power_expr(): Power_exprContext {
		let _localctx: Power_exprContext = new Power_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 132, BNGParser.RULE_power_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 978;
			this.unary_expr();
			this.state = 983;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.POWER) {
				{
				{
				this.state = 979;
				this.match(BNGParser.POWER);
				this.state = 980;
				this.unary_expr();
				}
				}
				this.state = 985;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unary_expr(): Unary_exprContext {
		let _localctx: Unary_exprContext = new Unary_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 134, BNGParser.RULE_unary_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 987;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.MINUS || _la === BNGParser.PLUS) {
				{
				this.state = 986;
				_la = this._input.LA(1);
				if (!(_la === BNGParser.MINUS || _la === BNGParser.PLUS)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 989;
			this.primary_expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primary_expr(): Primary_exprContext {
		let _localctx: Primary_exprContext = new Primary_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 136, BNGParser.RULE_primary_expr);
		try {
			this.state = 999;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 124, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 991;
				this.match(BNGParser.LPAREN);
				this.state = 992;
				this.expression();
				this.state = 993;
				this.match(BNGParser.RPAREN);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 995;
				this.function_call();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 996;
				this.observable_ref();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 997;
				this.literal();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 998;
				this.match(BNGParser.STRING);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_call(): Function_callContext {
		let _localctx: Function_callContext = new Function_callContext(this._ctx, this.state);
		this.enterRule(_localctx, 138, BNGParser.RULE_function_call);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1001;
			_la = this._input.LA(1);
			if (!(((((_la - 143)) & ~0x1F) === 0 && ((1 << (_la - 143)) & ((1 << (BNGParser.SAT - 143)) | (1 << (BNGParser.MM - 143)) | (1 << (BNGParser.HILL - 143)) | (1 << (BNGParser.ARRHENIUS - 143)) | (1 << (BNGParser.IF - 143)) | (1 << (BNGParser.EXP - 143)) | (1 << (BNGParser.LN - 143)) | (1 << (BNGParser.LOG10 - 143)) | (1 << (BNGParser.LOG2 - 143)) | (1 << (BNGParser.SQRT - 143)) | (1 << (BNGParser.RINT - 143)) | (1 << (BNGParser.ABS - 143)) | (1 << (BNGParser.SIN - 143)) | (1 << (BNGParser.COS - 143)) | (1 << (BNGParser.TAN - 143)) | (1 << (BNGParser.ASIN - 143)) | (1 << (BNGParser.ACOS - 143)) | (1 << (BNGParser.ATAN - 143)) | (1 << (BNGParser.SINH - 143)) | (1 << (BNGParser.COSH - 143)) | (1 << (BNGParser.TANH - 143)) | (1 << (BNGParser.ASINH - 143)) | (1 << (BNGParser.ACOSH - 143)) | (1 << (BNGParser.ATANH - 143)) | (1 << (BNGParser.MIN - 143)) | (1 << (BNGParser.MAX - 143)) | (1 << (BNGParser.SUM - 143)) | (1 << (BNGParser.AVG - 143)) | (1 << (BNGParser.TIME - 143)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 1002;
			this.match(BNGParser.LPAREN);
			this.state = 1004;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 143)) & ~0x1F) === 0 && ((1 << (_la - 143)) & ((1 << (BNGParser.SAT - 143)) | (1 << (BNGParser.MM - 143)) | (1 << (BNGParser.HILL - 143)) | (1 << (BNGParser.ARRHENIUS - 143)) | (1 << (BNGParser.IF - 143)) | (1 << (BNGParser.EXP - 143)) | (1 << (BNGParser.LN - 143)) | (1 << (BNGParser.LOG10 - 143)) | (1 << (BNGParser.LOG2 - 143)) | (1 << (BNGParser.SQRT - 143)) | (1 << (BNGParser.RINT - 143)) | (1 << (BNGParser.ABS - 143)) | (1 << (BNGParser.SIN - 143)) | (1 << (BNGParser.COS - 143)) | (1 << (BNGParser.TAN - 143)) | (1 << (BNGParser.ASIN - 143)) | (1 << (BNGParser.ACOS - 143)) | (1 << (BNGParser.ATAN - 143)) | (1 << (BNGParser.SINH - 143)) | (1 << (BNGParser.COSH - 143)) | (1 << (BNGParser.TANH - 143)) | (1 << (BNGParser.ASINH - 143)) | (1 << (BNGParser.ACOSH - 143)) | (1 << (BNGParser.ATANH - 143)) | (1 << (BNGParser.PI - 143)) | (1 << (BNGParser.EULERIAN - 143)) | (1 << (BNGParser.MIN - 143)) | (1 << (BNGParser.MAX - 143)) | (1 << (BNGParser.SUM - 143)) | (1 << (BNGParser.AVG - 143)) | (1 << (BNGParser.TIME - 143)) | (1 << (BNGParser.FLOAT - 143)))) !== 0) || ((((_la - 175)) & ~0x1F) === 0 && ((1 << (_la - 175)) & ((1 << (BNGParser.INT - 175)) | (1 << (BNGParser.STRING - 175)) | (1 << (BNGParser.LPAREN - 175)) | (1 << (BNGParser.MINUS - 175)) | (1 << (BNGParser.PLUS - 175)))) !== 0)) {
				{
				this.state = 1003;
				this.expression_list();
				}
			}

			this.state = 1006;
			this.match(BNGParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public observable_ref(): Observable_refContext {
		let _localctx: Observable_refContext = new Observable_refContext(this._ctx, this.state);
		this.enterRule(_localctx, 140, BNGParser.RULE_observable_ref);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1008;
			this.match(BNGParser.STRING);
			this.state = 1009;
			this.match(BNGParser.LPAREN);
			this.state = 1010;
			this.expression();
			this.state = 1011;
			this.match(BNGParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 142, BNGParser.RULE_literal);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1013;
			_la = this._input.LA(1);
			if (!(((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & ((1 << (BNGParser.PI - 167)) | (1 << (BNGParser.EULERIAN - 167)) | (1 << (BNGParser.FLOAT - 167)) | (1 << (BNGParser.INT - 167)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	private static readonly _serializedATNSegments: number = 2;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\xD5\u03FA\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
		"\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12" +
		"\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17" +
		"\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C" +
		"\x04\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04" +
		"#\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t" +
		"+\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x04" +
		"4\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04" +
		"F\tF\x04G\tG\x04H\tH\x04I\tI\x03\x02\x07\x02\x94\n\x02\f\x02\x0E\x02\x97" +
		"\v\x02\x03\x02\x07\x02\x9A\n\x02\f\x02\x0E\x02\x9D\v\x02\x03\x02\x03\x02" +
		"\x03\x02\x06\x02\xA2\n\x02\r\x02\x0E\x02\xA3\x03\x02\x07\x02\xA7\n\x02" +
		"\f\x02\x0E\x02\xAA\v\x02\x03\x02\x03\x02\x03\x02\x07\x02\xAF\n\x02\f\x02" +
		"\x0E\x02\xB2\v\x02\x03\x02\x07\x02\xB5\n\x02\f\x02\x0E\x02\xB8\v\x02\x05" +
		"\x02\xBA\n\x02\x03\x02\x05\x02\xBD\n\x02\x03\x02\x03\x02\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x05\x03\xC5\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x05\x04\xCC\n\x04\x03\x04\x03\x04\x03\x04\x05\x04\xD1\n\x04\x03\x04" +
		"\x06\x04\xD4\n\x04\r\x04\x0E\x04\xD5\x03\x05\x03\x05\x03\x05\x03\x05\x03" +
		"\x05\x03\x05\x03\x05\x05\x05\xDF\n\x05\x03\x05\x06\x05\xE2\n\x05\r\x05" +
		"\x0E\x05\xE3\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03" +
		"\x06\x03\x06\x03\x06\x03\x06\x05\x06\xF1\n\x06\x03\x06\x03\x06\x03\x06" +
		"\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06\xFD\n" +
		"\x06\x07\x06\xFF\n\x06\f\x06\x0E\x06\u0102\v\x06\x03\x06\x03\x06\x05\x06" +
		"\u0106\n\x06\x03\x06\x06\x06\u0109\n\x06\r\x06\x0E\x06\u010A\x03\x07\x03" +
		"\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x05\x07\u0114\n\x07\x03\x07" +
		"\x06\x07\u0117\n\x07\r\x07\x0E\x07\u0118\x03\b\x03\b\x03\b\x03\b\x03\b" +
		"\x03\b\x03\b\x03\b\x03\b\x05\b\u0124\n\b\x03\t\x03\t\x03\t\x06\t\u0129" +
		"\n\t\r\t\x0E\t\u012A\x03\t\x03\t\x06\t\u012F\n\t\r\t\x0E\t\u0130\x07\t" +
		"\u0133\n\t\f\t\x0E\t\u0136\v\t\x03\t\x03\t\x03\t\x07\t\u013B\n\t\f\t\x0E" +
		"\t\u013E\v\t\x03\n\x03\n\x05\n\u0142\n\n\x03\n\x03\n\x05\n\u0146\n\n\x03" +
		"\v\x03\v\x03\v\x03\v\x06\v\u014C\n\v\r\v\x0E\v\u014D\x03\v\x03\v\x06\v" +
		"\u0152\n\v\r\v\x0E\v\u0153\x07\v\u0156\n\v\f\v\x0E\v\u0159\v\v\x03\v\x03" +
		"\v\x03\v\x03\v\x07\v\u015F\n\v\f\v\x0E\v\u0162\v\v\x03\f\x03\f\x05\f\u0166" +
		"\n\f\x03\f\x03\f\x03\r\x03\r\x03\r\x05\r\u016D\n\r\x03\r\x03\r\x03\x0E" +
		"\x03\x0E\x03\x0E\x07\x0E\u0174\n\x0E\f\x0E\x0E\x0E\u0177\v\x0E\x03\x0F" +
		"\x03\x0F\x03\x0F\x05\x0F\u017C\n\x0F\x03\x10\x03\x10\x03\x10\x07\x10\u0181" +
		"\n\x10\f\x10\x0E\x10\u0184\v\x10\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11" +
		"\u018A\n\x11\x03\x11\x06\x11\u018D\n\x11\r\x11\x0E\x11\u018E\x03\x11\x03" +
		"\x11\x06\x11\u0193\n\x11\r\x11\x0E\x11\u0194\x07\x11\u0197\n\x11\f\x11" +
		"\x0E\x11\u019A\v\x11\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11\u01A0\n\x11" +
		"\x03\x11\x07\x11\u01A3\n\x11\f\x11\x0E\x11\u01A6\v\x11\x03\x12\x03\x12" +
		"\x05\x12\u01AA\n\x12\x03\x12\x05\x12\u01AD\n\x12\x03\x12\x03\x12\x03\x12" +
		"\x03\x13\x03\x13\x03\x13\x07\x13\u01B5\n\x13\f\x13\x0E\x13\u01B8\v\x13" +
		"\x03\x13\x03\x13\x05\x13\u01BC\n\x13\x03\x14\x03\x14\x03\x14\x05\x14\u01C1" +
		"\n\x14\x03\x14\x03\x14\x03\x15\x03\x15\x03\x15\x07\x15\u01C8\n\x15\f\x15" +
		"\x0E\x15\u01CB\v\x15\x03\x16\x03\x16\x03\x16\x05\x16\u01D0\n\x16\x03\x16" +
		"\x05\x16\u01D3\n\x16\x03\x17\x03\x17\x03\x18\x03\x18\x03\x18\x03\x18\x03" +
		"\x18\x03\x18\x05\x18\u01DD\n\x18\x03\x19\x03\x19\x03\x1A\x03\x1A\x03\x1A" +
		"\x06\x1A\u01E4\n\x1A\r\x1A\x0E\x1A\u01E5\x03\x1A\x03\x1A\x06\x1A\u01EA" +
		"\n\x1A\r\x1A\x0E\x1A\u01EB\x07\x1A\u01EE\n\x1A\f\x1A\x0E\x1A\u01F1\v\x1A" +
		"\x03\x1A\x03\x1A\x03\x1A\x07\x1A\u01F6\n\x1A\f\x1A\x0E\x1A\u01F9\v\x1A" +
		"\x03\x1B\x03\x1B\x05\x1B\u01FD\n\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03" +
		"\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1D\x07\x1D\u0208\n\x1D\f\x1D\x0E\x1D" +
		"\u020B\v\x1D\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x06\x1E\u0211\n\x1E\r\x1E" +
		"\x0E\x1E\u0212\x03\x1E\x03\x1E\x06\x1E\u0217\n\x1E\r\x1E\x0E\x1E\u0218" +
		"\x07\x1E\u021B\n\x1E\f\x1E\x0E\x1E\u021E\v\x1E\x03\x1E\x03\x1E\x03\x1E" +
		"\x03\x1E\x07\x1E\u0224\n\x1E\f\x1E\x0E\x1E\u0227\v\x1E\x03\x1F\x03\x1F" +
		"\x03\x1F\x05\x1F\u022C\n\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x05" +
		"\x1F\u0233\n\x1F\x03 \x03 \x03!\x03!\x03!\x07!\u023A\n!\f!\x0E!\u023D" +
		"\v!\x03!\x05!\u0240\n!\x03\"\x03\"\x03\"\x07\"\u0245\n\"\f\"\x0E\"\u0248" +
		"\v\"\x03\"\x05\"\u024B\n\"\x03#\x03#\x03$\x03$\x03$\x05$\u0252\n$\x03" +
		"%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03" +
		"%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03" +
		"%\x03%\x03%\x03%\x05%\u0274\n%\x03&\x03&\x03&\x07&\u0279\n&\f&\x0E&\u027C" +
		"\v&\x03\'\x03\'\x03\'\x06\'\u0281\n\'\r\'\x0E\'\u0282\x03\'\x03\'\x06" +
		"\'\u0287\n\'\r\'\x0E\'\u0288\x07\'\u028B\n\'\f\'\x0E\'\u028E\v\'\x03\'" +
		"\x03\'\x03\'\x07\'\u0293\n\'\f\'\x0E\'\u0296\v\'\x03(\x03(\x05(\u029A" +
		"\n(\x03(\x03(\x03(\x05(\u029F\n(\x03(\x03(\x05(\u02A3\n(\x03(\x03(\x03" +
		")\x03)\x03)\x07)\u02AA\n)\f)\x0E)\u02AD\v)\x03*\x03*\x03*\x06*\u02B2\n" +
		"*\r*\x0E*\u02B3\x03*\x03*\x06*\u02B8\n*\r*\x0E*\u02B9\x07*\u02BC\n*\f" +
		"*\x0E*\u02BF\v*\x03*\x03*\x03*\x07*\u02C4\n*\f*\x0E*\u02C7\v*\x03+\x03" +
		"+\x05+\u02CB\n+\x03+\x03+\x03+\x03+\x05+\u02D1\n+\x03,\x03,\x03,\x03," +
		"\x06,\u02D7\n,\r,\x0E,\u02D8\x03,\x03,\x06,\u02DD\n,\r,\x0E,\u02DE\x07" +
		",\u02E1\n,\f,\x0E,\u02E4\v,\x03,\x03,\x03,\x03,\x07,\u02EA\n,\f,\x0E," +
		"\u02ED\v,\x03-\x03-\x05-\u02F1\n-\x03-\x03-\x03-\x03.\x03.\x03.\x03.\x06" +
		".\u02FA\n.\r.\x0E.\u02FB\x03.\x03.\x06.\u0300\n.\r.\x0E.\u0301\x07.\u0304" +
		"\n.\f.\x0E.\u0307\v.\x03.\x03.\x03.\x03.\x07.\u030D\n.\f.\x0E.\u0310\v" +
		".\x03/\x03/\x05/\u0314\n/\x03/\x03/\x03/\x03/\x03/\x05/\u031B\n/\x03/" +
		"\x03/\x030\x060\u0320\n0\r0\x0E0\u0321\x031\x031\x031\x031\x031\x051\u0329" +
		"\n1\x032\x032\x032\x052\u032E\n2\x032\x032\x052\u0332\n2\x032\x072\u0335" +
		"\n2\f2\x0E2\u0338\v2\x033\x033\x033\x053\u033D\n3\x033\x033\x053\u0341" +
		"\n3\x033\x073\u0344\n3\f3\x0E3\u0347\v3\x034\x034\x034\x054\u034C\n4\x03" +
		"4\x034\x054\u0350\n4\x034\x074\u0353\n4\f4\x0E4\u0356\v4\x035\x035\x03" +
		"5\x035\x035\x035\x035\x035\x035\x055\u0361\n5\x035\x075\u0364\n5\f5\x0E" +
		"5\u0367\v5\x036\x036\x036\x056\u036C\n6\x036\x036\x056\u0370\n6\x036\x07" +
		"6\u0373\n6\f6\x0E6\u0376\v6\x037\x037\x037\x037\x038\x038\x038\x078\u037F" +
		"\n8\f8\x0E8\u0382\v8\x039\x039\x039\x039\x039\x079\u0389\n9\f9\x0E9\u038C" +
		"\v9\x039\x039\x039\x039\x039\x059\u0393\n9\x03:\x03:\x03;\x03;\x03;\x07" +
		";\u039A\n;\f;\x0E;\u039D\v;\x03<\x03<\x03=\x03=\x03=\x03=\x03=\x03=\x05" +
		"=\u03A7\n=\x03>\x03>\x03>\x03>\x07>\u03AD\n>\f>\x0E>\u03B0\v>\x03?\x03" +
		"?\x03?\x03?\x07?\u03B6\n?\f?\x0E?\u03B9\v?\x03@\x03@\x03@\x07@\u03BE\n" +
		"@\f@\x0E@\u03C1\v@\x03A\x03A\x03B\x03B\x03B\x07B\u03C8\nB\fB\x0EB\u03CB" +
		"\vB\x03C\x03C\x03C\x07C\u03D0\nC\fC\x0EC\u03D3\vC\x03D\x03D\x03D\x07D" +
		"\u03D8\nD\fD\x0ED\u03DB\vD\x03E\x05E\u03DE\nE\x03E\x03E\x03F\x03F\x03" +
		"F\x03F\x03F\x03F\x03F\x03F\x05F\u03EA\nF\x03G\x03G\x03G\x05G\u03EF\nG" +
		"\x03G\x03G\x03H\x03H\x03H\x03H\x03H\x03I\x03I\x03I\x02\x02\x02J\x02\x02" +
		"\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16" +
		"\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02" +
		".\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02" +
		"J\x02L\x02N\x02P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02" +
		"f\x02h\x02j\x02l\x02n\x02p\x02r\x02t\x02v\x02x\x02z\x02|\x02~\x02\x80" +
		"\x02\x82\x02\x84\x02\x86\x02\x88\x02\x8A\x02\x8C\x02\x8E\x02\x90\x02\x02" +
		"\x11\x04\x02\xB2\xB2\xD0\xD0\x03\x02\xB1\xB2\x05\x02\f\f\x0F\x0F\xB2\xB2" +
		"\x03\x02\xBD\xBE\x06\x0233KKPQTT\x04\x02sw\x7F\x80\x04\x02\x89\x8A\x8D" +
		"\x8D\b\x0200^_ffkk\x8B\x8C\x8E\x90\x03\x02\xD2\xD2\v\x02\'(*/449:<@LO" +
		"ggrr\xB2\xB2\x04\x02\xC2\xC5\xC7\xC7\x03\x02\xCB\xCC\x04\x02\xC9\xCA\xCE" +
		"\xCE\x04\x02\x91\xA8\xAB\xAF\x04\x02\xA9\xAA\xB0\xB1\x02\u0448\x02\x95" +
		"\x03\x02\x02\x02\x04\xC4\x03\x02\x02\x02\x06\xC6\x03\x02\x02\x02\b\xD7" +
		"\x03\x02\x02\x02\n\xE5\x03\x02\x02\x02\f\u010C\x03\x02\x02\x02\x0E\u0123" +
		"\x03\x02\x02\x02\x10\u0125\x03\x02\x02\x02\x12\u0141\x03\x02\x02\x02\x14" +
		"\u0147\x03\x02\x02\x02\x16\u0165\x03\x02\x02\x02\x18\u0169\x03\x02\x02" +
		"\x02\x1A\u0170\x03\x02\x02\x02\x1C\u0178\x03\x02\x02\x02\x1E\u017D\x03" +
		"\x02\x02\x02 \u0185\x03\x02\x02\x02\"\u01A9\x03\x02\x02\x02$\u01B1\x03" +
		"\x02\x02\x02&\u01BD\x03\x02\x02\x02(\u01C4\x03\x02\x02\x02*\u01CC\x03" +
		"\x02\x02\x02,\u01D4\x03\x02\x02\x02.\u01DC\x03\x02\x02\x020\u01DE\x03" +
		"\x02\x02\x022\u01E0\x03\x02\x02\x024\u01FC\x03\x02\x02\x026\u0202\x03" +
		"\x02\x02\x028\u0204\x03\x02\x02\x02:\u020C\x03\x02\x02\x02<\u022B\x03" +
		"\x02\x02\x02>\u0234\x03\x02\x02\x02@\u023F\x03\x02\x02\x02B\u024A\x03" +
		"\x02\x02\x02D\u024C\x03\x02\x02\x02F\u024E\x03\x02\x02\x02H\u0273\x03" +
		"\x02\x02\x02J\u0275\x03\x02\x02\x02L\u027D\x03\x02\x02\x02N\u0299\x03" +
		"\x02\x02\x02P\u02A6\x03\x02\x02\x02R\u02AE\x03\x02\x02\x02T\u02CA\x03" +
		"\x02\x02\x02V\u02D2\x03\x02\x02\x02X\u02F0\x03\x02\x02\x02Z\u02F5\x03" +
		"\x02\x02\x02\\\u0313\x03\x02\x02\x02^\u031F\x03\x02\x02\x02`\u0328\x03" +
		"\x02\x02\x02b\u032A\x03\x02\x02\x02d\u0339\x03\x02\x02\x02f\u0348\x03" +
		"\x02\x02\x02h\u0357\x03\x02\x02\x02j\u0368\x03\x02\x02\x02l\u0377\x03" +
		"\x02\x02\x02n\u037B\x03\x02\x02\x02p\u0383\x03\x02\x02\x02r\u0394\x03" +
		"\x02\x02\x02t\u0396\x03\x02\x02\x02v\u039E\x03\x02\x02\x02x\u03A0\x03" +
		"\x02\x02\x02z\u03A8\x03\x02\x02\x02|\u03B1\x03\x02\x02\x02~\u03BA\x03" +
		"\x02\x02\x02\x80\u03C2\x03\x02\x02\x02\x82\u03C4\x03\x02\x02\x02\x84\u03CC" +
		"\x03\x02\x02\x02\x86\u03D4\x03\x02\x02\x02\x88\u03DD\x03\x02\x02\x02\x8A" +
		"\u03E9\x03\x02\x02\x02\x8C\u03EB\x03\x02\x02\x02\x8E\u03F2\x03\x02\x02" +
		"\x02\x90\u03F7\x03\x02\x02\x02\x92\x94\x07\x04\x02\x02\x93\x92\x03\x02" +
		"\x02\x02\x94\x97\x03\x02\x02\x02\x95\x93\x03\x02\x02\x02\x95\x96\x03\x02" +
		"\x02\x02\x96\x9B\x03\x02\x02\x02\x97\x95\x03\x02\x02\x02\x98\x9A\x05\x04" +
		"\x03\x02\x99\x98\x03\x02\x02\x02\x9A\x9D\x03\x02\x02\x02\x9B\x99\x03\x02" +
		"\x02\x02\x9B\x9C\x03\x02\x02\x02\x9C\xB9\x03\x02\x02\x02\x9D\x9B\x03\x02" +
		"\x02\x02\x9E\x9F\x07\x06\x02\x02\x9F\xA1\x07\b\x02\x02\xA0\xA2\x07\x04" +
		"\x02\x02\xA1\xA0\x03\x02\x02\x02\xA2\xA3\x03\x02\x02\x02\xA3\xA1\x03\x02" +
		"\x02\x02\xA3\xA4\x03\x02\x02\x02\xA4\xA8\x03\x02\x02\x02\xA5\xA7\x05\x0E" +
		"\b\x02\xA6\xA5\x03\x02\x02\x02\xA7\xAA\x03\x02\x02\x02\xA8\xA6\x03\x02" +
		"\x02\x02\xA8\xA9\x03\x02\x02\x02\xA9\xAB\x03\x02\x02\x02\xAA\xA8\x03\x02" +
		"\x02\x02\xAB\xAC\x07\x07\x02\x02\xAC\xB0\x07\b\x02\x02\xAD\xAF\x07\x04" +
		"\x02\x02\xAE\xAD\x03\x02\x02\x02\xAF\xB2\x03\x02\x02\x02\xB0\xAE\x03\x02" +
		"\x02\x02\xB0\xB1\x03\x02\x02\x02\xB1\xBA\x03\x02\x02\x02\xB2\xB0\x03\x02" +
		"\x02\x02\xB3\xB5\x05\x0E\b\x02\xB4\xB3\x03\x02\x02\x02\xB5\xB8\x03\x02" +
		"\x02\x02\xB6\xB4\x03\x02\x02\x02\xB6\xB7\x03\x02\x02\x02\xB7\xBA\x03\x02" +
		"\x02\x02\xB8\xB6\x03\x02\x02\x02\xB9\x9E\x03\x02\x02\x02\xB9\xB6\x03\x02" +
		"\x02\x02\xBA\xBC\x03\x02\x02\x02\xBB\xBD\x05^0\x02\xBC\xBB\x03\x02\x02" +
		"\x02\xBC\xBD\x03\x02\x02\x02\xBD\xBE\x03\x02\x02\x02\xBE\xBF\x07\x02\x02" +
		"\x03\xBF\x03\x03\x02\x02\x02\xC0\xC5\x05\x06\x04\x02\xC1\xC5\x05\b\x05" +
		"\x02\xC2\xC5\x05\n\x06\x02\xC3\xC5\x05\f\x07\x02\xC4\xC0\x03\x02\x02\x02" +
		"\xC4\xC1\x03\x02\x02\x02\xC4\xC2\x03\x02\x02\x02\xC4\xC3\x03\x02\x02\x02" +
		"\xC5\x05\x03\x02\x02\x02\xC6\xC7\x07#\x02\x02\xC7\xC8\x07\xBB\x02\x02" +
		"\xC8\xC9\x07\xD2\x02\x02\xC9\xCB\x07\xD4\x02\x02\xCA\xCC\x07\xB2\x02\x02" +
		"\xCB\xCA\x03\x02\x02\x02\xCB\xCC\x03\x02\x02\x02\xCC\xCD\x03\x02\x02\x02" +
		"\xCD\xCE\x07\xD2\x02\x02\xCE\xD0\x07\xBC\x02\x02\xCF\xD1\x07\xB3\x02\x02" +
		"\xD0\xCF\x03\x02\x02\x02\xD0\xD1\x03\x02\x02\x02\xD1\xD3\x03\x02\x02\x02" +
		"\xD2\xD4\x07\x04\x02\x02\xD3\xD2\x03\x02\x02\x02\xD4\xD5\x03\x02\x02\x02" +
		"\xD5\xD3\x03\x02\x02\x02\xD5\xD6\x03\x02\x02\x02\xD6\x07\x03\x02\x02\x02" +
		"\xD7\xD8\x07&\x02\x02\xD8\xD9\x07\xBB\x02\x02\xD9\xDA\x07\xD2\x02\x02" +
		"\xDA\xDB\x07\xB2\x02\x02\xDB\xDC\x07\xD2\x02\x02\xDC\xDE\x07\xBC\x02\x02" +
		"\xDD\xDF\x07\xB3\x02\x02\xDE\xDD\x03\x02\x02\x02\xDE\xDF\x03\x02\x02\x02" +
		"\xDF\xE1\x03\x02\x02\x02\xE0\xE2\x07\x04\x02\x02\xE1\xE0\x03\x02\x02\x02" +
		"\xE2\xE3\x03\x02\x02\x02\xE3\xE1\x03\x02\x02\x02\xE3\xE4\x03\x02\x02\x02" +
		"\xE4\t\x03\x02\x02\x02\xE5\xE6\x07$\x02\x02\xE6\xE7\x07\xBB\x02\x02\xE7" +
		"\xE8\x07\xD2\x02\x02\xE8\xE9\x07\xB2\x02\x02\xE9\xEA\x07\xD2\x02\x02\xEA" +
		"\xF0\x07\xB9\x02\x02\xEB\xEC\x07\xD2\x02\x02\xEC\xED\x07\xB2\x02\x02\xED" +
		"\xF1\x07\xD2\x02\x02\xEE\xF1\x07\xB1\x02\x02\xEF\xF1\x07\xB0\x02\x02\xF0" +
		"\xEB\x03\x02\x02\x02\xF0\xEE\x03\x02\x02\x02\xF0\xEF\x03\x02\x02\x02\xF1" +
		"\u0100\x03\x02\x02\x02\xF2\xF3\x07\xB9\x02\x02\xF3\xF4\x07\xD2\x02\x02" +
		"\xF4\xF5\x07\xB2\x02\x02\xF5\xF6\x07\xD2\x02\x02\xF6\xFC\x07\xB9\x02\x02" +
		"\xF7\xF8\x07\xD2\x02\x02\xF8\xF9\x07\xB2\x02\x02\xF9\xFD\x07\xD2\x02\x02" +
		"\xFA\xFD\x07\xB1\x02\x02\xFB\xFD\x07\xB0\x02\x02\xFC\xF7\x03\x02\x02\x02" +
		"\xFC\xFA\x03\x02\x02\x02\xFC\xFB\x03\x02\x02\x02\xFD\xFF\x03\x02\x02\x02" +
		"\xFE\xF2\x03\x02\x02\x02\xFF\u0102\x03\x02\x02\x02\u0100\xFE\x03\x02\x02" +
		"\x02\u0100\u0101\x03\x02\x02\x02\u0101\u0103\x03\x02\x02\x02\u0102\u0100" +
		"\x03\x02\x02\x02\u0103\u0105\x07\xBC\x02\x02\u0104\u0106\x07\xB3\x02\x02" +
		"\u0105\u0104\x03\x02\x02\x02\u0105\u0106\x03\x02\x02\x02\u0106\u0108\x03" +
		"\x02\x02\x02\u0107\u0109\x07\x04\x02\x02\u0108\u0107\x03\x02\x02\x02\u0109" +
		"\u010A\x03\x02\x02\x02\u010A\u0108\x03\x02\x02\x02\u010A\u010B\x03\x02" +
		"\x02\x02\u010B\v\x03\x02\x02\x02\u010C\u010D\x07%\x02\x02\u010D\u010E" +
		"\x07\xBB\x02\x02\u010E\u010F\x07\xD2\x02\x02\u010F\u0110\x07\xB2\x02\x02" +
		"\u0110\u0111\x07\xD2\x02\x02\u0111\u0113\x07\xBC\x02\x02\u0112\u0114\x07" +
		"\xB3\x02\x02\u0113\u0112\x03\x02\x02\x02\u0113\u0114\x03\x02\x02\x02\u0114" +
		"\u0116\x03\x02\x02\x02\u0115\u0117\x07\x04\x02\x02\u0116\u0115\x03\x02" +
		"\x02\x02\u0117\u0118\x03\x02\x02\x02\u0118\u0116\x03\x02\x02\x02\u0118" +
		"\u0119\x03\x02\x02\x02\u0119\r\x03\x02\x02\x02\u011A\u0124\x05\x10\t\x02" +
		"\u011B\u0124\x05\x14\v\x02\u011C\u0124\x05 \x11\x02\u011D\u0124\x052\x1A" +
		"\x02\u011E\u0124\x05:\x1E\x02\u011F\u0124\x05L\'\x02\u0120\u0124\x05R" +
		"*\x02\u0121\u0124\x05V,\x02\u0122\u0124\x05Z.\x02\u0123\u011A\x03\x02" +
		"\x02\x02\u0123\u011B\x03\x02\x02\x02\u0123\u011C\x03\x02\x02\x02\u0123" +
		"\u011D\x03\x02\x02\x02\u0123\u011E\x03\x02\x02\x02\u0123\u011F\x03\x02" +
		"\x02\x02\u0123\u0120\x03\x02\x02\x02\u0123\u0121\x03\x02\x02\x02\u0123" +
		"\u0122\x03\x02\x02\x02\u0124\x0F\x03\x02\x02\x02\u0125\u0126\x07\x06\x02" +
		"\x02\u0126\u0128\x07\t\x02\x02\u0127\u0129\x07\x04\x02\x02\u0128\u0127" +
		"\x03\x02\x02\x02\u0129\u012A\x03\x02\x02\x02\u012A\u0128\x03\x02\x02\x02" +
		"\u012A\u012B\x03\x02\x02\x02\u012B\u0134\x03\x02\x02\x02\u012C\u012E\x05" +
		"\x12\n\x02\u012D\u012F\x07\x04\x02\x02\u012E\u012D\x03\x02\x02\x02\u012F" +
		"\u0130\x03\x02\x02\x02\u0130\u012E\x03\x02\x02\x02\u0130\u0131\x03\x02" +
		"\x02\x02\u0131\u0133\x03\x02\x02\x02\u0132\u012C\x03\x02\x02\x02\u0133" +
		"\u0136\x03\x02\x02\x02\u0134\u0132\x03\x02\x02\x02\u0134\u0135\x03\x02" +
		"\x02\x02\u0135\u0137\x03\x02\x02\x02\u0136\u0134\x03\x02\x02\x02\u0137" +
		"\u0138\x07\x07\x02\x02\u0138\u013C\x07\t\x02\x02\u0139\u013B\x07\x04\x02" +
		"\x02\u013A\u0139\x03\x02\x02\x02\u013B\u013E\x03\x02\x02\x02\u013C\u013A" +
		"\x03\x02\x02\x02\u013C\u013D\x03\x02\x02\x02\u013D\x11\x03\x02\x02\x02" +
		"\u013E\u013C\x03\x02\x02\x02\u013F\u0140\x07\xB2\x02\x02\u0140\u0142\x07" +
		"\xB4\x02\x02\u0141\u013F\x03\x02\x02\x02\u0141\u0142\x03\x02\x02\x02\u0142" +
		"\u0143\x03\x02\x02\x02\u0143\u0145\x07\xB2\x02\x02\u0144\u0146\x05v<\x02" +
		"\u0145\u0144\x03\x02\x02\x02\u0145\u0146\x03\x02\x02\x02\u0146\x13\x03" +
		"\x02\x02\x02\u0147\u0148\x07\x06\x02\x02\u0148\u0149\x07\v\x02\x02\u0149" +
		"\u014B\x07\r\x02\x02\u014A\u014C\x07\x04\x02\x02\u014B\u014A\x03\x02\x02" +
		"\x02\u014C\u014D\x03\x02\x02\x02\u014D\u014B\x03\x02\x02\x02\u014D\u014E" +
		"\x03\x02\x02\x02\u014E\u0157\x03\x02\x02\x02\u014F\u0151\x05\x16\f\x02" +
		"\u0150\u0152\x07\x04\x02\x02\u0151\u0150\x03\x02\x02\x02\u0152\u0153\x03" +
		"\x02\x02\x02\u0153\u0151\x03\x02\x02\x02\u0153\u0154\x03\x02\x02\x02\u0154" +
		"\u0156\x03\x02\x02\x02\u0155\u014F\x03\x02\x02\x02\u0156\u0159\x03\x02" +
		"\x02\x02\u0157\u0155\x03\x02\x02\x02\u0157\u0158\x03\x02\x02\x02\u0158" +
		"\u015A\x03\x02\x02\x02\u0159\u0157\x03\x02\x02\x02\u015A\u015B\x07\x07" +
		"\x02\x02\u015B\u015C\x07\v\x02\x02\u015C\u0160\x07\r\x02\x02\u015D\u015F" +
		"\x07\x04\x02\x02\u015E\u015D\x03\x02\x02\x02\u015F\u0162\x03\x02\x02\x02" +
		"\u0160\u015E\x03\x02\x02\x02\u0160\u0161\x03\x02\x02\x02\u0161\x15\x03" +
		"\x02\x02\x02\u0162\u0160\x03\x02\x02\x02\u0163\u0164\x07\xB2\x02\x02\u0164" +
		"\u0166\x07\xB4\x02\x02\u0165\u0163\x03\x02\x02\x02\u0165\u0166\x03\x02" +
		"\x02\x02\u0166\u0167\x03\x02\x02\x02\u0167\u0168\x05\x18\r\x02\u0168\x17" +
		"\x03\x02\x02\x02\u0169\u016A\x07\xB2\x02\x02\u016A\u016C\x07\xBB\x02\x02" +
		"\u016B\u016D\x05\x1A\x0E\x02\u016C\u016B\x03\x02\x02\x02\u016C\u016D\x03" +
		"\x02\x02\x02\u016D\u016E\x03\x02\x02\x02\u016E\u016F\x07\xBC\x02\x02\u016F" +
		"\x19\x03\x02\x02\x02\u0170\u0175\x05\x1C\x0F\x02\u0171\u0172\x07\xB9\x02" +
		"\x02\u0172\u0174\x05\x1C\x0F\x02\u0173\u0171\x03\x02\x02\x02\u0174\u0177" +
		"\x03\x02\x02\x02\u0175\u0173\x03\x02\x02\x02\u0175\u0176\x03\x02\x02\x02" +
		"\u0176\x1B\x03\x02\x02\x02\u0177\u0175\x03\x02\x02\x02\u0178\u017B\x07" +
		"\xB2\x02\x02\u0179\u017A\x07\xC0\x02\x02\u017A\u017C\x05\x1E\x10\x02\u017B" +
		"\u0179\x03\x02\x02\x02\u017B\u017C\x03\x02\x02\x02\u017C\x1D\x03\x02\x02" +
		"\x02\u017D\u0182\x07\xB2\x02\x02\u017E\u017F\x07\xC0\x02\x02\u017F\u0181" +
		"\x07\xB2\x02\x02\u0180\u017E\x03\x02\x02\x02\u0181\u0184\x03\x02\x02\x02" +
		"\u0182\u0180\x03\x02\x02\x02\u0182\u0183\x03\x02\x02\x02\u0183\x1F\x03" +
		"\x02\x02\x02\u0184\u0182\x03\x02\x02\x02\u0185\u0189\x07\x06\x02\x02\u0186" +
		"\u0187\x07\x0E\x02\x02\u0187\u018A\x07\x0F\x02\x02\u0188\u018A\x07\x0F" +
		"\x02\x02\u0189\u0186\x03\x02\x02\x02\u0189\u0188\x03\x02\x02\x02\u018A" +
		"\u018C\x03\x02\x02\x02\u018B\u018D\x07\x04\x02\x02\u018C\u018B\x03\x02" +
		"\x02\x02\u018D\u018E\x03\x02\x02\x02\u018E\u018C\x03\x02\x02\x02\u018E" +
		"\u018F\x03\x02\x02\x02\u018F\u0198\x03\x02\x02\x02\u0190\u0192\x05\"\x12" +
		"\x02\u0191\u0193\x07\x04\x02\x02\u0192\u0191\x03\x02\x02\x02\u0193\u0194" +
		"\x03\x02\x02\x02\u0194\u0192\x03\x02\x02\x02\u0194\u0195\x03\x02\x02\x02" +
		"\u0195\u0197\x03\x02\x02\x02\u0196\u0190\x03\x02\x02\x02\u0197\u019A\x03" +
		"\x02\x02\x02\u0198\u0196\x03\x02\x02\x02\u0198\u0199\x03\x02\x02\x02\u0199" +
		"\u019B\x03\x02\x02\x02\u019A\u0198\x03\x02\x02\x02\u019B\u019F\x07\x07" +
		"\x02\x02\u019C\u019D\x07\x0E\x02\x02\u019D\u01A0\x07\x0F\x02\x02\u019E" +
		"\u01A0\x07\x0F\x02\x02\u019F\u019C\x03\x02\x02\x02\u019F\u019E\x03\x02" +
		"\x02\x02\u01A0\u01A4\x03\x02\x02\x02\u01A1\u01A3\x07\x04\x02\x02\u01A2" +
		"\u01A1\x03\x02\x02\x02\u01A3\u01A6\x03\x02\x02\x02\u01A4\u01A2\x03\x02" +
		"\x02\x02\u01A4\u01A5\x03\x02\x02\x02\u01A5!\x03\x02\x02\x02\u01A6\u01A4" +
		"\x03\x02\x02\x02\u01A7\u01A8\x07\xB2\x02\x02\u01A8\u01AA\x07\xB4\x02\x02" +
		"\u01A9\u01A7\x03\x02\x02\x02\u01A9\u01AA\x03\x02\x02\x02\u01AA\u01AC\x03" +
		"\x02\x02\x02\u01AB\u01AD\x07\xBF\x02\x02\u01AC\u01AB\x03\x02\x02\x02\u01AC" +
		"\u01AD\x03\x02\x02\x02\u01AD\u01AE\x03\x02\x02\x02\u01AE\u01AF\x05$\x13" +
		"\x02\u01AF\u01B0\x05v<\x02\u01B0#\x03\x02\x02\x02\u01B1\u01B6\x05&\x14" +
		"\x02\u01B2";
	private static readonly _serializedATNSegment1: string =
		"\u01B3\x07\xBA\x02\x02\u01B3\u01B5\x05&\x14\x02\u01B4\u01B2\x03\x02\x02" +
		"\x02\u01B5\u01B8\x03\x02\x02\x02\u01B6\u01B4\x03\x02\x02\x02\u01B6\u01B7" +
		"\x03\x02\x02\x02\u01B7\u01BB\x03\x02\x02\x02\u01B8\u01B6\x03\x02\x02\x02" +
		"\u01B9\u01BA\x07\xC1\x02\x02\u01BA\u01BC\x07\xB2\x02\x02\u01BB\u01B9\x03" +
		"\x02\x02\x02\u01BB\u01BC\x03\x02\x02\x02\u01BC%\x03\x02\x02\x02\u01BD" +
		"\u01BE\x07\xB2\x02\x02\u01BE\u01C0\x07\xBB\x02\x02\u01BF\u01C1\x05(\x15" +
		"\x02\u01C0\u01BF\x03\x02\x02\x02\u01C0\u01C1\x03\x02\x02\x02\u01C1\u01C2" +
		"\x03\x02\x02\x02\u01C2\u01C3\x07\xBC\x02\x02\u01C3\'\x03\x02\x02\x02\u01C4" +
		"\u01C9\x05*\x16\x02\u01C5\u01C6\x07\xB9\x02\x02\u01C6\u01C8\x05*\x16\x02" +
		"\u01C7\u01C5\x03\x02\x02\x02\u01C8\u01CB\x03\x02\x02\x02\u01C9\u01C7\x03" +
		"\x02\x02\x02\u01C9\u01CA\x03\x02\x02\x02\u01CA)\x03\x02\x02\x02\u01CB" +
		"\u01C9\x03\x02\x02\x02\u01CC\u01CF\x07\xB2\x02\x02\u01CD\u01CE\x07\xC0" +
		"\x02\x02\u01CE\u01D0\x05,\x17\x02\u01CF\u01CD\x03\x02\x02\x02\u01CF\u01D0" +
		"\x03\x02\x02\x02\u01D0\u01D2\x03\x02\x02\x02\u01D1\u01D3\x05.\x18\x02" +
		"\u01D2\u01D1\x03\x02\x02\x02\u01D2\u01D3\x03\x02\x02\x02\u01D3+\x03\x02" +
		"\x02\x02\u01D4\u01D5\t\x02\x02\x02\u01D5-\x03\x02\x02\x02\u01D6\u01D7" +
		"\x07\xD1\x02\x02\u01D7\u01DD\x050\x19\x02\u01D8\u01D9\x07\xD1\x02\x02" +
		"\u01D9\u01DD\x07\xCC\x02\x02\u01DA\u01DB\x07\xD1\x02\x02\u01DB\u01DD\x07" +
		"\xD0\x02\x02\u01DC\u01D6\x03\x02\x02\x02\u01DC\u01D8\x03\x02\x02\x02\u01DC" +
		"\u01DA\x03\x02\x02\x02\u01DD/\x03\x02\x02\x02\u01DE\u01DF\t\x03\x02\x02" +
		"\u01DF1\x03\x02\x02\x02\u01E0\u01E1\x07\x06\x02\x02\u01E1\u01E3\x07\x10" +
		"\x02\x02\u01E2\u01E4\x07\x04\x02\x02\u01E3\u01E2\x03\x02\x02\x02\u01E4" +
		"\u01E5\x03\x02\x02\x02\u01E5\u01E3\x03\x02\x02\x02\u01E5\u01E6\x03\x02" +
		"\x02\x02\u01E6\u01EF\x03\x02\x02\x02\u01E7\u01E9\x054\x1B\x02\u01E8\u01EA" +
		"\x07\x04\x02\x02\u01E9\u01E8\x03\x02\x02\x02\u01EA\u01EB\x03\x02\x02\x02" +
		"\u01EB\u01E9\x03\x02\x02\x02\u01EB\u01EC\x03\x02\x02\x02\u01EC\u01EE\x03" +
		"\x02\x02\x02\u01ED\u01E7\x03\x02\x02\x02\u01EE\u01F1\x03\x02\x02\x02\u01EF" +
		"\u01ED\x03\x02\x02\x02\u01EF\u01F0\x03\x02\x02\x02\u01F0\u01F2\x03\x02" +
		"\x02\x02\u01F1\u01EF\x03\x02\x02\x02\u01F2\u01F3\x07\x07\x02\x02\u01F3" +
		"\u01F7\x07\x10\x02\x02\u01F4\u01F6\x07\x04\x02\x02\u01F5\u01F4\x03\x02" +
		"\x02\x02\u01F6\u01F9\x03\x02\x02\x02\u01F7\u01F5\x03\x02\x02\x02\u01F7" +
		"\u01F8\x03\x02\x02\x02\u01F83\x03\x02\x02\x02\u01F9\u01F7\x03\x02\x02" +
		"\x02\u01FA\u01FB\x07\xB2\x02\x02\u01FB\u01FD\x07\xB4\x02\x02\u01FC\u01FA" +
		"\x03\x02\x02\x02\u01FC\u01FD\x03\x02\x02\x02\u01FD\u01FE\x03\x02\x02\x02" +
		"\u01FE\u01FF\x056\x1C\x02\u01FF\u0200\x07\xB2\x02\x02\u0200\u0201\x05" +
		"8\x1D\x02\u02015\x03\x02\x02\x02\u0202\u0203\t\x04\x02\x02\u02037\x03" +
		"\x02\x02\x02\u0204\u0209\x05$\x13\x02\u0205\u0206\x07\xB9\x02\x02\u0206" +
		"\u0208\x05$\x13\x02\u0207\u0205\x03\x02\x02\x02\u0208\u020B\x03\x02\x02" +
		"\x02\u0209\u0207\x03\x02\x02\x02\u0209\u020A\x03\x02\x02\x02\u020A9\x03" +
		"\x02\x02\x02\u020B\u0209\x03\x02\x02\x02\u020C\u020D\x07\x06\x02\x02\u020D" +
		"\u020E\x07\x12\x02\x02\u020E\u0210\x07\x14\x02\x02\u020F\u0211\x07\x04" +
		"\x02\x02\u0210\u020F\x03\x02\x02\x02\u0211\u0212\x03\x02\x02\x02\u0212" +
		"\u0210\x03\x02\x02\x02\u0212\u0213\x03\x02\x02\x02\u0213\u021C\x03\x02" +
		"\x02\x02\u0214\u0216\x05<\x1F\x02\u0215\u0217\x07\x04\x02\x02\u0216\u0215" +
		"\x03\x02\x02\x02\u0217\u0218\x03\x02\x02\x02\u0218\u0216\x03\x02\x02\x02" +
		"\u0218\u0219\x03\x02\x02\x02\u0219\u021B\x03\x02\x02\x02\u021A\u0214\x03" +
		"\x02\x02\x02\u021B\u021E\x03\x02\x02\x02\u021C\u021A\x03\x02\x02\x02\u021C" +
		"\u021D\x03\x02\x02\x02\u021D\u021F\x03\x02\x02\x02\u021E\u021C\x03\x02" +
		"\x02\x02\u021F\u0220\x07\x07\x02\x02\u0220\u0221\x07\x12\x02\x02\u0221" +
		"\u0225\x07\x14\x02\x02\u0222\u0224\x07\x04\x02\x02\u0223\u0222\x03\x02" +
		"\x02\x02\u0224\u0227\x03\x02\x02\x02\u0225\u0223\x03\x02\x02\x02\u0225" +
		"\u0226\x03\x02\x02\x02\u0226;\x03\x02\x02\x02\u0227\u0225\x03\x02\x02" +
		"\x02\u0228\u0229\x05> \x02\u0229\u022A\x07\xB4\x02\x02\u022A\u022C\x03" +
		"\x02\x02\x02\u022B\u0228\x03\x02\x02\x02\u022B\u022C\x03\x02\x02\x02\u022C" +
		"\u022D\x03\x02\x02\x02\u022D\u022E\x05@!\x02\u022E\u022F\x05D#\x02\u022F" +
		"\u0230\x05B\"\x02\u0230\u0232\x05F$\x02\u0231\u0233\x05H%\x02\u0232\u0231" +
		"\x03\x02\x02\x02\u0232\u0233\x03\x02\x02\x02\u0233=\x03\x02\x02\x02\u0234" +
		"\u0235\t\x03\x02\x02\u0235?\x03\x02\x02\x02\u0236\u023B\x05$\x13\x02\u0237" +
		"\u0238\x07\xCC\x02\x02\u0238\u023A\x05$\x13\x02\u0239\u0237\x03\x02\x02" +
		"\x02\u023A\u023D\x03\x02\x02\x02\u023B\u0239\x03\x02\x02\x02\u023B\u023C" +
		"\x03\x02\x02\x02\u023C\u0240\x03\x02\x02\x02\u023D\u023B\x03\x02\x02\x02" +
		"\u023E\u0240\x07\xB1\x02\x02\u023F\u0236\x03\x02\x02\x02\u023F\u023E\x03" +
		"\x02\x02\x02\u0240A\x03\x02\x02\x02\u0241\u0246\x05$\x13\x02\u0242\u0243" +
		"\x07\xCC\x02\x02\u0243\u0245\x05$\x13\x02\u0244\u0242\x03\x02\x02\x02" +
		"\u0245\u0248\x03\x02\x02\x02\u0246\u0244\x03\x02\x02\x02\u0246\u0247\x03" +
		"\x02\x02\x02\u0247\u024B\x03\x02\x02\x02\u0248\u0246\x03\x02\x02\x02\u0249" +
		"\u024B\x07\xB1\x02\x02\u024A\u0241\x03\x02\x02\x02\u024A\u0249\x03\x02" +
		"\x02\x02\u024BC\x03\x02\x02\x02\u024C\u024D\t\x05\x02\x02\u024DE\x03\x02" +
		"\x02\x02\u024E\u0251\x05v<\x02\u024F\u0250\x07\xB9\x02\x02\u0250\u0252" +
		"\x05v<\x02\u0251\u024F\x03\x02\x02\x02\u0251\u0252\x03\x02\x02\x02\u0252" +
		"G\x03\x02\x02\x02\u0253\u0274\x07\x1C\x02\x02\u0254\u0274\x07\x1D\x02" +
		"\x02\u0255\u0274\x07\x1B\x02\x02\u0256\u0274\x07\"\x02\x02\u0257\u0258" +
		"\x07\x1E\x02\x02\u0258\u0259\x07\xBB\x02\x02\u0259\u025A\x07\xB1\x02\x02" +
		"\u025A\u025B\x07\xB9\x02\x02\u025B\u025C\x05J&\x02\u025C\u025D\x07\xBC" +
		"\x02\x02\u025D\u0274\x03\x02\x02\x02\u025E\u025F\x07 \x02\x02\u025F\u0260" +
		"\x07\xBB\x02\x02\u0260\u0261\x07\xB1\x02\x02\u0261\u0262\x07\xB9\x02\x02" +
		"\u0262\u0263\x05J&\x02\u0263\u0264\x07\xBC\x02\x02\u0264\u0274\x03\x02" +
		"\x02\x02\u0265\u0266\x07\x1F\x02\x02\u0266\u0267\x07\xBB\x02\x02\u0267" +
		"\u0268\x07\xB1\x02\x02\u0268\u0269\x07\xB9\x02\x02\u0269\u026A\x05J&\x02" +
		"\u026A\u026B\x07\xBC\x02\x02\u026B\u0274\x03\x02\x02\x02\u026C\u026D\x07" +
		"!\x02\x02\u026D\u026E\x07\xBB\x02\x02\u026E\u026F\x07\xB1\x02\x02\u026F" +
		"\u0270\x07\xB9\x02\x02\u0270\u0271\x05J&\x02\u0271\u0272\x07\xBC\x02\x02" +
		"\u0272\u0274\x03\x02\x02\x02\u0273\u0253\x03\x02\x02\x02\u0273\u0254\x03" +
		"\x02\x02\x02\u0273\u0255\x03\x02\x02\x02\u0273\u0256\x03\x02\x02\x02\u0273" +
		"\u0257\x03\x02\x02\x02\u0273\u025E\x03\x02\x02\x02\u0273\u0265\x03\x02" +
		"\x02\x02\u0273\u026C\x03\x02\x02\x02\u0274I\x03\x02\x02\x02\u0275\u027A" +
		"\x05$\x13\x02\u0276\u0277\x07\xB9\x02\x02\u0277\u0279\x05$\x13\x02\u0278" +
		"\u0276\x03\x02\x02\x02\u0279\u027C\x03\x02\x02\x02\u027A\u0278\x03\x02" +
		"\x02\x02\u027A\u027B\x03\x02\x02\x02\u027BK\x03\x02\x02\x02\u027C\u027A" +
		"\x03\x02\x02\x02\u027D\u027E\x07\x06\x02\x02\u027E\u0280\x07\x11\x02\x02" +
		"\u027F\u0281\x07\x04\x02\x02\u0280\u027F\x03\x02\x02\x02\u0281\u0282\x03" +
		"\x02\x02\x02\u0282\u0280\x03\x02\x02\x02\u0282\u0283\x03\x02\x02\x02\u0283" +
		"\u028C\x03\x02\x02\x02\u0284\u0286\x05N(\x02\u0285\u0287\x07\x04\x02\x02" +
		"\u0286\u0285\x03\x02\x02\x02\u0287\u0288\x03\x02\x02\x02\u0288\u0286\x03" +
		"\x02\x02\x02\u0288\u0289\x03\x02\x02\x02\u0289\u028B\x03\x02\x02\x02\u028A" +
		"\u0284\x03\x02\x02\x02\u028B\u028E\x03\x02\x02\x02\u028C\u028A\x03\x02" +
		"\x02\x02\u028C\u028D\x03\x02\x02\x02\u028D\u028F\x03\x02\x02\x02\u028E" +
		"\u028C\x03\x02\x02\x02\u028F\u0290\x07\x07\x02\x02\u0290\u0294\x07\x11" +
		"\x02\x02\u0291\u0293\x07\x04\x02\x02\u0292\u0291\x03\x02\x02\x02\u0293" +
		"\u0296\x03\x02\x02\x02\u0294\u0292\x03\x02\x02\x02\u0294\u0295\x03\x02" +
		"\x02\x02\u0295M\x03\x02\x02\x02\u0296\u0294\x03\x02\x02\x02\u0297\u0298" +
		"\x07\xB2\x02\x02\u0298\u029A\x07\xB4\x02\x02\u0299\u0297\x03\x02\x02\x02" +
		"\u0299\u029A\x03\x02\x02\x02\u029A\u029B\x03\x02\x02\x02\u029B\u029C\x07" +
		"\xB2\x02\x02\u029C\u029E\x07\xBB\x02\x02\u029D\u029F\x05P)\x02\u029E\u029D" +
		"\x03\x02\x02\x02\u029E\u029F\x03\x02\x02\x02\u029F\u02A0\x03\x02\x02\x02" +
		"\u02A0\u02A2\x07\xBC\x02\x02\u02A1\u02A3\x07\xC8\x02\x02\u02A2\u02A1\x03" +
		"\x02\x02\x02\u02A2\u02A3\x03\x02\x02\x02\u02A3\u02A4\x03\x02\x02\x02\u02A4" +
		"\u02A5\x05v<\x02\u02A5O\x03\x02\x02\x02\u02A6\u02AB\x07\xB2\x02\x02\u02A7" +
		"\u02A8\x07\xB9\x02\x02\u02A8\u02AA\x07\xB2\x02\x02\u02A9\u02A7\x03\x02" +
		"\x02\x02\u02AA\u02AD\x03\x02\x02\x02\u02AB\u02A9\x03\x02\x02\x02\u02AB" +
		"\u02AC\x03\x02\x02\x02\u02ACQ\x03\x02\x02\x02\u02AD\u02AB\x03\x02\x02" +
		"\x02\u02AE\u02AF\x07\x06\x02\x02\u02AF\u02B1\x07\n\x02\x02\u02B0\u02B2" +
		"\x07\x04\x02\x02\u02B1\u02B0\x03\x02\x02\x02\u02B2\u02B3\x03\x02\x02\x02" +
		"\u02B3\u02B1\x03\x02\x02\x02\u02B3\u02B4\x03\x02\x02\x02\u02B4\u02BD\x03" +
		"\x02\x02\x02\u02B5\u02B7\x05T+\x02\u02B6\u02B8\x07\x04\x02\x02\u02B7\u02B6" +
		"\x03\x02\x02\x02\u02B8\u02B9\x03\x02\x02\x02\u02B9\u02B7\x03\x02\x02\x02" +
		"\u02B9\u02BA\x03\x02\x02\x02\u02BA\u02BC\x03\x02\x02\x02\u02BB\u02B5\x03" +
		"\x02\x02\x02\u02BC\u02BF\x03\x02\x02\x02\u02BD\u02BB\x03\x02\x02\x02\u02BD" +
		"\u02BE\x03\x02\x02\x02\u02BE\u02C0\x03\x02\x02\x02\u02BF\u02BD\x03\x02" +
		"\x02\x02\u02C0\u02C1\x07\x07\x02\x02\u02C1\u02C5\x07\n\x02\x02\u02C2\u02C4" +
		"\x07\x04\x02\x02\u02C3\u02C2\x03\x02\x02\x02\u02C4\u02C7\x03\x02\x02\x02" +
		"\u02C5\u02C3\x03\x02\x02\x02\u02C5\u02C6\x03\x02\x02\x02\u02C6S\x03\x02" +
		"\x02\x02\u02C7\u02C5\x03\x02\x02\x02\u02C8\u02C9\x07\xB2\x02\x02\u02C9" +
		"\u02CB\x07\xB4\x02\x02\u02CA\u02C8\x03\x02\x02\x02\u02CA\u02CB\x03\x02" +
		"\x02\x02\u02CB\u02CC\x03\x02\x02\x02\u02CC\u02CD\x07\xB2\x02\x02\u02CD" +
		"\u02CE\x07\xB1\x02\x02\u02CE\u02D0\x05v<\x02\u02CF\u02D1\x07\xB2\x02\x02" +
		"\u02D0\u02CF\x03\x02\x02\x02\u02D0\u02D1\x03\x02\x02\x02\u02D1U\x03\x02" +
		"\x02\x02\u02D2\u02D3\x07\x06\x02\x02\u02D3\u02D4\x07\x19\x02\x02\u02D4" +
		"\u02D6\x07\x1A\x02\x02\u02D5\u02D7\x07\x04\x02\x02\u02D6\u02D5\x03\x02" +
		"\x02\x02\u02D7\u02D8\x03\x02\x02\x02\u02D8\u02D6\x03\x02\x02\x02\u02D8" +
		"\u02D9\x03\x02\x02\x02\u02D9\u02E2\x03\x02\x02\x02\u02DA\u02DC\x05X-\x02" +
		"\u02DB\u02DD\x07\x04\x02\x02\u02DC\u02DB\x03\x02\x02\x02\u02DD\u02DE\x03" +
		"\x02\x02\x02\u02DE\u02DC\x03\x02\x02\x02\u02DE\u02DF\x03\x02\x02\x02\u02DF" +
		"\u02E1\x03\x02\x02\x02\u02E0\u02DA\x03\x02\x02\x02\u02E1\u02E4\x03\x02" +
		"\x02\x02\u02E2\u02E0\x03\x02\x02\x02\u02E2\u02E3\x03\x02\x02\x02\u02E3" +
		"\u02E5\x03\x02\x02\x02\u02E4\u02E2\x03\x02\x02\x02\u02E5\u02E6\x07\x07" +
		"\x02\x02\u02E6\u02E7\x07\x19\x02\x02\u02E7\u02EB\x07\x1A\x02\x02\u02E8" +
		"\u02EA\x07\x04\x02\x02\u02E9\u02E8\x03\x02\x02\x02\u02EA\u02ED\x03\x02" +
		"\x02\x02\u02EB\u02E9\x03\x02\x02\x02\u02EB\u02EC\x03\x02\x02\x02\u02EC" +
		"W\x03\x02\x02\x02\u02ED\u02EB\x03\x02\x02\x02\u02EE\u02EF\x07\xB2\x02" +
		"\x02\u02EF\u02F1\x07\xB4\x02\x02\u02F0\u02EE\x03\x02\x02\x02\u02F0\u02F1" +
		"\x03\x02\x02\x02\u02F1\u02F2\x03\x02\x02\x02\u02F2\u02F3\x05$\x13\x02" +
		"\u02F3\u02F4\x05v<\x02\u02F4Y\x03\x02\x02\x02\u02F5\u02F6\x07\x06\x02" +
		"\x02\u02F6\u02F7\x07\x17\x02\x02\u02F7\u02F9\x07\x18\x02\x02\u02F8\u02FA" +
		"\x07\x04\x02\x02\u02F9\u02F8\x03\x02\x02\x02\u02FA\u02FB\x03\x02\x02\x02" +
		"\u02FB\u02F9\x03\x02\x02\x02\u02FB\u02FC\x03\x02\x02\x02\u02FC\u0305\x03" +
		"\x02\x02\x02\u02FD\u02FF\x05\\/\x02\u02FE\u0300\x07\x04\x02\x02\u02FF" +
		"\u02FE\x03\x02\x02\x02\u0300\u0301\x03\x02\x02\x02\u0301\u02FF\x03\x02" +
		"\x02\x02\u0301\u0302\x03\x02\x02\x02\u0302\u0304\x03\x02\x02\x02\u0303" +
		"\u02FD\x03\x02\x02\x02\u0304\u0307\x03\x02\x02\x02\u0305\u0303\x03\x02" +
		"\x02\x02\u0305\u0306\x03\x02\x02\x02\u0306\u0308\x03\x02\x02\x02\u0307" +
		"\u0305\x03\x02\x02\x02\u0308\u0309\x07\x07\x02\x02\u0309\u030A\x07\x17" +
		"\x02\x02\u030A\u030E\x07\x18\x02\x02\u030B\u030D\x07\x04\x02\x02\u030C" +
		"\u030B\x03\x02\x02\x02\u030D\u0310\x03\x02\x02\x02\u030E\u030C\x03\x02" +
		"\x02\x02\u030E\u030F\x03\x02\x02\x02\u030F[\x03\x02\x02\x02\u0310\u030E" +
		"\x03\x02\x02\x02\u0311\u0312\x07\xB2\x02\x02\u0312\u0314\x07\xB4\x02\x02" +
		"\u0313\u0311\x03\x02\x02\x02\u0313\u0314\x03\x02\x02\x02\u0314\u0315\x03" +
		"\x02\x02\x02\u0315\u0316\x05$\x13\x02\u0316\u0317\x07\xBD\x02\x02\u0317" +
		"\u0318\x07\xB2\x02\x02\u0318\u031A\x07\xBB\x02\x02\u0319\u031B\x05P)\x02" +
		"\u031A\u0319\x03\x02\x02\x02\u031A\u031B\x03\x02\x02\x02\u031B\u031C\x03" +
		"\x02\x02\x02\u031C\u031D\x07\xBC\x02\x02\u031D]\x03\x02\x02\x02\u031E" +
		"\u0320\x05`1\x02\u031F\u031E\x03\x02\x02\x02\u0320\u0321\x03\x02\x02\x02" +
		"\u0321\u031F\x03\x02\x02\x02\u0321\u0322\x03\x02\x02\x02\u0322_\x03\x02" +
		"\x02\x02\u0323\u0329\x05b2\x02\u0324\u0329\x05d3\x02\u0325\u0329\x05f" +
		"4\x02\u0326\u0329\x05h5\x02\u0327\u0329\x05j6\x02\u0328\u0323\x03\x02" +
		"\x02\x02\u0328\u0324\x03\x02\x02\x02\u0328\u0325\x03\x02\x02\x02\u0328" +
		"\u0326\x03\x02\x02\x02\u0328\u0327\x03\x02\x02\x02\u0329a\x03\x02\x02" +
		"\x02\u032A\u032B\x07)\x02\x02\u032B\u032D\x07\xBB\x02\x02\u032C\u032E" +
		"\x05l7\x02\u032D\u032C\x03\x02\x02\x02\u032D\u032E\x03\x02\x02\x02\u032E" +
		"\u032F\x03\x02\x02\x02\u032F\u0331\x07\xBC\x02\x02\u0330\u0332\x07\xB3" +
		"\x02\x02\u0331\u0330\x03\x02\x02\x02\u0331\u0332\x03\x02\x02\x02\u0332" +
		"\u0336\x03\x02\x02\x02\u0333\u0335\x07\x04\x02\x02\u0334\u0333\x03\x02" +
		"\x02\x02\u0335\u0338\x03\x02\x02\x02\u0336\u0334\x03\x02\x02\x02\u0336" +
		"\u0337\x03\x02\x02\x02\u0337c\x03\x02\x02\x02\u0338\u0336\x03\x02\x02" +
		"\x02\u0339\u033A\t\x06\x02\x02\u033A\u033C\x07\xBB\x02\x02\u033B\u033D" +
		"\x05l7\x02\u033C\u033B\x03\x02\x02\x02\u033C\u033D\x03\x02\x02\x02\u033D" +
		"\u033E\x03\x02\x02\x02\u033E\u0340\x07\xBC\x02\x02\u033F\u0341\x07\xB3" +
		"\x02\x02\u0340\u033F\x03\x02\x02\x02\u0340\u0341\x03\x02\x02\x02\u0341" +
		"\u0345\x03\x02\x02\x02\u0342\u0344\x07\x04\x02\x02\u0343\u0342\x03\x02" +
		"\x02\x02\u0344\u0347\x03\x02\x02\x02\u0345\u0343\x03\x02\x02\x02\u0345" +
		"\u0346\x03\x02\x02\x02\u0346e\x03\x02\x02\x02\u0347\u0345\x03\x02\x02" +
		"\x02\u0348\u0349\t\x07\x02\x02\u0349\u034B\x07\xBB\x02\x02\u034A\u034C" +
		"\x05l7\x02\u034B\u034A\x03\x02\x02\x02\u034B\u034C\x03\x02\x02\x02\u034C" +
		"\u034D\x03\x02\x02\x02\u034D\u034F\x07\xBC\x02\x02\u034E\u0350\x07\xB3" +
		"\x02\x02\u034F\u034E\x03\x02\x02\x02\u034F\u0350\x03\x02\x02\x02\u0350" +
		"\u0354\x03\x02\x02\x02\u0351\u0353\x07\x04\x02\x02\u0352\u0351\x03\x02" +
		"\x02\x02\u0353\u0356\x03\x02\x02\x02\u0354\u0352\x03\x02\x02\x02\u0354" +
		"\u0355\x03\x02\x02\x02\u0355g\x03\x02\x02\x02\u0356\u0354\x03\x02\x02" +
		"\x02\u0357\u0358\t\b\x02\x02\u0358\u0359\x07\xBB\x02\x02\u0359\u035A\x07" +
		"\xD2\x02\x02\u035A\u035B\x05$\x13\x02\u035B\u035C\x07\xD2\x02\x02\u035C" +
		"\u035D\x07\xB9\x02\x02\u035D\u035E\x05v<\x02\u035E\u0360\x07\xBC\x02\x02" +
		"\u035F\u0361\x07\xB3\x02\x02\u0360\u035F\x03\x02\x02\x02\u0360\u0361\x03" +
		"\x02\x02\x02\u0361\u0365\x03\x02\x02\x02\u0362\u0364\x07\x04\x02\x02\u0363" +
		"\u0362\x03\x02\x02\x02\u0364\u0367\x03\x02\x02\x02\u0365\u0363\x03\x02" +
		"\x02\x02\u0365\u0366\x03\x02\x02\x02\u0366i\x03\x02\x02\x02\u0367\u0365" +
		"\x03\x02\x02\x02\u0368\u0369\t\t\x02\x02\u0369\u036B\x07\xBB\x02\x02\u036A" +
		"\u036C\x05l7\x02\u036B\u036A\x03\x02\x02\x02\u036B\u036C\x03\x02\x02\x02" +
		"\u036C\u036D\x03\x02\x02\x02\u036D\u036F\x07\xBC\x02\x02\u036E\u0370\x07" +
		"\xB3\x02\x02\u036F\u036E\x03\x02\x02\x02\u036F\u0370\x03\x02\x02\x02\u0370" +
		"\u0374\x03\x02\x02\x02\u0371\u0373\x07\x04\x02\x02\u0372\u0371\x03\x02" +
		"\x02\x02\u0373\u0376\x03\x02\x02\x02\u0374\u0372\x03\x02\x02\x02\u0374" +
		"\u0375\x03\x02\x02\x02\u0375k\x03\x02\x02\x02\u0376\u0374\x03\x02\x02" +
		"\x02\u0377\u0378\x07\xB7\x02\x02\u0378\u0379\x05n8\x02\u0379\u037A\x07" +
		"\xB8\x02\x02\u037Am\x03\x02\x02\x02\u037B\u0380\x05p9\x02\u037C\u037D" +
		"\x07\xB9\x02\x02\u037D\u037F\x05p9\x02\u037E\u037C\x03\x02\x02\x02\u037F" +
		"\u0382\x03\x02\x02\x02\u0380\u037E\x03\x02\x02\x02\u0380\u0381\x03\x02" +
		"\x02\x02\u0381o\x03\x02\x02\x02\u0382\u0380\x03\x02\x02\x02\u0383\u0384" +
		"\x05r:\x02\u0384\u0392\x07\xC6\x02\x02\u0385\u0393\x05v<\x02\u0386\u038A" +
		"\x07\xD2\x02\x02\u0387\u0389\n\n\x02\x02\u0388\u0387\x03\x02\x02\x02\u0389" +
		"\u038C\x03\x02\x02\x02\u038A\u0388\x03\x02\x02\x02\u038A\u038B\x03\x02" +
		"\x02\x02\u038B\u038D\x03\x02\x02\x02\u038C\u038A\x03\x02\x02\x02\u038D" +
		"\u0393\x07\xD2\x02\x02\u038E\u038F\x07\xB5\x02\x02\u038F\u0390\x05t;\x02" +
		"\u0390\u0391\x07\xB6\x02\x02\u0391\u0393\x03\x02\x02\x02\u0392\u0385\x03" +
		"\x02\x02\x02\u0392\u0386\x03\x02\x02\x02\u0392\u038E\x03\x02\x02\x02\u0393" +
		"q\x03\x02\x02\x02\u0394\u0395\t\v\x02\x02\u0395s\x03\x02\x02\x02\u0396" +
		"\u039B\x05v<\x02\u0397\u0398\x07\xB9\x02\x02\u0398\u039A\x05v<\x02\u0399" +
		"\u0397\x03\x02\x02\x02\u039A\u039D\x03\x02\x02\x02\u039B\u0399\x03\x02" +
		"\x02\x02\u039B\u039C\x03\x02\x02\x02\u039Cu\x03\x02\x02\x02\u039D\u039B" +
		"\x03\x02\x02\x02\u039E\u039F\x05x=\x02\u039Fw\x03\x02\x02\x02\u03A0\u03A6" +
		"\x05z>\x02\u03A1\u03A2\x07\xD0\x02\x02\u03A2\u03A3\x05v<\x02\u03A3\u03A4" +
		"\x07\xB4\x02\x02\u03A4\u03A5\x05v<\x02\u03A5\u03A7\x03\x02\x02\x02\u03A6" +
		"\u03A1\x03\x02\x02\x02\u03A6\u03A7\x03\x02\x02\x02\u03A7y\x03\x02\x02" +
		"\x02\u03A8\u03AE\x05|?\x02\u03A9\u03AA\x07\xCF\x02\x02\u03AA\u03AB\x07" +
		"\xCF\x02\x02\u03AB\u03AD\x05|?\x02\u03AC\u03A9\x03\x02\x02\x02\u03AD\u03B0" +
		"\x03\x02\x02\x02\u03AE\u03AC\x03\x02\x02\x02\u03AE\u03AF\x03\x02\x02\x02" +
		"\u03AF{\x03\x02\x02\x02\u03B0\u03AE\x03\x02\x02\x02\u03B1\u03B7\x05~@" +
		"\x02\u03B2\u03B3\x07\xD3\x02\x02\u03B3\u03B4\x07\xD3\x02\x02\u03B4\u03B6" +
		"\x05~@\x02\u03B5\u03B2\x03\x02\x02\x02\u03B6\u03B9\x03\x02\x02\x02\u03B7" +
		"\u03B5\x03\x02\x02\x02\u03B7\u03B8\x03\x02\x02\x02\u03B8}\x03\x02\x02" +
		"\x02\u03B9\u03B7\x03\x02\x02\x02\u03BA\u03BF\x05\x80A\x02\u03BB\u03BC" +
		"\t\f\x02\x02\u03BC\u03BE\x05\x80A\x02\u03BD\u03BB\x03\x02\x02\x02\u03BE" +
		"\u03C1\x03\x02\x02\x02\u03BF\u03BD\x03\x02\x02\x02\u03BF\u03C0\x03\x02" +
		"\x02\x02\u03C0\x7F\x03\x02\x02\x02\u03C1\u03BF\x03\x02\x02\x02\u03C2\u03C3" +
		"\x05\x82B\x02\u03C3\x81\x03\x02\x02\x02\u03C4\u03C9\x05\x84C\x02\u03C5" +
		"\u03C6\t\r\x02\x02\u03C6\u03C8\x05\x84C\x02\u03C7\u03C5\x03\x02\x02\x02" +
		"\u03C8\u03CB\x03\x02\x02\x02\u03C9\u03C7\x03\x02\x02\x02\u03C9\u03CA\x03" +
		"\x02\x02\x02\u03CA\x83\x03\x02\x02\x02\u03CB\u03C9\x03\x02\x02\x02\u03CC" +
		"\u03D1\x05\x86D\x02\u03CD\u03CE\t\x0E\x02\x02\u03CE\u03D0\x05\x86D\x02" +
		"\u03CF\u03CD\x03\x02\x02\x02\u03D0\u03D3\x03\x02\x02\x02\u03D1\u03CF\x03" +
		"\x02\x02\x02\u03D1\u03D2\x03\x02\x02\x02\u03D2\x85\x03\x02\x02\x02\u03D3" +
		"\u03D1\x03\x02\x02\x02\u03D4\u03D9\x05\x88E\x02\u03D5\u03D6\x07\xCD\x02" +
		"\x02\u03D6\u03D8\x05\x88E\x02\u03D7\u03D5\x03\x02\x02\x02\u03D8\u03DB" +
		"\x03\x02\x02\x02\u03D9\u03D7\x03\x02\x02\x02\u03D9\u03DA\x03\x02\x02\x02" +
		"\u03DA\x87\x03\x02\x02\x02\u03DB\u03D9\x03\x02\x02\x02\u03DC\u03DE\t\r" +
		"\x02\x02\u03DD\u03DC\x03\x02\x02\x02\u03DD\u03DE\x03\x02\x02\x02\u03DE" +
		"\u03DF\x03\x02\x02\x02\u03DF\u03E0\x05\x8AF\x02\u03E0\x89\x03\x02\x02" +
		"\x02\u03E1\u03E2\x07\xBB\x02\x02\u03E2\u03E3\x05v<\x02\u03E3\u03E4\x07" +
		"\xBC\x02\x02\u03E4\u03EA\x03\x02\x02\x02\u03E5\u03EA\x05\x8CG\x02\u03E6" +
		"\u03EA\x05\x8EH\x02\u03E7\u03EA\x05\x90I\x02\u03E8\u03EA\x07\xB2\x02\x02" +
		"\u03E9\u03E1\x03\x02\x02\x02\u03E9\u03E5\x03\x02\x02\x02\u03E9\u03E6\x03" +
		"\x02\x02\x02\u03E9\u03E7\x03\x02\x02\x02\u03E9\u03E8\x03\x02\x02\x02\u03EA" +
		"\x8B\x03\x02\x02\x02\u03EB\u03EC\t\x0F\x02\x02\u03EC\u03EE\x07\xBB\x02" +
		"\x02\u03ED\u03EF\x05t;\x02\u03EE\u03ED\x03\x02\x02\x02\u03EE\u03EF\x03" +
		"\x02\x02\x02\u03EF\u03F0\x03\x02\x02\x02\u03F0\u03F1\x07\xBC\x02\x02\u03F1" +
		"\x8D\x03\x02\x02\x02\u03F2\u03F3\x07\xB2\x02\x02\u03F3\u03F4\x07\xBB\x02" +
		"\x02\u03F4\u03F5\x05v<\x02\u03F5\u03F6\x07\xBC\x02\x02\u03F6\x8F\x03\x02" +
		"\x02\x02\u03F7\u03F8\t\x10\x02\x02\u03F8\x91\x03\x02\x02\x02\x80\x95\x9B" +
		"\xA3\xA8\xB0\xB6\xB9\xBC\xC4\xCB\xD0\xD5\xDE\xE3\xF0\xFC\u0100\u0105\u010A" +
		"\u0113\u0118\u0123\u012A\u0130\u0134\u013C\u0141\u0145\u014D\u0153\u0157" +
		"\u0160\u0165\u016C\u0175\u017B\u0182\u0189\u018E\u0194\u0198\u019F\u01A4" +
		"\u01A9\u01AC\u01B6\u01BB\u01C0\u01C9\u01CF\u01D2\u01DC\u01E5\u01EB\u01EF" +
		"\u01F7\u01FC\u0209\u0212\u0218\u021C\u0225\u022B\u0232\u023B\u023F\u0246" +
		"\u024A\u0251\u0273\u027A\u0282\u0288\u028C\u0294\u0299\u029E\u02A2\u02AB" +
		"\u02B3\u02B9\u02BD\u02C5\u02CA\u02D0\u02D8\u02DE\u02E2\u02EB\u02F0\u02FB" +
		"\u0301\u0305\u030E\u0313\u031A\u0321\u0328\u032D\u0331\u0336\u033C\u0340" +
		"\u0345\u034B\u034F\u0354\u0360\u0365\u036B\u036F\u0374\u0380\u038A\u0392" +
		"\u039B\u03A6\u03AE\u03B7\u03BF\u03C9\u03D1\u03D9\u03DD\u03E9\u03EE";
	public static readonly _serializedATN: string = Utils.join(
		[
			BNGParser._serializedATNSegment0,
			BNGParser._serializedATNSegment1,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!BNGParser.__ATN) {
			BNGParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(BNGParser._serializedATN));
		}

		return BNGParser.__ATN;
	}

}

export class ProgContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(BNGParser.EOF, 0); }
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	public header_block(): Header_blockContext[];
	public header_block(i: number): Header_blockContext;
	public header_block(i?: number): Header_blockContext | Header_blockContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Header_blockContext);
		} else {
			return this.getRuleContext(i, Header_blockContext);
		}
	}
	public actions_block(): Actions_blockContext | undefined {
		return this.tryGetRuleContext(0, Actions_blockContext);
	}
	public BEGIN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.BEGIN, 0); }
	public MODEL(): TerminalNode[];
	public MODEL(i: number): TerminalNode;
	public MODEL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.MODEL);
		} else {
			return this.getToken(BNGParser.MODEL, i);
		}
	}
	public END(): TerminalNode | undefined { return this.tryGetToken(BNGParser.END, 0); }
	public program_block(): Program_blockContext[];
	public program_block(i: number): Program_blockContext;
	public program_block(i?: number): Program_blockContext | Program_blockContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Program_blockContext);
		} else {
			return this.getRuleContext(i, Program_blockContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_prog; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterProg) {
			listener.enterProg(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitProg) {
			listener.exitProg(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitProg) {
			return visitor.visitProg(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Header_blockContext extends ParserRuleContext {
	public version_def(): Version_defContext | undefined {
		return this.tryGetRuleContext(0, Version_defContext);
	}
	public substance_def(): Substance_defContext | undefined {
		return this.tryGetRuleContext(0, Substance_defContext);
	}
	public set_option(): Set_optionContext | undefined {
		return this.tryGetRuleContext(0, Set_optionContext);
	}
	public set_model_name(): Set_model_nameContext | undefined {
		return this.tryGetRuleContext(0, Set_model_nameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_header_block; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterHeader_block) {
			listener.enterHeader_block(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitHeader_block) {
			listener.exitHeader_block(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitHeader_block) {
			return visitor.visitHeader_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Version_defContext extends ParserRuleContext {
	public VERSION(): TerminalNode { return this.getToken(BNGParser.VERSION, 0); }
	public LPAREN(): TerminalNode { return this.getToken(BNGParser.LPAREN, 0); }
	public DBQUOTES(): TerminalNode[];
	public DBQUOTES(i: number): TerminalNode;
	public DBQUOTES(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.DBQUOTES);
		} else {
			return this.getToken(BNGParser.DBQUOTES, i);
		}
	}
	public VERSION_NUMBER(): TerminalNode { return this.getToken(BNGParser.VERSION_NUMBER, 0); }
	public RPAREN(): TerminalNode { return this.getToken(BNGParser.RPAREN, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(BNGParser.STRING, 0); }
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SEMI, 0); }
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_version_def; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterVersion_def) {
			listener.enterVersion_def(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitVersion_def) {
			listener.exitVersion_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitVersion_def) {
			return visitor.visitVersion_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Substance_defContext extends ParserRuleContext {
	public SUBSTANCEUNITS(): TerminalNode { return this.getToken(BNGParser.SUBSTANCEUNITS, 0); }
	public LPAREN(): TerminalNode { return this.getToken(BNGParser.LPAREN, 0); }
	public DBQUOTES(): TerminalNode[];
	public DBQUOTES(i: number): TerminalNode;
	public DBQUOTES(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.DBQUOTES);
		} else {
			return this.getToken(BNGParser.DBQUOTES, i);
		}
	}
	public STRING(): TerminalNode { return this.getToken(BNGParser.STRING, 0); }
	public RPAREN(): TerminalNode { return this.getToken(BNGParser.RPAREN, 0); }
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SEMI, 0); }
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_substance_def; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterSubstance_def) {
			listener.enterSubstance_def(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitSubstance_def) {
			listener.exitSubstance_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitSubstance_def) {
			return visitor.visitSubstance_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Set_optionContext extends ParserRuleContext {
	public SET_OPTION(): TerminalNode { return this.getToken(BNGParser.SET_OPTION, 0); }
	public LPAREN(): TerminalNode { return this.getToken(BNGParser.LPAREN, 0); }
	public DBQUOTES(): TerminalNode[];
	public DBQUOTES(i: number): TerminalNode;
	public DBQUOTES(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.DBQUOTES);
		} else {
			return this.getToken(BNGParser.DBQUOTES, i);
		}
	}
	public STRING(): TerminalNode[];
	public STRING(i: number): TerminalNode;
	public STRING(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.STRING);
		} else {
			return this.getToken(BNGParser.STRING, i);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.COMMA);
		} else {
			return this.getToken(BNGParser.COMMA, i);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(BNGParser.RPAREN, 0); }
	public INT(): TerminalNode[];
	public INT(i: number): TerminalNode;
	public INT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.INT);
		} else {
			return this.getToken(BNGParser.INT, i);
		}
	}
	public FLOAT(): TerminalNode[];
	public FLOAT(i: number): TerminalNode;
	public FLOAT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.FLOAT);
		} else {
			return this.getToken(BNGParser.FLOAT, i);
		}
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SEMI, 0); }
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_set_option; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterSet_option) {
			listener.enterSet_option(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitSet_option) {
			listener.exitSet_option(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitSet_option) {
			return visitor.visitSet_option(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Set_model_nameContext extends ParserRuleContext {
	public SET_MODEL_NAME(): TerminalNode { return this.getToken(BNGParser.SET_MODEL_NAME, 0); }
	public LPAREN(): TerminalNode { return this.getToken(BNGParser.LPAREN, 0); }
	public DBQUOTES(): TerminalNode[];
	public DBQUOTES(i: number): TerminalNode;
	public DBQUOTES(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.DBQUOTES);
		} else {
			return this.getToken(BNGParser.DBQUOTES, i);
		}
	}
	public STRING(): TerminalNode { return this.getToken(BNGParser.STRING, 0); }
	public RPAREN(): TerminalNode { return this.getToken(BNGParser.RPAREN, 0); }
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SEMI, 0); }
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_set_model_name; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterSet_model_name) {
			listener.enterSet_model_name(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitSet_model_name) {
			listener.exitSet_model_name(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitSet_model_name) {
			return visitor.visitSet_model_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Program_blockContext extends ParserRuleContext {
	public parameters_block(): Parameters_blockContext | undefined {
		return this.tryGetRuleContext(0, Parameters_blockContext);
	}
	public molecule_types_block(): Molecule_types_blockContext | undefined {
		return this.tryGetRuleContext(0, Molecule_types_blockContext);
	}
	public seed_species_block(): Seed_species_blockContext | undefined {
		return this.tryGetRuleContext(0, Seed_species_blockContext);
	}
	public observables_block(): Observables_blockContext | undefined {
		return this.tryGetRuleContext(0, Observables_blockContext);
	}
	public reaction_rules_block(): Reaction_rules_blockContext | undefined {
		return this.tryGetRuleContext(0, Reaction_rules_blockContext);
	}
	public functions_block(): Functions_blockContext | undefined {
		return this.tryGetRuleContext(0, Functions_blockContext);
	}
	public compartments_block(): Compartments_blockContext | undefined {
		return this.tryGetRuleContext(0, Compartments_blockContext);
	}
	public energy_patterns_block(): Energy_patterns_blockContext | undefined {
		return this.tryGetRuleContext(0, Energy_patterns_blockContext);
	}
	public population_maps_block(): Population_maps_blockContext | undefined {
		return this.tryGetRuleContext(0, Population_maps_blockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_program_block; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterProgram_block) {
			listener.enterProgram_block(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitProgram_block) {
			listener.exitProgram_block(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitProgram_block) {
			return visitor.visitProgram_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Parameters_blockContext extends ParserRuleContext {
	public BEGIN(): TerminalNode { return this.getToken(BNGParser.BEGIN, 0); }
	public PARAMETERS(): TerminalNode[];
	public PARAMETERS(i: number): TerminalNode;
	public PARAMETERS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.PARAMETERS);
		} else {
			return this.getToken(BNGParser.PARAMETERS, i);
		}
	}
	public END(): TerminalNode { return this.getToken(BNGParser.END, 0); }
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	public parameter_def(): Parameter_defContext[];
	public parameter_def(i: number): Parameter_defContext;
	public parameter_def(i?: number): Parameter_defContext | Parameter_defContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Parameter_defContext);
		} else {
			return this.getRuleContext(i, Parameter_defContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_parameters_block; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterParameters_block) {
			listener.enterParameters_block(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitParameters_block) {
			listener.exitParameters_block(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitParameters_block) {
			return visitor.visitParameters_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Parameter_defContext extends ParserRuleContext {
	public STRING(): TerminalNode[];
	public STRING(i: number): TerminalNode;
	public STRING(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.STRING);
		} else {
			return this.getToken(BNGParser.STRING, i);
		}
	}
	public COLON(): TerminalNode | undefined { return this.tryGetToken(BNGParser.COLON, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_parameter_def; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterParameter_def) {
			listener.enterParameter_def(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitParameter_def) {
			listener.exitParameter_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitParameter_def) {
			return visitor.visitParameter_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Molecule_types_blockContext extends ParserRuleContext {
	public BEGIN(): TerminalNode { return this.getToken(BNGParser.BEGIN, 0); }
	public MOLECULE(): TerminalNode[];
	public MOLECULE(i: number): TerminalNode;
	public MOLECULE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.MOLECULE);
		} else {
			return this.getToken(BNGParser.MOLECULE, i);
		}
	}
	public TYPES(): TerminalNode[];
	public TYPES(i: number): TerminalNode;
	public TYPES(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.TYPES);
		} else {
			return this.getToken(BNGParser.TYPES, i);
		}
	}
	public END(): TerminalNode { return this.getToken(BNGParser.END, 0); }
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	public molecule_type_def(): Molecule_type_defContext[];
	public molecule_type_def(i: number): Molecule_type_defContext;
	public molecule_type_def(i?: number): Molecule_type_defContext | Molecule_type_defContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Molecule_type_defContext);
		} else {
			return this.getRuleContext(i, Molecule_type_defContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_molecule_types_block; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterMolecule_types_block) {
			listener.enterMolecule_types_block(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitMolecule_types_block) {
			listener.exitMolecule_types_block(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitMolecule_types_block) {
			return visitor.visitMolecule_types_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Molecule_type_defContext extends ParserRuleContext {
	public molecule_def(): Molecule_defContext {
		return this.getRuleContext(0, Molecule_defContext);
	}
	public STRING(): TerminalNode | undefined { return this.tryGetToken(BNGParser.STRING, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(BNGParser.COLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_molecule_type_def; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterMolecule_type_def) {
			listener.enterMolecule_type_def(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitMolecule_type_def) {
			listener.exitMolecule_type_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitMolecule_type_def) {
			return visitor.visitMolecule_type_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Molecule_defContext extends ParserRuleContext {
	public STRING(): TerminalNode { return this.getToken(BNGParser.STRING, 0); }
	public LPAREN(): TerminalNode { return this.getToken(BNGParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(BNGParser.RPAREN, 0); }
	public component_def_list(): Component_def_listContext | undefined {
		return this.tryGetRuleContext(0, Component_def_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_molecule_def; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterMolecule_def) {
			listener.enterMolecule_def(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitMolecule_def) {
			listener.exitMolecule_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitMolecule_def) {
			return visitor.visitMolecule_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Component_def_listContext extends ParserRuleContext {
	public component_def(): Component_defContext[];
	public component_def(i: number): Component_defContext;
	public component_def(i?: number): Component_defContext | Component_defContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Component_defContext);
		} else {
			return this.getRuleContext(i, Component_defContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.COMMA);
		} else {
			return this.getToken(BNGParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_component_def_list; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterComponent_def_list) {
			listener.enterComponent_def_list(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitComponent_def_list) {
			listener.exitComponent_def_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitComponent_def_list) {
			return visitor.visitComponent_def_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Component_defContext extends ParserRuleContext {
	public STRING(): TerminalNode { return this.getToken(BNGParser.STRING, 0); }
	public TILDE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.TILDE, 0); }
	public state_list(): State_listContext | undefined {
		return this.tryGetRuleContext(0, State_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_component_def; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterComponent_def) {
			listener.enterComponent_def(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitComponent_def) {
			listener.exitComponent_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitComponent_def) {
			return visitor.visitComponent_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class State_listContext extends ParserRuleContext {
	public STRING(): TerminalNode[];
	public STRING(i: number): TerminalNode;
	public STRING(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.STRING);
		} else {
			return this.getToken(BNGParser.STRING, i);
		}
	}
	public TILDE(): TerminalNode[];
	public TILDE(i: number): TerminalNode;
	public TILDE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.TILDE);
		} else {
			return this.getToken(BNGParser.TILDE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_state_list; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterState_list) {
			listener.enterState_list(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitState_list) {
			listener.exitState_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitState_list) {
			return visitor.visitState_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Seed_species_blockContext extends ParserRuleContext {
	public BEGIN(): TerminalNode { return this.getToken(BNGParser.BEGIN, 0); }
	public END(): TerminalNode { return this.getToken(BNGParser.END, 0); }
	public SEED(): TerminalNode[];
	public SEED(i: number): TerminalNode;
	public SEED(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.SEED);
		} else {
			return this.getToken(BNGParser.SEED, i);
		}
	}
	public SPECIES(): TerminalNode[];
	public SPECIES(i: number): TerminalNode;
	public SPECIES(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.SPECIES);
		} else {
			return this.getToken(BNGParser.SPECIES, i);
		}
	}
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	public seed_species_def(): Seed_species_defContext[];
	public seed_species_def(i: number): Seed_species_defContext;
	public seed_species_def(i?: number): Seed_species_defContext | Seed_species_defContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Seed_species_defContext);
		} else {
			return this.getRuleContext(i, Seed_species_defContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_seed_species_block; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterSeed_species_block) {
			listener.enterSeed_species_block(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitSeed_species_block) {
			listener.exitSeed_species_block(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitSeed_species_block) {
			return visitor.visitSeed_species_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Seed_species_defContext extends ParserRuleContext {
	public species_def(): Species_defContext {
		return this.getRuleContext(0, Species_defContext);
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public STRING(): TerminalNode | undefined { return this.tryGetToken(BNGParser.STRING, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(BNGParser.COLON, 0); }
	public DOLLAR(): TerminalNode | undefined { return this.tryGetToken(BNGParser.DOLLAR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_seed_species_def; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterSeed_species_def) {
			listener.enterSeed_species_def(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitSeed_species_def) {
			listener.exitSeed_species_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitSeed_species_def) {
			return visitor.visitSeed_species_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Species_defContext extends ParserRuleContext {
	public molecule_pattern(): Molecule_patternContext[];
	public molecule_pattern(i: number): Molecule_patternContext;
	public molecule_pattern(i?: number): Molecule_patternContext | Molecule_patternContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Molecule_patternContext);
		} else {
			return this.getRuleContext(i, Molecule_patternContext);
		}
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.DOT);
		} else {
			return this.getToken(BNGParser.DOT, i);
		}
	}
	public AT(): TerminalNode | undefined { return this.tryGetToken(BNGParser.AT, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(BNGParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_species_def; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterSpecies_def) {
			listener.enterSpecies_def(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitSpecies_def) {
			listener.exitSpecies_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitSpecies_def) {
			return visitor.visitSpecies_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Molecule_patternContext extends ParserRuleContext {
	public STRING(): TerminalNode { return this.getToken(BNGParser.STRING, 0); }
	public LPAREN(): TerminalNode { return this.getToken(BNGParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(BNGParser.RPAREN, 0); }
	public component_pattern_list(): Component_pattern_listContext | undefined {
		return this.tryGetRuleContext(0, Component_pattern_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_molecule_pattern; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterMolecule_pattern) {
			listener.enterMolecule_pattern(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitMolecule_pattern) {
			listener.exitMolecule_pattern(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitMolecule_pattern) {
			return visitor.visitMolecule_pattern(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Component_pattern_listContext extends ParserRuleContext {
	public component_pattern(): Component_patternContext[];
	public component_pattern(i: number): Component_patternContext;
	public component_pattern(i?: number): Component_patternContext | Component_patternContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Component_patternContext);
		} else {
			return this.getRuleContext(i, Component_patternContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.COMMA);
		} else {
			return this.getToken(BNGParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_component_pattern_list; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterComponent_pattern_list) {
			listener.enterComponent_pattern_list(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitComponent_pattern_list) {
			listener.exitComponent_pattern_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitComponent_pattern_list) {
			return visitor.visitComponent_pattern_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Component_patternContext extends ParserRuleContext {
	public STRING(): TerminalNode { return this.getToken(BNGParser.STRING, 0); }
	public TILDE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.TILDE, 0); }
	public state_value(): State_valueContext | undefined {
		return this.tryGetRuleContext(0, State_valueContext);
	}
	public bond_spec(): Bond_specContext | undefined {
		return this.tryGetRuleContext(0, Bond_specContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_component_pattern; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterComponent_pattern) {
			listener.enterComponent_pattern(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitComponent_pattern) {
			listener.exitComponent_pattern(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitComponent_pattern) {
			return visitor.visitComponent_pattern(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class State_valueContext extends ParserRuleContext {
	public STRING(): TerminalNode | undefined { return this.tryGetToken(BNGParser.STRING, 0); }
	public QMARK(): TerminalNode | undefined { return this.tryGetToken(BNGParser.QMARK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_state_value; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterState_value) {
			listener.enterState_value(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitState_value) {
			listener.exitState_value(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitState_value) {
			return visitor.visitState_value(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Bond_specContext extends ParserRuleContext {
	public EMARK(): TerminalNode { return this.getToken(BNGParser.EMARK, 0); }
	public bond_id(): Bond_idContext | undefined {
		return this.tryGetRuleContext(0, Bond_idContext);
	}
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.PLUS, 0); }
	public QMARK(): TerminalNode | undefined { return this.tryGetToken(BNGParser.QMARK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_bond_spec; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterBond_spec) {
			listener.enterBond_spec(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitBond_spec) {
			listener.exitBond_spec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitBond_spec) {
			return visitor.visitBond_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Bond_idContext extends ParserRuleContext {
	public INT(): TerminalNode | undefined { return this.tryGetToken(BNGParser.INT, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(BNGParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_bond_id; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterBond_id) {
			listener.enterBond_id(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitBond_id) {
			listener.exitBond_id(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitBond_id) {
			return visitor.visitBond_id(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Observables_blockContext extends ParserRuleContext {
	public BEGIN(): TerminalNode { return this.getToken(BNGParser.BEGIN, 0); }
	public OBSERVABLES(): TerminalNode[];
	public OBSERVABLES(i: number): TerminalNode;
	public OBSERVABLES(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.OBSERVABLES);
		} else {
			return this.getToken(BNGParser.OBSERVABLES, i);
		}
	}
	public END(): TerminalNode { return this.getToken(BNGParser.END, 0); }
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	public observable_def(): Observable_defContext[];
	public observable_def(i: number): Observable_defContext;
	public observable_def(i?: number): Observable_defContext | Observable_defContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Observable_defContext);
		} else {
			return this.getRuleContext(i, Observable_defContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_observables_block; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterObservables_block) {
			listener.enterObservables_block(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitObservables_block) {
			listener.exitObservables_block(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitObservables_block) {
			return visitor.visitObservables_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Observable_defContext extends ParserRuleContext {
	public observable_type(): Observable_typeContext {
		return this.getRuleContext(0, Observable_typeContext);
	}
	public STRING(): TerminalNode[];
	public STRING(i: number): TerminalNode;
	public STRING(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.STRING);
		} else {
			return this.getToken(BNGParser.STRING, i);
		}
	}
	public observable_pattern_list(): Observable_pattern_listContext {
		return this.getRuleContext(0, Observable_pattern_listContext);
	}
	public COLON(): TerminalNode | undefined { return this.tryGetToken(BNGParser.COLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_observable_def; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterObservable_def) {
			listener.enterObservable_def(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitObservable_def) {
			listener.exitObservable_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitObservable_def) {
			return visitor.visitObservable_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Observable_typeContext extends ParserRuleContext {
	public MOLECULES(): TerminalNode | undefined { return this.tryGetToken(BNGParser.MOLECULES, 0); }
	public SPECIES(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SPECIES, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(BNGParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_observable_type; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterObservable_type) {
			listener.enterObservable_type(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitObservable_type) {
			listener.exitObservable_type(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitObservable_type) {
			return visitor.visitObservable_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Observable_pattern_listContext extends ParserRuleContext {
	public species_def(): Species_defContext[];
	public species_def(i: number): Species_defContext;
	public species_def(i?: number): Species_defContext | Species_defContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Species_defContext);
		} else {
			return this.getRuleContext(i, Species_defContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.COMMA);
		} else {
			return this.getToken(BNGParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_observable_pattern_list; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterObservable_pattern_list) {
			listener.enterObservable_pattern_list(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitObservable_pattern_list) {
			listener.exitObservable_pattern_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitObservable_pattern_list) {
			return visitor.visitObservable_pattern_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Reaction_rules_blockContext extends ParserRuleContext {
	public BEGIN(): TerminalNode { return this.getToken(BNGParser.BEGIN, 0); }
	public REACTION(): TerminalNode[];
	public REACTION(i: number): TerminalNode;
	public REACTION(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.REACTION);
		} else {
			return this.getToken(BNGParser.REACTION, i);
		}
	}
	public RULES(): TerminalNode[];
	public RULES(i: number): TerminalNode;
	public RULES(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.RULES);
		} else {
			return this.getToken(BNGParser.RULES, i);
		}
	}
	public END(): TerminalNode { return this.getToken(BNGParser.END, 0); }
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	public reaction_rule_def(): Reaction_rule_defContext[];
	public reaction_rule_def(i: number): Reaction_rule_defContext;
	public reaction_rule_def(i?: number): Reaction_rule_defContext | Reaction_rule_defContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Reaction_rule_defContext);
		} else {
			return this.getRuleContext(i, Reaction_rule_defContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_reaction_rules_block; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterReaction_rules_block) {
			listener.enterReaction_rules_block(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitReaction_rules_block) {
			listener.exitReaction_rules_block(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitReaction_rules_block) {
			return visitor.visitReaction_rules_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Reaction_rule_defContext extends ParserRuleContext {
	public reactant_patterns(): Reactant_patternsContext {
		return this.getRuleContext(0, Reactant_patternsContext);
	}
	public reaction_sign(): Reaction_signContext {
		return this.getRuleContext(0, Reaction_signContext);
	}
	public product_patterns(): Product_patternsContext {
		return this.getRuleContext(0, Product_patternsContext);
	}
	public rate_law(): Rate_lawContext {
		return this.getRuleContext(0, Rate_lawContext);
	}
	public label_def(): Label_defContext | undefined {
		return this.tryGetRuleContext(0, Label_defContext);
	}
	public COLON(): TerminalNode | undefined { return this.tryGetToken(BNGParser.COLON, 0); }
	public rule_modifiers(): Rule_modifiersContext | undefined {
		return this.tryGetRuleContext(0, Rule_modifiersContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_reaction_rule_def; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterReaction_rule_def) {
			listener.enterReaction_rule_def(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitReaction_rule_def) {
			listener.exitReaction_rule_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitReaction_rule_def) {
			return visitor.visitReaction_rule_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Label_defContext extends ParserRuleContext {
	public STRING(): TerminalNode | undefined { return this.tryGetToken(BNGParser.STRING, 0); }
	public INT(): TerminalNode | undefined { return this.tryGetToken(BNGParser.INT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_label_def; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterLabel_def) {
			listener.enterLabel_def(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitLabel_def) {
			listener.exitLabel_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitLabel_def) {
			return visitor.visitLabel_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Reactant_patternsContext extends ParserRuleContext {
	public species_def(): Species_defContext[];
	public species_def(i: number): Species_defContext;
	public species_def(i?: number): Species_defContext | Species_defContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Species_defContext);
		} else {
			return this.getRuleContext(i, Species_defContext);
		}
	}
	public PLUS(): TerminalNode[];
	public PLUS(i: number): TerminalNode;
	public PLUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.PLUS);
		} else {
			return this.getToken(BNGParser.PLUS, i);
		}
	}
	public INT(): TerminalNode | undefined { return this.tryGetToken(BNGParser.INT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_reactant_patterns; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterReactant_patterns) {
			listener.enterReactant_patterns(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitReactant_patterns) {
			listener.exitReactant_patterns(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitReactant_patterns) {
			return visitor.visitReactant_patterns(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Product_patternsContext extends ParserRuleContext {
	public species_def(): Species_defContext[];
	public species_def(i: number): Species_defContext;
	public species_def(i?: number): Species_defContext | Species_defContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Species_defContext);
		} else {
			return this.getRuleContext(i, Species_defContext);
		}
	}
	public PLUS(): TerminalNode[];
	public PLUS(i: number): TerminalNode;
	public PLUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.PLUS);
		} else {
			return this.getToken(BNGParser.PLUS, i);
		}
	}
	public INT(): TerminalNode | undefined { return this.tryGetToken(BNGParser.INT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_product_patterns; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterProduct_patterns) {
			listener.enterProduct_patterns(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitProduct_patterns) {
			listener.exitProduct_patterns(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitProduct_patterns) {
			return visitor.visitProduct_patterns(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Reaction_signContext extends ParserRuleContext {
	public UNI_REACTION_SIGN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.UNI_REACTION_SIGN, 0); }
	public BI_REACTION_SIGN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.BI_REACTION_SIGN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_reaction_sign; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterReaction_sign) {
			listener.enterReaction_sign(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitReaction_sign) {
			listener.exitReaction_sign(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitReaction_sign) {
			return visitor.visitReaction_sign(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Rate_lawContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(BNGParser.COMMA, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_rate_law; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterRate_law) {
			listener.enterRate_law(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitRate_law) {
			listener.exitRate_law(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitRate_law) {
			return visitor.visitRate_law(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Rule_modifiersContext extends ParserRuleContext {
	public DELETEMOLECULES(): TerminalNode | undefined { return this.tryGetToken(BNGParser.DELETEMOLECULES, 0); }
	public MOVECONNECTED(): TerminalNode | undefined { return this.tryGetToken(BNGParser.MOVECONNECTED, 0); }
	public MATCHONCE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.MATCHONCE, 0); }
	public TOTALRATE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.TOTALRATE, 0); }
	public INCLUDE_REACTANTS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.INCLUDE_REACTANTS, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.LPAREN, 0); }
	public INT(): TerminalNode | undefined { return this.tryGetToken(BNGParser.INT, 0); }
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(BNGParser.COMMA, 0); }
	public pattern_list(): Pattern_listContext | undefined {
		return this.tryGetRuleContext(0, Pattern_listContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.RPAREN, 0); }
	public EXCLUDE_REACTANTS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.EXCLUDE_REACTANTS, 0); }
	public INCLUDE_PRODUCTS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.INCLUDE_PRODUCTS, 0); }
	public EXCLUDE_PRODUCTS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.EXCLUDE_PRODUCTS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_rule_modifiers; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterRule_modifiers) {
			listener.enterRule_modifiers(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitRule_modifiers) {
			listener.exitRule_modifiers(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitRule_modifiers) {
			return visitor.visitRule_modifiers(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Pattern_listContext extends ParserRuleContext {
	public species_def(): Species_defContext[];
	public species_def(i: number): Species_defContext;
	public species_def(i?: number): Species_defContext | Species_defContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Species_defContext);
		} else {
			return this.getRuleContext(i, Species_defContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.COMMA);
		} else {
			return this.getToken(BNGParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_pattern_list; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterPattern_list) {
			listener.enterPattern_list(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitPattern_list) {
			listener.exitPattern_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitPattern_list) {
			return visitor.visitPattern_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Functions_blockContext extends ParserRuleContext {
	public BEGIN(): TerminalNode { return this.getToken(BNGParser.BEGIN, 0); }
	public FUNCTIONS(): TerminalNode[];
	public FUNCTIONS(i: number): TerminalNode;
	public FUNCTIONS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.FUNCTIONS);
		} else {
			return this.getToken(BNGParser.FUNCTIONS, i);
		}
	}
	public END(): TerminalNode { return this.getToken(BNGParser.END, 0); }
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	public function_def(): Function_defContext[];
	public function_def(i: number): Function_defContext;
	public function_def(i?: number): Function_defContext | Function_defContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Function_defContext);
		} else {
			return this.getRuleContext(i, Function_defContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_functions_block; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterFunctions_block) {
			listener.enterFunctions_block(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitFunctions_block) {
			listener.exitFunctions_block(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitFunctions_block) {
			return visitor.visitFunctions_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_defContext extends ParserRuleContext {
	public STRING(): TerminalNode[];
	public STRING(i: number): TerminalNode;
	public STRING(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.STRING);
		} else {
			return this.getToken(BNGParser.STRING, i);
		}
	}
	public LPAREN(): TerminalNode { return this.getToken(BNGParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(BNGParser.RPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public COLON(): TerminalNode | undefined { return this.tryGetToken(BNGParser.COLON, 0); }
	public param_list(): Param_listContext | undefined {
		return this.tryGetRuleContext(0, Param_listContext);
	}
	public BECOMES(): TerminalNode | undefined { return this.tryGetToken(BNGParser.BECOMES, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_function_def; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterFunction_def) {
			listener.enterFunction_def(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitFunction_def) {
			listener.exitFunction_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitFunction_def) {
			return visitor.visitFunction_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Param_listContext extends ParserRuleContext {
	public STRING(): TerminalNode[];
	public STRING(i: number): TerminalNode;
	public STRING(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.STRING);
		} else {
			return this.getToken(BNGParser.STRING, i);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.COMMA);
		} else {
			return this.getToken(BNGParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_param_list; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterParam_list) {
			listener.enterParam_list(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitParam_list) {
			listener.exitParam_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitParam_list) {
			return visitor.visitParam_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Compartments_blockContext extends ParserRuleContext {
	public BEGIN(): TerminalNode { return this.getToken(BNGParser.BEGIN, 0); }
	public COMPARTMENTS(): TerminalNode[];
	public COMPARTMENTS(i: number): TerminalNode;
	public COMPARTMENTS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.COMPARTMENTS);
		} else {
			return this.getToken(BNGParser.COMPARTMENTS, i);
		}
	}
	public END(): TerminalNode { return this.getToken(BNGParser.END, 0); }
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	public compartment_def(): Compartment_defContext[];
	public compartment_def(i: number): Compartment_defContext;
	public compartment_def(i?: number): Compartment_defContext | Compartment_defContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Compartment_defContext);
		} else {
			return this.getRuleContext(i, Compartment_defContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_compartments_block; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterCompartments_block) {
			listener.enterCompartments_block(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitCompartments_block) {
			listener.exitCompartments_block(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitCompartments_block) {
			return visitor.visitCompartments_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Compartment_defContext extends ParserRuleContext {
	public STRING(): TerminalNode[];
	public STRING(i: number): TerminalNode;
	public STRING(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.STRING);
		} else {
			return this.getToken(BNGParser.STRING, i);
		}
	}
	public INT(): TerminalNode { return this.getToken(BNGParser.INT, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public COLON(): TerminalNode | undefined { return this.tryGetToken(BNGParser.COLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_compartment_def; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterCompartment_def) {
			listener.enterCompartment_def(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitCompartment_def) {
			listener.exitCompartment_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitCompartment_def) {
			return visitor.visitCompartment_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Energy_patterns_blockContext extends ParserRuleContext {
	public BEGIN(): TerminalNode { return this.getToken(BNGParser.BEGIN, 0); }
	public ENERGY(): TerminalNode[];
	public ENERGY(i: number): TerminalNode;
	public ENERGY(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.ENERGY);
		} else {
			return this.getToken(BNGParser.ENERGY, i);
		}
	}
	public PATTERNS(): TerminalNode[];
	public PATTERNS(i: number): TerminalNode;
	public PATTERNS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.PATTERNS);
		} else {
			return this.getToken(BNGParser.PATTERNS, i);
		}
	}
	public END(): TerminalNode { return this.getToken(BNGParser.END, 0); }
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	public energy_pattern_def(): Energy_pattern_defContext[];
	public energy_pattern_def(i: number): Energy_pattern_defContext;
	public energy_pattern_def(i?: number): Energy_pattern_defContext | Energy_pattern_defContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Energy_pattern_defContext);
		} else {
			return this.getRuleContext(i, Energy_pattern_defContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_energy_patterns_block; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterEnergy_patterns_block) {
			listener.enterEnergy_patterns_block(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitEnergy_patterns_block) {
			listener.exitEnergy_patterns_block(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitEnergy_patterns_block) {
			return visitor.visitEnergy_patterns_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Energy_pattern_defContext extends ParserRuleContext {
	public species_def(): Species_defContext {
		return this.getRuleContext(0, Species_defContext);
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public STRING(): TerminalNode | undefined { return this.tryGetToken(BNGParser.STRING, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(BNGParser.COLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_energy_pattern_def; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterEnergy_pattern_def) {
			listener.enterEnergy_pattern_def(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitEnergy_pattern_def) {
			listener.exitEnergy_pattern_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitEnergy_pattern_def) {
			return visitor.visitEnergy_pattern_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Population_maps_blockContext extends ParserRuleContext {
	public BEGIN(): TerminalNode { return this.getToken(BNGParser.BEGIN, 0); }
	public POPULATION(): TerminalNode[];
	public POPULATION(i: number): TerminalNode;
	public POPULATION(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.POPULATION);
		} else {
			return this.getToken(BNGParser.POPULATION, i);
		}
	}
	public MAPS(): TerminalNode[];
	public MAPS(i: number): TerminalNode;
	public MAPS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.MAPS);
		} else {
			return this.getToken(BNGParser.MAPS, i);
		}
	}
	public END(): TerminalNode { return this.getToken(BNGParser.END, 0); }
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	public population_map_def(): Population_map_defContext[];
	public population_map_def(i: number): Population_map_defContext;
	public population_map_def(i?: number): Population_map_defContext | Population_map_defContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Population_map_defContext);
		} else {
			return this.getRuleContext(i, Population_map_defContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_population_maps_block; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterPopulation_maps_block) {
			listener.enterPopulation_maps_block(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitPopulation_maps_block) {
			listener.exitPopulation_maps_block(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitPopulation_maps_block) {
			return visitor.visitPopulation_maps_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Population_map_defContext extends ParserRuleContext {
	public species_def(): Species_defContext {
		return this.getRuleContext(0, Species_defContext);
	}
	public UNI_REACTION_SIGN(): TerminalNode { return this.getToken(BNGParser.UNI_REACTION_SIGN, 0); }
	public STRING(): TerminalNode[];
	public STRING(i: number): TerminalNode;
	public STRING(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.STRING);
		} else {
			return this.getToken(BNGParser.STRING, i);
		}
	}
	public LPAREN(): TerminalNode { return this.getToken(BNGParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(BNGParser.RPAREN, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(BNGParser.COLON, 0); }
	public param_list(): Param_listContext | undefined {
		return this.tryGetRuleContext(0, Param_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_population_map_def; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterPopulation_map_def) {
			listener.enterPopulation_map_def(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitPopulation_map_def) {
			listener.exitPopulation_map_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitPopulation_map_def) {
			return visitor.visitPopulation_map_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Actions_blockContext extends ParserRuleContext {
	public action_command(): Action_commandContext[];
	public action_command(i: number): Action_commandContext;
	public action_command(i?: number): Action_commandContext | Action_commandContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Action_commandContext);
		} else {
			return this.getRuleContext(i, Action_commandContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_actions_block; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterActions_block) {
			listener.enterActions_block(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitActions_block) {
			listener.exitActions_block(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitActions_block) {
			return visitor.visitActions_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Action_commandContext extends ParserRuleContext {
	public generate_network_cmd(): Generate_network_cmdContext | undefined {
		return this.tryGetRuleContext(0, Generate_network_cmdContext);
	}
	public simulate_cmd(): Simulate_cmdContext | undefined {
		return this.tryGetRuleContext(0, Simulate_cmdContext);
	}
	public write_cmd(): Write_cmdContext | undefined {
		return this.tryGetRuleContext(0, Write_cmdContext);
	}
	public set_cmd(): Set_cmdContext | undefined {
		return this.tryGetRuleContext(0, Set_cmdContext);
	}
	public other_action_cmd(): Other_action_cmdContext | undefined {
		return this.tryGetRuleContext(0, Other_action_cmdContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_action_command; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterAction_command) {
			listener.enterAction_command(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitAction_command) {
			listener.exitAction_command(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitAction_command) {
			return visitor.visitAction_command(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Generate_network_cmdContext extends ParserRuleContext {
	public GENERATENETWORK(): TerminalNode { return this.getToken(BNGParser.GENERATENETWORK, 0); }
	public LPAREN(): TerminalNode { return this.getToken(BNGParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(BNGParser.RPAREN, 0); }
	public action_args(): Action_argsContext | undefined {
		return this.tryGetRuleContext(0, Action_argsContext);
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SEMI, 0); }
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_generate_network_cmd; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterGenerate_network_cmd) {
			listener.enterGenerate_network_cmd(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitGenerate_network_cmd) {
			listener.exitGenerate_network_cmd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitGenerate_network_cmd) {
			return visitor.visitGenerate_network_cmd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Simulate_cmdContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(BNGParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(BNGParser.RPAREN, 0); }
	public SIMULATE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SIMULATE, 0); }
	public SIMULATE_ODE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SIMULATE_ODE, 0); }
	public SIMULATE_SSA(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SIMULATE_SSA, 0); }
	public SIMULATE_PLA(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SIMULATE_PLA, 0); }
	public SIMULATE_NF(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SIMULATE_NF, 0); }
	public action_args(): Action_argsContext | undefined {
		return this.tryGetRuleContext(0, Action_argsContext);
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SEMI, 0); }
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_simulate_cmd; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterSimulate_cmd) {
			listener.enterSimulate_cmd(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitSimulate_cmd) {
			listener.exitSimulate_cmd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitSimulate_cmd) {
			return visitor.visitSimulate_cmd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Write_cmdContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(BNGParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(BNGParser.RPAREN, 0); }
	public WRITEFILE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.WRITEFILE, 0); }
	public WRITEXML(): TerminalNode | undefined { return this.tryGetToken(BNGParser.WRITEXML, 0); }
	public WRITESBML(): TerminalNode | undefined { return this.tryGetToken(BNGParser.WRITESBML, 0); }
	public WRITENETWORK(): TerminalNode | undefined { return this.tryGetToken(BNGParser.WRITENETWORK, 0); }
	public WRITEMODEL(): TerminalNode | undefined { return this.tryGetToken(BNGParser.WRITEMODEL, 0); }
	public WRITEMFILE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.WRITEMFILE, 0); }
	public WRITEMEXFILE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.WRITEMEXFILE, 0); }
	public action_args(): Action_argsContext | undefined {
		return this.tryGetRuleContext(0, Action_argsContext);
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SEMI, 0); }
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_write_cmd; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterWrite_cmd) {
			listener.enterWrite_cmd(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitWrite_cmd) {
			listener.exitWrite_cmd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitWrite_cmd) {
			return visitor.visitWrite_cmd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Set_cmdContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(BNGParser.LPAREN, 0); }
	public DBQUOTES(): TerminalNode[];
	public DBQUOTES(i: number): TerminalNode;
	public DBQUOTES(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.DBQUOTES);
		} else {
			return this.getToken(BNGParser.DBQUOTES, i);
		}
	}
	public species_def(): Species_defContext {
		return this.getRuleContext(0, Species_defContext);
	}
	public COMMA(): TerminalNode { return this.getToken(BNGParser.COMMA, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(BNGParser.RPAREN, 0); }
	public SETCONCENTRATION(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SETCONCENTRATION, 0); }
	public ADDCONCENTRATION(): TerminalNode | undefined { return this.tryGetToken(BNGParser.ADDCONCENTRATION, 0); }
	public SETPARAMETER(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SETPARAMETER, 0); }
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SEMI, 0); }
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_set_cmd; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterSet_cmd) {
			listener.enterSet_cmd(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitSet_cmd) {
			listener.exitSet_cmd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitSet_cmd) {
			return visitor.visitSet_cmd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Other_action_cmdContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(BNGParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(BNGParser.RPAREN, 0); }
	public SAVECONCENTRATIONS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SAVECONCENTRATIONS, 0); }
	public RESETCONCENTRATIONS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.RESETCONCENTRATIONS, 0); }
	public SAVEPARAMETERS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SAVEPARAMETERS, 0); }
	public RESETPARAMETERS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.RESETPARAMETERS, 0); }
	public QUIT(): TerminalNode | undefined { return this.tryGetToken(BNGParser.QUIT, 0); }
	public PARAMETER_SCAN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.PARAMETER_SCAN, 0); }
	public BIFURCATE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.BIFURCATE, 0); }
	public VISUALIZE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.VISUALIZE, 0); }
	public GENERATEHYBRIDMODEL(): TerminalNode | undefined { return this.tryGetToken(BNGParser.GENERATEHYBRIDMODEL, 0); }
	public READFILE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.READFILE, 0); }
	public action_args(): Action_argsContext | undefined {
		return this.tryGetRuleContext(0, Action_argsContext);
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SEMI, 0); }
	public LB(): TerminalNode[];
	public LB(i: number): TerminalNode;
	public LB(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LB);
		} else {
			return this.getToken(BNGParser.LB, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_other_action_cmd; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterOther_action_cmd) {
			listener.enterOther_action_cmd(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitOther_action_cmd) {
			listener.exitOther_action_cmd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitOther_action_cmd) {
			return visitor.visitOther_action_cmd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Action_argsContext extends ParserRuleContext {
	public LBRACKET(): TerminalNode { return this.getToken(BNGParser.LBRACKET, 0); }
	public action_arg_list(): Action_arg_listContext {
		return this.getRuleContext(0, Action_arg_listContext);
	}
	public RBRACKET(): TerminalNode { return this.getToken(BNGParser.RBRACKET, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_action_args; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterAction_args) {
			listener.enterAction_args(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitAction_args) {
			listener.exitAction_args(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitAction_args) {
			return visitor.visitAction_args(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Action_arg_listContext extends ParserRuleContext {
	public action_arg(): Action_argContext[];
	public action_arg(i: number): Action_argContext;
	public action_arg(i?: number): Action_argContext | Action_argContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Action_argContext);
		} else {
			return this.getRuleContext(i, Action_argContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.COMMA);
		} else {
			return this.getToken(BNGParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_action_arg_list; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterAction_arg_list) {
			listener.enterAction_arg_list(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitAction_arg_list) {
			listener.exitAction_arg_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitAction_arg_list) {
			return visitor.visitAction_arg_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Action_argContext extends ParserRuleContext {
	public arg_name(): Arg_nameContext {
		return this.getRuleContext(0, Arg_nameContext);
	}
	public ASSIGNS(): TerminalNode { return this.getToken(BNGParser.ASSIGNS, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public DBQUOTES(): TerminalNode[];
	public DBQUOTES(i: number): TerminalNode;
	public DBQUOTES(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.DBQUOTES);
		} else {
			return this.getToken(BNGParser.DBQUOTES, i);
		}
	}
	public LSBRACKET(): TerminalNode | undefined { return this.tryGetToken(BNGParser.LSBRACKET, 0); }
	public expression_list(): Expression_listContext | undefined {
		return this.tryGetRuleContext(0, Expression_listContext);
	}
	public RSBRACKET(): TerminalNode | undefined { return this.tryGetToken(BNGParser.RSBRACKET, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_action_arg; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterAction_arg) {
			listener.enterAction_arg(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitAction_arg) {
			listener.exitAction_arg(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitAction_arg) {
			return visitor.visitAction_arg(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Arg_nameContext extends ParserRuleContext {
	public STRING(): TerminalNode | undefined { return this.tryGetToken(BNGParser.STRING, 0); }
	public OVERWRITE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.OVERWRITE, 0); }
	public MAX_AGG(): TerminalNode | undefined { return this.tryGetToken(BNGParser.MAX_AGG, 0); }
	public MAX_ITER(): TerminalNode | undefined { return this.tryGetToken(BNGParser.MAX_ITER, 0); }
	public MAX_STOICH(): TerminalNode | undefined { return this.tryGetToken(BNGParser.MAX_STOICH, 0); }
	public PRINT_ITER(): TerminalNode | undefined { return this.tryGetToken(BNGParser.PRINT_ITER, 0); }
	public CHECK_ISO(): TerminalNode | undefined { return this.tryGetToken(BNGParser.CHECK_ISO, 0); }
	public METHOD(): TerminalNode | undefined { return this.tryGetToken(BNGParser.METHOD, 0); }
	public T_START(): TerminalNode | undefined { return this.tryGetToken(BNGParser.T_START, 0); }
	public T_END(): TerminalNode | undefined { return this.tryGetToken(BNGParser.T_END, 0); }
	public N_STEPS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.N_STEPS, 0); }
	public N_OUTPUT_STEPS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.N_OUTPUT_STEPS, 0); }
	public ATOL(): TerminalNode | undefined { return this.tryGetToken(BNGParser.ATOL, 0); }
	public RTOL(): TerminalNode | undefined { return this.tryGetToken(BNGParser.RTOL, 0); }
	public STEADY_STATE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.STEADY_STATE, 0); }
	public SPARSE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SPARSE, 0); }
	public VERBOSE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.VERBOSE, 0); }
	public NETFILE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.NETFILE, 0); }
	public CONTINUE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.CONTINUE, 0); }
	public PREFIX(): TerminalNode | undefined { return this.tryGetToken(BNGParser.PREFIX, 0); }
	public SUFFIX(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SUFFIX, 0); }
	public FORMAT(): TerminalNode | undefined { return this.tryGetToken(BNGParser.FORMAT, 0); }
	public FILE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.FILE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_arg_name; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterArg_name) {
			listener.enterArg_name(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitArg_name) {
			listener.exitArg_name(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitArg_name) {
			return visitor.visitArg_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expression_listContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.COMMA);
		} else {
			return this.getToken(BNGParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_expression_list; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterExpression_list) {
			listener.enterExpression_list(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitExpression_list) {
			listener.exitExpression_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitExpression_list) {
			return visitor.visitExpression_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public conditional_expr(): Conditional_exprContext {
		return this.getRuleContext(0, Conditional_exprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_expression; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterExpression) {
			listener.enterExpression(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitExpression) {
			listener.exitExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Conditional_exprContext extends ParserRuleContext {
	public or_expr(): Or_exprContext {
		return this.getRuleContext(0, Or_exprContext);
	}
	public QMARK(): TerminalNode | undefined { return this.tryGetToken(BNGParser.QMARK, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COLON(): TerminalNode | undefined { return this.tryGetToken(BNGParser.COLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_conditional_expr; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterConditional_expr) {
			listener.enterConditional_expr(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitConditional_expr) {
			listener.exitConditional_expr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitConditional_expr) {
			return visitor.visitConditional_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Or_exprContext extends ParserRuleContext {
	public and_expr(): And_exprContext[];
	public and_expr(i: number): And_exprContext;
	public and_expr(i?: number): And_exprContext | And_exprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(And_exprContext);
		} else {
			return this.getRuleContext(i, And_exprContext);
		}
	}
	public PIPE(): TerminalNode[];
	public PIPE(i: number): TerminalNode;
	public PIPE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.PIPE);
		} else {
			return this.getToken(BNGParser.PIPE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_or_expr; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterOr_expr) {
			listener.enterOr_expr(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitOr_expr) {
			listener.exitOr_expr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitOr_expr) {
			return visitor.visitOr_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class And_exprContext extends ParserRuleContext {
	public equality_expr(): Equality_exprContext[];
	public equality_expr(i: number): Equality_exprContext;
	public equality_expr(i?: number): Equality_exprContext | Equality_exprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Equality_exprContext);
		} else {
			return this.getRuleContext(i, Equality_exprContext);
		}
	}
	public AMPERSAND(): TerminalNode[];
	public AMPERSAND(i: number): TerminalNode;
	public AMPERSAND(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.AMPERSAND);
		} else {
			return this.getToken(BNGParser.AMPERSAND, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_and_expr; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterAnd_expr) {
			listener.enterAnd_expr(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitAnd_expr) {
			listener.exitAnd_expr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitAnd_expr) {
			return visitor.visitAnd_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Equality_exprContext extends ParserRuleContext {
	public relational_expr(): Relational_exprContext[];
	public relational_expr(i: number): Relational_exprContext;
	public relational_expr(i?: number): Relational_exprContext | Relational_exprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Relational_exprContext);
		} else {
			return this.getRuleContext(i, Relational_exprContext);
		}
	}
	public EQUALS(): TerminalNode[];
	public EQUALS(i: number): TerminalNode;
	public EQUALS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.EQUALS);
		} else {
			return this.getToken(BNGParser.EQUALS, i);
		}
	}
	public GTE(): TerminalNode[];
	public GTE(i: number): TerminalNode;
	public GTE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.GTE);
		} else {
			return this.getToken(BNGParser.GTE, i);
		}
	}
	public GT(): TerminalNode[];
	public GT(i: number): TerminalNode;
	public GT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.GT);
		} else {
			return this.getToken(BNGParser.GT, i);
		}
	}
	public LTE(): TerminalNode[];
	public LTE(i: number): TerminalNode;
	public LTE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LTE);
		} else {
			return this.getToken(BNGParser.LTE, i);
		}
	}
	public LT(): TerminalNode[];
	public LT(i: number): TerminalNode;
	public LT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.LT);
		} else {
			return this.getToken(BNGParser.LT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_equality_expr; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterEquality_expr) {
			listener.enterEquality_expr(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitEquality_expr) {
			listener.exitEquality_expr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitEquality_expr) {
			return visitor.visitEquality_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Relational_exprContext extends ParserRuleContext {
	public additive_expr(): Additive_exprContext {
		return this.getRuleContext(0, Additive_exprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_relational_expr; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterRelational_expr) {
			listener.enterRelational_expr(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitRelational_expr) {
			listener.exitRelational_expr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitRelational_expr) {
			return visitor.visitRelational_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Additive_exprContext extends ParserRuleContext {
	public multiplicative_expr(): Multiplicative_exprContext[];
	public multiplicative_expr(i: number): Multiplicative_exprContext;
	public multiplicative_expr(i?: number): Multiplicative_exprContext | Multiplicative_exprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Multiplicative_exprContext);
		} else {
			return this.getRuleContext(i, Multiplicative_exprContext);
		}
	}
	public PLUS(): TerminalNode[];
	public PLUS(i: number): TerminalNode;
	public PLUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.PLUS);
		} else {
			return this.getToken(BNGParser.PLUS, i);
		}
	}
	public MINUS(): TerminalNode[];
	public MINUS(i: number): TerminalNode;
	public MINUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.MINUS);
		} else {
			return this.getToken(BNGParser.MINUS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_additive_expr; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterAdditive_expr) {
			listener.enterAdditive_expr(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitAdditive_expr) {
			listener.exitAdditive_expr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitAdditive_expr) {
			return visitor.visitAdditive_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Multiplicative_exprContext extends ParserRuleContext {
	public power_expr(): Power_exprContext[];
	public power_expr(i: number): Power_exprContext;
	public power_expr(i?: number): Power_exprContext | Power_exprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Power_exprContext);
		} else {
			return this.getRuleContext(i, Power_exprContext);
		}
	}
	public TIMES(): TerminalNode[];
	public TIMES(i: number): TerminalNode;
	public TIMES(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.TIMES);
		} else {
			return this.getToken(BNGParser.TIMES, i);
		}
	}
	public DIV(): TerminalNode[];
	public DIV(i: number): TerminalNode;
	public DIV(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.DIV);
		} else {
			return this.getToken(BNGParser.DIV, i);
		}
	}
	public MOD(): TerminalNode[];
	public MOD(i: number): TerminalNode;
	public MOD(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.MOD);
		} else {
			return this.getToken(BNGParser.MOD, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_multiplicative_expr; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterMultiplicative_expr) {
			listener.enterMultiplicative_expr(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitMultiplicative_expr) {
			listener.exitMultiplicative_expr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitMultiplicative_expr) {
			return visitor.visitMultiplicative_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Power_exprContext extends ParserRuleContext {
	public unary_expr(): Unary_exprContext[];
	public unary_expr(i: number): Unary_exprContext;
	public unary_expr(i?: number): Unary_exprContext | Unary_exprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Unary_exprContext);
		} else {
			return this.getRuleContext(i, Unary_exprContext);
		}
	}
	public POWER(): TerminalNode[];
	public POWER(i: number): TerminalNode;
	public POWER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.POWER);
		} else {
			return this.getToken(BNGParser.POWER, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_power_expr; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterPower_expr) {
			listener.enterPower_expr(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitPower_expr) {
			listener.exitPower_expr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitPower_expr) {
			return visitor.visitPower_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Unary_exprContext extends ParserRuleContext {
	public primary_expr(): Primary_exprContext {
		return this.getRuleContext(0, Primary_exprContext);
	}
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.MINUS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_unary_expr; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterUnary_expr) {
			listener.enterUnary_expr(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitUnary_expr) {
			listener.exitUnary_expr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitUnary_expr) {
			return visitor.visitUnary_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Primary_exprContext extends ParserRuleContext {
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.LPAREN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.RPAREN, 0); }
	public function_call(): Function_callContext | undefined {
		return this.tryGetRuleContext(0, Function_callContext);
	}
	public observable_ref(): Observable_refContext | undefined {
		return this.tryGetRuleContext(0, Observable_refContext);
	}
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	public STRING(): TerminalNode | undefined { return this.tryGetToken(BNGParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_primary_expr; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterPrimary_expr) {
			listener.enterPrimary_expr(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitPrimary_expr) {
			listener.exitPrimary_expr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitPrimary_expr) {
			return visitor.visitPrimary_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_callContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(BNGParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(BNGParser.RPAREN, 0); }
	public EXP(): TerminalNode | undefined { return this.tryGetToken(BNGParser.EXP, 0); }
	public LN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.LN, 0); }
	public LOG10(): TerminalNode | undefined { return this.tryGetToken(BNGParser.LOG10, 0); }
	public LOG2(): TerminalNode | undefined { return this.tryGetToken(BNGParser.LOG2, 0); }
	public SQRT(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SQRT, 0); }
	public ABS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.ABS, 0); }
	public SIN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SIN, 0); }
	public COS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.COS, 0); }
	public TAN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.TAN, 0); }
	public ASIN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.ASIN, 0); }
	public ACOS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.ACOS, 0); }
	public ATAN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.ATAN, 0); }
	public SINH(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SINH, 0); }
	public COSH(): TerminalNode | undefined { return this.tryGetToken(BNGParser.COSH, 0); }
	public TANH(): TerminalNode | undefined { return this.tryGetToken(BNGParser.TANH, 0); }
	public ASINH(): TerminalNode | undefined { return this.tryGetToken(BNGParser.ASINH, 0); }
	public ACOSH(): TerminalNode | undefined { return this.tryGetToken(BNGParser.ACOSH, 0); }
	public ATANH(): TerminalNode | undefined { return this.tryGetToken(BNGParser.ATANH, 0); }
	public RINT(): TerminalNode | undefined { return this.tryGetToken(BNGParser.RINT, 0); }
	public MIN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.MIN, 0); }
	public MAX(): TerminalNode | undefined { return this.tryGetToken(BNGParser.MAX, 0); }
	public SUM(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SUM, 0); }
	public AVG(): TerminalNode | undefined { return this.tryGetToken(BNGParser.AVG, 0); }
	public IF(): TerminalNode | undefined { return this.tryGetToken(BNGParser.IF, 0); }
	public SAT(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SAT, 0); }
	public MM(): TerminalNode | undefined { return this.tryGetToken(BNGParser.MM, 0); }
	public HILL(): TerminalNode | undefined { return this.tryGetToken(BNGParser.HILL, 0); }
	public ARRHENIUS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.ARRHENIUS, 0); }
	public TIME(): TerminalNode | undefined { return this.tryGetToken(BNGParser.TIME, 0); }
	public expression_list(): Expression_listContext | undefined {
		return this.tryGetRuleContext(0, Expression_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_function_call; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterFunction_call) {
			listener.enterFunction_call(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitFunction_call) {
			listener.exitFunction_call(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitFunction_call) {
			return visitor.visitFunction_call(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Observable_refContext extends ParserRuleContext {
	public STRING(): TerminalNode { return this.getToken(BNGParser.STRING, 0); }
	public LPAREN(): TerminalNode { return this.getToken(BNGParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(BNGParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_observable_ref; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterObservable_ref) {
			listener.enterObservable_ref(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitObservable_ref) {
			listener.exitObservable_ref(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitObservable_ref) {
			return visitor.visitObservable_ref(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	public INT(): TerminalNode | undefined { return this.tryGetToken(BNGParser.INT, 0); }
	public FLOAT(): TerminalNode | undefined { return this.tryGetToken(BNGParser.FLOAT, 0); }
	public PI(): TerminalNode | undefined { return this.tryGetToken(BNGParser.PI, 0); }
	public EULERIAN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.EULERIAN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_literal; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterLiteral) {
			listener.enterLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitLiteral) {
			listener.exitLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitLiteral) {
			return visitor.visitLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


