import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluate } from "./evaluate.mjs";
import { parse } from "../PARSER/parse.mjs";
import { ERRORS } from "../VALUES/values.mjs";

const cells = { A1: 2, A2: 3, A3: "hi", A4: "", B1: ERRORS.DIV0, B2: " 4 " };
const cell = (r) => (r in cells ? cells[r] : "");
const ev = (s) => evaluate(parse(s), cell);

test("atoms", () => {
  assert.equal(ev("3"), 3);
  assert.equal(ev('"x"'), "x");
  assert.equal(ev("TRUE"), true);
  assert.equal(ev("A1"), 2);
  assert.equal(ev("Z99"), "");
  assert.equal(ev("AA1"), ERRORS.REF);
  assert.equal(ev("A1:A2"), ERRORS.VALUE);
});

test("unary and arithmetic", () => {
  assert.equal(ev("-A1"), -2);
  assert.equal(ev("-A3"), ERRORS.VALUE);
  assert.equal(ev("-2^2"), 4);
  assert.equal(ev("1+2*3"), 7);
  assert.equal(ev("B2*2"), 8);
  assert.equal(ev("A4+1"), 1);
  assert.equal(ev("1/0"), ERRORS.DIV0);
  assert.equal(ev("0/0"), ERRORS.DIV0);
  assert.equal(ev("0^-1"), ERRORS.VALUE);
  assert.equal(ev("(-8)^0.5"), ERRORS.VALUE);
  assert.equal(ev("TRUE+1"), 2);
});

test("errors left before right", () => {
  assert.equal(ev("B1+AA1"), ERRORS.DIV0);
  assert.equal(ev("AA1+B1"), ERRORS.REF);
  assert.equal(ev("A3&B1"), ERRORS.DIV0);
  assert.equal(ev("A3+1"), ERRORS.VALUE);
});

test("concat and comparison", () => {
  assert.equal(ev('A3&" "&A1&TRUE'), "hi 2TRUE");
  assert.equal(ev('"abc"="ABC"'), true);
  assert.equal(ev('"a"<"B"'), true);
  assert.equal(ev("1<2"), true);
  assert.equal(ev('"2"=2'), true);
  assert.equal(ev('"x"=1'), ERRORS.VALUE);
  assert.equal(ev("A4=0"), true);
  assert.equal(ev("1<>1"), false);
  assert.equal(ev("2>=2"), true);
});

test("calls", () => {
  assert.equal(ev("SUM(A1:A3)"), 5);
  assert.equal(ev("IF(A1>1,\"y\",1/0)"), "y");
  assert.equal(ev("FOO(1)"), ERRORS.NAME);
  assert.equal(ev("LEN(A3)"), 2);
});
