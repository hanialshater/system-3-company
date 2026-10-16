# Life Hacks launch slate: committed recall prediction (W-1083)

owner: analytics-steward (Grace)
date: 2026-10-16, about 15:05Z, at HEAD 8a12185
answers: ask A2 / W-1083 in `company/rituals/records/2026-10-16-domain-launch-lifehacks-r2.md` (a29b8e5). That record's prediction table links here.
format: the same as the r5 launch review's P1/P2 (`company/rituals/records/2026-10-16-launch-review-r5.md`, committed in df0b901)
status: **committed before any slate publish.** All seven `meta.json` files say `status: review` at HEAD 8a12185, and no publish commit exists for any of them. If a publish commit for a slate slug is dated before this file's commit, the rows below are late for that slug and are not scored for it.

## Scope

The seven slate lessons (r2 §2, tranche S): packing-cube-walls, pillowcase-set-kit, shelf-front-labels, rolled-or-folded-volume, suitcase-rotate-block, rebuild-the-procedure, spaced-beats-cram. The rows score **only the slate lessons that actually publish** (at least five, per r2). Unsigned rows that stay held are left out of the pool, and the read names which ones were left out.

## No real-learner data exists

**Nothing below can be tested today.** `/api/events` only writes to function logs, and nothing keeps them (W-706, backend-engineer, state `backlog`). Publishing is not deploying, and any deploy needs the founder's approval of that deploy. The slate's `launch` verdicts come from simulated learner evaluators. They are gate inputs, not evidence that anyone learned anything. This file says what will be measured once real events exist, and what result would count against the launch.

## Hypothesis

The slate's recall cards test the point of each lesson, so learners who come back will answer them well above chance (33%, three options on every card). That will be because of the lesson, not because the card is easy or the point was already known.

## Committed prediction

**Period.** Day 0 is the first day that persisted production events exist for any slate slug. That needs W-706 and a founder-approved deploy carrying the slate publish. The read is at day 0 + 14. If a minimum sample is not reached by then, the row reads **"no read"**, not a pass. The window can be extended once, to day 0 + 28. That extension is written in this file (under Result) before it starts. If the minimum is still not reached at day 28, the row stays "no read" and is re-committed, not re-interpreted.

**Definitions** (event types from `src/kit/types.ts`, the same as r5). A *start* is a `view` followed by at least one `predict` or `interact` in the same session. *First revisit recall* is the first `recall` event per learner and slug with `spacedDays >= 1` (`REVISIT_SCHEDULE_DAYS = [1, 3, 7, 21]` in `src/kit/progress.ts`). *Prediction correct* is the first `predict` per learner and slug. Chance on every slate recall card is 33% (3 options, checked in all seven `meta.json` `recall` blocks). Rates are pooled across the published slate lessons unless a row says otherwise.

**Why the thresholds sit higher than r5's.** Under D9/R6, five of the recall cards reuse the stage's own fixture or ask about the lesson's model directly. Several have one distractor that is easy to rule out (for example shelf-front-labels: "0 / 6 / 3" labels visible). I expect recall to be high whether or not the lesson taught anything. So L1 alone is weak evidence, and L2 (gain over the first prediction) is the row that carries the learning claim.

| # | Metric | Prediction | Period | Minimum sample | would_be_wrong_if |
|---|---|---|---|---|---|
| L1 | First revisit recall rate, pooled over the published slate (the learning metric) | **>= 60% correct** (expected range 60-80%) | day 0 to day 0 + 14 | >= 30 first revisits pooled, and at least 3 of the published slate lessons contributing | < 45% correct across >= 30 first revisits (chance, 33%, plus about 12 points) |
| L2 | Recall gain over the first prediction (same learners, same slugs) | first revisit recall exceeds first-prediction correctness by **>= 15 points** (expected range 15-35) | day 0 to day 0 + 14 | >= 30 learner-slug pairs with both events | the gain is <= 0 points across >= 30 pairs. Then a high L1 is evidence that the card is easy or the point was already known, not that the lesson changed anyone's mind |
| L3 | First-prediction correct rate (does each lesson target a real misconception?) | <= 55% correct, pooled | day 0 to day 0 + 14 | >= 50 first predictions pooled | > 70% across >= 50 first predictions. Then L1 cannot be credited to the lessons, whatever it shows |
| L4 | Slate against the feed (r2's draft: "at or above the feed median") | pooled slate L1 is **within 10 points of, or above,** the pooled first revisit recall of the r5 nine over the same calendar days | the same 14 days, aligned by calendar date | >= 30 first revisits on each side | the slate is >= 10 points below the r5 nine with >= 30 on each side |
| L5 | Per-lesson floor (does any single slate lesson fail on its own?) | every published slate lesson >= 45% | day 0 to day 0 + 28 | >= 15 first revisits for that lesson | any lesson with >= 15 first revisits is < 40%. That lesson goes back to cm-lifehacks and learning-designer as a recall card that does not test the point, or a lesson that does not teach it. A lesson under the minimum is "no read" |

would_be_wrong_if: L1 < 45% on >= 30 pooled first revisits, or L2 gain <= 0 points on >= 30 learner-slug pairs. Either one counts against the claim that the slate teaches its point, whatever the other rows show.

**On r2's draft.** I replace "at or above the feed median" with L4. There is no feed median today, and a median over lessons with few revisits each is mostly noise. A fixed, already-committed comparison set (the r5 nine, P1 >= 50%) over the same days is something we can score. The per-lesson "30 first revisits each" rule in r2's draft is replaced by pooling (L1) plus a lower per-lesson floor (L5). Seven lessons at 30 revisits each is 210 revisits, and I do not expect that within 14 days of a first deploy.

## Design

- **Arms.** None. This is passive feed telemetry with no holdout. The simpler explanations that are allowed to win:
  - (a) *Easy card*: predicts high L1, high L3 and L2 near 0.
  - (b) *Already known*: predicts high L3 and L2 near 0.
  - (c) *Survivor selection*: predicts a high L1 only among a small set of returning learners.
  - The lesson-teaches reading predicts high L1, moderate L3 and L2 >= 15.
- **Checks before reading any row** (the same as r5):
  - Logging: events persist for every published slate slug, and every event type above appears at least once per slug. Our own QA, smoke tests and learner-evaluator walks are excluded by agent and session marker before counting.
  - Sample ratio: starts per slug should not differ by more than about 3x across the slate once the feed exposes them. A slug with no `view`s is a logging or exposure fault. I hide that slug's L5 row, and I do not read it as a result.
  - Novelty: report day 0-2 and day 3-14 separately.
  - Recall selection: report L1 next to the revisit rate (first revisits / starts). If the revisit rate is under 10%, L1 is reported as "survivors only", not as the cohort's recall.
- **Scoring.** analytics-steward scores these rows at the first WBR after day 0 + 14 (L5 after day 0 + 28), in the WBR metrics section. The result goes under `## Result` below. Nothing in `## Committed prediction` is edited after this commit. The standing EXP-002 prediction (moderated sessions) and the r5 P1-P7 rows are separate and unchanged.

## Result

None. No real-learner data exists (W-706).

## What changed because of it

Nothing yet. The r2 decision needs this dated prediction (W-1083) and W-1082 before the category can pass.

## Objections

| # | Objection | Raised by | What happened to it |
|---|---|---|---|
| 1 | The recall cards reuse the stage's numbers (D9/R6). High recall may only mean the learner remembers a number, not the idea. | cm-lifehacks (r2 objection 5), restated by analytics-steward | **Accepted, built into the design.** The L1 thresholds are raised above r5's, and L2 (gain over the first prediction) is the row that decides whether the lesson gets credit. A high L1 with L2 <= 0 counts against the claim. |
| 2 | r2's draft compares against a feed median and asks for 30 revisits per lesson. | head-of-product (r2 prediction table) | **Replaced, with reasons (see "On r2's draft").** r2 left the sample rule to the steward. L4 keeps the comparison idea against a fixed set we can score. L1 pools the sample, and L5 keeps a per-lesson check at a reachable minimum. |
| 3 | This file is not an `EXP-*.md`, so `npm run check` does not enforce its section order or its `would_be_wrong_if:` line. | analytics-steward | **Accepted as a cost.** The dispatch named this path, and I was told to commit only this file, so I did not add a README index row. The sections and the `would_be_wrong_if:` line follow the EXP format by hand. If the chief of staff wants it enforced, the next steward session can rename it to EXP-006 and add the index row. That is a board item, not a change made here. |
| 4 | With W-706 in backlog and no deploy date, "day 0" may never come, and the prediction never gets scored. | analytics-steward | **Accepted, not mine to fix.** The row reads "no read" until events persist. W-706 belongs to backend-engineer, and the deploy is the founder's. The launch does not count as evidence of learning until then. |
| 5 | The slate mixes spatial-arithmetic lessons with study-method lessons (rebuild-the-procedure, spaced-beats-cram), so a pooled rate can hide one kind failing. | analytics-steward | **Accepted, answered by L5** (per-lesson floor). The read also reports the two study lessons' pooled L1 beside the five others. That is descriptive only, with no threshold committed. |

Signed: analytics-steward (Grace), 2026-10-16.
