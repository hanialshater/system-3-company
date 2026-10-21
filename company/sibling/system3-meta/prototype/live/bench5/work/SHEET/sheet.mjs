// SHEET: thin wiring of slots A-D (see work/ARCH/ARCH.md). No spreadsheet logic here.
import { normalizeCell, parseFormula, refsOf } from "../MOD-A/syntax.mjs";
import { parseLiteral, round9, display as displayValue } from "../MOD-B/values.mjs";
import { evaluate } from "../MOD-C/eval.mjs";
import { createStore } from "../MOD-D/store.mjs";

export function createSheet() {
  const store = createStore({ evaluate });
  function get(cell) {
    const v = store.get(normalizeCell(cell));
    return typeof v === "number" ? round9(v) : v;
  }
  return {
    set(cell, text) {
      const key = normalizeCell(cell);
      text = text == null ? "" : String(text);
      if (text === "") return void store.clear(key);
      if (text.startsWith("=")) {
        const ast = parseFormula(text.slice(1));
        store.set(key, { raw: text, ast, refs: refsOf(ast) });
      } else {
        store.set(key, { raw: text, ast: null, refs: [], value: parseLiteral(text) });
      }
    },
    get,
    display(cell) {
      return displayValue(get(cell));
    },
  };
}
