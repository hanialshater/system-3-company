# Fact-check: include-the-wrap-up

Independent claim checks for src/demos/lifehacks/include-the-wrap-up. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Matches studyCatalog: hook 'A call from 0 to 30, then 10 minutes of notes.', question 'When is the job done?', options 30 / 40, answer 40. Own run: notes after the call end at 40. |
| c2 | verified | Principle text matches. Own run: with notes placed after the call, the last finish is 40, against the call-only plan's 30; the stage's 'Call-only plan: minute 30' chip and reveal sentence say so. |
| c3 | verified | Read StudyLesson.tsx (schedule stage) and scheduleObservation in src/lib/lifehacks/studyStages.ts first; own run of scheduleLayout/calendarResult/scheduleObservation (scratchpad fc52/sim.mts): notes 20–30 overlap the call 10 minutes, no valid finish; Place notes after: notes 30–40, 'everything is done by minute 40. The call-only plan said minute 30: 10 minutes too early.' The claimed sentence is skipped while the layout overlaps, so it cannot go negative. The reveal is that sentence plus the principle; neither names a personal productivity or memory benefit. |
| c4 | verified | Own run matches: call 0–30, notes 20–30 (10 min overlap); after the button notes 30–40, done at 40; chip 'Call-only plan: minute 30'; reveal 'The call-only plan said minute 30: N minutes too early' with N = 10 at the target (N = finish − 30 for later slider positions). |

**Result (Pass 52):** 4 verified, 0 disputed, 0 held unverified, 0 withdrawn.
