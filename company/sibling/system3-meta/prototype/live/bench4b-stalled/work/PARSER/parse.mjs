// PARSER: parse(src) -> AST. See SPEC.md, "PARSER".
import { tokenize } from "../TOKENIZER/tokenize.mjs";

const CMP = new Set(["=", "<>", "<", ">", "<=", ">="]);

export function parse(src) {
  const toks = tokenize(src);
  let pos = 0;

  const peek = (k = 0) => toks[pos + k];
  const isOp = (t, v) => t !== undefined && t.type === "op" && t.value === v;
  const fail = (msg) => {
    const t = peek();
    throw new SyntaxError(`${msg} at token ${pos}${t ? ` (${t.type} ${JSON.stringify(t.value)})` : " (end of input)"}`);
  };
  const expectOp = (v) => {
    if (!isOp(peek(), v)) fail(`Expected "${v}"`);
    pos++;
  };

  // Left-associative binary level.
  const level = (ops, next) => () => {
    let left = next();
    while (peek() && peek().type === "op" && ops.has(peek().value)) {
      const op = toks[pos++].value;
      left = { type: "bin", op, left, right: next() };
    }
    return left;
  };

  const unary = () => {
    if (isOp(peek(), "-")) { pos++; return { type: "neg", arg: unary() }; }
    if (isOp(peek(), "+")) { pos++; return unary(); }
    return atom();
  };

  // Right-associative; unary binds tighter, so -2^2 is (-2)^2.
  const power = () => {
    const left = unary();
    if (isOp(peek(), "^")) {
      pos++;
      return { type: "bin", op: "^", left, right: power() };
    }
    return left;
  };

  const mul = level(new Set(["*", "/"]), power);
  const add = level(new Set(["+", "-"]), mul);
  const concat = level(new Set(["&"]), add);
  const compare = level(CMP, concat);

  function atom() {
    const t = peek();
    if (!t) fail("Unexpected end of input");
    if (t.type === "num" || t.type === "str") { pos++; return { type: t.type, value: t.value }; }
    if (t.type === "id") {
      pos++;
      if (isOp(peek(), "(")) {
        pos++;
        const args = [];
        if (isOp(peek(), ")")) { pos++; return { type: "call", name: t.value, args }; }
        for (;;) {
          args.push(compare());
          if (isOp(peek(), ",")) { pos++; continue; }
          expectOp(")");
          return { type: "call", name: t.value, args };
        }
      }
      if (isOp(peek(), ":")) {
        pos++;
        const to = peek();
        if (!to || to.type !== "id") fail("Expected identifier after \":\"");
        pos++;
        return { type: "range", from: t.value, to: to.value };
      }
      if (t.value === "TRUE" || t.value === "FALSE") return { type: "bool", value: t.value === "TRUE" };
      return { type: "ref", ref: t.value };
    }
    if (isOp(t, "(")) {
      pos++;
      const e = compare();
      expectOp(")");
      return e;
    }
    fail("Unexpected token");
  }

  if (toks.length === 0) throw new SyntaxError("Empty formula");
  const ast = compare();
  if (pos < toks.length) fail("Unexpected leftover token");
  return ast;
}
