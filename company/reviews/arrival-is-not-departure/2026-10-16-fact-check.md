# Fact-check: arrival-is-not-departure

Independent claim checks for src/demos/lifehacks/arrival-is-not-departure. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Read StudyLesson.tsx (schedule stage) and scheduleObservation in src/lib/lifehacks/studyStages.ts first; own run of scheduleLayout/calendarResult/scheduleObservation (scratchpad fc52/sim.mts): start layout travel 30–50 overlaps visit 40–55 for 10 minutes; reveal 'Your final layout overlaps for 10 minutes (travel with visit). One person cannot do both at once, so this plan has no valid finish.' Move departure: travel 20–40, 'travel finishes at minute 40 and is due at minute 40, so it is on time.' Chips: Overlap, Due at 40, Late from the same layout. The reveal is that sentence plus the principle; neither names a personal productivity or memory benefit. Note for demo-builder: the sentence after 'no overlap.' starts lower-case ('travel finishes'). |

**Result (Pass 52):** 1 verified, 0 disputed, 0 held unverified, 0 withdrawn.
