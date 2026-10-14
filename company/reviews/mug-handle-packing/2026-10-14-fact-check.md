# Fact-check: mug-handle-packing

Independent claim checks for src/demos/lifehacks/mug-handle-packing. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx and the shared Life Hacks engine (src/components/lifehacks/, src/lib/lifehacks/) first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| recall | verified | Read the handle-envelope scene first; the stage draws the handles along the row. The recall question now states 'a 3 cm handle pointing along the row'. Arithmetic: 9 + 3 = 12 and floor(48/12) = 4; body only, floor(48/9) = 5, which would need 4 handle gaps of 3 cm (57 cm > 48). Even with handles interleaved two to a gap, 5 cups need 45 + 3 × 3 = 54 cm > 48, so 4 is the maximum for any side-by-side layout and the keyed answer is uniquely right. The why's 'Other layouts may interleave handles' is a hedge, not an extra answer. Checked as a fresh instance under W-280 (the wording follows an earlier fact-checker example), after reading the artifact. |

**Result:** 1 verified, 0 disputed, 0 held unverified.
