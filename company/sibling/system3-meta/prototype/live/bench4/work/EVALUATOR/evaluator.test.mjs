import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluate } from "./evaluate.mjs";
import { parse } from "../PARSER/parse.mjs";
import { ERRORS } from "../VALUES/values.mjs";

const cells = { A1: 2, A2: 3, A3: "hi", A4: "", B1: ERRORS.DIV0, B2: " 4 ", B3: true };
const cell = (r) => (r in cells ? cells[r] : "");
const ev = (src) => evaluate(parse(src), cell);

test("atoms", () => {
  assert.equal(ev("1.5"), 1.5);
  assert.equal(ev('"x"'), "x");
  assert.equal(ev("TRUE"), true);
  assert.equal(ev("a1"), 2);
  assert.equal(ev("C9"), "");
  assert.equal(ev("AA1"), ERRORS.REF);
  assert.equal(ev("A0"), ERRORS.REF);
  assert.equal(ev("A1:A2"), ERRORS.VALUE);
});

test("calls", () => {
  assert.equal(ev("SUM(A1:A3, 5)"), 10);
  assert.equal(ev("FOO(1)"), ERRORS.NAME);
  assert.equal(ev("IF(A1>1, \"big\", 1/0)"), "big");
  assert.equal(ev("LEN(A3)"), 2);
});

test("unary minus", () => {
  assert.equal(ev("-A1"), -2);
  assert.equal(ev("-2^2"), 4);
  assert.equal(ev("-B2"), -4);
  assert.equal(ev("-A3"), ERRORS.VALUE);
  assert.equal(ev("-B1"), ERRORS.DIV0);
  assert.equal(ev("-A4"), -0);
});

test("arithmetic", () => {
  assert.equal(ev("1+2*3"), 7);
  assert.equal(ev("2^3^2"), 512);
  assert.equal(ev("A1+B3"), 3);
  assert.equal(ev("B2*2"), 8);
  assert.equal(ev("1/0"), ERRORS.DIV0);
  assert.equal(ev("1/A4"), ERRORS.DIV0);
  assert.equal(ev("0^-1"), ERRORS.VALUE);
  assert.equal(ev("(0-8)^0.5"), ERRORS.VALUE);
  assert.equal(ev("A3+1"), ERRORS.VALUE);
});

test("error order: left before right", () => {
  assert.equal(ev("B1+A3"), ERRORS.DIV0);
  assert.equal(ev("A3+B1"), ERRORS.DIV0); // right side is an error value before any conversion
  assert.equal(ev("(1/0)+FOO()"), ERRORS.DIV0);
  assert.equal(ev("FOO()+(1/0)"), ERRORS.NAME);
  assert.equal(ev("B1&\"x\""), ERRORS.DIV0);
  assert.equal(ev("1=FOO()"), ERRORS.NAME);
});

test("concatenation", () => {
  assert.equal(ev('"a"&1&TRUE'), "a1TRUE");
  assert.equal(ev("A4&A1"), "2");
  assert.equal(ev("1/4&\"\""), "0.25");
});

test("comparison", () => {
  assert.equal(ev('"abc"="ABC"'), true);
  assert.equal(ev('"a"<"B"'), true);
  assert.equal(ev('"b"<>"B"'), false);
  assert.equal(ev("A1<A2"), true);
  assert.equal(ev("A1>=2"), true);
  assert.equal(ev("B3=1"), true);
  assert.equal(ev('"2"=2'), true);
  assert.equal(ev('"x"=1'), ERRORS.VALUE);
  assert.equal(ev("A4=0"), true);
  assert.equal(ev('A4=""'), true);
  assert.equal(ev("1<=0"), false);
});
