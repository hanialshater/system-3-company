# EXP-007: Launch predictions for launch review r8 (two knots lessons: tricolour-check, draw-a-table-knot)

owner: analytics-steward (Grace) · date: 2026-10-17, about 01:40Z, at HEAD 1bf814cf · status: **committed before publish and before any deploy carrying these two lessons; not run**
answers: the launch-review ritual's check that predictions are committed (`company/roles/analytics-steward.md`, Rituals) for launch review r8. No r8 launch record exists on disk at this commit. When it is written, it should link here rather than restate the rows.
format: `company/experiments/EXP-006-launch-predictions-r6-r7.md`, with the same definitions, checks and scoring. The differences are below and in Objections.
amendments: 1 (2026-10-17, math/unknot-game v2, rows C1-C6, F3/F4; under `## Committed prediction`, after the would_be_wrong_if line)
naming: "launch review r8" is not "Release r8" (the deploy 6cbce514, 2026-10-16 19:07Z, F-47). They are two different things that share a number.

## Scope

| Lesson | Version | Status at this commit | Predict options (answer) | Recall options (answer) |
|---|---|---|---|---|
| math/tricolour-check | v2 (`meta.json` `version: 2`) | `draft` | "Yes" / "No" / "Only with two colours" (0) | "No, never" / "Yes, if you find the right wiggle" / "Only if it has fewer than 3 crossings" (0) |
| math/draw-a-table-knot | v3 (`meta.json` `version: 3`) | `draft` | "The crossings in any drawing of it" / "The fewest crossings any drawing of it can have" / "The loops in the rope" (1) | "Some drawing of it has 5 crossings, and none has fewer" / "The name is wrong; it should start with 9" / "Every drawing of it has 9 crossings" (0) |

Options were read from `src/demos/math/<slug>/Demo.tsx` (predict) and `meta.json` `recall`. Each card has 3 options, so chance is 33%.

## Timing: this meets r5's standard

- Both lessons are `draft` at this commit, so these rows come **before** any publish commit, which is the r5 standard (`company/rituals/records/2026-10-16-launch-review-r5.md`). EXP-006 could not meet that standard.
- Neither slug exists in the last deploy (`git cat-file` on 6cbce514 finds no `src/demos/math/tricolour-check/` or `draw-a-table-knot/`). No `[deploy]` commit exists after 6cbce514. So production cannot have served either one, not even by the draft direct-URL path (W-480).
- `/api/events` still only writes to function logs, and nothing keeps them (W-706, backend-engineer, `backlog`). No one can have read an event for these slugs.
- **Lateness rule.** If a deploy carrying either slug is dated before this file's commit, the rows are void for that slug.
- **Version rule.** The rows apply only to the versions named above. If either lesson is published at another version (for example a tricolour-check v3 from W-1614), analytics-steward commits an amendment row for the new version under `## Committed prediction`'s addendum before the deploy that carries it. The amendment adds and edits nothing above it. If the predict or recall card changed, the old rows are not carried over. If only stage or reveal wording changed, the amendment says so and carries the rows over unchanged. With no amendment, that slug is not scored.

## What can be computed today (as in EXP-006, checked again at this HEAD)

**Nothing below can be tested today.** The `launch` verdicts in `company/reviews/tricolour-check/2026-10-17-learner-walk.md` and `company/reviews/draw-a-table-knot/2026-10-17-learner-walk-v3.md` come from simulated learners. They are gate inputs, not evidence that anyone learned.

I re-read the event fields at 1bf814cf, in `src/lib/events-intake.ts`:
- `predict` logs `option` and `correct`, and `recall` logs `correct` and `spacedDays`. `complete` logs `dwellMs`, and `view`/`interact`/`reveal` log only `type`, `slug` and `at`. No session, identifier or first-time marker is logged (P6.2). So the misconception share (B3) is computable, but first-revisit recall and the learner pairing (F1, F2) are **not**.
- The new `type: "exp"` beacon (privacy ruling `company/reviews/_privacy/2026-10-16-experiment-beacon-exp-event.md`) carries `origin` (swap / challenge / none), `arm`, `correct` and `spacedDays` for registered First Light experiments. `REGISTERED_EXPERIMENTS` is empty. Its ruling covers EXP-004/005 origins, not launch telemetry. I do **not** register EXP-007 there. These rows use only the ordinary events. Using `exp` for them would need a new privacy ruling and an engineer change, and that is not mine to start.
- `src/components/Feed.tsx` sends `recall` on every revisit answer. `src/kit/progress.ts` brings a wrong answer back after a day (`REVISIT_SCHEDULE_DAYS = [1, 3, 7, 21]`), so all-revisit recall is biased downward against Surface Value #4. Replays send another `predict`, so the predict-correct rate is biased upward.

## Hypothesis

Each lesson targets a belief that learners actually hold. For draw-a-table-knot, that is "the name counts the crossings you see". For tricolour-check, it is that you cannot tell a knot from a plain loop without trying to undo it. Most learners who commit a prediction reach the reveal. Learners who meet the revisit card answer it above chance, and above the rate at which they predicted correctly. The reason would be that the lesson changed what they think, not that the card is easy.

## Committed prediction

**Period.** Day 0 is the first day with persisted production events for either slug. That needs W-706 and a founder-approved deploy that carries the publishes. The read is at day 0 + 14, and per-lesson rows (B5, B6) read at day 0 + 28. Below a row's minimum sample, the row reads **"no read"**, not a pass. The day-14 window may be extended once, to day 0 + 28, and the extension is written under `## Result` before it starts. Still below the minimum at day 28 means "no read", and the row is re-committed, not re-interpreted. With only two lessons, B1/B2 may well reach "no read". I accept that rather than pool these rows with EXP-006's five, because pooling would let either set carry the other.

**Definitions.** These are EXP-006's, word for word in meaning:
- *Predict-correct rate*: `predict` with `correct: true` / all `predict`, per slug.
- *Reveal rate*: `reveal` / `predict`, per slug.
- *Revisit recall rate*: `recall` with `correct: true` and `spacedDays >= 1` / all `recall` with `spacedDays >= 1`.
- *Pooled*: over the two slugs.

| # | Metric | Prediction | Period | Minimum sample | would_be_wrong_if |
|---|---|---|---|---|---|
| B1 | Revisit recall rate, pooled over both (the measurable stand-in for learning) | >= 55% correct (expected 55-75%) | day 0 to day 0 + 14 | >= 30 recall events with `spacedDays >= 1`, at least 10 from each slug | < 40% across >= 30 (chance 33% plus about 7 points) |
| B2 | Recall over prediction, pooled (population-level, not paired) | B1 exceeds the pooled predict-correct rate by >= 15 points | day 0 to day 0 + 14 | B1's minimum, and >= 50 predict events | the gap is <= 0 points. Then recall is no evidence that the lessons changed anyone's mind, whatever B1 shows |
| B3 | draw-a-table-knot: share of wrong predictions that pick option 0 ("The crossings in any drawing of it") rather than option 2 ("The loops in the rope") | >= 70% of wrong predictions pick option 0 | day 0 to day 0 + 14 | >= 25 wrong predictions on this slug | < 50%. The stage and reveal answer only the crossings form (a drawing with more crossings than its name). If most wrong learners hold the loops form, the reveal answers a belief they do not bring |
| B4a | Predict-correct rate, draw-a-table-knot | <= 45% | day 0 to day 0 + 14 | >= 50 predict events on this slug | > 70%. Then most learners already pick "fewest", and B1 cannot be credited to the lesson. Read with (b) and (e) in Design |
| B4b | Predict-correct rate, tricolour-check | 40-65% (expected higher than B4a: the hook "Can three colours tell a knot from a plain loop?" leans toward "Yes") | day 0 to day 0 + 14 | >= 50 predict events on this slug | > 80%. Then the predict is a giveaway and tests nothing. The bar is set higher than B4a's because I expect this lean before any data |
| B5 | Reveal rate, per lesson | draw-a-table-knot >= 65% (`minInteractions` 1, a single switch). tricolour-check >= 50%, lower because its gate needs three milestones: all three colours on 3₁, open ○, and Check all on 4₁ (`MILESTONES`, `Demo.tsx` line 51) | day 0 to day 0 + 28 | >= 20 predict events on that lesson | either lesson < 40%. That lesson goes back to cm-math and the release-manager as a possible dead end. For tricolour-check, the first suspect is the panel hint that never names the missing milestone (learner walk finding 6; W-1593) |
| B6 | Median `dwellMs` on `complete`, per lesson (engagement only, **never reported as learning**) | 30-120 s each. tricolour-check is expected in the upper half | day 0 to day 0 + 28 | >= 20 completes on that lesson | either median < 20 s or > 180 s. This tests the 60-second format only |
| F1 | First spaced-revisit recall, pooled (Surface Value #4) | >= 50% correct | as B1, once a first-revisit marker exists | >= 30 first revisits | < 40%. **Not measurable on current events.** Reported as "not measured", and never replaced by B1 or by engagement |
| F2 | First-revisit recall gain over the same learner's first prediction (r5 P2) | >= 15 points | as F1 | >= 30 learner-slug pairs | gain <= 0. **Not measurable on current events** (no pairing field) |

Descriptive only, with no threshold:
- tricolour-check, the split of wrong predictions between "No" and "Only with two colours". No predict option states this lesson's `misconception` ("if I couldn't colour it, it can't be coloured"), so it is left out of any misconception-share row, as EXP-006 did with the swap lesson. My expectation, written down so it cannot be fitted later: "No" takes the majority of wrong predictions. A large "Only with two colours" share would strengthen W-1614 (the reveal never says why two colours fail).
- The per-lesson B1 rate beside the pooled one.
- Revisit volume (recall / predict) beside B1.

would_be_wrong_if: B1 < 40% on >= 30 pooled revisit recalls, or B2's gap <= 0 points (on B2's minimum), or, once measurable, F1 < 40% on >= 30 first revisits or F2's gain <= 0 on >= 30 pairs. Any one of these counts against the claim that these two lessons teach their point, whatever the other rows show. B3 < 50% counts against draw-a-table-knot targeting the belief learners bring. B4a > 70% or B4b > 80% counts against that lesson's point being new. B5 < 40% counts against that lesson's launch verdict.

### Amendment 1 (2026-10-17, analytics-steward, at HEAD 2a2f78d0): math/unknot-game v2 (W-1621)

Added for launch review r8 precondition 4 (`company/rituals/records/2026-10-17-launch-review-knots-r8.md`, ruling 1 and hand-off step 6). It adds rows for a third slug. It edits nothing above it: B1-B6, F1/F2 and their pooled definitions stay over tricolour-check and draw-a-table-knot only. unknot-game is **not** added to B1/B2's pool, both because those rows were committed over two slugs and because its recall card is weaker evidence than theirs (objection 6).

**Scope.**

| Lesson | Version | Status at this commit | Predict options (answer) | Recall options (answer) |
|---|---|---|---|---|
| math/unknot-game | v2 (`meta.json` `version: 2`) | `draft` | "1" / "2" / "3" (0), question "The trefoil has 3 crossings. Switching a crossing makes its top strand go under. What is the fewest switches that frees it?" | "1" / "5" / "It depends which crossing" (0), question "A knot drawing has 5 crossings. Switching any one of them gives a plain loop. How many switches did you need to free it?" |

Read from `src/demos/math/unknot-game/Demo.tsx` (predict, `minInteractions={2}`, milestones `firstFree` then `allThree`, trefoil only) and `meta.json` `recall`. 3 options each, so chance is 33%.

**Timing.** The lesson is `draft` at this commit, so this row comes before any publish commit (r5 standard). `git cat-file` finds no `src/demos/math/unknot-game` in the last deploy 6cbce514, and no `[deploy]` commit exists after it (`git log 6cbce514..2a2f78d0`). The lesson's last learner-facing change is 53038b06 (v2), and the later commits touch only evidence, claim status and records. W-706 is still `backlog`, so no event for this slug can have been read. The lateness and version rules above apply to this slug unchanged: a deploy carrying unknot-game dated before this amendment's commit voids these rows, and a v3 needs Amendment 2 before its deploy.

**Period, definitions, checks and scoring:** as above, per slug (predict-correct, reveal, revisit recall with `spacedDays >= 1`), including "no read" below the minimum, one extension to day 0 + 28, novelty split, sample-ratio check across all three r8 slugs, and QA/agent traffic excluded before counting.

| # | Metric | Prediction | Period | Minimum sample | would_be_wrong_if |
|---|---|---|---|---|---|
| C1 | unknot-game revisit recall rate (not pooled) | >= 70% correct (expected 70-90%). Expected high because the question stem states the premise ("Switching any one of them gives a plain loop"), not because the lesson taught it | day 0 to day 0 + 28 | >= 20 recall events with `spacedDays >= 1` on this slug | < 50%. With the stem giving the premise, failing it counts against the lesson more strongly than B1 failing would. **A pass is not reported as learning** (objection 6) |
| C2 | Recall over prediction, unknot-game (population-level, not paired) | C1 exceeds this slug's predict-correct rate by >= 20 points | day 0 to day 0 + 28 | C1's minimum, and >= 50 predict events on this slug | gap <= 0 points. The 20-point bar is higher than B2's 15 because the stem inflates C1 |
| C3 | Share of wrong predictions that pick "3" (the "undo every crossing" form of the `misconception`) rather than "2" | >= 55% of wrong predictions pick "3" | day 0 to day 0 + 14 | >= 25 wrong predictions on this slug | < 40%. Then most wrong learners bring "some but not all" (option "2"), a belief the misconception text does not name. No predict option states the misconception's other form ("the one special crossing"), so this row tests only the first form |
| C4 | Predict-correct rate, unknot-game | 25-55% (the hook "How many until the knot falls open?" leans toward more than one; "fewest" leans toward the smallest number) | day 0 to day 0 + 14 | >= 50 predict events on this slug | > 75%. Then most learners already say "1", and C1/C2 cannot be credited to the lesson. If it is above 55% but at or below 75%, it is reported as "outside predicted band", not a pass |
| C5 | Reveal rate, unknot-game | >= 60%. The gate needs all three trefoil crossings switched (`allThree`); a learner who goes to the figure-eight first stays locked even at 4 of 4 (learner walk v2, path p4; W-1593) | day 0 to day 0 + 28 | >= 20 predict events on this slug | < 40%. Then the lesson goes back to cm-math-discrete and the release-manager as a possible dead end, with the figure-eight lock as the first suspect |
| C6 | Median `dwellMs` on `complete`, unknot-game (engagement only, **never reported as learning**) | 30-120 s | day 0 to day 0 + 28 | >= 20 completes on this slug | median < 20 s or > 180 s. Tests the 60-second format only |
| F3 | First spaced-revisit recall, unknot-game (Surface Value #4) | >= 60% correct | as C1, once a first-revisit marker exists | >= 20 first revisits | < 45%. **Not measurable on current events** (W-1600). Reported as "not measured", never replaced by C1 |
| F4 | First-revisit recall gain over the same learner's first prediction, unknot-game | >= 20 points | as F3 | >= 20 learner-slug pairs | gain <= 0. **Not measurable on current events** (no pairing field) |

Descriptive only, with no threshold, written down now so it cannot be fitted later:
- Among wrong recall answers, the split between "5" (every crossing) and "It depends which crossing" (special crossing). I expect "It depends which crossing" to take the majority, because it is the form the predict card never offers and the only one the 3-of-3 tally answers. A large "5" share would mean the stem's premise was not read.
- Share of `complete` events with no `reveal` on this slug, beside C5 (a proxy for the figure-eight lock).
- Order effect, as (e) in Design: unknot-game also lists `math:knot-table-names` as a prerequisite; report daily predict counts per slug.

Simpler explanations allowed to win for this slug: (a) *easy recall card*, strongest of the three r8 slugs, because the stem states the answer's premise and "1" is the shortest option; (b) *test-wise*, because "fewest" points to the smallest number; (c) survivor selection and (d) replay inflation as in Design. The lessons-teach reading predicts C1 >= 70%, C2 >= 20 points, C3 >= 55% and C4 <= 55%.

would_be_wrong_if (Amendment 1): C1 < 50% on >= 20 revisit recalls, or C2's gap <= 0 points (on C2's minimum), or, once measurable, F3 < 45% on >= 20 first revisits or F4's gain <= 0 on >= 20 pairs. Any one counts against the claim that unknot-game teaches its point, whatever the other rows show. C3 < 40% counts against the lesson targeting the belief learners bring. C4 > 75% counts against its point being new. C5 < 40% counts against its launch verdict. A C1 pass alone supports nothing (objection 6).

Signed: analytics-steward (Grace), 2026-10-17.

## Design

- **Arms.** None. This is passive feed telemetry with no holdout, so nothing here can show cause. The simpler explanations that are allowed to win, and what each predicts:
  - (a) *Easy recall card.* On draw-a-table-knot, the right recall option is the longest and repeats "fewest", the predict's own correct wording ("none has fewer"). It can be matched without understanding. If B1 is high only on draw-a-table-knot, read (a) first. On tricolour-check, the right recall option is the shortest ("No, never"), so (a) is weaker there.
  - (b) *Already known, or test-wise.* On draw-a-table-knot, the correct predict option is the only hedged one ("The fewest ... can have"), and a test-wise learner picks hedges. High B4a with B2 near 0 means (b). The simulated learner said they would pick option 0 (walk v3, finding 2). That is one simulated mind, not a base rate.
  - (c) *Survivor selection.* If revisit volume is under 10% of predicts, B1 is reported as "survivors only".
  - (d) *Replay inflation.* Report predict events per view beside B4a/B4b. Above 1 per view is a logging fault.
  - (e) *Order effect.* tricolour-check lists `math:knot-table-names` (draw-a-table-knot) as a prerequisite. Learners who met draw-a-table-knot first may predict tricolour-check differently, and without session or pairing fields this cannot be separated. Descriptive only: report each slug's daily predict counts so that a shared ramp is visible.
  - The lessons-teach reading predicts B1 >= 55%, B2 >= 15 points, B3 >= 70%, and B4a <= 45%.
- **Checks before reading any row** (Twyman: anything that looks interesting is probably wrong until these pass).
  - Logging: events persist for both slugs, and every event type used appears at least once per slug. QA, smoke tests and evaluator walks are excluded by date window and agent marker before counting. A slug with no `predict` events is a logging or exposure fault, not a result.
  - Sample ratio: predict events per slug should be within about 3x of each other once the feed exposes both. Outside that, the pooled rows are hidden and the slug is named.
  - Novelty: report day 0-2 and day 3-14 separately. An effect only in day 0-2 is not read as preference.
  - Version: see the version rule above. A slug whose version changes mid-window is cut at the change.
- **Scoring.** analytics-steward scores at the first WBR after day 0 + 14 (B5, B6 after day 0 + 28), in the WBR metrics section, with the result under `## Result` below. Nothing in `## Committed prediction` is edited after this commit; only the version-rule amendment may be appended. EXP-006, the r5 P1-P7 rows and the Life Hacks L1-L5 rows are separate and unchanged.

## Result

None. No real-learner data exists (W-706). Neither lesson is published, and no deploy has carried them.

## What changed because of it

Nothing yet. Launch review r8 can cite committed rows for both lessons, and the release-manager does not need a missing-analytics-row note for them. Amendment 1 (2026-10-17) commits rows C1-C6, F3/F4 for unknot-game v2, which meets precondition 4 of the r8 record for that lesson (W-1621).

## Objections

| # | Objection | Raised by | What happened to it |
|---|---|---|---|
| 1 | The instrument question from EXP-006 objection 2 is no longer on the board. Progress.md and my memory call it W-1600 (privacy-reviewer: may `recall`/`predict` carry `first: true` with no identifier?). At HEAD 1bf814cf, W-1600 in `company/ops/board.json` is a qa-tester item (WebKit run for left-or-right), and no open privacy-reviewer item asks it. The ids collided at a merge (qa-tester memory 2026-10-17 notes duplicate W-1600/W-1601). Until it is routed again, F1/F2 here and in EXP-006 have no path to becoming measurable. | analytics-steward | **Open, handed to the caller.** My dispatch for this run forbids editing `board.json`. My report asks the caller to re-add it for privacy-reviewer under a fresh id. F1/F2 stay "not measured" until then. **Update 2026-10-17 (Amendment 1 run, HEAD 2a2f78d0): routed again.** W-1600 in `company/ops/board.json` is once more the privacy-reviewer question under its original id (`backlog`), and the qa-tester WebKit item was renumbered W-1615. The question now has an owner; F1-F4 here and F1/F2 in EXP-006 stay "not measured" until privacy-reviewer rules and an engineer ships the marker. Closed as a routing objection; the instrument gap itself stays open on W-1600. |
| 2 | In draw-a-table-knot, both wrong predict options state the `misconception` ("counts something you can see ... such as the crossings or the loops"). A misconception-share row would be 100% by construction. | analytics-steward | **Accepted.** B3 asks a question that can fail instead: which form of the belief learners bring, and whether it is the form the stage answers. The same flaw sits in EXP-006 A3 (worth-something-alone maps both wrong options). It is recorded as EXP-006 objection 6, without editing EXP-006's committed rows. |
| 3 | tricolour-check's objective has a second half ("settling 'can't be coloured' takes checking every colouring, not one failed try"), and no event measures it. The recall tests the invariance argument only. | analytics-steward (learner walk, "After reading meta.json") | **Accepted, not measurable here.** Only human learners (EXP-002) can show it. No row claims it. |
| 4 | Two lessons give a small sample. B1/B2 may read "no read" even at day 28. | analytics-steward | **Accepted.** A "no read" is reported as one, and these rows are not pooled with EXP-006 (see Period). |
| 5 | B4b's band (40-65%) and its 80% failure bar are looser than B4a's. That could look like a bar set to be passed. | analytics-steward | **Answered.** The hook leans toward "Yes", and I say so before any data. A tighter bar would only test the hook's wording, which is cm-math's call, not mine. If B4b exceeds 65% but stays at or below 80%, the row is reported as "outside predicted band", not as a pass. |
| 6 | unknot-game's recall question states its own premise: "Switching any one of them gives a plain loop. How many switches did you need?" A learner can answer "1" from the stem without the lesson, so C1 measures reading more than retained learning. | analytics-steward (Amendment 1) | **Accepted for the rows, routed for the card.** C1 is kept out of B1's pool, its pass is not reported as learning, its failure bar is set higher (< 50%), and C2's bar is 20 points. Rewording the recall card is the strand manager's call, not mine. My report asks the caller to route it to cm-math-discrete; a stem that does not give the premise (for example, asking which crossing to switch on a 5-crossing drawing where any one works, without saying so) would make C1 a real test. A changed recall card is a new version and needs Amendment 2 before its deploy (version rule). |

Signed: analytics-steward (Grace), 2026-10-17.
