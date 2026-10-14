# Build note: group-cables-with-ends

## Pre-flight v2

2026-10-14, demo-builder. Board W-358.

- **Bug:** the stage had no cord drawing. `Scene` in `src/components/lifehacks/HomeLesson.tsx` has a branch for each `view` but none for `'cord'`. The three cord lessons that use the generic Stage (end-paths, loop-release, coil-radius) fell through to the default view and drew its last fallback, an empty box outline. (long-cord-knots-itself uses its own CordStage and was never affected.)
- **Fix:** a pure `homeCordScene(spec, p, after)` in `src/lib/lifehacks/home-models.ts` and a `view==='cord'` branch in Scene. The drawing is plain cord only: no plug, device, power, stretch or snap-back, as the safety record's watch items require. The "Plain cord; storage only" caption and the reveal limit are unchanged.
- **This lesson:** N plain strands (slider 2 to 8) are gathered by one middle tie. Every loose end has an orange dot and the caption says '2N loose ends'. 'Secure bundle ends' draws the strands parallel, with ties at both ends and the middle and no free ends; its caption says 'Ends tucked into end ties'. Ends drawn = evaluateHome value (2N or 0) at every slider value (fixture).
- **Fixture:** a new test in `tests/lifehacks/home.test.mjs`, "every plain-cord lesson on the generic stage gets a cord drawing…". `npm run test:lifehacks` passes.
- **Looked at:** headless Playwright at 390x844 on the dev server, before and after the comparison control (screenshots in my scratchpad, not kept).
- **Claims:** all unverified. Version 1 → 2.
- **Not done:** no build and no QA (the brief says so). Lesson QA and the walkthrough are still owed.

## Pre-flight note (W-383, version unchanged)

2026-10-14, demo-builder. From FC LH-2 (company/reviews/group-cables-with-ends/2026-10-14-fact-check.md, Pass LH-2). c1 support is retyped from source (Raymer & Smith 2007, which could not be opened) to derivation: a cord whose ends are held cannot change its knot type, so a middle tie leaves the end routes open. The text is unchanged and the status is unverified. The unrendered c5 transfer prompt is deleted. Nothing a learner sees changed, so the version stays 2.
