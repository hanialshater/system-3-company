# Fact-check: note-gap-check

Independent claim checks for src/demos/lifehacks/note-gap-check. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Matches studyCatalog: hook, question 'Your note looks complete. Cover it and rebuild its three fields: how many do you expect to get?', answer 'Can't tell until you try'. |
| c3 | verified | Read RetrievalLesson.tsx and src/lib/lifehacks/studyRecall.ts first; own run of the fixture: same TP-3 rows rules. Reveal lead 'The note showed all three fields filled.' plus the principle ('a local completeness check'). No benefit claimed. |
| c4 | verified | Own run matches: room→B4 (right), day→Friday (right), code→672 (wrong, 627) = Rebuilt 2 of 3; chip 'Note looks 3/3 filled'. 'Nothing was missing…' only when all right. |

**Result (Pass 52):** 3 verified, 0 disputed, 0 held unverified, 0 withdrawn.
