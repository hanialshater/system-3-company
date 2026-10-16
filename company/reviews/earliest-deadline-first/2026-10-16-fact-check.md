# Fact-check: earliest-deadline-first

Independent claim checks for src/demos/lifehacks/earliest-deadline-first. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Matches studyCatalog hook, question, options ('Yes, the urgent one' / 'No') and answer 0. Own run: quickest first ends urgent at 15 > due 10, so it is late; the key is right. |
| c2 | verified | Principle text matches. The order stage draws a red line at each job's due minute (StudyLesson x(spec.due[id])); late = finish > due. Own run: urgent first has 0 late jobs and more waiting (10 vs 5), so the stage's goal is due dates, not least waiting. |
| c3 | verified | Read StudyLesson.tsx (order stage) and queueObservation in src/lib/lifehacks/studyStages.ts first; own run of queueResult/queueObservation (scratchpad fc52/sim.mts): short→urgent waiting 5, 1 late; urgent→short waiting 10, 0 late, reveal adds 'That is 5 more minutes of waiting than short → urgent, but the goal here is no late jobs'. The reveal is that sentence plus the principle; neither names a personal productivity or memory benefit. |
| c4 | verified | Own run: short 0–5, urgent 5–15 (due 10, 5 late); urgent 0–10 (on time), short 10–15; total waiting 5 → 10. Matches. |

**Result (Pass 52):** 4 verified, 0 disputed, 0 held unverified, 0 withdrawn.
