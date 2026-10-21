// SHEET: cells, formulas and recalculation.
import { parse } from "../PARSER/parse.mjs";
import { ERRORS, parseLiteral } from "../VALUES/values.mjs";
import { isRef, refsOf } from "../CELLS/cells.mjs";
import { evaluate } from "../EVALUATOR/evaluate.mjs";
import { cycleCells } from "../GRAPH/graph.mjs";
import { display as displayValue } from "../FORMAT/format.mjs";

function round9(v) {
  if (typeof v !== "number" || !Number.isFinite(v) || Math.abs(v) >= 1e21) return v;
  return Number(v.toFixed(9));
}

function cellName(cell) {
  const name = typeof cell === "string" ? cell.toUpperCase() : "";
  if (!isRef(name)) throw new Error(`Bad cell name: ${String(cell)}`);
  return name;
}

export function createSheet() {
  const entries = new Map(); // cell -> { formula: true, ast, refs } | { formula: false, value }
  let values = new Map();    // cell -> current value (only non-empty cells)

  function recalc() {
    const deps = new Map();
    for (const [c, e] of entries) if (e.formula) deps.set(c, [...e.refs]);
    const cycles = cycleCells(deps);
    const done = new Map();
    const visiting = new Set();
    const valueOf = (c) => {
      if (done.has(c)) return done.get(c);
      const e = entries.get(c);
      let v;
      if (!e) v = "";
      else if (!e.formula) v = round9(e.value);
      else if (cycles.has(c) || visiting.has(c)) v = ERRORS.CYCLE;
      else if (!e.ast) v = ERRORS.VALUE;
      else {
        visiting.add(c);
        try { v = round9(evaluate(e.ast, valueOf)); }
        finally { visiting.delete(c); }
      }
      if (e) done.set(c, v);
      return v;
    };
    for (const c of entries.keys()) valueOf(c);
    values = done;
  }

  return {
    set(cell, text) {
      const name = cellName(cell);
      const src = text == null ? "" : String(text);
      if (src === "") entries.delete(name);
      else if (src.startsWith("=")) {
        let ast = null;
        try { ast = parse(src.slice(1)); } catch { ast = null; }
        entries.set(name, { formula: true, ast, refs: ast ? refsOf(ast) : new Set() });
      } else entries.set(name, { formula: false, value: parseLiteral(src) });
      recalc();
    },
    get(cell) {
      const name = cellName(cell);
      return values.has(name) ? values.get(name) : "";
    },
    display(cell) {
      return displayValue(this.get(cell));
    },
  };
}
