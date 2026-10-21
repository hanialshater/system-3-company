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
  assert.equal(evaluate({ type: "call", name: "FOO", args: [num(1)] }, ctx), ERR.NAME);
  assert.equal(evaluate(bin("+", { type: "call", name: "FOO", args: [] }, bin("/", num(1), num(0))), ctx), ERR.NAME);
  assert.deepEqual(Object.keys(FUNCTIONS).sort(), ["ABS", "AVERAGE", "COUNT", "IF", "LEN", "MAX", "MIN", "ROUND", "SUM"]);
});

test("never throws", () => {
  assert.equal(evaluate(null, ctx), ERR.VALUE);
  assert.equal(evaluate({ type: "bogus" }, ctx), ERR.VALUE);
});

// ---- wave 2: refs, ranges, functions (ASTs from the real slot A parser) ----
const { parse } = await import("../MOD-A/parse.mjs");
function sheetCtx(cells) {
  const col = (c) => c.charCodeAt(0), row = (c) => Number(c.slice(1));
  return {
    get: (c) => (c in cells ? cells[c] : ""),
    range(from, to) {
      const rows = [];
      for (let r = Math.min(row(from), row(to)); r <= Math.max(row(from), row(to)); r++) {
        const line = [];
        for (let k = Math.min(col(from), col(to)); k <= Math.max(col(from), col(to)); k++) {
          const c = String.fromCharCode(k) + r;
          line.push(c in cells ? cells[c] : "");
        }
        rows.push(line);
      }
      return rows;
    },
  };
}
const ev = (src, cells = {}) => evaluate(parse(src), sheetCtx(cells));

test("wave 2: refs and #REF!", () => {
  assert.equal(ev("A1*2", { A1: 5 }), 10);
  assert.equal(ev("a1&\"x\""), "x");
  assert.equal(ev("A1+1", { A1: ERR.DIV0 }), ERR.DIV0);
  for (const s of ["A100", "AA1", "A0", "A100+1"]) assert.equal(ev(s), ERR.REF, s);
  assert.equal(ev("A1:B2"), ERR.VALUE);
  assert.equal(ev("SUM(A1:AA1)"), ERR.REF);
});

test("wave 2: SPEC5 examples", () => {
  assert.equal(ev("SUM(A1:A4)", { A1: 1, A2: 2, A3: 3, A4: 4 }), 10);
  assert.equal(ev("SUM(A4:A1)", { A1: 1, A2: 2, A3: 3, A4: 4 }), 10);
  assert.equal(ev("COUNT(A1:A3)", { A1: 1, A2: "word", A3: 3 }), 2);
  assert.equal(ev("AVERAGE(A5:A9)"), ERR.DIV0);
  assert.equal(ev("IF(1,2,1/0)"), 2);
  assert.equal(ev("ROUND(1234,-2)"), 1200);
});

test("wave 2: aggregates", () => {
  const cells = { A1: 1, A2: "word", A3: 3, B1: true, B2: "7" };
  assert.equal(ev("SUM()"), 0);
  assert.equal(ev("MIN()"), 0);
  assert.equal(ev("MAX()"), 0);
  assert.equal(ev("COUNT()"), 0);
  assert.equal(ev("AVERAGE()"), ERR.DIV0);
  assert.equal(ev("SUM(A1:B3)", cells), 4); // text, bool, blanks skipped in ranges
  assert.equal(ev("MAX(A1:A3, 10)", cells), 10);
  assert.equal(ev("MIN(A1:A3, -1)", cells), -1);
  assert.equal(ev("AVERAGE(A1:A3)", cells), 2);
  assert.equal(ev("SUM(\"2\", TRUE, 1)"), 4); // other args via toNumber
  assert.equal(ev("SUM(\"x\", 1)"), ERR.VALUE);
  assert.equal(ev("SUM(1/0, 1)"), ERR.DIV0);
  assert.equal(ev("SUM(A1:A2)", { A1: 1, A2: ERR.NAME }), ERR.NAME);
  assert.equal(ev("sum(1,2)"), 3);
  assert.equal(ev("FOO(1)"), ERR.NAME);
});

test("wave 2: IF ABS ROUND LEN", () => {
  assert.equal(ev("IF(1)"), ERR.VALUE);
  assert.equal(ev("IF(1,2,3,4)"), ERR.VALUE);
  assert.equal(ev("IF(1/0,1,2)"), ERR.DIV0);
  assert.equal(ev("IF(\"x\",1,2)"), ERR.VALUE);
  assert.equal(ev("IF(0,1/0,5)"), 5);
  assert.equal(ev("IF(0,1)"), false);
  assert.equal(ev("IF(A1,\"y\",\"n\")"), "n");
  assert.equal(ev("ABS(-3)"), 3);
  assert.equal(ev("ABS()"), ERR.VALUE);
  assert.equal(ev("ABS(1,2)"), ERR.VALUE);
  assert.equal(ev("ROUND(2.567, 2)"), 2.57);
  assert.equal(ev("ROUND(2.5)"), 3);
  assert.equal(ev("ROUND()"), ERR.VALUE);
  assert.equal(ev("ROUND(1,2,3)"), ERR.VALUE);
  assert.equal(ev("LEN(\"abc\")"), 3);
  assert.equal(ev("LEN(TRUE)"), 4);
  assert.equal(ev("LEN(12.5)"), 4);
  assert.equal(ev("LEN(A1)"), 0);
  assert.equal(ev("LEN(1/0)"), ERR.DIV0);
  assert.equal(ev("LEN()"), ERR.VALUE);
});

// Slot B behaviour (ARCH: an error operand is the result); fixed in MOD-B (ISS-14).
test("an operand error beats a type error (slot B)", () => {
  assert.equal(evaluate(bin("+", str("x"), bin("/", num(1), num(0))), ctx), ERR.DIV0);
});

test("wave 3: errors propagate through chains and functions, left first", () => {
  const cells = { A1: ERR.CYCLE, A2: ERR.DIV0, A3: 1 };
  assert.equal(ev("A1+A2", cells), ERR.CYCLE);
  assert.equal(ev("A2+A1", cells), ERR.DIV0);
  assert.equal(ev("SUM(A3,A1:A2)", cells), ERR.CYCLE);
  assert.equal(ev("SUM(A2,A1)", cells), ERR.DIV0);
  assert.equal(ev("ABS(-A1)", cells), ERR.CYCLE);
  assert.equal(ev("IF(A1,1,2)", cells), ERR.CYCLE);
  assert.equal(ev("LEN(A1&\"x\")", cells), ERR.CYCLE);
  assert.equal(ev("ROUND(A3,A2)", cells), ERR.DIV0);
  assert.equal(ev("1e3"), ERR.VALUE);
  assert.equal(ev("1.2.3"), ERR.VALUE);
  assert.equal(ev("0^0"), 1);
  assert.equal(ev('"5"+1'), 6);
});

test("wave 3: scale (SUM over the whole sheet, deep nesting)", () => {
  const cells = {};
  for (const c of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") for (let r = 1; r <= 10; r++) cells[c + r] = 1;
  assert.equal(ev("SUM(A1:Z10)", cells), 260);
  assert.equal(ev("COUNT(A1:Z99)", cells), 260);
  assert.equal(ev("MAX(Z99:A1)", cells), 1);
  assert.equal(ev("1" + "+1".repeat(500)), 501);
});
