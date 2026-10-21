import { test } from "node:test";
import assert from "node:assert/strict";
import { createSheet } from "./sheet.mjs";
import { ERRORS } from "../VALUES/values.mjs";

test("literals and clearing", () => {
  const s = createSheet();
  assert.equal(s.get("A1"), "");
  s.set("A1", " -2.5 ");
  assert.equal(s.get("a1"), -2.5);
  s.set("a2", "TRUE");
  assert.equal(s.get("A2"), "TRUE");
  s.set("A3", "hello");
  assert.equal(s.display("A3"), "hello");
  s.set("A1", "");
  assert.equal(s.get("A1"), "");
  assert.equal(s.display("A1"), "");
});

test("bad cell names throw", () => {
  const s = createSheet();
  for (const bad of ["AA1", "A0", "A100", "1A", "", "A01"]) assert.throws(() => s.set(bad, "1"), Error, bad);
});

test("formulas and recalculation", () => {
  const s = createSheet();
  s.set("A1", "2");
  s.set("A2", "=A1*10");
  s.set("A3", "=sum(A1:A2)");
  assert.equal(s.get("A3"), 22);
  s.set("A1", "3");
  assert.equal(s.get("A2"), 30);
  assert.equal(s.get("A3"), 33);
  s.set("B1", "=A3&\"!\"");
  assert.equal(s.get("B1"), "33!");
  s.set("A1", "");
  assert.equal(s.get("A3"), 0);
});

test("rounding and display", () => {
  const s = createSheet();
  s.set("A1", "=0.1+0.2");
  assert.equal(s.get("A1"), 0.3);
  s.set("A2", "=1/3");
  assert.equal(s.get("A2"), 0.333333333);
  assert.equal(s.display("A2"), "0.333333333");
  s.set("A3", "=1>0");
  assert.equal(s.get("A3"), true);
  assert.equal(s.display("A3"), "TRUE");
});

test("bad formulas and errors", () => {
  const s = createSheet();
  s.set("A1", "=1+");
  assert.equal(s.get("A1"), ERRORS.VALUE);
  s.set("A2", "=");
  assert.equal(s.get("A2"), ERRORS.VALUE);
  s.set("A3", "=1/0");
  assert.equal(s.display("A3"), ERRORS.DIV0);
  s.set("A4", "=A3+1");
  assert.equal(s.get("A4"), ERRORS.DIV0);
  s.set("A5", "=NOPE(1)");
  assert.equal(s.get("A5"), ERRORS.NAME);
  s.set("A6", "=AA1");
  assert.equal(s.get("A6"), ERRORS.REF);
});

test("cycles", () => {
  const s = createSheet();
  s.set("A1", "=B1+1");
  s.set("B1", "=A1+1");
  s.set("C1", "=A1*2");
  s.set("D1", "=D1");
  s.set("E1", "=IF(TRUE, 1, E1)");
  assert.equal(s.get("A1"), ERRORS.CYCLE);
  assert.equal(s.get("B1"), ERRORS.CYCLE);
  assert.equal(s.get("C1"), ERRORS.CYCLE);
  assert.equal(s.get("D1"), ERRORS.CYCLE);
  assert.equal(s.get("E1"), ERRORS.CYCLE);
  s.set("B1", "5");
  assert.equal(s.get("A1"), 6);
  assert.equal(s.get("C1"), 12);
});
