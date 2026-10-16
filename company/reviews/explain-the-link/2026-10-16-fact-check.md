# Fact-check: explain-the-link

Independent claim checks for src/demos/lifehacks/explain-the-link. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Matches studyCatalog: hook, question 'You can list 'cloud, rain, puddle'. Asked 'why is there a puddle?', can you answer?', answer 'Only if you learned the links'. |
| c2 | verified | Principle text matches. Logic on the stage: the covered card lists bix, rell, tav alphabetically with no arrows, so the list alone cannot answer 'What turns rell?'; only the studied links (tav turns bix, bix turns rell) can. No empirical effect is claimed in the text; the Roediger & Karpicke citation is background only. |
| c3 | verified | Read RetrievalLesson.tsx and src/lib/lifehacks/studyRecall.ts first; own run of the fixture: same TP-3 rules as cover-before-recall; covered card hides the arrows (arrow shown only when open). Reveal lead 'You could list all three words.' plus the principle. No benefit claimed. |
| c4 | verified | Own run matches: first choices What turns rell? → tav (wrong, bix), What turns bix? → tav (right) = Links 1 of 2; chip 'Words listed 3/3'. 'Both links came back…' shows only when both are right. |

**Result (Pass 52):** 4 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 61 (fact-checker, SO-10-2, 2026-10-16; shared review server 5b2fee7, R3a pass)

- lifehacks.explain-the-link.c1: verified

Reasons and fixes: each claim's source in src/demos/lifehacks/explain-the-link/meta.json, and company/reviews/lifehacks-200/2026-10-16-fact-check-pass61.md.
