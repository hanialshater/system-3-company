// Tests for adapters/s3c/events-export.mjs (plan 2026-10-21-m4-m7-plan.md §M7 K21, and the M7 review's event units).
// Real Meta states (the prototype's CLI) are exported into a temp company repo's integration worktree with the
// company's REAL tools/events.mjs, and read back by its REAL tools/rituals-due.mjs and tools/dispatch-check.mjs
// (tests/m7-fixture.mjs). The main checkout is only read.
// Run: node --test company/sibling/system3-meta/adapters/s3c/tests/

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { companyRepo, metaState, metaCli, supCli, m7Spec, git, run, tmp, env0, PROTO } from "./m7-fixture.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ADAPTER = path.join(HERE, "..", "events-export.mjs");
const lines = (repo) => fs.readFileSync(path.join(repo, "company/ops/events.jsonl"), "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l));
const st = (live) => JSON.parse(fs.readFileSync(path.join(live, "state.json"), "utf8"));
const openItem = (live, order, stage) => st(live).mailbox.msgs.__map.map(([, x]) => x).find((x) => x.kind === "work" && x.state === "open" && x.ref === order && x.body?.stage === stage);
const metaAs = (live, launch, ...args) => {
  const r = spawnSync(process.execPath, [path.join(PROTO, "meta.mjs"), ...args], { env: env0({ META_LIVE_DIR: live, ...(launch ? { META_LAUNCH: launch } : {}) }), encoding: "utf8" });
  assert.equal(r.status, 0, `meta ${args.join(" ")}: ${r.stderr}${r.stdout}`);
  return JSON.parse(r.stdout);
};

/** Three lessons judged the way the company batches them: one fact-checker session checks all three (room next), one
 *  learner-evaluator session reviews all three, the head of product decides each in its own session; each launch is
 *  a reservation (supervisor launched) and the launcher's report (meta launch finished). One more launch lapses. */
function batchedState() {
  const live = tmp("s3c-m7-batch-");
  const f = path.join(live, "spec.json"); fs.writeFileSync(f, JSON.stringify(m7Spec()));
  metaCli(live, "init", `--spec-file=${f}`);
  const slugs = ["rope-a", "rope-b", "rope-c"];
  slugs.forEach((s, i) => {
    metaCli(live, "order", "new", "--by=chief-of-staff", "--to=cm-math", `--title=${s}`, `--task=L-${s}`, `--slug=${s}`, "--accept=brief company/domains/briefs/math.geometry.md:10-20 · a lesson");
    metaCli(live, "order", "delegate", `O-${i + 1}`, "--by=cm-math", "--to=demo-builder");
    const b = metaCli(live, "room", "enter", `--msg=${openItem(live, `O-${i + 1}`, "build").id}`, "--role=demo-builder");
    metaCli(live, "room", "leave", `--run=${b.run}`, "--evidence=src/demos/math/x/");
  });
  const session = (role, stage, extra = []) => {
    const l = supCli(live, "launched", `--role=${role}`, "--why=test");
    const id = `${String(l.seq).padStart(4, "0")}-${role}`;
    let e = metaAs(live, id, "room", "enter", `--msg=${openItem(live, "O-1", stage).id}`, `--role=${role}`);
    for (let i = 1; i <= 3; i++) {
      const args = ["--evidence=x.md", "--verdict=pass", ...extra];
      if (i < 3) { const n = metaAs(live, id, "room", "next", `--run=${e.run}`, "--cap=3", ...args); e = { run: n.next?.run ?? n.run }; assert.ok(e.run, JSON.stringify(n)); }
      else metaAs(live, id, "room", "leave", `--run=${e.run}`, ...args);
    }
    metaCli(live, "launch", "finished", `--launch=${id}`, `--role=${role}`, "--tokens=1000");
    return id;
  };
  const fc = session("fact-checker", "check");
  const le = session("learner-evaluator", "learner");
  for (const o of ["O-1", "O-2", "O-3"]) { const e = metaCli(live, "room", "enter", `--msg=${openItem(live, o, "launch").id}`, "--role=head-of-product"); metaCli(live, "room", "leave", `--run=${e.run}`, "--evidence=lr.md", "--verdict=pass"); }
  supCli(live, "tick");
  supCli(live, "launched", "--role=cm-math", "--why=never entered");
  return { live, fc, le, slugs };
}

test("event units: one review and one verify per agent session, one publish per tick, one merge per lesson; launches as dispatch and report, a lapsed one stopped", () => {
  const { live, fc, le, slugs } = batchedState();
  const c = companyRepo();
  // the lapsed reservation: its launch is older than the grace period
  const s = st(live); const L = s.log.events.findLast((e) => e.type === "launch"); L.t -= 10; fs.writeFileSync(path.join(live, "state.json"), JSON.stringify(s));
  const r = run(ADAPTER, [`--live=${live}`, `--repo=${c.int}`, "--commit"]);
  assert.equal(r.exit, 0, r.stdout + r.stderr);
  const ev = lines(c.int);
  const of = (t) => ev.filter((e) => e.type === t);
  assert.equal(of("verify").length, 1, "one fact-check session: one verify event");
  assert.deepEqual(of("verify")[0].subjects, slugs);
  assert.match(of("verify")[0].summary, /fact-check batch of 3 lesson\(s\) by fact-checker/);
  assert.equal(of("review").length, 1, "one learner session: one review event");
  assert.deepEqual([of("review")[0].room, of("review")[0].actor, of("review")[0].subjects], ["learner-review", "learner-evaluator", slugs]);
  assert.equal(of("publish").length, 1, "one tick's ships: one publish event");
  assert.deepEqual(of("publish")[0].subjects, slugs);
  assert.equal(of("merge").length, 3, "a merge per lesson merged");
  // the head of product's decisions were three sessions that never closed: they wait (the cursor keeps them)
  assert.equal(of("decision").length, 0);
  assert.equal(r.json.pending.length, 3);
  // dispatches and reports: dispatch-check's own labels and keys; the lapsed launch is stopped
  const d = of("dispatch");
  assert.deepEqual(d.map((e) => e.subjects[0]), ["fact-checker", "learner-evaluator", "cm-math"]);
  assert.equal(d[0].agent, `system3-meta fact-checker ${fc}`);
  assert.equal(d[0].source, `§4:manager run: system3-meta fact-checker ${fc}`);
  assert.deepEqual([d[0].chooser, d[0].state], ["chief-of-staff", "working"]);
  const rep = of("report");
  assert.deepEqual(rep.map((e) => [e.agent, e.key === d.find((x) => x.agent === e.agent).key, e.state]), [[`system3-meta fact-checker ${fc}`, true, "done"], [`system3-meta learner-evaluator ${le}`, true, "done"]]);
  assert.equal(of("stopped").length, 1);
  assert.match(of("stopped")[0].summary, /reservation lapsed/);
  // M7 finish review: a hand-back is in its actor's room (the company's events.mjs report/stopped: roomFor), not the
  // chief of staff's whatever the actor
  assert.deepEqual([...rep, ...of("stopped")].map((e) => [e.actor, e.room]), [["fact-checker", "fact-check"], ["learner-evaluator", "learner-review"], ["cm-math", "cm-math"]]);
  // the company's own dispatch-check reads none of them as in flight (every dispatch closed by its key)
  const dc = run(path.join(c.int, "tools/dispatch-check.mjs"), ["--kind=check", "--role=fact-checker", "--source=§4:test", "--running=0", "--builders=0", "--no-claim", "--json"], { cwd: c.int });
  const dj = JSON.parse(dc.stdout);
  assert.ok(dj.info.some((l) => /^in flight: 0 agents, 0 builders \(event log 0\/0/.test(l)), dc.stdout);
  // the company's counters: one review batch, so demo-crit (4 review batches) and design-review (2) are not due on
  // three lessons; three merges are under retro's 5
  const due = JSON.parse(run(path.join(c.int, "tools/rituals-due.mjs"), ["--json"]).stdout);
  for (const x of ["demo-crit", "design-review", "retro"]) assert.equal(due.find((y) => y.ritual === x).due, false, x);
  // refs are commit shas or record paths, never a branch name
  for (const e of ev) for (const ref of e.refs ?? []) assert.ok(!/^meta\//.test(ref), ref);
  // --flush writes the batches still open; idempotent after
  const f = run(ADAPTER, [`--live=${live}`, `--repo=${c.int}`, "--flush", "--commit"]);
  assert.equal(f.exit, 0, f.stdout);
  assert.equal(lines(c.int).filter((e) => e.type === "decision").length, 3, "three head-of-product sessions: three decisions");
  assert.equal(run(ADAPTER, [`--live=${live}`, `--repo=${c.int}`, "--flush"]).json.exported, 0);
  assert.equal(git(c.int, "status", "--porcelain"), "");
});

test("the plain fixture: merge, publish and ritual at once; the reviews when their sessions end (--flush); refs on the integration branch; ids stable without the cursor", () => {
  const LIVE = metaState();
  const c = companyRepo();
  // the record the ritual order names, committed on the integration branch (rituals.mjs ship does this)
  fs.mkdirSync(path.join(c.int, "company/rituals/records"), { recursive: true });
  fs.writeFileSync(path.join(c.int, "company/rituals/records/2026-10-22-wbr.md"), "# WBR\n");
  git(c.int, "add", "-A"); git(c.int, "commit", "-qm", "meta: wbr record (O-2)");
  const recSha = c.sha("HEAD", c.int);
  let r = run(ADAPTER, [`--live=${LIVE}`, `--repo=${c.int}`, "--commit"]);
  assert.equal(r.exit, 0, r.stdout + r.stderr);
  assert.deepEqual(lines(c.int).map((e) => e.type), ["merge", "publish", "ritual"]);
  const by = Object.fromEntries(lines(c.int).map((e) => [e.type, e]));
  assert.deepEqual([by.publish.room, by.publish.actor], ["launch-room", "release-manager"]);
  assert.deepEqual([by.merge.room, by.merge.actor], ["chief-of-staff", "chief-of-staff"]);
  assert.deepEqual([by.ritual.room, by.ritual.actor, by.ritual.subjects, by.ritual.refs], ["meeting-wbr", "chief-of-staff", ["wbr"], ["company/rituals/records/2026-10-22-wbr.md", recSha]]);
  for (const e of lines(c.int)) { assert.match(e.id, /^mt-[0-9a-f]{10}$/); assert.match(e.ts, /^\d{4}-\d{2}-\d{2}T/); assert.match(e.summary, /System 3 Meta O-\d/); }
  assert.equal(git(c.int, "log", "-1", "--format=%s"), "meta: events export (chief-of-staff code step)");
  r = run(ADAPTER, [`--live=${LIVE}`, `--repo=${c.int}`, "--flush", "--commit"]);
  assert.deepEqual(lines(c.int).map((e) => e.type), ["merge", "publish", "ritual", "verify", "review", "decision"]);
  // M7 finish review: a batch is dated by its last signature, not by when its session closed (minutes later), so the
  // lesson's verify, review and launch decision come before its publish in the company's log, and launch-review, which
  // the publish held, is not DUE again on work that was already reviewed (it was, with the close time)
  const ts = Object.fromEntries(lines(c.int).map((e) => [e.type, e.ts]));
  for (const t of ["verify", "review", "decision"]) assert.ok(ts[t] <= ts.publish, `${t} at ${ts[t]} is not after the publish at ${ts.publish}`);
  const sigs = (stage) => st(LIVE).log.events.filter((e) => e.type === "advance" && e.stage === stage).map((e) => new Date(Math.round(e.t * 60000)).toISOString());
  for (const [t, stage] of [["verify", "check"], ["review", "learner"], ["decision", "launch"]]) assert.ok(sigs(stage).includes(ts[t]), `${t} at ${ts[t]}: one of its ${stage} signatures' times (${sigs(stage)})`);
  const lr = JSON.parse(run(path.join(c.int, "tools/rituals-due.mjs"), ["--json"]).stdout).find((x) => x.ritual === "launch-review");
  assert.equal(lr.due, false, `launch-review: ${lr.reasons}`);
  // idempotent: with the cursor gone, the ids are not written twice
  fs.rmSync(path.join(LIVE, "exports", "events-export.json"));
  const third = run(ADAPTER, [`--live=${LIVE}`, `--repo=${c.int}`, "--flush", "--commit"]);
  assert.equal(third.exit, 0);
  assert.equal(third.json.exported, 6);
  assert.match(third.stdout, /already in the log/);
  assert.equal(lines(c.int).length, 6);
  assert.equal(third.json.committed, undefined, "nothing new: no commit");
});

test("--max carries the rest to the next run; --spool writes dispatches to the spool named; the main checkout or any primary checkout is refused", () => {
  const { live } = batchedState();
  const c = companyRepo();
  let r = run(ADAPTER, [`--live=${live}`, `--repo=${c.int}`, "--max=2"]);
  assert.deepEqual([r.exit, r.json.exported], [0, 2]);
  const spool = tmp("s3c-spool-");
  const sp = spawnSync(process.execPath, [ADAPTER, `--live=${live}`, `--repo=${c.int}`, "--spool"], { env: { ...env0(), S3_SPOOL: spool }, encoding: "utf8" });
  assert.equal(sp.status, 0, sp.stdout + sp.stderr);
  const total = lines(c.int).length;
  assert.ok(total > 2);
  const spooled = fs.readdirSync(spool).flatMap((f) => fs.readFileSync(path.join(spool, f), "utf8").trim().split("\n")).map((l) => JSON.parse(l));
  assert.ok(spooled.length && spooled.every((e) => ["dispatch", "report", "stopped"].includes(e.type)), "only dispatch, report and stopped go to the spool");
  r = run(ADAPTER, [`--live=${live}`, `--repo=${c.root}`]);
  assert.equal(r.exit, 2);
  assert.match(r.json.findings[0].message, /not a linked worktree/);
  r = run(ADAPTER, [`--live=${live}`, "--repo=/home/user/system-3-company"]);
  assert.equal(r.exit, 2);
  assert.match(r.json.findings[0].message, /main checkout/);
  assert.equal(run(ADAPTER, [`--live=${live}`]).exit, 2, "--repo is required");
  assert.equal(run(ADAPTER, [`--live=${live}`, `--repo=${c.int}`, "--flush=yes"]).exit, 2);
});

test("a Meta builder in flight is counted by the company's dispatch-check C1/C2 in the integration worktree (its dispatch event, subjects demo-builder)", () => {
  const live = tmp("s3c-m7-flight-");
  const f = path.join(live, "spec.json"); fs.writeFileSync(f, JSON.stringify(m7Spec()));
  metaCli(live, "init", `--spec-file=${f}`);
  supCli(live, "launched", "--role=demo-builder", "--why=a build");
  const c = companyRepo();
  const r = run(ADAPTER, [`--live=${live}`, `--repo=${c.int}`, "--commit"]);
  assert.equal(r.exit, 0, r.stdout);
  assert.deepEqual(r.json.open.length, 1, "not reported, not lapsed: open");
  const dc = run(path.join(c.int, "tools/dispatch-check.mjs"), ["--kind=check", "--role=fact-checker", "--source=§4:test", "--no-claim", "--json"], { cwd: c.int });
  const dj = JSON.parse(dc.stdout);
  assert.ok(dj.info.some((l) => /^in flight: 1 agents, 1 builders \(event log 1\/1/.test(l)), dc.stdout);
});
