# Fact-check: torch-underwater-tilt (2026-10-13)

## Pass 8 (2026-10-13)

Checker: fact-checker. Method: re-derived numbers in node from the lesson's model/Demo code; checked sources on the web; compared claims with the stage text.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Snell's law n1 sin1 = n2 sin2 with n_water = 1.333, n_air ~ 1.00. |
| c2 | verified | node: asin(1/1.333) = 48.61 degrees. |
| c3 | verified | node: 45 degrees gives 70.49; 30 degrees gives 41.80; 60 degrees is total internal reflection. |
| c4 | verified | node: Fresnel unpolarised reflectance 2.0% at 0 degrees, 2.6% at 30, 5.6% at 40, 13.9% at 45; 100% at the critical angle (0.914 already at 48.6, very steep). Reveal's 'most of the light got out (86%)' at 45 degrees is consistent. |
| c5 | verified | Stated idealisations; dispersion shifts the critical angle by a fraction of a degree. |
