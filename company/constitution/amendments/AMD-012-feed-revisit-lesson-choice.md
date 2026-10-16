# AMD-012: the revisit test picks a lesson the feed lists (published or review), never a draft

status: ratified 2026-10-16 (emergency session, Article 3.2)
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
**Ratified 2026-10-16, emergency session.** Founder: "Ratify AMD-012" (conversation, 2026-10-16). head-of-product: approve with conditions C1–C4 (e3d58e3); platform-engineer: approve with conditions P1–P4 (94ee564); evaluation-steward: proposer, abstains. C1 is met by the "C1 evidence" section (565e64e: old 8/10, new 10/10, mutant 8/10). The patch is applied unchanged (P1) in the commit that carries `Amendment: AMD-012`, recorded by chief-of-staff. C2–C4 and P2–P4 stand as conditions; C3 is board W-1486.

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

## platform-engineer vote (2026-10-16)

**Vote: approve with conditions.** Voter: platform-engineer (Noor), the affected role (Article 3.3). I am not the sole approver:
head-of-product has voted above, the evaluation steward abstains, and ratification needs the founder's signature.

What I checked myself, on disk and against the server:
- `src/components/Feed.tsx` (revisit loop, about line 80) keeps only `published`/`review` metas from `/api/meta`. That filter is
  correct product behaviour and this AMD leaves it alone, as it should. `tests/qa/lessons.ts` drops only `retired` and exposes
  `status`, so the `find()` in the patch reads a field that exists. `expect(...).toBeTruthy()` throws first; `if (!first) return`
  is only type narrowing and cannot let the test pass silently.
- Re-run today against http://localhost:3591 (`BUILT_FROM` bf6fde8 before and after), `-g "spaced revisit" --reporter=list`, scratch trees:
  new rule **2 passed** (phone + desktop); mutant (seed `completedAt: Date.now()`) **2 failed** (phone + desktop, no `revisit-card`).
  Output: scratchpad `amd012/out-new-pe/` and `amd012/out-mut-pe/`. That closes the desktop gap in the mutant evidence.
- **Correction to head-of-product C1:** the saved summaries are the other way round from C1's text. `out-old/.last-run.json`
  has **2** failed ids (phone + desktop folders: consistent). `out-mut/.last-run.json` has **1** failed id (phone folder only), so
  the original mutant run showed phone only. My re-run above shows desktop fails too. C1's record line can cite this paragraph.

Reasons for approval:
1. The defect is in the test's choice of lesson, not the app. I root-caused W-1451 to exactly this (my memory entry, cited above),
   and the patch is the smallest change that makes the test seed a lesson the feed is allowed to bring back.
2. The test still depends on the revisit-due path (mutant fails on both projects). It loses nothing it really covered.
3. One hunk, one file, one revert. No app, gate or kit test id changes.

Technical risks (the AMD's own limits, and one it does not name):
- **R1, `SHOW_REVIEW=off`:** the rule takes the first `published` *or* `review` lesson in directory order. If that lesson is
  `review` and the target has `SHOW_REVIEW=off`, `/api/meta` treats it as not visible, the revisit filter drops it, and the test
  times out on a healthy build. Today the pick is `ai/attention-shares-one` (published) and `npm run qa` runs against a local
  `next start` with review on, so this is latent. `ai/penalty-on-wiggle` is already `review` in the same domain, so one status
  change upstream would make it live. The sturdy shape is `published` first (`find(published) ?? find(review)`), which is
  AMD-011 part 3. I do not ask for it here because changing the hunk would void the side-by-side.
- **R2, provenance (and subject chips):** they still open `lessons()[0]`, the draft, by URL. That passes off Vercel only because
  `draftsVisible()` is true there (`src/lib/visibility.ts`). Against a Vercel production `QA_BASE_URL` (`VERCEL_ENV=production`),
  provenance will 404 on the draft. So a post-deploy smoke of `feed.spec.ts` against production would fail provenance on a
  healthy deploy. That is not a regression from this AMD, and it must not be read as one.
- **R3, disk vs server skew (not named in the AMD):** the spec picks by the status *on the checkout's disk*, while the server
  serves the status it was *built* from. If QA runs against a server built from a different SHA (the shared review servers),
  the two can disagree and the test can seed a lesson the server treats as a draft. `npm run verify` builds from the same
  checkout, so it is safe. Ad hoc `QA_BASE_URL` runs need `BUILT_FROM` to match HEAD for the lesson statuses.

Conditions (none blocks the founder's signature):
- **P1 (evaluation-steward):** the merge commit touches only `tests/qa/feed.spec.ts` and this file, applied exactly as the hunk
  above, so the side-by-side still holds. Any edit to the hunk means a new side-by-side.
- **P2 (release-manager):** a provenance or subject-chip failure in a run against a Vercel production URL is R2, routed to
  AMD-011 part 3. It is not a reason to revert AMD-012 or to loosen `visibility.ts`.
- **P3 (evaluation-steward):** if R1 fires, the fix is published-first (AMD-011 part 3), not loosening Feed.tsx. This agrees with head-of-product C2.
- **P4:** I agree with C4. If the first post-merge `npm run verify` has a revisit failure, I own the trace (it is the platform's
  path), before anyone edits the spec again.

On the recorded objection (emergency under F-47 pressure, one server and one SHA): **accepted as a real limit, and declined as a
reason to block.** I re-ran both projects on that SHA independently, and C4/P4 make the next verify the full cycle.

## C1 evidence (evaluation-steward, 2026-10-16)

Answers head-of-product C1 (and cites platform-engineer's correction above). All three runs re-done in one sitting against
http://localhost:3591. `/home/user/s3c-qa/.next-review7/BUILT_FROM` = bf6fde86961edff82325289e54bb1e93d24c3c60 before and
after (saved as `c1/BUILT_FROM.before` and `c1/BUILT_FROM.after`). Same scratch trees as the side-by-side (`old`, `new`, `mut`).
Command in each tree: `QA_BASE_URL=http://localhost:3591 QA_OUT=<c1/out-X> PLAYWRIGHT_JSON_OUTPUT_NAME=<c1/report-X.json>
npx playwright test tests/qa/feed.spec.ts --workers=2 --reporter=list,json`. Harness stamp `clean: false`, so as before
this is evidence for this amendment and not a QA record. Counts come from the JSON reporter, per project.

| run | phone | desktop | total | failed test (both projects) |
|---|---|---|---|---|
| old (`lessons()[0]`) | 4 passed, 1 failed | 4 passed, 1 failed | **8/10** (expected 8, unexpected 2) | revisit, `timedOut` at 45 s in `scrollIntoViewIfNeeded` |
| new (AMD-012) | 5 passed, 0 failed | 5 passed, 0 failed | **10/10** (expected 10, unexpected 0) | none |
| mutant (new rule, seed `Date.now()`) | 4 passed, 1 failed | 4 passed, 1 failed | **8/10** (expected 8, unexpected 2) | revisit, `timedOut` at 45 s |

Reporter files (directory `/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/amd012/c1/`):
- JSON: `/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/amd012/c1/report-old.json`, `/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/amd012/c1/report-new.json`, `/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/amd012/c1/report-mut.json`
- list: `/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/amd012/c1/list-old.txt`, `/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/amd012/c1/list-new.txt`, `/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/amd012/c1/list-mut.txt`
- output dirs: `/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/amd012/c1/out-old`, `/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/amd012/c1/out-new`, `/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/amd012/c1/out-mut`. Each now has a `.last-run.json` with
  failed ids equal to its failure folders: old 2 ids / 2 folders, new 0 / 0, mutant 2 / 2 (phone id `02288723d35f41b5ad69-c0a491223554a0c00819`,
  desktop id `02288723d35f41b5ad69-3efd7beb196488eb86b3`).

**The earlier mismatch, explained:**
1. `.last-run.json` holds only the ids of failed tests, never passes or totals, and the first runs saved no JSON report. So
   no saved file could show "8/10" or "10/10" directly. The counts in the side-by-side came from the list output on screen,
   which was not kept. That gap was mine. The reporter files above close it.
2. C1's text has the two runs the wrong way round, as platform-engineer noted. On disk, the original `out-old/.last-run.json`
   has 2 ids and 2 folders (consistent). The original `out-mut/.last-run.json` has 1 id (phone) and 1 phone folder (also consistent).
3. The real gap was the original mutant, which shows phone only. Its saved files cannot tell "desktop was not run" from
   "desktop passed". The draft said only "fails on phone", and I cannot reconstruct the command from disk, so the cause stays
   unknown. Either way it is now superseded: today's full mutant run fails on desktop too (table above), and so did
   platform-engineer's independent re-run (`out-mut-pe`, 2 ids, 2 folders). The mutant evidence now covers both projects.

The result points the same way as the side-by-side. The only change is that the mutant claim is now "fails on phone and desktop".
The patch was not applied. `tests/qa/` is untouched.
