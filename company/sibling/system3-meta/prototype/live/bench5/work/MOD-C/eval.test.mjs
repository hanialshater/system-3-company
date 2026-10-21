import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluate, FUNCTIONS } from "./eval.mjs";
import { ERR } from "../MOD-B/values.mjs";

const num = (value) => ({ type: "num", value });
const str = (value) => ({ type: "str", value });
const bool = (value) => ({ type: "bool", value });
const bin = (op, left, right) => ({ type: "binary", op, left, right });
const un = (op, arg) => ({ type: "unary", op, arg });
const ctx = { get: () => "" };

test("literals", () => {
  assert.equal(evaluate(num(3), ctx), 3);
  assert.equal(evaluate(str("x"), ctx), "x");
  assert.equal(evaluate(bool(true), ctx), true);
});

test("operators", () => {
  assert.equal(evaluate(bin("+", num(2), bin("*", num(3), num(4))), ctx), 14);
  assert.equal(evaluate(bin("^", num(2), bin("^", num(3), num(2))), ctx), 512);
  assert.equal(evaluate(bin("^", un("-", num(2)), num(2)), ctx), 4);
  assert.equal(evaluate(bin("&", str("n="), num(5)), ctx), "n=5");
  assert.equal(evaluate(bin("=", str("a"), str("A")), ctx), true);
  assert.equal(evaluate(bin("+", str("a"), num(1)), ctx), ERR.VALUE);
  assert.equal(evaluate(bin("/", num(1), num(0)), ctx), ERR.DIV0);
  assert.equal(evaluate(bin("+", bool(true), num(1)), ctx), 2);
  assert.equal(evaluate(bin("^", un("-", num(8)), bin("/", num(1), num(3))), ctx), ERR.VALUE);
});

test("left error wins", () => {
  const e = bin("+", bin("/", num(1), num(0)), str("x"));
  assert.equal(evaluate(e, ctx), ERR.DIV0);
  assert.equal(evaluate(bin("+", { type: "call", name: "FOO", args: [] }, bin("/", num(1), num(0))), ctx), ERR.NAME);
});

test("error node and calls", () => {
  assert.equal(evaluate({ type: "error", code: "#VALUE!" }, ctx), ERR.VALUE);
  assert.equal(evaluate({ type: "call", name: "FOO", args: [num(1)] }, ctx), ERR.NAME);
  assert.deepEqual(Object.keys(FUNCTIONS), []);
  assert.equal(evaluate({ type: "call", name: "TOSTRING", args: [] }, ctx), ERR.NAME);
});

test("never rounds intermediates, never throws", () => {
  assert.equal(evaluate(bin("/", num(1), num(3)), ctx), 1 / 3);
  assert.equal(evaluate(null, ctx), ERR.VALUE);
  assert.equal(evaluate({ type: "weird" }, ctx), ERR.VALUE);
});
