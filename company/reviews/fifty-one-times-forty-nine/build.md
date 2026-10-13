# Build note: fifty-one-times-forty-nine (demo-builder, 2026-10-13)

- Intent: a 50 x 50 square drawn to scale (4 px per unit). "Move the strip" turns the bottom strip of width d a quarter turn about the square's bottom-right corner, standing it along the right edge; the block becomes (50 + d) x (50 - d) and the strip's last d x d piece hangs below, ringed in red.
- Key state (two milestones): strip moved at d = 1 (the question's 51 x 49), then moved at another width. QA path: toggle first, then the slider (1 -> 3).
- Numbers: question, caption and reveal compute from A = 50, KEY_D = 1 and the slider; the caption reads (50 + d) x (50 - d) = 2500 - d² = product.
- Deviation from brief: the brief's "strip from the right edge to the bottom" is mirrored (bottom to side); the geometry and the notch are the same. Drag is a toggle (animated quarter turn) plus a width slider.
- After screenshots: the 1 x 1 piece is 4 px at d = 1, so it carries a ring and a "1 x 1" label; moved the label under the ring so it cannot clip at d = 10.
- All numbers recomputed with node; all claims unverified, for the fact-checker.
