# Operational readiness: lifehacks-study-tp3-tp4-tp5

```
change: Study template packages TP-3 (retrieval stage for recall lessons that opt in), TP-4 (schedule readouts and reveal), TP-5 (queue readouts and reveal), plus the W1 and W9 lesson fixtures and optional v1 spec fields (schedule: window, chain, dueRow, longer, claimed; queue: priority, watch, metric "release")
change-tier: 2
paths: src/components/lifehacks/StudyLesson.tsx, src/components/lifehacks/StudyLesson.module.css, src/components/lifehacks/RetrievalLesson.tsx, src/lib/lifehacks/studyRecall.ts, src/lib/lifehacks/studyModels.ts, src/lib/lifehacks/studyCatalog.ts, src/demos/lifehacks/*/meta.json, company/reviews/*/build.md
author: demo-builder
decision: REFUSED as of d82ea40 (principal-engineer-ops, 2026-10-15). Not approved for merge to main or deploy. Re-review by addendum once the conditions marked "blocks" below are met; nothing else needs re-doing
decided-by: principal-engineer-ops
decided-scope: commits cda9a05 (TP-3/TP-4/TP-5 + W1) and d82ea40 (W9) on lh-study
board: W-1070, W-1079, W-1076
risks: none
links: company/decisions/2026-10-15-lifehacks-r11-fix-plan.md (TP-3, TP-4, TP-5, TP-8, wave W1); branch lh-study
```

Tier 2 because `src/components/lifehacks/**` and `src/lib/lifehacks/**` are "engine used by more than 10 lessons" in company/engineering/readiness/paths.json. **Refused as of d82ea40; see the decision section at the end.** The author does not approve it; principal-engineer-ops does, before the branch merges to main or deploys.

## The check

1. **What can fail.**
   - A retrieval fixture with a typo (an answer missing from its choices) would make that box impossible to get right. `retrievalProblems()` in `studyRecall.ts` detects it, but no test calls it yet (tests are platform-engineer's; see 7).
   - The v1 schedule and queue stages are shared by 20 lessons (10 each). A wrong sentence in `scheduleObservation` or `queueObservation` reaches all of them. The worst case is a reveal that reads wrongly across 20 lessons. Learners see it, but only after deploy, and every lesson here is at `review`, not published.
   - The optional v1 fields default to off. A spec without them renders as before, apart from the TP-4/TP-5 wording. A due-row lesson also gets a "Late" readout.
   - `rebuild-the-procedure` (a domain-launch slate lesson) uses the v1 recall stage. Its code path is unchanged: it has no `retrieval` field, so it never reaches `RetrievalLesson.tsx`.
2. **How we would know.** The QA contract (`tests/qa/contract.spec.ts`) fails a lesson that throws, has a dead control or a short reveal. It passed phone and desktop for all 28 changed lessons on 2026-10-15 (dev server, `QA_BASE_URL`). `npm run test:lifehacks` (64/64) pins the queue and calendar numbers and claims-match. There is no meter for "the reveal's sentence is wrong". The fact-checker reads the reset c3/c4 claims, and the r12 learner walk reads the reveals.
3. **How to roll back.** Use `git revert <sha>` of the branch commits. Each W1 lesson's meta and fixture are in the same commit as the template, so a revert restores a consistent tree. It takes about a minute, loses no data, and does not need the founder (a deploy afterwards does).
4. **Capacity.** One new client component (`RetrievalLesson.tsx`, about 16 KB of source). `StudyLesson.tsx` imports it statically, so it ships in every Study lesson's bundle, though only 7 lessons render it. No new dependency, process or build directory. QA for 28 lessons × 2 viewports took 2.8 minutes on the dev server.
5. **Security.** No routes, parameters, scripts, storage or network.
6. **Data.** None written. No learner data.
7. **Risks.** None added or closed. Proposal for platform-engineer (tests are theirs): add `retrievalProblems(spec.retrieval)` = `[]` for every recall spec that has `retrieval`, and pin `scheduleObservation` and `queueObservation` for one overlapping and one clean layout.

## Decision (written by principal-engineer-ops, 2026-10-15)

- Decision: **refused as of d82ea40, on one ground: the new engine functions have no unit tests, and in this change the lessons that use them ship in the same commits.** This is the same standard I set for TP-1/TP-2 (company/engineering/readiness/2026-10-15-lh-home-template-tp1-tp2.md, condition 2): unit tests on new engine functions come before the lessons using them are approved. There, the template could be approved because no lesson used the new functions yet. Here, it cannot be split that way. TP-4/TP-5 rewrite the reveal for every v1 schedule and queue lesson (20 of them), and W1/W9 put the new optional fields into lessons inside the same commits (cda9a05 holds both the template and W1). So approving the template means approving all 28 lessons on untested code. Everything else in the record holds up. Once the tests land and pass, this becomes an approval-with-conditions addendum, not a new review.
- What I checked myself (at d82ea40, worktree /home/user/s3c-lh-study):
  - `npm run test:lifehacks`: 64/64. That matches the builder.
  - Production build (`NEXT_DIST_DIR=.next-ops npm run build`): passes.
  - `tests/qa/feed.spec.ts` on that production build, port 3761: **10/10** (phone and desktop). The 3 feed/map failures the builder saw on the dev server did not reproduce, so the feed question is settled: those failures are not this change. They were dev-server artifacts, and I have not diagnosed them.
  - QA contract on that production build for all 28 changed lessons (`QA_ONLY`): **56/56**. This replaces the dev-server evidence in the record.
  - I called `retrievalProblems()` ad hoc on all 7 `retrieval` fixtures (cover-before-recall, explain-the-link, keep-the-error-feedback, note-gap-check, one-question-one-card, reverse-the-flashcard, separate-confusable-pairs). Every one returns `[]`. The script was a throwaway in scratch, not committed. Today's fixtures are sound, but nothing stops a broken one tomorrow.
  - I read the code paths. `scoreRow` counts an empty box as a miss. `rebuild-the-procedure` (domain-launch slate) still reaches `StudyLessonV1`, because it has no `retrieval` field. `include-the-wrap-up`'s `claimed` sentence cannot go negative with today's fixture, since every non-overlapping layout finishes at 40 or later. The `watch` readout indexes `ends` by order position in both places, which is correct for the non-round-robin queue. Each of these depends on the fixture, which is the reason for condition 1.
- Conditions. "Blocks" means it must close before I write the approval addendum. The others must close before the work they name.
  1. **Blocks: unit tests for the new engine functions** (tests/lifehacks; the record proposes platform-engineer as owner, and demo-builder writes them if platform-engineer agrees). At minimum:
     - (a) `retrievalProblems(spec.retrieval)` equals `[]` for every recall spec that has `retrieval`, plus one planted fixture per problem kind (answer missing from choices, no distractor, repeated choice, feedback attempt with no error, compound attempt with no miss) that returns a problem.
     - (b) `nextChoice`, which wraps and starts from empty; `scoreRow`, covering an empty box, a full row and a partial row; and `markAttempt`.
     - (c) `scheduleObservation`: an overlapping layout says "no valid finish" with the minutes and clash names. Also a clean layout, a due-row lesson both late and on time, `chain`, `longer` and `claimed`.
     - (d) `queueObservation`: the "more waiting, but the goal is ..." sentence for each metric (dependency, switches, late, release with `watch`), and that it does not appear when the target order waits less.
     - (e) `freeGaps`, pinned to fragmented-time-does-not-fit's numbers (total versus longest gap), and `scheduleLayout`, covering back-to-back chain and long overrun.
     The tests must show they can fail: plant at least one bug per function, as the Home W2 work did. `scheduleObservation` and `queueObservation` live in a `.tsx` file next to React. If testing them there is awkward, moving them unchanged into a pure module under src/lib/lifehacks/ is acceptable. That move counts as part of this change, and QA re-runs after it.
  2. **Blocks: the record is corrected.** Section 2: QA evidence is now the production-build run above. Section 1: "every lesson here is at review, not published" is true, but it leaves out that the c3 reset drops work-in-process-limit from the wave-2 attestable list in company/rituals/records/2026-10-15-domain-launch.md ("claims all verified"). Name that in section 7 instead of "risks: none".
  3. **Before any of the 28 lessons publishes (fact-checker, then release-manager):** the reset claims are re-verified. That is 68 claims, including W1's c5 Peru facts, which the builder marks "source not opened". short-jobs-clear-a-queue is already held under W-1078. This change does not clear that hold, and it adds the c3 reset to it.
  4. **Before the next v1 schedule lesson is added (demo-builder):** the slug list in `dueRowOf` is replaced by `dueRow` fields on work-back-from-a-deadline and arrival-is-not-departure. It is minor, but a slug list in shared engine code is how the next lesson gets the wrong readout without anyone noticing.
  5. **No action (accepted):** `RetrievalLesson` is statically imported into every Study bundle, but it is about 16 KB of source and adds no dependency. W9's three skipped lessons (batch-by-setup, do-not-starve-the-long-job, reserve-an-unassigned-slot) are a plan question for the r11 fix-plan owner, not a readiness one.
- Merge or deploy of cda9a05 or d82ea40 before the approval addendum is a breach of this record.
