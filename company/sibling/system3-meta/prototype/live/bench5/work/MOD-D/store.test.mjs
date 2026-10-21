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

// Wave 2 fake: {type:"sumrange", from, to} sums ctx.range rows; counts evaluations.
function evaluate2(ast, ctx) {
  if (ast.type === "sumrange") return ctx.range(ast.from, ast.to).flat().reduce((s, v) => s + (v || 0), 0);
  if (ast.type === "rows") return ctx.range(ast.from, ast.to);
  return evaluate(ast, ctx);
}
const val = (s, cell, value) => s.set(cell, { raw: String(value), ast: null, refs: [], value });

test("wave 2: ctx.range gives rows, any corner order, blanks as \"\"", () => {
  const s = createStore({ evaluate: evaluate2 });
  val(s, "A1", 1); val(s, "B1", 2); val(s, "A2", 3);
  s.set("D1", { raw: "=", ast: { type: "rows", from: "B2", to: "A1" }, refs: ["A1", "A2", "B1", "B2"] });
  assert.deepEqual(s.get("D1"), [[1, 2], [3, ""]]);
});

test("wave 2: range dependents recalc", () => {
  const s = createStore({ evaluate: evaluate2 });
  const refs = ["A1", "A2", "A3", "A4"];
  refs.forEach((c, i) => val(s, c, i + 1));
  s.set("B1", { raw: "=SUM(A1:A4)", ast: { type: "sumrange", from: "A1", to: "A4" }, refs });
  assert.equal(s.get("B1"), 10);
  val(s, "A3", 30);
  assert.equal(s.get("B1"), 37);
  s.clear("A4");
  assert.equal(s.get("B1"), 33);
});

test("wave 2: diamond and long chain recalc in dependency order", () => {
  const s = createStore({ evaluate });
  val(s, "A1", 1);
  const f = (cells) => ({ raw: "=", ast: { type: "add", cells }, refs: cells });
  s.set("B1", f(["A1"]));
  s.set("C1", f(["A1"]));
  s.set("D1", f(["B1", "C1"]));
  s.set("E1", f(["D1", "A1"]));
  val(s, "A1", 2);
  assert.equal(s.get("D1"), 4);
  assert.equal(s.get("E1"), 6);
  // chain of 50, set out of order (formulas before their inputs)
  for (let r = 50; r >= 2; r--) s.set("Z" + r, f(["Z" + (r - 1)]));
  val(s, "Z1", 7);
  assert.equal(s.get("Z50"), 7);
});

test("wave 2: replacing a formula drops its old edges", () => {
  const s = createStore({ evaluate });
  val(s, "A1", 1); val(s, "A2", 100);
  s.set("B1", { raw: "=A1", ast: { type: "add", cells: ["A1"] }, refs: ["A1"] });
  s.set("B1", { raw: "=A2", ast: { type: "add", cells: ["A2"] }, refs: ["A2"] });
  val(s, "A1", 5);
  assert.equal(s.get("B1"), 100);
  val(s, "A2", 3);
  assert.equal(s.get("B1"), 3);
});
