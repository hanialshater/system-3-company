// Gregorian leap year test.

// Captured at load so later tampering with globals cannot change the error path.
const RangeErrorCtor = RangeError;
const isInteger = Number.isInteger;

// Describe a value for an error message. Uses only the `typeof` operator,
// which never throws and never runs user code (no coercion, no traps, no
// Array.isArray on revoked proxies, no huge-string serialisation). Numbers
// are primitives, so String() on them cannot throw either.
function describe(v) {
  const t = typeof v;
  if (t === 'number') return `number ${String(v)}`;
  if (v === null) return 'null';
  return t;
}

const BASE = 'isLeapYear: expected an integer year >= 1';

function invalid(year) {
  let msg = BASE;
  try {
    msg = `${BASE}, got ${describe(year)}`;
  } catch {
    // keep the constant message; the error path must only ever throw RangeError
  }
  return new RangeErrorCtor(msg);
}

export function isLeapYear(year) {
  if (typeof year !== 'number' || !isInteger(year) || year < 1) {
    throw invalid(year);
  }
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
