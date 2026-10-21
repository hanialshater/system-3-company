import test from 'node:test';
import assert from 'node:assert/strict';
import { wrap } from './wrap.mjs';

test('breaks at spaces within width', () => {
  assert.equal(wrap('the quick brown fox', 10), 'the quick\nbrown fox');
});
test('lines never exceed width and have no trailing spaces', () => {
  const out = wrap('a bb ccc dddd eeeee ffffff ggggggg', 7);
  for (const l of out.split('\n')) { assert.ok(l.length <= 7); assert.equal(l, l.trimEnd()); }
});
test('long word split hard', () => {
  assert.equal(wrap('abcdefghij', 4), 'abcd\nefgh\nij');
  assert.equal(wrap('hi abcdefghij yo', 4), 'hi\nabcd\nefgh\nij\nyo');
});
test('collapses whitespace runs and single newlines', () => {
  assert.equal(wrap('  a \t  b\nc   d  ', 80), 'a b c d');
});
test('paragraphs separated by one blank line', () => {
  assert.equal(wrap('one two\n\n\n\nthree   four', 80), 'one two\n\nthree four');
  assert.equal(wrap('a\n  \t \nb', 80), 'a\n\nb');
});
test('empty text gives empty string', () => {
  assert.equal(wrap('', 5), '');
  assert.equal(wrap('   \n\n  ', 5), '');
});
test('width 1', () => {
  assert.equal(wrap('ab c', 1), 'a\nb\nc');
});
test('invalid width throws RangeError', () => {
  for (const w of [0, -1, 1.5, NaN, '3', undefined]) assert.throws(() => wrap('x', w), RangeError);
});

const cp = (s) => Array.from(s).length;
const wellFormed = (s) => !/[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/.test(s);

test('hard split never cuts an astral character (finding 1)', () => {
  assert.equal(wrap('😀😀😀', 1), '😀\n😀\n😀');
  assert.equal(wrap('😀😀😀', 3), '😀😀😀');
  assert.equal(wrap('😀😀😀😀😀', 2), '😀😀\n😀😀\n😀');
  assert.equal(wrap('a😀 b😀', 2), 'a😀\nb😀');
  assert.equal(wrap('😀 😀', 3), '😀 😀');
});
test('output is well-formed and width is counted in code points', () => {
  const inputs = ['𝒜𝒷𝒸𝒹𝑒 𝒻𝑔 😀x😀y😀', 'héllo wörld 日本語テキスト', '🎉🎉 🎉🎉🎉🎉 a'];
  for (const s of inputs) for (let w = 1; w <= 6; w++) {
    const out = wrap(s, w);
    assert.ok(wellFormed(out), `malformed for ${JSON.stringify(s)} w=${w}`);
    for (const l of out.split('\n')) { assert.ok(cp(l) <= w); assert.equal(l, l.trimEnd()); }
    assert.equal(out.replace(/\s+/g, ''), s.replace(/\s+/g, ''));
  }
});
test('a line of only non-ASCII whitespace is a blank line (finding 2)', () => {
  assert.equal(wrap('a\n \nb', 5), 'a\n\nb');
  assert.equal(wrap('a\n　\nb', 5), 'a\n\nb');
  assert.equal(wrap('a\n  　\t\nb', 5), 'a\n\nb');
  assert.equal(wrap('a\r\n\r\nb', 5), 'a\n\nb');
});
test('non-ASCII whitespace inside a paragraph collapses to one space', () => {
  assert.equal(wrap('a  b　c\nd', 80), 'a b c d');
  assert.equal(wrap('　 a b  ', 80), 'a b');
  assert.equal(wrap(' \n　\n', 5), '');
});
