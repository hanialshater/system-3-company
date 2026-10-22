import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// M7 exit criteria 5 and 6, the kernel's part (adapters/s3c/tests/rituals.test.mjs runs the company's side):
//   K23  a code stage's acts: a Demo Crit's ship returns {acts: [...]} and code reopens, cancels or notices other
//        orders as the ritual's chair, under the tick's lock (acts.mjs), with the authority checked
//   end  a scheduler whose run says `end` (the cycle's handoff is committed) is not run again, and serve can settle
const HERE = path.dirname(new URL(import.meta.url).pathname);
const G = await import("../generator.mjs");
const exec = (dir, file, args, env = {}) => {
  const e = { ...process.env, META_LIVE_DIR: dir, ...env }; delete e.NODE_TEST_CONTEXT; delete e.META_ROLE; delete e.META_STATE;
  const r = spawnSync("node", [file, ...args], { env: e, encoding: "utf8", timeout: 60_000 });
  let out = null; try { out = JSON.parse(r.stdout); } catch {}
  return { code: r.status, out, err: r.stderr, stdout: r.stdout };
};
const meta = (dir, ...args) => exec(dir, path.join(HERE, "..", "meta.mjs"), args);
const sup = (dir, ...args) => exec(dir, path.join(HERE, "..", "supervisor.mjs"), args);
const ok = (r) => { assert.equal(r.code, 0, r.err || r.stdout); return r.out; };
const state = (dir) => JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"));
const setState = (dir, fn) => { const f = path.join(dir, "state.json"); const s = JSON.parse(fs.readFileSync(f, "utf8")); fn(s); fs.writeFileSync(f, JSON.stringify(s)); };
const events = (dir, type) => state(dir).log.events.filter((e) => e.type === type);
const orderOf = (dir, id) => state(dir).engine.orders.__map.find(([k]) => k === id)[1];
const work = (dir) => state(dir).mailbox.msgs.__map.map(([, m]) => m).filter((m) => m.kind === "work");
const notices = (dir) => state(dir).mailbox.msgs.__map.map(([, m]) => m).filter((m) => m.kind === "notice");
const fresh = (p) => fs.mkdtempSync(path.join(os.tmpdir(), `meta-m7-${p}-`));
const okCmd = { argv: ["node", "-e", "process.exit(0)"], cwd: "${live}" };

function spec(shipRun, acts = { by: "chair", allow: ["reopen", "cancel", "notice"], notify: "chief-of-staff" }, extra = {}) {
  return {
    name: "m7acts",
    rooms: [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "office", floor: 1, kind: "office" }, { id: "studio", floor: 2, kind: "lane", lane: "a" }, { id: "quality", floor: 3, kind: "quality" }, { id: "launch", floor: 3, kind: "launch" }],
    skills: ["manage", "build"],
    roles: [
      { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
      { id: "chief-of-staff", level: "chief-of-staff", reportsTo: "founder", room: "office", floor: 1 },
      { id: "head-of-product", level: "vp", reportsTo: "chief-of-staff", room: "launch", floor: 3 },
      { id: "other-vp", level: "vp", reportsTo: "chief-of-staff", room: "launch", floor: 3 },
      { id: "mgr", level: "manager", reportsTo: "head-of-product", lane: "a", room: "studio", floor: 2 },
      { id: "builder", level: "builder", reportsTo: "mgr", lane: "a", room: "studio", floor: 2 },
      { id: "checker", level: "checker", reportsTo: "chief-of-staff", room: "quality", floor: 3 },
      { id: "release", level: "release", reportsTo: "chief-of-staff", room: "launch", floor: 3 },
    ],
    flows: {
      lesson: { stages: [{ stage: "build", signer: "builder", evidence: ["work"] }, { stage: "check", signer: "checker", evidence: ["notes"] }, { stage: "ship", signer: "release", evidence: ["shipped"], run: okCmd }] },
      ritual: { stages: [{ stage: "run", signer: "chair", evidence: ["records/<ritual>.md"] }, { stage: "check", signer: "attendee", evidence: ["records/<ritual>.md"] }, { stage: "ship", signer: "code", evidence: [], run: shipRun, ...(acts ? { acts } : {}) }] },
    },
    ...extra,
  };
}
function init(s) {
  const dir = fresh("co");
  const f = path.join(dir, "spec.json"); fs.writeFileSync(f, JSON.stringify(s));
  ok(meta(dir, "init", `--spec-file=${f}`));
  return dir;
}
const leave = (dir, order, stage, role, extra = []) => {
  const m = work(dir).find((x) => x.ref === order && x.state === "open" && x.body.stage === stage);
  assert.ok(m, `no open ${stage} item of ${order}`);
  const e = ok(meta(dir, "room", "enter", `--msg=${m.id}`, `--role=${role}`));
  return ok(meta(dir, "room", "leave", `--run=${e.run}`, "--evidence=e", ...extra));
};
const lesson = (dir, slug, n) => { const r = ok(meta(dir, "order", "new", "--by=chief-of-staff", "--to=mgr", `--title=${slug}`, `--task=L-${n}`, `--slug=${slug}`, "--accept=a lesson")); ok(meta(dir, "order", "delegate", r.order, "--by=mgr", "--to=builder")); return r.order; };
const crit = (dir, chair = "head-of-product") => ok(meta(dir, "order", "new", "--flow=ritual", "--by=chief-of-staff", `--chair=${chair}`, "--attendee=chief-of-staff", "--title=Demo Crit", "--task=RITUAL-demo-crit-1", "--slug=demo-crit", "--accept=hold the crit")).order;

test("K23: validation: acts are for a sync code stage, by the chair (in a chair flow) or a role, allowing reopen, cancel and notice", () => {
  assert.deepEqual(G.validateSpec(spec(okCmd)), []);
  const v = (mut) => { const s = spec(okCmd); mut(s); return G.validateSpec(s).join("\n"); };
  assert.match(v((s) => { s.flows.ritual.stages[2].acts.allow = ["delete"]; }), /acts.allow is a list of reopen, cancel, notice/);
  assert.match(v((s) => { s.flows.ritual.stages[2].acts.by = "nobody"; }), /acts.by is "chair" or an agent role/);
  assert.match(v((s) => { s.flows.ritual.stages[2].acts.extra = 1; }), /acts has unknown key extra/);
  assert.match(v((s) => { s.flows.ritual.stages[1].acts = { by: "chair", allow: ["notice"] }; }), /stage check: acts are for a code stage with a sync run/);
  assert.match(v((s) => { s.flows.lesson.stages[2] = { stage: "ship", signer: "code", evidence: [], run: okCmd, acts: { by: "chair", allow: ["notice"] } }; }), /acts.by "chair" is for a chair flow/);
});

test("K23: a Demo Crit's ship: revise reopens the shipped lesson, kill cancels the open one, as the chair; refusals and what code cannot map are notices to the chief of staff", () => {
  const dir0 = fresh("acts");
  const out = path.join(dir0, "acts.json");
  const prog = path.join(dir0, "ship.mjs");
  fs.writeFileSync(prog, `import fs from "node:fs"; console.log(JSON.stringify({ ok: true, acts: JSON.parse(fs.readFileSync(${JSON.stringify(out)}, "utf8")) }));\n`);
  const dir = init(spec({ argv: ["node", prog], pass: { json: "ok", equals: true }, errorExit: [2, 3], cwd: "${live}" }));
  const a = lesson(dir, "rope-lesson", 1), b = lesson(dir, "kill-me", 2), c = lesson(dir, "still-open", 3);
  for (const st of [["build", "builder"], ["check", "checker"]]) leave(dir, a, st[0], st[1], st[0] === "check" ? ["--verdict=pass"] : []);
  ok(sup(dir, "tick")); // ship (release) and done
  assert.equal(orderOf(dir, a).stage, "done");
  leave(dir, b, "build", "builder");
  const cr = crit(dir);
  fs.writeFileSync(out, JSON.stringify([
    { act: "reopen", slug: "rope-lesson", findings: "the reveal tells, not shows" },
    { act: "cancel", slug: "kill-me", reason: "duplicates an existing lesson" },
    { act: "reopen", slug: "still-open", findings: "x" }, // open: judged by its own stages, refused
    { act: "reopen", slug: "published-before-this-run", findings: "y" }, // no order in this run
    { act: "notice", text: "published-before-this-run: revise carried (no order of it in this run)" },
    { act: "delete", order: c },
  ]));
  leave(dir, cr, "run", "head-of-product");
  leave(dir, cr, "check", "chief-of-staff", ["--verdict=pass"]);
  const t = ok(sup(dir, "tick"));
  assert.equal(orderOf(dir, cr).stage, "done");
  const A = orderOf(dir, a), B = orderOf(dir, b), C = orderOf(dir, c);
  assert.deepEqual([A.stage, A.loops], ["build", 1], "revise → reopen: back to build, a loop spent");
  assert.match(A.findings, /the reveal tells, not shows \(demo-crit, O-4 ship\)/);
  assert.equal(A.history.at(-1).by, "head-of-product");
  assert.deepEqual([B.stage, B.cancelled.by], ["cancelled", "head-of-product"], "kill → cancel");
  assert.equal(C.stage, "build", "the open one is untouched");
  const acts = events(dir, "act"), refused = events(dir, "act-refused");
  assert.deepEqual(acts.map((e) => [e.act, e.target ?? null, e.by]), [["reopen", a, "head-of-product"], ["cancel", b, "head-of-product"], ["notice", null, "head-of-product"]]);
  assert.equal(refused.length, 3);
  assert.match(refused[0].why, new RegExp(`^${c} is at build: only a shipped order is reopened`));
  assert.match(refused[1].why, /^no order of slug published-before-this-run in this run/);
  assert.match(refused[2].why, /^an act is one of reopen, cancel, notice/);
  const n = notices(dir).filter((m) => m.to === "chief-of-staff");
  assert.equal(n.length, 4, "three refusals and one notice, each in the chief of staff's mailbox");
  assert.ok(n.some((m) => /revise carried/.test(m.body.text)));
  assert.ok(t.steps.some((s) => s.step === "act" && s.order === a && s.result === "reopen"));
  // the reopened lesson's work is queued for its builder again
  assert.ok(work(dir).some((m) => m.ref === a && m.state === "open" && m.body.stage === "build"));
});

test("K23: authority: a chair who is not over the lesson's manager is refused; a failed ship applies nothing", () => {
  const dir0 = fresh("acts2");
  const out = path.join(dir0, "r.json");
  const prog = path.join(dir0, "ship.mjs");
  fs.writeFileSync(prog, `import fs from "node:fs"; const x = JSON.parse(fs.readFileSync(${JSON.stringify(out)}, "utf8")); console.log(JSON.stringify({ ok: x.ok, acts: x.acts })); process.exit(x.ok ? 0 : 1);\n`);
  const dir = init(spec({ argv: ["node", prog], pass: { json: "ok", equals: true }, errorExit: [2, 3], cwd: "${live}" }));
  const a = lesson(dir, "a-lesson", 1);
  leave(dir, a, "build", "builder");
  // other-vp is not in mgr's chain (mgr reports to head-of-product)
  const cr = crit(dir, "other-vp");
  fs.writeFileSync(out, JSON.stringify({ ok: true, acts: [{ act: "cancel", slug: "a-lesson", reason: "kill" }] }));
  leave(dir, cr, "run", "other-vp");
  leave(dir, cr, "check", "chief-of-staff", ["--verdict=pass"]);
  ok(sup(dir, "tick"));
  assert.equal(orderOf(dir, a).stage, "check");
  assert.match(events(dir, "act-refused")[0].why, /other-vp has no authority over O-1/);
  // a ship that fails (revise) applies nothing
  const cr2 = ok(meta(dir, "order", "new", "--flow=ritual", "--by=chief-of-staff", "--chair=head-of-product", "--attendee=chief-of-staff", "--title=Crit 2", "--task=RITUAL-demo-crit-2", "--slug=demo-crit", "--accept=x")).order;
  fs.writeFileSync(out, JSON.stringify({ ok: false, acts: [{ act: "cancel", slug: "a-lesson", reason: "kill" }] }));
  leave(dir, cr2, "run", "head-of-product");
  leave(dir, cr2, "check", "chief-of-staff", ["--verdict=pass"]);
  ok(sup(dir, "tick"));
  assert.equal(orderOf(dir, cr2).stage, "run", "the ship revised back to run");
  assert.equal(orderOf(dir, a).stage, "check");
  assert.equal(events(dir, "act").length, 0);
});

test("end: a scheduler whose run says end is not run again; serve settles once the work is done", () => {
  const dir0 = fresh("end");
  const out = path.join(dir0, "due.json");
  const prog = path.join(dir0, "due.mjs");
  fs.writeFileSync(prog, `import fs from "node:fs"; console.log(JSON.stringify({ ok: true, ...JSON.parse(fs.readFileSync(${JSON.stringify(out)}, "utf8")) }));\n`);
  const sched = { id: "rituals", role: "chief-of-staff", flow: "ritual", every: "tick", minIntervalMin: 0.5, run: { argv: ["node", prog], pass: { json: "ok", equals: true }, errorExit: [2, 3] } };
  const dir = init(spec(okCmd, null, { schedulers: [sched] }));
  fs.writeFileSync(out, JSON.stringify({ orders: [] }));
  ok(sup(dir, "tick"));
  assert.equal(state(dir).data.schedulers.rituals.ended, undefined);
  setState(dir, (s) => { s.data.schedulers.rituals.t = 0; });
  fs.writeFileSync(out, JSON.stringify({ orders: [], end: "handoff committed: the cycle is over" }));
  ok(sup(dir, "tick"));
  assert.equal(events(dir, "scheduler-end").length, 1);
  assert.equal(state(dir).data.schedulers.rituals.ended.why, "handoff committed: the cycle is over");
  setState(dir, (s) => { s.data.schedulers.rituals.t = 0; });
  fs.writeFileSync(out, JSON.stringify({ orders: [{ key: "ritual:wbr", title: "w", task: "RITUAL-wbr-9", slug: "wbr", chair: "chief-of-staff", attendee: "head-of-product", accept: "a" }] }));
  ok(sup(dir, "tick"));
  assert.equal(events(dir, "scheduler-run").length, 2, "an ended scheduler is not run again");
  assert.equal(state(dir).engine.orders.__map.length, 0);
  // serve: nothing open and every scheduler ended: done after its idle time
  const r = exec(dir, path.join(HERE, "..", "supervisor.mjs"), ["serve", "--idle-min=0", "--max-min=1"]);
  assert.equal(r.code, 0, r.err);
  assert.match(r.stdout, /"event":"done"/);
});

test("K23, M7 finish review: a `judged` revise sends a lesson still in review back to build (its open check item withdrawn, a loop spent); a judged kill or revise of one still at build is refused", () => {
  const dir0 = fresh("acts-j");
  const out = path.join(dir0, "acts.json");
  const prog = path.join(dir0, "ship.mjs");
  fs.writeFileSync(prog, `import fs from "node:fs"; console.log(JSON.stringify({ ok: true, acts: JSON.parse(fs.readFileSync(${JSON.stringify(out)}, "utf8")) }));\n`);
  const dir = init(spec({ argv: ["node", prog], pass: { json: "ok", equals: true }, errorExit: [2, 3], cwd: "${live}" }));
  const inReview = lesson(dir, "in-review", 1), atBuild = lesson(dir, "at-build", 2), killBuild = lesson(dir, "kill-build", 3), killReview = lesson(dir, "kill-review", 4);
  leave(dir, inReview, "build", "builder"); leave(dir, killReview, "build", "builder");
  // the checker is in the middle of checking in-review when the crit's table lands
  const m = work(dir).find((x) => x.ref === inReview && x.state === "open" && x.body.stage === "check");
  const running = ok(meta(dir, "room", "enter", `--msg=${m.id}`, "--role=checker"));
  const cr = crit(dir);
  fs.writeFileSync(out, JSON.stringify([
    { act: "reopen", slug: "in-review", flow: "lesson", judged: true, findings: "Demo Crit: revise. the frame is cut" },
    { act: "reopen", slug: "at-build", flow: "lesson", judged: true, findings: "Demo Crit: revise. x" },
    { act: "cancel", slug: "kill-build", flow: "lesson", judged: true, reason: "Demo Crit: kill. y" },
    { act: "cancel", slug: "kill-review", flow: "lesson", judged: true, reason: "Demo Crit: kill. z" },
  ]));
  leave(dir, cr, "run", "head-of-product");
  leave(dir, cr, "check", "chief-of-staff", ["--verdict=pass"]);
  ok(sup(dir, "tick"));
  assert.equal(orderOf(dir, cr).stage, "done");
  const R = orderOf(dir, inReview);
  assert.deepEqual([R.stage, R.loops, R.history.at(-1).stage, R.history.at(-1).verdict, R.history.at(-1).by], ["build", 1, "check", "revise", "head-of-product"]);
  assert.match(R.findings, /the frame is cut \(demo-crit, O-5 ship\)/);
  assert.ok(!work(dir).some((x) => x.ref === inReview && x.state === "open" && x.body.stage === "check"), "its check item left the queue");
  assert.ok(work(dir).some((x) => x.ref === inReview && x.state === "open" && x.body.stage === "build"), "its builder has it again");
  assert.equal(state(dir).rooms.runs.__map.find(([k]) => k === running.run)[1].state, "abandoned", "the checker's run on the old version is abandoned");
  assert.deepEqual([orderOf(dir, atBuild).stage, orderOf(dir, killBuild).stage, orderOf(dir, killReview).stage], ["build", "build", "cancelled"]);
  const refused = events(dir, "act-refused");
  assert.deepEqual(refused.map((e) => e.target), [atBuild, killBuild]);
  for (const e of refused) assert.match(e.why, /is at build: its work has not been shown/);
  assert.deepEqual(events(dir, "act").map((e) => [e.act, e.target, e.by]), [["reopen", inReview, "head-of-product"], ["cancel", killReview, "head-of-product"]]);
});
