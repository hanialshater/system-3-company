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

## Pass 25 (2026-10-14, W-238)

Checker: fact-checker (did not write these claims). Re-check after the pass 24 fixes. Method: read Demo.tsx first (every learner-visible string, every reachable branch including reduced motion and the state after any reset or list/tree switch), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (session scratchpad fc25/). No builds. No sentence below is verified on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node port (fc25/vcg.mjs) of order/value/outcome/sums at bid 7: 'Without X: Y $60 + Z $5 = $65 · With X: Y $30 + Z $0 = $30', pay 35, keep 35; own bid 7 × 10 = 70. The reveal now says 'At the honest $7, the line under the bars read: ...' and 'That gap'. The honest milestone (set(7)) is required, and the sums line renders sums(o) for the current bid whenever unlocked, so the learner had that exact line on stage. The past tense no longer points at the current bid. |

**Result:** 1 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read Demo.tsx (and any model.ts) first on every reachable path, including replays, reduced motion and the lack of a Reset where there is none, then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own port of order/value/outcome/sums at bid 7: 'Without X: Y $60 + Z $5 = $65 · With X: Y $30 + Z $0 = $30', pay 35; own bid 7 x 10 = 70. Reveal is tied to the honest $7 (milestone honest required) in past tense. |
| c3 | verified | Own: X keeps 0,30,30,30,30,30,35,35,35,35,35 for bids 0..10 (ties to X, $0 takes no slot); reveal prints outcome(7).keep = 35 and outcome(3).keep = 30; bracket at bid 3 'harm = X pays $5'. |
| c4 | verified | Rests on derivation, not on Vickrey/Clarke/Groves or Easley-Kleinberg (not opened, web blocked). Under VCG X's utility is v_X(o) + sum of others' reported values - h(others), and the allocation maximises reported welfare, so reporting the true value makes the mechanism maximise X's own utility. Own exhaustive check: 20,000 random (Y, Z) bid pairs in 0..10, X value 7, no bid 0..10 beats bidding 7 (0 violations). |
| c5 | verified | Chip 'Model: fixed clicks; Y, Z bid their values; ties to X'; outcome() implements fixed clicks, honest Y/Z, ties to X. |

**Result:** 4 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
