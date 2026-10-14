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
    case "ceil": return Math.ceil(values[0]);
    case "floor": return Math.floor(values[0]);
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
