# Operational readiness: lifehacks-study-tp3-tp4-tp5

```
change: Study template packages TP-3 (retrieval stage for recall lessons that opt in), TP-4 (schedule readouts and reveal), TP-5 (queue readouts and reveal), plus the W1 lesson fixtures
change-tier: 2
paths: src/components/lifehacks/StudyLesson.tsx, src/components/lifehacks/StudyLesson.module.css, src/components/lifehacks/RetrievalLesson.tsx, src/lib/lifehacks/studyRecall.ts, src/lib/lifehacks/studyModels.ts, src/lib/lifehacks/studyCatalog.ts, src/demos/lifehacks/*/meta.json, company/reviews/*/build.md
author: demo-builder
board: W-1070, W-1079, W-1076
risks: none
links: company/decisions/2026-10-15-lifehacks-r11-fix-plan.md (TP-3, TP-4, TP-5, TP-8, wave W1); branch lh-study
```

Tier 2 because `src/components/lifehacks/**` and `src/lib/lifehacks/**` are "engine used by more than 10 lessons" in company/engineering/readiness/paths.json. **Not approved.** The author does not approve it; principal-engineer-ops does, before the branch merges to main or deploys.

## The check

1. **What can fail.**
   - A retrieval fixture with a typo (an answer missing from its choices) would make that box impossible to get right. `retrievalProblems()` in `studyRecall.ts` detects it, but no test calls it yet (tests are platform-engineer's; see 7).
   - The v1 schedule and queue stages are shared by 20 lessons (10 each). A wrong sentence in `scheduleObservation` or `queueObservation` reaches all of them. The worst case is a reveal that reads wrongly across 20 lessons. Learners see it, but only after deploy, and every lesson here is at `review`, not published.
   - `rebuild-the-procedure` (a domain-launch slate lesson) uses the v1 recall stage. Its code path is unchanged: it has no `retrieval` field, so it never reaches `RetrievalLesson.tsx`.
2. **How we would know.** The QA contract (`tests/qa/contract.spec.ts`) fails a lesson that throws, has a dead control or a short reveal. It passed phone and desktop for all 28 changed lessons on 2026-10-15 (dev server, `QA_BASE_URL`). `npm run test:lifehacks` (64/64) pins the queue and calendar numbers and claims-match. There is no meter for "the reveal's sentence is wrong". The fact-checker reads the reset c3/c4 claims, and the r12 learner walk reads the reveals.
3. **How to roll back.** Use `git revert <sha>` of the branch commits. Each W1 lesson's meta and fixture are in the same commit as the template, so a revert restores a consistent tree. It takes about a minute, loses no data, and does not need the founder (a deploy afterwards does).
4. **Capacity.** One new client component (`RetrievalLesson.tsx`, about 16 KB of source). `StudyLesson.tsx` imports it statically, so it ships in every Study lesson's bundle, though only 7 lessons render it. No new dependency, process or build directory. QA for 28 lessons × 2 viewports took 2.8 minutes on the dev server.
5. **Security.** No routes, parameters, scripts, storage or network.
6. **Data.** None written. No learner data.
7. **Risks.** None added or closed. Proposal for platform-engineer (tests are theirs): add `retrievalProblems(spec.retrieval)` = `[]` for every recall spec that has `retrieval`, and pin `scheduleObservation` and `queueObservation` for one overlapping and one clean layout.
