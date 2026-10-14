# Fact-check: selfish-routes-cost-a-third-more (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc21b/). Sources: opened where the proxy allowed (web search only; oeis.org, wikipedia.org, publisher PDFs blocked); citations I could not open are marked, and no verdict rests on an unopened source alone. E&K chapter placements are from memory (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node check: B = 60x < 60 for every x < 1 (all 5% stops), equal at x = 1. Stage note text matches. |
| c2 | verified | Own grid over 0..100%: average 60 - 60x + 60x^2, minimum 45 at x = 50%, B = 30 there; 60/45 = 1.333. Average >= 45 > 30 everywhere. |
| c3 | verified | Re-derived: adding a driver raises 60x for all on B; the joiner compares only own time. E&K (2010) ch. 8 (Modeling Network Traffic using Game Theory) placement from memory, confident; not opened. |
| c4 | disputed | DISPUTED (wording of the class). Roughgarden & Tardos ('How bad is selfish routing?', FOCS 2000 / J. ACM 2002) prove the 4/3 bound for linear (affine) latencies a*x + b; confirmed by web search snippet only, paper PDF blocked. But the sentence says 'delays that grow in proportion to traffic', and road A (constant 60) is not proportional; with purely proportional delays a*x, equilibrium equals optimum (marginal cost 2ax is proportional to delay), so the example would not be in the stated class. Fix (builder, reveal and claim): 'With delays that are a fixed time plus a part proportional to traffic, that is the worst it can ever be.' |
| c5 | verified | Demo A_MIN = 60, timeB(pct) = 60*pct/100; predict question states the same. |

**Result:** 1 disputed (c4: "grow in proportion to traffic" names the wrong class; the 4/3 bound is for affine delays, fixed plus proportional). Lesson blocked until the wording is fixed.

## Pass 23 (2026-10-14)

Checker: fact-checker (did not write these claims; sentences recorded by an earlier fact-checker session were reworded by the builder or are the builder's own reveal text). Method: read Demo.tsx (predict, stage strings, reveal and every reachable branch) against each open claim, then re-ran every number in my own node copies of the lesson logic (own mulberry32, BigInt roots and modpow, exact Markov chain, union-find). Every external host failed to resolve or was refused, so no source was opened; a claim whose learner content rests only on an outside source is held unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Reveal wording now 'a fixed time plus a part proportional to traffic' (affine). Bound re-derived: Wardrop equilibrium f satisfies sum l(f)f <= sum l(f)f*; for l = ax + b, l(f)f* <= l(f*)f* + a f^2/4 <= l(f*)f* + l(f)f/4, so C(f) <= (4/3) C(f*). Example: 60/45 = 4/3, so it attains the bound. Roughgarden-Tardos not opened; not relied on. |

**Result:** 1 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 24 (2026-10-14)

Checker: fact-checker (Ingrid). I did not write or build any of these claims. Scope: every unverified or disputed claim after the wave E revisions. Method: read Demo.tsx (predict, stage, every reachable branch, the state after Reset or Start over where the lesson has one, and the reveal gates), then re-ran the numbers in my own node copies of the lesson's logic (kit mulberry32 where seeded). I opened the builder's pre-flight only for count-the-out-of-order-pairs and each-element-pops-once, and only after reading the code. Hosts for primary sources were unreachable (DNS failure), so a row says when a verdict rests on derivation.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own grid 0..100 step 5: avg(50) = 45 is the unique minimum (45.15 at 45 and 55). B at 50% = 30. found-best is required, so the reveal's best = 50 and ', where B takes 30' always prints. Avg >= 45 > 30 everywhere. |
| c3 | verified | Own joinCost(50): after 33, 27 each, 135 in all; 50 x 3 = 150; 100 x (avg 55 - avg 50) = 15. Non-blocking for the builder: the reveal quotes the LAST split visited, and below 50% the joiners' gain beats the loss (20%: 225 vs 60), so 'The line under the chart is why' does not show the waste there. Every sentence is still true. |

**Result:** 2 verified, 0 disputed, 0 held (unverified), 0 withdrawn.

**Non-blocking note for the builder:** the reveal quotes the last split visited. Below 50% on B the joiners' gain beats the loss (20%: 225 vs 60), so 'The line under the chart is why' does not show the waste at those splits. The numbers are still right.

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims open after the wave G revision. Method: read Demo.tsx (and model.ts) for every reachable branch, Reset and reduced motion before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc26-b1/). No build run.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Grid and continuous: unique min 45 at 50%; B 30; avg >= 45. found-bottom forces best = 50 and a split below; 100 always seen. |
| c3 | verified | joinCost(50): 27 each, 135; 3 each, 150; difference 15 = 100 x (avg55 - avg50). Line now for best split. |

**Result:** every claim open at this pass is now verified.

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read Demo.tsx (and any model.ts) first on every reachable path, including replays, reduced motion and the lack of a Reset where there is none, then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own grid 0..100 step 5: avg(50) = 45 is the unique minimum (45.15 at 45 and 55); B(50) = 30; avg >= 45 everywhere, so 30 is unreachable. found-bottom needs 50 and a split below it, and 100 is always seen, so at the reveal best = 50 and roseBelow is true. The sweep (and the reduced-motion path) visits every split and parks the marker on 50%, so Road B and Average read 30 and 45. |
| c3 | verified | Own joinCost(50): B 30 -> 33, each of 5 joiners saves 27, 135 in all; each of 50 loses 3, 150 in all; 100 x (avg 55 - avg 50) = 15 = 150 - 135. Stage line 'Lowest split, 50 of 100 on B: 5 more join, saving 135 min; the 50 on B lose 150.' and the reveal both use joinCost(best). |
| c6 | verified | avg(100) = 60 is the only equilibrium (for any split below 100% B is faster than 60, so drivers switch); min avg 45; 60/45 = 4/3. Reveal prints fmt(A_MIN) / fmt(avg(BEST)). |

**Result:** 3 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
