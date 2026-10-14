# Build note: quarters-add-to-a-third

builder: demo-builder (builder-wavej-math) · 2026-10-14 · v1 draft · brief: company/domains/briefs/math.algebra.md, Wave J, brief 5

- Intent: one 232 px square. Level k splits the leftover top-right corner into four: top-left solid (`var(--domain)`), bottom-left dotted, bottom-right hatched, top-right left over (dashed outline). Patterns are user-space SVG patterns (5 px), ids made unique with useId. Readout "Level 2 · solid: 0.3125 of the square" (4 decimals), second line "Left over: 0.0625" until level 6, then "Level 6: solid, hatched, dotted 0.3333 each".
- Controls in brief order: Step (to level 8 max), "To level 6" (active and disabled at 6), and Reset.
- Reset is "Reset to level 1", not level 0: formats.md says "No reset that empties it", and the reveal points at the three matching patterns. At level 1 the three patterns are still drawn and the level-6 trace line stays. Enabled only above level 1, so no press is a no-op.
- Milestones (minInteractions 2): "two-levels" (level ≥ 2), "level-six" (value recorded).
- Title and hook are mine: "Quarters of quarters, forever" / "Add 1/4, then a quarter of that, then a quarter of that… Where does the total settle?"
- Recall uses the thirds series (→ 1/2) so it needs the idea, not the wording.

## Pre-flight v1

1. Title and hook: neither names 1/3, 1/2 or 3/8.
2. Options: "1/2" / "3/8" / "1/3": all fractions.
3. Locked stage: the plain square, "Level 0: the whole square". No colours.
4. Reveal values: level 6 and 0.3333 (milestone "level-six", recorded; trace line); "three patterns always matched" (construction, visible at every level ≥ 1 and in the trace line).
5. QA path: Step (level 1), To level 6 (two-levels and level-six), Reset to level 1: both by press 2.
6. Reset: reveal reads "By level 6 the solid pieces covered 0.3333 of the square. At every level the corner split into four: one solid, one hatched, one dotted, one left over. ..."; the stage shows level 1's three patterns and "Level 6: solid, hatched, dotted 0.3333 each".
7. Phone fit: see the measurement section below.
