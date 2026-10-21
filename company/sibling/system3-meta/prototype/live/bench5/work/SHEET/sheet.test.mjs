import test from "node:test";
import assert from "node:assert/strict";
import { createSheet } from "./sheet.mjs";

const ev = (f) => { const s = createSheet(); s.set("A1", f); return s; };
const d = (f) => ev(f).display("A1");
const g = (f) => ev(f).get("A1");

test("values", () => {
  assert.equal(g(" -2.5 "), -2.5); assert.equal(g("7"), 7); assert.equal(g(".5"), 0.5);
  assert.equal(g("12abc"), "12abc"); assert.equal(g("TRUE"), "TRUE");
  const s = createSheet(); s.set("a1", "5"); assert.equal(s.get("A1"), 5); s.set("A1", ""); assert.equal(s.get("a1", ""), "");
  assert.equal(s.display("B2"), "");
});
test("names", () => {
  const s = createSheet();
  for (const n of ["A0", "A100", "A01", "AA1", "1A", "", "A"]) {
    assert.throws(() => s.set(n, "1")); assert.throws(() => s.get(n));
  }
  s.set("z99", "1"); assert.equal(s.get("Z99"), 1);
});
test("spec examples", () => {
  assert.equal(g("=2+3*4"), 14); assert.equal(g("=2^3^2"), 512); assert.equal(g("=-2^2"), 4);
  assert.equal(g('="n="&5'), "n=5"); assert.equal(g('="a"="A"'), true);
  assert.equal(d('="a"+1'), "#VALUE!"); assert.equal(d("=1/0"), "#DIV/0!");
  assert.equal(d("=(1+2"), "#VALUE!"); assert.equal(d("=FOO(1)"), "#NAME?"); assert.equal(g("=TRUE+1"), 2);
  assert.equal(d("=1/3"), "0.333333333"); assert.equal(d("=0.1+0.2"), "0.3"); assert.equal(g("=0.1+0.2"), 0.3);
  assert.equal(d("=(-8)^(1/3)"), "#VALUE!"); assert.equal(d("=1.2.3"), "#VALUE!");
  assert.equal(d("=1=1"), "TRUE"); assert.equal(d("=1/0+FOO()"), "#DIV/0!");
  assert.equal(d('="#DIV/0!"'), "#DIV/0!"); assert.equal(g("#DIV/0!"), "#DIV/0!");
  assert.equal(g('=TRUE&""'), "TRUE"); assert.equal(g("=7. + .5"), 7.5);
});
test("errors", () => {
  assert.equal(d("=FOO(1)+1/0"), "#NAME?"); assert.equal(d("=1/0&FOO()"), "#DIV/0!");
  assert.equal(d("=-FOO()"), "#NAME?");
  assert.equal(d("=2^1024"), "#VALUE!"); assert.equal(d("=FOO(1,)"), "#VALUE!"); assert.equal(d("=FOO"), "#VALUE!");
  assert.equal(d("=0/0"), "#DIV/0!"); assert.equal(d('="a"=1'), "#VALUE!");
  const s = createSheet(); s.set("A1", "#DIV/0!"); assert.equal(s.get("A1"), "#DIV/0!"); // typed text stays text
});

test("get returns errors as code strings (ISS-9)", () => {
  assert.equal(g("=1/0"), "#DIV/0!"); assert.equal(g('="a"+1'), "#VALUE!"); assert.equal(g("=FOO(1)"), "#NAME?");
  assert.equal(g("=(1+2"), "#VALUE!");
});

test("wave 2: refs and recalculation through chains", () => {
  const s = createSheet();
  s.set("A1", "5");
  s.set("B1", "=A1*2");
  assert.equal(s.get("B1"), 10);
  s.set("C1", "=b1+1");
  s.set("A1", "6");
  assert.equal(s.get("B1"), 12);
  assert.equal(s.get("C1"), 13);
  assert.equal(s.get("D1"), "");
  s.set("D2", "=E9");
  assert.equal(s.get("D2"), "");
});

test("wave 2: a value of exactly 10 is returned as 10", () => {
  const s = createSheet();
  s.set("A1", "10");
  s.set("A2", "=5*2");
  assert.equal(s.get("A1"), 10);
  assert.equal(s.get("A2"), 10);
  assert.equal(s.display("A2"), "10");
});
