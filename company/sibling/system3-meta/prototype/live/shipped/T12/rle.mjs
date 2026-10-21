// Run-length encoding over Unicode code points.
// Counts are ASCII decimal without leading zeros. Any Unicode decimal digit (\p{Nd})
// in encode input throws TypeError, so decode can be the exact inverse.
const ND = /\p{Nd}/u;
import { constants } from 'node:buffer';
// Longest string the engine can build (UTF-16 code units). Counts that would exceed it are
// malformed input (encode can never produce them), so they throw SyntaxError, not RangeError.
export const MAX_LENGTH = constants.MAX_STRING_LENGTH;
const isHigh = (c) => c.length === 1 && c >= '\ud800' && c <= '\udbff';
const isLow = (c) => c.length === 1 && c >= '\udc00' && c <= '\udfff';

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
  let prevCh = null;
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
    // Canonical form: encode never writes two adjacent runs of the same code point, and never
    // a lone high-surrogate run followed by a lone low-surrogate run (they would join into one
    // code point in the output, which encode writes as a single run).
    if (prevCh !== null && ch === prevCh) throw new SyntaxError(`adjacent runs of the same character at code point ${i - 1}`);
    if (prevCh !== null && isHigh(prevCh) && isLow(ch)) throw new SyntaxError(`low surrogate run after high surrogate run at code point ${i - 1}`);
    const n = Number(digits);
    if (!Number.isSafeInteger(n) || n > (MAX_LENGTH - out.length) / ch.length)
      throw new SyntaxError(`count too large: ${digits}`);
    out += ch.repeat(n);
    prevCh = ch;
  }
  return out;
}
