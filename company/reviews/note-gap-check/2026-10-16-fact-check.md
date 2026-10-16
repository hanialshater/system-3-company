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

## Pass 61 (SO-10-2 [project:lifehacks-engine-v2], batch 2)

Checker: fact-checker, a fresh instance, 2026-10-16. I did not write, build or record these claims (lh-split-order-fixed-fee c5/c6 were recorded by an earlier fact-checker, FC 51, and are held for that reason). Server: http://localhost:3591, /home/user/s3c-qa/.next-review3/BUILT_FROM = 5b2fee71701e8645e3cd6e2fde60bcea004833e8 at start and end; main at 6141f65. R3a scope test (company/reviews/org/2026-10-16-r3a-scope/check.sh) passed 5b2fee7 -> main 2d6b4d5 for this lesson at the start; at 6141f65 it fails only on content/curriculum/history.json (cm-history 8bdf821), which is outside this lesson. Lesson files and src/lib/lifehacks are unchanged 2d6b4d5..6141f65.
Method: artifact first (`npm run walkthrough -- … --url http://localhost:3591`, transcript read to the trust-sheet appendix), then meta.json, then content patch r2 (company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md) row by row, then the engine on main: scripted compare of claim text with studyCatalog.ts / home-lessons.ts / resource-specs.json, and own runs of queueResult, scheduleLayout, calendarResult, homeColumn and homeRevealLine (tsx). Consolidated record: company/reviews/lifehacks-200/2026-10-16-fact-check-so-10-2-batch2.md.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | VERIFIED (convention). Text equals studyCatalog (scripted compare); hook = patch r2 1B row. Fixture: 3 fields (room B4, day Friday, code 627) rebuilt from choices, so the count is unknown until the learner tries; the key 'Can't tell until you try' is the only option the stage supports (walk: 2 of 3 on a wrong code pick). |
