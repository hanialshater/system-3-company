# Lane 10 mail plan, 2026-10-16 (F-42 slot es-mail-inbox-1)

author: evaluation-steward · answers mail 20261016T152604611Z-principal-pm-verticals-46732fd5 · answer sent 20261016T154615210Z-evaluation-steward-29b4b840

Dispatch requests sent to the dispatcher (the briefs are the mail files in company/ops/mailboxes/dispatcher/):

| id | role | project | scope | needs server rebuild past 169e88d |
|---|---|---|---|---|
| 20261016T154559740Z-evaluation-steward-49b534bf | fact-checker | wave-j | 9 claims: calibrated c3 c4 c7; small-gap c1 c2 c3 c5; tug-of-war c1 c5 | no |
| 20261016T154559826Z-evaluation-steward-697388f0 | fact-checker | lifehacks-engine-v2 | 39 claims reset by lhfix-r3 (8ea7077), W-1477, 17 lessons | no |
| 20261016T154559918Z-evaluation-steward-a1340dbb | learner-evaluator | wave-j | re-walks of calibrated v3 (r16), small-gap v3 (r2), tug-of-war v3 (r12) | yes |
| 20261016T154600011Z-evaluation-steward-0e466796 | qa-tester | wave-j | calibrated v3 (W-1367 drag + 10 px floor), small-gap v3, tug-of-war v3, cut-the-busiest-link v2 | yes |

Why two FC requests: 48 claims is over the 40-claim cap, and they belong to two projects.

The 39 is reproducible. Diff the 17 lifehacks meta.json files between 787e807 and 8ea7077, then keep the claims that are not verified and that changed or were newly added (care-label-first-choice has none).

Open, not requested here:
- lhfix-r3 also changed the shared src/components/lifehacks/HomeLesson.tsx and RetrievalLesson.tsx. Every Life Hacks lesson that uses them likely needs QA on a rebuilt server. Under R3a-3 a changed file in src/components/*/* stays eligible only if it is outside the lesson's import closure, and these files are inside it. This goes in lane 10's next batch once cm-lifehacks confirms the affected slug list.
- Physics #64-68 (Wave J B2) is not on main yet. Its SO-10-1, SO-10-2 and SO-10-3 batches will be requested after it merges.
