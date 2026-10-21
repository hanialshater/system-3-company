import { test } from "node:test";
import assert from "node:assert/strict";
import { display } from "./format.mjs";
import { ERRORS } from "../VALUES/values.mjs";

test("non-numbers", () => {
  assert.equal(display(""), "");
  assert.equal(display(true), "TRUE");
  assert.equal(display(false), "FALSE");
  assert.equal(display("hello"), "hello");
  assert.equal(display(ERRORS.DIV0), ERRORS.DIV0);
  assert.equal(display(ERRORS.CYCLE), ERRORS.CYCLE);
});

test("numbers rounded to 9 places", () => {
  assert.equal(display(0.1 + 0.2), "0.3");
  assert.equal(display(1 / 3), "0.333333333");
  assert.equal(display(2 / 3), "0.666666667");
  assert.equal(display(42), "42");
  assert.equal(display(-2.5), "-2.5");
  assert.equal(display(-1e-12), "0");
  assert.equal(display(1e21), "1e+21");
  assert.equal(display(1.5), "1.5");
});
