/** Books-only deterministic toys. These calculations do not validate a book's wider advice.
 * Bounds: finite inputs |x|<=1e9; |output|<=1e12; flow 2–4 stations;
 * compound/feedback 0–12 whole steps; network total 1–1e6, branches 1–6,
 * rounds 0–12; intervals at most 12 completed chunks. Percentages are 0–100,
 * except compound rates (-100–1000). All counts/horizons are whole numbers.
 */
export const MODEL_FAMILIES = ["flow", "payoff", "compound", "selection", "network", "feedback", "intervals"] as const;
export type ModelFamily = (typeof MODEL_FAMILIES)[number];

/** family is a string so independent JSON payloads need no unsafe type assertion. */
export interface BookIdeaSpec {
  book: { title: string; author: string; year: number; work: string };
  family: string;
  predict: { question: string; options: string[]; answer: number };
  exploreHint: string;
  scenarios: { label: string; values: number[] }[];
  labels: string[];
  unit: string;
  bookIdea: string;
  modelBoundary: string;
  doesItHoldUp: string;
}
export type ValidatedBookIdeaSpec = BookIdeaSpec & { family: ModelFamily };
export interface ModelResult { output: number; trace: number[] }
export type CaseIndex = 0 | 1;
export interface Observation { active: CaseIndex | null; seen: [number | null, number | null] }

const fail = (message: string): never => { throw new Error(`Book model: ${message}`); };
const finite = (n: number) => typeof n === "number" && Number.isFinite(n) && Math.abs(n) <= 1e9;
const inRange = (n: number, min: number, max: number) => n >= min && n <= max;
const integer = (n: number, min: number, max: number) => Number.isInteger(n) && inRange(n, min, max);
export function isModelFamily(value: string): value is ModelFamily {
  return MODEL_FAMILIES.some((family) => family === value);
}

export function calculateModel(family: ModelFamily, values: readonly number[]): ModelResult {
  if (!values.every(finite)) fail("inputs must be finite numbers with absolute value at most 1e9");
  const arity: Record<ModelFamily, number> = { flow: values.length, payoff: 3, compound: 4, selection: 4, network: 3, feedback: 4, intervals: 3 };
  if (values.length !== arity[family]) fail(`${family} needs ${arity[family]} inputs`);
  const [a, b, c, d] = values;
  let output = 0;
  let trace: number[] = [];
  switch (family) {
    case "flow":
      if (!integer(values.length, 2, 4) || values.some((n) => n < 0)) fail("flow needs 2–4 nonnegative capacities");
      trace = values.map((_, i) => Math.min(...values.slice(0, i + 1)));
      output = Math.min(...values);
      break;
    case "payoff":
      if (!inRange(a, 0, 100)) fail("payoff probability must be 0–100 percent");
      // b and c are SIGNED net outcomes, never implicitly negated.
      trace = [a / 100 * b, (1 - a / 100) * c];
      output = trace[0] + trace[1];
      break;
    case "compound": {
      if (a < 0 || d < 0 || !inRange(b, -100, 1000) || !integer(c, 0, 12)) fail("invalid compound stock, rate, steps or addition");
      let stock = a;
      trace = [stock];
      for (let i = 0; i < c; i++) { stock = stock * (1 + b / 100) + d; trace.push(stock); }
      output = stock;
      break;
    }
    case "selection":
      if (!integer(a, 0, 1e9) || !integer(c, 0, 1e9) || a + c === 0 || !inRange(b, 0, 100) || !inRange(d, 0, 100)) fail("selection needs nonzero whole population and 0–100 percent rates");
      // Expected fractional successes are not invented integer observations.
      trace = [a * b / 100, c * d / 100];
      output = (a * b + c * d) / (a + c);
      break;
    case "network": {
      if (!integer(a, 1, 1e6) || !integer(b, 1, 6) || !integer(c, 0, 12)) fail("network bounds: total 1–1e6, branches 1–6, rounds 0–12");
      let reached = 0;
      for (let round = 0; round <= c; round++) { reached = Math.min(a, reached + b ** round); trace.push(reached); }
      output = reached;
      break;
    }
    case "feedback": {
      if (a < 0 || b < 0 || c < 0 || !integer(d, 0, 12)) fail("feedback needs nonnegative rates/stock and 0–12 whole steps");
      let stock = a;
      trace = [stock];
      for (let i = 0; i < d; i++) { stock = Math.max(0, stock + b - c); trace.push(stock); }
      output = stock;
      break;
    }
    case "intervals": {
      if (a < 0 || b <= 0 || c < 0) fail("intervals needs nonnegative budget/overhead and positive work");
      const chunks = Math.floor(a / (b + c));
      if (chunks > 12) fail("intervals supports at most 12 completed chunks");
      trace = Array.from({ length: chunks }, (_, i) => (i + 1) * (b + c));
      output = chunks * b;
      break;
    }
    default: return fail("unsupported family");
  }
  if (![output, ...trace].every((n) => Number.isFinite(n) && Math.abs(n) <= 1e12)) fail("computed result exceeds finite 1e12 bound");
  return { output: Object.is(output, -0) ? 0 : output, trace };
}

export function validateBookIdeaSpec(spec: BookIdeaSpec): ValidatedBookIdeaSpec {
  const family = spec.family;
  if (!isModelFamily(family)) return fail(`unknown family ${family}`);
  if (spec.scenarios.length !== 2 || spec.scenarios.some((s) => !s.label.trim())) fail("exactly two named scenarios required");
  if (spec.scenarios[0].label === spec.scenarios[1].label) fail("scenario labels must be distinct");
  if (spec.scenarios[0].values.join() === spec.scenarios[1].values.join()) fail("scenario inputs must differ");
  if (!integer(spec.predict.options.length, 2, 4) || !integer(spec.predict.answer, 0, spec.predict.options.length - 1)) fail("prediction needs 2–4 options and a valid answer index");
  if (!spec.labels.length || spec.labels.some((label) => !label.trim())) fail("named diagram labels required");
  if (spec.family === "flow" && spec.labels.length !== spec.scenarios[0].values.length) fail("one label per flow station required");
  spec.scenarios.forEach((s) => calculateModel(family, s.values));
  if (spec.family === "flow" && spec.scenarios[0].values.length !== spec.scenarios[1].values.length) fail("flow scenarios need matching station counts");
  return { ...spec, family };
}

export function initialObservation(): Observation { return { active: null, seen: [null, null] }; }
/** Once both cases are seen, restore case A's meaningful picture beside the reveal.
 * Earlier resets remain neutral, so visiting B first never substitutes for observing A.
 */
export function resetObservation(state: Observation): Observation {
  return { ...state, active: state.seen.every((value) => value !== null) ? 0 : null };
}
export function canResetObservation(state: Observation): boolean {
  return state.active !== null && !(state.active === 0 && state.seen.every((value) => value !== null));
}
export function observeScenario(state: Observation, which: CaseIndex, output: number): Observation {
  if (!Number.isFinite(output)) fail("snapshot must be finite");
  const seen: Observation["seen"] = [...state.seen];
  seen[which] = output;
  return { active: which, seen };
}
export function formatBookValue(value: number): string {
  if (!Number.isFinite(value)) fail("cannot format a nonfinite value");
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(Object.is(value, -0) ? 0 : value);
}
/** Show the actual input operation, never a rounded multiplier implying a different rate.
 * String(number) retains a shortest round-trip literal; result readouts still round to 2dp.
 */
export function formatCompoundOperation(ratePercent: number, additionEachStep: number): string {
  if (!finite(ratePercent) || !finite(additionEachStep)) return fail("compound caption inputs must be finite");
  return `× (1 ${ratePercent < 0 ? "−" : "+"} ${String(Math.abs(ratePercent))}/100) + ${String(additionEachStep)}`;
}
/** Accessible name for the stage picture. It restates only what the picture draws: payload
 * labels, unit and input values, plus outputs computed by calculateModel. No new facts.
 */
export function describeScene(spec: ValidatedBookIdeaSpec, active: CaseIndex | null): string {
  if (active === null) return "Toy model picture. Values appear when you choose case A or B.";
  const v = spec.scenarios[active].values;
  const { output, trace } = calculateModel(spec.family, v);
  const f = formatBookValue;
  const label = (i: number) => spec.labels[i] ?? "";
  const unit = spec.unit ? ` ${spec.unit}` : "";
  let body: string;
  switch (spec.family) {
    case "flow": {
      const lowest = v.flatMap((n, i) => n === output ? [label(i)] : []).join(" and ");
      body = `Stations in order: ${v.map((n, i) => `${label(i)} ${f(n)}`).join(", ")}. Lowest: ${lowest} at ${f(output)}.`;
      break;
    }
    case "payoff":
      body = `${label(0)} at ${f(v[0])}%: ${f(v[0] / 100)} × ${f(v[1])} = ${f(trace[0])}. ${label(1)} at ${f(100 - v[0])}%: ${f((100 - v[0]) / 100)} × ${f(v[2])} = ${f(trace[1])}. Sum ${f(trace[0])} + (${f(trace[1])}).`;
      break;
    case "compound":
      body = `Start ${f(trace[0])}; ${label(0)} ${v[2]}, each ${formatCompoundOperation(v[1], v[3])}: ${trace.map(f).join(", ")}.`;
      break;
    case "selection":
      body = `${label(0)}: ${f(trace[0])} of ${f(v[0])} at ${f(v[1])}%. ${label(1)}: ${f(trace[1])} of ${f(v[2])} at ${f(v[3])}%. Together ${f(trace[0] + trace[1])} of ${f(v[0] + v[2])}.`;
      break;
    case "network":
      body = `From the origin, × ${v[1]} for ${v[2]} ${label(0)}: ${Math.min(12, output)} pictured, ${f(output)} reached.`;
      break;
    case "feedback":
      body = `Level ${f(v[0])} to ${f(output)}: ${label(0)} +${f(v[1])}, ${label(1)} −${f(v[2])}, ${v[3]} ${label(2)}.`;
      break;
    case "intervals":
      body = `From 0 to ${f(v[0])}: ${trace.length} × (${f(v[2])} ${label(1)} + ${f(v[1])} ${label(0)}).`;
      break;
  }
  return `Case ${active === 0 ? "A" : "B"}, ${spec.scenarios[active].label}. ${body} Result: ${f(output)}${unit}.`;
}
/** Live-region text for the case just observed: which case changed, its value and unit. */
export function announceCase(spec: ValidatedBookIdeaSpec, active: CaseIndex | null, seen: Observation["seen"]): string {
  if (active === null || seen[active] === null) return "";
  return `Case ${active === 0 ? "A" : "B"}: ${formatBookValue(seen[active]!)}${spec.unit ? ` ${spec.unit}` : ""}`;
}
/** Literal substitution only: no HTML, interpolation engine, eval or computed fallback. */
export function fillSeen(text: string, seen: Observation["seen"]): string {
  return text.replace(/\{([AB])\}/g, (_, key: string) => {
    const value = seen[key === "A" ? 0 : 1];
    return value === null ? "?" : formatBookValue(value);
  });
}
