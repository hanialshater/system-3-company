// Slot A: syntax (see work/ARCH/ARCH.md). Imports nothing.
// exports: normalizeCell, parseFormula, refsOf

const CELL_RE = /^([A-Za-z])([1-9][0-9]?)$/;

export function normalizeCell(name) {
  if (typeof name !== "string") throw new Error(`invalid cell name: ${String(name)}`);
  const m = CELL_RE.exec(name);
  if (!m) throw new Error(`invalid cell name: ${name}`);
  return m[1].toUpperCase() + m[2];
}

const BAD = Object.freeze({ type: "error", code: "#VALUE!" });

class SyntaxFail extends Error {}

function tokenize(src) {
  const toks = [];
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    if (c === " " || c === "\t" || c === "\n" || c === "\r") { i++; continue; }
    if ((c >= "0" && c <= "9") || c === ".") {
      let j = i, dots = 0, digits = 0;
      while (j < n && ((src[j] >= "0" && src[j] <= "9") || src[j] === ".")) {
        if (src[j] === ".") { if (dots === 1) break; dots++; } else digits++;
        j++;
      }
      if (digits === 0) throw new SyntaxFail("bad number");
      toks.push({ t: "num", v: Number(src.slice(i, j)) });
      i = j;
      continue;
    }
    if (c === '"') {
      const end = src.indexOf('"', i + 1);
      if (end < 0) throw new SyntaxFail("unterminated string");
      toks.push({ t: "str", v: src.slice(i + 1, end) });
      i = end + 1;
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i + 1;
      while (j < n && /[A-Za-z0-9_.]/.test(src[j])) j++;
      toks.push({ t: "id", v: src.slice(i, j) });
      i = j;
      continue;
    }
    const two = src.slice(i, i + 2);
    if (two === "<>" || two === "<=" || two === ">=") { toks.push({ t: "op", v: two }); i += 2; continue; }
    if ("+-*/^&=<>(),".includes(c)) { toks.push({ t: "op", v: c }); i++; continue; }
    throw new SyntaxFail(`unexpected character ${c}`);
  }
  return toks;
}

const CMP = new Set(["=", "<>", "<", ">", "<=", ">="]);

function parser(toks) {
  let p = 0;
  const peek = () => toks[p];
  const isOp = (v) => toks[p] && toks[p].t === "op" && toks[p].v === v;
  const expect = (v) => { if (!isOp(v)) throw new SyntaxFail(`expected ${v}`); p++; };

  function cmp() {
    let left = cat();
    while (toks[p] && toks[p].t === "op" && CMP.has(toks[p].v)) {
      const op = toks[p++].v;
      left = { type: "binary", op, left, right: cat() };
    }
    return left;
  }
  function cat() {
    let left = add();
    while (isOp("&")) { p++; left = { type: "binary", op: "&", left, right: add() }; }
    return left;
  }
  function add() {
    let left = mul();
    while (isOp("+") || isOp("-")) { const op = toks[p++].v; left = { type: "binary", op, left, right: mul() }; }
    return left;
  }
  function mul() {
    let left = pow();
    while (isOp("*") || isOp("/")) { const op = toks[p++].v; left = { type: "binary", op, left, right: pow() }; }
    return left;
  }
  function pow() {
    const base = unary();
    if (isOp("^")) { p++; return { type: "binary", op: "^", left: base, right: pow() }; }
    return base;
  }
  function unary() {
    if (isOp("+") || isOp("-")) { const op = toks[p++].v; return { type: "unary", op, arg: unary() }; }
    return atom();
  }
  function atom() {
    const t = peek();
    if (!t) throw new SyntaxFail("unexpected end");
    if (t.t === "num") { p++; return { type: "num", value: t.v }; }
    if (t.t === "str") { p++; return { type: "str", value: t.v }; }
    if (t.t === "id") {
      p++;
      if (isOp("(")) {
        p++;
        const args = [];
        if (!isOp(")")) {
          args.push(cmp());
          while (isOp(",")) { p++; args.push(cmp()); }
        }
        expect(")");
        return { type: "call", name: t.v.toUpperCase(), args };
      }
      const up = t.v.toUpperCase();
      if (up === "TRUE") return { type: "bool", value: true };
      if (up === "FALSE") return { type: "bool", value: false };
      throw new SyntaxFail(`unknown name ${t.v}`);
    }
    if (isOp("(")) { p++; const e = cmp(); expect(")"); return e; }
    throw new SyntaxFail(`unexpected ${t.v}`);
  }

  const ast = cmp();
  if (p !== toks.length) throw new SyntaxFail("trailing input");
  return ast;
}

export function parseFormula(src) {
  try {
    if (typeof src !== "string") return { ...BAD };
    return parser(tokenize(src));
  } catch {
    return { ...BAD };
  }
}

export function refsOf(ast) {
  const out = new Set();
  (function walk(node) {
    if (!node || typeof node !== "object") return;
    switch (node.type) {
      case "ref": out.add(node.cell); break;
      case "range": break; // wave 2: expand from..to
      case "unary": walk(node.arg); break;
      case "binary": walk(node.left); walk(node.right); break;
      case "call": node.args.forEach(walk); break;
    }
  })(ast);
  return [...out];
}
