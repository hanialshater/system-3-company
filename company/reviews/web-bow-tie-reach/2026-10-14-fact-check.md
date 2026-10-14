# Fact-check: web-bow-tie-reach (2026-10-14)

## Pass NCM-1 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal, recall) and model.ts first, then re-ran the lesson's own model.ts in node 22 (type-stripping, `@/kit/random` repointed to a copy of src/kit/random.ts; scratchpad `fc/`) or my own re-typed rule where there is no model.ts. No walkthrough transcript exists yet for this slug (artifacts/walkthroughs/ empty for it), so the stage was read from code. Web: the egress proxy 403s/DNS-fails cornell.edu, berkeley.edu, wikipedia.org, arxiv.org, repec, nowpublishers and the Brin-Page mirrors; sources were checked through web-search results (quoted abstracts, catalogue records, secondary summaries), as each row says. Easley and Kleinberg: chapter numbers confirmed from library catalogue records; no section number could be confirmed from a reachable source, so every section stays `section_unconfirmed`.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own BFS over the 14 edges copied from Demo.tsx: A-D 7 each, E 10, F 8, G 3, H 2, I 1, J 1, K 2, L 1. Reveal computes `reach(p).size` for the first page tapped in each of core/in/out; matches. |
| c2 | verified | Undirected BFS from A: A-J (10); K-L separate. Predict sentence "10 of them are joined to the central group" matches. |
| c3 | verified | reach(A..D) = {A,B,C,D,G,H,I}; only A-F reach A; nothing in A-D links to E or F. Reveal (out to the right, nothing back to the left, right end leads almost nowhere: G 3, H 2, I 1) matches. |
| c4 | verified | Broder et al. 2000 bow-tie (strongly connected core about 28%, IN, OUT, tendrils, disconnected components) corroborated by the abstract and secondary summaries in search; primary PDF unreachable. E&K ch. 13 = structure of the Web (catalogue). **Advisory (non-blocking):** the reveal omits tendrils (similar in size to IN/OUT per secondary sources) and "a few detached pieces" understates the disconnected part. Consider "...pages it leads out to, and other pieces hanging off or cut off". |
| c5 | verified | Abstract as quoted in search: "two AltaVista crawls each with over 200 million pages and 1.5 billion links"; Nature news 2000: "200 million web pages". "About 200 million" holds. Percentages still not shown and still only secondary-confirmed (core about 28%); do not add IN/OUT figures without the paper. |
| c6 | verified | Disclosure present in reveal. |
| c7 | verified | Sum of (reach - 1) = 44 of 132. |

Curriculum reference: `section_unconfirmed: "13.3"` stays (not confirmable; the brief said 13.3-13.4).

**Result:** 7 verified, 0 disputed, 0 withdrawn.


## Pass NCM-2 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the builder's revision. Method: read the current Demo.tsx (predict, stage text, readouts, reveal and the milestones that gate it) and model files, then re-ran the lesson's own code in node 22 via tsx (Demo.tsx copied to scratchpad with its internals exported, CSS import stubbed; model/abm files imported directly). Reveal check: every number or sentence the reveal prints was traced to a state the milestones guarantee the learner reached, or to a claim. The walkthrough transcript predates this revision (08:4x vs Demo.tsx 09:xx), so the stage was read from code, not from a fresh walkthrough.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Ran Demo.tsx reach() on all 12 pages: A-D 7 (ABCDGHI), E 10, F 8, G 3, H 2, I 1, J 1, K 2, L 1. Reveal code quotes reach(p).size only for firsts.core/in/out; in the reveal the stage shows firsts.core filled and the other two dashed-ringed. Matches. |
| c3 | verified | reach() from A, B, C, D never contains E or F (node check); all four reach G, H, I. Reveal paragraph 1 matches. |
| c4 | verified | Broder et al., Computer Networks 33: 309-320 (2000) re-confirmed by search (two AltaVista crawls of over 200 million pages; bow-tie: SCC core, IN, OUT, tendrils, disconnected components). Primary PDF unreachable through the proxy. Advisory: Meusel et al. (WWW 2014, 'Graph structure in the web - revisited') report that the bow-tie proportions depend heavily on the crawl; 'the real web has this shape too' is defensible (the decomposition exists for any directed graph) but the attributed form ('Broder and colleagues found...') is the safer learner sentence. |

**Reveal check:** Reveal quotes reach() only for the first core/IN/OUT page tapped (all three milestones). Broder paragraph is c4/c5/c6.

**Advisory (builder):** Meusel et al. (WWW 2014) report that the bow-tie proportions depend on the crawl. 'The real web has this shape too' is defensible, but the attributed form ('Broder and colleagues found ...', which the next sentence already uses) is safer.

**Result:** 3 verified this pass, 0 disputed, 0 withdrawn. Lesson now: 7 verified.
