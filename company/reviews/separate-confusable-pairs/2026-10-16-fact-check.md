# Fact-check: separate-confusable-pairs

Independent claim checks for src/demos/lifehacks/separate-confusable-pairs. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Matches studyCatalog: hook, question 'Codes K-417 and K-471, both noted as 'grey cable'. … how often do you pick the right one?', answer 'About half the time'. With the cue fitting two remembered codes, a pick is a 1-in-2 guess. |
| c2 | verified | Principle text matches. On the stage the cue 'grey cable' fits K-417 and K-471 (row note 'this cue fits 2 codes'); 'grey, 5 m' fits K-471 only ('fits 1 code'). Logic, not an empirical claim. |
| c3 | verified | Read RetrievalLesson.tsx and src/lib/lifehacks/studyRecall.ts first; own run of the fixture: two one-box rows, each checked on its own; fits notes appear after each check; card uncovers after both. Reveal = per-row sentences plus the principle. No benefit claimed. |
| c4 | verified | Own run matches: first choices K-417 for 'grey cable' (wrong, K-471 meant) = 0 of 1; K-471 for 'grey, 5 m' = 1 of 1; fits notes '2 codes' / '1 code'. 'The first pick was a lucky guess…' only when both rows are right. |

**Result (Pass 52):** 4 verified, 0 disputed, 0 held unverified, 0 withdrawn.
