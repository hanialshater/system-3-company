// Company tooling batch (2026-10-15): usage dedupe (W-941 A1), stopped-event backfill path (A5),
// explicit servers (W-851), rooms (W-914, W-917), founder-inbox budget warnings (W-920).
// Run: npm run test:hq
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { dedupeUsage, totalTokens } from "../../tools/lib/usage.mjs";
import { spendBy, summary, spendAgainstBudget, inboxBudgetWarnings, readRegister } from "../../tools/lib/ledger.mjs";
import { roomFor, transcriptEvents, selectBackfill } from "../../tools/events.mjs";
import { startNext, explicitBase, portIsFree } from "../../tools/lib/server.mjs";
import { ROOMS } from "../../src/lib/hq.ts";

const ROOT = path.resolve(import.meta.dirname, "../..");
const u = (agent, ts, tokens, extra = {}) => ({ type: "usage", agent, ts, tokens, durationMs: 1, ...extra });

test("dedupeUsage keeps one record per run: the max, even when a resume reports fewer tokens", () => {
  const recs = [
    u("Release manager: publish 79 ·6d68", "2026-10-14T02:51:00Z", 52578),
    u("Release manager: publish 79 ·6d68", "2026-10-14T03:16:00Z", 53983),
    u("Release manager: publish 79 ·6d68", "2026-10-14T03:21:00Z", 54696),
    u("Ritual: constitutional review ·c521", "2026-10-14T15:06:30Z", 97794),
    u("Ritual: constitutional review ·c521", "2026-10-14T15:07:24Z", 13743),
    u("Other run ·aaaa", "2026-10-14T03:00:00Z", 1000),
  ];
  const kept = dedupeUsage(recs);
  assert.deepEqual(kept.map((r) => r.tokens), [54696, 97794, 1000]);
  assert.equal(totalTokens(recs), 54696 + 97794 + 1000);
});

test("dedupeUsage: the same label outside the session window is a separate run; unmeasured lines pass through", () => {
  const recs = [
    u("Builder ·beef", "2026-10-14T00:00:00Z", 100),
    u("Builder ·beef", "2026-10-15T00:00:00Z", 90),
    { type: "stopped", agent: "Builder ·beef", ts: "2026-10-14T00:10:00Z", tokens: null },
    u(undefined, "2026-10-14T00:00:00Z", 5),
    u(undefined, "2026-10-14T00:00:01Z", 5),
  ];
  const kept = dedupeUsage(recs);
  assert.equal(kept.length, 5);
  assert.equal(totalTokens(recs), 200);
});

test("on the real event log, dedupe leaves one usage record per agent label and lowers the total", () => {
  const evs = fs.readFileSync(path.join(ROOT, "company/ops/events.jsonl"), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));
  const usage = evs.filter((e) => e.type === "usage");
  const kept = dedupeUsage(usage);
  const labels = kept.map((e) => e.agent);
  assert.equal(new Set(labels).size, labels.length, "a label kept twice: either a collision across sessions or a dedupe bug");
  const max = {};
  for (const e of usage) max[e.agent] = Math.max(max[e.agent] ?? 0, e.tokens);
  assert.equal(totalTokens(usage), Object.values(max).reduce((n, x) => n + x, 0));
  if (usage.length > labels.length) assert.ok(totalTokens(usage) < usage.reduce((n, e) => n + e.tokens, 0));
});

test("the ledger sums count a resumed run once (spend by line, against budget, and the total)", () => {
  const L = [
    { id: "a", ts: "2026-10-14T10:00:00Z", project: "catalog", agent: "B ·1", tokens: 100, attribution: "label-rule" },
    { id: "b", ts: "2026-10-14T10:10:00Z", project: "catalog", agent: "B ·1", tokens: 120, attribution: "label-rule" },
    { id: "c", ts: "2026-10-14T10:20:00Z", project: "catalog", agent: "S ·2", tokens: null, attribution: "label-rule" },
  ];
  const s = spendBy(L).catalog;
  assert.equal(s.tokens, 120);
  assert.equal(s.measuredRuns, 1);
  assert.equal(s.unmeasuredRuns, 1);
  assert.equal(spendAgainstBudget({ id: "catalog", budget: { tokens: 1000 } }, L), 120);
  const sum = summary(readRegister(), L, []);
  assert.equal(sum.total, 120);
  assert.equal(sum.runs, 2);
  assert.equal(sum.duplicateLines, 1);
});

test("ledger check warns on open initiative/decision inbox items that propose spend or a project with no budget", () => {
  const reg = { projects: [{ id: "first-light" }] };
  const w = inboxBudgetWarnings(reg, [
    { id: "X-1", category: "decision", status: "open", title: "Buy the domain", options: "Spend ~$20/mo on hosting" },
    { id: "X-2", category: "initiative", status: "open", title: "Start a thing", links: ["company/initiatives/thing.md"] },
    { id: "X-3", category: "decision", status: "open", title: "New category for behavioral economics" },
    { id: "X-4", category: "decision", status: "open", title: "Which locales first?" },
    { id: "X-5", category: "decision", status: "decided", title: "Spend $5" },
    { id: "X-6", category: "approval", status: "open", title: "Spend $5" },
    { id: "X-7", category: "decision", status: "open", title: "Spend $5", budget: "first-light" },
    { id: "X-8", category: "decision", status: "open", title: "Spend $5", budget: "not an initiative: a vendor choice inside first-light" },
    { id: "X-9", category: "decision", status: "open", title: "Spend $5", budget: "nope" },
  ]);
  const ids = w.map((x) => x.match(/founder-inbox ([A-Z]+-\d+)/)[1]);
  assert.deepEqual(ids, ["X-1", "X-2", "X-3", "X-9"]);
  assert.match(w.find((x) => x.includes("X-9")), /not a projects.json id/);
});

test("rooms: head-of-strategic-initiatives sits in ceo-office; first-light is documented and drawn", () => {
  assert.equal(roomFor("head-of-strategic-initiatives"), "ceo-office");
  const doc = fs.readFileSync(path.join(ROOT, "company/ops/events.md"), "utf8");
  assert.match(doc, /\| `first-light` \|/);
  assert.match(doc, /System 3 Press/);
  assert.ok(ROOMS.some((r) => r.id === "first-light"));
});

test("backfill path for stopped events: the transcript's stops after a cut-off are selected, nothing is invented", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "s3c-tx-"));
  const raw = "a0123456789abcdef";
  const lines = [
    { type: "assistant", timestamp: "2026-10-14T15:00:00Z", message: { content: [{ type: "tool_use", id: "tu1", name: "Agent", input: { description: "Build wave Z", subagent_type: "demo-builder", prompt: "go" } }] } },
    { type: "user", timestamp: "2026-10-14T15:00:01Z", message: { content: [{ type: "tool_result", tool_use_id: "tu1", content: `started. agentId: ${raw}` }] } },
    { type: "queue-operation", timestamp: "2026-10-14T15:10:00Z", content: `<task-notification><task-id>${raw}</task-id><status>completed</status><summary>done</summary><subagent_tokens>5000</subagent_tokens><duration_ms>60000</duration_ms></task-notification>` },
    { type: "queue-operation", timestamp: "2026-10-14T16:00:00Z", content: `<task-notification><task-id>${raw}</task-id><status>failed</status><summary>Agent hit the session limit</summary></task-notification>` },
    { type: "queue-operation", timestamp: "2026-10-14T16:05:00Z", content: `<task-notification><task-id>bshell123</task-id><status>failed</status><summary>a background shell</summary></task-notification>` },
  ];
  fs.writeFileSync(path.join(dir, "s.jsonl"), lines.map((l) => JSON.stringify(l)).join("\n") + "\n");
  const all = transcriptEvents(dir);
  const picked = selectBackfill(all, { types: ["stopped"], since: "2026-10-14T15:20:00.000Z" });
  assert.equal(picked.length, 1);
  assert.equal(picked[0].type, "stopped");
  assert.equal(picked[0].room, "build-floor");
  assert.match(picked[0].summary, /usage limit/);
  assert.equal(selectBackfill(all, { types: ["stopped"], since: "2026-10-14T16:30:00.000Z" }).length, 0);
  assert.equal(selectBackfill(all, { types: ["stopped"], have: new Set([picked[0].id]) }).length, 0);
  fs.rmSync(dir, { recursive: true });
});

test("servers: a taken port is refused loudly, never borrowed (W-851)", async () => {
  const s = http.createServer((_, r) => r.end("someone else's build"));
  await new Promise((r) => s.listen(0, r));
  const port = s.address().port;
  assert.equal(await portIsFree(port), false);
  await assert.rejects(startNext({ port, label: "test" }), /already in use/);
  s.close();
  assert.throws(() => explicitBase("localhost:3000", "test"), /absolute URL|http/);
  assert.equal(explicitBase("http://localhost:3621/", "test"), "http://localhost:3621");
});

test("no browser tool falls back to a fixed port", () => {
  const src = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
  assert.doesNotMatch(src("tools/walkthrough.mjs"), /3300 \+ Math\.random|spawn\("npx", \["next", "start"/);
  assert.doesNotMatch(src("tools/a11y-scan.mjs"), /opt\("base", "http/);
});
