export type ResourceExpression = number | "x" | [string, ...ResourceExpression[]];
export type ResourceFamily = "receipt" | "allocation" | "inventory" | "energy" | "water" | "geometry" | "reuse";
export interface ResourceSpec {
  slug: string;
  title: string;
  hook: string;
  concept: string;
  family: ResourceFamily;
  aLabel: string;
  bLabel: string;
  formulaA: ResourceExpression;
  formulaB: ResourceExpression;
  unit: string;
  variable: { label: string; unit: string; min: number; max: number; start: number; step: number };
  question: string;
  options: string[];
  answer: number;
  assumptions: string;
  /** Safety-required stage line (lifehacks-safety-reviewer record); shown under the assumptions line. */
  warning?: string;
  details: string;
  principle: string;
  objective: string;
  misconception: string;
  recall: { question: string; options: string[]; answer: number; why: string };
  /**
   * TP-7 (fix plan 2026-10-15): "plain" turns on the plain-words stage for this lesson only: readouts in words
   * (no ceil, floor, min, max or sqrt), money to 2 decimals, no "Full scale" label. Lessons without it render
   * exactly as before, so the r11 launch lessons keep their reviewed text.
   */
  display?: "plain";
  /** Plain-words readout for case A or B; {x} is the slider value, {A} and {B} the two results. */
  wordsA?: string;
  wordsB?: string;
  /** Noun after a rounded value in plain words, e.g. "whole pairs": "rounded up to 2 whole pairs". */
  roundTo?: string;
}

/**
 * Binary floating point leaves noise on products such as 100 * 1.1 = 110.00000000000001, and a bare
 * Math.ceil turns that noise into a whole extra unit (111). Before ceil/floor, a value within a
 * relative 1e-9 of an integer is snapped to that integer (W-357). No declared input in
 * resource-specs.json carries a real fractional part that small, so genuine fractions still round.
 */
export function snapToInteger(value: number): number {
  const nearest = Math.round(value);
  return Math.abs(value - nearest) <= 1e-9 * Math.max(1, Math.abs(value)) ? nearest : value;
}

/** Small, deterministic arithmetic tree: no eval, network, random values or hidden prices. */
export function evaluateResource(expression: ResourceExpression, x: number): number {
  if (expression === "x") return x;
  if (typeof expression === "number") return expression;
  const [operator, ...terms] = expression;
  const values = terms.map((term) => evaluateResource(term, x));
  switch (operator) {
    case "+": return values.reduce((a, b) => a + b, 0);
    case "-": return values[0] - values[1];
    case "*": return values.reduce((a, b) => a * b, 1);
    case "/": return values[0] / values[1];
    case "ceil": return Math.ceil(snapToInteger(values[0]));
    case "floor": return Math.floor(snapToInteger(values[0]));
    case "sqrt": return Math.sqrt(values[0]);
    case "min": return Math.min(...values);
    case "max": return Math.max(...values);
    case "round": return Math.round((values[0] + Number.EPSILON) * 100) / 100;
    default: throw new Error(`Unknown resource arithmetic operator: ${operator}`);
  }
}

export function resourceNumber(value: number): string {
  return value.toLocaleString("en-US", { maximumFractionDigits: 3 });
}

export function resourceAmount(value: number, unit: string): string {
  return unit === "€" ? `€${resourceNumber(value)}` : `${resourceNumber(value)}${unit}`;
}

export function resourceFormula(expression: ResourceExpression, x: number): string {
  if (expression === "x") return resourceNumber(x);
  if (typeof expression === "number") return resourceNumber(expression);
  const [operator, ...terms] = expression;
  const rendered = terms.map((term) => resourceFormula(term, x));
  if (["ceil", "floor", "sqrt", "round", "min", "max"].includes(operator)) {
    return `${operator}(${rendered.join(",")})`;
  }
  return `(${rendered.join(operator === "*" ? "×" : operator === "/" ? "÷" : operator)})`;
}

const symbols: Record<string, string> = { "+": "+", "-": "−", "*": "×", "/": "÷" };

/** Removes one pair of brackets that wraps the whole text. */
function unwrap(text: string): string {
  if (!text.startsWith("(") || !text.endsWith(")")) return text;
  let depth = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "(") depth++;
    if (text[i] === ")") depth--;
    if (depth === 0 && i < text.length - 1) return text;
  }
  return text.slice(1, -1);
}

function plainWords(expression: ResourceExpression, x: number, roundTo: string): string {
  if (expression === "x") return resourceNumber(x);
  if (typeof expression === "number") return resourceNumber(expression);
  const [operator, ...terms] = expression;
  const rendered = terms.map((term) => plainWords(term, x, roundTo));
  const value = resourceNumber(evaluateResource(expression, x));
  const noun = roundTo ? ` ${roundTo}` : "";
  switch (operator) {
    case "ceil": return `(${unwrap(rendered[0])} = ${resourceNumber(evaluateResource(terms[0], x))}, rounded up to ${value}${noun})`;
    case "floor": return `(${unwrap(rendered[0])} = ${resourceNumber(evaluateResource(terms[0], x))}, rounded down to ${value}${noun})`;
    case "min": return `(the smaller of ${rendered.map(unwrap).join(" and ")})`;
    case "max": return `(the larger of ${rendered.map(unwrap).join(" and ")})`;
    case "sqrt": return `(the length whose square is ${unwrap(rendered[0])})`;
    case "round": return `(${unwrap(rendered[0])}, to the cent)`;
    default: return `(${rendered.join(` ${symbols[operator] ?? operator} `)})`;
  }
}

/** TP-7(a): the readout under a result, in plain words for "plain" lessons; the old expression otherwise. */
export function resourceReadout(spec: ResourceSpec, index: 0 | 1, x: number): string {
  const expression = index === 0 ? spec.formulaA : spec.formulaB;
  if (spec.display !== "plain") return resourceFormula(expression, x);
  const template = index === 0 ? spec.wordsA : spec.wordsB;
  if (template) {
    const [a, b] = resourcePair(spec, x);
    return template.replaceAll("{x}", resourceNumber(x)).replaceAll("{A}", resourceNumber(a)).replaceAll("{B}", resourceNumber(b));
  }
  return unwrap(plainWords(expression, x, spec.roundTo ?? ""));
}

/** TP-7(c): money to 2 decimals and a space before word units, for "plain" lessons only. */
export function resourceAmountFor(spec: ResourceSpec, value: number, unit: string = spec.unit): string {
  if (spec.display !== "plain") return resourceAmount(value, unit);
  if (unit.startsWith("€")) return `€${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${unit.slice(1)}`;
  return /^[a-z]{3,}$/.test(unit) ? `${resourceNumber(value)} ${unit}` : `${resourceNumber(value)}${unit}`;
}

/** The slider's value text: unchanged for older lessons, money and word units spelled out for "plain" ones. */
export function resourceVariableText(spec: ResourceSpec, value: number): string {
  if (spec.display !== "plain") return `${value}${spec.variable.unit}`;
  return spec.variable.unit ? resourceAmountFor(spec, value, spec.variable.unit) : resourceNumber(value);
}

/** Stage labels: "Whole-litres" reads "Whole litres" in plain lessons. */
export function resourceLabel(spec: ResourceSpec, label: string): string {
  return spec.display === "plain" ? label.replace(/(?<=[A-Za-z])-(?=[A-Za-z])/g, " ") : label;
}

/** TP-7(b): plain lessons drop the "Scaled model;" lead-in and never print a "Full scale" value. */
export function resourceAssumptions(spec: ResourceSpec): string {
  if (spec.display === "plain") return spec.assumptions.replace(/^Scaled model;\s*/, "");
  return spec.family === "geometry" ? spec.assumptions : spec.assumptions.replace("Scaled model;", `Full scale:${resourceAmount(resourceGraphicScale(spec), spec.unit)};`);
}

export function resourcePair(spec: ResourceSpec, x: number): [number, number] {
  return [evaluateResource(spec.formulaA, x), evaluateResource(spec.formulaB, x)];
}

/** One fixed scale across the allowed input range makes growth and shrinkage visible. */
export function resourceGraphicScale(spec: ResourceSpec): number {
  const { min, max, step } = spec.variable;
  let scale = 0.001;
  for (let value = min; value <= max; value += step) {
    scale = Math.max(scale, ...resourcePair(spec, value).map(Math.abs));
  }
  return Math.max(scale, ...resourcePair(spec, max).map(Math.abs));
}

export function resourceAxisEnd(spec: ResourceSpec, index: number, x: number): string {
  const duration = spec.slug === "lh-watts-hours-trade" && index === 1 ? x * 5 : x;
  return `0→${resourceNumber(duration)}${spec.variable.unit || spec.variable.label.toLowerCase()}`;
}

export function resourceCylinderDimensions(index: number, height: number) {
  const radius = index === 0 ? 3 : 6;
  return { rx: radius * 7, ry: radius * 3, height: height * 4 };
}
