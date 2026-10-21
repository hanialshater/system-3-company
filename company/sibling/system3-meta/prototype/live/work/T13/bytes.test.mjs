import test from 'node:test';
import assert from 'node:assert/strict';
import { formatBytes as f } from './bytes.mjs';

const K = 1024, M = K ** 2, G = K ** 3, T = K ** 4;

test('bytes below 1024', () => {
  assert.equal(f(0), '0 B');
  assert.equal(f(-0), '0 B');
  assert.equal(f(1), '1 B');
  assert.equal(f(1023), '1023 B');
});
test('spec examples', () => {
  assert.equal(f(1024), '1 KiB');
  assert.equal(f(1536), '1.5 KiB');
  assert.equal(f(1048575), '1 MiB');
});
test('half-up rounding to one decimal', () => {
  assert.equal(f(1075), '1 KiB');      // 1.0498
  assert.equal(f(1076), '1.1 KiB');    // 1.05078 -> 1.1
  assert.equal(f(1126), '1.1 KiB');    // 1.0996
  assert.equal(f(5 * K + 512), '5.5 KiB');
  assert.equal(f(1.25 * M), '1.3 MiB'); // 1.25 -> 1.3
  assert.equal(f(1.95 * K | 0), '1.9 KiB'); // 1996 B = 1.949 KiB
  assert.equal(f(1997), '2 KiB'); // 1.950 KiB -> 2.0 -> "2"
});
test('exact half at one-decimal boundary rounds up', () => {
  // exact x.x5 values need a power-of-two denominator: 2.25 KiB = 2304 B
  assert.equal(f(2304), '2.3 KiB'); // 2.25 -> 2.3
  assert.equal(f(2304 * K), '2.3 MiB');
  assert.equal(f(2304 * M), '2.3 GiB');
  assert.equal(f(2304 * G), '2.3 TiB');
  assert.equal(f(2303), '2.2 KiB'); // 2.249
});
test('rounding to 1024 moves to the next unit', () => {
  assert.equal(f(M - 1), '1 MiB');
  assert.equal(f(M - 51), '1 MiB');      // 1023.9502 KiB -> 1024.0 -> 1 MiB
  assert.equal(f(M - 52), '1023.9 KiB'); // 1023.9492 -> 1023.9
  assert.equal(f(G - 1), '1 GiB');
  assert.equal(f(T - 1), '1 TiB');
  assert.equal(f(M), '1 MiB');
  assert.equal(f(G), '1 GiB');
  assert.equal(f(T), '1 TiB');
});
test('above TiB stays in TiB', () => {
  assert.equal(f(1023 * T), '1023 TiB');
  assert.equal(f(1024 * T), '1024 TiB');
  assert.equal(f(1024 * T - 1), '1024 TiB');
  assert.equal(f(1536 * T), '1536 TiB');
  assert.equal(f(Number.MAX_SAFE_INTEGER), '8192 TiB');
  assert.equal(f(2 ** 70), '1073741824 TiB');
  assert.equal(f(1e21), '909494701.8 TiB'); // no exponent notation
  assert.equal(f(Number.MAX_VALUE).includes('e'), false);
});
test('invalid input throws RangeError', () => {
  for (const v of [-1, -1024, 1.5, 1023.9, NaN, Infinity, -Infinity, '1024', '', null, undefined, true, 1024n, [1024], {}, new Number(1024), Symbol('x')])
    assert.throws(() => f(v), RangeError, String(typeof v));
  assert.throws(() => f(), RangeError);
});
