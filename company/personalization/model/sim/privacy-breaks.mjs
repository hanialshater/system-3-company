#!/usr/bin/env node
// Deliberate-break check for the N1/N3 privacy tests (W-1526). Shows each test fails when the composer breaks.
//   node company/personalization/model/sim/privacy-breaks.mjs
// For each break: copy ../ (the model folder) into a fresh temp root (content/ and src/ symlinked for the
// catalog), apply the break to the COPY of sim/composer.ts, run privacy-n1-n3.test.mjs from the copy, and
// report which tests fail. The real files are never edited. "order-only" rows also weaken the test copy to the
// ruling's literal check (order only, no composition or read check), to show what the stricter checks add.
// Exits 1 if any break is not caught as expected. owner: learner-model-engineer · offline only.
import { mkdtempSync, mkdirSync, symlinkSync, cpSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const here = dirname(fileURLToPath(import.meta.url));
const model = join(here, "..");
const root = join(model, "..", "..", "..");
const A = "  const fp = input.fingerprint;";
const NOV = 'add("novelty", w.novelty * novelty(l, ctx, model, queuedConcepts));';
const MISS = "const missed = (h: HistoryItem) => h.predictedCorrectly === false ||";
const N1 = "N1: composing with storage and network stubbed makes zero writes and zero fetches";
const N3 = "N3: histories equal in permitted inputs and different in every forbidden input give the same order";
const ageStretch = 'add("novelty", w.novelty * novelty(l, ctx, model, queuedConcepts) - ((input as any).ageBand === "13-15" && l.level !== "intro" ? 1 : 0));';
const ageUniform = 'add("novelty", w.novelty * novelty(l, ctx, model, queuedConcepts) + ((input as any).ageBand === "13-15" ? 0.5 : 0));';
const dwell = "const missed = (h: HistoryItem) => (h as any).dwell > 60000 || h.predictedCorrectly === false ||";

// [name, edits to composer.ts, expected failing tests, orderOnly?]
const BREAKS = [
  ["B0 none (copy unchanged)", [], []],
  ["B1 N1 localStorage.setItem of the fingerprint", [[A, `${A}\n  (globalThis as any).localStorage?.setItem("s3c:fp", JSON.stringify(fp));`]], [N1]],
  ["B2 N1 fetch POST of need scores", [[A, `${A}\n  (globalThis as any).fetch?.("/api/exp", { method: "POST", body: JSON.stringify(input.needs) });`]], [N1]],
  ["B3 N1 named import of node:fs appendFileSync to a log", [["import type {", 'import { appendFileSync } from "node:fs";\nimport type {'],
    [A, `${A}\n  appendFileSync(LOGFILE, JSON.stringify(fp));`]], [N1, N3]], // N3 too: JSON.stringify reads every forbidden key
  ["B4 N1 console.debug of the fingerprint", [[A, `${A}\n  console.debug(fp);`]], [N1]],
  ["B5 N1 caches the fingerprint on the caller's input", [[A, `${A}\n  (input as any).cachedFp = fp;`]], [N1]],
  ["B6 N3 ageBand 13-15 penalises non-intro lessons", [[NOV, ageStretch]], [N3]],
  ["B6o same, test weakened to order-only", [[NOV, ageStretch]], [N3], true],
  ["B6u N3 ageBand shifts every score by 0.5 (order unchanged)", [[NOV, ageUniform]], [N3]],
  ["B6uo same, test weakened to order-only (expected NOT caught)", [[NOV, ageUniform]], [], true],
  ["B7 N3 dwell on history items counts as a miss", [[MISS, dwell]], [N3]],
  ["B7o same, test weakened to order-only", [[MISS, dwell]], [N3], true],
  ["B8 N3 reads device on the fingerprint, order unchanged", [[A, `${A}\n  void (fp as any).device;`]], [N3]],
];

let bad = 0;
for (const [name, edits, expected, orderOnly] of BREAKS) {
  const S = mkdtempSync(join(tmpdir(), "w1526-break-"));
  try {
    mkdirSync(join(S, "company", "personalization"), { recursive: true });
    symlinkSync(join(root, "content"), join(S, "content"));
    symlinkSync(join(root, "src"), join(S, "src"));
    const m = join(S, "company", "personalization", "model");
    cpSync(model, m, { recursive: true, filter: (p) => !p.includes(`${join("sim", "out")}`) });
    const cp = join(m, "sim", "composer.ts");
    let s = readFileSync(cp, "utf8");
    for (const [o, n] of edits) {
      if (s.split(o).length !== 2) throw new Error(`${name}: anchor not found once: ${o}`);
      s = s.replace(o, n.replace("LOGFILE", JSON.stringify(join(S, "break-log.txt"))));
    }
    writeFileSync(cp, s);
    const tp = join(m, "sim", "privacy-n1-n3.test.mjs");
    if (orderOnly) {
      let t = readFileSync(tp, "utf8");
      const drop = [/^ *assert\.deepEqual\(JSON\.parse\(JSON\.stringify\(b\)\).*\n/m, /^ *assert\.deepEqual\(\[\.\.\.new Set\(reads\)\].*\n/m];
      for (const re of drop) { if (!re.test(t)) throw new Error(`${name}: cannot weaken test`); t = t.replace(re, ""); }
      writeFileSync(tp, t);
    }
    const out = spawnSync(process.execPath, ["--test", tp], { encoding: "utf8" }).stdout;
    const failing = [...out.matchAll(/^not ok \d+ - (.*)$/gm)].map((x) => x[1]);
    const errors = [...out.matchAll(/^ {2}error: (?:\|-\n\s+)?(.*)$/gm)].map((x) => x[1].slice(0, 140));
    const ok = JSON.stringify([...failing].sort()) === JSON.stringify([...expected].sort());
    if (!ok) bad++;
    console.log(`${ok ? "as expected" : "UNEXPECTED "} · ${name}\n    failing: ${failing.length ? failing.map((f) => f.slice(0, 2)).join(", ") : "none"}${errors.length ? `\n    first error: ${errors[0]}` : ""}`);
  } finally { rmSync(S, { recursive: true, force: true }); }
}
console.log(bad ? `\nFAIL: ${bad} break(s) not caught as expected` : `\nOK: every break caught as expected (${BREAKS.length} rows)`);
process.exit(bad ? 1 : 0);
