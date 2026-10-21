import { test } from "node:test";
import assert from "node:assert/strict";
import { cycleCells } from "./graph.mjs";

const sorted = (s) => [...s].sort();

test("no cycles", () => {
  assert.deepEqual(sorted(cycleCells(new Map())), []);
  assert.deepEqual(sorted(cycleCells(new Map([["A1", ["B1", "C1"]], ["B1", ["C1"]]]))), []);
});

test("self reference", () => {
  assert.deepEqual(sorted(cycleCells(new Map([["A1", ["A1"]], ["B1", ["A1"]]]))), ["A1"]);
});

test("two-cell and longer cycles, dependants excluded", () => {
  const deps = new Map([
    ["A1", ["B1"]], ["B1", ["A1"]],
    ["C1", ["D1"]], ["D1", ["E1"]], ["E1", ["C1", "F1"]],
    ["G1", ["A1", "C1"]], ["F1", []],
  ]);
  assert.deepEqual(sorted(cycleCells(deps)), ["A1", "B1", "C1", "D1", "E1"]);
});

test("targets not in the map and deep chains", () => {
  assert.deepEqual(sorted(cycleCells(new Map([["A1", ["Z99"]]]))), []);
  const deps = new Map();
  const n = 20000;
  for (let i = 0; i < n; i++) deps.set("N" + i, ["N" + ((i + 1) % n)]);
  assert.equal(cycleCells(deps).size, n);
});
