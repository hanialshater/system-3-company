# Fact-check: work-back-from-a-deadline

Independent claim checks for src/demos/lifehacks/work-back-from-a-deadline. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Matches studyCatalog: hook and question, options 'Minute 50: its own length' / 'Minute 40: the longest' / 'Minute 15: all three', answer 2. 60 − 20 − 15 − 10 = 15. |
| c2 | verified | Principle text matches. 60 − 20 − 15 − 10 = 15; own run with chain = true: start 16 gives edit 41–61, 1 minute late, so any later start makes edit late. |
| c3 | verified | Read StudyLesson.tsx (schedule stage) and scheduleObservation in src/lib/lifehacks/studyStages.ts first; own run of scheduleLayout/calendarResult/scheduleObservation (scratchpad fc52/sim.mts): chain = true, dueRow 2. Start 50: 50–60, 60–75, 75–95, 'edit finishes at minute 95; it is due at minute 60, so it is 35 minutes late'; Work back from 60: start 15, edit 40–60, on time. The slider moves the chain's first row and scheduleLayout re-chains the rest. The reveal is that sentence plus the principle; neither names a personal productivity or memory benefit. |
| c4 | verified | Own run matches every number and the sentence pattern 'Starting outline at minute S, edit finishes at minute F; it is due at minute 60, so it is on time / N minutes late'. |

**Result (Pass 52):** 4 verified, 0 disputed, 0 held unverified, 0 withdrawn.
