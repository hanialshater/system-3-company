import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// K34-K37 (Benchmark 8 S2, after S1 was stopped at W3): a time-boxed, advisory evaluator after a cheap code accept;
// owners staffed on demand; borrowing another module without waiting. A small fake org driven by the CLI as the
// agents and the supervisor drive it (no SDK session): arch (always on, the lead's builder) and the on-demand owners fe
// and be of modules front and back; judge, an advisory evaluator time-boxed at 10 minutes.
//   K34 a time box: the run's lease ends at the box; code signs the stage at the box with the report's defect lines
//       (the tick's sweep, or the launch that ended at the box); the launcher's session is capped at it
//   K35 advisory: when accept passes the order moves on to ship and done while the review runs beside it; its late
//       finding goes to the next order of the flow (its backlog at delegate), routed to the module's owner
//   K36 --scope staffs only the scoped modules' owners; an on-demand owner is refused through --owners; routed work
//       (the carried finding) starts it anyway
//   K37 borrow: fe's guard lets a write into back through and reports it; fe's commit takes the borrowed file and
//       records it; be gets a non-blocking review-borrow ask with the diff (be's only session); a no is be's work
//   B8 S1 guard fixes: the K28 store root no longer protects relative paths as written; literal variables, escaped
//       backticks and interpreter heredocs are read; what cannot be judged is still refused
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k34-"));
process.env.META_LIVE_DIR = LIVE;
const HERE = path.dirname(new URL(import.meta.url).pathname);
const G = await import(path.join(HERE, "..", "launcher", "guard.mjs"));
const { validateSpec } = await import("../generator.mjs");
const { load, save, make } = await import("../state.mjs");
const GEN = await import("../generator.mjs");
const { timeboxLines } = await import("../lib.mjs");
const sh = (cwd, ...args) => { const r = spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8" }); assert.equal(r.status, 0, r.stderr); return r.stdout.trim(); };
const put = (dir, f, t) => { fs.mkdirSync(path.dirname(path.join(dir, f)), { recursive: true }); fs.writeFileSync(path.join(dir, f), t); };

const REPO = path.join(LIVE, "repo"), ROOT = path.join(LIVE, "wt"), STORE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k34-store-"));
fs.mkdirSync(REPO, { recursive: true });
sh(REPO, "init", "-q", "-b", "main"); sh(REPO, "config", "user.email", "t@example.com"); sh(REPO, "config", "user.name", "t");
put(REPO, "src/front/lex.js", "v0\n"); put(REPO, "src/back/gen.js", "v0\n"); put(REPO, "src/core/rt.js", "v0\n");
sh(REPO, "add", "-A"); sh(REPO, "commit", "-q", "-m", "base");
const BASE = sh(REPO, "rev-parse", "HEAD");
const RUNNER = path.join(LIVE, "accept.mjs");
fs.writeFileSync(RUNNER, 'import fs from "node:fs"; const d = process.argv[2], out = [];\nif (!fs.readFileSync(`${d}/src/front/lex.js`, "utf8").includes("lex-ok")) out.push("failed: lexer: tokens wrong");\nconsole.log(out.join("\\n")); process.exit(out.length ? 1 : 0);\n');

const SPEC = {
  name: "compilers2", title: "a compiler shop (K34-K37)",
  vars: { playbook_store: "" },
  rooms: [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "bench", floor: 2, kind: "lane", lane: "c" }],
  skills: ["manage", "build", "review"],
  roles: [
    { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
    { id: "lead", level: "manager", reportsTo: "founder", lane: "c", room: "bench", floor: 2, skills: ["manage"] },
    { id: "arch", level: "builder", reportsTo: "lead", lane: "c", room: "bench", floor: 2, skills: ["build"] },
    { id: "fe", level: "builder", reportsTo: "lead", lane: "c", room: "bench", floor: 2, skills: ["build"], activate: "on-demand", sessionMin: 60 },
    { id: "be", level: "builder", reportsTo: "lead", lane: "c", room: "bench", floor: 2, skills: ["build"], activate: "on-demand" },
    { id: "judge", level: "evaluator", reportsTo: "founder", room: "bench", floor: 2, skills: ["review"], sessionMin: 60 },
  ],
  modules: { front: { paths: ["src/front/**"], owner: "fe", readers: "all" }, back: { paths: ["src/back/**"], owner: "be", readers: "all" }, core: { paths: ["src/core/**"], owner: "arch" }, evals: { paths: ["eval/**"], owner: "judge" } },
  routes: [{ match: "^(lex|pars)", owner: "front" }, { match: "^codegen", owner: "back" }],
  triage: "arch",
  borrow: { modules: ["front", "back", "core"] },
  workspace: { kind: "git-worktree", repo: REPO, base: BASE, root: ROOT, run: "k34", commit: true },
  flow: { name: "wave", stages: [
    { stage: "build", signer: "builder", evidence: ["the owner's module"] },
    { stage: "accept", signer: "code", evidence: [], run: { argvFrom: "order", findings: { fromStdout: "^failed: (.+)$" } } },
    { stage: "eval", signer: { role: "judge" }, independent: true, advisory: true, timebox: { min: 10, findings: "eval/${task}/EVAL.md" }, evidence: ["EVAL.md"], pack: { history: false } },
    { stage: "ship", signer: "code", evidence: [], run: { argv: ["node", "-e", "0"] } },
  ] },
  learn: { store: "${playbook_store}", roles: ["fe", "be", "arch"], retro: { run: { argv: ["node", "${kernel}/learn.mjs", "retro", "--store=${store}", "--min=1"] } } },
};
const ENV = { ...process.env, META_LIVE_DIR: LIVE };
delete ENV.NODE_TEST_CONTEXT; delete ENV.META_ROLE;
function cli(file, args, env = {}) {
  const r = spawnSync("node", [path.join(HERE, "..", file), ...args], { env: { ...ENV, ...env }, encoding: "utf8" });
  let out = null; try { out = r.stdout ? JSON.parse(r.stdout) : null; } catch { out = r.stdout; }
  return { code: r.status, out, err: r.stderr };
}
const meta = (...a) => cli("meta.mjs", a);
const as = (role, launch, ...a) => cli("meta.mjs", a, { META_ROLE: role, ...(launch ? { META_LAUNCH: launch } : {}) });
const ok = (r) => { assert.equal(r.code, 0, r.err || JSON.stringify(r.out)); return r.out; };
const tick = () => ok(cli("supervisor.mjs", ["tick"]));
const events = (t) => ok(meta("events", `--type=${t}`));
const queued = (q, order) => ok(meta("queue", q)).filter((x) => x.order === order);
const launched = (role, msgs = []) => { const L = ok(cli("supervisor.mjs", ["launched", `--role=${role}`, ...(msgs.length ? [`--msgs=${msgs.join(",")}`] : [])])); return `${String(L.seq).padStart(4, "0")}-${role}`; };
/** Move a running run's time box (and its lease) to `minFromNow` minutes from now: the test's stand-in for waiting. */
function shiftBox(run, minFromNow) {
  const co = load(), x = co.rooms.runs.get(run), now = co.engine.clock.now();
  x.boxUntil = now + minFromNow; const m = co.mailbox.msgs.get(x.msg); if (m.lease) m.lease.until = x.boxUntil;
  save(co);
}

test("validation: timebox, advisory, activate and borrow; S1 and S2's specs are valid", () => {
  assert.deepEqual(validateSpec(SPEC), []);
  const bad = (f) => { const s = JSON.parse(JSON.stringify(SPEC)); f(s); return validateSpec(s).join("\n"); };
  const ev = (s) => s.flow.stages.find((x) => x.stage === "eval");
  assert.match(bad((s) => { ev(s).timebox = { min: 0 }; }), /timebox.min is 1-600/);
  assert.match(bad((s) => { ev(s).timebox = { min: 5, findings: "../x" }; }), /timebox.findings is a workdir-relative file/);
  assert.match(bad((s) => { ev(s).timebox.extra = 1; }), /timebox is \{min, findings\}/);
  assert.match(bad((s) => { s.flow.stages[0].timebox = { min: 5 }; }), /a time box is for a review/);
  assert.match(bad((s) => { s.flow.stages[1].advisory = true; }), /advisory is for an independent stage an agent reviews/);
  assert.match(bad((s) => { ev(s).sample = { rate: 0.5 }; }), /an advisory stage has no sample/);
  assert.match(bad((s) => { s.roles[3].activate = "sometimes"; }), /activate is "always" or "on-demand"/);
  assert.match(bad((s) => { s.roles[1].activate = "on-demand"; }), /on-demand: a builder that owns a module/);
  assert.match(bad((s) => { s.borrow = { modules: ["nope"] }; }), /borrow is true \(every module\) or \{modules/);
  for (const f of ["ccompiler-specialized.json", "ccompiler-specialized-v2.json"]) assert.deepEqual(validateSpec(JSON.parse(fs.readFileSync(path.join(HERE, "..", "specs", f), "utf8"))), [], f);
  // the defect lines a time box hands in: a category and what is required
  assert.equal(timeboxLines("# W1 eval\n\ne1.c (calls): ok\n- codegen: wrong asm -> emit right asm\nverdict: revise\nW3 structs: padding → 4-byte alignment\n"), "codegen: wrong asm -> emit right asm\nW3 structs: padding → 4-byte alignment");
  assert.equal(timeboxLines("verdict: pass\n"), null);
});

let O, WT;
const lid = {};
test("K36 + K37: the scope staffs only front's owner; fe borrows back without waiting; be reviews the borrow, and its no is be's work", () => {
  const f = path.join(LIVE, "spec.json");
  fs.writeFileSync(f, JSON.stringify(SPEC));
  ok(meta("init", `--spec-file=${f}`, `--vars=${JSON.stringify({ playbook_store: STORE })}`));
  O = ok(meta("order", "new", "--by=founder", "--to=lead", "--title=Wave 1", "--task=W1", "--accept=wave 1", `--accept-cmd=${JSON.stringify(["node", RUNNER, "${workdir}"])}`)).order;
  assert.match(as("lead", null, "order", "delegate", O, "--by=lead", "--to=arch", "--owners=fe").err, /fe works on demand: it gets a part only when the order's --scope names its module/);
  assert.match(as("lead", null, "order", "delegate", O, "--by=lead", "--to=fe").err, /fe works on demand: name its module with --scope/);
  assert.match(as("lead", null, "order", "delegate", O, "--by=lead", "--to=arch", "--scope=nope").err, /nope is not this company's modules/);
  const d = ok(as("lead", null, "order", "delegate", O, "--by=lead", "--to=arch", "--scope=front"));
  assert.deepEqual([d.owners, d.scope], [["arch", "fe"], ["front"]]);
  const t1 = tick();
  WT = path.join(ROOT, "W1");
  assert.deepEqual(t1.plan.filter((p) => p.msgs?.length).map((p) => p.role).sort(), ["arch", "fe"], "be is idle: no session");
  assert.equal(queued("role:be", O).length, 0);
  for (const p of t1.plan) lid[p.role] = launched(p.role, p.msgs);
  const pk = {};
  for (const r of ["arch", "fe"]) pk[r] = ok(as(r, lid[r], "room", "enter", `--msg=${queued(`role:${r}`, O)[0].msg}`, `--role=${r}`));

  // K37: fe's guard lets a write into back (a borrowed module) through and reports it; the evaluator's module and
  // core's are as before: core is lent too, evals is not
  const cfg = ok(as("fe", lid.fe, "launch", "config", "--role=fe"));
  const lent = [];
  const guard = G.makeGuard({ roots: cfg.roots, cwd: WT, role: "fe", borrowed: (b) => lent.push(b) });
  const dec = (tool, input) => G.decide(tool, input, { roots: cfg.roots, cwd: WT, role: "fe" });
  assert.equal(dec("Write", { file_path: path.join(WT, "src/back/gen.js") }), null, "back is lent");
  assert.equal(dec("Write", { file_path: path.join(WT, "eval/W1/EVAL.md") }).rule, "module-owner", "the evaluator's module is not");
  return guard.preToolUse({ hook_event_name: "PreToolUse", tool_name: "Write", tool_input: { file_path: path.join(WT, "src/back/gen.js") }, cwd: WT }, "tu-1").then((r) => {
    assert.deepEqual(r, {});
    assert.deepEqual(lent.map((b) => [b.order, b.file, b.module, b.owner]), [[O, "src/back/gen.js", "back", "be"]]);
    assert.deepEqual(G.borrowsIn("Bash", { command: "echo x > src/back/gen2.js" }, { roots: cfg.roots, cwd: WT }).map((b) => b.file), ["src/back/gen2.js"], "a shell write too");
    // the launcher reports it (meta.mjs guard borrow: the launcher's, refused in an agent session)
    assert.match(as("fe", lid.fe, "guard", "borrow", "--role=fe", `--order=${O}`, "--file=src/back/gen.js").err, /guard borrow is the launcher's record/);
    assert.match(meta("guard", "borrow", "--role=fe", `--order=${O}`, "--file=src/front/lex.js").err, /not a path of another role's module that may be borrowed/);
    ok(meta("guard", "borrow", "--role=fe", `--order=${O}`, "--file=src/back/gen.js", `--launch=${lid.fe}`));
    assert.equal(events("borrow").length, 1);
    put(WT, "src/front/lex.js", "lex-ok\n"); put(WT, "src/back/gen.js", "gen borrowed by fe\n");
    put(WT, "src/core/rt.js", "rt-v1 (arch's work in progress)\n");
    ok(as("fe", lid.fe, "room", "leave", `--run=${pk.fe.run}`, "--evidence=src/front/lex.js", "--learned=borrowed back's gen.js for the token kinds"));
    // K7: fe's commit takes its own paths and the borrowed file, never arch's work in progress; it records the borrow
    assert.deepEqual(sh(WT, "show", "--name-only", "--format=", "HEAD").split("\n").sort(), ["src/back/gen.js", "src/front/lex.js"]);
    const c = events("commit").at(-1);
    assert.deepEqual(c.borrowed.map((b) => [b.module, b.owner, b.files]), [["back", "be", ["src/back/gen.js"]]]);
    // be: one non-blocking review-borrow ask with the diff; its only session is that review
    const it = ok(meta("item", "show", `--id=${c.borrowed[0].review}`));
    assert.deepEqual([it.assignee, it.ask.kind, it.ask.order, it.ask.files], ["be", "review-borrow", O, ["src/back/gen.js"]]);
    assert.match(it.body, /\+gen borrowed by fe/);
    const plan = tick().plan;
    const bp = plan.find((p) => p.role === "be");
    assert.deepEqual(bp.tasks.map((t) => t.kind), ["ask"]);
    assert.equal(queued("role:be", O).length, 0, "no part: the order does not wait for be");
    const bl = launched("be");
    ok(as("be", bl, "ask", "answer", "--by=be", `--id=${it.id}`, "--decision=no", "--text=keep the v0 header line"));
    // a no comes back to be as work on the order (at build: a part of its own)
    const bq = queued("role:be", O);
    assert.equal(bq.length, 1, "be's part now");
    const pb = ok(as("be", bl, "room", "enter", `--msg=${bq[0].msg}`, "--role=be"));
    assert.match(pb.findings, /review-borrow findings from review-borrow \(be\):\nback: fe's borrowed change to src\/back\/gen\.js -> keep the v0 header line/);
    put(WT, "src/back/gen.js", "v0\ngen borrowed by fe\n");
    ok(as("be", bl, "room", "leave", `--run=${pb.run}`, "--evidence=src/back/gen.js"));
    put(WT, "src/core/rt.js", "rt-ok\n");
    ok(as("arch", lid.arch, "room", "leave", `--run=${pk.arch.run}`, "--evidence=src/core/rt.js"));
  });
});

test("K35 + K34: accept passes and the order ships while the advisory review runs; at its time box code hands in the report; the late finding is the next order's, routed to its owner", () => {
  let t = tick();
  // accept (code) passed: the order passed over eval (scheduled beside it) and went on to ship and done
  for (let i = 0; i < 3 && ok(meta("flow", "show", O)).stage !== "done"; i++) t = tick();
  const fo = ok(meta("flow", "show", O));
  assert.equal(fo.stage, "done");
  assert.deepEqual(events("advisory-start").map((e) => [e.order, e.stage, e.n]), [[O, "eval", 1]]);
  assert.deepEqual(fo.history.filter((h) => h.stage === "accept" || h.stage === "ship").map((h) => h.verdict), ["pass", "pass"]);
  const jm = queued("role:judge", O);
  assert.equal(jm.length, 1, "the review is still the judge's");
  // the judge enters: its lease ends at the box; its launch's session is capped at the box (10 of its 60 minutes)
  const jl = launched("judge", [jm[0].msg]);
  const cfg = ok(as("judge", jl, "launch", "config", "--role=judge", `--msgs=${jm[0].msg}`));
  assert.equal(cfg.timeboxMin, 10);
  assert.equal(G.sessionPlan(cfg, { fromOrder: true }, { cwd: LIVE, sessionMin: 20, maxTurns: 10 }).sessionMin, 10);
  const pj = ok(as("judge", jl, "room", "enter", `--msg=${jm[0].msg}`, "--role=judge"));
  assert.equal(pj.timebox.minutes, 10);
  assert.match(pj.advisory, /the order does not wait for this review/);
  { const co = load(), x = co.rooms.runs.get(pj.run), m = co.mailbox.msgs.get(x.msg); assert.ok(m.lease.until <= x.boxUntil && x.boxUntil - m.lease.until < 0.01, "the lease ends at the box"); }
  // the judge writes its report as it goes; the box passes before it hands in
  put(WT, "eval/W1/EVAL.md", "# W1\n\ne1.c: compiled\ncodegen: return value lost in nested calls -> keep rax across calls\nverdict: (not reached)\n");
  shiftBox(pj.run, -0.01);
  t = tick();
  assert.deepEqual(t.steps.filter((s) => s.step === "timebox").map((s) => [s.order, s.stage, s.result]), [[O, "eval", "advisory, with findings"]]);
  assert.match(as("judge", jl, "room", "leave", `--run=${pj.run}`, "--evidence=x", "--verdict=pass").err, /not running/, "its own hand-in after the box signs nothing");
  // never a silent pass: the history says timeboxed, the finding went to the flow's backlog (no next order yet)
  const h = ok(meta("flow", "show", O)).history.find((x) => x.verdict === "advisory");
  assert.deepEqual([h.result, h.afterEnd, /codegen: return value lost/.test(h.findings)], ["timeboxed", true, true]);
  assert.deepEqual(events("late-backlog").map((e) => [e.order, e.stage, e.kind]), [[O, "eval", "timeboxed"]]);
  assert.equal(ok(meta("flow", "show", O)).stage, "done", "the finished order is never reopened");
  // the next wave: scoped to front only, yet the carried codegen finding starts be (K30 routes it to back)
  const O2 = ok(meta("order", "new", "--by=founder", "--to=lead", "--title=Wave 2", "--task=W2", "--accept=wave 2", `--accept-cmd=${JSON.stringify(["node", RUNNER, "${workdir}"])}`)).order;
  ok(as("lead", null, "order", "delegate", O2, "--by=lead", "--to=arch", "--scope=front"));
  assert.deepEqual(events("late-carried").map((e) => [e.order, e.from]), [[O2, [O]]]);
  tick();
  const bq = queued("role:be", O2);
  assert.equal(bq.length, 1, "be is started by the routed finding");
  const pb = ok(as("be", null, "room", "enter", `--msg=${bq[0].msg}`, "--role=be"));
  assert.match(pb.findings, /timeboxed findings from eval on O-1 \(code\):\ncodegen: return value lost in nested calls -> keep rax across calls/);
  assert.deepEqual(pb.part.categories, ["codegen"]);
  // K34: a launch that ends at the box (the launcher's cap) hands in too, and abandons nothing
  const fq = queued("role:fe", O2)[0], fl = launched("fe", [fq.msg]);
  const pf = ok(as("fe", fl, "room", "enter", `--msg=${fq.msg}`, "--role=fe"));
  const r = ok(meta("launch", "finished", `--launch=${fl}`, "--role=fe", "--tokens=10", "--ok=false", "--reason=session over 60 min"));
  assert.deepEqual(r.abandoned, [pf.run], "a run with no box is abandoned as before");
});

test("K34: a blocking time-boxed stage revises with the report's lines, or parks with none (never a pass by time)", () => {
  const co = load(), O2 = [...co.engine.orders.values()].find((o) => o.task === "W2");
  // a fresh judge run on the advisory stage, then a launch finished within the grace of its box
  co.engine.startAdvisory(O2, co.engine.flows.get(O2.flow).stages.find((x) => x.stage === "eval")); save(co);
  const jm = queued("role:judge", O2.id)[0], jl = launched("judge", [jm.msg]);
  const pj = ok(as("judge", jl, "room", "enter", `--msg=${jm.msg}`, "--role=judge"));
  shiftBox(pj.run, 1); // the launcher's cap fired a minute before the box (it started before the run entered)
  const r = ok(meta("launch", "finished", `--launch=${jl}`, "--role=judge", "--tokens=10", "--ok=false", "--reason=session over 10 min"));
  assert.deepEqual([r.abandoned, r.timeboxed], [[], [pj.run]]);
  assert.equal(events("timeboxed").at(-1).signed, "advisory, none written", "no report for W2 yet: none written, recorded");
  // the engine: a blocking stage at its box
  const c2 = load(), e = c2.engine, o = e.orders.get(O2.id);
  assert.throws(() => e.advance(o.id, { stage: o.stage, by: "fe", verdict: "timeboxed" }), /verdict timeboxed is code's/);
  // a blocking (not advisory) time-boxed review, in process: with the report's lines a revise, without them parked
  const spec = { ...JSON.parse(JSON.stringify(SPEC)), workspace: undefined, modules: undefined, routes: undefined, triage: undefined, borrow: undefined, learn: undefined, vars: undefined };
  spec.roles = spec.roles.map(({ activate, ...r }) => r);
  spec.flow.stages = spec.flow.stages.map(({ advisory, ...x }) => x);
  for (const r of [null, "codegen: lost value -> keep it"]) {
    const k = make("blocking", spec);
    for (const f of GEN.specFlows(spec)) k.engine.approveDef(k.engine.define(f.name, { stages: f.stages }, { by: "lead" }), { by: "founder", words: "test" });
    k.org.genesis(spec.roles);
    k.rooms.timeboxFindings = () => r;
    const ord = k.engine.orderNew({ flow: "wave", by: "founder", to: "lead", budget: 1000, accept: "x", title: "t" });
    k.engine.delegate(ord.id, { by: "lead", to: "arch", budget: 1000 });
    k.engine.advance(ord.id, { stage: "build", by: "arch", evidence: "x" });
    k.engine.advance(ord.id, { stage: "accept", by: "code", verdict: "pass" });
    const m = k.mailbox.queue("role:judge", "work")[0];
    const { run } = k.rooms.enter({ msg: m.id, role: "judge" });
    assert.ok(k.mailbox.msgs.get(m.id).lease.until <= k.rooms.runs.get(run).boxUntil, "the lease ends at the box");
    k.rooms.runs.get(run).boxUntil = k.engine.clock.now() - 0.01;
    assert.equal(k.rooms.recover().length, 0, "a run at its box is code's to sign, not a lost lease");
    const h = ord.history.at(-1);
    if (r) assert.deepEqual([ord.stage, h.verdict, h.timeboxed, /timeboxed after .* judge's findings so far:\ncodegen: lost value/.test(h.findings)], ["build", "revise", true, true]);
    else assert.deepEqual([ord.stage, ord.parked.stage, h.verdict, h.timeboxed], ["parked", "eval", "timeboxed", true]); // S2 review (F1): never a pass by time
  }
});

test("B8 S1 guard fixes: the store protects only its own dir; literal variables, escaped backticks and interpreter heredocs are read; the rest is still refused", () => {
  const co = load();
  const cfg = ok(as("judge", null, "launch", "config", "--role=judge"));
  const store = cfg.roots.find((x) => x.kind === "store");
  assert.ok(store, "the K28 store is a root of its own kind");
  const d = (command) => G.decide("Bash", { command }, { roots: cfg.roots, cwd: WT });
  // S1's refusals: the evaluator's own test file, a test's .exit, a scratch list (relative shell writes)
  for (const c of ["mkdir -p eval/W3/gray && cd eval/W3/gray && printf 'int main(){}\\n' > g01_empty_braces.c", "echo 37 > test/backend/c/stress1.exit", "printf '%s\\n' a > .scratch-arch/list"]) assert.equal(d(c), null, c);
  assert.equal(G.decide("Write", { file_path: path.join(STORE, "playbook.json") }, { roots: cfg.roots, cwd: WT })?.rule, "protected-path", "the store itself stays code's");
  assert.equal(d(`echo x > ${path.join(STORE, "evidence.jsonl")}`)?.rule, "protected-path");
  // test-loop constructs S1's agents used, now read
  for (const c of ["T=/x/toolchain/clj-run; mkdir -p /tmp/a; $T -m ccc.main -I spec/include a.c -o /tmp/a/a.s",
    "CLJ=/x/clj-run; $CLJ test/frontend/parse_all.clj visible/W1 2>&1 | tail -20",
    "for f in a.c b.c; do ./$f; done",
    "for f in tests/*.c; do /x/clj-run -m ccc.main $f -o /tmp/$f.s && gcc /tmp/$f.s -o /tmp/x && /tmp/x | node -e 'process.stdin.pipe(process.stdout)'; done",
    "for f in $(find src -name '*.clj'); do grep -q \"\\`$f\\`\" docs/MODULES.md || echo \"MISSING $f\"; done",
    "python3 - <<'EOF'\np = 'src/x.clj'\ns = open(p).read()\nfor a in [1, 2]:\n    print(f'{a}')\nEOF",
    "L=/tmp/live; META_LIVE_DIR=$L node $L/kernel/meta.mjs order show O-3"]) assert.equal(G.bashDenial(c), null, c);
  // still refused: a variable that resolves to a denied command, one the line cannot know, a denied program body
  assert.equal(G.bashDenial("T=git; $T push"), "git push");
  assert.equal(G.bashDenial("for x in a git; do $x push; done"), "git push");
  assert.equal(G.bashDenial("X=deploy; npm run $X"), "npm run deploy");
  assert.match(G.bashDenial("T=$(echo git); $T push"), /cannot read/);
  assert.match(G.bashDenial("while read f; do $f push; done"), /cannot read/);
  assert.match(G.bashDenial("$SOME_ENV_VAR -m x"), /cannot read/);
  assert.equal(G.bashDenial("echo \\\\`git push`"), "git push", "an escaped backslash leaves the backtick real");
  assert.match(G.bashDenial("python3 - <<'EOF'\nimport os\nos.system('git push')\nEOF"), /git push \(in a python3 program\)/);
  assert.match(G.bashDenial("node <<'EOF'\nrequire('child_process').execSync('node /k/supervisor.mjs launched')\nEOF"), /supervisor\.mjs/);
  // V's harness reads shellCommands without the new option: unchanged
  assert.equal(G.shellCommands("python3 - <<'EOF'\nx = 1\nEOF").cmds.length > 1, true, "a program heredoc is still lines to the default parse");
  void co;
});
