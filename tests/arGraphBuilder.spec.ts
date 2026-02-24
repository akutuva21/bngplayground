import { describe, it, expect } from 'vitest';
import { buildAtomRuleGraph } from '../services/visualization/arGraphBuilder';
import { exportArGraphToGraphML } from '../services/visualization/arGraphExporter';

describe('Atom-rule graph builder enhancements', () => {
  it('prefixes numeric rule names with underscore', () => {
    const graph = buildAtomRuleGraph([{ name: '1', reactants: ['A()'], products: ['B()'], rate: '', isBidirectional: false }]);
    const ruleNode = graph.nodes.find(n => n.type === 'rule');
    expect(ruleNode).toBeDefined();
    expect(ruleNode!.id).toBe('_1');
  });

  it('generates wildcard atoms and edges', () => {
    // reactant contains a wildcard bond component that should create a wildcard atom
    const r = { name: 'w', reactants: ['A(b!+).B(a)'], products: ['A(b!1).B(a!1)'], rate: '', isBidirectional: false };
    const graph = buildAtomRuleGraph([r]);
    // expect a wildcard atom node
    const wildcardNode = graph.nodes.find(n => n.label.includes('!+'));
    expect(wildcardNode).toBeDefined();
    // expect there is at least one wildcard edge connecting to a bond atom
    const wildcardEdges = graph.edges.filter(e => e.edgeType === 'wildcard');
    expect(wildcardEdges.length).toBeGreaterThan(0);
    // exporting should produce a wildcard edge with normal color
    const xml = exportArGraphToGraphML(graph);
    expect(xml).toContain('color="#000000"');
    expect(xml).toMatch(/edge id="n\d+::e\d+"/);
  });

  it('suppresses rate-law dependency edges when includeRateLawDeps=false', () => {
    // choose a species not part of reactants/products
    const rule = { name: 'r', reactants: ['A()'], products: ['B()'], rate: 'C', isBidirectional: false };
    const full = buildAtomRuleGraph([rule], { includeRateLawDeps: true });
    const slim = buildAtomRuleGraph([rule], { includeRateLawDeps: false });
    const fullMod = full.edges.filter(e => e.edgeType === 'modifies');
    const slimMod = slim.edges.filter(e => e.edgeType === 'modifies');
    expect(fullMod.length).toBeGreaterThan(slimMod.length);
  });

  it('prettifies compound atom labels (bonds) with spaces', () => {
    // A bond generates a hyphenated label that should get spaces around it
    const graph = buildAtomRuleGraph([{ name: 'r', reactants: ['A(b!1).B(a!1)'], products: ['A(b!1).B(a!1)'], rate: '', isBidirectional: false }]);
    const node = graph.nodes.find(n => n.type === 'atom' && n.label.includes('—'));
    expect(node).toBeDefined();
    // label should contain spaces around the dash and parentheses if present
    expect(node!.label).toMatch(/\s—\s/);
  });

  it('allows using BNG2-style atomization (retain full species strings)', () => {
    const rule = { name: 'r', reactants: ['A(b!1).B(a!1)'], products: ['C()'], rate: '', isBidirectional: false };
    const def = buildAtomRuleGraph([rule]);
    const bng2 = buildAtomRuleGraph([rule], { atomization: 'bng2' });
    const defLabels = def.nodes.filter(n => n.type === 'atom').map(n => n.label);
    const bng2Labels = bng2.nodes.filter(n => n.type === 'atom').map(n => n.label);
    // BNG2 mode should include the original reactant string as an atom
    expect(bng2Labels).toContain('A(b!1).B(a!1)');
    // default mode breaks the species into component atoms instead
    expect(defLabels).not.toContain('A(b!1).B(a!1)');
    // ensure bng2 graph has only one atom per reactant
    expect(bng2Labels.length).toBe(rule.reactants.length + rule.products.length);
  });
});

describe('GraphML exporter styling & id scheme', () => {
  it('assigns numeric ids and hides rule labels by default', () => {
    const graph = buildAtomRuleGraph([
      { name: 'x', reactants: ['A()'], products: ['B()'], rate: '', isBidirectional: false },
    ]);
    const xml = exportArGraphToGraphML(graph);
    expect(xml).toMatch(/<node id="n0"/);
    expect(xml).toMatch(/<node id="n1"/);
    // rule label blank
    expect(xml).toMatch(/<y:NodeLabel[^>]*>\s*<\/y:NodeLabel>/);
  });

  it('uses proper outline color and font size, and emits hierarchical edge ids', () => {
    const graph = buildAtomRuleGraph([
      { name: 'x', reactants: ['A()'], products: ['B()'], rate: '', isBidirectional: false },
    ]);
    const xml = exportArGraphToGraphML(graph, { showRuleNames: true });
    expect(xml).toContain('BorderStyle color="#999999"');
    expect(xml).toContain('fontSize="14"');
    expect(xml).toContain('fontStyle="plain"');
    // there should be an edge id with the nX::eY pattern
    expect(xml).toMatch(/edge id="n\d+::e\d+"/);
  });

  it('can hide monomer atom labels (but not complexes) when hideAtomLabels=true', () => {
    // create a rule with a simple monomer reactant and a bonded product complex
    const graph = buildAtomRuleGraph([
      { name: 'x', reactants: ['A()'], products: ['A(b!1).B(a!1)'], rate: '', isBidirectional: false },
    ]);
    const xml = exportArGraphToGraphML(graph, { hideAtomLabels: true, showRuleNames: false });
    // the monomer atom should be hidden, but the bonded complex should still appear
    expect(xml).not.toContain('A()');
    // prettified compound labels use spaces and dash
    expect(xml).toContain('A.b — B.a');
  });

  it('embeds geometry positions when supplied', () => {
    const graph = buildAtomRuleGraph([
      { name: 'r', reactants: ['A()'], products: ['B()'], rate: '', isBidirectional: false },
    ]);
    const xml = exportArGraphToGraphML(graph, { positions: { A: { x: 1, y: 2 }, B: { x: -3, y: 4 } }, showRuleNames: false });
    expect(xml).toContain('Geometry x="1.0" y="2.0"');
    expect(xml).toContain('Geometry x="-3.0" y="4.0"');
  });
});
