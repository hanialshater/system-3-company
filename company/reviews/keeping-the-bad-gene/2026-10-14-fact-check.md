# Fact-check: keeping-the-bad-gene (2026-10-14)

## Pass 18 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc18/: own mulberry32 copy, own Poisson sampler, quickselect/quicksort, amortisation, RK4 Lotka-Volterra, negative-binomial slice allocation, replicator iteration, brute-force tree enumeration, Cauchy/die and Kelly replays). Sources checked by web search where a claim rests on one; papers not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derived myself: marginal fitness of w = p + q(1 - t), of A = p(1 - s) + q; equal when q t = p s, so q* = s/(s + t), stable for s, t > 0. 0.15/1.15 = 0.1304. Own iteration of the Demo recursion from 1% and 50%: 0.1303 and 0.1304 at gen 60. Balance line and readout appear only at gen >= 60. (Textbook citation not relied on.) |
| c3 | verified | Readouts 'Young with 2 w' = q^2 and 'with 1 w' = 2pq: at q = 0.01, 0% and 2%; at q = 0.5, 25% and 50%. Direction follows from c1: below q*, w's marginal fitness exceeds A's. |

**Result:** all open claims in this pass verified; no disputes. Non-blocking notes, if any, are in the Basis column (builder owns any wording fix).

## Pass 19 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc3/: knap.mjs, interp.mjs, ways.mjs and one-liners). Sources checked by web search where a claim rests on one; sources not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own node: q = 0.01 -> q^2 = 0.0001 (0%), 2pq = 0.0198 (2%), next q = 0.0116 (rises); q = 0.5 -> 25%, 50%, next q = 0.351 (falls). Readouts compute q^2 and 2pq. Direction follows from q* = s/(s + 1): dq > 0 iff q < q*. Hartl & Clark not relied on. |

**Result:** all open claims verified; lesson has no unverified or disputed claims.
