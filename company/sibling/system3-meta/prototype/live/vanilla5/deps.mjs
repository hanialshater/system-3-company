// Static dependency analysis: which cells a formula reads, and which cells
// are on (or read) a reference cycle.

export function rangeCells(from, to) {
  const c1 = from.charCodeAt(0), c2 = to.charCodeAt(0);
  const r1 = Number(from.slice(1)), r2 = Number(to.slice(1));
  const out = [];
  for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++)
    for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++)
      out.push(String.fromCharCode(c) + r);
  return out;
}

// All cells an AST may read (every branch, refs and valid ranges).
export function collectRefs(ast, out = new Set()) {
  if (!ast) return out;
  switch (ast.kind) {
    case 'ref': if (ast.valid) out.add(ast.cell); break;
    case 'range': if (ast.valid) for (const c of rangeCells(ast.from, ast.to)) out.add(c); break;
    case 'unary': collectRefs(ast.arg, out); break;
    case 'binary': collectRefs(ast.left, out); collectRefs(ast.right, out); break;
    case 'call': for (const a of ast.args) collectRefs(a, out); break;
  }
  return out;
}

// Decide cycle status for `root` and every not-yet-known cell it reaches.
// depsOf(cell) -> Set of cells it reads (empty for non-formula cells).
// status: Map<cell, boolean> (true = on a cycle or reads one); cells already
// in it are trusted. Tarjan's algorithm: an SCC is emitted only after every
// SCC it reaches, so dependency statuses are final when it is decided.
export function resolveCycles(root, depsOf, status) {
  if (status.has(root)) return status.get(root);
  let index = 0;
  const idx = new Map(), low = new Map(), onStack = new Set(), stack = [];

  function strong(v) {
    idx.set(v, index); low.set(v, index); index++;
    stack.push(v); onStack.add(v);
    for (const w of depsOf(v)) {
      if (status.has(w)) continue;
      if (!idx.has(w)) { strong(w); low.set(v, Math.min(low.get(v), low.get(w))); }
      else if (onStack.has(w)) low.set(v, Math.min(low.get(v), idx.get(w)));
    }
    if (low.get(v) === idx.get(v)) {
      const scc = [];
      let w;
      do { w = stack.pop(); onStack.delete(w); scc.push(w); } while (w !== v);
      let bad = scc.length > 1 || depsOf(v).has(v);
      if (!bad) bad = scc.some((x) => { for (const d of depsOf(x)) if (status.get(d)) return true; return false; });
      for (const x of scc) status.set(x, bad);
    }
  }
  strong(root);
  return status.get(root);
}
