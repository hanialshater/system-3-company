# Operational readiness: lh-home-template-tp1-tp2

change: Home template (Life Hacks): TP-1 selected-state fix on the v1 stages; TP-2 on the v2 stage (both columns filled after the prediction, comparison reveal tokens, slider hidden when it changes nothing, plain-number option); wave W2 lessons moved to engine 2
change-tier: 2
paths: src/components/lifehacks/HomeLesson.tsx, src/components/lifehacks/HomeLesson.module.css, src/lib/lifehacks/engine-v2.ts, src/lib/lifehacks/home-models.ts, src/lib/lifehacks/home-lessons.ts, src/demos/lifehacks/*/meta.json (W2 lessons only)
author: demo-builder
board: W-1066, W-1068, W-598, W-1070
risks: none
links: company/decisions/2026-10-15-lifehacks-r11-fix-plan.md (TP-1, TP-2, TP-8, wave W2); company/design/specs/lifehacks-engines-v2.md sections 1-3; branch lh-home

Tier 2 because the Home engine renders 69 lessons (paths.json: src/components/lifehacks/** and src/lib/lifehacks/** are shared-engine). Not approved: principal-engineer-ops approves or refuses below before this ships. The author does not approve it.

## The check

1. **What can fail.** (a) A v1 Home lesson whose control in effect now looks selected could fail QA rule 3 if a control no longer changes the stage: it does not, because the pressed control stays aria-disabled exactly as before (only class, aria-pressed and a check mark were added). (b) A v2 lesson's slider hides when it should not: `homeSliderMatters` samples every slider step in both columns, so it hides only a slider that changes no cell; none of the 5 batch D lessons hides. (c) A wave lesson's reveal reads wrong at a slider value I did not try. Worst case: a learner sees a wrong number in a reveal. Learners would see it; no data is touched.
2. **How we would know.** `npm run test:lifehacks` (engines-v2 tests compute every v2 column and reveal at min, initial and max), the QA contract per lesson (`QA_ONLY=…`), and the r12 learner walk per wave. No production meter: these lessons are at `review`, not published.
3. **How to roll back.** `git revert` of the commits on lh-home (TP-1, TP-2, W2 are separate commits), a few minutes, no data loss, no founder needed until a deploy.
4. **Capacity.** None at run time: pure client rendering, no new requests. Build time unchanged (same lesson count). One local build dir (.next-lhh) during QA, deleted after.
5. **Security.** No new routes, parameters, scripts or secrets.
6. **Data.** Writes nothing. No learner data.
7. **Risks.** No register change proposed.

## Approval (written by principal-engineer-ops)

- Decision:
- Conditions, each with a board id:
- What would make me revoke it:
- Objections raised, and what happened to each:
