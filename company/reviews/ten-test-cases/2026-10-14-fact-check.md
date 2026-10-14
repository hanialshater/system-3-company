# Fact-check: ten-test-cases (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (did not write or build these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) against each claim, then re-derived every number in my own node scripts (session scratchpad fc4/). Books cited from memory were not opened; rows say where a verdict rests on derivation instead.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | disputed | "Only" is a universal the cited source does not support: ESL 2e 7.2 discusses estimating test error on held-out data, not that sample size is the sole lever. For a fixed model, stratified or paired evaluation also lowers score variance. Within the toy (iid cases, fixed p) SD = sqrt(p(1-p)/n) depends on n alone, so a scoped claim is true. Fix (builder; reveal text and claim): drop "Only", e.g. "More held-out cases shrink the noise: the spread falls as 1/sqrt(n)", or scope it to this toy, and cite as derivation. |

**Result:** 1 disputed. Lesson NOT fully verified; blocked on the builder's wording fix.
