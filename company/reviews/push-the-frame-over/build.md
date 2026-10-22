# Build note: push-the-frame-over

builder: demo-builder (Meta M6, order O-1) · 2026-10-22 · v1 · brief: company/domains/briefs/math.geometry.md, Wave J, brief 2 (check G2) · design: company/reviews/push-the-frame-over/design.md

- Intent: `frame(angle)` in Demo.tsx gives the top edge's offset c = 3 cos θ, height h = 3 sin θ, area 4h, perimeter 14. Values (stage rounding): 90° → h 3.00, area 12.0; 60° → h 2.60, area 10.4; 30° → h 1.50, area 6.0 (G2: 12.00 / 10.39 / 6.00).
- Controls in brief order: "Lean to 60°", "Lean to 30°", "Cut and slide", "Upright", Reset. Shown angle's chip active and disabled; Cut and slide is a toggle (aria-pressed), disabled while upright; Reset disabled at the start state.
- Deviations from the brief, for cm-math:
  1. Phone fit: the brief asks for a 320 × 200 stage at 60 px per unit, but a 4 by 3 frame leaning at 30° spans 4 + 3 cos 30° ≈ 6.6 units (396 px at 60 px/unit). I used a 340 × 200 viewBox at 46 px per unit (304 px widest), the same box as `three-sticks-one-triangle`.
  2. Readout split over two lines ("sides 4 and 3 · perimeter 14" / "height 1.50 · area 6.0"), same words as the brief.
  3. Predict question recast as a second-person scene with "hinged corners" stated (copy-style.md); options "It stays the same" / "It shrinks" / "It grows".
  4. "Cut and slide" is disabled while upright (no slanted end to cut; an enabled no-op would fail QA rule 3). Upright and Reset both return to the start state (the brief lists both); after the QA path presses Upright, Reset is disabled.
  5. Trace "✓ 4 × 1.50 = 6.0" under the Cut chip: 0 words (numerals), so the quoted state stays on the stage after Reset.
  6. Claim c1 also carries the reveal's "base times height, not base times slanted side" and "pushed flat … goes to nothing" sentences; c4 is added for the recall (brief planned 3 claims).
- Stage words, busiest frame: readout 5 (sides, and, perimeter, height, area) + "h" 1 + chips 9 (Lean to ×2 = 4, Cut and slide 3, Upright 1, Reset 1) = 15, as the brief's closed list. Side labels "4", "3" and the trace are numerals (0).
- Title and hook are mine: "Does a leaning frame hold as much?" / "A hinged frame leans over. Every side keeps its length. Does the space inside change?"

## Pre-flight v1

1. Title and hook: "Does a leaning frame hold as much?" / "A hinged frame leans over. Every side keeps its length. Does the space inside change?" Both are questions; neither says shrinks, stays or grows.
2. Options: "It stays the same" / "It shrinks" / "It grows": all words, none numbered, same precision.
3. Locked stage: upright 4 by 3 frame, dashed "h" along the left side, readout "sides 4 and 3 · perimeter 14" / "height 3.00 · area 12.0", chips without traces. That is the starting frame of the question; nothing is drawn for a lean, and no label matches an option.
4. Reveal values: "every side and the perimeter at 14" = readout, constant on the stage; "height fell to {h}", "area to {A}", "only {h} tall" = recorded when `cutWhileLeaning` fires (milestone on the required path; trace "✓ 4 × 1.50 = 6.0"); "4 wide" = the base, on the stage. Nothing else is a number.
5. QA path: Lean to 60° (`leaned`), Lean to 30°, Cut and slide (`cutWhileLeaning` at 30°), Upright, Reset (disabled after Upright): both milestones by press 3; the quoted h and area stay on the Cut chip's trace after Upright/Reset.
6. Reset: after the QA path the reveal read (reveal-fit run, screenshot below): "Leaning kept every side and the perimeter at 14, but the height fell to 1.50 and the area to 6.0. Cutting off the slanted end and sliding it across made a rectangle 4 wide and only 1.50 tall. | A parallelogram's area is base times height, not base times slanted side. Push the frame flat and its area goes to nothing while its sides stay the same." Matches the trace "✓ 4 × 1.50 = 6.0".
7. Phone fit: `node tools/reveal-fit.mjs --url http://localhost:3101 push-the-frame-over --shots` on a production build of this worktree (NEXT_DIST_DIR=.next-LESSON-push-the-frame-over): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; reveal 72 words (tool count, verdict line included); picture 169 px, controls 97 px. Screenshot artifacts/reveal-fit/push-the-frame-over.png (git-ignored): frame, readouts, all chips with the trace and the whole reveal on one screen.

## Measurement v1 (demo-builder, 2026-10-22)

- Picture scale at 390×844: 1.07 (reveal-fit picScale), so the 12 px side labels render ≈ 12.8 px and the 13 px readout ≈ 13.9 px (≥ 10 px floor). Targets min-height 44 px.
- `npm run check`: nothing for this slug. `tsc --noEmit`: clean. `next build`: exit 0 (tsconfig.json and src/data/editorial-profiles.account.json build rewrites reverted). `npm run registry` regenerated the two index files.
- Official QA is code's qa stage; not run by me.
