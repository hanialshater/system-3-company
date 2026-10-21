import test from 'node:test';
import assert from 'node:assert/strict';
import { parseIni } from './ini.mjs';

test('sections and trimmed key/values', () => {
  assert.deepEqual(parseIni('[a]\n  x  =  1 \ny=two words\n[b]\nz=3'), {
    a: { x: '1', y: 'two words' }, b: { z: '3' },
  });
});

test('global keys go into "" section', () => {
  assert.deepEqual(parseIni('k=v\n[s]\na=b'), { '': { k: 'v' }, s: { a: 'b' } });
});

test('empty global section is omitted', () => {
  const r = parseIni('; c\n\n[s]\na=b');
  assert.equal(Object.hasOwn(r, ''), false);
  assert.deepEqual(r, { s: { a: 'b' } });
});

test('comments and blank lines ignored', () => {
  assert.deepEqual(parseIni('# hi\n; there\n\n   \n[s]\n# x=y\na=1'), { s: { a: '1' } });
});

test('repeated key: last wins', () => {
  assert.deepEqual(parseIni('[s]\na=1\na=2'), { s: { a: '2' } });
});

test('values may contain = and be empty', () => {
  assert.deepEqual(parseIni('[s]\na=b=c\nd='), { s: { a: 'b=c', d: '' } });
});

test('empty section is kept', () => {
  assert.deepEqual(parseIni('[s]'), { s: {} });
});

test('invalid line throws SyntaxError with 1-based line number', () => {
  assert.throws(() => parseIni('[s]\na=1\n\ngarbage'), (e) => e instanceof SyntaxError && /\b4\b/.test(e.message));
  assert.throws(() => parseIni('=v'), (e) => e instanceof SyntaxError && /\b1\b/.test(e.message));
});

test('empty input returns empty object', () => {
  assert.deepEqual(parseIni(''), {});
});

test('section names that shadow Object.prototype members are real sections', () => {
  for (const name of ['constructor', 'toString', 'hasOwnProperty', 'valueOf', '__proto__']) {
    const r = parseIni(`[${name}]\na=1`);
    assert.deepEqual(Object.keys(r), [name], name);
    assert.equal(Object.hasOwn(r, name), true, name);
    assert.deepEqual({ ...r[name] }, { a: '1' }, name);
  }
});

test('no prototype pollution from section or key names', () => {
  parseIni('[__proto__]\npolluted=yes');
  parseIni('__proto__=x\n[s]\n__proto__=1\nconstructor=2');
  assert.equal(Object.hasOwn(Object.prototype, 'polluted'), false);
  assert.equal({}.polluted, undefined);
  assert.equal(typeof Object.prototype.toString, 'function');
  assert.equal(Object.prototype.toString.a, undefined);
});

test('keys named like Object.prototype members are kept as string values', () => {
  const r = parseIni('[s]\n__proto__=1\nb=2\nconstructor=c\ntoString=t');
  assert.deepEqual(Object.keys(r.s), ['__proto__', 'b', 'constructor', 'toString']);
  assert.equal(Object.getOwnPropertyDescriptor(r.s, '__proto__').value, '1');
  assert.equal(r.s.b, '2');
  assert.equal(r.s.constructor, 'c');
  assert.equal(r.s.toString, 't');
  const g = parseIni('__proto__=g');
  assert.deepEqual(Object.keys(g), ['']);
  assert.equal(Object.getOwnPropertyDescriptor(g[''], '__proto__').value, 'g');
});

test('repeated prototype-named key: last wins', () => {
  const r = parseIni('[s]\nconstructor=1\nconstructor=2');
  assert.equal(r.s.constructor, '2');
});
