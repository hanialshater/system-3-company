// Tests for prototype/specs/s3c-m7.json (plan 2026-10-21-m4-m7-plan.md §M7): it validates; its lesson flow is the M6
// flow on meta/m7; the ritual flow, the ritual scheduler, the dispatch-check launch gate and the three exports are
// wired to the adapters. Then a ritual-flow dry run in a temp company repo (tests/m7-fixture.mjs): the spec with its
// paths moved into the fixture, the real kernel CLIs, the real adapters and the company's real tools, from the
// scheduler's order to the record committed on the integration branch, its company event and its board item.
// Run: node --test company/sibling/system3-meta/adapters/s3c/tests/

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { validateSpec, specFlows } from "../../../prototype/generator.mjs";
import { companyRepo, metaCli, supCli, git, run, tmp, env0, MAIN, PROTO } from "./m7-fixture.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SPEC = path.join(PROTO, "specs", "s3c-m7.json");
const M6 = path.join(PROTO, "specs", "s3c-lessons-m6.json");
const spec = () => JSON.parse(fs.readFileSync(SPEC, "utf8"));
const A = path.resolve(HERE, "..");

test("specs/s3c-m7.json validates: the M6 roles plus analytics-steward, flows lesson (M6's on meta/m7) and ritual, the scheduler, the gate, the exports", () => {
  const s = spec(), m6 = JSON.parse(fs.readFileSync(M6, "utf8"));
  assert.deepEqual(validateSpec(s), []);
  assert.equal(s.flow, undefined, "flows, not the legacy flow");
  assert.deepEqual(specFlows(s).map((f) => f.name), ["lesson", "ritual"]);
  assert.deepEqual(s.roles.map((r) => r.id).filter((r) => r !== "analytics-steward"), m6.roles.map((r) => r.id));
  assert.equal(s.roles.find((r) => r.id === "analytics-steward").level, "evaluator");
  // the lesson flow is M6's, moved to meta/m7 and its integration worktree
  assert.equal(JSON.stringify(s.flows.lesson.stages), JSON.stringify(m6.flow.stages).replaceAll("/home/user/s3c-wt/m6-int", "/home/user/s3c-wt/m7-int").replace("--into=meta/m6", "--into=meta/m7"));
  assert.ok(!JSON.stringify(s).includes("m6"), "nothing of the M6 run is named");
  assert.deepEqual([s.workspace.base, s.workspace.run, s.workspace.branch], ["meta/m7", "m7", "meta/${run}-${task}"]);
  assert.deepEqual(s.flows.ritual.stages.map((x) => [x.stage, typeof x.signer === "string" ? x.signer : x.signer.role]), [["run", "chair"], ["check", "attendee"], ["ship", "code"]]);
  assert.match(s.flows.ritual.stages[0].pre.argv.join(" "), /rituals\.mjs scaffold \$\{slug\} --repo=\$\{workdir\} --base=\$\{base_sha\}/);
  assert.match(s.flows.ritual.stages[2].run.argv.join(" "), /rituals\.mjs ship \$\{slug\} .*--from-sha=\$\{head_sha\} --into=\/home\/user\/s3c-wt\/m7-int/);
  const sc = s.schedulers[0];
  assert.deepEqual([sc.id, sc.role, sc.flow, sc.every], ["rituals", "chief-of-staff", "ritual", "tick"]);
  assert.match(sc.run.argv.join(" "), /rituals\.mjs due --repo=\/home\/user\/s3c-wt\/m7-int --roles=\S*analytics-steward\S* --skip=launch-review/);
  const g = s.launchGate;
  assert.deepEqual([g.roles, g.stages, g.notify], [["demo-builder"], ["build"], "chief-of-staff"]);
  // dispatch-check's real --source forms are batch=<file>#B<n>, SO-<lane>-<n>, mail:<id> (a reserved company mailbox
  // request) and §4:<reason>: a Meta launch is none of the first three, so it is a §4 manager run, chosen by the chief of staff
  assert.deepEqual(g.run.argv.slice(1), ["/home/user/s3c-wt/m7-int/tools/dispatch-check.mjs", "--kind=build", "--role=demo-builder", "--source=§4:manager run: ${launch}", "--chooser=chief-of-staff", "--agent=${launch}", "--running=${running}", "--builders=${builders}", "--worktree=${workdir}", "--no-claim", "--json"]);
  assert.deepEqual(s.exports.map((x) => [x.id, x.role, x.every]), [["founder-inbox", "chief-of-staff", "change"], ["events-export", "chief-of-staff", "change"], ["board-mirror", "chief-of-staff", "change"]]);
  for (const x of s.exports) assert.ok(x.run.argv.includes("--commit"), `${x.id} commits its file, so integrate.mjs finds the integration worktree clean`);
  for (const f of ["rituals.mjs", "events-export.mjs", "board-mirror.mjs"]) assert.ok(fs.existsSync(path.join(A, f)));
  // the M7 cycle pieces: the run's roles reach the record checks (a stood-in chair), the Demo Crit's acts (K23), the
  // cycle's end and handoff, the housekeeping
  const roles = sc.run.argv.find((a) => a.startsWith("--roles="));
  for (const c of [s.flows.ritual.stages[0].pre, s.flows.ritual.stages[0].post, s.flows.ritual.stages[1].post]) assert.ok(c.argv.includes(roles), c.argv.join(" "));
  assert.deepEqual(s.flows.ritual.stages[2].acts, { by: "chair", allow: ["reopen", "cancel", "notice"], notify: "chief-of-staff" });
  assert.deepEqual(s.flows.ritual.stages[2].run.pass, { json: "ok", equals: true }, "acts are read from a passing ship's last JSON line");
  assert.ok(sc.run.argv.includes("--cycle-base=auto:${live}/exports/cycle-base") && sc.run.argv.includes("--handoff-after=2"));
  assert.ok(s.flows.ritual.stages[1].pack.include.includes("company/ops/progress.md"), "the handoff's attendee reads progress.md");
  assert.deepEqual(s.flows.ritual.workspace, { maxOpen: 2, cleanup: { worktree: true } });
  assert.deepEqual(s.workspace.cleanup, { env: ["NEXT_DIST_DIR"] });
  assert.equal(s.workspace.env.NEXT_DIST_DIR, ".next-${task}");
  assert.ok(!s.exports.find((x) => x.id === "events-export").run.argv.includes("--spool"), "the hook spool is the main checkout's: off until the founder says so");
});

test("the gate's findings regex reads dispatch-check's --json refusals (its real output shape)", () => {
  const re = new RegExp(spec().launchGate.run.findings.fromStdout, "gm");
  const out = JSON.stringify({ kind: "build", ok: false, fails: ["C4 host load: 8.5 > 8 (2 x CPUs); wait for running builds to finish", "R1 ritual overdue: wbr (108 h (limit 24 h)); run it before new work"], warns: ["also due: demo-crit"] }, null, 2);
  assert.deepEqual([...out.matchAll(re)].map((m) => m[1]), ["C4 host load: 8.5 > 8 (2 x CPUs); wait for running builds to finish", "R1 ritual overdue: wbr (108 h (limit 24 h)); run it before new work"]);
});

/** The M7 spec with its paths moved into the fixture (the repo, the worktree root, the integration worktree). */
function fixtureSpec(c, wts) {
  let t = fs.readFileSync(SPEC, "utf8").replaceAll("/home/user/s3c-wt/m7-int", c.int);
  const s = JSON.parse(t);
  Object.assign(s.workspace, { repo: c.root, base: "meta/t7", root: wts, run: "t7" });
  delete s.workspace.nodeModules;
  s.flows.lesson.stages = s.flows.lesson.stages.map((x) => x.stage === "merge" ? { ...x, run: { ...x.run, argv: x.run.argv.map((a) => a.replace("--into=meta/m7", "--into=meta/t7")) } } : x);
  // two rituals keep the dry run short; the board items are tagged t7
  s.schedulers[0].run.argv = s.schedulers[0].run.argv.map((a) => a.startsWith("--skip=") ? "--skip=launch-review,ops-review,vertical-review,rnd-review,project-review" : a);
  s.exports = s.exports.filter((x) => x.id !== "founder-inbox").map((x) => ({ ...x, run: { ...x.run, argv: x.run.argv.map((a) => a === "--run=m7" ? "--run=t7" : a) } }));
  assert.deepEqual(validateSpec(s), []);
  return s;
}
const stateOf = (live) => JSON.parse(fs.readFileSync(path.join(live, "state.json"), "utf8"));
const orders = (live) => stateOf(live).engine.orders.__map.map(([, o]) => o);
const workMsg = (live, order, stage) => stateOf(live).mailbox.msgs.__map.map(([, m]) => m).find((m) => m.kind === "work" && m.state === "open" && m.ref === order && m.body.stage === stage);

test("ritual-flow dry run: the scheduler orders the DUE rituals, code scaffolds, the chair and the attendee sign through the record checks, ship commits it on the integration branch, rituals-due reads it held, the event and the board follow", () => {
  const c = companyRepo();
  fs.mkdirSync(path.join(c.root, "company/constitution"), { recursive: true });
  fs.copyFileSync(path.join(MAIN, "company/constitution/protected-paths.txt"), path.join(c.root, "company/constitution/protected-paths.txt"));
  git(c.root, "add", "-A"); git(c.root, "commit", "-qm", "protected paths"); git(c.int, "merge", "-q", "--ff-only", "main");
  const wts = tmp("s3c-m7-wts-"), live = tmp("s3c-m7-live-");
  const f = path.join(live, "spec.json"); fs.writeFileSync(f, JSON.stringify(fixtureSpec(c, wts)));
  metaCli(live, "init", `--spec-file=${f}`);
  // tick 1: the scheduler places founder-digest and wbr (the loop's order); O-1 gets its worktree and its scaffold
  let t = supCli(live, "tick");
  assert.deepEqual(orders(live).map((o) => [o.id, o.slug, o.chair, o.attendee, o.stage]), [["O-1", "founder-digest", "chief-of-staff", "head-of-product", "run"], ["O-2", "wbr", "chief-of-staff", "analytics-steward", "run"]]);
  assert.ok(t.steps.some((s) => s.step === "workspace" && s.order === "O-1"));
  t = supCli(live, "tick"); // tick 2: O-2's worktree and scaffold
  const [o1, o2] = orders(live);
  assert.ok(o1.workdir && o2.workdir && o1.prechecked && o2.prechecked, JSON.stringify(t.steps));
  const recs = fs.readdirSync(path.join(o1.workdir, "company/rituals/records")).filter((x) => x.endsWith(".md"));
  assert.equal(recs.length, 1);
  const rec = `company/rituals/records/${recs[0]}`;
  assert.match(rec, /-founder-digest\.md$/);
  // the chair: a leave with the stubs unfilled is refused by the record check; filled, it signs
  const m1 = workMsg(live, "O-1", "run");
  const e1 = metaCli(live, "room", "enter", `--msg=${m1.id}`, "--role=chief-of-staff");
  const r0 = spawnLeave(live, e1.run, rec);
  assert.notEqual(r0.status, 0);
  assert.match(r0.stdout + r0.stderr, /Decision section is empty/);
  const abs = path.join(o1.workdir, rec);
  fs.writeFileSync(abs, fs.readFileSync(abs, "utf8").replace(/## Decision\n\n<!--[^\n]*-->/, "## Decision\n\n- the M7 cycle starts: rituals first, then the five builds").replace(/## Objections\n\n<!--[^\n]*-->/, "## Objections\n\n- none raised"));
  metaCli(live, "room", "leave", `--run=${e1.run}`, `--evidence=${rec}`);
  assert.match(git(o1.workdir, "log", "-1", "--format=%s"), /^meta: O-1 run founder-digest$/, "K7 committed the chair's stage");
  // the attendee confirms
  const m2 = workMsg(live, "O-1", "check");
  assert.equal(m2.to, "role:head-of-product");
  const e2 = metaCli(live, "room", "enter", `--msg=${m2.id}`, "--role=head-of-product");
  metaCli(live, "room", "leave", `--run=${e2.run}`, `--evidence=${rec}`, "--verdict=pass");
  // ship (code): the record on the integration branch, committed alone; rituals-due reads it held
  t = supCli(live, "tick");
  assert.equal(orders(live)[0].stage, "done", JSON.stringify(t.steps));
  assert.ok(git(c.int, "log", "--format=%s").split("\n").includes("meta: founder-digest record (O-1), the ritual flow's ship (chief-of-staff code step)"));
  assert.ok(fs.existsSync(path.join(c.int, rec)));
  const due = JSON.parse(run(path.join(c.int, "tools/rituals-due.mjs"), ["--json"]).stdout);
  assert.deepEqual([due.find((x) => x.ritual === "founder-digest").due, due.find((x) => x.ritual === "founder-digest").heldBy], [false, `record ${rec}`]);
  // the exports, after that tick: the ritual is a company event; both orders are on the board, labelled in Meta's tracker
  const ev = fs.readFileSync(path.join(c.int, "company/ops/events.jsonl"), "utf8").trim().split("\n").map((l) => JSON.parse(l));
  assert.deepEqual(ev.map((e) => [e.type, e.room, e.refs[0]]), [["ritual", "lobby", rec]]);
  const board = JSON.parse(fs.readFileSync(path.join(c.int, "company/ops/board.json"), "utf8")).items.filter((i) => i.title.startsWith("[meta:t7]"));
  assert.deepEqual(board.map((i) => [/^\[meta:t7\] (O-\d+): /.exec(i.title)?.[1], i.state, i.owner]), [["O-1", "done", "chief-of-staff"], ["O-2", "doing", "chief-of-staff"]]);
  const labels = stateOf(live).data.tracker.items.__map.map(([, i]) => i).filter((i) => i.kind === "order").map((i) => [i.order, i.labels.filter((l) => l.startsWith("ext:"))]);
  assert.deepEqual(labels, [["O-1", [`ext:${board[0].id}`]], ["O-2", [`ext:${board[1].id}`]]]);
  assert.equal(git(c.int, "status", "--porcelain"), "", "every code step committed its file");
  // the scheduler again: founder-digest is held now, wbr is still open: nothing new is placed
  const sf = path.join(live, "state.json"), st = JSON.parse(fs.readFileSync(sf, "utf8")); st.data.schedulers.rituals.t = 0; fs.writeFileSync(sf, JSON.stringify(st));
  supCli(live, "tick");
  const last = stateOf(live).log.events.filter((e) => e.type === "scheduler-run").at(-1);
  assert.deepEqual([last.placed, last.skipped.map((x) => x.key)], [[], ["ritual:wbr"]]);
  assert.equal(orders(live).length, 2);
});

function spawnLeave(live, runId, evidence) {
  return spawnSync(process.execPath, [path.join(PROTO, "meta.mjs"), "room", "leave", `--run=${runId}`, `--evidence=${evidence}`], { env: env0({ META_LIVE_DIR: live }), encoding: "utf8" });
}

test("Demo Crit dry run on the spec: the chair's table, committed by ship, reopens the revised lesson's order and cancels the killed one, as the head of product (K23)", () => {
  const meta = (slug) => JSON.stringify({ slug, status: "published", claims: [] });
  const c = companyRepo({ files: { "src/demos/math/rope-a/meta.json": meta("rope-a"), "src/demos/math/rope-b/meta.json": meta("rope-b"), "company/constitution/protected-paths.txt": fs.readFileSync(path.join(MAIN, "company/constitution/protected-paths.txt"), "utf8") } });
  const wts = tmp("s3c-m7-wts-"), live = tmp("s3c-m7-live-");
  const s = fixtureSpec(c, wts);
  s.schedulers = []; // the crit is placed by hand here
  const f = path.join(live, "spec.json"); fs.writeFileSync(f, JSON.stringify(s));
  metaCli(live, "init", `--spec-file=${f}`);
  // two lesson orders of this run: rope-a shipped (done), rope-b still open
  for (const [n, slug] of [[1, "rope-a"], [2, "rope-b"]]) metaCli(live, "order", "new", "--by=chief-of-staff", "--to=cm-math", `--title=${slug}`, `--task=L-${slug}`, `--slug=${slug}`, "--accept=brief company/domains/briefs/math.geometry.md:1-2 · a lesson");
  const sf = path.join(live, "state.json"), st = JSON.parse(fs.readFileSync(sf, "utf8"));
  st.engine.orders.__map.find(([k]) => k === "O-1")[1].stage = "done";
  fs.writeFileSync(sf, JSON.stringify(st));
  metaCli(live, "order", "new", "--flow=ritual", "--by=chief-of-staff", "--chair=head-of-product", "--attendee=chief-of-staff", "--title=Demo Crit", "--task=RITUAL-demo-crit-1", "--slug=demo-crit", "--accept=hold the crit");
  supCli(live, "tick"); supCli(live, "tick");
  const o3 = orders(live).find((o) => o.id === "O-3");
  assert.ok(o3.workdir && o3.prechecked);
  const recs = fs.readdirSync(path.join(o3.workdir, "company/rituals/records")).filter((x) => x.endsWith("-demo-crit.md"));
  const rec = `company/rituals/records/${recs[0]}`, abs = path.join(o3.workdir, rec);
  fs.writeFileSync(abs, fs.readFileSync(abs, "utf8")
    .replace("| slug | decision | reason |\n|---|---|---|\n", "| slug | decision | reason |\n|---|---|---|\n| rope-a | revise | the reveal tells, not shows |\n| rope-b | kill | duplicates rope-a |\n")
    .replace(/## Objections\n\n<!--[^\n]*-->/, "## Objections\n\n- chief-of-staff: rope-b may be the better one. Answer: the learner reviews prefer rope-a's frame."));
  const e1 = metaCli(live, "room", "enter", `--msg=${workMsg(live, "O-3", "run").id}`, "--role=head-of-product");
  metaCli(live, "room", "leave", `--run=${e1.run}`, `--evidence=${rec}`);
  const e2 = metaCli(live, "room", "enter", `--msg=${workMsg(live, "O-3", "check").id}`, "--role=chief-of-staff");
  metaCli(live, "room", "leave", `--run=${e2.run}`, `--evidence=${rec}`, "--verdict=pass");
  const t = supCli(live, "tick");
  const [a, b, crit] = orders(live);
  assert.equal(crit.stage, "done", JSON.stringify(t.steps));
  assert.deepEqual([a.stage, a.loops, a.history.at(-1).by], ["build", 1, "head-of-product"], "revise → reopen");
  assert.match(a.findings, /Demo Crit: revise\. the reveal tells, not shows/);
  assert.deepEqual([b.stage, b.cancelled.by], ["cancelled", "head-of-product"], "kill → cancel");
  assert.ok(git(c.int, "log", "--format=%s").split("\n").includes("meta: demo-crit record (O-3), the ritual flow's ship (chief-of-staff code step)"));
  assert.ok(!fs.existsSync(o3.workdir), "the ritual's worktree is removed once it is done (its branch kept)");
});
