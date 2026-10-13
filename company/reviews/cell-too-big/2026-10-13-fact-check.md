# Fact-check: cell-too-big (2026-10-13)

Checker: fact-checker (independent). Script: inline node arithmetic (see Basis). Stage text from the walkthrough transcript; Demo.tsx read for the shade rule.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Width 1: surface 6, volume 1, ratio 6; width 5: 150/125 = 1.2; width 10: 600/1000 = 0.6, ten times smaller. Stage slider runs 1-10 so the shade floor (0.06) is never reached; shade = 1/w. |
| c2 | verified | Nutrient and waste exchange across the surface limits cell size, and folds such as intestinal microvilli add surface: supported by the literature found (for example the review "What determines cell size?", PMC3522064, and microvilli work in the intestinal brush border). The cited sources in the ledger are generic textbooks with no chapter or page; replace with a specific citation when convenient. The claim is hedged ("one reason"), which matches the literature: recent work on mammalian cells (2024 preprint) argues surface-to-volume can stay roughly constant through membrane folding, which fits the "or fold their surfaces" clause rather than contradicting it. |
| c3 | verified | Scaling all lengths by k multiplies area by k^2 and volume by k^3, so area/volume falls by 1/k for any shape. |
| c4 | verified (convention) | Shade = max(0.06, 1/w), i.e. surface per unit of inside relative to the width-1 cell; matches the stage label. |

No unrecorded claims found.
