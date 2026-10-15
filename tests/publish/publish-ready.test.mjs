// W-843: the publish loop reads only the canonical verdict vocabulary and a strict version stamp.
// Ruling: company/reviews/_template-learner-review.md (evaluation-steward, 2026-10-15).
import test from "node:test";
import assert from "node:assert/strict";
import { readReview, decide } from "../../tools/publish-ready.mjs";

const rec = (body, f = "2026-10-14-learner-adult-beginner.md", m = 1) => ({ f, t: body, m });
const head = (verdict, version = "lesson version: v2") => `# Learner review: x\n${version}\nboundary: b\n${verdict}\n\n## Findings\n1. ok\n`;

test("canonical verdicts are read, case-insensitive, with optional bold", () => {
  assert.equal(readReview(head("Verdict: launch")).verdict, "launch");
  assert.equal(readReview(head("**Verdict:** Revise")).verdict, "revise");
  assert.equal(readReview(head("Verdict: **fatal**")).verdict, "fatal");
  assert.equal(readReview(head("Verdict: launch with notes")).verdict, "launch");
  // A verdict at the end of the file still counts (656 records on disk put it there).
  assert.equal(readReview("lesson version: v1\n## Findings\n...\n\nVerdict: launch\n").verdict, "launch");
});

test("synonyms are not translated: pass and block hold, and are named", () => {
  for (const w of ["pass", "block", "approve", "ship"]) {
    const r = readReview(head(`Verdict: ${w}`));
    assert.equal(r.verdict, null, w);
    assert.match(r.problem, new RegExp(`"${w}"`));
    const d = decide([rec(head(`Verdict: ${w}`))], 2);
    assert.equal(d.ready, false);
    assert.match(d.reason, /not launch\|revise\|fatal/);
  }
});

test("a verdict not on a 'Verdict:' line is not a verdict", () => {
  for (const line of ["## Verdict for the current version: **launch**", "**Verdict for this version: launch.**", "Verdict unchanged: launch", "Verdict reason: launch-worthy"]) {
    assert.equal(readReview(head(line)).verdict, null, line);
    assert.equal(decide([rec(head(line))], 2).ready, false, line);
  }
  // Mid-sentence mention does not count either.
  assert.equal(readReview(head("I would say the Verdict: launch")).verdict, null);
});

test("conflicting verdict lines hold the lesson", () => {
  const r = readReview(head("Verdict: revise\n\nVerdict: launch"));
  assert.equal(r.verdict, null);
  assert.match(r.problem, /conflicting verdicts/);
});

test("the version stamp stays strict", () => {
  assert.equal(readReview(head("Verdict: launch")).version, 2);
  assert.equal(readReview(head("Verdict: launch", "lesson version: v4 (meta.json version 4)")).version, 4);
  // No stamp, a prose mention, a different spelling, or two stamps: not ready.
  for (const v of ["", "version reviewed: walkthrough 2026-10-14", "Lesson v2", "the lesson version: v2 is what I saw", "lesson version: 2", "lesson version: v2\nlesson version: v3"]) {
    const d = decide([rec(head("Verdict: launch", v))], 2);
    assert.equal(d.ready, false, JSON.stringify(v));
  }
  assert.equal(decide([rec(head("Verdict: launch", "lesson version: v1"))], 2).reason, "verdict is for an older version");
  assert.equal(decide([rec(head("Verdict: launch"))], 2).ready, true);
});

test("latest review wins by version, then date, then write order", () => {
  const old = rec(head("Verdict: revise", "lesson version: v1"), "2026-10-13-learner-a.md", 1);
  const cur = rec(head("Verdict: launch"), "2026-10-14-learner-a-v2.md", 2);
  assert.equal(decide([old, cur], 2).ready, true);
  const sameDayLater = rec(head("Verdict: revise"), "2026-10-14-learner-b.md", 3);
  assert.deepEqual(decide([cur, sameDayLater], 2), { ready: false, reason: "verdict revise", latest: decide([cur, sameDayLater], 2).latest });
});

test("fail closed: an unreadable review dated after the chosen one holds the lesson", () => {
  const cur = rec(head("Verdict: launch"), "2026-10-14-learner-a.md", 1);
  const newerPass = rec(head("Verdict: pass"), "2026-10-15-learner-a-r2.md", 2);
  const d = decide([cur, newerPass], 2);
  assert.equal(d.ready, false);
  assert.match(d.reason, /"pass"/);
  const newerUnstamped = rec(head("Verdict: revise", ""), "2026-10-15-learner-a-r2.md", 2);
  // Unstamped sorts as v0, below the stamped v2, so only the date rule catches it.
  const u = decide([cur, newerUnstamped], 2);
  assert.equal(u.ready, false);
  assert.match(u.reason, /newer learner review unreadable \(no lesson version stamp\)/);
  // An older unreadable review does not hold a current launch.
  const olderPass = rec(head("Verdict: pass", "lesson version: v1"), "2026-10-13-learner-a.md", 0);
  assert.equal(decide([olderPass, cur], 2).ready, true);
});

test("no review, no candidate", () => {
  assert.deepEqual(decide([], 1), { ready: false, reason: "no learner review" });
});
