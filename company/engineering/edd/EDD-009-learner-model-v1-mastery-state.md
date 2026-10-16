# EDD-009: Learner model v1, mastery state and feed rules (mastery part; personalization rules stubbed)

owner: learner-model-engineer (Ifeoma) · co-author of the second half: personalization-lead (Mateo), once the founder's F-08 brief exists
date: 2026-10-16
class: engineering design, **tier 2** (it reads learner data and defines a learner-facing surface; the feed-rules half changes the feed's contract). The mastery half proposes **no new stored data**
status: **proposed, draft 1 (2026-10-16)**. Mastery part complete enough to review. Section 7 (personalization rules) is a named stub
route: learner-model-engineer (this draft) → principal-engineer (architecture review, **target: approved by 2026-10-30**, review asked for by 10-27) ∥ privacy-reviewer (confirm "no new field, no new read", §5) ∥ pedagogy-critic (does the table mean what its words say, Q1.7) → evaluation-steward (AMD-FL-B specs from §3) → growth-designer (PRD-004 R5 words, §4) → platform-engineer (build, after EDD-008's progress lands) → fact-checker (the state strings as claims, M7, Q3.4)
recorded by: learner-model-engineer
reviewers: principal-engineer (Kenji) + privacy-reviewer (Elif) + pedagogy-critic
board: W-1132 (this). Related: W-906 (AMD-008), W-1133 (PRD-004), W-1135 (EDD-008 spike), W-091 / F-08 (personalization brief), F-19 (ratification)
batch: first-light/2026-10-16-round-1#5
inputs read: `company/constitution/amendments/AMD-008-first-light-surface-value.md` (F2, P1 to P5, M1 to M8, X1 to X3; **proposed, not ratified**); `company/engineering/edd/EDD-008-accounts-and-server-progress.md` (§6.1, §8, §9, PE review); `company/engineering/data-inventory.md` (D1, D2, D5, D12, D13); `company/product/prds/PRD-004-first-light-challenges.md` (R3 to R7, §9); `src/kit/progress.ts`; `src/kit/Lesson.tsx` line 73; `src/components/Feed.tsx` lines 255 to 260; `src/kit/types.ts` (`DemoMeta.concept`, `recall`); `company/decisions/2026-10-15-first-light-release-1-scope.md` (Ruling 4); `company/engineering/notes/2026-10-15-first-light-reestimate.md`; `company/initiatives/first-light/quality-bar.md` (Q1.7, Q2.4, Q3.4, Q4.2); `company/personalization/README.md`.

---

## 1. Problem and why now

First Light (release 1, RC1 11-13) includes a mastery state: what a learner has shown they remember, lesson by lesson. Ruling 4 makes it mine and says it is "derived only from recall and completion" and is never cut, because it rides on server-side progress (EDD-008). AMD-008 M1 asks the learner-model engineer to publish a **definition table** before AMD-FL-B is written, so that the specs test a function and not a reviewer's reading. PRD-004 (challenges) is waiting for the state words (R5). The tech lead's plan has EDD-009 approved on 10-30.

The risk this design exists to hold down is the role's first failure mode: *a model that predicts clicks*. A mastery state is the easiest place for engagement to sneak in (a counter that rises with visits, a state that decays to bring people back). Here it cannot, because the state is a pure function of two kinds of evidence and of nothing else, including the clock.

## 2. Goals / non-goals

- Goal: one published table (§3) that says, for every state, the exact condition on the progress record, the words a learner sees, and what was measured.
- Goal: the state is **a pure function of completion and recall** (`completedAt`, `recalls[{at, correct}]`). No other field, event or input.
- Goal: **the state does not depend on the current time.** Time passing can never lower it (M3). The clock is used only for the separate "ready to revisit" flag, which is the existing schedule (`revisitDue`), not a state.
- Goal: the same function gives the same answer for an anonymous learner (local record, D1) and a signed-in one (the same local record after the EDD-008 merge), so signing up changes nothing about the state (P4's spirit applied to mastery).
- Goal: no new stored field, table, column, storage key or beacon event.
- Non-goal: streaks, counts across days, points, scores, levels, badges for volume, comparison with other learners, decay, reminders (M2, M5, M8). Not deferred: excluded.
- Non-goal: a learned or probabilistic model (knowledge tracing and the like). AMD-008 P1 rules learned ranking out for First Light, and a probability shown as "you know this" would assert more than was measured (M7).
- Non-goal: crediting predictions (see §3.3), dwell, swipes, opens, shares or ad events (M1, X1).
- Non-goal: personalization rules. They are §7, a stub, until F-08.

## 3. The M1 definition table

### 3.1 Inputs (the only ones)

For one lesson slug, the learner's `LessonProgress` from `s3c:progress:v1` (`src/kit/progress.ts`):
- `completedAt`: epoch ms of the **first** time the reveal was reached. The kit keeps the first value (`completedAt: p.completedAt ?? Date.now()`, `Lesson.tsx` line 73); EDD-008's merge keeps the earliest (`LEAST`).
- `recalls[]`: `{at, correct}` written by the revisit card (`Feed.tsx` line 259), shown only when `revisitDue()` says so; PRD-004 R3 writes the same record.
- `dayMs`: the length of a day, 86,400,000 in production, shortened only by `?revisitMinutes=` for QA (the same parameter `revisitDue` takes).

Not read: `predictedCorrectly`, the event log `s3c:events:v1` (D2), the experiment markers (D5), anything from the beacon, the account row (`age_band` included), the device, the time of day.

### 3.2 Evidence rules (applied before the table)

| # | Rule | Why |
|---|---|---|
| E1 | No `completedAt` → the lesson is *not played*, and any recalls on it are ignored | a recall without a completion is malformed data (it cannot be produced by the UI) |
| E2 | A recall **counts** only if `at ≥ completedAt + 1 dayMs`. Recalls that do not count are ignored entirely, right or wrong | "recalled" means a *spaced* recall (AMD-008 M1). The UI cannot produce an earlier one today; this keeps imported or merged data honest |
| E3 | Counted recalls are taken **sorted by `at`**, and duplicates with the same `at` are one recall | after a union merge the array order is not guaranteed (Q4); EDD-008's `recall` primary key already de-duplicates by `at` |
| E4 | The *latest* counted recall decides between "worth another look" and the recalled states | M3: only a wrong recall can lower a state, and it does so at once |
| E5 | `now` is not an input to the state | M3 and the "away for 60 days" test: the state is a fact about past answers |

### 3.3 Per-lesson states

Let `C` = counted recalls (E2, E3), `last` = the latest of `C`, `R` = the correct ones in `C`.

| State id | Condition (first matching row wins, top to bottom) | Learner words (exact, English; M4-clean) | What was measured (the claim, M7) |
|---|---|---|---|
| `not-played` | no `completedAt` | "Not played yet" | nothing (absence of a record; not a claim about the learner) |
| `held` | `last.correct`, and two correct recalls in `R` are **at least 7 days apart** (`max(R.at) − min(R.at) ≥ 7 dayMs`) | "Recalled twice, {D} days apart" where D = ⌊(max(R.at) − min(R.at)) / dayMs⌋ | two right answers to this lesson's recall question, at least D days apart, the later one being the latest answer |
| `recalled` | `last.correct` (so `R` is non-empty) | "Recalled {N} days later" where N = ⌊(last.at − completedAt) / dayMs⌋ (N ≥ 1 by E2; "1 day later" in the singular) | the latest answer to the recall question was right, at least N days after playing |
| `look-again` | `C` non-empty and `last` is wrong | "Revisited, worth another look" | the latest answer to the recall question, at least a day after playing, was not right |
| `played` | `completedAt` set and `C` empty | "Played" | the reveal was reached |

Order, for any view that ranks a learner's own lessons by their own state (never against other learners, M5): `held` > `recalled` > `look-again` = `played` > `not-played`. `look-again` and `played` sit together on purpose: a wrong answer is not below having never been asked.

Floors, not rounding, so every number is true: "9 days later" means at least 9 whole days. (The feed's `spacedDays` event field uses `Math.round`; that is analytics, not learner copy, and is not used here.)

### 3.4 Flags beside the state (not states, never stored)

| Flag | Definition | Words | Note |
|---|---|---|---|
| `revisited` | `C` non-empty | used in counts: "{b} of {n} revisited" | PRD-004's "finished" line rests on this. It is true whether the answer was right or wrong (R6) |
| `due` | `revisitDue(p, now, dayMs)`, unchanged | "Ready to revisit" | the only clock-dependent value. It never lowers a state, never counts down, and is never phrased as a loss (M3, M4) |
| `all-due-done` (feed or account view, optional) | no lesson in the map is `due` **now** | "No revisits waiting right now" | M2 allows today's state. **It is not counted across days, not stored and not shown as a run** |

### 3.5 Why predictions earn no credit

AMD-008 M1 permits "prediction made" as an input; this table deliberately does not use it, as Ruling 4 and the dispatch say ("recall and completion"). Three reasons: (1) a prediction is a guess made before the lesson teaches anything, and a wrong prediction is the lesson working, not a gap in knowledge; crediting right predictions would reward knowing it already, and a "you got it wrong" mark would be guilt copy. (2) `predictedCorrectly` is not stable evidence today: `Lesson.tsx` line 73 overwrites it on every replay, so it describes the latest play, not the first. (3) Fewer inputs is a smaller privacy read. `predictedCorrectly` stays in the record for Surface Value #5 and for personalization (P2 permits it); it simply does not reach this function.

### 3.6 Worked examples (these become the seeded fixtures for AMD-FL-B)

Times in days after `completedAt = 0`; schedule `[1, 3, 7, 21]`.

| History (recalls) | State | Words |
|---|---|---|
| none, not completed | `not-played` | Not played yet |
| completed, none | `played` (and `due` from day 1) | Played · Ready to revisit |
| day 1 right | `recalled` | Recalled 1 day later |
| day 1 right, day 4 right | `recalled` (3 days apart, under 7) | Recalled 4 days later |
| day 1 right, day 4 right, day 11 right | `held` (1 to 11 = 10 days) | Recalled twice, 10 days apart |
| day 1 right, day 4 wrong | `look-again` | Revisited, worth another look |
| day 1 right, day 4 wrong, day 11 right | `held` (1 to 11 ≥ 7, latest right) — see Q1 | Recalled twice, 10 days apart |
| day 1 wrong | `look-again` | Revisited, worth another look |
| `held`, then the learner is away 60 days | `held` (E5) · `due` may be true | Recalled twice, … · Ready to revisit |
| a recall at day 0.5 (imported) | ignored (E2) → `played` | Played |
| any history plus any number of opens, swipes, dwell, shares, ad events | unchanged | unchanged (M1 test) |

### 3.7 Concept or lesson

AMD-008 M1 speaks of "a learner's state for a concept". Each lesson has one `DemoMeta.concept`, and several lessons can share it. **Release 1 shows state per lesson only.** A concept roll-up (for the map) needs a rule for mixed lessons that would either hide a wrong answer ("best of") or punish a learner for an unplayed sibling ("worst of"), and both make the words claim more than was measured. Proposed: AMD-FL-B's M1 test reads "concept" as "lesson" for release 1 (Q2).

## 4. Words for PRD-004 (R5)

PRD-004 R5 says a mismatch is settled in this table's favour. Its words mostly match; the differences are small and listed so the growth-designer can adopt them in their file (I do not edit PRD-004).

| PRD-004 R5 (as written) | This table | Change asked |
|---|---|---|
| "not played yet" | `not-played`, "Not played yet" | none |
| "played" (reveal reached) | `played`, "Played" | none |
| "ready to revisit" (first revisit due) | `due` flag, "Ready to revisit" | it is a **flag beside** the state, not a state: a `played` lesson can be due, and so can a `recalled` one. On the challenge page show "Played · Ready to revisit" |
| "recalled N days later" (first revisit right) | `recalled`, "Recalled {N} days later", N = ⌊days from play to the **latest** counted recall⌋ | the state uses the latest counted recall, not only the first. For a challenge lesson whose only answer is the first revisit, these are the same |
| "revisited, worth another look" (first revisit wrong) | `look-again`, same words | none |
| (not in R5) | `held`, "Recalled twice, {D} days apart" | add it: a lesson can reach it after the challenge is finished, and the page must show it rather than fall back to "recalled" |
| per challenge "<a> of <n> played · <b> of <n> revisited" | `a` = lessons not in `not-played`; `b` = lessons with `revisited` | none |
| "finished" when every first revisit is answered, right or wrong | every lesson `revisited` | none. It cannot become unfinished: recalls are never deleted or lowered (EDD-008 §8), so `revisited` only goes from false to true |

All state strings are learner-facing claims (M7, X2, Q3.4). They are true by construction from the progress record; the fact-checker verifies the construction (this table plus the function's tests), not each rendered instance. PRD-004's "finished" sentence ("You played these 4 lessons and answered each one again at least a day later") is consistent with E2.

## 5. Data (for the privacy reviewer)

**Fields, tables, columns or storage keys added: none.** The state and the flags are computed in the browser on render and are not written anywhere: not to localStorage, not to the server, not to the beacon, not to the export.

**Data read**, all already in the inventory:

| Inventory row | Read by the mastery function | Where computed |
|---|---|---|
| D1 `s3c:progress:v1`: `completedAt`, `recalls[{at, correct}]` | yes | browser |
| D1 `predictedCorrectly` | **no** (§3.5) | n/a |
| D12.3 `progress.completed_at_ms`, D13.3 `recall.at_ms`, D13.4 `recall.correct` | only **indirectly**: they reach the browser through EDD-008's merge response, which writes them into D1. The function never queries the server | browser |
| D12.4 `progress.predicted_correctly` | no | n/a |
| D2, D5, D6, D8 (incl. `age_band`), anything else | no | n/a |

No server-side computation of mastery is proposed. Computing it on the server, storing it, or aggregating it across learners would be a new purpose and comes back as a new EDD and privacy read. The aggregate recall rate (EDD-008 Q5) is the analytics steward's and is not this.

Teen mode (`13-15`): the same function and words; nothing here depends on the band, and nothing here is about who the learner is.

## 6. Current state, options, proposal

### 6.1 Current state (with measurements)
- No mastery state exists. `revisitDue` and the revisit card exist; `REVISIT_SCHEDULE_DAYS = [1, 3, 7, 21]`.
- `recalls` are appended in click order; `revisitDue` reads the **last array element**, which assumes the array is in time order (Q4).
- `predictedCorrectly` is overwritten on replay (`Lesson.tsx` line 73).
- No surface shows mastery copy; 0 mastery strings in the claims register.

### 6.2 Options considered

| Option | Cost | Risk | Reversibility |
|---|---|---|---|
| Do nothing: no state, revisit cards only | 0 | release-1 scope miss (Ruling 4 says never cut); PRD-004 has no words | n/a |
| AMD-008 defaults verbatim (seen / recalled / held), no evidence rules | smallest | merged or imported data with unspaced or unsorted recalls gives wrong copy; "recalled" never goes down after a wrong answer, so the words overclaim | high |
| **Pure client-side function over the existing record, §3 table** (proposed) | about 1 code run for the function and its fixture tests, inside the 0.64M mastery estimate (principal engineer's figure, not mine) | the `held` rule after a wrong answer is a pedagogy judgement (Q1) | high: flag off hides the surface; nothing stored, so nothing to migrate or delete |
| Store the state (a `mastery` column or local key), updated on each event | about the same | a new field (privacy read, inventory row, export, deletion); state can drift from its evidence; tempts later "decay" jobs | medium |
| Probabilistic learner model (knowledge tracing) | several runs plus offline evaluation | not explainable in one sentence; a probability shown as knowledge overclaims (M7); AMD-008 P1 spirit | medium |

### 6.3 Proposal
1. A pure function, proposed shape `masteryOf(p: LessonProgress | undefined, dayMs) → { state, revisited, evidence: { completedAt, lastRecallAt, n, d } }`, and a separate `due` from the existing `revisitDue(p, now, dayMs)`. **`now` is not a parameter of `masteryOf`**, so E5 holds by its signature. The evidence object carries exactly the numbers the words use, so the copy is rendered from it and cannot say more.
2. Location: `src/lib/learner/mastery.ts` (my scope "once approved"), **not** `src/kit/` (protected). No change to `Lesson.tsx` or `progress.ts`.
3. Callers: the account or progress view, the challenge page (PRD-004), and optionally the map. **Not the feed order**: the state does not move cards (F2, and P1 says only published rules may; §7).
4. Behind a flag (`mastery`), off by default until the AMD-FL-B specs pass. Rollback is the flag (AMD-008 "Rollback": records kept, surface hidden).
5. Language: English strings live in one copy file so the M4 scan and the claims register see them in one place.

## 7. Personalization rules (stub, owner: personalization-lead)

**Not drafted. Owner: personalization-lead (Mateo), with learner-model-engineer writing the rule functions (Ruling 4).** Waiting on:
- **F-08**, the founder's personalization brief (W-091): what adapts, which signals, how visible (questions in `company/personalization/README.md`).
- **F-19**, ratification of AMD-008 part P. If it is not ratified by 10-30, personalization ships switched off (quality bar §4) and this section stays a stub for release 1.
- Fixed constraints any rule here inherits from AMD-008 as drafted: rules not a model (P1), permitted inputs only (P2: this section may read `predictedCorrectly`, which §3 does not), a true reason on every moved card (P3), one off control and no account needed (P4), an experiment with a holdout per rule (P5), due revisits first (F2).
- Interface offered from the mastery half: rules may read `masteryOf()` output as an input (it is derived only from P2-permitted fields). Whether they should is personalization-lead's call.
- Data: no `settings` table yet; it ships with F-19 under its own schema diff (EDD-008 §6.1). Any rule input beyond D1 needs its own privacy read.

## 8. Measurements that will show it worked (committed before implementation)

| Metric | Now | Target | Command (written with the function; none exists yet) |
|---|---|---|---|
| Fixture replay: every row of §3.6 gives its state and words | n/a | 11 of 11 | `node --test tests/learner/mastery.test.mjs` (proposed path) |
| Purity (M1): add opens, swipes, dwell, shares, ad events and a flipped `predictedCorrectly` to each fixture | n/a | 0 state changes | same suite |
| Time (M3): evaluate each fixture at now + 0, 60 and 400 days | n/a | 0 state changes (`due` may change) | same suite |
| Monotone except by wrong recall: random histories, append a right recall or let time pass | n/a | state never goes down; only appending a wrong counted recall lowers it | same suite (property test, seeded) |
| Anonymous equals signed-in: run on a local map and on the same map after an EDD-008 merge round trip | n/a | identical states | with EDD-008's `merge.test.mjs` |
| Order-independence (E3): shuffle `recalls` | n/a | identical states | same suite |
| Banned phrases (M4) over the mastery copy file | n/a | 0 hits | AMD-FL-B scan |
| Q4.2 probe: learner-evaluator's borrowed minds read the state as a streak or a score to defend | n/a | "no", both, quoted | learner-evaluator record |

would_be_wrong_if: (a) pedagogy-critic finds that `held` or `recalled` says more than the evidence (for example, that a learner who answered wrong last week reads "Recalled twice" as current); (b) Q4.2 finds the states read as a score to defend; (c) learners read "Played" as an accusation next to "Recalled"; (d) the offline check, once accounts produce real data, shows that `held` lessons are not recalled better at their next revisit than `recalled` ones (if held does not predict the next recall, the word is not earning its place). Offline evaluation is mine; it runs only on data the privacy reviewer has approved for that purpose (EDD-008 Q5).

## 9. Operational readiness (sections 1 to 7, answered once)

1. **What can fail:** wrong words for a lesson (a bug in the function); unsorted recalls after a merge (Q4); a recall-free malformed record (E1 handles it).
2. **How we would know:** the fixture and property tests in CI; QA on the challenge page and account view with `?revisitMinutes=1`.
3. **How to roll back:** the `mastery` flag off. Nothing is stored, so nothing to migrate back.
4. **Capacity:** O(recalls) per lesson in the browser; at most 100 recalls per slug after merge validation (EDD-008 §8). Negligible.
5. **Security:** no new input from the network beyond EDD-008's merge response, which is already validated there.
6. **Data:** §5. No new field.
7. **Risks:** R-m1, a later change makes the state depend on time or engagement (held down by the M1 and M3 tests); R-m2, a concept roll-up is added without a rule (Q2).

## 10. Rollout and rollback

1. Review (this file): principal-engineer, privacy-reviewer and pedagogy-critic in parallel; **PE approval target 2026-10-30**.
2. AMD-FL-B (evaluation-steward) writes the M1 to M3 specs from §3 and §8, in warn-only mode if F-19 is not ratified (AMD-008 objection 9).
3. Function and tests under the flag, after EDD-008 progress is on a preview (the anonymous path can be built first: it needs no account).
4. UI by platform-engineer; copy recorded as claims; fact-checker verifies.
5. Flag on for release 1 only when the §8 tests pass. If F-19 is not ratified, mastery ships only under today's Surface Value "no streaks and no guilt" (dependencies D-10); this table is already inside that.

## 11. Open questions

| # | Question | For | Status |
|---|---|---|---|
| Q1 | After a wrong answer, should `held` return as soon as the next answer is right (whole-history pair, as drafted), or require a fresh pair of right answers 7 days apart after the wrong one? The draft is lenient so that one slip does not cost weeks; the strict version claims less | pedagogy-critic | open |
| Q2 | AMD-008 M1 says "state for a concept"; release 1 shows lessons only (§3.7). Can AMD-FL-B's M1 test read "concept" as "lesson" for release 1? | evaluation-steward | open |
| Q3 | Is "held" the right internal word, and is "Recalled twice, {D} days apart" the right learner sentence? M7 forbids "mastered"; "held" is not shown to learners | pedagogy-critic, growth-designer | open |
| Q4 | EDD-008's merge returns recalls from rows; `revisitDue` reads the last array element and assumes time order. Will the merge response (and the local union write) sort `recalls` by `at`? Mastery is immune (E3); the schedule is not | backend-engineer | open, raised here |
| Q5 | `predictedCorrectly` is overwritten on each replay (`Lesson.tsx` line 73, protected). Not a mastery problem (§3.5), but Surface Value #5 and any P2 rule that reads it inherit it | analytics-steward, personalization-lead | open, raised here |
| Q6 | Should `all-due-done` exist at all? It is allowed by M2, but it is the nearest thing in this design to a daily target | growth-designer, pedagogy-critic | open; default: not built unless asked |
| Q7 | EDD-008 Q7 (merge keeps the account's `predicted_correctly` over the device's) does not affect mastery, since §3 does not read it. Answer to EDD-008 Q7 from this role: no objection | backend-engineer | answered here |

## Objections

| # | Objection | Raised by | Status |
|---|---|---|---|
| 1 | AMD-008 M1 lists "prediction made" as a permitted input, so excluding predictions narrows the amendment | learner-model-engineer (self-raised, anticipating the evaluation-steward) | **Kept as drafted, with reasons (§3.5).** M1 says what may count, not what must; Ruling 4 and the dispatch say recall and completion. If the founder or pedagogy-critic wants prediction credit, it comes back here with a stable field first |
| 2 | A state that can go down on one wrong answer is a loss mechanic in disguise | learner-model-engineer (self-raised, from M3) | **Open with a test.** M3 permits it, and not lowering would make "Recalled" false after a wrong answer (M7). The words are neutral ("worth another look") and Q4.2 checks how learners read it; if it reads as loss, the fix is the words, not hiding the answer |
| 3 | Lesson-level state is less useful on the map than concept-level | learner-model-engineer (self-raised) | **Accepted as the cost for release 1** (§3.7, Q2) |
| 4 | Confidence | learner-model-engineer | About 80% that the table survives review with only word changes; about 55% that Q1 is settled as drafted. The data claims in §5 are high confidence (read from the code and the inventory on 10-16) |

No reviewer has objected yet.

## Review asks

- **principal-engineer:** architecture review of §6.3 (pure function, location `src/lib/learner/`, flag); approval by **2026-10-30**.
- **privacy-reviewer:** confirm §5: no new field, no new read beyond D1 (`completedAt`, `recalls`), computed in the browser, nothing sent.
- **pedagogy-critic:** Q1, Q3 and "does mastery mean what it says" for Q1.7.
- **evaluation-steward:** Q2; use §3.6 as the seeded fixtures for AMD-FL-B.
- **growth-designer:** adopt §4 in PRD-004 R5 (the `due` flag, the `held` row).
- **backend-engineer:** Q4.
