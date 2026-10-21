// Integration module: createSheet() -> { set, get, display }.
import { normalizeCell } from './cellname.mjs';
import { parseFormula } from './parser.mjs';
import { evaluate } from './evaluator.mjs';
import { err, ERR, isError, parseNumber, round9, displayValue } from './values.mjs';

function classify(text) {
  text = text == null ? '' : String(text);
  if (text === '') return null;
  if (text[0] === '=') {
    let ast;
    try { ast = parseFormula(text.slice(1)); } catch { ast = null; }
    return { text, formula: true, ast };
  }
  const n = parseNumber(text);
  return { text, formula: false, value: n === null ? text : round9(n) };
}

export function createSheet() {
  const cells = new Map(); // name -> { text, formula, ast?, value? }
  const functions = new Map(); // wave 1: none
  const evaluating = new Set();

  function valueOf(name) {
    const c = cells.get(name);
    if (!c) return '';
    if (!c.formula) return c.value;
    if (!c.ast) return err(ERR.VALUE);
    if (evaluating.has(name)) return err(ERR.CIRC);
    evaluating.add(name);
    try {
      const v = evaluate(c.ast, ctx);
      return typeof v === 'number' ? round9(v) : v;
    } finally {
      evaluating.delete(name);
    }
  }
  const ctx = { getCell: valueOf, functions };

  function publicValue(v) {
    return isError(v) ? v.code : v;
  }

  return {
    set(cell, text) {
      const name = normalizeCell(cell);
      const c = classify(text);
      if (c) cells.set(name, c); else cells.delete(name);
    },
    get(cell) {
      return publicValue(valueOf(normalizeCell(cell)));
    },
    display(cell) {
      return displayValue(valueOf(normalizeCell(cell)));
    },
  };
}
