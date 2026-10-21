import { test } from "node:test";
import assert from "node:assert/strict";
import { ERRORS, isError, toNumber, toText, parseLiteral } from "./values.mjs";

test("ERRORS constants", () => {
  assert.deepEqual({ ...ERRORS }, { DIV0: "#DIV/0!", REF: "#REF!", NAME: "#NAME?", VALUE: "#VALUE!", CYCLE: "#CYCLE!" });
});

test("isError", () => {
  for (const e of Object.values(ERRORS)) assert.equal(isError(e), true);
  for (const v of ["#N/A", "", "x", 0, true, null, undefined, "#value!"]) assert.equal(isError(v), false);
});

test("toNumber", () => {
  assert.equal(toNumber(""), 0);
  assert.equal(toNumber(true), 1);
  assert.equal(toNumber(false), 0);
  assert.equal(toNumber(4.5), 4.5);
  assert.equal(toNumber(ERRORS.DIV0), ERRORS.DIV0);
  assert.equal(toNumber(" -2.5 "), -2.5);
  assert.equal(toNumber("+3"), 3);
  assert.equal(toNumber(".5"), 0.5);
  assert.equal(toNumber("7."), 7);
  for (const bad of ["abc", "1e3", "1.2.3", "- 2", "  ", ".", "-", "0x10", "Infinity", "TRUE"]) {
    assert.equal(toNumber(bad), ERRORS.VALUE, bad);
  }
});

test("toText", () => {
  assert.equal(toText(""), "");
  assert.equal(toText(true), "TRUE");
  assert.equal(toText(false), "FALSE");
  assert.equal(toText(2.5), "2.5");
  assert.equal(toText("hi"), "hi");
  assert.equal(toText(ERRORS.REF), ERRORS.REF);
});

test("parseLiteral", () => {
  assert.equal(parseLiteral("42"), 42);
  assert.equal(parseLiteral(" -2.5 "), -2.5);
  assert.equal(parseLiteral("TRUE"), "TRUE");
  assert.equal(parseLiteral("hello"), "hello");
  assert.equal(parseLiteral("1e3"), "1e3");
  assert.equal(parseLiteral(""), "");
});
