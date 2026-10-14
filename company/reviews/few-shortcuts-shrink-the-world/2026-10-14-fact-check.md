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


## Pass NCM-2 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the builder's revision. Method: read the current Demo.tsx (predict, stage text, readouts, reveal and the milestones that gate it) and model files, then re-ran the lesson's own code in node 22 via tsx (Demo.tsx copied to scratchpad with its internals exported, CSS import stubbed; model/abm files imported directly). Reveal check: every number or sentence the reveal prints was traced to a state the milestones guarantee the learner reached, or to a claim. The walkthrough transcript predates this revision (08:4x vs Demo.tsx 09:xx), so the stage was read from code, not from a fresh walkthrough.

| Claim | Verdict | Basis |
|---|---|---|
| c8 | verified | Adding an edge cannot lengthen any shortest path, and any pair whose distance falls did so via a shortcut; model.ts adds shortcuts to an unchanged ringEdges(). Wording 'every pair it helps' as advised in NCM-1. |
| c9 | verified | Ran Demo.tsx route(c, 3, 50) on the current code: 24, 9, 5, 4 for 0, 1, 5, 20 shortcuts (ring distance 47 -> ceil(47/2) = 24). The reveal's hopsAt(0/5/20) = 24, 5, 4 are all reached states (milestones c5 and c20; 0 is the opening state). |

**Reveal check:** Specific check requested: the reveal's clustering sentence ('slid only from 0.500 to 0.435; a random network this size would sit near 0.04') quotes numbers that are no longer on the stage (the clustering readout and the 0.04 ghost mark were removed). Both numbers are values of states the learner does reach (0 and 20 shortcuts) and both are backed by verified claims (c3: 0.5000 and 0.4350 re-run today; c6: random-graph clustering near 0.04). So it is **not disputed** on fact-check grounds. The route sentence (24, 5, 4) and the averages (12.9, 6.8, 4.9) are all reached states (milestones c5 and c20).

**Routed, not a dispute (evaluation / builder):** the brief's doesNotKnow says neighbourhoods 'stay tight' and the objective asks the learner to explain that 'clustering barely falls (0.500 to 0.435)'. With nothing on the stage standing for clustering, this is a told-only cause inside the brief's gap, which `company/decisions/2026-10-14-told-vs-shown.md` makes a revise, and it is the W-150 pattern (reveal quotes values the learner never saw). Fix options: (a) put a clustering readout back on the stage, or (b) drop clustering from the objective and doesNotKnow and keep the reveal sentence as claimed context. **Stale source:** c6's source still says the 0.04 is 'Shown as a ghost mark, labelled Random network 0.04'; it is now reveal-only text. Builder should update the source line.

**Result:** 2 verified this pass, 0 disputed, 0 withdrawn. Lesson now: 9 verified.

## Pass NCM-3 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the final-polish revisions, plus a fresh read of every predict, stage label and reveal sentence against the claims. Method: diffed Demo.tsx/model since the NCM-2 record (commit 319d2bda), re-ran the lesson's current code in node 22 via tsx (model files imported directly; Demo-only functions reproduced verbatim or re-implemented independently), and traced each reveal sentence to a milestone-guaranteed state or a claim. No fresh walkthrough: the transcripts predate the v3 commits and a build was not attempted in this shared checkout, so stage text was read from code.

No open claims. **Stale line re-read (c6):** the source now says the 0.04 appears once, in reveal paragraph 2, with no stage mark. Confirmed: RANDOM_LEVEL is used only at Demo.tsx line 129; no ghost mark or clustering readout on the stage. Annotation added to c6's source. Since NCM-2 only meta.json changed (objective and doesNotKnow no longer name clustering, which closes the NCM-2 told-only item), Demo.tsx and model.ts are unchanged.

**Result:** 0 status changes. Lesson: 9 verified.
