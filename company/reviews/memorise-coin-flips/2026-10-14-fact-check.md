# Fact-check: memorise-coin-flips (2026-10-14)

## Pass 16 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) first, then re-derived each number in my own node script (scratchpad fc16/check.mjs: own softmax, sampler, fold split, descent loop, bandit, distances, keyword scorer, least squares; kit mulberry32 re-typed), exact fractions where rounding mattered. Web: arxiv.org, deeplearningbook.org and pytorch.org are unreachable (DNS); sources were corroborated through search snippets, as each row says.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | disputed | Exact least squares (Python Fractions) on set 1 labels (-1,1,-1,-1,-1,1): the degree-1 line is -13/21 + (4/7)x, largest miss 158/105 = 1.50476, which the stage's f2() shows as '1.50', not 1.51. The degree-3 miss is 0.7619 ('0.76', right); the degree-5 miss is 8e-13 ('0.00', right). Fix (builder): 'misses by up to 1.50' in the claim and in the Demo.tsx header comment. |
| c4 | verified | Demo.tsx: newLabel uses mulberry32(set x 7919 + 13), a stream separate from labelsFor(set), so P(call = label) = 1/2 whatever the curve. node (own least-squares fit): over sets 1-10,000 the degree-5 call at x = 0.5 is right in 49.6%; newLabel is +1 in 50.2%; on sets 1-22 (a typical learner path) it is right 12 of 22 (55%), so the stage shows 'about half'. |

**Result:** c3 disputed (blocks publishing until the builder fixes the text and a fact-checker re-checks); the rest verified.
