# Build note: group-cables-with-ends

## Revision lhfix-r3 (dispatch 2026-10-16-r5-lifehacks.md B1, 2026-10-16, demo-builder)

- Branch lhfix-r3 from main 422f861. Tier 2: company/engineering/readiness/2026-10-16-lh-content-patch-r3.md, awaiting principal-engineer-ops; not merged. No claim marked verified by me.
- Applied, commit 764ef10: patch r2 §2 (company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md, as amended by patch r3 "§2 re-check") title `Tie the middle or tuck the ends?`, hook `Three cords in one drawer. Does tying them together stop the tangles?`. Pending the W-1094 safety re-look.
- Reset: c4. Not applied, by design: the "how to tuck" picture and the c2 bend-radius limit (safety-owned wording, W-1094); the locked end-dot highlight is already off on main (lh-engine-locked, W-1299).
- QA: release build of this branch (NEXT_DIST_DIR=.next-lh3, port 4073, QA_ONLY = the 21 touched lessons, 2 workers): this lesson's contract passed on phone and desktop (42 of 42 contract tests; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 without it). Dist deleted.


## Revision v2 → v3 (r11 fix plan wave W3, TP-1/TP-2/TP-8, 2026-10-16, demo-builder)

- engine: 2. Question and options from the plan; options are beliefs ("Middle tie: it holds them together"), the buttons are "Tie the middle" / "Tuck the ends" (r11 findings 1-2). Starting count 3 cords, as the question says.
- Seen table: Cords and Loose ends for both layouts; the Count slider now visibly moves the middle-tie column (6, 8, … 16 loose ends) (finding 3).
- Reveal: "Tie the middle: 3 cords, 6 loose ends free to weave through loops. Tuck the ends: 0 loose ends." Idea in plain words; it still says the drawing does not simulate tangling (claim c3 is honest about that, finding 4).
- Safety: caption "Plain cord; storage only" and limit line kept verbatim (safety record).
- Risk for fact-checker: the question asks "which tangles less"; the stage counts loose ends and the reveal links them to tangling through the end-weaving mechanism (Raymer and Smith p.16435). If that link is judged too strong, the line goes back to cm-lifehacks.
- Claims: every claim reset to unverified (checkedBy/checkedOn removed, reset note in each source); new `.seen` claim for the first reveal sentence. Nothing marked verified. Version bumped.
- Correct option: Ends tucked, moved from 2nd to 1st (TP-8).
- Reveal: 90 words or fewer (counted on the built reveal at the starting value).
- QA contract on a production build (`next build`, NEXT_DIST_DIR=.next-lhw3, QA_PORT=3811, harness stamp clean, contract commit 3b97991): phone and desktop passed.
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
