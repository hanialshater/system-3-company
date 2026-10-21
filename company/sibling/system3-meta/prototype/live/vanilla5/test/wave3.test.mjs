import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSheet } from '../sheet.mjs';

const sheet = (cells) => { const s = createSheet(); for (const [k, v] of Object.entries(cells)) s.set(k, v); return s; };

test('direct and indirect cycles', () => {
  const s = sheet({ A1: '=A1' });
  assert.equal(s.get('A1'), '#CYCLE!');
  assert.equal(s.display('A1'), '#CYCLE!');
  const t = sheet({ A1: '=B1+1', B1: '=C1', C1: '=A1', D1: '=A1*2', E1: '=D1', F1: '5' });
  for (const c of ['A1', 'B1', 'C1', 'D1', 'E1']) assert.equal(t.get(c), '#CYCLE!', c);
  assert.equal(t.get('F1'), 5);
  t.set('C1', '10');
  assert.equal(t.get('A1'), 11);
  assert.equal(t.get('B1'), 10);
  assert.equal(t.get('E1'), 22);
  t.set('C1', '=A1');
  assert.equal(t.get('E1'), '#CYCLE!');
  t.set('B1', '');
  assert.equal(t.get('A1'), 1);
  assert.equal(t.get('C1'), 1);
});

test('cycles through ranges and unevaluated branches', () => {
  assert.equal(sheet({ A1: '=A1:A2' }).get('A1'), '#CYCLE!');
  assert.equal(sheet({ A3: '=SUM(A1:A5)' }).get('A3'), '#CYCLE!');
  const s = sheet({ B1: '=SUM(A1:A3)', A2: '=B1' });
  assert.equal(s.get('B1'), '#CYCLE!');
  assert.equal(s.get('A2'), '#CYCLE!');
  assert.equal(sheet({ A1: '=IF(1,5,A1)' }).get('A1'), '#CYCLE!');
  assert.equal(sheet({ A1: '=COUNT(B1:B2)', B1: '=A1' }).get('A1'), '#CYCLE!');
  // reading a cycle even where another error would come first
  assert.equal(sheet({ A1: '=A1', B1: '=(1/0)+A1' }).get('B1'), '#CYCLE!');
  // not a cycle: invalid refs/ranges, references to value cells
  assert.equal(sheet({ A1: '=SUM(A1:A100)' }).get('A1'), '#REF!');
  assert.equal(sheet({ A1: '=B1', B1: '3' }).get('A1'), 3);
});

test('error propagation through chains', () => {
  const s = sheet({ A1: '=1/0', B1: '=A1+1', C1: '=SUM(B1, 2)', D1: '=FOO()', E1: '=D1+C1', F1: '=C1+D1' });
  assert.equal(s.get('C1'), '#DIV/0!');
  assert.equal(s.get('E1'), '#NAME?');
  assert.equal(s.get('F1'), '#DIV/0!');
  assert.equal(sheet({ A1: '=A100', B1: '=ABS(A1)' }).get('B1'), '#REF!');
  assert.equal(sheet({ A1: '="x"+1', B1: '=LEN(A1)&"!"' }).get('B1'), '#VALUE!');
});

test('scale', () => {
  const s = createSheet();
  s.set('A1', '1');
  for (let r = 2; r <= 99; r++) s.set('A' + r, `=A${r - 1}+1`);
  assert.equal(s.get('A99'), 99);
  s.set('A1', '101');
  assert.equal(s.get('A99'), 199);
  // every column chained
  const t = createSheet();
  for (let c = 0; c < 26; c++) {
    const L = String.fromCharCode(65 + c);
    t.set(L + '1', String(c));
    for (let r = 2; r <= 99; r++) t.set(L + r, `=${L}${r - 1}+1`);
  }
  assert.equal(t.get('Z99'), 25 + 98);
  t.set('Z1', '0');
  assert.equal(t.get('Z99'), 98);
  const u = createSheet();
  for (let c = 0; c < 26; c++) for (let r = 1; r <= 10; r++) u.set(String.fromCharCode(65 + c) + r, '1');
  u.set('A11', '=SUM(A1:Z10)');
  assert.equal(u.get('A11'), 260);
  u.set('B5', '11');
  assert.equal(u.get('A11'), 270);
  u.set('Z99', '=SUM(A1:Z98)');
  assert.equal(u.get('Z99'), 540);
  u.set('A1', '=Z99');
  assert.equal(u.get('Z99'), '#CYCLE!');
  u.set('A1', '1');
  assert.equal(u.get('Z99'), 540);
});

test('odd input', () => {
  const ev = (f) => sheet({ B2: f }).get('B2');
  assert.equal(ev('=1e3'), '#VALUE!');
  assert.equal(ev('=1.2.3'), '#VALUE!');
  assert.equal(ev('=0^0'), 1);
  assert.equal(ev('="5"+1'), 6);
});

test('one chain through all 2574 cells, then a giant cycle', () => {
  const s = createSheet();
  let prev = null;
  for (let c = 0; c < 26; c++) for (let r = 1; r <= 99; r++) {
    const n = String.fromCharCode(65 + c) + r;
    s.set(n, prev ? `=${prev}+1` : '1');
    prev = n;
  }
  assert.equal(s.get('Z99'), 2574);
  s.set('A1', '=Z99');
  assert.equal(s.get('M50'), '#CYCLE!');
  s.set('A1', '0');
  assert.equal(s.get('Z99'), 2573);
});

test('interleaved set/get stays fast', () => {
  const t0 = Date.now();
  const s = createSheet();
  for (let c = 0; c < 26; c++) {
    const L = String.fromCharCode(65 + c);
    s.set(L + '1', c ? `=SUM(A1:${String.fromCharCode(64 + c)}99)` : '1');
    for (let r = 2; r <= 99; r++) { s.set(L + r, `=${L}${r - 1}+1`); s.get(L + r); }
  }
  assert.ok(Date.now() - t0 < 3000);
});
