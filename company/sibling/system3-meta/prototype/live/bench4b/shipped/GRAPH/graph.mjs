// GRAPH: reference cycles (SPEC.md "GRAPH").

/**
 * deps: Map cell -> array of cells its formula reads.
 * Returns the Set of cells on a cycle: a strongly connected group of 2+ cells,
 * or a cell that reads itself. Cells that only depend on a cycle are excluded.
 */
export function cycleCells(deps) {
  const edges = (v) => (deps && deps.get(v)) || [];
  const index = new Map(), low = new Map(), onStack = new Set();
  const stack = [];
  const out = new Set();
  let next = 0;

  const nodes = new Set();
  if (deps) for (const [k, vs] of deps) { nodes.add(k); for (const w of vs || []) nodes.add(w); }

  for (const root of nodes) {
    if (index.has(root)) continue;
    // Iterative Tarjan: frames of [node, iterator position].
    const work = [[root, 0]];
    index.set(root, next); low.set(root, next); next++;
    stack.push(root); onStack.add(root);
    while (work.length) {
      const frame = work[work.length - 1];
      const [v] = frame;
      const ws = edges(v);
      if (frame[1] < ws.length) {
        const w = ws[frame[1]++];
        if (!index.has(w)) {
          index.set(w, next); low.set(w, next); next++;
          stack.push(w); onStack.add(w);
          work.push([w, 0]);
        } else if (onStack.has(w)) {
          low.set(v, Math.min(low.get(v), index.get(w)));
        }
        continue;
      }
      work.pop();
      if (work.length) {
        const p = work[work.length - 1][0];
        low.set(p, Math.min(low.get(p), low.get(v)));
      }
      if (low.get(v) === index.get(v)) {
        const comp = [];
        let w;
        do { w = stack.pop(); onStack.delete(w); comp.push(w); } while (w !== v);
        if (comp.length >= 2) for (const c of comp) out.add(c);
        else if (ws.includes(v)) out.add(v);
      }
    }
  }
  return out;
}
