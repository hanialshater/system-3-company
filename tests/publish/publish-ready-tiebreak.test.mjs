// W-1596: two learner records for the same lesson version on the same day are ordered without file
// mtime (a fresh checkout makes every mtime equal). Order: built-from git ancestry, then a
// "supersedes:" line, then the -rN suffix within one name stem; an unordered tie fails closed.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { decide, newer, builtFrom, gitAncestry } from "../../tools/publish-ready.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const body = (verdict, extra = "") => `# Learner review: x\nlesson version: v1\n${extra}\nVerdict: ${verdict}\n`;
const rec = (f, verdict, extra = "", m = 0) => ({ f, t: body(verdict, extra), m });
// A toy history: aaaaaaa1 -> bbbbbbb2 -> ccccccc3; d0000001 is on a diverged branch; anything else is unknown.
const chain = ["aaaaaaa1", "bbbbbbb2", "ccccccc3"];
const toyAncestor = (x, y) => {
  const i = chain.indexOf(x), j = chain.indexOf(y);
  if (i >= 0 && j >= 0) return i < j;
  if (x === "d0000001" || y === "d0000001") return false;
  return null;
};

test("mtime is ignored: r2 beats the unsuffixed r1 whatever the mtimes say", () => {
  const r1 = rec("2026-10-16-learner-k.md", "revise", "", 999);
  const r2 = rec("2026-10-16-learner-k-r2.md", "launch", "", 1);
  for (const order of [[r1, r2], [r2, r1]]) {
    const d = decide(order, 1);
    assert.equal(d.ready, true);
    assert.equal(d.latest.f, r2.f);
  }
  // Equal mtimes (a fresh checkout) too.
  assert.equal(decide([{ ...r1, m: 5 }, { ...r2, m: 5 }], 1).latest.f, r2.f);
  // r10 beats r9: numeric, not string order.
  const r9 = rec("2026-10-16-learner-k-r9.md", "launch");
  const r10 = rec("2026-10-16-learner-k-r10.md", "revise");
  assert.equal(decide([r10, r9], 1).latest.f, r10.f);
});

test("built-from ancestry decides first, over the suffix", () => {
  const a = rec("2026-10-16-learner-k-r2.md", "launch", "Screenshots seen: yes (built from aaaaaaa1)");
  const b = rec("2026-10-16-learner-k.md", "revise", "Screenshots seen: yes (built from ccccccc3)");
  assert.equal(newer(b, a, toyAncestor), 1);
  assert.equal(decide([a, b], 1, { isAncestor: toyAncestor }).latest.f, b.f);
  // Without ancestry the suffix decides.
  assert.equal(decide([a, b], 1).latest.f, a.f);
  // Diverged branches or an unknown SHA: ancestry abstains and the suffix decides.
  const c = rec("2026-10-16-learner-k.md", "revise", "built from d0000001");
  assert.equal(decide([a, c], 1, { isAncestor: toyAncestor }).latest.f, a.f);
  const e = rec("2026-10-16-learner-k.md", "revise", "built from eeeeeee9");
  assert.equal(decide([a, e], 1, { isAncestor: toyAncestor }).latest.f, a.f);
  assert.equal(builtFrom("recorded 23:15Z, built from E092F6C3 with x"), "e092f6c3");
  assert.equal(builtFrom("no sha here"), null);
});

test("a supersedes line orders records of different stems", () => {
  const a = rec("2026-10-16-learner-a.md", "revise");
  const b = rec("2026-10-16-learner-b.md", "launch", "supersedes: 2026-10-16-learner-a.md");
  assert.equal(decide([a, b], 1).latest.f, b.f);
  assert.equal(decide([b, a], 1).ready, true);
});

test("an unordered tie fails closed: the most severe verdict stands, in any input order", () => {
  const a = rec("2026-10-16-learner-a.md", "launch", "", 9);
  const b = rec("2026-10-16-learner-b.md", "revise", "", 1);
  for (const order of [[a, b], [b, a]]) {
    const d = decide(order, 1);
    assert.equal(d.ready, false);
    assert.equal(d.reason, "verdict revise");
  }
  // An unreadable record in the tie holds too.
  const bad = rec("2026-10-16-learner-c.md", "pass");
  const d = decide([a, bad], 1);
  assert.equal(d.ready, false);
  assert.match(d.reason, /"pass"/);
});

test("repo: the-swap-that-goes-in-circles picks r2 (launch, v1), with and without git", () => {
  const dir = path.join(ROOT, "company/reviews/the-swap-that-goes-in-circles");
  const files = ["2026-10-16-learner-knows-preference.md", "2026-10-16-learner-knows-preference-r2.md"];
  if (!files.every((f) => fs.existsSync(path.join(dir, f)))) return; // records moved: nothing to pin
  const reviews = files.map((f) => ({ f, t: fs.readFileSync(path.join(dir, f), "utf8"), m: 0 }));
  for (const opts of [{}, { isAncestor: gitAncestry(ROOT) }]) {
    const d = decide(reviews, 1, opts);
    assert.equal(d.latest.f, files[1]);
    assert.equal(d.ready, true);
  }
});
