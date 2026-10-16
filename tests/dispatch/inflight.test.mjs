// r5-tools B2: in-flight matching by run key, "possibly finished" listing, hook-liveness line.
// Every test uses a temp log (S3_EVENTS), a temp spool (S3_SPOOL) and a temp slots dir (S3_SLOTS_DIR); none touches
// company/ops/events.jsonl or the real spool. Record: company/engineering/readiness/2026-10-16-inflight-key-match.md.
// Run: npm run test:dispatch
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { batchKeyOf, possiblyFinished, replay, sameBatch } from "../../tools/lib/inflight.mjs";
import { selectBackfill } from "../../tools/events.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const EVENTS_CLI = path.join(ROOT, "tools/events.mjs");
const CHECK = path.join(ROOT, "tools/dispatch-check.mjs");
const REAL_LOG = path.join(ROOT, "company/ops/events.jsonl");
const realSize = () => (fs.existsSync(REAL_LOG) ? fs.statSync(REAL_LOG).size : -1);

function sandbox(events = []) {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "inflight-"));
  const sb = { dir: d, events: path.join(d, "events.jsonl"), spool: path.join(d, "spool"), slots: path.join(d, "slots") };
  fs.writeFileSync(sb.events, events.map((e) => JSON.stringify(e)).join("\n") + (events.length ? "\n" : ""));
  return sb;
}
const env = (sb) => ({ ...process.env, S3_EVENTS: sb.events, S3_SPOOL: sb.spool, S3_SLOTS_DIR: sb.slots, S3_SLOTS: "warn" });
const ago = (h) => new Date(Date.now() - h * 3.6e6).toISOString();
const read = (f) => fs.readFileSync(f, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));

// The 13:08Z shape: the backfill's tx- dispatch (label with ·xxxx, the prompt names the batch item) and the chief of
// staff's hand report under another label whose summary names the same item.
const txDispatch = (over = {}) => ({
  id: "tx-aaaa000001", ts: ago(3), type: "dispatch", room: "tools", actor: "chief-of-staff",
  agent: "[project:maintenance] Tools r3 B1: guard fixes ·af1d", subjects: ["tools-lead"],
  summary: "Dispatch tools-lead: [project:maintenance] Tools r3 B1: guard fixes",
  body: "Your brief is batch=company/ops/dispatch-requests/2026-10-16-r3-tools.md#B1 (your own lane's item).", ...over,
});

test("batch keys: the short …r3-tools.md form names the same item; another item or file does not", () => {
  const full = batchKeyOf("x batch=company/ops/dispatch-requests/2026-10-16-r3-tools.md#B1 y");
  assert.equal(full, "batch:2026-10-16-r3-tools.md#B1");
  assert.ok(sameBatch(full, batchKeyOf("batch=…r3-tools.md#B1")));
  assert.ok(!sameBatch(full, batchKeyOf("batch=…r3-tools.md#B2")));
  assert.ok(!sameBatch(full, batchKeyOf("batch=…r5-tools.md#B1")));
  assert.ok(!sameBatch(full, batchKeyOf("batch=…tools.md#B1")), "a bare word with no '-' never matches by suffix");
});

test("a tx- dispatch is closed by an ev- report with a different label and the same batch= key (CLI)", () => {
  const before = realSize();
  const sb = sandbox([txDispatch()]);
  const r = spawnSync("node", [EVENTS_CLI, "report", "--agent=tools-lead: guard fixes r3 B1", "--actor=tools-lead", "--summary=batch=…r3-tools.md#B1 done: f0651da"], { env: env(sb), encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stderr, /closes \[project:maintenance\] Tools r3 B1: guard fixes ·af1d .*by batch/);
  const evs = read(sb.events);
  assert.equal(evs.length, 2);
  assert.equal(evs[1].type, "report");
  assert.equal(evs[1].state, "done");
  assert.equal(evs[1].room, "tools", "room from the actor");
  const flight = replay(evs);
  assert.equal(flight.open.length, 0);
  assert.equal(flight.closes[0].rule, "batch");
  // The old rule (one map keyed by label) would have left it open:
  const old = new Map();
  for (const e of evs) if (e.type === "dispatch") old.set(e.agent, e); else old.delete(e.agent);
  assert.equal(old.size, 1);
  assert.equal(realSize(), before, "the real log is untouched");
});

// PE-ops C1 changed this case: a hand dispatch and its tx- twin are two runs carrying one batch item, so the
// batch-only report no longer closes the twin. It stays counted and is listed as possibly finished, with the report.
test("a hand twin: the report naming the item only through its hand label closes nothing by batch; the tx- twin stays counted, the report is held as evidence", () => {
  const hand = { id: "ev-hand000001", ts: ago(3), type: "dispatch", room: "app-team", actor: "chief-of-staff", agent: "backend-engineer: beacon allow-list", summary: "batch=company/initiatives/first-light/dispatch/2026-10-16-round-2.md#B2 build" };
  const tx = txDispatch({ id: "tx-bbbb000002", agent: "[project:first-light] Backend: beacon allow-list C1/C2 ·9fd2", body: "batch=company/initiatives/first-light/dispatch/2026-10-16-round-2.md#B2" });
  const closeHand = { id: "ev-c1", ts: ago(2.5), type: "report", actor: "chief-of-staff", agent: "backend-engineer: beacon allow-list", summary: "label closed" };
  const real = { id: "ev-c2", ts: ago(2), type: "report", actor: "backend-engineer", agent: "backend-engineer: beacon allow-list", summary: "FL r2#B2 done (7e5207f)" };
  const flight = replay([hand, tx, closeHand, real]);
  assert.deepEqual(flight.open.map((r) => r.label), [tx.agent], "the tx- twin is still counted");
  assert.deepEqual(flight.closes.map((c) => c.rule), ["label"]);
  assert.deepEqual(flight.held.map((h) => h.event.id), ["ev-c2"]);
  const [p] = possiblyFinished(flight.open, { held: flight.held });
  assert.equal(p.run.label, tx.agent);
  assert.equal(p.heldReport.id, "ev-c2");
  assert.equal(p.heldReport.runs.length, 2);
});

// PE-ops C1 fixture (2026-10-16-inflight-key-match-approval.md ruling 1): two live runs of one batch item, X ·1111 and
// Y ·2222. Y finishes and is reported twice: a hand report whose summary names the batch item, and Y's own tx- report
// (key). In either order X, still working, must stay counted.
test("PE-ops C1: two live runs of one batch item, the finished one reported twice (both orders): the still-working run stays open", () => {
  const B = "batch=company/ops/dispatch-requests/2026-10-16-r5-tools.md#B2";
  const X = { id: "tx-x", ts: ago(3), type: "dispatch", room: "tools", actor: "chief-of-staff", agent: "[project:maintenance] Tools r5 B2 ·1111", key: "toolu_X", summary: "Dispatch tools-lead", body: `Your brief is ${B}.` };
  const Y = { ...X, id: "tx-y", ts: ago(2.9), agent: "[project:maintenance] Tools r5 B2 ·2222", key: "toolu_Y" };
  const hand = (ts) => ({ id: "ev-hand", ts, type: "report", actor: "tools-lead", agent: "tools-lead: r5 B2", summary: `${B} done (abc1234)` });
  const own = (ts) => ({ id: "tx-y-report", ts, type: "report", actor: "tools-lead", agent: Y.agent, key: "toolu_Y", summary: "done" });
  for (const [name, evs] of [["hand first", [X, Y, hand(ago(1)), own(ago(0.9))]], ["tx- report first", [X, Y, own(ago(1)), hand(ago(0.9))]]]) {
    const f = replay(evs);
    assert.deepEqual(f.open.map((r) => r.label), [X.agent], `${name}: X stays open`);
    assert.deepEqual(f.closes.map((c) => [c.run.label, c.rule]), [[Y.agent, "key"]], `${name}: only Y closes, by key`);
    assert.deepEqual(f.unmatched.map((e) => e.id), ["ev-hand"], `${name}: the hand report is unmatched`);
    assert.equal(f.held.length, 1, name);
    assert.equal(f.match(hand(ago(0.5))), null, `${name}: a third report by batch would close nothing either`);
  }
  // With exactly one carrier of the item (the 9-of-11 backfill-gap shape), the batch rule still closes it.
  assert.equal(replay([X, hand(ago(1))]).closes[0]?.rule, "batch");
  // A closed carrier still counts: after X is closed by key, a rerun Z of the item is not closed by a batch-only report.
  const Z = { ...X, id: "tx-z", ts: ago(0.8), agent: "[project:maintenance] Tools r5 B2 ·3333", key: "toolu_Z" };
  const xr = { id: "tx-x-report", ts: ago(0.9), type: "report", actor: "tools-lead", agent: X.agent, key: "toolu_X", summary: "done" };
  assert.deepEqual(replay([X, xr, Z, hand(ago(0.5))]).open.map((r) => r.label), [Z.agent]);
});

test("--key with the tool-use id or the ·xxxx suffix closes that dispatch; the backfill's key field joins its report", () => {
  const d = txDispatch({ key: "toolu_01ABC" });
  assert.equal(replay([d, { id: "r1", ts: ago(1), type: "stopped", actor: "chief-of-staff", agent: "anything", key: "toolu_01ABC", summary: "x" }]).open.length, 0);
  assert.equal(replay([d, { id: "r2", ts: ago(1), type: "stopped", actor: "chief-of-staff", agent: "anything", key: "af1d", summary: "x" }]).open.length, 0);
  // A report's OWN label suffix is never a key by itself: 4 hex digits collide between runs.
  assert.equal(replay([d, { id: "r3", ts: ago(1), type: "report", actor: "x", agent: "Some other run ·af1d", summary: "x" }]).open.length, 1);
});

test("a report with no match warns, names the nearest open dispatch, is written, and keeps the dispatch open", () => {
  const sb = sandbox([txDispatch({ body: "no batch reference here" })]);
  const r = spawnSync("node", [EVENTS_CLI, "report", "--agent=tools-lead: guard fixes", "--actor=tools-lead", "--summary=done: f0651da"], { env: env(sb), encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stderr, /WARNING: report --agent="tools-lead: guard fixes" matches no open dispatch/);
  assert.match(r.stderr, /nearest open dispatches[\s\S]*"\[project:maintenance\] Tools r3 B1: guard fixes ·af1d"[\s\S]*--key="af1d"/);
  const evs = read(sb.events);
  assert.equal(evs.length, 2, "the report is still written");
  assert.equal(replay(evs).open.length, 1, "and the dispatch stays open");
});

test("two SendMessage continuations under one label stay one run (as before)", () => {
  const d = txDispatch();
  const msg = { ...d, id: "tx-msg", ts: ago(2), summary: "Message to …", body: "continue" };
  assert.equal(replay([d, msg]).open.length, 1);
});

test("possiblyFinished: > 2 h, no slot, no spool activity is listed with its stopped command; a slot or spool event hides it", () => {
  const d = txDispatch();
  const f = replay([d]);
  const listed = possiblyFinished(f.open, {});
  assert.equal(listed.length, 1);
  assert.match(listed[0].command, /^node tools\/events\.mjs stopped --agent="\[project:maintenance\] Tools r3 B1: guard fixes ·af1d" --key="af1d" --actor=chief-of-staff/);
  assert.equal(possiblyFinished(f.open, { slotsLive: [{ agent: "[project:maintenance] Tools r3 B1: guard fixes", source: "batch=company/ops/dispatch-requests/2026-10-16-r3-tools.md#B1" }] }).length, 0);
  assert.equal(possiblyFinished(f.open, { spoolEvents: [{ id: "hk-x", ts: ago(0.1), type: "note", agent: d.agent }] }).length, 0);
  assert.equal(possiblyFinished(replay([txDispatch({ ts: ago(1) })]).open, {}).length, 0, "1 h old: not listed");
});

test("dispatch-check: the > 2 h run is listed as possibly finished and STILL counted; no-hk- warning without hook events", () => {
  const sb = sandbox([txDispatch()]);
  const r = spawnSync("node", [CHECK, "--kind=other", "--running=0", "--no-claim"], { env: env(sb), encoding: "utf8" });
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /in flight: 1 agents/, "listing does not drop it from the count");
  assert.match(r.stdout, /possibly finished: \[project:maintenance\] Tools r3 B1: guard fixes ·af1d \(3\.0 h\)/);
  assert.match(r.stdout, /node tools\/events\.mjs stopped --agent="\[project:maintenance\] Tools r3 B1: guard fixes ·af1d" --key="af1d"/);
  assert.match(r.stdout, /hooks: no hk- event ever: this session tree may not load the repo hooks \(W-1280\)/);
  // F-31 is applied in this repository (.claude/settings.json wires agent-events.mjs), so the 6 h warning shows.
  assert.match(r.stdout, /warn hooks: F-31 is applied .* no hk- event was ever written/);
});

test("dispatch-check: a fresh hk- event in the tmp spool gives the age line and no hook warning; spool activity hides the run", () => {
  const sb = sandbox([txDispatch()]);
  fs.mkdirSync(sb.spool, { recursive: true });
  const hk = { id: "hk-0123456789", ts: ago(0.2), type: "report", room: "tools", actor: "tools-lead", agent: "[project:maintenance] Tools r3 B1: guard fixes ·af1d", summary: "hook report" };
  fs.writeFileSync(path.join(sb.spool, `${new Date().toISOString().slice(0, 10)}.jsonl`), JSON.stringify(hk) + "\n");
  const r = spawnSync("node", [CHECK, "--kind=other", "--running=0", "--no-claim"], { env: env(sb), encoding: "utf8" });
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /hooks: last hk- event 12 min ago/);
  assert.doesNotMatch(r.stdout, /warn hooks:/);
  assert.doesNotMatch(r.stdout, /no hk- event ever/);
  // The spooled hook report has the run's label, so it closes the dispatch: 0 in flight.
  assert.match(r.stdout, /in flight: 0 agents/);
});

test("backfill selection keeps one event per id (a transcript echoes each report twice)", () => {
  const e = { id: "tx-1", ts: ago(1), type: "report" };
  assert.equal(selectBackfill([e, { ...e }], {}).length, 1);
});

// A minimal transcript: one Agent call, its launch result, and its report through the queue.
function transcript(dir, { tu = "toolu_fixture_b2", raw = "a0123456789abcdef", tsD, tsR }) {
  fs.mkdirSync(dir, { recursive: true });
  const lines = [
    { type: "assistant", timestamp: tsD, message: { content: [{ type: "tool_use", name: "Agent", id: tu, input: { description: "Fixture run B2", subagent_type: "tools-lead", prompt: "batch=company/ops/dispatch-requests/2026-10-16-r5-tools.md#B2" } }] } },
    { type: "user", timestamp: tsD, message: { content: [{ type: "tool_result", tool_use_id: tu, content: `Async agent launched. agentId: ${raw} (internal)` }] } },
    { type: "queue-operation", operation: "enqueue", timestamp: tsR, content: `<agent-message from="${raw}">\nThe report follows:\n  B2 done.\n</agent-message>` },
  ];
  fs.writeFileSync(path.join(dir, "s.jsonl"), lines.map((l) => JSON.stringify(l)).join("\n") + "\n");
}

test("backfill writes the run key (tool_use id) on its tx- dispatch and report; --since after the newest tx- event warns", () => {
  const sb = sandbox([{ id: "tx-old", ts: ago(5), type: "note", room: "lobby", actor: "chief-of-staff", summary: "older transcript event" }]);
  const tx = path.join(sb.dir, "tx");
  transcript(tx, { tsD: ago(4), tsR: ago(3) });
  const since = ago(1);
  const r = spawnSync("node", [EVENTS_CLI, "backfill", `--transcripts=${tx}`, "--types=dispatch,report", `--since=${since}`], { env: env(sb), encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stderr, /backfill: WARNING: --since=.* is after the newest transcript event in the log .*; 2 event\(s\) in between are not added/);
  const r2 = spawnSync("node", [EVENTS_CLI, "backfill", `--transcripts=${tx}`, "--types=dispatch,report"], { env: env(sb), encoding: "utf8" });
  assert.equal(r2.status, 0, r2.stderr);
  assert.doesNotMatch(r2.stderr, /WARNING/);
  const evs = read(sb.events).filter((e) => e.type === "dispatch" || e.type === "report");
  assert.equal(evs.length, 2);
  for (const e of evs) assert.equal(e.key, "toolu_fixture_b2");
  assert.equal(replay(read(sb.events)).open.length, 0);
});
