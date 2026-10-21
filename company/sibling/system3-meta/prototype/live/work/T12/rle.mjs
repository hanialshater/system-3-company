// Run-length encoding over Unicode code points.
// Counts are ASCII decimal without leading zeros. Any Unicode decimal digit (\p{Nd})
// in encode input throws TypeError, so decode can be the exact inverse.
const ND = /\p{Nd}/u;

export function encode(s) {
  if (typeof s !== 'string') throw new TypeError('encode expects a string');
  if (ND.test(s)) throw new TypeError('input contains a decimal digit');
  let out = '';
  let prev = null, n = 0;
  for (const ch of s) {
    if (ch === prev) { n++; continue; }
    if (prev !== null) out += n + prev;
    prev = ch; n = 1;
  }
  if (prev !== null) out += n + prev;
  return out;
}

export function decode(s) {
  if (typeof s !== 'string') throw new TypeError('decode expects a string');
  let out = '';
  const cps = Array.from(s);
  let i = 0;
  while (i < cps.length) {
    let digits = '';
    while (i < cps.length && cps[i] >= '0' && cps[i] <= '9' && cps[i].length === 1) digits += cps[i++];
    if (digits === '') throw new SyntaxError(`character without a count at code point ${i}`);
    if (digits[0] === '0') throw new SyntaxError(`count of 0 or leading zero at code point ${i - digits.length}`);
    if (i >= cps.length) throw new SyntaxError('count without a character at end of input');
    const ch = cps[i++];
    if (ND.test(ch)) throw new SyntaxError(`decimal digit used as run character at code point ${i - 1}`);
    const n = Number(digits);
    if (!Number.isSafeInteger(n)) throw new SyntaxError(`count too large: ${digits}`);
    out += ch.repeat(n);
  }
  return out;
}
