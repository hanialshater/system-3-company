// Benchmark 8, W7 ("compile real software": Lua 5.4.7; spec/W7.md, PROTOCOL.md "W7"). The wave's harness pieces, kept
// apart from setup.mjs so that W1-W6's code paths stay as they ran: setup.mjs loads this module only for W7 (a
// synchronous require of this ES module, Node 22), vanilla-compiler.mjs and keepalive.mjs import it.
// W7 is opt-in: an arm that finished W1-W6 is continued into it with `--extend=W7` (V: the next turn of the same
// session; S-like arms: the next wave's order). It has its own feedback rounds (3, as every wave) and its own caps
// (W7_MIN active minutes, W7_COST dollars) counted from W7's start, whatever W1-W6 used.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

export const W7 = "W7";
export const W7_MIN = 180, W7_COST = 80;
export const W7_CATEGORIES = ["language", "libraries", "runtime", "io-os"];

/** The files the orderer releases with W7, as [published path, source]: spec/W7.md, spec/w7/** (build.json, the W7
 *  header set, Lua's sources, the benchmark programs) and visible/W7/** (6 test files, the driver, helpers). */
export function releaseFiles(P) {
  const out = [["spec/W7.md", path.join(P.spec, "W7.md")]];
  const walk = (from, to) => { for (const f of fs.readdirSync(from).sort()) { const s = path.join(from, f), st = fs.statSync(s); if (st.isDirectory()) walk(s, path.join(to, f)); else if (st.isFile()) out.push([path.join(to, f), s]); } };
  walk(path.join(P.spec, "w7"), "spec/w7");
  walk(path.join(P.visible, "W7"), "visible/W7");
  return out;
}

/** The W7 hidden run (<b8>/run-hidden-w7.mjs: the hidden W1-W5 tests, then Lua built by the arm's compiler, its test
 *  suite, the runtime programs, the compile time), in the shape setup.mjs hidden() returns. The caller holds the hidden
 *  lock. `feedback` (sent only when something fails): the failing category lines, then the build, benchmark, score and
 *  compile lines. */
export function hidden(P, dir, { results = null, reps = null } = {}) {
  const { NODE_TEST_CONTEXT, B8_HOME, ...env } = process.env;
  const runner = path.join(P.b8, "run-hidden-w7.mjs");
  const argv = [runner, `--dir=${dir}`, ...(results ? [`--results=${results}`] : []), ...(reps ? [`--reps=${reps}`] : [])];
  const r = spawnSync(process.execPath, argv, { encoding: "utf8", env: { ...env, B8_HOME: P.b8 }, timeout: 4 * 3600_000, maxBuffer: 32 << 20 });
  const out = String(r.stdout ?? "").trim().split("\n"), last = out.pop();
  let j = null; try { j = JSON.parse(last); } catch {}
  if (!j || typeof j.total !== "number" || !j.w7) return { error: `runner: exit ${r.status} ${String(r.stderr ?? r.error ?? "").slice(0, 400)}`, code: 3 };
  const categories = j.byCategory ?? {};
  const failing = Object.entries(categories).filter(([, c]) => c.fail).map(([k, c]) => `${k}: ${c.fail} of ${c.total} fail`);
  const w7Lines = out.filter((l) => /^W7 (build|bench |runtime score|compile)/.test(l));
  const buildFail = j.w7.build.failed > 0 || !j.w7.build.linked || j.w7.build.sanity !== "ok";
  const benchFail = Object.values(j.w7.bench?.programs ?? {}).some((b) => !b.ok);
  const fail = failing.length > 0 || buildFail || benchFail;
  const feedback = fail ? [...failing, ...w7Lines] : [];
  return { wave: W7, pass: j.pass, fail: j.total - j.pass, total: j.total, rate: j.total ? j.pass / j.total : 0, byWave: j.byWave, categories, failing, gate: null, w6: null, w6Lines: [], w7: j.w7, w7Lines, failStages: j.failStages, cheat: j.cheat, seconds: j.seconds, anyFail: fail, feedback, findings: feedback.map((l) => `failed: ${l}`), results, code: fail ? 1 : 0 };
}

/** The W7 summary the tally keeps: Lua tests (hidden) %, the runtime score, compile seconds and peak RSS. */
export const tallyOf = (x) => (x?.w7 ? { luaTests: x.w7.tests?.pct ?? null, luaPass: x.w7.tests?.pass ?? null, luaTotal: x.w7.tests?.total ?? null, runtime: x.w7.bench?.score ?? null, runtimeRefs: x.w7.bench?.refs ?? null, compileSec: x.w7.compile?.seconds ?? null, rssMB: x.w7.compile?.rssMB ?? null, build: x.w7.build ?? null } : null);

export const WAVE_ACCEPT = "Wave W7 of the C-subset compiler (in Clojure, x86-64 GNU as): compile real software. Read spec/CONTRACT.md and spec/W7.md in the order's worktree: the compiler must build the Lua 5.4.7 interpreter from spec/w7/lua (its 33 sources, unmodified) with the W7 header set (spec/w7/include) and the defines and flags of spec/w7/build.json (the driver takes -D NAME[=VALUE] from this wave), linked with `gcc *.s -o lua -lm`; visible/W7/ holds 6 of the 28 scored files of Lua's own test suite with the driver (visible/W7/README.md shows how to run one) and spec/w7/bench/ the 6 runtime programs. The integration check after each hand-in runs the visible tests of waves 1..5 and, for W7, builds Lua with the compiler and runs the visible W7 test files: a visible test that passed at the last passing check and fails now is a regression, routed back. After the evaluation, code runs the orderer's W7 hidden runner on the worktree: the hidden W1-W5 tests, the 22 hidden Lua test files, the runtime of the 6 programs' variants against gcc -O0's Lua, and the compile time; a failure comes back as a revise naming only categories and numbers, one line each (`W7 runtime: 2 of 7 fail`, `W7 build: 1 of 33 sources fail to compile; link not tried`, `W7 bench fib: 2.31x gcc -O0`). W7's lines name Lua's features, not compiler modules: they come to the architect (triage) to route. Three feedback rounds at most; W7 has its own caps (180 active minutes, $80).";

/** Where an arm stands in W7 (its ledger rows: V's vanilla.jsonl, an S-like arm's waves.jsonl). `extend` rows mark W7's
 *  start; before one there is no W7 run (started false). After it: finished when W7 was summed up (V wave-summary, S
 *  wave-end), a stop after it, or an end (V end, S run-end) after the last start or resume after it. */
export function extStatus(rows, kind = "V") {
  const i0 = rows.findIndex((x) => x.event === "extend" && x.wave === W7);
  if (i0 < 0) return { started: false, finished: false, why: null, extend: null };
  const after = rows.slice(i0);
  const sum = after.find((x) => (kind === "V" ? x.event === "wave-summary" : x.event === "wave-end") && x.wave === W7);
  const stop = after.find((x) => x.event === "stop");
  const li = after.findLastIndex((x) => ["start", "resume", "run-start", "extend"].includes(x.event));
  const end = li >= 0 ? after.slice(li + 1).find((x) => x.event === (kind === "V" ? "end" : "run-end")) : null;
  return { started: true, finished: !!(sum || stop || end), why: stop ? `stopped: ${stop.why}` : sum ? "W7 ran" : end ? `ended: ${end.why}` : null, extend: rows[i0] };
}

/** The arm's base for W7's caps: the active minutes and the cost at W7's start (its `extend` row). */
export const capBase = (rows) => { const e = rows.find((x) => x.event === "extend" && x.wave === W7); return e ? { activeMin: e.activeMin ?? 0, cost: e.cost ?? e.runCost ?? 0 } : null; };
