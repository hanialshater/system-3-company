// VALUES: value constants and conversions for Sheet (see SPEC.md, "VALUES").

export const ERRORS = Object.freeze({
  DIV0: "#DIV/0!",
  REF: "#REF!",
  NAME: "#NAME?",
  VALUE: "#VALUE!",
  CYCLE: "#CIRC!",
});

const ERROR_SET = new Set(Object.values(ERRORS));

// A plain number: optional sign, digits with at most one dot (3, 2.5, .5, 7.), padded with spaces.
const PLAIN_NUMBER = /^ *[+-]?(?:\d+\.?\d*|\.\d+) *$/;

export function isError(v) {
  return typeof v === "string" && ERROR_SET.has(v);
}

function plainNumber(text) {
  return PLAIN_NUMBER.test(text) ? Number(text.trim()) : undefined;
}

export function toNumber(v) {
  if (v === "") return 0;
  if (v === true) return 1;
  if (v === false) return 0;
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    if (isError(v)) return v;
    const n = plainNumber(v);
    return n === undefined ? ERRORS.VALUE : n;
  }
  return ERRORS.VALUE;
}

export function toText(v) {
  if (v === "") return "";
  if (v === true) return "TRUE";
  if (v === false) return "FALSE";
  if (typeof v === "number") return String(v);
  return v;
}

export function parseLiteral(text) {
  const n = plainNumber(text);
  return n === undefined ? text : n;
}
