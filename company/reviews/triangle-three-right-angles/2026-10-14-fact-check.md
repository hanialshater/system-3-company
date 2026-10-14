# Fact-check: triangle-three-right-angles (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage, readouts, reveal), then re-derived or re-ran each claim in my own scripts (scratchpad fc1); sources corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Derivation (lune argument): the three pairs of lunes have area 4R^2(A+B+C) and cover the sphere once plus the triangle and its antipode three extra times, so 4R^2(A+B+C) = 4 pi R^2 + 4T, T = R^2(A+B+C-pi). For the stage's pole-equator triangle (90, 90, lambda) this is lambda R^2: node 10.626, 21.253, 42.505, 63.758, 95.637 M km2 at 15, 30, 60, 90, 135E, matching pass 4's geoArea values. |

**Result:** every claim verified or withdrawn.

## Pass 22

Checker: fact-checker (did not write these claims). Scope: the claims left unverified after the wave D wording reopen. Method: read Demo.tsx (and model.ts where used) against each sentence, then re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc22-5); sources opened where reachable, otherwise marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own derivation (lune argument): 4R^2(A+B+C) = 4 pi R^2 + 4T, so T = R^2 (A+B+C-pi); one degree of excess is (pi/180) R^2 / (4 pi R^2) = 1/720 of the sphere. Own node with the stage's cornerAngle and d3-geo geoArea (fc22-5/tri.mjs): geoArea x R^2 equals excess x R^2 to 3 d.p. at 30-150E. Todhunter not opened; not needed for the sentence. |
| c3 | verified | Own node: R = 6,371.0088 km; (pi/2) R^2 = 63.758 M km2 (geoArea agrees); 4 pi R^2 = 510.066 M km2; ratio 1/8 = 12.5%. Reveal text: '63.8 M km², one-eighth of the Earth's 510 M km²'. Spherical model disclosed. |
| c6 | verified | Own node with the stage's triangle(): sums 210, 240, 270, 300, 330 degrees; shares 4.2%, 8.3%, 12.5%, 16.7%, 20.8% via pct() (toFixed(1)); equals (L/720) x 100. Slider runs 30-150 in steps of 30. |

**Result:** every claim in this pass verified.
