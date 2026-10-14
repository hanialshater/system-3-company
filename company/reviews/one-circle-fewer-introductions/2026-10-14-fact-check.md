# Fact-check: one-circle-fewer-introductions

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read Demo.tsx (and any model.ts) first on every reachable path, including replays, reduced motion and the lack of a Reset where there is none, then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 0.9^5 = 0.59049; 1 - 0.9^5 = 0.40951 -> 41% and 59%. Tick '41%: 5 separate circles' after the first chip. |
| c2 | verified | Own: q(1 - (1 - 0.1/q)^5) = 0.40951, 0.33616, 0.23056, 0.1 at q = 1, .5, .25, .1 -> 41, 34, 23, 10%; meeting weeks 20, 10, 5, 2 of 20; 'then 20% each' at q = .5. |
| c3 | verified | q = 0.1: 0.1/0.1 = 1, so 0.1 x (1 - 0^5) = 0.1. |
| c4 | verified | Own: P(all fail) = (1 - q) + q(1 - 0.1/q)^5 = 0.664 at q = .5 vs 0.590 independent; the marginal stays 0.1. Verified in the stage model; the general sentence is the model's moral. |
| c5 | verified | Lesson rule; model.ts header says 'A teaching model, not data'; no real-world rate in learner text. |

**Result:** 5 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
