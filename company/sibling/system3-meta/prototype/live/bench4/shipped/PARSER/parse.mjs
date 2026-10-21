// PARSER: formula source (without leading "=") -> AST.
import { tokenize } from "../TOKENIZER/tokenize.mjs";

const CMP = new Set(["=", "<>", "<", ">", "<=", ">="]);

export function parse(src) {
  const toks = tokenize(src);
  let pos = 0;
  const peek = () => toks[pos];
  const isOp = (v, t = peek()) => t !== undefined && t.type === "op" && t.value === v;
  const fail = (msg) => { throw new SyntaxError(msg); };
  const expectOp = (v) => { if (!isOp(v)) fail(`Expected "${v}"`); pos++; };

  function binLevel(next, ops) {
    let left = next();
    for (;;) {
      const t = peek();
      if (t && t.type === "op" && ops.has(t.value)) {
        pos++;
        left = { type: "bin", op: t.value, left, right: next() };
      } else return left;
    }
  }
  const comparison = () => binLevel(concat, CMP);
  const concat = () => binLevel(additive, new Set(["&"]));
  const additive = () => binLevel(multiplicative, new Set(["+", "-"]));
  const multiplicative = () => binLevel(power, new Set(["*", "/"]));
  function power() {
    const left = unary();
    if (isOp("^")) { pos++; return { type: "bin", op: "^", left, right: power() }; }
    return left;
  }
  function unary() {
    if (isOp("-")) { pos++; return { type: "neg", arg: unary() }; }
    if (isOp("+")) { pos++; return unary(); }
    return atom();
  }
  function atom() {
    const t = peek();
    if (!t) fail("Unexpected end of formula");
    if (t.type === "num" || t.type === "str") { pos++; return { type: t.type, value: t.value }; }
    if (t.type === "id") {
      pos++;
      if (isOp("(")) {
        pos++;
        const args = [];
        if (isOp(")")) { pos++; return { type: "call", name: t.value, args }; }
        for (;;) {
          args.push(comparison());
          if (isOp(",")) { pos++; continue; }
          expectOp(")");
          return { type: "call", name: t.value, args };
        }
      }
      if (isOp(":")) {
        pos++;
        const to = peek();
        if (!to || to.type !== "id") fail("Expected a cell after \":\"");
        pos++;
        return { type: "range", from: t.value, to: to.value };
      }
      if (t.value === "TRUE" || t.value === "FALSE") return { type: "bool", value: t.value === "TRUE" };
      return { type: "ref", ref: t.value };
    }
    if (isOp("(")) {
      pos++;
      const e = comparison();
      expectOp(")");
      return e;
    }
    fail(`Unexpected token "${t.value}"`);
  }

  if (toks.length === 0) fail("Empty formula");
  const ast = comparison();
  if (pos < toks.length) fail(`Unexpected token "${toks[pos].value}"`);
  return ast;
}
