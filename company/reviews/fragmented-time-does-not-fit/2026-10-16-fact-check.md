# Fact-check: fragmented-time-does-not-fit

Independent claim checks for src/demos/lifehacks/fragmented-time-does-not-fit. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Matches studyCatalog: hook 'Thirty free minutes in scattered gaps: will a 30-minute job fit?', question 'Gaps of 10, 10 and 10 minutes before minute 40. Does the 30-minute job fit?', answer 'No: it needs one 30-minute gap'. Own run: gaps 0–10, 15–25, 30–40, longest 10. |
| c3 | verified | Read StudyLesson.tsx (schedule stage) and scheduleObservation in src/lib/lifehacks/studyStages.ts first; own run of scheduleLayout/calendarResult/scheduleObservation (scratchpad fc52/sim.mts): job 0–30 overlaps call 10–15 and chat 25–30, 10 minutes, no valid finish; free before 40 = 30 minutes in 3 gaps, longest 10; Use one 30-min gap: job 40–70, done by 70. The reveal is that sentence plus the principle; neither names a personal productivity or memory benefit. |
| c4 | verified | Own run matches every number: gaps 0–10, 15–25, 30–40 (30 free, longest 10); job at 0 overlaps call and chat for 10 minutes, no valid finish; button moves it to 40–70; reveal sentence as quoted. |

**Result (Pass 52):** 3 verified, 0 disputed, 0 held unverified, 0 withdrawn.
