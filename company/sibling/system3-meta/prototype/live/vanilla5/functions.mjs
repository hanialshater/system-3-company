// Built-in functions. Each is fn(argNodes, api) -> value.
// api: { eval(node), isRange(node), rangeValues(node) }.
import { err, ERR, isError, toNumber, toText } from './values.mjs';

// Collect numbers for aggregate functions; returns number[] or SheetError.
function collectNumbers(args, api) {
  const nums = [];
  for (const a of args) {
    if (api.isRange(a)) {
      const vals = api.rangeValues(a);
      if (isError(vals)) return vals;
      for (const v of vals) {
        if (isError(v)) return v;
        if (typeof v === 'number') nums.push(v);
      }
    } else {
      const n = toNumber(api.eval(a));
      if (isError(n)) return n;
      nums.push(n);
    }
  }
  return nums;
}

const aggregate = (reduce) => (args, api) => {
  const nums = collectNumbers(args, api);
  return isError(nums) ? nums : reduce(nums);
};

function numArg(node, api) {
  return toNumber(api.eval(node));
}

export const builtins = {
  SUM: aggregate((n) => n.reduce((a, b) => a + b, 0)),
  MIN: aggregate((n) => (n.length ? Math.min(...n) : 0)),
  MAX: aggregate((n) => (n.length ? Math.max(...n) : 0)),
  AVERAGE: aggregate((n) => (n.length ? n.reduce((a, b) => a + b, 0) / n.length : err(ERR.DIV0))),
  COUNT: aggregate((n) => n.length),
  IF(args, api) {
    if (args.length < 2 || args.length > 3) return err(ERR.VALUE);
    const c = numArg(args[0], api);
    if (isError(c)) return c;
    if (c !== 0) return api.eval(args[1]);
    return args.length === 3 ? api.eval(args[2]) : false;
  },
  ABS(args, api) {
    if (args.length !== 1) return err(ERR.VALUE);
    const x = numArg(args[0], api);
    return isError(x) ? x : Math.abs(x);
  },
  ROUND(args, api) {
    if (args.length < 1 || args.length > 2) return err(ERR.VALUE);
    const x = numArg(args[0], api);
    if (isError(x)) return x;
    let d = 0;
    if (args.length === 2) {
      d = numArg(args[1], api);
      if (isError(d)) return d;
    }
    const f = Math.pow(10, d);
    return Math.round(x * f) / f;
  },
  LEN(args, api) {
    if (args.length !== 1) return err(ERR.VALUE);
    const t = toText(api.eval(args[0]));
    return isError(t) ? t : t.length;
  },
};

export function createFunctionRegistry() {
  return new Map(Object.entries(builtins));
}
