#!/usr/bin/env node
// Benchmark 8, arm V: ONE pure vanilla agent for the whole run. One Agent SDK session, resumed for every turn (a
// person's single long chat): the six waves are released as turns, in order, on one growing codebase in a fresh
// directory <runs>/V/ (its own git repo, outside any checkout with a CLAUDE.md).
//   - settingSources [] (no CLAUDE.md, no project settings, no company subagents or slash commands); tools Bash, Read,
//     Write, Edit, Glob, Grep only (no Agent tool, no web); a PreToolUse hook (setup.mjs accessDecision: the hidden
//     material, the other arm and the operator's logs are closed; gcc/cc/clang only assemble or link; no network; no
//     nested `claude`), every call logged to _operator/access.jsonl; PATH shims as the backstop for code it runs.
//   - turn 1: the wave-1 release (setup.mjs release: the contract, the headers, W1.md, visible/W1) and the prompt.
//     When the agent says it is done, the harness runs the hidden runner (waves 1..n, setup.mjs hidden: the same runner,
//     lines and gate the S arm's accept gets) and, if anything fails, sends back only those lines as the next turn, up
//     to MAX_ROUNDS (3) feedback rounds; then the next wave is released as the next turn.
//   - caps for the whole run: wall clock (--max-min, 300) and cost (--max-cost, $120), checked before each turn and
//     at each turn's end; a turn is also cut at the wall clock. One resume after a crash or a cut turn.
//   - ledger <runs>/_operator/V/vanilla.jsonl: start, release, turn (session, cost and tokens as the SDK reports them,
//     minutes), hidden (pass, total, per wave and category, W6), wave-summary; setup.mjs tally reads it.
//
//   node vanilla-compiler.mjs [--waves=W1,…,W6] [--model=<id>] [--runs=<dir>] [--b8=<dir>] [--max-min=300]
//        [--max-cost=120] [--turn-min=120] [--max-turns=500] [--max-rounds=3] [--dry-run [--fake=<dir>]]
//   --dry-run starts no session: it prints the prompts and settings, checks the hook on fixed calls, and with
//   --fake=<compiler dir> plays the agent itself (turn 1 copies that compiler in, each later turn touches its backend)
//   so the release, hidden-run, feedback and ledger path runs for real, into --runs (default: a fresh scratch dir).
// Pilot fixes (2026-10-23): the CLI runs in V's box (sandbox.mjs: its own uid, mount/pid/net namespaces, no C compiler,
// the model API as the only egress, an allowlisted env), started by the SDK's spawnClaudeCodeProcess; the effort is the
// SDK option (EFFORT, the same as S's launcher --effort); a preflight session checks the box first (--no-preflight
// skips it).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { paths, WAVES, MAX_ROUNDS, RUN_MIN, RUN_COST, EFFORT, release, ensureToolchain, installShims, armEnv, hidden, nextResults, lastResults, makeHook, append, selftest, chownArm, preflight, AUTH_HINT } from "./setup.mjs";
import { prepareBox, startEgress, spawnFor, boxEnvNames, boxArgv } from "./sandbox.mjs";

const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const DRY = !!opt["dry-run"], FAKE = typeof opt.fake === "string" ? path.resolve(opt.fake) : null;
if (DRY && FAKE && !opt.runs) opt.runs = fs.mkdtempSync(path.join("/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad", "b8-dry-V-"));
const P = paths(opt);
const RUN_WAVES = String(opt.waves ?? WAVES.join(",")).split(",").filter(Boolean).map((x) => x.toUpperCase());
if (!RUN_WAVES.every((w) => WAVES.includes(w))) { console.error("--waves is a list of W1..W6"); process.exit(2); }
const ROUNDS = Number(opt["max-rounds"] ?? MAX_ROUNDS), MAX_MIN = Number(opt["max-min"] ?? RUN_MIN), MAX_COST = Number(opt["max-cost"] ?? RUN_COST);
const TURN_MIN = Number(opt["turn-min"] ?? 120), MAX_TURNS = Number(opt["max-turns"] ?? 500), RESUMES = 1;
const TOOLS = ["Bash", "Read", "Write", "Edit", "Glob", "Grep"];
// the S arm's model: the launcher's own default (or the same --model passed to both); no model id lives here
const launcherSrc = fs.readFileSync(path.join(P.proto, "launcher", "launch.mjs"), "utf8");
const MODEL = opt.model ?? (launcherSrc.match(/const MODEL = opt\.model \?\? "([^"]+)"/) ?? [])[1];
const EFF = opt.effort ?? EFFORT;
if (!MODEL) { console.error("no --model, and the launcher's default could not be read"); process.exit(2); }
const n = (w) => Number(w.slice(1));

const DIR = P.V;
const firstPrompt = (w) => `You are building a compiler for a subset of C, written in Clojure, that emits x86-64 GNU as assembly, in ${DIR} (a git repository of your own; commit as you see fit). The work comes in six waves on this one growing codebase; this is wave ${n(w)}.

- spec/CONTRACT.md is what stays the same in every wave: where the compiler lives (the namespace ccc.main in src/ccc/main.clj), how it runs (single-file and --batch modes), the output, the provided headers (spec/include/), the rules and the feedback. Read it first.
- spec/${w}.md is this wave's exact scope.
- visible/${w}/ holds about a quarter of this wave's tests: <id>.c, <id>.expected (stdout), <id>.exit, manifest.json (visible/README.md shows how to run one).
- Clojure runs only through ${P.clj} (Clojure 1.12.6 + spec.alpha; ./src on the classpath; run it from ${DIR}): \`${P.clj} -m ccc.main -I spec/include <in.c> -o <out.s>\`, then \`gcc <out.s> -o <prog>\`.
- Rules (CONTRACT.md section 4): never compile or preprocess C with gcc, clang, cpp or anything else (gcc only assembles and links your compiler's .s); no downloads and no network; no special cases for test programs.

When this wave's compiler is done, say so briefly. ${hiddenNote(w)}`;
const hiddenNote = (w) => `After you finish, the orderer's hidden runner scores your compiler on the hidden tests of waves 1..${Math.min(n(w), 5)}${n(w) === 6 ? ", times the hidden variants of the benchmark programs against gcc -O0 and applies the regression gate" : ""}, and reports only the failing categories, one line each (\`W3 structs: 12 of 40 fail\`). You get up to ${ROUNDS} such feedback rounds per wave; then the next wave is released.`;
const wavePrompt = (w) => `Wave ${n(w)} is released: spec/${w}.md is its exact scope${n(w) <= 5 ? `, and visible/${w}/ holds about a quarter of its tests` : ", and spec/bench/ holds the 8 benchmark programs with their expected outputs"}. Extend the compiler in ${DIR}; the earlier waves' tests still count. When this wave is done, say so briefly. ${hiddenNote(w)}`;
const feedbackPrompt = (lines) => `The orderer's hidden runner on your compiler:\n${lines.join("\n")}\nFix it, and say when you are done.`;

if (DRY && !FAKE) {
  const st = await selftest(P);
  for (const w of RUN_WAVES) console.log(`===== ${w}, the release's turn:\n${w === RUN_WAVES[0] ? firstPrompt(w) : wavePrompt(w)}\n`);
  console.log(`===== a feedback turn:\n${feedbackPrompt(["W1 functions: 3 of 45 fail", "W1 control: 1 of 12 fail"])}\n`);
  console.log(JSON.stringify({ dry: true, dir: DIR, waves: RUN_WAVES, model: MODEL, effort: EFF, envNames: boxEnvNames(P, "V"), box: boxArgv(P, "V", DIR, ["<claude>"])[1].slice(0, 7), tools: TOOLS, settingSources: [], maxTurns: MAX_TURNS, turnMin: TURN_MIN, maxRounds: ROUNDS, caps: { maxMin: MAX_MIN, maxCost: MAX_COST }, ledger: P.vledger, access: P.access, shims: P.shim("V"), hookSelftest: { cases: st.cases.length, failed: st.failed } }, null, 1));
  process.exit(st.failed.length ? 1 : 0);
}

if (fs.existsSync(DIR) && fs.readdirSync(DIR).length && RUN_WAVES[0] === "W1") { console.error(`refused: ${DIR} exists (V starts in a fresh directory)`); process.exit(2); }
const note = (x) => { append(P.vledger, x); console.log(JSON.stringify(x)); };
ensureToolchain(P); installShims(P, "V"); prepareBox(P, "V");
const env = armEnv(P, "V");
if (!DRY && !opt["no-preflight"] && !fs.existsSync(P.vledger)) {
  const pf = await preflight(P, "V", { model: MODEL, effort: EFF });
  append(P.vledger, { event: "preflight", ...pf }); console.log(JSON.stringify({ event: "preflight", ...pf }));
  if (!pf.ok) { console.error(`V preflight failed (${pf.why}): no session could start in V's box. ${AUTH_HINT}`); process.exit(2); }
}
const egress = DRY ? null : startEgress(P, "V");
fs.mkdirSync(DIR, { recursive: true });
// the orderer's git runs as root in V's folder (V's uid owns it): safe.directory, and the folder goes back to V's uid
const git = (...a) => { const r = spawnSync("git", ["-c", "safe.directory=*", "-C", DIR, ...a], { encoding: "utf8" }); chownArm("V", DIR); return r; };
if (!fs.existsSync(path.join(DIR, ".git"))) { git("init", "-q", "-b", "main"); git("config", "user.email", "vanilla@b8.invalid"); git("config", "user.name", "B8 V"); }
const prev = fs.existsSync(P.vledger) ? fs.readFileSync(P.vledger, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)) : [];
let session = prev.findLast((x) => x.event === "turn" && x.session)?.session ?? null;
const T0 = Date.now() - prev.filter((x) => x.event === "wave-summary").reduce((a, x) => a + (x.minutes ?? 0), 0) * 60_000;
const left = () => MAX_MIN * 60_000 - (Date.now() - T0);
const hook = await makeHook(P, "V", { sid: () => session, cwd: DIR });
const query = DRY ? null : (await import(pathToFileURL(path.join(P.proto, "launcher", "node_modules", "@anthropic-ai", "claude-agent-sdk", "sdk.mjs")).href)).query;
const sdkEnv = { ...env };
let runCost = prev.findLast((x) => x.event === "turn")?.runCost ?? 0; // the session's running total (a resumed session's result carries it)

let fakeTurn = 0;
function fakeAgent() {
  // --dry-run --fake: the harness plays the agent (no session): turn 1 brings the compiler, each later turn edits it
  fakeTurn++;
  if (fakeTurn === 1) { for (const d of ["src", "docs"]) if (fs.existsSync(path.join(FAKE, d))) fs.cpSync(path.join(FAKE, d), path.join(DIR, d), { recursive: true }); }
  else { const f = path.join(DIR, "src", "ccc", "backend", "x86.clj"); if (fs.existsSync(f)) fs.appendFileSync(f, `\n;; fake turn ${fakeTurn}\n`); }
  git("add", "-A"); git("commit", "-q", "-m", `fake agent turn ${fakeTurn}`); chownArm("V", DIR);
  return { session: "fake-session", result: { result: "done (fake agent)", is_error: false, num_turns: 1, modelUsage: {} } };
}
let turns = 0;
async function turn(prompt, label, wave) {
  turns++;
  const ms = Math.max(1000, Math.min(TURN_MIN * 60_000, left()));
  const t0 = Date.now(); let result = null, error = null;
  if (DRY) { const f = fakeAgent(); session = f.session; result = f.result; }
  else {
    const ac = new AbortController(), limit = setTimeout(() => ac.abort(new Error(ms < TURN_MIN * 60_000 ? `run over ${MAX_MIN} min` : `turn over ${TURN_MIN} min`)), ms);
    try {
      for await (const m of query({ prompt, options: { cwd: DIR, model: MODEL, effort: EFF, abortController: ac, env: sdkEnv, settingSources: [], tools: TOOLS, allowedTools: TOOLS, permissionMode: "dontAsk", permissionPrompts: "none", maxTurns: MAX_TURNS, hooks: { PreToolUse: [{ hooks: [hook] }] }, spawnClaudeCodeProcess: spawnFor(P, "V", { stderrLog: path.join(P.op, "V", "cli-stderr.log") }), ...(session ? { resume: session } : {}) } })) {
        if (typeof m.session_id === "string" && m.session_id && !session) session = m.session_id;
        if (m.type === "result") result = m;
      }
    } catch (e) { error = e?.message ?? String(e); }
    clearTimeout(limit);
  }
  const mu = Object.values(result?.modelUsage ?? {});
  const cumulative = mu.reduce((a, u) => a + u.inputTokens + u.outputTokens + u.cacheReadInputTokens + u.cacheCreationInputTokens, 0);
  const cost = mu.reduce((a, u) => a + (u.costUSD ?? 0), 0);
  const ok = !error && !!result && !result.is_error;
  if (result) runCost = cost >= runCost ? cost : runCost + cost; // a restarted total (a new session) adds on
  note({ event: "turn", wave, n: turns, label, session, ok, reason: ok ? null : (error ?? result?.subtype ?? "no result"), cumulative, cost: Number(cost.toFixed(4)), runCost: Number(runCost.toFixed(4)), agentTurns: result?.num_turns ?? null, minutes: Math.round((Date.now() - t0) / 600) / 100, said: String(result?.result ?? "").slice(0, 2000) });
  return ok;
}
async function turnWithResume(prompt, label, wave) {
  let ok = await turn(prompt, label, wave);
  for (let r = 0; !ok && r < RESUMES && left() > 0 && runCost < MAX_COST; r++) ok = await turn(session ? "You were interrupted. Continue the task where you left off, and say when you are done." : prompt, `${label} resume`, wave);
  return ok;
}
const capped = () => (left() <= 0 ? `wall clock: ${MAX_MIN} min` : runCost >= MAX_COST ? `cost cap: $${MAX_COST} ($${runCost.toFixed(2)})` : null);
const scoreRun = (wave, round) => {
  const results = nextResults(P, "V", wave), gate = n(wave) === 6 ? lastResults(P, "V", "W5") : null;
  let h = hidden(P, wave, DIR, { results, gate, ...(DRY ? { reps: 1 } : {}) });
  for (let k = 0; h.error && k < 2; k++) { note({ event: "hidden-error", wave, round, try: k + 1, error: h.error }); h = hidden(P, wave, DIR, { results, gate }); }
  const head = git("rev-parse", "HEAD").stdout.trim() || null;
  note({ event: "hidden", wave, round, head, ...(h.error ? { error: h.error } : { pass: h.pass, total: h.total, rate: h.rate, byWave: h.byWave, categories: h.categories, failing: h.failing, feedback: h.feedback, gate: h.gate, w6: h.w6, failStages: h.failStages, cheat: h.cheat, results, seconds: h.seconds }) });
  return h;
};

note({ event: "start", dir: DIR, waves: RUN_WAVES, model: MODEL, effort: EFF, autocompact: "the CLI default (no override)", sandbox: "sandbox.mjs box V", envNames: boxEnvNames(P, "V"), tools: TOOLS, settingSources: [], maxTurns: MAX_TURNS, turnMin: TURN_MIN, maxRounds: ROUNDS, caps: { maxMin: MAX_MIN, maxCost: MAX_COST }, dry: DRY, resumeOf: session });
for (const w of RUN_WAVES) {
  const why0 = capped(); if (why0) { note({ event: "stop", wave: w, why: why0 }); break; }
  const tw = Date.now(), rel = release(P, w, DIR); chownArm("V", DIR);
  git("add", "--", ...new Set(rel.files.map((f) => f.split("/")[0]))); git("commit", "-q", "-m", `orderer: release ${w}`, "--", ...new Set(rel.files.map((f) => f.split("/")[0])));
  note({ event: "release", wave: w, files: rel.files.length, sha: rel.sha });
  let prompt = turns === 0 && w === "W1" ? firstPrompt(w) : wavePrompt(w), h = null, first = null, stop = null;
  for (let round = 0; round <= ROUNDS; round++) {
    const ok = await turnWithResume(prompt, round ? `feedback ${round}` : "release", w);
    if (!ok && !session) { stop = "the session never started"; break; }
    h = scoreRun(w, round);
    if (h.error) { stop = "the hidden runner failed three times: an operator error, no round spent"; break; }
    first ??= h;
    if (!h.anyFail) break;
    stop = capped(); if (stop) break;
    if (round === ROUNDS) break;
    prompt = feedbackPrompt(h.feedback);
  }
  const sum = (x) => (!x || x.error ? null : { pass: x.pass, total: x.total, rate: x.rate, byWave: x.byWave, failing: x.failing, w6: x.w6?.score ?? null, gate: x.gate ?? null });
  note({ event: "wave-summary", wave: w, session, minutes: Math.round((Date.now() - tw) / 600) / 100, first: sum(first), final: sum(h), runCost: Number(runCost.toFixed(4)), stop });
  if (stop && stop !== "the session never started" && capped()) { note({ event: "stop", wave: w, why: stop }); break; }
  if (stop === "the session never started" || (h?.error)) break;
}
try { egress?.kill(); } catch {}
process.exit(0);
