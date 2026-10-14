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
