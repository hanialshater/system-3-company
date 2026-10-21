import { test } from "node:test";
import assert from "node:assert/strict";
import { createGraph } from "./graph.mjs";

const before = (order, a, b) => assert.ok(order.indexOf(a) < order.indexOf(b), `${a} before ${b} in ${order}`);

test("wave 1: trivial graph", () => {
  const g = createGraph();
  assert.deepEqual(g.recalcOrder("A1"), ["A1"]);
  g.setDeps("A1", []);
  assert.deepEqual(g.recalcOrder("A1"), ["A1"]);
  assert.equal(g.cyclic().size, 0);
  assert.ok(g.cyclic() instanceof Set);
});

test("chain and diamond in topological order", () => {
  const g = createGraph();
  g.setDeps("B1", ["A1"]);
  g.setDeps("C1", ["B1"]);
  assert.deepEqual(g.recalcOrder("A1"), ["A1", "B1", "C1"]);
  g.setDeps("D1", ["B1", "C1"]);
  g.setDeps("C1", ["A1"]);
  const o = g.recalcOrder("A1");
  assert.equal(o[0], "A1");
  assert.equal(o.length, 4);
  before(o, "B1", "D1"); before(o, "C1", "D1");
  assert.deepEqual(g.recalcOrder("D1"), ["D1"]);
});

test("deep diamond: each cell after all precedents", () => {
  const g = createGraph();
  g.setDeps("B1", ["A1"]);
  g.setDeps("C1", ["A1", "B1"]);
  g.setDeps("E1", ["C1", "A1"]);
  const o = g.recalcOrder("A1");
  assert.deepEqual(o, ["A1", "B1", "C1", "E1"]);
});

test("replacing and clearing deps", () => {
  const g = createGraph();
  g.setDeps("B1", ["A1"]);
  g.setDeps("B1", ["A2"]);
  assert.deepEqual(g.recalcOrder("A1"), ["A1"]);
  assert.deepEqual(g.recalcOrder("A2"), ["A2", "B1"]);
  g.setDeps("B1", []);
  assert.deepEqual(g.recalcOrder("A2"), ["A2"]);
});

test("cycles", () => {
  const g = createGraph();
  g.setDeps("A1", ["B1"]);
  g.setDeps("B1", ["A1"]);
  g.setDeps("C1", ["B1"]);
  assert.deepEqual([...g.cyclic()].sort(), ["A1", "B1", "C1"]); // wave 3: readers of a cycle too
  const o = g.recalcOrder("A1");
  assert.deepEqual([...o].sort(), ["A1", "B1", "C1"]);
  assert.equal(o[0], "A1");
  g.setDeps("A1", []);
  assert.equal(g.cyclic().size, 0);
  g.setDeps("D1", ["D1"]);
  assert.deepEqual([...g.cyclic()], ["D1"]);
  assert.deepEqual(g.recalcOrder("D1"), ["D1"]);
});

test("wave 3: dependents of a cycle are cyclic; breaking it clears; scale", () => {
  const g = createGraph();
  g.setDeps("A1", ["B1"]); g.setDeps("B1", ["A1"]);
  g.setDeps("C1", ["A1"]); g.setDeps("D1", ["C1"]); g.setDeps("E1", ["F1"]);
  assert.deepEqual([...g.cyclic()].sort(), ["A1", "B1", "C1", "D1"]);
  const order = g.recalcOrder("B1");
  assert.deepEqual([...order].sort(), ["A1", "B1", "C1", "D1"]);
  g.setDeps("B1", []);
  assert.equal(g.cyclic().size, 0);
  assert.deepEqual(g.recalcOrder("B1"), ["B1", "A1", "C1", "D1"]);
  // self range: =A1:A2 in A1
  g.setDeps("A1", ["A1", "A2"]);
  assert.ok(g.cyclic().has("A1"));
  // 99-row chain
  const h = createGraph();
  for (let r = 2; r <= 99; r++) h.setDeps("A" + r, ["A" + (r - 1)]);
  const o = h.recalcOrder("A1");
  assert.equal(o.length, 99);
  assert.deepEqual(o, Array.from({ length: 99 }, (_, i) => "A" + (i + 1)));
  assert.equal(h.cyclic().size, 0);
});
