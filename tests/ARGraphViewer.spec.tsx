// tests in this file exercise DOM-dependent behaviour and therefore
// require jsdom.  jsdom is not currently installed in the repository; these
// specs are left here for reference but are skipped by default.
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { AtomRuleGraph } from '../types/visualization';

// stub ResizeObserver so we can trigger its callback manually and watch for
// requestAnimationFrame usage.  we keep an array of callbacks registered.
const roCallbacks: Array<Function> = [];
class FakeResizeObserver {
  constructor(cb: Function) {
    roCallbacks.push(cb);
  }
  observe() {}
  disconnect() {}
}
(global as any).ResizeObserver = FakeResizeObserver;

// mock cytoscape so we can spy on fit/resize/animate and control
// layoutstop timing.  we capture callbacks registered via `on` in a table
// so tests can fire them manually.
const fitSpy = vi.fn();
const resizeSpy = vi.fn();
const destroySpy = vi.fn();
const animateSpy = vi.fn();

// store event handlers per-instance; our simple fake creates exactly one
// cytoscape instance per test so a global list is fine.
const layoutCallbacks: { [event: string]: Function[] } = {};
const onSpy = vi.fn((event: string, cb: Function) => {
  if (!layoutCallbacks[event]) layoutCallbacks[event] = [];
  layoutCallbacks[event].push(cb);
  return undefined;
});

vi.mock('cytoscape', () => {
  const cyt = vi.fn(() => ({
    fit: fitSpy,
    resize: resizeSpy,
    destroy: destroySpy,
    animate: animateSpy,
    elements: () => [],
    on: onSpy,
  }));
  cyt.use = vi.fn();
  return { default: cyt };
});

import { ARGraphViewer } from '../components/ARGraphViewer';

const baseGraph: AtomRuleGraph = {
  nodes: [{ id: 'n1', label: 'A()', type: 'atom' }],
  edges: [],
};

describe.skip('ARGraphViewer (skipped – requires jsdom)', () => {
  beforeEach(() => {
    fitSpy.mockClear();
    resizeSpy.mockClear();
    destroySpy.mockClear();
    animateSpy.mockClear();
    onSpy.mockClear();
    // clear any layout callbacks from previous renders
    Object.keys(layoutCallbacks).forEach(k => delete layoutCallbacks[k]);
  });

  it('creates a cytoscape instance and fits on mount', () => {
    render(<ARGraphViewer arGraph={baseGraph} />);
    expect(fitSpy).toHaveBeenCalled();
  });

  it('re-fits when forceFitTrigger prop changes', () => {
    const { rerender } = render(
      <ARGraphViewer arGraph={baseGraph} forceFitTrigger="foo" />
    );
    expect(fitSpy).toHaveBeenCalled();
    fitSpy.mockClear();

    rerender(
      <ARGraphViewer arGraph={baseGraph} forceFitTrigger="bar" />
    );
    expect(fitSpy).toHaveBeenCalled();
  });

  it('recreates cy instance when arGraph changes', () => {
    const { rerender } = render(<ARGraphViewer arGraph={baseGraph} />);
    expect(destroySpy).not.toHaveBeenCalled();
    const bigger: AtomRuleGraph = {
      nodes: [...baseGraph.nodes, { id: 'n2', label: 'B()', type: 'atom' }],
      edges: [],
    };
    rerender(<ARGraphViewer arGraph={bigger} />);
    // original instance should have been destroyed so a new one can be made
    expect(destroySpy).toHaveBeenCalled();
    expect(fitSpy).toHaveBeenCalled();
  });

  it('uses requestAnimationFrame when a resize event occurs', () => {
    // render component to register ResizeObserver
    render(<ARGraphViewer arGraph={baseGraph} />);
    // there should be exactly one callback stored
    expect(roCallbacks.length).toBe(1);

    // spy on raf
    const rafSpy = vi.spyOn(global, 'requestAnimationFrame');
    // invoke the observer callback with a dummy size
    roCallbacks[0]([{ contentRect: { width: 100, height: 200 } }]);

    expect(rafSpy).toHaveBeenCalled();
    // ensure that the raf callback eventually triggers fit
    // (simulate immediate execution)
    const rafCall = rafSpy.mock.calls[0][0] as Function;
    rafCall();
    expect(fitSpy).toHaveBeenCalled();
  });

  it('does not animate center until after layoutstop', () => {
    animateSpy.mockClear();

    render(<ARGraphViewer arGraph={baseGraph} selectedRuleId="n1" />);

    // layoutDone should remain false until layoutstop fires
    expect(layoutCallbacks['layoutstop']).toBeDefined();
    // before we fire layoutstop, animation shouldn't have occurred
    expect(animateSpy).not.toHaveBeenCalled();

    // simulate layout stopping now (this also sets layoutDone=true)
    layoutCallbacks['layoutstop']?.forEach(cb => cb());
    expect(animateSpy).toHaveBeenCalled();
  });
});
