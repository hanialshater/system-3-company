import { test } from "node:test";
import assert from "node:assert/strict";
import { tokenize } from "./tokenize.mjs";

const t = (type, value) => ({ type, value });

test("numbers", () => {
  assert.deepEqual(tokenize("3 2.5 .5 7."), [t("num", 3), t("num", 2.5), t("num", 0.5), t("num", 7)]);
  assert.throws(() => tokenize("1.2.3"), SyntaxError);
  assert.throws(() => tokenize("."), SyntaxError);
  assert.deepEqual(tokenize("1e3"), [t("num", 1), t("id", "E3")]);
});

test("strings", () => {
  assert.deepEqual(tokenize('"hi there"'), [t("str", "hi there")]);
  assert.deepEqual(tokenize('""'), [t("str", "")]);
  assert.throws(() => tokenize('"abc'), SyntaxError);
});

test("identifiers are uppercased", () => {
  assert.deepEqual(tokenize("sum a1 my_x2"), [t("id", "SUM"), t("id", "A1"), t("id", "MY_X2")]);
  assert.throws(() => tokenize("_a"), SyntaxError);
});

test("operators, longest match", () => {
  assert.deepEqual(tokenize("+-*/^&=<><<=>=>(),:").map((x) => x.value),
    ["+", "-", "*", "/", "^", "&", "=", "<>", "<", "<=", ">=", ">", "(", ")", ",", ":"]);
  assert.ok(tokenize("<>").every((x) => x.type === "op"));
});

test("whitespace skipped, empty input", () => {
  assert.deepEqual(tokenize(""), []);
  assert.deepEqual(tokenize("  \t\n "), []);
  assert.deepEqual(tokenize(" SUM( A1 : B2 ) "), [t("id", "SUM"), t("op", "("), t("id", "A1"), t("op", ":"), t("id", "B2"), t("op", ")")]);
});

test("errors", () => {
  for (const s of ["!", "#", "$A1", "'x'", "a.b", "{", "%", "1;2"]) assert.throws(() => tokenize(s), SyntaxError, s);
});
