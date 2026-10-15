# Build note: screening-survival-clock (demo-builder, wave-i-life, 2026-10-14)

Brief: `company/domains/briefs/life.health-epidemiology.md`, spare-capacity batch item 3. Status draft, version 1. Claims c1-c4 unverified.

- Stage: readout "Alive 5 years after diagnosis: k of 14 (p%)" (the locked stage shows 6 of 14 (43%), as the brief asks). Below it, 14 rows on one axis of years from symptoms (-3 to 8). Each row has a diagnosis dot, a 5-year bar from it with an end tick, and a death cross. A row whose death is past the bar end turns solid green, with a dark cross; otherwise the bar is grey and the cross red. With the test on, hollow ghost dots stay at 0 (the old diagnosis), so only the start moves. Once the 3-year case is reached, a trace "3 yr earlier: 12 of 14" stays under the axis.
- Controls: toggle "Test: off/on", then the slider "Found earlier by" (0.5 to 3 yr, step 0.5), which is enabled only when the test is on.
- Departure from the brief: the slider starts at 2, not 3 (and its minimum is 0.5, since off = 0). The QA path then ends on the question's case (2 -> 2.5 -> 3) and the learner has to move the slider to reach it.
- Milestones: "test-on", "lead-3" (test on at 3 years).
- Node check: L = 0: 6; 0.5: 7; 1: 8; 1.5: 9; 2: 10; 2.5: 11; 3: 12 of 14.

## Pre-flight v1
1. **Title and hook.** "Survival up. Did anyone live longer?" / "A new test makes more people alive 5 years after diagnosis. Does that mean longer lives?" The hook says survival rises, which both 64% and 86% satisfy. It gives no share. Possible concern: it hints that the answer to "longer lives?" is no. That is the lesson's idea, not the option.
2. **Options.** "43%" / "64%" / "86%": all exact percentages.
3. **Locked stage.** The 21-word brief message, readout "6 of 14 (43%)" (the no-test value, a wrong option, shown as the brief specifies), 14 rows at L = 0 (6 solid), toggle "Test: off" and the slider at 2 yr, both disabled. Nothing reads 12, 86% or 3 years.
4. **Reveal values.** "With the test 3 years earlier, 12 of 14": (b) milestone lead-3 (the question's case). It is the current readout on the QA path, and the "3 yr earlier: 12 of 14" trace keeps it visible after the learner moves away. "up from 6": the no-test value (model constant, shown on the locked stage). "every death cross stayed put": crosses are drawn at fixed T and never move.
5. **QA path.** Toggle on (milestone test-on; 10 of 14 at 2 yr), then the slider ArrowRight x2: 2.5, 3 (milestone lead-3). At the reveal: readout "12 of 14 (86%)", the trace, 12 solid rows, crosses unchanged.
6. **Reset.** There is no Reset control. Reveal on the QA run: "With the test 3 years earlier, 12 of 14 were alive 5 years after diagnosis, up from 6, yet every death cross stayed put. Only the start of the clock moved. Finding an illness earlier raises survival counted from diagnosis even when nobody lives longer: lead time. To judge an earlier test, compare deaths in whole groups. This toy makes no claim about any real test."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3537 screening-survival-clock`: verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0 ("alive 5 years after diagnosis" visible). The tool counts 71 words with the verdict line; the reveal body is 66. Stage 337 px (picture 175, controls 50, text 76), reveal 232 px, window 594 px. Screenshot `artifacts/reveal-fit/screening-survival-clock.png`. Measured on a `next dev` server started from this worktree (/home/user/s3c-rel, port 3537, stopped afterwards): the shared dev server on 3530 serves /home/user/system-3-company, which does not contain this lesson.

Not run: next build, QA, walkthrough (per task). tsc and check pass. A local Playwright pass of the QA contract's steps (scratch script) found no dead controls, no errors, no small controls and no overflow.

## Fact-check rewording (W-867 (optional wording, FC38), 2026-10-15, demo-builder)

- Recall keyed option is now 'Compare death rates in randomly assigned scanned and unscanned groups', and the why says 'deaths in randomly assigned groups'. The recall was not recorded as a claim before; it is now claim 'recall' (unverified).
- Claims reset to unverified: recall (new). Nothing marked verified; a fact-checker who is not the builder re-checks.
- Reveal fit (tools/reveal-fit.mjs --url http://localhost:3652, next dev, 390x844): fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true, thumb false, 71 tool words (the tool counts the kit's verdict line and trust link as well).
- QA contract (tests/qa/contract.spec.ts against :3652, QA_ONLY = the 15 lessons changed in this pass): phone and desktop passed (30/30 overall, harness stamp clean). npm run check passed.
