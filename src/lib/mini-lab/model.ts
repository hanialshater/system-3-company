import type { MiniLabAction, MiniLabFrame, MiniLabSpec, MiniLabState, MiniLabVisual } from "./types";

function requireValid(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`MiniLab: ${message}`);
}
function finite(value: number, name: string) {
  requireValid(typeof value === "number" && Number.isFinite(value) && Math.abs(value) <= 1e15, `${name} must be finite and bounded`);
}
function text(value: string, name: string, max = 160) {
  requireValid(typeof value === "string" && value.trim().length > 0 && value.length <= max, `${name} must be nonempty and at most ${max} characters`);
}
function bounded(items: unknown[], name: string, max = 100) {
  requireValid(Array.isArray(items) && items.length > 0 && items.length <= max, `${name} needs 1–${max} items`);
}

export function validateVisual(visual: MiniLabVisual): void {
  requireValid(visual && typeof visual === "object", "visual must be an object");
  switch (visual.kind) {
    case "bars":
      bounded(visual.items, "bars", 8);
      visual.items.forEach((v) => { text(v.label, "bar label", 35); finite(v.value, "bar value"); });
      break;
    case "curve": case "scatter":
      bounded(visual.points, "points");
      visual.points.forEach((v) => { finite(v.x, "point x"); finite(v.y, "point y"); });
      if (visual.xLabel !== undefined) text(visual.xLabel, "x label", 35);
      if (visual.yLabel !== undefined) text(visual.yLabel, "y label", 35);
      break;
    case "grid":
      bounded(visual.cells, "cells", 12);
      visual.cells.forEach((v) => { text(v.label, "cell label", 30); finite(v.value, "cell value"); });
      break;
    case "graph": {
      bounded(visual.nodes, "nodes", 8);
      requireValid(Array.isArray(visual.edges) && visual.edges.length <= 16, "edges need at most 16 items");
      const ids = new Set(visual.nodes.map((n) => n.id));
      requireValid(ids.size === visual.nodes.length, "graph node IDs must be unique");
      visual.nodes.forEach((n) => {
        text(n.id, "node id", 40); text(n.label, "node label", 18); finite(n.x, "node x"); finite(n.y, "node y");
        requireValid(n.x >= 20 && n.x <= 300 && n.y >= 20 && n.y <= 150, "graph coordinates must fit x=20–300, y=20–150");
      });
      visual.edges.forEach((e) => { requireValid(ids.has(e.from) && ids.has(e.to), "graph edge must name existing nodes"); if (e.label !== undefined) text(e.label, "edge label", 24); });
      break;
    }
    case "table":
      bounded(visual.columns, "columns", 4); bounded(visual.rows, "rows", 5);
      visual.columns.forEach((v) => text(v, "column label", 25));
      visual.rows.forEach((row) => {
        requireValid(row.length === visual.columns.length, "table row width must match columns");
        row.forEach((v) => typeof v === "number" ? finite(v, "table value") : text(v, "table value", 45));
      });
      break;
    case "timeline":
      bounded(visual.events, "events", 8);
      visual.events.forEach((v) => { text(v.label, "event label", 30); finite(v.value, "event value"); });
      break;
    case "intervals":
      bounded(visual.items, "intervals", 5);
      visual.items.forEach((v) => {
        text(v.label, "interval label", 30); finite(v.low, "interval low"); finite(v.mid, "interval mid"); finite(v.high, "interval high");
        requireValid(v.low <= v.mid && v.mid <= v.high, "interval must have low ≤ mid ≤ high");
      });
      break;
    default: throw new Error("MiniLab: unknown visual kind");
  }
}

function chartRange(values: number[]): [number, number] {
  const min = Math.min(...values), max = Math.max(...values);
  return min === max ? [min - 1, max + 1] : [min, max];
}
function chartPosition(value: number, range: [number, number], lo: number, hi: number) {
  // Hundredth-pixel changes cannot carry a new teaching observation.
  return Number((lo + (value - range[0]) / (range[1] - range[0]) * (hi - lo)).toFixed(2));
}

/** The geometry and formatted values actually drawn, excluding hidden IDs/raw precision. */
export function renderedVisualData(visual: MiniLabVisual): unknown {
  switch (visual.kind) {
    case "bars": {
      const range = chartRange([0, ...visual.items.map((i) => i.value)]);
      return { kind: visual.kind, zero: chartPosition(0, range, 112, 277), items: visual.items.map((i) => [i.label, chartPosition(i.value, range, 112, 277), formatNumber(i.value)]) };
    }
    case "grid": return { kind: visual.kind, cells: visual.cells.map((c) => [c.label, formatNumber(c.value)]) };
    case "table": return { kind: visual.kind, columns: visual.columns, rows: visual.rows.map((r) => r.map((v) => typeof v === "number" ? formatNumber(v) : v)) };
    case "curve": case "scatter": {
      const xr = chartRange(visual.points.map((p) => p.x)), yr = chartRange(visual.points.map((p) => p.y));
      return { kind: visual.kind, xLabel: visual.xLabel ?? "", yLabel: visual.yLabel ?? "", axes: [...xr, ...yr].map(formatNumber), points: visual.points.map((p) => [chartPosition(p.x, xr, 44, 303), chartPosition(p.y, yr, 136, 16)]) };
    }
    case "graph": {
      const node = new Map(visual.nodes.map((n) => [n.id, n]));
      return { kind: visual.kind, nodes: visual.nodes.map((n) => [n.label, n.x, n.y]), edges: visual.edges.map((e) => [node.get(e.from)?.x, node.get(e.from)?.y, node.get(e.to)?.x, node.get(e.to)?.y, e.label ?? "", e.active !== false]) };
    }
    case "timeline": {
      const yr = chartRange([0, ...visual.events.map((e) => e.value)]);
      return { kind: visual.kind, events: visual.events.map((e) => [e.label, formatNumber(e.value), chartPosition(e.value, yr, 119, 20)]) };
    }
    case "intervals": {
      const xr = chartRange(visual.items.flatMap((i) => [i.low, i.high]));
      return { kind: visual.kind, items: visual.items.map((i) => [i.label, formatNumber(i.low), formatNumber(i.high), ...[i.low, i.mid, i.high].map((v) => chartPosition(v, xr, 112, 300))]) };
    }
  }
}

export function visibleFrameSignature(frame: MiniLabFrame): string {
  return JSON.stringify({ visual: renderedVisualData(frame.visual), metrics: (frame.metrics ?? []).map((m) => [m.label, typeof m.value === "number" ? formatNumber(m.value) : m.value]) });
}

export function validateSpec(spec: MiniLabSpec): MiniLabSpec {
  text(spec.id, "id", 100); text(spec.family, "family", 80); text(spec.setup, "setup", 130); text(spec.hint, "hint", 160);
  text(spec.predict.question, "prediction question", 650);
  bounded(spec.predict.options, "options", 4);
  requireValid(spec.predict.options.length >= 2, "prediction needs at least two options");
  spec.predict.options.forEach((o) => text(o, "option", 160));
  requireValid(new Set(spec.predict.options).size === spec.predict.options.length, "options must be distinct");
  requireValid(Number.isInteger(spec.predict.answer) && spec.predict.answer >= 0 && spec.predict.answer < spec.predict.options.length, "answer index out of range");
  requireValid(Array.isArray(spec.scenarios) && spec.scenarios.length === 2, "exactly two scenarios are required");
  requireValid(new Set(spec.scenarios.map((s) => s.id)).size === 2, "scenario IDs must be distinct");
  spec.scenarios.forEach((scenario) => {
    text(scenario.id, "scenario id", 80); text(scenario.label, "scenario label", 35); text(scenario.summary, "summary", 140);
    bounded(scenario.frames, "frames", 32);
    requireValid(scenario.frames.length >= 2, "each case needs at least two frames");
    scenario.frames.forEach((frame) => {
      text(frame.caption, "caption", 130); validateVisual(frame.visual);
      if (frame.metrics) {
        bounded(frame.metrics, "metrics", 3);
        frame.metrics.forEach((m) => { text(m.label, "metric label", 30); typeof m.value === "number" ? finite(m.value, "metric") : text(m.value, "metric", 70); });
      }
    });
    const signatures = scenario.frames.map(visibleFrameSignature);
    requireValid(signatures.every((signature, i) => i === 0 || signature !== signatures[i - 1]), "each adjacent trace frame must visibly change more than its caption");
  });
  const final = spec.scenarios.map((s) => visibleFrameSignature(s.frames[s.frames.length - 1]));
  requireValid(final[0] !== final[1], "the contrast must visibly change the final picture or readout");
  bounded(spec.reveal, "reveal paragraphs", 3);
  spec.reveal.forEach((p) => text(p, "reveal paragraph", 800));
  const reveal = spec.reveal.join(" ");
  requireValid(reveal.length >= 120 && reveal.split(/\s+/).length <= 90, "reveal must explain the result in 120+ characters and at most 90 words");
  return spec;
}

export function initialState(): MiniLabState {
  return { scenarioIndex: 0, frameIndex: -1, witnessed: [false, false] };
}

export function advance(spec: MiniLabSpec, before: MiniLabState, action: MiniLabAction): MiniLabState {
  if (action === "reset") {
    if (before.frameIndex === -1 && before.scenarioIndex === 0) return before;
    const next = { ...before, scenarioIndex: 0, frameIndex: -1 };
    return presentationSignature(spec, before) === presentationSignature(spec, next) ? before : next;
  }
  let scenarioIndex = before.scenarioIndex;
  let frameIndex = before.frameIndex;
  if (action === "run") { scenarioIndex = 0; frameIndex = spec.scenarios[0].frames.length - 1; }
  if (action === "compare") {
    if (!before.witnessed[0]) return before;
    scenarioIndex = 1; frameIndex = spec.scenarios[1].frames.length - 1;
  }
  if (action === "step") {
    const frames = spec.scenarios[scenarioIndex].frames;
    const current = displayedFrame(spec, before);
    const signature = current ? visibleFrameSignature(current.frame) : null;
    frameIndex += 1;
    // Rewinding a saved final case may encounter an identical first frame.
    // Skip it rather than expose a Step that only removes the Saved label.
    while (frameIndex < frames.length && visibleFrameSignature(frames[frameIndex]) === signature) frameIndex += 1;
    if (frameIndex >= frames.length) return before;
  }
  if (scenarioIndex === before.scenarioIndex && frameIndex === before.frameIndex) return before;
  const witnessed = [...before.witnessed];
  if (frameIndex === spec.scenarios[scenarioIndex].frames.length - 1) witnessed[scenarioIndex] = true;
  const next = { scenarioIndex, frameIndex, witnessed };
  return presentationSignature(spec, before) === presentationSignature(spec, next) ? before : next;
}

export function availability(spec: MiniLabSpec, state: MiniLabState) {
  return {
    run: advance(spec, state, "run") !== state,
    compare: advance(spec, state, "compare") !== state,
    step: advance(spec, state, "step") !== state,
    reset: advance(spec, state, "reset") !== state,
  };
}

/** Reset clears the active trace, never the completed question case it established. */
export function displayedFrame(spec: MiniLabSpec, state: MiniLabState): { frame: MiniLabFrame; saved: boolean } | null {
  if (state.frameIndex >= 0) return { frame: spec.scenarios[state.scenarioIndex].frames[state.frameIndex], saved: false };
  if (state.witnessed[0]) {
    const frames = spec.scenarios[0].frames;
    return { frame: frames[frames.length - 1], saved: true };
  }
  return null;
}

/** Only teaching evidence is compared: never state indices, captions or Saved labels. */
export function presentationSignature(spec: MiniLabSpec, state: MiniLabState): string {
  const displayed = displayedFrame(spec, state);
  return JSON.stringify({
    picture: displayed ? visibleFrameSignature(displayed.frame) : { setup: spec.setup },
    summaries: spec.scenarios.filter((_, i) => state.witnessed[i]).map((scenario) => scenario.summary),
  });
}

export function formatNumber(value: number): string {
  finite(value, "formatted number");
  if (Math.abs(value) >= 1e6 || (value !== 0 && Math.abs(value) < 0.001)) return value.toExponential(2);
  return Number(value.toFixed(3)).toLocaleString("en-US", { maximumFractionDigits: 3 });
}
