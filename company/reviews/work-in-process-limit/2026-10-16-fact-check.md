# Fact-check: work-in-process-limit

Independent claim checks for src/demos/lifehacks/work-in-process-limit. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Read StudyLesson.tsx (order stage) and queueObservation in src/lib/lifehacks/studyStages.ts first; own run of queueResult/queueObservation (scratchpad fc52/sim.mts): this slug has its own reveal in StudyLesson observation(). roundRobin = (step < 2): Run queue shows 5-minute turns, first job done at minute 15 (C), A at 20, B at 30 (roundRobinQueue, quantum 5); 'Whole jobs' (step 2) shows A done at 10, B 25, C 30. Order A → B → C never changes for this slug (Swap first / Try target not rendered); queueObservation is not used here. Total 30 minutes either way, switchCost 0, all due 50 (Late 0). Reveal: 'In order A → B → C, your five-minute-turn/whole-job schedule first completes a task at minute 15/10. All jobs together still require 30 minutes of execution. Starting and finishing are different events.' No productivity claim. |

**Result (Pass 52):** 1 verified, 0 disputed, 0 held unverified, 0 withdrawn.
