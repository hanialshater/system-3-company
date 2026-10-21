// Slot A: formula syntax and cell names (ARCH.md "## Slot A: parse.mjs").
// exports: parse, normCell, refs. Imports nothing. Never throws.

const BAD = Object.freeze({ type: "error", code: "#VALUE!" });

export function normCell(name) {
  if (typeof name !== "string") return null;
  const m = /^([A-Za-z])([1-9][0-9]?)$/.exec(name);
  return m ? m[1].toUpperCase() + m[2] : null;
}

class SyntaxFail extends Error {}

function tokenize(src) {
  const toks = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (/\s/.test(ch)) { i++; continue; }
    let m;
    const rest = src.slice(i);
    if ((m = /^(?:[0-9]+\.?[0-9]*|\.[0-9]+)/.exec(rest))) {
      toks.push({ t: "num", v: Number(m[0]) });
      i += m[0].length;
      continue;
    }
    if (ch === '"') {
      const end = src.indexOf('"', i + 1);
      if (end < 0) throw new SyntaxFail();
      toks.push({ t: "str", v: src.slice(i + 1, end) });
      i = end + 1;
      continue;
    }
    if ((m = /^[A-Za-z_][A-Za-z0-9_.]*/.exec(rest))) {
      toks.push({ t: "id", v: m[0] });
      i += m[0].length;
      continue;
    }
    if ((m = /^(?:<=|>=|<>|[=<>&+\-*/^(),:])/.exec(rest))) {
      toks.push({ t: "op", v: m[0] });
      i += m[0].length;
      continue;
    }
    throw new SyntaxFail();
  }
  return toks;
}

export function parse(src) {
  try {
    if (typeof src !== "string") return BAD;
    const toks = tokenize(src);
    let p = 0;
    const peek = () => toks[p];
    const isOp = (...ops) => peek() && peek().t === "op" && ops.includes(peek().v);
    const expect = (v) => {
      if (!isOp(v)) throw new SyntaxFail();
      p++;
    };
    const left = (next, ops) => () => {
      let node = next();
      while (isOp(...ops)) {
        const op = toks[p++].v;
        node = { type: "binary", op, left: node, right: next() };
      }
      return node;
    };
    // power := unary ('^' power)?   (right-assoc; unary binds to the atom, so -2^2 = (-2)^2)
    const power = () => {
      const base = unary();
      if (isOp("^")) {
        p++;
        return { type: "binary", op: "^", left: base, right: power() };
      }
      return base;
    };
    const unary = () => {
      if (isOp("-", "+")) {
        const op = toks[p++].v;
        return { type: "unary", op, arg: unary() };
      }
      return primary();
    };
    const mul = left(power, ["*", "/"]);
    const add = left(mul, ["+", "-"]);
    const cat = left(add, ["&"]);
    const cmp = left(cat, ["=", "<>", "<", ">", "<=", ">="]);
    function primary() {
      const tok = toks[p++];
      if (!tok) throw new SyntaxFail();
      if (tok.t === "num") return { type: "num", value: tok.v };
      if (tok.t === "str") return { type: "str", value: tok.v };
      if (tok.t === "op" && tok.v === "(") {
        const e = cmp();
        expect(")");
        return e;
      }
      if (tok.t === "id") {
        if (isOp("(")) {
          p++;
          const args = [];
          if (!isOp(")")) {
            args.push(cmp());
            while (isOp(",")) { p++; args.push(cmp()); }
          }
          expect(")");
          return { type: "call", name: tok.v.toUpperCase(), args };
        }
        const up = tok.v.toUpperCase();
        if (up === "TRUE" || up === "FALSE") return { type: "bool", value: up === "TRUE" };
        // wave 1: no cell references (ref/range nodes arrive in wave 2)
      }
      throw new SyntaxFail();
    }
    const ast = cmp();
    if (p !== toks.length) return BAD;
    return ast;
  } catch {
    return BAD;
  }
}

export function refs(ast) {
  const out = new Set();
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (n.type === "ref") out.add(n.cell);
    else if (n.type === "unary") walk(n.arg);
    else if (n.type === "binary") { walk(n.left); walk(n.right); }
    else if (n.type === "call") n.args.forEach(walk);
  };
  walk(ast);
  return [...out];
}
