import { test } from "node:test";
import assert from "node:assert/strict";
import { ERR, isError, parseInput, toNumber, toText, compare, unary, binary, round9, display } from "./values.mjs";

test("errors", () => {
  assert.equal(ERR.DIV0.error, "#DIV/0!");
  assert.equal(String(ERR.VALUE), "#VALUE!");
  assert.equal(`${ERR.NAME}`, "#NAME?");
  assert.equal(ERR.REF.error, "#REF!");
  assert.equal(ERR.CYCLE.error, "#CYCLE!");
  assert.deepEqual({ ...ERR.DIV0 }, { error: "#DIV/0!" });
  assert.ok(Object.isFrozen(ERR.VALUE));
  assert.ok(isError(ERR.VALUE));
  assert.ok(!isError("#DIV/0!"));
  assert.ok(!isError({ error: "#VALUE!" }));
  assert.ok(!isError(0) && !isError("") && !isError(null));
});

test("parseInput", () => {
  assert.equal(parseInput(""), "");
  assert.equal(parseInput(" -2.5 "), -2.5);
  assert.equal(parseInput("7"), 7);
  assert.equal(parseInput(".5"), 0.5);
  assert.equal(parseInput("+3"), 3);
  assert.equal(parseInput("7."), 7);
  assert.equal(parseInput("-0"), 0);
  assert.ok(Object.is(parseInput("-0"), 0));
  assert.equal(parseInput("12abc"), "12abc");
  assert.equal(parseInput("TRUE"), "TRUE");
  assert.equal(parseInput("1.2.3"), "1.2.3");
  assert.equal(parseInput("."), ".");
  assert.equal(parseInput("   "), "   ");
  assert.equal(parseInput("- 2"), "- 2");
  assert.equal(parseInput("1e3"), "1e3");
  assert.equal(parseInput("Infinity"), "Infinity");
});

test("toNumber / toText", () => {
  assert.equal(toNumber(""), 0);
  assert.equal(toNumber(true), 1);
  assert.equal(toNumber(false), 0);
  assert.equal(toNumber(" 4 "), 4);
  assert.equal(toNumber("x"), ERR.VALUE);
  assert.equal(toNumber(ERR.DIV0), ERR.DIV0);
  assert.equal(toText(true), "TRUE");
  assert.equal(toText(false), "FALSE");
  assert.equal(toText(""), "");
  assert.equal(toText(2.5), "2.5");
  assert.equal(toText(ERR.NAME), ERR.NAME);
});

test("compare", () => {
  assert.equal(compare("a", "A"), 0);
  assert.equal(compare("a", "b"), -1);
  assert.equal(compare(2, 10), -1);
  assert.equal(compare("10", 9), 1);
  assert.equal(compare(true, 1), 0);
  assert.equal(compare("", 0), 0);
  assert.equal(compare("", "x"), -1);
  assert.equal(compare("x", 1), ERR.VALUE);
  assert.equal(compare(ERR.DIV0, ERR.NAME), ERR.DIV0);
});

test("operators", () => {
  assert.equal(binary("+", 2, binary("*", 3, 4)), 14);
  assert.equal(binary("^", 2, binary("^", 3, 2)), 512);
  assert.equal(binary("^", unary("-", 2), 2), 4);
  assert.equal(binary("&", "n=", 5), "n=5");
  assert.equal(binary("&", true, ""), "TRUE");
  assert.equal(binary("=", "a", "A"), true);
  assert.equal(binary("<>", "a", "A"), false);
  assert.equal(binary("<", 1, 2), true);
  assert.equal(binary(">=", 2, 2), true);
  assert.equal(binary("<=", 3, 2), false);
  assert.equal(binary(">", "b", "a"), true);
  assert.equal(binary("+", "a", 1), ERR.VALUE);
  assert.equal(binary("/", 1, 0), ERR.DIV0);
  assert.equal(binary("/", 0, ""), ERR.DIV0);
  assert.equal(binary("+", true, 1), 2);
  assert.equal(binary("^", -8, 1 / 3), ERR.VALUE);
  assert.equal(binary("*", 1e308, 10), ERR.VALUE);
  assert.equal(binary("+", ERR.DIV0, ERR.NAME), ERR.DIV0);
  assert.equal(binary("+", 1, ERR.NAME), ERR.NAME);
  assert.equal(binary("&", ERR.VALUE, ERR.DIV0), ERR.VALUE);
  assert.equal(binary("=", 1, ERR.DIV0), ERR.DIV0);
  assert.equal(binary("+", "x", ERR.DIV0), ERR.VALUE);
  assert.equal(binary("+", "5", ERR.DIV0), ERR.DIV0);
  assert.equal(binary("<", "a", ERR.DIV0), ERR.VALUE);
  assert.equal(binary("<", "5", ERR.DIV0), ERR.DIV0);
  assert.equal(binary("=", "a", ERR.NAME), ERR.VALUE);
  assert.equal(compare("a", ERR.DIV0), ERR.VALUE);
  assert.equal(compare(true, ERR.DIV0), ERR.DIV0);
  assert.equal(binary("&", "a", ERR.DIV0), ERR.DIV0);
  assert.equal(binary("^", "q", ERR.NAME), ERR.VALUE);
  assert.equal(binary("-", "x", "y"), ERR.VALUE);
  assert.equal(unary("-", "x"), ERR.VALUE);
  assert.equal(unary("+", "3"), 3);
  assert.equal(unary("-", ERR.NAME), ERR.NAME);
  assert.ok(Object.is(unary("-", 0), 0));
});

test("round9 / display", () => {
  assert.equal(round9(0.1 + 0.2), 0.3);
  assert.equal(round9(1 / 3), 0.333333333);
  assert.ok(Object.is(round9(-0), 0));
  assert.ok(Object.is(round9(-1e-12), 0));
  assert.equal(round9(1e25), 1e25);
  assert.equal(display(1 / 3), "0.333333333");
  assert.equal(display(0.1 + 0.2), "0.3");
  assert.equal(display(""), "");
  assert.equal(display(true), "TRUE");
  assert.equal(display(false), "FALSE");
  assert.equal(display("hi"), "hi");
  assert.equal(display(ERR.DIV0), "#DIV/0!");
  assert.equal(display(14), "14");
});
