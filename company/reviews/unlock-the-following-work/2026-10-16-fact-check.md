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

## Pass 61 (SO-10-2 [project:lifehacks-engine-v2], batch 2)

Checker: fact-checker, a fresh instance, 2026-10-16. I did not write, build or record these claims (lh-split-order-fixed-fee c5/c6 were recorded by an earlier fact-checker, FC 51, and are held for that reason). Server: http://localhost:3591, /home/user/s3c-qa/.next-review3/BUILT_FROM = 5b2fee71701e8645e3cd6e2fde60bcea004833e8 at start and end; main at 6141f65. R3a scope test (company/reviews/org/2026-10-16-r3a-scope/check.sh) passed 5b2fee7 -> main 2d6b4d5 for this lesson at the start; at 6141f65 it fails only on content/curriculum/history.json (cm-history 8bdf821), which is outside this lesson. Lesson files and src/lib/lifehacks are unchanged 2d6b4d5..6141f65.
Method: artifact first (`npm run walkthrough -- … --url http://localhost:3591`, transcript read to the trust-sheet appendix), then meta.json, then content patch r2 (company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md) row by row, then the engine on main: scripted compare of claim text with studyCatalog.ts / home-lessons.ts / resource-specs.json, and own runs of queueResult, scheduleLayout, calendarResult, homeColumn and homeRevealLine (tsx). Consolidated record: company/reviews/lifehacks-200/2026-10-16-fact-check-so-10-2-batch2.md.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | VERIFIED (convention); clears the FC52 dispute. Text equals studyCatalog; title, hook, question, options, answer = patch r2 1A rows. Own run of queueResult, all 6 orders: polish->input->build ends the build at 42; input->build->polish at 32; input->polish->build ('Swap first') also 42, but the new question names input->build->polish explicitly, so the distractor 'Minute 42: same jobs, same finish' is false for the order asked and Minute 32 is the only true option. The reveal's goal sentence ('build done sooner (minute 32, not 42)') still matches (walk step 3 chip 'minute 32'). |
