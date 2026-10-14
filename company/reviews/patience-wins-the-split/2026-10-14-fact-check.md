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

## Pass 25 (2026-10-14, W-238)

Checker: fact-checker (did not write these claims). Re-check after the pass 24 fixes. Method: read Demo.tsx first (every learner-visible string, every reachable branch including reduced motion and the state after any reset or list/tree switch), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (session scratchpad fc25/). No builds. No sentence below is verified on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | The Rubinstein backward induction share(n) = 1 - 0.9·share(n-1) is correct. Own node: for n = 3, 50, 51, 60, 100, 399 and 400 the reveal's quote string is identical to the stage line's string ('First round: offer 0.9 × 52.6% = 47.4%; keep 52.6%.' at 400; '0.9 × 52.9% = 47.6%; keep 52.4%' at 50). q is the 10% record with the largest n >= 50, and a record is written only by set() while that state is on stage, so 'That was the line above the chart at 10%' is true on every path that reaches long-10 (needed for the reveal), including a shrink chip at n >= 50. |

**Result:** 1 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 26 (2026-10-14, batch 2, wave G revisions)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx first (every learner-visible string, every reachable branch, Reset/Start over where it exists, reduced motion where it applies; this lesson has no motion-dependent text), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc26-b2/). No builds. No sentence below is verified on an unopened source; external hosts failed DNS this pass.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own node: share(n) = 1 - 0.9·share(n-1); for every n = 2..400 the offer 0.9·share(n-1) plus share(n) is 1, and their one-decimal percents add to 100.0, so "keeps the rest" holds as displayed. stepText(0.1, 400) = "offer 0.9 × 52.6% = 47.4%; keep 52.6%". q is the 10% record with the largest n >= 50 (set() replaces a record only with a larger n and writes it only while that state is on stage); the Seen row and the reveal call the same stepText(0.1, q.n), and the reveal needs long-10, so q exists. Live line string matches the claim's template, including "(their share proposing next)". |
| c6 | verified | Own node: /share(0.1, n) - 1/1.9/ is largest at n = 50, 0.27 points (52.4% vs 52.6%), and shrinks by 0.9 each round (51: 52.9%, 400: 52.6%), so every recordable 10% game (n >= 50) is within 0.3 points. Records row string "Long games (stand-in for no deadline): ..." is on stage whenever a record exists, which the reveal requires. |

**Result:** 2 verified, 0 disputed, 0 held unverified.
