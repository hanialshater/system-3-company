// FUNCTIONS: the built-in spreadsheet functions.
import { ERRORS, isError, toNumber, toText } from "../VALUES/values.mjs";
import { rangeCells } from "../CELLS/cells.mjs";

// Collect the numbers of aggregate arguments, or return the first error.
function collect(args, ctx) {
  const nums = [];
  for (const a of args) {
    if (a && a.type === "range") {
      const cells = rangeCells(a.from, a.to);
      if (!cells) return { error: ERRORS.REF };
      for (const c of cells) {
        const v = ctx.cell(c);
        if (isError(v)) return { error: v };
        if (typeof v === "number") nums.push(v);
      }
    } else {
      const v = ctx.evaluate(a);
      if (isError(v)) return { error: v };
      const n = toNumber(v);
      if (isError(n)) return { error: n };
      nums.push(n);
    }
  }
  return { nums };
}

function aggregate(fn) {
  return (args, ctx) => {
    const r = collect(args, ctx);
    return r.error !== undefined ? r.error : fn(r.nums);
  };
}

// Evaluate one argument to a number, or an error.
function num(ast, ctx) {
  const v = ctx.evaluate(ast);
  if (isError(v)) return v;
  return toNumber(v);
}

const FUNCS = {
  SUM: aggregate((ns) => ns.reduce((s, n) => s + n, 0)),
  MIN: aggregate((ns) => (ns.length ? Math.min(...ns) : 0)),
  MAX: aggregate((ns) => (ns.length ? Math.max(...ns) : 0)),
  AVERAGE: aggregate((ns) =>
    ns.length ? ns.reduce((s, n) => s + n, 0) / ns.length : ERRORS.DIV0),
  COUNT: aggregate((ns) => ns.length),

  IF(args, ctx) {
    if (args.length < 2 || args.length > 3) return ERRORS.VALUE;
    const c = ctx.evaluate(args[0]);
    if (isError(c)) return c;
    const n = toNumber(c);
    if (isError(n)) return n;
    if (n !== 0) return ctx.evaluate(args[1]);
    return args.length === 3 ? ctx.evaluate(args[2]) : false;
  },

  ABS(args, ctx) {
    if (args.length !== 1) return ERRORS.VALUE;
    const x = num(args[0], ctx);
    return isError(x) ? x : Math.abs(x);
  },

  ROUND(args, ctx) {
    if (args.length < 1 || args.length > 2) return ERRORS.VALUE;
    const x = num(args[0], ctx);
    if (isError(x)) return x;
    let d = 0;
    if (args.length === 2) {
      d = num(args[1], ctx);
      if (isError(d)) return d;
    }
    const p = Math.pow(10, d);
    return Math.round(x * p) / p;
  },

  LEN(args, ctx) {
    if (args.length !== 1) return ERRORS.VALUE;
    const v = ctx.evaluate(args[0]);
    if (isError(v)) return v;
    return toText(v).length;
  },
};

export function callFunction(name, args, ctx) {
  const f = Object.prototype.hasOwnProperty.call(FUNCS, name) ? FUNCS[name] : null;
  if (!f) return ERRORS.NAME;
  return f(args || [], ctx);
}
