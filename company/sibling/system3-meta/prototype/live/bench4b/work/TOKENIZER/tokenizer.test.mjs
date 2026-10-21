import { test } from "node:test";
import assert from "node:assert/strict";
import { tokenize } from "./tokenize.mjs";

const t = (type, value) => ({ type, value });

test("numbers", () => {
  assert.deepEqual(tokenize("3 2.5 .5 7."), [t("num", 3), t("num", 2.5), t("num", 0.5), t("num", 7)]);
  assert.throws(() => tokenize("1.2.3"), SyntaxError);
  assert.throws(() => tokenize("1..2"), SyntaxError);
  assert.throws(() => tokenize("."), SyntaxError);
});
test("no exponent", () => {
  assert.deepEqual(tokenize("1e3"), [t("num", 1), t("id", "E3")]);
});
test("strings", () => {
  assert.deepEqual(tokenize('"a b" ""'), [t("str", "a b"), t("str", "")]);
  assert.throws(() => tokenize('"abc'), SyntaxError);
});
test("identifiers uppercased", () => {
  assert.deepEqual(tokenize("sum(a1:b_2)"), [t("id", "SUM"), t("op", "("), t("id", "A1"), t("op", ":"), t("id", "B_2"), t("op", ")")]);
  assert.throws(() => tokenize("_a"), SyntaxError);
});
test("operators", () => {
  assert.deepEqual(tokenize("+-*/^&=<><<=>=>(),:").map((x) => x.value),
    ["+", "-", "*", "/", "^", "&", "=", "<>", "<", "<=", ">=", ">", "(", ")", ",", ":"]);
  assert.ok(tokenize("<>").every((x) => x.type === "op"));
});
test("whitespace and errors", () => {
  assert.deepEqual(tokenize("  \t "), []);
  for (const bad of ["#", "$A1", "!", "'x'", "%", "{", "[", ";"]) assert.throws(() => tokenize(bad), SyntaxError, bad);
});
