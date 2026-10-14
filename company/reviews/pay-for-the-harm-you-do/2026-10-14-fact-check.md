# Fact-check: pay-for-the-harm-you-do (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones and reachable fallback branches) against each claim, then re-ran the numbers in my own node scripts (scratchpad fc22/). Network to primary sources is blocked (Wikipedia, Google Patents, NIST, Cornell and other hosts return 403); where a claim rests on a source, the basis says whether it was corroborated by search snippets, taken from my own knowledge (Easley & Kleinberg chapter placement), or not checked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own independent VCG script: others' welfare without X 60 + 5 = 65, with X on top 30, X pays 35, keeps 70 - 35 = 35. Reveal computes from outcome(7). |
| c2 | verified | Own VCG script: Y pays 75 - 70 = 5, Z pays 100 - 100 = 0 (Z unplaced). |
| c3 | verified | Own script, X's kept value for bids 0..10 with ties to X = 0,30,30,30,30,30,35,35,35,35,35; reveal prints outcome(7).keep and outcome(3).keep. |
| c4 | verified | Attribution from own knowledge (sources not opened, network blocked): Vickrey 1961 J. Finance 16 'Counterspeculation, auctions, and competitive sealed tenders'; Clarke 1971 Public Choice 11 'Multipart pricing of public goods'; Groves 1973 Econometrica 41 'Incentives in teams'. Truthful bidding is a dominant strategy under VCG (standard; also stated as the VCG benchmark in the EOS 2007 abstract snippet). E&K ch. 15 'Sponsored Search Markets' covers VCG (placement from own knowledge, confident). |
| c5 | verified | Matches the reveal's muted line and stage chip; outcome() implements fixed clicks, invented values, ties to X. |

**Result:** all open claims verified; lesson has no unverified or disputed claims.

## Pass 24 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: the claim reopened by the v2 wave E revision. Method: read v2 Demo.tsx (sums line, bracket, keep chart, buttons, slider, reveal; no Reset; stage visible beside the reveal) before the source, then re-ran slot assignment and payments for every bid 0-10 in my own node port (scratchpad fc24/vcg.mjs).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | disputed | Numbers right: $65 without X, $30 with X on top, pay $35, not 7 × 10 = $70. But the reveal says 'The line under the bars: ... $30 ... the gap you saw, $35' from the honest bid, while the line shows the current bid. On the hint's own path (honest, then lower) the line reads '= $60' and the bracket '$5' when the reveal opens. Fix (builder): 'At the honest $7, the line under the bars read: ...', or reset the stage to $7 at the reveal. |

**Result:** 0 verified, 1 disputed (c1). Publishing stays blocked on c1.
