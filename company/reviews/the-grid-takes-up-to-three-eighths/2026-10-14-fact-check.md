# Fact-check: the-grid-takes-up-to-three-eighths (2026-10-14)

## Pass 22

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-ran each number in my own node scripts (copies of the lesson's logic plus independent re-implementations) or checked the source. Sources marked "not opened" were checked against my own knowledge only; Easley & Kleinberg chapter titles were confirmed through web-search results (library-catalogue tables of contents), as the book's host and mirrors are blocked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node copy of simulate() on the framed 41x41 grid: 5x5 takes 1,521 at 1/4 (34 rounds) and 3/8 (51); stays 25 at 2/5, 1/2, 3/5. |
| c2 | verified | Own node neighbour counts beside a 5x5 block: side middle 3, near corner 2, off corner 1; max outside 3. |
| c3 | verified | Own node: 7x7 stays at 49 at 2/5, 1/2, 3/5, takes all at 1/4 and 3/8. Any cell outside a rectangle touches at most 3 of its cells. |
| c4 | verified | Own node on 201-person path: all 201 at 1/4, 3/8, 2/5, 1/2 (100 rounds); only 2 at 0.51 and 3/5. |
| c5 | verified | Verified on own derivation for the infinite networks, not the book: q > 3/8 needs 4 of 8, and no cell outside a finite set's bounding box touches more than 3 cells inside it, so no finite seed spreads; at q <= 3/8 a kxk block (k>=3) fills its four side rows and then corners, giving a (k+2)x(k+2) block, so it grows forever. Same bounding-interval argument gives 1/2 for the line. Definition and E&K ch. 19, sec. 19.7 'Advanced Material: The Cascade Capacity' confirmed via web-search TOC; the book's own 3/8 figure not opened (host blocked). Morris 2000 not opened. The reveal does not attribute 3/8 to the book, so nothing learner-visible depends on the unopened text. |

**Result:** 5 verified, 0 disputed, 0 withdrawn.

## Pass 24 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims reopened by the v2 wave E revision. Method: read v2 Demo.tsx (note per state, results table, Reset, Line at 1/2, conditional reveal clauses) before the sources, then re-ran both networks in my own independent simulator (scratchpad fc24/grid.mjs).

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Above 3/8 need is 4, 4, 5; 5x5 stays 25, 7x7 stays 49 at 2/5, 1/2, 3/5; all blocks take 1,521 at 1/4 and 3/8. Wording note: 'needs 4' means at least 4 (5 at 3/5). |
| c4 | verified | Line: 201 at q up to 1/2, 2 at 3/5. Line-half milestone guarantees the quoted 201; the 'where the grid stuck' clause is conditional on the table. |

**Result:** every claim open at this pass is now verified.
