import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import fcose from 'cytoscape-fcose';
import type { AtomRuleGraph } from '../types/visualization';
import { colorFromName, foregroundForBackground } from '../services/visualization/colorUtils';
import { exportArGraphToGraphML } from '../services/visualization/arGraphExporter';
import { Button } from './ui/Button';
import { LoadingSpinner } from './ui/LoadingSpinner';

// Register layout plugins (idempotent)
cytoscape.use(dagre);
cytoscape.use(fcose);

type LayoutType = 'hierarchical' | 'cose' | 'fcose' | 'grid' | 'concentric' | 'breadthfirst' | 'circle';

const LAYOUT_CONFIGS: Record<LayoutType, any> = {
  hierarchical: {
    name: 'dagre',
    rankDir: 'TB',
    nodeSep: 80,
    rankSep: 120,
    edgeSep: 20,
    animate: true,
    animationDuration: 400,
    padding: 50,
    fit: true,
    spacingFactor: 1.5,
  },
  cose: {
    name: 'cose',
    animate: true,
    animationDuration: 500,
    padding: 50,
    fit: true,
    nodeRepulsion: 100000,
    nodeOverlap: 20,
    idealEdgeLength: 60,
    nestingFactor: 1.2,
    gravity: 80,
    numIter: 1000,
    nodeDimensionsIncludeLabels: true,
    randomize: false,
  },
  fcose: {
    name: 'fcose',
    quality: 'proof',
    randomize: false,
    animate: true,
    animationDuration: 1000,
    fit: true,
    padding: 30,
    nodeDimensionsIncludeLabels: true,
    uniformNodeDimensions: false,
    packComponents: true,
    step: 'all',
    nodeRepulsion: 4500,
    idealEdgeLength: 50,
    edgeElasticity: 0.45,
    nestingFactor: 0.1,
    gravity: 0.25,
    numIter: 2500,
    tile: true,
    tilingPaddingVertical: 10,
    tilingPaddingHorizontal: 10,
  },
  grid: {
    name: 'grid',
    animate: true,
    animationDuration: 300,
    padding: 50,
    fit: true,
    avoidOverlap: true,
    avoidOverlapPadding: 15,
    condense: false,
    nodeDimensionsIncludeLabels: true,
  },
  concentric: {
    name: 'concentric',
    animate: true,
    animationDuration: 300,
    padding: 50,
    fit: true,
    avoidOverlap: true,
    minNodeSpacing: 50,
    spacingFactor: 1.5,
    nodeDimensionsIncludeLabels: true,
    concentric: (node: any) => (node.data('type') === 'rule' ? 2 : 1),
    levelWidth: () => 1,
  },
  breadthfirst: {
    name: 'breadthfirst',
    directed: true,
    animate: true,
    animationDuration: 300,
    padding: 50,
    fit: true,
    avoidOverlap: true,
    spacingFactor: 1.5,
    circle: false,
    nodeDimensionsIncludeLabels: true,
  },
  circle: {
    name: 'circle',
    animate: true,
    animationDuration: 300,
    padding: 40,
    fit: true,
    avoidOverlap: true,
    spacingFactor: 1.5,
    nodeDimensionsIncludeLabels: true,
  },
};

interface ARGraphViewerProps {
  arGraph: AtomRuleGraph;
  selectedRuleId?: string | null;
  selectedAtomId?: string | null;
  onSelectRule?: (ruleId: string) => void;
  onSelectAtom?: (atomId: string) => void;
  /**
   * Arbitrary value that, when changed, triggers an additional fit attempt.
   * Pass the current active tab or visibility flag from the parent so that
   * the graph is fitted whenever the viewer becomes visible or the tab
   * changes.
   */
  forceFitTrigger?: any;
}

export const ARGraphViewer: React.FC<ARGraphViewerProps> = ({
  arGraph,
  selectedRuleId,
  selectedAtomId,
  onSelectRule,
  onSelectAtom,
  forceFitTrigger,
}) => {
  const [theme] = useTheme();
  const [isLayoutRunning, setIsLayoutRunning] = useState(false);
  const [layoutDone, setLayoutDone] = useState(false);
  const [activeLayout, setActiveLayout] = useState<LayoutType>('hierarchical');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);
  const onSelectRuleRef = useRef(onSelectRule);
  const onSelectAtomRef = useRef(onSelectAtom);
  onSelectRuleRef.current = onSelectRule;
  onSelectAtomRef.current = onSelectAtom;

  // global raf id used by ensureFit; stored in a ref so multiple callers can
  // cancel the same pending frame when necessary.
  const fitRafRef = useRef<number | null>(null);

  const ensureFit = () => {
    // don't fit while a layout is still running - the positions will still be
    // changing and the bounding box may be garbage.  schedule another pass
    // until the layout completes.
    if (isLayoutRunning) {
      fitRafRef.current = requestAnimationFrame(ensureFit);
      return;
    }

    const cy = cyRef.current;
    const el = containerRef.current;
    if (!cy || !el) return;
    const rect = el.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    if (w > 0 && h > 0 && cy.elements().length > 0) {
      cy.resize();
      // reassert arrow style on resize (sometimes lost during internal redraws)
      cy.edges().style({
        'target-arrow-shape': 'triangle',
        'arrow-scale': 1.2,
        'target-arrow-color': theme === 'dark' ? '#9ca3af' : '#888888',
      });
      cy.fit(undefined, 30);
    } else {
      fitRafRef.current = requestAnimationFrame(ensureFit);
    }
  };

  useEffect(() => {
    // extra effect: whenever parent wants us to refit (e.g. after tab switch)
    if (forceFitTrigger !== undefined) {
      ensureFit();
    }
  }, [forceFitTrigger]);

  useEffect(() => {
    if (!containerRef.current) return undefined;


    const elements = [
      ...arGraph.nodes.map((node) => ({
        data: {
          id: node.id,
          label: node.label,
          type: node.type,
          details: node.details,
          color: node.type === 'atom' ? colorFromName(node.label) : undefined,
          fgColor: node.type === 'atom' ? foregroundForBackground(colorFromName(node.label)) : undefined,
        },
      })),
      ...arGraph.edges.map((edge, index) => ({
        data: {
          id: `edge-${index}`,
          source: edge.from,
          target: edge.to,
          edgeType: edge.edgeType,
        },
      })),
    ];

    cyRef.current?.destroy();

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: [
        {
          // Rule nodes – BioNetGen canonical: #CC99FF ellipse, #999999 outline
          selector: 'node[type = "rule"]',
          style: {
            shape: 'ellipse',
            width: 'label',
            height: 'label',
            padding: '8px 16px',
            label: 'data(label)',
            'text-halign': 'center',
            'text-valign': 'center',
            'font-size': 14,
            'font-style': 'normal',
            'background-color': '#CC99FF',
            'border-color': '#999999',
            'border-width': 1,
            color: '#000000',
          },
        },
        {
          // Atom/pattern nodes – BioNetGen canonical: #FFE9C7 roundrectangle, #999999 outline
          selector: 'node[type = "atom"]',
          style: {
            shape: 'round-rectangle',
            width: 'label',
            height: 'label',
            padding: '6px 10px',
            label: 'data(label)',
            'text-wrap': 'wrap',
            'text-max-width': '120px',
            'text-halign': 'center',
            'text-valign': 'center',
            'font-size': 14,
            'font-style': 'normal',
            'background-color': '#FFE9C7',
            'border-color': '#999999',
            'border-width': 1,
            color: '#000000',
          },
        },
        {
          selector: 'edge',
          style: {
            width: 2,
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'arrow-scale': 1.2,
            'font-size': 9,
            'line-color': theme === 'dark' ? '#9ca3af' : '#888888',
            'target-arrow-color': theme === 'dark' ? '#9ca3af' : '#888888',
          },
        },
        {
          // Reactant edge (consumes) – BioNetGen: #000000 standard arrow
          selector: 'edge[edgeType = "consumes"]',
          style: {
            'line-color': theme === 'dark' ? '#f3f4f6' : '#000000',
            'target-arrow-color': theme === 'dark' ? '#f3f4f6' : '#000000',
            'target-arrow-shape': 'triangle',
            'arrow-scale': 1.2,
          },
        },
        {
          // Product edge (produces) – BioNetGen: #000000 standard arrow
          selector: 'edge[edgeType = "produces"]',
          style: {
            'line-color': theme === 'dark' ? '#f3f4f6' : '#000000',
            'target-arrow-color': theme === 'dark' ? '#f3f4f6' : '#000000',
            'target-arrow-shape': 'triangle',
            'arrow-scale': 1.2,
          },
        },
        {
          // Context edge (modifies) – BioNetGen: #AAAAAA standard arrow
          selector: 'edge[edgeType = "modifies"]',
          style: {
            'line-color': theme === 'dark' ? '#9ca3af' : '#AAAAAA',
            'target-arrow-color': theme === 'dark' ? '#9ca3af' : '#AAAAAA',
            'target-arrow-shape': 'triangle',
            'arrow-scale': 1.2,
          },
        },
        {
          selector: '.highlighted',
          style: {
            // no blue outlines; only tint edges slightly so the selected
            // connection is easier to track without overwhelming the node
            // shapes themselves.
            'line-color': theme === 'dark' ? '#9ca3af' : '#888888',
            'target-arrow-color': theme === 'dark' ? '#9ca3af' : '#888888',
            'target-arrow-shape': 'triangle',
            'arrow-scale': 1.2,
          },
        },
      ],
      layout: { name: 'preset' },
    });

    cy.on('tap', 'node[type = "rule"]', (event) => {
      onSelectRuleRef.current?.(event.target.id());
    });
    cy.on('tap', 'node[type = "atom"]', (event) => {
      onSelectAtomRef.current?.(event.target.id());
    });

    cyRef.current = cy;

    // make sure any leftover stylesheet markers from a previous instance are
    // cleared and the current style takes effect; this is important when the
    // component is unmounted and remounted repeatedly (regulatory ⇄ contact).
    cy.style().update();

    // ensure arrowheads are styled immediately (dagre/preset sometimes delay)
    const applyArrows = () => {
      cy.edges().style({
        'target-arrow-shape': 'triangle',
        'arrow-scale': 1.2,
        'target-arrow-color': theme === 'dark' ? '#9ca3af' : '#888888',
      });
    };
    applyArrows();
    // second pass on next frame in case cytoscape is still adding elements.
    requestAnimationFrame(applyArrows);

    // Run default hierarchical layout
    setIsLayoutRunning(true);
    const layout = cy.layout({ ...LAYOUT_CONFIGS.hierarchical });
    layout.on('layoutstop', () => {
      // ensureFit handles both the “paint hasn’t happened yet” case and the
      // hidden-tab case by polling until the container has a real size.
      if (fitRafRef.current !== null) cancelAnimationFrame(fitRafRef.current);
      fitRafRef.current = requestAnimationFrame(ensureFit);
      setIsLayoutRunning(false);
      setLayoutDone(true); // allow highlights/center animations now that positions exist

      // reapply style and refresh the stylesheet; some plugins temporarily
      // drop arrowheads and/or markers, especially across unmounts.
      cy.edges().style({
        'target-arrow-shape': 'triangle',
        'arrow-scale': 1.2,
        'target-arrow-color': theme === 'dark' ? '#9ca3af' : '#888888',
      });
      cy.style().update();
    });
    layout.run();

    // ResizeObserver – re-fit when container gains its real dimensions
    let lastW = 0;
    let lastH = 0;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w === lastW && h === lastH) return;
      lastW = w;
      lastH = h;
      const c = cyRef.current;
      if (!c || w === 0 || h === 0) return;
      c.resize();
      // use ensureFit so we respect the layout-running guard
      ensureFit();
    });
    ro.observe(containerRef.current);

    return () => {
      if (fitRafRef.current !== null) cancelAnimationFrame(fitRafRef.current);
      ro.disconnect();
      cy.off('tap');
      cyRef.current?.destroy();
      cyRef.current = null;
    };
  }, [arGraph, theme]);

  // update edge colour when theme changes after initialization
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.edges().style({
      'target-arrow-color': theme === 'dark' ? '#9ca3af' : '#888888',
    });
  }, [theme]);

  // When the atom-rule graph object changes we schedule another ensureFit
  // pass.  Certain edge cases (empty graph, layout plugin quirk, first-time
  // parse) can result in the layoutstop handler not being invoked or the
  // polling loop never reaching a positive size; this effect acts as a
  // safety net by kicking the same ensureFit logic on the next animation
  // frame whenever the data changes.
  useEffect(() => {
    if (fitRafRef.current !== null) cancelAnimationFrame(fitRafRef.current);
    fitRafRef.current = requestAnimationFrame(ensureFit);
  }, [arGraph]);

  // Highlight selected nodes without rebuilding the graph.  we delay both
  // the automatic centering animation and the class toggles until after the
  // first layoutstop; that guarantees nodes have real coordinates and avoids
  // the ``floating away`` behaviour when the graph initially appears.
  useEffect(() => {
    if (!layoutDone) {
      return; // nothing to do until we have computed one layout
    }

    const cy = cyRef.current;
    if (!cy) return;

    cy.elements().removeClass('highlighted');

    if (selectedRuleId) {
      const node = cy.getElementById(selectedRuleId);
      if (node?.nonempty()) {
        node.addClass('highlighted');
        node.connectedEdges().addClass('highlighted');
        node.connectedEdges().connectedNodes().addClass('highlighted');
        try { cy.animate({ center: { eles: node }, duration: 350 }); } catch (_) { /* noop */ }
      }
    }

    if (selectedAtomId) {
      const node = cy.getElementById(selectedAtomId);
      if (node?.nonempty()) {
        node.addClass('highlighted');
        node.connectedEdges().addClass('highlighted');
        node.connectedEdges().connectedNodes().addClass('highlighted');
        try { cy.animate({ center: { eles: node }, duration: 350 }); } catch (_) { /* noop */ }
      }
    }
  }, [selectedRuleId, selectedAtomId, layoutDone]);

  const runLayout = (layoutType: LayoutType = activeLayout) => {
    const cy = cyRef.current;
    if (!cy) return;
    setIsLayoutRunning(true);
    setActiveLayout(layoutType);
    try {
      const layout = cy.layout(LAYOUT_CONFIGS[layoutType]);
      layout.run();
      layout.on('layoutstop', () => {
        if (fitRafRef.current !== null) cancelAnimationFrame(fitRafRef.current);
        fitRafRef.current = requestAnimationFrame(ensureFit);
        setIsLayoutRunning(false);
      });
    } catch (err) {
      console.error('Layout failed', err);
      setIsLayoutRunning(false);
    }
  };

  const handleFit = () => cyRef.current?.fit(undefined, 30);

  const handleExportPNG = () => {
    const cy = cyRef.current;
    if (!cy) return;
    try {
      const blob = cy.png({ output: 'blob', scale: 2, full: true }) as Blob;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'regulatory_graph.png';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export PNG failed', err);
    }
  };

  const handleExportSVG = async () => {
    const cy = cyRef.current;
    if (!cy) return;
    try {
      const cySvg = await import('cytoscape-svg');
      const plugin = (cySvg as any).default ?? cySvg;
      if (plugin) cytoscape.use(plugin);
      // @ts-ignore extension injects svg()
      const svgContent: string = cy.svg({ scale: 1, full: true });
      const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'regulatory_graph.svg';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      handleExportPNG();
    }
  };

  // Export yED-compatible GraphML matching BioNetGen GML.pm style
  const handleExportGraphML = () => {
    const cy = cyRef.current;
    let positions: Record<string,{x:number,y:number}> | undefined;
    if (cy) {
      positions = {};
      cy.nodes().forEach(n => {
        const pos = n.position();
        positions![n.id()] = { x: pos.x, y: pos.y };
      });
    }
    const graphml = exportArGraphToGraphML(arGraph, { positions });
    const blob = new Blob([graphml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'regulatory_graph.graphml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full gap-2">
      {/* Toolbar */}
      <div className="flex flex-col gap-1 bg-white dark:bg-slate-900 p-2 rounded-md border border-slate-200 dark:border-slate-700">
        {/* Row 1: Layout buttons */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">Layout:</span>
          <Button variant={activeLayout === 'hierarchical' ? 'primary' : 'subtle'} onClick={() => runLayout('hierarchical')} disabled={isLayoutRunning} className="text-xs h-6 px-1.5" title="Hierarchical (yED-like)">
            {isLayoutRunning && activeLayout === 'hierarchical' ? <LoadingSpinner className="w-3 h-3" /> : '↓ Hier'}
          </Button>
          <Button variant={activeLayout === 'cose' ? 'primary' : 'subtle'} onClick={() => runLayout('cose')} disabled={isLayoutRunning} className="text-xs h-6 px-1.5" title="Force-Directed (Standard)">
            {isLayoutRunning && activeLayout === 'cose' ? <LoadingSpinner className="w-3 h-3" /> : '⚡ Cose'}
          </Button>
          <Button variant={activeLayout === 'fcose' ? 'primary' : 'subtle'} onClick={() => runLayout('fcose')} disabled={isLayoutRunning} className="text-xs h-6 px-1.5" title="Fast Compound Force-Directed">
            {isLayoutRunning && activeLayout === 'fcose' ? <LoadingSpinner className="w-3 h-3" /> : '✨ Smart'}
          </Button>
          <Button variant={activeLayout === 'grid' ? 'primary' : 'subtle'} onClick={() => runLayout('grid')} disabled={isLayoutRunning} className="text-xs h-6 px-1.5" title="Grid Layout">
            {isLayoutRunning && activeLayout === 'grid' ? <LoadingSpinner className="w-3 h-3" /> : '▦ Grid'}
          </Button>
          <Button variant={activeLayout === 'concentric' ? 'primary' : 'subtle'} onClick={() => runLayout('concentric')} disabled={isLayoutRunning} className="text-xs h-6 px-1.5" title="Concentric Rings">
            {isLayoutRunning && activeLayout === 'concentric' ? <LoadingSpinner className="w-3 h-3" /> : '◎ Rings'}
          </Button>
          <Button variant={activeLayout === 'breadthfirst' ? 'primary' : 'subtle'} onClick={() => runLayout('breadthfirst')} disabled={isLayoutRunning} className="text-xs h-6 px-1.5" title="Breadth-first Tree">
            {isLayoutRunning && activeLayout === 'breadthfirst' ? <LoadingSpinner className="w-3 h-3" /> : '⊢ Tree'}
          </Button>
          <Button variant={activeLayout === 'circle' ? 'primary' : 'subtle'} onClick={() => runLayout('circle')} disabled={isLayoutRunning} className="text-xs h-6 px-1.5" title="Circle Layout">
            {isLayoutRunning && activeLayout === 'circle' ? <LoadingSpinner className="w-3 h-3" /> : '○ Circle'}
          </Button>
        </div>
        {/* Row 2: Actions */}
        <div className="flex items-center gap-1">
          <Button variant="subtle" onClick={handleFit} className="text-xs h-6 px-2">Fit</Button>
          <Button variant="subtle" onClick={() => runLayout()} disabled={isLayoutRunning} className="text-xs h-6 px-2">
            {isLayoutRunning ? <LoadingSpinner className="w-3 h-3" /> : 'Redo'}
          </Button>
          <div className="w-px h-4 bg-slate-300 dark:bg-slate-600 mx-1" />
          <span className="text-xs text-slate-500 dark:text-slate-400">Export:</span>
          <Button variant="subtle" onClick={handleExportPNG} className="text-xs h-6 px-2">PNG</Button>
          <Button variant="subtle" onClick={handleExportSVG} className="text-xs h-6 px-2">SVG</Button>
          <Button variant="subtle" onClick={handleExportGraphML} className="text-xs h-6 px-2" title="Export for yED Graph Editor">yED</Button>
        </div>
      </div>

      {/* Graph container */}
      <div
        ref={containerRef}
        className="h-[600px] w-full rounded-lg border border-stone-200 bg-white dark:border-slate-700 dark:bg-slate-900"
      />

      {/* Legend */}
      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-md border border-slate-200 dark:border-slate-700">
        <h4 className="text-xs font-semibold text-slate-500 uppercase">Legend</h4>
        <div className="flex items-center gap-4 text-xs flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 rounded-full bg-[#CC99FF] border border-[#999999]" />
            <span className="text-slate-700 dark:text-slate-300">Rule</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 rounded bg-[#FFE9C7] border border-[#999999]" />
            <span className="text-slate-700 dark:text-slate-300">AtomicPattern</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-1 rounded" style={{ background: '#000000', color: '#fff' }}>→</span>
            <span className="text-slate-700 dark:text-slate-300">produces / consumes</span>
          </div>
        </div>
      </div>
    </div>
  );
};
