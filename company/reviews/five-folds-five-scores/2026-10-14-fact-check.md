# Fact-check: five-folds-five-scores (2026-10-14)

## Pass 16 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) first, then re-derived each number in my own node script (scratchpad fc16/check.mjs: own softmax, sampler, fold split, descent loop, bandit, distances, keyword scorer, least squares; kit mulberry32 re-typed), exact fractions where rounding mattered. Web: arxiv.org, deeplearningbook.org and pytorch.org are unreachable (DNS); sources were corroborated through search snippets, as each row says.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own node reimplementation (kit mulberry32 seed 1, Fisher-Yates): flipped points {3,6,11,13}; folds [100,75,100,50,75], spread 50, mean 80 = 16/20 (equal folds partition the points). Reveal and readouts print SCORES/MEAN from the same model. |
| c3 | verified | Derivation: equal fold scores need equal wrong labels per fold, 4/5 is not an integer, so two folds differ by >= 1 dot = 25 points in a fold of 4. node seeds 1-1000: spread 25 in 253, 50 in 671, 75 in 76, never below 25. Support is labelled 'simulation' but this is a derivation; non-blocking. |

**Result:** all claims in this pass verified.
