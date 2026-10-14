# Fact-check: accurate-bettor-takes-the-pot (2026-10-14)

## Pass 23 (2026-10-14)

Checker: fact-checker (did not write these claims; sentences recorded by an earlier fact-checker session were reworded by the builder or are the builder's own reveal text). Method: read Demo.tsx (predict, stage strings, reveal and every reachable branch) against each open claim, then re-ran every number in my own node copies of the lesson logic (own mulberry32, BigInt roots and modpow, exact Markov chain, union-find). Every external host failed to resolve or was refused, so no source was opened; a claim whose learner content rests only on an outside source is held unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own mulberry32 copy of run(): race-500 shares 0.999905, 0.987766, 0.999678, 1.000000, 0.991811; pct() gives 98.8% low, 'over 99.9%' high. |
| c2 | verified | Own run: seed 2212, race 200, 50% bettor holds 0.8864 (88.6%); seed 2215 0.6981; only runs 2 and 5 dip below half after race 50, so the luck-run milestone is reachable. |
| c3 | verified | Re-derived: winners split the pool by stake, so the money ratio changes by 0.6/0.5 = 1.2 on a win and 0.4/0.5 = 0.8 on a loss at any share (node check at a = 0.3 gives 1.2); 1.2^3 x 0.8^2 = 1.10592, shown as 1.11. |
| c4 | verified | Re-derived: everyone bets everything, so the share of the pool on 'win' is 0.6a + 0.5(1 - a), the readout's formula; it tends to 0.6 as a tends to 1. |
| c5 | disputed | DISPUTED. Not a learner sentence (the reveal speaks only of 60% vs 50%), and false as a general statement if 'closest' means nearest in percentage points: in this same model the long-run winner is the belief with the smaller relative entropy from the truth. Own counterexample with the lesson's run(): truth 80%, beliefs 99% (19 points off) vs 60% (20 points off): the 99% bettor ends behind in 100 of 100 seeded 500-race runs (median share 4e-72). Blume and Easley (2006) not opened. Fix (builder): withdraw c5 (no learner sentence depends on it), or reword to 'in this model, money flows on average to the belief with the smaller relative-entropy gap from the truth; here that is the 60% bettor'. |
| c6 | verified | Stage chip 'Model: each bets everything, split by belief' and reveal footnote 'two bettors, no fees, everyone bets everything each race' match run(). |

**Result:** 5 verified, 1 disputed, 0 held unverified, 0 withdrawn.

## Pass 24 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims reopened by the v2 wave E revision. Method: read v2 Demo.tsx (captions, single-race chip, circles, readouts, conditional reveal; no Reset, t only grows) before the sources, then replayed all five seeds in my own node port (scratchpad fc24/bet.mjs).

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Run 2: 91.0% at race 203; run 5: 94.2% at race 176; runs 1, 3, 4 minima after race 50: 0.716, 0.655, 0.553. Reveal needs full-run, so the circle is the whole-run low. |
| c3 | verified | Seed 2211 race 1 is a loss; ratio changes by 1.2^w × 0.8^l over every window checked; 1.2^3 × 0.8^2 = 1.106. |
| c7 | verified | Captions and the ratio readout match the code; printed product equals the readout's change. Side note: Pool's win odds at race 500 read 59.9% in runs 2 and 5. |

**Result:** every claim open at this pass is now verified.

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims open after the wave G revision. Method: read Demo.tsx (and model.ts) for every reachable branch, Reset and reduced motion before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc26-b1/). No build run.

| Claim | Verdict | Basis |
|---|---|---|
| c7 | verified | Caption strings read; pick() sets from = 0; caption product equals the money ratio readout in all 2,495 run/race cases. Seen row contents match. |

**Result:** every claim open at this pass is now verified.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Read v4 Demo.tsx first. Own node replay of run() with mulberry32: after race 50 the lowest 60%-bettor share is 0.090 at race 203 in run 2 (50% bettor 91.0%) and 0.058 at race 176 in run 5 (94.2%). Runs 1, 3 and 4 never go below half after race 50. The reveal quotes lowPoint(quoteRun, t) at t = 500 (full-run is needed and t never decreases): the selected run if it dipped, else the first dipping run opened. Every dipping run is circled and the quoted one is labelled, so the quote is always on screen. Seeds 2211 to 2215 are consecutive in SEEDS. |
| c3 | verified | Derivation: with all-in stakes split by belief and the whole pool shared by winning stake, the ratio a/(1−a) changes by 0.6/0.5 = 1.2 on a win and 0.4/0.5 = 0.8 on a loss at any share. 1.2^3 × 0.8^2 = 1.1059, shown as '×1.11' in the reveal and the Seen row. Own replay: race 1 of seed 2211 is a loss (×0.8); runs 3 to 5 start with a win. |
| c4 | verified | The Pool odds readout is (0.6·a + 0.5·(1−a)) × 100, the money-weighted belief; it tends to 60% as a tends to 1. Own replay at race 500: 60.0% (runs 1, 3, 4) and 59.9% (runs 2, 5). The reveal says 'drift to 60%', which fits the claim's 'move toward'; no run reaches above 60%. |
| c6 | verified | The reveal footnote 'Model: two bettors, no fees, all-in every race.' matches the claim. run() matches the description: two bettors, stakes = belief × wealth on each side, the whole pool shared by winning stake (no fee term). |
| c7 | verified | msg in Demo.tsx: one-race 'Race t: win/loss, money ratio ×1.2/×0.8.'; jump 'Races a–b: w wins ×1.2, l losses ×0.8: ratio ×fmtX(...)'. Both are hidden at the reveal (atReveal). pick() sets from = 0. Own check over all 5 runs × 500 races: fmtX(1.2^w × 0.8^l) from race 1 equals fmtX(ratio(share)) on the readout in every case (0 mismatches). The Seen row parts match. The chart label 'Five runs end at 98.8% to over 99.9%' matches the own replay of the finals. |

**Result:** 5 verified, 0 disputed, 0 held unverified.
