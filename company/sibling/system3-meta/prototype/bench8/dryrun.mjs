#!/usr/bin/env node
// Benchmark 8 dry run (no Agent SDK session): arm S driven through W1 -> W2 by the CLI, every role played by this
// script exactly as an agent would call the kernel, with the real spec (specs/ccompiler-specialized.json, instantiated
// for a fresh runs dir), the real integration check (visible-check.mjs: the stub compiler run by clj-run on the visible
// tests), the real interface contracts (contract.mjs) and the real hidden runner (setup.mjs accept -> run-hidden.mjs).
// The compiler is dryrun/stub/, a Clojure stub in the module layout. It shows:
//   - the architect delegates W1 to four owners at once; each enters its part (K31), all before anyone hands in
//   - K29: frontend's write to the backend's module is denied by the launcher's guard, and its hand-in with the
//     backend's file staged is refused at the commit
//   - K32: semantics asks to change the AST interface, the architect approves; the broken first version fails the
//     interface's contract at the next integration check and semantics' part reopens; the fix passes
//   - the B8 access hook (setup.mjs hook, the launcher's --pretool-hook) on S's calls: gcc on C refused, the kernel CLI fine
//   - eval (the independent evaluator) passes; the hidden accept fails W1's three categories, every one routed to the
//     backend (K30): the revise goes to the backend only, which resumes its own warm session (K26)
//   - with --max-rounds=1 the second failing accept spends the wave's rounds: exit 3, the harness cancels as founder
//   - the architect's retro writes a rule scoped to the backend module (K33); W2 is placed on main fast-forwarded to
//     W1's branch, and the backend's W2 pack carries the rule while frontend's does not
//   - W2: four owners hand in in parallel, eval, accept: the revise splits between backend and semantics
//   node dryrun.mjs [--runs=<dir>] [--keep]     prints one JSON summary; exit 1 on a failed check
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { paths, readState, orderOf, endIfStopped, tally, audit, readJsonl } from "./setup.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const RUNS = path.resolve(opt.runs ?? fs.mkdtempSync("/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad/b8-dry-S-"));
const P = paths({ runs: RUNS });
const STUB = path.join(HERE, "dryrun", "stub");
const G = await import(path.join(P.proto, "launcher", "guard.mjs"));
const log = [];
const step = (what, x = {}) => { log.push({ step: what, ...x }); process.stderr.write(`- ${what}${Object.keys(x).length ? ` ${JSON.stringify(x).slice(0, 220)}` : ""}\n`); };

const ENV = { ...process.env, META_LIVE_DIR: P.live };
for (const k of ["NODE_TEST_CONTEXT", "META_ROLE", "META_LAUNCH", "META_STATE"]) delete ENV[k];
function cli(file, args, env = {}) {
  const r = spawnSync(process.execPath, [file, ...args], { env: { ...ENV, ...env }, encoding: "utf8", maxBuffer: 32 << 20 });
  let out = null; try { out = r.stdout ? JSON.parse(r.stdout) : null; } catch { out = r.stdout; }
  return { code: r.status, out, err: r.stderr };
}
const K = (f) => path.join(P.proto, f);
const ok = (r) => { assert.equal(r.code, 0, `${r.err}\n${typeof r.out === "string" ? r.out : JSON.stringify(r.out)}`.slice(0, 3000)); return r.out; };
const meta = (...a) => cli(K("meta.mjs"), a);
const as = (role, launch, ...a) => cli(K("meta.mjs"), a, { META_ROLE: role, ...(launch ? { META_LAUNCH: launch } : {}) });
const tick = () => ok(cli(K("supervisor.mjs"), ["tick"]));
const harness = (...a) => cli(path.join(HERE, "setup.mjs"), [...a, `--runs=${RUNS}`]);
const queued = (q, o) => ok(meta("queue", q)).filter((x) => x.order === o);
const events = (t) => ok(meta("events", `--type=${t}`));
const sh = (cwd, ...a) => { const r = spawnSync("git", ["-C", cwd, ...a], { encoding: "utf8" }); assert.equal(r.status, 0, r.stderr); return r.stdout.trim(); };
const put = (dir, rel, from) => { fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true }); fs.copyFileSync(path.join(STUB, from ?? rel), path.join(dir, rel)); };
const write = (dir, rel, text) => { fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true }); fs.writeFileSync(path.join(dir, rel), text); };
const OWNED = { architect: ["src/ccc/main.clj", "src/ccc/ast.clj", "src/ccc/ir.clj", "docs/ABI.md", "docs/MODULES.md"], frontend: ["src/ccc/frontend/lexer.clj", "src/ccc/frontend/parser.clj"], semantics: ["src/ccc/sema/lower.clj"], backend: ["src/ccc/backend/x86.clj"] };
const sdk = (role, w) => `${String(role.length).padStart(8, "0")}-0000-4000-8000-${(w + role).replace(/[^a-z0-9]/g, "").padEnd(12, "0").slice(0, 12).replace(/[^0-9a-f]/g, "a")}`;
let seqLaunch = {};
/** The planner's launch for `role` (supervisor launched), as the launcher records it. */
function launch(role, msgs, resume = null) { const L = ok(cli(K("supervisor.mjs"), ["launched", `--role=${role}`, `--msgs=${msgs.join(",")}`, ...(resume ? [`--resume=${resume}`] : [])])); return (seqLaunch[role] = `${String(L.seq).padStart(4, "0")}-${role}`); }
const finished = (role, w) => ok(meta("launch", "finished", `--launch=${seqLaunch[role]}`, `--role=${role}`, "--tokens=1000", "--cumulative=5000", "--cost=0.01", `--sdk-session=${sdk(role, w)}`));
/** The B8 hook (setup.mjs hook, as the launcher's --pretool-hook runs it) on one S call. */
const hookSays = (tool, input, cwd) => { const r = spawnSync(process.execPath, [path.join(HERE, "setup.mjs"), "hook", "--arm=S", `--runs=${RUNS}`], { input: JSON.stringify({ hook_event_name: "PreToolUse", tool_name: tool, tool_input: input, cwd, session_id: "dry-run" }), encoding: "utf8" }); return { code: r.status, why: r.stderr.trim() }; };

function evaluate(o, w, wt) {
  tick();
  const m = queued("role:evaluator", o)[0];
  assert.ok(m, `${w}: the evaluation is the evaluator's`);
  assert.match(as("backend", null, "room", "enter", `--msg=${m.msg}`, "--role=backend").err, /backend may not take|backend built|independent/);
  const L = launch("evaluator", [m.msg]);
  const p = ok(as("evaluator", L, "room", "enter", `--msg=${m.msg}`, "--role=evaluator"));
  assert.ok(!p.history?.length, "the evaluator's pack carries no history");
  // an adversarial test of its own, compiled with the compiler (never gcc on C), linked, run
  write(wt, `tests/eval/${w}/e1.c`, "int printf(const char *f, ...);\nint sq(int x) { return x * x; }\nint main(void) { printf(\"%d\\n\", sq(7)); return sq(2) - 4; }\n");
  const c = spawnSync(P.clj, ["-m", "ccc.main", "-I", "spec/include", `tests/eval/${w}/e1.c`, "-o", path.join(RUNS, "S", "scratch", "e1.s")], { cwd: wt, encoding: "utf8" });
  write(wt, `tests/eval/${w}/EVAL.md`, `# ${w} evaluation (dry run)\n\ne1.c (calls, printf): compiled exit ${c.status}; not run further in the dry run\n\nverdict: pass (the dry run's evaluator passes so the hidden accept runs)\n`);
  ok(as("evaluator", L, "room", "leave", `--run=${p.run}`, `--evidence=tests/eval/${w}/EVAL.md`, "--verdict=pass"));
  finished("evaluator", w);
  step(`${w}: eval passed (evaluator, independent; an owner may not enter it)`, { compiled: c.status });
}

try {
  // ---------------------------------------------------------------- W1
  const pl = ok(harness("place", "--wave=W1", "--max-rounds=1"));
  step("W1 placed", { order: pl.order, main: pl.main.slice(0, 8), files: pl.files });
  const O1 = pl.order;
  // the architect delegates to every active owner at once (the optimizer joins from W5)
  assert.deepEqual(ok(as("architect", null, "order", "delegate", O1, "--by=architect", "--to=backend", "--owners=architect,frontend,semantics")).owners, ["backend", "architect", "frontend", "semantics"]);
  const t1 = tick();
  const WT1 = path.join(P.wt, "W1");
  assert.ok(t1.steps.some((s) => s.step === "workspace" && s.result === "created"), "the wave's worktree");
  assert.ok(fs.existsSync(path.join(WT1, "spec", "W1.md")) && fs.existsSync(path.join(WT1, "visible", "W1", "manifest.json")), "the release is in the worktree");
  const plan1 = t1.plan.filter((p) => p.msgs?.length).map((p) => p.role).sort();
  assert.deepEqual(plan1, ["architect", "backend", "frontend", "semantics"], "four owners planned at once");
  const pk = {};
  for (const r of plan1) { const m = queued(`role:${r}`, O1)[0]; launch(r, [m.msg]); pk[r] = { ...ok(as(r, seqLaunch[r], "room", "enter", `--msg=${m.msg}`, `--role=${r}`)), msgId: m.msg }; }
  assert.deepEqual(pk.frontend.ownership.yours, ["src/ccc/frontend/**", "test/frontend/**"]);
  assert.deepEqual(pk.architect.ownership.yours.sort(), ["docs/ABI.md", "docs/MODULES.md", "src/ccc/ast.clj", "src/ccc/ir.clj", "src/ccc/main.clj"]);
  step("W1: four owners entered their parts before any hand-in (K31)", { owners: pk.frontend.part.owners });

  // K29: the guard of frontend's launch
  const cfg = ok(as("frontend", seqLaunch.frontend, "launch", "config", "--role=frontend", `--msgs=${pk.frontend.msgId}`));
  const dec = (role, roots, tool, input) => G.decide(tool, input, { roots, cwd: WT1, role });
  // the launcher's plan for this launch (launch.mjs --workdir-from=order): the worktree as cwd, the role's tools, no settings
  const plan = G.sessionPlan(cfg, { fromOrder: true, settingSources: null, sessionMin: null }, { cwd: path.join(P.live, "kernel"), sessionMin: 20, maxTurns: 80, settingSources: [] });
  assert.ok(!plan.refused, plan.refused);
  assert.deepEqual([plan.cwd, plan.settingSources, plan.tools, plan.maxTurns, plan.sessionMin], [WT1, [], ["Bash", "Read", "Write", "Edit", "Glob", "Grep"], 200, 60]);
  assert.equal(dec("frontend", cfg.roots, "Write", { file_path: path.join(WT1, "src/ccc/frontend/lexer.clj") }), null);
  const deny = dec("frontend", cfg.roots, "Edit", { file_path: path.join(WT1, "src/ccc/backend/x86.clj") });
  assert.equal(deny.rule, "module-owner");
  assert.equal(dec("frontend", cfg.roots, "Bash", { command: "echo ';; x' >> src/ccc/backend/x86.clj" }).rule, "module-owner");
  ok(meta(...G.deniedArgs(seqLaunch.frontend, "frontend", { tool: "Edit", rule: deny.rule, why: deny.why, via: "hook", detail: deny.detail })));
  step("K29: frontend's write to the backend module denied by the guard", { rule: deny.rule });
  // the B8 access hook on S's calls
  const h1 = hookSays("Bash", { command: "gcc visible/W1/w1-0001.c -o ref" }, WT1), h2 = hookSays("Bash", { command: `node ${path.join(P.live, "kernel", "meta.mjs")} queue role:frontend` }, WT1), h3 = hookSays("Read", { file_path: path.join(P.op, "S", "accept.jsonl") }, WT1);
  assert.deepEqual([h1.code, h2.code, h3.code], [2, 0, 2]);
  step("B8 hook on S: gcc on C refused, the kernel CLI allowed, _operator closed", { gcc: h1.why.slice(0, 90) });

  // everyone writes at once (the stub, split by module); frontend also stages the backend's file
  for (const [r, fl] of Object.entries(OWNED)) for (const f of fl) put(WT1, f);
  put(WT1, "src/ccc/backend/x86.clj"); fs.appendFileSync(path.join(WT1, "src/ccc/backend/x86.clj"), ";; frontend was here\n");
  sh(WT1, "add", "src/ccc/backend/x86.clj");
  const r1 = as("frontend", seqLaunch.frontend, "room", "leave", `--run=${pk.frontend.run}`, "--evidence=src/ccc/frontend/");
  assert.equal(r1.code, 1); assert.match(r1.err, /module-owner: frontend's part of .* is not handed in: frontend's change touches src\/ccc\/backend\/x86\.clj \(module backend, owned by backend\)/);
  sh(WT1, "reset", "-q"); put(WT1, "src/ccc/backend/x86.clj");
  step("K29: frontend's hand-in with the backend's file staged refused at the commit; nothing committed");

  // the architect hands in the interfaces first; its commit holds only its paths
  ok(as("architect", seqLaunch.architect, "room", "leave", `--run=${pk.architect.run}`, "--evidence=docs/MODULES.md"));
  let t = tick(), ig = t.steps.find((s) => s.step === "integration");
  assert.equal(ig?.result, "pass", JSON.stringify(ig));
  assert.deepEqual(sh(WT1, "show", "--name-only", "--format=", "HEAD").split("\n").sort(), OWNED.architect.slice().sort());
  step("W1: architect's hand-in committed only its interfaces; integration (visible W1, the stub) passed", { output: ig.output ?? null });

  // K32: semantics asks for an AST change; the architect approves; a broken first version fails the contract
  const ask = ok(as("semantics", seqLaunch.semantics, "ask", "raise", "--by=semantics", "--kind=change-request", "--module=ast", `--order=${O1}`, "--title=ast: a node for a function's return type", "--why=lowering needs the declared return type", "--due=20"));
  assert.deepEqual([ask.assignee, ask.ask.target], ["architect", "interface"]);
  assert.match(as("backend", seqLaunch.backend, "ask", "answer", "--by=backend", `--id=${ask.id}`, "--decision=yes", "--text=ok").err, /architect's to answer/);
  ok(as("architect", null, "ask", "answer", "--by=architect", `--id=${ask.id}`, "--decision=yes", "--text=approved: add :ret to func, keep the constructor's arity"));
  const cfg2 = ok(as("semantics", seqLaunch.semantics, "launch", "config", "--role=semantics"));
  assert.equal(dec("semantics", cfg2.roots, "Write", { file_path: path.join(WT1, "src/ccc/ast.clj") }), null, "granted on this order");
  write(WT1, "src/ccc/ast.clj", fs.readFileSync(path.join(STUB, "src/ccc/ast.clj"), "utf8").replace("(defn func [name params] {:kind :func :name name :params params})", "(defn func [name params] {:kind :func :name name :params params :ret :int)"));
  ok(as("semantics", seqLaunch.semantics, "room", "leave", `--run=${pk.semantics.run}`, "--evidence=src/ccc/sema/lower.clj"));
  t = tick(); ig = t.steps.find((s) => s.step === "integration");
  assert.equal(ig?.result, "revise", JSON.stringify(ig)); assert.match(ig.output, /semantics: interface-ast|semantics: interface/);
  const ievs = events("integration").at(-1);
  step("K32: approved AST change; its broken first version failed the interface's contract; semantics' part reopened", { results: ievs.results.map((x) => [x.name, x.pass]) });
  finished("semantics", "W1");
  const sem2 = queued("role:semantics", O1)[0];
  launch("semantics", [sem2.msg], sdk("semantics", "W1"));
  const ps2 = ok(as("semantics", seqLaunch.semantics, "room", "enter", `--msg=${sem2.msg}`, "--role=semantics"));
  assert.match(ps2.findings, /interface ast/);
  write(WT1, "src/ccc/ast.clj", fs.readFileSync(path.join(STUB, "src/ccc/ast.clj"), "utf8").replace("(defn func [name params] {:kind :func :name name :params params})", "(defn func [name params] {:kind :func :name name :params params :ret :int})"));
  ok(as("semantics", seqLaunch.semantics, "room", "leave", `--run=${ps2.run}`, "--evidence=src/ccc/ast.clj"));
  t = tick(); ig = t.steps.find((s) => s.step === "integration");
  assert.equal(ig?.result, "pass", JSON.stringify(ig));
  step("K32: the fixed AST passes its contract at the next integration check");
  // frontend and backend hand in (in parallel: both runs open since the start)
  ok(as("frontend", seqLaunch.frontend, "room", "leave", `--run=${pk.frontend.run}`, "--evidence=src/ccc/frontend/"));
  ok(as("backend", seqLaunch.backend, "room", "leave", `--run=${pk.backend.run}`, "--evidence=src/ccc/backend/"));
  for (let i = 0; i < 3 && ok(meta("flow", "show", O1)).stage === "build"; i++) tick();
  assert.equal(ok(meta("flow", "show", O1)).stage, "eval");
  for (const r of ["architect", "frontend", "backend"]) finished(r, "W1");
  const commits = sh(WT1, "log", "--format=%s", "main..HEAD").split("\n");
  step("W1: every part in, each hand-in its own commit; the wave moves to eval", { commits: commits.length });

  evaluate(O1, "W1", WT1);
  t = tick();
  let acc = readJsonl(P.acceptLog);
  assert.equal(acc.length, 1); assert.ok(acc[0].failing.length >= 1);
  let parts = events("parts").at(-1);
  assert.deepEqual(Object.keys(parts.owners), ["backend"], `the W1 revise is the backend's alone: ${JSON.stringify(parts.owners)}`);
  assert.deepEqual(parts.owners.backend.sort(), ["w1-control", "w1-expressions", "w1-functions"]);
  for (const r of ["architect", "frontend", "semantics"]) assert.equal(queued(`role:${r}`, O1).length, 0, `${r} has nothing`);
  step("K30: the hidden accept failed W1's categories; the revise is routed to the backend only", { failing: acc[0].failing });
  const pr = tick().plan.find((p) => p.role === "backend");
  assert.equal(pr?.resume, sdk("backend", "W1"), "the backend resumes its own warm session (K26)");
  const be2 = queued("role:backend", O1)[0];
  launch("backend", [be2.msg], pr.resume);
  const pb2 = ok(as("backend", seqLaunch.backend, "room", "enter", `--msg=${be2.msg}`, "--role=backend"));
  assert.match(pb2.findings, /^W1 functions: \d+ of \d+ fail/m);
  fs.appendFileSync(path.join(WT1, "src/ccc/backend/x86.clj"), "\n;; dry run: the backend's revise\n");
  ok(as("backend", seqLaunch.backend, "room", "leave", `--run=${pb2.run}`, "--evidence=src/ccc/backend/x86.clj"));
  finished("backend", "W1");
  for (let i = 0; i < 3 && ok(meta("flow", "show", O1)).stage === "build"; i++) tick();
  evaluate(O1, "W1", WT1);
  t = tick();
  acc = readJsonl(P.acceptLog);
  assert.equal(acc.length, 2); assert.equal(acc[1].exhausted, true, "with --max-rounds=1 the second failing run spends the rounds");
  const stop = endIfStopped(P, "W1");
  assert.match(stop?.why ?? "", /feedback rounds? (is|are) spent/);
  assert.equal(ok(meta("flow", "show", O1)).stage, "cancelled");
  step("W1: the second failing accept spent the wave's rounds (exit 3); the harness cancelled the order as founder", { why: stop.why });

  // the architect's retro: a rule scoped to the backend module, citing W1's evidence (K33)
  tick();
  const shown = as("architect", null, "learn", "show").out;
  const ev1 = shown.evidence.at(-1), retro = shown.retros.find((r) => r.state === "open");
  assert.ok(retro, "a retro for the architect after the wave"); assert.equal(retro.role, "architect");
  assert.deepEqual(ev1.modules, { "w1-functions": "backend", "w1-control": "backend", "w1-expressions": "backend" });
  const prop = ok(as("architect", null, "learn", "propose", "--by=architect", `--retro=${retro.id}`, `--proposal=${JSON.stringify({ add: [{ text: "Before hand-in, compile, link and run every visible test of waves 1..n and compare stdout and exit status, not only your own unit tests.", why: [ev1.id], targets: ["w1-functions"], scope: { module: "backend" } }] })}`));
  assert.equal(prop.added.length, 1);
  tick();
  const pbk = JSON.parse(fs.readFileSync(path.join(P.store, "playbook.json"), "utf8"));
  step("K33: the architect's retro added a rule scoped to the backend module", { rule: pbk.rules[0].id, scope: pbk.rules[0].scope });

  // ---------------------------------------------------------------- W2
  const pl2 = ok(harness("place", "--wave=W2", "--max-rounds=1"));
  const O2 = pl2.order, w1head = sh(P.repo, "rev-parse", "wave-W1");
  assert.equal(sh(P.repo, "merge-base", "--is-ancestor", w1head, "main") === "" ? true : true, true);
  step("W2 placed on main fast-forwarded to W1's branch", { order: O2, main: pl2.main.slice(0, 8), w1: w1head.slice(0, 8) });
  ok(as("architect", null, "order", "delegate", O2, "--by=architect", "--to=backend", "--owners=architect,frontend,semantics"));
  const t2 = tick(), WT2 = path.join(P.wt, "W2");
  assert.ok(fs.existsSync(path.join(WT2, "src/ccc/backend/x86.clj")) && fs.readFileSync(path.join(WT2, "src/ccc/backend/x86.clj"), "utf8").includes("the backend's revise"), "W2 starts from W1's last version");
  const plan2 = t2.plan.filter((p) => p.msgs?.length);
  assert.ok(plan2.every((p) => !p.resume), "a new wave: every owner starts cold (K26 is per order)");
  const pk2 = {};
  for (const r of ["architect", "frontend", "semantics", "backend"]) { const m = queued(`role:${r}`, O2)[0]; launch(r, [m.msg]); pk2[r] = ok(as(r, seqLaunch[r], "room", "enter", `--msg=${m.msg}`, `--role=${r}`)); }
  assert.deepEqual((pk2.backend.playbook ?? []).map((x) => x.id), [pbk.rules[0].id], "the backend's pack carries its module's rule");
  assert.equal(pk2.frontend.playbook, undefined, "frontend's does not");
  step("K33: W2's backend pack carries the backend rule; frontend's carries none");
  for (const [r, f] of [["architect", "docs/MODULES.md"], ["frontend", "src/ccc/frontend/parser.clj"], ["semantics", "src/ccc/sema/lower.clj"], ["backend", "src/ccc/backend/x86.clj"]]) fs.appendFileSync(path.join(WT2, f), r === "architect" ? `\n${r}: W2 notes (pointers, arrays, strings, globals, char)\n` : `\n;; ${r}: W2\n`);
  for (const r of ["frontend", "backend", "semantics", "architect"]) ok(as(r, seqLaunch[r], "room", "leave", `--run=${pk2[r].run}`, "--evidence=W2"));
  for (let i = 0; i < 6 && ok(meta("flow", "show", O2)).stage === "build"; i++) tick();
  assert.equal(ok(meta("flow", "show", O2)).stage, "eval");
  const ig2 = events("integration").filter((e) => e.order === O2);
  step("W2: four owners handed in back to back; the integration check (visible W1+W2) ran on the commits as made", { checks: ig2.length, passed: ig2.filter((e) => e.results.every((x) => x.pass)).length });
  for (const r of ["architect", "frontend", "semantics", "backend"]) finished(r, "W2");
  evaluate(O2, "W2", WT2);
  tick();
  parts = events("parts").at(-1);
  assert.deepEqual(Object.keys(parts.owners).sort(), ["backend", "semantics"], JSON.stringify(parts.owners));
  assert.ok(parts.owners.semantics.includes("w2-globals"));
  step("K30: W2's accept revise split between backend and semantics", { owners: parts.owners });
  const end = endIfStopped(P, "W2", { why: "the dry run ends here" });
  step("W2 cancelled: the dry run ends", { why: end?.why });
  tick();
  const T = tally(P, { arm: "S" }), A = audit(P);
  const out = { ok: true, runs: RUNS, steps: log, tally: T.S.waves.map((g) => ({ wave: g.wave, stage: g.stage, firstHandin: g.firstHandin?.pct, final: g.final?.pct, rounds: g.rounds, integration: g.integration, parts: g.parts, changeRequests: g.changeRequests, firstByModule: g.firstByModule, rulesAtStart: g.rulesAtStart })), knowledge: T.knowledge, audit: { denials: A.denials.length, verdict: A.verdict } };
  console.log(JSON.stringify(out, null, 1));
  if (!opt.keep) fs.rmSync(RUNS, { recursive: true, force: true });
} catch (e) {
  console.log(JSON.stringify({ ok: false, runs: RUNS, steps: log, error: String(e.stack ?? e).slice(0, 3000) }, null, 1));
  process.exit(1);
}
