# Fact-check: order-of-the-bad-year

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read Demo.tsx (and any model.ts) first on every reachable path, including replays, reduced motion and the lack of a Reset where there is none, then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 1.25 x 0.8 = 0.8 x 1.25 = 1; own port of path(): flow 0 gives 100 both orders; stage record 'none: both $100k'. Milestone noflow is required. |
| c2 | verified | Own: gain first 100 x 1.25 - 20 = 105, x 0.8 - 20 = 64; loss first 60, then 55. Reveal quotes the record (milestone withdraw required). |
| c3 | verified | Own: final = 100 + f(1 + r2) + f, so the orders differ only by what the first withdrawal would have earned in year 2: after the loss it misses the +25% recovery (45k taken in all vs 36k). 'Smaller pot' is true (80 vs 125) but descriptive; the cause is the missed recovery, which the sentence also says. |
| c4 | verified | Own: loss first 80 + 20 = 100, x 1.25 + 20 = 145; gain first 145, x 0.8 + 20 = 136. Sentence prints only if the deposit record exists (d). |
| c5 | verified | Stage chip 'Model: returns +25% and −20%; money moves at each year-end'; RET and path() have no fees, taxes or inflation. |

**Result:** 5 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
