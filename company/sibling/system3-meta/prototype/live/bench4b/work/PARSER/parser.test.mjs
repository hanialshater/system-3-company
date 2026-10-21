import { test } from "node:test";
import assert from "node:assert/strict";
import { parse } from "./parse.mjs";

const num = (value) => ({ type: "num", value });
const bin = (op, left, right) => ({ type: "bin", op, left, right });
const ref = (r) => ({ type: "ref", ref: r });

test("atoms", () => {
  assert.deepEqual(parse("3"), num(3));
  assert.deepEqual(parse('"hi"'), { type: "str", value: "hi" });
  assert.deepEqual(parse("true"), { type: "bool", value: true });
  assert.deepEqual(parse("FALSE"), { type: "bool", value: false });
  assert.deepEqual(parse("a1"), ref("A1"));
  assert.deepEqual(parse("AA1"), ref("AA1"));
  assert.deepEqual(parse("a1:b3"), { type: "range", from: "A1", to: "B3" });
});

test("calls", () => {
  assert.deepEqual(parse("sum()"), { type: "call", name: "SUM", args: [] });
  assert.deepEqual(parse("IF(A1>1, \"y\", B1:B2)"), {
    type: "call", name: "IF",
    args: [bin(">", ref("A1"), num(1)), { type: "str", value: "y" }, { type: "range", from: "B1", to: "B2" }],
  });
  assert.deepEqual(parse("MAX(1, SUM(2))").args[1], { type: "call", name: "SUM", args: [num(2)] });
});

test("precedence and associativity", () => {
  assert.deepEqual(parse("1+2*3"), bin("+", num(1), bin("*", num(2), num(3))));
  assert.deepEqual(parse("1-2-3"), bin("-", bin("-", num(1), num(2)), num(3)));
  assert.deepEqual(parse("8/4/2"), bin("/", bin("/", num(8), num(4)), num(2)));
  assert.deepEqual(parse("2^3^2"), bin("^", num(2), bin("^", num(3), num(2))));
  assert.deepEqual(parse("1+2&3"), bin("&", bin("+", num(1), num(2)), num(3)));
  assert.deepEqual(parse("1&2=3"), bin("=", bin("&", num(1), num(2)), num(3)));
  assert.deepEqual(parse("1<2<>3"), bin("<>", bin("<", num(1), num(2)), num(3)));
  assert.deepEqual(parse("(1+2)*3"), bin("*", bin("+", num(1), num(2)), num(3)));
  assert.deepEqual(parse("2*3^2"), bin("*", num(2), bin("^", num(3), num(2))));
});

test("unary", () => {
  assert.deepEqual(parse("-2^2"), bin("^", { type: "neg", arg: num(2) }, num(2)));
  assert.deepEqual(parse("+5"), num(5));
  assert.deepEqual(parse("--A1"), { type: "neg", arg: { type: "neg", arg: ref("A1") } });
  assert.deepEqual(parse("2^-1"), bin("^", num(2), { type: "neg", arg: num(1) }));
  assert.deepEqual(parse("1--1"), bin("-", num(1), { type: "neg", arg: num(1) }));
});

test("syntax errors", () => {
  for (const bad of ["", "   ", "1 2", "1+", "(1", "1)", "SUM(1,", "SUM(1,)", "A1:", "A1:1", ",", "*2", "SUM(1 2)", "1.2.3", '"x', "()"]) {
    assert.throws(() => parse(bad), SyntaxError, bad);
  }
});
