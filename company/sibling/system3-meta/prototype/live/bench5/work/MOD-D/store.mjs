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
  // Wave 3: the cycle error is B's; D imports nothing, so it is obtained through the
  // injected evaluate from an error node (C maps it with errorFromCode).
  const CYCLE_NODE = Object.freeze({ type: "error", code: "#CIRC!" });
  const cycleValue = () => evaluate(CYCLE_NODE, ctx);

  // Recalculate `cell` and every transitive dependent. Strongly connected components
  // (Tarjan) of that subgraph come out refs-first, i.e. in evaluation order. A cell in a
  // non-trivial component (or reading itself) is on a cycle; a cell reading a cell on or
  // behind a cycle is also #CIRC!. Everything else is evaluated normally, so breaking a
  // cycle restores normal values.
  function recalc(cell) {
    const affected = new Set([cell]);
    const queue = [cell];
    while (queue.length) {
      for (const d of dependents.get(queue.pop()) || []) {
        if (!affected.has(d)) { affected.add(d); queue.push(d); }
      }
    }
    for (const c of affected) if (!cells.has(c)) affected.delete(c);

    const index = new Map(), low = new Map(), onStack = new Set(), stack = [];
    let next = 0;
    const sccs = [];
    function strong(v) {
      index.set(v, next); low.set(v, next); next++;
      stack.push(v); onStack.add(v);
      for (const w of cells.get(v).refs) {
        if (!affected.has(w)) continue;
        if (!index.has(w)) { strong(w); low.set(v, Math.min(low.get(v), low.get(w))); }
        else if (onStack.has(w)) low.set(v, Math.min(low.get(v), index.get(w)));
      }
      if (low.get(v) === index.get(v)) {
        const comp = [];
        let w;
        do { w = stack.pop(); onStack.delete(w); comp.push(w); } while (w !== v);
        sccs.push(comp);
      }
    }
    for (const c of affected) if (!index.has(c)) strong(c);

    for (const comp of sccs) {
      const first = cells.get(comp[0]);
      const looped = comp.length > 1 || first.refs.includes(comp[0]);
      for (const c of comp) {
        const entry = cells.get(c);
        entry.cyc = looped || entry.refs.some((r) => cells.get(r)?.cyc === true);
        if (!entry.ast) continue;
        entry.value = entry.cyc ? cycleValue() : evaluate(entry.ast, ctx);
      }
    }
  }

  return {
    set(cell, { raw = "", ast = null, refs = [], value = "" } = {}) {
      unlink(cell);
      cells.set(cell, { raw, ast, refs: [...refs], value: ast ? "" : value });
      link(cell, refs);
      recalc(cell);
    },
    clear(cell) {
      unlink(cell);
      cells.delete(cell);
      recalc(cell);
    },
    get(cell) {
      return cells.has(cell) ? cells.get(cell).value : "";
    },
    raw(cell) {
      return cells.has(cell) ? cells.get(cell).raw : "";
    },
  };
}
