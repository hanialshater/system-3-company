# Fact-check: bending-frontier (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each open claim; re-ran the numbers in node with own re-implementations of the lesson's model (mulberry32 copied from src/kit/random.ts); web sources by search only (the proxy blocked every primary host tried: dl.acm.org, wikipedia, os-book.com, nasa.gov, university hosts). Search-result text is marked as such below.

Walkthrough transcript exists (08:13Z); v2 strip checked against Demo.tsx.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | corn(w) = 100 - w^2: stepCost(1) = 1, stepCost(10) = 19; the formula appears in neither the question nor the chip (Demo.tsx v2). |
| c3 | verified | Model part checked in Demo.tsx: field strip k shows stepCost(k) = 2k - 1, turned to wheat in order 1..10, so each drop equals that field's corn. The general principle (bowed-out PPF because resources are not equally suited) is corroborated by secondary search-result text; Mankiw ch. 2 not opened. The learner sentence is about the farm on screen, so it does not depend on the unopened source. |
| c5 | verified | sum of 2k - 1 for k = 1..n is n^2, so corn = 100 - n^2. Worst-for-corn first is output-maximising: every field gives 1 ton of wheat, so switching the field with least corn minimises corn lost. Chip 'Made-up farm: 10 fields, worst to best for corn' matches. |


## Pass 30 (2026-10-14, W-276)

Checker: fact-checker. I did not write or build these claims. Scope: claims reopened by the W-265/W-267 phone-fit trims (meta.json v4). Method: read Demo.tsx on every reachable path (predict, explore controls, steps back, Reset where one exists, prefers-reduced-motion branch, reveal gates) and checked that each value the reveal names is on the stage when it opens; re-ran the numbers in my own node scripts (session scratchpad fact-checker-w276/). No source was opened (web fetch: DNS failure; proxy 403), so no verdict below rests on a cited text.

Paths read: predict (locked strip plain, no curve), slider/+1/-1/All 10 fields, stepping back after 10 (faint trace keeps the staircase), reveal (static text). No Reset control; no animation, so reduced motion is the same path. Reveal on the full path: 88 words.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | corn(w) = 100 - w^2 (own node): stepCost(1) = 1, stepCost(10) = 19, corn(10) = 0. Reveal "At 10 tons of wheat, corn hit 0, and the last ton cost 19" is gated by milestone last-ton; the staircase to 10 stays drawn (full or faint trace) and the strip shows 19 when stepping back. Formula is in neither question, chip nor reveal. No Reset, no animation (reduced motion identical). |
| c2 | verified | Own node: drops 1,3,5,...,19, differences all 2. Reveal "The drops grew by 2 every step: 1, 3, 5, ... 19" uses stepCost(); the strip shows all ten field numbers once unlocked. |
| c3 | verified | Rests on the farm on screen, not on Mankiw (not opened, web blocked): field k shows stepCost(k) = 2k - 1, fields turn to wheat 1..10 in order, so each drop equals its field corn; second difference of corn is -2 everywhere (bowed). Reveal names the worst field 1 and best 19, both on the strip. Note: support could be derivation (as the-slowing-half-life c3, W-261); the term "increasing opportunity cost" is in the claim text only, not learner-visible. |
| c4 | verified | Chip "Made-up farm: 10 fields, worst to best for corn" and muted reveal line "A model: the curve is made up, not data from a real farm." on every path. |

**Result:** 4 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
