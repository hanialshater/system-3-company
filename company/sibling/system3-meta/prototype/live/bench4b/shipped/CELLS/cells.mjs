// CELLS: cell references, ranges and the cells an AST reads (SPEC.md "CELLS").
const REF_RE = /^[A-Z](?:[1-9]|[1-9][0-9])$/;

export function isRef(s) {
  return typeof s === "string" && REF_RE.test(s);
}

export function rangeCells(a, b) {
  if (!isRef(a) || !isRef(b)) return null;
  const c1 = a.charCodeAt(0), c2 = b.charCodeAt(0);
  const r1 = Number(a.slice(1)), r2 = Number(b.slice(1));
  const [cLo, cHi] = c1 <= c2 ? [c1, c2] : [c2, c1];
  const [rLo, rHi] = r1 <= r2 ? [r1, r2] : [r2, r1];
  const out = [];
  for (let c = cLo; c <= cHi; c++) {
    for (let r = rLo; r <= rHi; r++) out.push(String.fromCharCode(c) + r);
  }
  return out;
}

export function refsOf(ast) {
  const refs = new Set();
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    switch (n.type) {
      case "ref":
        if (isRef(n.ref)) refs.add(n.ref);
        return;
      case "range": {
        const cells = rangeCells(n.from, n.to);
        if (cells) for (const c of cells) refs.add(c);
        return;
      }
      case "neg":
        walk(n.arg);
        return;
      case "bin":
        walk(n.left);
        walk(n.right);
        return;
      case "call":
        for (const a of n.args || []) walk(a);
        return;
      default:
        return;
    }
  };
  walk(ast);
  return refs;
}
