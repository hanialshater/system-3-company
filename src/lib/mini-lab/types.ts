/** Local, computed lesson traces. No catalog is imported by the renderer. */
export type MiniLabVisual =
  | { kind: "bars"; items: { label: string; value: number }[] }
  | { kind: "curve" | "scatter"; points: { x: number; y: number }[]; xLabel?: string; yLabel?: string }
  | { kind: "grid"; cells: { label: string; value: number }[] }
  | { kind: "graph"; nodes: { id: string; label: string; x: number; y: number }[]; edges: { from: string; to: string; label?: string; active?: boolean }[] }
  | { kind: "table"; columns: string[]; rows: (string | number)[][] }
  | { kind: "timeline"; events: { label: string; value: number }[] }
  | { kind: "intervals"; items: { label: string; low: number; mid: number; high: number }[] };

export interface MiniLabFrame {
  caption: string;
  visual: MiniLabVisual;
  metrics?: { label: string; value: string | number }[];
}

export interface MiniLabScenario {
  id: string;
  label: string;
  frames: MiniLabFrame[];
  /** Concise observed result, computed by the local model and retained across Reset. */
  summary: string;
}

export interface MiniLabSpec {
  id: string;
  family: string;
  predict: { question: string; options: string[]; answer: number };
  /** A neutral setup: never a result or a hint at the right option. */
  setup: string;
  hint: string;
  /** Scenario 0 is the prediction's case; scenario 1 changes a teaching-relevant input. */
  scenarios: MiniLabScenario[];
  /** Quotes only retained summaries or the model structure visible in the trace. */
  reveal: string[];
}

export interface MiniLabState {
  scenarioIndex: number;
  frameIndex: number;
  witnessed: boolean[];
}
export type MiniLabAction = "run" | "compare" | "step" | "reset";
