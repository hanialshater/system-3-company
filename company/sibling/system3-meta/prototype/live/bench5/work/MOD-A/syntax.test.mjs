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

test("refsOf is empty in wave 1", () => {
  assert.deepEqual(refsOf(parseFormula("1+2")), []);
  assert.deepEqual(refsOf(ERR), []);
});
