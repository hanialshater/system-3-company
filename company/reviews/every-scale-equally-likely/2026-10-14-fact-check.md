# Fact-check: every-scale-equally-likely (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc21b/). Sources: opened where the proxy allowed (web search only; oeis.org, wikipedia.org, publisher PDFs blocked); citations I could not open are marked, and no verdict rests on an unopened source alone. E&K chapter placements are from memory (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node sums (fc21b/ring.mjs), people(d) = 2 for d < 512, 1 at 512: q=1 bands 14.7 12.2 11.1 10.6 10.4 10.3 10.2 10.2 10.2 (%). |
| c2 | verified | Same sums: bands 2-3 to 256-512 run 12.2% to 10.2%, i.e. 10-12% to whole percent (12.2 rounds to 12). Builder may prefer 'about 10-12%' since the stage shows 12.2%. |
| c3 | verified | Re-derived: band [2^k, 2^(k+1)) has 2^k distances, each weight in (2^-(k+1), 2^-k], total in (1/2, 1], tending to ln 2. Last band 256-512 holds 257 distances (one person at 512), approximately double. |
| c4 | verified | Own sums: q=0 last band 513/1023 people = 50.15% -> 50.1%; q=2 band 1 = 60.9%. |
| c5 | verified | Own check on this ring: probability one 1/d link lands within D/2 of the target from distance D is 10.6, 8.7, 8.2, 8.1, 10.2% for D = 4, 16, 64, 256, 512 (uniform: 0.5% to 50%; 1/d^2: 15% to 0.1%), so roughly constant only for 1/d. Own greedy-routing simulation (400 trials): mean steps q=0 28.5, q=1 24.0, q=2 116.9, so 1/d does route fast here; note q=0.5 gave 21.7, so at n = 1,024 1/d is fast but not measurably the fastest, and the lesson must not say it is. Kleinberg (2000, Nature 406; STOC 2000) and E&K ch. 20 (advanced section on decentralized search) cited from memory, not opened (hosts blocked); the sentence is verified on the derivation and simulation. |
| c6 (new) | unverified | Unrecorded reveal sentence "two distances against 257, about equal" recorded as a claim; left unverified because I recorded it. |

**Result:** all open claims verified; one unrecorded reveal sentence recorded as c6 (unverified) for the next independent pass.

## Pass 23 (2026-10-14)

Checker: fact-checker (did not write these claims; sentences recorded by an earlier fact-checker session were reworded by the builder or are the builder's own reveal text). Method: read Demo.tsx (predict, stage strings, reveal and every reachable branch) against each open claim, then re-ran every number in my own node copies of the lesson logic (own mulberry32, BigInt roots and modpow, exact Markov chain, union-find). Every external host failed to resolve or was refused, so no source was opened; a claim whose learner content rests only on an outside source is held unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Own sums, ring of 1,024 with 1/d: band 2-3 gets 12.2%, band 256-512 gets 10.2%; distances 2 vs 512 - 256 + 1 = 257. 'About equal' against a 128-fold difference in distances is fair. The sentence is the builder's; a pass-21 fact-checker session recorded it, and this is a separate session. |

**Result:** 1 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 24 (2026-10-14)

Checker: fact-checker (Ingrid). I did not write or build any of these claims. Scope: every unverified or disputed claim after the wave E revisions. Method: read Demo.tsx (predict, stage, every reachable branch, the state after Reset or Start over where the lesson has one, and the reveal gates), then re-ran the numbers in my own node copies of the lesson's logic (kit mulberry32 where seeded). I opened the builder's pre-flight only for count-the-out-of-order-pairs and each-element-pops-once, and only after reading the code. Hosts for primary sources were unreachable (DNS failure), so a row says when a verdict rests on derivation.

| Claim | Verdict | Basis |
|---|---|---|
| c7 | verified | Own sums: sum_{d=2..3} 1/d = 0.833 (/2 = 0.42), sum_{d=256..512} 1/d = 0.696 (/257 = 0.0027), sig2 -> 0.42, 0.83, 0.0027, 0.70. The people-weighted shares (2 per distance, 1 at 512) are 12.2% and 10.2%. The compare line is shown under 1/d (milestone q1 is required). |

**Result:** 1 verified, 0 disputed, 0 held (unverified), 0 withdrawn.

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims open after the wave G revision. Method: read Demo.tsx (and model.ts) for every reachable branch, Reset and reduced motion before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc26-b1/). No build run.

| Claim | Verdict | Basis |
|---|---|---|
| c7 | verified | 0.42, 0.0027, 12.2%, 10.2%; compare line rebuilt in node equals the quote; stays once 1/d seen. |
| c8 | verified | Ratio 1.199 unrounded, 1.196 at the stage rounding -> 1.2; per-distance about 154x; key 'About 1×'. |

**Result:** every claim open at this pass is now verified.

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read Demo.tsx (and any model.ts) first on every reachable path, including replays, reduced motion and the lack of a Reset where there is none, then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node sums (people 2 per distance, 1 at 512): q=1 bands 14.7 12.2 11.1 10.6 10.4 10.3 10.2 10.2 10.2 %. Reveal prints pct(SHARES[R1][1]) and [8]: 12.2% and 10.2%. |
| c3 | verified | Re-derived: band [2^k, 2^(k+1)) has 2^k distances, each with 1/d weight in (2^-(k+1), 2^-k], total in (1/2, 1], tending to ln 2; last band 256-512 has 257 distances. 'Each half as likely' read as 'each distance about half as likely as one in the band before': true. |
| c4 | verified | Own sums: q=0 band 256-512 = 513/1023 people = 50.1%; q=2 band 1 = 60.9%. Ghosts: a seen rule other than the current one and 1/d leaves a dashed outline of its tallest bar with label 'Uniform 50.1%' (band 256-512) / '1/d² 60.9%' (band 1). Milestones q0 and q2 are required, so under 1/d both labels are on stage. |
| c5 | verified | Rests on own derivation and simulation; Kleinberg 2000 and Easley-Kleinberg ch. 20 not opened (web blocked). Own exact sums: chance one link from distance D lands within D/2 of the target = 10.6, 8.7, 8.2, 8.1, 10.2% (D = 4, 16, 64, 256, 512) under 1/d, against 0.5-50% uniform and 15-0.1% under 1/d². Own greedy routing (one long link per node, 400 trials): q=0 27.1, q=0.5 23.7, q=1 22.8, q=2 122.1 steps. So 1/d routes fast here; the sentence does not say fastest, and it should not (q=0.5 is close at n = 1,024). |
| c7 | verified | Own sums: sum 1/d over 2..3 = 0.833, /2 = 0.42; over 256..512 = 0.696, /257 = 0.0027 (sig2). Compare line rebuilt from the code: '1/d, distances × chance each (vs d = 1): 2–3: 2 × 0.42 → 12.2%  ·  256–512: 257 × 0.0027 → 10.2%  ·  ratio 1.2×' (separators are double-spaced dots). Shown whenever 1/d has been seen, so it stays under the other rules. Slider at 8–15 under 1/d: '8–15: 8 × 1/8 to 1/15 → 10.6%'. |
| c8 | verified | Own: 12.2/10.2 = 1.196 -> '1.2'; unrounded 0.1222/0.1018 = 1.199. Per-distance chance 0.4167 vs 0.00271, about 154 times ('far likelier'). Answer key About 1× (index 2) is the nearest option. |

**Result:** 6 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
