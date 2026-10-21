import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const md = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "ARCH.md"), "utf8");

const required = [
  "## Slot A: syntax.mjs",
  "## Slot B: values.mjs",
  "## Slot C: eval.mjs",
  "## Slot D: store.mjs",
  "../MOD-A/syntax.mjs",
  "../MOD-B/values.mjs",
  "../MOD-C/eval.mjs",
  "../MOD-D/store.mjs",
  "exports: normalizeCell, parseFormula, refsOf",
  "exports: ERR, isError, errorFromCode, parseLiteral, toNumber, toText, binary, unary, round9, display",
  "exports: evaluate, FUNCTIONS",
  "exports: createStore",
  "createSheet",
  "{error:",
  "SHEET",
];

for (const s of required) {
  test(`ARCH.md contains ${s}`, () => assert.ok(md.includes(s), `missing: ${s}`));
}

test("each slot section has exactly one exports: line and an owner", () => {
  for (const slot of ["A", "B", "C", "D"]) {
    const start = md.indexOf(`## Slot ${slot}:`);
    assert.ok(start >= 0);
    const rest = md.slice(start + 3);
    const end = rest.indexOf("\n## ");
    const sec = end < 0 ? rest : rest.slice(0, end);
    assert.equal((sec.match(/^exports: /gm) || []).length, 1, `slot ${slot}`);
    assert.match(sec, /Owner: dev-[12]/);
  }
});

test("SHEET get returns errors as code strings (ISS-9)", () => {
  assert.ok(md.includes("isError(v) ? v.error : v"));
});
