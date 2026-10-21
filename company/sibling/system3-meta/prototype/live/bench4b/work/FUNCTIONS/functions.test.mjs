import { test } from "node:test";
import assert from "node:assert/strict";
import { callFunction } from "./functions.mjs";
import { ERRORS, toNumber } from "../VALUES/values.mjs";

// Tiny stand-in evaluator over literal/ref nodes.
function makeCtx(cells) {
  const evaluated = [];
  const cell = (r) => (r in cells ? cells[r] : "");
  const evaluate = (a) => {
    evaluated.push(a);
    if (a.type === "num" || a.type === "str" || a.type === "bool") return a.value;
    if (a.type === "ref") return cell(a.ref);
    if (a.type === "range") return ERRORS.VALUE;
    if (a.type === "neg") { const n = toNumber(evaluate(a.arg)); return typeof n === "number" ? -n : n; }
    throw new Error("unsupported " + a.type);
  };
  return { ctx: { evaluate, cell }, evaluated };
}
const n = (value) => ({ type: "num", value });
const s = (value) => ({ type: "str", value });
const ref = (r) => ({ type: "ref", ref: r });
const rng = (from, to) => ({ type: "range", from, to });

const cells = { A1: 1, A2: 2, A3: "text", A4: "", B1: 10, B2: true, C1: ERRORS.DIV0 };

test("aggregates over ranges skip text, blanks, booleans", () => {
  const { ctx } = makeCtx(cells);
  assert.equal(callFunction("SUM", [rng("A1", "B4")], ctx), 13);
  assert.equal(callFunction("COUNT", [rng("A1", "B4")], ctx), 3);
  assert.equal(callFunction("MIN", [rng("A1", "B4")], ctx), 1);
  assert.equal(callFunction("MAX", [rng("A1", "B4")], ctx), 10);
  assert.equal(callFunction("AVERAGE", [rng("A1", "A4")], ctx), 1.5);
});

test("aggregates of nothing", () => {
  const { ctx } = makeCtx({});
  assert.equal(callFunction("SUM", [], ctx), 0);
  assert.equal(callFunction("MIN", [], ctx), 0);
  assert.equal(callFunction("MAX", [], ctx), 0);
  assert.equal(callFunction("COUNT", [], ctx), 0);
  assert.equal(callFunction("AVERAGE", [], ctx), ERRORS.DIV0);
  assert.equal(callFunction("AVERAGE", [rng("D1", "D5")], ctx), ERRORS.DIV0);
});

test("aggregate errors", () => {
  const { ctx } = makeCtx(cells);
  assert.equal(callFunction("SUM", [rng("A1", "C1")], ctx), ERRORS.DIV0);
  assert.equal(callFunction("SUM", [rng("A1", "AA1")], ctx), ERRORS.REF);
  assert.equal(callFunction("SUM", [s("abc")], ctx), ERRORS.VALUE);
  assert.equal(callFunction("SUM", [n(1), s(" 2 "), { type: "bool", value: true }, ref("A4")], ctx), 4);
  assert.equal(callFunction("MAX", [n(-5), n(-3)], ctx), -3);
});

test("unknown name", () => {
  const { ctx } = makeCtx({});
  assert.equal(callFunction("NOPE", [], ctx), ERRORS.NAME);
});

test("IF arity, errors and laziness", () => {
  const { ctx, evaluated } = makeCtx(cells);
  assert.equal(callFunction("IF", [n(1)], ctx), ERRORS.VALUE);
  assert.equal(callFunction("IF", [n(1), n(2), n(3), n(4)], ctx), ERRORS.VALUE);
  assert.equal(callFunction("IF", [ref("C1"), n(2), n(3)], ctx), ERRORS.DIV0);
  assert.equal(callFunction("IF", [n(0), n(2)], ctx), false);
  evaluated.length = 0;
  const a = n(2), b = n(3);
  assert.equal(callFunction("IF", [n(5), a, b], ctx), 2);
  assert.ok(evaluated.includes(a) && !evaluated.includes(b));
  evaluated.length = 0;
  assert.equal(callFunction("IF", [s(""), a, b], ctx), 3);
  assert.ok(!evaluated.includes(a));
});

test("ABS, ROUND, LEN", () => {
  const { ctx } = makeCtx(cells);
  assert.equal(callFunction("ABS", [n(-3)], ctx), 3);
  assert.equal(callFunction("ABS", [], ctx), ERRORS.VALUE);
  assert.equal(callFunction("ABS", [n(1), n(2)], ctx), ERRORS.VALUE);
  assert.equal(callFunction("ROUND", [n(2.5)], ctx), 3);
  assert.equal(callFunction("ROUND", [n(3.14159), n(2)], ctx), 3.14);
  assert.equal(callFunction("ROUND", [n(1234), n(-2)], ctx), 1200);
  assert.equal(callFunction("ROUND", [], ctx), ERRORS.VALUE);
  assert.equal(callFunction("ROUND", [s("x")], ctx), ERRORS.VALUE);
  assert.equal(callFunction("LEN", [s("hello")], ctx), 5);
  assert.equal(callFunction("LEN", [{ type: "bool", value: true }], ctx), 4);
  assert.equal(callFunction("LEN", [n(12.5)], ctx), 4);
  assert.equal(callFunction("LEN", [ref("C1")], ctx), ERRORS.DIV0);
  assert.equal(callFunction("LEN", [], ctx), ERRORS.VALUE);
});
