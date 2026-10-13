# Build note: euclid-leftover-rectangle (demo-builder, 2026-10-13)

- Design intent: one 48 by 18 floor drawn to scale. "Cut one square" removes the biggest square that fits the leftover; "Cut until none left" makes the rest. Every cut square stays on the floor, labelled with its side (18, 18, 12, 6, 6), so the run button does not hide the steps the reveal quotes. After the last cut, "Tile the floor with the last square" overlays the 6-grid (8 × 3 = 24).
- Key state: leftover gone (last strip 12 × 6 split into two 6s), then the 6-grid over the whole floor. Milestones ["tiled", "whole-floor"], minInteractions 2. QA path: Cut one, Cut until none left, Tile.
- Numbers: sides, strip, 6, 8, 3, 24 and "5 cuts" come from cuts() in Demo.tsx. Re-computed in Node: [18,18,12,6,6], gcd 6; 9 does not divide 48.
- The word "gcd" and "mod" never reach the learner; the reveal says "biggest common tile".
- Retitled: slug "leftover-rectangle" is fine but abstract; title "The biggest tile for a 48 by 18 floor".
- After screenshots: reads on phone; the "12" label sits on a dashed overlay line after tiling, acceptable.
