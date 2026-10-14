# Fact-check: gradient-descent (2026-10-14)

## Pass 16 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) first, then re-derived each number in my own node script (scratchpad fc16/check.mjs: own softmax, sampler, fold split, descent loop, bandit, distances, keyword scorer, least squares; kit mulberry32 re-typed), exact fractions where rounding mattered. Web: arxiv.org, deeplearningbook.org and pytorch.org are unreachable (DNS); sources were corroborated through search snippets, as each row says.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | node (own loop x <- x - 2 eta x from 4): eta 0.05 -> 1.39471, eta 0.95 -> 1.39471 (fmtDist '1.39' both), eta 0.45 -> 4.0e-10 (fmtDist '< 0.001'). Stage run list and reveal match. |
| c8 | verified | Derivation: distance after n hops = /1 - 2 eta/^n x 4, zero for n >= 1 iff eta = 0.5. node: eta 0.5 gives exactly 0 after one hop; over the slider grid 0.05..1.05 the best 10-hop distance is at 0.50. Stage message 'Landed on the bottom in one hop.' and a 0.50 preset exist. |
| c10 | verified | f(x) = x^2, f'(x) = 2x. node: first hop at 0.05 = 0.05 x 8 = 0.40; factors 0.9, 0.1 (0.09999999999999998, shown 0.10), 0, -0.9 (shown '−0.90'). Stage line 'Next hop = 0.05 × slope 8.00 = 0.40. Distance × 0.90 per hop.' matches. |

**Result:** all claims in this pass verified.
