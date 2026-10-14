# Fact-check: small-values-crawl-left (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, question, reveal) against each open claim, re-ran the lesson's own model in node (scratch scripts extracting or re-implementing it), and tried each named source. Most source hosts are blocked to fetch; where only a web-search extract was available, the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | ladder() matches the stated rule. Knuth TAOCP 3, 5.2.2 Algorithm B cited from memory, not opened; the sentence is the stage's own rule. |
| c2 | verified | Re-ran ladder(): X 5 swapping sweeps (rows 234561..123456, then a no-swap row), Y 1. |
| c3 | verified | All 720 orders of 1..6: largest left move in one sweep is 1. Note for builder (not a dispute): the reveal's 'A sweep carries a large value all the way right' is true of the largest value met so far, not of every large value; 'the largest value' would be exact. |
| c4 | verified | Terms 'turtles' (small values near the end) and 'rabbits' (large near the start) confirmed in Wikipedia's Comb sort / Bubble sort articles (web-search extract). Attribution of the terms to Lacey and Box (Byte 16(4), April 1991, pp. 315-320) not confirmed; it is not shown to learners. 'Turtles set the cost': a value k places right of its spot needs >= k swapping sweeps, checked on all 720 orders. |
| c5 | verified | Comb sort = bubble sort with a shrinking gap (Wikipedia, Comb sort, via search; Dobosiewicz 1980 IPL 11(1) and Lacey & Box 1991 listed there). Primary sources not opened. |
