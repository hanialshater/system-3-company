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

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: economics/patience-wins-the-split v5. Method: read Demo.tsx first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | One round is an ultimatum; with acceptance when indifferent the proposer keeps 100%: share(10%, 1) = 1. Initial stage line (n = 1, always seen first) reads 'One round: the proposer offers nothing and keeps 100%.'; bar 1 is always drawn at 100%. Reveal 'With one round the proposer kept 100%' holds on every path. |
| c2 | verified | Own node: share(n) = 1 − 0.9·share(n−1) gives 100.0, 10.0, 91.0, 18.1%; stepText(0.1, 400) = 'offer 0.9 × 52.6% = 47.4%; keep 52.6%'. For every n = 2..400 the displayed offer and keep add to 100.0. Live line template matches ('First round: offer 0.9 × … (their share proposing next) = …; keep …'). q is the largest 10% record with n ≥ 50 (records only grow, written only by set() while that state is on stage); Seen row and reveal call the same stepText(0.1, q.n); reveal needs long-10. |
| c3 | verified | Own node: recursion equals the closed form (1 − (−δ)^n)/(1 + δ) for n = 1..400 at 10/30/50% (0 mismatches); share(0.1, 400) = 52.6%, share(0.1, 50) = 52.4%, 1/1.9 = 52.6%; every recordable 10% game (n = 50..400) is 52.4-52.9%, so 'close to 1 ÷ (1 + 0.9)' holds on every path. v5 reveal prints the learner's q.n and q.keep. |
| c4 | verified | Own node: share(0.5, n) = 66.7% and share(0.3, n) = 58.8% for every n = 50..400; 1/1.5 = 66.7%, 1/1.7 = 58.8%; 1/(1 + δ) falls as δ rises. Reveal quotes the highest-shrink non-10% record (sorted), so a 30%-only learner reads 'At 30% shrink you saw 58.8%', also above 52.6%. Records row reads 'shrink 10% → 52.6% · 30% → 58.8% · 50% → 66.7%' when all three are recorded. |
| c5 | unverified | Learner-visible caption 'Model: both rational, both know the shrink' matches share()/limit() (backward induction with common knowledge of δ). The claim also names the model 'Rubinstein's alternating offers'; that attribution rests on Rubinstein (1982), Econometrica 50(1), which I could not open (hosts blocked). Left unverified. Options for the owner: open the source, or drop the attribution from the claim text (it is not shown to learners) and mark support 'convention'. |

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | unverified | HELD. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. The learner caption ('Model: both rational, both know the shrink') matches share()/limit(); the attribution to Rubinstein 1982 is in the claim text only. Option for the owner, as in pass 35: drop the attribution from the claim text and mark it convention. |

**Result:** 0 verified, 0 disputed, 1 held (unverified), 0 withdrawn.
