# Fact-check: the-long-tail-adds-up (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc21b/). Sources: opened where the proxy allowed (web search only; oeis.org, wikipedia.org, publisher PDFs blocked); citations I could not open are marked, and no verdict rests on an unopened source alone. E&K chapter placements are from memory (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node harmonic sums: H(1000) = 7.4855, H(100000) = 12.0901, share 61.91% / 38.09%. Top 1 8.27%, 10 24.23%, 100 42.91%, 10,000 80.96%. Matches Demo share(). |
| c2 | verified | Rank r >= 1,001 sells 1/r <= 1/1,001 < 1/1,000 of item 1. |
| c3 | verified | Own node sums: 11-100 18.68%, 101-1,000 19.01%, 1,001-10,000 19.04%, 10,001-100,000 19.04% (raw 2.258, 2.298, 2.302, 2.303 vs ln 10 = 2.3026). Ranks 1-10 are 24.2%, so 'each tenfold stretch about the same' holds from 11 on; the sentence's comparisons are all from 11 on. |
| c4 | verified | Follows from c1 inside the model: dropping ranks 1,001+ loses 38.1% > 1/3. |
| c5 | verified | Web search 2026-10-14 (Wikipedia 'The Long Tail (book)', Reason 2006, historyofinformation.com): Anderson's article 'The Long Tail', Wired 12.10, October 2004, expanded into the 2006 book. Original Wired page not opened. E&K (2010) ch. 18 (Power Laws and Rich-Get-Richer Phenomena) has a Long Tail section: placement from memory, host blocked, confident. |
| c6 | verified | Demo.tsx uses 1/r for all 100,000 ranks with no data; reveal states it is a model. |

**Result:** all open claims verified; lesson has no unverified or disputed claims from this pass.
