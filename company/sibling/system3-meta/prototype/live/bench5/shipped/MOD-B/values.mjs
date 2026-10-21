// Slot B: value model, errors, coercion, operators, rounding, display, literal typing.
// Contract: live/bench5/work/ARCH/ARCH.md, "Slot B: values.mjs". Imports nothing.

const mk = (code) => Object.freeze({ error: code });

export const ERR = Object.freeze({
  DIV0: mk("#DIV/0!"),
  VALUE: mk("#VALUE!"),
  NAME: mk("#NAME?"),
});

const BY_CODE = new Map(Object.values(ERR).map((e) => [e.error, e]));

export function isError(v) {
  return v !== null && typeof v === "object" && BY_CODE.get(v.error) === v;
}

export function errorFromCode(code) {
  return BY_CODE.get(code) ?? ERR.VALUE;
}

// A plain number: optional sign, digits with at most one dot, at least one digit.
const PLAIN = /^[+-]?(\d+\.?\d*|\.\d+)$/;

function plainNumber(text) {
  const t = text.trim();
  return PLAIN.test(t) ? Number(t) : undefined;
}

export function parseLiteral(text) {
  if (typeof text !== "string") return text;
  const n = plainNumber(text);
  return n === undefined ? text : n;
}

export function toNumber(v) {
  if (isError(v)) return v;
  if (typeof v === "number") return v;
  if (typeof v === "boolean") return v ? 1 : 0;
  if (v === "" || v === undefined || v === null) return 0;
  if (typeof v === "string") {
    const n = plainNumber(v);
    return n === undefined ? ERR.VALUE : n;
  }
  return ERR.VALUE;
}

export function toText(v) {
  if (isError(v)) return v;
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  if (typeof v === "number") return String(v);
  if (v === undefined || v === null) return "";
  return String(v);
}

const finite = (n) => (Number.isFinite(n) ? n : ERR.VALUE);

const CMP = new Set(["=", "<>", "<", ">", "<=", ">="]);

function compare(op, a, b) {
  let x, y;
  if (typeof a === "string" && typeof b === "string") {
    // two strings: case-insensitive text comparison
    x = a.toLowerCase();
    y = b.toLowerCase();
  } else {
    // left operand fully resolved (its error, then its coercion) before the right one
    x = toNumber(a);
    if (isError(x)) return x;
    if (isError(b)) return b;
    y = toNumber(b);
    if (isError(y)) return y;
  }
  switch (op) {
    case "=": return x === y;
    case "<>": return x !== y;
    case "<": return x < y;
    case ">": return x > y;
    case "<=": return x <= y;
    case ">=": return x >= y;
  }
  return ERR.VALUE;
}

export function binary(op, a, b) {
  if (isError(a)) return a;
  if (op === "&") {
    if (isError(b)) return b;
    return toText(a) + toText(b);
  }
  if (CMP.has(op)) return compare(op, a, b);
  const x = toNumber(a);
  if (isError(x)) return x;
  if (isError(b)) return b;
  const y = toNumber(b);
  if (isError(y)) return y;
  switch (op) {
    case "+": return finite(x + y);
    case "-": return finite(x - y);
    case "*": return finite(x * y);
    case "/": return y === 0 ? ERR.DIV0 : finite(x / y);
    case "^": return finite(Math.pow(x, y));
  }
  return ERR.VALUE;
}

export function unary(op, v) {
  const x = toNumber(v);
  if (isError(x)) return x;
  if (op === "-") return x === 0 ? 0 : -x;
  if (op === "+") return x;
  return ERR.VALUE;
}

export function round9(n) {
  if (typeof n !== "number" || !Number.isFinite(n)) return n;
  const r = Number(n.toFixed(9));
  return r === 0 ? 0 : r;
}

export function display(v) {
  if (isError(v)) return v.error;
  if (v === "" || v === undefined || v === null) return "";
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  if (typeof v === "number") return String(round9(v));
  return String(v);
}
