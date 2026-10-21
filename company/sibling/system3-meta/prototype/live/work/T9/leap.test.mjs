import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isLeapYear } from './leap.mjs';

test('divisible by 4 and not a century is leap', () => {
  for (const y of [4, 1996, 2004, 2024]) assert.equal(isLeapYear(y), true, String(y));
});
test('not divisible by 4 is common', () => {
  for (const y of [1, 2, 3, 1999, 2023]) assert.equal(isLeapYear(y), false, String(y));
});
test('centuries are common unless divisible by 400', () => {
  for (const y of [100, 1700, 1800, 1900, 2100]) assert.equal(isLeapYear(y), false, String(y));
  for (const y of [400, 1600, 2000, 2400]) assert.equal(isLeapYear(y), true, String(y));
});
test('invalid inputs throw RangeError', () => {
  for (const v of [0, -1, -400, 1.5, NaN, Infinity, -Infinity, '2000', null, undefined, true, 2000n, {}, []]) {
    assert.throws(() => isLeapYear(v), RangeError, String(v));
  }
});
