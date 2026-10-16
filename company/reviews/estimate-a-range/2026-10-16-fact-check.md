# Fact-check: estimate-a-range

Independent claim checks for src/demos/lifehacks/estimate-a-range. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Matches studyCatalog: hook 'A 15-25 minute task, then a call at 20.', question 'Plan with 15: is the call safe?', options Yes / 'Not if it runs long', answer 1. Own run: at 25 minutes the task overlaps the call by 5. |
| c3 | verified | Read StudyLesson.tsx (schedule stage) and scheduleObservation in src/lib/lifehacks/studyStages.ts first; own run of scheduleLayout/calendarResult/scheduleObservation (scratchpad fc52/sim.mts): task 0–15, call 20–30, no overlap, done by 30; 'Use the long end, 25' sets refined, task 0–25 overlaps the call 5 minutes; reveal 'Task is drawn at its long end, 25 minutes. Your final layout overlaps for 5 minutes (task with call)... no valid finish.' The reveal is that sentence plus the principle; neither names a personal productivity or memory benefit. |
| c4 | verified | Own run matches every number: 0–15 before 20–30 with no overlap; long end 0–25 overlaps by 5, no valid finish; reveal sentence 'Task is drawn at its long end, 25 minutes.' |

**Result (Pass 52):** 3 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 61 (fact-checker, SO-10-2, 2026-10-16; shared review server 5b2fee7, R3a pass)

- lifehacks.estimate-a-range.c1: verified

Reasons and fixes: each claim's source in src/demos/lifehacks/estimate-a-range/meta.json, and company/reviews/lifehacks-200/2026-10-16-fact-check-pass61.md.
