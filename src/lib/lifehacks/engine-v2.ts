/**
 * Life Hacks engines v2 (company/design/specs/lifehacks-engines-v2.md, board W-608): pure helpers for the
 * Seen table, the amounts row and the reveal's first sentence. No rendering imports, no randomness.
 * Lessons opt in with `engine: 2`; specs without it never reach this file.
 *
 * Field shapes still open in W-611 (interaction-designer) use the simplest shape that works here:
 *  - per-mode verdict: `verdictByMode: { a?, b? }`, a word appended to that mode's number, plus
 *    `resultText: { a?, b? }`, a literal that replaces that mode's result cell (bag's unweighed A);
 *  - message lessons: `aFields` (default 1), the number of fields mode A fills;
 *  - hidden target at predict (recall): `hideTarget: true` keeps the target row at "?" until mode B;
 *  - `optionToMode[i]`: the column the reveal quotes first when the learner chose option i.
 */
import { evaluateHome, type HomeSpec } from "./home-models";
import { calendarResult, fileResult, reconstructionMatches, type CalendarRow, type FilesSpec, type MessageSpec, type RecallSpec, type ScheduleSpec, type StudySpec } from "./studyModels";

export type Mode = "a" | "b";
/** Arithmetic tree with named variables. A string is a variable when the environment has it, else literal text. */
export type Expr = number | string | [string, ...Expr[]];
export type Env = Record<string, number>;

export function isVariable(e: Expr, env: Env): e is string {
  return typeof e === "string" && Object.prototype.hasOwnProperty.call(env, e);
}

/** Same operators as evaluateResource (resource-model.ts), with named variables. Throws on literal text. */
export function evaluateExpr(e: Expr, env: Env): number {
  if (typeof e === "number") return e;
  if (typeof e === "string") {
    if (isVariable(e, env)) return env[e];
    throw new Error(`Not a number: "${e}"`);
  }
  const [op, ...terms] = e;
  const v = terms.map((t) => evaluateExpr(t, env));
  switch (op) {
    case "+": return v.reduce((x, y) => x + y, 0);
    case "-": return v[0] - v[1];
    case "*": return v.reduce((x, y) => x * y, 1);
    case "/": return v[0] / v[1];
    case "floor": return Math.floor(snap(v[0]));
    case "ceil": return Math.ceil(snap(v[0]));
    case "min": return Math.min(...v);
    case "max": return Math.max(...v);
    default: throw new Error(`Unknown operator: ${op}`);
  }
}
const snap = (x: number) => { const n = Math.round(x); return Math.abs(x - n) <= 1e-9 * Math.max(1, Math.abs(x)) ? n : x; };

/** R5: integers as they are, |x| < 1 to three decimals (1/20 = 0.050, 1/22 = 0.045), else three significant figures. */
export function sig3(x: number): string {
  const n = snap(x), a = Math.abs(n);
  let body: string;
  if (Number.isInteger(n)) body = a.toLocaleString("en-US");
  else if (a < 1) body = a.toFixed(3);
  else { const t = a.toPrecision(3); body = t.includes("e") ? Number(t).toLocaleString("en-US") : t; }
  return n < 0 ? `−${body}` : body;
}

const withUnit = (body: string, unit: string) => unit ? `${body} ${unit}` : body;

/** An amount cell: a number with its unit, or literal text (the unit is added only after a trailing digit). */
export function amountCell(e: Expr | null, unit: string, env: Env): string {
  if (e === null) return "–";
  if (typeof e === "string" && !isVariable(e, env)) return /\d$/.test(e) ? withUnit(e, unit) : e;
  return withUnit(sig3(evaluateExpr(e, env)), unit);
}

/* ------------------------------------------------------------------ Home */

export interface HomeAmount { label: string; unit: string; a: Expr | null; b: Expr | null }
export interface HomeVerdict { below?: string; above?: string; zero?: string; at?: number }
export interface HomeV2Fields {
  engine?: 2;
  modeLabels?: [string, string];
  options?: [string, string, string];
  amounts?: HomeAmount[];
  resultLabel?: string;
  /** Unit text for the result cell when the model's unit is not plain words (cm⁻¹ → "per cm"). */
  resultUnit?: string;
  verdict?: HomeVerdict;
  verdictByMode?: { a?: string; b?: string };
  resultText?: { a?: string; b?: string };
  revealLine?: string;
  pictureMark?: "radius-stripe" | "dimension" | null;
  /** TP-2: numbers as written in the options (0.3 kg, not 0.300 kg): up to two decimals, trailing zeros dropped. */
  plainNumbers?: boolean;
}

export const homeEnv = (spec: HomeSpec, p: number): Env => {
  const [a = 1, b = 1, c = 1, d = 1] = spec.values;
  return { p, a, b, c, d };
};
export const homeModeLabels = (spec: HomeSpec): [string, string] => spec.modeLabels ?? [spec.choices[0], spec.choices[1]];

export interface Column { amounts: string[]; result: string; spoken: string }

/** Number format for a Home v2 spec: R5's three significant figures, or plain (TP-2, `plainNumbers`). */
export function homeNumber(spec: HomeSpec, x: number): string {
  if (!spec.plainNumbers) return sig3(x);
  const n = snap(x), body = Number(Math.abs(n).toFixed(2)).toLocaleString("en-US");
  return n < 0 ? `−${body}` : body;
}
const homeAmountCell = (spec: HomeSpec, e: Expr | null, unit: string, env: Env): string => {
  if (!spec.plainNumbers || e === null || (typeof e === "string" && !isVariable(e, env))) return amountCell(e, unit, env);
  return withUnit(homeNumber(spec, evaluateExpr(e, env)), unit);
};

/** One Seen-table column for a Home lesson at input p: amount cells, the result cell and the reveal's wording. */
export function homeColumn(spec: HomeSpec, p: number, mode: Mode): Column {
  const env = homeEnv(spec, p);
  const amounts = (spec.amounts ?? []).map((row) => homeAmountCell(spec, row[mode], row.unit, env));
  const literal = spec.resultText?.[mode];
  if (literal) return { amounts, result: literal, spoken: literal };
  const r = evaluateHome(spec, p, mode === "b");
  const v = spec.verdict, at = v?.at ?? 0;
  const word = spec.verdictByMode?.[mode] ?? (v ? (Math.abs(r.value - at) < 1e-9 ? v.zero : r.value < at ? v.below : v.above) : undefined);
  const signed = v?.below !== undefined && r.value > at + 1e-9 ? "+" : "";
  const number = withUnit(`${signed}${homeNumber(spec, r.value)}`, spec.resultUnit ?? r.unit);
  return { amounts, result: word ? `${number} · ${word}` : number, spoken: word ? `${number} (${word})` : number };
}

const lower = (s: string) => s && /^[A-Z][a-z]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s;

export function homeResultLabel(spec: HomeSpec, p: number): string {
  return spec.resultLabel ?? evaluateHome(spec, p, false).label;
}

/** R6: the reveal's first sentence names both columns. `revealLine` tokens override the default wording. */
export function homeRevealLine(spec: HomeSpec, p: number): string {
  const [A, B] = homeModeLabels(spec);
  const a = homeColumn(spec, p, "a"), b = homeColumn(spec, p, "b");
  if (spec.revealLine) {
    const tokens: Record<string, string> = { A, B, resultA: a.spoken, resultB: b.spoken, ...homeDifference(spec, p) };
    a.amounts.forEach((cell, i) => { tokens[`amountA${i}`] = cell; });
    b.amounts.forEach((cell, i) => { tokens[`amountB${i}`] = cell; });
    return spec.revealLine.replace(/\{(\w+)\}/g, (m, k: string) => tokens[k] ?? m);
  }
  // R6 as written: the first amount row and the result row of each column (the second amount row stays in the table).
  const label = lower(homeResultLabel(spec, p)), first = spec.amounts?.[0];
  const part = (name: string, c: Column) => `${name}: ${[first && c.amounts[0] !== "–" ? `${lower(first.label)} ${c.amounts[0]}` : "", `${label} ${c.spoken}`].filter(Boolean).join("; ")}.`;
  return `${part(A, a)} ${part(B, b)}`;
}

/**
 * TP-2(b): the difference between the two results in words, for `revealLine` tokens. {diff} is the gap with its
 * unit ("0.98 m²"), {ratio} the larger result over the smaller ("4", "3"), empty when the smaller is zero.
 */
export function homeDifference(spec: HomeSpec, p: number): { diff: string; ratio: string } {
  const ra = evaluateHome(spec, p, false), rb = evaluateHome(spec, p, true);
  const unit = spec.resultUnit ?? ra.unit;
  const lo = Math.min(Math.abs(ra.value), Math.abs(rb.value)), hi = Math.max(Math.abs(ra.value), Math.abs(rb.value));
  return { diff: withUnit(homeNumber(spec, Math.abs(rb.value - ra.value)), unit), ratio: lo > 1e-9 ? homeNumber({ ...spec, plainNumbers: true }, hi / lo) : "" };
}

/** TP-2(c): true when the slider changes a Seen-table cell in either column somewhere in its range. */
export function homeSliderMatters(spec: HomeSpec): boolean {
  const key = (p: number) => JSON.stringify([homeColumn(spec, p, "a"), homeColumn(spec, p, "b")]);
  const start = key(spec.initial), steps = Math.round((spec.max - spec.min) / spec.step);
  for (let i = 0; i <= steps; i++) if (key(spec.min + i * spec.step) !== start) return true;
  return false;
}

/** What a v2 Home spec still lacks (section 8). Empty when complete. */
export function homeV2Problems(spec: HomeSpec): string[] {
  if (spec.engine !== 2) return [];
  const out: string[] = [];
  if (!spec.options || spec.options.length !== 3) out.push("options");
  // The bow stage is lesson-specific (both bows drawn at once, no Seen table), so it carries no amount rows.
  if (spec.model !== "bow" && (!spec.amounts || spec.amounts.length < 1 || spec.amounts.length > 2)) out.push("amounts");
  const labels = homeModeLabels(spec);
  if (labels.some((l) => l.length > 16)) out.push("modeLabels > 16 chars");
  if (spec.options?.some((o) => labels.includes(o) || spec.choices.includes(o))) out.push("options repeat a button label (R7)");
  return out;
}

/* ------------------------------------------------------------------ Study */

export interface StudyAmount { label: string; a: string | number; b: string | number }
export interface StudyV2Fields {
  engine?: 2;
  modeLabels?: [string, string];
  optionToMode?: Mode[];
  amounts?: StudyAmount[];
  consequence?: { label: string; a: string; b: string };
  exploreHint?: string;
}
/** Families with a v2 stage. order, edit and spacing stay on v1 until a lesson in them migrates. */
export const STUDY_V2_FAMILIES = ["schedule", "files", "message", "recall"] as const;
export const studyHasYours = (spec: StudySpec) => spec.family === "schedule" || spec.family === "recall";
/** Initial reconstruction attempt used by the recall family (same as v1). */
export const RECALL_INITIAL = [2, 0, 1] as const;

export interface StudyColumn { amounts: Array<[string, string]>; result: [string, string] }

/** Schedule rows at the given starts, with the declared overrun applied (the event is drawn from predict on). */
export function scheduleRows(spec: ScheduleSpec, starts: readonly number[]): CalendarRow[] {
  return spec.rows.map((r, i) => ({ ...r, start: starts[i], duration: r.duration + (spec.event?.row === i ? spec.event.minutes : 0) }));
}
/** Each clashing pair, in row order, with its overlapping minutes. */
export function calendarClashes(rows: readonly CalendarRow[]) {
  const out: Array<{ a: string; b: string; minutes: number }> = [];
  rows.forEach((r, i) => rows.slice(i + 1).forEach((q) => {
    const m = Math.min(r.start + r.duration, q.start + q.duration) - Math.max(r.start, q.start);
    if (m > 0) out.push({ a: r.label, b: q.label, minutes: m });
  }));
  return out;
}
export function scheduleStarts(spec: ScheduleSpec, mode: Mode): number[] {
  return mode === "b" ? [...spec.target] : spec.rows.map((r) => r.start);
}
export function scheduleColumn(spec: ScheduleSpec, starts: readonly number[], mode: Mode | null): StudyColumn {
  const rows = scheduleRows(spec, starts);
  const { conflict } = calendarResult(rows, spec.deadline);
  const pairs = calendarClashes(rows).map((c) => `${c.a} × ${c.b}`).join(", ");
  const amounts: Array<[string, string]> = [];
  if (spec.amounts && mode) for (const a of spec.amounts) amounts.push([a.label, String(a[mode])]);
  else if (!spec.amounts && spec.movable > 0) {
    const prev = spec.rows[spec.movable - 1], gap = starts[spec.movable] - (starts[spec.movable - 1] + prev.duration);
    amounts.push([`Gap before ${spec.rows[spec.movable].label}`, gap >= 0 ? `${gap} min` : `${-gap} min short`]);
  }
  return { amounts, result: ["Overlap", conflict ? `${conflict} min (${pairs})` : "0 min"] };
}

const FILTERS = ["filter", "phrase", "exclude", "date", "trash", "body", "boolean"];
export function filesColumn(spec: FilesSpec, mode: Mode): StudyColumn {
  const v = fileResult(spec, mode === "a" ? 1 : 2);
  const amounts: Array<[string, string]> = spec.amounts
    ? spec.amounts.map((a) => [a.label, String(a[mode])])
    : FILTERS.includes(spec.operation) ? [["Not in results", String(spec.items.length - v.rows.length)]] : [];
  return { amounts, result: [v.caption, String(v.count)] };
}
export const messageFilled = (spec: MessageSpec, mode: Mode | null) => mode === "b" ? spec.fields.length : mode === "a" ? (spec.aFields ?? 1) : (spec.aFields ?? 1);
export function messageColumn(spec: MessageSpec, mode: Mode): StudyColumn {
  const amounts: Array<[string, string]> = [];
  if (spec.consequence) amounts.push([spec.consequence.label, spec.consequence[mode]]);
  for (const a of spec.amounts ?? []) amounts.push([a.label, String(a[mode])]);
  return { amounts, result: ["Fields", `${messageFilled(spec, mode)}/${spec.fields.length}`] };
}
export const recallScore = (spec: RecallSpec, order: readonly number[]) => reconstructionMatches(spec.words, order).filter(Boolean).length;
/** Mode A is the unchecked (or vague-cue) world, so it has no score; mode B checks the initial attempt. */
export function recallColumn(spec: RecallSpec, mode: Mode | "yours", order: readonly number[] = RECALL_INITIAL): StudyColumn {
  const amounts: Array<[string, string]> = [];
  const m: Mode = mode === "yours" ? "b" : mode;
  if (spec.candidates) amounts.push(["Answers this cue fits", mode === "yours" ? "–" : String(spec.candidates[m])]);
  for (const a of spec.amounts ?? []) amounts.push([a.label, mode === "yours" ? "–" : String(a[m])]);
  return { amounts, result: ["Match", mode === "a" ? "not checked" : `${recallScore(spec, mode === "b" ? RECALL_INITIAL : order)}/${spec.words.length}`] };
}

export function studyColumn(spec: StudySpec, mode: Mode): StudyColumn {
  switch (spec.family) {
    case "schedule": return scheduleColumn(spec, scheduleStarts(spec, mode), mode);
    case "files": return filesColumn(spec, mode);
    case "message": return messageColumn(spec, mode);
    case "recall": return recallColumn(spec, mode);
    default: throw new Error(`No v2 stage for the ${spec.family} family yet`);
  }
}

const sentence = (name: string, c: StudyColumn) =>
  `${name}: ${[...c.amounts.filter(([, v]) => v !== "–"), c.result].map(([l, v]) => `${lower(l)} ${v}`).join("; ")}.`;

/** R6 for Study: both snapshots, the learner's predicted column first; "Yours" only when it differs from both. */
export function studyRevealLine(spec: StudySpec, prediction: number, yours: StudyColumn | null): string {
  const labels = spec.modeLabels ?? ["A", "B"];
  const first: Mode = spec.optionToMode?.[prediction] ?? "a";
  const order: Mode[] = first === "a" ? ["a", "b"] : ["b", "a"];
  const cols = { a: studyColumn(spec, "a"), b: studyColumn(spec, "b") };
  const key = (c: StudyColumn) => JSON.stringify([c.amounts.filter(([, v]) => v !== "–"), c.result]);
  const parts = order.map((m) => sentence(labels[m === "a" ? 0 : 1], cols[m]));
  if (yours && key(yours) !== key(cols.a) && key(yours) !== key(cols.b)) parts.push(sentence("Yours", yours));
  return parts.join(" ");
}

/** What a v2 Study spec still lacks (section 8). Empty when complete. */
export function studyV2Problems(spec: StudySpec): string[] {
  if (spec.engine !== 2) return [];
  const out: string[] = [];
  if (!(STUDY_V2_FAMILIES as readonly string[]).includes(spec.family)) out.push(`family ${spec.family} has no v2 stage`);
  if (!spec.modeLabels || spec.modeLabels.length !== 2) out.push("modeLabels");
  if (!spec.optionToMode || spec.optionToMode.length !== spec.options.length) out.push("optionToMode");
  if (spec.family === "message" && !spec.consequence) out.push("consequence");
  if (spec.modeLabels && spec.options.some((o) => spec.modeLabels!.includes(o))) out.push("options repeat a button label (R7)");
  return out;
}
