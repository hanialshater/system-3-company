import { test } from "node:test";
import assert from "node:assert/strict";
import { createSheet } from "./sheet.mjs";
import { ERRORS } from "../VALUES/values.mjs";

test("literals and clearing", () => {
  const s = createSheet();
  assert.equal(s.get("A1"), "");
  s.set("A1", " 2.5 ");
  assert.equal(s.get("a1"), 2.5);
  s.set("A2", "TRUE");
  assert.equal(s.get("A2"), "TRUE");
  s.set("A1", "");
  assert.equal(s.get("A1"), "");
  assert.throws(() => s.set("AA1", "1"), Error);
  assert.throws(() => s.set("A0", "1"), Error);
});

test("formulas and recalculation", () => {
  const s = createSheet();
  s.set("A1", "1");
  s.set("B1", "=A1*2");
  s.set("C1", "=B1+1");
  assert.equal(s.get("C1"), 3);
  s.set("A1", "10");
  assert.equal(s.get("C1"), 21);
  s.set("D1", "=SUM(A1:C1)");
  assert.equal(s.get("D1"), 51);
  s.set("E1", "=1+");
  assert.equal(s.get("E1"), ERRORS.VALUE);
  s.set("F1", "=0.1+0.2");
  assert.equal(s.get("F1"), 0.3);
  assert.equal(s.display("F1"), "0.3");
  s.set("G1", "=1/3");
  assert.equal(s.display("G1"), "0.333333333");
  s.set("H1", "=1>0");
  assert.equal(s.display("H1"), "TRUE");
});

test("cycles", () => {
  const s = createSheet();
  s.set("A1", "=B1");
  s.set("B1", "=A1");
  s.set("C1", "=A1+1");
  s.set("D1", "=D1");
  assert.equal(s.get("A1"), ERRORS.CYCLE);
  assert.equal(s.get("B1"), ERRORS.CYCLE);
  assert.equal(s.get("C1"), ERRORS.CYCLE);
  assert.equal(s.get("D1"), ERRORS.CYCLE);
  s.set("B1", "5");
  assert.equal(s.get("A1"), 5);
  assert.equal(s.get("C1"), 6);
});

test("formulas read the rounded value get() returns", () => {
  const s = createSheet();
  s.set("A1", "=0.1+0.2");
  s.set("B1", "=A1=0.3");
  s.set("C1", '=A1&""');
  assert.equal(s.get("B1"), true);
  assert.equal(s.get("C1"), "0.3");
  s.set("D1", "=1/3");
  s.set("E1", "=LEN(D1)");
  assert.equal(s.get("E1"), 11);
  s.set("F1", "=SUM(A1:A1)=0.3");
  assert.equal(s.get("F1"), true);
  s.set("G1", "=IF(A1-0.3,1,2)");
  assert.equal(s.get("G1"), 2);
  s.set("H1", "=-0");
  assert.ok(Object.is(s.get("H1"), 0));
});
