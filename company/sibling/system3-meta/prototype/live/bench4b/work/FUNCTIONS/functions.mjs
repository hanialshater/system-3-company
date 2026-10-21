// FUNCTIONS: built-in spreadsheet functions (SPEC.md "FUNCTIONS").
import { ERRORS, isError, toNumber, toText } from "../VALUES/values.mjs";
import { rangeCells } from "../CELLS/cells.mjs";

// Collect the numbers of aggregate arguments, or return the first error.
function collect(args, ctx) {
  const nums = [];
  for (const arg of args) {
    if (arg && arg.type === "range") {
      const cells = rangeCells(arg.from, arg.to);
      if (!cells) return { error: ERRORS.REF };
      for (const c of cells) {
        const v = ctx.cell(c);
        if (isError(v)) return { error: v };
        if (typeof v === "number") nums.push(v);
      }
    } else {
      const n = toNumber(ctx.evaluate(arg));
      if (isError(n)) return { error: n };
      nums.push(n);
    }
  }
  return { nums };
}

function num(arg, ctx) {
  return toNumber(ctx.evaluate(arg));
}

const AGGREGATES = {
  SUM: (ns) => ns.reduce((a, b) => a + b, 0),
  MIN: (ns) => (ns.length ? Math.min(...ns) : 0),
  MAX: (ns) => (ns.length ? Math.max(...ns) : 0),
  AVERAGE: (ns) => (ns.length ? ns.reduce((a, b) => a + b, 0) / ns.length : ERRORS.DIV0),
  COUNT: (ns) => ns.length,
};

const OTHERS = {
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
    return String(toText(v)).length;
  },
};

export function callFunction(name, args, ctx) {
  const key = typeof name === "string" ? name.toUpperCase() : name;
  const list = Array.isArray(args) ? args : [];
  if (Object.hasOwn(AGGREGATES, key)) {
    const r = collect(list, ctx);
    return r.error !== undefined ? r.error : AGGREGATES[key](r.nums);
  }
  if (Object.hasOwn(OTHERS, key)) return OTHERS[key](list, ctx);
  return ERRORS.NAME;
}
