# Fact-check: one-recipe-for-sixty, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c4 84 = 2 x 2 x 3 x 7, whichever first split you choose (2 x 42, 3 x 28, ... | verified | Own node run of Demo.tsx grow() for all five 84 starts (2x42, 3x28, 4x21, 6x14, 7x12): sorted leaves 2,2,3,7 each time. |
| c5 A prime is a number that cannot be split into smaller whole factors, l... | disputed | As worded the definition also admits 1 (1 cannot be split into smaller whole factors) and 1 is not prime; the source itself says "a whole number above 1". Fix (builder): "a whole number above 1 that cannot be split into smaller whole factors, like 2, 3, 5 and 7" in the claim and in the predict text/opening caption. Re-check after the fix. |
| c6 You started 60 as the splits you chose; different starts grow differen... | verified | Own node run of grow() for all five 60 starts: sorted leaves 2,2,3,5 each time; shelf sorts leaves (line 188); reveal quotes tried. |

Result: 2 verified, 1 disputed.
