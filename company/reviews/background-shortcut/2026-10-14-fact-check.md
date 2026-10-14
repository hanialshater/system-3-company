# Fact-check: background-shortcut (2026-10-14)

## Pass 16 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) first, then re-derived each number in my own node script (scratchpad fc16/check.mjs: own softmax, sampler, fold split, descent loop, bandit, distances, keyword scorer, least squares; kit mulberry32 re-typed), exact fractions where rounding mattered. Web: arxiv.org, deeplearningbook.org and pytorch.org are unreachable (DNS); sources were corroborated through search snippets, as each row says.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Demo.tsx: LEARNED = background because accuracy(TRAIN,'background') 0.95 >= accuracy(TRAIN,'shape') 0.8 (ties would also go to background); four buttons run each clue on each set (CELLS). Reveal paragraph 3 says 'one clue at a time'. |
| c5 | verified | Text is the builder's v-revision ('tend to take an easy clue'), not the wording a fact-checker added on 2026-10-13. Geirhos et al. 2020 abstract (arXiv 2004.07780, via bethgelab.org and search snippet; arxiv.org itself unreachable): shortcuts are 'decision rules that perform well on standard benchmarks but fail to transfer to more challenging testing conditions'. Same-source test sets share the shortcut = the paper's i.i.d. point. Hedged 'tend to' is fair. The source's note about 'cheapest' is stale: the word is gone from the reveal. |

**Result:** all claims in this pass verified.
