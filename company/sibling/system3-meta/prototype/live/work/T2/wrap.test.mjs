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
