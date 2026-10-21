import { test } from "node:test";
import assert from "node:assert/strict";
import { isRef, rangeCells, refsOf } from "./cells.mjs";

test("isRef", () => {
  for (const s of ["A1", "Z99", "M10", "B9"]) assert.equal(isRef(s), true, s);
  for (const s of ["a1", "A0", "A01", "A100", "AA1", "1A", "A", "", " A1", "A1 ", null, 5])
    assert.equal(isRef(s), false, String(s));
});

test("rangeCells order and corners", () => {
  assert.deepEqual(rangeCells("A1", "B2"), ["A1", "A2", "B1", "B2"]);
  assert.deepEqual(rangeCells("B2", "A1"), ["A1", "A2", "B1", "B2"]);
  assert.deepEqual(rangeCells("A2", "B1"), ["A1", "A2", "B1", "B2"]);
  assert.deepEqual(rangeCells("C3", "C3"), ["C3"]);
  assert.equal(rangeCells("A1", "AA1"), null);
  assert.equal(rangeCells("A0", "B2"), null);
});

test("refsOf", () => {
  const ast = { type: "bin", op: "+",
    left: { type: "neg", arg: { type: "ref", ref: "A1" } },
    right: { type: "call", name: "SUM", args: [
      { type: "range", from: "B1", to: "B3" },
      { type: "ref", ref: "AA1" },
      { type: "range", from: "A1", to: "ZZ9" },
      { type: "num", value: 1 }, { type: "str", value: "C1" }, { type: "bool", value: true },
    ] } };
  assert.deepEqual([...refsOf(ast)].sort(), ["A1", "B1", "B2", "B3"]);
  assert.equal(refsOf({ type: "num", value: 3 }).size, 0);
  assert.equal(refsOf({ type: "call", name: "PI", args: [] }).size, 0);
});
