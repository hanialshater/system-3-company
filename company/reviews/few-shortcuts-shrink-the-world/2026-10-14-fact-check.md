# Fact-check: few-shortcuts-shrink-the-world (2026-10-14)

## Pass NCM-1 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal, recall) and model.ts first, then re-ran the lesson's own model.ts in node 22 (type-stripping, `@/kit/random` repointed to a copy of src/kit/random.ts; scratchpad `fc/`) or my own re-typed rule where there is no model.ts. No walkthrough transcript exists yet for this slug (artifacts/walkthroughs/ empty for it), so the stage was read from code. Web: the egress proxy 403s/DNS-fails cornell.edu, berkeley.edu, wikipedia.org, arxiv.org, repec, nowpublishers and the Brin-Page mirrors; sources were checked through web-search results (quoted abstracts, catalogue records, secondary summaries), as each row says. Easley and Kleinberg: chapter numbers confirmed from library catalogue records; no section number could be confirmed from a reachable source, so every section stays `section_unconfirmed`.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Lesson's model.ts: 12.8788, 10.3436, 6.7810, 4.8539; the 5 are the first 5 of the 20. Predict "12.9" and answer "7 steps" match. |
| c2 | verified | Seeds 1-20: 5 shortcuts mean 7.382 (6.380-8.291); 20 shortcuts 4.689 (4.474-4.857). |
| c3 | verified | Seed 1: 0.5000/0.4960/0.4800/0.4350; seed 1-20 means 0.496/0.482/0.434. |
| c4 | verified | Watts & Strogatz 1998, Nature 393: 440-442, random rewiring of a ring lattice (Physics Today 1998, networkx docs, via search). Newman & Watts 1999 (cond-mat/9904419) abstract: "instead of rewiring each bond ... add shortcuts ... and do not remove lattice bonds". Reveal parenthesis is right. E&K ch. 20 = small-world phenomenon (catalogue); 20.2 stays unconfirmed. |
| c5 | verified | By hand: 2 x sum ceil(k/2), k=1..49, + 25 = 1275; 1275/99 = 12.8788. |
| c6 | verified | Own simulation of 200 random graphs with 100 nodes and 200 edges: mean clustering 0.039; density 0.0404. |
| c7 | verified | `ringEdges()` = 200 distinct pairs. |
| c8 | verified | Adding a link never lengthens a shortest path; model adds to an unchanged ring. **Advisory:** "every route that can use it gets shorter" reads best as "every pair it helps"; tighter wording optional. |

**Advisory, not a claim (route to builder / cm-probability):** the objective says shortcuts cut the average "by more than half (12.9 to 6.8 with 5 links)" and learner.doesNotKnow says "by half or more". 12.88 -> 6.78 is a 47% cut; only 20 links (62%) is more than half. Not learner-facing, but brief text should be corrected.

**Result:** 8 verified, 0 disputed, 0 withdrawn.
