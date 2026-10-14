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

## Pass 21

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each open claim, then re-derived every number in my own node scripts (scratchpad fc21: own mulberry32, outbreak/Poisson and negative-binomial fixed points, shoelace, matrix-chain DP vs brute force, doubling search, Newton with a BigInt reference root, Kruskal plus spanning-tree enumeration, copying model, Snell/Fresnel, heterozygote-advantage recursion). Sources recalled and not opened are marked; nature.com, PubMed, OpenStax and the Easley & Kleinberg host were unreachable from this sandbox.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own run of Demo.tsx trajectory/pull: gen 0 at 85%, 1% start: q² 0.01% → 0%, 2pq 1.98% → 2%, arrow ↑; 50% start: 25%, 50%, arrow ↓; gen 60 both '='. Threshold /Δq/ < 0.0005 = 0.05 pp as stated. Note for builder (not blocking): at 95% no-w survival the 1% start reads '=' from gen 0 to gen 60 while still rising (4.1% at gen 60 vs balance 4.8%), so '=' means 'change too small to show', not 'at the balance'. |
| c7 | verified | Question text in Demo.tsx: 'No copies: 85% survive (say, a disease that one copy of w protects against)'. Species is made up; heterozygote advantage pattern. Allison (1954) BMJ 1(4857):290 recalled, not opened; c7 is a framing convention and does not depend on it. |

**Result:** 2 verified, 0 disputed, 0 withdrawn.
