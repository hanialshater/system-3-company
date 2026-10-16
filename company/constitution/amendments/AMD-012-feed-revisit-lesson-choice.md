# AMD-012: the revisit test picks a lesson the feed lists (published or review), never a draft

status: proposed (emergency session, Article 3.2)
date: 2026-10-16
proposed_by: evaluation-steward (Hilde), from platform-engineer's root cause of W-1451 (company/roles/memory/platform-engineer/2026-10-16-pe-w1451-revisit.md)
prepared_by: evaluation-steward
surface: `tests/qa/feed.spec.ts`, the test "a finished lesson comes back as a spaced revisit" only. No change to `tests/qa/lessons.ts`, `contract.spec.ts`, `tools/company.mjs`, any gate, or any app code.
tests/qa edited by this draft: no. The patch below was run only on scratch copies outside the repository.

## Why an emergency session (Article 3.2)
The founder approved a production deploy (F-47, company/decisions/2026-10-16-founder-catalog-closeout.md). F-47 says verify is
not bypassed and that if verify fails on the known feed spec (W-1451), the fix comes first. `npm run verify` ends with
`npm run qa`, and that run fails this test on phone and desktop on every build since b0d5cff. So no release can pass the gate,
including releases that would ship fixes for lessons that are wrong today. That is "a defect that is letting bad lessons through":
the harness has stopped measuring the feed and now measures which lesson happens to sort first on disk.

## The defect
- `tests/qa/lessons.ts` `lessons()` returns non-retired lessons from disk in directory order. The first is `ai/asthma-looks-safe`.
- b0d5cff (asthma-looks-safe v3, r5-ai B1) set that lesson to `draft`.
- `src/components/Feed.tsx` (line 80, the revisit loop) brings back only lessons with status `published` or `review`.
  That is by design: drafts never come back as revisits. platform-engineer confirmed it is correct and must not be loosened.
- The spec seeds the draft as completed 2 days ago, waits for a revisit card that the app correctly never renders, and times out.

The app is right. The spec chose a lesson the feed excludes by design.

## Claimed benefit
The revisit test checks the revisit path again, whatever status the alphabetically first lesson has. Verify can go green on a
healthy build, so the F-47 deploy can go through the runbook without a bypass.

## What it adds
The revisit test picks the **first lesson in `lessons()` whose status is `published` or `review`**, the same statuses
Feed.tsx brings back. If the run's pool has none (for example `QA_ONLY` names only drafts), the test fails with an explicit
message instead of a 45 s timeout.

## What it removes
- The revisit test's dependence on whichever lesson sorts first on disk (`lessons()[0]`).
- Implicitly, the chance that this test checks a draft's revisit. That chance was never real coverage, because the app must not show one.
- Nothing else. No check, reviewer or gate is removed. The other four feed tests still use `lessons()[0]` (see "Known limits").

## The patch (apply only after ratification; `patch -p1` from the repo root)
```diff
--- a/tests/qa/feed.spec.ts
+++ b/tests/qa/feed.spec.ts
@@ -32,7 +32,11 @@
 });
 
 test("a finished lesson comes back as a spaced revisit", async ({ page }) => {
-  const first = lessons()[0];
+  // AMD-012 (W-1451): only lessons the feed lists come back as revisits (src/components/Feed.tsx keeps drafts out
+  // by design), so pick the first lesson that is published or in review, never a draft.
+  const first = lessons().find((l) => l.status === "published" || l.status === "review");
+  expect(first, "no published or review lesson in this run's pool (QA_ONLY?)").toBeTruthy();
+  if (!first) return;
   await page.goto("/");
   await page.evaluate((slug) => {
     const past = Date.now() - 2 * 86_400_000;
```

## Side by side (Article 3.4), 2026-10-16
- **Target:** the shared review server http://localhost:3591, `/home/user/s3c-qa/.next-review7/BUILT_FROM` =
  bf6fde86961edff82325289e54bb1e93d24c3c60, read before and after the runs (unchanged).
- **Copies:** two scratch trees from `git archive bf6fde8` (tests/qa, src/demos, playwright.config.ts), so the lesson
  statuses the spec reads from disk are the ones the server was built from. `git diff bf6fde8 HEAD` (60ce79f) is empty for
  tests/qa, src/components/Feed.tsx, src/lib and playwright.config.ts, so the result carries over to main.
- **Command:** `QA_BASE_URL=http://localhost:3591 npx playwright test tests/qa/feed.spec.ts --workers=2` (phone + desktop).
  The harness stamp is `clean: false` (not a git checkout), so these runs are evidence for this amendment and are **not** QA records.
- **Pool head at bf6fde8:** ai/asthma-looks-safe (draft), ai/attention-shares-one (published), ...

| rule | lesson the revisit test seeds | feed.spec.ts result |
|---|---|---|
| old (`lessons()[0]`) | asthma-looks-safe (draft) | **8/10**: revisit fails on phone and desktop (timeout waiting for `revisit-card`); the other 4 tests pass |
| new (AMD-012) | attention-shares-one (published) | **10/10** |

**The disagreement:** exactly the two revisit runs, both explained by the defect above, with no other differences.
**Sensitivity check (the new test can still fail):** a mutant of the new spec that seeds the published lesson as completed
*now* (not yet due) fails on phone (no revisit card, timeout). So the new test still depends on the revisit-due path and
does not pass trivially. This agrees with platform-engineer's QA_ONLY=<published slug> run, which passed on phone and desktop.

## Prediction and test
- prediction: on any healthy build the revisit test passes whatever the status of the alphabetically first lesson. It fails only
  when the revisit path is broken: the due calculation, `/api/meta`, the status filter, card placement, or the recall controls.
- would_be_wrong_if: (a) the test passes on a build where a learner who finished a published lesson 2+ days ago gets no revisit
  card. Probe this by mutating the seed or the app. (b) Verify still fails this test on a build where the revisit path works.
  (c) A release fails this test only because the chosen lesson is `review` and the target runs with `SHOW_REVIEW=off`.
  Then the rule should prefer `published` (AMD-011 part 3's `published[0]`).
- side_by_side: done above (one server, both projects). After merge, the next full `npm run verify` is the first real cycle.
  Any revisit failure there gets a trace before anyone touches the spec again.

## Known limits (not fixed here, on purpose)
- **QA_ONLY:** under `QA_ONLY=<draft slugs>` the pool has no listed lesson, so the test fails with the explicit message.
  That is no worse than today, where it times out. AMD-011 part 3 (pool not filtered by QA_ONLY) is the real fix.
- **SHOW_REVIEW=off targets:** a `review` lesson would not be served there. Today the first listed lesson is published, and
  production keeps review on (company/decisions/2026-10-15-founder-show-review.md). Prediction (c) covers this.
- **Other feed tests:** "provenance" and "subject chips" still use `lessons()[0]`, which is the draft. They pass because drafts
  open by URL off Vercel and the chip check is permissive. Against a Vercel production URL (`QA_BASE_URL`), provenance would
  fail on a draft. That is AMD-011 part 3's scope, not this emergency.

## Relation to AMD-011 part 3 (proposed, same line)
AMD-011 part 3 (company/constitution/amendments/AMD-011-qa-contract-r1.md) replaces the same line with `pool.published[0]`
from a new `feedLessons()`. AMD-012 is the minimal, severable version of that one line, so the deploy does not wait on the
whole of AMD-011. If both are ratified, AMD-012 merges first. AMD-011's companion diff hunk for this line
(`tests-qa.amd011.diff`, `@@ -32,7 +36,7 @@`) will then no longer apply, and the evaluation steward rebases it to replace the
AMD-012 lines. On today's data both rules pick attention-shares-one.

## Does it change how the proposer is judged?
No. The test judges the feed, which is platform-engineer's work, not the evaluation steward's. Article 3.3 still applies:
- platform-engineer is the affected role. It found the defect and may not be the sole approver of a change to the test that judges its work.
- The evaluation steward prepared and presents this amendment. Under its onboarding doc it does not approve its own
  amendments, so it sits on the board but abstains from the decision.
- **Who must approve:** the Constitutional Review Board in emergency session: **founder, head-of-product,
  evaluation-steward (presents, abstains), platform-engineer (the affected role)**. Ratification needs the founder's
  signature, and no single role decides alone.

## Merge mechanics (after ratification only)
1. Apply the patch above with `S3_AMENDMENT=AMD-012` set (the hook). The commit message carries `Amendment: AMD-012` (the CI rule)
   and touches only `tests/qa/feed.spec.ts` (plus this file's Decision section).
2. Run `npm run verify` on that commit. The release record for F-47 cites this AMD and the verify run.
3. The QA harness commit changes (AMD-010 part 1 stamp), so SO-10-1 runs started before the merge are recorded against the old
   contract. Merge between runs.

## Rollback
Revert the merge commit with `Amendment: AMD-012` in the message. It is a single hunk in one test, and nothing depends on it.
After a revert the test goes back to failing while `ai/asthma-looks-safe` (or whichever lesson sorts first) is a draft.

## Objections
None filed yet. Recorded here so it can be objected to: this is an emergency change that the release pressure of F-47 asked
for. The side-by-side is one server and one SHA, not a full cycle (Article 3.4 says "where possible").

## Decision (constitutional review board)
(pending: emergency session. Question for the founder below.)

**Question for ratification:** "Do you ratify AMD-012? It changes only the revisit test in tests/qa/feed.spec.ts, so it seeds
the first published-or-review lesson instead of the first lesson on disk (today a draft the feed correctly hides). Old rule:
8/10 feed tests on bf6fde8. New rule: 10/10. Rollback is one revert. Yes, or no with a reason. head-of-product and
platform-engineer co-sign, and the evaluation steward abstains."

## head-of-product vote (2026-10-16)

**Vote: approve with conditions.** Voter: head-of-product (Priya), Constitutional Review Board, emergency session.

What I checked, on disk, before reading anyone's account of it:
- `src/components/Feed.tsx` (revisit loop, about line 80) keeps only `published` and `review` lessons. `tests/qa/feed.spec.ts`
  line 35 seeds `lessons()[0]`, and `tests/qa/lessons.ts` drops only `retired`, so the pool head can be a draft. The defect is as described.
- Evidence in the scratchpad `amd012/`: `diff old new` is exactly the patch hunk; `diff new mut` is exactly the seed time
  (`Date.now() - 2 days` to `Date.now()`). `out-new/.last-run.json` is `passed`. `out-old` has revisit failure folders for
  phone and desktop. `out-mut` is `failed`. `amd012.diff` and `embedded.diff` differ only in header timestamps.

Reasons for approval:
1. **Product rule, stated as owner:** a draft never comes back to a learner as a revisit. That is a product decision, not a
   test artifact, and it stays. A test that needs a draft to come back as a revisit is testing the wrong product. The new
   rule seeds the statuses the feed shows, which is the learner-facing path.
2. The change is one hunk in one test. It removes no check, and the mutant shows the test still depends on the revisit-due path.
   Rollback is one revert.
3. As things stand, no release can pass verify, including releases that fix wrong lessons. Leaving that blocked costs learners more
   than the risk in this hunk does.

Conditions (none blocks the founder's signature; each has an owner):
- **C1, evidence (evaluation-steward):** the saved artifacts do not show the 8/10 and 10/10 counts directly. `out-old/.last-run.json`
  lists 1 failed test id although there are two failure folders (phone and desktop). `out-mut/.last-run.json` lists 2 failed ids
  but only a phone failure folder, and the AMD says only "fails on phone". Before the merge commit, add a line to this file that
  explains the mismatch, or attach the list-reporter output for each of the three runs. The result points the same way either way,
  so this is about the record, not the vote.
- **C2, prediction (c) has a named fallback:** if the first post-merge verify, or any target with `SHOW_REVIEW=off`, fails because
  the chosen lesson is `review`, the fix is to prefer `published`, which is AMD-011 part 3. It is not to loosen Feed.tsx and not
  to retry until green. I commit now to the product side: the revisit test should prove what a production learner sees, so
  `published` first is the target shape.
- **C3, debt stays visible (evaluation-steward to put on the board; I do not write board.json):** the provenance and subject-chip
  tests still use the draft at `lessons()[0]`. That is open under AMD-011 part 3, which is not closed by this AMD.
- **C4:** the first full `npm run verify` after the merge is the real cycle (Article 3.4). The F-47 release record cites it.
  Any revisit failure there gets a trace before anyone edits the spec again.

On the recorded objection (emergency change under F-47 release pressure, one server and one SHA): **accepted as a real limit and
declined as a reason to block.** The release pressure is the reason for the emergency session, not a reason to change the rule. The
rule picks the lesson by the feed's own status filter and does not depend on F-47. One SHA is enough here because
`git diff bf6fde8 HEAD` is empty for every file the result depends on. C4 is the full cycle the objection asks for.
