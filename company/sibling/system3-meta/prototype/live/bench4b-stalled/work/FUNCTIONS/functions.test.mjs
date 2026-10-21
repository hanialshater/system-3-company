import { test } from "node:test";
import assert from "node:assert/strict";
import { callFunction } from "./functions.mjs";
import { ERRORS } from "../VALUES/values.mjs";

// A tiny evaluator for literal ASTs plus a fixed grid.
function makeCtx(cells, log = []) {
  const cell = (r) => (r in cells ? cells[r] : "");
  const evaluate = (a) => {
    log.push(a);
    if (a.type === "num" || a.type === "str" || a.type === "bool") return a.value;
    if (a.type === "ref") return cell(a.ref);
    if (a.type === "range") return ERRORS.VALUE;
    throw new Error("unexpected " + a.type);
  };
  return { evaluate, cell };
}
const num = (value) => ({ type: "num", value });
const str = (value) => ({ type: "str", value });
const range = (from, to) => ({ type: "range", from, to });

const grid = { A1: 1, A2: 2, A3: "text", B1: 4, B2: "", B3: true };

test("unknown name", () => {
  assert.equal(callFunction("NOPE", [], makeCtx({})), ERRORS.NAME);
});

test("aggregates over ranges and args", () => {
  const ctx = makeCtx(grid);
  assert.equal(callFunction("SUM", [range("A1", "B3")], ctx), 7);
  assert.equal(callFunction("COUNT", [range("B3", "A1")], ctx), 3);
  assert.equal(callFunction("MIN", [range("A1", "B3"), num(-3)], ctx), -3);
  assert.equal(callFunction("MAX", [range("A1", "B3")], ctx), 4);
  assert.equal(callFunction("AVERAGE", [range("A1", "A2")], ctx), 1.5);
  assert.equal(callFunction("SUM", [str("2"), { type: "bool", value: true }], ctx), 3);
  assert.equal(callFunction("SUM", [str("x")], ctx), ERRORS.VALUE);
  assert.equal(callFunction("SUM", [range("A1", "AA1")], ctx), ERRORS.REF);
});

test("empty aggregates", () => {
  const ctx = makeCtx({});
  assert.equal(callFunction("SUM", [], ctx), 0);
  assert.equal(callFunction("MIN", [], ctx), 0);
  assert.equal(callFunction("MAX", [], ctx), 0);
  assert.equal(callFunction("COUNT", [], ctx), 0);
  assert.equal(callFunction("AVERAGE", [], ctx), ERRORS.DIV0);
  assert.equal(callFunction("AVERAGE", [range("C1", "C3")], ctx), ERRORS.DIV0);
});

test("errors in range cells return at once", () => {
  const ctx = makeCtx({ A1: 1, A2: ERRORS.DIV0, A3: ERRORS.REF });
  assert.equal(callFunction("SUM", [range("A1", "A3")], ctx), ERRORS.DIV0);
  assert.equal(callFunction("COUNT", [range("A1", "A3")], ctx), ERRORS.DIV0);
});

test("IF evaluates only the chosen branch", () => {
  const log = [];
  const ctx = makeCtx(grid, log);
  const a = str("yes"), b = str("no");
  assert.equal(callFunction("IF", [num(1), a, b], ctx), "yes");
  assert.ok(!log.includes(b));
  log.length = 0;
  assert.equal(callFunction("IF", [num(0), a, b], ctx), "no");
  assert.ok(!log.includes(a));
  assert.equal(callFunction("IF", [num(0), a], ctx), false);
  assert.equal(callFunction("IF", [str(""), a], ctx), false);
  assert.equal(callFunction("IF", [str("abc"), a, b], ctx), ERRORS.VALUE);
  assert.equal(callFunction("IF", [str(ERRORS.NAME), a, b], ctx), ERRORS.NAME);
  assert.equal(callFunction("IF", [num(1)], ctx), ERRORS.VALUE);
  assert.equal(callFunction("IF", [num(1), a, b, b], ctx), ERRORS.VALUE);
});

test("ABS, ROUND, LEN", () => {
  const ctx = makeCtx(grid);
  assert.equal(callFunction("ABS", [num(-3)], ctx), 3);
  assert.equal(callFunction("ABS", [], ctx), ERRORS.VALUE);
  assert.equal(callFunction("ABS", [str("x")], ctx), ERRORS.VALUE);
  assert.equal(callFunction("ROUND", [num(2.5)], ctx), 3);
  assert.equal(callFunction("ROUND", [num(3.14159), num(2)], ctx), 3.14);
  assert.equal(callFunction("ROUND", [num(1234), num(-2)], ctx), 1200);
  assert.equal(callFunction("ROUND", [], ctx), ERRORS.VALUE);
  assert.equal(callFunction("ROUND", [num(1), num(2), num(3)], ctx), ERRORS.VALUE);
  assert.equal(callFunction("LEN", [str("hello")], ctx), 5);
  assert.equal(callFunction("LEN", [num(12.5)], ctx), 4);
  assert.equal(callFunction("LEN", [{ type: "bool", value: true }], ctx), 4);
  assert.equal(callFunction("LEN", [{ type: "ref", ref: "Z9" }], ctx), 0);
  assert.equal(callFunction("LEN", [str(ERRORS.DIV0)], ctx), ERRORS.DIV0);
  assert.equal(callFunction("LEN", [], ctx), ERRORS.VALUE);
});
