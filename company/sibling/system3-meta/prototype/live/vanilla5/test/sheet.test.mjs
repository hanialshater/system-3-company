import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSheet } from '../sheet.mjs';

const ev = (f) => { const s = createSheet(); s.set('A1', f); return s.get('A1'); };
const dv = (f) => { const s = createSheet(); s.set('A1', f); return s.display('A1'); };

test('cell names', () => {
  const s = createSheet();
  for (const bad of ['A0', 'A01', 'A100', 'AA1', '1A', '', 'A', 'a1b']) {
    assert.throws(() => s.set(bad, '1'), Error, bad);
    assert.throws(() => s.get(bad), Error, bad);
  }
  s.set('z99', '5'); assert.equal(s.get('Z99'), 5);
  assert.equal(s.get('b7'), '');
});

test('values', () => {
  assert.equal(ev(' -2.5 '), -2.5);
  assert.equal(ev('7'), 7);
  assert.equal(ev('.5'), 0.5);
  assert.equal(ev('+3'), 3);
  assert.equal(ev('12abc'), '12abc');
  assert.equal(ev('TRUE'), 'TRUE');
  const s = createSheet(); s.set('A1', '3'); s.set('A1', ''); assert.equal(s.get('A1', ''), '');
});

test('spec examples', () => {
  assert.equal(ev('=2+3*4'), 14);
  assert.equal(ev('=2^3^2'), 512);
  assert.equal(ev('=-2^2'), 4);
  assert.equal(ev('="n="&5'), 'n=5');
  assert.equal(ev('="a"="A"'), true);
  assert.equal(ev('="a"+1'), '#VALUE!');
  assert.equal(ev('=1/0'), '#DIV/0!');
  assert.equal(ev('=(1+2'), '#VALUE!');
  assert.equal(ev('=FOO(1)'), '#NAME?');
  assert.equal(ev('=TRUE+1'), 2);
});

test('syntax', () => {
  assert.equal(ev('=1.2.3'), '#VALUE!');
  assert.equal(ev('=7.+.5'), 7.5);
  assert.equal(ev('= 1 +  2 '), 3);
  assert.equal(ev('=--3'), 3);
  assert.equal(ev('=+-3'), -3);
  assert.equal(ev('=true'), true);
  assert.equal(ev('=fAlSe'), false);
  assert.equal(ev('='), '#VALUE!');
  assert.equal(ev('=1+'), '#VALUE!');
  assert.equal(ev('="abc'), '#VALUE!');
  assert.equal(ev('=1 2'), '#VALUE!');
  assert.equal(ev('=sum()'), '#NAME?');
});

test('operators and precedence', () => {
  assert.equal(ev('=1+2=3'), true);
  assert.equal(ev('=1&2+3'), '15');
  assert.equal(ev('=10-2-3'), 5);
  assert.equal(ev('=12/3/2'), 2);
  assert.equal(ev('=2*3^2'), 18);
  assert.equal(ev('=1<>2'), true);
  assert.equal(ev('=2<=2'), true);
  assert.equal(ev('=3>=4'), false);
  assert.equal(ev('="b">"A"'), true);
  assert.equal(ev('="10"<9'), false);
  assert.equal(ev('="2"*"3"'), 6);
  assert.equal(ev('=" 2 "+1'), 3);
  assert.equal(ev('=""+1'), 1);
  assert.equal(ev('=TRUE&FALSE'), 'TRUEFALSE');
  assert.equal(ev('=1.5&""'), '1.5');
  assert.equal(ev('=TRUE=1'), true);
  assert.equal(ev('=-"x"'), '#VALUE!');
});

test('errors', () => {
  assert.equal(ev('=(-8)^(1/3)'), '#VALUE!');
  assert.equal(ev('=10^400'), '#VALUE!');
  assert.equal(ev('=1/0+"x"'), '#DIV/0!');
  assert.equal(ev('="x"+1/0'), '#DIV/0!');
  assert.equal(ev('=FOO()&(1/0)'), '#NAME?');
  assert.equal(ev('=(1/0)&"a"'), '#DIV/0!');
  assert.equal(ev('=-(1/0)'), '#DIV/0!');
  assert.equal(ev('=(1/0)=(1/0)'), '#DIV/0!');
});

test('rounding and display', () => {
  assert.equal(ev('=1/3'), 0.333333333);
  assert.equal(dv('=1/3'), '0.333333333');
  assert.equal(dv('=0.1+0.2'), '0.3');
  assert.equal(ev('=0.1+0.2'), 0.3);
  assert.equal(dv('=1=1'), 'TRUE');
  assert.equal(dv('=1=2'), 'FALSE');
  assert.equal(dv('hello'), 'hello');
  assert.equal(dv(''), '');
  assert.equal(dv('=1/0'), '#DIV/0!');
  assert.equal(dv(' 4 '), '4');
  assert.equal(dv('=-0'), '0');
});
