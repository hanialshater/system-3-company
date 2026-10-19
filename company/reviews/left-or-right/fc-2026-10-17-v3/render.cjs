// fact-checker, left-or-right v3 (2026-10-17): render the committed Reveal and seenText from Demo.tsx (sliced from the
// file, transpiled unchanged, rendered with react-dom/server) for the seen state each press sequence produces.
// The press -> seen model is my own reading of settle()/record() (Demo.tsx lines ~162-180); signs are my own (own.py).
// Run from the worktree root: NODE_PATH=<repo>/node_modules node company/reviews/left-or-right/fc-2026-10-17-v3/render.cjs
const fs = require("fs");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const src = fs.readFileSync("src/demos/math/left-or-right/Demo.tsx", "utf8");
function slice(startToken) {
  const a = src.indexOf(startToken);
  if (a < 0) throw new Error("missing " + startToken);
  const b = src.indexOf("\n}\n", a);
  return src.slice(a, b + 3);
}
const fmtLine = src.split("\n").find((l) => l.startsWith("const fmt ="));
const code = [fmtLine, "type Seen = { turned?: number; mirror?: number };", slice("function seenText("), slice("function Reveal(")].join("\n");
const js = ts.transpileModule(code, { compilerOptions: { jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS } }).outputText;
const mod = new Function("React", js + "\nreturn { seenText, Reveal };")(React);
const text = (seen, eightMirror = false) =>
  renderToStaticMarkup(React.createElement(mod.Reveal, { seen, eightMirror })).replace(/<\/p><p>/g, " | ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

// own trefoil sums per rest state (own.py): front -3, turned -3, mirror +3, mirrored-then-turned +3
const SUM = { "00": -3, "10": -3, "01": 3, "11": 3 };
function run(presses) {
  let turned = false, mirrored = false;
  const seen = {}, reached = new Set();
  const out = [];
  for (const p of presses) {
    if (p === "T") turned = !turned; else mirrored = !mirrored;
    const sum = SUM[(turned ? "1" : "0") + (mirrored ? "1" : "0")];
    if (turned) { if (!mirrored && seen.turned === undefined) seen.turned = sum; reached.add("turned"); }
    if (mirrored) { if (seen.mirror === undefined) seen.mirror = sum; reached.add("mirrored"); }
    if (reached.has("turned") && reached.has("mirrored")) out.push({ at: presses.slice(0, out.length ? undefined : undefined), state: { turned, mirrored }, seen: { ...seen } });
  }
  return { seen, reached, unlocked: reached.has("turned") && reached.has("mirrored") };
}
const BR = "Turning the mirrored trefoil over left every mark plus: turning over is a way of moving it, so its hand stayed right.";
const ST = "Turning the trefoil over left every mark minus: turning over is a way of moving it, so its hand stayed left.";
// every press sequence of length 1..6 over {T, M}; reveal pressed after the last press if unlocked
let n = 0, branch = 0, bad = 0;
for (let len = 1; len <= 6; len++) {
  for (let mask = 0; mask < 1 << len; mask++) {
    const presses = [...Array(len)].map((_, i) => ((mask >> i) & 1 ? "M" : "T"));
    const r = run(presses);
    if (!r.unlocked) continue;
    n++;
    const t = text(r.seen);
    const isBranch = t.includes(BR) && !t.includes(ST);
    const isStd = t.includes(ST) && !t.includes(BR);
    if (isBranch) branch++;
    // own truth test: the branch must appear iff the learner never stood on plain turned (-3)
    const sawPlainTurned = r.seen.turned !== undefined;
    const ok = sawPlainTurned ? isStd && r.seen.turned === -3 : isBranch && r.seen.mirror === 3;
    if (!ok) { bad++; console.log("BAD", presses.join(""), JSON.stringify(r.seen), t); }
  }
}
console.log(`unlocked sequences up to 6 presses: ${n}; branch opener: ${branch}; mismatches: ${bad}`);
for (const [name, p] of [["mirror-then-turn", "MT"], ["turn-then-mirror", "TM"], ["mirror-turn-x2", "MTMT"]]) {
  const r = run([...p]);
  console.log(`\n${name} (${p}) seen line: "${mod.seenText(r.seen)}"\n  reveal: ${text(r.seen)}`);
}
console.log(`\nwith eightMirror, branch: ${text({ mirror: 3 }, true)}`);
