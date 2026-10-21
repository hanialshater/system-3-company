import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSheet } from '../sheet.mjs';

const sheet = (cells) => { const s = createSheet(); for (const [k, v] of Object.entries(cells)) s.set(k, v); return s; };
const ev = (cells, f) => { const s = sheet(cells); s.set('Z99', f); return s.get('Z99'); };

test('references', () => {
  assert.equal(ev({ A1: '5' }, '=A1*2'), 10);
  assert.equal(ev({ A1: '5' }, '=a1*2'), 10);
  assert.equal(ev({}, '=A1'), '');
  assert.equal(ev({}, '=A1+1'), 1);
  assert.equal(ev({}, '=A1&"x"'), 'x');
  assert.equal(ev({}, '=A100'), '#REF!');
  assert.equal(ev({}, '=AA1'), '#REF!');
  assert.equal(ev({}, '=A0+1'), '#REF!');
  assert.equal(ev({ A1: 'hi' }, '=A1'), 'hi');
  assert.equal(ev({ A1: '=1/0' }, '=A1+1'), '#DIV/0!');
  assert.equal(ev({ A1: '=TRUE' }, '=A1'), true);
});

test('recalculation through chains', () => {
  const s = sheet({ A1: '1', B1: '=A1+1', C1: '=B1*10' });
  assert.equal(s.get('C1'), 20);
  s.set('A1', '5'); assert.equal(s.get('C1'), 60); assert.equal(s.display('B1'), '6');
  s.set('A1', ''); assert.equal(s.get('C1'), 10);
  s.set('B1', '7'); assert.equal(s.get('C1'), 70);
});

test('deep and wide chains are fast', () => {
  const s = createSheet();
  s.set('A1', '1');
  for (let r = 2; r <= 99; r++) s.set('A' + r, `=A${r - 1}+A${r - 1}`);
  s.set('A1', '0'); assert.equal(s.get('A99'), 0);
  s.set('A1', '1'); assert.equal(s.get('A30'), 2 ** 29);
});

test('ranges', () => {
  const nums = { A1: '1', A2: '2', A3: '3', A4: '4' };
  assert.equal(ev(nums, '=SUM(A1:A4)'), 10);
  assert.equal(ev(nums, '=SUM(A4:A1)'), 10);
  assert.equal(ev({ A1: '1', B2: '2' }, '=SUM(B2:A1)'), 3);
  assert.equal(ev({ A1: '1', B2: '2' }, '=SUM(b1:a2)'), 3);
  assert.equal(ev(nums, '=A1:A4'), '#VALUE!');
  assert.equal(ev(nums, '=1+A1:A2'), '#VALUE!');
  assert.equal(ev(nums, '=SUM(A1:A100)'), '#REF!');
  assert.equal(ev(nums, '=SUM(A1:A2+1)'), '#VALUE!');
  // column-by-column: first error encountered wins
  assert.equal(ev({ A2: '=1/0', B1: '=FOO()' }, '=SUM(A1:B2)'), '#DIV/0!');
  assert.equal(ev({ B1: '=1/0', A2: '=FOO()' }, '=SUM(A1:B2)'), '#NAME?');
});

test('aggregates', () => {
  assert.equal(ev({ A1: '1', A2: 'word', A3: '3' }, '=COUNT(A1:A3)'), 2);
  assert.equal(ev({}, '=AVERAGE(A5:A9)'), '#DIV/0!');
  assert.equal(ev({ A1: '2', A2: '4', A3: 'x' }, '=AVERAGE(A1:A3)'), 3);
  assert.equal(ev({ A1: '="5"', A2: '=TRUE', A3: '2' }, '=SUM(A1:A3)'), 2);
  assert.equal(ev({}, '=SUM()'), 0);
  assert.equal(ev({}, '=MIN()'), 0);
  assert.equal(ev({}, '=MAX(A1:A3)'), 0);
  assert.equal(ev({ A1: '-3', A2: '7' }, '=MIN(A1:A2, 5)'), -3);
  assert.equal(ev({ A1: '-3', A2: '7' }, '=max(A1:A2,10)'), 10);
  assert.equal(ev({}, '=SUM(1,"2",TRUE)'), 4);
  assert.equal(ev({}, '=SUM(1,"x")'), '#VALUE!');
  assert.equal(ev({ A1: 'x' }, '=SUM(A1)'), '#VALUE!');
  assert.equal(ev({}, '=SUM(A1)'), 0);
  assert.equal(ev({}, '=COUNT(1,2,A1:A3)'), 2);
  assert.equal(ev({ A2: '=1/0' }, '=COUNT(A1:A3)'), '#DIV/0!');
  assert.equal(ev({}, '=SUM(1/0, FOO())'), '#DIV/0!');
  assert.equal(ev({}, '=SUM(0.1,0.2)'), 0.3);
});

test('IF', () => {
  assert.equal(ev({}, '=IF(1,2,1/0)'), 2);
  assert.equal(ev({}, '=IF(0,1/0,3)'), 3);
  assert.equal(ev({}, '=IF(0,1)'), false);
  assert.equal(ev({}, '=IF(1)'), '#VALUE!');
  assert.equal(ev({}, '=IF(1,2,3,4)'), '#VALUE!');
  assert.equal(ev({}, '=IF(1/0,2,3)'), '#DIV/0!');
  assert.equal(ev({}, '=IF("x",2,3)'), '#VALUE!');
  assert.equal(ev({}, '=IF("0",2,3)'), 3);
  assert.equal(ev({}, '=IF(A1,2,3)'), 3);
  assert.equal(ev({ A1: '5' }, '=IF(A1>3,"big","small")'), 'big');
});

test('ABS ROUND LEN', () => {
  assert.equal(ev({}, '=ABS(-3)'), 3);
  assert.equal(ev({}, '=ABS()'), '#VALUE!');
  assert.equal(ev({}, '=ABS(1,2)'), '#VALUE!');
  assert.equal(ev({}, '=ABS("x")'), '#VALUE!');
  assert.equal(ev({}, '=ROUND(1234,-2)'), 1200);
  assert.equal(ev({}, '=ROUND(2.5)'), 3);
  assert.equal(ev({}, '=ROUND(3.14159,2)'), 3.14);
  assert.equal(ev({}, '=ROUND()'), '#VALUE!');
  assert.equal(ev({}, '=ROUND(1,2,3)'), '#VALUE!');
  assert.equal(ev({}, '=ROUND(1/0)'), '#DIV/0!');
  assert.equal(ev({}, '=LEN("hello")'), 5);
  assert.equal(ev({}, '=LEN(TRUE)'), 4);
  assert.equal(ev({}, '=LEN(12.5)'), 4);
  assert.equal(ev({}, '=LEN(A1)'), 0);
  assert.equal(ev({}, '=LEN()'), '#VALUE!');
  assert.equal(ev({}, '=LEN(1/0)'), '#DIV/0!');
  assert.equal(ev({}, '=Len("ab")&abs(-1)'), '21');
});
