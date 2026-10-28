# EXP-012: Lessons World milestones M0 to M4: check predictions and learning predictions

owner: analytics-steward
date: 2026-10-28
board: W-2152
status: registered by the commit containing this file, before any M0 to M4 maker starts; NOT run. Registration authorizes no build, no collection, no study, no holdout and no deploy.
source brief: company/product/2026-10-28-world-brief.md (head-of-product, PR #35, proposed, not approved), sections 3 to 5
ownership: the founder gave analytics-steward this experiment's predictions, cohorts, guardrails and wrong-ifs (company/decisions/2026-10-27-founder-lessons-world-journey.md, "Experiment"); that line supersedes the role-card routing of gamification registrations to personalization-eval for this scoped work and un-parks no role.
reuses: company/experiments/EXP-009-lessons-world.md (P1, P2, G1), by reference only. EXP-009 is not edited.

## Hypothesis

Two kinds of claim, kept apart.

1. **Check claims (M0 to M4, rows P0.x to P4.x).** Each milestone, built to the brief, meets testable properties that need no learner data: green gates without weakening them, a state model that never credits recall it should not, a feed left byte-identical, targets and layout that pass measurement, flags and seals that follow the 3.3 rules, and loading that hides no lesson and invents none. These are claims about the artifact. They say nothing about learning.
2. **Learning claims (L1 to L4).** Offering the World raises exploration without lowering one-week recall (L1, L2 = EXP-009). Stop states mark real delayed recall for a useful share of explored stops (L3). Adding seals does not lower recall (L4). Exploration, opens, swipes, dwell, seals earned and flags attempted are never learning outcomes here. Only delayed first-answer recall counts as learning.

## Committed prediction

Frozen by this commit. Results are appended under "## Result", never written into this section. A row whose precondition (column "void if") fails is reported as **void**, never as passed. An amendment may only be appended below the table, before the run of the milestone it concerns starts, and may only add or tighten. It may never loosen a threshold.

Common terms:
- **Baseline commit:** `0fc13b86a255e5bbdaba1a005e08723643928aaa`, the head of the default branch `ccr-4c6c7654-ew9ko1` and the base of PR #35. On `b55b73ff1` (that commit plus the brief), `npm run check` printed `check failed: 783 error(s), 4 warning(s)` when the steward ran it on 2026-10-28.
- **Default branch:** the repository's default branch at the time of reading (today `ccr-4c6c7654-ew9ko1`). If it is renamed, the readout names the branch and commit it read.
- **Maker start:** the first commit, on any branch, by the milestone's maker that changes product code for that milestone (any path under `src/`). Fixture tables and measurement scripts written by qa-tester are not maker commits.
- **Fixture table:** a qa-tester file of input histories and expected outputs, written from the brief alone.

### M0: checks green (owner of the run: evaluation-steward)

| ID | Prediction | would_be_wrong_if: | void if |
|---|---|---|---|
| P0.1 | Green is reached without touching the gate. | Any commit on the default branch between the baseline commit and the first commit on which `npm run check` exits 0 changes `tools/company.mjs`, any path under `tests/qa/`, or any path listed in `company/constitution/protected-paths.txt`. A ratified amendment that does so still makes this row wrong; the amendment is reported beside it. | never |
| P0.2 | M0 is not done by 2026-11-04 (a warning prediction, the brief's). | `npm run check` exits 0 on a default-branch commit whose committer date is on or before 2026-11-04T23:59:59Z. | never |
| P0.3 (added by the steward) | Green is reached without demotion. Every lesson whose status is Published at the baseline commit is still Published at the first green commit. | One or more such lessons is not Published at the first green commit. The readout lists each, with its reason. | never |
| P0.4 (added by the steward) | No backdated evidence. Every review, verdict or QA record added to a lesson between the baseline commit and the first green commit carries a date no earlier than the author date of the commit that adds it. | Any such record is dated earlier than its adding commit (checked by `git log --diff-filter=A` per record file). | never |

### M1: state model, List view, player hookup (maker: personalization-engineer, pending O1)

| ID | Prediction | would_be_wrong_if: | void if |
|---|---|---|---|
| P1.1 | The state, qualifying-recall and suggested-next functions agree with qa-tester's fixture table. | Any fixture row's actual output differs from its expected output. | the table has fewer than 30 rows; or it is not committed before the M1 maker start; or it is edited after the maker start; or it lacks at least one row for each of: 3.2 conditions 1 to 6, the wrong-answer reset, each of the five 3.4 suggested-next branches, and the Unknown store |
| P1.2 | Nothing under 24 hours, from practice, or on an old question version yields Understood. | Any fixture with a qualifying-looking correct answer at less than 86,400,000 ms after first reveal (the table must include 86,399,999 ms and 86,400,000 ms), or with source practice, replay, research probe or `?revisitMinutes`, or with a `qv` other than the current one, yields Understood. | the table lacks the two boundary rows above |
| P1.3 | The normal feed is unchanged. | The fixed-fixture feed order, or the result of any pre-existing feed test, differs between the commit before the M1 maker start and the M1 exit commit. | never |
| P1.4 | An Unknown store shows no state and no count. | With the progress store blocked, unreadable, or account ownership unsettled, the List or the map shows "0", "Not started", "Explored", "Understood" or any count, on phone (390 px) or desktop (1440 px). | never |
| P1.5 | Signed-in recall syncs with its source and version (brief, added with EDD-018 Addendum A3 option (b)). | A recall answered on device A, signed in, arrives on device B without the same `source` and `qv`, or the lesson's state differs between the two devices, in `npm run test:accounts` on a real Postgres. | the test does not run on a real Postgres |
| P1.6 | The migration is reversible and old clients still sync (brief). | The down migration does not restore the old `recall` table, or an old client's sync fails, after the up migration. | never |
| P1.7 (added by the steward) | Old records follow 3.2 condition 6. | Pre-M1 `recalls: { at, correct }` records produce Understood when the M1 record does not contain engineering's demonstration that the due-revisit path was their only writer. | never |

### M2: scene polish and the bottom sheet

| ID | Prediction | would_be_wrong_if: | void if |
|---|---|---|---|
| P2.1 | Every interactive target on `/learn/world` is at least 44×44 CSS px. | Any element that is focusable or clickable (links, buttons, inputs, `tabindex >= 0`, elements with click handlers) has a rendered bounding box under 44 px in either dimension at 320, 390 or 1440 px viewport width, at the default camera and at the minimum and maximum zoom. No exceptions are carved out after the measurement. | qa-tester's measurement script is not committed before it runs |
| P2.2 | The bottom sheet's "Open lesson" is reachable without scrolling at 320×568. | For any of the 12 Number Island stops, or any of 20 further stops that qa-tester draws by a seed written in the QA record before measuring, the "Open lesson" control's bounding box is not wholly inside the viewport when the sheet opens. | the seed is written after measuring |
| P2.3 | Scene loading moves no focused control, and layout shift stays small. | Median cumulative layout shift over 5 cold loads on the phone profile is above 0.1; or, during any of those loads, the bounding box of the focused element moves. | never |
| P2.4 | Reduced motion shows no animation. | With `prefers-reduced-motion: reduce`, `document.getAnimations()` is non-empty at any check during the first 5 s after load, or two idle screenshots 2 s apart differ. | never |

### M3: flags and seals

| ID | Prediction | would_be_wrong_if: | void if |
|---|---|---|---|
| P3.1 | QA can answer Number Island's six flag questions in a median of 3 minutes or less. This predicts QA timing only: QA sessions are likely faster than learners, so it is a floor, not a learner median. | The median, over 5 timed runs from first question shown to sixth answer submitted, is above 180 s. | fewer than 5 runs, or any run by a session that has seen the six questions before |
| P3.2 | No seal or Understood comes from practice or from an unchecked island. | Any fixture earns a seal, or turns a stop Understood, from flag practice, from an attempt less than 24 h after the last first exploration or the last practice or attempt, or on an island with any lesson not Published with all claims verified. | the fixture table is not committed before the M3 maker start |
| P3.3 | The sample rule holds for every island size. | Any attempt (attempt numbers 1 to 20) has other than 6 questions; on a 3-region fixture any region has other than 2; on a 4- or 5-region fixture any attempt misses a region; or on a 5-region fixture some region gets no extra slot in attempts 1 to 5. | never |
| P3.4 | No learner-facing line claims mastery, permanence or "all lessons understood". | learning-scientist-personalization's read of every M3 learner-facing string finds one. | the reader sees the brief's rationale before writing the findings |
| P3.5 (added by the steward) | A seal credits only what was answered. | In any fixture, an earned seal turns Understood any lesson whose question was not answered in that attempt, or an attempt with 4 or fewer correct of 6 earns a seal. | never |

### M4: progressive loading and the end-of-content view

| ID | Prediction | would_be_wrong_if: | void if |
|---|---|---|---|
| P4.1 | The first load of `/learn/world` is no heavier than the inspection build. | Bytes over the wire (compressed: HTML, JS, CSS and the first scene's images, cold cache, phone profile, until the first scene is painted) on the M4 exit build exceed the same measure on the inspection release build. | the inspection-build measure is not committed, with its build id, before the M4 maker start |
| P4.2 | No island without real lessons renders. | Any rendered island or stop has no registered lesson in the inventory at that commit. | never |
| P4.3 | The end view's counts are true. | Its island or lesson count differs from `tests/world/inventory.test.mjs`'s inventory at that commit, or its Understood count differs from the learner's readable store (or shows a number when the store is Unknown). | never |
| P4.4 | Return-to-position survives deep loading. | With 50 or more islands loaded, at 10 positions qa-tester picks before measuring, phone and desktop, any return fails to restore the island, the stop or the camera position. | never |

### Learning predictions (none can be judged today)

| ID | Prediction | would_be_wrong_if: | void if |
|---|---|---|---|
| L1 | **EXP-009 P1, unchanged.** Its metric, window [0, 7 days) from assignment, denominator, eleven frozen slugs, ratio >= 2.0 and wrong-if govern. The brief's wording ("distinct Number Island lessons") is read as EXP-009's ("additional", excluding the anchor). | As EXP-009 P1: the learner-level 95% upper confidence bound on the ratio is below 2.0. | as EXP-009, plus objection 1 below |
| L2 | **EXP-009 P2 and G1, unchanged.** | As EXP-009 P2 (95% upper bound on world minus feed below 0) and G1 (one-sided 95% upper bound below -3 points: stop exposure). | as EXP-009, plus objection 1 below |
| L3 | Stop states mark real delayed recall often enough to mean something. Among learner-stop pairs with a first reveal in the 28 days after the M1 release, with a readable store, at least 30% reach Understood (a qualifying correct answer under 3.2) within 14 days of that first reveal. | The learner-clustered bootstrap 95% upper bound (10,000 resamples, seed 10010) on the pooled share is below 30%. A lower bound at or above 30% supports it; otherwise inconclusive. | no instrument links a learner's reveals and recalls (true today, see Design); or fewer than 14 days of follow-up for any pair counted |
| L4 | Offering seals does not lower recall. In a study assigned before exposure, "World with states and seals" against "World with states, no seals" (M1-only), the 7-day first-answer recall on a fixed probe is no more than 3 points lower with seals. | The one-sided 95% upper bound on (seals minus no seals) is below -3 points: stop exposure to seals. | no sample-plan amendment committed before the first assignment; or the probe items or their versions differ between arms (see Design) |

## Design

**Two kinds of evidence.** The P rows are checks on the artifact. Their judges are qa-tester, design-lead, accessibility-reviewer, principal-engineer, learning-scientist-personalization and evaluation-steward, each on their own record, read by the steward. The steward judges nothing it built and builds nothing. The L rows need learner data that does not exist.

**Why no L row can be judged today.** `src/lib/events-intake.ts` keeps no identifier of any kind: no session, device or participant. Its `reveal` event has no fields. Its `recall` event has only `correct` and `spacedDays`, with no source and no question version. `REGISTERED_EXPERIMENTS` is empty. The progress store (`src/kit/progress.ts`, `recalls: { at, correct }[]`) lives on the learner's device. So nobody can link a learner's first reveal to their later recall, or assign a learner to an arm. L1 to L4 wait on instruments that privacy-reviewer and backend must approve first (EXP-009, "Minimum instrumentation and consent"). M1's new `source` and `qv` fields do not change this, even though head-of-product chose EDD-018 Addendum A3 option (b), which adds them as account recall columns (W-2154): account records carry no consent and no assignment, so they are not study data, and using them for L rows would need privacy-reviewer's approval as a new purpose. Until those instruments exist, every L row reads "not measured". Nothing in copy, the WBR or a launch record may say the World improves learning.

**L1 and L2** follow EXP-009's design in full: consented adults, 1:1 assignment before exposure, intention to treat, 3,000 per arm, 28-day enrollment, bootstrap seed 9009, SRM and integrity checks before any outcome is read.

**L3 design.**
- Unit: the learner-stop pair, clustered by learner.
- Window: first reveals in the 28 days after the M1 release; follow-up 14 days for each pair.
- Numerator: pairs whose state is Understood at first-reveal + 14 days, under 3.2.
- Reported beside it, so that "did not come back" and "came back and forgot" are not mixed:
  - (a) the share of pairs with any qualifying answer in the window;
  - (b) the share correct among those answered.
- A low L3 caused by (a) means learners did not return. That is a return problem, not a recall one, and the readout says which.
- L3 is descriptive and has no comparison group. It tests whether states carry meaning. It is not a causal claim about the World.

**L4 design, and its replacement of the brief's measure.** The brief proposed "qualifying recall correctness on Number Island". The steward replaces that measure for two reasons.
- Qualifying answers include seal answers only in the seal arm, so the two arms would be scored on different questions.
- Only learners who chose to answer would be counted, which adds a post-treatment selection.

Registered instead:
- **Outcome.** A research probe at 6 to 8 full days after assignment. It is the same in both arms and gives no app credit, as in EXP-009. It uses the recall questions of all 12 Number Island lessons (frozen by version in the amendment). The score is the share correct per learner, intention to treat. Missing answers are Unknown, never zero, and are reported with bounds.
- **What the result means.** The seal arm practices six of those questions in flags. So a seal benefit is partly retrieval practice. A seal harm (the wrong-if) is still a clean reading.
- **Not yet set.** The sample size and the enrollment period. They must be appended as an amendment before the first L4 assignment. Without that amendment L4 cannot pass; at most it is inconclusive.

**Live holdout.** None is registered. Surface Value's O2 needs an explicit founder decision, which is the brief's F4. If the founder decides one, the design goes in an amendment, appended before the first assignment:
- a stable per-device 1:1 assignment of the World entry point;
- new devices only, assigned before first view;
- intention to treat, with an SRM check (chi-square p < .01 pauses).

A per-device assignment also needs an identifier, which privacy-reviewer must approve first.

**Descriptive slice.** World-opening against feed-only devices is description only. It is printed with its selection caveat, and it is never a pass or a fail. It cannot be computed today either, since there is no device identifier.

**Competing explanations the readout must address.**
- L1: scenery novelty, clearer navigation. A day-0 spike that converges is a novelty warning (EXP-009).
- L3: return rate (a) against recall (b), as above.
- L4: retrieval practice in the seal arm against rushing for the reward.
- P3.1: QA familiarity.
- P1.x and P3.x: the fixtures come from the brief, so they test conformance to the brief, not the brief's wisdom.

**The simpler baseline allowed to win.**
- For L1 and L2: the feed-only arm.
- For L4: states without seals. If seals do not beat it on recall, the M3 exit should weigh that.
- For M2 to M4: the inspection build. If a P row fails, keeping the inspection behaviour is the default.

**Who reads what.**
- The steward assembles each milestone's readout from the check owners' records, and only after those records are written.
- The exit stays with the brief's approvers: head-of-product, plus the founder for M3.
- The steward's authority is to refuse to report a result whose row was not committed first, and to hide a scorecard with a sample-ratio mismatch.

## Result

Not run. No milestone has started; no fixture, measurement, learner, assignment or outcome exists. Append each milestone's results below with the commit read, the record each came from, and void/passed/wrong per row. Never edit the section above.

## What changed because of it

At registration:
- The brief's predictions are frozen.
- The brief's P1.5 and P1.6 (added with EDD-018 Addendum A3 option (b) while this registration was being written) are registered as written.
- Four rows were added: P0.3, P0.4, P1.7 and P3.5, plus a 4-region case in P3.3.
- Void conditions now bar fixtures and measurement scripts written after the build.
- L4's measure is replaced by a common probe.
- L1 and L2 stay EXP-009's, unedited.

## Objections

1. **The EXP-009 treatment changed under it (steward, to head-of-product).** EXP-009 registered the twelve-lesson Number Island journey. The live World now offers 3,895 stops in 162 islands, and attention spread over them could lower Number Island explorations in the treatment arm. *Proposal:* freeze the treatment manifest for the study to the World build named at enrollment, and state in the enrollment freeze whether other islands are reachable. If they are, L1's ratio threshold was set for a different package, and a new registration is the honest route, not a reinterpretation of P1.
2. **Gamification registration and readout.** The role cards give L4 and the seal rows to personalization-eval. The founder's record gives this experiment to the steward. *Proposal:* the steward keeps the registration. The L4 readout goes to personalization-eval as an independent second reader, if it is unparked and willing; that is head-of-product's call.
3. **L3 at 30% has no empirical basis.** No learner has data yet. *Answer:* it is a product threshold for "states mean recall", not an estimate, and it may only be tightened before the M1 release.
4. **P0.2 is a pessimistic prediction that a maker could "win" by rushing.** *Answer:* P0.1, P0.3 and P0.4 bar the shortcuts that would rush it.
