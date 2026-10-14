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
