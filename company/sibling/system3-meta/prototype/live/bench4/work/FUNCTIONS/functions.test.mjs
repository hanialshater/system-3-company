import { test } from "node:test";
import assert from "node:assert/strict";
import { callFunction } from "./functions.mjs";
import { ERRORS } from "../VALUES/values.mjs";

// A tiny evaluator for literal ASTs and refs.
function makeCtx(cells = {}) {
  const evaluated = [];
  const cell = (r) => (r in cells ? cells[r] : "");
  const evaluate = (a) => {
    evaluated.push(a);
    if (a.type === "ref") return cell(a.ref);
    if (a.type === "range") return ERRORS.VALUE;
    return a.value;
  };
  return { ctx: { evaluate, cell }, evaluated };
}
const n = (value) => ({ type: "num", value });
const s = (value) => ({ type: "str", value });
const b = (value) => ({ type: "bool", value });
const range = (from, to) => ({ type: "range", from, to });

test("unknown name", () => {
  assert.equal(callFunction("NOPE", [], makeCtx().ctx), ERRORS.NAME);
  assert.equal(callFunction("TOSTRING", [], makeCtx().ctx), ERRORS.NAME);
});

test("aggregates over ranges and args", () => {
  const { ctx } = makeCtx({ A1: 1, A2: "x", A3: 5, B1: true, B2: "" });
  assert.equal(callFunction("SUM", [range("A1", "B3")], ctx), 6);
  assert.equal(callFunction("COUNT", [range("A1", "B3")], ctx), 2);
  assert.equal(callFunction("MIN", [range("A1", "A3")], ctx), 1);
  assert.equal(callFunction("MAX", [range("A3", "A1")], ctx), 5);
  assert.equal(callFunction("AVERAGE", [range("A1", "A3")], ctx), 3);
  assert.equal(callFunction("SUM", [n(2), s("3"), b(true)], ctx), 6);
  assert.equal(callFunction("SUM", [s("abc")], ctx), ERRORS.VALUE);
  assert.equal(callFunction("SUM", [range("A1", "AA1")], ctx), ERRORS.REF);
});

test("aggregates of nothing", () => {
  const { ctx } = makeCtx();
  assert.equal(callFunction("SUM", [], ctx), 0);
  assert.equal(callFunction("MIN", [], ctx), 0);
  assert.equal(callFunction("MAX", [], ctx), 0);
  assert.equal(callFunction("COUNT", [], ctx), 0);
  assert.equal(callFunction("AVERAGE", [], ctx), ERRORS.DIV0);
  assert.equal(callFunction("AVERAGE", [range("C1", "C3")], ctx), ERRORS.DIV0);
});

test("errors in ranges propagate", () => {
  const { ctx } = makeCtx({ A1: 1, A2: ERRORS.DIV0 });
  assert.equal(callFunction("SUM", [range("A1", "A3")], ctx), ERRORS.DIV0);
  assert.equal(callFunction("COUNT", [range("A1", "A3")], ctx), ERRORS.DIV0);
  assert.equal(callFunction("SUM", [s(ERRORS.NAME)], ctx), ERRORS.NAME);
});

test("IF", () => {
  const { ctx, evaluated } = makeCtx();
  const yes = s("yes"), no = s("no");
  assert.equal(callFunction("IF", [n(1), yes, no], ctx), "yes");
  assert.ok(!evaluated.includes(no));
  assert.equal(callFunction("IF", [n(0), yes, no], ctx), "no");
  assert.equal(callFunction("IF", [b(false), yes], ctx), false);
  assert.equal(callFunction("IF", [s(""), yes], ctx), false);
  assert.equal(callFunction("IF", [n(1)], ctx), ERRORS.VALUE);
  assert.equal(callFunction("IF", [n(1), yes, no, no], ctx), ERRORS.VALUE);
  assert.equal(callFunction("IF", [s(ERRORS.REF), yes, no], ctx), ERRORS.REF);
  assert.equal(callFunction("IF", [s("abc"), yes, no], ctx), ERRORS.VALUE);
});

test("ABS ROUND LEN", () => {
  const { ctx } = makeCtx();
  assert.equal(callFunction("ABS", [n(-3)], ctx), 3);
  assert.equal(callFunction("ABS", [s("-2")], ctx), 2);
  assert.equal(callFunction("ABS", [], ctx), ERRORS.VALUE);
  assert.equal(callFunction("ABS", [n(1), n(2)], ctx), ERRORS.VALUE);
  assert.equal(callFunction("ROUND", [n(2.5)], ctx), 3);
  assert.equal(callFunction("ROUND", [n(3.14159), n(2)], ctx), 3.14);
  assert.equal(callFunction("ROUND", [n(1234), n(-2)], ctx), 1200);
  assert.equal(callFunction("ROUND", [], ctx), ERRORS.VALUE);
  assert.equal(callFunction("ROUND", [n(1), n(2), n(3)], ctx), ERRORS.VALUE);
  assert.equal(callFunction("ROUND", [s("x")], ctx), ERRORS.VALUE);
  assert.equal(callFunction("LEN", [s("hello")], ctx), 5);
  assert.equal(callFunction("LEN", [b(true)], ctx), 4);
  assert.equal(callFunction("LEN", [n(2.5)], ctx), 3);
  assert.equal(callFunction("LEN", [s(ERRORS.DIV0)], ctx), ERRORS.DIV0);
  assert.equal(callFunction("LEN", [], ctx), ERRORS.VALUE);
});
