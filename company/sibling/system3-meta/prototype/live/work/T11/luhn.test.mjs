import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidLuhn } from './luhn.mjs';

test('known valid numbers', () => {
  for (const s of ['4539 3195 0343 6467', '79927398713', '059', '0000 0', '00', '18', '4111111111111111', '095 245 88'])
    assert.equal(isValidLuhn(s), true, s);
});
test('known invalid numbers', () => {
  for (const s of ['8273 1232 7352 0569', '79927398710', '01', '1', '0', '4111111111111112'])
    assert.equal(isValidLuhn(s), false, s);
});
test('spaces anywhere ignored', () => {
  assert.equal(isValidLuhn(' 7 9 9 2 7 3 9 8 7 1 3 '), true);
  assert.equal(isValidLuhn('   0 0   '), true);
});
test('fewer than 2 digits after removing spaces', () => {
  for (const s of ['', ' ', '     ', ' 0 ', '0', '5']) assert.equal(isValidLuhn(s), false, JSON.stringify(s));
});
test('non-digit characters', () => {
  for (const s of ['055a', '055-444-285', '0x59', '+059', '-059', '05.9', '5,9', '05\t9', '05\n9', '05 9', '٠٥٩',
    '０５９', '05 9', '５9', '059\u0000', '1e2', 'Infinity', '😀59', '05̀9'])
    assert.equal(isValidLuhn(s), false, JSON.stringify(s));
});
test('non-string input never throws', () => {
  const weird = [undefined, null, 59, 79927398713, 0n, true, [], ['0','5','9'], {}, () => '059', Symbol('x'), new String('059'), NaN,
    { toString() { throw new Error('x'); } }, Object.create(null)];
  for (const v of weird) assert.equal(isValidLuhn(v), false);
  assert.equal(isValidLuhn(), false);
});
test('long input', () => {
  assert.equal(isValidLuhn('0'.repeat(100000)), true);
  assert.equal(isValidLuhn('0'.repeat(99999) + '1'), false);
});
