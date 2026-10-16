# EXP-004: Does a sealed prediction swap raise first spaced-revisit recall? (PRD-003)

owner: analytics-steward (Grace) for the registration and the analysis; growth-designer (Jonah) for the content (PRD-003) · status: **registered 2026-10-16, not running.** Two parts are blocked on instruments the privacy ruling did not pass (see "Blocked parts"), and the feature itself waits on F-26 (moderator, 10-30) · date: 2026-10-16 · board: W-1214, W-1283, W-1309, W-1140 · batch: company/ops/dispatch-requests/2026-10-16-r5-product.md#B3
source of the prediction: `company/product/prds/PRD-003-first-light-social-prediction-swap.md` §8 (SHA of main at registration: 6838dba). The event definition: `company/reviews/_privacy/2026-10-16-experiment-beacon-exp-event.md` (conditional pass, C1 to C9). Shared answers (C3, W-1283, W-1309, the server list): `company/experiments/EXP-005-first-light-challenges-recall.md`, "Registration answers". **This file does not change a PRD metric.** Where the PRD's metric cannot be measured with the ruled event, this file says so and routes it. It does not choose a substitute.

## Hypothesis
After a learner has committed a prediction and seen the reveal, seeing that a friend predicted differently makes them explain the wrong option to themselves. That should show up as higher recall at the lesson's first spaced revisit. (PRD-003 §1 and §4 option C. This is a hypothesis here. Peer instruction working elsewhere does not count as evidence for it here.)

## Committed prediction
Committed 2026-10-16, before any build, deploy or data. No learner has seen a swap. `REGISTERED_EXPERIMENTS` in `src/lib/events-intake.ts` is empty, so no `exp` row can exist yet.

Metric: Surface Value #4, the first spaced-revisit recall rate. It is defined in "Metric definition" below.

The PRD's prediction, quoted from PRD-003 §8 and not reworded:
- **P1 (primary):** swap recall is **at least 4 points higher** than the comparison on the same lessons.
- **P2 (within swaps):** recipients whose prediction differed from the sealed one recall **at least 6 points higher** than the comparison. **Blocked: it cannot be measured with the ruled event.** See "Blocked parts" B2.
- **Guardrail G1 (Surface Value #5):** prediction-to-reveal completion on `/s/<token>` is not lower than on `/d/<slug>` by 3 points or more. **Blocked: it cannot be measured with the ruled events.** See B3.

would_be_wrong_if: with at least 150 first-revisit recalls in the swap group, the swap-minus-comparison difference is below +2 points (no learning benefit worth a moderator), or the swap group recalls 3 points or more **below** the comparison (harm: switched off at once). (PRD-003 §8, verbatim in substance.) If 150 is not reached within 30 days of launch, the result is "unresolved". Unresolved does not mean kept. Head-of-product decides at the first distillation (AMD-008 X3), and engagement numbers are not an argument there.

The steward's own forecasts, committed now so that they can be scored:
- **About 75% that the 30-day read is "unresolved".** The swap is for signed-in 16+ accounts only, it is off by default (R10), each sender is limited to 3 open swaps (R8), and few learners will exist at launch (PRD-003 objection 1).
- **If 150 is reached:** about 30% that the observed difference is at least +2 (the growth-designer says 35% that the true +4 holds). About 10% that it is -3 or worse.
- **Noise in the 150 threshold, worked out now so that it cannot be argued after the result.** Assume a recall rate near 65% and a comparison group much larger than the swap group. Then the swap group's standard error at n = 150 is about 3.9 points, and its 95% interval is about ±7.6 points. That has three consequences. A feature with **no** effect clears the +2 bar about 30% of the time. A feature with **no** effect trips the -3 harm line about 22% of the time. A true +4 effect still reads below +2 about 30% of the time. The result is therefore reported **with its interval**, and the PRD's thresholds are applied as written. I do not change them. I record this as objection 1 to head-of-product.
- **Not success measures, and never reported as learning:** swaps sent, swaps claimed, swap-backs, return visits, sessions. They are labelled engagement (AMD-008 X1).

## Design

### Metric definition (Surface Value #4, as both First Light experiments use it)
- **One unit** is one (browser, lesson) pair: the **first** recall answer given for that lesson after it was completed. This is the answer recorded when `recalls` is empty before the answer is appended. It is answered at or after the first scheduled revisit (`REVISIT_SCHEDULE_DAYS[0]` = 1 day, `revisitDue()` in `src/kit/progress.ts`). Later revisits are not counted.
- **The rate** is the number of units with `correct: true` divided by all units in the cell. It is counted in **events**, not in learners, because the beacon carries no identifier. One browser can contribute one unit per lesson.
- **Origin** means where the lesson was **first played**. The swap page writes `s3c:origin:v1` = `swap` for a slug only if that slug had no `completedAt` when the page loaded. A recipient who had already played the lesson ("You had already played this", R3) is not in the swap group. The marker is never overwritten.
- **Same lessons:** each comparison is made slug by slug. Each slug's difference is weighted by its number of swap-group units, so the result does not depend on which lessons happen to get swapped.
- **Window:** the server `at` falls inside the experiment period. Only the **production** deployment's log counts. Preview and QA events are excluded by deployment, not by any field.

### Groups and cohort split
- **Swap group:** first revisits on lessons first played by claiming a swap. These are signed-in 16+ accounts by construction (R1, R3, R4). Source: `exp` events with `origin: "swap"`. The `exp` id is EXP-004, or EXP-005 when PRD-004's arm exists in that browser (one event per first revisit, never two: EXP-005 "Registration answers", C3).
- **Comparison (PRD-003 §8):** "the same lessons first played from the feed or `/d/<slug>` by signed-in 16+ learners (origin 'none')". **Blocked: the ruled beacon cannot isolate this cohort.** See B1.
- **No randomised arm is added (decision, 2026-10-16).** PRD-003 §8 allows me to add one, for example half of claimed swaps keeping the panel sealed for good. I do not, for three reasons. (1) It halves a sample that is already unlikely to reach 150 in 30 days. (2) A panel that stays sealed for good is a learner-visible behaviour, and the current copy ("sealed until you see the answer") would then be false. That copy is growth-designer's, and the behaviour is product scope, which is not mine. (3) It would test the sealed panel, not the swap. So `arm` stays **absent** on swap events from browsers without a PRD-004 arm. If head-of-product wants the causal arm anyway, growth-designer writes the copy and this file gains a dated amendment **before** any data.

### Period
- **Opens:** on the first production deploy that has the swap flag on, after F-26, the EDD (W-1131) and the privacy gate's P4.3. The steward writes the date into "Result" from the deploy record. It is not back-dated.
- **Read once,** at the earlier of two points: 150 swap-group units, or 30 days after opening. The harm line is read at the same look. There is no daily peeking. If the moderator or privacy route needs an earlier harm look, it is made **only** at 150 units and is recorded as that look.
- **Server collection closes:** `2027-01-01` (the first UTC day on which the server drops EXP-004 rows). If launch moves later than 2026-11-30, this date moves forward by a dated amendment **before any EXP-004 row exists**. After the first row exists it is never moved to rescue a result. If more time is needed then, a new EXP number is registered.
- **Retention (C7):** raw rows are kept for at most 90 days, and are deleted at close if that comes sooner. Today the only copy is Vercel's function log, whose retention is unknown (E13), so "delete at close" cannot be done by us yet. The data inventory (D6a) already records this.

### Competing explanations, and what each predicts
- **Selection** (people whose friends send them lessons differ from feed learners). This predicts a positive difference that does not depend on whether the predictions differed. P2 is the test that separates it from the hypothesis, and P2 is blocked (B2). Until B2 is answered, a P1 "pass" does **not** distinguish the mechanism from selection, and it is reported that way.
- **Novelty** (every First Light surface is new in the first 30 days). This predicts an effect that shrinks over the period. The read reports the first and second halves of the period separately when each half has at least 20 events (C6).
- **Re-exposure** (a swap shows the reveal page again). This would act on the reveal, not on the friend's option. It cannot be separated without the arm I declined to add, and that limit is stated in the result.

### Blocked parts (routed, not chosen)
- **B1. PRD-003's comparison cohort: signed-in 16+ learners, origin none.** The ruled event must be identical for signed-in and anonymous learners (C5). Sending an `origin: "none"` copy only from signed-in 16+ browsers would make the event's presence reveal that a browser is signed in, and the ruling did not pass that. The ordinary `recall` event cannot stand in either. Its `spacedDays` is elapsed days (`src/components/Feed.tsx` line 258), not an ordinal, so it cannot isolate first revisits. It carries no band and no sign-in state. It also ignores GPC and DNT, while `exp` obeys them (C8), so subtracting one from the other mixes two different populations. **Three options, for the owners to choose:** (a) use the all-browser `origin: "none"` units that EXP-005 collects on the same slugs. That changes the PRD's cohort, so it is head-of-product's and growth-designer's call, and it disappears if challenges are cut on 11-06. (b) Use the W-1140 (Q5) server-side aggregate from the `recall` table, restricted to 16+ accounts and the same slugs, as the comparison. This matches the PRD's cohort, but it extends the Q5 purpose and adds a band split, so it is privacy-reviewer's to read. The query text returns to her before it runs (her EDD-008 Q5 condition). Its known bias: swap recipients' lessons fall into the comparison, which biases toward 0. The swap group and the comparison would also come from different instruments (beacon and database), so beacon losses to GPC, DNT and blockers do not hit both groups the same way. (c) Add the randomised arm I declined above. **My recommendation is (b).** It is the only option that keeps the PRD's cohort.
- **B2. P2, "recipients whose prediction differed".** None of the ruled fields records whether the recipient's first prediction matched the sealed one, and `origin` and `arm` cannot carry it without changing what they mean. Measuring P2 needs a new field, for example `differed: boolean` on swap-origin events, or a new origin value. That is privacy-reviewer's to read and growth-designer's to specify. Until then P2 stays committed and unmeasured, and it is reported as "not measured". Nobody fills it in afterwards with a different instrument.
- **B3. G1, completion on `/s/<token>` against `/d/<slug>`.** The kit's `predict` and `reveal` events carry only `slug`, and the kit is protected (C9). The `exp` event is sent only at the first revisit. Nothing the ruling passed can tell a swap-page play from a `/d/` play. Measuring G1 needs a send at reveal or prediction on marked plays, outside the kit. That is privacy-reviewer's (a new send moment) and principal-engineer's (where it sits, C9). PRD-004's guardrail has the same gap (EXP-005 B1), so one design should answer both.

### W-1140 answer (2026-10-16): the EDD-008 Q5 recall-rate aggregate
The aggregate the analytics steward will ask for. It is a definition, not a query. Under privacy-reviewer's EDD-008 Q5 condition, **the query text goes to her before it runs on real data**, and no raw `recall` row goes to any analyst.
- **Source:** `recall` (`user_id`, `slug`, `at_ms`, `correct`) and `progress` (`completed_at_ms`), signed-in accounts only. It is labelled "signed-in learners" and never presented as the whole population's rate.
- **Ordinal and step:** within each (`user_id`, `slug`), rows are ordered by `at_ms`. The ordinal k is the position, counting from 1. The schedule step is `REVISIT_SCHEDULE_DAYS[min(correct answers before this row, 3)]` (1, 3, 7 or 21). Rows with `at_ms < completed_at_ms` (clock errors, or merges) are excluded and counted on a separate line.
- **Headline, Surface Value #4:** first spaced-revisit recall rate = correct rows with k = 1 divided by all rows with k = 1, by UTC week of `at_ms`.
- **Secondary:** recall rate by schedule step (correct over total, rows k ≥ 1). This is the "by interval" figure EDD-008 Q5 names.
- **Cells and output:** week × step, and week × slug for the headline. The output columns are only `week`, `step` or `slug`, `learners`, `recalls` and `correct`. There is no `user_id`, no email and no time finer than a week. **Any cell with fewer than 20 distinct learners is suppressed.** I accept privacy-reviewer's number of 20, because at 20 a cell's rate already has about ±20 points of noise. A smaller cell would be both less private and useless.
- **Excluded:** accounts that the backend-engineer lists as test or QA accounts. The list is kept outside the query output, and the query uses it only to exclude rows.
- **Never joined** to `exp` beacon rows, the swap tables or the report tables (C6). If B1's option (b) is chosen, the Q5 aggregate and the `exp` aggregate are compared side by side as two published aggregates, not joined row by row.

## Result
(not run; no data exists)

## What changed because of it
(nothing yet)

## Objections
| # | Objection | Raised by | Status |
|---|---|---|---|
| 1 | At n = 150, the +2 and -3 thresholds sit inside the noise (worked out above). A no-effect feature passes about 30% of the time and trips the harm line about 22% of the time | analytics-steward | **Open, routed to head-of-product and growth-designer.** The thresholds are kept as the PRD wrote them, because changing them is not mine. The result is reported with its interval. Raising the threshold or widening the bars needs a dated PRD change **before** data |
| 2 | P1 cannot be read as the mechanism without P2 (selection) | analytics-steward | **Open with B2.** A P1 pass is reported as "consistent with selection or the mechanism" until P2 is measurable |
| 3 | The comparison cohort (B1) and the guardrail (B3) have no instrument | analytics-steward | **Open, routed** to head-of-product (B1 cohort), privacy-reviewer (B1 option (b), B2, B3) and principal-engineer (B3 placement). The swap cannot launch before F-26 and W-1131 anyway, so this is not on the 10-31 path |
