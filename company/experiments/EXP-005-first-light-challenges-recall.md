# EXP-005: Do prerequisite-ordered challenges raise first spaced-revisit recall? (PRD-004)

owner: analytics-steward (Grace) for the registration and the analysis; growth-designer (Jonah) for the content (PRD-004) · status: **registered 2026-10-16, not running.** The primary comparison and the holdout are measurable with the ruled event. The guardrail is blocked on an instrument (B1). The challenges build may start on this registration (round-3 dependency row: registration by 10-31) · date: 2026-10-16 · board: W-1214, W-1283, W-1309, W-1140 · batch: company/ops/dispatch-requests/2026-10-16-r5-product.md#B3
source of the prediction: `company/product/prds/PRD-004-first-light-challenges.md` §9 (SHA of main at registration: 6838dba). The event definition: `company/reviews/_privacy/2026-10-16-experiment-beacon-exp-event.md` (conditional pass, C1 to C9). The metric definition is shared with EXP-004 (`company/experiments/EXP-004-first-light-prediction-swap-recall.md`, "Metric definition"), and so is the W-1140 answer. **This file does not change a PRD metric.**

## Hypothesis
In a challenge, each lesson's concept is a prerequisite of the next. Later lessons therefore rehearse earlier ones before their revisits come due, so lessons played inside a challenge should be recalled better at their first spaced revisit (PRD-004 §9). The competing hypothesis, raised by the PRD itself (objection 3): a prerequisite chain is blocked practice, and blocked practice can recall **worse** than interleaved practice.

## Committed prediction
Committed 2026-10-16, before any build, deploy or data. No challenge exists, and `REGISTERED_EXPERIMENTS` in `src/lib/events-intake.ts` is empty.

Metric: Surface Value #4, the first spaced-revisit recall rate (definition in EXP-004, "Metric definition"; a unit is a (browser, lesson) first revisit).

The PRD's prediction, quoted from PRD-004 §9 and not reworded:
- **P1 (primary, observational):** the same lessons, first played inside a challenge, recall **at least 3 points higher** than when first played from the feed or `/d/<slug>`.
- **H1 (holdout, randomised):** a random 20% of browsers see no challenges. The challenge arm's overall first-revisit recall must not be lower than the holdout's by 3 points or more.
- **Guardrail G1 (Surface Value #5):** prediction-to-reveal completion on challenge lessons is not lower than on the same lessons in the feed by 3 points or more. **Blocked: it cannot be measured with the ruled events.** See B1.

would_be_wrong_if: with at least 150 first-revisit recalls on challenge-played lessons, the difference is below +1 point (challenges add nothing to recall), or recall in the challenge arm or on challenge lessons is 3 points or more **below** its comparison (harm: the flag goes off, and challenges return only through a new decision). (PRD-004 §9.) If the 150 recalls are not reached within 30 days of launch, the result is "unresolved". Head-of-product decides at the first distillation (AMD-008 X3), and engagement is not an argument there.

The steward's own forecasts, committed now so that they can be scored:
- **About 50% that 150 challenge-played units are reached within 30 days.** There are at most six challenges of 3 to 5 lessons each. A unit needs the learner to come back at least a day later, and launch traffic is unknown.
- **If they are reached:** about 35% that P1's observed difference is at least +3 (the growth-designer says 40%). About 60% that it is at least +1, mostly because of selection (see below). About 10% that it is -3 or worse.
- **H1:** about 85% that the test arm is not 3 or more points below the holdout. If the holdout cell has fewer than 150 units, H1 is reported as "unresolved", not as "no harm".
- **The noise at n = 150 (assuming a rate near 65%):** the challenge group's 95% interval is about ±7.6 points. A no-effect feature clears +1 about 40% of the time and trips -3 about 22% of the time. The result is reported with its interval, and the thresholds are applied as written (objection 1).
- **Selection is expected to inflate P1.** Learners who choose a challenge are probably the keener ones. **Only H1 is causal.** A P1 pass with H1 at about zero is reported as "selection, not shown to be the challenge". The PRD says the holdout catches harm rather than proving benefit, and I agree.
- **Not success measures:** challenges started, challenges finished, return visits, sessions. They are labelled engagement (X1). A "finished" count is **not** a learning number.

## Design

### Arms and assignment
- **The arm:** one local key holding `test` or `holdout`, written once per browser on the first page load with the challenges flag on (`holdout` with probability 0.20, from a uniform random draw on the device). It is removed when the experiment closes (C4). It leaves the device only as the `arm` enum on the `exp` event.
- **Holdout browsers behave exactly as if the flag were off.** No entry points, no "Part of a challenge" chrome, and `/challenge/<id>` returns 404. Growth-designer and platform-engineer build this. It matters, because a holdout browser that could open a challenge by URL would contaminate H1.
- **The simpler baseline that is allowed to win** is the holdout: the feed exactly as it is without challenges.

### Groups (cohort split)
- **Challenge group (P1):** units with `arm: "test"` and `origin: "challenge"`. Origin is where the lesson was **first played**: the challenge host writes `s3c:origin:v1` = `challenge` only if the slug had no `completedAt` when it was played from the challenge, and never overwrites the marker. Lessons already played before the learner opened the challenge (R4) count toward finishing the challenge, but they are `origin: "none"`.
- **Feed group (P1):** units with `origin: "none"` on the **same slugs** (the slugs in `content/challenges.json` at the period's opening), from either arm. "First played from the feed or `/d/<slug>`" is not limited to one arm in the PRD, so I do not limit it. Swap-origin units are excluded. As a secondary line I also report the feed group from the holdout arm alone, because test-arm feed plays may be affected by challenges. The primary line stays as registered.
- **H1:** every unit in the test arm (all slugs, all origins) against every unit in the holdout arm. I read "overall" as all lessons. If head-of-product reads it as "challenge lessons only", that changes the metric, and it needs a dated amendment here before data.
- **Per-slug weighting** follows EXP-004: each slug's P1 difference is weighted by its challenge-group units.
- **Small cells:** no cell under 20 events is reported by arm (C6).

### Period
- **Opens:** on the first production deploy with the challenges flag on. The steward writes the date into "Result" from the deploy record. It is not back-dated.
- **Read once,** at the earlier of two points: 150 challenge-group units, or 30 days after opening. P1, H1 and the harm lines are all read at that look. There is no peeking. If the 11-06 cut removes challenges, this experiment is closed as "not run". Its registration stays, and it is not reused.
- **Server collection closes:** `2027-01-01` (the first UTC day on which the server drops EXP-005 rows). If launch moves later than 2026-11-30, this date moves forward by a dated amendment **before any EXP-005 row exists**, and never after.
- **At close:** the arm key is removed on the device, and holdout browsers start to see challenges. Raw rows are deleted at close or after 90 days, whichever is sooner (C7). Today Vercel's log is the only copy, with retention unknown (E13, data inventory D6a).
- **Checks before reading:** (1) **Sample ratio:** the holdout's share of `exp` events should be near 0.20. It is not a clean SRM test, because challenges may change how often the test arm revisits. A holdout share outside 0.17 to 0.23 is reported. If it is above 0.23, the scorecard is hidden until it is explained (I may hide a scorecard with a sample-ratio mismatch). (2) **Logging changes** during the period: any change to the sender, `events-intake.ts` or `REVISIT_SCHEDULE_DAYS` is listed with its date, and the read is split at that date. (3) **Novelty:** the first and second halves of the period are reported separately when each half has at least 20 events.

### Competing explanations, and what each predicts
- **Rehearsal through prerequisites (the hypothesis):** P1 positive and H1 positive, with the effect largest on the 2nd to 5th lessons of a challenge.
- **Selection:** P1 positive and H1 near zero.
- **Blocked practice hurts (objection 3):** P1 negative on challenge lessons.
- **Novelty:** a positive effect in the first half of the period that fades in the second.
- **Time displacement** (challenge time replaces other lessons): H1 negative on non-challenge slugs, while P1 holds.

### Blocked part (routed, not chosen)
- **B1. G1, completion on challenge lessons against the same lessons in the feed.** The kit's `predict` and `reveal` events carry only `slug`, the kit is protected (C9), and the `exp` event is sent only at the first revisit. Nothing the ruling passed tells a challenge-hosted play from a feed play. Measuring G1 needs a send at prediction or reveal on marked plays, outside the kit. That is a new send moment, which privacy-reviewer must read, and a placement question for principal-engineer (C9). EXP-004 B3 has the same gap, so one design should answer both. **The build may start without it.** G1 is a guardrail, not the prediction, and the sender for it can be added before launch. If it is not instrumented by launch, G1 is reported as "not measured", and nobody replaces it with engagement.

### Registration answers (2026-10-16)

**C3 (privacy ruling): when the `exp` event is sent, and how many `origin: "none"` sends PRD-004's arm causes.**
- **Send rule:** one `exp` event per (browser, lesson) **first revisit**, never more, and only when that browser holds a PRD-004 arm or an origin marker for the slug. The rule picks the experiment id as follows:
  - **With an arm** (challenges on): `exp: "EXP-005"`, the `arm` value, and `origin` set to the marker (`challenge` or `swap`), or `none` if the slug has no marker.
  - **Without an arm, with a `swap` marker** (challenges cut or off): `exp: "EXP-004"`, no `arm`, `origin: "swap"`.
  - **No arm and no marker:** nothing is sent.
  - The event is not sent under GPC, under DNT, with the global switch off, or with the per-experiment switch off (C8). A browser is never asked to send two `exp` events for one answer.
- **Volume under PRD-004's arm:** **every** browser that loaded the site with the challenges flag on holds an arm (`test` 80%, `holdout` 20%). So the default "only when a marker or an arm exists" **removes nothing**: every first revisit from such a browser sends one event. Nearly all of these are `origin: "none"`: all of the holdout's units, plus the test arm's units on lessons not first played from a challenge. Challenge slugs are at most 30 (six challenges of at most five lessons). In numbers: `exp` events ≈ first revisits answered by non-GPC/DNT browsers during the period. That is **at most one per lesson per browser for the browser's whole life**, and **at most the number of `recall` events** in the same period. The two are equal only if no learner ever comes back for a second revisit, and the gap grows with every later revisit (up to 4 or more per lesson on the 1, 3, 7, 21 schedule). Each event is about 120 bytes. I cannot give an absolute count before launch, because there is no traffic data and I read none. The 30-day read reports `exp` events against `recall` events.
- **Why a "none" copy is needed, instead of "recalls minus the marked ones" (the reason the ruling asked for):**
  1. **H1 is the only randomised comparison, and every holdout unit is `origin: "none"`.** Without an arm on those units there is no holdout.
  2. **The ordinary `recall` event cannot isolate first revisits.** Its `spacedDays` is elapsed days, `Math.round((now − completedAt) / 86_400_000)` (`src/components/Feed.tsx` line 258). It has no ordinal and no identifier, and a wrong first answer brings the lesson back after 1 more day, so a second revisit can carry the same value as a late first one. Surface Value #4 counts first revisits only, so subtraction would measure a different metric.
  3. **The two events cover different populations.** `recall` is sent under GPC and DNT (`track()` in `src/kit/progress.ts` checks only `NEXT_PUBLIC_EVENTS`), while `exp` is not (C8). "Recalls minus marked" would subtract one population from another.
  4. **P1's feed group needs `none` units on the same slugs**, for the same reasons.
- **What I do not need, and drop:** `spacedDays` (W-1283, below). Everything else in the ruled definition is used: `exp`, `origin`, `arm` (EXP-005 only), `slug` (the per-slug matching in P1 and in EXP-004), and `correct` (the metric). No per-tab id is needed (C5).

**W-1283: `exp.spacedDays` is dropped (2026-10-16).** With the send rule above, every event is a first revisit, and `REVISIT_SCHEDULE_DAYS[0 successes]` = 1, so the field is constant and carries no information. It also gives a poor sender check: a sender bug that fired on later revisits after only wrong answers would still send 1. The ruling allows any strict subset without a new read (C3). **The event is therefore** `{type: "exp", exp, origin, arm?, slug, correct}`. Order of work: backend-engineer changes `pickEvent` in `src/lib/events-intake.ts`, in the same reviewed change that fills `REGISTERED_EXPERIMENTS`, so that an `exp` event **without** `spacedDays` is accepted and one **with** `spacedDays` is dropped (a stray key means a broken sender, as for any other key). The unit tests change with it. The sender never sends the field. If the sender ships before the validator, every event is dropped silently (204), so the validator goes first. The PRDs' `spacedDays` paragraphs (PRD-003 R12, PRD-004 §9) become history. Growth-designer updates them as conformance, with no change to what ships.

**W-1309 (readiness F2): draft and retired slugs count as catalog slugs for `exp` (2026-10-16).** No code change: `isCatalogSlug` keeps matching `allDemos`, the whole registry. The reasons: (1) The check exists so that `slug` comes from a closed list and cannot carry free text or an identifier, and every registry slug meets that. (2) A lesson's status can change between play and first revisit (review → published, or published → retired). A check by status would drop units around those changes, and it would make the accepted set depend on build-time env (`SHOW_REVIEW`, `visibility.ts`). (3) Production cannot serve drafts, so a draft slug in the production log means a forged POST. The analysis counts it and reports it, and it never lands in P1, because P1 uses only `content/challenges.json` slugs. **Analysis rule:** P1 uses the slugs in `content/challenges.json` at the period's opening. A slug retired during the period stays in and is flagged. H1 counts every registry slug.

**W-1140 (EDD-008 Q5 recall-rate aggregate):** answered in EXP-004, "W-1140 answer".

**The server-side list (First Light round 2, B2's C2), exactly:**
```ts
export const REGISTERED_EXPERIMENTS: readonly RegisteredExperiment[] = [
  { id: "EXP-004", closes: "2027-01-01" },
  { id: "EXP-005", closes: "2027-01-01" },
];
```
No other id is to be accepted. EXP-001 to EXP-003 send no beacon events. A `closes` date moves only by a dated amendment in the EXP file **before** that experiment's first row exists.

## Result
(not run; no data exists)

## What changed because of it
(nothing yet)

## Objections
| # | Objection | Raised by | Status |
|---|---|---|---|
| 1 | At n = 150, the +1 and -3 thresholds sit inside the noise. A no-effect feature passes about 40% of the time and trips the harm line about 22% of the time | analytics-steward | **Open, routed to head-of-product and growth-designer.** The thresholds are kept as written, because changing them is not mine. The result is reported with its interval. Any change is a dated PRD change before data |
| 2 | P1 is observational, and selection will inflate it | growth-designer (PRD-004 §9), analytics-steward | **Accepted as a limit.** H1 is the causal line. A P1 pass with H1 at about zero is reported as selection |
| 3 | Prerequisite chains are blocked practice and may recall worse (PRD-004 objection 3) | growth-designer | **Open with a test:** the -3 lines on P1 and H1 |
| 4 | G1 has no instrument (B1) | analytics-steward | **Open, routed** to privacy-reviewer (new send moment) and principal-engineer (C9). It does not block the build, but it must be answered before launch, or G1 is reported as not measured |
| 5 | The holdout must not be able to reach `/challenge/<id>` | analytics-steward | **Open, routed** to growth-designer and platform-engineer (build requirement, under "Arms and assignment") |
