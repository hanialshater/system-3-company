import test from 'node:test';
import assert from 'node:assert/strict';
import { encode, decode, MAX_LENGTH } from './rle.mjs';

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
test('decode rejects non-canonical adjacent runs with SyntaxError (encode(decode(x)) === x)', () => {
  for (const s of ['2a3a', '1a1a', '1😀2😀', '3a2b2b', '1 1 ', '1\u00001\u0000', '2\ud8001\ud800',
    '1\ud83d1\ude00', '2\ud83d1\ude00', '1\ud83d3\ude00', '1\udbff1\udfff', '1\ud8001\udc00', '1x1\ud83d1\ude00'])
    assert.throws(() => decode(s), SyntaxError, JSON.stringify(s));
  // Not joining: low then high, high then high, lone low then pair, pair then lone low.
  for (const s of ['1\ude001\ud83d', '1\ud8001\ud801', '1\ude001😀', '1😀1\ude00', '1\ud83d1x1\ude00', '1a1b1a'])
    assert.equal(encode(decode(s)), s, JSON.stringify(s));
});
test('encode(decode(x)) === x for every accepted short input over a small alphabet', () => {
  const alpha = ['1', '2', '0', 'a', 'b', '\ud83d', '\ude00', '😀'];
  let strs = [''];
  for (let len = 1; len <= 5; len++) {
    strs = strs.flatMap((p) => alpha.map((c) => p + c));
    for (const s of strs) {
      let d;
      try { d = decode(s); } catch (e) { assert.ok(e instanceof SyntaxError, JSON.stringify(s)); continue; }
      assert.equal(encode(d), s, JSON.stringify(s));
    }
  }
});
test('decode counts too large for a string throw SyntaxError, not RangeError', () => {
  const M = MAX_LENGTH;
  for (const s of ['1000000000a', '999999999999999a', '9007199254740991a', '9007199254740992a',
    '300000000a300000000b', `${M + 1}a`, `${M}a1b`, `${Math.floor(M / 2) + 1}😀`, `1b${M}a`,
    `${M - 1}a2b`, '1' + '0'.repeat(400) + 'a'])
    assert.throws(() => decode(s), SyntaxError, s.length > 40 ? s.slice(0, 40) : s);
});
test('decode accepts output exactly at the max string length', () => {
  assert.equal(decode(`${MAX_LENGTH}a`).length, MAX_LENGTH);
  assert.equal(decode(`${MAX_LENGTH - 1}a1b`).length, MAX_LENGTH);
  assert.equal(decode(`${Math.floor(MAX_LENGTH / 2)}😀`).length, Math.floor(MAX_LENGTH / 2) * 2);
});
