# Build note: significant-but-false (demo-builder, wave-j-probability, 2026-10-14)

Brief: `company/domains/briefs/probability.md` Round 4 item 56. Status draft, version 1. Claims c1-c5 unverified (c5 is the Ioannidis citation, not in learner text; needs a human source check).

- Stage: 1,000 dots on a 40 x 25 grid, filled column by column, true ideas first. Filled = true idea; hollow = dud; ring = passed; flukes (passing duds) in var(--bad), hollow with a cross. Drawn as six paths, not 1,000 elements. Caption states the stage settings: "Tests catch 80%; 5% of duds pass."
- Passes are spread evenly through each group (deterministic quota, no randomness). Counts: tp = round(1,000 x prior x 0.8), fp = round((1,000 - trues) x 0.05): 50%: 400/25 (6%); 1%: 8/50 (86%, 49.5 drawn as 50 as the brief says); 10%: 80/45 (36%).
- Presets in DOM order: 50% true, 1% true, 10% true. Readouts "Passed" and "Flukes among passes" ("-" while locked). Milestones p1, p10. Each preset seen leaves its share in an "Earlier:" trace line so the 86% the reveal quotes is on stage at the reveal.
- Departure from the brief: none in mechanics; the trace line is added so the reveal's 1% value stays visible.

## Pre-flight v1
1. **Title and hook.** "Significant, and still a fluke?" / "A study's result passes the 5% test. How likely is it that the effect isn't real?" No size or direction.
2. **Options.** "About 5%" / "About 20%" / "About 35%": all numbered, same precision.
3. **Locked stage.** 1,000 grey hollow dots, no rings or colours, presets disabled, readouts "-". Caption "Make a prediction to start."
4. **Reveal values.** 80, 45, 36% (b) milestone p10, recorded when it fires (counts(10)); "900 of the 1,000" fixed by the question's case; 86% (b) milestone p1, recorded; shown in the trace when another preset is on the grid.
5. **QA path.** 50% (no milestone) -> 1% (p1) -> 10% (p10, the question's case, last). At the reveal: grid at 10%, readouts "80 real, 45 flukes" / "36%", trace "Earlier: 50% true: 6% · 1% true: 86%".
6. **Reset.** No reset control; records never clear. Reveal text on the QA path: "With 10% of ideas true, the tests passed 80 real effects and 45 flukes: 36% of the passes are false, not 5%. The 5% is the fluke rate among duds, and here 900 of the 1,000 ideas are duds. At 1% true, flukes swamped real finds: 86%. How far to trust a significant result depends on how many of the tested ideas were likely to be true." (67 words)
7. **Phone fit.** See "Measurements" below.
