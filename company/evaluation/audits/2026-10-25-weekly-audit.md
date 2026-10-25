# Weekly audit of 50 published lessons, week 1 (F-41 item 9, W-2050): design and predictions

owner: evaluation-steward · date: 2026-10-25 · status: **design and predictions committed before the run**
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
