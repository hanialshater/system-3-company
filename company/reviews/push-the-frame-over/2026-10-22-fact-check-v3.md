# Fact-check: push-the-frame-over (lesson version v3)

checker: fact-checker · date: 2026-10-22 · read first: artifacts/walkthroughs/push-the-frame-over/ (transcript.md, sheet.png), then meta.json claims, Demo.tsx and brief math.geometry.md #2. Builder notes and earlier reviews not read.

## Claims

| claim | status | how checked |
|---|---|---|
| math.push-the-frame-over.c1 | verified | Recomputed in node: 90° h 3.00 / area 12.0; 60° h 3 sin 60° = 2.598 → 2.60, area 10.392 → 10.4; 30° h 1.50, area 6.0. 12 sin θ → 0 as θ → 0 with sides unchanged. Readouts in every walkthrough frame, chip trace "4 × 1.50 = 6.0" and reveal all match frame() and the rounding (0.01 / 0.1). |
| math.push-the-frame-over.c2 | verified | Sides rigid, hinges turn only: perimeter 2 × (4 + 3) = 14 for every θ; readout "perimeter 14" in all states. |
| math.push-the-frame-over.c3 | verified | Left triangle (0,0),(c,0),(c,h) translated by +4 is (4,0),(4+c,0),(4+c,h), exactly the region right of the slanted side (4,0)–(4+c,h) inside [c,4+c]×[0,h]; the union is the rectangle 4 wide and h tall. The move needs c < 4; c = 3 cos θ ≤ 3, and the claim is scoped to this frame, so the overhang edge case cannot arise. Demo.tsx draws rect / ghost triFrom / moved triTo with these coordinates; screenshot 04-step-3 shows that picture. |
| math.push-the-frame-over.c4 | verified | Recall: base 5, height 1 (reachable, 2 sin 30° = 1 < 2), area 5 × 1 = 5; the "why" line's 10 = 5 × 2 is the upright area, correct. |

## Unrecorded claims

None found. Hook and predict are questions; the reveal's sentences map to c1, c2 and c3.

## Verdict

pass: all four claims verified.
