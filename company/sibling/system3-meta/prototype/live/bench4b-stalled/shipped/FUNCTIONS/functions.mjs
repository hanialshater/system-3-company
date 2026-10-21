// FUNCTIONS: built-in functions (SPEC.md "FUNCTIONS").
import { ERRORS, isError, toNumber, toText } from "../VALUES/values.mjs";
import { rangeCells } from "../CELLS/cells.mjs";

// Collect the numbers of an aggregate's arguments, or return an error string.
function collectNumbers(args, ctx) {
  const nums = [];
  for (const arg of args) {
    if (arg && arg.type === "range") {
      const cells = rangeCells(arg.from, arg.to);
      if (cells === null) return ERRORS.REF;
      for (const c of cells) {
        const v = ctx.cell(c);
        if (isError(v)) return v;
        if (typeof v === "number") nums.push(v);
      }
    } else {
      const n = toNumber(ctx.evaluate(arg));
      if (isError(n)) return n;
      nums.push(n);
    }
  }
  return nums;
}

const AGGREGATES = {
  SUM: (ns) => ns.reduce((a, b) => a + b, 0),
  MIN: (ns) => (ns.length ? Math.min(...ns) : 0),
  MAX: (ns) => (ns.length ? Math.max(...ns) : 0),
  AVERAGE: (ns) => (ns.length ? ns.reduce((a, b) => a + b, 0) / ns.length : ERRORS.DIV0),
  COUNT: (ns) => ns.length,
};

function numArg(arg, ctx) {
  return toNumber(ctx.evaluate(arg));
}

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
    const x = numArg(args[0], ctx);
    return isError(x) ? x : Math.abs(x);
  },
  ROUND(args, ctx) {
    if (args.length < 1 || args.length > 2) return ERRORS.VALUE;
    const x = numArg(args[0], ctx);
    if (isError(x)) return x;
    const d = args.length === 2 ? numArg(args[1], ctx) : 0;
    if (isError(d)) return d;
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
  const key = String(name).toUpperCase();
  const list = args || [];
  if (Object.hasOwn(AGGREGATES, key)) {
    const nums = collectNumbers(list, ctx);
    if (isError(nums)) return nums;
    return AGGREGATES[key](nums);
  }
  if (Object.hasOwn(OTHERS, key)) return OTHERS[key](list, ctx);
  return ERRORS.NAME;
}
