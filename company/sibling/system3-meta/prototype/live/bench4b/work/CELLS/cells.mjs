// CELLS: cell references and the cells an AST reads (SPEC.md "CELLS").

const REF_RE = /^[A-Z]([1-9]|[1-9][0-9])$/;

/** True for A1…Z99 in uppercase; the row has no leading zero. */
export function isRef(s) {
  return typeof s === "string" && REF_RE.test(s);
}

function norm(s) {
  return typeof s === "string" ? s.toUpperCase() : s;
}

/** Every cell in the rectangle a..b (any corner order), column by column, top to bottom. */
export function rangeCells(a, b) {
  const x = norm(a), y = norm(b);
  if (!isRef(x) || !isRef(y)) return null;
  const c1 = x.charCodeAt(0), c2 = y.charCodeAt(0);
  const r1 = Number(x.slice(1)), r2 = Number(y.slice(1));
  const [cLo, cHi] = c1 <= c2 ? [c1, c2] : [c2, c1];
  const [rLo, rHi] = r1 <= r2 ? [r1, r2] : [r2, r1];
  const out = [];
  for (let c = cLo; c <= cHi; c++) {
    for (let r = rLo; r <= rHi; r++) out.push(String.fromCharCode(c) + r);
  }
  return out;
}

/** A Set of the valid cells a parser AST reads, including every cell of every range. */
export function refsOf(ast) {
  const out = new Set();
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    switch (n.type) {
      case "ref": {
        const r = norm(n.ref);
        if (isRef(r)) out.add(r);
        break;
      }
      case "range": {
        const cells = rangeCells(n.from, n.to);
        if (cells) for (const c of cells) out.add(c);
        break;
      }
      case "neg":
        walk(n.arg);
        break;
      case "bin":
        walk(n.left);
        walk(n.right);
        break;
      case "call":
        if (Array.isArray(n.args)) for (const a of n.args) walk(a);
        break;
      default:
        break;
    }
  };
  walk(ast);
  return out;
}
