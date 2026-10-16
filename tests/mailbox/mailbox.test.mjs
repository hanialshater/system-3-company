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
    pexec(process.execPath, [CLI, "send", "--from=cm-physics", "--to=principal-pm-verticals", "--kind=question", "--project=wave-j", `--body=question ${i}`, "--json"], { env: sb.env }));
  const res = await Promise.all(runs);
  const ids = res.map((r) => JSON.parse(r.stdout).id);
  assert.equal(new Set(ids).size, 40);
  const box = path.join(sb.mail, "principal-pm-verticals");
  const files = fs.readdirSync(box).filter((f) => f.endsWith(".md"));
  assert.equal(files.length, 40);
  const bodies = new Set(files.map((f) => fs.readFileSync(path.join(box, f), "utf8").match(/question (\d+)/)[1]));
  assert.equal(bodies.size, 40, "every message is whole and none overwrote another");
  for (const f of files) assert.match(f, /^\d{8}T\d{9}Z-cm-physics-[0-9a-f]{8}\.md$/);
  assert.equal(fs.readdirSync(box).filter((f) => f.startsWith(".tmp-")).length, 0, "no temp files left");
});

test("out-of-lane request refused: cm-physics may not request backend-engineer (lane 7)", () => {
  const sb = sandbox();
  const r = request(sb, "cm-physics", "backend-engineer");
  assert.equal(r.code, 1);
  assert.match(r.err, /not dispatched in lane 1/);
  assert.ok(!fs.existsSync(path.join(sb.mail, "dispatcher")), "nothing written");
  // and a CM may not request another CM's strand manager
  const r2 = request(sb, "cm-physics", "cm-chemistry-energy-rates");
  assert.equal(r2.code, 1);
  // a role that is no POC requests nothing
  const r3 = request(sb, "demo-builder", "demo-builder");
  assert.equal(r3.code, 1);
  assert.match(r3.err, /not the POC of any lane/);
});

test("checker request from a CM refused; evaluation-steward (lane 10) may request it", () => {
  const sb = sandbox();
  for (const c of ["fact-checker", "qa-tester", "learner-evaluator", "accessibility-reviewer", "pedagogy-critic"]) {
    const r = request(sb, "cm-lifehacks", c);
    assert.equal(r.code, 1, c);
    assert.match(r.err, /only lane 10/, c);
  }
  const ok = request(sb, "evaluation-steward", "fact-checker", ["--dispatch-kind=check"]);
  assert.equal(ok.code, 0, ok.err);
});

test("release-manager and anything naming deploy refused", () => {
  const sb = sandbox();
  const r1 = request(sb, "cm-physics", "release-manager");
  assert.equal(r1.code, 1);
  assert.match(r1.err, /release-manager is never requested/);
  const r2 = mbox(sb, ["send", "--from=cm-physics", "--to=demo-builder", "--kind=dispatch-request", "--project=wave-j", ...REQ, "--body=Build it, then run npm run deploy"]);
  assert.equal(r2.code, 1);
  assert.match(r2.err, /deploy/);
  const r3 = request(sb, "cm-physics", "demo-builder", ["--title=build and Deploy the lesson"]);
  assert.equal(r3.code, 1);
});

test("pilot lane: principal-pm-verticals (lane 2) may request demo-builder and domain-scout, not a checker", () => {
  const sb = sandbox();
  const r = request(sb, "principal-pm-verticals", "demo-builder");
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /role demo-builder, lane 2/);
  assert.equal(request(sb, "principal-pm-verticals", "domain-scout").code, 0);
  assert.equal(request(sb, "principal-pm-verticals", "qa-tester").code, 1);
  assert.equal(request(sb, "principal-pm-verticals", "demo-builder", ["--lane=1"]).code, 1, "not POC of lane 1");
});

test("drain -> dispatch-check -> claim -> done round trip; drain writes no event", () => {
  const sb = sandbox();
  const s = request(sb, "principal-pm-verticals", "demo-builder", ["--title=Wave J physics slug 1", "--worktree=/tmp/x", "--json"]);
  assert.equal(s.code, 0, s.err);
  const id = JSON.parse(s.out).id;

  const d = JSON.parse(mbox(sb, ["drain", "dispatcher", "--json"]).out);
  assert.equal(d.length, 1);
  assert.equal(d[0].id, id);
  assert.equal(d[0].ok, true);
  assert.equal(d[0].kind, "build");
  assert.match(d[0].check, new RegExp(`--source=mail:${id}`));
  assert.match(d[0].label, /^\[project:wave-j\] mail demo-builder: Wave J physics slug 1 ·[0-9a-f]{4}$/);
  assert.ok(fs.existsSync(d[0].brief));
  assert.equal(fs.readFileSync(sb.ev, "utf8"), "", "the drain writes nothing to the event log");

  // dispatch-check with the mail source: M1 passes for the right role, fails for another role
  const chk = (role) => { try { return { code: 0, ...JSON.parse(execFileSync(process.execPath, [CHECK, "--kind=other", `--role=${role}`, `--source=mail:${id}`, "--chooser=principal-pm-verticals", "--running=0", "--no-claim", "--json"], { env: sb.env, encoding: "utf8" })) }; } catch (e) { return { code: e.status, ...JSON.parse(e.stdout) }; } };
  const good = chk("demo-builder");
  assert.ok(!good.fails.some((f) => /^M1|^S1/.test(f)), JSON.stringify(good.fails));
  const bad = chk("domain-scout");
  assert.ok(bad.fails.some((f) => /^M1 mailbox: .* requests role demo-builder/.test(f)));

  assert.equal(mbox(sb, ["claim", id, `--agent=${d[0].label}`]).code, 0);
  assert.equal(mbox(sb, ["claim", id]).code, 1, "a request is claimed once");
  assert.equal(JSON.parse(mbox(sb, ["drain", "dispatcher", "--json"]).out).length, 0, "claimed requests leave the drain");
  assert.ok(chk("demo-builder").fails.some((f) => /M1 mailbox: .* already claimed/.test(f)), "dispatch-check refuses a second start");

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
  const id = "20261016T120000000Z-cm-math-deadbeef";
  fs.writeFileSync(path.join(box, `${id}.md`), "---\nid: " + id + "\nfrom: cm-math\nto: dispatcher\nkind: dispatch-request\nrole: qa-tester\nlane: 1\nproject: catalog\n---\n\nQA my lesson\n");
  let r;
  try { r = { code: 0, ...JSON.parse(execFileSync(process.execPath, [CHECK, "--kind=check", "--role=qa-tester", `--source=mail:${id}`, "--running=0", "--json"], { env: { ...sb.env, S3_SLOTS: "warn" }, encoding: "utf8" })) }; }
  catch (e) { r = { code: e.status, ...JSON.parse(e.stdout) }; }
  assert.equal(r.code, 1);
  assert.ok(r.fails.some((f) => /M1 mailbox lane: .*only lane 10/.test(f)), JSON.stringify(r.fails));
  assert.equal(r.slot, null, "no slot claimed");
  const drained = JSON.parse(mbox(sb, ["drain", "dispatcher", "--json"]).out);
  assert.equal(drained[0].ok, false, "the drain re-checks and marks it refused");
});
