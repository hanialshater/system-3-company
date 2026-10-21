import { parse } from "../PARSER/parse.mjs";
import { ERRORS, parseLiteral } from "../VALUES/values.mjs";
import { isRef, refsOf } from "../CELLS/cells.mjs";
import { evaluate } from "../EVALUATOR/evaluate.mjs";
import { cycleCells } from "../GRAPH/graph.mjs";
import { display } from "../FORMAT/format.mjs";
export function createSheet() {
  const raw = new Map(), ast = new Map();
  let values = new Map();
  const name = (c) => { const r = String(c).toUpperCase(); if (!isRef(r)) throw new Error(`bad cell ${c}`); return r; };
  function recompute() {
    const deps = new Map([...ast].map(([c, a]) => [c, a ? [...refsOf(a)] : []]));
    const cyc = cycleCells(deps);
    values = new Map();
    const get = (c) => {
      if (values.has(c)) return values.get(c);
      if (cyc.has(c)) { values.set(c, ERRORS.CYCLE); return ERRORS.CYCLE; }
      if (!raw.has(c)) return "";
      values.set(c, ERRORS.CYCLE); // guard while computing
      const v = ast.has(c) ? (ast.get(c) ? evaluate(ast.get(c), get) : ERRORS.VALUE) : parseLiteral(raw.get(c));
      values.set(c, v);
      return v;
    };
    for (const c of raw.keys()) get(c);
  }
  return {
    set(c, text) { const r = name(c); const s = String(text ?? ""); ast.delete(r); if (s === "") raw.delete(r); else { raw.set(r, s); if (s.startsWith("=")) { let a = null; try { a = parse(s.slice(1)); } catch { a = null; } ast.set(r, a); } } recompute(); },
    get(c) { const r = name(c); const v = values.has(r) ? values.get(r) : ""; return typeof v === "number" ? Math.round(v * 1e9) / 1e9 : v; },
    display(c) { return display(this.get(c)); },
  };
}
