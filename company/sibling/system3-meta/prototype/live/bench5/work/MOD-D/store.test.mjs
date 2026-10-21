import { test } from "node:test";
import assert from "node:assert/strict";
import { createStore } from "./store.mjs";

// A fake evaluator: {type:"num"} literal, {type:"add", refs:[...]} sums ctx.get of refs.
function evaluate(ast, ctx) {
  if (ast.type === "num") return ast.value;
  if (ast.type === "add") return ast.cells.reduce((s, c) => s + (ctx.get(c) || 0), 0);
  if (ast.type === "error") return { error: ast.code };
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

// wave 3 helpers
const f = (...cells) => ({ raw: "=" + cells.join("+"), ast: { type: "add", cells }, refs: cells });
const v = (n) => ({ raw: String(n), ast: null, refs: [], value: n });
const CYC = { error: "#CIRC!" };

test("wave 3: self reference and a bare range over itself are cycles", () => {
  const s = createStore({ evaluate });
  s.set("A1", f("A1"));
  assert.deepEqual(s.get("A1"), CYC);
  s.set("A1", f("A1", "A2")); // like =A1:A2 in A1
  assert.deepEqual(s.get("A1"), CYC);
  s.set("A1", v(3));
  assert.equal(s.get("A1"), 3);
});

test("wave 3: indirect cycle, readers of it, and breaking it", () => {
  const s = createStore({ evaluate });
  s.set("A1", v(1));
  s.set("B1", f("A1"));
  s.set("C1", f("B1"));
  s.set("D1", f("C1")); // reads the chain
  assert.equal(s.get("D1"), 1);
  s.set("A1", f("C1")); // A1 -> C1 -> B1 -> A1
  for (const c of ["A1", "B1", "C1", "D1"]) assert.deepEqual(s.get(c), CYC, c);
  s.set("E1", f("D1")); // new reader of a cycle cell
  assert.deepEqual(s.get("E1"), CYC);
  s.set("B1", v(5)); // break inside the cycle
  assert.equal(s.get("B1"), 5);
  assert.equal(s.get("C1"), 5);
  assert.equal(s.get("A1"), 5);
  assert.equal(s.get("D1"), 5);
  assert.equal(s.get("E1"), 5);
  s.set("B1", f("A1")); // cycle again
  assert.deepEqual(s.get("E1"), CYC);
  s.clear("C1"); // clearing a member breaks it too
  assert.equal(s.get("A1"), 0);
  assert.equal(s.get("B1"), 0);
  assert.equal(s.get("D1"), 0);
  assert.equal(s.get("E1"), 0);
});

test("wave 3: cycle reached through a range dependency", () => {
  const s = createStore({ evaluate });
  s.set("A1", v(1));
  s.set("A2", v(2));
  s.set("A3", f("A1", "A2", "A3")); // SUM(A1:A3) in A3
  assert.deepEqual(s.get("A3"), CYC);
  s.set("B1", f("A3"));
  assert.deepEqual(s.get("B1"), CYC);
  s.set("A3", f("A1", "A2"));
  assert.equal(s.get("A3"), 3);
  assert.equal(s.get("B1"), 3);
});

test("wave 3: a cell beside a cycle is unaffected", () => {
  const s = createStore({ evaluate });
  s.set("A1", f("B1"));
  s.set("B1", f("A1"));
  s.set("C1", v(4));
  s.set("D1", f("C1"));
  assert.deepEqual(s.get("A1"), CYC);
  assert.equal(s.get("D1"), 4);
});

test("wave 3: 99-row chain and a whole-sheet sum recalc", () => {
  const s = createStore({ evaluate });
  s.set("A1", v(1));
  for (let r = 2; r <= 99; r++) s.set("A" + r, f("A" + (r - 1)));
  assert.equal(s.get("A99"), 1);
  s.set("A1", v(7));
  assert.equal(s.get("A99"), 7);
  const all = [];
  for (let c = 66; c <= 90; c++) for (let r = 1; r <= 10; r++) all.push(String.fromCharCode(c) + r);
  for (const c of all) if (c !== "Z10") s.set(c, v(1));
  s.set("Z10", f("A10", ...all.filter((c) => c !== "Z10")));
  assert.equal(s.get("Z10"), 7 + 249);
  s.set("A1", f("A99")); // close the long chain into a loop
  assert.deepEqual(s.get("A99"), CYC);
  assert.deepEqual(s.get("Z10"), CYC);
  s.set("A1", v(2));
  assert.equal(s.get("Z10"), 2 + 249);
});
