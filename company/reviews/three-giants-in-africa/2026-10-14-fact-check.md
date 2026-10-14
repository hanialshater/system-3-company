# Fact-check: three-giants-in-africa, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c3 On an Equal Earth map, drawn areas are proportional to true areas. | verified | Equal Earth is equal-area by construction (Savric, Patterson and Jenny, IJGIS 33(3):454-465, online 2018), so drawn areas are proportional to true areas. |
| c4 The placement shown fits the three countries inside Africa with about ... | verified | Re-ran gen.mjs in a scratch mirror (deterministic): 9,438 samples, 243 outside or overlapping = 2.57%, placements.json byte-identical to the committed one; shown as about 3%. |
| c5 The Mercator map stretches land more the farther it is from the equato... | verified | sec^2(lat): 1.70 at 40N (US), 1.53 at 36N (China), at most 1.49 at 35 deg; Africa spans about 37N to 35S with most land far nearer the equator. Direction and comparison hold. |

Result: 3 verified, 0 disputed.
