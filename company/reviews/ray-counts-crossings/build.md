# Build note: ray-counts-crossings

builder: algo2-b1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Single card. A grid from -0.5..8.5 by -0.5..6.5 holds the U polygon. Drag anywhere on the SVG (pointer capture, touch-action none) or tap a preset: (1,4), (3,4), (5,4), (3,1), (7,4); the point starts at (7,4). A dashed ray runs right, crossed edges thicken, and the crossings are numbered along the ray. The note and readouts give the count, its parity and the verdict. Dragging snaps to a half-unit grid, moves y off the corner heights 0, 2 and 6, and moves points off the boundary. Milestones: inside-odd, notch (point strictly inside the notch).

## Answers re-run in node
- (3,4) 2, (1,4) 3, (5,4) 1, (3,1) 1, (7,4) 0 - all match the brief.

## Known gaps
- touch-action: none on the SVG means a swipe that starts on the stage will not scroll the feed.
- The Jordan curve, Shimrat and Haines citations come from the brief and have not been opened. All claims are unverified.

## Revision v2 (wave E r6, 2026-10-14)

r6 (adult beginner, revise): the locked caption "(7, 4): 0 crossings, even, so outside" stated the rule before the commit; the right option repeated the rule's words; the shaded U showed the answer; the flip was told; the reveal's 2-crossing state was not on screen. Fixes:
- Locked frame: the U is an outline with no fill, the dot is neutral, and the caption reads "Ray to the right from the point. Count the edges it crosses." Readouts show "?". Fill, verdict colour and counts appear only after the commit.
- Options: "Inside", "Outside", "Cannot tell without the area" (no rule words).
- The ray is drawn as stretches between crossings: solid green "in" where an odd number of crossings remain to the right, dashed "out" where an even number remain. It switches at every numbered crossing. The reveal points at it. New claim c4.
- A "Tried:" line keeps the last four points with their count and in / out, so (3, 4) 2 out and (1, 4) 3 in are still on stage at the reveal. The reveal quotes the first gap point and the first odd point the learner reached (recorded when reached), not constants.
- Alt text: "1 edge" singular.
- Not changed, for the learning designer: the U's gap is open at the top, so a careful look still says "outside". The reviewer suggests a shape where looking misleads (a spiral, or arms that curl in). That changes the case and claim c1, so it is a design choice and not mine to make in a revision.
- Not run: build, QA, walkthrough, tsc.

## Pre-flight v2

1. Title and hook: "Is the point in the U?" / "A point sits between the arms of a U, near its middle. Inside or out? Count, don't look." A question; no parity word or verdict.
2. Options: "Inside", "Outside", "Cannot tell without the area". None numbered.
3. Locked stage: the U outline (no fill), the grid, a neutral dot at (7, 4) with a muted dashed ray, caption "Ray to the right from the point. Count the edges it crosses.", readouts "?", "Tried: none yet". No count, verdict or in/out label. The outline itself is the open U (see the note above).
4. Reveal values: the gap point and its 2 (x = 4, x = 6): (b) milestone notch, recorded when reached; the odd point and its count: (b) milestone inside-odd, recorded when reached; "solid / dashed, outside past the last crossing": (a) the current ray on stage.
5. QA path: (1, 4) (3 crossings, inside-odd), (3, 4) (2, notch), (5, 4), (3, 1); (7, 4) is the start and disabled. Both milestones reached, the question's own case (3, 4) included. At the reveal "Tried: (1, 4) 3 in · (3, 4) 2 out · (5, 4) 1 in · (3, 1) 1 in" is on stage.
6. Reset: no Reset control; the recorded points never clear. Reveal on the QA path: "In the gap, from (3, 4), the ray crossed 2 edges: into the right arm at x = 4, and out again at x = 6. From (1, 4) it crossed 3: odd, inside. / Look at the ray: at each numbered crossing it switches between solid (inside) and dashed (outside), and past the last crossing it is always outside. So counting back from the far end, an odd count means inside and an even count means outside, however central the point looks. The shape can have any number of notches. A ray through a corner exactly needs a tie rule; this stage keeps the point off corner heights."

## Pre-flight v3

r7 top finding: the Tried trace kept four of five positions, so (1, 4) with 3 crossings, which the reveal quotes, was gone at the reveal. Fix: a "Seen" line holds the two recorded points the reveal quotes (first gap point, first odd point) and never drops them; Tried now keeps five. No claim text changed. Not fixed, routed: r7's "should fix" that the drawn U lets the eye answer, so "count, don't look" has no job. That needs a new shape and new claims (learning-designer call).

1. **Title and hook.** "Is the point in the U?" / "A point sits between the arms of a U, near its middle. Inside or out? Count, don't look." Inside and Outside both stay open; "near its middle" leans toward the misconception, not the answer.
2. **Options.** "Inside" / "Outside" / "Cannot tell without the area": plain words, none numbered.
3. **Locked stage.** Unshaded U outline, point at (7, 4), grey dashed ray, caption "Ray to the right from the point. Count the edges it crosses.", Crossings "?", Verdict "?". No in/out label, no fill.
4. **Reveal values.** "(3, 4)", "2 edges", "x = 4 and x = 6": (b) recorded at milestone "notch" (the question's own case), on stage in the Seen line; x = 4 and x = 6 hold for every gap point (claim c4). "(1, 4)", "3", "odd, inside": (b) recorded at milestone "inside-odd", on stage in the Seen line. Paragraph 2 (solid/dashed, past the last crossing outside): general, points at the ray on the current stage.
5. **QA path.** DOM order (1, 4) (inside-odd), (3, 4) (notch): both milestones in 2 presses; (5, 4), (3, 1), (7, 4) follow. At the reveal the Seen line reads "Seen: (3, 4) 2 crossings, outside · (1, 4) 3 crossings, inside" and Tried lists all five.
6. **Reset.** No Reset control; moving the point never clears Seen. Reveal from that run: "In the gap, from (3, 4), the ray crossed 2 edges: into the right arm at x = 4, and out again at x = 6. From (1, 4) it crossed 3: odd, inside. Look at the ray: at each numbered crossing it switches between solid (inside) and dashed (outside), and past the last crossing it is always outside. So counting back from the far end, an odd count means inside and an even count means outside, however central the point looks. ..."

Not seen in a browser (no build/QA this wave).

## Pre-flight v4 (demo-builder, 2026-10-14, wave H, learner r8 / W-318)

Changes: when the reveal opens the stage draws the first odd-count point's ray again (readout label "Point (again)"; any tap or drag after that shows the learner's point), so "Look at the ray from (1, 4), drawn again above: at each numbered crossing ..." points at three numbered crossings on screen. The tie-rule sentence is cut (c3 withdrawn). New Point readout; at the reveal the note line (same words as the readouts) and the Tried trace (not quoted; the Seen line is) step aside. Presets fit one row (padding 8 px, 44 px tall). Seen line verdicts shortened to "in"/"out". Axis labels 9 → 10 px. Presets Row opts in to the fold (no Readout, reveal quotes the Seen line); on the QA path it does not pay, so nothing folds.

1. Title and hook: unchanged. (The r7/r8 should-fix, that looking answers the question, stays with the learning designer.)
2. Options: unchanged.
3. Locked stage: unchanged plus a Point readout "(7, 4)", which is where the dot is drawn.
4. Reveal values: (3, 4) and 2 crossings (b) notch milestone record; (1, 4) and 3 (b) inside-odd record, also the replayed ray and readouts at the reveal.
5. QA path: (1, 4), (3, 4), (5, 4), (3, 1), (7, 4); both milestones. At the reveal the stage shows (1, 4) again with crossings 1, 2, 3, solid/dashed stretches, and the Seen line.
6. Reset: none. Reveal (QA path, 83 words): "In the gap, from (3, 4), the ray crossed 2 edges: into the right arm at x = 4, and out again at x = 6. From (1, 4) it crossed 3: odd, inside. Look at the ray from (1, 4), drawn again above: at each numbered crossing it switches between solid (inside) and dashed (outside), and past the last crossing it is always outside. So odd means inside and even means outside, however central the point looks, with any number of notches."
7. Phone fit (reveal-fit, localhost:3530, 2026-10-14): crop 180 px → 0 px; hiddenBelow 0; namedHidden 0; phoneFit true; reveal 111 → 86 words as measured (verdict included). Stage 489 → 367 px. Screenshot: artifacts/reveal-fit/ray-counts-crossings.png.
