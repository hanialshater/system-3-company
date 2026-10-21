export function cycleCells(deps) {
  const idx = new Map(), low = new Map(), on = new Set(), stack = [], out = new Set(); let n = 0;
  const visit = (v) => {
    idx.set(v, n); low.set(v, n); n++; stack.push(v); on.add(v);
    for (const w of deps.get(v) ?? []) {
      if (!idx.has(w)) { visit(w); low.set(v, Math.min(low.get(v), low.get(w))); }
      else if (on.has(w)) low.set(v, Math.min(low.get(v), idx.get(w)));
    }
    if (low.get(v) === idx.get(v)) { const comp = []; let w; do { w = stack.pop(); on.delete(w); comp.push(w); } while (w !== v); if (comp.length > 1 || (deps.get(v) ?? []).includes(v)) comp.forEach((x) => out.add(x)); }
  };
  for (const v of deps.keys()) if (!idx.has(v)) visit(v);
  return out;
}
