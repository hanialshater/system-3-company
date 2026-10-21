import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { register } from "node:module";

// Use the real slot B when it exists; otherwise redirect its import to a test fixture.
const realB = new URL("../MOD-B/values.mjs", import.meta.url);
if (!existsSync(realB)) {
  const fixture = new URL("./fixture-values.mjs", import.meta.url).href;
  const hooks = `export async function resolve(spec, ctx, next) {
    if (spec === "../MOD-B/values.mjs" && ctx.parentURL && ctx.parentURL.endsWith("/MOD-C/eval.mjs"))
      return { url: ${JSON.stringify(fixture)}, shortCircuit: true };
    return next(spec, ctx);
  }`;
  register("data:text/javascript," + encodeURIComponent(hooks));
}
const { evaluate, FUNCTIONS } = await import("./eval.mjs");
const { ERR } = await import(existsSync(realB) ? realB.href : "./fixture-values.mjs");

const num = (value) => ({ type: "num", value });
const str = (value) => ({ type: "str", value });
const bool = (value) => ({ type: "bool", value });
const un = (op, arg) => ({ type: "unary", op, arg });
const bin = (op, left, right) => ({ type: "binary", op, left, right });
const ctx = { get: () => "", range: () => [] };

test("literals", () => {
  assert.equal(evaluate(num(3), ctx), 3);
  assert.equal(evaluate(str("a"), ctx), "a");
  assert.equal(evaluate(bool(true), ctx), true);
});

test("operators via slot B", () => {
  assert.equal(evaluate(bin("+", num(2), bin("*", num(3), num(4))), ctx), 14);
  assert.equal(evaluate(bin("^", num(2), bin("^", num(3), num(2))), ctx), 512);
  assert.equal(evaluate(bin("^", un("-", num(2)), num(2)), ctx), 4);
  assert.equal(evaluate(bin("&", str("n="), num(5)), ctx), "n=5");
  assert.equal(evaluate(bin("=", str("a"), str("A")), ctx), true);
  assert.equal(evaluate(bin("+", bool(true), num(1)), ctx), 2);
  assert.equal(evaluate(bin("+", str("a"), num(1)), ctx), ERR.VALUE);
  assert.equal(evaluate(bin("/", num(1), num(0)), ctx), ERR.DIV0);
  assert.equal(evaluate(bin("^", un("-", num(8)), bin("/", num(1), num(3))), ctx), ERR.VALUE);
});

test("rounding of the final number", () => {
  assert.equal(evaluate(bin("+", num(0.1), num(0.2)), ctx), 0.3);
  assert.equal(evaluate(bin("/", num(1), num(3)), ctx), 0.333333333);
});

test("errors: bad syntax, left wins, unknown function", () => {
  assert.equal(evaluate({ type: "error", code: "#VALUE!" }, ctx), ERR.VALUE);
  assert.equal(evaluate(bin("+", bin("/", num(1), num(0)), str("x")), ctx), ERR.DIV0);
  assert.equal(evaluate(bin("+", str("x"), bin("/", num(1), num(0))), ctx), ERR.DIV0); // an operand error beats a type error
  assert.equal(evaluate({ type: "call", name: "FOO", args: [num(1)] }, ctx), ERR.NAME);
  assert.equal(evaluate(bin("+", { type: "call", name: "FOO", args: [] }, bin("/", num(1), num(0))), ctx), ERR.NAME);
  assert.equal(Object.keys(FUNCTIONS).length, 0);
});

test("never throws", () => {
  assert.equal(evaluate(null, ctx), ERR.VALUE);
  assert.equal(evaluate({ type: "bogus" }, ctx), ERR.VALUE);
});
