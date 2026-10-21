import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeCell, parseFormula, refsOf } from "./syntax.mjs";

const ERR = { type: "error", code: "#VALUE!" };
const num = (value) => ({ type: "num", value });
const bin = (op, left, right) => ({ type: "binary", op, left, right });

test("normalizeCell", () => {
  assert.equal(normalizeCell("a1"), "A1");
  assert.equal(normalizeCell("Z99"), "Z99");
  assert.equal(normalizeCell("b10"), "B10");
  for (const bad of ["A0", "A01", "A100", "AA1", "1A", "", " A1", "A", null, undefined, 5, {}]) {
    assert.throws(() => normalizeCell(bad), Error, String(bad));
  }
});

test("literals", () => {
  assert.deepEqual(parseFormula("3"), num(3));
  assert.deepEqual(parseFormula("2.5"), num(2.5));
  assert.deepEqual(parseFormula(".5"), num(0.5));
  assert.deepEqual(parseFormula("7."), num(7));
  assert.deepEqual(parseFormula('"a b"'), { type: "str", value: "a b" });
  assert.deepEqual(parseFormula('""'), { type: "str", value: "" });
  assert.deepEqual(parseFormula("tRuE"), { type: "bool", value: true });
  assert.deepEqual(parseFormula("false"), { type: "bool", value: false });
});

test("precedence and associativity", () => {
  assert.deepEqual(parseFormula("2+3*4"), bin("+", num(2), bin("*", num(3), num(4))));
  assert.deepEqual(parseFormula("2^3^2"), bin("^", num(2), bin("^", num(3), num(2))));
  assert.deepEqual(parseFormula("-2^2"), bin("^", { type: "unary", op: "-", arg: num(2) }, num(2)));
  assert.deepEqual(parseFormula("1-2-3"), bin("-", bin("-", num(1), num(2)), num(3)));
  assert.deepEqual(parseFormula('"n="&5'), bin("&", { type: "str", value: "n=" }, num(5)));
  assert.deepEqual(parseFormula("1+2&3=4"),
    bin("=", bin("&", bin("+", num(1), num(2)), num(3)), num(4)));
  assert.deepEqual(parseFormula("1<=2"), bin("<=", num(1), num(2)));
  assert.deepEqual(parseFormula("1<>2"), bin("<>", num(1), num(2)));
  assert.deepEqual(parseFormula(" ( 1 + 2 ) * 3 "), bin("*", bin("+", num(1), num(2)), num(3)));
  assert.deepEqual(parseFormula("--+1"), { type: "unary", op: "-", arg: { type: "unary", op: "-", arg: { type: "unary", op: "+", arg: num(1) } } });
});

test("calls", () => {
  assert.deepEqual(parseFormula("foo(1)"), { type: "call", name: "FOO", args: [num(1)] });
  assert.deepEqual(parseFormula("F()"), { type: "call", name: "F", args: [] });
  assert.deepEqual(parseFormula("f(1,2+3)").args.length, 2);
});

test("bad syntax gives an error node, never throws", () => {
  for (const bad of ["", "(1+2", "1.2.3", "1+", "*2", '"abc', "1 2", "abc", ".", "1)", "f(1,", "#", "2**3", null]) {
    assert.deepEqual(parseFormula(bad), ERR, String(bad));
  }
});

test("refsOf has no refs for literal formulas", () => {
  assert.deepEqual(refsOf(parseFormula("1+2")), []);
  assert.deepEqual(refsOf(ERR), []);
});

const REF = { type: "error", code: "#REF!" };

test("wave 2: refs", () => {
  assert.deepEqual(parseFormula("a1*2"), bin("*", { type: "ref", cell: "A1" }, num(2)));
  assert.deepEqual(parseFormula("Z99"), { type: "ref", cell: "Z99" });
  for (const bad of ["AA1", "A100", "A0", "a01"]) assert.deepEqual(parseFormula(bad), REF, bad);
  assert.deepEqual(parseFormula("A100+1"), bin("+", REF, num(1)));
  assert.deepEqual(parseFormula("-b2"), { type: "unary", op: "-", arg: { type: "ref", cell: "B2" } });
  assert.deepEqual(parseFormula("abc"), ERR); // not cell-shaped: bad syntax
  assert.deepEqual(parseFormula("A1B"), ERR);
});

test("wave 2: ranges", () => {
  assert.deepEqual(parseFormula("sum(a1:b3)"),
    { type: "call", name: "SUM", args: [{ type: "range", from: "A1", to: "B3" }] });
  assert.deepEqual(parseFormula("B3:A1"), { type: "range", from: "A1", to: "B3" });
  assert.deepEqual(parseFormula("A3:B1"), { type: "range", from: "A1", to: "B3" });
  assert.deepEqual(parseFormula("SUM(A1:A100)").args[0], REF);
  assert.deepEqual(parseFormula("SUM(AA1:A2)").args[0], REF);
  for (const bad of ["A1:", ":A1", "A1:1", "A1:B2:C3", "SUM(A1:FOO)"]) assert.deepEqual(parseFormula(bad), ERR, bad);
});

test("wave 2: refsOf", () => {
  assert.deepEqual(refsOf(parseFormula("A1+a1*B2")), ["A1", "B2"]);
  assert.deepEqual(refsOf(parseFormula("SUM(B2:A1, C1)")), ["A1", "A2", "B1", "B2", "C1"]);
  assert.deepEqual(refsOf(parseFormula("IF(A1, B1, C1)")), ["A1", "B1", "C1"]);
  assert.deepEqual(refsOf(parseFormula("A100+B1")), ["B1"]);
});
