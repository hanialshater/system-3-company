import { test } from "node:test";
import assert from "node:assert/strict";
import { parse, normCell, refs } from "./parse.mjs";

const BAD = { type: "error", code: "#VALUE!" };
const n = (value) => ({ type: "num", value });
const b = (op, left, right) => ({ type: "binary", op, left, right });

test("normCell", () => {
  assert.equal(normCell("a1"), "A1");
  assert.equal(normCell("Z99"), "Z99");
  assert.equal(normCell("b10"), "B10");
  for (const bad of ["A0", "A01", "A100", "AA1", "1A", "", " A1", "A1 ", "A", null, 5]) {
    assert.equal(normCell(bad), null, String(bad));
  }
});

test("atoms", () => {
  assert.deepEqual(parse("3"), n(3));
  assert.deepEqual(parse(" 2.5 "), n(2.5));
  assert.deepEqual(parse(".5"), n(0.5));
  assert.deepEqual(parse("7."), n(7));
  assert.deepEqual(parse('"Hi there"'), { type: "str", value: "Hi there" });
  assert.deepEqual(parse('""'), { type: "str", value: "" });
  assert.deepEqual(parse("true"), { type: "bool", value: true });
  assert.deepEqual(parse("False"), { type: "bool", value: false });
});

test("precedence and associativity", () => {
  assert.deepEqual(parse("2+3*4"), b("+", n(2), b("*", n(3), n(4))));
  assert.deepEqual(parse("2^3^2"), b("^", n(2), b("^", n(3), n(2))));
  assert.deepEqual(parse("-2^2"), b("^", { type: "unary", op: "-", arg: n(2) }, n(2)));
  assert.deepEqual(parse("2^-2"), b("^", n(2), { type: "unary", op: "-", arg: n(2) }));
  assert.deepEqual(parse("1-2-3"), b("-", b("-", n(1), n(2)), n(3)));
  assert.deepEqual(parse("8/4/2"), b("/", b("/", n(8), n(4)), n(2)));
  assert.deepEqual(parse("1+2&3"), b("&", b("+", n(1), n(2)), n(3)));
  assert.deepEqual(parse("1&2=3"), b("=", b("&", n(1), n(2)), n(3)));
  assert.deepEqual(parse("(1+2)*3"), b("*", b("+", n(1), n(2)), n(3)));
  for (const op of ["=", "<>", "<", ">", "<=", ">="]) {
    assert.deepEqual(parse(`1${op}2`), b(op, n(1), n(2)));
  }
  assert.deepEqual(parse("--2"), { type: "unary", op: "-", arg: { type: "unary", op: "-", arg: n(2) } });
  assert.deepEqual(parse("+2"), { type: "unary", op: "+", arg: n(2) });
});

test("calls", () => {
  assert.deepEqual(parse("foo(1)"), { type: "call", name: "FOO", args: [n(1)] });
  assert.deepEqual(parse("Sum()"), { type: "call", name: "SUM", args: [] });
  assert.deepEqual(parse("f(1, 2+3)"), { type: "call", name: "F", args: [n(1), b("+", n(2), n(3))] });
});

test("bad syntax", () => {
  for (const s of ["", "   ", "1.2.3", "(1+2", "1+2)", "1+", "*2", '"abc', "1 2", "f(1,", "f(,)", "abc", "1$", "()", "1..2"]) {
    assert.deepEqual(parse(s), BAD, JSON.stringify(s));
  }
  assert.deepEqual(parse(undefined), BAD);
});

test("refs: wave 1 has none", () => {
  assert.deepEqual(refs(parse("1+2")), []);
  assert.deepEqual(refs(BAD), []);
});
