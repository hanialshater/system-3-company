// CELLS: cell names, ranges and the cells an AST reads.

const REF_RE = /^[A-Z](?:[1-9]|[1-9][0-9])$/;

export function isRef(s) {
  return typeof s === "string" && REF_RE.test(s);
}

function split(ref) {
  return { col: ref.charCodeAt(0), row: Number(ref.slice(1)) };
}

export function rangeCells(a, b) {
  if (!isRef(a) || !isRef(b)) return null;
  const p = split(a), q = split(b);
  const c0 = Math.min(p.col, q.col), c1 = Math.max(p.col, q.col);
  const r0 = Math.min(p.row, q.row), r1 = Math.max(p.row, q.row);
  const out = [];
  for (let c = c0; c <= c1; c++) {
    for (let r = r0; r <= r1; r++) out.push(String.fromCharCode(c) + r);
  }
  return out;
}

export function refsOf(ast) {
  const set = new Set();
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    switch (n.type) {
      case "ref":
        if (isRef(n.ref)) set.add(n.ref);
        break;
      case "range": {
        const cells = rangeCells(n.from, n.to);
        if (cells) for (const c of cells) set.add(c);
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
        for (const a of n.args || []) walk(a);
        break;
      default:
        break;
    }
  };
  walk(ast);
  return set;
}
