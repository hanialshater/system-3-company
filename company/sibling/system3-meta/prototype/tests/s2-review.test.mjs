import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// The S2 review's fixes (after K34-K37, before S2 runs):
//   F4 the guard's literal-variable reading never resolves under a changed IFS, from a for-list glob, or with a nameref
//   F3 borrow is for an owner of a lent module only (never a reviewer, never a role that owns no lent module); a
//      borrowed file another role's commit takes is still recorded as the borrower's and reviewed
//   F1 a blocking time-boxed stage never passes by time (a revise with the report's lines, else parked); a timebox on an
//      orderer's approval is invalid; a crash before the box is abandoned (re-queued), the launcher's cap is the box;
//      a time-boxed item is a launch of its own; report formats are read, an unparsed report kept; flushed late
//      findings keep their origin; resume --to never names an advisory stage
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-s2rev-"));
process.env.META_LIVE_DIR = LIVE;
const HERE = path.dirname(new URL(import.meta.url).pathname);
const G = await import(path.join(HERE, "..", "launcher", "guard.mjs"));
const GEN = await import("../generator.mjs");
const { make } = await import("../state.mjs");
const SUP = await import("../supervisor.mjs");
const { timeboxLines, timeboxRead } = await import("../lib.mjs");
const sh = (cwd, ...args) => { const r = spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8" }); assert.equal(r.status, 0, r.stderr); return r.stdout.trim(); };
const put = (dir, f, t) => { fs.mkdirSync(path.dirname(path.join(dir, f)), { recursive: true }); fs.writeFileSync(path.join(dir, f), t); };
const ENV = { ...process.env, META_LIVE_DIR: LIVE };
delete ENV.NODE_TEST_CONTEXT; delete ENV.META_ROLE;
function cli(file, args, env = {}, live = LIVE) {
  const r = spawnSync("node", [path.join(HERE, "..", file), ...args], { env: { ...ENV, META_LIVE_DIR: live, ...env }, encoding: "utf8" });
  let out = null; try { out = r.stdout ? JSON.parse(r.stdout) : null; } catch { out = r.stdout; }
  return { code: r.status, out, err: r.stderr };
}
const ok = (r) => { assert.equal(r.code, 0, r.err || JSON.stringify(r.out)); return r.out; };

const ROOMS = [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "bench", floor: 2, kind: "lane", lane: "c" }];
const ROLES = [
  { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
  { id: "lead", level: "manager", reportsTo: "founder", lane: "c", room: "bench", floor: 2, skills: ["manage"] },
  { id: "arch", level: "builder", reportsTo: "lead", lane: "c", room: "bench", floor: 2, skills: ["build"] },
  { id: "judge", level: "evaluator", reportsTo: "founder", room: "bench", floor: 2, skills: ["review"] },
];
const small = (stages, extra = {}) => ({ name: "s2rev", title: "s2rev", rooms: ROOMS, skills: ["manage", "build", "review"], roles: ROLES, flow: { name: "wave", stages }, ...extra });
const REVIEW = { stage: "review", signer: { role: "judge" }, independent: true, timebox: { min: 10 }, evidence: ["r"] };
const SHIP = { stage: "ship", signer: "code", evidence: [], run: { argv: ["node", "-e", "0"] } };
function company(spec, label) {
  const k = make(label, spec);
  for (const f of GEN.specFlows(spec)) k.engine.approveDef(k.engine.define(f.name, { stages: f.stages }, { by: "lead" }), { by: "founder", words: "test" });
  k.org.genesis(spec.roles);
  return k;
}
function built(k, title = "t") {
  const o = k.engine.orderNew({ flow: "wave", by: "founder", to: "lead", budget: 1000, accept: "x", title });
  k.engine.delegate(o.id, { by: "lead", to: "arch", budget: 1000 });
  k.engine.advance(o.id, { stage: "build", by: "arch", evidence: "x" });
  return o;
}

test("F4: no literal resolution under a changed IFS, from a for-list glob, or with a nameref; plain literals still read", () => {
  for (const c of ["IFS=_; C=git_push; $C origin main", "C=git_push; IFS=_; $C origin main", "IFS=/; C=git/push; $C origin", "IFS=_; C=npm_run_deploy; $C",
    "for f in /usr/bin/gi[t]; do $f push origin HEAD; done", "for f in /usr/bin/gi?; do $f push origin; done", "for g in /usr/*/git; do $g push; done",
    "Y=push; declare -n R=Y; git $R origin", "Y=push; local -n R=Y; git $R", "C=ls; declare -n R=C; R=push; git $C", "Y=push; builtin declare -n R=Y; git $R"]) {
    assert.ok(G.bashDenial(c), c);
    assert.equal(G.decide("Bash", { command: c }, { tools: null, roots: [], cwd: "/tmp" })?.rule, "bash", c);
  }
  assert.equal(G.lineVariants("C=git_push; $C", { IFS: "_" }), null, "an environment IFS other than the default: nothing resolved");
  assert.ok(G.lineVariants("T=/x/clj-run; $T -m foo", {})?.includes("T=/x/clj-run; /x/clj-run -m foo"));
  for (const c of ["T=/x/clj-run; $T -m foo", "for f in a b; do ./$f; done", "for f in tests/*.c; do /x/clj-run -m ccc.main $f -o /tmp/$f.s; done"]) assert.equal(G.bashDenial(c), null, c);
  assert.equal(G.bashDenial("T=git; $T push"), "git push");
});

test("F1: a blocking time-boxed stage never passes by time; a timebox on an approval is invalid", () => {
  assert.deepEqual(GEN.validateSpec(small([{ stage: "build", signer: "builder", evidence: ["x"] }, REVIEW, SHIP])), []);
  assert.ok(GEN.validateSpec(small([{ stage: "build", signer: "builder", evidence: ["x"] }, { stage: "approve", signer: "orderer", evidence: ["ok"], timebox: { min: 5 } }, SHIP])).some((e) => /timebox is for a review/.test(e)));
  // no report (or one with no defect line): parked, the post-check never ran, the report kept
  const POST = path.join(LIVE, "post-ran");
  for (const [label, got] of [["none", null], ["unparsed", { findings: null, report: "looked at calls; something is off" }], ["lines", "codegen: lost value -> keep rax"]]) {
    const k = company(small([{ stage: "build", signer: "builder", evidence: ["x"] }, { ...REVIEW, post: { argv: ["node", "-e", `require('fs').writeFileSync(${JSON.stringify(POST)}, 'x'); process.exit(1)`] } }, SHIP]), `blk-${label}`);
    k.rooms.timeboxFindings = () => got;
    const o = built(k);
    const m = k.mailbox.queue("role:judge", "work")[0], { run } = k.rooms.enter({ msg: m.id, role: "judge" });
    k.rooms.runs.get(run).boxUntil = k.engine.clock.now() - 0.01;
    const [x] = k.rooms.sweepTimeboxes();
    if (label === "lines") assert.deepEqual([x.signed, o.stage, o.history.at(-1).verdict], ["revise", "build", "revise"]);
    else {
      assert.deepEqual([x.signed, o.stage, o.parked.stage, o.history.at(-1).verdict], ["parked", "parked", "review", "timeboxed"], label);
      assert.equal(o.history.at(-1).report ?? null, got?.report ?? null);
      assert.ok(!o.history.some((h) => h.stage === "review" && h.verdict === "pass"));
    }
    assert.equal(fs.existsSync(POST), false, "the post-check never ran and the stage never passed");
  }
  const k = company(small([{ stage: "build", signer: "builder", evidence: ["x"] }, REVIEW, SHIP]), "blk-api");
  const o = built(k);
  assert.throws(() => k.engine.advance(o.id, { stage: "review", by: "code", verdict: "timeboxed", timeboxed: true }), /only with a revise/);
});

test("F1: report formats are read; an unparsed report is kept, not dropped", () => {
  assert.equal(timeboxLines("1. W3 structs: padding wrong -> 4-byte"), "W3 structs: padding wrong -> 4-byte");
  assert.equal(timeboxLines("- **codegen**: return value lost in nested calls; must keep rax"), "codegen: return value lost in nested calls; must keep rax");
  assert.equal(timeboxLines("codegen - return value lost => keep rax"), "codegen: return value lost -> keep rax");
  assert.equal(timeboxLines("2) lexer: `0x` not read -> hex literals"), "lexer: `0x` not read -> hex literals");
  assert.equal(timeboxLines("verdict: pass\ne1.c (calls): ok\n"), null);
  assert.deepEqual(timeboxRead("# W3\n\nsomething odd in calls\n"), { findings: null, report: "something odd in calls" });
  assert.deepEqual(timeboxRead("# W3\n\n"), { findings: null, report: null });
  // an advisory stage keeps the report in its history
  const k = company(small([{ stage: "build", signer: "builder", evidence: ["x"] }, { stage: "accept", signer: "code", evidence: [], run: { argv: ["node", "-e", "0"] } }, { ...REVIEW, stage: "eval", advisory: true }, SHIP]), "adv-report");
  k.rooms.timeboxFindings = () => ({ findings: null, report: "calls look wrong somewhere" });
  const o = built(k);
  k.engine.advance(o.id, { stage: "accept", by: "code", verdict: "pass" });
  const m = k.mailbox.queue("role:judge", "work")[0], { run } = k.rooms.enter({ msg: m.id, role: "judge" });
  k.rooms.runs.get(run).boxUntil = k.engine.clock.now() - 0.01;
  assert.equal(k.rooms.sweepTimeboxes()[0].signed, "advisory, report kept (no defect line parsed)");
  assert.equal(o.history.find((h) => h.verdict === "advisory").report, "calls look wrong somewhere");
});

test("F1: flushed late findings keep their origin; resume --to never names an advisory stage; a time-boxed item launches alone", () => {
  const ACC = { stage: "accept", signer: "code", evidence: [], run: { argv: ["node", "-e", "0"] } };
  const k = company(small([{ stage: "build", signer: "builder", evidence: ["x"] }, ACC, { ...REVIEW, stage: "eval", advisory: true }, SHIP]), "late");
  const o1 = built(k, "w1");
  k.engine.advance(o1.id, { stage: "accept", by: "code", verdict: "pass" });
  k.engine.advance(o1.id, { stage: "ship", by: "code", verdict: "pass" });
  const o2 = built(k, "w2"); // at accept (a code stage): o1's late findings are held on it
  assert.deepEqual(k.engine.lateFindings(o1, { stage: "eval", by: "judge", kind: "advisory", findings: "codegen: x -> y", afterEnd: true }), { pending: true });
  k.engine.advance(o2.id, { stage: "accept", by: "code", verdict: "pass" });
  k.engine.advance(o2.id, { stage: "ship", by: "code", verdict: "pass" });
  assert.deepEqual(k.engine.backlog.map((b) => [b.from, b.stage, b.kind]), [[o1.id, "eval", "advisory"]], "the backlog names where the findings came from");
  const o3 = built(k, "w3");
  k.engine.advance(o3.id, { stage: "accept", by: "code", verdict: "pass" });
  // parked at ship, resumed --to the advisory stage: refused
  const o4 = built(k, "w4");
  k.engine.advance(o4.id, { stage: "accept", by: "code", verdict: "pass" });
  k.engine.park(o4.id, { by: "code", reason: "test" });
  assert.throws(() => k.engine.resume(o4.id, { by: "lead", reason: "redo", to: "eval" }), /advisory stage/);
  k.engine.resume(o4.id, { by: "lead", reason: "redo", to: "accept" });
  assert.equal(o4.stage, "accept");
  // several judge items of a time-boxed stage: one launch each, capped at one item
  const p = SUP.plan(k).filter((x) => x.role === "judge");
  assert.ok(p.length >= 1 && p.every((x) => x.msgs.length === 1 && x.cap === 1), JSON.stringify(p));
});

test("F1: launch finished signs at the box only when the box is over or the launcher's cap ended it", () => {
  for (const [label, reason, shift, want] of [["crash", "agent process failed (exit 1)", 1.5, "abandoned"], ["cap", "session over 10 min", 3, "timeboxed"], ["late", "agent process failed (exit 1)", -0.1, "timeboxed"]]) {
    const live = fs.mkdtempSync(path.join(os.tmpdir(), `meta-s2rev-${label}-`));
    const f = path.join(live, "spec.json");
    fs.writeFileSync(f, JSON.stringify(small([{ stage: "build", signer: "builder", evidence: ["x"] }, { ...REVIEW, timebox: { min: 2 } }, SHIP])));
    const c = (args, env = {}) => ok(cli("meta.mjs", args, env, live));
    c(["init", `--spec-file=${f}`]);
    const O = c(["order", "new", "--by=founder", "--to=lead", "--title=t", "--task=T1", "--accept=x"]).order;
    c(["order", "delegate", O, "--by=lead", "--to=arch"], { META_ROLE: "lead" });
    const am = c(["queue", "role:arch"]).find((x) => x.order === O) ?? c(["queue", "arch"]).find((x) => x.order === O);
    const ar = c(["room", "enter", `--msg=${am.msg}`, "--role=arch"], { META_ROLE: "arch" });
    c(["room", "leave", `--run=${ar.run}`, "--evidence=x"], { META_ROLE: "arch" });
    const jm = c(["queue", "role:judge"])[0];
    const L = ok(cli("supervisor.mjs", ["launched", "--role=judge", `--msgs=${jm.msg}`], {}, live)), lid = `${String(L.seq).padStart(4, "0")}-judge`;
    const jr = c(["room", "enter", `--msg=${jm.msg}`, "--role=judge"], { META_ROLE: "judge", META_LAUNCH: lid });
    // the run's box `shift` minutes from now (the state module reads its live dir once: a child process for this one)
    const r = spawnSync("node", ["--input-type=module", "-e", `const S = await import(${JSON.stringify(path.join(HERE, "..", "state.mjs"))}); const co = S.load(); co.rooms.runs.get(${JSON.stringify(jr.run)}).boxUntil = co.engine.clock.now() + ${shift}; S.save(co);`], { env: { ...ENV, META_LIVE_DIR: live }, encoding: "utf8" });
    assert.equal(r.status, 0, r.stderr);
    const fin = c(["launch", "finished", `--launch=${lid}`, "--role=judge", "--tokens=5", "--ok=false", `--reason=${reason}`]);
    if (want === "abandoned") assert.deepEqual([fin.abandoned, fin.timeboxed ?? []], [[jr.run], []], label);
    else assert.deepEqual([fin.abandoned, fin.timeboxed], [[], [jr.run]], label);
  }
});

test("F3: only an owner of a lent module borrows; a borrowed file in its owner's commit is still the borrower's, reviewed", () => {
  const live = fs.mkdtempSync(path.join(os.tmpdir(), "meta-s2rev-borrow-"));
  const REPO = path.join(live, "repo"), ROOT = path.join(live, "wt");
  fs.mkdirSync(REPO, { recursive: true });
  sh(REPO, "init", "-q", "-b", "main"); sh(REPO, "config", "user.email", "t@example.com"); sh(REPO, "config", "user.name", "t");
  put(REPO, "src/front/lex.js", "v0\n"); put(REPO, "src/back/gen.js", "v0\n"); put(REPO, "src/core/rt.js", "v0\n");
  sh(REPO, "add", "-A"); sh(REPO, "commit", "-q", "-m", "base");
  const spec = small([{ stage: "build", signer: "builder", evidence: ["x"] }, SHIP], {
    roles: [...ROLES, { id: "fe", level: "builder", reportsTo: "lead", lane: "c", room: "bench", floor: 2, skills: ["build"], activate: "on-demand" }, { id: "be", level: "builder", reportsTo: "lead", lane: "c", room: "bench", floor: 2, skills: ["build"], activate: "on-demand" }, { id: "lead2", level: "builder", reportsTo: "lead", lane: "c", room: "bench", floor: 2, skills: ["build"] }],
    modules: { front: { paths: ["src/front/**"], owner: "fe", readers: "all" }, back: { paths: ["src/back/**"], owner: "be", readers: "all" }, core: { paths: ["src/core/**"], owner: "arch" }, evals: { paths: ["eval/**"], owner: "judge" } },
    triage: "arch", borrow: { modules: ["front", "back"] },
    workspace: { kind: "git-worktree", repo: REPO, base: sh(REPO, "rev-parse", "HEAD"), root: ROOT, run: "s2rev", commit: true },
  });
  spec.flow.stages.splice(1, 0, { stage: "eval", signer: { role: "judge" }, independent: true, evidence: ["r"] });
  assert.deepEqual(GEN.validateSpec(spec), []);
  const f = path.join(live, "spec.json"); fs.writeFileSync(f, JSON.stringify(spec));
  const c = (args, env = {}) => cli("meta.mjs", args, env, live);
  ok(c(["init", `--spec-file=${f}`]));
  const O = ok(c(["order", "new", "--by=founder", "--to=lead", "--title=W1", "--task=W1", "--accept=x"])).order;
  ok(c(["order", "delegate", O, "--by=lead", "--to=arch", "--scope=front,back"], { META_ROLE: "lead" }));
  const t = ok(cli("supervisor.mjs", ["tick"], {}, live)), WT = path.join(ROOT, "W1"), lid = {};
  for (const p of t.plan) { const L = ok(cli("supervisor.mjs", ["launched", `--role=${p.role}`, `--msgs=${p.msgs.join(",")}`], {}, live)); lid[p.role] = `${String(L.seq).padStart(4, "0")}-${p.role}`; }
  const cfg = (role) => ok(c(["launch", "config", `--role=${role}`]));
  const W = (role, file) => G.decide("Write", { file_path: path.join(WT, file) }, { roots: cfg(role).roots, cwd: WT, role });
  // the evaluator (owns evals, not lent), and arch (owns core, not lent): refused; fe (owns front, lent): a borrow
  assert.equal(W("judge", "src/back/gen.js")?.rule, "module-owner");
  assert.equal(W("arch", "src/back/gen.js")?.rule, "module-owner");
  assert.equal(W("fe", "src/back/gen.js"), null);
  assert.deepEqual(G.borrowsIn("Write", { file_path: path.join(WT, "src/back/gen.js") }, { roots: cfg("fe").roots, cwd: WT }).map((b) => b.file), ["src/back/gen.js"]);
  assert.equal(c(["guard", "borrow", "--role=judge", `--order=${O}`, "--file=src/back/gen.js"]).code, 1, "a reviewer's borrow is refused");
  assert.equal(c(["guard", "borrow", "--role=arch", `--order=${O}`, "--file=src/back/gen.js"]).code, 1, "a role with no lent module does not borrow");
  ok(c(["guard", "borrow", "--role=fe", `--order=${O}`, "--file=src/back/gen.js"]));
  put(WT, "src/back/gen.js", "fe's borrowed change\n"); put(WT, "src/back/own.js", "be's own\n");
  // be hands in first: its commit takes fe's borrowed file, recorded as fe's, and be gets the review
  const qe = (r) => ok(c(["queue", `role:${r}`])).filter((x) => x.order === O)[0] ?? ok(c(["queue", r])).filter((x) => x.order === O)[0];
  const pb = ok(c(["room", "enter", `--msg=${qe("be").msg}`, "--role=be"], { META_ROLE: "be", META_LAUNCH: lid.be }));
  ok(c(["room", "leave", `--run=${pb.run}`, "--evidence=src/back/own.js"], { META_ROLE: "be", META_LAUNCH: lid.be }));
  assert.match(sh(WT, "show", "--name-only", "--format=%s", "HEAD"), /src\/back\/gen\.js/);
  const ev = (type) => ok(c(["events", `--type=${type}`]));
  const cm = ev("commit").at(-1);
  assert.deepEqual(cm.borrowed?.map((b) => [b.from, b.owner, b.files, b.committedBy]), [["fe", "be", ["src/back/gen.js"], "be"]]);
  assert.equal(ev("ask").filter((e) => e.kind === "review-borrow").length, 1);
  const st = JSON.parse(fs.readFileSync(path.join(live, "state.json"), "utf8"));
  assert.deepEqual(st.data.borrows.map((b) => [b.role, b.file, b.state, b.committedBy]), [["fe", "src/back/gen.js", "committed", "be"]]);
});
