# Fact-check: income-in-dollars (2026-10-14)

## Pass 16 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) first, then re-derived each number in my own node script (scratchpad fc16/check.mjs: own softmax, sampler, fold split, descent loop, bandit, distances, keyword scorer, least squares; kit mulberry32 re-typed), exact fractions where rounding mattered. Web: arxiv.org, deeplearningbook.org and pytorch.org are unreachable (DNS); sources were corroborated through search snippets, as each row says.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Demo.tsx: QUERY 30/$50,000; PEOPLE has 12 entries (A 31/$58,000, B 60/$51,000, ten unlabelled); dist = hypot(age gap, income gap / unit); header '1 year of age counts like $1 / $100 / $1,000 of income'. node: nearest is B at $1 and $100, A at $1,000; for the stage's three units only A or B is nearest. Advisory: the source's 'only A or B is ever nearest' is too broad: on a 1% grid of units from 1 to 100,000, an unlabelled person is nearest on 83 steps (units the stage does not offer). |

**Result:** all claims in this pass verified.
