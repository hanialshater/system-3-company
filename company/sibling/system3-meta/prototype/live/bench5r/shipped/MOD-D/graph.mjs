// Slot D: graph.mjs — dependency graph, recalculation order, cycle detection.
// Owner dev-2. Imports nothing. Cell names in and out are normalised (normCell output).

export function createGraph() {
  const precedents = new Map(); // cell -> Set of cells it reads
  const dependents = new Map(); // cell -> Set of cells that read it

  function setDeps(cell, cells) {
    const old = precedents.get(cell);
    if (old) {
      for (const p of old) {
        const s = dependents.get(p);
        if (s) { s.delete(cell); if (s.size === 0) dependents.delete(p); }
      }
    }
    const next = new Set(cells || []);
    if (next.size === 0) { precedents.delete(cell); return; }
    precedents.set(cell, next);
    for (const p of next) {
      let s = dependents.get(p);
      if (!s) dependents.set(p, (s = new Set()));
      s.add(cell);
    }
  }

  function recalcOrder(cell) {
    // every cell reachable from `cell` along dependent edges, in discovery order
    const reach = [cell];
    const seen = new Set([cell]);
    for (let i = 0; i < reach.length; i++) {
      for (const d of dependents.get(reach[i]) || []) {
        if (!seen.has(d)) { seen.add(d); reach.push(d); }
      }
    }
    // Kahn's algorithm on reach minus `cell` (cell goes first regardless)
    const order = [cell];
    const placed = new Set([cell]);
    const indeg = new Map();
    for (const c of reach) {
      if (c === cell) continue;
      let n = 0;
      for (const p of precedents.get(c) || []) if (seen.has(p) && p !== cell) n++;
      indeg.set(c, n);
    }
    const queue = reach.filter((c) => c !== cell && indeg.get(c) === 0);
    const release = (c) => {
      for (const d of dependents.get(c) || []) {
        if (placed.has(d) || !indeg.has(d)) continue;
        indeg.set(d, indeg.get(d) - 1);
        if (indeg.get(d) === 0) queue.push(d);
      }
    };
    for (let i = 0; i < queue.length; i++) {
      const c = queue[i];
      if (placed.has(c)) continue;
      placed.add(c); order.push(c); release(c);
    }
    // cells stuck behind a cycle: include each once, in discovery order
    for (const c of reach) if (!placed.has(c)) { placed.add(c); order.push(c); }
    return order;
  }

  function cyclic() {
    // Tarjan SCC (iterative): members of SCCs of size > 1, or self-loops
    const result = new Set();
    const index = new Map(), low = new Map(), onStack = new Set(), stack = [];
    let counter = 0;
    const nodes = new Set([...precedents.keys(), ...dependents.keys()]);
    for (const start of nodes) {
      if (index.has(start)) continue;
      const work = [[start, [...(precedents.get(start) || [])], 0]];
      index.set(start, counter); low.set(start, counter); counter++;
      stack.push(start); onStack.add(start);
      while (work.length) {
        const frame = work[work.length - 1];
        const [v, succ] = frame;
        if (frame[2] < succ.length) {
          const w = succ[frame[2]++];
          if (!index.has(w)) {
            index.set(w, counter); low.set(w, counter); counter++;
            stack.push(w); onStack.add(w);
            work.push([w, [...(precedents.get(w) || [])], 0]);
          } else if (onStack.has(w)) {
            low.set(v, Math.min(low.get(v), index.get(w)));
          }
        } else {
          work.pop();
          if (work.length) {
            const u = work[work.length - 1][0];
            low.set(u, Math.min(low.get(u), low.get(v)));
          }
          if (low.get(v) === index.get(v)) {
            const comp = [];
            let w;
            do { w = stack.pop(); onStack.delete(w); comp.push(w); } while (w !== v);
            if (comp.length > 1 || (precedents.get(v) || new Set()).has(v)) {
              for (const c of comp) result.add(c);
            }
          }
        }
      }
    }
    return result;
  }

  return { setDeps, recalcOrder, cyclic };
}
