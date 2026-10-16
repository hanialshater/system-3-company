# Build note: elastic-loop-release

## Revision lhfix-r3 (dispatch 2026-10-16-r5-lifehacks.md B1, 2026-10-16, demo-builder)

- Branch lhfix-r3 from main 422f861. Tier 2: company/engineering/readiness/2026-10-16-lh-content-patch-r3.md, awaiting principal-engineer-ops; not merged. No claim marked verified by me.
- Applied, commit 764ef10: patch r2 §2 (company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md, as amended by patch r3 "§2 re-check") title `Knotted, or just looped?`, hook `A hair tie caught on a cord looks like a knot. How do you get it off?`; patch r3 (company/reviews/lifehacks-200/content-patch-2026-10-16-r3.md) D2: resultLabel `Hair ties on the cord`, revealLine and formula (c3) as written. Value still 1 / 0, slider still changes nothing (patch run: sliderMatters=false). Pending the W-1094 safety re-look.
- Reset: c3 (was disputed), c4, seen (text = engine sentence at p = 20, equal to the patch's quoted line). Kept: recall (patch: keep), c2 (safety text unchanged).
- QA: release build of this branch (NEXT_DIST_DIR=.next-lh3, port 4073, QA_ONLY = the 21 touched lessons, 2 workers): this lesson's contract passed on phone and desktop (42 of 42 contract tests; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 without it). Dist deleted.


## Revision v3 → v4 (r11 fix plan wave W3, TP-1/TP-2/TP-8, 2026-10-16, demo-builder)

- engine: 2. Question and options from the plan (a hair tie on a cord).
- Picture (r11 finding 1, 3): a new drawing: the cord with a twisted hair tie (figure-eight round the cord, one crossing marked) near its free end; B slides the loop along the cord and off the end (animated translate, 0.7 s), with an arrow. No stretching is drawn (safety record: no elastic under tension).
- Slider (finding 4): hidden. No honest physical reason makes the free-end length change the outcome (any free end lets a closed loop slide off), so I took the plan's "or hide it" branch; "slider-drives-live-chart" removed from interactions.
- Seen table: Hair tie (on the cord / off the end) and Crossings (1 · still looped / 0 · free).
- Safety: caption and limit line kept verbatim.
- Claims: every claim reset to unverified (checkedBy/checkedOn removed, reset note in each source); new `.seen` claim for the first reveal sentence. Nothing marked verified. Version bumped.
- Correct option: Sliding it off the end, 2nd of 3 (TP-8).
- Reveal: 90 words or fewer (counted on the built reveal at the starting value).
- QA contract on a production build (`next build`, NEXT_DIST_DIR=.next-lhw3, QA_PORT=3811, harness stamp clean, contract commit 3b97991): phone and desktop passed.
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
