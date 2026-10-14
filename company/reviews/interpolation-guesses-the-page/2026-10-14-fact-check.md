# Fact-check: interpolation-guesses-the-page (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc3/: knap.mjs, interp.mjs, ways.mjs and one-liners). Sources checked by web search where a claim rests on one; sources not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own interpolation search: 730 found at 0-based 72 = position 73 in 1 look; every even value takes 1 look. |
| c2 | verified | Own binary search (floor mid): 730 -> 6; cubes 729,000 -> 7, 1,000 -> 6, 9,261 -> 5; max over both lists 7. |
| c3 | verified | Own run: 729,000 -> 4 (73, 88, 89, 90); 1,000 -> 10; 9,261 -> 21 (max, the cube list); 8,000 -> 20; mean 8.86 vs 5.8. |
| c4 | verified | Analogy; stage evidence supports both halves (1 vs 6 on even; 21 vs 5 on 9,261; 4 vs 7 on 729,000 so "can be" is right). Reveal says "brilliant", claim says "works well": same claim. |
| c5 | DISPUTED | Cubes are convex, so the chord from range ends lies ABOVE the dots (own check: above at all 98 interior points), not "well below". The aim falls short because the line reaches the target value to the left of the target. "Each look moves one position" is true for 1,000 and 9,261, false for 729,000 (73, 88, 89, 90). Reveal "The line bends away from the dots" is also loose: the line is straight, the dots bend. Fix (builder, claim + reveal): "On the cubes the dots bend upward, so the straight aim line runs above them and reaches the target value too early: each aim falls short, and for small values like 9,261 each look moves just one position." |

**Result:** one claim disputed (blocks publishing until the builder fixes the claim and stage text and a fact-checker re-checks); the rest verified.

## Pass 20

Checker: fact-checker (did not write these claims). Re-check of the builder rewording: claim read against Demo.tsx (stage text and reveal), numbers re-run in own node scripts, Demo.tsx parsed with the TypeScript parser (no syntax errors). No build run.

| Claim | Result | Basis |
|---|---|---|
| c5 | verified | Own node re-run of probe(): 729,000 looks at 73, 88, 89, 90 (4 looks); 1,000 at 1..10; 9,261 at 1..21 (one position per look). Chord above the cube dots at every interior point of every range visited (0 exceptions), so each aim falls short. Reveal wording ('dots bend upward ... line runs above them ... each aim fell short') matches; it is shown only when looks > halving (true for 1,000: 10 > 6; 9,261: 21 > 5), and 729,000 (4 < 7) gets the other branch, which makes no contrary claim. |
