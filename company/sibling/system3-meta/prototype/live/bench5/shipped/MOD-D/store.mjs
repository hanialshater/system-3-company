// Slot D: store and recalculation (see work/ARCH/ARCH.md). Imports nothing; evaluate is injected.
// exports: createStore

export function createStore({ evaluate } = {}) {
  if (typeof evaluate !== "function") throw new Error("createStore needs { evaluate }");
  // cell -> { raw, ast, refs, value }  (value is unrounded)
  const cells = new Map();
  // cell -> Set of cells whose formulas reference it
  const dependents = new Map();

  const read = (cell) => (cells.has(cell) ? cells.get(cell).value : "");
  // range(from, to) -> value[][] rows (top row first, each row left to right).
  // Corners may come in any order; callers pass normalised cell names.
  function range(from, to) {
    const c1 = Math.min(from.charCodeAt(0), to.charCodeAt(0));
    const c2 = Math.max(from.charCodeAt(0), to.charCodeAt(0));
    const r1 = Math.min(Number(from.slice(1)), Number(to.slice(1)));
    const r2 = Math.max(Number(from.slice(1)), Number(to.slice(1)));
    const rows = [];
    for (let r = r1; r <= r2; r++) {
      const row = [];
      for (let c = c1; c <= c2; c++) row.push(read(String.fromCharCode(c) + r));
      rows.push(row);
    }
    return rows;
  }
  const ctx = { get: read, range };

  function unlink(cell) {
    const old = cells.get(cell);
    if (!old) return;
    for (const r of old.refs) dependents.get(r)?.delete(cell);
  }
  function link(cell, refs) {
    for (const r of refs) {
      if (!dependents.has(r)) dependents.set(r, new Set());
      dependents.get(r).add(cell);
    }
  }
  function compute(cell) {
    const c = cells.get(cell);
    if (c && c.ast) c.value = evaluate(c.ast, ctx);
  }
  // Recalculate every transitive dependent of `cell` in topological order.
  // (Cycle detection arrives with wave 3; until then a visited set keeps this finite.)
  function recalcDependents(cell) {
    const order = [];
    const seen = new Set([cell]);
    (function visit(c) {
      for (const d of dependents.get(c) || []) {
        if (seen.has(d)) continue;
        seen.add(d);
        visit(d);
        order.push(d);
      }
    })(cell);
    order.reverse().forEach(compute);
  }

  return {
    set(cell, { raw = "", ast = null, refs = [], value = "" } = {}) {
      unlink(cell);
      cells.set(cell, { raw, ast, refs: [...refs], value: ast ? "" : value });
      link(cell, refs);
      compute(cell);
      recalcDependents(cell);
    },
    clear(cell) {
      unlink(cell);
      cells.delete(cell);
      recalcDependents(cell);
    },
    get(cell) {
      return cells.has(cell) ? cells.get(cell).value : "";
    },
    raw(cell) {
      return cells.has(cell) ? cells.get(cell).raw : "";
    },
  };
}
