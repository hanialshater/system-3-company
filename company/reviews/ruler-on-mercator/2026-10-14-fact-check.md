# Fact-check: ruler-on-mercator (2026-10-14)

## Pass 26 (2026-10-14, batch 2, wave G revisions)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx first (every learner-visible string, every reachable branch, Reset/Start over where it exists, reduced motion where it applies; this lesson has no motion-dependent text), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc26-b2/). No builds. No sentence below is verified on an unopened source; external hosts failed DNS this pass.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own d3-geo run on the lesson projection (rotate -40, its scale): screen length per ground km, relative to the equator, both east-west and north-south, is 1.1547, 1.4142, 2.0000, 2.3662 at 30, 45, 60, 65°, equal to 1/cos(lat) to 4 decimals; it rises with latitude and is 2.00 at 60°. The stage readout stretchText(60) = "2.00×", and the Seen line records it at the 60°N milestone. |

**Result:** 1 verified, 0 disputed, 0 held unverified.

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: geography/ruler-on-mercator v3. Method: read Demo.tsx first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own d3-geo run on the lesson projection (rotate −40, its scale): screen length per ground km relative to the equator, east-west and north-south, is 1.1547, 1.4142, 2.0000, 2.3662 at 30, 45, 60, 65°, equal to 1/cos(lat) to 3-4 decimals. Re-derived: y = R ln tan(π/4 + φ/2), dy/dφ = R sec φ, and the parallel's ground length is R cos φ per radian of longitude. stretchText(60) = '2.00×', recorded in the Seen line. Snyder not opened; not needed. |
| c5 | verified | For this lesson's (tangent) Mercator map, the stretch sec φ equals 1 only at φ = 0 (own scan of −4..68°: only 0), so a fixed scale bar is true only along the equator. The reveal sentence is about this map ('The stretch grows toward the poles, so one scale bar is true along only one line'). Note: the claim text 'on a world map' read generally would be too broad (secant and equidistant projections differ); verified as scoped by its source note to this map. |
| c6 | verified | Demo.tsx: eqY = projection([40, 0])[1] (own d3-geo: y = 250.26 of 262), a full-width dashed line at that y and the text 'equator' 4 px above it, from the same projection as the bar. |
