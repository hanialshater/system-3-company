# Fact-check: friends-of-friends-overlap v1

checker: fact-checker · date: 2026-10-22 · lesson version: v1
Read in this order: artifacts/walkthroughs/friends-of-friends-overlap/ (transcript.md, sheet.png), then meta.json claims, Demo.tsx (RING_DIST, treeAt, ringedLinks) and the brief (company/domains/briefs/math.discrete.md #10). Did not read build.md or design.md.

Independent BFS (my own node script): ring of 1,000, 5 each side → d1 10, d2 10, d3 10, within 3 = 31, max distance 100. Tree: 10, 90, 810, total 911. The table in screenshots 02–06 matches these numbers.

| claim | new status | finding |
|---|---|---|
| math.friends-of-friends-overlap.c1 | verified | BFS recomputed. |
| math.friends-of-friends-overlap.c2 | verified | Arithmetic recomputed. |
| math.friends-of-friends-overlap.c3 | verified | Friend +3's links counted: 1 you + 6 friends + 3 new. |
| math.friends-of-friends-overlap.c4 | unverified | Source not checkable: the proxy blocks cs.cornell.edu and stat.berkeley.edu (both E&K PDFs). Secondary search results place the triadic-closure growth caution in ch. 20 (Fig. 20.1), not ch. 2, so the citation is probably wrong. Required: re-cite to the right chapter, checked by someone who can open the book (a human source check), and soften "much smaller" to "smaller" or scope it to "when most of your friends know each other". |

Unrecorded claims: none found. The hook and predict are questions. The reveal sentences map to c1–c4, and the recall "why" maps to c4.

Verdict: revise (c4 unverified; a blocked source plus a likely mis-cited chapter).

Sources consulted: search results only. E&K ch. 20 (https://www.cs.cornell.edu/home/kleinber/networks-book/networks-book-ch20.pdf) and ch. 2 (https://www.cs.cornell.edu/home/kleinber/networks-book/networks-book-ch02.pdf); both were blocked from direct reading.
