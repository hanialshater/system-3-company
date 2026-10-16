# Fact-check: batch-by-setup

Independent claim checks for src/demos/lifehacks/batch-by-setup. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Read StudyLesson.tsx (order stage) and queueObservation in src/lib/lifehacks/studyStages.ts first; own run of queueResult/queueObservation (scratchpad fc52/sim.mts): A1→B1→A2 waiting 21, 2 switches; A1→A2→B1 (target) waiting 17, 1 switch; chips Total waiting / Late jobs / Switches all from queueResult on the current order. The reveal is that sentence plus the principle; neither names a personal productivity or memory benefit. |

**Result (Pass 52):** 1 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 61 (fact-checker, SO-10-2, 2026-10-16; shared review server 5b2fee7, R3a pass)

- lifehacks.batch-by-setup.c1: disputed

Reasons and fixes: each claim's source in src/demos/lifehacks/batch-by-setup/meta.json, and company/reviews/lifehacks-200/2026-10-16-fact-check-pass61.md.
