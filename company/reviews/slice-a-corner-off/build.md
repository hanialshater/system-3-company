# Build note: slice-a-corner-off

builder: demo-builder (Meta M6, order O-3) · 2026-10-22 · v1 · brief: company/domains/briefs/math.geometry.md, Wave J, brief 5 (check G5) · design: company/reviews/slice-a-corner-off/design.md

- Intent: solids are vertex and face lists (Demo.tsx `CUBE`, `PYR`); `slice()` cuts the corner nearest a point by moving t of the way along each edge there (cube t = 0.3, pyramid tip t = 0.35), replaces the corner in each face by two cut points and adds the ring of cut points as a new face. `counts()` recounts V, E (distinct face sides) and F from the drawn solid. Browser recount at each state: cube 8, 12, 6; one slice 10, 15, 7; two 12, 18, 8; pyramid 5, 8, 5; tip sliced 8, 12, 6; every total 2 (matches G5).
- Hidden edges: an edge is drawn solid if either of its faces faces the viewer (rotated Newell normal z > 0), else dashed and muted.
- Controls in brief order: "Slice a corner", "Slice another", "Square pyramid", "Slice its tip", Reset. Shown state's chip active and disabled; "Slice another" is enabled only on the once-sliced cube, "Slice its tip" only on the unsliced pyramid (brief), "Slice a corner" from the plain cube or either pyramid, Reset away from the plain cube.
- Deviations from the brief, for cm-math:
  1. Added the readout key "corners − edges + faces" (3 words; the brief allows it: 17). Busiest frame: key 3 + change line 3 + chips 11 = 17 ≤ 25. Traces are numerals and signs (0).
  2. Predict question recast as a second-person scene ("You hold a wooden cube … with a knife"), copy-style.md.
  3. Phone fit: picture 340 × 236 viewBox, drawn 200 px tall at 390×844 (brief: solid 220 px); the readout sits above the solid, not under it, so the change line is next to the numbers it explains.
  4. Claim c3 has support `source` (the CLI accepts derivation, simulation, source, convention; the brief says "citation").
- Title and hook are mine: "Does slicing a corner change the count?" / "A cube: 8 corners − 12 edges + 6 faces = 2. Slice one corner off. Does the 2 survive?"

## Pre-flight v2

Revise from fact-check 2026-10-22 (overgeneral rule wording, 1 instance in claim and reveal). Stage, chips, milestones, counts and traces unchanged from v1.

1. Reveal paragraph 2 now reads "A small slice that cuts only the k edges at a corner always adds k − 1 corners, k edges and 1 face." Every slice the stage draws cuts only the edges at its corner (new corners on those edges, not at neighbouring corners), so the stage and the rule agree.
2. Claim c2 text scoped the same way; c1, c3, c4 text unchanged.
3. All four claims set to `unverified`, no checkedBy/checkedOn (c1, c3, c4 were verified during this order). meta.version 2.
4. Reveal values and milestones: as v1 Pre-flight (recorded seen values, change lines +2/+3/+1 and +3/+4/+1).
5. Phone fit: reveal two words longer than v1 (77 → about 79 by the tool count), under 90; v1 fit with room to spare. Official QA and reveal-fit are code's qa stage.

## Pre-flight v1

1. Title and hook: "Does slicing a corner change the count?" / "A cube: 8 corners − 12 edges + 6 faces = 2. Slice one corner off. Does the 2 survive?" Both are questions; neither says it stays 2.
2. Options: "Less than 2" / "Still 2" / "More than 2": all three name 2, none more precise than another.
3. Locked stage: the whole cube, key, readout "8 − 12 + 6 = 2" (the question's own given), no change line, no traces. Nothing shows a sliced solid.
4. Reveal values: "lost 1 corner and made 3", "+2 corners, +3 edges and +1 face", "2 − 3 + 1 = 0", "the total stayed 2" = recorded at `cubeSliced` from the recounted solids (trace "✓ +2 − 3 + 1 = 0"); "where 4 edges meet", "+3 − 4 + 1 = 0" = recorded at `tipSliced` (trace "✓ +3 − 4 + 1 = 0"). The k rule and "every convex solid … 2" are claims c2 and c3, not states.
5. QA path: Slice a corner (`cubeSliced`), Slice another, Square pyramid, Slice its tip (`tipSliced`), Reset: both milestones by press 4; both quoted changes stay on the chip traces after Reset.
6. Reset: after the five presses the reveal read (reveal-fit run): "Slicing a corner off your cube lost 1 corner and made 3, so +2 corners, +3 edges and +1 face: 2 − 3 + 1 = 0, and the total stayed 2. The pyramid's tip, where 4 edges meet, gave +3 − 4 + 1 = 0 too. | A slice through a corner where k edges meet always adds k − 1 corners, k edges and 1 face. For every convex solid the total is 2: Euler's formula." Matches the traces.
7. Phone fit: `node tools/reveal-fit.mjs --url http://localhost:3103 slice-a-corner-off --shots` on a production build of this worktree (NEXT_DIST_DIR=.next-LESSON-slice-a-corner-off): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; reveal 77 words (tool count); picture 200 px, controls 149 px. Screenshot artifacts/reveal-fit/slice-a-corner-off.png (git-ignored): cube, readout, all chips with both traces and the whole reveal on one screen.

## Measurement v1 (demo-builder, 2026-10-22)

- Picture scale at 390×844 ≈ 0.85 (200 px drawn of a 236 viewBox): key 12 px → ≈ 10.2 px, change line 13 px → ≈ 11 px, readout 18 px → ≈ 15 px (≥ 10 px floor). Targets min-height 44 px.
- `npm run check`: nothing for this slug. `tsc --noEmit`: clean. `next build`: exit 0 (tsconfig.json and src/data/editorial-profiles.account.json build rewrites reverted). `npm run registry` regenerated the two index files.
- Official QA is code's qa stage; not run by me.
