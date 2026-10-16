# PRD-004: First Light challenges (spec for release 1, with the pre-declared 11-06 cut)

owner: growth-designer (Jonah)
date: 2026-10-16
class: product (feature spec for platform-engineer). Engineering tier 1: **no new stored data**. Challenge state is derived from the progress the learner already has
status: **proposed**. Ships only if feature-complete on a preview by **2026-11-06** and its experiment is registered.
route: growth-designer (this spec) → category managers (pick the lessons for each launch challenge, section 5) → analytics-steward (register the experiment, section 9) → learner-model-engineer (state uses the M1 table, EDD-009) → platform-engineer (build) → pedagogy-critic and qa-tester (Q1.7) → accessibility-reviewer (Q2) → learner-evaluator (Q4) → head-of-strategic-initiatives (reports the 11-06 line)
recorded by: growth-designer
board: W-1133 (this spec). Related: W-1132 (mastery state, learner-model-engineer), W-906 (AMD-008)
inputs read: `company/decisions/2026-10-15-first-light-release-1-scope.md` (Ruling 4, challenges row); `company/decisions/2026-10-15-founder-first-light-ads-social-back.md` (item 3: challenges keep their 11-06 cut); `company/constitution/amendments/AMD-008-first-light-surface-value.md` (F2, M1 to M8, X1, X2); `company/initiatives/first-light/quality-bar.md` (Q1.7, Q2, Q3.4, Q4, Q5.3); `company/initiatives/first-light/privacy-gate.md` (§5.2, P3.5); `company/engineering/notes/2026-10-15-first-light-reestimate.md` (mastery and challenges row; cut order 3); `src/kit/types.ts` (`recall` in `DemoMeta`), `src/kit/progress.ts` (`REVISIT_SCHEDULE_DAYS`, `revisitDue`), `src/kit/Lesson.tsx` (event calls, `completedAt ??`), `src/components/Feed.tsx` (`RevisitCard`); `content/curriculum/physics.json` (shape of `prerequisites`).

---

## 1. In one paragraph

A **challenge** is a short, fixed path of 3 to 5 published lessons that build on each other, taken from the curriculum map's prerequisite edges. It is finished when you have played each lesson **and answered each lesson's own recall question at its first spaced revisit**, a day or more later. Nothing is new content: the lessons are the existing lessons, played unchanged through the kit (predict, explore, reveal), and the recall step is the recall question every `meta.json` already carries, asked only when the revisit schedule says it is due. There is no timer, no points, no streak, no rank, no new stored field and no change to `src/kit/` or `Lesson.tsx`. The reward points at remembering: a challenge cannot be finished in one sitting, because coming back is the part that counts.

## 2. The pre-declared cut (11-06)

**If challenges are not feature-complete on a preview by 2026-11-06, they move to release 2 and mastery state stays** (release-1 scope record, Ruling 4; kept by the founder on 2026-10-15). Head-of-strategic-initiatives reports it; that record is the ruling in advance, and this spec does not reopen it.

"Feature-complete on a preview" means all of these, on a Vercel preview, with the challenge flag on:

1. At least one challenge per launch domain is defined (section 5) and every slug in it resolves to a published lesson.
2. R1 to R9 below work end to end in an anonymous context and in a signed-in one, at 390x844 and on desktop.
3. A seeded learner can start a challenge, play each lesson, and, with `?revisitMinutes=1`, answer each first revisit inside the challenge and in the feed, and see the same state in both.
4. The banned-phrase scan (M4) over the challenge strings gives 0 hits, and every challenge lesson's reveal is unreachable without a prediction (the kit already enforces this; the challenge host must not bypass it).
5. The flag off removes every entry point and makes `/challenge/<id>` return 404.

Anything short of that on 11-06 is a cut. After a cut, Q1.7's challenge half becomes "the surface is absent or switched off in the release build" (quality bar, "Cut surfaces"), and the mastery half stays.

## 3. Problem

The charter lists "mastery and challenges". Mastery state (W-1132) tells a learner what they have recalled. It does not give them a reason to take on a small connected set of ideas, or to come back for the recall that makes those ideas stick. Most "challenges" in learning apps are timed quizzes, point races or daily goals, and each of those is barred here (AMD-008 M2, M3, M5, M6) or rewards speed and volume (out of my scope: Goodhart). The question is what a challenge can be when the only thing it may reward is learning evidence.

## 4. Users

Every learner who can see the feed: anonymous, signed in, and teen mode. A challenge is not social (no learner sees another; privacy gate §5.2), it holds no user text, and its state is the learner's own progress. Anonymous learners keep their challenge state locally; signed-in learners carry it across devices because it is derived from server-side progress (Q1.5).

## 5. What a challenge is made of

- **Lessons:** 3 to 5 lessons from the **launch catalog** (frozen 2026-11-13), all in one domain, ordered so that each lesson's concept is a prerequisite of, or shares a concept with, the next, as the domain's `content/curriculum/<domain>.json` already records. A challenge with any lesson outside the served catalog is hidden, not shown with a gap.
- **Recall:** each lesson's existing `recall` (`question`, `options`, `answer`, `why`). No new questions. A lesson with no recall question cannot be in a challenge.
- **Title:** a fixed template, "<Domain name>: <n> lessons that build on each other", plus the lessons' own titles. **No new factual sentence.** Curriculum concept names are not used as titles, because some of them are factual statements ("A pendulum's period ignores its mass") that would become unrecorded claims on a new surface (Q3.4).
- **Who picks the lessons:** the domain's category manager, because choosing and ordering lessons is curriculum work, not mine. They write a small data file (proposed: `content/challenges.json`, `[{id, domain, slugs: [...]}]`, owned by the category managers). Launch set: **one challenge per launch domain, at most six in all**, picked by **2026-11-04** from the lessons the launch-catalog plan names. Platform-engineer validates the file at build time in `src/` (every slug published, has a `recall`, same domain, 3 to 5 lessons). The validator does not go into `tools/company.mjs` (protected).

## 6. Requirements

- **R1. Entry points, outside the feed order.** Challenges are listed on `/catalog` (the map) and on the account or progress view. A lesson that belongs to a challenge may show "Part of a challenge" in the card chrome, outside `Lesson.tsx`. **No challenge card is inserted in the feed.** Due revisits keep their place first (AMD-008 F2), and the feed order is unchanged with challenges on or off.
- **R2. The challenge page `/challenge/<id>`** lists its lessons in order, each with its state (R5). Tapping a lesson plays it through the same host as `/d/<slug>`, unchanged: the kit enforces predict before reveal, and the challenge host adds nothing inside the lesson frame. After the lesson, below the frame, a "Next in this challenge" link.
- **R3. The recall step, only when due.** When a challenge lesson's first revisit is due by `revisitDue()` and `REVISIT_SCHEDULE_DAYS` (1 day after completion today), the challenge page shows that lesson's recall question as a card, using the same component as the feed's `RevisitCard` (extracted from `src/components/Feed.tsx` into a shared component; `src/components/` is not the kit). Answering it records exactly what the feed records: the same `updateProgress` write and the same `recall` event. **A challenge never asks a recall question early** and never adds an extra recall outside the schedule, so the spacing that makes revisits work, and the M1 meaning of "recalled", are unchanged. A revisit answered in the feed counts for the challenge too.
- **R4. Already-played lessons.** A lesson completed before the learner opened the challenge counts as played; its first revisit counts wherever it was answered. The challenge page does not offer to replay a lesson whose first revisit is still pending (replay is harmless to the schedule today, because the kit keeps the first `completedAt`, but it would let a learner see the reveal again just before the recall).
- **R5. State, derived only (AMD-008 M1).** Per lesson: "not played yet", "played" (reveal reached), "ready to revisit" (first revisit due), "recalled N days later" or "revisited, worth another look" (first revisit answered right or wrong). Per challenge: "<a> of <n> played · <b> of <n> revisited", and **"finished"** when every lesson's first revisit has been answered, right or wrong. The words follow the learner-model-engineer's M1 definition table (W-1132) once it is published; a mismatch is settled in their favour. **No new stored field:** the state is a pure function of the progress map and the challenge definition.
- **R6. A wrong recall is not a loss.** A wrong first revisit still finishes that lesson's step ("revisited"), and the lesson comes back on its own schedule. A finished challenge never becomes unfinished, and nothing goes down because time passed (M3).
- **R7. No timer, no speed, no points.** No countdown, no clock, no "answer fast", no score, no badge for volume, no rank, no comparison with other learners, no count of challenges finished across days (M2, M5, M6). One "finished" mark per challenge is the only reward, and it says what was measured: "You played these 4 lessons and answered each one again at least a day later." (M7; recorded as a claim, see R8).
- **R8. Copy.** Every string passes the M4 banned-phrase scan. Every string that states a fact (the "finished" line, "recalled N days later") is a recorded claim with an address and source (X2, Q3.4): it is true by construction from the progress map, and the fact-checker verifies the construction. Neutral wording for due items: "ready to revisit", never "don't lose" or "you missed".
- **R9. Accessibility and performance.** The challenge page and its entry points load on demand, outside the feed's entry chunk (Q5.3). States are announced as status messages (Q2.4), not carried by colour alone (Q2.5), and targets are at least 24x24 px (Q2.2).
- **R10. No ads** on `/challenge/<id>` (routed to head-of-product as an addition to Ruling 3, rule 6, alongside `/d/<slug>`).
- **R11. Flag.** One flag turns challenges off; entry points disappear and the route returns 404. Progress is untouched, so turning them back on restores every state.

## 7. What is explicitly not changed

- `src/kit/` and `src/kit/Lesson.tsx`: no change. If a requirement turns out to need one, that requirement is dropped, not the rule.
- Lesson content, `meta.json`, recall questions: no change (out of my scope).
- The feed order, the revisit schedule and the mastery definition: no change.
- Stored data: no new table, column or local storage key (the arm in section 9 is the one exception, and it is the analytics steward's to approve).

## 8. Non-goals (release 1)

Timed or daily challenges, challenge leaderboards, sharing a challenge result (that would carry progress in a link, which P4.2 bars), challenges sent to friends (that is social; see PRD-003), user-made challenges, cross-domain challenges, new recall questions, reminders or notifications about challenges (M8: reminders are off by default and only about due revisits).

## 9. Committed prediction (about learning) and the experiment

Registered by analytics-steward before any build run (board ask 2). The prediction is fixed here, before data.

- **Metric:** Surface Value #4, first spaced-revisit recall (the lesson's own recall question, answered correctly at its first scheduled revisit).
- **Primary comparison:** the same lessons, first played inside a challenge, against first played from the feed or `/d/<slug>`.
- **Prediction:** challenge-played lessons recall **at least 3 points higher**. The reason I expect it: in a challenge, each lesson's concept is the prerequisite of the next, so the later lessons rehearse the earlier ones before their revisit comes due.
- **Holdout (the simpler baseline may win):** a random 20% of browsers see no challenges (arm held locally, never sent with an identifier). The challenge arm's overall first-revisit recall must not be lower than the holdout's by 3 points or more.
- **Guardrail (Surface Value #5):** prediction-to-reveal completion on challenge lessons is not lower than on the same lessons in the feed by 3 points or more.
- **would_be_wrong_if:** with at least 150 first-revisit recalls on challenge-played lessons, the difference is below +1 point (challenges add nothing to recall), or recall in the challenge arm or on challenge lessons is 3 points or more **below** its comparison (harm: the flag goes off, and challenges return only through a new decision).
- **Not success measures:** challenges started, finished, return visits, sessions. Reported as engagement, labelled (X1). "Finished" counts are **not** a learning number: finishing only means the recall was answered, not that it was right.
- **Measurement without a kit change:** the challenge host writes a local marker (outside `src/kit/`, for example `s3c:origin:v1` = `{slug: "challenge"}`) when a lesson is first played from a challenge, and the recall card sends one extra beacon event defined outside the kit, `{type: "exp", exp: "EXP-<n>", arm, origin, slug, correct, spacedDays}`, with no identifier. This is the same mechanism PRD-003 proposes; the privacy reviewer reads it once for both (P6.1, P6.2). The analytics steward may replace it with a design that needs less.
- **If the 150 recalls are not reached within 30 days of launch:** "unresolved". Head-of-product decides at the first distillation (AMD-008 X3) whether to keep, extend or remove, and engagement is not an argument there.
- **My confidence:** about 40% that +3 points holds; about 80% that challenges do no harm. Selection is the main threat (learners who choose a challenge may be the keener ones); the holdout is there to catch harm, not to prove benefit.

## 10. Quality bar mapping (Q1.7 and the rest)

| Row | What the challenge must show | Testids (the builders add them; the tests stay the evaluation steward's, AMD-FL-B) |
|---|---|---|
| Q1.7 | 0 banned phrases; 0 challenges whose reveal is reachable without a prediction; state derived only from completion and recall | `challenge-page`, `challenge-lesson`, `challenge-state`, `challenge-recall-option`, `challenge-finished` |
| Q1.10 | Exploratory: reload mid-challenge, back button, double tap on a recall option, both themes | same |
| Q2.1 to Q2.5 | A challenge end to end by keyboard; status messages; contrast of state labels | same |
| Q3.4 | The "finished" and "recalled N days later" strings recorded and verified | n/a |
| Q4.2 | Neither borrowed mind reads the challenge as a streak or a score to defend | n/a |

## 11. Cost and dates

- **Cost:** the re-estimate puts mastery and challenges at about 1.04M and mastery alone at about 0.64M, so challenges are about **0.40M** (low confidence, the principal engineer's figure).
- **Dates:** spec 10-16 (this file); experiment registered by 10-30; category managers' challenge lists by 11-04; feature-complete on a preview by **11-06** (the cut); round-1 reviews 11-10 to 11-12; launch catalog freeze 11-13 (a challenge whose lessons leave the catalog is hidden); T-7 dry run 11-16; verdict 11-23.

## 12. Board asks (for the caller to file; I did not edit board.json)

1. **category managers (each launch domain):** one challenge of 3 to 5 launch-catalog lessons with recall questions, ordered by prerequisite, in `content/challenges.json`, by 2026-11-04.
2. **analytics-steward:** register the experiment in section 9 (EXP-<n>) with the holdout, the 150-recall threshold and the guardrail, by 2026-10-30.
3. **learner-model-engineer:** confirm the state words in R5 against the M1 definition table (W-1132).
4. **platform-engineer:** build R1 to R11 behind a flag; extract `RevisitCard` into a shared component; validate `content/challenges.json` at build time in `src/`.
5. **privacy-reviewer:** read the section 9 beacon event and local arm (shared with PRD-003).
6. **head-of-product:** add `/challenge/<id>` to the no-ad pages (Ruling 3, rule 6).
7. **head-of-strategic-initiatives:** carry the 11-06 line and the 11-04 category-manager date in D-23.

## Objections

| # | Objection | Raised by | Status |
|---|---|---|---|
| 1 | A challenge that only finishes a day later will feel slow, and fewer people will finish one than a one-sitting quiz. | growth-designer (anticipated from learners and marketing) | **Accepted as the cost.** Finishing in one sitting would reward taps, not remembering. Finish counts are engagement and are not the success measure (section 9) |
| 2 | My role's scope lists "recall-based streaks (today's revisits done)". | AMD-008 objection 3 | **Accepted: no streaks.** Challenges count nothing across days; "finished" is a fact about one set of lessons, not a run |
| 3 | Lessons in a prerequisite chain are blocked practice, which can recall worse than interleaved practice. | growth-designer (self-raised) | **Open with a test.** That is exactly what the holdout and the would_be_wrong_if lines can show. If challenge lessons recall worse, the flag goes off |
| 4 | Picking the lessons is curriculum work, which is not mine. | growth-designer (role scope: lesson content is out of scope) | **Accepted.** Category managers pick and order (section 5); I set only the shape (3 to 5 lessons, one domain, prerequisite order, each with a recall) |
| 5 | Challenges compete with mastery and personalization for the same weeks; the re-estimate cuts them third. | principal-engineer (re-estimate cut order) | **Accepted.** The 11-06 cut stands as ruled; this spec adds no data and no kit change to keep it cheap, and the definition in section 2 makes the cut a fact on 11-06, not a debate |
| 6 | Concept names from the curriculum map would make nicer titles. | growth-designer (self-raised) | **Rejected for release 1.** Some concept names are factual sentences, which would be unrecorded claims on a new surface (Q3.4). Template titles carry no claim |

## What would make this spec wrong

- The M1 definition table (W-1132) defines "recalled" differently from the first spaced revisit. Then R5's words change; the design does not.
- The revisit schedule changes (for example the first interval moves from 1 day). Then the challenge's finish line moves with it, automatically.
- A requirement turns out to need a `src/kit/` change. Then that requirement is dropped.
