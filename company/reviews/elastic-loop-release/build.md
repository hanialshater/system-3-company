# Build note: elastic-loop-release

## Pre-flight v2

2026-10-14, demo-builder. Board W-358.

- **Bug:** the stage had no cord drawing. `Scene` in `src/components/lifehacks/HomeLesson.tsx` has a branch for each `view` but none for `'cord'`. The three cord lessons that use the generic Stage (end-paths, loop-release, coil-radius) fell through to the default view and drew its last fallback, an empty box outline. (long-cord-knots-itself uses its own CordStage and was never affected.)
- **Fix:** a pure `homeCordScene(spec, p, after)` in `src/lib/lifehacks/home-models.ts` and a `view==='cord'` branch in Scene. The drawing is plain cord only: no plug, device, power, stretch or snap-back, as the safety record's watch items require. The "Plain cord; storage only" caption and the reveal limit are unchanged.
- **This lesson:** A plain cord runs from a held end (left block) along the line and into a drawn loop with one crossing (orange dot). It then goes on to a free end whose length follows the slider at 3 px/cm, with a 'free end Ncm' bracket. 'Slide loop off' straightens the cord, removes the crossing, and shows the loop (grey) past the free end with a green travel arrow. Crossings drawn = evaluateHome value (1 or 0).
- **Fixture:** a new test in `tests/lifehacks/home.test.mjs`, "every plain-cord lesson on the generic stage gets a cord drawing…". `npm run test:lifehacks` passes.
- **Looked at:** headless Playwright at 390x844 on the dev server, before and after the comparison control (screenshots in my scratchpad, not kept).
- **Claims:** all unverified. Version 1 → 2.
- **Not done:** no build and no QA (the brief says so). Lesson QA and the walkthrough are still owed.

## Pre-flight v3

2026-10-14, demo-builder. Board W-383 (from FC LH-2, company/reviews/elastic-loop-release/2026-10-14-fact-check.md, Pass LH-2).

- **Drawing fix (learner-visible):** the orange crossing dot was drawn at (150,125), 8 px below where the two diagonals of the curl cross. The diagonals run (110,150)-(170,100) and (130,100)-(190,150), so they meet at (150, 350/3 ≈ 116.7). `homeCordScene` in `src/lib/lifehacks/home-models.ts` now draws the dot there. The count of drawn crossings (1 before, 0 after) does not change. New fixture in `tests/lifehacks/home.test.mjs` checks that the dot lies on both diagonals.
- **c1 retyped:** support changes from source (Raymer & Smith 2007, which could not be opened) to derivation, using the Reidemeister I argument from the record. The text is unchanged. Status is unverified.
- **c5 deleted:** the old transfer prompt is never rendered, and `.recall` replaces it.
- **c3:** text and verdict unchanged. A source note records the moved dot.
- **Not changed:** FC minor finding (2), that "End through loop" draws the untouched curl and does not show threading. This is a design question, not a factual error. It is left for the learning-designer.
- Version 2 → 3. No build, no QA, no screenshots (per the brief). Lesson QA and the walkthrough are still owed (W-371).
