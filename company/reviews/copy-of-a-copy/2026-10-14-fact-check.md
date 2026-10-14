# Fact-check: copy-of-a-copy (2026-10-14)

## Pass 16 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) first, then re-derived each number in my own node script (scratchpad fc16/check.mjs: own softmax, sampler, fold split, descent loop, bandit, distances, keyword scorer, least squares; kit mulberry32 re-typed), exact fractions where rounding mattered. Web: arxiv.org, deeplearningbook.org and pytorch.org are unreachable (DNS); sources were corroborated through search snippets, as each row says.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: 0.98^50 = 0.36417 -> 36.4% (reveal toFixed(1)); own Monte Carlo (Math.random, 200,000 trials) 36.3%; own reimplementation of nextGen with kit mulberry32, runs 1-2000: zebra lost in generation 1 in 37.3%. The sampler skips zero counts, and in 2000 x 10 generations no zero count ever came back. |
| c3 | verified | node: 0.98^500 = 4.10e-5 = 0.0041%, 'about 0.004%' right. Runs 1-2000 at 500 draws: zebra lost in generation 1 in 0 runs; words left after 10 generations average 9.61 of 10 (vs 5.35 at 50 draws); no zero ever revived. Slows, does not undo: holds. |

**Result:** all claims in this pass verified.
