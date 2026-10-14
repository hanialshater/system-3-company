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
