# Fact-check: mercator-greenland (2026-10-14)

## Pass 26 (2026-10-14, batch 2, wave G revisions)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx first (every learner-visible string, every reachable branch, Reset/Start over where it exists, reduced motion where it applies; this lesson has no motion-dependent text), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc26-b2/). No builds. No sentence below is verified on an unopened source; external hosts failed DNS this pass.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Own d3-geo run with the lesson's geoMercator: projected area / true area of a small cell, relative to the equator, is 1.136, 1.717, 4.061, 12.04, 34.88 at 20, 40, 60, 73, 80°, matching 1/cos² of the cell centre to 3 decimals. The reveal states only the direction ("more the farther from the equator"), which holds. |
| c13 | verified | Construction: longitude linear in ln tan(45° + lat/2) is the definition of a rhumb line on Mercator; per-sample great-circle bearings stay 37.2-37.9° (one bearing up to the chord effect). Own d3-geo run on the lesson projections: rendered Mercator path deviates from its chord by at most 0.001 px (straight); on Equal Earth the same points bow 2.8 px off the chord of a 137 px line, so it is bent. Advisory, not a dispute: a 2.8 px (2%) bow on a dashed line may not read as "bent" on a phone; QA or a learner review should confirm it is visible. |

**Result:** 2 verified, 0 disputed, 0 held unverified.
