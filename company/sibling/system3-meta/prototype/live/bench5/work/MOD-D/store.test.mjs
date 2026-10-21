import { test } from "node:test";
import assert from "node:assert/strict";
import { createStore } from "./store.mjs";

// A fake evaluator: {type:"num"} literal, {type:"add", refs:[...]} sums ctx.get of refs.
function evaluate(ast, ctx) {
  if (ast.type === "num") return ast.value;
  if (ast.type === "add") return ast.cells.reduce((s, c) => s + (ctx.get(c) || 0), 0);
  return { error: "#VALUE!" };
}

test("requires evaluate", () => {
  assert.throws(() => createStore());
});

test("value cells, empty cells, raw, clear", () => {
  const s = createStore({ evaluate });
  assert.equal(s.get("A1"), "");
  assert.equal(s.raw("A1"), "");
  s.set("A1", { raw: " 7 ", ast: null, refs: [], value: 7 });
  assert.equal(s.get("A1"), 7);
  assert.equal(s.raw("A1"), " 7 ");
  s.set("A1", { raw: "hi", ast: null, refs: [], value: "hi" });
  assert.equal(s.get("A1"), "hi");
  s.clear("A1");
  assert.equal(s.get("A1"), "");
  assert.equal(s.raw("A1"), "");
});

test("formula cells are evaluated by the injected evaluate, unrounded", () => {
  const s = createStore({ evaluate });
  s.set("B2", { raw: "=1/3", ast: { type: "num", value: 1 / 3 }, refs: [] });
  assert.equal(s.get("B2"), 1 / 3);
  assert.equal(s.raw("B2"), "=1/3");
  s.set("B3", { raw: "=x", ast: { type: "bad" }, refs: [] });
  assert.deepEqual(s.get("B3"), { error: "#VALUE!" });
});

test("dependents recalculate (ready for wave 2)", () => {
  const s = createStore({ evaluate });
  s.set("A1", { raw: "1", ast: null, refs: [], value: 1 });
  s.set("B1", { raw: "=A1", ast: { type: "add", cells: ["A1"] }, refs: ["A1"] });
  s.set("C1", { raw: "=A1+B1", ast: { type: "add", cells: ["A1", "B1"] }, refs: ["A1", "B1"] });
  assert.equal(s.get("C1"), 2);
  s.set("A1", { raw: "5", ast: null, refs: [], value: 5 });
  assert.equal(s.get("B1"), 5);
  assert.equal(s.get("C1"), 10);
  s.clear("A1");
  assert.equal(s.get("C1"), 0);
});
