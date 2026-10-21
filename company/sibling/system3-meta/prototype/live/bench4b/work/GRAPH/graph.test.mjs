import { test } from "node:test";
import assert from "node:assert/strict";
import { cycleCells } from "./graph.mjs";

const sorted = (s) => [...s].sort();

test("no cycles", () => {
  assert.deepEqual(sorted(cycleCells(new Map())), []);
  assert.deepEqual(sorted(cycleCells(new Map([["A1", ["B1"]], ["B1", ["C1"]], ["C2", ["A1", "B1"]]]))), []);
});

test("self reference", () => {
  assert.deepEqual(sorted(cycleCells(new Map([["A1", ["A1"]], ["B1", ["A1"]]]))), ["A1"]);
});

test("two-cell and longer cycles, dependents excluded", () => {
  const deps = new Map([
    ["A1", ["B1"]], ["B1", ["A1"]],
    ["C1", ["D1"]], ["D1", ["E1"]], ["E1", ["C1", "F1"]],
    ["G1", ["A1", "C1"]], ["H1", ["G1"]],
  ]);
  assert.deepEqual(sorted(cycleCells(deps)), ["A1", "B1", "C1", "D1", "E1"]);
});

test("returns a Set; long chain does not overflow", () => {
  const deps = new Map();
  for (let i = 0; i < 50000; i++) deps.set("N" + i, ["N" + (i + 1)]);
  deps.set("N50000", ["N0"]);
  const r = cycleCells(deps);
  assert.ok(r instanceof Set);
  assert.equal(r.size, 50001);
});

test("a lone two-cell cycle is reported (regression: size-2 sets were dropped)", () => {
  assert.deepEqual(sorted(cycleCells(new Map([["A1", ["B1"]], ["B1", ["A1"]]]))), ["A1", "B1"]);
  assert.deepEqual(sorted(cycleCells(new Map([["A1", ["A1"]], ["B2", ["B2"]]]))), ["A1", "B2"]);
  assert.deepEqual(sorted(cycleCells(new Map([["A1", ["B1"]], ["B1", ["A1"]], ["C1", ["A1"]]]))), ["A1", "B1"]);
});
