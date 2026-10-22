# Build note: ant-on-a-cube

builder: demo-builder (Meta M6, order O-2) · 2026-10-22 · v1 · brief: company/domains/briefs/math.geometry.md, Wave J, brief 4 (check G4) · design: company/reviews/ant-on-a-cube/design.md

- Intent: a 1 m cube in a cabinet view (viewBox 320 × 212, 120 px per metre, depth up-right at half scale, 35°). Routes are 3D point lists; their lengths are computed in `lengthOf()` (Demo.tsx), not typed: edges 3.00, diagonal then edge 2.41, bent path 2.24 m; the net's line is `hypot(2, 1)` = 2.24 m. "Unfold two faces" swings the right face about the front-right edge (`swing()`, ~350 ms ease, instant with reduced motion) until it lies flat: the 2 by 1 net. "Fold back up" swings it back with the same line drawn, so the learner sees the straight line become the bent path through the edge midpoint.
- Controls in brief order: "Along the edges", "Diagonal then edge", "Unfold two faces", "Fold back up", Reset. Shown state's chip active and disabled; Reset disabled at the start frame.
- Deviations from the brief, for cm-math:
  1. **Faces unfolded: front and right, not top and front.** The brief's phone-fit line (net in 300 × 150 px) needs a horizontal 2 by 1 net; top + front unfold into a vertical 1 by 2 net (240 px tall at this scale), which would cost the reveal its fit. Front and right are an equivalent pair by symmetry (same √(1² + 2²), same midpoint crossing). The reveal and claims say "two faces", as the brief's reveal does. Net drawn 240 × 120 px.
  2. **Start frame has no route and no readout** (the brief's stage line shows "length 3.00 m"). That way every chip is enabled at the start, "Along the edges" is a real press on the QA path (chips 1 to 4, as the brief's QA path says), and the locked frame shows no length at all.
  3. **Predict question** made a second-person scene with the condition "never leaving the surface" (copy-style.md): "You watch an ant on the outside of a 1 m cube. It walks from one bottom corner to the top corner farthest from it, never leaving the surface. Its shortest walk is about…" (32 words). Options unchanged.
  4. **Reveal**: the first sentence names only the routes the learner tried; numbers use the stage rounding ("3.00 m"); "crossing the shared edge at its midpoint" became "Folded back up, it bends across the shared edge at its midpoint, and no route over other faces is shorter" so it points at the fold-back state and states claim 3. 82 words by the tool (≤ 90).
  5. **Claims**: the brief planned 3; I added c4 for the told sentence "On a flat sheet a straight line is shortest …" and c5 for the recall (2 m cube). Net side labels are "1 m" and "2 m" (0 words).
  6. **Trace after Reset**: once the fold-back milestone fires, Reset leaves the bent path as a faint dashed green line on the cube, so the state the reveal names is on the stage when it opens (brief: "it persists into the reveal").
- Stage words (demo-standard counting, units after numbers 0): chips 13 ("Along the edges" 3, "Diagonal then edge" 3, "Unfold two faces" 3, "Fold back up" 3, "Reset" 1) + readout "length" 1 = 14 in every frame; the net's "√(1² + 2²) = 2.24 m", "1 m", "2 m" and the traces "✓ 2.24 m" count 0. Brief: 16 spaced / 14 fused. ≤ 25.
- Title and hook are mine (brief gives none): "How short is the ant's walk over a cube?" (40 chars) / "An ant walks on the outside of a 1 m cube to the far corner. How short can its walk be?" (87 chars).

## Pre-flight v2

Revise from fact-check 2026-10-22 (overgeneral wording, 2 instances). Mechanics, stage, chips, milestones and routes unchanged from v1.

1. Title, hook, prediction and options: unchanged from v1 (item 1 to 3 hold).
2. Reveal paragraph 2 now reads "Unfolding the front and right faces into a flat 1 by 2 rectangle …": the front face holds the ant's corner, the right face the far corner; these are the two faces the stage swings flat (net front [0,1]² + right [1,2]×[0,1]). Claim c2 names the same pair.
3. Reveal last sentence now "On a flat sheet a straight line is shortest, so the best walk over a box is found by unfolding it." Claim c4 scoped to a box / convex flat-faced surface.
4. Reveal values and their milestones: as v1 item 4 (3.00 m, 2.41 m, 2.24 m from the recorded seen values).
5. Claims: c2 and c4 text changed; c1, c3, c5 were verified during this order; all five set to `unverified`, no checkedBy/checkedOn. meta.version 2. meta.learner.doesNotKnow scoped to a box.
6. Phone fit: reveal is two words longer than v1 ("two" → "the front and right"; "surface" → "box"), about 84 by the tool count, under 90. `node tools/reveal-fit.mjs --url http://localhost:3102 ant-on-a-cube` on a fresh production build of this worktree: fit 1, cropped 0, namedHidden 0, phoneFit 1, pass 1. tsc clean, next build exit 0 (tsconfig.json rewrite reverted). Official QA is code's qa stage.

## Pre-flight v1

1. Title and hook: "How short is the ant's walk over a cube?" / "An ant walks on the outside of a 1 m cube to the far corner. How short can its walk be?" Both pose the question; neither names a route, unfolding or a length.
2. Options: "2.2 m" / "2.4 m" / "3.0 m": all numbered, one decimal, same unit.
3. Locked stage: the cube, the ant ring at the bottom-front-left corner, the far corner ring, the edge label "1 m", four chips without traces, Reset disabled. No route, no readout, no line: nothing matches 2.2 m.
4. Reveal values: "3.00 m" = LEN.edges recorded at the "Along the edges" press (milestone `route`, trace "✓ 3.00 m"); "2.41 m" = LEN.diag recorded at "Diagonal then edge" (milestone `route`, trace "✓ 2.41 m"); the first sentence names only the routes pressed; "1 by 2 rectangle", "√(1² + 2²)", "about 2.24 m" = the net, milestone `flat` (recorded LEN_FLAT, trace "✓ 2.24 m", the net's own labels); "Folded back up, it bends across the shared edge at its midpoint" = milestone `folded` (trace "✓ 2.24 m" and the dashed bent path that stays after Reset); "no route over other faces is shorter" and "On a flat sheet …" = claims c3, c4 (told, not learner state).
5. QA path: pressing each control once in DOM order, waiting 450 ms (swing takes 350 ms): Along the edges (`route`), Diagonal then edge, Unfold two faces (`flat`), Fold back up (`folded`), Reset. All three milestones by press 4. After Reset the traces and the dashed bent path stay on the stage (390×844 screenshots of each state, scratch, not committed).
6. Reset: after the five presses the reveal read: "Not quite: it was “2.2 m”. | Along the edges was 3.00 m and the face diagonal plus an edge 2.41 m. | Unfolding two faces into a flat 1 by 2 rectangle turned the walk into one straight line, √(1² + 2²) = √5, about 2.24 m. Folded back up, it bends across the shared edge at its midpoint, and no route over other faces is shorter. | On a flat sheet a straight line is shortest, so the best walk over a surface is found by unfolding it." Matches the traces and the dashed path.
7. Phone fit: `node tools/reveal-fit.mjs --url http://localhost:3102 ant-on-a-cube --shots` on a production build of this worktree (.next-LESSON-ant-on-a-cube): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; reveal 82 words (tool count, verdict line included), 12 lines; parts picture 183 px, controls 149 px. Screenshot artifacts/reveal-fit/ant-on-a-cube.png (git-ignored): the cube, all chips with traces and the whole reveal on one screen.

## Measurement v1 (demo-builder, 2026-10-22)

- SVG scale at 390×844 (getScreenCTM): 0.90. Labels 13 px → 11.7 px on screen; readout 15 px → 13.5 px (floor 10). Targets min-height 44 px.
- Console on the lesson page: one 404 for /api/account/me, which other lessons (three-sticks-one-triangle) show on the same local server: environment, not this lesson.
- `npm run registry` regenerated the two index files. `tsc --noEmit`: clean. `next build`: exit 0 (tsconfig.json include rewrite reverted). `npm run check`: nothing for this slug.
- Official QA is code's qa stage; not run by me.
