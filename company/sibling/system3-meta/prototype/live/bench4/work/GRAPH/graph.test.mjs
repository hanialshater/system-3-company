import { test } from "node:test";
import assert from "node:assert/strict";
import { cycleCells } from "./graph.mjs";

const sorted = (s) => [...s].sort();

test("no cycles", () => {
  assert.equal(cycleCells(new Map()).size, 0);
  assert.equal(cycleCells(new Map([["A1", ["B1"]], ["B1", ["C1"]], ["C1", []]])).size, 0);
});

test("self reference", () => {
  assert.deepEqual(sorted(cycleCells(new Map([["A1", ["A1"]], ["B1", ["A1"]]]))), ["A1"]);
});

test("two-cell and longer cycles, dependents excluded", () => {
  const deps = new Map([
    ["A1", ["B1"]], ["B1", ["A1"]],
    ["C1", ["D1"]], ["D1", ["E1"]], ["E1", ["C1", "F1"]],
    ["G1", ["A1", "C1"]], ["H1", ["G1"]], ["F1", []],
  ]);
  assert.deepEqual(sorted(cycleCells(deps)), ["A1", "B1", "C1", "D1", "E1"]);
});

test("refs to cells without formulas", () => {
  assert.equal(cycleCells(new Map([["A1", ["Z9", "Z9"]]])).size, 0);
});

test("deep chain does not overflow", () => {
  const deps = new Map();
  for (let i = 0; i < 20000; i++) deps.set("n" + i, ["n" + (i + 1)]);
  deps.set("n20000", ["n0"]);
  assert.equal(cycleCells(deps).size, 20001);
});
