# Fact-check: fit-before-fixed-slot

Independent claim checks for src/demos/lifehacks/fit-before-fixed-slot. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Matches studyCatalog: hook and question 'A 25-minute task and a call at 20 to 30. Free until 60. Where does it fit?', options 'From 0, across the call' / 'From 30' / 'Anywhere', answer 'From 30'. Own run: 30–55 has no overlap and ends before 60. |
| c3 | verified | Read StudyLesson.tsx (schedule stage) and scheduleObservation in src/lib/lifehacks/studyStages.ts first; own run of scheduleLayout/calendarResult/scheduleObservation (scratchpad fc52/sim.mts): freeGaps before 60 skipping the task: 0–20 and 30–60 (50 free, longest 30); start layout overlaps 5; Place after call: 30–55, done by 55. The reveal is that sentence plus the principle; neither names a personal productivity or memory benefit. |
| c4 | verified | Own run matches: task 0–25 overlaps call 20–30 by 5; free 0–20 and 30–60 = 50 minutes, longest 30; button moves the task to 30–55; reveal 'Before minute 60 there are 50 free minutes in 2 gaps, and the longest gap is 30 minutes.' |

**Result (Pass 52):** 3 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 61 (fact-checker, SO-10-2, 2026-10-16; shared review server 5b2fee7, R3a pass)

- lifehacks.fit-before-fixed-slot.c1: verified

Reasons and fixes: each claim's source in src/demos/lifehacks/fit-before-fixed-slot/meta.json, and company/reviews/lifehacks-200/2026-10-16-fact-check-pass61.md.
