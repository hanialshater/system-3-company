import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dedent } from './dedent.mjs';

test('basic template-literal style', () => {
  assert.equal(dedent('\n    a\n      b\n    c\n  '), 'a\n  b\nc');
});
test('only one leading newline removed', () => {
  assert.equal(dedent('\n\n  a'), '\na');
});
test('whitespace-only lines become empty and do not count', () => {
  assert.equal(dedent('    a\n \n\t\n    b'), 'a\n\n\nb');
});
test('tabs and spaces compared literally', () => {
  assert.equal(dedent('\ta\n    b'), '\ta\n    b');
  assert.equal(dedent('\t  a\n\t b'), ' a\nb');
});
test('common tab prefix removed', () => {
  assert.equal(dedent('\t\ta\n\tb'), '\ta\nb');
});
test('no indentation unchanged', () => {
  assert.equal(dedent('a\n  b'), 'a\n  b');
});
test('final whitespace-only line removed', () => {
  assert.equal(dedent('  a\n  b\n   '), 'a\nb');
  assert.equal(dedent('  a\n'), 'a');
});
test('final non-blank line kept', () => {
  assert.equal(dedent('  a\n  b'), 'a\nb');
});
test('empty and blank input', () => {
  assert.equal(dedent(''), '');
  assert.equal(dedent('\n'), '');
  assert.equal(dedent('   '), '');
});
test('single line', () => {
  assert.equal(dedent('   hello world'), 'hello world');
});
