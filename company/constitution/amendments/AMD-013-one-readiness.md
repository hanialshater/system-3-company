# AMD-013: One readiness policy

status: applied (a6333dd05, 2026-10-18: PR #8 landed through PR #9 into the default branch). Ratified 2026-10-17 by the founder (parts a, b and c as drafted; alternatives A1 and A2 not chosen); principal-engineer conditions C1-C4 folded in. Open objections O1-O5 travel with it.
date: 2026-10-17
proposed_by: evaluation-steward (route from the external assessment, `company/reviews/org/2026-10-17-external-assessment.md` §1 findings 1 and 5, Appendix A ch.4 and ch.8; founder asked us to act on it)
prepared_by: evaluation-steward
surface: `tools/company.mjs` (`launchGates`, `cmdCheck`, `cmdQaRecord`; part a), `.github/workflows/ci.yml` (part b). Ordinary surface changed alongside: new `tools/lib/readiness.mjs`, `tools/publish-ready.mjs`, `tests/publish/`.
companion: `AMD-013-one-readiness/` (lib, `protected.diff`, `ordinary.diff`, `tests/readiness.test.mjs`, `measure.mjs`)
supersedes: AMD-001 part (d) ("gates must read the verdict and the version", proposed 2026-10-13, never drafted as code). If AMD-013 (a) is ratified, AMD-001 (d) is withdrawn as covered.
severable: yes. Parts (a), (b) and (c) can be ratified separately; (c) is a reference, not new text.

## Context

The company has two definitions of "ready to publish".

- `launchGates()` in `tools/company.mjs` checks that the claims are verified by someone other than the builder, and that the
  QA and learner evidence files exist. It does not read what those files say, which version they reviewed, or
  `company/ops/publish-holds.json`. `company status`, `company publish` and `company check` (of published lessons) all use it.
- `tools/publish-ready.mjs` reads the learner verdict (`launch | revise | fatal`), the `lesson version: vN` stamp, the hold
  file, and orders same-day reviews conservatively (W-843, W-1596). It does not read the QA verdict at all.

Measured at `c31c1fab` (read-only, `AMD-013-one-readiness/measure.mjs`):

| | lessons | ready, old gate | ready, AMD-013 |
|---|---|---|---|
| status `review` | 234 | **223** (what `company status` prints) | **1** (`zero-loses-to-this-crowd`, the same one `publish-ready.mjs` lists) |
| status `published` | 720 | 720 | 452 |

Why 222 review lessons drop out (first reason each): 195 have an active hold (182 Life Hacks incubation, 8 History
incubation, 2 W-513, 3 single holds), 26 have a current learner verdict of `revise`, 1 has a launch verdict for an older
version. `same-week-a-year-apart` (v1) is one of the 26: its only learner review,
`company/reviews/same-week-a-year-apart/2026-10-16-learner-no-econ-adult-r1.md`, says `lesson version: v1` and `Verdict: revise`.

Why 268 published lessons would fail the new policy: 219 have a newest QA record with no version stamp, dated the same
day as a learner review of an older version, so nothing on disk says which version QA saw. 33 have a newest QA record
dated before an older-version review (QA ran on an earlier version). 7 have a newest learner launch for an older version.
6 have a newest QA record that reads `fail`, for example `below-critical-mass/2026-10-14-qa.md`, which is linked as
evidence and says `result: **fail**`. That is consistent with the same-day overwrite W-1488 describes. 3 have a same-day
`-v2` (revise) and `-v2-seen` (launch) pair with no ordering signal, so the tie fails closed. These are
`antibiotic-already-there`, `build-a-balanced-mobile` and `count-the-thunder`. I checked 8 of the 268 against their
records, and the parser read each one correctly; none was a parser artifact. Those 8 are `below-critical-mass`,
`antibiotic-already-there`, `build-a-balanced-mobile`, `count-the-thunder`, `confident-and-wrong`, `kmp-never-steps-back`,
`attention-shares-one` and `seesaw-sit-closer`. In the two same-day cases the records cannot show that QA saw the
current version. `attention-shares-one` has QA on 10-13, the day of its v1 review, and a v3 review on 10-14.
`seesaw-sit-closer` went from v1 to v4 on the day of its QA. A gap in the evidence is not proof the lesson is broken. I
did not read all 268.

The chief of staff's spot-check said only `head-on-is-a-wall` has a newest **linked** learner review saying revise. The new
policy passes that lesson, because it reads the unlinked `-r2` launch record on disk. It flags the 3 lessons above
instead, because their linked records tie. Both statements are true. They differ in which records count, and this
amendment answers that question: every learner record on disk for the lesson, plus every linked one.

The assessment's ch.8 gap also holds. CI runs `check`, `typecheck`, `build` and `qa`. It does not run the 11 Node suites
that `npm run verify` runs, so a change that breaks the dispatch, memory, mailbox or publish tools passes CI.

## Proposed change

### Part (a): one readiness function, called by the gate

1. **New lib, ordinary surface: `tools/lib/readiness.mjs`** (companion `tools/lib/readiness.mjs`). It holds the mechanics:
   - The learner rule, moved from `publish-ready.mjs`: `readReview`, `decide`, `newer`, `builtFrom`, `gitAncestry`. The only
     edit is that `decide`/`newer` take the basename of a path. A test compares the moved `decide` with the old one on
     all 1,283 lessons on disk, and they agree on every one.
   - A **QA rule, new**. It reads every QA record on disk for the lesson, plus every linked one; unlinked records count
     because `qa-record` writes a fail but links only passes. The verdict is the header field `result: **pass**` (or
     `**contract pass**`) / `**fail**`. The newest record must pass. Same-day records are ordered by build ancestry, then
     `supersedes:`, then `-rN`. A real tie fails closed (fail wins). A newer linked record that cannot be read holds the
     lesson. Version: a stamped record must name the current version. An unstamped record is checked against the learner
     reviews' stamps and builds. It passes if it was built from the build a current-version review saw, or a descendant
     of it. It is stale if it was built from an older-version review's build, or an ancestor of it, or if it is dated
     before that review. It **cannot be told**, and holds, if it is dated the same day as that review with no build. On or
     after `READINESS_SINCE`, an unstamped record holds.
   - `readiness(meta, ctx)`, which returns `{ ready, reasons[] }` and covers: an active hold, the learner rule and the QA
     rule. It is pure: `loadContext(root, meta)` does the I/O.
2. **What stays in `tools/company.mjs` (protected)**, from `protected.diff`:
   - `launchGates(meta) = claimGates(meta) + readinessGates(meta)`. `claimGates` is today's body, unchanged. `status`,
     `publish` and `check` call `launchGates`. `publish-ready.mjs --publish` (batch publish) shells out to `company publish`,
     so every caller lands on the same function.
   - `readinessGates` calls the lib, and it **fails closed**. If the lib throws, returns a malformed answer, or fails a
     **known-answer canary**, every gate closes and `check` fails. The canary is 7 synthetic cases: launch+pass ready;
     revise, older-version launch, QA fail, older-version QA, active hold, and a same-day launch/revise tie all not ready.
     So the lib can be tuned without an amendment, but it cannot be tuned into calling a revise or a held lesson ready.
   - An **active-hold floor** that does not depend on the lib. The hold file is read in `company.mjs` too.
   - The strictness parameters: `READINESS_SINCE` (from this date on, QA records must carry `lesson version: vN`. It is
     `null` in the diff, and apply step A2 sets it to the ratification date) and `QA_INDEPENDENT_SINCE` (part c).
   - `check` of published lessons. A claim-floor failure is an error, as today. A readiness failure is an error, except
     for the 268 lessons in `READINESS_GRANDFATHERED` (a constant in the protected file, measured at `c31c1fab`). For
     those, `check` prints one summary warning, and it prints a second warning when a grandfathered lesson starts to
     pass, so it can be dropped. **Nothing is unpublished and no gate reopens on the day this is applied.** A lesson
     published after it must pass.
   - `qa-record` writes `lesson version: v<meta.version>` into the header, so new records are bound to a version from day one.
3. **Ordinary surface, from `ordinary.diff`.** `publish-ready.mjs` re-exports the moved functions and lists candidates
   with `readiness()`. `tests/publish/publish-ready-flags.test.mjs` copies the lib into its tmp root. The companion test
   moves to `tests/publish/readiness.test.mjs`.

### Part (b): CI runs the harness suites `verify` runs

`ci.yml` `verify` job adds, after `npm ci` and before `check`, in `verify`'s order:
`test:deploy`, `test:publish`, `test:lifehacks`, `test:books`, `test:algorithms`, `test:kit`, `test:hq`, `test:platform`,
`test:dispatch`, `test:mailbox`, `test:memory` (names from `package.json` `scripts.verify`). On this host, after
`npm ci --ignore-scripts`, all 11 pass: 1,325 tests, 0 failures, 7 skipped (3 `S3_SLOW_TESTS` dispatch cases and 4 in
platform), about 59 s in total, 27 s of it `test:dispatch`. `test:dispatch:slow` and `test:spike` are not in `verify` and
stay out. The job's `concurrency` block (AMD-002) is untouched.

### Part (c): recorder identity is AMD-010 part 3, folded in by reference

AMD-013 does not restate AMD-010 part 3. That part already proposes `--by=`/`GIT_AUTHOR_NAME`, `kind: independent | integration`
and a gate line (its step 10). What AMD-013 changes is **where step 10 lands**. Instead of a second line in `launchGates`,
it is the `recorder` hook of the one readiness function. `company.mjs` defines `qaRecorderRule` and
`QA_INDEPENDENT_SINCE = null`. When AMD-010 part 3 is ratified, its applying commit sets that constant to its ratification
date and nothing else. From that date on, a newest QA record must read `recorded by: qa-tester` and `kind: independent`.
The lib's QA file filter already excludes `*-qa-integration.md`, AMD-010's filename for integration runs. Ordering
between the two:

- If AMD-013 lands first, AMD-010 part 3 needs no `launchGates` hunk.
- If AMD-010 lands first, its step 10 line should be moved into `qaRecorderRule` when AMD-013 is applied.
- Both touch the `qa-record` header line, a one-line textual conflict.

## Apply steps (for whoever applies it after ratification; not the proposer alone)

- A1. Copy `AMD-013-one-readiness/tools/lib/readiness.mjs` to `tools/lib/readiness.mjs`. Copy the test to
  `tests/publish/readiness.test.mjs`. Apply `ordinary.diff`, then `protected.diff`, under `S3_AMENDMENT=AMD-013` with the
  trailer `Amendment: AMD-013`, in one commit.
- A2. Set `READINESS_SINCE` to the ratification date in that commit.
- A3. Re-run `measure.mjs` on the applying parent. If `main` has moved, a lesson published since `c31c1fab` may fail
  readiness. Re-run in that case, and either fix the lesson first or name it in the decision. Never add it to the
  grandfather list silently.
- A4. `npm run verify` green. Then a separate push sets this file's status to `applied (<sha>)`, so the ratified line
  stops licensing protected edits (AMD-001 O3, still open until AMD-003).

## Claimed benefit

`company status` stops telling every session that 223 lessons are ready to publish when 1 is. `company publish` can no
longer publish a lesson whose current learner verdict is revise, whose newest QA failed, or which is held. `check` stops
certifying published lessons on the existence of a file. CI catches a broken dispatch, memory, mailbox or publish tool
before it merges.

## What it removes

- A constraint. Today a chief of staff can `company publish` any of 223 lessons, and the gate passes them. After this, 1.
- The by-hand rule from the 2026-10-13 launch review (AMD-001 d, "until ratified, apply by hand").
- Nothing from the claim gates. No reviewer is removed.
- Tunability. Some of what judges moves into an unprotected file. See objection O1.

## Prediction and test

- prediction: on the applying commit, `company status` lists exactly the lessons that `node tools/publish-ready.mjs` lists
  as candidates, minus any that fail the claim floor (1 = 1 at `c31c1fab`). `check` passes with one new summary warning
  (268 grandfathered). In the 14 days after ratification, no lesson is published whose newest learner verdict is not
  `launch` on the current version, or whose newest QA record is not a pass on the current version. And the grandfather
  list's failing count falls, because lessons get stamped QA re-runs. It does not grow.
- would_be_wrong_if: (1) A lesson the founder and head-of-product agree is ready is held by a parser artifact, not by a
  real gap, more than twice in 14 days. Then the QA parsing is too brittle, and the board should look at the lenient
  variant (alternative A2) or a verdict template for QA. (2) The canary or the floor is bypassed, for example by
  hand-editing `meta.status` to `published` without `company publish`. `check` would catch that for any lesson outside
  the grandfather list. If it happens, the lesson is that the gate needs a publish receipt, which is a separate amendment.
  (3) CI time grows by more than 3 minutes per run because of part (b). Then the suites belong in a separate parallel job.
- side_by_side: done read-only for this draft (the table above, and tests 9 to 12 run the patched gate on the real repo
  in a shadow tree). After ratification, the first launch review compares `company status` with `publish-ready.mjs` and
  writes down every disagreement.

## Tests (companion `tests/readiness.test.mjs`, 12 cases; run 2026-10-17: 12 pass, 0 fail)

1. (i) `same-week-a-year-apart` passes the old gate's file-existence checks and is **not ready** under the new policy,
   with the reason `learner review: verdict revise`.
2. (ii) An active hold makes a lesson not ready even when every verdict passes. Every review-status lesson in the hold file
   is not ready on disk.
3. (iii) A lesson whose newest review is a launch (r2, v2), with an older revise (r1, v1) and an older QA fail, is ready.
4. to 7. QA rules: an unlinked newer fail counts; a same-day pass/fail tie fails closed; the version rules
   (stamp, build ancestry both ways, dates, same-day "cannot tell", `READINESS_SINCE`); exploratory notes are not
   verdicts; a newer linked unreadable record holds; the recorder hook.
8. The moved `decide()` equals `publish-ready.mjs`'s on all 1,283 lessons.
9. to 12. The patched `company.mjs` (the `protected.diff` hunk applied to a private copy, run in a symlinked shadow of the
   repo): `status` lists neither `same-week-a-year-apart` nor any held lesson; `check` raises no readiness error and warns
   for the 268; a mutant lib that always says ready trips the canary, so `status` lists nothing and `check` exits non-zero;
   a mutant lib that ignores holds trips the canary.

Also run: `tests/publish/*.test.mjs` with `ordinary.diff` applied and the lib in place gives 30 pass, 0 fail (the 18
existing plus the 12 above). The patched `check` on the repo passes: 1,283 lessons, 10,284 claims, 4 warnings.

## Objections and alternatives (each with what happened to it)

| # | From | Objection | What happened to it |
|---|---|---|---|
| O1 | evaluation steward (against the brief's preference) | **Moving the policy into an unprotected lib moves part of the judge outside the protection.** Any agent can edit `tools/lib/readiness.mjs` without an amendment. | Mitigated, not closed. The canary, the hold floor, the fail-closed wrapper and the parameters stay in `company.mjs`, so the lib cannot be made more permissive on the 7 canary shapes. It **can** be made more permissive on shapes the canary does not cover, for example by reading a new verdict synonym or excluding more QA filenames. Detection is review plus the 12 tests in CI (part b). Alternative A1 below closes it fully, at the cost of an amendment per tune. The board chooses. |
| O2 | evaluation steward | **268 grandfathered published lessons is a large list in a protected file**, and 219 of them are there only because of a same-day ambiguity that may be harmless. | Kept, with A2 as the alternative. The list never grows. It shrinks only by amendment, and `check` says when an entry can go. Unpublishing or re-reviewing 268 lessons is a product decision for head-of-product and the founder, not a gate decision. Proposed as a board item, not done here. |
| O3 | evaluation steward | **QA records are heterogeneous**: 442 of 1,788 have no canonical `result:` line, and most predate any version stamp. A strict reader could hold good lessons. | Bounded. Unlinked records without a result line are ignored. Only linked ones that cannot be read hold a lesson, and only when they are newer than the readable record. From `READINESS_SINCE` on, `qa-record` writes the stamp. Hand-written records (`qa-pr5`/`pr6` style) must add `result:` and `lesson version:` lines. That is a QA-tester brief change, routed as a board item. |
| O4 | evaluation steward | **The canary is fixed by the proposer** of the policy it guards (see "Does it change how the proposer is judged?"). | Its 7 cases are written out in the diff for the board to add to or change. Board decides. |
| O5 | evaluation steward | **Hand-editing `meta.status`** bypasses `company publish`. `check` catches it, but the grandfather set could hide a lesson re-published by hand. | Partly addressed. The set is a fixed list of slugs, so it cannot hide a new slug. A publish receipt would close it. Not proposed here (scope). |

Alternatives considered:
- **A1. Protect the lib** (add `tools/lib/readiness.mjs` to `protected-paths.txt`). This is the strongest option, and
  every tune would need an amendment. The founder's brief preferred tunability, so it is not chosen, but it is a
  one-line change to this amendment if the board prefers it.
- **A2. Lenient same-day QA.** Accept an unstamped QA record dated the same day as an older-version review. That
  grandfathers 49 instead of 268, and it accepts QA evidence that may be from the old build. It changes nothing for
  lessons recorded after `READINESS_SINCE`, which are stamped either way. I prefer strict (fail closed). A2 is one
  comparison in `qaVersionProblem`.
- **A3. Make `company.mjs` shell out to `publish-ready.mjs`.** Rejected. It inverts the dependency (the gate would trust
  a CoS script), and `publish-ready.mjs` has no QA rule.
- **A4. Leave the gate weak and make `status` print `publish-ready`'s list.** Rejected. It fixes the display, not the
  gate, and `company publish` would still pass 223.
- **A5. For part (b), run `npm run verify` in CI.** Rejected. It would build twice and run QA twice. The named suites
  are the gap.

## Does it change how the proposer is judged?

Partly yes. The evaluation steward owns the gates and proposed the canary that guards them. So the steward cannot be the
deciding approver. The constitutional review board decides, and the founder ratifies (assessment §1 finding 1: "Founder
ratifies"). principal-engineer reviews the diff. tools-lead reviews part (b) for CI cost and the AMD-010 interaction.

## Rollback

Revert the applying commit (a revert of a protected path also needs `Amendment: AMD-013`, which is still ratified until
A4's status push. After that, the revert needs a new amendment number or an emergency amendment in the AMD-012 style).
Parts (a) and (b) revert independently. Part (b) alone is a revert of 11 lines of `ci.yml`. A partial rollback of (a) is
to set `READINESS_SINCE = null` and empty the canary's strict cases. Do not do that: it reopens the gate for every
review lesson.

## Decision (constitutional review board)

(pending)

## Apply record (chief-of-staff, 2026-10-17)

- `AMD-013-one-readiness/apply-final.diff` is apply step A1 as one patch: the lib, the companion test, `ordinary.diff`, `protected.diff`, A2 (`READINESS_SINCE = "2026-10-17"`) and the principal-engineer conditions from `company/engineering/reviews/2026-10-17-amd013-review.md`:
  - C1: hold floor reads the hold file in `company.mjs`; an unreadable file closes every gate.
  - C2: an 8th canary case for `READINESS_SINCE`.
  - C3a: `QA_VERSION` accepts `lesson version: 3` as well as `v3`.
  - C4: `test:metrics` added to the `ci.yml` list.
  - Two new tests: a `loadHolds -> {}` lib cannot release held lessons; a malformed hold file closes gates with a message.
- C3b done: qa-tester filed a stamped v3 QA record for `left-or-right` (pass, phone and desktop; WebKit still owed, W-1661). The companion test now loads the installed lib after apply.
- Measured in a throwaway worktree on the applying parent: `check` passes (1,283 lessons, 268 grandfathered), publish tests 32/32, typecheck clean, `company status` lists only `zero-loses-to-this-crowd` as ready.
- Not yet applied to the repo: the session's permission policy refused the protected edit. Applying needs the founder's go-ahead in a session allowed to edit protected paths (`S3_AMENDMENT=AMD-013`), then `git apply` this file, commit with `Amendment: AMD-013`, and run verify (A4).

- A4 (2026-10-17, chief-of-staff): applied as aeb637c0b with `Amendment: AMD-013`. `npm run verify` on that tree: all 12 Node suites green (1,361 tests), `check` passed (1,283 lessons, 268 grandfathered), typecheck and production build green; the browser contract then finished: 2,576 passed, 0 failed (1.1 h). `npm run verify` exit 0. Status set to applied now so this file stops licensing protected edits (W-1680); if the remaining browser QA fails, the fix needs a new amendment number (Rollback section). W-1688 tracks the full browser QA result.

- Correction (chief-of-staff, 2026-10-18): the status was set to `applied` before the change reached the default branch, which made PR #8's constitution check fail ("AMD-013 is not ratified"). It is back to `ratified` until the merge into the default branch. Then a separate commit sets `applied (<merge sha>)`. Also added `fetch-depth: 0` to the verify job's checkout: the harness suites that part (b) added include HQ release tests that read git history, and they failed on CI's depth-1 checkout (3 of 68, reproduced locally in a shallow clone).

- A4 complete (chief-of-staff, 2026-10-18): the change reached the default branch in a6333dd05 (merge of PR #9, which carried PR #8 at 1a698587a). CI on that head: verify and constitution green. Status set to `applied`, so this file no longer licenses protected edits (W-1680).
