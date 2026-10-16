# Fact-check: choose-the-metric-first

Independent claim checks for src/demos/lifehacks/choose-the-metric-first. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Read StudyLesson.tsx (order stage) and queueObservation in src/lib/lifehacks/studyStages.ts first; own run of queueResult/queueObservation (scratchpad fc52/sim.mts): short→urgent→long waiting 25, urgent late (20 > 15); urgent→short→long waiting 35, 0 late, reveal adds '10 more minutes of waiting ... the goal here is no late jobs'. The reveal is that sentence plus the principle; neither names a personal productivity or memory benefit. |
| c2 | verified | Principle text matches studyCatalog. Own run: the target order lowers late jobs (1 → 0) and raises waiting (25 → 35), so the two readouts rank the orders differently; an objective is needed to prefer one. Exercise-only. |

**Result (Pass 52):** 2 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 61 (fact-checker, SO-10-2, 2026-10-16; shared review server 5b2fee7, R3a pass)

- lifehacks.choose-the-metric-first.c1: verified

Reasons and fixes: each claim's source in src/demos/lifehacks/choose-the-metric-first/meta.json, and company/reviews/lifehacks-200/2026-10-16-fact-check-pass61.md.
