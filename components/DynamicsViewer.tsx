/**
 * DynamicsViewer.tsx
 * 
 * Native React+D3 component for visualizing SSA influence networks.
 * Shows rule firings and causal influence between rules over simulation time.
 */

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import * as d3 from 'd3';
import { SSAInfluenceTimeSeries, SSAInfluenceData } from '../types';

interface DynamicsViewerProps {
    influenceData: SSAInfluenceTimeSeries;
}

interface NodeData {
    id: string;
    hits: number;
    index: number;
    x?: number;
    y?: number;
    fx?: number | null;
    fy?: number | null;
}

interface LinkData {
    source: string | NodeData;
    target: string | NodeData;
    value: number;
}

export const DynamicsViewer: React.FC<DynamicsViewerProps> = ({ influenceData }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const nodePositionsRef = useRef<Map<string, { x: number, y: number }>>(new Map());
    const pinnedNodesRef = useRef<Set<string>>(new Set());
    const instanceId = useRef(Math.random().toString(36).slice(2));
    const lastTransform = useRef<d3.ZoomTransform>(d3.zoomIdentity);
    const isFirstLoad = useRef(true);

    const [currentWindow, setCurrentWindow] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [threshold, setThreshold] = useState(0.3);
    const [playbackSpeed, setPlaybackSpeed] = useState(1); // 0.25x to 4x
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const [showPositiveLinks, setShowPositiveLinks] = useState(true);
    const [showNegativeLinks, setShowNegativeLinks] = useState(true);
    const [focusRange, setFocusRange] = useState<[number, number] | null>(null); // [startIdx, endIdx]
    const [useScientificNotation, setUseScientificNotation] = useState(false);
    const [useAccessibleColors, setUseAccessibleColors] = useState(false);
    const [clusterMode, setClusterMode] = useState<'window' | 'global'>('window');
    const [showSelfInfluence, setShowSelfInfluence] = useState(false);
    const [hideIsolatedNodes, setHideIsolatedNodes] = useState(false);

    const data: SSAInfluenceData | null = influenceData.windows.length > 0
        ? influenceData.windows[Math.min(currentWindow, influenceData.windows.length - 1)]
        : influenceData.globalSummary;

    // Compute focused summary if range is set
    const focusedData = React.useMemo(() => {
        if (!focusRange || influenceData.windows.length === 0) return null;

        const [startIdx, endIdx] = focusRange;
        const windows = influenceData.windows.slice(startIdx, endIdx + 1);
        if (windows.length === 0) return null;

        // Aggregate data across focused windows
        const n = windows[0].ruleNames.length;
        const aggregatedHits = new Array(n).fill(0);
        const aggregatedFluxs = Array.from({ length: n }, () => new Array(n).fill(0));

        windows.forEach(w => {
            w.din_hits.forEach((hits, i) => aggregatedHits[i] += hits);
            w.din_fluxs.forEach((row, i) => {
                row.forEach((flux, j) => aggregatedFluxs[i][j] += flux);
            });
        });

        return {
            ruleNames: windows[0].ruleNames,
            din_hits: aggregatedHits,
            din_fluxs: aggregatedFluxs,
            din_start: windows[0].din_start,
            din_end: windows[windows.length - 1].din_end
        };
    }, [focusRange, influenceData.windows]);

    const displayData = useMemo(() => {
        return clusterMode === 'global'
            ? influenceData.globalSummary
            : (focusedData || data);
    }, [clusterMode, influenceData.globalSummary, focusedData, data]);

    // Check if any links exist for the current settings
    const hasActiveLinks = useMemo(() => {
        if (!displayData) return false;
        const n = displayData.ruleNames.length;
        const allFluxValues = displayData.din_fluxs.flat().map(Math.abs).filter(v => v > 0);
        const maxFluxValue = Math.max(1e-10, ...allFluxValues);

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const flux = displayData.din_fluxs[i]?.[j] ?? 0;
                const normalized = Math.abs(flux) / (maxFluxValue || 1);
                if (normalized >= threshold && (i !== j || showSelfInfluence)) {
                    if ((flux > 0 && showPositiveLinks) || (flux < 0 && showNegativeLinks)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }, [displayData, threshold, showSelfInfluence, showPositiveLinks, showNegativeLinks]);

    const colors = useMemo(() => useAccessibleColors ? {
        positive: '#0077bb',
        negative: '#ee7733',
        cluster: d3.schemeTableau10,
        pin: '#ffaa00'
    } : {
        positive: '#4ade80',
        negative: '#f87171',
        cluster: d3.schemeCategory10,
        pin: '#fbbf24'
    }, [useAccessibleColors]);

    // Reset focus and window when data changes
    useEffect(() => {
        setFocusRange(null);
        setCurrentWindow(0);
        nodePositionsRef.current.clear();
        pinnedNodesRef.current.clear();
        lastTransform.current = d3.zoomIdentity;
        isFirstLoad.current = true;
    }, [influenceData]);

    // Number formatting helper
    const formatNumber = useCallback((num: number) => {
        if (useScientificNotation && Math.abs(num) >= 1000) {
            return num.toExponential(2);
        }
        return num.toFixed(0);
    }, [useScientificNotation]);

    const formatNumberRef = useRef(formatNumber);
    useEffect(() => {
        formatNumberRef.current = formatNumber;
    }, [formatNumber]);

    // Smart time formatting - remove .00 for whole numbers
    const formatTime = useCallback((time: number) => {
        // If it's a whole number or very close to one, show without decimals
        if (Math.abs(time - Math.round(time)) < 0.01) {
            return `${Math.round(time)}s`;
        }
        // Otherwise show 1 decimal place
        return `${time.toFixed(1)}s`;
    }, []);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === ' ') {
                e.preventDefault();
                setIsPlaying(prev => !prev);
            } else if (e.key === 'ArrowRight' && influenceData.windows.length > 0) {
                setCurrentWindow(prev => Math.min(prev + 1, influenceData.windows.length - 1));
            } else if (e.key === 'ArrowLeft') {
                setCurrentWindow(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'Escape') {
                setSelectedNode(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [influenceData.windows.length]);

    // Animation playback with speed control
    useEffect(() => {
        if (!isPlaying || influenceData.windows.length === 0) return;
        const baseInterval = 500;
        const interval = setInterval(() => {
            setCurrentWindow(prev => {
                const next = prev + 1;
                if (next >= influenceData.windows.length) {
                    setIsPlaying(false);
                    return prev;
                }
                return next;
            });
        }, baseInterval / playbackSpeed);
        return () => clearInterval(interval);
    }, [isPlaying, influenceData.windows.length, playbackSpeed]);

    // Compute influence statistics for tooltips
    const computeInfluences = useCallback((nodeIndex: number, din_fluxs: number[][]) => {
        const n = din_fluxs.length;
        let outgoing = 0, incoming = 0;
        for (let j = 0; j < n; j++) {
            if (din_fluxs[nodeIndex]?.[j]) outgoing += Math.abs(din_fluxs[nodeIndex][j]);
            if (din_fluxs[j]?.[nodeIndex]) incoming += Math.abs(din_fluxs[j][nodeIndex]);
        }
        return { outgoing, incoming };
    }, []);

    // Compute clusters based on threshold-filtered links
    const computeClusters = useCallback((nodes: NodeData[], links: LinkData[]): string[][] => {
        // Initialize: each node in its own cluster
        const clusterMap = new Map<string, number>();
        nodes.forEach((n, i) => clusterMap.set(n.id, i));

        const clusterGroups: Map<number, Set<string>> = new Map();
        nodes.forEach((n, i) => clusterGroups.set(i, new Set([n.id])));

        // Merge clusters when links exist (links are already filtered by threshold)
        links.forEach(link => {
            const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
            const targetId = typeof link.target === 'string' ? link.target : link.target.id;

            const c1 = clusterMap.get(sourceId);
            const c2 = clusterMap.get(targetId);

            if (c1 !== c2 && c1 !== undefined && c2 !== undefined) {
                // Merge smaller cluster into larger
                const g1 = clusterGroups.get(c1);
                const g2 = clusterGroups.get(c2);
                if (!g1 || !g2) return;

                const [smaller, larger] = g1.size < g2.size ? [c1, c2] : [c2, c1];
                const smallerGroup = clusterGroups.get(smaller)!;
                const largerGroup = clusterGroups.get(larger)!;

                smallerGroup.forEach(nodeId => {
                    clusterMap.set(nodeId, larger);
                    largerGroup.add(nodeId);
                });
                clusterGroups.delete(smaller);
            }
        });

        // Convert to array format, filter out single-node clusters
        return Array.from(clusterGroups.values())
            .filter(group => group.size > 1)
            .map(group => Array.from(group));
    }, []);

    // D3 visualization
    useEffect(() => {
        if (!svgRef.current || !displayData || displayData.ruleNames.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const container = svgRef.current.parentElement;
        const width = container?.clientWidth || 800;
        const height = container?.clientHeight || 500;

        // Add zoom/pan support
        const g = svg.append('g');

        // Build links from flux matrix (filter by threshold)
        const links: LinkData[] = [];
        const n = displayData.ruleNames.length;
        const allFluxValues = displayData.din_fluxs.flat().map(Math.abs).filter(v => v > 0);
        const maxFlux = Math.max(1e-10, ...allFluxValues);
        const connectedNodes = new Set<string>();

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const flux = displayData.din_fluxs[i]?.[j] ?? 0;
                const normalized = maxFlux > 0 ? Math.abs(flux) / maxFlux : 0;
                // Filter by threshold and visibility settings (include self-loops if enabled)
                if (normalized >= threshold && (i !== j || showSelfInfluence)) {
                    if ((flux > 0 && showPositiveLinks) || (flux < 0 && showNegativeLinks)) {
                        const source = displayData.ruleNames[i];
                        const target = displayData.ruleNames[j];
                        links.push({
                            source,
                            target,
                            value: flux
                        });
                        connectedNodes.add(source);
                        connectedNodes.add(target);
                    }
                }
            }
        }

        // Build nodes from rules - restore saved positions and filter isolated if requested
        const maxHits = Math.max(1, ...displayData.din_hits);
        const nodes: NodeData[] = displayData.ruleNames
            .map((name, i) => {
                const saved = nodePositionsRef.current.get(name);
                return {
                    id: name,
                    hits: displayData.din_hits[i],
                    index: i,
                    x: saved?.x,
                    y: saved?.y,
                    fx: pinnedNodesRef.current.has(name) ? saved?.x : null,
                    fy: pinnedNodesRef.current.has(name) ? saved?.y : null,
                };
            })
            .filter(node => !hideIsolatedNodes || connectedNodes.has(node.id));

        // D3 force simulation
        const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
            .force('link', d3.forceLink(links).id((d: any) => d.id).distance(
                Math.max(100, Math.min(300, 2000 / Math.sqrt(nodes.length || 1)))
            ))
            .force('charge', d3.forceManyBody().strength(-500))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide<NodeData>().radius(d => {
                // Dynamic collision radius (+ padding)
                return 25 + (d.hits / maxHits) * 15 + 15;
            }));

        // Setup Zoom
        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.05, 20])
            .on('zoom', (event) => {
                lastTransform.current = event.transform;
                g.attr('transform', event.transform);
            });

        svg.call(zoom);

        // Re-apply last transform or auto-fit on first load
        if (isFirstLoad.current && nodes.length > 0) {
            // Compute better initial zoom for large models
            const initialScale = Math.max(0.15, Math.min(1, 800 / (Math.sqrt(nodes.length) * 150)));
            const initialTransform = d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(initialScale)
                .translate(-width / 2, -height / 2);

            svg.call(zoom.transform, initialTransform);
            isFirstLoad.current = false;
        } else {
            svg.call(zoom.transform, lastTransform.current);
        }

        // Double-click to reset zoom
        svg.on('dblclick.zoom', () => {
            isFirstLoad.current = true; // Trigger auto-fit again
            const initialScale = Math.max(0.2, Math.min(1, 800 / (Math.sqrt(nodes.length || 1) * 150)));
            const resetTransform = d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(initialScale)
                .translate(-width / 2, -height / 2);
            svg.transition().duration(750).call(zoom.transform, resetTransform);
        });

        // Create arrow markers (on svg, not g, so they don't zoom)
        const defs = svg.append('defs');
        ['positive', 'negative'].forEach(type => {
            defs.append('marker')
                .attr('id', `arrow-${type}-${instanceId.current}`)
                .attr('viewBox', '0 -5 10 10')
                .attr('refX', 0)
                .attr('refY', 0)
                .attr('markerWidth', 7) // Increased from 5
                .attr('markerHeight', 7)
                .attr('orient', 'auto')
                .append('path')
                .attr('d', 'M0,-5L10,0L0,5')
                .attr('fill', type === 'positive' ? colors.positive : colors.negative);
        });

        // Compute clusters for hull visualization
        const clusters = computeClusters(nodes, links);

        // Draw cluster hulls (behind everything)
        const hull = g.insert('g', '.links')
            .attr('class', 'cluster-hulls')
            .selectAll('path')
            .data(clusters)
            .join('path')
            .attr('fill', (_, i) => colors.cluster[i % 10])
            .attr('fill-opacity', 0.12)
            .attr('stroke', (_, i) => colors.cluster[i % 10])
            .attr('stroke-width', 2.5)
            .attr('stroke-opacity', 0.35)
            .attr('stroke-linejoin', 'round');

        // Draw links with curved paths for bidirectional edges
        // Check for bidirectional links efficiently O(N)
        const bidirectionalPairs = new Set<string>();
        const linkSet = new Set<string>();

        // First pass: build existence set
        links.forEach(link => {
            const s = typeof link.source === 'string' ? link.source : link.source.id;
            const t = typeof link.target === 'string' ? link.target : link.target.id;
            linkSet.add(`${s}|${t}`);
        });

        // Second pass: check for reverse
        links.forEach(link => {
            const s = typeof link.source === 'string' ? link.source : link.source.id;
            const t = typeof link.target === 'string' ? link.target : link.target.id;

            if (linkSet.has(`${t}|${s}`)) {
                const pair = s < t ? `${s}|${t}` : `${t}|${s}`;
                bidirectionalPairs.add(pair);
            }
        });

        const link = g.append('g')
            .attr('class', 'links')
            .selectAll('path')
            .data(links)
            .join('path')
            .attr('fill', 'none')
            .attr('stroke', d => {
                const strength = Math.abs(d.value) / (maxFlux || 1);
                if (useAccessibleColors) {
                    // Accessible: blue for positive, orange for negative
                    return d.value > 0
                        ? d3.interpolate('#0077bb', '#00aaff')(strength)
                        : d3.interpolate('#ee7733', '#ff9955')(strength);
                } else {
                    // Default: green for positive, red for negative
                    return d.value > 0
                        ? d3.interpolateGreens(0.3 + strength * 0.7)
                        : d3.interpolateReds(0.3 + strength * 0.7);
                }
            })
            .attr('stroke-width', d => Math.max(1.5, Math.abs(d.value) / (maxFlux || 1) * 5))
            .attr('stroke-opacity', 0.8)
            .attr('marker-end', d => {
                const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
                const targetId = typeof d.target === 'string' ? d.target : d.target.id;
                if (sourceId === targetId) return null; // No arrow for self-loops
                return `url(#arrow-${d.value > 0 ? 'positive' : 'negative'}-${instanceId.current})`;
            })
            .style('cursor', 'pointer')
            .on('mouseover', (event, d: any) => {
                d3.select(event.currentTarget).attr('stroke-opacity', 1).attr('stroke-width', Math.max(2.5, Math.abs(d.value) / maxFlux * 6));
                const tooltip = tooltipRef.current;
                if (tooltip) {
                    const sourceName = typeof d.source === 'string' ? d.source : d.source.id;
                    const targetName = typeof d.target === 'string' ? d.target : d.target.id;
                    const sourceNode = nodes.find(n => n.id === sourceName);
                    const avg = sourceNode && sourceNode.hits > 0 ? d.value / sourceNode.hits : null;

                    // Set position immediately on hover
                    const x = Math.min(event.clientX + 12, window.innerWidth - 220);
                    const y = Math.min(event.clientY - 12, window.innerHeight - 120);
                    tooltip.style.left = `${x}px`;
                    tooltip.style.top = `${y}px`;
                    tooltip.style.opacity = '1';

                    tooltip.innerHTML = `
                        <div class="font-bold text-xs mb-1">${sourceName} → ${targetName}</div>
                        <div class="text-[10px] text-slate-300">
                          Net Flux: <span class="${d.value > 0 ? 'text-green-400' : 'text-red-400'} font-mono">${d.value > 0 ? '+' : ''}${formatNumberRef.current(d.value)}</span><br/>
                          ${avg !== null ? `Avg/Firing: <span class="font-mono text-white">${avg.toExponential(2)}</span><br/>` : ''}
                          Type: <span class="${d.value > 0 ? 'text-green-400' : 'text-red-400'}">${d.value > 0 ? 'Activating' : 'Inhibiting'}</span>
                        </div>
                    `;
                }
            })
            .on('mousemove', (event) => {
                const tooltip = tooltipRef.current;
                if (tooltip) {
                    const x = Math.min(event.clientX + 12, window.innerWidth - 220);
                    const y = Math.min(event.clientY - 12, window.innerHeight - 120);
                    tooltip.style.left = `${x}px`;
                    tooltip.style.top = `${y}px`;
                }
            })
            .on('mouseout', (event, d: any) => {
                d3.select(event.currentTarget).attr('stroke-opacity', 0.6).attr('stroke-width', Math.max(1, Math.abs(d.value) / maxFlux * 4));
                if (tooltipRef.current) tooltipRef.current.style.opacity = '0';
            });

        // Draw nodes
        const node = g.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(nodes)
            .join('circle')
            .attr('r', d => 25 + (d.hits / maxHits) * 15)
            .attr('fill', '#6366f1')
            .attr('stroke', d => pinnedNodesRef.current.has(d.id) ? colors.pin : '#4f46e5')
            .attr('stroke-width', d => pinnedNodesRef.current.has(d.id) ? 3 : 2)
            .style('cursor', 'pointer')
            .on('click', (event, d) => {
                event.stopPropagation();
                // Toggle pin on click
                const isPinned = pinnedNodesRef.current.has(d.id);
                if (isPinned) {
                    pinnedNodesRef.current.delete(d.id);
                    d.fx = null;
                    d.fy = null;
                    d3.select(event.currentTarget)
                        .attr('stroke', '#4f46e5')
                        .attr('stroke-width', 2);
                } else {
                    pinnedNodesRef.current.add(d.id);
                    d.fx = d.x;
                    d.fy = d.y;
                    d3.select(event.currentTarget)
                        .attr('stroke', colors.pin)
                        .attr('stroke-width', 3);
                }
            })
            .on('contextmenu', (event, d) => {
                event.preventDefault();
                setSelectedNode(d.id);
            })
            .call(d3.drag<SVGCircleElement, NodeData>()
                .on('start', (event, d) => {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                })
                .on('drag', (event, d) => {
                    d.fx = event.x;
                    d.fy = event.y;
                    // Auto-pin when dragged + Visual feedback
                    if (!pinnedNodesRef.current.has(d.id)) {
                        pinnedNodesRef.current.add(d.id);
                        d3.select(event.currentTarget)
                            .attr('stroke', colors.pin)
                            .attr('stroke-width', 3);
                    }
                })
                .on('end', (event, d) => {
                    if (!event.active) simulation.alphaTarget(0);
                    // Only release if not pinned
                    if (!pinnedNodesRef.current.has(d.id)) {
                        d.fx = null;
                        d.fy = null;
                    }
                }) as any);

        // Add tooltips
        const tooltip = tooltipRef.current;
        if (tooltip) {
            node
                .on('mouseover', (event, d) => {
                    const { outgoing, incoming } = computeInfluences(d.index, displayData.din_fluxs);
                    tooltip.innerHTML = `
            <strong>${d.id}</strong><br/>
            <span style="color: #94a3b8">Firings:</span> ${formatNumberRef.current(d.hits)}<br/>
            <span style="color: #4ade80">Influences:</span> ${formatNumberRef.current(outgoing)}<br/>
            <span style="color: #f87171">Influenced by:</span> ${formatNumberRef.current(incoming)}
          `;
                    tooltip.style.opacity = '1';
                    // Clamp tooltip position to prevent off-screen rendering
                    const x = Math.min(event.clientX + 12, window.innerWidth - 220);
                    const y = Math.min(event.clientY - 12, window.innerHeight - 120);
                    tooltip.style.left = `${x}px`;
                    tooltip.style.top = `${y}px`;
                })
                .on('mousemove', (event) => {
                    const x = Math.min(event.clientX + 12, window.innerWidth - 220);
                    const y = Math.min(event.clientY - 12, window.innerHeight - 120);
                    tooltip.style.left = `${x}px`;
                    tooltip.style.top = `${y}px`;
                })
                .on('mouseout', () => {
                    tooltip.style.opacity = '0';
                });
        }

        // Labels - compact in graph, full name in tooltip
        const label = g.append('g')
            .attr('class', 'labels')
            .selectAll('text')
            .data(nodes)
            .join('text')
            .text(d => {
                // Smarter truncation: handle rules starting with ->
                let labelText = d.id;
                if (labelText.startsWith('->')) {
                    labelText = labelText.substring(2).trim();
                }
                // Keep spaces if beneficial, but truncate length
                return labelText.length > 15 ? labelText.substring(0, 13) + '…' : labelText;
            })
            .attr('font-size', '11px')
            .attr('fill', '#ffffff')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .style('pointer-events', 'none')
            .style('font-weight', '600');

        const nodeMap = new Map(nodes.map(n => [n.id, n]));

        simulation.on('tick', () => {
            // Update cluster hulls with padding
            hull.attr('d', clusterNodeIds => {
                const clusterNodes = clusterNodeIds
                    .map(id => nodes.find(n => n.id === id))
                    .filter(n => n && n.x !== undefined && n.y !== undefined) as NodeData[];

                if (clusterNodes.length < 3) return '';

                const points = clusterNodes.map(n => [n.x!, n.y!] as [number, number]);
                const hullPoints = d3.polygonHull(points);
                if (!hullPoints) return '';

                // Expand hull outward for better visual separation
                const cx = d3.mean(hullPoints, p => p[0])!;
                const cy = d3.mean(hullPoints, p => p[1])!;
                const expanded = hullPoints.map(([x, y]) => {
                    const dx = x - cx;
                    const dy = y - cy;
                    const len = Math.sqrt(dx * dx + dy * dy) || 1;
                    return [x + (dx / len) * 20, y + (dy / len) * 20];
                });

                return `M${expanded.join('L')}Z`;
            });

            // Save node positions for persistence across re-renders
            nodes.forEach(n => {
                if (n.x !== undefined && n.y !== undefined) {
                    nodePositionsRef.current.set(n.id, { x: n.x, y: n.y });
                }
            });

            // Update links with curved paths and shortened endpoints for markers
            link.attr('d', (d: any) => {
                const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
                const targetId = typeof d.target === 'string' ? d.target : d.target.id;

                const targetNode = nodeMap.get(targetId);
                const targetRadius = targetNode ? 25 + (targetNode.hits / maxHits) * 15 : 25;

                if (sourceId === targetId) {
                    // Self-influence: Render as a curved loop above the node
                    const x = d.source.x;
                    const y = d.source.y;
                    const nodeR = 25 + (d.source.hits / maxHits) * 15;
                    const loopR = 20;
                    return `M ${x} ${y - nodeR} 
                            C ${x - loopR * 2} ${y - nodeR - loopR * 2.5}, 
                              ${x + loopR * 2} ${y - nodeR - loopR * 2.5}, 
                              ${x} ${y - nodeR}`;
                }

                const pair = [sourceId, targetId].sort().join('|');
                const isBidirectional = bidirectionalPairs.has(pair);

                // Calculate shortened endpoints to stop at target's edge
                const dx = d.target.x - d.source.x;
                const dy = d.target.y - d.source.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 0.1) return ''; // Skip degenerate cases (overlapping nodes)

                const offX = (dx / dist) * (targetRadius + 6); // Add small gap for marker
                const offY = (dy / dist) * (targetRadius + 6);

                const sx = d.source.x;
                const sy = d.source.y;
                const tx = d.target.x - offX;
                const ty = d.target.y - offY;

                if (isBidirectional) {
                    const dr = dist * 1.5;
                    return `M${sx},${sy}A${dr},${dr} 0 0,1 ${tx},${ty}`;
                } else {
                    return `M${sx},${sy}L${tx},${ty}`;
                }
            });

            node
                .attr('cx', (d: any) => d.x)
                .attr('cy', (d: any) => d.y);

            label
                .attr('x', (d: any) => d.x)
                .attr('y', (d: any) => d.y);
        });

        return () => simulation.stop();
    }, [displayData, threshold, showPositiveLinks, showNegativeLinks, colors, useAccessibleColors, showSelfInfluence, hideIsolatedNodes]);

    // Empty state
    if (!data || data.ruleNames.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-slate-900">
                <div className="text-6xl mb-4 opacity-50">🕸️</div>
                <h3 className="text-lg font-semibold mb-2 text-white">Rule Dynamics Visualization</h3>
                <p className="text-slate-400 mb-2">
                    See how rules causally influence each other over time.
                </p>
                <ul className="text-slate-500 text-sm mb-4 text-left">
                    <li>• Node size = how often rule fired</li>
                    <li>• <span className="text-green-400">Green</span> edges = positive influence</li>
                    <li>• <span className="text-red-400">Red</span> edges = negative influence</li>
                    <li>• Animation shows temporal evolution</li>
                </ul>
                <p className="text-xs text-slate-600">Run an SSA simulation to generate influence data.</p>
            </div>
        );
    }

    return (
        <div className="flex h-full bg-slate-900">
            {/* Main visualization */}
            <div className={`flex flex-col ${selectedNode ? 'flex-1' : 'w-full'} transition-all`}>
                {/* Tooltip */}
                <div
                    ref={tooltipRef}
                    className="fixed z-50 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm text-white shadow-lg pointer-events-none transition-opacity"
                    style={{ opacity: 0 }}
                />

                {/* Controls */}
                <div className="flex flex-wrap items-center gap-3 p-3 border-b border-slate-700 bg-slate-800 flex-shrink-0">
                    {influenceData.windows.length > 1 && (
                        <>
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded text-sm text-white transition-colors shrink-0"
                                title="Space to toggle"
                            >
                                {isPlaying ? '⏸ Pause' : '▶ Play'}
                            </button>
                            <input
                                type="range"
                                min={0}
                                max={influenceData.windows.length - 1}
                                value={currentWindow}
                                onChange={e => setCurrentWindow(Number(e.target.value))}
                                className="flex-1 min-w-[100px] max-w-xs"
                            />
                            <span className="text-xs text-slate-400 whitespace-nowrap min-w-fit">
                                Window {currentWindow + 1}/{influenceData.windows.length} · t = {formatTime(displayData.din_start)} – {formatTime(displayData.din_end)}
                            </span>
                        </>
                    )}
                    {influenceData.windows.length <= 1 && (
                        <span className="text-xs text-slate-400">
                            Global summary · t = {formatTime(displayData.din_start)} – {formatTime(displayData.din_end)}
                        </span>
                    )}
                    <div className="flex items-center gap-2 border-l border-slate-700 pl-3">
                        <label className="text-xs text-slate-400">
                            Min Strength:
                        </label>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.05}
                            value={threshold}
                            onChange={e => setThreshold(Number(e.target.value))}
                            className="w-16"
                        />
                        <span className="text-xs text-slate-500 w-8">{(threshold * 100).toFixed(0)}%</span>
                    </div>
                    {influenceData.windows.length > 1 && (
                        <div className="flex items-center gap-2 border-l border-slate-700 pl-3">
                            <label className="text-xs text-slate-400">
                                Speed:
                            </label>
                            <input
                                type="range"
                                min={-2}
                                max={2}
                                step={1}
                                value={Math.log2(playbackSpeed)}
                                onChange={e => setPlaybackSpeed(Math.pow(2, Number(e.target.value)))}
                                className="w-16"
                                title="Playback speed"
                            />
                            <span className="text-xs text-slate-500 w-10 text-right">{playbackSpeed}x</span>
                        </div>
                    )}
                </div>

                {/* Focus slider with brushing */}
                {influenceData.windows.length > 1 && (
                    <div className="px-4 py-2 border-b border-slate-700 bg-slate-800/50">
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs text-slate-400 w-16">Focus:</span>
                            {focusRange ? (
                                <>
                                    <span className="text-xs text-indigo-400 font-mono">
                                        {formatTime(influenceData.windows[focusRange[0]].din_start)} – {formatTime(influenceData.windows[focusRange[1]].din_end)}
                                    </span>
                                    <button
                                        onClick={() => setFocusRange(null)}
                                        className="text-xs text-slate-500 hover:text-white transition-colors"
                                    >
                                        ✕ Clear
                                    </button>
                                </>
                            ) : (
                                <span className="text-xs text-slate-500">Drag to select range</span>
                            )}
                        </div>
                        <div className="relative h-8 bg-slate-900 rounded">
                            {/* Background bar showing all windows */}
                            <div className="absolute inset-0 flex">
                                {influenceData.windows.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex-1 border-r border-slate-700 transition-colors ${focusRange && idx >= focusRange[0] && idx <= focusRange[1]
                                            ? 'bg-indigo-600/40'
                                            : idx === currentWindow
                                                ? 'bg-yellow-500/20'
                                                : 'bg-slate-800/20'
                                            }`}
                                        style={{ cursor: 'pointer' }}
                                        onMouseDown={(e) => {
                                            // Start brush selection
                                            const startIdx = idx;
                                            let endIdx = idx;

                                            const handleMouseMove = (moveEvent: MouseEvent) => {
                                                const rect = e.currentTarget.parentElement!.getBoundingClientRect();
                                                const x = moveEvent.clientX - rect.left;
                                                const windowWidth = rect.width / influenceData.windows.length;
                                                endIdx = Math.max(0, Math.min(
                                                    influenceData.windows.length - 1,
                                                    Math.floor(x / windowWidth)
                                                ));
                                                setFocusRange([
                                                    Math.min(startIdx, endIdx),
                                                    Math.max(startIdx, endIdx)
                                                ]);
                                            };

                                            const handleMouseUp = () => {
                                                document.removeEventListener('mousemove', handleMouseMove);
                                                document.removeEventListener('mouseup', handleMouseUp);
                                            };

                                            document.addEventListener('mousemove', handleMouseMove);
                                            document.addEventListener('mouseup', handleMouseUp);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Visualization */}
                <div className="flex-1 relative overflow-hidden">
                    <svg ref={svgRef} className="w-full h-full" />
                    {!hasActiveLinks && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-slate-900/80 px-4 py-2 rounded-full border border-slate-700 text-slate-400 text-sm">
                                No strong connections found (Try lowering Min Strength)
                            </div>
                        </div>
                    )}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-6 p-2 border-t border-slate-700 text-xs text-slate-400 flex-shrink-0">
                    <button
                        onClick={() => setShowPositiveLinks(!showPositiveLinks)}
                        className={`flex items-center gap-1 transition-opacity ${!showPositiveLinks ? 'opacity-40' : ''}`}
                        title="Toggle positive influences"
                    >
                        <span className="inline-block w-3 h-3 bg-green-400 rounded-full"></span>
                        Positive ({showPositiveLinks ? 'on' : 'off'})
                    </button>
                    <button
                        onClick={() => setShowNegativeLinks(!showNegativeLinks)}
                        className={`flex items-center gap-1 transition-opacity ${!showNegativeLinks ? 'opacity-40' : ''}`}
                        title="Toggle negative influences"
                    >
                        <span className="inline-block w-3 h-3 bg-red-400 rounded-full"></span>
                        Negative ({showNegativeLinks ? 'on' : 'off'})
                    </button>
                    <span>Node size = firing count</span>
                    <button
                        onClick={() => setUseScientificNotation(!useScientificNotation)}
                        className="text-slate-400 hover:text-white transition-colors"
                        title="Toggle scientific notation for large numbers"
                    >
                        {useScientificNotation ? 'e-notation' : '1,234'}
                    </button>
                    <button
                        onClick={() => setUseAccessibleColors(!useAccessibleColors)}
                        className="text-slate-400 hover:text-white transition-colors"
                        title="Toggle colorblind-safe theme"
                    >
                        {useAccessibleColors ? '🎨 A11y' : '🎨 Default'}
                    </button>
                    <button
                        onClick={() => setClusterMode(mode => mode === 'window' ? 'global' : 'window')}
                        className="text-slate-400 hover:text-white transition-colors"
                        title="Toggle between per-window and global clustering"
                    >
                        {clusterMode === 'global' ? '🌍 Global' : '⏱️ Window'}
                    </button>
                    <button
                        onClick={() => setShowSelfInfluence(!showSelfInfluence)}
                        className={`text-slate-400 hover:text-white transition-colors ${showSelfInfluence ? 'text-indigo-400' : ''}`}
                        title="Toggle display of self-influences"
                    >
                        {showSelfInfluence ? '⭕ Self-loop ON' : '⭕ Self-loop OFF'}
                    </button>
                    <button
                        onClick={() => setHideIsolatedNodes(!hideIsolatedNodes)}
                        className={`text-slate-400 hover:text-white transition-colors ${hideIsolatedNodes ? 'text-cyan-400' : ''}`}
                        title="Hide nodes with no causal connections above threshold"
                    >
                        {hideIsolatedNodes ? '👻 Filtered' : '👻 All Nodes'}
                    </button>
                    <span className="text-yellow-400">Click to pin · Right-click for details</span>
                    <span className="ml-auto text-slate-500">Scroll to zoom · Drag to pan · ← → Arrow keys | Space</span>
                </div>
            </div>

            {/* Side panel for detailed node view */}
            {selectedNode && displayData && (
                <div className="w-80 border-l border-slate-700 bg-slate-850 flex flex-col">
                    <div className="p-4 border-b border-slate-700 flex items-start justify-between">
                        <div>
                            <h3 className="text-sm font-semibold text-white mb-1">Rule Details</h3>
                            <p className="text-xs text-slate-400 break-all">{selectedNode}</p>
                        </div>
                        <button
                            onClick={() => setSelectedNode(null)}
                            className="text-slate-400 hover:text-white transition-colors"
                            title="Close"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="flex-1 overflow-auto p-4 space-y-4">
                        {/* Statistics */}
                        <div>
                            <h4 className="text-xs font-semibold text-slate-300 mb-2">Statistics</h4>
                            {influenceData.windows.length > 0 ? (
                                <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Displayed firings:</span>
                                        <span className="text-white font-mono">
                                            {formatNumber(displayData.din_hits[displayData.ruleNames.indexOf(selectedNode)] || 0)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Total sim firings:</span>
                                        <span className="text-white font-mono">
                                            {formatNumber(influenceData.globalSummary.din_hits[
                                                influenceData.globalSummary.ruleNames.indexOf(selectedNode)
                                            ] || 0)}
                                        </span>
                                    </div>
                                    {(() => {
                                        const nodeIdx = displayData.ruleNames.indexOf(selectedNode);
                                        const { outgoing, incoming } = computeInfluences(nodeIdx, displayData.din_fluxs);
                                        return (
                                            <>
                                                <div className="flex justify-between">
                                                    <span className="text-green-400">Outgoing influence:</span>
                                                    <span className="text-white font-mono">{formatNumber(outgoing)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-red-400">Incoming influence:</span>
                                                    <span className="text-white font-mono">{formatNumber(incoming)}</span>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500">No time-series data available</p>
                            )}
                        </div>

                        {/* Activity over time - Full line graph */}
                        {influenceData.windows.length > 1 && (
                            <div>
                                <h4 className="text-xs font-semibold text-slate-300 mb-2">Activity Over Time</h4>
                                <div className="h-48 bg-slate-800 rounded p-3">
                                    <svg width="100%" height="100%" viewBox="0 0 280 170" className="overflow-visible">
                                        {(() => {
                                            const values = influenceData.windows.map(w => {
                                                const idx = w.ruleNames.indexOf(selectedNode);
                                                return idx >= 0 ? w.din_hits[idx] : 0;
                                            });
                                            const outgoingValues = influenceData.windows.map(w => {
                                                const idx = w.ruleNames.indexOf(selectedNode);
                                                if (idx < 0) return 0;
                                                return computeInfluences(idx, w.din_fluxs).outgoing;
                                            });

                                            const maxVal = Math.max(1, ...values);
                                            const maxOut = Math.max(1, ...outgoingValues);
                                            const padding = { left: 35, right: 10, top: 10, bottom: 25 };
                                            const width = 280 - padding.left - padding.right;
                                            const height = 170 - padding.top - padding.bottom;

                                            // Grid lines
                                            const gridLines = [0, 0.25, 0.5, 0.75, 1].map(fraction => {
                                                const y = padding.top + height * (1 - fraction);
                                                return (
                                                    <g key={fraction}>
                                                        <line
                                                            x1={padding.left}
                                                            y1={y}
                                                            x2={padding.left + width}
                                                            y2={y}
                                                            stroke="#374151"
                                                            strokeWidth="1"
                                                            strokeDasharray="2,2"
                                                        />
                                                        <text
                                                            x={padding.left - 5}
                                                            y={y + 3}
                                                            textAnchor="end"
                                                            fontSize="9"
                                                            fill="#94a3b8"
                                                        >
                                                            {Math.round(maxVal * fraction)}
                                                        </text>
                                                    </g>
                                                );
                                            });

                                            // X-axis labels
                                            const xLabels = [0, Math.floor(values.length / 2), values.length - 1].map(i => {
                                                const xOffset = values.length > 1 ? (i / (values.length - 1)) * width : width / 2;
                                                return (
                                                    <text
                                                        key={i}
                                                        x={padding.left + xOffset}
                                                        y={padding.top + height + 15}
                                                        textAnchor="middle"
                                                        fontSize="9"
                                                        fill="#94a3b8"
                                                    >
                                                        {i + 1}
                                                    </text>
                                                );
                                            });

                                            // Firing count line
                                            const firingPoints = values.map((v, i) => {
                                                const xOffset = values.length > 1 ? (i / (values.length - 1)) * width : width / 2;
                                                const x = padding.left + xOffset;
                                                const y = padding.top + height - (v / maxVal) * height;
                                                return [x, y];
                                            });
                                            const firingPath = `M${firingPoints.map(p => p.join(',')).join('L')}`;

                                            // Outgoing influence line
                                            const outgoingPoints = outgoingValues.map((v, i) => {
                                                const xOffset = values.length > 1 ? (i / (values.length - 1)) * width : width / 2;
                                                const x = padding.left + xOffset;
                                                const y = padding.top + height - (v / maxOut) * height;
                                                return [x, y];
                                            });
                                            const outgoingPath = `M${outgoingPoints.map(p => p.join(',')).join('L')}`;

                                            return (
                                                <>
                                                    {/* Grid */}
                                                    {gridLines}

                                                    {/* Axes */}
                                                    <line
                                                        x1={padding.left}
                                                        y1={padding.top}
                                                        x2={padding.left}
                                                        y2={padding.top + height}
                                                        stroke="#94a3b8"
                                                        strokeWidth="1.5"
                                                    />
                                                    <line
                                                        x1={padding.left}
                                                        y1={padding.top + height}
                                                        x2={padding.left + width}
                                                        y2={padding.top + height}
                                                        stroke="#94a3b8"
                                                        strokeWidth="1.5"
                                                    />

                                                    {/* X-axis labels */}
                                                    {xLabels}
                                                    <text
                                                        x={padding.left + width / 2}
                                                        y={padding.top + height + 25}
                                                        textAnchor="middle"
                                                        fontSize="10"
                                                        fill="#cbd5e1"
                                                    >
                                                        Time Window
                                                    </text>

                                                    {/* Firing count line */}
                                                    <path
                                                        d={firingPath}
                                                        fill="none"
                                                        stroke="#6366f1"
                                                        strokeWidth="2"
                                                    />

                                                    {/* Outgoing influence line */}
                                                    <path
                                                        d={outgoingPath}
                                                        fill="none"
                                                        stroke="#4ade80"
                                                        strokeWidth="2"
                                                        strokeDasharray="4,2"
                                                    />

                                                    {/* Data points */}
                                                    {firingPoints.map(([x, y], i) => (
                                                        <circle
                                                            key={`firing-${i}`}
                                                            cx={x}
                                                            cy={y}
                                                            r="3"
                                                            fill={i === currentWindow ? '#fbbf24' : '#6366f1'}
                                                            stroke="#1e293b"
                                                            strokeWidth="1"
                                                        />
                                                    ))}

                                                    {/* Legend */}
                                                    <g transform={`translate(${padding.left + 10}, ${padding.top + 5})`}>
                                                        <line x1="0" y1="0" x2="15" y2="0" stroke="#6366f1" strokeWidth="2" />
                                                        <text x="20" y="4" fontSize="9" fill="#cbd5e1">Firings</text>

                                                        <line x1="0" y1="12" x2="15" y2="12" stroke="#4ade80" strokeWidth="2" strokeDasharray="4,2" />
                                                        <text x="20" y="16" fontSize="9" fill="#cbd5e1">Outgoing</text>
                                                    </g>
                                                </>
                                            );
                                        })()}
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
