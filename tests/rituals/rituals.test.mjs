// Ritual cadence (external assessment 2026-10-17 §3): a ritual is held only when its committed record exists;
// events count as held only where a trigger names them in heldByEvents (launch-review: publish).
// tools/lib/rituals.mjs (pure), tools/lib/ritual-records.mjs (records), company/rituals/triggers.json.
// Run: npm run test:rituals
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { computeDue } from "../../tools/lib/rituals.mjs";
import { recordEvents, ritualOf } from "../../tools/lib/ritual-records.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const TRIGGERS = JSON.parse(fs.readFileSync(path.join(ROOT, "company/rituals/triggers.json"), "utf8")).triggers;
const NOW = Date.parse("2026-10-17T12:00:00Z");
const pr = (d) => d.find((x) => x.ritual === "project-review");

test("the assessment's fixture: a lone recent decision event in the boardroom no longer resets Project Review", () => {
  const events = [{ ts: "2026-10-17T11:00:00Z", type: "decision", room: "boardroom", summary: "a decision, not a Project Review" }];
  const d = pr(computeDue(TRIGGERS, events, NOW));
  // Before this change: held = that decision, so last = 11:00 and due = false.
  assert.equal(d.last, null);
  assert.equal(d.heldBy, null);
  assert.equal(d.due, true);
  assert.deepEqual(d.reasons, ["never held (limit 168 h)"]);
  // A ritual event in the room with no record does not count either.
  const r = pr(computeDue(TRIGGERS, [{ ts: "2026-10-17T11:00:00Z", type: "ritual", room: "boardroom", summary: "Project Review held (says the event)" }], NOW));
  assert.equal(r.due, true);
});

test("a committed record holds the ritual; a later proposal makes it due again", () => {
  const rec = { ts: "2026-10-16T13:28:00Z", type: "ritual", ritual: "project-review", record: "company/rituals/records/2026-10-16-project-review.md", room: "boardroom", actor: "record" };
  const decision = { ts: "2026-10-17T11:00:00Z", type: "decision", room: "boardroom" };
  const held = pr(computeDue(TRIGGERS, [rec, decision], NOW));
  assert.equal(held.last, rec.ts, "the decision after it does not move 'last'");
  assert.equal(held.heldBy, `record ${rec.record}`);
  assert.equal(held.due, false);
  const due = pr(computeDue(TRIGGERS, [rec, decision, { ts: "2026-10-17T11:30:00Z", type: "proposal", room: "boardroom" }], NOW));
  assert.equal(due.due, true);
  assert.deepEqual(due.reasons, ["a new proposal"]);
  // A record for another ritual in the same room (or a positions file for another one) never holds this one.
  const other = pr(computeDue(TRIGGERS, [{ ...rec, ritual: "wbr" }], NOW));
  assert.equal(other.last, null);
});

test("an unrelated ritual event in a meeting room no longer resets that room's ritual (demo-crit, 2026-10-16)", () => {
  const rec = { ts: "2026-10-14T15:28:00Z", type: "ritual", ritual: "demo-crit", record: "company/rituals/records/2026-10-14-demo-crit.md", room: "meeting-crit" };
  const reviews = Array.from({ length: 4 }, (_, i) => ({ ts: `2026-10-15T0${i}:00:00Z`, type: "review", room: "learner-review" }));
  const hqEvent = { ts: "2026-10-16T15:15:07Z", type: "ritual", room: "meeting-crit", summary: "hq: F-40 amendment R1 ..." };
  const d = computeDue(TRIGGERS, [rec, ...reviews, hqEvent], NOW).find((x) => x.ritual === "demo-crit");
  assert.equal(d.last, rec.ts);
  assert.equal(d.due, true);
  assert.deepEqual(d.reasons, ["4 review event(s) since last (threshold 4)"]);
});

test("events stay a secondary signal only where the trigger names them: a publish holds launch-review", () => {
  const lr = TRIGGERS.find((t) => t.ritual === "launch-review");
  assert.deepEqual(lr.heldByEvents, ["publish"]);
  assert.deepEqual(TRIGGERS.filter((t) => t.heldByEvents).map((t) => t.ritual), ["launch-review"], "no other trigger relies on events");
  const events = [{ ts: "2026-10-17T09:00:00Z", type: "review", room: "learner-review" }, { id: "e-pub", ts: "2026-10-17T10:00:00Z", type: "publish", room: "launch-room" }];
  const d = computeDue(TRIGGERS, events, NOW).find((x) => x.ritual === "launch-review");
  assert.equal(d.last, "2026-10-17T10:00:00Z");
  assert.equal(d.heldBy, "event e-pub (publish, secondary)");
  assert.equal(d.due, false);
  // A decision in the launch room is not a publish.
  const x = computeDue(TRIGGERS, [events[0], { ts: "2026-10-17T10:00:00Z", type: "decision", room: "launch-room" }], NOW).find((y) => y.ritual === "launch-review");
  assert.equal(x.due, true);
});

test("recordEvents: only files that are on disk AND committed; the ritual comes from the file name", () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "rituals-"));
  const dir = path.join(d, "company/rituals/records");
  fs.mkdirSync(dir, { recursive: true });
  for (const f of ["2026-10-16-project-review.md", "2026-10-17-project-review-draft.md", "2026-10-16-launch-review-wave-j-3.md", "2026-10-16-not-a-ritual.md", "notes.md"]) fs.writeFileSync(path.join(dir, f), "# x\n");
  const times = new Map([
    ["company/rituals/records/2026-10-16-project-review.md", "2026-10-16T13:28:00.000Z"],
    ["company/rituals/records/2026-10-16-launch-review-wave-j-3.md", "2026-10-16T10:00:00.000Z"],
    ["company/rituals/records/2026-10-15-retro.md", "2026-10-15T10:00:00.000Z"], // committed once, deleted from disk since
  ]);
  const evs = recordEvents(TRIGGERS, { root: d, times });
  assert.deepEqual(evs.map((e) => [e.ritual, e.record, e.room]).sort(), [
    ["launch-review", "company/rituals/records/2026-10-16-launch-review-wave-j-3.md", "launch-room"],
    ["project-review", "company/rituals/records/2026-10-16-project-review.md", "boardroom"],
  ], "the uncommitted draft, the non-ritual file and the deleted record do not count");
  assert.equal(ritualOf("2026-10-13-retro-2.md", TRIGGERS).ritual, "retro");
  assert.equal(ritualOf("2026-10-13-coe.md", TRIGGERS), null);
});

test("the real repository: every ritual's 'last' is a record or (launch-review only) a publish event", async () => {
  const { due } = await import("../../tools/rituals-due.mjs");
  for (const r of due()) if (r.heldBy) assert.match(r.heldBy, r.ritual === "launch-review" ? /^(record company\/|event .* \(publish, secondary\))/ : /^record company\/(rituals\/records|engineering\/operations)\//, `${r.ritual}: ${r.heldBy}`);
});
