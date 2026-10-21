import { tokenize } from "../TOKENIZER/tokenize.mjs";
const LEVELS = [["=", "<>", "<", ">", "<=", ">="], ["&"], ["+", "-"], ["*", "/"], ["^"]];
export function parse(src) {
  const toks = tokenize(src); let p = 0;
  const fail = (m) => { throw new SyntaxError(m); };
  const isOp = (v) => toks[p]?.type === "op" && toks[p].value === v;
  const eat = (v) => (isOp(v) ? (p++, true) : false);
  function level(n) {
    if (n === LEVELS.length) return unary();
    let left = level(n + 1);
    while (toks[p]?.type === "op" && LEVELS[n].includes(toks[p].value)) {
      const op = toks[p++].value;
      const right = n === 4 ? level(n) : level(n + 1);
      left = { type: "bin", op, left, right };
      if (n === 4) break;
    }
    return left;
  }
  function unary() { if (eat("-")) return { type: "neg", arg: unary() }; if (eat("+")) return unary(); return atom(); }
  function atom() {
    const t = toks[p++];
    if (!t) fail("unexpected end");
    if (t.type === "num") return { type: "num", value: t.value };
    if (t.type === "str") return { type: "str", value: t.value };
    if (t.type === "op" && t.value === "(") { const e = level(0); if (!eat(")")) fail("missing )"); return e; }
    if (t.type === "id") {
      if (eat("(")) { const args = []; if (!eat(")")) { do args.push(level(0)); while (eat(",")); if (!eat(")")) fail("missing )"); } return { type: "call", name: t.value, args }; }
      if (t.value === "TRUE" || t.value === "FALSE") return { type: "bool", value: t.value === "TRUE" };
      if (eat(":")) { const e = toks[p++]; if (e?.type !== "id") fail("bad range"); return { type: "range", from: t.value, to: e.value }; }
      return { type: "ref", ref: t.value };
    }
    fail(`unexpected ${t.value}`);
  }
  const e = level(0);
  if (p !== toks.length) fail("leftover input");
  return e;
}
