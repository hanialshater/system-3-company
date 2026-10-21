// GRAPH: cells on reference cycles (SPEC.md "GRAPH").
// Tarjan's strongly connected components, iterative (no recursion limit).

export function cycleCells(deps) {
  const out = new Set();
  const succ = (v) => (deps.has(v) ? deps.get(v) || [] : []);
  const index = new Map();
  const low = new Map();
  const onStack = new Set();
  const stack = [];
  let next = 0;

  const nodes = new Set();
  for (const [k, vs] of deps) {
    nodes.add(k);
    for (const v of vs || []) nodes.add(v);
  }

  for (const root of nodes) {
    if (index.has(root)) continue;
    const work = [[root, 0]];
    index.set(root, next); low.set(root, next); next++;
    stack.push(root); onStack.add(root);
    while (work.length) {
      const frame = work[work.length - 1];
      const [v, i] = frame;
      const ss = succ(v);
      if (i < ss.length) {
        frame[1]++;
        const w = ss[i];
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
        if (comp.length >= 2 || succ(v).includes(v)) for (const c of comp) out.add(c);
      }
    }
  }
  return out;
}
