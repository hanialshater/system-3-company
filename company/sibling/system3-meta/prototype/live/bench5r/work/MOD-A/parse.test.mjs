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
  for (const s of ["", "   ", "1.2.3", "(1+2", "1+2)", "1+", "*2", '"abc', "1 2", "f(1,", "f(,)", "1$", "A1:", "A1:5", ":A1", "()", "1..2"]) {
    assert.deepEqual(parse(s), BAD, JSON.stringify(s));
  }
  assert.deepEqual(parse(undefined), BAD);
});

test("refs: literals have none", () => {
  assert.deepEqual(refs(parse("1+2")), []);
  assert.deepEqual(refs(BAD), []);
});

const REF = { type: "error", code: "#REF!" };

test("wave 2: refs and ranges", () => {
  assert.deepEqual(parse("a1*2"), { type: "binary", op: "*", left: { type: "ref", cell: "A1" }, right: { type: "num", value: 2 } });
  assert.deepEqual(parse("SUM(b3 : a1)"), { type: "call", name: "SUM", args: [{ type: "range", from: "B3", to: "A1" }] });
  for (const s of ["AA1", "A100", "A0", "abc", "A01"]) assert.deepEqual(parse(s), REF, s);
  assert.deepEqual(parse("SUM(A1:AA1)"), { type: "call", name: "SUM", args: [REF] });
  assert.deepEqual(parse("A100+1"), { type: "binary", op: "+", left: REF, right: { type: "num", value: 1 } });
  assert.deepEqual(parse("true"), { type: "bool", value: true });
});

test("wave 2: refs() lists cells, ranges column by column, no duplicates", () => {
  assert.deepEqual(refs(parse("A1+a1*B2")), ["A1", "B2"]);
  assert.deepEqual(refs(parse("SUM(B2:A1, A1)")), ["A1", "A2", "B1", "B2"]);
  assert.deepEqual(refs(parse("IF(C1, A100, D4)")), ["C1", "D4"]);
  assert.deepEqual(refs(parse("-A1")), ["A1"]);
});

test("wave 3: odd input and scale", () => {
  assert.deepEqual(parse("1e3"), { type: "error", code: "#VALUE!" });
  assert.deepEqual(parse("1.2.3"), { type: "error", code: "#VALUE!" });
  assert.equal(parse("0^0").type, "binary");
  assert.equal(parse('"5"+1').type, "binary");
  assert.deepEqual(refs(parse("A1:A2")), ["A1", "A2"]);
  assert.equal(refs(parse("SUM(A1:Z10)")).length, 260);
  assert.deepEqual(parse("(".repeat(300) + "1" + ")".repeat(300)), { type: "num", value: 1 });
});
