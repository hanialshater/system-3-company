# EXP-008: Launch predictions for math/left-or-right v3 (knot chirality)

owner: analytics-steward (Grace) · date: 2026-10-17, at HEAD d238ac7b (committed 02:13Z) · status: **committed before publish and before any deploy carrying this lesson; not run**
answers: the launch-review ritual's check that predictions are committed (`company/roles/analytics-steward.md`, Rituals) for left-or-right. No launch record for this lesson exists on disk at this commit. When it is written, it should link here rather than restate the rows.
format: `company/experiments/EXP-007-launch-predictions-r8-knots.md` (itself EXP-006's format), with the same definitions, checks and scoring. The differences are below and in Objections.

## Why a new EXP and not EXP-007 Amendment 2

The caller offered either. I chose a new record, for three reasons:
1. EXP-007 is scoped to launch review r8, and the r8 record (`company/rituals/records/2026-10-17-launch-review-knots-r8.md`) names three lessons, not this one. left-or-right will go to a different launch review, and that review should link one record of its own.
2. EXP-007's committed text already uses the name "Amendment 2" for a different thing: a reworded unknot-game recall card (EXP-007 objection 6 and Amendment 1, Timing). If this lesson took that name, a committed sentence would point at the wrong rows, and EXP-007 cannot be edited above its amendments.
3. Nothing here pools with EXP-007's rows, so keeping them in one file buys nothing.

Row ids continue the series so that a WBR line is unique across the launch records: D1-D6 for aggregate rows, F5/F6 for the first-revisit rows (EXP-006/007 used F1-F4), O1/O2 for the reveal openers.

## Scope

| Lesson | Version | Status at this commit | Predict options (answer) | Recall options (answer) |
|---|---|---|---|---|
| math/left-or-right | v3 (`meta.json` `version: 3`) | `draft` | "Yes, wiggle it" / "No, never" / "Only by picking it up and turning it over" (1), question "A left-handed trefoil and its mirror image, the right-handed one. Can you wiggle one into the other without cutting?" | "A right-handed trefoil" / "A left-handed trefoil" / "Either, depending on how you lay it" (0), question "You hold a right-handed trefoil made of rope. You turn it upside down and lay it flat. What do you have?" |

Read from `src/demos/math/left-or-right/Demo.tsx` (predict, `minInteractions={2}`, milestones `turned` and `mirrored` on the trefoil, `eightMirror` optional) and `meta.json` `recall`. 3 options each, so chance is 33%.

**Two reveal openers** (`Demo.tsx` `Reveal`, ruling `company/domains/briefs/rulings/2026-10-17-left-or-right-opener.md`):
- *Standard*, when the seen line holds the plain turned-over state (−3): "Turning the trefoil over left every mark minus: ... so its hand stayed left."
- *Mirrored branch*, when `seen.turned` is undefined, which means the learner mirrored first and then turned the mirrored trefoil over: "Turning the mirrored trefoil over left every mark plus: ... so its hand stayed right."
The rest of the reveal is the same on both paths.

## Timing: this meets r5's standard

- The lesson is `draft` at this commit, so these rows come **before** any publish commit (`company/rituals/records/2026-10-16-launch-review-r5.md`).
- `git cat-file` finds no `src/demos/math/left-or-right` in the last deploy 6cbce514 (Release r8, F-47). One later commit matches a grep for the tag: 54aa64e3 (EXP-007 Amendment 1), whose message *body* contains the literal string while saying no deploy happened. It was committed after F-48 (cdee168c, 2026-10-16 20:28Z), which sets `git.deploymentEnabled: false` in `vercel.json`, so pushes create no deployments and that commit cannot have deployed. No release record or founder approval names a deploy after 6cbce514. So production cannot have served this lesson, not even by the draft direct-URL path (W-480). (The literal string in 54aa64e3's body breaks the CLAUDE.md rule on commit messages; it is harmless only because of F-48. I name it in my report; this commit's message avoids it.)
- The last learner-facing change is 0fa02697 (v3, the branch opener). Every later commit on the lesson touches claim text, claim status or the evidence links in `meta.json` only (`git diff 0fa02697 d238ac7b -- src/demos/math/left-or-right/`).
- `/api/events` still only writes to function logs, and nothing keeps them (W-706, backend-engineer, `backlog`). No one can have read an event for this slug.
- **Lateness rule.** If a deploy carrying left-or-right is dated before this file's commit, the rows are void.
- **Version rule.** The rows apply only to v3. If the lesson is published at another version, analytics-steward appends an amendment under `## Committed prediction`, after the would_be_wrong_if line, before the deploy that carries it. The amendment adds and edits nothing above it. If the predict or recall card changed, the old rows are not carried over. If only stage or reveal wording changed, the amendment says so and carries the rows over unchanged, except O1/O2, which are re-committed if either opener changes. With no amendment, the slug is not scored.

## What can be computed today (checked at d238ac7b)

**Nothing below can be tested today.** The `launch` verdict in `company/reviews/left-or-right/2026-10-17-learner-walk.md` comes from a simulated learner. It is a gate input, not evidence that anyone learned.

Event fields in `src/lib/events-intake.ts` at this HEAD: `predict` logs `option` and `correct`; `recall` logs `correct` and `spacedDays`; `complete` logs `dwellMs`; `view`, `interact` and `reveal` log only `type`, `slug` and `at`. No session, identifier or first-time marker is logged (P6.2).

| Row | Computable on today's events once W-706 persists them? |
|---|---|
| D1 revisit recall, D2 recall over prediction (population), D3 wrong-prediction form, D4 predict-correct, D5 reveal rate, D6 dwell | **yes** |
| F5 first spaced-revisit recall | **no**: no first-revisit marker (W-1600, privacy-reviewer, `backlog`) |
| F6 first-revisit gain over the same learner's prediction | **no**: no pairing field |
| O1 share of reveals that show the mirrored-branch opener | **no**: `reveal` carries no field, `interact` carries no milestone name, so neither the opener nor the order of Turn over and Mirror is logged |
| O2 revisit recall by opener | **no**: needs O1's field and a pairing of the reveal to the later recall |

The `exp` beacon is for registered First Light experiments only (`REGISTERED_EXPERIMENTS`, privacy ruling `company/reviews/_privacy/2026-10-16-experiment-beacon-exp-event.md`). I do not register EXP-008 there. Making O1 computable would need an `opener` (or milestone-order) field on `reveal`, a privacy ruling and an engineer change; none of that is mine to start, and I name it in my report for routing.

Known biases, as in EXP-007: `src/components/Feed.tsx` sends `recall` on every revisit answer and `src/kit/progress.ts` brings a wrong answer back after a day, so all-revisit recall is biased downward against Surface Value #4. Replays send another `predict`, so the predict-correct rate is biased upward.

## Hypothesis

left-or-right targets a belief learners actually hold: that a mirror image is the same knot, reachable by turning it over (the `misconception`). Learners who commit a prediction mostly reach the reveal. Learners who meet the revisit card answer it above chance and above the rate at which they predicted correctly, because the lesson showed them that turning over leaves every mark and mirroring flips every mark, not because the card is easy.

## Committed prediction

**Period.** Day 0 is the first day with persisted production events for this slug. That needs W-706 and a founder-approved deploy carrying the publish. Rates read at day 0 + 14 except D1, D2, D5, D6, which read at day 0 + 28 (one slug gives a small sample). Below a row's minimum sample, the row reads **"no read"**, not a pass. A day-14 window may be extended once, to day 0 + 28, and the extension is written under `## Result` before it starts. Still below the minimum at day 28 means "no read", and the row is re-committed, not re-interpreted. These rows are not pooled with EXP-006 or EXP-007.

**Definitions** (as EXP-006/007): *predict-correct rate* = `predict` with `correct: true` / all `predict`; *reveal rate* = `reveal` / `predict`; *revisit recall rate* = `recall` with `correct: true` and `spacedDays >= 1` / all `recall` with `spacedDays >= 1`. All on this slug.

| # | Metric | Prediction | Period | Minimum sample | would_be_wrong_if |
|---|---|---|---|---|---|
| D1 | Revisit recall rate (the measurable stand-in for learning) | >= 60% correct (expected 60-80%). The right option repeats the stem's own word "right-handed", so part of a pass may be matching, not learning (Design (a)) | day 0 to day 0 + 28 | >= 20 recall events with `spacedDays >= 1` | < 45% (chance 33% plus about 12 points; the bar is above B1's 40% because of the echo) |
| D2 | Recall over prediction (population-level, not paired) | D1 exceeds D4 by >= 15 points | day 0 to day 0 + 28 | D1's minimum, and >= 50 predict events | gap <= 0 points. Then recall is no evidence that the lesson changed anyone's mind, whatever D1 shows. Note: the predict card tests the chirality half (no wiggle reaches the mirror) and the recall card the turn-over half, so D2 compares two halves of one objective, not one item twice (objection 2) |
| D3 | Share of wrong predictions that pick option 2 ("Only by picking it up and turning it over", the turn-over form of the `misconception`) rather than option 0 ("Yes, wiggle it", the deformation form) | >= 45% of wrong predictions pick option 2 | day 0 to day 0 + 14 | >= 25 wrong predictions | < 30%. The stage shows only the turn-over form being wrong (Turn over keeps −,−,−); the deformation form is answered by authority ("no wiggling gets back ... Dehn"; walk finding 7). If most wrong learners bring the deformation form, the shown half of the lesson answers a belief they do not bring |
| D4 | Predict-correct rate | 30-60% | day 0 to day 0 + 14 | >= 50 predict events | > 80%. Then most learners already say "No, never" and D1/D2 cannot be credited to the lesson. Between 60% and 80% is reported as "outside predicted band", not a pass. The question names the two as "left-handed" and "right-handed", which leans test-wise learners toward "No" (Design (b)) |
| D5 | Reveal rate | >= 60%. The gate needs `turned` and `mirrored` on the trefoil, in either order; a learner who goes to the figure-eight first stays locked with no hint naming the trefoil (walk finding 5) | day 0 to day 0 + 28 | >= 20 predict events | < 40%. Then the lesson goes back to cm-math-discrete and the release-manager as a possible dead end, with the figure-eight-first lock as the first suspect |
| D6 | Median `dwellMs` on `complete` (engagement only, **never reported as learning**) | 30-120 s | day 0 to day 0 + 28 | >= 20 completes | median < 20 s or > 180 s. Tests the 60-second format only |
| F5 | First spaced-revisit recall (Surface Value #4) | >= 55% correct | as D1, once a first-revisit marker exists | >= 20 first revisits | < 45%. **Not measurable on current events** (W-1600). Reported as "not measured", never replaced by D1 |
| F6 | First-revisit recall gain over the same learner's first prediction | >= 15 points | as F5 | >= 20 learner-slug pairs | gain <= 0. **Not measurable on current events** (no pairing field) |
| O1 | Share of reveals that show the mirrored-branch opener | <= 25% (expected 5-25%). The explore hint says "Turn the card over, then mirror it", which leads to the standard opener; only learners who press Mirror first and never reach the plain turned state get the branch | day 0 to day 0 + 28, once an opener field exists | >= 40 reveals carrying the field | > 40%. Then the branch is a main path, not an edge, and the seen-line gap on it (the line never records the turn the branch opener leads with; walk finding 1, path B) becomes a launch concern for cm-math-discrete. **Not measurable on current events** |
| O2 | Revisit recall, branch-opener learners against standard-opener learners | no worse by more than 10 points | as O1, once opener and pairing fields exist | >= 15 paired revisits per opener | branch recall below standard by > 10 points. That would count against the ruling's premise that the branch "teaches the same thing". **Not measurable on current events**. With no arms, any gap is confounded by the learners who choose Mirror first |

Descriptive only, with no threshold, written down now so it cannot be fitted later:
- Among wrong recall answers, the split between "A left-handed trefoil" (turning over swaps the hand: the misconception) and "Either, depending on how you lay it". I expect "A left-handed trefoil" to take the majority. A large "Either" share would mean learners took away "it depends on the drawing", which the Sum readout can invite (walk finding 4).
- Share of `complete` events with no `reveal` on this slug, beside D5 (a proxy for the figure-eight-first lock).
- Order effect: left-or-right lists `math:knot-table-names` (draw-a-table-knot) as a prerequisite. Report daily predict counts beside the EXP-007 slugs so that a shared ramp is visible.

would_be_wrong_if: D1 < 45% on >= 20 revisit recalls, or D2's gap <= 0 points (on D2's minimum), or, once measurable, F5 < 45% on >= 20 first revisits or F6's gain <= 0 on >= 20 pairs. Any one of these counts against the claim that left-or-right teaches its point, whatever the other rows show. D3 < 30% counts against the stage targeting the form of the belief learners bring. D4 > 80% counts against its point being new. D5 < 40% counts against its launch verdict. O1 > 40% (once measurable) counts against treating the mirrored-branch opener as an edge path; O2's gap > 10 points counts against the branch teaching the same thing. A D1 pass alone supports nothing.

Signed: analytics-steward (Grace), 2026-10-17.

## Design

- **Arms.** None. This is passive feed telemetry with no holdout, so nothing here can show cause. The simpler explanations allowed to win, and what each predicts:
  - (a) *Easy recall card.* The stem says "right-handed" and the right option is "A right-handed trefoil", the only option that repeats a stem phrase. A learner can match it without the lesson. If D1 passes but D2's gap is near 0, read (a) first.
  - (b) *Already known, or test-wise.* The predict question already calls the two "left-handed" and "right-handed", which suggests they differ, and a lesson asking the question suggests the surprising answer. High D4 with D2 near 0 means (b).
  - (c) *Survivor selection.* If revisit volume (recall / predict) is under 10%, D1 is reported as "survivors only".
  - (d) *Replay inflation.* Report predict events per view beside D4. Above 1 per view is a logging fault.
  - (e) *Order effect.* As in the descriptive rows. Without session or pairing fields this cannot be separated.
  - The lesson-teaches reading predicts D1 >= 60%, D2 >= 15 points, D3 >= 45% and D4 <= 60%.
- **Checks before reading any row** (anything that looks interesting is probably wrong until these pass):
  - Logging: events persist for this slug, and every event type used appears at least once. QA, smoke tests and evaluator walks are excluded by date window and agent marker before counting. No `predict` events is a logging or exposure fault, not a result.
  - Sample ratio: once the feed exposes them together, predict events on this slug should be within about 3x of each EXP-007 slug. Outside that, the slug is named and its rows are read as exposure-limited.
  - Novelty: report day 0-2 and day 3-14 separately. An effect only in day 0-2 is not read as preference.
  - Version: see the version rule. A version change mid-window cuts the window at the change.
- **Scoring.** analytics-steward scores at the first WBR after day 0 + 14 (D1, D2, D5, D6 after day 0 + 28), in the WBR metrics section, with the result under `## Result` below. Nothing in `## Committed prediction` is edited after this commit; only a version-rule amendment may be appended.

## Result

None. No real-learner data exists (W-706). The lesson is not published, and no deploy has carried it.

## What changed because of it

Nothing yet. A launch review for left-or-right can cite committed rows, and the release-manager does not need a missing-analytics-row note for it.

## Objections

| # | Objection | Raised by | What happened to it |
|---|---|---|---|
| 1 | Both wrong predict options state the `misconception` ("a mirror image is the same knot"), so a misconception-share row would be 100% by construction (as EXP-007 objection 2). | analytics-steward | **Accepted.** D3 asks which form learners bring (turn-over or deformation), which can fail, and ties the failure to what the stage can show. |
| 2 | The predict card tests chirality (no wiggle reaches the mirror) and the recall card tests turn-over invariance. D2 compares two different questions, so a gap is not the same learners improving on the same item. | analytics-steward | **Accepted, kept with the caveat in the row.** Both are halves of the `objective`, and the recall answer is the same fact the predict's option 2 gets wrong. D2 is reported with this note, and F6 (paired) is the row that would settle it, once measurable. |
| 3 | The recall answer echoes the stem ("right-handed" in both), so D1 partly measures reading. | analytics-steward | **Accepted for the row, routed for the card.** D1's failure bar is set at 45%, and a D1 pass alone supports nothing. Rewording the recall card (for example, naming the trefoil only by a picture or by "this one") is cm-math-discrete's call, not mine; my report asks the caller to route it. A changed recall card needs an amendment before its deploy. |
| 4 | The opener the learner saw is not logged, so O1/O2 are committed rows that may never be computed. | analytics-steward | **Accepted.** They are written now so that, if an opener field is added, the threshold predates the data. Until then they read "not measured" and are never inferred from D5 or from dwell. |
| 5 | The deformation half ("no wiggling gets back") is told, not shown: the stage cannot wiggle (walk finding 7). No event measures whether the told half sticks. | analytics-steward (learner walk) | **Accepted, not measurable here.** Only human learners (EXP-002) can show it. No row claims it. |

Signed: analytics-steward (Grace), 2026-10-17.
