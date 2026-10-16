# Fact-check: separate-ready-from-blocked

Independent claim checks for src/demos/lifehacks/separate-ready-from-blocked. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Read StudyLesson.tsx (order stage) and queueObservation in src/lib/lifehacks/studyStages.ts first; own run of queueResult/queueObservation (scratchpad fc52/sim.mts): output→independent→input 1 job before its input (waiting 40); independent→input→output 0 (waiting 25). The reveal is that sentence plus the principle; neither names a personal productivity or memory benefit. W-1078 row stays open: the recall claim's poster/room booking is still not on this stage. |

**W-1078 (trust sheet matches the stage):** stays open. The recall claim still names 'the poster' and 'the room booking'; the stage shows output, independent and input. Not changed by this merge.

**Result (Pass 52):** 1 verified, 0 disputed, 0 held unverified, 0 withdrawn.
