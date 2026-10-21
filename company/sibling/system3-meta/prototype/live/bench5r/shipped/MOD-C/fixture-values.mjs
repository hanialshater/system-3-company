// TEST FIXTURE ONLY (not part of slot C's interface). A minimal stand-in for slot B's
// values.mjs, following ARCH.md, used by eval.test.mjs only while ../MOD-B/values.mjs
// does not exist yet. The real module always wins when present.
const mk = (code) => Object.freeze({ error: code, toString: () => code });
export const ERR = Object.freeze({
  DIV0: mk("#DIV/0!"), VALUE: mk("#VALUE!"), NAME: mk("#NAME?"), REF: mk("#REF!"), CYCLE: mk("#CYCLE!"),
});
export const isError = (v) => Object.values(ERR).includes(v);
const NUM = /^\s*[+-]?(?:\d+\.?\d*|\.\d+)\s*$/;
export function toNumber(v) {
  if (isError(v)) return v;
  if (typeof v === "number") return v;
  if (v === "") return 0;
  if (typeof v === "boolean") return v ? 1 : 0;
  return NUM.test(v) ? Number(v) : ERR.VALUE;
}
export function toText(v) {
  if (isError(v)) return v;
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  return String(v);
}
export function compare(a, b) {
  if (isError(a)) return a;
  if (isError(b)) return b;
  if (typeof a === "string" && typeof b === "string") {
    const x = a.toLowerCase(), y = b.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  }
  const x = toNumber(a); if (isError(x)) return x;
  const y = toNumber(b); if (isError(y)) return y;
  return x < y ? -1 : x > y ? 1 : 0;
}
export function unary(op, v) {
  const n = toNumber(v);
  if (isError(n)) return n;
  return op === "-" ? -n : n;
}
export function binary(op, a, b) {
  if (isError(a)) return a;
  if (isError(b)) return b;
  if (op === "&") return toText(a) + toText(b);
  if (["=", "<>", "<", ">", "<=", ">="].includes(op)) {
    const c = compare(a, b);
    if (isError(c)) return c;
    return { "=": c === 0, "<>": c !== 0, "<": c < 0, ">": c > 0, "<=": c <= 0, ">=": c >= 0 }[op];
  }
  const x = toNumber(a); if (isError(x)) return x;
  const y = toNumber(b); if (isError(y)) return y;
  if (op === "/" && y === 0) return ERR.DIV0;
  const r = { "+": x + y, "-": x - y, "*": x * y, "/": x / y, "^": x ** y }[op];
  return Number.isFinite(r) ? r : ERR.VALUE;
}
export const round9 = (n) => { const r = Math.round(n * 1e9) / 1e9; return r === 0 ? 0 : r; };
export const display = (v) => (isError(v) ? v.error : typeof v === "boolean" ? (v ? "TRUE" : "FALSE") : String(v));
export const parseInput = (t) => (t === "" ? "" : NUM.test(t) ? Number(t) : t);
