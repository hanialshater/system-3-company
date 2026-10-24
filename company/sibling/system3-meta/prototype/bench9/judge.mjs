#!/usr/bin/env node
// Benchmark 9: the judge (PROTOCOL.md "The task" and "Rules").
//   node judge.mjs fast --dir=<compiler>   what an arm may run as often as it likes: the visible W1-W5 tests and Lua's
//        build, sanity and visible test files (B8's visible-check.mjs --wave=W7, against the start's visible pass set),
//        then Lua and the visible corpus timed against the start, 3 interleaved repetitions. Lines only.
//   node judge.mjs full --dir=<compiler> [--reps=5] [--out=<json>]   the operator's: the gate on hidden tests (B8's W7
//        hidden runner: the hidden W1-W5 tests, Lua's 22 hidden files, the runtime score, the compile's peak RSS),
//        then Lua and the held-out corpus (the hidden W1-W5 tests the start passes) timed against the start. Category
//        lines for the arm, and a JSON summary last.
// Paths (the installed copy reads them from judge.json beside it): b8 (B8's material), start (the start's tree),
// clj (clj-run), startResults (the start's last hidden W7 results), startVisible (the start's visible pass set).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const mode = process.argv[2];
const opt = Object.fromEntries(process.argv.slice(3).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const cfg = JSON.parse(fs.readFileSync(path.join(HERE, "judge.json"), "utf8"));
const DIR = path.resolve(opt.dir ?? ".");
if (!["fast", "full"].includes(mode)) { console.error("usage: judge.mjs fast|full --dir=<compiler>"); process.exit(2); }
export const LIMITS = { runtime: 1.1, rss: 1.1 }; // the gate: runtime score and peak RSS at most 1.10 x the start's
const env = { ...process.env, B8_HOME: cfg.b8 }; delete env.NODE_TEST_CONTEXT;
const node = (script, args, timeout) => spawnSync(process.execPath, [script, ...args], { encoding: "utf8", env, timeout, maxBuffer: 64 << 20 });
const lastJson = (s) => { for (const l of String(s ?? "").trim().split("\n").reverse()) { try { return JSON.parse(l); } catch {} } return null; };
const geo = (xs) => Math.exp(xs.reduce((a, x) => a + Math.log(x), 0) / xs.length);
const r3 = (x) => Math.round(x * 1000) / 1000;
fs.mkdirSync(path.join(cfg.b8, ".tmp"), { recursive: true });
const tmp = fs.mkdtempSync(path.join(cfg.b8, ".tmp", "b9-judge-"));
process.on("exit", () => fs.rmSync(tmp, { recursive: true, force: true }));
const time = (set, reps, corpus = null) => lastJson(node(path.join(HERE, "timing.mjs"), [`--arm=${DIR}`, `--start=${cfg.start}`, `--set=${set}`, `--reps=${reps}`, ...(corpus ? [`--corpus=${corpus}`] : [])], 3 * 3600_000).stdout);
const timeLine = (t, label) => (t?.refused ? `B9 time ${label}: refused (${t.why})` : t ? `B9 time ${label}: ${t.arm.median.toFixed(2)} s against the start's ${t.start.median.toFixed(2)} s (ratio ${t.ratio.toFixed(3)}; ${t.reps} interleaved runs each${t.complete ? "" : "; INCOMPLETE: the compiler wrote fewer files than the start or failed"})` : `B9 time ${label}: the timing failed`);

if (mode === "fast") {
  const base = path.join(tmp, "baseline.json"); fs.copyFileSync(cfg.startVisible, base);
  const v = node(path.join(HERE, "visible-check.mjs"), ["--wave=W7", `--dir=${DIR}`, `--clj=${cfg.clj}`, `--baseline=${base}`], 3600_000);
  const fails = String(v.stdout ?? "").split("\n").filter((l) => /^failed: /.test(l));
  console.log(v.status === 0 ? "B9 fast check: ok (no visible W1-W5 test or visible Lua file that the start passes fails)" : `B9 fast check: ${fails.length ? fails.map((l) => l.replace(/^failed: /, "")).join("; ") : `visible check exit ${v.status}`}`);
  // a candidate that fails the check fails the fast judge whatever its timings: none are taken (a deadlocking compiler
  // would spend 6 batch timeouts on them)
  if (v.status !== 0) process.exit(1);
  const vis = path.join(tmp, "visible.txt");
  fs.writeFileSync(vis, cfg.visibleCorpus.join("\n") + "\n");
  const tl = time("lua", 3), tc = time("corpus", 3, vis);
  console.log(timeLine(tl, "lua")); console.log(timeLine(tc, "visible corpus"));
  if (tl?.ratio && tc?.ratio && tl.complete && tc.complete) console.log(`B9 fast score: ${r3(geo([tl.ratio, tc.ratio]))} (geometric mean of the two ratios; lower is better; noisy: the full judge decides)`);
  process.exit(v.status === 0 ? 0 : 1);
}

// ---- full ----
const res = path.join(tmp, "results.json");
const h = node(path.join(cfg.b8, "run-hidden-w7.mjs"), [`--dir=${DIR}`, `--results=${res}`, "--no-refs"], 4 * 3600_000);
const hj = lastJson(h.stdout);
const start = JSON.parse(fs.readFileSync(cfg.startResults, "utf8")), startW15 = JSON.parse(fs.readFileSync(`${cfg.startResults}.w15.json`, "utf8"));
let now = {}; try { now = JSON.parse(fs.readFileSync(`${res}.w15.json`, "utf8")).tests ?? {}; } catch {}
const regressed = Object.entries(startW15.tests).filter(([id, ok]) => ok && now[id] !== true).map(([id]) => id);
const regByWave = regressed.reduce((m, id) => ((m[id.slice(0, 2).toUpperCase()] = (m[id.slice(0, 2).toUpperCase()] ?? 0) + 1), m), {});
const w7 = hj?.w7 ?? null, startW7 = cfg.startW7;
const gate = {
  w15: { regressions: regressed.length, byWave: regByWave, ok: !!hj && regressed.length === 0 },
  lua: { pass: w7?.tests?.pass ?? 0, total: w7?.tests?.total ?? 22, ok: !!w7 && w7.build.failed === 0 && w7.build.linked && w7.build.sanity === "ok" && w7.tests.pass === w7.tests.total },
  runtime: { score: w7?.bench?.score ?? null, limit: r3(startW7.runtime * LIMITS.runtime), ok: w7?.bench?.score != null && w7.bench.score <= startW7.runtime * LIMITS.runtime },
  rss: { mb: w7?.compile?.rssMB ?? null, limit: Math.round(startW7.rssMB * LIMITS.rss), ok: w7?.compile?.rssMB != null && w7.compile.rssMB <= startW7.rssMB * LIMITS.rss },
};
gate.ok = gate.w15.ok && gate.lua.ok && gate.runtime.ok && gate.rss.ok;
const corpus = path.join(tmp, "corpus.txt");
fs.writeFileSync(corpus, Object.entries(startW15.tests).filter(([, ok]) => ok).map(([id]) => path.join(cfg.b8, "hidden", "tests", `${id}.c`)).join("\n") + "\n");
const reps = Number(opt.reps ?? 5), tl = time("lua", reps), tc = time("corpus", reps, corpus);
const timed = !!(tl?.complete && tc?.complete);
const raw = timed ? r3(geo([tl.ratio, tc.ratio])) : null, score = gate.ok && timed ? raw : 1;
const lines = [
  `B9 gate W1-W5: ${gate.w15.ok ? "ok" : `${regressed.length} hidden test(s) the start passes fail now${regressed.length ? ` (${Object.entries(regByWave).map(([k, v]) => `${k} ${v}`).join(", ")})` : ""}`}`,
  `B9 gate Lua: ${gate.lua.ok ? `ok (${gate.lua.pass} of ${gate.lua.total})` : w7 ? `${w7.tests.total - w7.tests.pass} of ${w7.tests.total} hidden Lua files fail${w7.build.failed ? `; ${w7.build.failed} of 33 sources fail to compile` : ""}${w7.build.sanity !== "ok" ? "; sanity fails" : ""}` : "the runner failed"}`,
  `B9 gate runtime: ${gate.runtime.score ?? "-"} (limit ${gate.runtime.limit})${gate.runtime.ok ? "" : ": FAILS"}`,
  `B9 gate RSS: ${gate.rss.mb ?? "-"} MB (limit ${gate.rss.limit} MB)${gate.rss.ok ? "" : ": FAILS"}`,
  timeLine(tl, "lua"), timeLine(tc, "held-out corpus"),
  `B9 score: ${score}${gate.ok ? "" : " (the gate fails: no credit)"}${raw != null ? ` (timing alone ${raw})` : ""}`,
];
for (const l of lines) console.log(l);
const out = { dir: DIR, score, raw, gate, lua: tl, corpus: tc, hidden: hj ? { pass: hj.pass, total: hj.total, w7 } : { error: String(h.stderr ?? "").slice(0, 400) }, lines };
if (opt.out) fs.writeFileSync(opt.out, JSON.stringify(out, null, 1));
console.log(JSON.stringify({ score, raw, gateOk: gate.ok, luaRatio: tl?.ratio ?? null, corpusRatio: tc?.ratio ?? null }));
