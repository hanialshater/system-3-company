# Fact-check: news-comes-from-acquaintances (2026-10-14)

## Pass NCM-1 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal, recall) and model.ts first, then re-ran the lesson's own model.ts in node 22 (type-stripping, `@/kit/random` repointed to a copy of src/kit/random.ts; scratchpad `fc/`) or my own re-typed rule where there is no model.ts. No walkthrough transcript exists yet for this slug (artifacts/walkthroughs/ empty for it), so the stage was read from code. Web: the egress proxy 403s/DNS-fails cornell.edu, berkeley.edu, wikipedia.org, arxiv.org, repec, nowpublishers and the Brin-Page mirrors; sources were checked through web-search results (quoted abstracts, catalogue records, secondary summaries), as each row says. Easley and Kleinberg: chapter numbers confirmed from library catalogue records; no section number could be confirmed from a reachable source, so every section stays `section_unconfirmed`.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Stage rule line matches; Demo.tsx shows the rule broken exactly when A-B is close. Convention. E&K ch. 3 = strong and weak ties (catalogue). |
| c2 | verified | Own enumeration: 13 links; local bridges = [A-B]; all-close gives 6 broken triples (A: CB, DB, EB; B: FA, GA, HA); A-B weak gives 0; B-C absent; C-E, F-H present. |
| c3 | verified | All 8,192 labellings: 4,160 satisfy the rule; 64 have A-B close; none of those 64 gives A or B another close tie. General result (two strong ties => no strong local bridge) corroborated by course slides built on E&K ch. 3 (search). |
| c4 | verified | Within the model: A-B is the only cross-group link and must be weak; news path H -> F,G,B -> A -> C,D,E in Demo `HOP`. Reveal anchors it to the stage. |
| c5 | withdrawn | Not in learner text. Primary (AJS 78(6), 1973) unreachable. Secondary sources via search (Wikipedia "Interpersonal ties": 16.7/55.6/27.8%, N = 54) agree, and 9/30/15 of 54 reproduce, but per this pass's rule a figure not confirmed from the cited source is not verified. Before any learner use, a human checks Granovetter 1973, p. 1371 (or E&K ch. 3 text). |

**Reference fix needed (builder / cm-math):** `curriculum.references` uses `"section": "3.1"` and `"section": "3.2"` with a note "unconfirmed". The rule for this vertical is that unconfirmed sections go in `section_unconfirmed`. Move both. Lead, not confirmed: search results put "3.1 Triadic Closure" and "3.2 The Strength of Weak Ties" in the TOC, with strong triadic closure and local bridges discussed in 3.2. If so, c1's "§3.1" for strong triadic closure is likely 3.2. Check this against the book when it can be reached.

**Result:** 4 verified, 0 disputed, 1 withdrawn.
