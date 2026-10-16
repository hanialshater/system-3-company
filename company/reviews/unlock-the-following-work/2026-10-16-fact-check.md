# Fact-check: unlock-the-following-work

Independent claim checks for src/demos/lifehacks/unlock-the-following-work. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Read StudyLesson.tsx (order stage) and queueObservation in src/lib/lifehacks/studyStages.ts first; own run of queueResult/queueObservation (scratchpad fc52/sim.mts): polish→input→build: build done at 42, waiting 22; input→polish→build (Swap first): build still 42, waiting 14; input→build→polish (Try target): build 32, waiting 34, reveal adds '12 more minutes of waiting ... the goal here is build done sooner (minute 32, not 42)'. The reveal is that sentence plus the principle; neither names a personal productivity or memory benefit. |
| c4 | verified | Own run: input 2, build 30 (needs input), polish 10. Polish first: build done at 42. Input then build: 32, 10 sooner; waiting 22 → 34. Matches (the claim says 'Input first, then build', which is the target order). |
| c1 | disputed | The keyed answer is true only for one reading of 'input first'. Question: 'Polish (10 min) first or input first: when does the build finish?' Key: '10 minutes later with polish first'. On this stage, 'Swap first' turns polish→input→build into input→polish→build, which is input first, and the build is still done at minute 42, the same as polish first (own run of queueResult; the 'Build done' chip shows 42 both times). Only input→build→polish ('Try target') gives 32. A learner who swaps sees the distractor 'Same either way' come true. Fix (demo-builder, claim text and studyCatalog together): ask about the order that is meant, e.g. 'Polish (10 min) first, or input and then the build: when does the build finish?', or make 'Swap first' not produce input→polish→build. Re-check after the change. |

**Result (Pass 52):** 2 verified, 1 disputed, 0 held unverified, 0 withdrawn.
