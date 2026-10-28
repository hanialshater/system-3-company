# Lessons World: brief for the next milestones (M0 to M4)

owner: head-of-product
date: 2026-10-28
class: product / format / progressive learning
status: proposed. Not self-approved (see "Approval" below). The founder answered F1 to F4 on 2026-10-28 (section 9). Rulings for QA's M1 table are in section 10. Nothing here is built, run or deployed.
builds on: the live inspection World (`/learn/world`, released 2026-10-28; release-manager's record, W-2151)
sources:
- founder plan and refinements: `company/decisions/2026-10-27-founder-lessons-world-journey.md`
- inspection scope: `company/product/2026-10-27-world-all-lessons-inspection.md`
- architecture: `company/engineering/edd/EDD-018-lessons-world-journey.md`
- preregistered experiment: `company/experiments/EXP-009-lessons-world.md`
- release feasibility: `company/ops/deployments/2026-10-27-number-island-feasibility.md`
- the founder's later art and branching decisions (branch `codex/all-lessons-inspection`): `company/decisions/2026-10-28-founder-bespoke-world-art.md`, `company/decisions/2026-10-28-founder-branching-world-zoom.md`

## 1. What is live, and what is not

Live (inspection build, every lesson marked Unchecked): 3,895 unique lesson stops in 162 islands, Map and List over the same lessons, the branching atlas with zoom and pan (on `codex/all-lessons-inspection`), the bespoke Number Island art, a fixed "Start here" marker, the existing vertical player in island order, and a return to the same island, stop and camera position.

Not live: progress states (Explored, Understood), a suggested next stop based on the learner's own record, due-revisit marks on the map, recall flags, seals, counts. The inspection scope left these out on purpose rather than show fake or zero progress (`company/product/2026-10-27-world-all-lessons-inspection.md`, "Follow-up").

This brief covers those missing parts, plus scene polish and the honest end of content. It does not change the normal feed, the default order, lesson statuses, gates or tests.

## 2. The content is mostly unchecked, and what that means for learners

On the default branch today (`npm run company -- status`, 2026-10-28): 3,895 lessons. 2,941 are Draft (76%), 234 In review, 720 Published. `npm run check` fails with 783 errors and 4 warnings, and every one of the 783 is "published but fails gate", across 407 of the 720 published lessons (mostly verdicts and QA for an older version). 26,010 claims are waiting for the fact-checker. So only about 313 lessons (8%) are published and pass their gates today.

What this means for a learner in the World:
- Most stops have facts no one but their builder has checked. Some will be wrong.
- Recall makes what you learned stick, right or wrong. A learner who explores an unchecked lesson and later answers its recall question correctly has remembered what the lesson said. That is not evidence the lesson was true.
- So "Understood" means "you recalled this lesson's answer a day or more later", never "this is correct". The Unchecked label stays beside every state, on the map, in the List, in the bottom sheet and in the player.
- **Seals on every island, labelled** (founder, F2, 2026-10-28: "Seals everywhere, labelled"). Any island may offer a seal attempt. On an island that is not fully checked, the seal and its attempt carry the label "unchecked content". The label rule is R-SEAL-UNCHECKED in section 10. This overrides product's recommendation, which was seals only on fully checked islands. Product's objection travels with the decision (O2, section 8).
- The founder chose to keep unchecked lessons visible ("keeping the lessons unchecked statsu but still visible") and to keep Published statuses ("Keep Published; complete independent reviews before continuing"). This brief follows both.

## 3. Definitions (each line can be tested)

### 3.1 Stop states

These follow the founder's record and EDD-018 §3.
- **Not started:** no recorded reveal (`completedAt` absent). Opens, selections, predictions, scrolling and dwell time do not count.
- **Explored:** a recorded reveal, and no latest qualifying recall that was correct.
- **Understood:** the latest qualifying recall (3.2) was correct.
- **Unknown:** the progress store is unreadable, blocked, or account ownership has not settled. Show no state and no count. Never show zero.
- Time passing alone never lowers a state. "Due for a revisit" is a separate mark, from the existing schedule (`REVISIT_SCHEDULE_DAYS = [1, 3, 7, 21]` in `src/kit/progress.ts`). It is never a state.

### 3.2 Qualifying recall

A recall answer qualifies only if all six of these hold:
1. **Source.** It is one of two things. (a) The lesson's own scheduled recall, answered while the lesson was due under `revisitDue`. (b) That same lesson's recall question, answered inside an *eligible seal attempt* (3.3).
   - None of these count: flag practice, a replayed lesson, predictions, the EXP-009 research probe, a QA run with shortened days (`?revisitMinutes`).
2. **Gap.** It was answered at least 24 hours (86,400,000 ms of real time) after the lesson's *first* recorded reveal. Learner-local calendar days do not count; the gap is elapsed time.
3. **Version.** It used the lesson's current recall question version. If the question changes, older answers stop qualifying for the new version, and the lesson shows Explored until a new qualifying answer.
4. **Answered.** The learner chose an option. Skipping or abandoning is no evidence.
5. **No double credit.** For one lesson, only the latest answer counts, whatever its source. A scheduled recall and a seal answer for the same lesson within 24 hours do not count twice toward a seal or a count.
6. **Old records.** Recall records written before M1 have no source or version field (`recalls: { at, correct }`). They count as scheduled recalls only if engineering shows, in the M1 record, that the due-revisit path was the only writer of `recalls` before M1. Otherwise they do not count, and those lessons show Explored. The same rule applies to account rows written before the M1 migration, whose `source` and `qv` are null (M1, option (b)).

**A wrong answer resets the state but keeps the history.** If the latest qualifying answer is wrong, the stop goes back to Explored, with a "worth another look" cue. Earlier correct answers stay in the record but no longer decide the state. The stop becomes Understood again only after a later qualifying correct answer. Under the existing schedule that answer comes at least one day after the wrong one. A wrong answer during practice changes nothing.

### 3.3 Flags and seals, and how they scale

- **Size.** Six questions per flag, on every island. The founder capped it at six for all island sizes (`company/decisions/2026-10-27-founder-lessons-world-journey.md`, "Flag scale").
  - **3 regions** (Number Island): two questions per region.
  - **4 or 5 regions** (the generated islands are 25 lessons in 5 regions of 5, `src/lib/lessons-world.ts`): one question from each region. The 1 or 2 slots left over rotate among the regions in a fixed order set by the attempt number. Every region gets an extra slot within 5 attempts.
  - We did not take "two per region" on 4–5-region islands. That would make a flag 8–10 questions and miss the time target.
- **Time target.** A median of 3 minutes or less to answer all six. If QA timing shows an island's six questions run over, the fix is a different sample of questions from the category owners. The cap does not grow.
- **Which questions.** The sample uses the lessons' own reviewed recall questions, pinned by version in the island's check definition. No question is generated. A new question version makes a new check version.
- **Seal attempt opens when** all four hold: every lesson on the island is Explored, 24 hours have passed since the last first exploration, and 24 hours have passed since the last flag practice or attempt. "Explored" here means the lesson has a recorded reveal, so Understood lessons count (R-EXPLORED-INCLUDES-UNDERSTOOD). The sampled questions do *not* have to be due (R-SEAL-DUE). An island that is not fully checked still opens, with the label (R-SEAL-UNCHECKED).
- **Seal is earned** with 5 or more correct out of 6. A seal credits only the lessons whose questions were actually answered. It never marks all 12 (or all 25) as Understood.
- **Copy.** "Seal attempt opens tomorrow" only when the opening time falls on the learner's next local date. Otherwise show the true date and time. Once open, show "Seal attempt ready".
- **No pressure.** No streak, countdown, lock on the next island, score or claim of mastery.

### 3.4 Suggested next

Pick the first of these that applies:
1. a lesson the learner explicitly chose;
2. a due revisit, in island order;
3. the first unexplored stop;
4. an open seal attempt;
5. optional practice.

A fresh learner whose store is readable starts at stop 1. If the store is Unknown, show only the fixed "Start here" marker. The highlighted route never implies that stops before it were done.

## 4. Predictions first (owned by analytics-steward)

No milestone's maker starts until analytics-steward has registered that milestone's predictions in a committed record. The record is either an EXP-009 addendum or a new EXP that analytics-steward names. Its commit freezes them, and nothing in it is edited after the milestone's run starts. The predictions below are product's proposals. Analytics-steward may tighten or replace them in the registration. Analytics-steward owns them, not product.

### 4.1 Learning outcomes: what we would have to see

| ID | Prediction | Would be wrong if |
|---|---|---|
| L1 (EXP-009 P1, already registered) | Offered the World, learners reach first reveals on more distinct Number Island lessons in days 0–6 than feed-only learners. Ratio 2.0 or more | The upper 95% bound of the ratio is below 2.0 |
| L2 (EXP-009 P2 and G1) | Their one-week recall of a common anchor lesson is no lower than feed-only. Guardrail: no more than 3 points lower | The upper 95% bound of the difference is below 0 (P2). For G1: the upper bound is below -3 points, which stops exposure |
| L3 (new, for M1) | Among learners with a readable store, the share of Explored stops that reach Understood within 14 days is at least 30% | It is below 30%. Then states are mostly a label for "visited", and M3's seals would rest on too little recall |
| L4 (new, for M3) | Offering seals does not lower qualifying recall correctness on Number Island against M1-only learners. Guardrail: 3 points | The upper 95% bound is below -3 points. A seal is then rewarding attempts, not remembering |

**The holdout design.** We will not judge "learners who open the World" against "feed-only learners". People who choose to open a map differ from people who don't, so that comparison says nothing about cause. The design:
- **Causal (L1, L2, L4): EXP-009's assignment-based study.** Consented adults, assigned 1:1 to "World offered" or "feed only" *before* exposure, analysed by intention to treat, same lessons and versions in both arms. L4 adds a third arm, or a second registered study, with "World with states, no seals" as control.
- **Live holdout: not now** (founder, F4, 2026-10-28: "Not yet (Rec.)"). It would need a new founder O2 decision (`company/product/surface-value.md`, "No live comparison group unless the founder decides one"). If the founder decides one: a stable per-device 1:1 assignment of the World entry point (shown or not shown), new devices only, assigned before first view, analysed by intention to treat. Until then every live number is a before/after description, never a cause.
- **Descriptive slice (allowed now, labelled as such):** World-opening devices against feed-only devices. It is reported to the WBR as description, with the selection caveat printed beside it. It is never a pass or a fail.
- **Blocker for all of L1 to L4.** The beacon today has no participant link, and `REGISTERED_EXPERIMENTS` is empty (EXP-009, "Minimum instrumentation"). No learning prediction can be judged until privacy-reviewer and backend approve the instruments. The milestones below are judged on the check predictions in section 5, which do not need learner data.

## 5. Milestones

Each milestone has the same shape: registered predictions, then one warm maker, then the checks once at the end, then the exit decision. Reviewers see the artifact before the maker's notes.

**One warm maker: personalization-engineer.** It is one maker for M1 to M4, warm across milestones. It owns the feed surface and gamification UI (`tools/org/roles.mjs`), which covers the player hookup and the flag and seal UI. EDD-018 §6 splits these files across four builders (platform, learner-model, backend, personalization). Principal-engineer agreed in EDD-018 Addendum A: one maker, with the other owners reviewing the diff once at the end of each milestone (Addendum A2). O1 is answered (section 8).

**Cost** (section 6): $60 target per milestone, pause at $120.

### M0: Checks green

- **Goal.** `npm run check` exits 0 on the default branch. The founder made green checks the precondition for further journey implementation. The inspection release was the only exception (`company/decisions/2026-10-27-founder-lessons-world-journey.md`, "Founder refinements"; `company/product/2026-10-27-world-all-lessons-inspection.md`).
- **Baseline.** 783 errors and 4 warnings, all published-gate failures, across 407 lessons (2026-10-28).
- **Owner.** There is no feature maker. evaluation-steward runs the triage. Category managers route lesson evidence to fact-checker, learner reviewers and QA. This is company remediation, not World work.
- **Not allowed.** No weakened assertion, no allowlist, no mass demotion (the founder rejected withdrawal), no backdated or invented verdicts.
- **Predictions:**
  - P0.1: green is reached with no change to `tools/company.mjs`, `tests/qa/` or any protected path. *Wrong if* the commit that turns it green touches any of them.
  - P0.2: M0 is not done by 2026-11-04. *Wrong if* `npm run check` exits 0 on the default branch on or before that date. This prediction exists to warn: at this size M0 is the critical path, and the founder may want to rule on it (section 9, question F3).
- **Check.** Evaluation-steward's record of the green run at a named commit.
- **Exit.** Evaluation-steward's record. Product does not sign it.

### M1: State model, list view, player hookup

- **When (founder, F3).** Built now, on a branch, while M0 runs. Released only once `npm run check` is green, or on the founder's explicit release of M1, and every deploy still needs the founder's approval of that deploy. Before the maker starts: analytics-steward's registration and QA's table with the section 10 rulings applied.

- **Build:**
  - the pure state, qualifying-recall and suggested-next functions of section 3, with no `now` argument in the state function (EDD-018 §3);
  - an additive `source` and `qv` (question version) on new recall records in `src/kit/progress.ts`, which is not a protected path (`src/kit/Lesson.tsx` is, and stays untouched);
  - states and the readable-store count in the List and on the map stops;
  - due-revisit marks;
  - the suggested-next marker;
  - island-order player entry recording scheduled recalls with their source;
  - Unknown handled as Unknown.
- **Account recall columns: option (b) of EDD-018 Addendum A3** (head-of-product, 2026-10-28, W-2154). Add nullable `source` and `qv` to the `recall` table with up and down migrations, and carry them through the server sanitiser (`src/lib/server/progress-store.ts`), merge, export and deletion. *Reason:* the server today keeps only `at` and `correct`. Under option (a), a signed-in learner who restores on a second device would see every Understood lesson fall back to Explored. That is the learner's evidence vanishing for a reason the learner cannot see, which is what "time alone never lowers a state" and "Unknown is not zero" exist to prevent. It would also make the account a worse copy of the browser, while we say the account keeps your progress. The two fields hold an answer's origin and a question version, which is no new personal data. *Cost accepted:* M1 becomes tier 2 learner data, with backend-engineer's migration review, privacy-reviewer's data-inventory row and principal-engineer-ops' readiness record. M1 may run into its pause line sooner. Flag attempts are still M3.
- **Predictions:**
  - P1.1: QA-tester writes a table of at least 30 fixture histories *from this brief, before the build*. The functions agree with all of them. *Wrong if* any row differs.
  - P1.2: no fixture with a recall under 24 hours after first reveal, or with a practice-source answer, yields Understood. *Wrong if* one does.
  - P1.3: the normal feed is unchanged. The fixed-fixture feed order and the feed's existing tests are byte-identical before and after. *Wrong if* any differs.
  - P1.4: a blocked or unreadable store shows no count and no state in the List or on the map. *Wrong if* "0" or "Not started" appears.
  - P1.5: a recall answered on device A, signed in, arrives on device B with the same `source` and `qv`, and the lesson shows the same state on both. *Wrong if* either field is dropped or the states differ. Run in `npm run test:accounts` on a real Postgres.
  - P1.6: the down migration restores the old `recall` table, and old clients' syncs still pass. *Wrong if* either fails.
  - L3 is registered, but cannot be judged until instrumentation exists.
- **Checks at the end:**
  - qa-tester: the fixture table, then a browser walk: phone and desktop, fresh and clearly labelled seeded-returning, player round trip;
  - principal-engineer: diff review;
  - backend-engineer: migration order and the server, merge, export and delete paths, with `test:accounts` run by the reviewer (EDD-018 Addendum A2);
  - platform-engineer: the `src/kit/progress.ts` change;
  - principal-engineer-ops: tier-2 readiness and the rollback line;
  - privacy-reviewer: the new recall fields and columns against the data inventory, before merge;
  - accessibility-reviewer: states are not carried by colour alone.
- **Exit.** Head-of-product approves on those records.

### M2: Scene polish and the bottom sheet

- **Build:**
  - a nonmodal phone bottom sheet with the lesson's real question, its state, its Unchecked label and "Open lesson";
  - labels kept on clear land;
  - the 38×44 px atlas wordmark found in the zoom QA raised to at least 44 px (`company/engineering/readiness/2026-10-28-world-zoom-qa.md`);
  - scene art beyond Number Island only where design-lead supplies authored scenes. No generated scenery is presented as bespoke.
- **Predictions:**
  - P2.1: every interactive target on `/learn/world` measures at least 44×44 px at 320, 390 and 1440 px widths. *Wrong if* any is smaller.
  - P2.2: the sheet's "Open lesson" is reachable without scrolling at 320×568. *Wrong if* it is not.
  - P2.3: scene loading moves no focused control. Cumulative layout shift on the phone profile is at most 0.1. *Wrong if* above.
  - P2.4: reduced motion shows no animated layer. *Wrong if* any loop runs.
- **Checks at the end:** design-lead (against the bespoke-art and zoom specs), accessibility-reviewer, qa-tester.
- **Exit.** Head-of-product.

### M3: Flags and seals

- **Build:** section 3.3 on Number Island first. Then:
  - practice-only flags on unchecked islands, labelled as practice;
  - the versioned flag-attempt store, with merge, export and deletion, as in EDD-018 §4;
  - the seal wait copy.
- **Predictions:**
  - P3.1: across 5 timed QA runs, the median time to answer Number Island's six questions is 3 minutes or less. *Wrong if* it is more.
  - P3.2: no fixture earns a seal or Understood from immediate practice, or from an island that is not checked. *Wrong if* one does.
  - P3.3: on a 5-region fixture, every attempt samples every region, and each region gets the extra slot within 5 attempts. *Wrong if* not.
  - P3.4: a learning-scientist read finds no learner-facing line that claims mastery, permanence or "all lessons understood". *Wrong if* one exists.
  - L4 is registered, but cannot be judged until instrumentation exists.
- **Checks at the end:**
  - qa-tester;
  - privacy-reviewer: the new attempt store, before it merges;
  - principal-engineer, and principal-engineer-ops for tier-2 readiness: new learner data;
  - learning-scientist-personalization: the copy and the seal's meaning;
  - accessibility-reviewer.
- **Exit.** Head-of-product *and the founder*. Seals are gamification, which I may not approve alone, since I wrote this brief (section 7).

### M4: Progressive loading and the end-of-content view

- **Build:**
  - island scenes and List sections load as they approach, with layout height kept and controls mounted;
  - a true end-of-content view after the last real island. It states the real count of islands and lessons and the learner's own Understood count when readable, then offers a return to the feed or a due revisit;
  - no placeholder islands and no fake endless content.
- **Predictions:**
  - P4.1: the initial `/learn/world` transfer (HTML + JS + first scene) is no larger than the inspection build's, measured on the same build profile. *Wrong if* larger.
  - P4.2: no island without real lessons renders. *Wrong if* any island or stop lacks a registered lesson.
  - P4.3: the end view's counts equal the inventory at that commit (`tests/world/inventory.test.mjs`). *Wrong if* they differ.
  - P4.4: return-to-position still restores island, stop and camera after deep loading. *Wrong if* not, at 50+ islands loaded.
- **Checks at the end:** qa-tester, principal-engineer.
- **Exit.** Head-of-product.

**Every milestone that ships** goes through release-manager, with the founder's approval of that specific deploy. This brief approves no deploy.

## 6. Cost target and stop rule

- **Target and pause.** $60 per milestone (M1 to M4) for the maker and its checks, pausing at $120 (2×). The proposed total is $240. M0 is company remediation and is not charged here.
- **Founder's yes, F1 (2026-10-28):** "$60 per milestone (Rec.)". This replaces the founder record's $60 end to end.
- **How it is measured.** No live dollar tool exists, and the founder said "don't worry about tokens". So the stop rule uses whichever of these is available:
  - (a) dollars, where the harness shows them for a dispatch;
  - (b) otherwise sessions. Each milestone plans at most 3 maker sessions and at most 2 check rounds. It pauses at the 7th maker session or the 3rd failed check round, whichever comes first.
- **Who records it.** Chief-of-staff records the measure per dispatch in the milestone's record, marking unmeasured values as unmeasured. A pause goes to head-of-product, who either stops the milestone or asks the founder.

## 7. Approval

- **My limit.** I may approve PRDs, but not a gamification or progressive-learning PRD I wrote (`company/roles/head-of-product.md`, "May not"). Flags, seals and stop states are that kind of work, and I wrote this brief. So this brief is not approved by me.
- **What stands without my approval.** Lines that restate the founder's approved plan (stop states, qualifying recall, six-question flags, the 24-hour waits, no streaks or locks) stand on `company/decisions/2026-10-27-founder-lessons-world-journey.md`.
- **What needs the founder's yes** (section 9): every line that goes beyond that plan.
- **VP Personalization stays parked** (F-52). Under F-52, head-of-product approves each milestone's *exit* against this brief and the check records. M3's exit also needs the founder.

## 8. Objections and open lines

- **O1 (product, to principal-engineer):** EDD-018 §6 gives the World learning code to four builders. The city's principles ask for one warm maker per piece of work. *Ask:* amend §6 so personalization-engineer is the single maker for M1 to M4. Backend-engineer would then review the attempt store rather than write it. *If refused:* backend-engineer builds only the M3 attempt store and API, as a sub-piece with its own check, and the brief records that the warm-maker default was broken and why.
  - **Answered (accepted), 2026-10-28, principal-engineer: EDD-018 Addendum A.** §6's reason was parallel building, and the milestones run one after another, so personalization-engineer is the one maker for M1 to M4. The other owners review once at the end (A2). M1 and M3 are tier 2. Stop rule (A4): if backend-engineer's review of the account part fails twice in one milestone, backend-engineer becomes that part's maker, and the milestone record says why.
  - **Its finding A3**, a conflict in this brief between new recall fields and "no new account fields": head-of-product chose option (b), additive columns. The reason is in M1. W-2154.
- **O2 (product, to the founder):** Unchecked content plus delayed recall can make wrong facts stick. *Product's answer:* the seal-only-on-checked-islands rule (section 2), and Unchecked shown beside every state. The founder may prefer states to show only on checked lessons. That is question F2.
  - **Decided by the founder, 2026-10-28, against product's recommendation:** "Seals everywhere, labelled". The objection is not withdrawn. A seal on an unchecked island can reward remembering a wrong fact, and the label tells the learner that but does not stop it.
  - What product does with it: the label rule (R-SEAL-UNCHECKED). Then L4's guardrail, if EXP-009's instruments ever exist, is read separately for checked and unchecked islands. And at each M3 WBR, product reports how many seals were earned on islands that have a disputed or corrected claim.
  - It reopens if a fact-check finds a wrong claim in a lesson that a seal credited. Product then asks the founder again.
- **O3 (from EXP-009, carried):** A large consented study may cost more than the feature. *Answer stays EXP-009's:* the study is a design, not a spend. Until it runs, the World's learning claim is unmeasured, and nothing in copy, the WBR or a launch record says otherwise.

## 9. Questions for the founder

- **F1.** Is the cost target $60 per milestone with a pause at $120, or does the $60 end-to-end line stand? **Answer: "$60 per milestone (Rec.)".**
- **F2.** The seal rule: seals only on islands where every lesson is Published with verified claims, and Understood states shown with the Unchecked label. Or should states also be held back on unchecked lessons? **Answer: "Seals everywhere, labelled"** (overrides product's recommendation; O2).
- **F3.** Green checks before M1 (783 errors today): keep it as the precondition, or allow M1 to be built on a branch, unmerged, while M0 runs? **Answer: "Yes, build M1 now (Rec.)".** M1 is built on a branch and released only once checks are green, or on the founder's explicit release of it.
- **F4.** O2: do you want a live 1:1 holdout of the World entry point, or EXP-009's consented study only? **Answer: "Not yet (Rec.)".** No holdout. Live numbers stay descriptive.

## How to tell a line here has stopped being true

| Line | Stops being true when |
|---|---|
| Section 2's counts | `npm run company -- status` and `npm run check` show other numbers |
| The seal label | A seal on an island that is not fully checked shows without the "unchecked content" label |
| 3.2 | Any Understood state rests on a recall under 24 hours, on practice, or on an old-version question |
| 3.3 | A flag on any island has other than 6 questions, or the QA median goes over 3 minutes |
| Section 4 | Any milestone's maker starts before analytics-steward's registration commit |
| Section 10 | QA's M1 table or the M1 code reads one of the five lines differently |

## 10. Rulings on QA's M1 table (head-of-product, 2026-10-28)

QA's table is PR #42: `tests/world/fixtures/m1-histories.json`, 50 histories and 195 cases, pinned by sha256. It names five readings the brief left open. These rulings govern.
- Four agree with the table.
- R-LEGACY-QV adds one condition. That condition changes no existing row: no history in the table has a null-`qv` recall followed by a question change. QA adds rows for it in a new dated file, before the maker starts.

- **R-LEGACY-QV: yes, with a condition.** Once engineering's writer proof (3.2 rule 6) exists, a null-`qv` recall counts as the question version that is current when M1 is released. Engineering pins that version per lesson in the M1 record. The condition:
  - It stops counting once that lesson's question changes after M1 (rule 3).
  - It never counts if the question changed after the record's time but before M1. Engineering lists those lessons from the question history; the 2026-10-26 recall audit changed three.
  - *Reason:* a null `qv` means "whatever the question was then". It can stand for the current version only while nothing changed after it.
- **R-MERGE-FIRST: yes, as the table says.** The first reveal is the earliest `completedAt` on any of the learner's devices. A merge keeps the earliest and never the latest. *Reason:* the 24-hour gap measures time since first seeing the answer, and that starts on whichever device came first.
- **R-EXPLORED-INCLUDES-UNDERSTOOD: yes, as the table says.** "Every lesson Explored" for a seal attempt means every lesson has a recorded reveal, whether it shows Explored or Understood. *Reason:* otherwise learning more would close the seal.
- **R-SEAL-DUE: the brief governs, as the table says.** A seal attempt does not require the sampled questions to be due. Its own waits are enough: 24 hours after the last first exploration and after the last practice, plus rule 3.2's 24-hour gap per answer. A seal answer qualifies as a recall under 3.2 rule 1(b) whether or not the lesson is due.
  - *Reason:* with a due condition, 3.4's branch 2 (a due revisit) always wins first, so branch 4 is never reached. And after four correct recalls, `revisitDue` is false for good, so a learner who knows the island well could never attempt its seal.
  - EDD-018 §3's sentence "and due eligibility for all sampled original questions" needs amending to match. EDD-018 is principal-engineer's record, so the amendment is routed on the board, not edited here.
- **R-SEAL-UNCHECKED: the F2 label rule, for M3 (no M1 case).**
  - **Fully checked** means: every lesson on the island is Published, has all its claims verified and passes its current gate in `npm run check`. Number Island is not fully checked today: 11 of its 12 lessons fail on stale reviews.
  - **Where the label goes.** On an island that is not fully checked, three places carry it:
    - the seal-attempt screen, before the first question: "Some of this island's lessons haven't been checked yet. A seal shows you remembered them, not that they are correct.";
    - the earned seal: "Seal · unchecked content";
    - the island header, beside the seal.
  - **Freezing.** The label is set when the seal is earned, together with the check version. It stays on that seal even if the island is checked later. A seal earned after the island is fully checked has no label.
  - **Same rules otherwise.** A labelled seal gives the same credit under the same rules. The label is never hidden by a setting.
  - **M3's table** must include islands of both kinds, and an island that becomes fully checked between two seals.

