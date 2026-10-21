// SHEET: cells, formulas and recalculation (SPEC.md "SHEET").
import { parse } from "../PARSER/parse.mjs";
import { ERRORS, parseLiteral } from "../VALUES/values.mjs";
import { isRef, refsOf } from "../CELLS/cells.mjs";
import { evaluate } from "../EVALUATOR/evaluate.mjs";
import { cycleCells } from "../GRAPH/graph.mjs";
import { display as displayValue } from "../FORMAT/format.mjs";

function normRef(cell) {
  const r = typeof cell === "string" ? cell.trim().toUpperCase() : cell;
  if (!isRef(r)) throw new Error(`bad cell name: ${String(cell)}`);
  return r;
}

function round9(n) {
  if (!Number.isFinite(n)) return n;
  const r = Number(n.toFixed(9));
  return Object.is(r, -0) ? 0 : r;
}

export function createSheet() {
  // cell -> { formula: true, ast } (ast null when parsing failed) or { formula: false, value }
  const inputs = new Map();
  let values = new Map();

  function recalc() {
    const deps = new Map();
    for (const [c, inp] of inputs) {
      if (inp.formula) deps.set(c, inp.ast ? [...refsOf(inp.ast)] : []);
    }
    const cycle = cycleCells(deps);
    const memo = new Map();
    const valueOf = (c) => {
      if (memo.has(c)) return memo.get(c);
      const inp = inputs.get(c);
      let v;
      if (!inp) v = "";
      else if (!inp.formula) v = inp.value;
      else if (cycle.has(c)) v = ERRORS.CYCLE;
      else if (!inp.ast) v = ERRORS.VALUE;
      else v = evaluate(inp.ast, valueOf);
      if (typeof v === "number") v = round9(v);
      memo.set(c, v);
      return v;
    };
    for (const c of inputs.keys()) valueOf(c);
    values = memo;
  }

  function set(cell, text) {
    const ref = normRef(cell);
    const src = text == null ? "" : String(text);
    if (src === "") {
      inputs.delete(ref);
    } else if (src.startsWith("=")) {
      let ast = null;
      try {
        ast = parse(src.slice(1));
      } catch {
        ast = null;
      }
      inputs.set(ref, { formula: true, ast });
    } else {
      inputs.set(ref, { formula: false, value: parseLiteral(src) });
    }
    recalc();
  }

  function get(cell) {
    const ref = normRef(cell);
    return values.has(ref) ? values.get(ref) : "";
  }

  function display(cell) {
    return displayValue(get(cell));
  }

  return { set, get, display };
}
