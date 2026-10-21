import test from 'node:test';
import assert from 'node:assert/strict';
import { encode, decode } from './rle.mjs';

test('encode examples', () => {
  assert.equal(encode('aaabbc'), '3a2b1c');
  assert.equal(encode(''), '');
  assert.equal(encode('a'), '1a');
  assert.equal(encode('abab'), '1a1b1a1b');
  assert.equal(encode('a'.repeat(12)), '12a');
  assert.equal(encode('  \n\n'), '2 2\n');
  assert.equal(encode('aA'), '1a1A');
});
test('encode code points', () => {
  assert.equal(encode('😀😀x'), '2😀1x');
  assert.equal(encode('😀😁'), '1😀1😁'); // same high surrogate, different code points
  assert.equal(encode('𝟘𝟘'.replace(/./gu, 'é')), '2é');
  assert.equal(encode('éé'), '1e1́1e1́'); // combining mark is its own code point
  assert.equal(encode('\ud800\ud800'), '2\ud800'); // lone surrogates
  assert.equal(encode('\u0000\u0000'), '2\u0000');
});
test('encode rejects digits and non-strings with TypeError', () => {
  for (const s of ['a1', '0', 'abc9', '٣', '５', '𝟘', 'x٣y'])
    assert.throws(() => encode(s), TypeError, JSON.stringify(s));
  for (const v of [undefined, null, 3, ['a'], {}, new String('a')])
    assert.throws(() => encode(v), TypeError);
});
test('encode allows non-decimal numerals', () => {
  assert.equal(encode('ⅫⅫ²'), '2Ⅻ1²'); // Nl / No, not Nd
});
test('decode examples and inverse', () => {
  assert.equal(decode('3a2b1c'), 'aaabbc');
  assert.equal(decode(''), '');
  assert.equal(decode('12a'), 'a'.repeat(12));
  assert.equal(decode('2😀1x'), '😀😀x');
  for (const s of ['', 'aaabbc', '😀😀😁 \n\t', 'a'.repeat(1000) + 'b', 'é́', '𐀀\ud800', 'ⅫⅫ²', 'aaaa  !!!'])
    assert.equal(decode(encode(s)), s);
});
test('decode malformed throws SyntaxError', () => {
  for (const s of ['a', '3a2', '3', '0a', '3a0b', '00a', '03a', 'ab', '3ab', '2😀😀', '😀', '1٣', '1５', '9007199254740993a'])
    assert.throws(() => decode(s), SyntaxError, JSON.stringify(s));
});
test('decode non-string throws TypeError', () => {
  for (const v of [undefined, null, 3, ['1a'], {}]) assert.throws(() => decode(v), TypeError);
});
