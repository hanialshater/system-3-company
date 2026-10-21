// Gregorian leap year test.

// Describe a value for an error message without ever coercing it
// (objects may have no prototype, or throwing toString/valueOf; symbols
// cannot be converted implicitly).
function describe(v) {
  const t = typeof v;
  if (t === 'number') return String(v);
  if (t === 'string') return JSON.stringify(v);
  if (t === 'bigint') return `${v.toString()}n`;
  if (t === 'boolean' || t === 'undefined') return String(v);
  if (v === null) return 'null';
  if (t === 'symbol') return 'symbol';
  if (t === 'function') return 'function';
  return Array.isArray(v) ? 'array' : 'object';
}

export function isLeapYear(year) {
  if (typeof year !== 'number' || !Number.isInteger(year) || year < 1) {
    throw new RangeError(`isLeapYear: expected an integer year >= 1, got ${describe(year)}`);
  }
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
