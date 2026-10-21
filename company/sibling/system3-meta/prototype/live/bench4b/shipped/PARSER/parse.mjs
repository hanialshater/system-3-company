// PARSER: parse(src) -> AST. See SPEC.md "PARSER".
import { tokenize } from "../TOKENIZER/tokenize.mjs";

const CMP = new Set(["=", "<>", "<", ">", "<=", ">="]);

export function parse(src) {
  const toks = tokenize(src);
  let i = 0;
  const peek = () => toks[i];
  const isOp = (v) => toks[i] && toks[i].type === "op" && toks[i].value === v;
  const fail = (msg) => { throw new SyntaxError(msg); };
  const expectOp = (v) => {
    if (!isOp(v)) fail(`Expected "${v}"${toks[i] ? ` but found "${toks[i].value}"` : " at end of input"}`);
    i++;
  };

  function comparison() {
    let left = concat();
    while (peek() && peek().type === "op" && CMP.has(peek().value)) {
      const op = toks[i++].value;
      left = { type: "bin", op, left, right: concat() };
    }
    return left;
  }
  function concat() {
    let left = additive();
    while (isOp("&")) { i++; left = { type: "bin", op: "&", left, right: additive() }; }
    return left;
  }
  function additive() {
    let left = multiplicative();
    while (isOp("+") || isOp("-")) {
      const op = toks[i++].value;
      left = { type: "bin", op, left, right: multiplicative() };
    }
    return left;
  }
  function multiplicative() {
    let left = power();
    while (isOp("*") || isOp("/")) {
      const op = toks[i++].value;
      left = { type: "bin", op, left, right: power() };
    }
    return left;
  }
  function power() {
    const left = unary();
    if (isOp("^")) { i++; return { type: "bin", op: "^", left, right: power() }; }
    return left;
  }
  function unary() {
    if (isOp("-")) { i++; return { type: "neg", arg: unary() }; }
    if (isOp("+")) { i++; return unary(); }
    return atom();
  }
  function atom() {
    const t = peek();
    if (!t) fail("Unexpected end of input");
    if (t.type === "num") { i++; return { type: "num", value: t.value }; }
    if (t.type === "str") { i++; return { type: "str", value: t.value }; }
    if (t.type === "id") {
      i++;
      if (isOp("(")) {
        i++;
        const args = [];
        if (!isOp(")")) {
          args.push(comparison());
          while (isOp(",")) { i++; args.push(comparison()); }
        }
        expectOp(")");
        return { type: "call", name: t.value, args };
      }
      if (isOp(":")) {
        i++;
        const to = peek();
        if (!to || to.type !== "id") fail("Expected a cell after \":\"");
        i++;
        return { type: "range", from: t.value, to: to.value };
      }
      if (t.value === "TRUE" || t.value === "FALSE") return { type: "bool", value: t.value === "TRUE" };
      return { type: "ref", ref: t.value };
    }
    if (isOp("(")) { i++; const e = comparison(); expectOp(")"); return e; }
    fail(`Unexpected "${t.value}"`);
  }

  if (toks.length === 0) fail("Empty formula");
  const ast = comparison();
  if (i < toks.length) fail(`Unexpected "${toks[i].value}" after the formula`);
  return ast;
}
