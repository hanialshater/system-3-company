// F-42 mailboxes (company/decisions/2026-10-16-founder-mailbox-dispatch.md; tools/mailbox.mjs, tools/lib/mailbox.mjs).
// Every test uses its own S3_MAILBOX_DIR, S3_SLOTS_DIR and S3_EVENTS in a temp folder: nothing touches
// company/ops/mailboxes/, company/ops/slots/ or company/ops/events.jsonl. Lanes come from the real poc-map.md.
// Run: npm run test:mailbox
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFile, execFileSync } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { stubGitPath } from "../dispatch/git-stub.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const CLI = path.join(ROOT, "tools/mailbox.mjs");
const CHECK = path.join(ROOT, "tools/dispatch-check.mjs");
const STUB_PATH = stubGitPath();
const pexec = promisify(execFile);

function sandbox() {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "mailbox-"));
  const ev = path.join(d, "events.jsonl");
  fs.writeFileSync(ev, "");
  const env = { ...process.env, S3_MAILBOX_DIR: path.join(d, "mail"), S3_SLOTS_DIR: path.join(d, "slots"), S3_EVENTS: ev, PATH: STUB_PATH };
  delete env.S3_SLOTS; delete env.S3_SLOTS_S4;
  return { d, env, mail: env.S3_MAILBOX_DIR, ev };
}
function mbox(sb, args) {
  try { return { code: 0, out: execFileSync(process.execPath, [CLI, ...args], { env: sb.env, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }) }; }
  catch (e) { return { code: e.status, out: e.stdout ?? "", err: e.stderr ?? "" }; }
}
const REQ = ["--budget=200k", "--done-when=lesson built and QA green", "--stop-if=over budget"];
const request = (sb, from, role, extra = []) =>
  mbox(sb, ["send", `--from=${from}`, "--to=dispatcher", `--role=${role}`, "--kind=dispatch-request", "--project=wave-j", ...REQ, "--body=Build the brief at content/x.md", ...extra]);

test("parallel sends never collide: 40 concurrent writers, 40 distinct complete files", async () => {
  const sb = sandbox();
  const runs = Array.from({ length: 40 }, (_, i) =>
    pexec(process.execPath, [CLI, "send", "--from=design-lead", "--to=principal-pm-verticals", "--kind=question", "--project=wave-j", `--body=question ${i}`, "--json"], { env: sb.env }));
  const res = await Promise.all(runs);
  const ids = res.map((r) => JSON.parse(r.stdout).id);
  assert.equal(new Set(ids).size, 40);
  const box = path.join(sb.mail, "principal-pm-verticals");
  const files = fs.readdirSync(box).filter((f) => f.endsWith(".md"));
  assert.equal(files.length, 40);
  const bodies = new Set(files.map((f) => fs.readFileSync(path.join(box, f), "utf8").match(/question (\d+)/)[1]));
  assert.equal(bodies.size, 40, "every message is whole and none overwrote another");
  for (const f of files) assert.match(f, /^\d{8}T\d{9}Z-design-lead-[0-9a-f]{8}\.md$/);
  assert.equal(fs.readdirSync(box).filter((f) => f.startsWith(".tmp-")).length, 0, "no temp files left");
});

test("out-of-lane request refused: design-lead (lane 6) may not request backend-engineer (lane 7)", () => {
  const sb = sandbox();
  const r = request(sb, "design-lead", "backend-engineer");
  assert.equal(r.code, 1);
  assert.match(r.err, /not dispatched in lane 6/);
  assert.ok(!fs.existsSync(path.join(sb.mail, "dispatcher")), "nothing written");
  // and a parked role (2026-10-25 restructuring: no agent file) is never requested
  const r2 = request(sb, "design-lead", "cm-chemistry-energy-rates");
  assert.equal(r2.code, 1);
  // a role that is no POC requests nothing
  const r3 = request(sb, "demo-builder", "demo-builder");
  assert.equal(r3.code, 1);
  assert.match(r3.err, /not the POC of any lane/);
});

test("checker request from a production lane refused; evaluation-steward (lane 10) may request it", () => {
  const sb = sandbox();
  for (const c of ["fact-checker", "qa-tester", "learner-evaluator", "accessibility-reviewer", "pedagogy-critic"]) {
    const r = request(sb, "principal-pm-verticals", c);
    assert.equal(r.code, 1, c);
    assert.match(r.err, /only lane 10/, c);
  }
  const ok = request(sb, "evaluation-steward", "fact-checker", ["--dispatch-kind=check"]);
  assert.equal(ok.code, 0, ok.err);
});

test("release-manager and anything naming deploy refused", () => {
  const sb = sandbox();
  const r1 = request(sb, "design-lead", "release-manager");
  assert.equal(r1.code, 1);
  assert.match(r1.err, /release-manager is never requested/);
  const r2 = mbox(sb, ["send", "--from=design-lead", "--to=demo-builder", "--kind=dispatch-request", "--project=wave-j", ...REQ, "--body=Build it, then run npm run deploy"]);
  assert.equal(r2.code, 1);
  assert.match(r2.err, /deploy/);
  const r3 = request(sb, "design-lead", "demo-builder", ["--title=build and Deploy the lesson"]);
  assert.equal(r3.code, 1);
});

test("lane S: principal-pm-verticals (lane 1) may request demo-builder and category-curator, not a checker", () => {
  const sb = sandbox();
  const r = request(sb, "principal-pm-verticals", "demo-builder");
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /role demo-builder, lane 1/);
  assert.equal(request(sb, "principal-pm-verticals", "category-curator").code, 0);
  assert.equal(request(sb, "principal-pm-verticals", "qa-tester").code, 1);
  assert.equal(request(sb, "principal-pm-verticals", "demo-builder", ["--lane=6"]).code, 1, "not POC of lane 6");
});

test("drain (reserves) -> dispatch-check --run -> launched -> done round trip; drain writes no event", () => {
  const sb = sandbox();
  const s = request(sb, "principal-pm-verticals", "demo-builder", ["--title=Wave J physics slug 1", "--worktree=/tmp/x", "--json"]);
  assert.equal(s.code, 0, s.err);
  const id = JSON.parse(s.out).id;

  const chk = (role, run) => { try { return { code: 0, ...JSON.parse(execFileSync(process.execPath, [CHECK, "--kind=other", `--role=${role}`, `--source=mail:${id}`, ...(run ? [`--run=${run}`] : []), "--chooser=principal-pm-verticals", "--running=0", "--no-claim", "--json"], { env: sb.env, encoding: "utf8" })) }; } catch (e) { return { code: e.status, ...JSON.parse(e.stdout) }; } };
  // Before any drain: the request is not reserved, so dispatch-check refuses to launch it.
  assert.ok(chk("demo-builder").fails.some((f) => /M1 mailbox: .* is not reserved: run `node tools\/mailbox\.mjs drain dispatcher` first/.test(f)));
  // --peek lists it without reserving.
  const peek = JSON.parse(mbox(sb, ["drain", "dispatcher", "--peek", "--json"]).out);
  assert.equal(peek[0].status, "unreserved");
  assert.ok(!fs.existsSync(path.join(sb.mail, "dispatcher", `${id}.claimed`)), "peek writes nothing");

  const d = JSON.parse(mbox(sb, ["drain", "dispatcher", "--json"]).out);
  assert.equal(d.length, 1);
  assert.equal(d[0].id, id);
  assert.equal(d[0].ok, true);
  assert.equal(d[0].status, "reserved");
  assert.match(d[0].run, /^run-\d{8}T\d{9}Z-[0-9a-f]{6}$/);
  assert.ok(Date.parse(d[0].leaseUntil) > Date.now(), "the lease is in the future");
  assert.equal(d[0].kind, "build");
  assert.match(d[0].check, new RegExp(`--source=mail:${id} --run=${d[0].run}`));
  assert.match(d[0].launched, new RegExp(`launched ${id} --run=${d[0].run}`));
  assert.match(d[0].release, new RegExp(`release ${id} --run=${d[0].run} --reason=`));
  assert.match(d[0].label, /^\[project:wave-j\] mail demo-builder: Wave J physics slug 1 ·[0-9a-f]{4}$/);
  assert.ok(fs.existsSync(d[0].brief));
  const marker = JSON.parse(fs.readFileSync(path.join(sb.mail, "dispatcher", `${id}.claimed`), "utf8"));
  assert.deepEqual([marker.state, marker.run, marker.by], ["reserved", d[0].run, "chief-of-staff"]);
  assert.equal(fs.readFileSync(sb.ev, "utf8"), "", "the drain writes nothing to the event log");
  assert.equal(JSON.parse(mbox(sb, ["drain", "dispatcher", "--json"]).out).length, 0, "a reserved request leaves the drain");

  // dispatch-check with the mail source: M1 passes for the right role and run, fails for another role or run
  const good = chk("demo-builder", d[0].run);
  assert.ok(!good.fails.some((f) => /^M1|^S1/.test(f)), JSON.stringify(good.fails));
  assert.ok(chk("demo-builder").fails.some((f) => /M1 mailbox: .* is reserved by run .*: pass --run=/.test(f)));
  assert.ok(chk("demo-builder", "run-other").fails.some((f) => /M1 mailbox: .* reserved by run .*, not run-other/.test(f)));
  const bad = chk("interaction-designer", d[0].run);
  assert.ok(bad.fails.some((f) => /^M1 mailbox: .* requests role demo-builder/.test(f)));

  assert.equal(mbox(sb, ["launched", id, "--run=run-other"]).code, 1, "only the reserving run confirms the launch");
  const ln = mbox(sb, ["launched", id, `--run=${d[0].run}`]);
  assert.equal(ln.code, 0, ln.err);
  assert.equal(mbox(sb, ["claim", id]).code, 1, "a request is claimed once");
  assert.equal(JSON.parse(mbox(sb, ["drain", "dispatcher", "--json"]).out).length, 0, "launched requests leave the drain");
  assert.ok(chk("demo-builder", d[0].run).fails.some((f) => /M1 mailbox: .* already claimed \(launched/.test(f)), "dispatch-check refuses a second start");
  assert.equal(mbox(sb, ["release", id, `--run=${d[0].run}`, "--reason=x"]).code, 1, "a launched run is not released without --force");

  const rep = path.join(sb.d, "report.md");
  fs.writeFileSync(rep, "Built. SHA abc123. QA green.\n");
  const done = mbox(sb, ["done", id, "--report", rep]);
  assert.equal(done.code, 0, done.err);
  assert.match(done.out, /events\.mjs report/);
  assert.equal(mbox(sb, ["done", id, "--report", rep]).code, 1, "one report per request");
  const inbox = JSON.parse(mbox(sb, ["list", "principal-pm-verticals", "--unread", "--json"]).out);
  assert.equal(inbox.length, 1);
  assert.equal(inbox[0].fm.kind, "report");
  assert.equal(inbox[0].fm["in-reply-to"], id);
  assert.equal(inbox[0].fm.from, "demo-builder");
  const st = JSON.parse(mbox(sb, ["status", "--json"]).out);
  assert.deepEqual(st.find((b) => b.role === "principal-pm-verticals"), { role: "principal-pm-verticals", total: 1, unread: 1, unclaimed: 0, reportsUnread: 1 });
  assert.match(mbox(sb, ["read", inbox[0].id]).out, /QA green/);
  assert.equal(JSON.parse(mbox(sb, ["list", "principal-pm-verticals", "--unread", "--json"]).out).length, 0);
  assert.equal(fs.readFileSync(sb.ev, "utf8"), "", "no command wrote the event log");
});

test("dispatch-check M1 refuses a hand-made out-of-lane message even in warn mode", () => {
  const sb = sandbox();
  const box = path.join(sb.mail, "dispatcher");
  fs.mkdirSync(box, { recursive: true });
  const id = "20261016T120000000Z-principal-pm-verticals-deadbeef";
  fs.writeFileSync(path.join(box, `${id}.md`), "---\nid: " + id + "\nfrom: principal-pm-verticals\nto: dispatcher\nkind: dispatch-request\nrole: qa-tester\nlane: 1\nproject: catalog\n---\n\nQA my lesson\n");
  let r;
  try { r = { code: 0, ...JSON.parse(execFileSync(process.execPath, [CHECK, "--kind=check", "--role=qa-tester", `--source=mail:${id}`, "--running=0", "--json"], { env: { ...sb.env, S3_SLOTS: "warn" }, encoding: "utf8" })) }; }
  catch (e) { r = { code: e.status, ...JSON.parse(e.stdout) }; }
  assert.equal(r.code, 1);
  assert.ok(r.fails.some((f) => /M1 mailbox lane: .*only lane 10/.test(f)), JSON.stringify(r.fails));
  assert.equal(r.slot, null, "no slot claimed");
  const drained = JSON.parse(mbox(sb, ["drain", "dispatcher", "--json"]).out);
  assert.equal(drained[0].ok, false, "the drain re-checks and marks it refused");
  assert.equal(drained[0].status, "refused");
  assert.ok(!fs.existsSync(path.join(box, `${id}.claimed`)), "a refused request is never reserved");
});

// ---- reserve before launch (assessment 2026-10-17 finding 3)
const lib = () => import("../../tools/lib/mailbox.mjs");
function seed(sb, n = 1) {
  return Array.from({ length: n }, (_, i) => {
    const s = request(sb, "principal-pm-verticals", "demo-builder", [`--title=Wave J slug ${i}`, "--worktree=/tmp/x", "--json"]);
    assert.equal(s.code, 0, s.err);
    return JSON.parse(s.out).id;
  });
}

test("two concurrent drains: each request is reserved by exactly one of them", async () => {
  const sb = sandbox();
  const ids = seed(sb, 3);
  for (let round = 0; round < 3; round++) {
    const drains = await Promise.all(Array.from({ length: 2 }, () => pexec(process.execPath, [CLI, "drain", "dispatcher", "--json"], { env: sb.env })));
    const got = drains.map((r) => JSON.parse(r.stdout).filter((x) => x.status === "reserved"));
    if (round === 0) {
      const all = got.flat().map((x) => x.id).sort();
      assert.deepEqual(all, [...ids].sort(), "every request handed out once, none twice");
      const runs = new Set(got.flat().map((x) => x.run));
      assert.equal(runs.size, 3, "one run id per reservation");
      for (const x of got.flat()) assert.equal(JSON.parse(fs.readFileSync(path.join(sb.mail, "dispatcher", `${x.id}.claimed`), "utf8")).run, x.run, "the marker names the winning run");
    } else assert.equal(got.flat().length, 0, "a later drain gets nothing while the leases are live");
  }
});

test("release on launch failure: the request goes back to the drain, the reservation is kept as history", async () => {
  const sb = sandbox();
  const [id] = seed(sb);
  const d = JSON.parse(mbox(sb, ["drain", "dispatcher", "--json"]).out);
  assert.equal(mbox(sb, ["release", id, `--run=${d[0].run}`]).code, 1, "a release needs a --reason");
  assert.equal(mbox(sb, ["release", id, "--run=run-not-mine", "--reason=x"]).code, 1, "only the reserving run releases");
  const rel = mbox(sb, ["release", id, `--run=${d[0].run}`, "--reason=Agent call failed: usage limit"]);
  assert.equal(rel.code, 0, rel.err);
  const kept = JSON.parse(fs.readFileSync(path.join(sb.mail, "dispatcher", `${id}.released-${d[0].run}.json`), "utf8"));
  assert.equal(kept.reason, "Agent call failed: usage limit");
  const again = JSON.parse(mbox(sb, ["drain", "dispatcher", "--json"]).out);
  assert.equal(again.length, 1);
  assert.notEqual(again[0].run, d[0].run, "a new run id");
  assert.ok(fs.existsSync(path.join(sb.mail, "dispatcher", `${id}.md`)), "the message itself is untouched");
});

test("lease expiry: an expired reservation is reclaimable; one whose agent did start (dispatch event) is not", async () => {
  const sb = sandbox();
  process.env.S3_MAILBOX_DIR = sb.mail; process.env.S3_EVENTS = sb.ev;
  try {
    const mb = await lib();
    const [a, b] = seed(sb, 2);
    const t0 = new Date("2026-10-17T10:00:00Z");
    const first = mb.drain("dispatcher", { now: t0, leaseMs: 60_000, events: [] });
    assert.equal(first.length, 2);
    const runA = first.find((x) => x.id === a).run, runB = first.find((x) => x.id === b).run;
    // Within the lease: nothing to reclaim; dispatch-check-style state is "reserved".
    assert.equal(mb.drain("dispatcher", { now: new Date(t0.getTime() + 30_000), events: [] }).length, 0);
    // b's agent started (the hook wrote a dispatch event naming the mail source) but its launch was never confirmed.
    const ev = [{ id: "hk-1", ts: "2026-10-17T10:00:20.000Z", type: "dispatch", source: `mail:${b}`, agent: first.find((x) => x.id === b).label }];
    const t1 = new Date(t0.getTime() + 120_000);
    const later = mb.drain("dispatcher", { now: t1, leaseMs: 60_000, events: ev });
    const ra = later.find((x) => x.id === a), rb = later.find((x) => x.id === b);
    assert.equal(ra.status, "reserved", "a's lease expired with no launch evidence: reclaimed");
    assert.notEqual(ra.run, runA);
    assert.equal(ra.reclaimed, runA);
    assert.ok(fs.existsSync(path.join(sb.mail, "dispatcher", `${a}.expired-${runA}.json`)), "the expired reservation is kept");
    assert.equal(rb.status, "expired-launched", "b is reported, not re-offered");
    assert.match(rb.refused[0], new RegExp(`launched ${b} --run=${runB}`));
    // The old run can no longer confirm a, the new one can; b's original run still confirms b.
    assert.throws(() => mb.launched(a, { run: runA }), /held by run/);
    assert.equal(mb.launched(a, { run: ra.run, now: t1 }).claimed.state, "launched");
    assert.equal(mb.launched(b, { run: runB, now: t1 }).claimed.state, "launched");
    assert.equal(mb.drain("dispatcher", { now: new Date(t1.getTime() + 3.6e6), events: [] }).length, 0, "launched requests never expire");
    // Two reclaims of one expired lease: the first takes it over (rename, then O_EXCL), the second finds it held.
    const [c] = seed(sb);
    mb.drain("dispatcher", { now: t0, leaseMs: 1, events: [] });
    const r1 = mb.reserve(c, { now: t1, events: [] }), r2 = mb.reserve(c, { now: t1, events: [] });
    assert.deepEqual([r1.ok, r2.ok], [true, false]);
  } finally { delete process.env.S3_MAILBOX_DIR; delete process.env.S3_EVENTS; }
});

test("crash between reserve and launch (lease 0): dispatch-check refuses the stale run; the next drain reclaims it", () => {
  const sb = sandbox();
  const [id] = seed(sb);
  const d1 = JSON.parse(mbox(sb, ["drain", "dispatcher", "--lease=0", "--json"]).out);
  let r;
  try { r = { code: 0, ...JSON.parse(execFileSync(process.execPath, [CHECK, "--kind=other", "--role=demo-builder", `--source=mail:${id}`, `--run=${d1[0].run}`, "--running=0", "--no-claim", "--json"], { env: sb.env, encoding: "utf8" })) }; }
  catch (e) { r = { code: e.status, ...JSON.parse(e.stdout) }; }
  assert.equal(r.code, 1);
  assert.ok(r.fails.some((f) => /M1 mailbox: .* reservation \(run .*\) expired at .*: drain again/.test(f)), JSON.stringify(r.fails));
  const d2 = JSON.parse(mbox(sb, ["drain", "dispatcher", "--json"]).out);
  assert.equal(d2.length, 1);
  assert.equal(d2[0].reclaimed, d1[0].run);
});
