# Fact-check: bending-frontier (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each open claim; re-ran the numbers in node with own re-implementations of the lesson's model (mulberry32 copied from src/kit/random.ts); web sources by search only (the proxy blocked every primary host tried: dl.acm.org, wikipedia, os-book.com, nasa.gov, university hosts). Search-result text is marked as such below.

Walkthrough transcript exists (08:13Z); v2 strip checked against Demo.tsx.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | corn(w) = 100 - w^2: stepCost(1) = 1, stepCost(10) = 19; the formula appears in neither the question nor the chip (Demo.tsx v2). |
| c3 | verified | Model part checked in Demo.tsx: field strip k shows stepCost(k) = 2k - 1, turned to wheat in order 1..10, so each drop equals that field's corn. The general principle (bowed-out PPF because resources are not equally suited) is corroborated by secondary search-result text; Mankiw ch. 2 not opened. The learner sentence is about the farm on screen, so it does not depend on the unopened source. |
| c5 | verified | sum of 2k - 1 for k = 1..n is n^2, so corn = 100 - n^2. Worst-for-corn first is output-maximising: every field gives 1 ton of wheat, so switching the field with least corn minimises corn lost. Chip 'Made-up farm: 10 fields, worst to best for corn' matches. |
