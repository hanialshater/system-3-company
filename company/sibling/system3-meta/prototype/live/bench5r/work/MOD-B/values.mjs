// Slot B: values.mjs — value/error representation, literal input, coercion, operators, display.
// Owner dev-2. Imports nothing. All functions are pure and never throw (ARCH.md, Slot B).

function makeErr(code) {
  const e = { error: code };
  Object.defineProperty(e, "toString", { value: () => code, enumerable: false });
  return Object.freeze(e);
}

export const ERR = Object.freeze({
  DIV0: makeErr("#DIV/0!"),
  VALUE: makeErr("#VALUE!"),
  NAME: makeErr("#NAME?"),
  REF: makeErr("#REF!"),
  CYCLE: makeErr("#CIRC!"),
});

const ERR_SET = new Set(Object.values(ERR));

export function isError(v) {
  return ERR_SET.has(v);
}

// optionally signed, optional surrounding spaces, digits with at most one dot, at least one digit
const NUM_RE = /^\s*[+-]?(?:\d+\.?\d*|\.\d+)\s*$/;

function numericText(s) {
  return typeof s === "string" && NUM_RE.test(s) ? Number(s.trim()) : null;
}

export function parseInput(text) {
  if (text === "" || text === undefined || text === null) return "";
  const s = String(text);
  const n = numericText(s);
  return n === null ? s : (n === 0 ? 0 : n);
}

export function toNumber(v) {
  if (isError(v)) return v;
  if (typeof v === "number") return Number.isFinite(v) ? v : ERR.VALUE;
  if (typeof v === "boolean") return v ? 1 : 0;
  if (v === "" || v === undefined || v === null) return 0;
  if (typeof v === "string") {
    const n = numericText(v);
    return n === null ? ERR.VALUE : n;
  }
  return ERR.VALUE;
}

export function toText(v) {
  if (isError(v)) return v;
  if (v === "" || v === undefined || v === null) return "";
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return v;
  return ERR.VALUE;
}

export function compare(a, b) {
  // an error operand is the result (left wins), checked before any coercion
  if (isError(a)) return a;
  if (isError(b)) return b;
  if (typeof a === "string" && typeof b === "string") {
    const x = a.toLowerCase(), y = b.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  }
  const x = toNumber(a);
  if (isError(x)) return x;
  const y = toNumber(b);
  if (isError(y)) return y;
  return x < y ? -1 : x > y ? 1 : 0;
}

function finite(n) {
  return Number.isFinite(n) ? n : ERR.VALUE;
}

export function unary(op, v) {
  if (isError(v)) return v;
  const n = toNumber(v);
  if (isError(n)) return n;
  if (op === "-") return n === 0 ? 0 : -n;
  if (op === "+") return n;
  return ERR.VALUE;
}

export function binary(op, a, b) {
  // an error operand is the result (left wins), checked before any coercion
  if (isError(a)) return a;
  if (isError(b)) return b;
  switch (op) {
    case "+": case "-": case "*": case "/": case "^": {
      const x = toNumber(a);
      if (isError(x)) return x;
      const y = toNumber(b);
      if (isError(y)) return y;
      if (op === "+") return finite(x + y);
      if (op === "-") return finite(x - y);
      if (op === "*") return finite(x * y);
      if (op === "/") return y === 0 ? ERR.DIV0 : finite(x / y);
      return finite(Math.pow(x, y));
    }
    case "&": {
      const x = toText(a);
      if (isError(x)) return x;
      const y = toText(b);
      if (isError(y)) return y;
      return x + y;
    }
    case "=": case "<>": case "<": case ">": case "<=": case ">=": {
      const c = compare(a, b);
      if (isError(c)) return c;
      if (op === "=") return c === 0;
      if (op === "<>") return c !== 0;
      if (op === "<") return c < 0;
      if (op === ">") return c > 0;
      if (op === "<=") return c <= 0;
      return c >= 0;
    }
    default:
      return ERR.VALUE;
  }
}

export function round9(n) {
  if (typeof n !== "number" || !Number.isFinite(n)) return n;
  const r = Math.abs(n) < 1e21 ? Number(n.toFixed(9)) : n;
  return r === 0 ? 0 : r;
}

export function display(v) {
  if (isError(v)) return v.error;
  if (v === "" || v === undefined || v === null) return "";
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  if (typeof v === "number") return String(round9(v));
  return String(v);
}
