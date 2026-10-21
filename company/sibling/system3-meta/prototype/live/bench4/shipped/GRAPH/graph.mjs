// GRAPH: find the cells that lie on a reference cycle (Tarjan's SCC, iterative).

export function cycleCells(deps) {
  const succ = (v) => (deps.has(v) ? deps.get(v) || [] : []);
  const index = new Map(), low = new Map(), onStack = new Set();
  const stack = [], result = new Set();
  let next = 0;

  const nodes = new Set(deps.keys());
  for (const list of deps.values()) for (const w of list || []) nodes.add(w);

  for (const root of nodes) {
    if (index.has(root)) continue;
    const work = [[root, 0]];
    index.set(root, next); low.set(root, next); next++;
    stack.push(root); onStack.add(root);
    while (work.length) {
      const frame = work[work.length - 1];
      const v = frame[0], ws = succ(v);
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
        if (comp.length >= 2 || succ(v).includes(v)) for (const c of comp) result.add(c);
      }
    }
  }
  return result;
}
