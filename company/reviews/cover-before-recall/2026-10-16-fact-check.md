# Fact-check: cover-before-recall

Independent claim checks for src/demos/lifehacks/cover-before-recall. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Matches studyCatalog: hook 'Cover the answers: how many can you give?', question, options '3: I just saw them' / 'Can't tell until you try' / '0', answer 1. |
| c3 | verified | Read RetrievalLesson.tsx and src/lib/lifehacks/studyRecall.ts first; own run of the fixture: card shown while locked, covered after; picks start EMPTY; Check needs every box filled (scoreRow.complete) and marks each box; the card uncovers only when every row is checked. Reveal = rowsObservation ('With the answers showing, all three cards read right.' then 'Covered: N of 3 right; …') plus the principle 'This reconstruction records one attempt, not a long-term memory score.' No benefit claimed. |
| c4 | verified | Own run matches: first choices leaf→door (right), bell→lane (wrong, lake), kite→plum (right) = 2 of 3; contrast chip 'Answers showing 3/3'; lead sentence as quoted. The 'Nothing missed this time…' sentence appears only when every box is right (allRight). |

**Result (Pass 52):** 3 verified, 0 disputed, 0 held unverified, 0 withdrawn.
