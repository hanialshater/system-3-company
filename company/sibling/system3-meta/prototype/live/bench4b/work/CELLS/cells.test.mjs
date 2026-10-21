import { test } from "node:test";
import assert from "node:assert/strict";
import { isRef, rangeCells, refsOf } from "./cells.mjs";

test("isRef", () => {
  for (const s of ["A1", "Z99", "B10", "M5"]) assert.equal(isRef(s), true, s);
  for (const s of ["a1", "A0", "A01", "A100", "AA1", "1A", "", "A", "A1 ", null, undefined, 5])
    assert.equal(isRef(s), false, String(s));
});

test("rangeCells order and corners", () => {
  assert.deepEqual(rangeCells("A1", "B2"), ["A1", "A2", "B1", "B2"]);
  assert.deepEqual(rangeCells("B2", "A1"), ["A1", "A2", "B1", "B2"]);
  assert.deepEqual(rangeCells("A2", "B1"), ["A1", "A2", "B1", "B2"]);
  assert.deepEqual(rangeCells("C3", "C3"), ["C3"]);
  assert.equal(rangeCells("A1", "AA1"), null);
  assert.equal(rangeCells("A0", "B1"), null);
  assert.equal(rangeCells("a1", "B1"), null);
});

test("refsOf walks every node", () => {
  const ast = {
    type: "bin", op: "+",
    left: { type: "neg", arg: { type: "ref", ref: "C1" } },
    right: { type: "call", name: "SUM", args: [
      { type: "range", from: "A1", to: "A3" },
      { type: "ref", ref: "AA1" },
      { type: "range", from: "A1", to: "ZZ9" },
      { type: "num", value: 2 },
      { type: "ref", ref: "A2" },
    ] },
  };
  assert.deepEqual([...refsOf(ast)].sort(), ["A1", "A2", "A3", "C1"]);
  assert.ok(refsOf({ type: "num", value: 1 }) instanceof Set);
  assert.equal(refsOf({ type: "call", name: "SUM", args: [] }).size, 0);
});
