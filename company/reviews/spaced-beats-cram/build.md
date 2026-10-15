# Build note: spaced-beats-cram

## Revision v2 (W-1075, 2026-10-15, demo-builder)

Input: company/reviews/spaced-beats-cram/2026-10-15-learner-adult-beginner-r11.md (verdict revise). I also read the safety records (2026-10-13, 2026-10-14), the fact-check record, company/product/demo-standard.md, the Life Hacks charter and brief 2 in company/domains/briefs/lifehacks.md.

**What changed**
- **Finding 1 (spacing ahead even on the first test, against c5).** The stage is now lesson-local (Demo.tsx, model.ts, styles.module.css) and no longer uses the shared v1 spacing stage or `illustrativeMemory` (which `tests/lifehacks/study.test.mjs` still pins, so I left it alone). It runs a toy model computed from each plan's calendar. Each hour closes 60% of the gap. Recall fades as (1 + dt/τ)^−0.75, with τ starting at 5 days. A session that follows forgetting slows the fade: τ ← τ·(1 + 6·lost). The first test is now **right after the last hour (day 0)**, not "next morning": A 93%, B 90%. A month later (day 30): A 23%, B 37%. I chose the immediate test because that is what the opened source supports (Smith & Scarf 2017: equal on an immediate test, spaced ahead 4 days later; "at very short retention intervals massing is better than or equal to spacing"). In this model the plans cross between day 0 and day 1, but only because of the constants I chose; next morning shows A 82%, B 85%, and the slider shows it.
- **Finding 2 (B had a recall step).** Neither plan has one now. The question says "Same 3 hours of rereading", c1 records that only the calendar differs, and the alt text no longer says "starts with recall". This departs from brief 2's interaction line ("Each Plan B session is framed as starting by recalling…"), which is the confound the review found. cm-lifehacks may want to amend the brief.
- **Finding 3 (code-speak labels).** The labels now read "A: 3 hours on day 0" and "B: 1 hour on each of 3 days". The calendar bars sit on the same day axis as the curves, and bar height is hours.
- **Finding 4 (easy prediction).** The options are now Plan A / Plan B / About the same: same 3 hours. "Calendar cannot matter" was a straw option; "About the same" states the misconception. I did not move the prediction onto the immediate-test trap. That is a design call for learning-designer if r12 still finds it easy.
- **Finding 5 (dramatic invented numbers).** The month gap is now 23% vs 37%, down from 1% vs 19%. Every number is labelled "toy model" on the stage, and the reveal says "Illustrative toy numbers, not a forecast of your memory."
- **Finding 6 (no why).** I added one hedged reason sentence (claim c6, Benjamin & Tullis 2010), and the reveal now says that massing can tie or win early.
- The mode buttons (A / B / Month: both) are gone. They only hid curves. Each test button now carries its own result, so the reveal's numbers stay on the stage.
- I edited only this lesson's fixture in `src/lib/lifehacks/studyCatalog.ts`: question, options, answer, principle, boundary and source. claims-match.test.mjs needs principle and boundary to appear in a claim. No shared engine code changed, so this is change tier 0.

**Claims** (none marked verified by me)
- c1: rewritten (scenario, options, labels, only-calendar-differs). Now **unverified**.
- c2: **withdrawn**. The sentence is no longer shown.
- c3: rewritten for the new model and values. Now **unverified**.
- c5: rewritten as the reveal's research sentence. The source is now Smith & Scarf 2017 (PMC5476736, opened). It cites Rawson & Kintsch 2005 and Cepeda 2006, which I still could not open (proxy 403). Now **unverified**.
- c6: new (reason sentence, Benjamin & Tullis 2010, PMC2930147, opened). Now **unverified**.
- recall: text and support unchanged, so it stays verified (FC pass 41).

**Version** 1 → 2.

## Pre-flight v2
1. **Title and hook:** "Same hours, different calendar" / "Three hours in one block or across three days: what changes a month later?" They name both plans and point to neither.
2. **Options:** "Plan A", "Plan B", "About the same: same 3 hours". None has a number except the wrong "same 3 hours" option, which repeats the stem.
3. **Locked stage:** it shows two calendar rows (bars and labels), empty axes, "toy model", and test buttons reading "A ? · B ?". No curves, cursor, values or highlight.
4. **Reveal values:** 93%/90% come from the model at day 0 and are shown after milestone "right-after". 23%/37% come from the model at day 30, after milestone "month". Both stay on the test buttons once pressed. The reveal opens only after both milestones (minInteractions 2).
5. **QA path:** "Test right after" (milestone 1), then "Test a month later" (milestone 2), then the slider steps 30 → 28. Both quoted states are still visible on the buttons and as markers at the reveal.
6. **Reset:** the stage has no Reset. The reveal values are model constants at the test days, so no later action can change them.
7. **Phone fit:** reveal-fit at 390×844 (committed tool, clean stamp): verdict fit, crop 0 px, hiddenBelow 0, namedHidden 0, 79 measured words including the verdict line, phoneFit true.

**Checks** (worktree /home/user/s3c-lh, branch lh-fix)
- QA contract (`QA_ONLY=spaced-beats-cram`, dev server `NEXT_DIST_DIR=.next-lh next dev -p 3693`, `QA_BASE_URL`): phone and desktop passed. I ran it twice, before and after a label fix.
- `npm run test:lifehacks` 64/64, `npm run check` passed, `npx tsc --noEmit` clean.

**Known limits**
- The day axis is linear from −2 to 30, so the crossover between day 0 and day 1 is drawn small. The two test buttons and the slider readout carry it.
- The `study_spaced_beats_cram` fixture is no longer rendered by StudyLesson.tsx. It holds only this lesson's text, and the study tests still count it.
- c5's primary sources (Cepeda 2006, Rawson & Kintsch 2005) are cited through Smith & Scarf. A fact-checker on a connected host could open them directly.
