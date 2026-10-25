# Weekly audit of 50 published lessons, week 1 (F-41 item 9, W-2050): design and predictions

owner: evaluation-steward · date: 2026-10-25 · status: **run; results below** (design and predictions committed first, 43d838cd0)
why now: AMD-017 (b) samples tier-S learner walks at 1 in 5 from today (F-51). This audit is its safeguard; the founder ratified knowing it had never run (company/decisions/2026-10-25-founder-f51-amd017.md). Two audits running with more than 1 fatal in 10 in a category switch (b) off for that category, in code (`auditRevoked`, tools/lib/tiers.mjs).

## What runs

- **Population:** every published lesson on 2026-10-25 (720) except `flatten-the-cube-to-a-dot`, which was published and deployed during this run and is not in the local build the walks use.
- **Sample:** 50, drawn without choice: sort by `sha256("weekly-audit-2026-10-25:" + slug)` and take the first 50. The list is `2026-10-25-weekly-sample.txt` (ai 3, chemistry 7, cs 9, economics 6, geography 2, life 3, math 8, physics 5, probability 7). Incubating domains have no published lessons in it, which matches their share (12 of 720).
- **Walk (artifact first):** `npm run walkthrough -- <slug>` (phone, option 1) against `next start` of the local build (BUILD_ID of 19:31Z; no published lesson other than the cube changed since). I read the transcript and the sheet and write findings **before** opening meta.json, build notes or past reviews.
- **Fact-check:** every factual sentence in the transcript is checked against my own derivation or knowledge, then against the lesson's claims ledger (only after the walk findings are written). Sources are not re-fetched in this run.
- **Checklist (held out):** written here today, after these lessons were built; no builder brief references it. It rotates every week (week 2 adds planted-case items). It is in the open repository, so it is held out from the past, not from the future.

| id | Question | Fatal when |
|---|---|---|
| H1 | Does the walk reach the reveal with the controls a learner would use, with no dead end or soft lock? | the reveal cannot be reached, or the page errors or is blank |
| H2 | Is every factual sentence the learner sees true (numbers, names, directions, units)? | a false statement is shown as fact, or the reveal teaches the wrong idea |
| H3 | Does the prediction have one defensible right answer, and does the reveal say which and why? | the marked answer is wrong |
| H4 | At 390 px, is all text and every control on screen and readable (no crop, overlap, overflow)? | text the learner needs is cut off or hidden |
| H5 | Does the reveal match what the explore stage showed (no contradiction between picture and words)? | the picture contradicts the conclusion |
| H6 | Is anything shown that is unsafe, demeaning or not for a general audience? | yes |

Verdict per lesson: **fatal** (any fatal condition), **revise** (a finding a learner would notice that does not mislead or block), **launch** (no finding).

## Arms and caps

One arm (no comparison). Cap: this session; if the walks cannot run (build, server or disk), the audit stops and the board item stays open with what blocked it. Disk floor: stop walks below 4 GB free; screenshots are deleted after review, transcripts kept.

## Measure and scoring

Fatal rate overall and per category; revise rate; walk completion. The record of results is `company/evaluation/audits/2026-10-25-weekly.json` (the gate reads `fatal` per lesson), plus a results section added to this file.

## Predictions

| id | Prediction | Wrong if | Confidence |
|---|---|---|---|
| A1 | Fatal flaws in at most 5 of 50 (at most 1 in 10), the AMD-017 floor | 6 or more fatal | 70% |
| A2 | At least 1 fatal in 50 | 0 fatal | 50% |
| A3 | Walks reach the reveal in at least 47 of 50 | 4 or more do not | 75% |
| A4 | At least 8 of 50 get revise | 7 or fewer | 55% |
| A5 | False learner-visible statements (H2 fatal) in at most 2 of 50 | 3 or more | 70% |
| A6 | No category exceeds 1 fatal in 10 of its own sampled lessons | any category does | 60% |

## Known limits (written before the run)

- One reviewer (the steward), the same model family as the builders: correlated with them. The walk is a borrowed-mind check, not a learner.
- One viewport (phone) and one choice (option 1). H4 at desktop is not checked.
- Sources are not re-fetched; a claim that needs a source I cannot check from knowledge is marked "unchecked", not "true".

## Results (2026-10-25, after the run)

Record: `2026-10-25-weekly.json` (one row per lesson: verdict, `fatal`, whether the walk reached the reveal, findings). Walks: `artifacts/walkthroughs/<slug>/` (transcripts kept locally, not committed).

| Measure | Result |
|---|---|
| Fatal | **0 of 50** (every category 0) |
| Revise | 1 of 50 (`base-rates`: the stage's picture text announces "1 tested positive" before the learner presses Test all, so a screen-reader learner hears the result early) |
| Launch | 49 of 50 |
| Walk reached the reveal | 49 of 50 by the walkthrough; 50 of 50 with a probe (below) |
| False learner-visible statements | 0. Every number in the 50 reveals was recomputed (exact binomial, SIR final size, PageRank, Gale-Shapley both ways, saturation pressures, bond energies, and so on) |
| Lessons in the sample that fail the gate on main | 31 of 50 (407 of 720 published lessons fail it: learner verdict for an older version, mostly after the 10-20 copy pass bumped versions) |

### Verdicts on the predictions

| id | Prediction | Verdict |
|---|---|---|
| A1 | at most 5 fatal | **right** (0) |
| A2 | at least 1 fatal | **wrong** (0). I expected the 10-14 rush to have left at least one soft lock or false claim among 50; none was found by this reviewer on this path. |
| A3 | at least 47 reach the reveal | **right** (49 by the walk, 50 with the probe) |
| A4 | at least 8 revise | **wrong** (1). The published catalog is cleaner than I predicted on the phone path, option 1. |
| A5 | at most 2 false statements | **right** (0) |
| A6 | no category above 1 fatal in 10 | **right** |

What I now believe, and how sure: the published single-card catalog, on the path a learner takes first, has a fatal rate well under 1 in 10 (90% sure it is under 1 in 10; 0 of 50 gives an upper 95% bound of about 6%). I am **not** sure the audit can find what it is looking for: one reviewer, the same model family as the builders, on the same path the builders' QA follows, found nothing. A clean result from a correlated reviewer is weak evidence (artifact-before-account, known failure). Week 2 therefore plants known flaws to measure the audit's own detection rate.

### Findings that are not about a lesson

1. **The walkthrough misses autoplay reveals.** `odd-numbers-make-squares`: the walk presses "Keep going" and checks the reveal 1.2 s later, at total 16; the autoplay reaches 25 within 3 s and unlocks it (`artifacts/audit-probe-odd.mjs`). The walk reported "the reveal never unlocked". Owner: tools-lead (`tools/walkthrough.mjs`, wait for the reveal button up to a ceiling after the last press). The QA contract follows the same path; whether it has the same blind spot is the steward's to check (W-2050 follow-up).
2. **The referee is red on main and has been for days.** `npm run check` reports 810 errors; 792 are published lessons failing the gate (408 lessons), almost all a learner verdict for an older version. Everyone treats 810 as the baseline. This audit re-walked 31 of them and found none fatal, which says the versions moved for copy, not for content; but a gate everyone ignores is not a gate. Proposal for the next amendment cycle: grandfather the copy-pass versions explicitly (as AMD-013 did) or re-stamp their walks, so that `check` can go green and a new failure is visible.
3. **A published lesson with unverified claims.** `twenty-flips-run-of-five` c2 and c5 (implementation notes about seeds and the tap reveal) are unverified; the lesson is live. Owner: the probability fact-checker queue.

### Deviations

- The walks used the 19:31Z build; the release-manager deployed r22 during the run (the cube only, excluded from the sample).
- Screenshots were deleted after review to keep disk above 4 GB (it fell to 3.9 GB once, during the walks, with other sessions writing).

## Next audit

Week 2, due **2026-11-01**: a new hash seed; a rotated checklist; 5 planted flaws (a wrong marked answer, a false number in a reveal, a dead control, text cut at 390 px, a reveal that contradicts the stage) mixed into a copy of the sample on a scratch build, to measure the audit's detection rate; a second reviewer persona; desktop as well as phone. With two audits on disk, `auditRevoked` starts to bite.
