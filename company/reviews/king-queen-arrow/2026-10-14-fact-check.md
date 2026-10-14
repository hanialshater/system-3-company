# Fact-check: king-queen-arrow (2026-10-14)

## Pass 16 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) first, then re-derived each number in my own node script (scratchpad fc16/check.mjs: own softmax, sampler, fold split, descent loop, bandit, distances, keyword scorer, least squares; kit mulberry32 re-typed), exact fractions where rounding mattered. Web: arxiv.org, deeplearningbook.org and pytorch.org are unreachable (DNS); sources were corroborated through search snippets, as each row says.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Demo.tsx WORDS and MESSY match every coordinate in the claim; the stage header says 'Tidy toy map / Messier toy map: positions placed by hand' and the reveal says both maps were placed by hand. |
| c5 | verified | node: (1,0.1) + ((-0.1,1) - (0,0)) = (0.9,1.1); queen 0.4472 -> 0.45, crown 0.3640 -> 0.36, prince 1.5000 -> 1.50; nearest (skipping king, man, woman) = crown. Reading it the other way, woman + (king - man), gives the same point. Hand placement is disclosed on the stage. Advisory, non-blocking: the predict key 'Often, not always' rests on one hand-placed miss plus c3; no claim says how often a nudged map still lands on queen. |

**Result:** all claims in this pass verified.
