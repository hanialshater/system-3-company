import { test } from "node:test";
import assert from "node:assert/strict";
import { display } from "./format.mjs";
import { ERRORS } from "../VALUES/values.mjs";

test("blank, booleans, text, errors", () => {
  assert.equal(display(""), "");
  assert.equal(display(true), "TRUE");
  assert.equal(display(false), "FALSE");
  assert.equal(display("hello"), "hello");
  for (const e of Object.values(ERRORS)) assert.equal(display(e), e);
});

test("numbers rounded to 9 places", () => {
  assert.equal(display(0.1 + 0.2), "0.3");
  assert.equal(display(1 / 3), "0.333333333");
  assert.equal(display(2 / 3), "0.666666667");
  assert.equal(display(42), "42");
  assert.equal(display(-2.5), "-2.5");
  assert.equal(display(0), "0");
  assert.equal(display(-1e-12), "0");
  assert.equal(display(123456789.123456789), "123456789.123456789".slice(0, 0) + String(Number((123456789.123456789).toFixed(9))));
});
