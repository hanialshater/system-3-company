# EXP-006: Launch predictions for the r6 and r7 lessons (cut-the-busiest-link and the four NCM gap lessons)

owner: analytics-steward (Grace) · date: 2026-10-16, about 23:40Z, at HEAD acfd871d · board: W-1529 (r6 objection 2); r7 "Committed predictions" section · status: **committed before any deploy that carries these five lessons; not run**
answers: `company/rituals/records/2026-10-16-launch-review.md` (r6, objection 2) and `company/rituals/records/2026-10-16-launch-review-ncm-gap4.md` (r7, "Committed predictions"). Both records now link here.
format: the r5 launch prediction (`company/rituals/records/2026-10-16-launch-review-r5.md`, P1-P7) and the Life Hacks slate file (`company/experiments/2026-10-16-lifehacks-launch-prediction.md`), filed as an `EXP-*` so `npm run check` enforces the section order and the `would_be_wrong_if:` line.

## Scope

Five published lessons, each at the version its launch review named:

| Lesson | Version | Published by | Launch review |
|---|---|---|---|
| cs/cut-the-busiest-link | v2 | f6b2a22e (2026-10-16 20:59Z) | r6 + addendum |
| probability/same-picture-two-histories | v2 | c97973e7 (2026-10-16 23:34Z) | r7 |
| economics/price-tag-or-auction | v2 | c97973e7 | r7 |
| economics/worth-something-alone | v2 | c97973e7 | r7 |
| math/the-swap-that-goes-in-circles | v1 (with fc8c53b8) | c97973e7 | r7 |

## Timing: late against r5's standard, not late against the data

- r5 committed its rows before any publish commit. These rows come **after** the publish commits above, so they do not meet that standard, and I say so here rather than leave it to be found.
- They are still committed before any result could be read. The last deploy is 6cbce514 (Release r8, 19:07Z), which predates both publish commits, and no `[deploy]` commit exists after f6b2a22e. `/api/events` only writes to function logs, and nothing keeps them (W-706, backend-engineer, `backlog`). No one in the company has read an event for these slugs.
- Production can serve non-published lessons by direct URL (W-480, `findDemo` passes `includeDrafts: true`). Any such play before this commit is excluded by construction: day 0 below starts only after a founder-approved deploy that carries these publishes.
- **Lateness rule.** If a deploy carrying any of these five slugs is dated before this file's commit, the rows are late for that slug and are not scored for it.

## No real-learner data exists, and the current events cannot compute r5's per-learner rows

**Nothing below can be tested today.** The `launch` verdicts behind r6 and r7 come from simulated learner evaluators. They are gate inputs, not evidence that anyone learned anything.

Even after W-706 persists events, the logged fields limit what can be measured. What I read on disk:
- `src/lib/events-intake.ts` logs `{ at, type, slug }` plus per-type fields only, with "no cookie, no IP, no user agent, no session id" (P6.2). Nothing ties a `predict` to a later `recall` from the same learner, or a `view` to a `predict` in the same session.
- `src/components/Feed.tsx` (RevisitCard) sends `recall` on every revisit answer, with `spacedDays` = rounded days since the first completion. There is no ordinal, so a first revisit cannot be told from a second one. EXP-005 (line 71) found the same.
- `src/kit/Lesson.tsx` sends `predict` once per mount (a replay sends another), `view` on every mount, and `reveal` and `complete` together, so `dwellMs` is time from mount to reveal.

So Surface Value #4 (first spaced-revisit recall) and r5's P2 (learner-slug pairs) are **not measurable** on the current events. I still commit predictions for them (rows F1, F2), so that nobody writes them after an instrument arrives, and I add rows that are measurable on the current fields (A1-A6). Those rows are weaker, and each says how. If F1/F2 are still unmeasurable at the read, they are reported as "not measured". Engagement rows never stand in for them. The instrument question is routed (board, owner privacy-reviewer, see objection 2).

## Hypothesis

Each of the five lessons targets a real misconception (most first predictions are wrong, and the wrong ones cluster on the misconception option). The reveal is reached by most learners who commit a prediction. Learners who meet the revisit card answer it well above chance (33%: every predict and recall card here has 3 options, checked in each `Demo.tsx` and `meta.json`), and above the rate at which they predicted correctly, because the lesson changed what they think, not because the card is easy.

## Committed prediction

**Period.** Day 0 is the first day that persisted production events exist for any of the five slugs. That needs W-706 and a founder-approved deploy that carries these publishes. The read is at day 0 + 14. Per-lesson rows (A5, A6) read at day 0 + 28. If a minimum sample is not reached, the row reads **"no read"**, not a pass. The day-14 window can be extended once, to day 0 + 28, and the extension is written under `## Result` before it starts. If the minimum is still not reached at day 28, the row stays "no read" and is re-committed, not re-interpreted.

**Definitions** (event types from `src/kit/types.ts`; fields from `src/lib/events-intake.ts`).
- *Predict-correct rate*: `predict` events with `correct: true` / all `predict` events for the slug. Replays are included, and they are more likely correct, so this rate is biased upward against the true first-prediction rate.
- *Reveal rate*: `reveal` events / `predict` events for the slug. A reveal needs a committed prediction first (`Lesson.tsx`), so this is a per-play proxy for Surface Value #5. I do not use `view` as the denominator, because a view fires on every mount.
- *Revisit recall rate*: `recall` events with `correct: true` and `spacedDays >= 1` / all `recall` events with `spacedDays >= 1`, for the slug. This counts all revisits, not first ones. A correct answer pushes the next revisit out (`REVISIT_SCHEDULE_DAYS = [1, 3, 7, 21]`, `src/kit/progress.ts`), while a wrong one brings it back after a day. So wrong answers are over-represented in later revisits, which biases this rate downward against Surface Value #4.
- *Misconception option*: the predict option that states the lesson's `meta.json` misconception. cut-the-busiest-link: index 0 ("12, the same"). same-picture-two-histories: index 0 ("Yes: they picked friends of their own colour"). price-tag-or-auction: index 0 ("2", the auction always wins). worth-something-alone: index 1 or 2 ("About 10%" / "About 80%", any stand-alone value gets it started). the-swap-that-goes-in-circles has no option that states its misconception ("circular preferences are harmless"), so it is left out of A3.
- Pooled rates are pooled over the five lessons unless a row says otherwise.

| # | Metric | Prediction | Period | Minimum sample | would_be_wrong_if |
|---|---|---|---|---|---|
| A1 | Revisit recall rate, pooled (all revisits; the measurable stand-in for the learning metric) | >= 55% correct (expected range 55-75%) | day 0 to day 0 + 14 | >= 30 recall events with `spacedDays >= 1`, from at least 3 of the five slugs | < 40% across >= 30 events (chance, 33%, plus about 7 points) |
| A2 | Recall over prediction, pooled (population-level, not paired) | the A1 rate exceeds the pooled predict-correct rate by >= 15 points | day 0 to day 0 + 14 | A1's minimum, and >= 50 predict events | the gap is <= 0 points. Then recall is no evidence that the lessons changed anyone's mind, whatever A1 says |
| A3 | Misconception share of wrong predictions (do the lessons target the misconception they name?), pooled over the four mapped lessons | >= 60% of wrong predictions pick the misconception option | day 0 to day 0 + 14 | >= 40 wrong predictions over the four | < 45% of wrong predictions pick it (an even split between the two wrong options is 50%). Then the named misconception is not what learners bring, and the reveals answer a question learners did not have |
| A4 | Predict-correct rate, pooled (is the point new to learners?) | <= 50% correct | day 0 to day 0 + 14 | >= 50 predict events | > 70% correct across >= 50. Then most learners already knew the point, and A1 cannot be credited to the lessons |
| A5 | Reveal rate, per lesson (do the simulated "launch" verdicts predict no real dead end?) | each of the five >= 60% | day 0 to day 0 + 28 | >= 20 predict events for that lesson | any lesson with >= 20 predict events has < 40% reaching the reveal. That lesson goes back to its CM and the release-manager as a possible dead end. For the r7 four, the reveal lock that says only "Try it first" (r7 objection 2, W-1593) is the first suspect |
| A6 | Median `dwellMs` on `complete`, per lesson (engagement only, **never reported as learning**) | between 30 s and 120 s for each lesson | day 0 to day 0 + 28 | >= 20 completes for that lesson | any lesson's median is < 20 s or > 180 s. This tests the 60-second format only. A long dwell can mean confusion as easily as interest |
| F1 | First spaced-revisit recall rate, pooled (Surface Value #4) | >= 50% correct | day 0 to day 0 + 14, once an instrument exists | >= 30 first revisits | < 40% across >= 30 first revisits. **Not measurable on current events**: reported as "not measured" until a first-revisit marker exists; never replaced by A1 or by engagement |
| F2 | First-revisit recall gain over the same learner's first prediction (r5 P2) | >= 15 points | as F1 | >= 30 learner-slug pairs | the gain is <= 0 across >= 30 pairs. **Not measurable on current events** (no pairing field), reported as F1 |

would_be_wrong_if: A1 < 40% on >= 30 pooled revisit recalls, or A2's recall-over-prediction gap <= 0 points (on A2's minimum), or, once measurable, F1 < 40% on >= 30 first revisits or F2's gain <= 0 on >= 30 pairs. Any one of these counts against the claim that these five lessons teach their point, whatever the other rows show. A4 > 70% or A3 < 45% counts against the claim that they target a misconception learners hold. A5 < 40% for a lesson counts against that lesson's launch verdict.

## Design

- **Arms.** None. This is passive feed telemetry with no holdout, so nothing here can show cause. The simpler explanations that are allowed to win, and what each predicts:
  - (a) *Easy card*: high A1, A2 near 0. On three of the five recall cards (same-picture-two-histories, worth-something-alone, the-swap-that-goes-in-circles) the right option is the longest and restates the lesson's title idea. If A1 is high only on those three, read (a) first.
  - (b) *Already known*: high A4, A2 near 0.
  - (c) *Survivor selection*: high A1 only among the few who return. Report A1 next to the revisit volume (recall events / predict events). Under 10%, A1 is reported as "survivors only", not as the cohort's recall.
  - (d) *Replay inflation*: A4 rises if many plays are repeats. Report predict events per view beside A4. A ratio above 1 per view means more than one prediction per mount, which is a logging fault.
  - The lesson-teaches reading predicts high A1, A4 at or below 50%, A3 at or above 60% and A2 >= 15.
- **Checks before reading any row** (Twyman: anything that looks interesting is probably wrong until these pass).
  - Logging: events persist for all five slugs, and every event type used above appears at least once per slug. Our own QA, smoke tests and learner-evaluator walks are excluded (by date window and agent marker) before counting. A slug with no `predict` events is a logging or exposure fault, not a result.
  - Sample ratio: predict events per slug should not differ by more than about 3x among the five once the feed exposes them. A slug outside that is hidden from pooled rows and named.
  - Novelty: report day 0-2 and day 3-14 separately. An A5 or A6 move that exists only in day 0-2 is not read as preference.
  - Version: a slug whose `meta.json` version changes during the window is cut at the change, and only the named version above is scored.
- **Comparison, descriptive only.** Beside A1, report the r5 nine's pooled revisit recall over the same calendar days. No threshold is committed on it.
- **Scoring.** analytics-steward scores these rows at the first WBR after day 0 + 14 (A5, A6 after day 0 + 28), in the WBR metrics section. The result goes under `## Result` below. Nothing in `## Committed prediction` is edited after this commit. The r5 P1-P7 rows, the Life Hacks L1-L5 rows and EXP-002 are separate and unchanged.

## Result

None. No real-learner data exists (W-706), and no deploy has carried these five lessons.

## What changed because of it

Nothing yet. r6 objection 2 and the r7 "Committed predictions" gap are closed by this commit. The release-manager no longer needs to name a missing analytics row for these five in a release record.

## Objections

| # | Objection | Raised by | What happened to it |
|---|---|---|---|
| 1 | These rows were written after the publish commits, so they miss r5's "before any publish commit" standard. | analytics-steward | **Accepted, stated in "Timing".** The protection Twyman's law needs is "before a result can be read", and no deploy has carried these slugs and no event is kept. The lateness rule makes a deploy dated before this commit void the rows for that slug. |
| 2 | Surface Value #4 cannot be computed on the current events: no first-revisit marker, no pairing of predict and recall, no session. This also affects the r5 P1/P2 and the Life Hacks L1/L2 definitions, which assume per-learner data. | analytics-steward (reading `src/lib/events-intake.ts`, `src/components/Feed.tsx`; EXP-005 line 71) | **Open, routed** to privacy-reviewer as a question on the board: may the client add `first: true` to the first `recall` per slug, and to the first `predict` per slug, computed from local progress, with no identifier? That would make F1 measurable and give a cleaner A4. It is not mine to decide or build. Until it lands, F1/F2 are "not measured". |
| 3 | The aggregate rows are biased: A4 upward (replays), A1 downward (wrong answers come back sooner). A2 is the difference of two biased rates from different people. | analytics-steward | **Accepted, built into the thresholds.** The two biases both shrink A2, so A2 >= 15 is a harder bar than r5 P2, not an easier one. A2 <= 0 still counts against the claim. |
| 4 | Pooling five lessons from four domains can hide one failing. | analytics-steward | **Accepted, answered by A5 and A6 per lesson.** The A1 read also reports each lesson's own rate, descriptive only, with no threshold, because no single lesson is expected to reach 30 revisits in 14 days. |
| 5 | The swap lesson has no predict option that states its misconception, so A3 cannot test it. | analytics-steward | **Accepted, left out of A3.** Whether the predict should target "circular preferences are harmless" is cm-math-discrete's call, not mine. I note it here and do not file it as a hold. |

Signed: analytics-steward (Grace), 2026-10-16.
