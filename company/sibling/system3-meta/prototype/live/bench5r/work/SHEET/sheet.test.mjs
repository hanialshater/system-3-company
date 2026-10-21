import { test } from "node:test";
import assert from "node:assert/strict";
import { createSheet } from "./sheet.mjs";

const ev = (f) => { const s = createSheet(); s.set("A1", f); return s; };

test("names", () => {
  const s = createSheet();
  for (const bad of ["A0", "A100", "AA1", "A01", "1A", "", "A", null, undefined, 5])
    { assert.throws(() => s.set(bad, "1")); assert.throws(() => s.get(bad)); assert.throws(() => s.display(bad)); }
  s.set("b7", "3"); assert.equal(s.get("B7"), 3); assert.equal(s.get("Z99"), "");
});

test("literals", () => {
  const s = createSheet();
  s.set("A1", " -2.5 "); assert.equal(s.get("a1"), -2.5);
  s.set("A1", ".5"); assert.equal(s.get("A1"), 0.5);
  s.set("A1", "12abc"); assert.equal(s.get("A1"), "12abc");
  s.set("A1", "TRUE"); assert.equal(s.get("A1"), "TRUE");
  s.set("A1", ""); assert.equal(s.get("A1"), ""); assert.equal(s.display("A1"), "");
});

test("spec examples", () => {
  const cases = [["=2+3*4", 14], ["=2^3^2", 512], ["=-2^2", 4], ['="n="&5', "n=5"], ['="a"="A"', true],
    ['="a"+1', "#VALUE!"], ["=1/0", "#DIV/0!"], ["=(1+2", "#VALUE!"], ["=FOO(1)", "#NAME?"], ["=TRUE+1", 2],
    ["=(-8)^(1/3)", "#VALUE!"], ["=1.2.3", "#VALUE!"], ["=1/0+FOO()", "#DIV/0!"], ['="a"+1/0', "#DIV/0!"], ['=""+1', 1], ['="3"*2', 6]];
  for (const [f, v] of cases) assert.strictEqual(ev(f).get("A1"), v, f);
});

test("display", () => {
  assert.equal(ev("=1/3").display("A1"), "0.333333333");
  assert.equal(ev("=0.1+0.2").display("A1"), "0.3");
  assert.equal(ev("=1<2").display("A1"), "TRUE");
  assert.equal(ev("=1/0").display("A1"), "#DIV/0!");
  assert.equal(ev("#DIV/0!").get("A1"), "#DIV/0!");
  assert.equal(ev("=0.1+0.2").get("A1"), 0.3);
});

test("errors leave get() as code strings", () => {
  for (const [f, c] of [["=1/0", "#DIV/0!"], ['="a"+1', "#VALUE!"], ["=FOO(1)", "#NAME?"]]) {
    const s = ev(f); assert.strictEqual(s.get("A1"), c); assert.strictEqual(typeof s.get("A1"), "string");
    assert.strictEqual(s.display("A1"), c);
  }
});

test("wave 2: references and recalculation through chains", () => {
  const s = createSheet();
  s.set("A1", "5"); s.set("B1", "=a1*2"); s.set("C1", "=B1+A1"); s.set("D1", "=B1+C1");
  assert.strictEqual(s.get("B1"), 10); assert.strictEqual(s.get("C1"), 15); assert.strictEqual(s.get("D1"), 25);
  s.set("A1", "1"); assert.strictEqual(s.get("B1"), 2); assert.strictEqual(s.get("C1"), 3); assert.strictEqual(s.get("D1"), 5);
  s.set("A1", ""); assert.strictEqual(s.get("B1"), 0);
  s.set("E1", "=Z9&\"x\""); assert.strictEqual(s.get("E1"), "x");
  s.set("A2", "=1/0"); s.set("B2", "=A2+1"); assert.strictEqual(s.get("B2"), "#DIV/0!");
});

test("values pass get() unchanged (no wrapper)", () => {
  for (const n of [10, 11, 0, -3.5]) { const s = createSheet(); s.set("A1", String(n)); assert.strictEqual(s.get("A1"), n); }
  assert.strictEqual(ev("=5*2").get("A1"), 10);
});

test("wave 2: ranges column by column, no cycle marking yet", () => {
  const s = createSheet();
  s.set("A2", "=1/0"); s.set("B1", "=FOO()"); s.set("C1", "=SUM(A1:B2)");
  assert.strictEqual(s.get("C1"), "#DIV/0!");
  s.set("A1", "1"); s.set("A3", "3"); s.set("A2", "2"); s.set("A4", "4"); s.set("B1", "");
  assert.strictEqual(s.get("C1"), 3);
  s.set("D1", "=SUM(A1:A4)"); assert.strictEqual(s.get("D1"), 10);
  s.set("D2", "=a1:b2"); assert.strictEqual(s.get("D2"), "#VALUE!");
  s.set("E1", "=IF(1,2,E1)"); assert.strictEqual(s.get("E1"), 2);
  s.set("E2", "=A100"); assert.strictEqual(s.get("E2"), "#REF!");
});
