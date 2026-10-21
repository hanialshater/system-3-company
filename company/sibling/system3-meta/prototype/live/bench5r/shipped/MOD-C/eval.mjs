// Slot C: evaluation (ARCH.md "## Slot C: eval.mjs").
// exports: evaluate, FUNCTIONS. Imports ../MOD-B/values.mjs only. Never throws.
import { ERR, isError, toNumber, toText, unary, binary, round9 } from "../MOD-B/values.mjs";

// name (uppercase) -> fn(args: AST[], ctx) -> value. Unknown names are #NAME?.
export const FUNCTIONS = Object.create(null);

function errorByCode(code) {
  for (const k of Object.keys(ERR)) if (ERR[k] && ERR[k].error === code) return ERR[k];
  return ERR.VALUE;
}

// Values for SUM/MIN/MAX/AVERAGE/COUNT, or the first error met (left to right).
// From a range only numbers count (text, booleans and blanks skipped; an error is the result);
// any other argument goes through toNumber (an error or non-numeric text is the result).
function numbers(args, ctx) {
  const out = [];
  for (const arg of args) {
    if (arg && arg.type === "range") {
      const rows = ctx && typeof ctx.range === "function" ? ctx.range(arg.from, arg.to) : ERR.REF;
      if (isError(rows)) return rows;
      for (const row of rows || []) {
        for (const v of Array.isArray(row) ? row : [row]) {
          if (isError(v)) return v;
          if (typeof v === "number") out.push(v);
        }
      }
    } else {
      const n = toNumber(walk(arg, ctx));
      if (isError(n)) return n;
      out.push(n);
    }
  }
  return out;
}

const aggregate = (fold) => (args, ctx) => {
  const ns = numbers(args, ctx);
  return isError(ns) ? ns : fold(ns);
};

FUNCTIONS.SUM = aggregate((ns) => ns.reduce((a, b) => a + b, 0));
FUNCTIONS.COUNT = aggregate((ns) => ns.length);
FUNCTIONS.MIN = aggregate((ns) => (ns.length ? Math.min(...ns) : 0));
FUNCTIONS.MAX = aggregate((ns) => (ns.length ? Math.max(...ns) : 0));
FUNCTIONS.AVERAGE = aggregate((ns) => (ns.length ? ns.reduce((a, b) => a + b, 0) / ns.length : ERR.DIV0));

FUNCTIONS.IF = (args, ctx) => {
  if (args.length < 2 || args.length > 3) return ERR.VALUE;
  const c = toNumber(walk(args[0], ctx));
  if (isError(c)) return c;
  if (c !== 0) return walk(args[1], ctx);
  return args.length === 3 ? walk(args[2], ctx) : false;
};

FUNCTIONS.ABS = (args, ctx) => {
  if (args.length !== 1) return ERR.VALUE;
  const x = toNumber(walk(args[0], ctx));
  return isError(x) ? x : Math.abs(x);
};

FUNCTIONS.ROUND = (args, ctx) => {
  if (args.length < 1 || args.length > 2) return ERR.VALUE;
  const x = toNumber(walk(args[0], ctx));
  if (isError(x)) return x;
  let d = 0;
  if (args.length === 2) {
    d = toNumber(walk(args[1], ctx));
    if (isError(d)) return d;
  }
  const f = Math.pow(10, d);
  return Math.round(x * f) / f;
};

FUNCTIONS.LEN = (args, ctx) => {
  if (args.length !== 1) return ERR.VALUE;
  const t = toText(walk(args[0], ctx));
  return isError(t) ? t : t.length;
};

function walk(ast, ctx) {
  if (!ast || typeof ast !== "object") return ERR.VALUE;
  switch (ast.type) {
    case "num":
    case "str":
    case "bool":
      return ast.value;
    case "error":
      // bad syntax carries "#VALUE!"; an invalid cell name or range corner carries "#REF!"
      return errorByCode(ast.code);
    case "unary":
      return unary(ast.op, walk(ast.arg, ctx));
    case "binary": {
      const l = walk(ast.left, ctx); // left before right: left error wins
      const r = walk(ast.right, ctx);
      return binary(ast.op, l, r);
    }
    case "call": {
      const fn = FUNCTIONS[ast.name];
      if (typeof fn !== "function") return ERR.NAME;
      return fn(ast.args, ctx);
    }
    case "ref":
      return ctx && typeof ctx.get === "function" ? ctx.get(ast.cell) : ERR.REF;
    case "range":
      // a bare range is not a single value; functions read ranges via ctx.range themselves
      return ERR.VALUE;
    default:
      return ERR.VALUE;
  }
}

export function evaluate(ast, ctx) {
  let v;
  try {
    v = walk(ast, ctx);
  } catch {
    return ERR.VALUE;
  }
  if (typeof v === "number") return Number.isFinite(v) ? round9(v) : ERR.VALUE;
  if (v === undefined || v === null) return "";
  if (isError(v) || typeof v === "string" || typeof v === "boolean") return v;
  return ERR.VALUE;
}
