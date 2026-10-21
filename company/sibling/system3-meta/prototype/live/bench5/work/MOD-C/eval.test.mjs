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
  assert.deepEqual(Object.keys(FUNCTIONS).sort(), ["ABS", "AVERAGE", "COUNT", "IF", "LEN", "MAX", "MIN", "ROUND", "SUM"]);
  assert.equal(evaluate({ type: "call", name: "TOSTRING", args: [] }, ctx), ERR.NAME);
});

test("never rounds intermediates, never throws", () => {
  assert.equal(evaluate(bin("/", num(1), num(3)), ctx), 1 / 3);
  assert.equal(evaluate(null, ctx), ERR.VALUE);
  assert.equal(evaluate({ type: "weird" }, ctx), ERR.VALUE);
});

// ---- wave 2 ----
const ref = (cell) => ({ type: "ref", cell });
const rng = (from, to) => ({ type: "range", from, to });
const call = (name, ...args) => ({ type: "call", name, args });
const sheet = (o) => ({ get: (c) => (c in o ? o[c] : "") });
const REF = ERR.REF;

test("refs read through ctx", () => {
  const c = sheet({ A1: 5 });
  assert.equal(evaluate(bin("*", ref("A1"), num(2)), c), 10);
  assert.equal(evaluate(ref("B7"), c), "");
  assert.equal(evaluate(ref("a1"), c), 5);
  assert.equal(evaluate(rng("A1", "A2"), c), ERR.VALUE);
  assert.equal(evaluate(bin("+", rng("A1", "A2"), num(1)), c), ERR.VALUE);
});

test("aggregates", () => {
  const c = sheet({ A1: 1, A2: 2, A3: 3, A4: 4, B1: 1, B2: "word", B3: 3 });
  assert.equal(evaluate(call("SUM", rng("A1", "A4")), c), 10);
  assert.equal(evaluate(call("SUM", rng("A4", "A1")), c), 10);
  assert.equal(evaluate(call("SUM"), c), 0);
  assert.equal(evaluate(call("COUNT", rng("B1", "B3")), c), 2);
  assert.equal(evaluate(call("AVERAGE", rng("A5", "A9")), c), ERR.DIV0);
  assert.equal(evaluate(call("AVERAGE", rng("A1", "A4")), c), 2.5);
  assert.equal(evaluate(call("MIN"), c), 0);
  assert.equal(evaluate(call("MAX"), c), 0);
  assert.equal(evaluate(call("MIN", rng("A1", "B3"), num(-1)), c), -1);
  assert.equal(evaluate(call("MAX", rng("A1", "B3")), c), 3);
  assert.equal(evaluate(call("SUM", num(1), str("2"), bool(true)), c), 4);
  assert.equal(evaluate(call("SUM", str("x")), c), ERR.VALUE);
  assert.equal(evaluate(call("SUM", num(1), bin("/", num(1), num(0))), c), ERR.DIV0);
  const e = sheet({ A1: 1, A2: ERR.DIV0 });
  assert.equal(evaluate(call("SUM", rng("A1", "A3")), e), ERR.DIV0);
  assert.equal(evaluate(call("sum", rng("A1", "A1")), e), 1);
});

test("range covers rectangle column by column", () => {
  const seen = [];
  const c = { get: (cell) => (seen.push(cell), "") };
  evaluate(call("SUM", rng("A1", "B2")), c);
  assert.deepEqual(seen, ["A1", "A2", "B1", "B2"]);
});

test("IF", () => {
  const c = sheet({});
  assert.equal(evaluate(call("IF", num(1), num(2), bin("/", num(1), num(0))), c), 2);
  assert.equal(evaluate(call("IF", num(0), bin("/", num(1), num(0)), num(3)), c), 3);
  assert.equal(evaluate(call("IF", num(0), num(2)), c), false);
  assert.equal(evaluate(call("IF", num(1)), c), ERR.VALUE);
  assert.equal(evaluate(call("IF", num(1), num(2), num(3), num(4)), c), ERR.VALUE);
  assert.equal(evaluate(call("IF", bin("/", num(1), num(0)), num(2)), c), ERR.DIV0);
  assert.equal(evaluate(call("IF", str("x"), num(2)), c), ERR.VALUE);
  assert.equal(evaluate(call("IF", ref("A1"), num(2), num(9)), c), 9);
});

test("ABS ROUND LEN", () => {
  const c = sheet({ A1: "hello" });
  assert.equal(evaluate(call("ABS", num(-3)), c), 3);
  assert.equal(evaluate(call("ABS"), c), ERR.VALUE);
  assert.equal(evaluate(call("ABS", num(1), num(2)), c), ERR.VALUE);
  assert.equal(evaluate(call("ROUND", num(1234), un("-", num(2))), c), 1200);
  assert.equal(evaluate(call("ROUND", num(2.567), num(2)), c), 2.57);
  assert.equal(evaluate(call("ROUND", num(2.5)), c), 3);
  assert.equal(evaluate(call("ROUND"), c), ERR.VALUE);
  assert.equal(evaluate(call("ROUND", num(1), num(2), num(3)), c), ERR.VALUE);
  assert.equal(evaluate(call("LEN", ref("A1")), c), 5);
  assert.equal(evaluate(call("LEN", bool(true)), c), 4);
  assert.equal(evaluate(call("LEN", num(12.5)), c), 4);
  assert.equal(evaluate(call("LEN", ref("B1")), c), 0);
  assert.equal(evaluate(call("LEN"), c), ERR.VALUE);
  assert.equal(evaluate(call("LEN", bin("/", num(1), num(0))), c), ERR.DIV0);
  assert.equal(evaluate(call("ABS", rng("A1", "A2")), c), ERR.VALUE);
});

test("#REF! (needs ERR.REF from slot B)", { skip: REF ? false : "ERR.REF not yet in MOD-B" }, () => {
  const c = sheet({});
  assert.equal(evaluate({ type: "error", code: "#REF!" }, c), REF);
  assert.equal(evaluate(ref("AA1"), c), REF);
  assert.equal(evaluate(call("SUM", rng("A1", "A100")), c), REF);
});

const CYC = ERR.CYCLE;
test("wave 3: errors from cells (incl. #CYCLE!) propagate, left first", { skip: CYC ? false : "ERR.CYCLE not yet in MOD-B" }, () => {
  const c = sheet({ A1: CYC, A2: 1, A3: ERR.DIV0 });
  assert.equal(evaluate(ref("A1"), c), CYC);
  assert.equal(evaluate(bin("+", ref("A1"), ref("A3")), c), CYC);
  assert.equal(evaluate(bin("+", ref("A3"), ref("A1")), c), ERR.DIV0);
  assert.equal(evaluate(bin("&", ref("A1"), str("x")), c), CYC);
  assert.equal(evaluate(call("SUM", rng("A1", "A3")), c), CYC);
  assert.equal(evaluate(call("SUM", rng("A2", "A3"), ref("A1")), c), ERR.DIV0);
  assert.equal(evaluate(call("IF", ref("A1"), num(1), num(2)), c), CYC);
  assert.equal(evaluate(call("IF", num(1), ref("A1"), num(2)), c), CYC);
  assert.equal(evaluate(call("ABS", ref("A1")), c), CYC);
  assert.equal(evaluate(call("LEN", ref("A1")), c), CYC);
  assert.equal(evaluate(call("ROUND", num(1), ref("A1")), c), CYC);
  assert.equal(evaluate(un("-", ref("A1")), c), CYC);
});

test("wave 3: whole-sheet range and odd input", () => {
  const vals = {};
  for (let c = 65; c <= 90; c++) for (let r = 1; r <= 10; r++) vals[String.fromCharCode(c) + r] = 1;
  const c = sheet(vals);
  assert.equal(evaluate(call("SUM", rng("A1", "Z10")), c), 260);
  assert.equal(evaluate(call("COUNT", rng("Z10", "A1")), c), 260);
  assert.equal(evaluate(bin("^", num(0), num(0)), c), 1);
  assert.equal(evaluate(bin("+", str("5"), num(1)), c), 6);
  assert.equal(evaluate(rng("A1", "A2"), c), ERR.VALUE);
});
