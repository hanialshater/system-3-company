// Value model: numbers, strings, booleans, "" (empty), and SheetError.
export class SheetError {
  constructor(code) { this.code = code; }
  toString() { return this.code; }
}
const cache = new Map();
export function err(code) {
  if (!cache.has(code)) cache.set(code, new SheetError(code));
  return cache.get(code);
}
export const ERR = {
  DIV0: '#DIV/0!',
  VALUE: '#VALUE!',
  NAME: '#NAME?',
  REF: '#REF!',
  CIRC: '#CIRC!',
};
export const isError = (v) => v instanceof SheetError;

const PLAIN_NUMBER = /^\s*[+-]?(\d+\.?\d*|\.\d+)\s*$/;
export function parseNumber(text) {
  return PLAIN_NUMBER.test(text) ? Number(text.trim()) : null;
}

export function round9(n) {
  if (!Number.isFinite(n)) return n;
  if (Math.abs(n) >= 1e15) return n;
  let r = Number(n.toFixed(9));
  if (Object.is(r, -0)) r = 0;
  return r;
}

// Coerce to number for arithmetic/comparison; returns number or SheetError.
export function toNumber(v) {
  if (isError(v)) return v;
  if (typeof v === 'number') return v;
  if (typeof v === 'boolean') return v ? 1 : 0;
  if (v === '' || v == null) return 0;
  if (typeof v === 'string') {
    const n = parseNumber(v);
    return n === null ? err(ERR.VALUE) : n;
  }
  return err(ERR.VALUE);
}

export function toText(v) {
  if (isError(v)) return v;
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
  if (typeof v === 'number') return String(v);
  if (v == null) return '';
  return String(v);
}

export function displayValue(v) {
  if (isError(v)) return v.code;
  if (v === '' || v == null) return '';
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
  if (typeof v === 'number') return String(round9(v));
  return String(v);
}
