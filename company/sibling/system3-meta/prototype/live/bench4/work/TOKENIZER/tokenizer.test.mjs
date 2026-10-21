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

test("identifiers uppercased", () => {
  assert.deepEqual(tokenize("sum(a1:b_2)"), [t("id", "SUM"), t("op", "("), t("id", "A1"), t("op", ":"), t("id", "B_2"), t("op", ")")]);
  assert.throws(() => tokenize("_a"), SyntaxError);
});

test("operators", () => {
  const ops = "+ - * / ^ & = <> < > <= >= ( ) , :".split(" ");
  assert.deepEqual(tokenize(ops.join(" ")), ops.map((o) => t("op", o)));
  assert.deepEqual(tokenize("1<=2"), [t("num", 1), t("op", "<="), t("num", 2)]);
  assert.deepEqual(tokenize("a<>b"), [t("id", "A"), t("op", "<>"), t("id", "B")]);
});

test("whitespace and errors", () => {
  assert.deepEqual(tokenize("  \t "), []);
  for (const bad of ["!", "1 % 2", "#", "a;b", "'x'", "$A$1"]) assert.throws(() => tokenize(bad), SyntaxError);
});
