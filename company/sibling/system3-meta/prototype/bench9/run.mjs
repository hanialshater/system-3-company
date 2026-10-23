#!/usr/bin/env node
// Benchmark 9 harness (PROTOCOL.md): make the B8 compiler compile fast. Arms V (one session) and P (a population run
// by code); S (the org) is a separate driver. Each arm, and each of P's variants, works in its own runs root laid out
// as B8's V arm (<root>/V the compiler, its own git repo; <root>/toolchain read-only: clj-run and the fast judge;
// <root>/_operator its logs), so B8's access rule, PreToolUse hook, canUseTool and PATH shims apply unchanged
// (bench8/setup.mjs paths/vOptions/installShims), with --isolation=hooks as B8 ran.
//   node run.mjs setup [--baseline]   the start (B8 V at START), the judge install, the corpus lists; --baseline also
//                                     computes the start's visible pass set (a few CPU minutes)
//   node run.mjs v [--resume]         arm V: one session, up to 3 full-judge rounds, caps $70 / 240 active min
//   node run.mjs p [--resume]         arm P: generations of 4 variant sessions, code selection, caps as V
//   node run.mjs s [--resume]         arm S: Meta on bench8/setup.mjs as arm S9 (bench9/s9.mjs), caps as V
//   node run.mjs full --dir=<compiler> [--reps=5]   the full judge on one tree (under the judge lock)
//   node run.mjs final                the quiet final scoring: every arm's final candidate, one after another
//   node run.mjs status
//   any arm: --fake plays the agent (a trivial commit, $0), so the plumbing runs with no SDK session
import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SCRATCH = "/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad";
const cmd = process.argv[2];
const opt = Object.fromEntries(process.argv.slice(3).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
process.env.B8_ISOLATION ??= "hooks";
const S8 = await import(pathToFileURL(path.join(HERE, "..", "bench8", "setup.mjs")).href);
const B8 = path.resolve(opt.b8 ?? path.join(SCRATCH, "b8")), B8RUNS = path.resolve(opt.b8runs ?? path.join(SCRATCH, "b8-runs"));
const B9 = path.resolve(opt.runs ?? path.join(SCRATCH, "b9-runs"));
export const START = "5a10774", CAP_COST = Number(opt["max-cost"] ?? 70), CAP_MIN = Number(opt["max-min"] ?? 240), ROUNDS = Number(opt.rounds ?? 3);
// dry runs only: fewer timing repetitions in the full judge (B9_JUDGE_REPS reaches S9's accept too)
const JREPS = Number(opt["judge-reps"] ?? process.env.B9_JUDGE_REPS ?? 5); if (opt["judge-reps"]) process.env.B9_JUDGE_REPS = String(JREPS);
const FAKE = !!opt.fake;
const git = (cwd, ...a) => spawnSync("git", ["-c", "safe.directory=*", "-C", cwd, ...a], { encoding: "utf8" });
const gitOk = (cwd, ...a) => { const r = git(cwd, ...a); if (r.status !== 0) throw new Error(`git ${a.join(" ")}: ${r.stderr || r.stdout}`); return r.stdout.trim(); };
const J = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
const log = (f, x) => S8.append(f, x);
const launcherSrc = fs.readFileSync(path.join(HERE, "..", "launcher", "launch.mjs"), "utf8");
const MODEL = opt.model ?? (launcherSrc.match(/const MODEL = opt\.model \?\? "([^"]+)"/) ?? [])[1];
const startDir = path.join(B9, "start"), judgeDir = path.join(B9, "judge"), ledgerOf = (arm) => path.join(B9, "_operator", arm, "ledger.jsonl");

// ---------------------------------------------------------------- setup
function setup() {
  fs.mkdirSync(B9, { recursive: true });
  if (!fs.existsSync(startDir)) { gitOk(B9, "clone", "-q", "--no-hardlinks", path.join(B8RUNS, "V"), startDir); gitOk(startDir, "checkout", "-q", "-B", "main", START); gitOk(startDir, "remote", "remove", "origin"); }
  if (gitOk(startDir, "rev-parse", "--short=7", "HEAD") !== START) throw new Error(`start is not at ${START}`);
  fs.mkdirSync(judgeDir, { recursive: true });
  for (const f of ["judge.mjs", "timing.mjs"]) fs.copyFileSync(path.join(HERE, f), path.join(judgeDir, f));
  fs.copyFileSync(path.join(HERE, "..", "bench8", "visible-check.mjs"), path.join(judgeDir, "visible-check.mjs"));
  // the start's last hidden W7 run in B8 (its final), and its runtime score and peak RSS from V's ledger
  const vl = S8.readJsonl(path.join(B8RUNS, "_operator", "V", "vanilla.jsonl")).filter((x) => x.event === "hidden" && x.wave === "W7" && x.w7);
  const last = vl.at(-1); if (!last) throw new Error("no W7 hidden run in B8 V's ledger");
  const hid = path.join(B8RUNS, "_operator", "V", "hidden"), startResults = fs.readdirSync(hid).filter((f) => /^W7-\d+\.json$/.test(f)).sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0])).map((f) => path.join(hid, f)).at(-1);
  const visibleCorpus = ["W1", "W2", "W3", "W4", "W5"].flatMap((w) => { const d = path.join(startDir, "visible", w); return fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith(".c")).sort().map((f) => path.join(d, f)) : []; });
  const cfg = { b8: B8, start: startDir, clj: path.join(B8RUNS, "toolchain", "clj-run"), startResults, startVisible: path.join(judgeDir, "start-visible.json"), startW7: { runtime: last.w7.bench.score, rssMB: last.w7.compile.rssMB, compileSec: last.w7.compile.seconds }, visibleCorpus };
  fs.writeFileSync(path.join(judgeDir, "judge.json"), JSON.stringify(cfg, null, 1));
  if (opt.baseline) {
    const tmpb = path.join(judgeDir, "start-visible.json"); fs.rmSync(tmpb, { force: true });
    const r = spawnSync(process.execPath, [path.join(judgeDir, "visible-check.mjs"), "--wave=W7", `--dir=${startDir}`, `--clj=${cfg.clj}`, `--baseline=${tmpb}`], { encoding: "utf8", timeout: 3600_000 });
    if (r.status !== 0 || !fs.existsSync(tmpb)) throw new Error(`the start's visible check: exit ${r.status} ${String(r.stdout).slice(-600)}`);
  }
  return { start: START, startResults, startW7: cfg.startW7, visibleCorpus: visibleCorpus.length, baseline: fs.existsSync(cfg.startVisible) };
}

// ---------------------------------------------------------------- one arm root (B8's V layout)
/** A runs root for one arm or variant: <root>/V a clone of `from` (a repo dir) at `rev`, <root>/toolchain the clj-run
 *  toolchain plus the fast judge, the shims. Returns B8's paths object for it. */
function makeRoot(id, from, rev = "HEAD") {
  const root = path.join(B9, "arms", id), P = S8.paths({ runs: root, b8: B8 });
  if (!fs.existsSync(P.V)) { fs.mkdirSync(root, { recursive: true }); gitOk(root, "clone", "-q", "--no-hardlinks", from, P.V); gitOk(P.V, "checkout", "-q", "-B", "main", rev); git(P.V, "remote", "remove", "origin"); }
  if (!fs.existsSync(P.toolchain)) {
    fs.cpSync(path.join(B8RUNS, "toolchain"), P.toolchain, { recursive: true });
    fs.cpSync(judgeDir, path.join(P.toolchain, "judge"), { recursive: true });
    const cfg = J(path.join(P.toolchain, "judge", "judge.json")); cfg.clj = P.clj; fs.writeFileSync(path.join(P.toolchain, "judge", "judge.json"), JSON.stringify(cfg, null, 1));
  }
  S8.installShims(P, "V");
  return P;
}
const fastCmd = (P) => `node ${path.join(P.toolchain, "judge", "judge.mjs")} fast --dir=${P.V}`;

// ---------------------------------------------------------------- the judge lock (one judge run at a time)
async function withJudgeLock(fn) {
  const lock = path.join(B9, "judge.lock");
  for (;;) { try { fs.mkdirSync(lock); fs.writeFileSync(path.join(lock, "pid"), String(process.pid)); break; } catch { let pid = null; try { pid = Number(fs.readFileSync(path.join(lock, "pid"), "utf8")); } catch {} let alive = false; try { process.kill(pid, 0); alive = true; } catch {} if (!alive) { fs.rmSync(lock, { recursive: true, force: true }); continue; } await new Promise((r) => setTimeout(r, 3000)); } }
  try { return await fn(); } finally { fs.rmSync(lock, { recursive: true, force: true }); }
}
const runNode = (args, timeout) => new Promise((resolve) => { const ch = spawn(process.execPath, args, { stdio: ["ignore", "pipe", "pipe"] }); let out = "", err = ""; const t = setTimeout(() => ch.kill("SIGKILL"), timeout); ch.stdout.on("data", (d) => (out += d)); ch.stderr.on("data", (d) => (err += d)); ch.on("close", (code) => { clearTimeout(t); resolve({ code, out, err }); }); });
const lastJson = (s) => { for (const l of String(s ?? "").trim().split("\n").reverse()) { try { return JSON.parse(l); } catch {} } return null; };
/** The full judge on a tree (a fresh clone of its HEAD, so only committed work counts). */
async function full(dir, { reps = JREPS, out = null } = {}) {
  const snap = fs.mkdtempSync(path.join(B9, "snap-")); fs.rmSync(snap, { recursive: true }); gitOk(B9, "clone", "-q", "--no-hardlinks", dir, snap);
  try { return await withJudgeLock(async () => { const r = await runNode([path.join(judgeDir, "judge.mjs"), "full", `--dir=${snap}`, `--reps=${reps}`, ...(out ? [`--out=${out}`] : [])], 5 * 3600_000); const j = lastJson(r.out); return { ...j, lines: r.out.split("\n").filter((l) => /^B9 /.test(l)), code: r.code, ...(j ? {} : { error: r.err.slice(-600) }) }; }); }
  finally { fs.rmSync(snap, { recursive: true, force: true }); }
}
async function fast(P) {
  return withJudgeLock(async () => { const r = await runNode([path.join(P.toolchain, "judge", "judge.mjs"), "fast", `--dir=${P.V}`], 2 * 3600_000); const lines = r.out.split("\n").filter((l) => /^B9 /.test(l)); const m = lines.join("\n").match(/B9 fast score: ([\d.]+)/); return { ok: r.code === 0, score: m ? Number(m[1]) : null, lines }; });
}

// ---------------------------------------------------------------- sessions
/** The clock for an arm: active ms persisted every 15 s, so a restart's downtime is not counted. */
function clockFor(arm) {
  const f = path.join(B9, "_operator", arm, "clock.json"); fs.mkdirSync(path.dirname(f), { recursive: true });
  let acc = 0; try { acc = J(f).activeMs; } catch {}
  let t = Date.now();
  const tick = () => { const n = Date.now(); acc += n - t; t = n; fs.writeFileSync(f, JSON.stringify({ activeMs: acc, t: new Date().toISOString() })); };
  const iv = setInterval(tick, 15_000); iv.unref();
  return { min: () => { tick(); return acc / 60000; }, stop: () => { tick(); clearInterval(iv); } };
}
let query = null;
/** One turn of a session in root P: { sid, cost (the session's running total), ok, why }. */
async function turn(P, prompt, { resume = null, ms, label, ledger }) {
  const t0 = Date.now();
  if (FAKE) {
    fs.appendFileSync(path.join(P.V, "src", "ccc", "main.clj"), `\n;; fake turn ${label}\n`); gitOk(P.V, "add", "-A"); git(P.V, "commit", "-qm", `fake ${label}`);
    log(ledger, { event: "turn", label, sid: resume ?? `fake-${label}`, cost: 0, ok: true, min: 0 }); return { sid: resume ?? `fake-${label}`, cost: 0, ok: true };
  }
  query ??= (await import(pathToFileURL(path.join(HERE, "..", "launcher", "node_modules", "@anthropic-ai", "claude-agent-sdk", "sdk.mjs")).href)).query;
  const ac = new AbortController(), timer = setTimeout(() => ac.abort(new Error("time cap")), Math.max(5000, ms));
  let sid = resume, result = null, error = null;
  try {
    const options = await S8.vOptions(P, { cwd: P.V, model: MODEL, effort: S8.EFFORT, abortController: ac, tools: S8.TOOLS_OK, maxTurns: 500, sid: () => sid, resume, stderrLog: path.join(P.op, "V", "cli-stderr.log") });
    for await (const m of query({ prompt, options })) { if (typeof m.session_id === "string" && m.session_id) sid = m.session_id; if (m.type === "result") result = m; }
  } catch (e) { error = e?.message ?? String(e); }
  clearTimeout(timer);
  const cost = Object.values(result?.modelUsage ?? {}).reduce((a, u) => a + (u.costUSD ?? 0), 0);
  const ok = !error && !!result && !result.is_error;
  log(ledger, { event: "turn", label, sid, cost: Number(cost.toFixed(4)), ok, why: ok ? null : String(error ?? result?.subtype ?? "no result").slice(0, 300), turns: result?.num_turns ?? null, min: Math.round((Date.now() - t0) / 600) / 100 });
  return { sid, cost, ok, why: error };
}
/** Commit whatever the session left uncommitted (only committed work is judged; this keeps a cut session's work). */
const commitLeftover = (P, who) => { if (git(P.V, "status", "--porcelain").stdout.trim()) { gitOk(P.V, "add", "-A"); git(P.V, "commit", "-qm", `harness: ${who}'s uncommitted work at hand-in`); } return gitOk(P.V, "rev-parse", "HEAD"); };

const RULES = (P) => `Rules (the same for every competitor):
- The compiler runs only as \`${P.clj} -m ccc.main …\` (fixed JVM flags; the classpath is the Clojure jars and ./src). So: no native image, no JVM flags, no AOT compilation, no .class files or jars, no other launcher; src/ may hold only .clj, .cljc and .edn files.
- Nothing may survive from one compile to the next: the judge runs your committed tree from a fresh read-only copy with an empty HOME and TMPDIR.
- No special cases: do not recognise any input (Lua's file names, text or hashes, or a test's), and emit only code derived from the input. A held-out corpus you cannot see is timed too, so speed that only helps Lua does not pay.
- As before: never compile or preprocess C with gcc, clang, cpp or anything else (gcc only assembles and links); no downloads and no network.`;
const TASK = (P) => `You are given a working compiler for a subset of C, written in Clojure, that emits x86-64 GNU as, in ${P.V} (a git repository; commit your work there). It is correct: it passes its tests (spec/, visible/) and it builds the Lua 5.4.7 interpreter (spec/W7.md, spec/w7/), whose own test suite passes. **Your job is to make it compile faster without breaking anything.**

How you are scored (lower is better): the geometric mean of two ratios against the compiler as it is now, each the median of interleaved timings: (1) the wall time of one batch over Lua's 33 sources (spec/W7.md's build; it takes about 11 s now), and (2) the wall time of one batch over a held-out corpus of a thousand small C test programs like those in visible/. A candidate that breaks anything scores 1.0 (no credit): every hidden test the compiler passes now must still pass, Lua must build and pass all of its hidden test files, the generated code's runtime may not get more than 10% slower, and the compile's peak memory not more than 10% larger.

${RULES(P)}

The fast judge, as often as you like: \`${fastCmd(P)}\` (about 5 minutes: your visible tests and Lua's visible test files, then both timings against the start; timings on this machine are noisy, about ±15%, because other work runs on it).`;

// ---------------------------------------------------------------- arm V
async function armV() {
  const led = ledgerOf("V"), rows = S8.readJsonl(led);
  if (rows.some((x) => x.event === "end")) return { done: true, final: rows.find((x) => x.event === "end") };
  const P = makeRoot("V", startDir, START), clock = clockFor("V");
  let sid = rows.filter((x) => x.event === "turn" && x.sid).at(-1)?.sid ?? null;
  // a restart during the first turn: the ledger has no session yet, the access log (every tool call) has it
  const sidFromAccess = !sid ? S8.readJsonl(P.access).filter((x) => x.sid).at(-1)?.sid ?? null : null;
  if (sidFromAccess) { sid = sidFromAccess; log(led, { event: "resume-session", sid, from: "access log" }); }
  let round = rows.filter((x) => x.event === "full").length, cost = rows.filter((x) => x.event === "turn").reduce((m, x) => { m.s[x.sid] = x.cost; return m; }, { s: {} });
  const spent = () => Object.values(cost.s).reduce((a, b) => a + b, 0);
  if (!rows.length) log(led, { event: "start", arm: "V", start: START, model: MODEL, caps: { cost: CAP_COST, min: CAP_MIN }, fake: FAKE });
  const feedback = (j) => `The orderer's full judge on your commit ${j.head.slice(0, 8)}:\n${j.lines.join("\n")}\n\nYou have ${ROUNDS - round} round(s) left. Improve it (or fix what the gate says), commit, and say when you are done.`;
  const lastEv = rows.filter((x) => ["turn", "full", "turn-cut"].includes(x.event)).at(-1);
  let prompt = !lastEv && sidFromAccess ? "You were interrupted (the machine restarted). Continue where you left off, and say when you are done." : !lastEv ? `${TASK(P)}\n\nWhen you are done, commit and say so briefly: the orderer's full judge then runs on your last commit (the hidden tests, Lua's hidden test files, the runtime and memory checks, and the two timings), and sends you its lines. You have ${ROUNDS} such rounds, ${CAP_MIN} minutes and $${CAP_COST} in all.`
    : lastEv.event === "full" ? feedback(lastEv)
    : lastEv.event === "turn" && lastEv.ok ? null
    : "You were interrupted (the machine restarted). Continue where you left off, and say when you are done.";
  let last = rows.filter((x) => x.event === "full").at(-1) ?? null;
  for (;;) {
    const cap = clock.min() >= CAP_MIN ? `${CAP_MIN} min` : spent() >= CAP_COST ? `$${CAP_COST}` : null;
    if (cap || round >= ROUNDS) { const head = commitLeftover(P, "V"); clock.stop(); const fin = { event: "end", why: cap ? `cap: ${cap}` : `${ROUNDS} rounds`, head, cost: Number(spent().toFixed(4)), min: Math.round(clock.min() * 100) / 100, last: last?.score ?? null }; log(led, fin); return fin; }
    if (prompt) { const r = await turn(P, prompt, { resume: sid, ms: (CAP_MIN - clock.min()) * 60000, label: `V r${round}`, ledger: led }); sid = r.sid ?? sid; cost.s[sid] = Math.max(cost.s[sid] ?? 0, r.cost); if (!r.ok && clock.min() < CAP_MIN && spent() < CAP_COST) {
        // a session the CLI cannot resume (gone after a restart): a new one, told its work is in the tree
        if (/No conversation found|not found/i.test(String(r.why ?? ""))) { log(led, { event: "session-lost", sid }); sid = null; prompt = `The machine restarted and your earlier conversation could not be restored: this is a new session. Your work in ${P.V} is as you left it (read it and its git log first).\n\n${TASK(P)}\n\nWhen you are done, commit and say so briefly: the orderer's full judge then runs on your last commit and sends you its lines. You have ${ROUNDS - round} round(s) left.`; continue; }
        log(led, { event: "turn-cut", why: r.why }); prompt = "You were interrupted. Continue where you left off, and say when you are done."; continue; } }
    const head = commitLeftover(P, "V");
    const j = await full(P.V, { out: path.join(B9, "_operator", "V", `full-${round + 1}.json`) });
    round++; last = { score: j.score, raw: j.raw, gateOk: j.gateOk, head }; const ev = { event: "full", round, head, ...last, lines: j.lines, error: j.error ?? null }; log(led, ev);
    prompt = round < ROUNDS ? feedback(ev) : null;
  }
}

// ---------------------------------------------------------------- arm P
export const BRIEFS = [
  { id: "startup", text: "Startup and loading: what happens before the first file is compiled. Clojure compiles every namespace of src/ from source at each start: find what is slow to load (reflection, big macros, clojure.spec, eager top-level work, requires that are not needed) and remove it." },
  { id: "front", text: "The lexer and the preprocessor: how source text becomes tokens and macro expansions (strings, regexes, sequences, repeated scans, include handling). Profile them on Lua's sources and make them fast." },
  { id: "middle", text: "The parser, the type checker and the passes between them: the data structures (persistent maps vs records and transients, laziness, repeated lookups, quadratic walks). Profile them and make them fast." },
  { id: "back", text: "Code generation and output: instruction selection, register allocation, how the assembly text is built and written (string concatenation, str on seqs, many small writes). Profile them and make them fast." },
];
const VARIANT_MIN = Number(opt["variant-min"] ?? 25), VARIANT_COST = Number(opt["variant-cost"] ?? 3.5), K = 4;
async function variant(gen, k, spec, ledger) {
  const id = `g${gen}-v${k}`, parentRoot = spec.parent ? path.join(B9, "arms", spec.parent, "V") : startDir;
  const P = makeRoot(`P-${id}`, parentRoot);
  let extra = "";
  if (spec.mate) {
    const mateDir = path.join(B9, "arms", `P-${spec.mate}`, "V"), patch = spawnSync("git", ["-C", mateDir, "diff", START, "HEAD", "--", "src"], { encoding: "utf8", maxBuffer: 64 << 20 }).stdout;
    fs.mkdirSync(path.join(P.V, ".b9"), { recursive: true }); fs.writeFileSync(path.join(P.V, ".b9", "other.patch"), patch); gitOk(P.V, "add", "-A"); git(P.V, "commit", "-qm", "harness: the other parent's changes as .b9/other.patch");
    extra = `\n\nThis is a **crossover**. Your tree already holds one parent's speedups (fast score ${spec.scores[0]}). .b9/other.patch is the other parent's changes to src/ against the original compiler (fast score ${spec.scores[1]}). Bring the other parent's improvements into this tree where they still apply and do not conflict, keep what is already here, check with the fast judge, and commit. Delete .b9/ before your last commit.`;
  } else extra = `\n\nYour direction (other competitors work on other directions in parallel; stay on yours): ${spec.brief.text}${spec.parent ? `\n\nYour tree already holds earlier speedups (its fast score: ${spec.parentScore}; the best so far: ${spec.best}). Build on them.` : ""}`;
  const prompt = `${TASK(P)}${extra}\n\nYou have about ${VARIANT_MIN} minutes and one hand-in: commit your best working state as you go (your last commit is judged; uncommitted work is committed for you when the time is up). Then say briefly what you changed and what it gained.`;
  log(ledger, { event: "variant-start", id, gen, parent: spec.parent ?? "start", mate: spec.mate ?? null, brief: spec.brief?.id ?? null });
  const r = await turn(P, prompt, { ms: VARIANT_MIN * 60000, label: `P ${id}`, ledger });
  if (fs.existsSync(path.join(P.V, ".b9"))) { fs.rmSync(path.join(P.V, ".b9"), { recursive: true, force: true }); }
  const head = commitLeftover(P, id);
  return { id, gen, parent: spec.parent ?? "start", mate: spec.mate ?? null, brief: spec.brief?.id ?? (spec.mate ? "crossover" : null), lineage: [...new Set([...(spec.lineage ?? []), ...(spec.brief ? [spec.brief.id] : []), ...(spec.mateLineage ?? [])])], cost: r.cost, head, P };
}
async function armP() {
  const led = ledgerOf("P"), rows = S8.readJsonl(led);
  if (rows.some((x) => x.event === "end")) return { done: true, final: rows.find((x) => x.event === "end") };
  if (!rows.length) log(led, { event: "start", arm: "P", start: START, model: MODEL, caps: { cost: CAP_COST, min: CAP_MIN }, K, variant: { min: VARIANT_MIN, cost: VARIANT_COST }, fake: FAKE });
  const clock = clockFor("P");
  const pool = rows.filter((x) => x.event === "scored").map((x) => x.c);
  let spent = rows.filter((x) => x.event === "turn").reduce((a, x) => a + x.cost, 0), gen = rows.filter((x) => x.event === "gen-end").length, fullP = null;
  const fulls = new Map(rows.filter((x) => x.event === "full").map((x) => [x.id, x]));
  const live = () => pool.filter((c) => c.fastOk && c.score != null).sort((a, b) => a.score - b.score);
  const startFull = (c) => { fullP = full(path.join(B9, "arms", `P-${c.id}`, "V"), { out: path.join(B9, "_operator", "P", `full-${c.id}.json`) }).then((j) => { const x = { event: "full", id: c.id, score: j.score, raw: j.raw, gateOk: j.gateOk, lines: j.lines, error: j.error ?? null }; log(led, x); fulls.set(c.id, x); }); };
  for (;;) {
    const genCost = K * VARIANT_COST;
    if (clock.min() + VARIANT_MIN + 20 > CAP_MIN || spent + genCost > CAP_COST) break;
    const L = live(), best = L[0], second = L[1];
    let specs;
    if (!best) specs = BRIEFS.map((b) => ({ brief: b }));
    else {
      const rot = BRIEFS.filter((b) => b.id !== best.brief).slice(gen % 3).concat(BRIEFS.filter((b) => b.id !== best.brief)).slice(0, 2);
      specs = [...rot.map((b) => ({ brief: b, parent: `P-${best.id}`, parentScore: best.score, best: best.score, lineage: best.lineage })),
        ...(second ? [{ parent: `P-${best.id}`, mate: second.id, scores: [best.score, second.score], lineage: best.lineage, mateLineage: second.lineage }] : []),
        ...(L[2] ? [{ parent: `P-${best.id}`, mate: L[2].id, scores: [best.score, L[2].score], lineage: best.lineage, mateLineage: L[2].lineage }] : [{ brief: BRIEFS[(gen + 2) % BRIEFS.length], parent: `P-${best.id}`, parentScore: best.score, best: best.score, lineage: best.lineage }])].slice(0, K);
    }
    log(led, { event: "gen-start", gen, specs: specs.map((s) => ({ parent: s.parent ?? "start", mate: s.mate ?? null, brief: s.brief?.id ?? null })) });
    const vs = await Promise.all(specs.map((s, k) => variant(gen, k, s, led)));
    for (const v of vs) spent += v.cost;
    if (fullP) await fullP;
    for (const v of vs) { const f = await fast(v.P); const c = { id: v.id, gen, parent: v.parent, mate: v.mate, brief: v.brief, lineage: v.lineage, head: v.head, cost: v.cost, fastOk: f.ok, score: f.ok ? f.score : null, lines: f.lines }; pool.push(c); log(led, { event: "scored", c }); }
    const nb = live().find((c) => !fulls.has(c.id) || fulls.get(c.id).gateOk);
    if (nb && !fulls.has(nb.id)) startFull(nb);
    // a candidate the full gate failed is dropped from the pool
    for (const [id, x] of fulls) if (x.gateOk === false) { const c = pool.find((y) => y.id === id); if (c && c.fastOk) { c.fastOk = false; log(led, { event: "dropped", id, why: "the full gate fails" }); } }
    log(led, { event: "gen-end", gen, best: live()[0]?.id ?? null, bestScore: live()[0]?.score ?? null, spent: Number(spent.toFixed(4)), min: Math.round(clock.min() * 100) / 100 }); gen++;
  }
  if (fullP) await fullP;
  // the result: the best by fast score whose full gate passes (full-judged now if it was not yet)
  let fin = null;
  for (const c of live()) { if (!fulls.has(c.id)) { startFull(c); await fullP; } const x = fulls.get(c.id); if (x?.gateOk) { fin = { id: c.id, score: x.score, lineage: c.lineage, head: c.head }; break; } }
  clock.stop();
  const end = { event: "end", final: fin, generations: gen, variants: pool.length, cost: Number(spent.toFixed(4)), min: Math.round(clock.min() * 100) / 100 }; log(led, end); return end;
}

// ---------------------------------------------------------------- arm S (System 3 Meta on B8's harness, as arm S9)
async function armS() {
  const led = ledgerOf("S"), rows = S8.readJsonl(led);
  if (rows.some((x) => x.event === "end")) return { done: true, final: rows.find((x) => x.event === "end") };
  const runs = path.join(B9, "arms", "S");
  if (!rows.length) log(led, { event: "start", arm: "S", start: START, model: MODEL, caps: { cost: CAP_COST, min: CAP_MIN }, fake: FAKE });
  const args = [path.join(HERE, "..", "bench8", "setup.mjs"), "run", "--arm=S9", `--runs=${runs}`, `--b8=${B8}`, `--max-min=${CAP_MIN}`, `--max-cost=${CAP_COST}`, "--max-rounds=0", ...(opt.resume ? ["--resume"] : []), ...(FAKE ? ["--fake", "--no-preflight"] : [])];
  log(led, { event: "launch", args: args.slice(1) });
  const r = spawnSync(process.execPath, args, { stdio: ["ignore", "inherit", "inherit"], env: { ...process.env, B8_ISOLATION: "hooks" } });
  // S's final: the last order's version (its branch), whatever its end
  const P = S8.paths({ runs, arm: "S9", b8: B8 }), st = S8.readState(P.live);
  const o = ["W10", "W9", "W8"].map((w) => S8.orderOf(st, w)).find(Boolean), br = o?.workspace?.branch ?? null;
  const fin = path.join(B9, "arms", "S-final");
  if (br) { fs.rmSync(fin, { recursive: true, force: true }); gitOk(B9, "clone", "-q", "--no-hardlinks", "-b", br, P.repo, fin); }
  const end = S8.readJsonl(P.waves).filter((x) => x.event === "run-end").at(-1) ?? null;
  const x = { event: "end", code: r.status, order: o?.task ?? null, stage: o?.stage ?? null, branch: br, dir: br ? fin : null, cost: end?.cost ?? null, min: end?.activeMin ?? null, why: end?.why ?? null };
  log(led, x); return x;
}

// ---------------------------------------------------------------- status and the quiet final scoring
function status() {
  const out = {};
  for (const arm of ["V", "P", "S"]) { const r = S8.readJsonl(ledgerOf(arm)); if (!r.length) continue; out[arm] = { rows: r.length, last: r.at(-1), cost: Number(r.filter((x) => x.event === "turn").reduce((a, x) => a + (x.cost ?? 0), 0).toFixed(2)) }; }
  return out;
}
async function finalScoring() {
  const out = {};
  const cands = { start: startDir };
  const v = S8.readJsonl(ledgerOf("V")).find((x) => x.event === "end"); if (v) cands.V = path.join(B9, "arms", "V", "V");
  const pRows = S8.readJsonl(ledgerOf("P")), p = pRows.find((x) => x.event === "end"); if (p?.final) cands.P = path.join(B9, "arms", `P-${p.final.id}`, "V");
  // B9 deviation (2026-10-23, before the final scoring): P's in-loop full judge ran beside its next generation's four
  // sessions, so its timings were taken under load (the start's Lua 22.8-37.5 s against about 10.6 s idle) and its
  // ranking is mostly noise. Every P candidate that passed the in-loop gate is re-judged here on the quiet machine, and
  // P's result is the best of them; P's own pick (p.final) is reported beside it.
  const pGated = [...new Set(pRows.filter((x) => x.event === "full" && x.gateOk).map((x) => x.id))];
  if (pGated.length > 1) for (const id of pGated) if (id !== p?.final?.id) cands[`P:${id}`] = path.join(B9, "arms", `P-${id}`, "V");
  const s = S8.readJsonl(ledgerOf("S")).find((x) => x.event === "end"); if (s?.dir) cands.S = s.dir;
  for (const [arm, dir] of Object.entries(cands)) { out[arm] = await full(dir, { reps: 5, out: path.join(B9, "_operator", `final-${arm.replace(":", "-")}.json`) }); log(path.join(B9, "_operator", "final.jsonl"), { arm, dir, ...out[arm] }); }
  const pAll = Object.entries(out).filter(([k, x]) => (k === "P" || k.startsWith("P:")) && x.gateOk).sort((a, b) => a[1].score - b[1].score);
  if (pAll.length) log(path.join(B9, "_operator", "final.jsonl"), { arm: "P-best", from: pAll[0][0], score: pAll[0][1].score, ownPick: out.P ? { id: p?.final?.id, score: out.P.score } : null, candidates: pAll.map(([k, x]) => [k, x.score]) });
  return out;
}

const fns = { setup, v: armV, p: armP, s: armS, status, final: finalScoring, full: () => full(path.resolve(opt.dir), { reps: Number(opt.reps ?? 5) }) };
if (!fns[cmd]) { console.error("usage: run.mjs setup|v|p|s|full|final|status"); process.exit(2); }
if (!MODEL && ["v", "p", "s"].includes(cmd) && !FAKE) { console.error("no --model and the launcher's default could not be read"); process.exit(2); }
console.log(JSON.stringify(await fns[cmd](), null, 1));
