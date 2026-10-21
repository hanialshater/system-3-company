// Slot C: evaluator and function registry.
// Contract: live/bench5/work/ARCH/ARCH.md, "Slot C: eval.mjs". Imports ../MOD-B/values.mjs only.
import { ERR, isError, errorFromCode, binary, unary, toNumber, toText } from "../MOD-B/values.mjs";

// #REF! is a B-owned singleton (wave 2); resolved through B so C never makes its own error objects.
const REF = () => errorFromCode("#REF!");

const CELL_RE = /^([A-Z])([1-9][0-9]?)$/;
function cellName(x) {
  const s = typeof x === "string" ? x : x && typeof x === "object" ? x.cell : undefined;
  if (typeof s !== "string") return null;
  const up = s.toUpperCase();
  return CELL_RE.test(up) ? up : null;
}

function readCell(ctx, cell) {
  if (!ctx || typeof ctx.get !== "function") return "";
  const v = ctx.get(cell);
  return v === undefined || v === null ? "" : v;
}

// Values of a range node, column by column; an invalid corner -> #REF! (returned as {error}).
function rangeValues(node, ctx) {
  const a = cellName(node.from), b = cellName(node.to);
  if (!a || !b) return { error: REF() };
  const c1 = Math.min(a.charCodeAt(0), b.charCodeAt(0)), c2 = Math.max(a.charCodeAt(0), b.charCodeAt(0));
  const r1 = Math.min(+a.slice(1), +b.slice(1)), r2 = Math.max(+a.slice(1), +b.slice(1));
  const values = [];
  for (let c = c1; c <= c2; c++)
    for (let r = r1; r <= r2; r++) values.push(readCell(ctx, String.fromCharCode(c) + r));
  return { values };
}

// Collects numbers for SUM/MIN/MAX/AVERAGE/COUNT; returns an error value or a number[].
function collectNumbers(argNodes, ctx) {
  const nums = [];
  for (const node of argNodes) {
    if (node && node.type === "range") {
      const r = rangeValues(node, ctx);
      if (r.error) return r.error;
      for (const v of r.values) {
        if (isError(v)) return v;
        if (typeof v === "number") nums.push(v);
      }
    } else {
      const n = toNumber(walk(node, ctx));
      if (isError(n)) return n;
      nums.push(n);
    }
  }
  return nums;
}

const aggregate = (f) => (argNodes, ctx) => {
  const nums = collectNumbers(argNodes, ctx);
  if (isError(nums)) return nums;
  const r = f(nums);
  return typeof r === "number" && !Number.isFinite(r) ? ERR.VALUE : r;
};

const sum = (ns) => ns.reduce((s, n) => s + n, 0);

const oneNumber = (argNodes, ctx, f) => {
  if (argNodes.length !== 1) return ERR.VALUE;
  const x = toNumber(walk(argNodes[0], ctx));
  return isError(x) ? x : f(x);
};

// Registry {NAME: (argNodes, ctx, evaluate) -> value}.
export const FUNCTIONS = {
  SUM: aggregate(sum),
  COUNT: aggregate((ns) => ns.length),
  MIN: aggregate((ns) => (ns.length ? Math.min(...ns) : 0)),
  MAX: aggregate((ns) => (ns.length ? Math.max(...ns) : 0)),
  AVERAGE: aggregate((ns) => (ns.length ? sum(ns) / ns.length : ERR.DIV0)),
  IF(argNodes, ctx) {
    if (argNodes.length < 2 || argNodes.length > 3) return ERR.VALUE;
    const c = toNumber(walk(argNodes[0], ctx));
    if (isError(c)) return c;
    if (c !== 0) return walk(argNodes[1], ctx);
    return argNodes.length === 3 ? walk(argNodes[2], ctx) : false;
  },
  ABS: (argNodes, ctx) => oneNumber(argNodes, ctx, Math.abs),
  ROUND(argNodes, ctx) {
    if (argNodes.length < 1 || argNodes.length > 2) return ERR.VALUE;
    const x = toNumber(walk(argNodes[0], ctx));
    if (isError(x)) return x;
    let d = 0;
    if (argNodes.length === 2) {
      d = toNumber(walk(argNodes[1], ctx));
      if (isError(d)) return d;
    }
    const p = Math.pow(10, d);
    const r = Math.round(x * p) / p;
    return Number.isFinite(r) ? (r === 0 ? 0 : r) : ERR.VALUE;
  },
  LEN(argNodes, ctx) {
    if (argNodes.length !== 1) return ERR.VALUE;
    const t = toText(walk(argNodes[0], ctx));
    return isError(t) ? t : t.length;
  },
};

function walk(ast, ctx) {
  if (!ast || typeof ast !== "object") return ERR.VALUE;
  switch (ast.type) {
    case "num":
    case "str":
    case "bool":
      return ast.value;
    case "error":
      return errorFromCode(ast.code);
    case "unary":
      return unary(ast.op, walk(ast.arg, ctx));
    case "binary": {
      const a = walk(ast.left, ctx);
      const b = walk(ast.right, ctx);
      return binary(ast.op, a, b);
    }
    case "call": {
      const name = typeof ast.name === "string" ? ast.name.toUpperCase() : "";
      const fn = Object.hasOwn(FUNCTIONS, name) ? FUNCTIONS[name] : undefined;
      return fn ? fn(ast.args ?? [], ctx, evaluate) : ERR.NAME;
    }
    case "ref": {
      const cell = cellName(ast.cell);
      return cell ? readCell(ctx, cell) : REF();
    }
    case "range":
      // ranges are allowed only as function arguments
      return ERR.VALUE;
    default:
      return ERR.VALUE;
  }
}

export function evaluate(ast, ctx) {
  try {
    return walk(ast, ctx);
  } catch {
    return ERR.VALUE;
  }
}
