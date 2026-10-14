# Fact-check: more-detail-less-likely

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read Demo.tsx (and any model.ts) first on every reachable path, including replays, reduced motion and the lack of a Reset where there is none, then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | P(A and B) = P(A)P(B\|A) <= P(A). Own check of model.ts over every slider setting (lib 5..50 step 5, club 10..90 step 20): inner < outer in all 50, since the club slider stops at 90%. |
| c2 | verified | model.ts: librarians = round(1000 lib%), clubbers = round(librarians club%); header states the shares are a model chosen for the card. |
| c3 | verified | Own: librarians(20) = 200, clubbers(20, 90) = 180; librarians(10) = 100, clubbers(10, 90) = 90. Reveal quotes current club share and rings, plus the record at 90% only when it differs from the current state. |
| c4 | held (unverified) | HELD (not learner-visible). Tversky and Kahneman 1983 not opened (web blocked); the name and the Linda result need an opened source. |

**Result:** 3 verified, 0 disputed, 1 held (unverified), 0 withdrawn.
