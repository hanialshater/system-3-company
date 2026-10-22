# Fact-check: push-the-frame-over v1

checker: fact-checker · date: 2026-10-22 · verdict: **revise**

Read in this order: artifacts/walkthroughs/push-the-frame-over/transcript.md and its screenshots (01–06, sheet.png), then meta.json claims, Demo.tsx and the brief (company/domains/briefs/math.geometry.md:29-46). I did not read build.md or design.md.

## Re-derivations

- Frame on base 4 with 3-long sides at angle θ: top edge at height h = 3 sin θ, so area = 4 × 3 sin θ = 12 sin θ. 90°: h 3.000, area 12.000. 60°: h 2.598 → 2.60, area 10.392 → 10.4. 30°: h 1.500, area 6.000. `node company/domains/briefs/checks/math-wave-j-check.mjs` G2 prints the same values. As θ → 0, sin θ → 0, so the area goes to 0 while the sides stay 4 and 3. Base × slanted side = 12 for every θ, so it cannot be the area of a leaning frame.
- Perimeter: the sides are rigid, so it is 2 × (4 + 3) = 14 for every θ.
- Dissection (c = 3 cos θ): the left triangle (0,0),(c,0),(c,h), moved 4 to the right, becomes (4,0),(4+c,0),(4+c,h). Together with the rest of the parallelogram, (c,0),(4,0),(4+c,h),(c,h), it fills the rectangle x ∈ [c, 4+c], y ∈ [0, h]. That rectangle is 4 wide and h tall, so its area is the same (Euclid I.35). The claim text is true.
- Recall: base 5, top 1 above the base: area 5 × 1 = 5 (2 sin 30° = 1). The answer index 2 is "5". The "why" text is correct.

## What the stage actually shows (defect)

After "Cut and slide", the stage at 30° (04-step-3.png) does not show a 4 by 1.50 rectangle. Demo.tsx fills `rect = [[g.c,0],[BASE,0],[BASE,g.h],[g.c,g.h]]`, which runs only from x = c to x = 4: 1.40 wide at 30° and 2.50 at 60°. It also fills the moved triangle `triTo`. The triangle (4,0),(4,h),(4+c,h) inside the frame is left unfilled, so the picture shows a narrow rectangle and a separate triangle with a dark gap between them. The filled area shown is 4.05 at 30° and 8.44 at 60°, not 6.0 and 10.4. Next to it, the chip trace "✓ 4 × 1.50 = 6.0" and the reveal ("made a rectangle 4 wide and only 1.50 tall") claim a 4-wide rectangle that the picture contradicts. This is the claim the stage actually makes, and it is false.
→ Required: the filled rectangle in the cut state must be x from c to 4 + c: `[[g.c,0],[BASE+g.c,0],[BASE+g.c,g.h],[g.c,g.h]]` (or the remaining parallelogram piece plus `triTo`). The filled shape must then be a single 4 × h rectangle at both 60° and 30°.

## Claim status changes

| claim | new status | note |
|---|---|---|
| math.push-the-frame-over.c1 | verified | Re-derived 12 sin θ and 3 sin θ at 90/60/30. G2 agrees. Rounding is correct. |
| math.push-the-frame-over.c2 | verified | 2 × (4 + 3) = 14 for every θ. Rigid sides. |
| math.push-the-frame-over.c3 | disputed | The text is true (re-derived, Elements I.35). The stage's cut-and-slide picture contradicts it: the filled rect spans only x = c to 4 (1.40 × 1.50 at 30°), leaving a gap, so the shape shown is not a 4-wide rectangle. Fix the rect to x = c to 4 + c. |
| math.push-the-frame-over.c4 | verified | 5 × (2 sin 30°) = 5. The recall answer and "why" are correct. |

## Unrecorded claims

None. The hook, predict premise, readouts, chip trace, reveal and recall map to c1–c4.
