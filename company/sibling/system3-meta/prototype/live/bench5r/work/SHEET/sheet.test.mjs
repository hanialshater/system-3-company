import { test } from "node:test";
import assert from "node:assert/strict";
import { createSheet } from "./sheet.mjs";
import { ERR } from "../MOD-B/values.mjs";

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
    ['="a"+1', ERR.VALUE], ["=1/0", ERR.DIV0], ["=(1+2", ERR.VALUE], ["=FOO(1)", ERR.NAME], ["=TRUE+1", 2],
    ["=(-8)^(1/3)", ERR.VALUE], ["=1.2.3", ERR.VALUE], ["=1/0+FOO()", ERR.DIV0], ['=""+1', 1], ['="3"*2', 6]];
  for (const [f, v] of cases) assert.equal(ev(f).get("A1"), v, f);
});

test("display", () => {
  assert.equal(ev("=1/3").display("A1"), "0.333333333");
  assert.equal(ev("=0.1+0.2").display("A1"), "0.3");
  assert.equal(ev("=1<2").display("A1"), "TRUE");
  assert.equal(ev("=1/0").display("A1"), "#DIV/0!");
  assert.equal(ev("#DIV/0!").get("A1"), "#DIV/0!");
  assert.equal(ev("=0.1+0.2").get("A1"), 0.3);
});
