# Fact-check: ruler-on-mercator (2026-10-14)

## Pass 26 (2026-10-14, batch 2, wave G revisions)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx first (every learner-visible string, every reachable branch, Reset/Start over where it exists, reduced motion where it applies; this lesson has no motion-dependent text), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc26-b2/). No builds. No sentence below is verified on an unopened source; external hosts failed DNS this pass.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own d3-geo run on the lesson projection (rotate -40, its scale): screen length per ground km, relative to the equator, both east-west and north-south, is 1.1547, 1.4142, 2.0000, 2.3662 at 30, 45, 60, 65°, equal to 1/cos(lat) to 4 decimals; it rises with latitude and is 2.00 at 60°. The stage readout stretchText(60) = "2.00×", and the Seen line records it at the 60°N milestone. |

**Result:** 1 verified, 0 disputed, 0 held unverified.
