# Fact-check: best-of-twenty-on-one-test

Independent claim checks for src/demos/ai/best-of-twenty-on-one-test. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own exact sum over k of 1 − F(k)^20 with F = Binomial(100, 0.5) cdf: 59.31. Own node port of board() with mulberry32: seed 1, 20 models, winner 56 (seeds 1 to 40: 56 to 66). Default m = 20 and nextSeed = 1, so the first Run press is seed 1; if the learner presses a Models button first, seed 1 goes to that m (the claim calls seed 1 an example, which holds). |
| c2 | verified | Own port of fresh(): seed 1 gives 49.7%; over seeds 1 to 2,000 the fresh score ranges 44.9% to 56.0%, mean 50.07%. It is independent of the shared test (a separate stream, mulberry32(seed + 100000)), so the winner stays a 50% guesser. The fresh score reached the winner's shared score in 4 of 2,000 seeds; the reveal has a branch for that ('a rare run where luck held'), so the stage never says 'fell' when it did not. |
| c3 | verified | Own exact expected maxima: 50.00, 55.81, 59.31, 62.48 for m = 1, 5, 20, 100, which round to the claim's 50, 56, 59, 62. board(seed, m) shares a prefix across m, so for one seed the best of 100 is ≥ the best of 20 ≥ the best of 5 (seed 1: 53, 54, 56, 59). The reveal crowd lines are guarded by crowd.w ≥ r.w or ≤ r.w, so they never contradict the run. |
| c4 | held unverified | Reveal sentence matches the claim. The selection bias is shown on stage, but the claim is about practice with real models ('quietly trains on it'; 'keep a final test set ... used once') and rests on Dwork et al. 2015 (Science) and ESL 2nd ed. 7.2. Neither could be opened (WebFetch DNS failure for hastie.su.domains; proxy 403). Left unverified. |
| c5 | verified | Stage tag text 'Toy models that only guess' (Demo.tsx span.tag) matches. The model: each question is right if r() < 0.5, for every model, on both tests. No skill parameter exists. |

**Result:** 4 verified, 0 disputed, 1 held unverified (no source could be opened; board W-511, evaluation-steward).
