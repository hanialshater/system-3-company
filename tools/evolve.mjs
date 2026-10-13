#!/usr/bin/env node
// Code evolution for R&D (company/rnd/evolution.md). A project in src/lab/<p>/ has a FIXED evaluator
// (its test/ folder, an optional bench.mjs, and evolve.json) owned by the R&D lead. Candidates are
// full copies of the library source in src/lab/<p>/candidates/<id>/ written by R&D engineers. A
// candidate may not ship its own tests: the harness always evaluates it with the project's tests.
//
//   node tools/evolve.mjs eval <project> [id…]     score candidates (all if none given) → archive
//   node tools/evolve.mjs board <project>          leaderboard (best score per candidate)
//   node tools/evolve.mjs promote <project> <id>   copy the winner over the project's main source
//
// evolve.json: { "entry": "index.mjs", "weights": { "tests": 100, "size": -0.002, "bench": 1 },
//                "budgetGzBytes": 10240, "parents": { "<id>": ["<parent id>", …] } }
// Score = 0 unless every test passes and the size is within budget; otherwise
// tests*weights.tests + gzBytes*weights.size + Σ bench metrics * weights.bench (bench.mjs prints JSON numbers, higher = better).

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";
import { execFileSync, spawnSync } from "node:child_process";

const [cmd, project, ...ids] = process.argv.slice(2);
if (!cmd || !project) (console.log("usage: node tools/evolve.mjs eval|board|promote <project> [id…]"), process.exit(1));
const dir = path.resolve(process.env.EVOLVE_ROOT ?? "src/lab", project);
const cfg = JSON.parse(fs.readFileSync(path.join(dir, "evolve.json"), "utf8"));
const ARCHIVE = path.resolve(process.env.EVOLVE_ARCHIVE ?? `company/rnd/evolution/${project}.jsonl`);
const cands = path.join(dir, "candidates");
const W = { tests: 100, size: -0.002, bench: 1, ...(cfg.weights ?? {}) };

// Transitive gzipped size of what the entry imports (relative imports only).
function gzSize(root, entry) {
  const seen = new Set(), stack = [path.join(root, entry)];
  let src = "";
  while (stack.length) {
    const f = stack.pop();
    if (seen.has(f) || !fs.existsSync(f)) continue;
    seen.add(f);
    const t = fs.readFileSync(f, "utf8");
    src += t;
    for (const m of t.matchAll(/(?:import|export)[^'"]*?from\s*['"](\.[^'"]+)['"]/g)) stack.push(path.resolve(path.dirname(f), m[1]));
  }
  return zlib.gzipSync(src, { level: 9 }).length;
}

function evaluate(id) {
  const src = path.join(cands, id);
  if (fs.existsSync(path.join(src, "test"))) throw new Error(`${id}: candidates may not ship tests; the evaluator's tests are fixed`);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `evolve-${project}-`));
  fs.cpSync(src, tmp, { recursive: true });
  fs.cpSync(path.join(dir, "test"), path.join(tmp, "test"), { recursive: true });
  if (fs.existsSync(path.join(dir, "bench.mjs"))) fs.copyFileSync(path.join(dir, "bench.mjs"), path.join(tmp, "bench.mjs"));
  const t0 = Date.now();
  const files = fs.readdirSync(path.join(tmp, "test"), { recursive: true }).filter((f) => /\.test\.m?js$/.test(f)).map((f) => path.join("test", f));
  const r = spawnSync(process.execPath, ["--test", "--test-reporter=tap", ...files], { cwd: tmp, encoding: "utf8", timeout: 300_000 });
  const out = (r.stdout ?? "") + (r.stderr ?? "");
  const pass = Number(out.match(/^# pass (\d+)/m)?.[1] ?? 0), fail = Number(out.match(/^# fail (\d+)/m)?.[1] ?? (r.status ? 1 : 0));
  const gz = gzSize(tmp, cfg.entry ?? "index.mjs");
  let bench = {};
  if (fail === 0 && fs.existsSync(path.join(tmp, "bench.mjs"))) {
    try { bench = JSON.parse(execFileSync(process.execPath, ["bench.mjs"], { cwd: tmp, encoding: "utf8", timeout: 300_000 }).trim().split("\n").pop()); } catch (e) { bench = { error: String(e.message).slice(0, 120) }; }
  }
  const gated = fail === 0 && pass > 0 && gz <= (cfg.budgetGzBytes ?? Infinity);
  const benchScore = Object.values(bench).filter((v) => typeof v === "number").reduce((a, b) => a + b, 0);
  const score = gated ? Math.round((pass * W.tests + gz * W.size + benchScore * W.bench) * 100) / 100 : 0;
  fs.rmSync(tmp, { recursive: true, force: true });
  const rec = { ts: new Date().toISOString(), project, id, parents: cfg.parents?.[id] ?? [], pass, fail, gzBytes: gz, bench, score, gated, ms: Date.now() - t0 };
  fs.mkdirSync(path.dirname(ARCHIVE), { recursive: true });
  fs.appendFileSync(ARCHIVE, JSON.stringify(rec) + "\n");
  return rec;
}

const archive = () => (fs.existsSync(ARCHIVE) ? fs.readFileSync(ARCHIVE, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l)) : []);
function board() {
  const best = new Map();
  for (const r of archive()) if (!best.has(r.id) || r.score > best.get(r.id).score) best.set(r.id, r);
  return [...best.values()].sort((a, b) => b.score - a.score);
}

if (cmd === "eval") {
  const list = ids.length ? ids : fs.existsSync(cands) ? fs.readdirSync(cands).filter((d) => fs.statSync(path.join(cands, d)).isDirectory()) : [];
  for (const id of list) { const r = evaluate(id); console.log(`${id.padEnd(24)} score ${String(r.score).padStart(9)}  tests ${r.pass}/${r.pass + r.fail}  ${r.gzBytes} B gz${r.gated ? "" : "  (gated out)"}`); }
} else if (cmd === "board") {
  for (const [i, r] of board().entries()) console.log(`${String(i + 1).padStart(2)}. ${r.id.padEnd(24)} ${String(r.score).padStart(9)}  tests ${r.pass}/${r.pass + r.fail}  ${r.gzBytes} B  parents: ${r.parents.join(",") || "-"}`);
} else if (cmd === "promote") {
  const id = ids[0];
  const top = board()[0];
  if (!top || top.id !== id) console.log(`warning: ${id} is not the leaderboard's top (${top?.id ?? "none"}); promoting anyway because you asked`);
  for (const f of fs.readdirSync(path.join(cands, id))) fs.cpSync(path.join(cands, id, f), path.join(dir, f), { recursive: true });
  console.log(`promoted ${id} into ${path.relative(process.cwd(), dir)}`);
}
