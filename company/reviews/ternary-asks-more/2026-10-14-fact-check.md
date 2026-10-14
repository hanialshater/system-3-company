# Fact-check: ternary-asks-more (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones and reachable fallback branches) against each claim, then re-ran the numbers in my own node scripts (scratchpad fc22/). Network to primary sources is blocked (Wikipedia, Google Patents, NIST, Cornell and other hosts return 403); where a claim rests on a source, the basis says whether it was corroborated by search snippets, taken from my own knowledge (Easley & Kleinberg chapter placement), or not checked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node re-implementation (scratchpad fc22/tern.mjs): halving probes 500 750 625 687 718 734 726 722 720 721 (10), thirds 334 667 778 890 704 741 716 729 720 725 722 723 721 (13); matches halves()/thirds() and the reveal. |
| c2 | verified | Own re-run over 1..1000: worst 10 and 13, averages 8.987 and 11.192, shown toFixed(1) as 9.0 and 11.2. |
| c3 | verified | 721 is worst case for both (10 and 13); own count of such targets = 131. Disclosed as chosen; stage offers all 1,000 targets. |
| c4 | verified | Own re-run: after 2 questions halving range 501-749 (249), thirds 668-1000 (333); reveal prints left(HQ,2) and left(TQ,2). |
| c5 | verified | Own re-run, numbers left per question 666 333 110 110 73 36 24 12 8 4 1 1 found: only questions 4 (890) and 12 (723) leave the count unchanged; these are the hollow ticks (lo===a && hi===b). |
| c6 | verified | Re-derived: halving keeps <= 1/2 per question, 1/4 per two; a ternary round spends two questions to keep about 1/3; 2 log3 n = (2/log2 3) log2 n = 1.26 log2 n. Consistent with worst cases 10 vs 13. |
| c7 | verified | Own histograms match exactly (halving 10:489, thirds 13:272, both the modal counts); stage labels the peak bar 'q: count'. |
| c8 | verified | Search corroboration (cp-algorithms ternary search, Wikipedia 'Ternary search', USACO Guide; pages not opened, network blocked): ternary search finds the max of a unimodal function by comparing f at two interior points and discarding an outer third. 'Smooth hill' is a loose word for unimodal; acceptable. |
| c9 | verified | Stage rule text 'Each question compares 721 with one number.'; halves()/thirds() push one Q per comparison. |

**Result:** all open claims verified; lesson has no unverified or disputed claims.
