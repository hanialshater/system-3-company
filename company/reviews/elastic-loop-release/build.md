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
