### 2026-10-16 · w1584-knot-specs-fold · interaction-designer
- did: Folded design-lead U-1, U-2, L-1..L-6 and cm-math-discrete W-1581 rulings into unknot-game and left-or-right specs; mockups regenerated at badge ring 13 (W-1584).
- learned: The kit already has a selected-but-disabled style: .control.active:disabled keeps opacity 1, so a disabled current chip need not look dead (src/app/globals.css).
- learned: The kit .stage is overflow auto, so a 3-D flip must get its room inside the lesson's own wrapper (8 % of card width above and below at perspective 1200), not by restyling .stage (src/app/globals.css).
- know: knots-batch1-mockups.mjs now prints the badge-edge gap with a 2.0 floor and agrees with the design lead's badge-probe.mjs at 2.43 units (company/design/specs/knots-batch1-mockups.mjs).
- know: left-or-right.md is now B2-only with A and B1 in an appendix; the seen line wording is cm-math-discrete's (company/design/specs/left-or-right.md).
- open: Dip and marks timing (L-2, L-3) are untested in a browser; design lead checks the built sheet S4 (company/design/reviews/2026-10-16-knots-specs-review.md).
