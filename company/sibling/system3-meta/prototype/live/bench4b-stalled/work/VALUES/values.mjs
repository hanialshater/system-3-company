// VALUES: value types and conversions for Sheet (see SPEC.md, "VALUES").

export const ERRORS = Object.freeze({
  DIV0: "#DIV/0!",
  REF: "#REF!",
  NAME: "#NAME?",
  VALUE: "#VALUE!",
  CYCLE: "#CYCLE!",
});

const ERROR_SET = new Set(Object.values(ERRORS));

export function isError(v) {
  return typeof v === "string" && ERROR_SET.has(v);
}

// A plain number: optional sign, digits with at most one dot (3, 2.5, .5, 7.),
// no exponent, optionally padded with spaces.
const PLAIN_NUMBER = /^ *[+-]?(?:\d+\.?\d*|\.\d+) *$/;

function plainNumber(text) {
  return PLAIN_NUMBER.test(text) ? Number(text.trim()) : null;
}

export function toNumber(v) {
  if (v === "") return 0;
  if (v === true) return 1;
  if (v === false) return 0;
  if (typeof v === "number") return v;
  if (isError(v)) return v;
  if (typeof v === "string") {
    const n = plainNumber(v);
    if (n !== null) return n;
  }
  return ERRORS.VALUE;
}

export function toText(v) {
  if (v === "") return "";
  if (v === true) return "TRUE";
  if (v === false) return "FALSE";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return v;
  return String(v);
}

export function parseLiteral(text) {
  const n = plainNumber(text);
  return n !== null ? n : text;
}
