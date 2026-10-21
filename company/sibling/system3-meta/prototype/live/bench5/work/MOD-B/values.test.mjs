import { test } from "node:test";
import assert from "node:assert/strict";
import { ERR, isError, errorFromCode, parseLiteral, toNumber, toText, binary, unary, round9, display } from "./values.mjs";

test("errors", () => {
  assert.deepEqual(ERR.DIV0, { error: "#DIV/0!" });
  assert.ok(Object.isFrozen(ERR.VALUE));
  assert.ok(isError(ERR.NAME));
  assert.ok(!isError("#DIV/0!"));
  assert.ok(!isError({ error: "#DIV/0!" }));
  assert.equal(errorFromCode("#VALUE!"), ERR.VALUE);
  assert.equal(errorFromCode("#NAME?"), ERR.NAME);
});

test("parseLiteral", () => {
  assert.equal(parseLiteral(" -2.5 "), -2.5);
  assert.equal(parseLiteral("7"), 7);
  assert.equal(parseLiteral(".5"), 0.5);
  assert.equal(parseLiteral("+3"), 3);
  assert.equal(parseLiteral("12abc"), "12abc");
  assert.equal(parseLiteral("TRUE"), "TRUE");
  assert.equal(parseLiteral("1.2.3"), "1.2.3");
  assert.equal(parseLiteral("-"), "-");
  assert.equal(parseLiteral("1e5"), "1e5");
});

test("coercion", () => {
  assert.equal(toNumber(""), 0);
  assert.equal(toNumber(true), 1);
  assert.equal(toNumber(false), 0);
  assert.equal(toNumber(" 4 "), 4);
  assert.equal(toNumber("a"), ERR.VALUE);
  assert.equal(toNumber(ERR.DIV0), ERR.DIV0);
  assert.equal(toText(true), "TRUE");
  assert.equal(toText(5), "5");
  assert.equal(toText(""), "");
  assert.equal(toText(ERR.NAME), ERR.NAME);
});

test("binary", () => {
  assert.equal(binary("+", 2, 3), 5);
  assert.equal(binary("^", 2, 9), 512);
  assert.equal(binary("^", -8, 1 / 3), ERR.VALUE);
  assert.equal(binary("/", 1, 0), ERR.DIV0);
  assert.equal(binary("/", 1, ""), ERR.DIV0);
  assert.equal(binary("&", "n=", 5), "n=5");
  assert.equal(binary("&", true, ""), "TRUE");
  assert.equal(binary("=", "a", "A"), true);
  assert.equal(binary("<", "a", "B"), true);
  assert.equal(binary("+", "a", 1), ERR.VALUE);
  assert.equal(binary("+", true, 1), 2);
  assert.equal(binary("=", 1, true), true);
  assert.equal(binary("=", "a", 1), ERR.VALUE);
  assert.equal(binary("+", ERR.DIV0, ERR.VALUE), ERR.DIV0);
  assert.equal(binary("+", 1, ERR.NAME), ERR.NAME);
  assert.equal(binary("&", ERR.VALUE, ERR.DIV0), ERR.VALUE);
  assert.equal(binary("=", ERR.NAME, 1), ERR.NAME);
  assert.equal(binary("*", 1e308, 10), ERR.VALUE);
  assert.equal(binary("<>", 2, 3), true);
  assert.equal(binary(">=", 3, 3), true);
});

test("unary", () => {
  assert.equal(unary("-", 2), -2);
  assert.equal(unary("+", "3"), 3);
  assert.equal(unary("-", "x"), ERR.VALUE);
  assert.equal(unary("-", true), -1);
  assert.ok(Object.is(unary("-", 0), 0));
});

test("round9 and display", () => {
  assert.equal(round9(1 / 3), 0.333333333);
  assert.equal(round9(0.1 + 0.2), 0.3);
  assert.ok(Object.is(round9(-1e-12), 0));
  assert.equal(display(1 / 3), "0.333333333");
  assert.equal(display(0.1 + 0.2), "0.3");
  assert.equal(display(""), "");
  assert.equal(display(true), "TRUE");
  assert.equal(display("hi"), "hi");
  assert.equal(display(ERR.DIV0), "#DIV/0!");
});

test("left operand fully resolved before right (coercion error on left beats right error)", () => {
  for (const op of ["+", "-", "*", "/", "^", "<", "=", "<>", ">="]) {
    assert.equal(binary(op, "a", ERR.DIV0), ERR.VALUE, op);
    assert.equal(binary(op, "a", ERR.NAME), ERR.VALUE, op);
  }
  assert.equal(binary("+", 1, ERR.DIV0), ERR.DIV0);
  assert.equal(binary("+", "2", ERR.NAME), ERR.NAME);
  assert.equal(binary("<", true, ERR.DIV0), ERR.DIV0);
  assert.equal(binary("+", 1, "b"), ERR.VALUE);
  assert.equal(binary("&", "a", ERR.DIV0), ERR.DIV0);
  assert.equal(binary("&", ERR.NAME, ERR.DIV0), ERR.NAME);
  assert.equal(binary("=", "a", "A"), true);
});

test("wave 2: ERR.REF", () => {
  assert.deepEqual(ERR.REF, { error: "#REF!" });
  assert.ok(Object.isFrozen(ERR.REF));
  assert.ok(isError(ERR.REF));
  assert.equal(errorFromCode("#REF!"), ERR.REF);
  assert.equal(display(ERR.REF), "#REF!");
  assert.equal(binary("+", ERR.REF, ERR.DIV0), ERR.REF);
});
