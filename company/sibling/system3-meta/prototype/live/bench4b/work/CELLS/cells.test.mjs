import { test } from "node:test";
import assert from "node:assert/strict";
import { isRef, rangeCells, refsOf } from "./cells.mjs";

test("isRef", () => {
  for (const s of ["A1", "Z99", "B10", "M5"]) assert.equal(isRef(s), true, s);
  for (const s of ["A0", "A01", "A100", "AA1", "a1", "1A", "", "A", null, 5]) assert.equal(isRef(s), false, String(s));
});

test("rangeCells order and corners", () => {
  const want = ["A1", "A2", "A3", "B1", "B2", "B3"];
  assert.deepEqual(rangeCells("A1", "B3"), want);
  assert.deepEqual(rangeCells("B3", "A1"), want);
  assert.deepEqual(rangeCells("A3", "B1"), want);
  assert.deepEqual(rangeCells("B1", "A3"), want);
  assert.deepEqual(rangeCells("C2", "C2"), ["C2"]);
  assert.equal(rangeCells("A1", "AA1"), null);
  assert.equal(rangeCells("A0", "B2"), null);
});

test("refsOf walks every node", () => {
  const ast = {
    type: "bin", op: "+",
    left: { type: "neg", arg: { type: "ref", ref: "A1" } },
    right: { type: "call", name: "SUM", args: [
      { type: "range", from: "B1", to: "B2" },
      { type: "ref", ref: "AA1" },
      { type: "range", from: "A1", to: "ZZ9" },
      { type: "num", value: 1 },
      { type: "str", value: "C3" },
    ] },
  };
  assert.deepEqual([...refsOf(ast)].sort(), ["A1", "B1", "B2"]);
  assert.ok(refsOf({ type: "num", value: 1 }) instanceof Set);
  assert.equal(refsOf({ type: "num", value: 1 }).size, 0);
  assert.deepEqual([...refsOf({ type: "call", name: "SUM", args: [] })], []);
});
