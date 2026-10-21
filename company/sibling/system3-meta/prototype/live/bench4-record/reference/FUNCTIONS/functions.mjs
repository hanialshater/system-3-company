import { ERRORS, isError, toNumber, toText } from "../VALUES/values.mjs";
import { rangeCells } from "../CELLS/cells.mjs";
const AGG = ["SUM", "MIN", "MAX", "AVERAGE", "COUNT"];
export function callFunction(name, args, ctx) {
  if (AGG.includes(name)) {
    const nums = [];
    for (const a of args) {
      if (a.type === "range") { const cs = rangeCells(a.from, a.to); if (!cs) return ERRORS.REF; for (const c of cs) { const v = ctx.cell(c); if (isError(v)) return v; if (typeof v === "number") nums.push(v); } }
      else { const v = ctx.evaluate(a); if (isError(v)) return v; const n = toNumber(v); if (isError(n)) return n; nums.push(n); }
    }
    if (name === "SUM") return nums.reduce((x, y) => x + y, 0);
    if (name === "COUNT") return nums.length;
    if (!nums.length) return name === "AVERAGE" ? ERRORS.DIV0 : 0;
    if (name === "AVERAGE") return nums.reduce((x, y) => x + y, 0) / nums.length;
    return name === "MIN" ? Math.min(...nums) : Math.max(...nums);
  }
  const one = () => { if (args.length !== 1) return ERRORS.VALUE; return null; };
  if (name === "IF") {
    if (args.length < 2 || args.length > 3) return ERRORS.VALUE;
    const c = ctx.evaluate(args[0]); if (isError(c)) return c;
    const n = toNumber(c); if (isError(n)) return n;
    return n !== 0 ? ctx.evaluate(args[1]) : args[2] ? ctx.evaluate(args[2]) : false;
  }
  if (name === "ABS") { const e = one(); if (e) return e; const n = toNumber(ctx.evaluate(args[0])); return isError(n) ? n : Math.abs(n); }
  if (name === "ROUND") { if (args.length < 1 || args.length > 2) return ERRORS.VALUE; const n = toNumber(ctx.evaluate(args[0])); if (isError(n)) return n; const d = args[1] ? toNumber(ctx.evaluate(args[1])) : 0; if (isError(d)) return d; const k = 10 ** d; return Math.round(n * k) / k; }
  if (name === "LEN") { const e = one(); if (e) return e; const v = ctx.evaluate(args[0]); return isError(v) ? v : toText(v).length; }
  return ERRORS.NAME;
}
