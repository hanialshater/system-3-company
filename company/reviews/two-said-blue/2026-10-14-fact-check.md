# Fact-check: two-said-blue (2026-10-14)

## Pass NCM-1 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal, recall) and model.ts first, then re-ran the lesson's own model.ts in node 22 (type-stripping, `@/kit/random` repointed to a copy of src/kit/random.ts; scratchpad `fc/`) or my own re-typed rule where there is no model.ts. No walkthrough transcript exists yet for this slug (artifacts/walkthroughs/ empty for it), so the stage was read from code. Web: the egress proxy 403s/DNS-fails cornell.edu, berkeley.edu, wikipedia.org, arxiv.org, repec, nowpublishers and the Brin-Page mirrors; sources were checked through web-search results (quoted abstracts, catalogue records, secondary summaries), as each row says. Easley and Kleinberg: chapter numbers confirmed from library catalogue records; no section number could be confirmed from a reachable source, so every section stays `section_unconfirmed`.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | model.ts `sequence()` implements exactly the stated rule; stage message states it. E&K ch. 16 = information cascades (catalogue). |
| c2 | verified | Bayes: net 2 revealed signals give 4:1; one opposing clue leaves 2:1 (holds for every accuracy > 1/2). Simulation: 0 deviations from the locked colour after the lead reached 2, seeds 1-10,000. |
| c3 | verified | q^2/(q^2+p^2) = 1/5. Lesson's `runMore`: seeds 1-10,000 1,991 wrong; QA path 101 -> 18, 10,101 -> 2,009 (19.9%); all sequences locked, latest at index 26 (person 27). |
| c4 | **disputed** | Claim text is right (1/9; 1,080/10,000 start with two red clues), but **the stage makes a different claim**: reveal paragraph 2 prints "(1 in 9)" unconditionally, while paragraph 1 reports the accuracy the learner ran most (`ACCS[q]`). A learner who runs 10,000 at 80% and 100 at 2 in 3 reads "clue right 80% ... 1 in 9", true value 0.04 (1 in 25); at 60% it is 0.16 (about 1 in 6). **Fix (builder):** "(1 in 9 when clues are right 2 in 3)", or compute `(1 - ACCS[q]) ** 2` and print it. Then re-submit c4. |
| c5 | verified | Exact binomial (own code): P(<50) = 0.00019893 (1 in 5,027), P(=50) = 0.00022041. Seeds 1-10,000 and 1-10,101: 2 red majorities, 3 ties. **Advisory:** "Pooled wrong" does not tell the learner ties are excluded; at 60% there are 128 ties vs 163 wrong. Consider counting a tie as half wrong or labelling "Pooled wrong (red majority)". |
| c6 | verified | 0.3077 -> "30.8%", 0.0588 -> "5.9%"; simulation 3,094 and 594 of 10,000. |
| c7 | verified | Separate tally per accuracy, seeds t.n+1..t.n+count; readout label matches. |
| c8 | withdrawn | Not in learner text. Kept finding: Anderson & Holt (1997), "Information Cascades in the Laboratory", AER 87(5): 847-862 (RePEc via search) report cascades formed in most periods where an imbalance arose. It was a **laboratory**, not classroom, experiment ("classroom" is Anderson & Holt 1996, JEP "Classroom Games"). If reinstated, drop "classroom". |

**Result:** 6 verified, 1 disputed (c4), 1 withdrawn (c8). Lesson is blocked until c4's reveal line is fixed.
