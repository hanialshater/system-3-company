# Fact-check: times-can-shrink (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read Demo.tsx v1 first (slider 0-2 in tenths, the three preset buttons, Area readout, dashed milestone traces, reveal with the recorded largest h above 1; hook and recall), then claim text and support, then source fields. No Reset or animation. Printed every slider value's readout in node.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node: area(7) = 6*7/100 = 0.42 -> '0.42'; 0.42 < 0.6 and 0.42 < 0.7. Reveal prints num(area(KEY10)) with the 'seven' milestone required. |
| c2 | verified | Derivation: for a rectangle of sides 0.6 and h (h = k/10), it is 6k cells of 0.1 x 0.1 = 0.01 each, area 6k/100 = 0.6h, the same rule as for whole sides. The shaded rect is (A10/10)U wide and (h10/10)U tall, so its drawn area is 0.6h of the unit square; the readout prints '0.6 × h = area' for all 21 slider values (own node, no float artefacts). |
| c3 | verified | Derivation: 0.6 x 0.7 = 0.7 of 0.6 (seven of the strip's ten tenths), 0.42 < 0.6. On the stage the shaded part at h = 0.7 covers 7/10 of the dashed 0.6 strip's height. |
| c4 | verified | Own node: area(10) = 0.6, area(15) = 0.9, and every h > 1 on the slider gives area > 0.6 (up to 1.2 at h = 2), so the reveal's 'at X, did it grow, to Y' is true for whichever largest h > 1 is recorded. General statement: a*b - a = a(b - 1), whose sign for a > 0 is the sign of b - 1. |

**Result:** all four verified. No disputes.
