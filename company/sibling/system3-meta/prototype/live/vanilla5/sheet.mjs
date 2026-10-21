// Integration module: createSheet() -> { set, get, display }.
import { normalizeCell } from './cellname.mjs';
import { parseFormula } from './parser.mjs';
import { evaluate } from './evaluator.mjs';
import { createFunctionRegistry } from './functions.mjs';
import { collectRefs, resolveCycles } from './deps.mjs';
import { err, ERR, isError, parseNumber, round9, displayValue } from './values.mjs';

const NO_REFS = new Set();

function classify(text) {
  text = text == null ? '' : String(text);
  if (text === '') return null;
  if (text[0] === '=') {
    let ast;
    try { ast = parseFormula(text.slice(1)); } catch { ast = null; }
    return { text, formula: true, ast, refs: ast ? collectRefs(ast) : NO_REFS };
  }
  const n = parseNumber(text);
  return { text, formula: false, value: n === null ? text : round9(n), refs: NO_REFS };
}

export function createSheet() {
  const cells = new Map();      // name -> { text, formula, ast?, value?, refs }
  const dependents = new Map(); // name -> Set of cells whose formulas read it
  const functions = createFunctionRegistry();
  const memo = new Map();       // cached values
  const cycleStatus = new Map(); // cached: true = on a cycle or reads one
  const evaluating = new Set();

  const depsOf = (name) => cells.get(name)?.refs ?? NO_REFS;

  function link(name, refs, add) {
    for (const r of refs) {
      let set = dependents.get(r);
      if (add) { if (!set) dependents.set(r, (set = new Set())); set.add(name); }
      else if (set) { set.delete(name); if (!set.size) dependents.delete(r); }
    }
  }

  // Forget cached results for `name` and everything that reads it, through any chain.
  function invalidate(name) {
    const todo = [name];
    const seen = new Set(todo);
    while (todo.length) {
      const n = todo.pop();
      memo.delete(n);
      cycleStatus.delete(n);
      for (const d of dependents.get(n) ?? NO_REFS) if (!seen.has(d)) { seen.add(d); todo.push(d); }
    }
  }

  function valueOf(name) {
    const c = cells.get(name);
    if (!c) return '';
    if (!c.formula) return c.value;
    if (!c.ast) return err(ERR.VALUE);
    if (memo.has(name)) return memo.get(name);
    if (evaluating.has(name) || resolveCycles(name, depsOf, cycleStatus)) return err(ERR.CIRC);
    evaluating.add(name);
    try {
      let v = evaluate(c.ast, ctx);
      if (typeof v === 'number') v = round9(v);
      memo.set(name, v);
      return v;
    } finally {
      evaluating.delete(name);
    }
  }
  const ctx = { getCell: valueOf, functions };

  // Evaluate the uncached dependencies of `name` deepest-first (iterative
  // post-order walk), so long chains never recurse deeply.
  function warm(name) {
    const needs = (n) => {
      const c = cells.get(n);
      return c && c.formula && c.ast && !memo.has(n);
    };
    if (!needs(name)) return;
    const order = [];
    const seen = new Set([name]);
    const stack = [[name, depsOf(name)[Symbol.iterator]()]];
    while (stack.length) {
      const top = stack[stack.length - 1];
      const next = top[1].next();
      if (next.done) { order.push(top[0]); stack.pop(); continue; }
      const d = next.value;
      if (!seen.has(d) && needs(d)) { seen.add(d); stack.push([d, depsOf(d)[Symbol.iterator]()]); }
    }
    for (const n of order) valueOf(n);
  }

  function read(cell) {
    const name = normalizeCell(cell);
    warm(name);
    return valueOf(name);
  }

  return {
    set(cell, text) {
      const name = normalizeCell(cell);
      const c = classify(text);
      const old = cells.get(name);
      if (old) link(name, old.refs, false);
      if (c) { cells.set(name, c); link(name, c.refs, true); } else cells.delete(name);
      invalidate(name);
    },
    get(cell) {
      const v = read(cell);
      return isError(v) ? v.code : v;
    },
    display(cell) {
      return displayValue(read(cell));
    },
  };
}
