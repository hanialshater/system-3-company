# Fact-check: penalty-on-wiggle (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; makeData/ridge fit re-implemented in artifacts/scratch/fc-aiecongeo/pen.mjs (own elimination solver; mulberry32 copied for seed-specific rows, Math.random for fresh data).

Seed disclosure: data set 1 is seed 1, the first seed, untuned (c1 says so); the reveal reports the 500-set spread. Pattern satisfied.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Model matches Demo.tsx: degree 7, 8 train + 40 held-out dots, sd 0.3, truth sin(0.8 pi x), rms miss. |
| c2 | verified | Ridge objective with unpenalised intercept: Hastie, Tibshirani & Friedman 2009 s3.4.1; fit() adds lambda only to diagonal entries 1..7. |
| c3 | verified | Data set 1 training misses 0, 0.084, 0.128, 0.177, 0.260, 0.363, 0.502 (exact match). Training miss non-decreasing in lambda in 500/500 seeds, plus 10,000/10,000 further data sets. Zero at lambda 0 in all. |
| c4 | verified | Seeds 1-500: some moderate lambda (1e-4..1) beats none on held-out in 490/500; lambda 10 worse than the best moderate in 500/500. Generality: 4,883/5,000 (seeds 501-5500) and 4,895/5,000 (fresh Math.random data) = 98%. Data set 1 held-out: 0.444 (none), 0.377 (0.01), 0.725 (10), as recorded. |

Nuance on c4 / the reveal wording 'a moderate penalty beat none': the 490 counts the best of five lambdas chosen after seeing held-out error. Fixed single values win less often: 1e-4 91%, 1e-3 92%, 0.01 94%, 0.1 91%, but lambda 1 only 48%. So 'a moderate penalty' is true for 1e-4 to 0.1 (about 91-94% each) and not for 1. The ledger text says 'a moderate penalty (0.0001 to 1)' which is satisfied by 'some', not 'every'. Suggest demo-builder say 'some moderate penalty' or give 0.01 specifically.

## Added (unverified)
- c5: 'nearly flat' at lambda 10 (see claim).

## Fact-check pass 2 (independent second check, 2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | disputed | Re-ran model: at penalty 10 the curve loses to no penalty in 441/500 seeds (88%), so 'loses again' needs 'usually'; and 'nearly flat' is loose (the curve is strongly shrunk, median about 37% of the training range per earlier check, not flat). Fix: 'goes much flatter and usually loses again'. |

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c4 In 490 of 500 toy data sets some moderate penalty (the best of five, 0... | verified | Re-ran the lesson model independently (extracted MODEL block, seeds 1-500, five lambdas 1e-4..1): some moderate penalty beats none in 490 of 500; lambda 10 is worse than the best moderate in 500 of 500. Seed 1: held-out miss 0.444 at 0, 0.377 at 0.01, 0.725 at 10. Matches the claim. |

Result: 1 verified, 0 disputed, 0 added unverified.
