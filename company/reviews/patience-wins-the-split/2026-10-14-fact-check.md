# Fact-check: patience-wins-the-split (2026-10-14)

## Pass 23 (2026-10-14)

Checker: fact-checker (did not write these claims; sentences recorded by an earlier fact-checker session were reworded by the builder or are the builder's own reveal text). Method: read Demo.tsx (predict, stage strings, reveal and every reachable branch) against each open claim, then re-ran every number in my own node copies of the lesson logic (own mulberry32, BigInt roots and modpow, exact Markov chain, union-find). Every external host failed to resolve or was refused, so no source was opened; a claim whose learner content rests only on an outside source is held unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-derived: one round is an ultimatum; with acceptance when indifferent the proposer keeps 100%; share(10%, 1) = 1. |
| c2 | verified | Own node: share(n) = 1 - 0.9 x share(n - 1) gives 100%, 10.0%, 91.0%, 18.1%; at n = 3 the stage line reads 'offer 0.9 x 10.0% = 9.0%; keep 91.0%'. |
| c3 | verified | Own node: share(10%, 400) = 52.6%, 1/1.9 = 52.6%; closed form (1 - (-d)^n)/(1 + d) re-derived. The infinite-horizon value matches the finite limit (sup/inf argument re-derived: M <= 1 - dm, m >= 1 - dM give M = m = 1/(1 + d)). |
| c4 | verified | Own node: 1/(1 + 0.5) = 66.7% (reveal; 400 rounds also 66.7%), 1/(1 + 0.7) = 58.8% (stage dashed line at 30%); 1/(1 + d) falls as d rises. |
| c5 | verified | Learner sentence 'A simplified model: both players are rational and know the shrink rate' matches share()/limit(). The label 'Rubinstein's alternating offers' is not shown to learners; Rubinstein (1982) not opened (attribution from my knowledge). |

**Result:** 5 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 24 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims reopened by the v2 wave E revision. Method: read v2 Demo.tsx (stage line per state, records row, 1 round, conditional reveal; the stage stays visible beside the reveal per src/kit/Lesson.tsx) before the sources, then re-ran the numbers in my own node port with a closed-form cross-check (scratchpad fc24/rub.mjs).

| Claim | Verdict | Basis |
|---|---|---|
| c2 | disputed | Arithmetic right (0.9 × 10.0% = 9.0%, keep 91.0% at n = 3). But the reveal says 'That is the line above the chart: "offer 0.9 × next share"' while, on the builder's own QA path (Shrink 50%, then 1 round), the line reads 'One round: the proposer offers nothing and keeps 100%.' Fix (builder): past tense tied to the 10% record ('That was the line above the chart at 10%'), or quote the long-10 record's offer. |
| c3 | verified | Recursion = closed form for n = 1..400; any recordable 10% game is 52.4-52.9%, limit 1/1.9 = 52.6%. |
| c4 | verified | 50%: 66.7%, 30%: 58.8% for every n = 50..400; either quoted record exceeds 52.6%. |

**Result:** 2 verified, 1 disputed (c2). Publishing stays blocked on c2.
