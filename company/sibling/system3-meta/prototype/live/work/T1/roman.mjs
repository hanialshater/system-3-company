const TABLE = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

export function toRoman(n) {
  if (typeof n !== 'number' || !Number.isInteger(n) || n < 1 || n > 3999) {
    throw new RangeError(`toRoman: expected integer 1..3999, got ${String(n)}`);
  }
  let out = '';
  for (const [v, s] of TABLE) {
    while (n >= v) { out += s; n -= v; }
  }
  return out;
}

const CANONICAL = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
const VALUES = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

export function fromRoman(s) {
  if (typeof s !== 'string' || s === '' || !CANONICAL.test(s)) {
    throw new TypeError(`fromRoman: not a canonical Roman numeral: ${JSON.stringify(s)}`);
  }
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const v = VALUES[s[i]];
    const next = VALUES[s[i + 1]] ?? 0;
    total += v < next ? -v : v;
  }
  return total;
}
