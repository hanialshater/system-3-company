# Fact-check: meeting-and-preparation

Independent claim checks for src/demos/lifehacks/meeting-and-preparation. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Matches studyCatalog: hook, question 'The presentation is at 30 and needs 20 minutes' prep. With nothing booked before it, are you ready?', answer 'Only if prep is booked before 30'. Own run: prep 10–30 is on time; the start layout (45–65) is 35 minutes late. |
| c3 | verified | Read StudyLesson.tsx (schedule stage) and scheduleObservation in src/lib/lifehacks/studyStages.ts first; own run of scheduleLayout/calendarResult/scheduleObservation (scratchpad fc52/sim.mts): dueRow 0 (prep), deadline 30. Start: prep 45–65, no overlap, 'prep finishes at minute 65 and is due at minute 30, so it is 35 minutes late'; Book prep before 30: 10–30, on time. The reveal is that sentence plus the principle; neither names a personal productivity or memory benefit. Note for demo-builder: lower-case 'prep finishes' after a full stop. |
| c4 | verified | Own run matches: present 30–45; prep 20 minutes due 30; start booking 45–65 is 35 late; button moves it to 10–30, on time. |

**Result (Pass 52):** 3 verified, 0 disputed, 0 held unverified, 0 withdrawn.
