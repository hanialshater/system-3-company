# Fact-check: push-the-frame-over (v2)

checker: fact-checker · date: 2026-10-22
Read first: artifacts/walkthroughs/push-the-frame-over/transcript.md, sheet.png and 04-step-3.png; then meta.json, Demo.tsx, brief math.geometry.md #2 (G2). Builder notes and earlier reviews not read.

| Claim | New status | Basis |
|---|---|---|
| math.push-the-frame-over.c1 | verified | I recomputed h = 3 sin θ = 3.000, 2.598, 1.500 and area = 12 sin θ = 12.000, 10.392, 6.000 at 90°, 60° and 30°. These round to the stage readouts (3.00/12.0, 2.60/10.4, 1.50/6.0). h → 0 as θ → 0 with the sides fixed. This agrees with G2 and frame(). |
| math.push-the-frame-over.c2 | verified | The perimeter is 2 × (4 + 3) = 14 for every θ. G2 prints 14 at all three angles, and so does the stage. |
| math.push-the-frame-over.c3 | disputed | It is right for this frame: the overhang c = 3 cos θ ≤ 3 < 4, so the foot of h lands on the base, and the 04-step-3 picture (ghost triangle at the left, moved triangle filling the right end, rectangle from x = c to 4 + c) matches rect/triFrom/triTo. But the claim states it for "a parallelogram" in general, and that is false when the top overhangs the base by more than the base length. |
| math.push-the-frame-over.c4 | verified | Sides 2 at 30° give height 1, so the area is 5 × 1 = 5. The recall answer "5" (index 2) and its why text are correct. |

## Findings (class: general rule stated beyond the case where it holds)
1. c3 text "Cutting the right triangle off the slanted end of a parallelogram and sliding it across to the other end makes a rectangle…" → this is false in general. Counterexample: base 1, slanted side 3 at 30°, overhang 2.6 > 1. The right triangle under the slanted side is then not inside the parallelogram, so one cut and slide does not make the rectangle. (The area is still base × height, by Euclid I.35, but not by this dissection.) Required: scope the claim to this frame ("of this frame", or "of a parallelogram whose top overhangs the base by less than the base length; this frame's overhang is at most 3, less than 4").

## Other checks (no defect)
- Reveal: "the perimeter at 14" → c2. "height fell to 1.50 and area to 6.0" and "rectangle 4 wide and 1.50 tall" → c1/c3, both right for this frame. "A parallelogram's area is base times height" is true in general (I.35) and is covered by c1. "Push the frame flat… area goes to nothing" → c1.
- The chip trace "✓ 4 × 1.50 = 6.0" is correct.

Verdict: revise (c3 disputed).
