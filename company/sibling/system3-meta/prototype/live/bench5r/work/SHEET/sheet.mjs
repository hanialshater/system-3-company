// SHEET: sheet.mjs — the integrated sheet. Owner dev-2. Wiring only (ARCH.md). Self-contained, no wrapper.
import { parse, normCell, refs } from "../MOD-A/parse.mjs";
import { ERR, isError, parseInput, display as displayValue } from "../MOD-B/values.mjs";
import { evaluate } from "../MOD-C/eval.mjs";
import { createGraph } from "../MOD-D/graph.mjs";

export function createSheet() {
  const cells = new Map(); // normalised name -> { text, ast, value }
  const graph = createGraph();

  function name(cell) {
    const n = normCell(cell);
    if (n === null) throw new Error(`bad cell name: ${String(cell)}`);
    return n;
  }

  function stored(c) {
    const rec = cells.get(c);
    return rec ? rec.value : "";
  }

  const ctx = {
    get(c) { const n = normCell(c); return n === null ? ERR.REF : stored(n); },
    // The rectangle column by column (SPEC5): outer array = columns, so flattening in array
    // order visits A1,A2,B1,B2.
    range(from, to) {
      const a = normCell(from), b = normCell(to);
      if (a === null || b === null) return [];
      const c1 = a.charCodeAt(0), c2 = b.charCodeAt(0);
      const r1 = Number(a.slice(1)), r2 = Number(b.slice(1));
      const cols = [];
      for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) {
        const col = [];
        for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) col.push(stored(String.fromCharCode(c) + r));
        cols.push(col);
      }
      return cols;
    },
  };

  function recalc(cell) {
    // No #CYCLE! marking before wave 3 defines it (ARCH): every formula cell is just evaluated.
    for (const c of graph.recalcOrder(cell)) {
      const rec = cells.get(c);
      if (!rec || rec.ast === null) continue;
      rec.value = evaluate(rec.ast, ctx);
    }
  }

  function set(cell, text) {
    const c = name(cell);
    const t = text == null ? "" : String(text);
    if (t === "") {
      cells.delete(c);
      graph.setDeps(c, []);
    } else if (t.startsWith("=")) {
      const ast = parse(t.slice(1));
      cells.set(c, { text: t, ast, value: "" });
      graph.setDeps(c, refs(ast));
    } else {
      cells.set(c, { text: t, ast: null, value: parseInput(t) });
      graph.setDeps(c, []);
    }
    recalc(c);
  }

  // Public boundary (ARCH amended): errors leave as their code string; internally they stay ERR objects.
  function get(cell) { const v = stored(name(cell)); return isError(v) ? v.error : v; }
  function display(cell) { return displayValue(stored(name(cell))); }

  return { set, get, display };
}
