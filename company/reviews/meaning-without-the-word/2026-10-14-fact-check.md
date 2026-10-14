# Fact-check: meaning-without-the-word (2026-10-14)

## Pass 16 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) first, then re-derived each number in my own node script (scratchpad fc16/check.mjs: own softmax, sampler, fold split, descent loop, bandit, distances, keyword scorer, least squares; kit mulberry32 re-typed), exact fractions where rounding mattered. Web: arxiv.org, deeplearningbook.org and pytorch.org are unreachable (DNS); sources were corroborated through search snippets, as each row says.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node reimplementation of words()/STOP: keywords [capital, france]; scores [0,1,1,1,1] (Paris says 'French'; 'A capital letter' matches 'capital'; both France chunks match 'france'); stable sort, order 1,2,3,4,0, so the top 2 are the Rome and wine chunks. The stage header says '(ties keep list order)'. |

**Result:** all claims in this pass verified.
