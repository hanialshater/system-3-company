import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const md = readFileSync(new URL("./ARCH.md", import.meta.url), "utf8");

const slots = {
  A: ["parse.mjs", ["parse", "normCell", "refs"]],
  B: ["values.mjs", ["ERR", "isError", "parseInput", "toNumber", "toText", "compare", "unary", "binary", "round9", "display"]],
  C: ["eval.mjs", ["evaluate", "FUNCTIONS"]],
  D: ["graph.mjs", ["createGraph"]],
};

for (const [slot, [file, exports]] of Object.entries(slots)) {
  test(`slot ${slot} section with exports line`, () => {
    const head = `## Slot ${slot}: ${file}`;
    assert.ok(md.includes(head), `missing "${head}"`);
    const section = md.split(head)[1].split("\n## ")[0];
    const line = section.split("\n").find((l) => l.startsWith("exports:"));
    assert.ok(line, `slot ${slot}: no exports line`);
    const names = line.slice("exports:".length).split(",").map((s) => s.trim());
    assert.deepEqual(names, exports);
    assert.match(section, /Owner: dev-[12]/);
  });
}

test("SHEET section and import paths", () => {
  assert.ok(md.includes("## SHEET: sheet.mjs"));
  assert.ok(md.includes("live/bench5r/work/SHEET/sheet.mjs"));
  assert.ok(md.includes("createSheet"));
  for (const p of ["../MOD-A/parse.mjs", "../MOD-B/values.mjs", "../MOD-C/eval.mjs", "../MOD-D/graph.mjs"]) {
    assert.ok(md.includes(p), `missing import path ${p}`);
  }
});

test("MTG-1 required terms", () => {
  for (const w of ["parse.mjs", "values.mjs", "eval.mjs", "graph.mjs", "../MOD-B/values.mjs", "isError", "createGraph", "evaluate", "normCell"]) {
    assert.ok(md.includes(w), `missing ${w}`);
  }
});
