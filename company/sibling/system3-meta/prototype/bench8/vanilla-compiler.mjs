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
//        [--max-cost=120] [--turn-min=120] [--max-turns=500] [--max-rounds=3] [--resume] [--dry-run [--fake=<dir>]]
//   --dry-run starts no session: it prints the prompts and settings, checks the hook on fixed calls, and with
//   --fake=<compiler dir> plays the agent itself (turn 1 copies that compiler in, each later turn touches its backend)
//   so the release, hidden-run, feedback and ledger path runs for real, into --runs (default: a fresh scratch dir).
// Pilot fixes (2026-10-23): the CLI runs in V's box (sandbox.mjs: its own uid, mount/pid/net namespaces, no C compiler,
// the model API as the only egress, an allowlisted env), started by the SDK's spawnClaudeCodeProcess; the effort is the
// SDK option (EFFORT, the same as S's launcher --effort); a preflight session checks the box first (--no-preflight
// skips it).
// --resume (PROTOCOL.md "Restarts", 2026-10-23: the container is reclaimed without warning): continue from the ledger
// after the machine restarted: the same SDK session (resumed, with a short "You were interrupted (the machine
// restarted). Continue where you left off." turn when a turn was cut), the current wave and round, the cost so far, and
// the active clock (_operator/V/clock.json: the time between the death and the resume is downtime, recorded in the
// `resume` line, never counted against the caps). A session the SDK cannot resume is replaced by a new one given the
// wave's doc and a note (`session-lost`). A finished run exits 0 at once; a V already running on these runs refuses
// (arm.pid, checked against /proc). keepalive.mjs restarts V with --resume. --resume-check: one real tiny session pair
// (a preflight, then the restart turn on its id) to show the resume works (< $0.05). Dry runs: --fake-sec=<s> makes
// each fake turn take s seconds, --fake-lose-session makes the first resume of a process fail as a gone session does.
// --isolation=hooks|box (default hooks, PROTOCOL.md "Isolation deviation", 2026-10-23): hooks runs V's session without
// the box, as Benchmarks 6/7 ran (the SDK starts the CLI as usual, with this process's env minus the launcher's and
// the context variables, sandbox.mjs hooksEnv); the access rule as the PreToolUse hook and canUseTool, the shims and
// the audit enforce what the box did. box keeps the CLI in V's box.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { paths, WAVES, MAX_ROUNDS, RUN_MIN, RUN_COST, EFFORT, release, ensureToolchain, installShims, hidden, nextResults, lastResults, append, readJsonl, selftest, chownArm, preflight, vOptions, vStatus, AUTH_HINT } from "./setup.mjs";
import { armClock, procAlive, readPid, writePid, killLeftovers } from "./restart.mjs";
import { prepareArm, startEgress, armEnvNames, boxArgv, isolationOf } from "./sandbox.mjs";

const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const ISO = (process.env.B8_ISOLATION = isolationOf(opt)), HOOKS = ISO === "hooks";
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
  console.log(JSON.stringify({ dry: true, isolation: ISO, dir: DIR, waves: RUN_WAVES, model: MODEL, effort: EFF, envNames: armEnvNames(P, "V"), ...(HOOKS ? {} : { box: boxArgv(P, "V", DIR, ["<claude>"])[1].slice(0, 7) }), tools: TOOLS, settingSources: [], maxTurns: MAX_TURNS, turnMin: TURN_MIN, maxRounds: ROUNDS, caps: { maxMin: MAX_MIN, maxCost: MAX_COST }, ledger: P.vledger, access: P.access, shims: P.shim("V"), hookSelftest: { cases: st.cases.length, failed: st.failed } }, null, 1));
  process.exit(st.failed.length ? 1 : 0);
}

if (opt["resume-check"]) {
  // one real tiny check (PROTOCOL.md "Restarts"): a one-turn preflight session started as V's are, then the restart
  // turn --resume sends, on that session's id (tools [], one turn; well under $0.05). It must come back in the same
  // session and remember the first turn.
  const { prepareArm: prep } = await import("./sandbox.mjs");
  const pf = await preflight(P, "V", { model: MODEL, effort: EFF });
  if (!pf.ok) { console.log(JSON.stringify({ ok: false, why: `preflight: ${pf.why}`, preflight: pf })); process.exit(1); }
  const q = (await import(pathToFileURL(path.join(P.proto, "launcher", "node_modules", "@anthropic-ai", "claude-agent-sdk", "sdk.mjs")).href)).query;
  const ac = new AbortController(), t = setTimeout(() => ac.abort(new Error("resume check over 3 min")), 180_000);
  let sid = null, result = null, error = null; const t0 = Date.now();
  try {
    const options = await vOptions(P, { cwd: prep(P, "V").tmp, model: MODEL, effort: EFF, abortController: ac, tools: [], maxTurns: 1, sid: () => sid ?? pf.sid, resume: pf.sid });
    for await (const m of q({ prompt: "You were interrupted (the machine restarted). Continue where you left off. (A harness check: reply with only the single word you replied in your previous turn.)", options })) { if (typeof m.session_id === "string" && m.session_id) sid ??= m.session_id; if (m.type === "result") result = m; }
  } catch (e) { error = e?.message ?? String(e); }
  clearTimeout(t);
  const cost = Object.values(result?.modelUsage ?? {}).reduce((a, u) => a + (u.costUSD ?? 0), 0);
  const out = { ok: !error && !!result && !result.is_error && sid === pf.sid && /ready/i.test(String(result?.result ?? "")), preflight: { sid: pf.sid, said: pf.said, cost: pf.cost }, resumed: { sid, sameSession: sid === pf.sid, said: String(result?.result ?? "").slice(0, 80), cost: Number(cost.toFixed(4)), totalCostUsd: result?.total_cost_usd ?? null, seconds: Math.round((Date.now() - t0) / 1000), error }, totalCost: Number((pf.cost + cost).toFixed(4)) };
  append(path.join(P.op, "V", "resume-check.jsonl"), out); console.log(JSON.stringify(out, null, 1)); process.exit(out.ok ? 0 : 1);
}

// ---------------------------------------------------------------- restart safety (PROTOCOL.md "Restarts", 2026-10-23)
// The ledger is the arm's memory. Every turn is announced (`turn-start`) before it runs, the session id is written as
// soon as the SDK reports it (`session`), and the active clock beats to _operator/V/clock.json: so a process killed
// with the machine leaves enough on disk for `--resume` to continue the same session, wave and round, with the caps
// counting only the time the arm worked (the gap between the last beat and the resume is recorded as downtime).
const RESUME = !!opt.resume;
const prev = readJsonl(P.vledger);
const status = vStatus(prev, RUN_WAVES);
if (RESUME && status.finished) { console.log(JSON.stringify({ event: "resume", finished: true, why: status.why })); process.exit(0); }
const PIDF = path.join(P.op, "V", "arm.pid");
{ const o = readPid(PIDF); if (o && o.pid !== process.pid && procAlive(o.pid, { match: ["vanilla-compiler.mjs"], boot: o.boot })) { console.error(`refused: V is already running on ${P.runs} (pid ${o.pid}); one V at a time`); process.exit(3); } }
if (!(RESUME && status.started) && fs.existsSync(DIR) && fs.readdirSync(DIR).length && RUN_WAVES[0] === "W1") { console.error(`refused: ${DIR} exists (V starts in a fresh directory; --resume continues a run)`); process.exit(2); }
writePid(PIDF, { arm: "V", runs: P.runs }); process.on("exit", () => { try { if (readPid(PIDF)?.pid === process.pid) fs.rmSync(PIDF, { force: true }); } catch {} });
// what the dead run left: its agent CLI (cwd in V's folder) and its hidden runner (on V's folder) would keep working
const leftovers = status.started ? killLeftovers({ dirs: [DIR], names: [["run-hidden.mjs", `--dir=${DIR}`]] }) : [];
const note = (x) => { append(P.vledger, x); console.log(JSON.stringify(x)); };
ensureToolchain(P); installShims(P, "V"); prepareArm(P, "V");
if (!DRY && !opt["no-preflight"] && !fs.existsSync(P.vledger)) {
  const pf = await preflight(P, "V", { model: MODEL, effort: EFF });
  append(P.vledger, { event: "preflight", ...pf }); console.log(JSON.stringify({ event: "preflight", ...pf }));
  if (!pf.ok) { console.error(`V preflight failed (${pf.why}): no session could start ${HOOKS ? "with V's env and hooks" : `in V's box. ${AUTH_HINT}`}`); process.exit(2); }
}
const egress = DRY || HOOKS ? null : startEgress(P, "V");
fs.mkdirSync(DIR, { recursive: true });
// the orderer's git runs as root in V's folder (V's uid owns it): safe.directory, and the folder goes back to V's uid
const git = (...a) => { const r = spawnSync("git", ["-c", "safe.directory=*", "-C", DIR, ...a], { encoding: "utf8" }); chownArm("V", DIR); return r; };
if (!fs.existsSync(path.join(DIR, ".git"))) { git("init", "-q", "-b", "main"); git("config", "user.email", "vanilla@b8.invalid"); git("config", "user.name", "B8 V"); }
// a stale index lock from a git killed mid-command would stop every commit
if (status.started) for (const f of [path.join(DIR, ".git", "index.lock")]) if (fs.existsSync(f)) { fs.rmSync(f, { force: true }); }
// the session: the last one the ledger names; a run from before turn-start/session events (or killed before its first
// turn ended) left it only in the access log (the hook logs each call with its session id)
const preflightSid = prev.find((x) => x.event === "preflight")?.sid ?? null;
let session = prev.findLast((x) => x.session && (x.event === "turn" || x.event === "session"))?.session ?? null, sessionFrom = session ? "ledger" : null;
if (!session && status.started) { const a = readJsonl(P.access).findLast((x) => x.arm === "V" && x.sid && x.sid !== preflightSid); if (a) { session = a.sid; sessionFrom = "access log"; } }
// the clock starts after the preflight (the caps never counted it); legacy ledgers: the waves' minutes so far
const clock = armClock(path.join(P.op, "V", "clock.json"));
const legacyMs = !clock.prev ? prev.filter((x) => x.event === "wave-summary").reduce((a, x) => a + (x.minutes ?? 0), 0) * 60_000 : 0;
const activeMs = () => clock.activeMs() + legacyMs;
const left = () => MAX_MIN * 60_000 - activeMs();
const query = DRY ? null : (await import(pathToFileURL(path.join(P.proto, "launcher", "node_modules", "@anthropic-ai", "claude-agent-sdk", "sdk.mjs")).href)).query;
const { warmFallback } = await import(pathToFileURL(path.join(P.proto, "launcher", "guard.mjs")).href);
// cost: the SDK's figure for each session, counted once; a session's later turns report its running total
let runCost = prev.findLast((x) => x.event === "turn")?.runCost ?? 0;
let costSession = prev.findLast((x) => x.event === "turn")?.session ?? null, costBase = prev.findLast((x) => x.event === "turn")?.costBase ?? 0;

const FAKE_SEC = Number(opt["fake-sec"] ?? 0);
let fakeLost = !opt["fake-lose-session"];
async function fakeAgent(prompt, resume, onSession = () => {}) {
  // --dry-run --fake: the harness plays the agent (no session): the first turn brings the compiler, each later turn
  // edits it. --fake-sec=<s> makes each turn take that long (to kill one mid-turn); --fake-lose-session makes the first
  // resume of this process fail as a gone session does (no assistant message, an error)
  if (resume && !fakeLost) { fakeLost = true; return { session: resume, result: null, error: `No conversation found with session ID: ${resume} (fake)`, saw: false }; }
  const sid = resume ?? `fake-${Date.now().toString(36)}`;
  onSession(sid); // as the SDK's first message does, before the work
  if (FAKE_SEC) await new Promise((r) => setTimeout(r, FAKE_SEC * 1000));
  if (!fs.existsSync(path.join(DIR, "src"))) { for (const d of ["src", "docs"]) if (fs.existsSync(path.join(FAKE, d))) fs.cpSync(path.join(FAKE, d), path.join(DIR, d), { recursive: true }); }
  else { const f = path.join(DIR, "src", "ccc", "backend", "x86.clj"); if (fs.existsSync(f)) fs.appendFileSync(f, `\n;; fake turn ${turns}\n`); }
  git("add", "-A"); git("commit", "-q", "-m", `fake agent turn ${turns}`); chownArm("V", DIR);
  return { session: sid, saw: true, result: { result: `done (fake agent${/interrupted/.test(prompt) ? ", after the restart" : ""})`, is_error: false, num_turns: 1, modelUsage: { fake: { inputTokens: 100, outputTokens: 10, cacheReadInputTokens: 0, cacheCreationInputTokens: 0, costUSD: 0.01 * turns } } } };
}
let turns = prev.filter((x) => x.event === "turn").length;
/** One turn: `prompt` to the session (resumed when there is one). When the resume itself fails (the session is gone:
 *  no assistant message, an error), a fresh session gets `fresh` (the wave's doc and a note), recorded. */
async function turn(prompt, label, wave, round, { fresh = null } = {}) {
  turns++;
  const ms = Math.max(1000, Math.min(TURN_MIN * 60_000, left()));
  const t0 = Date.now(); let result = null, error = null, saw = false;
  note({ event: "turn-start", wave, round, n: turns, label, session, activeMin: Math.round(activeMs() / 600) / 100 });
  for (let attempt = 0; ; attempt++) {
    const resume = session;
    result = null; error = null; saw = false;
    if (DRY) { const f = await fakeAgent(prompt, resume, (sid) => { if (sid !== session) { session = sid; note({ event: "session", session, wave, round, n: turns }); } }); result = f.result; error = f.error ?? null; saw = f.saw; }
    else {
      const ac = new AbortController(), limit = setTimeout(() => ac.abort(new Error(ms < TURN_MIN * 60_000 ? `run over ${MAX_MIN} min` : `turn over ${TURN_MIN} min`)), ms);
      try {
        // the six tools, settingSources [], the access rule as the PreToolUse hook and canUseTool; box mode: the CLI in V's box
        const options = await vOptions(P, { cwd: DIR, model: MODEL, effort: EFF, abortController: ac, tools: TOOLS, maxTurns: MAX_TURNS, sid: () => session, resume, stderrLog: path.join(P.op, "V", "cli-stderr.log") });
        for await (const m of query({ prompt, options })) {
          if (typeof m.session_id === "string" && m.session_id && m.session_id !== session) { session = m.session_id; note({ event: "session", session, wave, round, n: turns, ...(resume ? { resumeOf: resume } : {}) }); }
          if (m.type === "assistant") saw = true;
          if (m.type === "result") result = m;
        }
      } catch (e) { error = e?.message ?? String(e); }
      clearTimeout(limit);
      if (attempt === 0 && warmFallback({ resumed: !!resume, error, result, sawAssistant: saw, aborted: ac.signal.aborted }) && fresh) {
        note({ event: "session-lost", wave, round, n: turns, session: resume, why: String(error ?? result?.subtype ?? "no result").slice(0, 300), next: "a new session with the wave's doc and a note" });
        session = null; prompt = fresh; continue;
      }
      break;
    }
    if (attempt === 0 && resume && !saw && error && fresh) { note({ event: "session-lost", wave, round, n: turns, session: resume, why: String(error).slice(0, 300), next: "a new session with the wave's doc and a note" }); session = null; prompt = fresh; continue; }
    break;
  }
  const mu = Object.values(result?.modelUsage ?? {});
  const cumulative = mu.reduce((a, u) => a + u.inputTokens + u.outputTokens + u.cacheReadInputTokens + u.cacheCreationInputTokens, 0);
  const cost = mu.reduce((a, u) => a + (u.costUSD ?? 0), 0);
  const ok = !error && !!result && !result.is_error;
  if (result) {
    // a session's result carries its running total (a resumed one too); a new session (or a total that went down: a
    // CLI that did not restore it) adds on
    if (session !== costSession || cost < runCost - costBase) { costBase = runCost; costSession = session; }
    runCost = costBase + cost;
  }
  note({ event: "turn", wave, round, n: turns, label, session, ok, reason: ok ? null : (error ?? result?.subtype ?? "no result"), cumulative, cost: Number(cost.toFixed(4)), runCost: Number(runCost.toFixed(4)), costBase: Number(costBase.toFixed(4)), agentTurns: result?.num_turns ?? null, minutes: Math.round((Date.now() - t0) / 600) / 100, said: String(result?.result ?? "").slice(0, 2000) });
  return ok;
}
const RESTART_NOTE = "You were interrupted (the machine restarted). Continue where you left off.";
const lostPrompt = (w, round, fb) => `The machine restarted, and your earlier conversation could not be restored: this is a new session. Your work in ${DIR} is as you left it (read it, and its git log, before you continue).\n\n${firstPrompt(w)}${round > 0 && fb?.length ? `\n\n${feedbackPrompt(fb)}` : ""}`;
async function turnWithResume(prompt, label, wave, round, { fresh, failed = 0 } = {}) {
  let ok = await turn(prompt, label, wave, round, { fresh });
  for (let r = failed; !ok && r < RESUMES && left() > 0 && runCost < MAX_COST; r++) ok = await turn(session ? "You were interrupted. Continue the task where you left off, and say when you are done." : prompt, `${label} resume`, wave, round, { fresh });
  return ok;
}
const capped = () => (left() <= 0 ? `wall clock: ${MAX_MIN} min` : runCost >= MAX_COST ? `cost cap: $${MAX_COST} ($${runCost.toFixed(2)})` : null);
const scoreRun = (wave, round) => {
  const results = nextResults(P, "V", wave), gate = n(wave) === 6 ? lastResults(P, "V", "W5") : null;
  let h = hidden(P, wave, DIR, { results, gate, ...(DRY ? { reps: 1 } : {}) });
  for (let k = 0; h.error && k < 2; k++) { note({ event: "hidden-error", wave, round, try: k + 1, error: h.error }); h = hidden(P, wave, DIR, { results, gate }); }
  const head = git("rev-parse", "HEAD").stdout.trim() || null;
  note({ event: "hidden", wave, round, head, ...(h.error ? { error: h.error } : { pass: h.pass, total: h.total, rate: h.rate, byWave: h.byWave, categories: h.categories, failing: h.failing, feedback: h.feedback, anyFail: h.anyFail, gate: h.gate, w6: h.w6, failStages: h.failStages, cheat: h.cheat, results, seconds: h.seconds }) });
  return h;
};
// a hidden run from the ledger, in the shape scoreRun returns (anyFail: older lines lack it, their feedback says it)
const fromLedger = (x) => ({ ...x, anyFail: x.anyFail ?? !!x.feedback?.length });

/** Where a wave stands in the ledger: not released; or released, with its scored rounds and what the next round needs
 *  (`send` its prompt, `interrupted`: a turn started and never ended, `score`: the round's turn ended, not scored). */
function wavePoint(w) {
  const rows = prev.filter((x) => x.wave === w);
  if (!rows.some((x) => x.event === "release")) return { released: false };
  const hs = rows.filter((x) => x.event === "hidden" && !x.error).map(fromLedger);
  const round = hs.length, since = rows.slice(rows.findLastIndex((x) => (x.event === "hidden" && !x.error) || x.event === "release") + 1);
  const ts = since.filter((x) => x.event === "turn-start"), te = since.filter((x) => x.event === "turn");
  const releaseT = Date.parse(rows.find((x) => x.event === "release").t);
  let next = "send";
  if (ts.length > te.length) next = "interrupted";
  else if (te.length) next = te.at(-1).ok || te.filter((x) => !x.ok).length > RESUMES ? "score" : "retry";
  // a ledger from before turn-start lines: a session the access log saw after the release took the prompt
  else if (!ts.length && sessionFrom === "access log" && readJsonl(P.access).some((x) => x.arm === "V" && x.sid === session && Date.parse(x.t) > releaseT)) next = "interrupted";
  return { released: true, hs, round, next, failed: te.filter((x) => !x.ok).length };
}

const doneWaves = new Set(prev.filter((x) => x.event === "wave-summary").map((x) => x.wave));
const current = RUN_WAVES.find((w) => !doneWaves.has(w)) ?? null;
const at = status.started && current ? wavePoint(current) : null;
note({ event: status.started && RESUME ? "resume" : "start", dir: DIR, waves: RUN_WAVES, model: MODEL, effort: EFF, autocompact: "the CLI default (no override)", isolation: ISO, sandbox: HOOKS ? "none: --isolation=hooks (the access hook and canUseTool, the PATH shims, the audit; PROTOCOL.md Isolation deviation)" : "sandbox.mjs box V", envNames: armEnvNames(P, "V"), tools: TOOLS, settingSources: [], maxTurns: MAX_TURNS, turnMin: TURN_MIN, maxRounds: ROUNDS, caps: { maxMin: MAX_MIN, maxCost: MAX_COST }, dry: DRY, resumeOf: session,
  ...(status.started && RESUME ? { downMin: Math.round(clock.downMs / 600) / 100, activeMin: Math.round(activeMs() / 600) / 100, runCost: Number(runCost.toFixed(4)), wave: current, round: at?.round ?? null, point: at?.released ? at.next : "release", session, sessionFrom, leftovers: leftovers.map((x) => x.argv.slice(0, 120)), lastBeat: clock.prev?.t ?? null } : {}) });
let endWhy = "every wave ran";
for (const w of RUN_WAVES) {
  if (doneWaves.has(w)) continue;
  const why0 = capped(); if (why0) { note({ event: "stop", wave: w, why: why0 }); endWhy = why0; break; }
  const pt = w === current && at ? at : { released: false };
  const tw = Date.now(), aw = activeMs();
  let waveStartActive = aw;
  if (!pt.released) {
    const rel = release(P, w, DIR); chownArm("V", DIR);
    git("add", "--", ...new Set(rel.files.map((f) => f.split("/")[0]))); git("commit", "-q", "-m", `orderer: release ${w}`, "--", ...new Set(rel.files.map((f) => f.split("/")[0])));
    note({ event: "release", wave: w, files: rel.files.length, sha: rel.sha, activeMin: Math.round(aw / 600) / 100 });
  } else { const r = prev.find((x) => x.event === "release" && x.wave === w); if (r?.activeMin != null) waveStartActive = r.activeMin * 60_000; else waveStartActive = aw - (Date.parse(clock.prev?.t ?? new Date().toISOString()) - Date.parse(r.t)); }
  const hs0 = pt.released ? pt.hs : [];
  let h = hs0.at(-1) ?? null, first = hs0[0] ?? null, stop = null;
  const promptFor = (round) => (round === 0 ? (w === RUN_WAVES[0] && w === "W1" ? firstPrompt(w) : wavePrompt(w)) : feedbackPrompt(hs0[round - 1]?.feedback ?? h?.feedback ?? []));
  let round = pt.released ? pt.round : 0, mode = pt.released ? pt.next : "send";
  // the round the dead run was in may already be the wave's end
  if (h && (!h.anyFail || round - 1 >= ROUNDS)) mode = "summary";
  for (; mode !== "summary" && round <= ROUNDS; round++) {
    const label = round ? `feedback ${round}` : "release", fb = h?.feedback ?? [];
    let ok = true;
    if (mode === "interrupted") ok = await turnWithResume(session ? RESTART_NOTE : promptFor(round), `${label} restart`, w, round, { fresh: lostPrompt(w, round, fb) });
    else if (mode === "retry") ok = await turnWithResume(session ? "You were interrupted. Continue the task where you left off, and say when you are done." : promptFor(round), `${label} resume`, w, round, { fresh: lostPrompt(w, round, fb), failed: pt.failed });
    else if (mode === "send") ok = await turnWithResume(promptFor(round), label, w, round, { fresh: lostPrompt(w, round, fb) });
    mode = "send";
    if (!ok && !session) { stop = "the session never started"; break; }
    h = scoreRun(w, round);
    if (h.error) { stop = "the hidden runner failed three times: an operator error, no round spent"; break; }
    first ??= h;
    if (!h.anyFail) break;
    stop = capped(); if (stop) break;
    if (round === ROUNDS) break;
    hs0[round] = h;
  }
  const sum = (x) => (!x || x.error ? null : { pass: x.pass, total: x.total, rate: x.rate, byWave: x.byWave, failing: x.failing, w6: x.w6?.score ?? null, gate: x.gate ?? null });
  note({ event: "wave-summary", wave: w, session, minutes: Math.round((activeMs() - waveStartActive) / 600) / 100, wallMinutes: Math.round((Date.now() - tw) / 600) / 100, first: sum(first), final: sum(h), runCost: Number(runCost.toFixed(4)), stop });
  if (stop && stop !== "the session never started" && capped()) { note({ event: "stop", wave: w, why: stop }); endWhy = stop; break; }
  if (stop === "the session never started" || (h?.error)) { endWhy = stop; break; }
}
clock.stop();
note({ event: "end", why: endWhy, activeMin: Math.round(activeMs() / 600) / 100, runCost: Number(runCost.toFixed(4)) });
try { egress?.kill(); } catch {}
process.exit(0);
