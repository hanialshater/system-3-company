// Writes live/bench4/setup.json: one company channel and the 10 orders, with their dependencies (SPEC.md).
import fs from "node:fs";
const L = process.argv[2];
const mods = [
  ["TOKENIZER", "tokenize.mjs", []], ["PARSER", "parse.mjs", ["TOKENIZER"]], ["VALUES", "values.mjs", []], ["CELLS", "cells.mjs", []],
  ["FUNCTIONS", "functions.mjs", ["VALUES", "CELLS"]], ["EVALUATOR", "evaluate.mjs", ["PARSER", "VALUES", "CELLS", "FUNCTIONS"]],
  ["GRAPH", "graph.mjs", ["CELLS"]], ["FORMAT", "format.mjs", ["VALUES"]], ["SHEET", "sheet.mjs", ["EVALUATOR", "GRAPH", "FORMAT"]], ["GUIDE", "guide.md", ["SHEET"]],
];
const idx = Object.fromEntries(mods.map(([t], i) => [t, i]));
const ops = [{ cmd: "channel", sub: "create", args: { by: "cos", id: "company", kind: "company" } }];
for (const [t, file, after] of mods) {
  const code = file.endsWith(".mjs");
  const args = { by: "cos", to: "mgr-live", title: `${t}: ${file}`, task: t, budget: 200000,
    accept: code
      ? `live/bench4/work/${t}/${file}, exactly as the "${t}" section of live/bench4/SPEC.md says, plus at least one ${t.toLowerCase()}.test.mjs of your own (node --test) in the same folder. Import other modules only by the relative paths SPEC.md gives. Hidden acceptance tests check the behaviour SPEC.md states and report only failing categories.`
      : `live/bench4/work/GUIDE/guide.md, the user guide the "GUIDE" section of live/bench4/SPEC.md describes. Every example must be true of the shipped SHEET: try each one with live/bench4/shipped/SHEET/sheet.mjs.`,
    ...(code ? {} : { checks: { titleLine: true, minWords: 300, maxWords: 900, minReadingEase: 50, mustInclude: ["SUM", "MIN", "MAX", "AVERAGE", "COUNT", "IF", "ABS", "ROUND", "LEN"] } }) };
  if (after.length) args.after = after.map((a) => `\${${idx[a] + 1}.order}`).join(",");
  ops.push({ cmd: "order", sub: "new", args });
}
fs.writeFileSync(`${L}/setup.json`, JSON.stringify(ops, null, 1));
