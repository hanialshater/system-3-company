// VALUES: value constants and conversions for Sheet.

export const ERRORS = Object.freeze({
  DIV0: "#DIV/0!",
  REF: "#REF!",
  NAME: "#NAME?",
  VALUE: "#VALUE!",
  CYCLE: "#CYCLE!",
});

const ERROR_SET = new Set(Object.values(ERRORS));

// A plain number: optional sign, digits with at most one dot, padded with spaces.
const PLAIN_NUMBER = /^ *[+-]?(?:\d+\.?\d*|\.\d+) *$/;

function plainNumber(text) {
  return PLAIN_NUMBER.test(text) ? Number(text.trim()) : undefined;
}

export function isError(v) {
  return typeof v === "string" && ERROR_SET.has(v);
}

export function toNumber(v) {
  if (typeof v === "number") return v;
  if (typeof v === "boolean") return v ? 1 : 0;
  if (typeof v === "string") {
    if (v === "") return 0;
    if (isError(v)) return v;
    const n = plainNumber(v);
    if (n !== undefined) return n;
  }
  return ERRORS.VALUE;
}

export function toText(v) {
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return v;
  return v == null ? "" : String(v);
}

export function parseLiteral(text) {
  const n = plainNumber(text);
  return n !== undefined ? n : text;
}
