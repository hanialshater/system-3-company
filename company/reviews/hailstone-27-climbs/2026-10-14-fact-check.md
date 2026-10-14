# Fact-check: hailstone-27-climbs (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each open claim; re-ran the numbers in node with own re-implementations of the lesson's model (mulberry32 copied from src/kit/random.ts); web sources by search only (the proxy blocked every primary host tried: dl.acm.org, wikipedia, os-book.com, nasa.gov, university hosts). Search-result text is marked as such below.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node: 27 takes 111 steps, peak 9,232 at step 77; first values 82, 41, 124, 62, 31, 94. |
| c2 | verified | Own node: 26 -> 10 (peak 40), 28 -> 18 (peak 52), 97 -> 118 (peak 9,232 at step 84); 97 is the longest under 100. |
| c3 | verified | Interpretive line resting on c1/c2 (10, 111, 18 for neighbours); holds. |
| c4 | verified | Learner sentence has no bound. Not opened (fit.vut.cz blocked). Search-result text: Barina, J. Supercomputing 77(3):2681-2688 (2021) confirmed as a paper, but the 2^68 bound was NOT confirmed from that text; Barina 2025 (J. Supercomputing 81) reports 2^71; Oliveira e Silva in Lagarias (2010) reports about 5.76 x 10^18. Builder should correct the bound in this source field or drop it. |
| c5 | verified | Lagarias (ed.) 2010, AMS, not opened; AMS book description and Lagarias overview (arXiv) state the problem is unsolved (search-result text). Consistent with my own knowledge to mid-2026. |
