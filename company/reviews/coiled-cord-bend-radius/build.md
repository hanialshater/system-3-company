# Build note: coiled-cord-bend-radius

## Pre-flight v2

2026-10-14, demo-builder. Board W-358.

- **Bug:** the stage had no cord drawing. `Scene` in `src/components/lifehacks/HomeLesson.tsx` has a branch for each `view` but none for `'cord'`. The three cord lessons that use the generic Stage (end-paths, loop-release, coil-radius) fell through to the default view and drew its last fallback, an empty box outline. (long-cord-knots-itself uses its own CordStage and was never affected.)
- **Fix:** a pure `homeCordScene(spec, p, after)` in `src/lib/lifehacks/home-models.ts` and a `view==='cord'` branch in Scene. The drawing is plain cord only: no plug, device, power, stretch or snap-back, as the safety record's watch items require. The "Plain cord; storage only" caption and the reveal limit are unchanged.
- **This lesson:** A plain-cord coil is drawn at a fixed scale (95 px = 40 cm, so doubling the radius doubles the drawn circle). Turns = 200/(2πr): one circle per whole turn (each offset 3 px), plus an arc for the fraction. A green radius line is labelled r=Ncm, and the caption says 'N turns of 200cm'. Not in W-358, but it had the same missing branch, so the same fix redraws it.
- **Fixture:** a new test in `tests/lifehacks/home.test.mjs`, "every plain-cord lesson on the generic stage gets a cord drawing…". `npm run test:lifehacks` passes.
- **Looked at:** headless Playwright at 390x844 on the dev server, before and after the comparison control (screenshots in my scratchpad, not kept).
- **Claims:** all unverified. Version 1 → 2. c1 to c4 had fact-checker verdicts (FC LH-1) against the old box picture. The stage is new, so they were reset and need a re-check.
- **Not done:** no build and no QA (the brief says so). Lesson QA and the walkthrough are still owed.

## Pre-flight note (W-383, version unchanged)

2026-10-14, demo-builder. From FC LH-2 Pass LH-2. The unrendered c5 transfer prompt is deleted (`.recall` replaces it). Nothing a learner sees changed, so the version stays 2.
