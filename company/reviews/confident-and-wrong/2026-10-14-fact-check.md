# Fact-check: confident-and-wrong (2026-10-14)

## Pass 16 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) first, then re-derived each number in my own node script (scratchpad fc16/check.mjs: own softmax, sampler, fold split, descent loop, bandit, distances, keyword scorer, least squares; kit mulberry32 re-typed), exact fractions where rounding mattered. Web: arxiv.org, deeplearningbook.org and pytorch.org are unreachable (DNS); sources were corroborated through search snippets, as each row says.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | node: ln 2 = 0.6931; ln(100)/ln 2 = log2(100) = 6.644, shown as 6.6 (Q_ONE/Q_HALF); -ln p is unbounded as p -> 0. Stage halving chain from 50% adds 0.693 per step for nine steps. Advisory, non-blocking: the tenth tap clamps 0.098% to P_MIN 0.05% (not a true halving), adding 0.669, while the chain line still says 'each halving adds 0.69'. |
| c3 | verified | Derivation: cross-entropy H(q,p) = -sum q_i ln p_i with a one-hot q is -ln p_true = ln(1/p_true). 'Commonly trained to make it small': Goodfellow, Bengio & Courville 2016 s6.2.1.1 (deeplearningbook.org unreachable from here); corroborated by Srihari CSE676 slides 6.2 (cedar.buffalo.edu, search snippet: cost is the negative log-likelihood, equivalently the cross-entropy between training data and model distribution). Hedge 'other penalties exist' is right. Reveal paragraph 3 matches. |

**Result:** all claims in this pass verified.
