# Fact-check: attention-shares-one (2026-10-14)

## Pass 16 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) first, then re-derived each number in my own node script (scratchpad fc16/check.mjs: own softmax, sampler, fold split, descent loop, bandit, distances, keyword scorer, least squares; kit mulberry32 re-typed), exact fractions where rounding mattered. Web: arxiv.org, deeplearningbook.org and pytorch.org are unreachable (DNS); sources were corroborated through search snippets, as each row says.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | node (fc16/check.mjs, own softmax): weights sum to 1 within 2e-16 at every slider angle 0..355; 45 deg gives 44.6/44.6/10.8%, 0 deg gives A 66.5% (stage and reveal agree). Demo.tsx attend(): blend = sum of weight_i x unit arrow_i, drawn in var(--bad) (#ff7a7a / #b8222a: red). Advisory, non-blocking: 'lowers the others' holds for the others combined; in 36 of 71 five-degree slider steps two weights rise together while the third falls (e.g. 180 to 135 deg). Suggest 'lowers the rest'. |

**Result:** all claims in this pass verified.
