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
	public static readonly RULE_molecule_tag = 19;
	public static readonly RULE_component_pattern_list = 20;
	public static readonly RULE_component_pattern = 21;
	public static readonly RULE_state_value = 22;
	public static readonly RULE_bond_spec = 23;
	public static readonly RULE_bond_id = 24;
	public static readonly RULE_observables_block = 25;
	public static readonly RULE_observable_def = 26;
	public static readonly RULE_observable_type = 27;
	public static readonly RULE_observable_pattern_list = 28;
	public static readonly RULE_reaction_rules_block = 29;
	public static readonly RULE_reaction_rule_def = 30;
	public static readonly RULE_label_def = 31;
	public static readonly RULE_reactant_patterns = 32;
	public static readonly RULE_product_patterns = 33;
	public static readonly RULE_reaction_sign = 34;
	public static readonly RULE_rate_law = 35;
	public static readonly RULE_rule_modifiers = 36;
	public static readonly RULE_pattern_list = 37;
	public static readonly RULE_functions_block = 38;
	public static readonly RULE_function_def = 39;
	public static readonly RULE_param_list = 40;
	public static readonly RULE_compartments_block = 41;
	public static readonly RULE_compartment_def = 42;
	public static readonly RULE_energy_patterns_block = 43;
	public static readonly RULE_energy_pattern_def = 44;
	public static readonly RULE_population_maps_block = 45;
	public static readonly RULE_population_map_def = 46;
	public static readonly RULE_actions_block = 47;
	public static readonly RULE_wrapped_actions_block = 48;
	public static readonly RULE_action_command = 49;
	public static readonly RULE_generate_network_cmd = 50;
	public static readonly RULE_simulate_cmd = 51;
	public static readonly RULE_write_cmd = 52;
	public static readonly RULE_set_cmd = 53;
	public static readonly RULE_other_action_cmd = 54;
	public static readonly RULE_action_args = 55;
	public static readonly RULE_action_arg_list = 56;
	public static readonly RULE_action_arg = 57;
	public static readonly RULE_action_arg_value = 58;
	public static readonly RULE_nested_hash_list = 59;
	public static readonly RULE_nested_hash_item = 60;
	public static readonly RULE_arg_name = 61;
	public static readonly RULE_expression_list = 62;
	public static readonly RULE_expression = 63;
	public static readonly RULE_conditional_expr = 64;
	public static readonly RULE_or_expr = 65;
	public static readonly RULE_and_expr = 66;
	public static readonly RULE_equality_expr = 67;
	public static readonly RULE_relational_expr = 68;
	public static readonly RULE_additive_expr = 69;
	public static readonly RULE_multiplicative_expr = 70;
	public static readonly RULE_power_expr = 71;
	public static readonly RULE_unary_expr = 72;
	public static readonly RULE_primary_expr = 73;
	public static readonly RULE_function_call = 74;
	public static readonly RULE_observable_ref = 75;
	public static readonly RULE_literal = 76;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"prog", "header_block", "version_def", "substance_def", "set_option", 
		"set_model_name", "program_block", "parameters_block", "parameter_def", 
		"molecule_types_block", "molecule_type_def", "molecule_def", "component_def_list", 
		"component_def", "state_list", "seed_species_block", "seed_species_def", 
		"species_def", "molecule_pattern", "molecule_tag", "component_pattern_list", 
		"component_pattern", "state_value", "bond_spec", "bond_id", "observables_block", 
		"observable_def", "observable_type", "observable_pattern_list", "reaction_rules_block", 
		"reaction_rule_def", "label_def", "reactant_patterns", "product_patterns", 
		"reaction_sign", "rate_law", "rule_modifiers", "pattern_list", "functions_block", 
		"function_def", "param_list", "compartments_block", "compartment_def", 
		"energy_patterns_block", "energy_pattern_def", "population_maps_block", 
		"population_map_def", "actions_block", "wrapped_actions_block", "action_command", 
		"generate_network_cmd", "simulate_cmd", "write_cmd", "set_cmd", "other_action_cmd", 
		"action_args", "action_arg_list", "action_arg", "action_arg_value", "nested_hash_list", 
		"nested_hash_item", "arg_name", "expression_list", "expression", "conditional_expr", 
		"or_expr", "and_expr", "equality_expr", "relational_expr", "additive_expr", 
		"multiplicative_expr", "power_expr", "unary_expr", "primary_expr", "function_call", 
		"observable_ref", "literal",
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
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 157;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 154;
				this.match(BNGParser.LB);
				}
				}
				this.state = 159;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 163;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (BNGParser.VERSION - 33)) | (1 << (BNGParser.SET_OPTION - 33)) | (1 << (BNGParser.SET_MODEL_NAME - 33)) | (1 << (BNGParser.SUBSTANCEUNITS - 33)))) !== 0)) {
				{
				{
				this.state = 160;
				this.header_block();
				}
				}
				this.state = 165;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 193;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				{
				{
				this.state = 166;
				this.match(BNGParser.BEGIN);
				this.state = 167;
				this.match(BNGParser.MODEL);
				this.state = 169;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 168;
					this.match(BNGParser.LB);
					}
					}
					this.state = 171;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				this.state = 176;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === BNGParser.BEGIN) {
					{
					{
					this.state = 173;
					this.program_block();
					}
					}
					this.state = 178;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 179;
				this.match(BNGParser.END);
				this.state = 180;
				this.match(BNGParser.MODEL);
				this.state = 184;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === BNGParser.LB) {
					{
					{
					this.state = 181;
					this.match(BNGParser.LB);
					}
					}
					this.state = 186;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				}
				break;

			case 2:
				{
				this.state = 190;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 5, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 187;
						this.program_block();
						}
						}
					}
					this.state = 192;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 5, this._ctx);
				}
				}
				break;
			}
			this.state = 197;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BNGParser.BEGIN:
				{
				this.state = 195;
				this.wrapped_actions_block();
				}
				break;
			case BNGParser.GENERATENETWORK:
			case BNGParser.GENERATEHYBRIDMODEL:
			case BNGParser.SIMULATE:
			case BNGParser.SIMULATE_ODE:
			case BNGParser.SIMULATE_SSA:
			case BNGParser.SIMULATE_PLA:
			case BNGParser.SIMULATE_NF:
			case BNGParser.PARAMETER_SCAN:
			case BNGParser.BIFURCATE:
			case BNGParser.READFILE:
			case BNGParser.VISUALIZE:
			case BNGParser.WRITEFILE:
			case BNGParser.WRITEMODEL:
			case BNGParser.WRITEXML:
			case BNGParser.WRITENETWORK:
			case BNGParser.WRITESBML:
			case BNGParser.WRITEMFILE:
			case BNGParser.WRITEMEXFILE:
			case BNGParser.SETCONCENTRATION:
			case BNGParser.ADDCONCENTRATION:
			case BNGParser.SAVECONCENTRATIONS:
			case BNGParser.RESETCONCENTRATIONS:
			case BNGParser.SETPARAMETER:
			case BNGParser.SAVEPARAMETERS:
			case BNGParser.RESETPARAMETERS:
			case BNGParser.QUIT:
				{
				this.state = 196;
				this.actions_block();
				}
				break;
			case BNGParser.EOF:
				break;
			default:
				break;
			}
			this.state = 199;
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
			this.state = 205;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BNGParser.VERSION:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 201;
				this.version_def();
				}
				break;
			case BNGParser.SUBSTANCEUNITS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 202;
				this.substance_def();
				}
				break;
			case BNGParser.SET_OPTION:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 203;
				this.set_option();
				}
				break;
			case BNGParser.SET_MODEL_NAME:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 204;
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
			this.state = 207;
			this.match(BNGParser.VERSION);
			this.state = 208;
			this.match(BNGParser.LPAREN);
			this.state = 209;
			this.match(BNGParser.DBQUOTES);
			this.state = 210;
			this.match(BNGParser.VERSION_NUMBER);
			this.state = 212;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.STRING) {
				{
				this.state = 211;
				this.match(BNGParser.STRING);
				}
			}

			this.state = 214;
			this.match(BNGParser.DBQUOTES);
			this.state = 215;
			this.match(BNGParser.RPAREN);
			this.state = 217;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.SEMI) {
				{
				this.state = 216;
				this.match(BNGParser.SEMI);
				}
			}

			this.state = 220;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 219;
				this.match(BNGParser.LB);
				}
				}
				this.state = 222;
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
			this.state = 224;
			this.match(BNGParser.SUBSTANCEUNITS);
			this.state = 225;
			this.match(BNGParser.LPAREN);
			this.state = 226;
			this.match(BNGParser.DBQUOTES);
			this.state = 227;
			this.match(BNGParser.STRING);
			this.state = 228;
			this.match(BNGParser.DBQUOTES);
			this.state = 229;
			this.match(BNGParser.RPAREN);
			this.state = 231;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.SEMI) {
				{
				this.state = 230;
				this.match(BNGParser.SEMI);
				}
			}

			this.state = 234;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 233;
				this.match(BNGParser.LB);
				}
				}
				this.state = 236;
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
			this.state = 238;
			this.match(BNGParser.SET_OPTION);
			this.state = 239;
			this.match(BNGParser.LPAREN);
			this.state = 240;
			this.match(BNGParser.DBQUOTES);
			this.state = 241;
			this.match(BNGParser.STRING);
			this.state = 242;
			this.match(BNGParser.DBQUOTES);
			this.state = 243;
			this.match(BNGParser.COMMA);
			this.state = 249;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BNGParser.DBQUOTES:
				{
				this.state = 244;
				this.match(BNGParser.DBQUOTES);
				this.state = 245;
				this.match(BNGParser.STRING);
				this.state = 246;
				this.match(BNGParser.DBQUOTES);
				}
				break;
			case BNGParser.INT:
				{
				this.state = 247;
				this.match(BNGParser.INT);
				}
				break;
			case BNGParser.FLOAT:
				{
				this.state = 248;
				this.match(BNGParser.FLOAT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 265;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.COMMA) {
				{
				{
				this.state = 251;
				this.match(BNGParser.COMMA);
				this.state = 252;
				this.match(BNGParser.DBQUOTES);
				this.state = 253;
				this.match(BNGParser.STRING);
				this.state = 254;
				this.match(BNGParser.DBQUOTES);
				this.state = 255;
				this.match(BNGParser.COMMA);
				this.state = 261;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case BNGParser.DBQUOTES:
					{
					this.state = 256;
					this.match(BNGParser.DBQUOTES);
					this.state = 257;
					this.match(BNGParser.STRING);
					this.state = 258;
					this.match(BNGParser.DBQUOTES);
					}
					break;
				case BNGParser.INT:
					{
					this.state = 259;
					this.match(BNGParser.INT);
					}
					break;
				case BNGParser.FLOAT:
					{
					this.state = 260;
					this.match(BNGParser.FLOAT);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 267;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 268;
			this.match(BNGParser.RPAREN);
			this.state = 270;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.SEMI) {
				{
				this.state = 269;
				this.match(BNGParser.SEMI);
				}
			}

			this.state = 273;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 272;
				this.match(BNGParser.LB);
				}
				}
				this.state = 275;
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
			this.state = 277;
			this.match(BNGParser.SET_MODEL_NAME);
			this.state = 278;
			this.match(BNGParser.LPAREN);
			this.state = 279;
			this.match(BNGParser.DBQUOTES);
			this.state = 280;
			this.match(BNGParser.STRING);
			this.state = 281;
			this.match(BNGParser.DBQUOTES);
			this.state = 282;
			this.match(BNGParser.RPAREN);
			this.state = 284;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.SEMI) {
				{
				this.state = 283;
				this.match(BNGParser.SEMI);
				}
			}

			this.state = 287;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 286;
				this.match(BNGParser.LB);
				}
				}
				this.state = 289;
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
			this.state = 301;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 21, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 291;
				this.parameters_block();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 292;
				this.molecule_types_block();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 293;
				this.seed_species_block();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 294;
				this.observables_block();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 295;
				this.reaction_rules_block();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 296;
				this.functions_block();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 297;
				this.compartments_block();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 298;
				this.energy_patterns_block();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 299;
				this.population_maps_block();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 300;
				this.wrapped_actions_block();
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
			this.state = 303;
			this.match(BNGParser.BEGIN);
			this.state = 304;
			this.match(BNGParser.PARAMETERS);
			this.state = 306;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 305;
				this.match(BNGParser.LB);
				}
				}
				this.state = 308;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 318;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.STRING) {
				{
				{
				this.state = 310;
				this.parameter_def();
				this.state = 312;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 311;
					this.match(BNGParser.LB);
					}
					}
					this.state = 314;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				}
				}
				this.state = 320;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 321;
			this.match(BNGParser.END);
			this.state = 322;
			this.match(BNGParser.PARAMETERS);
			this.state = 326;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 323;
				this.match(BNGParser.LB);
				}
				}
				this.state = 328;
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
			this.state = 331;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 26, this._ctx) ) {
			case 1:
				{
				this.state = 329;
				this.match(BNGParser.STRING);
				this.state = 330;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 333;
			this.match(BNGParser.STRING);
			this.state = 335;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.BECOMES) {
				{
				this.state = 334;
				this.match(BNGParser.BECOMES);
				}
			}

			this.state = 338;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 143)) & ~0x1F) === 0 && ((1 << (_la - 143)) & ((1 << (BNGParser.SAT - 143)) | (1 << (BNGParser.MM - 143)) | (1 << (BNGParser.HILL - 143)) | (1 << (BNGParser.ARRHENIUS - 143)) | (1 << (BNGParser.IF - 143)) | (1 << (BNGParser.EXP - 143)) | (1 << (BNGParser.LN - 143)) | (1 << (BNGParser.LOG10 - 143)) | (1 << (BNGParser.LOG2 - 143)) | (1 << (BNGParser.SQRT - 143)) | (1 << (BNGParser.RINT - 143)) | (1 << (BNGParser.ABS - 143)) | (1 << (BNGParser.SIN - 143)) | (1 << (BNGParser.COS - 143)) | (1 << (BNGParser.TAN - 143)) | (1 << (BNGParser.ASIN - 143)) | (1 << (BNGParser.ACOS - 143)) | (1 << (BNGParser.ATAN - 143)) | (1 << (BNGParser.SINH - 143)) | (1 << (BNGParser.COSH - 143)) | (1 << (BNGParser.TANH - 143)) | (1 << (BNGParser.ASINH - 143)) | (1 << (BNGParser.ACOSH - 143)) | (1 << (BNGParser.ATANH - 143)) | (1 << (BNGParser.PI - 143)) | (1 << (BNGParser.EULERIAN - 143)) | (1 << (BNGParser.MIN - 143)) | (1 << (BNGParser.MAX - 143)) | (1 << (BNGParser.SUM - 143)) | (1 << (BNGParser.AVG - 143)) | (1 << (BNGParser.TIME - 143)) | (1 << (BNGParser.FLOAT - 143)))) !== 0) || ((((_la - 175)) & ~0x1F) === 0 && ((1 << (_la - 175)) & ((1 << (BNGParser.INT - 175)) | (1 << (BNGParser.STRING - 175)) | (1 << (BNGParser.LPAREN - 175)) | (1 << (BNGParser.MINUS - 175)) | (1 << (BNGParser.PLUS - 175)))) !== 0)) {
				{
				this.state = 337;
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
			this.state = 340;
			this.match(BNGParser.BEGIN);
			this.state = 341;
			this.match(BNGParser.MOLECULE);
			this.state = 342;
			this.match(BNGParser.TYPES);
			this.state = 344;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 343;
				this.match(BNGParser.LB);
				}
				}
				this.state = 346;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 356;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.STRING) {
				{
				{
				this.state = 348;
				this.molecule_type_def();
				this.state = 350;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 349;
					this.match(BNGParser.LB);
					}
					}
					this.state = 352;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				}
				}
				this.state = 358;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 359;
			this.match(BNGParser.END);
			this.state = 360;
			this.match(BNGParser.MOLECULE);
			this.state = 361;
			this.match(BNGParser.TYPES);
			this.state = 365;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 362;
				this.match(BNGParser.LB);
				}
				}
				this.state = 367;
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
			this.state = 370;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 33, this._ctx) ) {
			case 1:
				{
				this.state = 368;
				this.match(BNGParser.STRING);
				this.state = 369;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 372;
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
			this.state = 374;
			this.match(BNGParser.STRING);
			this.state = 380;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.LPAREN) {
				{
				this.state = 375;
				this.match(BNGParser.LPAREN);
				this.state = 377;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 34, this._ctx) ) {
				case 1:
					{
					this.state = 376;
					this.component_def_list();
					}
					break;
				}
				this.state = 379;
				this.match(BNGParser.RPAREN);
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
	public component_def_list(): Component_def_listContext {
		let _localctx: Component_def_listContext = new Component_def_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, BNGParser.RULE_component_def_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 383;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.STRING) {
				{
				this.state = 382;
				this.component_def();
				}
			}

			this.state = 391;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.COMMA) {
				{
				{
				this.state = 385;
				this.match(BNGParser.COMMA);
				this.state = 387;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === BNGParser.STRING) {
					{
					this.state = 386;
					this.component_def();
					}
				}

				}
				}
				this.state = 393;
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
			this.state = 394;
			this.match(BNGParser.STRING);
			this.state = 397;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.TILDE) {
				{
				this.state = 395;
				this.match(BNGParser.TILDE);
				this.state = 396;
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
			this.state = 399;
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
			this.state = 404;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.TILDE) {
				{
				{
				this.state = 400;
				this.match(BNGParser.TILDE);
				this.state = 401;
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
				this.state = 406;
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
			this.state = 407;
			this.match(BNGParser.BEGIN);
			this.state = 411;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BNGParser.SEED:
				{
				this.state = 408;
				this.match(BNGParser.SEED);
				this.state = 409;
				this.match(BNGParser.SPECIES);
				}
				break;
			case BNGParser.SPECIES:
				{
				this.state = 410;
				this.match(BNGParser.SPECIES);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 414;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 413;
				this.match(BNGParser.LB);
				}
				}
				this.state = 416;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 426;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 176)) & ~0x1F) === 0 && ((1 << (_la - 176)) & ((1 << (BNGParser.STRING - 176)) | (1 << (BNGParser.DOLLAR - 176)) | (1 << (BNGParser.AT - 176)))) !== 0)) {
				{
				{
				this.state = 418;
				this.seed_species_def();
				this.state = 420;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 419;
					this.match(BNGParser.LB);
					}
					}
					this.state = 422;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				}
				}
				this.state = 428;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 429;
			this.match(BNGParser.END);
			this.state = 433;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BNGParser.SEED:
				{
				this.state = 430;
				this.match(BNGParser.SEED);
				this.state = 431;
				this.match(BNGParser.SPECIES);
				}
				break;
			case BNGParser.SPECIES:
				{
				this.state = 432;
				this.match(BNGParser.SPECIES);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 438;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 435;
				this.match(BNGParser.LB);
				}
				}
				this.state = 440;
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
			this.state = 443;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 47, this._ctx) ) {
			case 1:
				{
				this.state = 441;
				this.match(BNGParser.STRING);
				this.state = 442;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 446;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.DOLLAR) {
				{
				this.state = 445;
				this.match(BNGParser.DOLLAR);
				}
			}

			this.state = 451;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 49, this._ctx) ) {
			case 1:
				{
				this.state = 448;
				this.match(BNGParser.AT);
				this.state = 449;
				this.match(BNGParser.STRING);
				this.state = 450;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 453;
			this.species_def();
			this.state = 454;
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
			this.state = 459;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.AT) {
				{
				this.state = 456;
				this.match(BNGParser.AT);
				this.state = 457;
				this.match(BNGParser.STRING);
				this.state = 458;
				this.match(BNGParser.COLON);
				}
			}

			this.state = 461;
			this.molecule_pattern();
			this.state = 466;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.DOT) {
				{
				{
				this.state = 462;
				this.match(BNGParser.DOT);
				this.state = 463;
				this.molecule_pattern();
				}
				}
				this.state = 468;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 471;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.AT) {
				{
				this.state = 469;
				this.match(BNGParser.AT);
				this.state = 470;
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
			this.state = 473;
			this.match(BNGParser.STRING);
			this.state = 479;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 54, this._ctx) ) {
			case 1:
				{
				this.state = 474;
				this.match(BNGParser.LPAREN);
				this.state = 476;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 53, this._ctx) ) {
				case 1:
					{
					this.state = 475;
					this.component_pattern_list();
					}
					break;
				}
				this.state = 478;
				this.match(BNGParser.RPAREN);
				}
				break;
			}
			this.state = 482;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.MOD) {
				{
				this.state = 481;
				this.molecule_tag();
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
	public molecule_tag(): Molecule_tagContext {
		let _localctx: Molecule_tagContext = new Molecule_tagContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, BNGParser.RULE_molecule_tag);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 484;
			this.match(BNGParser.MOD);
			this.state = 485;
			this.match(BNGParser.INT);
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
		this.enterRule(_localctx, 40, BNGParser.RULE_component_pattern_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 488;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.STRING) {
				{
				this.state = 487;
				this.component_pattern();
				}
			}

			this.state = 496;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.COMMA) {
				{
				{
				this.state = 490;
				this.match(BNGParser.COMMA);
				this.state = 492;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === BNGParser.STRING) {
					{
					this.state = 491;
					this.component_pattern();
					}
				}

				}
				}
				this.state = 498;
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
		this.enterRule(_localctx, 42, BNGParser.RULE_component_pattern);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 499;
			this.match(BNGParser.STRING);
			this.state = 502;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.TILDE) {
				{
				this.state = 500;
				this.match(BNGParser.TILDE);
				this.state = 501;
				this.state_value();
				}
			}

			this.state = 507;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.EMARK) {
				{
				{
				this.state = 504;
				this.bond_spec();
				}
				}
				this.state = 509;
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
	public state_value(): State_valueContext {
		let _localctx: State_valueContext = new State_valueContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, BNGParser.RULE_state_value);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 510;
			_la = this._input.LA(1);
			if (!(((((_la - 175)) & ~0x1F) === 0 && ((1 << (_la - 175)) & ((1 << (BNGParser.INT - 175)) | (1 << (BNGParser.STRING - 175)) | (1 << (BNGParser.QMARK - 175)))) !== 0))) {
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
		this.enterRule(_localctx, 46, BNGParser.RULE_bond_spec);
		try {
			this.state = 518;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 61, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 512;
				this.match(BNGParser.EMARK);
				this.state = 513;
				this.bond_id();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 514;
				this.match(BNGParser.EMARK);
				this.state = 515;
				this.match(BNGParser.PLUS);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 516;
				this.match(BNGParser.EMARK);
				this.state = 517;
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
		this.enterRule(_localctx, 48, BNGParser.RULE_bond_id);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 520;
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
		this.enterRule(_localctx, 50, BNGParser.RULE_observables_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 522;
			this.match(BNGParser.BEGIN);
			this.state = 523;
			this.match(BNGParser.OBSERVABLES);
			this.state = 525;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 524;
				this.match(BNGParser.LB);
				}
				}
				this.state = 527;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 537;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.MOLECULES || _la === BNGParser.SPECIES || _la === BNGParser.STRING) {
				{
				{
				this.state = 529;
				this.observable_def();
				this.state = 531;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 530;
					this.match(BNGParser.LB);
					}
					}
					this.state = 533;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				}
				}
				this.state = 539;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 540;
			this.match(BNGParser.END);
			this.state = 541;
			this.match(BNGParser.OBSERVABLES);
			this.state = 545;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 542;
				this.match(BNGParser.LB);
				}
				}
				this.state = 547;
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
		this.enterRule(_localctx, 52, BNGParser.RULE_observable_def);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 550;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 66, this._ctx) ) {
			case 1:
				{
				this.state = 548;
				this.match(BNGParser.STRING);
				this.state = 549;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 552;
			this.observable_type();
			this.state = 553;
			this.match(BNGParser.STRING);
			this.state = 554;
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
		this.enterRule(_localctx, 54, BNGParser.RULE_observable_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 556;
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
		this.enterRule(_localctx, 56, BNGParser.RULE_observable_pattern_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 558;
			this.species_def();
			this.state = 563;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.COMMA) {
				{
				{
				this.state = 559;
				this.match(BNGParser.COMMA);
				this.state = 560;
				this.species_def();
				}
				}
				this.state = 565;
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
		this.enterRule(_localctx, 58, BNGParser.RULE_reaction_rules_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 566;
			this.match(BNGParser.BEGIN);
			this.state = 567;
			this.match(BNGParser.REACTION);
			this.state = 568;
			this.match(BNGParser.RULES);
			this.state = 570;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 569;
				this.match(BNGParser.LB);
				}
				}
				this.state = 572;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 582;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 175)) & ~0x1F) === 0 && ((1 << (_la - 175)) & ((1 << (BNGParser.INT - 175)) | (1 << (BNGParser.STRING - 175)) | (1 << (BNGParser.LBRACKET - 175)) | (1 << (BNGParser.AT - 175)))) !== 0)) {
				{
				{
				this.state = 574;
				this.reaction_rule_def();
				this.state = 576;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 575;
					this.match(BNGParser.LB);
					}
					}
					this.state = 578;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				}
				}
				this.state = 584;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 585;
			this.match(BNGParser.END);
			this.state = 586;
			this.match(BNGParser.REACTION);
			this.state = 587;
			this.match(BNGParser.RULES);
			this.state = 591;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 588;
				this.match(BNGParser.LB);
				}
				}
				this.state = 593;
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
		this.enterRule(_localctx, 60, BNGParser.RULE_reaction_rule_def);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 597;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 72, this._ctx) ) {
			case 1:
				{
				this.state = 594;
				this.label_def();
				this.state = 595;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 603;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.LBRACKET) {
				{
				this.state = 599;
				this.match(BNGParser.LBRACKET);
				this.state = 600;
				this.rule_modifiers();
				this.state = 601;
				this.match(BNGParser.RBRACKET);
				}
			}

			this.state = 605;
			this.reactant_patterns();
			this.state = 606;
			this.reaction_sign();
			this.state = 607;
			this.product_patterns();
			this.state = 608;
			this.rate_law();
			this.state = 610;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 25)) & ~0x1F) === 0 && ((1 << (_la - 25)) & ((1 << (BNGParser.MATCHONCE - 25)) | (1 << (BNGParser.DELETEMOLECULES - 25)) | (1 << (BNGParser.MOVECONNECTED - 25)) | (1 << (BNGParser.INCLUDE_REACTANTS - 25)) | (1 << (BNGParser.INCLUDE_PRODUCTS - 25)) | (1 << (BNGParser.EXCLUDE_REACTANTS - 25)) | (1 << (BNGParser.EXCLUDE_PRODUCTS - 25)) | (1 << (BNGParser.TOTALRATE - 25)))) !== 0)) {
				{
				this.state = 609;
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
		this.enterRule(_localctx, 62, BNGParser.RULE_label_def);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 612;
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
		this.enterRule(_localctx, 64, BNGParser.RULE_reactant_patterns);
		let _la: number;
		try {
			this.state = 623;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BNGParser.STRING:
			case BNGParser.AT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 614;
				this.species_def();
				this.state = 619;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === BNGParser.PLUS) {
					{
					{
					this.state = 615;
					this.match(BNGParser.PLUS);
					this.state = 616;
					this.species_def();
					}
					}
					this.state = 621;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case BNGParser.INT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 622;
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
		this.enterRule(_localctx, 66, BNGParser.RULE_product_patterns);
		try {
			let _alt: number;
			this.state = 634;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BNGParser.STRING:
			case BNGParser.AT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 625;
				this.species_def();
				this.state = 630;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 77, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 626;
						this.match(BNGParser.PLUS);
						this.state = 627;
						this.species_def();
						}
						}
					}
					this.state = 632;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 77, this._ctx);
				}
				}
				break;
			case BNGParser.INT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 633;
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
		this.enterRule(_localctx, 68, BNGParser.RULE_reaction_sign);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 636;
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
		this.enterRule(_localctx, 70, BNGParser.RULE_rate_law);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 638;
			this.expression();
			this.state = 641;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.COMMA) {
				{
				this.state = 639;
				this.match(BNGParser.COMMA);
				this.state = 640;
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
		this.enterRule(_localctx, 72, BNGParser.RULE_rule_modifiers);
		try {
			this.state = 675;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BNGParser.DELETEMOLECULES:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 643;
				this.match(BNGParser.DELETEMOLECULES);
				}
				break;
			case BNGParser.MOVECONNECTED:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 644;
				this.match(BNGParser.MOVECONNECTED);
				}
				break;
			case BNGParser.MATCHONCE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 645;
				this.match(BNGParser.MATCHONCE);
				}
				break;
			case BNGParser.TOTALRATE:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 646;
				this.match(BNGParser.TOTALRATE);
				}
				break;
			case BNGParser.INCLUDE_REACTANTS:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 647;
				this.match(BNGParser.INCLUDE_REACTANTS);
				this.state = 648;
				this.match(BNGParser.LPAREN);
				this.state = 649;
				this.match(BNGParser.INT);
				this.state = 650;
				this.match(BNGParser.COMMA);
				this.state = 651;
				this.pattern_list();
				this.state = 652;
				this.match(BNGParser.RPAREN);
				}
				break;
			case BNGParser.EXCLUDE_REACTANTS:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 654;
				this.match(BNGParser.EXCLUDE_REACTANTS);
				this.state = 655;
				this.match(BNGParser.LPAREN);
				this.state = 656;
				this.match(BNGParser.INT);
				this.state = 657;
				this.match(BNGParser.COMMA);
				this.state = 658;
				this.pattern_list();
				this.state = 659;
				this.match(BNGParser.RPAREN);
				}
				break;
			case BNGParser.INCLUDE_PRODUCTS:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 661;
				this.match(BNGParser.INCLUDE_PRODUCTS);
				this.state = 662;
				this.match(BNGParser.LPAREN);
				this.state = 663;
				this.match(BNGParser.INT);
				this.state = 664;
				this.match(BNGParser.COMMA);
				this.state = 665;
				this.pattern_list();
				this.state = 666;
				this.match(BNGParser.RPAREN);
				}
				break;
			case BNGParser.EXCLUDE_PRODUCTS:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 668;
				this.match(BNGParser.EXCLUDE_PRODUCTS);
				this.state = 669;
				this.match(BNGParser.LPAREN);
				this.state = 670;
				this.match(BNGParser.INT);
				this.state = 671;
				this.match(BNGParser.COMMA);
				this.state = 672;
				this.pattern_list();
				this.state = 673;
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
		this.enterRule(_localctx, 74, BNGParser.RULE_pattern_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 677;
			this.species_def();
			this.state = 682;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.COMMA) {
				{
				{
				this.state = 678;
				this.match(BNGParser.COMMA);
				this.state = 679;
				this.species_def();
				}
				}
				this.state = 684;
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
		this.enterRule(_localctx, 76, BNGParser.RULE_functions_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 685;
			this.match(BNGParser.BEGIN);
			this.state = 686;
			this.match(BNGParser.FUNCTIONS);
			this.state = 688;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 687;
				this.match(BNGParser.LB);
				}
				}
				this.state = 690;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 700;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.STRING) {
				{
				{
				this.state = 692;
				this.function_def();
				this.state = 694;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 693;
					this.match(BNGParser.LB);
					}
					}
					this.state = 696;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				}
				}
				this.state = 702;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 703;
			this.match(BNGParser.END);
			this.state = 704;
			this.match(BNGParser.FUNCTIONS);
			this.state = 708;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 705;
				this.match(BNGParser.LB);
				}
				}
				this.state = 710;
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
		this.enterRule(_localctx, 78, BNGParser.RULE_function_def);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 713;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 86, this._ctx) ) {
			case 1:
				{
				this.state = 711;
				this.match(BNGParser.STRING);
				this.state = 712;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 715;
			this.match(BNGParser.STRING);
			this.state = 716;
			this.match(BNGParser.LPAREN);
			this.state = 718;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.STRING) {
				{
				this.state = 717;
				this.param_list();
				}
			}

			this.state = 720;
			this.match(BNGParser.RPAREN);
			this.state = 722;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.BECOMES) {
				{
				this.state = 721;
				this.match(BNGParser.BECOMES);
				}
			}

			this.state = 724;
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
		this.enterRule(_localctx, 80, BNGParser.RULE_param_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 726;
			this.match(BNGParser.STRING);
			this.state = 731;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.COMMA) {
				{
				{
				this.state = 727;
				this.match(BNGParser.COMMA);
				this.state = 728;
				this.match(BNGParser.STRING);
				}
				}
				this.state = 733;
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
		this.enterRule(_localctx, 82, BNGParser.RULE_compartments_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 734;
			this.match(BNGParser.BEGIN);
			this.state = 735;
			this.match(BNGParser.COMPARTMENTS);
			this.state = 737;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 736;
				this.match(BNGParser.LB);
				}
				}
				this.state = 739;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 749;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.STRING) {
				{
				{
				this.state = 741;
				this.compartment_def();
				this.state = 743;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 742;
					this.match(BNGParser.LB);
					}
					}
					this.state = 745;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				}
				}
				this.state = 751;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 752;
			this.match(BNGParser.END);
			this.state = 753;
			this.match(BNGParser.COMPARTMENTS);
			this.state = 757;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 754;
				this.match(BNGParser.LB);
				}
				}
				this.state = 759;
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
		this.enterRule(_localctx, 84, BNGParser.RULE_compartment_def);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 762;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 94, this._ctx) ) {
			case 1:
				{
				this.state = 760;
				this.match(BNGParser.STRING);
				this.state = 761;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 764;
			this.match(BNGParser.STRING);
			this.state = 765;
			this.match(BNGParser.INT);
			this.state = 766;
			this.expression();
			this.state = 768;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.STRING) {
				{
				this.state = 767;
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
		this.enterRule(_localctx, 86, BNGParser.RULE_energy_patterns_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 770;
			this.match(BNGParser.BEGIN);
			this.state = 771;
			this.match(BNGParser.ENERGY);
			this.state = 772;
			this.match(BNGParser.PATTERNS);
			this.state = 774;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 773;
				this.match(BNGParser.LB);
				}
				}
				this.state = 776;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 786;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.STRING || _la === BNGParser.AT) {
				{
				{
				this.state = 778;
				this.energy_pattern_def();
				this.state = 780;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 779;
					this.match(BNGParser.LB);
					}
					}
					this.state = 782;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				}
				}
				this.state = 788;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 789;
			this.match(BNGParser.END);
			this.state = 790;
			this.match(BNGParser.ENERGY);
			this.state = 791;
			this.match(BNGParser.PATTERNS);
			this.state = 795;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 792;
				this.match(BNGParser.LB);
				}
				}
				this.state = 797;
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
		this.enterRule(_localctx, 88, BNGParser.RULE_energy_pattern_def);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 800;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 100, this._ctx) ) {
			case 1:
				{
				this.state = 798;
				this.match(BNGParser.STRING);
				this.state = 799;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 802;
			this.species_def();
			this.state = 803;
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
		this.enterRule(_localctx, 90, BNGParser.RULE_population_maps_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 805;
			this.match(BNGParser.BEGIN);
			this.state = 806;
			this.match(BNGParser.POPULATION);
			this.state = 807;
			this.match(BNGParser.MAPS);
			this.state = 809;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 808;
				this.match(BNGParser.LB);
				}
				}
				this.state = 811;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 821;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.STRING || _la === BNGParser.AT) {
				{
				{
				this.state = 813;
				this.population_map_def();
				this.state = 815;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 814;
					this.match(BNGParser.LB);
					}
					}
					this.state = 817;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === BNGParser.LB);
				}
				}
				this.state = 823;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 824;
			this.match(BNGParser.END);
			this.state = 825;
			this.match(BNGParser.POPULATION);
			this.state = 826;
			this.match(BNGParser.MAPS);
			this.state = 830;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 827;
				this.match(BNGParser.LB);
				}
				}
				this.state = 832;
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
		this.enterRule(_localctx, 92, BNGParser.RULE_population_map_def);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 835;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 105, this._ctx) ) {
			case 1:
				{
				this.state = 833;
				this.match(BNGParser.STRING);
				this.state = 834;
				this.match(BNGParser.COLON);
				}
				break;
			}
			this.state = 837;
			this.species_def();
			this.state = 838;
			this.match(BNGParser.UNI_REACTION_SIGN);
			this.state = 839;
			this.match(BNGParser.STRING);
			this.state = 840;
			this.match(BNGParser.LPAREN);
			this.state = 842;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.STRING) {
				{
				this.state = 841;
				this.param_list();
				}
			}

			this.state = 844;
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
		this.enterRule(_localctx, 94, BNGParser.RULE_actions_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 847;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 846;
				this.action_command();
				}
				}
				this.state = 849;
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
	public wrapped_actions_block(): Wrapped_actions_blockContext {
		let _localctx: Wrapped_actions_blockContext = new Wrapped_actions_blockContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, BNGParser.RULE_wrapped_actions_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 851;
			this.match(BNGParser.BEGIN);
			this.state = 852;
			this.match(BNGParser.ACTIONS);
			this.state = 854;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 853;
				this.match(BNGParser.LB);
				}
				}
				this.state = 856;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === BNGParser.LB);
			this.state = 861;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & ((1 << (BNGParser.GENERATENETWORK - 39)) | (1 << (BNGParser.GENERATEHYBRIDMODEL - 39)) | (1 << (BNGParser.SIMULATE - 39)))) !== 0) || ((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & ((1 << (BNGParser.SIMULATE_ODE - 73)) | (1 << (BNGParser.SIMULATE_SSA - 73)) | (1 << (BNGParser.SIMULATE_PLA - 73)) | (1 << (BNGParser.SIMULATE_NF - 73)) | (1 << (BNGParser.PARAMETER_SCAN - 73)) | (1 << (BNGParser.BIFURCATE - 73)) | (1 << (BNGParser.READFILE - 73)))) !== 0) || ((((_la - 105)) & ~0x1F) === 0 && ((1 << (_la - 105)) & ((1 << (BNGParser.VISUALIZE - 105)) | (1 << (BNGParser.WRITEFILE - 105)) | (1 << (BNGParser.WRITEMODEL - 105)) | (1 << (BNGParser.WRITEXML - 105)) | (1 << (BNGParser.WRITENETWORK - 105)) | (1 << (BNGParser.WRITESBML - 105)) | (1 << (BNGParser.WRITEMFILE - 105)) | (1 << (BNGParser.WRITEMEXFILE - 105)) | (1 << (BNGParser.SETCONCENTRATION - 105)) | (1 << (BNGParser.ADDCONCENTRATION - 105)))) !== 0) || ((((_la - 137)) & ~0x1F) === 0 && ((1 << (_la - 137)) & ((1 << (BNGParser.SAVECONCENTRATIONS - 137)) | (1 << (BNGParser.RESETCONCENTRATIONS - 137)) | (1 << (BNGParser.SETPARAMETER - 137)) | (1 << (BNGParser.SAVEPARAMETERS - 137)) | (1 << (BNGParser.RESETPARAMETERS - 137)) | (1 << (BNGParser.QUIT - 137)))) !== 0)) {
				{
				{
				this.state = 858;
				this.action_command();
				}
				}
				this.state = 863;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 864;
			this.match(BNGParser.END);
			this.state = 865;
			this.match(BNGParser.ACTIONS);
			this.state = 869;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 866;
				this.match(BNGParser.LB);
				}
				}
				this.state = 871;
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
	public action_command(): Action_commandContext {
		let _localctx: Action_commandContext = new Action_commandContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, BNGParser.RULE_action_command);
		try {
			this.state = 877;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case BNGParser.GENERATENETWORK:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 872;
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
				this.state = 873;
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
				this.state = 874;
				this.write_cmd();
				}
				break;
			case BNGParser.SETCONCENTRATION:
			case BNGParser.ADDCONCENTRATION:
			case BNGParser.SETPARAMETER:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 875;
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
				this.state = 876;
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
		this.enterRule(_localctx, 100, BNGParser.RULE_generate_network_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 879;
			this.match(BNGParser.GENERATENETWORK);
			this.state = 880;
			this.match(BNGParser.LPAREN);
			this.state = 882;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.LBRACKET) {
				{
				this.state = 881;
				this.action_args();
				}
			}

			this.state = 884;
			this.match(BNGParser.RPAREN);
			this.state = 886;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.SEMI) {
				{
				this.state = 885;
				this.match(BNGParser.SEMI);
				}
			}

			this.state = 891;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 888;
				this.match(BNGParser.LB);
				}
				}
				this.state = 893;
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
		this.enterRule(_localctx, 102, BNGParser.RULE_simulate_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 894;
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
			this.state = 895;
			this.match(BNGParser.LPAREN);
			this.state = 897;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.LBRACKET) {
				{
				this.state = 896;
				this.action_args();
				}
			}

			this.state = 899;
			this.match(BNGParser.RPAREN);
			this.state = 901;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.SEMI) {
				{
				this.state = 900;
				this.match(BNGParser.SEMI);
				}
			}

			this.state = 906;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 903;
				this.match(BNGParser.LB);
				}
				}
				this.state = 908;
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
		this.enterRule(_localctx, 104, BNGParser.RULE_write_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 909;
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
			this.state = 910;
			this.match(BNGParser.LPAREN);
			this.state = 912;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.LBRACKET) {
				{
				this.state = 911;
				this.action_args();
				}
			}

			this.state = 914;
			this.match(BNGParser.RPAREN);
			this.state = 916;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.SEMI) {
				{
				this.state = 915;
				this.match(BNGParser.SEMI);
				}
			}

			this.state = 921;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 918;
				this.match(BNGParser.LB);
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
	public set_cmd(): Set_cmdContext {
		let _localctx: Set_cmdContext = new Set_cmdContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, BNGParser.RULE_set_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 924;
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
			this.state = 925;
			this.match(BNGParser.LPAREN);
			this.state = 926;
			this.match(BNGParser.DBQUOTES);
			this.state = 933;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 122, this._ctx) ) {
			case 1:
				{
				this.state = 927;
				this.species_def();
				}
				break;

			case 2:
				{
				this.state = 929;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 928;
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
					this.state = 931;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << BNGParser.LINE_COMMENT) | (1 << BNGParser.LB) | (1 << BNGParser.WS) | (1 << BNGParser.BEGIN) | (1 << BNGParser.END) | (1 << BNGParser.MODEL) | (1 << BNGParser.PARAMETERS) | (1 << BNGParser.COMPARTMENTS) | (1 << BNGParser.MOLECULE) | (1 << BNGParser.MOLECULES) | (1 << BNGParser.TYPES) | (1 << BNGParser.SEED) | (1 << BNGParser.SPECIES) | (1 << BNGParser.OBSERVABLES) | (1 << BNGParser.FUNCTIONS) | (1 << BNGParser.REACTION) | (1 << BNGParser.REACTIONS) | (1 << BNGParser.RULES) | (1 << BNGParser.GROUPS) | (1 << BNGParser.ACTIONS) | (1 << BNGParser.POPULATION) | (1 << BNGParser.MAPS) | (1 << BNGParser.ENERGY) | (1 << BNGParser.PATTERNS) | (1 << BNGParser.MATCHONCE) | (1 << BNGParser.DELETEMOLECULES) | (1 << BNGParser.MOVECONNECTED) | (1 << BNGParser.INCLUDE_REACTANTS) | (1 << BNGParser.INCLUDE_PRODUCTS) | (1 << BNGParser.EXCLUDE_REACTANTS) | (1 << BNGParser.EXCLUDE_PRODUCTS))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (BNGParser.TOTALRATE - 32)) | (1 << (BNGParser.VERSION - 32)) | (1 << (BNGParser.SET_OPTION - 32)) | (1 << (BNGParser.SET_MODEL_NAME - 32)) | (1 << (BNGParser.SUBSTANCEUNITS - 32)) | (1 << (BNGParser.PREFIX - 32)) | (1 << (BNGParser.SUFFIX - 32)) | (1 << (BNGParser.GENERATENETWORK - 32)) | (1 << (BNGParser.OVERWRITE - 32)) | (1 << (BNGParser.MAX_AGG - 32)) | (1 << (BNGParser.MAX_ITER - 32)) | (1 << (BNGParser.MAX_STOICH - 32)) | (1 << (BNGParser.PRINT_ITER - 32)) | (1 << (BNGParser.CHECK_ISO - 32)) | (1 << (BNGParser.GENERATEHYBRIDMODEL - 32)) | (1 << (BNGParser.SAFE - 32)) | (1 << (BNGParser.EXECUTE - 32)) | (1 << (BNGParser.SIMULATE - 32)) | (1 << (BNGParser.METHOD - 32)) | (1 << (BNGParser.ODE - 32)) | (1 << (BNGParser.SSA - 32)) | (1 << (BNGParser.PLA - 32)) | (1 << (BNGParser.NF - 32)) | (1 << (BNGParser.VERBOSE - 32)) | (1 << (BNGParser.NETFILE - 32)) | (1 << (BNGParser.ARGFILE - 32)) | (1 << (BNGParser.CONTINUE - 32)) | (1 << (BNGParser.T_START - 32)) | (1 << (BNGParser.T_END - 32)) | (1 << (BNGParser.N_STEPS - 32)) | (1 << (BNGParser.N_OUTPUT_STEPS - 32)) | (1 << (BNGParser.MAX_SIM_STEPS - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (BNGParser.OUTPUT_STEP_INTERVAL - 64)) | (1 << (BNGParser.SAMPLE_TIMES - 64)) | (1 << (BNGParser.SAVE_PROGRESS - 64)) | (1 << (BNGParser.PRINT_CDAT - 64)) | (1 << (BNGParser.PRINT_FUNCTIONS - 64)) | (1 << (BNGParser.PRINT_NET - 64)) | (1 << (BNGParser.PRINT_END - 64)) | (1 << (BNGParser.STOP_IF - 64)) | (1 << (BNGParser.PRINT_ON_STOP - 64)) | (1 << (BNGParser.SIMULATE_ODE - 64)) | (1 << (BNGParser.ATOL - 64)) | (1 << (BNGParser.RTOL - 64)) | (1 << (BNGParser.STEADY_STATE - 64)) | (1 << (BNGParser.SPARSE - 64)) | (1 << (BNGParser.SIMULATE_SSA - 64)) | (1 << (BNGParser.SIMULATE_PLA - 64)) | (1 << (BNGParser.PLA_CONFIG - 64)) | (1 << (BNGParser.PLA_OUTPUT - 64)) | (1 << (BNGParser.SIMULATE_NF - 64)) | (1 << (BNGParser.PARAM - 64)) | (1 << (BNGParser.COMPLEX - 64)) | (1 << (BNGParser.GET_FINAL_STATE - 64)) | (1 << (BNGParser.GML - 64)) | (1 << (BNGParser.NOCSLF - 64)) | (1 << (BNGParser.NOTF - 64)) | (1 << (BNGParser.BINARY_OUTPUT - 64)) | (1 << (BNGParser.UTL - 64)) | (1 << (BNGParser.EQUIL - 64)) | (1 << (BNGParser.PARAMETER_SCAN - 64)) | (1 << (BNGParser.BIFURCATE - 64)) | (1 << (BNGParser.PARAMETER - 64)) | (1 << (BNGParser.PAR_MIN - 64)))) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & ((1 << (BNGParser.PAR_MAX - 96)) | (1 << (BNGParser.N_SCAN_PTS - 96)) | (1 << (BNGParser.LOG_SCALE - 96)) | (1 << (BNGParser.RESET_CONC - 96)) | (1 << (BNGParser.READFILE - 96)) | (1 << (BNGParser.FILE - 96)) | (1 << (BNGParser.ATOMIZE - 96)) | (1 << (BNGParser.BLOCKS - 96)) | (1 << (BNGParser.SKIPACTIONS - 96)) | (1 << (BNGParser.VISUALIZE - 96)) | (1 << (BNGParser.TYPE - 96)) | (1 << (BNGParser.BACKGROUND - 96)) | (1 << (BNGParser.COLLAPSE - 96)) | (1 << (BNGParser.OPTS - 96)) | (1 << (BNGParser.WRITESSC - 96)) | (1 << (BNGParser.WRITESSCCFG - 96)) | (1 << (BNGParser.FORMAT - 96)) | (1 << (BNGParser.WRITEFILE - 96)) | (1 << (BNGParser.WRITEMODEL - 96)) | (1 << (BNGParser.WRITEXML - 96)) | (1 << (BNGParser.WRITENETWORK - 96)) | (1 << (BNGParser.WRITESBML - 96)) | (1 << (BNGParser.WRITEMDL - 96)) | (1 << (BNGParser.INCLUDE_MODEL - 96)) | (1 << (BNGParser.INCLUDE_NETWORK - 96)) | (1 << (BNGParser.PRETTY_FORMATTING - 96)) | (1 << (BNGParser.EVALUATE_EXPRESSIONS - 96)) | (1 << (BNGParser.TEXTREACTION - 96)) | (1 << (BNGParser.TEXTSPECIES - 96)) | (1 << (BNGParser.WRITEMFILE - 96)) | (1 << (BNGParser.WRITEMEXFILE - 96)) | (1 << (BNGParser.BDF - 96)))) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & ((1 << (BNGParser.MAX_STEP - 128)) | (1 << (BNGParser.MAXORDER - 128)) | (1 << (BNGParser.STATS - 128)) | (1 << (BNGParser.MAX_NUM_STEPS - 128)) | (1 << (BNGParser.MAX_ERR_TEST_FAILS - 128)) | (1 << (BNGParser.MAX_CONV_FAILS - 128)) | (1 << (BNGParser.STIFF - 128)) | (1 << (BNGParser.SETCONCENTRATION - 128)) | (1 << (BNGParser.ADDCONCENTRATION - 128)) | (1 << (BNGParser.SAVECONCENTRATIONS - 128)) | (1 << (BNGParser.RESETCONCENTRATIONS - 128)) | (1 << (BNGParser.SETPARAMETER - 128)) | (1 << (BNGParser.SAVEPARAMETERS - 128)) | (1 << (BNGParser.RESETPARAMETERS - 128)) | (1 << (BNGParser.QUIT - 128)) | (1 << (BNGParser.SAT - 128)) | (1 << (BNGParser.MM - 128)) | (1 << (BNGParser.HILL - 128)) | (1 << (BNGParser.ARRHENIUS - 128)) | (1 << (BNGParser.IF - 128)) | (1 << (BNGParser.EXP - 128)) | (1 << (BNGParser.LN - 128)) | (1 << (BNGParser.LOG10 - 128)) | (1 << (BNGParser.LOG2 - 128)) | (1 << (BNGParser.SQRT - 128)) | (1 << (BNGParser.RINT - 128)) | (1 << (BNGParser.ABS - 128)) | (1 << (BNGParser.SIN - 128)) | (1 << (BNGParser.COS - 128)) | (1 << (BNGParser.TAN - 128)) | (1 << (BNGParser.ASIN - 128)) | (1 << (BNGParser.ACOS - 128)))) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & ((1 << (BNGParser.ATAN - 160)) | (1 << (BNGParser.SINH - 160)) | (1 << (BNGParser.COSH - 160)) | (1 << (BNGParser.TANH - 160)) | (1 << (BNGParser.ASINH - 160)) | (1 << (BNGParser.ACOSH - 160)) | (1 << (BNGParser.ATANH - 160)) | (1 << (BNGParser.PI - 160)) | (1 << (BNGParser.EULERIAN - 160)) | (1 << (BNGParser.MIN - 160)) | (1 << (BNGParser.MAX - 160)) | (1 << (BNGParser.SUM - 160)) | (1 << (BNGParser.AVG - 160)) | (1 << (BNGParser.TIME - 160)) | (1 << (BNGParser.FLOAT - 160)) | (1 << (BNGParser.INT - 160)) | (1 << (BNGParser.STRING - 160)) | (1 << (BNGParser.SEMI - 160)) | (1 << (BNGParser.COLON - 160)) | (1 << (BNGParser.LSBRACKET - 160)) | (1 << (BNGParser.RSBRACKET - 160)) | (1 << (BNGParser.LBRACKET - 160)) | (1 << (BNGParser.RBRACKET - 160)) | (1 << (BNGParser.COMMA - 160)) | (1 << (BNGParser.DOT - 160)) | (1 << (BNGParser.LPAREN - 160)) | (1 << (BNGParser.RPAREN - 160)) | (1 << (BNGParser.UNI_REACTION_SIGN - 160)) | (1 << (BNGParser.BI_REACTION_SIGN - 160)) | (1 << (BNGParser.DOLLAR - 160)) | (1 << (BNGParser.TILDE - 160)) | (1 << (BNGParser.AT - 160)))) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & ((1 << (BNGParser.GTE - 192)) | (1 << (BNGParser.GT - 192)) | (1 << (BNGParser.LTE - 192)) | (1 << (BNGParser.LT - 192)) | (1 << (BNGParser.ASSIGNS - 192)) | (1 << (BNGParser.EQUALS - 192)) | (1 << (BNGParser.BECOMES - 192)) | (1 << (BNGParser.DIV - 192)) | (1 << (BNGParser.TIMES - 192)) | (1 << (BNGParser.MINUS - 192)) | (1 << (BNGParser.PLUS - 192)) | (1 << (BNGParser.POWER - 192)) | (1 << (BNGParser.MOD - 192)) | (1 << (BNGParser.PIPE - 192)) | (1 << (BNGParser.QMARK - 192)) | (1 << (BNGParser.EMARK - 192)) | (1 << (BNGParser.AMPERSAND - 192)) | (1 << (BNGParser.VERSION_NUMBER - 192)) | (1 << (BNGParser.ULB - 192)))) !== 0));
				}
				break;
			}
			this.state = 935;
			this.match(BNGParser.DBQUOTES);
			this.state = 936;
			this.match(BNGParser.COMMA);
			this.state = 946;
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
				this.state = 937;
				this.expression();
				}
				break;
			case BNGParser.DBQUOTES:
				{
				this.state = 938;
				this.match(BNGParser.DBQUOTES);
				this.state = 942;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << BNGParser.LINE_COMMENT) | (1 << BNGParser.LB) | (1 << BNGParser.WS) | (1 << BNGParser.BEGIN) | (1 << BNGParser.END) | (1 << BNGParser.MODEL) | (1 << BNGParser.PARAMETERS) | (1 << BNGParser.COMPARTMENTS) | (1 << BNGParser.MOLECULE) | (1 << BNGParser.MOLECULES) | (1 << BNGParser.TYPES) | (1 << BNGParser.SEED) | (1 << BNGParser.SPECIES) | (1 << BNGParser.OBSERVABLES) | (1 << BNGParser.FUNCTIONS) | (1 << BNGParser.REACTION) | (1 << BNGParser.REACTIONS) | (1 << BNGParser.RULES) | (1 << BNGParser.GROUPS) | (1 << BNGParser.ACTIONS) | (1 << BNGParser.POPULATION) | (1 << BNGParser.MAPS) | (1 << BNGParser.ENERGY) | (1 << BNGParser.PATTERNS) | (1 << BNGParser.MATCHONCE) | (1 << BNGParser.DELETEMOLECULES) | (1 << BNGParser.MOVECONNECTED) | (1 << BNGParser.INCLUDE_REACTANTS) | (1 << BNGParser.INCLUDE_PRODUCTS) | (1 << BNGParser.EXCLUDE_REACTANTS) | (1 << BNGParser.EXCLUDE_PRODUCTS))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (BNGParser.TOTALRATE - 32)) | (1 << (BNGParser.VERSION - 32)) | (1 << (BNGParser.SET_OPTION - 32)) | (1 << (BNGParser.SET_MODEL_NAME - 32)) | (1 << (BNGParser.SUBSTANCEUNITS - 32)) | (1 << (BNGParser.PREFIX - 32)) | (1 << (BNGParser.SUFFIX - 32)) | (1 << (BNGParser.GENERATENETWORK - 32)) | (1 << (BNGParser.OVERWRITE - 32)) | (1 << (BNGParser.MAX_AGG - 32)) | (1 << (BNGParser.MAX_ITER - 32)) | (1 << (BNGParser.MAX_STOICH - 32)) | (1 << (BNGParser.PRINT_ITER - 32)) | (1 << (BNGParser.CHECK_ISO - 32)) | (1 << (BNGParser.GENERATEHYBRIDMODEL - 32)) | (1 << (BNGParser.SAFE - 32)) | (1 << (BNGParser.EXECUTE - 32)) | (1 << (BNGParser.SIMULATE - 32)) | (1 << (BNGParser.METHOD - 32)) | (1 << (BNGParser.ODE - 32)) | (1 << (BNGParser.SSA - 32)) | (1 << (BNGParser.PLA - 32)) | (1 << (BNGParser.NF - 32)) | (1 << (BNGParser.VERBOSE - 32)) | (1 << (BNGParser.NETFILE - 32)) | (1 << (BNGParser.ARGFILE - 32)) | (1 << (BNGParser.CONTINUE - 32)) | (1 << (BNGParser.T_START - 32)) | (1 << (BNGParser.T_END - 32)) | (1 << (BNGParser.N_STEPS - 32)) | (1 << (BNGParser.N_OUTPUT_STEPS - 32)) | (1 << (BNGParser.MAX_SIM_STEPS - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (BNGParser.OUTPUT_STEP_INTERVAL - 64)) | (1 << (BNGParser.SAMPLE_TIMES - 64)) | (1 << (BNGParser.SAVE_PROGRESS - 64)) | (1 << (BNGParser.PRINT_CDAT - 64)) | (1 << (BNGParser.PRINT_FUNCTIONS - 64)) | (1 << (BNGParser.PRINT_NET - 64)) | (1 << (BNGParser.PRINT_END - 64)) | (1 << (BNGParser.STOP_IF - 64)) | (1 << (BNGParser.PRINT_ON_STOP - 64)) | (1 << (BNGParser.SIMULATE_ODE - 64)) | (1 << (BNGParser.ATOL - 64)) | (1 << (BNGParser.RTOL - 64)) | (1 << (BNGParser.STEADY_STATE - 64)) | (1 << (BNGParser.SPARSE - 64)) | (1 << (BNGParser.SIMULATE_SSA - 64)) | (1 << (BNGParser.SIMULATE_PLA - 64)) | (1 << (BNGParser.PLA_CONFIG - 64)) | (1 << (BNGParser.PLA_OUTPUT - 64)) | (1 << (BNGParser.SIMULATE_NF - 64)) | (1 << (BNGParser.PARAM - 64)) | (1 << (BNGParser.COMPLEX - 64)) | (1 << (BNGParser.GET_FINAL_STATE - 64)) | (1 << (BNGParser.GML - 64)) | (1 << (BNGParser.NOCSLF - 64)) | (1 << (BNGParser.NOTF - 64)) | (1 << (BNGParser.BINARY_OUTPUT - 64)) | (1 << (BNGParser.UTL - 64)) | (1 << (BNGParser.EQUIL - 64)) | (1 << (BNGParser.PARAMETER_SCAN - 64)) | (1 << (BNGParser.BIFURCATE - 64)) | (1 << (BNGParser.PARAMETER - 64)) | (1 << (BNGParser.PAR_MIN - 64)))) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & ((1 << (BNGParser.PAR_MAX - 96)) | (1 << (BNGParser.N_SCAN_PTS - 96)) | (1 << (BNGParser.LOG_SCALE - 96)) | (1 << (BNGParser.RESET_CONC - 96)) | (1 << (BNGParser.READFILE - 96)) | (1 << (BNGParser.FILE - 96)) | (1 << (BNGParser.ATOMIZE - 96)) | (1 << (BNGParser.BLOCKS - 96)) | (1 << (BNGParser.SKIPACTIONS - 96)) | (1 << (BNGParser.VISUALIZE - 96)) | (1 << (BNGParser.TYPE - 96)) | (1 << (BNGParser.BACKGROUND - 96)) | (1 << (BNGParser.COLLAPSE - 96)) | (1 << (BNGParser.OPTS - 96)) | (1 << (BNGParser.WRITESSC - 96)) | (1 << (BNGParser.WRITESSCCFG - 96)) | (1 << (BNGParser.FORMAT - 96)) | (1 << (BNGParser.WRITEFILE - 96)) | (1 << (BNGParser.WRITEMODEL - 96)) | (1 << (BNGParser.WRITEXML - 96)) | (1 << (BNGParser.WRITENETWORK - 96)) | (1 << (BNGParser.WRITESBML - 96)) | (1 << (BNGParser.WRITEMDL - 96)) | (1 << (BNGParser.INCLUDE_MODEL - 96)) | (1 << (BNGParser.INCLUDE_NETWORK - 96)) | (1 << (BNGParser.PRETTY_FORMATTING - 96)) | (1 << (BNGParser.EVALUATE_EXPRESSIONS - 96)) | (1 << (BNGParser.TEXTREACTION - 96)) | (1 << (BNGParser.TEXTSPECIES - 96)) | (1 << (BNGParser.WRITEMFILE - 96)) | (1 << (BNGParser.WRITEMEXFILE - 96)) | (1 << (BNGParser.BDF - 96)))) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & ((1 << (BNGParser.MAX_STEP - 128)) | (1 << (BNGParser.MAXORDER - 128)) | (1 << (BNGParser.STATS - 128)) | (1 << (BNGParser.MAX_NUM_STEPS - 128)) | (1 << (BNGParser.MAX_ERR_TEST_FAILS - 128)) | (1 << (BNGParser.MAX_CONV_FAILS - 128)) | (1 << (BNGParser.STIFF - 128)) | (1 << (BNGParser.SETCONCENTRATION - 128)) | (1 << (BNGParser.ADDCONCENTRATION - 128)) | (1 << (BNGParser.SAVECONCENTRATIONS - 128)) | (1 << (BNGParser.RESETCONCENTRATIONS - 128)) | (1 << (BNGParser.SETPARAMETER - 128)) | (1 << (BNGParser.SAVEPARAMETERS - 128)) | (1 << (BNGParser.RESETPARAMETERS - 128)) | (1 << (BNGParser.QUIT - 128)) | (1 << (BNGParser.SAT - 128)) | (1 << (BNGParser.MM - 128)) | (1 << (BNGParser.HILL - 128)) | (1 << (BNGParser.ARRHENIUS - 128)) | (1 << (BNGParser.IF - 128)) | (1 << (BNGParser.EXP - 128)) | (1 << (BNGParser.LN - 128)) | (1 << (BNGParser.LOG10 - 128)) | (1 << (BNGParser.LOG2 - 128)) | (1 << (BNGParser.SQRT - 128)) | (1 << (BNGParser.RINT - 128)) | (1 << (BNGParser.ABS - 128)) | (1 << (BNGParser.SIN - 128)) | (1 << (BNGParser.COS - 128)) | (1 << (BNGParser.TAN - 128)) | (1 << (BNGParser.ASIN - 128)) | (1 << (BNGParser.ACOS - 128)))) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & ((1 << (BNGParser.ATAN - 160)) | (1 << (BNGParser.SINH - 160)) | (1 << (BNGParser.COSH - 160)) | (1 << (BNGParser.TANH - 160)) | (1 << (BNGParser.ASINH - 160)) | (1 << (BNGParser.ACOSH - 160)) | (1 << (BNGParser.ATANH - 160)) | (1 << (BNGParser.PI - 160)) | (1 << (BNGParser.EULERIAN - 160)) | (1 << (BNGParser.MIN - 160)) | (1 << (BNGParser.MAX - 160)) | (1 << (BNGParser.SUM - 160)) | (1 << (BNGParser.AVG - 160)) | (1 << (BNGParser.TIME - 160)) | (1 << (BNGParser.FLOAT - 160)) | (1 << (BNGParser.INT - 160)) | (1 << (BNGParser.STRING - 160)) | (1 << (BNGParser.SEMI - 160)) | (1 << (BNGParser.COLON - 160)) | (1 << (BNGParser.LSBRACKET - 160)) | (1 << (BNGParser.RSBRACKET - 160)) | (1 << (BNGParser.LBRACKET - 160)) | (1 << (BNGParser.RBRACKET - 160)) | (1 << (BNGParser.COMMA - 160)) | (1 << (BNGParser.DOT - 160)) | (1 << (BNGParser.LPAREN - 160)) | (1 << (BNGParser.RPAREN - 160)) | (1 << (BNGParser.UNI_REACTION_SIGN - 160)) | (1 << (BNGParser.BI_REACTION_SIGN - 160)) | (1 << (BNGParser.DOLLAR - 160)) | (1 << (BNGParser.TILDE - 160)) | (1 << (BNGParser.AT - 160)))) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & ((1 << (BNGParser.GTE - 192)) | (1 << (BNGParser.GT - 192)) | (1 << (BNGParser.LTE - 192)) | (1 << (BNGParser.LT - 192)) | (1 << (BNGParser.ASSIGNS - 192)) | (1 << (BNGParser.EQUALS - 192)) | (1 << (BNGParser.BECOMES - 192)) | (1 << (BNGParser.DIV - 192)) | (1 << (BNGParser.TIMES - 192)) | (1 << (BNGParser.MINUS - 192)) | (1 << (BNGParser.PLUS - 192)) | (1 << (BNGParser.POWER - 192)) | (1 << (BNGParser.MOD - 192)) | (1 << (BNGParser.PIPE - 192)) | (1 << (BNGParser.QMARK - 192)) | (1 << (BNGParser.EMARK - 192)) | (1 << (BNGParser.AMPERSAND - 192)) | (1 << (BNGParser.VERSION_NUMBER - 192)) | (1 << (BNGParser.ULB - 192)))) !== 0)) {
					{
					{
					this.state = 939;
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
					this.state = 944;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 945;
				this.match(BNGParser.DBQUOTES);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 948;
			this.match(BNGParser.RPAREN);
			this.state = 950;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.SEMI) {
				{
				this.state = 949;
				this.match(BNGParser.SEMI);
				}
			}

			this.state = 955;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 952;
				this.match(BNGParser.LB);
				}
				}
				this.state = 957;
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
		this.enterRule(_localctx, 108, BNGParser.RULE_other_action_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 958;
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
			this.state = 959;
			this.match(BNGParser.LPAREN);
			this.state = 961;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.LBRACKET) {
				{
				this.state = 960;
				this.action_args();
				}
			}

			this.state = 963;
			this.match(BNGParser.RPAREN);
			this.state = 965;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.SEMI) {
				{
				this.state = 964;
				this.match(BNGParser.SEMI);
				}
			}

			this.state = 970;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.LB) {
				{
				{
				this.state = 967;
				this.match(BNGParser.LB);
				}
				}
				this.state = 972;
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
		this.enterRule(_localctx, 110, BNGParser.RULE_action_args);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 973;
			this.match(BNGParser.LBRACKET);
			this.state = 975;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & ((1 << (BNGParser.PREFIX - 37)) | (1 << (BNGParser.SUFFIX - 37)) | (1 << (BNGParser.OVERWRITE - 37)) | (1 << (BNGParser.MAX_AGG - 37)) | (1 << (BNGParser.MAX_ITER - 37)) | (1 << (BNGParser.MAX_STOICH - 37)) | (1 << (BNGParser.PRINT_ITER - 37)) | (1 << (BNGParser.CHECK_ISO - 37)) | (1 << (BNGParser.SAFE - 37)) | (1 << (BNGParser.EXECUTE - 37)) | (1 << (BNGParser.METHOD - 37)) | (1 << (BNGParser.VERBOSE - 37)) | (1 << (BNGParser.NETFILE - 37)) | (1 << (BNGParser.CONTINUE - 37)) | (1 << (BNGParser.T_START - 37)) | (1 << (BNGParser.T_END - 37)) | (1 << (BNGParser.N_STEPS - 37)) | (1 << (BNGParser.N_OUTPUT_STEPS - 37)) | (1 << (BNGParser.MAX_SIM_STEPS - 37)) | (1 << (BNGParser.OUTPUT_STEP_INTERVAL - 37)) | (1 << (BNGParser.SAMPLE_TIMES - 37)) | (1 << (BNGParser.SAVE_PROGRESS - 37)) | (1 << (BNGParser.PRINT_CDAT - 37)) | (1 << (BNGParser.PRINT_FUNCTIONS - 37)))) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & ((1 << (BNGParser.PRINT_NET - 69)) | (1 << (BNGParser.PRINT_END - 69)) | (1 << (BNGParser.STOP_IF - 69)) | (1 << (BNGParser.PRINT_ON_STOP - 69)) | (1 << (BNGParser.ATOL - 69)) | (1 << (BNGParser.RTOL - 69)) | (1 << (BNGParser.STEADY_STATE - 69)) | (1 << (BNGParser.SPARSE - 69)) | (1 << (BNGParser.PLA_CONFIG - 69)) | (1 << (BNGParser.PLA_OUTPUT - 69)) | (1 << (BNGParser.PARAM - 69)) | (1 << (BNGParser.COMPLEX - 69)) | (1 << (BNGParser.GET_FINAL_STATE - 69)) | (1 << (BNGParser.GML - 69)) | (1 << (BNGParser.NOCSLF - 69)) | (1 << (BNGParser.NOTF - 69)) | (1 << (BNGParser.BINARY_OUTPUT - 69)) | (1 << (BNGParser.UTL - 69)) | (1 << (BNGParser.EQUIL - 69)) | (1 << (BNGParser.PARAMETER - 69)) | (1 << (BNGParser.PAR_MIN - 69)) | (1 << (BNGParser.PAR_MAX - 69)) | (1 << (BNGParser.N_SCAN_PTS - 69)) | (1 << (BNGParser.LOG_SCALE - 69)) | (1 << (BNGParser.RESET_CONC - 69)))) !== 0) || ((((_la - 101)) & ~0x1F) === 0 && ((1 << (_la - 101)) & ((1 << (BNGParser.FILE - 101)) | (1 << (BNGParser.ATOMIZE - 101)) | (1 << (BNGParser.BLOCKS - 101)) | (1 << (BNGParser.SKIPACTIONS - 101)) | (1 << (BNGParser.TYPE - 101)) | (1 << (BNGParser.BACKGROUND - 101)) | (1 << (BNGParser.COLLAPSE - 101)) | (1 << (BNGParser.OPTS - 101)) | (1 << (BNGParser.FORMAT - 101)) | (1 << (BNGParser.INCLUDE_MODEL - 101)) | (1 << (BNGParser.INCLUDE_NETWORK - 101)) | (1 << (BNGParser.PRETTY_FORMATTING - 101)) | (1 << (BNGParser.EVALUATE_EXPRESSIONS - 101)) | (1 << (BNGParser.BDF - 101)) | (1 << (BNGParser.MAX_STEP - 101)) | (1 << (BNGParser.MAXORDER - 101)) | (1 << (BNGParser.STATS - 101)) | (1 << (BNGParser.MAX_NUM_STEPS - 101)) | (1 << (BNGParser.MAX_ERR_TEST_FAILS - 101)))) !== 0) || _la === BNGParser.MAX_CONV_FAILS || _la === BNGParser.STIFF || _la === BNGParser.STRING) {
				{
				this.state = 974;
				this.action_arg_list();
				}
			}

			this.state = 977;
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
		this.enterRule(_localctx, 112, BNGParser.RULE_action_arg_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 979;
			this.action_arg();
			this.state = 984;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.COMMA) {
				{
				{
				this.state = 980;
				this.match(BNGParser.COMMA);
				this.state = 981;
				this.action_arg();
				}
				}
				this.state = 986;
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
		this.enterRule(_localctx, 114, BNGParser.RULE_action_arg);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 987;
			this.arg_name();
			this.state = 988;
			this.match(BNGParser.ASSIGNS);
			this.state = 989;
			this.action_arg_value();
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
	public action_arg_value(): Action_arg_valueContext {
		let _localctx: Action_arg_valueContext = new Action_arg_valueContext(this._ctx, this.state);
		this.enterRule(_localctx, 116, BNGParser.RULE_action_arg_value);
		let _la: number;
		try {
			this.state = 1009;
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
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 991;
				this.expression();
				}
				break;
			case BNGParser.DBQUOTES:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 992;
				this.match(BNGParser.DBQUOTES);
				this.state = 996;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << BNGParser.LINE_COMMENT) | (1 << BNGParser.LB) | (1 << BNGParser.WS) | (1 << BNGParser.BEGIN) | (1 << BNGParser.END) | (1 << BNGParser.MODEL) | (1 << BNGParser.PARAMETERS) | (1 << BNGParser.COMPARTMENTS) | (1 << BNGParser.MOLECULE) | (1 << BNGParser.MOLECULES) | (1 << BNGParser.TYPES) | (1 << BNGParser.SEED) | (1 << BNGParser.SPECIES) | (1 << BNGParser.OBSERVABLES) | (1 << BNGParser.FUNCTIONS) | (1 << BNGParser.REACTION) | (1 << BNGParser.REACTIONS) | (1 << BNGParser.RULES) | (1 << BNGParser.GROUPS) | (1 << BNGParser.ACTIONS) | (1 << BNGParser.POPULATION) | (1 << BNGParser.MAPS) | (1 << BNGParser.ENERGY) | (1 << BNGParser.PATTERNS) | (1 << BNGParser.MATCHONCE) | (1 << BNGParser.DELETEMOLECULES) | (1 << BNGParser.MOVECONNECTED) | (1 << BNGParser.INCLUDE_REACTANTS) | (1 << BNGParser.INCLUDE_PRODUCTS) | (1 << BNGParser.EXCLUDE_REACTANTS) | (1 << BNGParser.EXCLUDE_PRODUCTS))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (BNGParser.TOTALRATE - 32)) | (1 << (BNGParser.VERSION - 32)) | (1 << (BNGParser.SET_OPTION - 32)) | (1 << (BNGParser.SET_MODEL_NAME - 32)) | (1 << (BNGParser.SUBSTANCEUNITS - 32)) | (1 << (BNGParser.PREFIX - 32)) | (1 << (BNGParser.SUFFIX - 32)) | (1 << (BNGParser.GENERATENETWORK - 32)) | (1 << (BNGParser.OVERWRITE - 32)) | (1 << (BNGParser.MAX_AGG - 32)) | (1 << (BNGParser.MAX_ITER - 32)) | (1 << (BNGParser.MAX_STOICH - 32)) | (1 << (BNGParser.PRINT_ITER - 32)) | (1 << (BNGParser.CHECK_ISO - 32)) | (1 << (BNGParser.GENERATEHYBRIDMODEL - 32)) | (1 << (BNGParser.SAFE - 32)) | (1 << (BNGParser.EXECUTE - 32)) | (1 << (BNGParser.SIMULATE - 32)) | (1 << (BNGParser.METHOD - 32)) | (1 << (BNGParser.ODE - 32)) | (1 << (BNGParser.SSA - 32)) | (1 << (BNGParser.PLA - 32)) | (1 << (BNGParser.NF - 32)) | (1 << (BNGParser.VERBOSE - 32)) | (1 << (BNGParser.NETFILE - 32)) | (1 << (BNGParser.ARGFILE - 32)) | (1 << (BNGParser.CONTINUE - 32)) | (1 << (BNGParser.T_START - 32)) | (1 << (BNGParser.T_END - 32)) | (1 << (BNGParser.N_STEPS - 32)) | (1 << (BNGParser.N_OUTPUT_STEPS - 32)) | (1 << (BNGParser.MAX_SIM_STEPS - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (BNGParser.OUTPUT_STEP_INTERVAL - 64)) | (1 << (BNGParser.SAMPLE_TIMES - 64)) | (1 << (BNGParser.SAVE_PROGRESS - 64)) | (1 << (BNGParser.PRINT_CDAT - 64)) | (1 << (BNGParser.PRINT_FUNCTIONS - 64)) | (1 << (BNGParser.PRINT_NET - 64)) | (1 << (BNGParser.PRINT_END - 64)) | (1 << (BNGParser.STOP_IF - 64)) | (1 << (BNGParser.PRINT_ON_STOP - 64)) | (1 << (BNGParser.SIMULATE_ODE - 64)) | (1 << (BNGParser.ATOL - 64)) | (1 << (BNGParser.RTOL - 64)) | (1 << (BNGParser.STEADY_STATE - 64)) | (1 << (BNGParser.SPARSE - 64)) | (1 << (BNGParser.SIMULATE_SSA - 64)) | (1 << (BNGParser.SIMULATE_PLA - 64)) | (1 << (BNGParser.PLA_CONFIG - 64)) | (1 << (BNGParser.PLA_OUTPUT - 64)) | (1 << (BNGParser.SIMULATE_NF - 64)) | (1 << (BNGParser.PARAM - 64)) | (1 << (BNGParser.COMPLEX - 64)) | (1 << (BNGParser.GET_FINAL_STATE - 64)) | (1 << (BNGParser.GML - 64)) | (1 << (BNGParser.NOCSLF - 64)) | (1 << (BNGParser.NOTF - 64)) | (1 << (BNGParser.BINARY_OUTPUT - 64)) | (1 << (BNGParser.UTL - 64)) | (1 << (BNGParser.EQUIL - 64)) | (1 << (BNGParser.PARAMETER_SCAN - 64)) | (1 << (BNGParser.BIFURCATE - 64)) | (1 << (BNGParser.PARAMETER - 64)) | (1 << (BNGParser.PAR_MIN - 64)))) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & ((1 << (BNGParser.PAR_MAX - 96)) | (1 << (BNGParser.N_SCAN_PTS - 96)) | (1 << (BNGParser.LOG_SCALE - 96)) | (1 << (BNGParser.RESET_CONC - 96)) | (1 << (BNGParser.READFILE - 96)) | (1 << (BNGParser.FILE - 96)) | (1 << (BNGParser.ATOMIZE - 96)) | (1 << (BNGParser.BLOCKS - 96)) | (1 << (BNGParser.SKIPACTIONS - 96)) | (1 << (BNGParser.VISUALIZE - 96)) | (1 << (BNGParser.TYPE - 96)) | (1 << (BNGParser.BACKGROUND - 96)) | (1 << (BNGParser.COLLAPSE - 96)) | (1 << (BNGParser.OPTS - 96)) | (1 << (BNGParser.WRITESSC - 96)) | (1 << (BNGParser.WRITESSCCFG - 96)) | (1 << (BNGParser.FORMAT - 96)) | (1 << (BNGParser.WRITEFILE - 96)) | (1 << (BNGParser.WRITEMODEL - 96)) | (1 << (BNGParser.WRITEXML - 96)) | (1 << (BNGParser.WRITENETWORK - 96)) | (1 << (BNGParser.WRITESBML - 96)) | (1 << (BNGParser.WRITEMDL - 96)) | (1 << (BNGParser.INCLUDE_MODEL - 96)) | (1 << (BNGParser.INCLUDE_NETWORK - 96)) | (1 << (BNGParser.PRETTY_FORMATTING - 96)) | (1 << (BNGParser.EVALUATE_EXPRESSIONS - 96)) | (1 << (BNGParser.TEXTREACTION - 96)) | (1 << (BNGParser.TEXTSPECIES - 96)) | (1 << (BNGParser.WRITEMFILE - 96)) | (1 << (BNGParser.WRITEMEXFILE - 96)) | (1 << (BNGParser.BDF - 96)))) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & ((1 << (BNGParser.MAX_STEP - 128)) | (1 << (BNGParser.MAXORDER - 128)) | (1 << (BNGParser.STATS - 128)) | (1 << (BNGParser.MAX_NUM_STEPS - 128)) | (1 << (BNGParser.MAX_ERR_TEST_FAILS - 128)) | (1 << (BNGParser.MAX_CONV_FAILS - 128)) | (1 << (BNGParser.STIFF - 128)) | (1 << (BNGParser.SETCONCENTRATION - 128)) | (1 << (BNGParser.ADDCONCENTRATION - 128)) | (1 << (BNGParser.SAVECONCENTRATIONS - 128)) | (1 << (BNGParser.RESETCONCENTRATIONS - 128)) | (1 << (BNGParser.SETPARAMETER - 128)) | (1 << (BNGParser.SAVEPARAMETERS - 128)) | (1 << (BNGParser.RESETPARAMETERS - 128)) | (1 << (BNGParser.QUIT - 128)) | (1 << (BNGParser.SAT - 128)) | (1 << (BNGParser.MM - 128)) | (1 << (BNGParser.HILL - 128)) | (1 << (BNGParser.ARRHENIUS - 128)) | (1 << (BNGParser.IF - 128)) | (1 << (BNGParser.EXP - 128)) | (1 << (BNGParser.LN - 128)) | (1 << (BNGParser.LOG10 - 128)) | (1 << (BNGParser.LOG2 - 128)) | (1 << (BNGParser.SQRT - 128)) | (1 << (BNGParser.RINT - 128)) | (1 << (BNGParser.ABS - 128)) | (1 << (BNGParser.SIN - 128)) | (1 << (BNGParser.COS - 128)) | (1 << (BNGParser.TAN - 128)) | (1 << (BNGParser.ASIN - 128)) | (1 << (BNGParser.ACOS - 128)))) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & ((1 << (BNGParser.ATAN - 160)) | (1 << (BNGParser.SINH - 160)) | (1 << (BNGParser.COSH - 160)) | (1 << (BNGParser.TANH - 160)) | (1 << (BNGParser.ASINH - 160)) | (1 << (BNGParser.ACOSH - 160)) | (1 << (BNGParser.ATANH - 160)) | (1 << (BNGParser.PI - 160)) | (1 << (BNGParser.EULERIAN - 160)) | (1 << (BNGParser.MIN - 160)) | (1 << (BNGParser.MAX - 160)) | (1 << (BNGParser.SUM - 160)) | (1 << (BNGParser.AVG - 160)) | (1 << (BNGParser.TIME - 160)) | (1 << (BNGParser.FLOAT - 160)) | (1 << (BNGParser.INT - 160)) | (1 << (BNGParser.STRING - 160)) | (1 << (BNGParser.SEMI - 160)) | (1 << (BNGParser.COLON - 160)) | (1 << (BNGParser.LSBRACKET - 160)) | (1 << (BNGParser.RSBRACKET - 160)) | (1 << (BNGParser.LBRACKET - 160)) | (1 << (BNGParser.RBRACKET - 160)) | (1 << (BNGParser.COMMA - 160)) | (1 << (BNGParser.DOT - 160)) | (1 << (BNGParser.LPAREN - 160)) | (1 << (BNGParser.RPAREN - 160)) | (1 << (BNGParser.UNI_REACTION_SIGN - 160)) | (1 << (BNGParser.BI_REACTION_SIGN - 160)) | (1 << (BNGParser.DOLLAR - 160)) | (1 << (BNGParser.TILDE - 160)) | (1 << (BNGParser.AT - 160)))) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & ((1 << (BNGParser.GTE - 192)) | (1 << (BNGParser.GT - 192)) | (1 << (BNGParser.LTE - 192)) | (1 << (BNGParser.LT - 192)) | (1 << (BNGParser.ASSIGNS - 192)) | (1 << (BNGParser.EQUALS - 192)) | (1 << (BNGParser.BECOMES - 192)) | (1 << (BNGParser.DIV - 192)) | (1 << (BNGParser.TIMES - 192)) | (1 << (BNGParser.MINUS - 192)) | (1 << (BNGParser.PLUS - 192)) | (1 << (BNGParser.POWER - 192)) | (1 << (BNGParser.MOD - 192)) | (1 << (BNGParser.PIPE - 192)) | (1 << (BNGParser.QMARK - 192)) | (1 << (BNGParser.EMARK - 192)) | (1 << (BNGParser.AMPERSAND - 192)) | (1 << (BNGParser.VERSION_NUMBER - 192)) | (1 << (BNGParser.ULB - 192)))) !== 0)) {
					{
					{
					this.state = 993;
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
					this.state = 998;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 999;
				this.match(BNGParser.DBQUOTES);
				}
				break;
			case BNGParser.LSBRACKET:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1000;
				this.match(BNGParser.LSBRACKET);
				this.state = 1001;
				this.expression_list();
				this.state = 1002;
				this.match(BNGParser.RSBRACKET);
				}
				break;
			case BNGParser.LBRACKET:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1004;
				this.match(BNGParser.LBRACKET);
				this.state = 1006;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & ((1 << (BNGParser.PREFIX - 37)) | (1 << (BNGParser.SUFFIX - 37)) | (1 << (BNGParser.OVERWRITE - 37)) | (1 << (BNGParser.MAX_AGG - 37)) | (1 << (BNGParser.MAX_ITER - 37)) | (1 << (BNGParser.MAX_STOICH - 37)) | (1 << (BNGParser.PRINT_ITER - 37)) | (1 << (BNGParser.CHECK_ISO - 37)) | (1 << (BNGParser.SAFE - 37)) | (1 << (BNGParser.EXECUTE - 37)) | (1 << (BNGParser.METHOD - 37)) | (1 << (BNGParser.VERBOSE - 37)) | (1 << (BNGParser.NETFILE - 37)) | (1 << (BNGParser.CONTINUE - 37)) | (1 << (BNGParser.T_START - 37)) | (1 << (BNGParser.T_END - 37)) | (1 << (BNGParser.N_STEPS - 37)) | (1 << (BNGParser.N_OUTPUT_STEPS - 37)) | (1 << (BNGParser.MAX_SIM_STEPS - 37)) | (1 << (BNGParser.OUTPUT_STEP_INTERVAL - 37)) | (1 << (BNGParser.SAMPLE_TIMES - 37)) | (1 << (BNGParser.SAVE_PROGRESS - 37)) | (1 << (BNGParser.PRINT_CDAT - 37)) | (1 << (BNGParser.PRINT_FUNCTIONS - 37)))) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & ((1 << (BNGParser.PRINT_NET - 69)) | (1 << (BNGParser.PRINT_END - 69)) | (1 << (BNGParser.STOP_IF - 69)) | (1 << (BNGParser.PRINT_ON_STOP - 69)) | (1 << (BNGParser.ATOL - 69)) | (1 << (BNGParser.RTOL - 69)) | (1 << (BNGParser.STEADY_STATE - 69)) | (1 << (BNGParser.SPARSE - 69)) | (1 << (BNGParser.PLA_CONFIG - 69)) | (1 << (BNGParser.PLA_OUTPUT - 69)) | (1 << (BNGParser.PARAM - 69)) | (1 << (BNGParser.COMPLEX - 69)) | (1 << (BNGParser.GET_FINAL_STATE - 69)) | (1 << (BNGParser.GML - 69)) | (1 << (BNGParser.NOCSLF - 69)) | (1 << (BNGParser.NOTF - 69)) | (1 << (BNGParser.BINARY_OUTPUT - 69)) | (1 << (BNGParser.UTL - 69)) | (1 << (BNGParser.EQUIL - 69)) | (1 << (BNGParser.PARAMETER - 69)) | (1 << (BNGParser.PAR_MIN - 69)) | (1 << (BNGParser.PAR_MAX - 69)) | (1 << (BNGParser.N_SCAN_PTS - 69)) | (1 << (BNGParser.LOG_SCALE - 69)) | (1 << (BNGParser.RESET_CONC - 69)))) !== 0) || ((((_la - 101)) & ~0x1F) === 0 && ((1 << (_la - 101)) & ((1 << (BNGParser.FILE - 101)) | (1 << (BNGParser.ATOMIZE - 101)) | (1 << (BNGParser.BLOCKS - 101)) | (1 << (BNGParser.SKIPACTIONS - 101)) | (1 << (BNGParser.TYPE - 101)) | (1 << (BNGParser.BACKGROUND - 101)) | (1 << (BNGParser.COLLAPSE - 101)) | (1 << (BNGParser.OPTS - 101)) | (1 << (BNGParser.FORMAT - 101)) | (1 << (BNGParser.INCLUDE_MODEL - 101)) | (1 << (BNGParser.INCLUDE_NETWORK - 101)) | (1 << (BNGParser.PRETTY_FORMATTING - 101)) | (1 << (BNGParser.EVALUATE_EXPRESSIONS - 101)) | (1 << (BNGParser.BDF - 101)) | (1 << (BNGParser.MAX_STEP - 101)) | (1 << (BNGParser.MAXORDER - 101)) | (1 << (BNGParser.STATS - 101)) | (1 << (BNGParser.MAX_NUM_STEPS - 101)) | (1 << (BNGParser.MAX_ERR_TEST_FAILS - 101)))) !== 0) || _la === BNGParser.MAX_CONV_FAILS || _la === BNGParser.STIFF || _la === BNGParser.STRING) {
					{
					this.state = 1005;
					this.nested_hash_list();
					}
				}

				this.state = 1008;
				this.match(BNGParser.RBRACKET);
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
	public nested_hash_list(): Nested_hash_listContext {
		let _localctx: Nested_hash_listContext = new Nested_hash_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 118, BNGParser.RULE_nested_hash_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1011;
			this.nested_hash_item();
			this.state = 1016;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.COMMA) {
				{
				{
				this.state = 1012;
				this.match(BNGParser.COMMA);
				this.state = 1013;
				this.nested_hash_item();
				}
				}
				this.state = 1018;
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
	public nested_hash_item(): Nested_hash_itemContext {
		let _localctx: Nested_hash_itemContext = new Nested_hash_itemContext(this._ctx, this.state);
		this.enterRule(_localctx, 120, BNGParser.RULE_nested_hash_item);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1021;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 136, this._ctx) ) {
			case 1:
				{
				this.state = 1019;
				this.match(BNGParser.STRING);
				}
				break;

			case 2:
				{
				this.state = 1020;
				this.arg_name();
				}
				break;
			}
			this.state = 1023;
			this.match(BNGParser.ASSIGNS);
			this.state = 1024;
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
	public arg_name(): Arg_nameContext {
		let _localctx: Arg_nameContext = new Arg_nameContext(this._ctx, this.state);
		this.enterRule(_localctx, 122, BNGParser.RULE_arg_name);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1026;
			_la = this._input.LA(1);
			if (!(((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & ((1 << (BNGParser.PREFIX - 37)) | (1 << (BNGParser.SUFFIX - 37)) | (1 << (BNGParser.OVERWRITE - 37)) | (1 << (BNGParser.MAX_AGG - 37)) | (1 << (BNGParser.MAX_ITER - 37)) | (1 << (BNGParser.MAX_STOICH - 37)) | (1 << (BNGParser.PRINT_ITER - 37)) | (1 << (BNGParser.CHECK_ISO - 37)) | (1 << (BNGParser.SAFE - 37)) | (1 << (BNGParser.EXECUTE - 37)) | (1 << (BNGParser.METHOD - 37)) | (1 << (BNGParser.VERBOSE - 37)) | (1 << (BNGParser.NETFILE - 37)) | (1 << (BNGParser.CONTINUE - 37)) | (1 << (BNGParser.T_START - 37)) | (1 << (BNGParser.T_END - 37)) | (1 << (BNGParser.N_STEPS - 37)) | (1 << (BNGParser.N_OUTPUT_STEPS - 37)) | (1 << (BNGParser.MAX_SIM_STEPS - 37)) | (1 << (BNGParser.OUTPUT_STEP_INTERVAL - 37)) | (1 << (BNGParser.SAMPLE_TIMES - 37)) | (1 << (BNGParser.SAVE_PROGRESS - 37)) | (1 << (BNGParser.PRINT_CDAT - 37)) | (1 << (BNGParser.PRINT_FUNCTIONS - 37)))) !== 0) || ((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & ((1 << (BNGParser.PRINT_NET - 69)) | (1 << (BNGParser.PRINT_END - 69)) | (1 << (BNGParser.STOP_IF - 69)) | (1 << (BNGParser.PRINT_ON_STOP - 69)) | (1 << (BNGParser.ATOL - 69)) | (1 << (BNGParser.RTOL - 69)) | (1 << (BNGParser.STEADY_STATE - 69)) | (1 << (BNGParser.SPARSE - 69)) | (1 << (BNGParser.PLA_CONFIG - 69)) | (1 << (BNGParser.PLA_OUTPUT - 69)) | (1 << (BNGParser.PARAM - 69)) | (1 << (BNGParser.COMPLEX - 69)) | (1 << (BNGParser.GET_FINAL_STATE - 69)) | (1 << (BNGParser.GML - 69)) | (1 << (BNGParser.NOCSLF - 69)) | (1 << (BNGParser.NOTF - 69)) | (1 << (BNGParser.BINARY_OUTPUT - 69)) | (1 << (BNGParser.UTL - 69)) | (1 << (BNGParser.EQUIL - 69)) | (1 << (BNGParser.PARAMETER - 69)) | (1 << (BNGParser.PAR_MIN - 69)) | (1 << (BNGParser.PAR_MAX - 69)) | (1 << (BNGParser.N_SCAN_PTS - 69)) | (1 << (BNGParser.LOG_SCALE - 69)) | (1 << (BNGParser.RESET_CONC - 69)))) !== 0) || ((((_la - 101)) & ~0x1F) === 0 && ((1 << (_la - 101)) & ((1 << (BNGParser.FILE - 101)) | (1 << (BNGParser.ATOMIZE - 101)) | (1 << (BNGParser.BLOCKS - 101)) | (1 << (BNGParser.SKIPACTIONS - 101)) | (1 << (BNGParser.TYPE - 101)) | (1 << (BNGParser.BACKGROUND - 101)) | (1 << (BNGParser.COLLAPSE - 101)) | (1 << (BNGParser.OPTS - 101)) | (1 << (BNGParser.FORMAT - 101)) | (1 << (BNGParser.INCLUDE_MODEL - 101)) | (1 << (BNGParser.INCLUDE_NETWORK - 101)) | (1 << (BNGParser.PRETTY_FORMATTING - 101)) | (1 << (BNGParser.EVALUATE_EXPRESSIONS - 101)) | (1 << (BNGParser.BDF - 101)) | (1 << (BNGParser.MAX_STEP - 101)) | (1 << (BNGParser.MAXORDER - 101)) | (1 << (BNGParser.STATS - 101)) | (1 << (BNGParser.MAX_NUM_STEPS - 101)) | (1 << (BNGParser.MAX_ERR_TEST_FAILS - 101)))) !== 0) || _la === BNGParser.MAX_CONV_FAILS || _la === BNGParser.STIFF || _la === BNGParser.STRING)) {
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
		this.enterRule(_localctx, 124, BNGParser.RULE_expression_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1028;
			this.expression();
			this.state = 1033;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.COMMA) {
				{
				{
				this.state = 1029;
				this.match(BNGParser.COMMA);
				this.state = 1030;
				this.expression();
				}
				}
				this.state = 1035;
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
		this.enterRule(_localctx, 126, BNGParser.RULE_expression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1036;
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
		this.enterRule(_localctx, 128, BNGParser.RULE_conditional_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1038;
			this.or_expr();
			this.state = 1044;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.QMARK) {
				{
				this.state = 1039;
				this.match(BNGParser.QMARK);
				this.state = 1040;
				this.expression();
				this.state = 1041;
				this.match(BNGParser.COLON);
				this.state = 1042;
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
		this.enterRule(_localctx, 130, BNGParser.RULE_or_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1046;
			this.and_expr();
			this.state = 1052;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.PIPE) {
				{
				{
				this.state = 1047;
				this.match(BNGParser.PIPE);
				this.state = 1048;
				this.match(BNGParser.PIPE);
				this.state = 1049;
				this.and_expr();
				}
				}
				this.state = 1054;
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
		this.enterRule(_localctx, 132, BNGParser.RULE_and_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1055;
			this.equality_expr();
			this.state = 1061;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.AMPERSAND) {
				{
				{
				this.state = 1056;
				this.match(BNGParser.AMPERSAND);
				this.state = 1057;
				this.match(BNGParser.AMPERSAND);
				this.state = 1058;
				this.equality_expr();
				}
				}
				this.state = 1063;
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
		this.enterRule(_localctx, 134, BNGParser.RULE_equality_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1064;
			this.relational_expr();
			this.state = 1069;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & ((1 << (BNGParser.GTE - 192)) | (1 << (BNGParser.GT - 192)) | (1 << (BNGParser.LTE - 192)) | (1 << (BNGParser.LT - 192)) | (1 << (BNGParser.EQUALS - 192)))) !== 0)) {
				{
				{
				this.state = 1065;
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
				this.state = 1066;
				this.relational_expr();
				}
				}
				this.state = 1071;
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
		this.enterRule(_localctx, 136, BNGParser.RULE_relational_expr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1072;
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
		this.enterRule(_localctx, 138, BNGParser.RULE_additive_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1074;
			this.multiplicative_expr();
			this.state = 1079;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.MINUS || _la === BNGParser.PLUS) {
				{
				{
				this.state = 1075;
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
				this.state = 1076;
				this.multiplicative_expr();
				}
				}
				this.state = 1081;
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
		this.enterRule(_localctx, 140, BNGParser.RULE_multiplicative_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1082;
			this.power_expr();
			this.state = 1087;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 199)) & ~0x1F) === 0 && ((1 << (_la - 199)) & ((1 << (BNGParser.DIV - 199)) | (1 << (BNGParser.TIMES - 199)) | (1 << (BNGParser.MOD - 199)))) !== 0)) {
				{
				{
				this.state = 1083;
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
				this.state = 1084;
				this.power_expr();
				}
				}
				this.state = 1089;
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
		this.enterRule(_localctx, 142, BNGParser.RULE_power_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1090;
			this.unary_expr();
			this.state = 1095;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BNGParser.POWER) {
				{
				{
				this.state = 1091;
				this.match(BNGParser.POWER);
				this.state = 1092;
				this.unary_expr();
				}
				}
				this.state = 1097;
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
		this.enterRule(_localctx, 144, BNGParser.RULE_unary_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1099;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === BNGParser.MINUS || _la === BNGParser.PLUS) {
				{
				this.state = 1098;
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

			this.state = 1101;
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
		this.enterRule(_localctx, 146, BNGParser.RULE_primary_expr);
		try {
			this.state = 1111;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 146, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1103;
				this.match(BNGParser.LPAREN);
				this.state = 1104;
				this.expression();
				this.state = 1105;
				this.match(BNGParser.RPAREN);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1107;
				this.function_call();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1108;
				this.observable_ref();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1109;
				this.literal();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1110;
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
		this.enterRule(_localctx, 148, BNGParser.RULE_function_call);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1113;
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
			this.state = 1114;
			this.match(BNGParser.LPAREN);
			this.state = 1116;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 143)) & ~0x1F) === 0 && ((1 << (_la - 143)) & ((1 << (BNGParser.SAT - 143)) | (1 << (BNGParser.MM - 143)) | (1 << (BNGParser.HILL - 143)) | (1 << (BNGParser.ARRHENIUS - 143)) | (1 << (BNGParser.IF - 143)) | (1 << (BNGParser.EXP - 143)) | (1 << (BNGParser.LN - 143)) | (1 << (BNGParser.LOG10 - 143)) | (1 << (BNGParser.LOG2 - 143)) | (1 << (BNGParser.SQRT - 143)) | (1 << (BNGParser.RINT - 143)) | (1 << (BNGParser.ABS - 143)) | (1 << (BNGParser.SIN - 143)) | (1 << (BNGParser.COS - 143)) | (1 << (BNGParser.TAN - 143)) | (1 << (BNGParser.ASIN - 143)) | (1 << (BNGParser.ACOS - 143)) | (1 << (BNGParser.ATAN - 143)) | (1 << (BNGParser.SINH - 143)) | (1 << (BNGParser.COSH - 143)) | (1 << (BNGParser.TANH - 143)) | (1 << (BNGParser.ASINH - 143)) | (1 << (BNGParser.ACOSH - 143)) | (1 << (BNGParser.ATANH - 143)) | (1 << (BNGParser.PI - 143)) | (1 << (BNGParser.EULERIAN - 143)) | (1 << (BNGParser.MIN - 143)) | (1 << (BNGParser.MAX - 143)) | (1 << (BNGParser.SUM - 143)) | (1 << (BNGParser.AVG - 143)) | (1 << (BNGParser.TIME - 143)) | (1 << (BNGParser.FLOAT - 143)))) !== 0) || ((((_la - 175)) & ~0x1F) === 0 && ((1 << (_la - 175)) & ((1 << (BNGParser.INT - 175)) | (1 << (BNGParser.STRING - 175)) | (1 << (BNGParser.LPAREN - 175)) | (1 << (BNGParser.MINUS - 175)) | (1 << (BNGParser.PLUS - 175)))) !== 0)) {
				{
				this.state = 1115;
				this.expression_list();
				}
			}

			this.state = 1118;
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
		this.enterRule(_localctx, 150, BNGParser.RULE_observable_ref);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1120;
			this.match(BNGParser.STRING);
			this.state = 1121;
			this.match(BNGParser.LPAREN);
			this.state = 1122;
			this.expression();
			this.state = 1123;
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
		this.enterRule(_localctx, 152, BNGParser.RULE_literal);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1125;
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

	private static readonly _serializedATNSegments: number = 3;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\xD5\u046A\x04" +
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
		"F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04N\tN\x03" +
		"\x02\x07\x02\x9E\n\x02\f\x02\x0E\x02\xA1\v\x02\x03\x02\x07\x02\xA4\n\x02" +
		"\f\x02\x0E\x02\xA7\v\x02\x03\x02\x03\x02\x03\x02\x06\x02\xAC\n\x02\r\x02" +
		"\x0E\x02\xAD\x03\x02\x07\x02\xB1\n\x02\f\x02\x0E\x02\xB4\v\x02\x03\x02" +
		"\x03\x02\x03\x02\x07\x02\xB9\n\x02\f\x02\x0E\x02\xBC\v\x02\x03\x02\x07" +
		"\x02\xBF\n\x02\f\x02\x0E\x02\xC2\v\x02\x05\x02\xC4\n\x02\x03\x02\x03\x02" +
		"\x05\x02\xC8\n\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x05" +
		"\x03\xD0\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04\xD7\n\x04" +
		"\x03\x04\x03\x04\x03\x04\x05\x04\xDC\n\x04\x03\x04\x06\x04\xDF\n\x04\r" +
		"\x04\x0E\x04\xE0\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05" +
		"\x05\x05\xEA\n\x05\x03\x05\x06\x05\xED\n\x05\r\x05\x0E\x05\xEE\x03\x06" +
		"\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06" +
		"\x03\x06\x05\x06\xFC\n\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03" +
		"\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06\u0108\n\x06\x07\x06\u010A" +
		"\n\x06\f\x06\x0E\x06\u010D\v\x06\x03\x06\x03\x06\x05\x06\u0111\n\x06\x03" +
		"\x06\x06\x06\u0114\n\x06\r\x06\x0E\x06\u0115\x03\x07\x03\x07\x03\x07\x03" +
		"\x07\x03\x07\x03\x07\x03\x07\x05\x07\u011F\n\x07\x03\x07\x06\x07\u0122" +
		"\n\x07\r\x07\x0E\x07\u0123\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03" +
		"\b\x03\b\x03\b\x05\b\u0130\n\b\x03\t\x03\t\x03\t\x06\t\u0135\n\t\r\t\x0E" +
		"\t\u0136\x03\t\x03\t\x06\t\u013B\n\t\r\t\x0E\t\u013C\x07\t\u013F\n\t\f" +
		"\t\x0E\t\u0142\v\t\x03\t\x03\t\x03\t\x07\t\u0147\n\t\f\t\x0E\t\u014A\v" +
		"\t\x03\n\x03\n\x05\n\u014E\n\n\x03\n\x03\n\x05\n\u0152\n\n\x03\n\x05\n" +
		"\u0155\n\n\x03\v\x03\v\x03\v\x03\v\x06\v\u015B\n\v\r\v\x0E\v\u015C\x03" +
		"\v\x03\v\x06\v\u0161\n\v\r\v\x0E\v\u0162\x07\v\u0165\n\v\f\v\x0E\v\u0168" +
		"\v\v\x03\v\x03\v\x03\v\x03\v\x07\v\u016E\n\v\f\v\x0E\v\u0171\v\v\x03\f" +
		"\x03\f\x05\f\u0175\n\f\x03\f\x03\f\x03\r\x03\r\x03\r\x05\r\u017C\n\r\x03" +
		"\r\x05\r\u017F\n\r\x03\x0E\x05\x0E\u0182\n\x0E\x03\x0E\x03\x0E\x05\x0E" +
		"\u0186\n\x0E\x07\x0E\u0188\n\x0E\f\x0E\x0E\x0E\u018B\v\x0E\x03\x0F\x03" +
		"\x0F\x03\x0F\x05\x0F\u0190\n\x0F\x03\x10\x03\x10\x03\x10\x07\x10\u0195" +
		"\n\x10\f\x10\x0E\x10\u0198\v\x10\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11" +
		"\u019E\n\x11\x03\x11\x06\x11\u01A1\n\x11\r\x11\x0E\x11\u01A2\x03\x11\x03" +
		"\x11\x06\x11\u01A7\n\x11\r\x11\x0E\x11\u01A8\x07\x11\u01AB\n\x11\f\x11" +
		"\x0E\x11\u01AE\v\x11\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11\u01B4\n\x11" +
		"\x03\x11\x07\x11\u01B7\n\x11\f\x11\x0E\x11\u01BA\v\x11\x03\x12\x03\x12" +
		"\x05\x12\u01BE\n\x12\x03\x12\x05\x12\u01C1\n\x12\x03\x12\x03\x12\x03\x12" +
		"\x05\x12\u01C6\n\x12\x03\x12\x03\x12\x03\x12\x03\x13\x03\x13\x03\x13\x05" +
		"\x13\u01CE\n\x13\x03\x13\x03\x13\x03\x13\x07\x13\u01D3\n\x13\f\x13\x0E" +
		"\x13\u01D6\v\x13\x03\x13\x03\x13\x05\x13\u01DA\n\x13\x03\x14\x03\x14\x03" +
		"\x14\x05\x14\u01DF\n\x14\x03\x14\x05\x14\u01E2\n\x14\x03\x14\x05\x14\u01E5" +
		"\n\x14\x03\x15\x03\x15\x03\x15\x03\x16\x05\x16\u01EB\n\x16\x03\x16\x03" +
		"\x16\x05\x16\u01EF\n\x16\x07\x16\u01F1\n\x16\f\x16\x0E\x16\u01F4\v\x16" +
		"\x03\x17\x03\x17\x03\x17\x05\x17\u01F9\n\x17\x03\x17\x07\x17\u01FC\n\x17" +
		"\f\x17\x0E\x17\u01FF\v\x17\x03\x18\x03\x18\x03\x19\x03\x19\x03\x19\x03" +
		"\x19\x03\x19\x03\x19\x05\x19\u0209\n\x19\x03\x1A\x03\x1A\x03\x1B\x03\x1B" +
		"\x03\x1B\x06\x1B\u0210\n\x1B\r\x1B\x0E\x1B\u0211\x03\x1B\x03\x1B\x06\x1B" +
		"\u0216\n\x1B\r\x1B\x0E\x1B\u0217\x07\x1B\u021A\n\x1B\f\x1B\x0E\x1B\u021D" +
		"\v\x1B\x03\x1B\x03\x1B\x03\x1B\x07\x1B\u0222\n\x1B\f\x1B\x0E\x1B\u0225" +
		"\v\x1B\x03\x1C\x03\x1C\x05\x1C\u0229\n\x1C\x03\x1C\x03\x1C\x03\x1C\x03" +
		"\x1C\x03\x1D\x03\x1D\x03\x1E\x03\x1E\x03\x1E\x07\x1E\u0234\n\x1E\f\x1E" +
		"\x0E\x1E\u0237\v\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x06\x1F\u023D\n\x1F" +
		"\r\x1F\x0E\x1F\u023E\x03\x1F\x03\x1F\x06\x1F\u0243\n\x1F\r\x1F\x0E\x1F" +
		"\u0244\x07\x1F\u0247\n\x1F\f\x1F\x0E\x1F\u024A\v\x1F\x03\x1F\x03\x1F\x03" +
		"\x1F\x03\x1F\x07\x1F\u0250\n\x1F\f\x1F\x0E\x1F\u0253\v\x1F\x03 \x03 \x03" +
		" \x05 \u0258\n \x03 \x03 \x03 \x03 \x05 \u025E\n \x03 \x03 \x03 \x03 " +
		"\x03 \x05 \u0265\n \x03!\x03!\x03\"\x03\"\x03\"\x07\"\u026C\n\"\f\"\x0E" +
		"\"\u026F\v\"\x03\"\x05\"\u0272\n\"\x03#\x03#\x03#\x07#\u0277\n#\f#\x0E" +
		"#\u027A\v#\x03#\x05#\u027D\n#\x03$\x03$\x03%\x03%\x03%\x05%\u0284\n%\x03" +
		"&\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03" +
		"&\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03" +
		"&\x03&\x03&\x03&\x05&\u02A6\n&\x03\'\x03\'\x03\'\x07\'\u02AB\n\'\f\'\x0E" +
		"\'\u02AE\v\'\x03(\x03(\x03(\x06(\u02B3\n(\r(\x0E(\u02B4\x03(\x03(\x06" +
		"(\u02B9\n(\r(\x0E(\u02BA\x07(\u02BD\n(\f(\x0E(\u02C0\v(\x03(\x03(\x03" +
		"(\x07(\u02C5\n(\f(\x0E(\u02C8\v(\x03)\x03)\x05)\u02CC\n)\x03)\x03)\x03" +
		")\x05)\u02D1\n)\x03)\x03)\x05)\u02D5\n)\x03)\x03)\x03*\x03*\x03*\x07*" +
		"\u02DC\n*\f*\x0E*\u02DF\v*\x03+\x03+\x03+\x06+\u02E4\n+\r+\x0E+\u02E5" +
		"\x03+\x03+\x06+\u02EA\n+\r+\x0E+\u02EB\x07+\u02EE\n+\f+\x0E+\u02F1\v+" +
		"\x03+\x03+\x03+\x07+\u02F6\n+\f+\x0E+\u02F9\v+\x03,\x03,\x05,\u02FD\n" +
		",\x03,\x03,\x03,\x03,\x05,\u0303\n,\x03-\x03-\x03-\x03-\x06-\u0309\n-" +
		"\r-\x0E-\u030A\x03-\x03-\x06-\u030F\n-\r-\x0E-\u0310\x07-\u0313\n-\f-" +
		"\x0E-\u0316\v-\x03-\x03-\x03-\x03-\x07-\u031C\n-\f-\x0E-\u031F\v-\x03" +
		".\x03.\x05.\u0323\n.\x03.\x03.\x03.\x03/\x03/\x03/\x03/\x06/\u032C\n/" +
		"\r/\x0E/\u032D\x03/\x03/\x06/\u0332\n/\r/\x0E/\u0333\x07/\u0336\n/\f/" +
		"\x0E/\u0339\v/\x03/\x03/\x03/\x03/\x07/\u033F\n/\f/\x0E/\u0342\v/\x03" +
		"0\x030\x050\u0346\n0\x030\x030\x030\x030\x030\x050\u034D\n0\x030\x030" +
		"\x031\x061\u0352\n1\r1\x0E1\u0353\x032\x032\x032\x062\u0359\n2\r2\x0E" +
		"2\u035A\x032\x072\u035E\n2\f2\x0E2\u0361\v2\x032\x032\x032\x072\u0366" +
		"\n2\f2\x0E2\u0369\v2\x033\x033\x033\x033\x033\x053\u0370\n3\x034\x034" +
		"\x034\x054\u0375\n4\x034\x034\x054\u0379\n4\x034\x074\u037C\n4\f4\x0E" +
		"4\u037F\v4\x035\x035\x035\x055\u0384\n5\x035\x035\x055\u0388\n5\x035\x07" +
		"5\u038B\n5\f5\x0E5\u038E\v5\x036\x036\x036\x056\u0393\n6\x036\x036\x05" +
		"6\u0397\n6\x036\x076\u039A\n6\f6\x0E6\u039D\v6\x037\x037\x037\x037\x03" +
		"7\x067\u03A4\n7\r7\x0E7\u03A5\x057\u03A8\n7\x037\x037\x037\x037\x037\x07" +
		"7\u03AF\n7\f7\x0E7\u03B2\v7\x037\x057\u03B5\n7\x037\x037\x057\u03B9\n" +
		"7\x037\x077\u03BC\n7\f7\x0E7\u03BF\v7\x038\x038\x038\x058\u03C4\n8\x03" +
		"8\x038\x058\u03C8\n8\x038\x078\u03CB\n8\f8\x0E8\u03CE\v8\x039\x039\x05" +
		"9\u03D2\n9\x039\x039\x03:\x03:\x03:\x07:\u03D9\n:\f:\x0E:\u03DC\v:\x03" +
		";\x03;\x03;\x03;\x03<\x03<\x03<\x07<\u03E5\n<\f<\x0E<\u03E8\v<\x03<\x03" +
		"<\x03<\x03<\x03<\x03<\x03<\x05<\u03F1\n<\x03<\x05<\u03F4\n<\x03=\x03=" +
		"\x03=\x07=\u03F9\n=\f=\x0E=\u03FC\v=\x03>\x03>\x05>\u0400\n>\x03>\x03" +
		">\x03>\x03?\x03?\x03@\x03@\x03@\x07@\u040A\n@\f@\x0E@\u040D\v@\x03A\x03" +
		"A\x03B\x03B\x03B\x03B\x03B\x03B\x05B\u0417\nB\x03C\x03C\x03C\x03C\x07" +
		"C\u041D\nC\fC\x0EC\u0420\vC\x03D\x03D\x03D\x03D\x07D\u0426\nD\fD\x0ED" +
		"\u0429\vD\x03E\x03E\x03E\x07E\u042E\nE\fE\x0EE\u0431\vE\x03F\x03F\x03" +
		"G\x03G\x03G\x07G\u0438\nG\fG\x0EG\u043B\vG\x03H\x03H\x03H\x07H\u0440\n" +
		"H\fH\x0EH\u0443\vH\x03I\x03I\x03I\x07I\u0448\nI\fI\x0EI\u044B\vI\x03J" +
		"\x05J\u044E\nJ\x03J\x03J\x03K\x03K\x03K\x03K\x03K\x03K\x03K\x03K\x05K" +
		"\u045A\nK\x03L\x03L\x03L\x05L\u045F\nL\x03L\x03L\x03M\x03M\x03M\x03M\x03" +
		"M\x03N\x03N\x03N\x02\x02\x02O\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02" +
		"\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02" +
		" \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02" +
		"<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02P\x02R\x02T\x02V\x02" +
		"X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02h\x02j\x02l\x02n\x02p\x02r\x02" +
		"t\x02v\x02x\x02z\x02|\x02~\x02\x80\x02\x82\x02\x84\x02\x86\x02\x88\x02" +
		"\x8A\x02\x8C\x02\x8E\x02\x90\x02\x92\x02\x94\x02\x96\x02\x98\x02\x9A\x02" +
		"\x02\x11\x03\x02\xB1\xB2\x04\x02\xB1\xB2\xD0\xD0\x05\x02\f\f\x0F\x0F\xB2" +
		"\xB2\x03\x02\xBD\xBE\x06\x0233KKPQTT\x04\x02sw\x7F\x80\x04\x02\x89\x8A" +
		"\x8D\x8D\x03\x02\xD2\xD2\b\x0200^_ffkk\x8B\x8C\x8E\x90\x12\x02\'(*/12" +
		"449:<JLORSU]`egjlorry|\x81\x88\xB2\xB2\x04\x02\xC2\xC5\xC7\xC7\x03\x02" +
		"\xCB\xCC\x04\x02\xC9\xCA\xCE\xCE\x04\x02\x91\xA8\xAB\xAF\x04\x02\xA9\xAA" +
		"\xB0\xB1\x02\u04CC\x02\x9F\x03\x02\x02\x02\x04\xCF\x03\x02\x02\x02\x06" +
		"\xD1\x03\x02\x02\x02\b\xE2\x03\x02\x02\x02\n\xF0\x03\x02\x02\x02\f\u0117" +
		"\x03\x02\x02\x02\x0E\u012F\x03\x02\x02\x02\x10\u0131\x03\x02\x02\x02\x12" +
		"\u014D\x03\x02\x02\x02\x14\u0156\x03\x02\x02\x02\x16\u0174\x03\x02\x02" +
		"\x02\x18\u0178\x03\x02\x02\x02\x1A\u0181\x03\x02\x02\x02\x1C\u018C\x03" +
		"\x02\x02\x02\x1E\u0191\x03\x02\x02\x02 \u0199\x03\x02\x02\x02\"\u01BD" +
		"\x03\x02\x02\x02$\u01CD\x03\x02\x02\x02&\u01DB\x03\x02\x02\x02(\u01E6" +
		"\x03\x02\x02\x02*\u01EA\x03\x02\x02\x02,\u01F5\x03\x02\x02\x02.\u0200" +
		"\x03\x02\x02\x020\u0208\x03\x02\x02\x022\u020A\x03\x02\x02\x024\u020C" +
		"\x03\x02\x02\x026\u0228\x03\x02\x02\x028\u022E\x03\x02\x02\x02:\u0230" +
		"\x03\x02\x02\x02<\u0238\x03\x02\x02\x02>\u0257\x03\x02\x02\x02@\u0266" +
		"\x03\x02\x02\x02B\u0271\x03\x02\x02\x02D\u027C\x03\x02\x02\x02F\u027E" +
		"\x03\x02\x02\x02H\u0280\x03\x02\x02\x02J\u02A5\x03\x02\x02\x02L\u02A7" +
		"\x03\x02\x02\x02N\u02AF\x03\x02\x02\x02P\u02CB\x03\x02\x02\x02R\u02D8" +
		"\x03\x02\x02\x02T\u02E0\x03\x02\x02\x02V\u02FC\x03\x02\x02\x02X\u0304" +
		"\x03\x02\x02\x02Z\u0322\x03\x02\x02\x02\\\u0327\x03\x02\x02\x02^\u0345" +
		"\x03\x02\x02\x02`\u0351\x03\x02\x02\x02b\u0355\x03\x02\x02\x02d\u036F" +
		"\x03\x02\x02\x02f\u0371\x03\x02\x02\x02h\u0380\x03\x02\x02\x02j\u038F" +
		"\x03\x02\x02\x02l\u039E\x03\x02\x02\x02n\u03C0\x03\x02\x02\x02p\u03CF" +
		"\x03\x02\x02\x02r\u03D5\x03\x02\x02\x02t\u03DD\x03\x02\x02\x02v\u03F3" +
		"\x03\x02\x02\x02x\u03F5\x03\x02\x02\x02z\u03FF\x03\x02\x02\x02|\u0404" +
		"\x03\x02\x02\x02~\u0406\x03\x02\x02\x02\x80\u040E\x03\x02\x02\x02\x82" +
		"\u0410\x03\x02\x02\x02\x84\u0418\x03\x02\x02\x02\x86\u0421\x03\x02\x02" +
		"\x02\x88\u042A\x03\x02\x02\x02\x8A\u0432\x03\x02\x02\x02\x8C\u0434\x03" +
		"\x02\x02\x02\x8E\u043C\x03\x02\x02\x02\x90\u0444\x03\x02\x02\x02\x92\u044D" +
		"\x03\x02\x02\x02\x94\u0459\x03\x02\x02\x02\x96\u045B\x03\x02\x02\x02\x98" +
		"\u0462\x03\x02\x02\x02\x9A\u0467\x03\x02\x02\x02\x9C\x9E\x07\x04\x02\x02" +
		"\x9D\x9C\x03\x02\x02\x02\x9E\xA1\x03\x02\x02\x02\x9F\x9D\x03\x02\x02\x02" +
		"\x9F\xA0\x03\x02\x02\x02\xA0\xA5\x03\x02\x02\x02\xA1\x9F\x03\x02\x02\x02" +
		"\xA2\xA4\x05\x04\x03\x02\xA3\xA2\x03\x02\x02\x02\xA4\xA7\x03\x02\x02\x02" +
		"\xA5\xA3\x03\x02\x02\x02\xA5\xA6\x03\x02\x02\x02\xA6\xC3\x03\x02\x02\x02" +
		"\xA7\xA5\x03\x02\x02\x02\xA8\xA9\x07\x06\x02\x02\xA9\xAB\x07\b\x02\x02" +
		"\xAA\xAC\x07\x04\x02\x02\xAB\xAA\x03\x02\x02\x02\xAC\xAD\x03\x02\x02\x02" +
		"\xAD\xAB\x03\x02\x02\x02\xAD\xAE\x03\x02\x02\x02\xAE\xB2\x03\x02\x02\x02" +
		"\xAF\xB1\x05\x0E\b\x02\xB0\xAF\x03\x02\x02\x02\xB1\xB4\x03\x02\x02\x02" +
		"\xB2\xB0\x03\x02\x02\x02\xB2\xB3\x03\x02\x02\x02\xB3\xB5\x03\x02\x02\x02" +
		"\xB4\xB2\x03\x02\x02\x02\xB5\xB6\x07\x07\x02\x02\xB6\xBA\x07\b\x02\x02" +
		"\xB7\xB9\x07\x04\x02\x02\xB8\xB7\x03\x02\x02\x02\xB9\xBC\x03\x02\x02\x02" +
		"\xBA\xB8\x03\x02\x02\x02\xBA\xBB\x03\x02\x02\x02\xBB\xC4\x03\x02\x02\x02" +
		"\xBC\xBA\x03\x02\x02\x02\xBD\xBF\x05\x0E\b\x02\xBE\xBD\x03\x02\x02\x02" +
		"\xBF\xC2\x03\x02\x02\x02\xC0\xBE\x03\x02\x02\x02\xC0\xC1\x03\x02\x02\x02" +
		"\xC1\xC4\x03\x02\x02\x02\xC2\xC0\x03\x02\x02\x02\xC3\xA8\x03\x02\x02\x02" +
		"\xC3\xC0\x03\x02\x02\x02\xC4\xC7\x03\x02\x02\x02\xC5\xC8\x05b2\x02\xC6" +
		"\xC8\x05`1\x02\xC7\xC5\x03\x02\x02\x02\xC7\xC6\x03\x02\x02\x02\xC7\xC8" +
		"\x03\x02\x02\x02\xC8\xC9\x03\x02\x02\x02\xC9\xCA\x07\x02\x02\x03\xCA\x03" +
		"\x03\x02\x02\x02\xCB\xD0\x05\x06\x04\x02\xCC\xD0\x05\b\x05\x02\xCD\xD0" +
		"\x05\n\x06\x02\xCE\xD0\x05\f\x07\x02\xCF\xCB\x03\x02\x02\x02\xCF\xCC\x03" +
		"\x02\x02\x02\xCF\xCD\x03\x02\x02\x02\xCF\xCE\x03\x02\x02\x02\xD0\x05\x03" +
		"\x02\x02\x02\xD1\xD2\x07#\x02\x02\xD2\xD3\x07\xBB\x02\x02\xD3\xD4\x07" +
		"\xD2\x02\x02\xD4\xD6\x07\xD4\x02\x02\xD5\xD7\x07\xB2\x02\x02\xD6\xD5\x03" +
		"\x02\x02\x02\xD6\xD7\x03\x02\x02\x02\xD7\xD8\x03\x02\x02\x02\xD8\xD9\x07" +
		"\xD2\x02\x02\xD9\xDB\x07\xBC\x02\x02\xDA\xDC\x07\xB3\x02\x02\xDB\xDA\x03" +
		"\x02\x02\x02\xDB\xDC\x03\x02\x02\x02\xDC\xDE\x03\x02\x02\x02\xDD\xDF\x07" +
		"\x04\x02\x02\xDE\xDD\x03\x02\x02\x02\xDF\xE0\x03\x02\x02\x02\xE0\xDE\x03" +
		"\x02\x02\x02\xE0\xE1\x03\x02\x02\x02\xE1\x07\x03\x02\x02\x02\xE2\xE3\x07" +
		"&\x02\x02\xE3\xE4\x07\xBB\x02\x02\xE4\xE5\x07\xD2\x02\x02\xE5\xE6\x07" +
		"\xB2\x02\x02\xE6\xE7\x07\xD2\x02\x02\xE7\xE9\x07\xBC\x02\x02\xE8\xEA\x07" +
		"\xB3\x02\x02\xE9\xE8\x03\x02\x02\x02\xE9\xEA\x03\x02\x02\x02\xEA\xEC\x03" +
		"\x02\x02\x02\xEB\xED\x07\x04\x02\x02\xEC\xEB\x03\x02\x02\x02\xED\xEE\x03" +
		"\x02\x02\x02\xEE\xEC\x03\x02\x02\x02\xEE\xEF\x03\x02\x02\x02\xEF\t\x03" +
		"\x02\x02\x02\xF0\xF1\x07$\x02\x02\xF1\xF2\x07\xBB\x02\x02\xF2\xF3\x07" +
		"\xD2\x02\x02\xF3\xF4\x07\xB2\x02\x02\xF4\xF5\x07\xD2\x02\x02\xF5\xFB\x07" +
		"\xB9\x02\x02\xF6\xF7\x07\xD2\x02\x02\xF7\xF8\x07\xB2\x02\x02\xF8\xFC\x07" +
		"\xD2\x02\x02\xF9\xFC\x07\xB1\x02\x02\xFA\xFC\x07\xB0\x02\x02\xFB\xF6\x03" +
		"\x02\x02\x02\xFB\xF9\x03\x02\x02\x02\xFB\xFA\x03\x02\x02\x02\xFC\u010B" +
		"\x03\x02\x02\x02\xFD\xFE\x07\xB9\x02\x02\xFE\xFF\x07\xD2\x02\x02\xFF\u0100" +
		"\x07\xB2\x02\x02\u0100\u0101\x07\xD2\x02\x02\u0101\u0107\x07\xB9\x02\x02" +
		"\u0102\u0103\x07\xD2\x02\x02\u0103\u0104\x07\xB2\x02\x02\u0104\u0108\x07" +
		"\xD2\x02\x02\u0105\u0108\x07\xB1\x02\x02\u0106\u0108\x07\xB0\x02\x02\u0107" +
		"\u0102\x03\x02\x02\x02\u0107\u0105\x03\x02\x02\x02\u0107\u0106\x03\x02" +
		"\x02\x02\u0108\u010A\x03\x02\x02\x02\u0109\xFD\x03\x02\x02\x02\u010A\u010D" +
		"\x03\x02\x02\x02\u010B\u0109\x03\x02\x02\x02\u010B\u010C\x03\x02\x02\x02" +
		"\u010C\u010E\x03\x02\x02\x02\u010D\u010B\x03\x02\x02\x02\u010E\u0110\x07" +
		"\xBC\x02\x02\u010F\u0111\x07\xB3\x02\x02\u0110\u010F\x03\x02\x02\x02\u0110" +
		"\u0111\x03\x02\x02\x02\u0111\u0113\x03\x02\x02\x02\u0112\u0114\x07\x04" +
		"\x02\x02\u0113\u0112\x03\x02\x02\x02\u0114\u0115\x03\x02\x02\x02\u0115" +
		"\u0113\x03\x02\x02\x02\u0115\u0116\x03\x02\x02\x02\u0116\v\x03\x02\x02" +
		"\x02\u0117\u0118\x07%\x02\x02\u0118\u0119\x07\xBB\x02\x02\u0119\u011A" +
		"\x07\xD2\x02\x02\u011A\u011B\x07\xB2\x02\x02\u011B\u011C\x07\xD2\x02\x02" +
		"\u011C\u011E\x07\xBC\x02\x02\u011D\u011F\x07\xB3\x02\x02\u011E\u011D\x03" +
		"\x02\x02\x02\u011E\u011F\x03\x02\x02\x02\u011F\u0121\x03\x02\x02\x02\u0120" +
		"\u0122\x07\x04\x02\x02\u0121\u0120\x03\x02\x02\x02\u0122\u0123\x03\x02" +
		"\x02\x02\u0123\u0121\x03\x02\x02\x02\u0123\u0124\x03\x02\x02\x02\u0124" +
		"\r\x03\x02\x02\x02\u0125\u0130\x05\x10\t\x02\u0126\u0130\x05\x14\v\x02" +
		"\u0127\u0130\x05 \x11\x02\u0128\u0130\x054\x1B\x02\u0129\u0130\x05<\x1F" +
		"\x02\u012A\u0130\x05N(\x02\u012B\u0130\x05T+\x02\u012C\u0130\x05X-\x02" +
		"\u012D\u0130\x05\\/\x02\u012E\u0130\x05b2\x02\u012F\u0125\x03\x02\x02" +
		"\x02\u012F\u0126\x03\x02\x02\x02\u012F\u0127\x03\x02\x02\x02\u012F\u0128" +
		"\x03\x02\x02\x02\u012F\u0129\x03\x02\x02\x02\u012F\u012A\x03\x02\x02\x02" +
		"\u012F\u012B\x03\x02\x02\x02\u012F\u012C\x03\x02\x02\x02\u012F\u012D\x03" +
		"\x02\x02\x02\u012F\u012E\x03\x02\x02\x02\u0130\x0F\x03\x02\x02\x02\u0131" +
		"\u0132\x07\x06\x02\x02\u0132\u0134\x07\t\x02\x02\u0133\u0135\x07\x04\x02" +
		"\x02\u0134\u0133\x03\x02\x02\x02\u0135\u0136\x03\x02\x02\x02\u0136\u0134" +
		"\x03\x02\x02\x02\u0136\u0137\x03\x02\x02\x02\u0137\u0140\x03\x02\x02\x02" +
		"\u0138\u013A\x05\x12\n\x02\u0139\u013B\x07\x04\x02\x02\u013A\u0139\x03" +
		"\x02\x02\x02\u013B\u013C\x03\x02\x02\x02\u013C\u013A\x03\x02\x02\x02\u013C" +
		"\u013D\x03\x02\x02\x02\u013D\u013F\x03\x02\x02\x02\u013E\u0138\x03\x02" +
		"\x02\x02\u013F\u0142\x03\x02\x02\x02\u0140\u013E\x03\x02\x02\x02\u0140" +
		"\u0141\x03\x02\x02\x02\u0141\u0143\x03\x02\x02\x02\u0142\u0140\x03\x02" +
		"\x02\x02\u0143\u0144\x07\x07\x02\x02\u0144\u0148\x07\t\x02\x02\u0145\u0147" +
		"\x07\x04\x02\x02\u0146\u0145\x03\x02\x02\x02\u0147\u014A\x03\x02\x02\x02" +
		"\u0148\u0146\x03\x02\x02\x02\u0148\u0149\x03\x02\x02\x02\u0149\x11\x03" +
		"\x02\x02\x02\u014A\u0148\x03\x02\x02\x02\u014B\u014C\x07\xB2\x02\x02\u014C" +
		"\u014E\x07\xB4\x02\x02\u014D\u014B\x03\x02\x02\x02\u014D\u014E\x03\x02" +
		"\x02\x02\u014E\u014F\x03\x02\x02\x02\u014F\u0151\x07\xB2\x02\x02\u0150" +
		"\u0152\x07\xC8\x02\x02\u0151\u0150\x03\x02\x02\x02\u0151\u0152\x03\x02" +
		"\x02\x02\u0152\u0154\x03\x02\x02\x02\u0153\u0155\x05\x80A\x02\u0154\u0153" +
		"\x03\x02\x02\x02\u0154\u0155\x03\x02\x02\x02\u0155\x13\x03\x02\x02\x02" +
		"\u0156\u0157\x07\x06\x02\x02\u0157\u0158\x07\v\x02\x02\u0158\u015A\x07" +
		"\r\x02\x02\u0159\u015B\x07\x04\x02\x02\u015A\u0159\x03\x02\x02\x02\u015B" +
		"\u015C\x03\x02\x02\x02\u015C\u015A\x03\x02\x02\x02\u015C\u015D\x03\x02" +
		"\x02\x02\u015D\u0166\x03\x02\x02\x02\u015E\u0160\x05\x16\f\x02\u015F\u0161" +
		"\x07\x04\x02\x02\u0160\u015F\x03\x02\x02\x02\u0161\u0162\x03\x02\x02\x02" +
		"\u0162\u0160\x03\x02\x02\x02\u0162\u0163\x03\x02\x02\x02\u0163\u0165\x03" +
		"\x02\x02\x02\u0164\u015E\x03\x02\x02\x02\u0165\u0168\x03\x02\x02\x02\u0166" +
		"\u0164\x03\x02\x02\x02\u0166\u0167\x03\x02\x02\x02\u0167\u0169\x03\x02" +
		"\x02\x02\u0168\u0166\x03\x02\x02\x02\u0169\u016A\x07\x07\x02\x02\u016A" +
		"\u016B\x07\v\x02\x02\u016B\u016F\x07\r\x02\x02\u016C\u016E\x07\x04\x02" +
		"\x02\u016D\u016C\x03\x02\x02\x02\u016E\u0171\x03\x02\x02\x02\u016F\u016D" +
		"\x03\x02\x02\x02\u016F\u0170\x03\x02\x02\x02\u0170\x15\x03\x02\x02\x02" +
		"\u0171\u016F\x03\x02\x02\x02\u0172\u0173\x07\xB2\x02\x02\u0173\u0175\x07" +
		"\xB4\x02\x02\u0174\u0172\x03\x02\x02\x02\u0174\u0175\x03\x02\x02\x02\u0175" +
		"\u0176\x03\x02\x02\x02\u0176\u0177\x05\x18\r\x02\u0177\x17\x03\x02\x02" +
		"\x02\u0178\u017E\x07\xB2\x02\x02\u0179\u017B\x07\xBB\x02\x02\u017A\u017C" +
		"\x05\x1A\x0E\x02\u017B\u017A\x03\x02\x02\x02\u017B\u017C\x03\x02\x02\x02" +
		"\u017C\u017D\x03\x02\x02\x02\u017D\u017F\x07\xBC\x02\x02\u017E\u0179\x03" +
		"\x02\x02\x02\u017E\u017F\x03\x02\x02\x02\u017F\x19\x03\x02\x02\x02\u0180" +
		"\u0182\x05\x1C\x0F\x02\u0181\u0180\x03\x02\x02\x02\u0181\u0182\x03\x02" +
		"\x02\x02\u0182\u0189\x03\x02\x02\x02\u0183\u0185\x07\xB9\x02\x02\u0184" +
		"\u0186\x05\x1C\x0F\x02\u0185\u0184\x03\x02\x02\x02\u0185\u0186\x03\x02" +
		"\x02\x02\u0186\u0188\x03\x02\x02\x02\u0187\u0183\x03\x02\x02\x02\u0188" +
		"\u018B\x03\x02\x02\x02\u0189\u0187\x03\x02\x02\x02\u0189\u018A\x03\x02" +
		"\x02\x02\u018A\x1B\x03\x02\x02\x02\u018B\u0189\x03\x02\x02\x02\u018C\u018F" +
		"\x07\xB2\x02\x02";
	private static readonly _serializedATNSegment1: string =
		"\u018D\u018E\x07\xC0\x02\x02\u018E\u0190\x05\x1E\x10\x02\u018F\u018D\x03" +
		"\x02\x02\x02\u018F\u0190\x03\x02\x02\x02\u0190\x1D\x03\x02\x02\x02\u0191" +
		"\u0196\t\x02\x02\x02\u0192\u0193\x07\xC0\x02\x02\u0193\u0195\t\x02\x02" +
		"\x02\u0194\u0192\x03\x02\x02\x02\u0195\u0198\x03\x02\x02\x02\u0196\u0194" +
		"\x03\x02\x02\x02\u0196\u0197\x03\x02\x02\x02\u0197\x1F\x03\x02\x02\x02" +
		"\u0198\u0196\x03\x02\x02\x02\u0199\u019D\x07\x06\x02\x02\u019A\u019B\x07" +
		"\x0E\x02\x02\u019B\u019E\x07\x0F\x02\x02\u019C\u019E\x07\x0F\x02\x02\u019D" +
		"\u019A\x03\x02\x02\x02\u019D\u019C\x03\x02\x02\x02\u019E\u01A0\x03\x02" +
		"\x02\x02\u019F\u01A1\x07\x04\x02\x02\u01A0\u019F\x03\x02\x02\x02\u01A1" +
		"\u01A2\x03\x02\x02\x02\u01A2\u01A0\x03\x02\x02\x02\u01A2\u01A3\x03\x02" +
		"\x02\x02\u01A3\u01AC\x03\x02\x02\x02\u01A4\u01A6\x05\"\x12\x02\u01A5\u01A7" +
		"\x07\x04\x02\x02\u01A6\u01A5\x03\x02\x02\x02\u01A7\u01A8\x03\x02\x02\x02" +
		"\u01A8\u01A6\x03\x02\x02\x02\u01A8\u01A9\x03\x02\x02\x02\u01A9\u01AB\x03" +
		"\x02\x02\x02\u01AA\u01A4\x03\x02\x02\x02\u01AB\u01AE\x03\x02\x02\x02\u01AC" +
		"\u01AA\x03\x02\x02\x02\u01AC\u01AD\x03\x02\x02\x02\u01AD\u01AF\x03\x02" +
		"\x02\x02\u01AE\u01AC\x03\x02\x02\x02\u01AF\u01B3\x07\x07\x02\x02\u01B0" +
		"\u01B1\x07\x0E\x02\x02\u01B1\u01B4\x07\x0F\x02\x02\u01B2\u01B4\x07\x0F" +
		"\x02\x02\u01B3\u01B0\x03\x02\x02\x02\u01B3\u01B2\x03\x02\x02\x02\u01B4" +
		"\u01B8\x03\x02\x02\x02\u01B5\u01B7\x07\x04\x02\x02\u01B6\u01B5\x03\x02" +
		"\x02\x02\u01B7\u01BA\x03\x02\x02\x02\u01B8\u01B6\x03\x02\x02\x02\u01B8" +
		"\u01B9\x03\x02\x02\x02\u01B9!\x03\x02\x02\x02\u01BA\u01B8\x03\x02\x02" +
		"\x02\u01BB\u01BC\x07\xB2\x02\x02\u01BC\u01BE\x07\xB4\x02\x02\u01BD\u01BB" +
		"\x03\x02\x02\x02\u01BD\u01BE\x03\x02\x02\x02\u01BE\u01C0\x03\x02\x02\x02" +
		"\u01BF\u01C1\x07\xBF\x02\x02\u01C0\u01BF\x03\x02\x02\x02\u01C0\u01C1\x03" +
		"\x02\x02\x02\u01C1\u01C5\x03\x02\x02\x02\u01C2\u01C3\x07\xC1\x02\x02\u01C3" +
		"\u01C4\x07\xB2\x02\x02\u01C4\u01C6\x07\xB4\x02\x02\u01C5\u01C2\x03\x02" +
		"\x02\x02\u01C5\u01C6\x03\x02\x02\x02\u01C6\u01C7\x03\x02\x02\x02\u01C7" +
		"\u01C8\x05$\x13\x02\u01C8\u01C9\x05\x80A\x02\u01C9#\x03\x02\x02\x02\u01CA" +
		"\u01CB\x07\xC1\x02\x02\u01CB\u01CC\x07\xB2\x02\x02\u01CC\u01CE\x07\xB4" +
		"\x02\x02\u01CD\u01CA\x03\x02\x02\x02\u01CD\u01CE\x03\x02\x02\x02\u01CE" +
		"\u01CF\x03\x02\x02\x02\u01CF\u01D4\x05&\x14\x02\u01D0\u01D1\x07\xBA\x02" +
		"\x02\u01D1\u01D3\x05&\x14\x02\u01D2\u01D0\x03\x02\x02\x02\u01D3\u01D6" +
		"\x03\x02\x02\x02\u01D4\u01D2\x03\x02\x02\x02\u01D4\u01D5\x03\x02\x02\x02" +
		"\u01D5\u01D9\x03\x02\x02\x02\u01D6\u01D4\x03\x02\x02\x02\u01D7\u01D8\x07" +
		"\xC1\x02\x02\u01D8\u01DA\x07\xB2\x02\x02\u01D9\u01D7\x03\x02\x02\x02\u01D9" +
		"\u01DA\x03\x02\x02\x02\u01DA%\x03\x02\x02\x02\u01DB\u01E1\x07\xB2\x02" +
		"\x02\u01DC\u01DE\x07\xBB\x02\x02\u01DD\u01DF\x05*\x16\x02\u01DE\u01DD" +
		"\x03\x02\x02\x02\u01DE\u01DF\x03\x02\x02\x02\u01DF\u01E0\x03\x02\x02\x02" +
		"\u01E0\u01E2\x07\xBC\x02\x02\u01E1\u01DC\x03\x02\x02\x02\u01E1\u01E2\x03" +
		"\x02\x02\x02\u01E2\u01E4\x03\x02\x02\x02\u01E3\u01E5\x05(\x15\x02\u01E4" +
		"\u01E3\x03\x02\x02\x02\u01E4\u01E5\x03\x02\x02\x02\u01E5\'\x03\x02\x02" +
		"\x02\u01E6\u01E7\x07\xCE\x02\x02\u01E7\u01E8\x07\xB1\x02\x02\u01E8)\x03" +
		"\x02\x02\x02\u01E9\u01EB\x05,\x17\x02\u01EA\u01E9\x03\x02\x02\x02\u01EA" +
		"\u01EB\x03\x02\x02\x02\u01EB\u01F2\x03\x02\x02\x02\u01EC\u01EE\x07\xB9" +
		"\x02\x02\u01ED\u01EF\x05,\x17\x02\u01EE\u01ED\x03\x02\x02\x02\u01EE\u01EF" +
		"\x03\x02\x02\x02\u01EF\u01F1\x03\x02\x02\x02\u01F0\u01EC\x03\x02\x02\x02" +
		"\u01F1\u01F4\x03\x02\x02\x02\u01F2\u01F0\x03\x02\x02\x02\u01F2\u01F3\x03" +
		"\x02\x02\x02\u01F3+\x03\x02\x02\x02\u01F4\u01F2\x03\x02\x02\x02\u01F5" +
		"\u01F8\x07\xB2\x02\x02\u01F6\u01F7\x07\xC0\x02\x02\u01F7\u01F9\x05.\x18" +
		"\x02\u01F8\u01F6\x03\x02\x02\x02\u01F8\u01F9\x03\x02\x02\x02\u01F9\u01FD" +
		"\x03\x02\x02\x02\u01FA\u01FC\x050\x19\x02\u01FB\u01FA\x03\x02\x02\x02" +
		"\u01FC\u01FF\x03\x02\x02\x02\u01FD\u01FB\x03\x02\x02\x02\u01FD\u01FE\x03" +
		"\x02\x02\x02\u01FE-\x03\x02\x02\x02\u01FF\u01FD\x03\x02\x02\x02\u0200" +
		"\u0201\t\x03\x02\x02\u0201/\x03\x02\x02\x02\u0202\u0203\x07\xD1\x02\x02" +
		"\u0203\u0209\x052\x1A\x02\u0204\u0205\x07\xD1\x02\x02\u0205\u0209\x07" +
		"\xCC\x02\x02\u0206\u0207\x07\xD1\x02\x02\u0207\u0209\x07\xD0\x02\x02\u0208" +
		"\u0202\x03\x02\x02\x02\u0208\u0204\x03\x02\x02\x02\u0208\u0206\x03\x02" +
		"\x02\x02\u02091\x03\x02\x02\x02\u020A\u020B\t\x02\x02\x02\u020B3\x03\x02" +
		"\x02\x02\u020C\u020D\x07\x06\x02\x02\u020D\u020F\x07\x10\x02\x02\u020E" +
		"\u0210\x07\x04\x02\x02\u020F\u020E\x03\x02\x02\x02\u0210\u0211\x03\x02" +
		"\x02\x02\u0211\u020F\x03\x02\x02\x02\u0211\u0212\x03\x02\x02\x02\u0212" +
		"\u021B\x03\x02\x02\x02\u0213\u0215\x056\x1C\x02\u0214\u0216\x07\x04\x02" +
		"\x02\u0215\u0214\x03\x02\x02\x02\u0216\u0217\x03\x02\x02\x02\u0217\u0215" +
		"\x03\x02\x02\x02\u0217\u0218\x03\x02\x02\x02\u0218\u021A\x03\x02\x02\x02" +
		"\u0219\u0213\x03\x02\x02\x02\u021A\u021D\x03\x02\x02\x02\u021B\u0219\x03" +
		"\x02\x02\x02\u021B\u021C\x03\x02\x02\x02\u021C\u021E\x03\x02\x02\x02\u021D" +
		"\u021B\x03\x02\x02\x02\u021E\u021F\x07\x07\x02\x02\u021F\u0223\x07\x10" +
		"\x02\x02\u0220\u0222\x07\x04\x02\x02\u0221\u0220\x03\x02\x02\x02\u0222" +
		"\u0225\x03\x02\x02\x02\u0223\u0221\x03\x02\x02\x02\u0223\u0224\x03\x02" +
		"\x02\x02\u02245\x03\x02\x02\x02\u0225\u0223\x03\x02\x02\x02\u0226\u0227" +
		"\x07\xB2\x02\x02\u0227\u0229\x07\xB4\x02\x02\u0228\u0226\x03\x02\x02\x02" +
		"\u0228\u0229\x03\x02\x02\x02\u0229\u022A\x03\x02\x02\x02\u022A\u022B\x05" +
		"8\x1D\x02\u022B\u022C\x07\xB2\x02\x02\u022C\u022D\x05:\x1E\x02\u022D7" +
		"\x03\x02\x02\x02\u022E\u022F\t\x04\x02\x02\u022F9\x03\x02\x02\x02\u0230" +
		"\u0235\x05$\x13\x02\u0231\u0232\x07\xB9\x02\x02\u0232\u0234\x05$\x13\x02" +
		"\u0233\u0231\x03\x02\x02\x02\u0234\u0237\x03\x02\x02\x02\u0235\u0233\x03" +
		"\x02\x02\x02\u0235\u0236\x03\x02\x02\x02\u0236;\x03\x02\x02\x02\u0237" +
		"\u0235\x03\x02\x02\x02\u0238\u0239\x07\x06\x02\x02\u0239\u023A\x07\x12" +
		"\x02\x02\u023A\u023C\x07\x14\x02\x02\u023B\u023D\x07\x04\x02\x02\u023C" +
		"\u023B\x03\x02\x02\x02\u023D\u023E\x03\x02\x02\x02\u023E\u023C\x03\x02" +
		"\x02\x02\u023E\u023F\x03\x02\x02\x02\u023F\u0248\x03\x02\x02\x02\u0240" +
		"\u0242\x05> \x02\u0241\u0243\x07\x04\x02\x02\u0242\u0241\x03\x02\x02\x02" +
		"\u0243\u0244\x03\x02\x02\x02\u0244\u0242\x03\x02\x02\x02\u0244\u0245\x03" +
		"\x02\x02\x02\u0245\u0247\x03\x02\x02\x02\u0246\u0240\x03\x02\x02\x02\u0247" +
		"\u024A\x03\x02\x02\x02\u0248\u0246\x03\x02\x02\x02\u0248\u0249\x03\x02" +
		"\x02\x02\u0249\u024B\x03\x02\x02\x02\u024A\u0248\x03\x02\x02\x02\u024B" +
		"\u024C\x07\x07\x02\x02\u024C\u024D\x07\x12\x02\x02\u024D\u0251\x07\x14" +
		"\x02\x02\u024E\u0250\x07\x04\x02\x02\u024F\u024E\x03\x02\x02\x02\u0250" +
		"\u0253\x03\x02\x02\x02\u0251\u024F\x03\x02\x02\x02\u0251\u0252\x03\x02" +
		"\x02\x02\u0252=\x03\x02\x02\x02\u0253\u0251\x03\x02\x02\x02\u0254\u0255" +
		"\x05@!\x02\u0255\u0256\x07\xB4\x02\x02\u0256\u0258\x03\x02\x02\x02\u0257" +
		"\u0254\x03\x02\x02\x02\u0257\u0258\x03\x02\x02\x02\u0258\u025D\x03\x02" +
		"\x02\x02\u0259\u025A\x07\xB7\x02\x02\u025A\u025B\x05J&\x02\u025B\u025C" +
		"\x07\xB8\x02\x02\u025C\u025E\x03\x02\x02\x02\u025D\u0259\x03\x02\x02\x02" +
		"\u025D\u025E\x03\x02\x02\x02\u025E\u025F\x03\x02\x02\x02\u025F\u0260\x05" +
		"B\"\x02\u0260\u0261\x05F$\x02\u0261\u0262\x05D#\x02\u0262\u0264\x05H%" +
		"\x02\u0263\u0265\x05J&\x02\u0264\u0263\x03\x02\x02\x02\u0264\u0265\x03" +
		"\x02\x02\x02\u0265?\x03\x02\x02\x02\u0266\u0267\t\x02\x02\x02\u0267A\x03" +
		"\x02\x02\x02\u0268\u026D\x05$\x13\x02\u0269\u026A\x07\xCC\x02\x02\u026A" +
		"\u026C\x05$\x13\x02\u026B\u0269\x03\x02\x02\x02\u026C\u026F\x03\x02\x02" +
		"\x02\u026D\u026B\x03\x02\x02\x02\u026D\u026E\x03\x02\x02\x02\u026E\u0272" +
		"\x03\x02\x02\x02\u026F\u026D\x03\x02\x02\x02\u0270\u0272\x07\xB1\x02\x02" +
		"\u0271\u0268\x03\x02\x02\x02\u0271\u0270\x03\x02\x02\x02\u0272C\x03\x02" +
		"\x02\x02\u0273\u0278\x05$\x13\x02\u0274\u0275\x07\xCC\x02\x02\u0275\u0277" +
		"\x05$\x13\x02\u0276\u0274\x03\x02\x02\x02\u0277\u027A\x03\x02\x02\x02" +
		"\u0278\u0276\x03\x02\x02\x02\u0278\u0279\x03\x02\x02\x02\u0279\u027D\x03" +
		"\x02\x02\x02\u027A\u0278\x03\x02\x02\x02\u027B\u027D\x07\xB1\x02\x02\u027C" +
		"\u0273\x03\x02\x02\x02\u027C\u027B\x03\x02\x02\x02\u027DE\x03\x02\x02" +
		"\x02\u027E\u027F\t\x05\x02\x02\u027FG\x03\x02\x02\x02\u0280\u0283\x05" +
		"\x80A\x02\u0281\u0282\x07\xB9\x02\x02\u0282\u0284\x05\x80A\x02\u0283\u0281" +
		"\x03\x02\x02\x02\u0283\u0284\x03\x02\x02\x02\u0284I\x03\x02\x02\x02\u0285" +
		"\u02A6\x07\x1C\x02\x02\u0286\u02A6\x07\x1D\x02\x02\u0287\u02A6\x07\x1B" +
		"\x02\x02\u0288\u02A6\x07\"\x02\x02\u0289\u028A\x07\x1E\x02\x02\u028A\u028B" +
		"\x07\xBB\x02\x02\u028B\u028C\x07\xB1\x02\x02\u028C\u028D\x07\xB9\x02\x02" +
		"\u028D\u028E\x05L\'\x02\u028E\u028F\x07\xBC\x02\x02\u028F\u02A6\x03\x02" +
		"\x02\x02\u0290\u0291\x07 \x02\x02\u0291\u0292\x07\xBB\x02\x02\u0292\u0293" +
		"\x07\xB1\x02\x02\u0293\u0294\x07\xB9\x02\x02\u0294\u0295\x05L\'\x02\u0295" +
		"\u0296\x07\xBC\x02\x02\u0296\u02A6\x03\x02\x02\x02\u0297\u0298\x07\x1F" +
		"\x02\x02\u0298\u0299\x07\xBB\x02\x02\u0299\u029A\x07\xB1\x02\x02\u029A" +
		"\u029B\x07\xB9\x02\x02\u029B\u029C\x05L\'\x02\u029C\u029D\x07\xBC\x02" +
		"\x02\u029D\u02A6\x03\x02\x02\x02\u029E\u029F\x07!\x02\x02\u029F\u02A0" +
		"\x07\xBB\x02\x02\u02A0\u02A1\x07\xB1\x02\x02\u02A1\u02A2\x07\xB9\x02\x02" +
		"\u02A2\u02A3\x05L\'\x02\u02A3\u02A4\x07\xBC\x02\x02\u02A4\u02A6\x03\x02" +
		"\x02\x02\u02A5\u0285\x03\x02\x02\x02\u02A5\u0286\x03\x02\x02\x02\u02A5" +
		"\u0287\x03\x02\x02\x02\u02A5\u0288\x03\x02\x02\x02\u02A5\u0289\x03\x02" +
		"\x02\x02\u02A5\u0290\x03\x02\x02\x02\u02A5\u0297\x03\x02\x02\x02\u02A5" +
		"\u029E\x03\x02\x02\x02\u02A6K\x03\x02\x02\x02\u02A7\u02AC\x05$\x13\x02" +
		"\u02A8\u02A9\x07\xB9\x02\x02\u02A9\u02AB\x05$\x13\x02\u02AA\u02A8\x03" +
		"\x02\x02\x02\u02AB\u02AE\x03\x02\x02\x02\u02AC\u02AA\x03\x02\x02\x02\u02AC" +
		"\u02AD\x03\x02\x02\x02\u02ADM\x03\x02\x02\x02\u02AE\u02AC\x03\x02\x02" +
		"\x02\u02AF\u02B0\x07\x06\x02\x02\u02B0\u02B2\x07\x11\x02\x02\u02B1\u02B3" +
		"\x07\x04\x02\x02\u02B2\u02B1\x03\x02\x02\x02\u02B3\u02B4\x03\x02\x02\x02" +
		"\u02B4\u02B2\x03\x02\x02\x02\u02B4\u02B5\x03\x02\x02\x02\u02B5\u02BE\x03" +
		"\x02\x02\x02\u02B6\u02B8\x05P)\x02\u02B7\u02B9\x07\x04\x02\x02\u02B8\u02B7" +
		"\x03\x02\x02\x02\u02B9\u02BA\x03\x02\x02\x02\u02BA\u02B8\x03\x02\x02\x02" +
		"\u02BA\u02BB\x03\x02\x02\x02\u02BB\u02BD\x03\x02\x02\x02\u02BC\u02B6\x03" +
		"\x02\x02\x02\u02BD\u02C0\x03\x02\x02\x02\u02BE\u02BC\x03\x02\x02\x02\u02BE" +
		"\u02BF\x03\x02\x02\x02\u02BF\u02C1\x03\x02\x02\x02\u02C0\u02BE\x03\x02" +
		"\x02\x02\u02C1\u02C2\x07\x07\x02\x02\u02C2\u02C6\x07\x11\x02\x02\u02C3" +
		"\u02C5\x07\x04\x02\x02\u02C4\u02C3\x03\x02\x02\x02\u02C5\u02C8\x03\x02" +
		"\x02\x02\u02C6\u02C4\x03\x02\x02\x02\u02C6\u02C7\x03\x02\x02\x02\u02C7" +
		"O\x03\x02\x02\x02\u02C8\u02C6\x03\x02\x02\x02\u02C9\u02CA\x07\xB2\x02" +
		"\x02\u02CA\u02CC\x07\xB4\x02\x02\u02CB\u02C9\x03\x02\x02\x02\u02CB\u02CC" +
		"\x03\x02\x02\x02\u02CC\u02CD\x03\x02\x02\x02\u02CD\u02CE\x07\xB2\x02\x02" +
		"\u02CE\u02D0\x07\xBB\x02\x02\u02CF\u02D1\x05R*\x02\u02D0\u02CF\x03\x02" +
		"\x02\x02\u02D0\u02D1\x03\x02\x02\x02\u02D1\u02D2\x03\x02\x02\x02\u02D2" +
		"\u02D4\x07\xBC\x02\x02\u02D3\u02D5\x07\xC8\x02\x02\u02D4\u02D3\x03\x02" +
		"\x02\x02\u02D4\u02D5\x03\x02\x02\x02\u02D5\u02D6\x03\x02\x02\x02\u02D6" +
		"\u02D7\x05\x80A\x02\u02D7Q\x03\x02\x02\x02\u02D8\u02DD\x07\xB2\x02\x02" +
		"\u02D9\u02DA\x07\xB9\x02\x02\u02DA\u02DC\x07\xB2\x02\x02\u02DB\u02D9\x03" +
		"\x02\x02\x02\u02DC\u02DF\x03\x02\x02\x02\u02DD\u02DB\x03\x02\x02\x02\u02DD" +
		"\u02DE\x03\x02\x02\x02\u02DES\x03\x02\x02\x02\u02DF\u02DD\x03\x02\x02" +
		"\x02\u02E0\u02E1\x07\x06\x02\x02\u02E1\u02E3\x07\n\x02\x02\u02E2\u02E4" +
		"\x07\x04\x02\x02\u02E3\u02E2\x03\x02\x02\x02\u02E4\u02E5\x03\x02\x02\x02" +
		"\u02E5\u02E3\x03\x02\x02\x02\u02E5\u02E6\x03\x02\x02\x02\u02E6\u02EF\x03" +
		"\x02\x02\x02\u02E7\u02E9\x05V,\x02\u02E8\u02EA\x07\x04\x02\x02\u02E9\u02E8" +
		"\x03\x02\x02\x02\u02EA\u02EB\x03\x02\x02\x02\u02EB\u02E9\x03\x02\x02\x02" +
		"\u02EB\u02EC\x03\x02\x02\x02\u02EC\u02EE\x03\x02\x02\x02\u02ED\u02E7\x03" +
		"\x02\x02\x02\u02EE\u02F1\x03\x02\x02\x02\u02EF\u02ED\x03\x02\x02\x02\u02EF" +
		"\u02F0\x03\x02\x02\x02\u02F0\u02F2\x03\x02\x02\x02\u02F1\u02EF\x03\x02" +
		"\x02\x02\u02F2\u02F3\x07\x07\x02\x02\u02F3\u02F7\x07\n\x02\x02\u02F4\u02F6" +
		"\x07\x04\x02\x02\u02F5\u02F4\x03\x02\x02\x02\u02F6\u02F9\x03\x02\x02\x02" +
		"\u02F7\u02F5\x03\x02\x02\x02\u02F7\u02F8\x03\x02\x02\x02\u02F8U\x03\x02" +
		"\x02\x02\u02F9\u02F7\x03\x02\x02\x02\u02FA\u02FB\x07\xB2\x02\x02\u02FB" +
		"\u02FD\x07\xB4\x02\x02\u02FC\u02FA\x03\x02\x02\x02\u02FC\u02FD\x03\x02" +
		"\x02\x02\u02FD\u02FE\x03\x02\x02\x02\u02FE\u02FF\x07\xB2\x02\x02\u02FF" +
		"\u0300\x07\xB1\x02\x02\u0300\u0302\x05\x80A\x02\u0301\u0303\x07\xB2\x02" +
		"\x02\u0302\u0301\x03\x02\x02\x02\u0302\u0303\x03\x02\x02\x02\u0303W\x03" +
		"\x02\x02\x02\u0304\u0305\x07\x06\x02\x02\u0305\u0306\x07\x19\x02\x02\u0306" +
		"\u0308\x07\x1A\x02\x02\u0307\u0309\x07\x04\x02\x02\u0308\u0307\x03\x02" +
		"\x02\x02\u0309\u030A\x03\x02\x02\x02\u030A\u0308\x03\x02\x02\x02\u030A" +
		"\u030B\x03\x02\x02\x02\u030B\u0314\x03\x02\x02\x02\u030C\u030E\x05Z.\x02" +
		"\u030D\u030F\x07\x04\x02\x02\u030E\u030D\x03\x02\x02\x02\u030F\u0310\x03" +
		"\x02\x02\x02\u0310\u030E\x03\x02\x02\x02\u0310\u0311\x03\x02\x02\x02\u0311" +
		"\u0313\x03\x02\x02\x02\u0312\u030C\x03\x02\x02\x02\u0313\u0316\x03\x02" +
		"\x02\x02\u0314\u0312\x03\x02\x02\x02\u0314\u0315\x03\x02\x02\x02\u0315" +
		"\u0317\x03\x02\x02\x02\u0316\u0314\x03\x02\x02\x02\u0317\u0318\x07\x07" +
		"\x02\x02\u0318\u0319\x07\x19\x02\x02\u0319\u031D\x07\x1A\x02\x02\u031A" +
		"\u031C\x07\x04\x02\x02\u031B\u031A\x03\x02\x02\x02\u031C\u031F\x03\x02" +
		"\x02\x02\u031D\u031B\x03\x02\x02\x02\u031D\u031E\x03\x02\x02\x02\u031E" +
		"Y\x03\x02\x02\x02\u031F\u031D\x03\x02\x02\x02\u0320\u0321\x07\xB2\x02" +
		"\x02\u0321\u0323\x07\xB4\x02\x02\u0322\u0320\x03\x02\x02\x02\u0322\u0323" +
		"\x03\x02\x02\x02\u0323\u0324\x03\x02\x02\x02\u0324\u0325\x05$\x13\x02" +
		"\u0325\u0326\x05\x80A\x02\u0326[\x03\x02\x02\x02\u0327\u0328\x07\x06\x02" +
		"\x02\u0328\u0329\x07\x17\x02\x02\u0329\u032B\x07\x18\x02\x02\u032A\u032C" +
		"\x07\x04\x02\x02\u032B\u032A\x03\x02\x02\x02\u032C\u032D\x03\x02\x02\x02" +
		"\u032D\u032B\x03\x02\x02\x02\u032D\u032E\x03\x02\x02\x02\u032E\u0337\x03" +
		"\x02\x02\x02\u032F\u0331\x05^0\x02\u0330\u0332\x07\x04\x02\x02\u0331\u0330" +
		"\x03\x02\x02\x02\u0332\u0333\x03\x02\x02\x02\u0333\u0331\x03\x02\x02\x02" +
		"\u0333\u0334\x03\x02\x02\x02\u0334\u0336\x03\x02\x02\x02\u0335\u032F\x03" +
		"\x02\x02\x02\u0336\u0339\x03\x02\x02\x02\u0337\u0335\x03\x02\x02\x02\u0337" +
		"\u0338\x03\x02\x02\x02\u0338\u033A\x03\x02\x02\x02\u0339\u0337\x03\x02" +
		"\x02\x02\u033A\u033B\x07\x07\x02\x02\u033B\u033C\x07\x17\x02\x02\u033C" +
		"\u0340\x07\x18\x02\x02\u033D\u033F\x07\x04\x02\x02\u033E\u033D\x03\x02" +
		"\x02\x02\u033F\u0342\x03\x02\x02\x02\u0340\u033E\x03\x02\x02\x02\u0340" +
		"\u0341\x03\x02\x02\x02\u0341]\x03\x02\x02\x02\u0342\u0340\x03\x02\x02" +
		"\x02\u0343\u0344\x07\xB2\x02\x02\u0344\u0346\x07\xB4\x02\x02\u0345\u0343" +
		"\x03\x02\x02\x02\u0345\u0346\x03\x02\x02\x02\u0346\u0347\x03\x02\x02\x02" +
		"\u0347\u0348\x05$\x13\x02\u0348\u0349\x07\xBD\x02\x02\u0349\u034A\x07" +
		"\xB2\x02\x02\u034A\u034C\x07\xBB\x02\x02\u034B\u034D\x05R*\x02\u034C\u034B" +
		"\x03\x02\x02\x02\u034C\u034D\x03\x02\x02\x02\u034D\u034E\x03\x02\x02\x02" +
		"\u034E\u034F\x07\xBC\x02\x02\u034F_\x03\x02\x02\x02\u0350\u0352\x05d3" +
		"\x02\u0351\u0350\x03\x02\x02\x02\u0352\u0353\x03\x02\x02\x02\u0353\u0351" +
		"\x03\x02\x02\x02\u0353\u0354\x03\x02\x02\x02\u0354a\x03\x02\x02\x02\u0355" +
		"\u0356\x07\x06\x02\x02\u0356\u0358\x07\x16\x02\x02\u0357\u0359\x07\x04" +
		"\x02\x02\u0358\u0357\x03\x02\x02\x02\u0359\u035A\x03\x02\x02\x02\u035A" +
		"\u0358\x03\x02\x02\x02\u035A\u035B\x03\x02\x02\x02\u035B\u035F\x03\x02" +
		"\x02\x02\u035C\u035E\x05d3\x02\u035D\u035C\x03\x02\x02\x02\u035E\u0361" +
		"\x03\x02\x02\x02\u035F\u035D\x03\x02\x02\x02\u035F\u0360\x03\x02\x02\x02" +
		"\u0360\u0362\x03\x02\x02\x02\u0361\u035F\x03\x02\x02\x02\u0362\u0363\x07" +
		"\x07\x02\x02\u0363\u0367\x07\x16\x02\x02\u0364\u0366\x07\x04\x02\x02\u0365" +
		"\u0364\x03\x02\x02\x02\u0366\u0369\x03\x02\x02\x02\u0367\u0365\x03\x02" +
		"\x02\x02\u0367\u0368\x03\x02\x02\x02\u0368c\x03\x02\x02\x02\u0369\u0367" +
		"\x03\x02\x02\x02\u036A\u0370\x05f4\x02\u036B\u0370\x05h5\x02\u036C\u0370" +
		"\x05j6\x02\u036D\u0370\x05l7\x02\u036E\u0370\x05n8\x02\u036F\u036A\x03" +
		"\x02\x02\x02\u036F\u036B\x03\x02\x02\x02\u036F\u036C\x03\x02\x02\x02\u036F" +
		"\u036D\x03\x02\x02\x02\u036F\u036E\x03\x02\x02\x02\u0370e\x03\x02\x02" +
		"\x02\u0371\u0372\x07)\x02\x02\u0372\u0374\x07\xBB\x02\x02\u0373\u0375" +
		"\x05p9\x02\u0374\u0373\x03\x02\x02\x02\u0374\u0375\x03\x02\x02\x02\u0375" +
		"\u0376\x03\x02\x02\x02\u0376\u0378\x07\xBC\x02\x02\u0377\u0379\x07\xB3" +
		"\x02\x02\u0378\u0377\x03\x02\x02\x02\u0378\u0379\x03\x02\x02\x02\u0379" +
		"\u037D\x03\x02\x02\x02\u037A\u037C\x07\x04\x02\x02\u037B\u037A\x03\x02" +
		"\x02\x02\u037C\u037F\x03\x02\x02\x02\u037D\u037B\x03\x02\x02\x02\u037D" +
		"\u037E\x03\x02\x02\x02\u037Eg\x03\x02\x02\x02\u037F\u037D\x03\x02\x02" +
		"\x02\u0380\u0381\t\x06\x02\x02\u0381\u0383\x07\xBB\x02\x02\u0382\u0384" +
		"\x05p9\x02\u0383\u0382\x03\x02\x02\x02\u0383\u0384\x03\x02\x02\x02\u0384" +
		"\u0385\x03\x02\x02\x02\u0385\u0387\x07\xBC\x02\x02\u0386\u0388\x07\xB3" +
		"\x02\x02\u0387\u0386\x03\x02\x02\x02\u0387\u0388\x03\x02\x02\x02\u0388" +
		"\u038C\x03\x02\x02\x02\u0389\u038B\x07\x04\x02\x02\u038A\u0389\x03\x02" +
		"\x02\x02\u038B\u038E\x03\x02\x02\x02\u038C\u038A\x03\x02\x02\x02\u038C" +
		"\u038D\x03\x02\x02\x02\u038Di\x03\x02\x02\x02\u038E\u038C\x03\x02\x02" +
		"\x02\u038F\u0390\t\x07\x02\x02\u0390\u0392\x07\xBB\x02\x02\u0391\u0393" +
		"\x05p9\x02\u0392\u0391\x03\x02\x02\x02\u0392\u0393\x03\x02\x02\x02\u0393" +
		"\u0394\x03\x02\x02\x02\u0394\u0396\x07\xBC\x02\x02\u0395\u0397\x07\xB3" +
		"\x02\x02\u0396\u0395\x03\x02\x02\x02\u0396\u0397\x03\x02\x02\x02\u0397" +
		"\u039B\x03\x02\x02\x02\u0398\u039A\x07\x04\x02\x02\u0399\u0398\x03\x02" +
		"\x02\x02\u039A\u039D\x03\x02\x02\x02\u039B\u0399\x03\x02\x02\x02\u039B" +
		"\u039C\x03\x02\x02\x02\u039Ck\x03\x02\x02\x02\u039D\u039B\x03\x02\x02" +
		"\x02\u039E\u039F\t\b\x02\x02\u039F\u03A0\x07\xBB\x02\x02\u03A0\u03A7\x07" +
		"\xD2\x02\x02\u03A1\u03A8\x05$\x13\x02\u03A2\u03A4\n\t\x02\x02\u03A3\u03A2" +
		"\x03\x02\x02\x02\u03A4\u03A5\x03\x02\x02\x02\u03A5\u03A3\x03\x02\x02\x02" +
		"\u03A5\u03A6\x03\x02\x02\x02\u03A6\u03A8\x03\x02\x02\x02\u03A7\u03A1\x03" +
		"\x02\x02\x02\u03A7\u03A3\x03\x02\x02\x02\u03A8\u03A9\x03\x02\x02\x02\u03A9" +
		"\u03AA\x07\xD2\x02\x02\u03AA\u03B4\x07\xB9\x02\x02\u03AB\u03B5\x05\x80" +
		"A\x02\u03AC\u03B0\x07\xD2\x02\x02\u03AD\u03AF\n\t\x02\x02\u03AE\u03AD" +
		"\x03\x02\x02\x02\u03AF\u03B2\x03\x02\x02\x02\u03B0\u03AE\x03\x02\x02\x02" +
		"\u03B0\u03B1\x03\x02\x02\x02\u03B1\u03B3\x03\x02\x02\x02\u03B2\u03B0\x03" +
		"\x02\x02\x02\u03B3\u03B5\x07\xD2\x02\x02\u03B4\u03AB\x03\x02\x02\x02\u03B4" +
		"\u03AC\x03\x02\x02\x02\u03B5\u03B6\x03\x02\x02\x02\u03B6\u03B8\x07\xBC" +
		"\x02\x02\u03B7\u03B9\x07\xB3\x02\x02\u03B8\u03B7\x03\x02\x02\x02\u03B8" +
		"\u03B9\x03\x02\x02\x02\u03B9\u03BD\x03\x02\x02\x02\u03BA\u03BC\x07\x04" +
		"\x02\x02\u03BB\u03BA\x03\x02\x02\x02\u03BC\u03BF\x03\x02\x02\x02\u03BD" +
		"\u03BB\x03\x02\x02\x02\u03BD\u03BE\x03\x02\x02\x02\u03BEm\x03\x02\x02" +
		"\x02\u03BF\u03BD\x03\x02\x02\x02\u03C0\u03C1\t\n\x02\x02\u03C1\u03C3\x07" +
		"\xBB\x02\x02\u03C2\u03C4\x05p9\x02\u03C3\u03C2\x03\x02\x02\x02\u03C3\u03C4" +
		"\x03\x02\x02\x02\u03C4\u03C5\x03\x02\x02\x02\u03C5\u03C7\x07\xBC\x02\x02" +
		"\u03C6\u03C8\x07\xB3\x02\x02\u03C7\u03C6\x03\x02\x02\x02\u03C7\u03C8\x03" +
		"\x02\x02\x02\u03C8\u03CC\x03\x02\x02\x02\u03C9\u03CB\x07\x04\x02\x02\u03CA" +
		"\u03C9\x03\x02\x02\x02\u03CB\u03CE\x03\x02\x02\x02\u03CC\u03CA\x03\x02" +
		"\x02\x02\u03CC\u03CD\x03\x02\x02\x02\u03CDo\x03\x02\x02\x02\u03CE\u03CC" +
		"\x03\x02\x02\x02\u03CF\u03D1\x07\xB7\x02\x02\u03D0\u03D2\x05r:\x02\u03D1" +
		"\u03D0\x03\x02\x02\x02\u03D1\u03D2\x03\x02\x02\x02\u03D2\u03D3\x03\x02" +
		"\x02\x02\u03D3\u03D4\x07\xB8\x02\x02\u03D4q\x03\x02\x02\x02\u03D5\u03DA" +
		"\x05t;\x02\u03D6\u03D7\x07\xB9\x02\x02\u03D7\u03D9\x05t;\x02\u03D8\u03D6" +
		"\x03\x02\x02\x02\u03D9\u03DC\x03\x02\x02\x02\u03DA\u03D8\x03\x02\x02\x02" +
		"\u03DA\u03DB\x03\x02\x02\x02\u03DBs\x03\x02\x02\x02\u03DC\u03DA\x03\x02" +
		"\x02\x02\u03DD\u03DE\x05|?\x02\u03DE\u03DF\x07\xC6\x02\x02\u03DF\u03E0" +
		"\x05v<\x02\u03E0u\x03\x02\x02\x02\u03E1\u03F4\x05\x80A\x02\u03E2\u03E6" +
		"\x07\xD2\x02\x02\u03E3\u03E5\n\t\x02\x02\u03E4\u03E3\x03\x02\x02\x02\u03E5" +
		"\u03E8\x03\x02\x02\x02\u03E6\u03E4\x03\x02\x02\x02\u03E6\u03E7\x03\x02" +
		"\x02\x02\u03E7\u03E9\x03\x02\x02\x02\u03E8\u03E6\x03\x02\x02\x02\u03E9" +
		"\u03F4\x07\xD2\x02\x02\u03EA\u03EB\x07\xB5\x02\x02\u03EB\u03EC\x05~@\x02" +
		"\u03EC\u03ED\x07\xB6\x02\x02\u03ED\u03F4\x03\x02\x02\x02\u03EE\u03F0\x07" +
		"\xB7\x02\x02\u03EF\u03F1\x05x=\x02\u03F0\u03EF\x03\x02\x02\x02\u03F0\u03F1" +
		"\x03\x02\x02\x02\u03F1\u03F2\x03\x02\x02\x02\u03F2\u03F4\x07\xB8\x02\x02" +
		"\u03F3\u03E1\x03\x02\x02\x02\u03F3\u03E2\x03\x02\x02\x02\u03F3\u03EA\x03" +
		"\x02\x02\x02\u03F3\u03EE\x03\x02\x02\x02\u03F4w\x03\x02\x02\x02\u03F5" +
		"\u03FA\x05z>\x02\u03F6\u03F7\x07\xB9\x02\x02\u03F7\u03F9\x05z>\x02\u03F8" +
		"\u03F6\x03\x02\x02\x02\u03F9\u03FC\x03\x02\x02\x02\u03FA\u03F8\x03\x02" +
		"\x02\x02\u03FA\u03FB\x03\x02\x02\x02\u03FBy\x03\x02\x02\x02\u03FC\u03FA" +
		"\x03\x02\x02\x02\u03FD\u0400\x07\xB2\x02\x02\u03FE\u0400\x05|?\x02\u03FF" +
		"\u03FD\x03\x02\x02\x02\u03FF\u03FE\x03\x02\x02\x02\u0400\u0401\x03\x02" +
		"\x02\x02\u0401\u0402\x07\xC6\x02\x02\u0402\u0403\x05\x80A\x02\u0403{\x03" +
		"\x02\x02\x02\u0404\u0405\t\v\x02\x02\u0405}\x03\x02\x02\x02\u0406\u040B" +
		"\x05\x80A\x02\u0407\u0408\x07\xB9\x02\x02\u0408\u040A\x05\x80A\x02\u0409" +
		"\u0407\x03\x02\x02\x02\u040A\u040D\x03\x02\x02\x02\u040B\u0409\x03\x02" +
		"\x02\x02\u040B\u040C\x03\x02\x02\x02\u040C\x7F\x03\x02\x02\x02\u040D\u040B" +
		"\x03\x02\x02\x02\u040E\u040F\x05\x82B\x02\u040F\x81\x03\x02\x02\x02\u0410" +
		"\u0416\x05\x84C\x02\u0411\u0412\x07\xD0\x02\x02\u0412\u0413\x05\x80A\x02" +
		"\u0413\u0414\x07\xB4\x02\x02\u0414\u0415\x05\x80A\x02\u0415\u0417\x03" +
		"\x02\x02\x02\u0416\u0411\x03\x02\x02\x02\u0416\u0417\x03\x02\x02\x02\u0417" +
		"\x83\x03\x02\x02\x02\u0418\u041E\x05\x86D\x02\u0419\u041A\x07\xCF\x02" +
		"\x02\u041A\u041B\x07\xCF\x02\x02\u041B\u041D\x05\x86D\x02\u041C\u0419" +
		"\x03\x02\x02\x02\u041D\u0420\x03\x02\x02\x02\u041E\u041C\x03\x02\x02\x02" +
		"\u041E\u041F\x03\x02\x02\x02\u041F\x85\x03\x02\x02\x02\u0420\u041E\x03" +
		"\x02\x02\x02\u0421\u0427\x05\x88E\x02\u0422\u0423\x07\xD3\x02\x02\u0423" +
		"\u0424\x07\xD3\x02\x02\u0424\u0426\x05\x88E\x02\u0425\u0422\x03\x02\x02" +
		"\x02\u0426\u0429\x03\x02\x02\x02\u0427\u0425\x03\x02\x02\x02\u0427\u0428" +
		"\x03\x02\x02\x02\u0428\x87\x03\x02\x02\x02\u0429\u0427\x03\x02\x02\x02" +
		"\u042A\u042F\x05\x8AF\x02\u042B\u042C\t\f\x02\x02\u042C\u042E\x05\x8A" +
		"F\x02\u042D\u042B\x03\x02\x02\x02\u042E\u0431\x03\x02\x02\x02\u042F\u042D" +
		"\x03\x02\x02\x02\u042F\u0430\x03\x02\x02\x02\u0430\x89\x03\x02\x02\x02" +
		"\u0431\u042F\x03\x02\x02\x02\u0432\u0433\x05\x8CG\x02\u0433\x8B\x03\x02" +
		"\x02\x02\u0434\u0439\x05\x8EH\x02\u0435\u0436\t\r\x02\x02\u0436\u0438" +
		"\x05\x8EH\x02\u0437\u0435\x03\x02\x02\x02\u0438\u043B\x03\x02\x02\x02" +
		"\u0439\u0437\x03\x02\x02\x02\u0439\u043A\x03\x02\x02\x02\u043A\x8D\x03" +
		"\x02\x02\x02\u043B\u0439\x03\x02\x02\x02\u043C\u0441\x05\x90I\x02\u043D" +
		"\u043E\t\x0E\x02\x02\u043E\u0440\x05\x90I\x02\u043F\u043D\x03\x02\x02" +
		"\x02\u0440\u0443\x03\x02\x02\x02\u0441\u043F\x03\x02\x02\x02\u0441\u0442" +
		"\x03\x02\x02\x02\u0442\x8F\x03\x02\x02\x02\u0443\u0441\x03\x02\x02\x02" +
		"\u0444\u0449\x05\x92J\x02\u0445\u0446\x07\xCD\x02\x02\u0446\u0448\x05" +
		"\x92J\x02\u0447\u0445\x03\x02\x02\x02\u0448\u044B\x03\x02\x02\x02\u0449" +
		"\u0447\x03\x02\x02\x02\u0449\u044A\x03\x02\x02\x02\u044A\x91\x03\x02\x02" +
		"\x02\u044B\u0449\x03\x02\x02\x02\u044C\u044E\t\r\x02\x02\u044D\u044C\x03" +
		"\x02\x02\x02\u044D\u044E\x03\x02\x02\x02\u044E\u044F\x03\x02\x02\x02\u044F" +
		"\u0450\x05\x94K\x02\u0450\x93\x03\x02\x02\x02\u0451\u0452\x07\xBB\x02" +
		"\x02\u0452\u0453\x05\x80A\x02\u0453\u0454\x07\xBC\x02\x02\u0454\u045A" +
		"\x03\x02\x02\x02\u0455\u045A\x05\x96L\x02\u0456\u045A\x05\x98M\x02\u0457" +
		"\u045A";
	private static readonly _serializedATNSegment2: string =
		"\x05\x9AN\x02\u0458\u045A\x07\xB2\x02\x02\u0459\u0451\x03\x02\x02\x02" +
		"\u0459\u0455\x03\x02\x02\x02\u0459\u0456\x03\x02\x02\x02\u0459\u0457\x03" +
		"\x02\x02\x02\u0459\u0458\x03\x02\x02\x02\u045A\x95\x03\x02\x02\x02\u045B" +
		"\u045C\t\x0F\x02\x02\u045C\u045E\x07\xBB\x02\x02\u045D\u045F\x05~@\x02" +
		"\u045E\u045D\x03\x02\x02\x02\u045E\u045F\x03\x02\x02\x02\u045F\u0460\x03" +
		"\x02\x02\x02\u0460\u0461\x07\xBC\x02\x02\u0461\x97\x03\x02\x02\x02\u0462" +
		"\u0463\x07\xB2\x02\x02\u0463\u0464\x07\xBB\x02\x02\u0464\u0465\x05\x80" +
		"A\x02\u0465\u0466\x07\xBC\x02\x02\u0466\x99\x03\x02\x02\x02\u0467\u0468" +
		"\t\x10\x02\x02\u0468\x9B\x03\x02\x02\x02\x96\x9F\xA5\xAD\xB2\xBA\xC0\xC3" +
		"\xC7\xCF\xD6\xDB\xE0\xE9\xEE\xFB\u0107\u010B\u0110\u0115\u011E\u0123\u012F" +
		"\u0136\u013C\u0140\u0148\u014D\u0151\u0154\u015C\u0162\u0166\u016F\u0174" +
		"\u017B\u017E\u0181\u0185\u0189\u018F\u0196\u019D\u01A2\u01A8\u01AC\u01B3" +
		"\u01B8\u01BD\u01C0\u01C5\u01CD\u01D4\u01D9\u01DE\u01E1\u01E4\u01EA\u01EE" +
		"\u01F2\u01F8\u01FD\u0208\u0211\u0217\u021B\u0223\u0228\u0235\u023E\u0244" +
		"\u0248\u0251\u0257\u025D\u0264\u026D\u0271\u0278\u027C\u0283\u02A5\u02AC" +
		"\u02B4\u02BA\u02BE\u02C6\u02CB\u02D0\u02D4\u02DD\u02E5\u02EB\u02EF\u02F7" +
		"\u02FC\u0302\u030A\u0310\u0314\u031D\u0322\u032D\u0333\u0337\u0340\u0345" +
		"\u034C\u0353\u035A\u035F\u0367\u036F\u0374\u0378\u037D\u0383\u0387\u038C" +
		"\u0392\u0396\u039B\u03A5\u03A7\u03B0\u03B4\u03B8\u03BD\u03C3\u03C7\u03CC" +
		"\u03D1\u03DA\u03E6\u03F0\u03F3\u03FA\u03FF\u040B\u0416\u041E\u0427\u042F" +
		"\u0439\u0441\u0449\u044D\u0459\u045E";
	public static readonly _serializedATN: string = Utils.join(
		[
			BNGParser._serializedATNSegment0,
			BNGParser._serializedATNSegment1,
			BNGParser._serializedATNSegment2,
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
	public wrapped_actions_block(): Wrapped_actions_blockContext | undefined {
		return this.tryGetRuleContext(0, Wrapped_actions_blockContext);
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
	public wrapped_actions_block(): Wrapped_actions_blockContext | undefined {
		return this.tryGetRuleContext(0, Wrapped_actions_blockContext);
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
	public BECOMES(): TerminalNode | undefined { return this.tryGetToken(BNGParser.BECOMES, 0); }
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
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.RPAREN, 0); }
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
	public INT(): TerminalNode[];
	public INT(i: number): TerminalNode;
	public INT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.INT);
		} else {
			return this.getToken(BNGParser.INT, i);
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
	public STRING(): TerminalNode[];
	public STRING(i: number): TerminalNode;
	public STRING(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.STRING);
		} else {
			return this.getToken(BNGParser.STRING, i);
		}
	}
	public COLON(): TerminalNode[];
	public COLON(i: number): TerminalNode;
	public COLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.COLON);
		} else {
			return this.getToken(BNGParser.COLON, i);
		}
	}
	public DOLLAR(): TerminalNode | undefined { return this.tryGetToken(BNGParser.DOLLAR, 0); }
	public AT(): TerminalNode | undefined { return this.tryGetToken(BNGParser.AT, 0); }
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
	public AT(): TerminalNode[];
	public AT(i: number): TerminalNode;
	public AT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.AT);
		} else {
			return this.getToken(BNGParser.AT, i);
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
	public COLON(): TerminalNode | undefined { return this.tryGetToken(BNGParser.COLON, 0); }
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.DOT);
		} else {
			return this.getToken(BNGParser.DOT, i);
		}
	}
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
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.RPAREN, 0); }
	public molecule_tag(): Molecule_tagContext | undefined {
		return this.tryGetRuleContext(0, Molecule_tagContext);
	}
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


export class Molecule_tagContext extends ParserRuleContext {
	public MOD(): TerminalNode { return this.getToken(BNGParser.MOD, 0); }
	public INT(): TerminalNode { return this.getToken(BNGParser.INT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_molecule_tag; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterMolecule_tag) {
			listener.enterMolecule_tag(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitMolecule_tag) {
			listener.exitMolecule_tag(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitMolecule_tag) {
			return visitor.visitMolecule_tag(this);
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
	public bond_spec(): Bond_specContext[];
	public bond_spec(i: number): Bond_specContext;
	public bond_spec(i?: number): Bond_specContext | Bond_specContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Bond_specContext);
		} else {
			return this.getRuleContext(i, Bond_specContext);
		}
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
	public INT(): TerminalNode | undefined { return this.tryGetToken(BNGParser.INT, 0); }
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
	public LBRACKET(): TerminalNode | undefined { return this.tryGetToken(BNGParser.LBRACKET, 0); }
	public rule_modifiers(): Rule_modifiersContext[];
	public rule_modifiers(i: number): Rule_modifiersContext;
	public rule_modifiers(i?: number): Rule_modifiersContext | Rule_modifiersContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Rule_modifiersContext);
		} else {
			return this.getRuleContext(i, Rule_modifiersContext);
		}
	}
	public RBRACKET(): TerminalNode | undefined { return this.tryGetToken(BNGParser.RBRACKET, 0); }
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


export class Wrapped_actions_blockContext extends ParserRuleContext {
	public BEGIN(): TerminalNode { return this.getToken(BNGParser.BEGIN, 0); }
	public ACTIONS(): TerminalNode[];
	public ACTIONS(i: number): TerminalNode;
	public ACTIONS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BNGParser.ACTIONS);
		} else {
			return this.getToken(BNGParser.ACTIONS, i);
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
	public get ruleIndex(): number { return BNGParser.RULE_wrapped_actions_block; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterWrapped_actions_block) {
			listener.enterWrapped_actions_block(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitWrapped_actions_block) {
			listener.exitWrapped_actions_block(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitWrapped_actions_block) {
			return visitor.visitWrapped_actions_block(this);
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
	public COMMA(): TerminalNode { return this.getToken(BNGParser.COMMA, 0); }
	public RPAREN(): TerminalNode { return this.getToken(BNGParser.RPAREN, 0); }
	public SETCONCENTRATION(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SETCONCENTRATION, 0); }
	public ADDCONCENTRATION(): TerminalNode | undefined { return this.tryGetToken(BNGParser.ADDCONCENTRATION, 0); }
	public SETPARAMETER(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SETPARAMETER, 0); }
	public species_def(): Species_defContext | undefined {
		return this.tryGetRuleContext(0, Species_defContext);
	}
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
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
	public RBRACKET(): TerminalNode { return this.getToken(BNGParser.RBRACKET, 0); }
	public action_arg_list(): Action_arg_listContext | undefined {
		return this.tryGetRuleContext(0, Action_arg_listContext);
	}
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
	public action_arg_value(): Action_arg_valueContext {
		return this.getRuleContext(0, Action_arg_valueContext);
	}
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


export class Action_arg_valueContext extends ParserRuleContext {
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
	public LBRACKET(): TerminalNode | undefined { return this.tryGetToken(BNGParser.LBRACKET, 0); }
	public RBRACKET(): TerminalNode | undefined { return this.tryGetToken(BNGParser.RBRACKET, 0); }
	public nested_hash_list(): Nested_hash_listContext | undefined {
		return this.tryGetRuleContext(0, Nested_hash_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_action_arg_value; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterAction_arg_value) {
			listener.enterAction_arg_value(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitAction_arg_value) {
			listener.exitAction_arg_value(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitAction_arg_value) {
			return visitor.visitAction_arg_value(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Nested_hash_listContext extends ParserRuleContext {
	public nested_hash_item(): Nested_hash_itemContext[];
	public nested_hash_item(i: number): Nested_hash_itemContext;
	public nested_hash_item(i?: number): Nested_hash_itemContext | Nested_hash_itemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Nested_hash_itemContext);
		} else {
			return this.getRuleContext(i, Nested_hash_itemContext);
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
	public get ruleIndex(): number { return BNGParser.RULE_nested_hash_list; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterNested_hash_list) {
			listener.enterNested_hash_list(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitNested_hash_list) {
			listener.exitNested_hash_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitNested_hash_list) {
			return visitor.visitNested_hash_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Nested_hash_itemContext extends ParserRuleContext {
	public ASSIGNS(): TerminalNode { return this.getToken(BNGParser.ASSIGNS, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public STRING(): TerminalNode | undefined { return this.tryGetToken(BNGParser.STRING, 0); }
	public arg_name(): Arg_nameContext | undefined {
		return this.tryGetRuleContext(0, Arg_nameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BNGParser.RULE_nested_hash_item; }
	// @Override
	public enterRule(listener: BNGParserListener): void {
		if (listener.enterNested_hash_item) {
			listener.enterNested_hash_item(this);
		}
	}
	// @Override
	public exitRule(listener: BNGParserListener): void {
		if (listener.exitNested_hash_item) {
			listener.exitNested_hash_item(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BNGParserVisitor<Result>): Result {
		if (visitor.visitNested_hash_item) {
			return visitor.visitNested_hash_item(this);
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
	public PRINT_CDAT(): TerminalNode | undefined { return this.tryGetToken(BNGParser.PRINT_CDAT, 0); }
	public PRINT_FUNCTIONS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.PRINT_FUNCTIONS, 0); }
	public PRINT_NET(): TerminalNode | undefined { return this.tryGetToken(BNGParser.PRINT_NET, 0); }
	public PRINT_END(): TerminalNode | undefined { return this.tryGetToken(BNGParser.PRINT_END, 0); }
	public STOP_IF(): TerminalNode | undefined { return this.tryGetToken(BNGParser.STOP_IF, 0); }
	public PRINT_ON_STOP(): TerminalNode | undefined { return this.tryGetToken(BNGParser.PRINT_ON_STOP, 0); }
	public SAVE_PROGRESS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SAVE_PROGRESS, 0); }
	public MAX_SIM_STEPS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.MAX_SIM_STEPS, 0); }
	public OUTPUT_STEP_INTERVAL(): TerminalNode | undefined { return this.tryGetToken(BNGParser.OUTPUT_STEP_INTERVAL, 0); }
	public SAMPLE_TIMES(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SAMPLE_TIMES, 0); }
	public PLA_CONFIG(): TerminalNode | undefined { return this.tryGetToken(BNGParser.PLA_CONFIG, 0); }
	public PLA_OUTPUT(): TerminalNode | undefined { return this.tryGetToken(BNGParser.PLA_OUTPUT, 0); }
	public PARAM(): TerminalNode | undefined { return this.tryGetToken(BNGParser.PARAM, 0); }
	public COMPLEX(): TerminalNode | undefined { return this.tryGetToken(BNGParser.COMPLEX, 0); }
	public GET_FINAL_STATE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.GET_FINAL_STATE, 0); }
	public GML(): TerminalNode | undefined { return this.tryGetToken(BNGParser.GML, 0); }
	public NOCSLF(): TerminalNode | undefined { return this.tryGetToken(BNGParser.NOCSLF, 0); }
	public NOTF(): TerminalNode | undefined { return this.tryGetToken(BNGParser.NOTF, 0); }
	public BINARY_OUTPUT(): TerminalNode | undefined { return this.tryGetToken(BNGParser.BINARY_OUTPUT, 0); }
	public UTL(): TerminalNode | undefined { return this.tryGetToken(BNGParser.UTL, 0); }
	public EQUIL(): TerminalNode | undefined { return this.tryGetToken(BNGParser.EQUIL, 0); }
	public PARAMETER(): TerminalNode | undefined { return this.tryGetToken(BNGParser.PARAMETER, 0); }
	public PAR_MIN(): TerminalNode | undefined { return this.tryGetToken(BNGParser.PAR_MIN, 0); }
	public PAR_MAX(): TerminalNode | undefined { return this.tryGetToken(BNGParser.PAR_MAX, 0); }
	public N_SCAN_PTS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.N_SCAN_PTS, 0); }
	public LOG_SCALE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.LOG_SCALE, 0); }
	public RESET_CONC(): TerminalNode | undefined { return this.tryGetToken(BNGParser.RESET_CONC, 0); }
	public BDF(): TerminalNode | undefined { return this.tryGetToken(BNGParser.BDF, 0); }
	public MAX_STEP(): TerminalNode | undefined { return this.tryGetToken(BNGParser.MAX_STEP, 0); }
	public MAXORDER(): TerminalNode | undefined { return this.tryGetToken(BNGParser.MAXORDER, 0); }
	public STATS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.STATS, 0); }
	public MAX_NUM_STEPS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.MAX_NUM_STEPS, 0); }
	public MAX_ERR_TEST_FAILS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.MAX_ERR_TEST_FAILS, 0); }
	public MAX_CONV_FAILS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.MAX_CONV_FAILS, 0); }
	public STIFF(): TerminalNode | undefined { return this.tryGetToken(BNGParser.STIFF, 0); }
	public ATOMIZE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.ATOMIZE, 0); }
	public BLOCKS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.BLOCKS, 0); }
	public SKIPACTIONS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SKIPACTIONS, 0); }
	public INCLUDE_MODEL(): TerminalNode | undefined { return this.tryGetToken(BNGParser.INCLUDE_MODEL, 0); }
	public INCLUDE_NETWORK(): TerminalNode | undefined { return this.tryGetToken(BNGParser.INCLUDE_NETWORK, 0); }
	public PRETTY_FORMATTING(): TerminalNode | undefined { return this.tryGetToken(BNGParser.PRETTY_FORMATTING, 0); }
	public EVALUATE_EXPRESSIONS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.EVALUATE_EXPRESSIONS, 0); }
	public TYPE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.TYPE, 0); }
	public BACKGROUND(): TerminalNode | undefined { return this.tryGetToken(BNGParser.BACKGROUND, 0); }
	public COLLAPSE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.COLLAPSE, 0); }
	public OPTS(): TerminalNode | undefined { return this.tryGetToken(BNGParser.OPTS, 0); }
	public SAFE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.SAFE, 0); }
	public EXECUTE(): TerminalNode | undefined { return this.tryGetToken(BNGParser.EXECUTE, 0); }
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


