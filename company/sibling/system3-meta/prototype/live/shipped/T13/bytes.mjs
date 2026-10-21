// Binary byte formatting with exact (BigInt) half-up rounding to one decimal.
// Accepts only JS numbers that are integers >= 0 (-0 counts as 0); anything else, including BigInt, throws RangeError.
const UNITS = ['KiB', 'MiB', 'GiB', 'TiB'];

export function formatBytes(n) {
  if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
    throw new RangeError('formatBytes expects an integer n >= 0');
  }
  const b = BigInt(n);
  if (b < 1024n) return `${b} B`;
  let u = 0;
  while (u < UNITS.length - 1 && b >= 1024n ** BigInt(u + 2)) u++;
  for (;;) {
    const div = 1024n ** BigInt(u + 1);
    const tenths = (b * 20n + div) / (div * 2n); // round half up of b*10/div
    if (tenths >= 10240n && u < UNITS.length - 1) { u++; continue; }
    const whole = tenths / 10n, frac = tenths % 10n;
    return `${whole}${frac === 0n ? '' : '.' + frac} ${UNITS[u]}`;
  }
}
