import test from 'node:test';
import assert from 'node:assert/strict';
import { toRoman, fromRoman } from './roman.mjs';

test('toRoman known values', () => {
  const cases = { 1: 'I', 4: 'IV', 9: 'IX', 14: 'XIV', 40: 'XL', 90: 'XC', 400: 'CD', 900: 'CM', 1994: 'MCMXCIV', 2024: 'MMXXIV', 3999: 'MMMCMXCIX' };
  for (const [n, r] of Object.entries(cases)) assert.equal(toRoman(Number(n)), r);
});

test('toRoman rejects out of range and non-integers', () => {
  for (const bad of [0, -1, 4000, 1.5, NaN, Infinity, '5', null, undefined]) {
    assert.throws(() => toRoman(bad), RangeError, String(bad));
  }
});

test('fromRoman known values', () => {
  assert.equal(fromRoman('MCMXCIV'), 1994);
  assert.equal(fromRoman('MMMCMXCIX'), 3999);
  assert.equal(fromRoman('IV'), 4);
});

test('fromRoman rejects non-canonical and invalid input', () => {
  for (const bad of ['IIII', 'IC', 'MMMM', 'iv', '', 'VV', 'IIV', 'XM', 'ABC', ' I', 'IL', 'VX', 'DD', 'CCCC', 5, null]) {
    assert.throws(() => fromRoman(bad), undefined, JSON.stringify(bad));
  }
});

test('round trip 1..3999', () => {
  for (let n = 1; n <= 3999; n++) assert.equal(fromRoman(toRoman(n)), n);
});
