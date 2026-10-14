# Fact-check: common-letters-in-order (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed and state-dependent ones) before the claim sources; re-ran every number in my own node scripts (scratchpad fc21/); checked sources by web search where reachable (most hosts, including the Easley-Kleinberg book site, are blocked; sources not opened are marked in each row).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node (scratchpad fc21/lcs.mjs): every substring of ABCBDAB tested against BDCABA; longest shared block length 2, exactly AB and BD. Reveal prints BLOCK.length = 2. |
| c2 | verified | Own brute force over all 127 and 63 non-empty subsequences: max common length 4, answers exactly BCAB, BCBA, BDAB; no 5-letter common subsequence. Grid corner L[7][6] = 4. |
| c3 | verified | Recurrence re-derived (optimal substructure: if the last letters match, an LCS ends with that letter; if not, it drops a last letter from one string) and matches Demo.tsx L fill and the per-cell note. CLRS not opened (no copy reachable); placement 3e 15.4 confirmed only via course-notes search snippet (Bowdoin CS231 'LCS (CLRS 15.4)'); 4e 14.4 from memory. The sentence does not depend on the book. |
| c4 | verified | Follows from the recurrence by induction on i + j: L[i][j] is the LCS length of the first i letters of ABCBDAB and first j of BDCABA, so L[7][6] answers for the whole strings. Stage text 'Each cell: the best answer for the first letters of each string' matches. CLRS not opened (see c3). |
| c5 | verified | Own traceback with up-on-tie: matches at (row, col) (2,1) (3,3) (4,5) (6,6), spelling BCBA, 4 letters; BCBA is a subsequence of both (own check). Demo PICKS/WORD use the same rule; reveal prints 'B, C, B, A'. |
| c6 | verified | Hunt and McIlroy 1976, Bell Labs CSTR 41: web-search summary of the paper (hosted at cs.dartmouth.edu/~doug/diff.pdf, PDF itself not reachable here) says diff's central method is finding a longest common subsequence of lines. Myers 1986 not checked; not needed for 'built on this idea'. |
| c7 | verified | 7 letters x 6 letters = 42 inner cells; Demo CELLS = R * C = 42 and stage reads 'Cell n of 42'; row 0 and column 0 are pre-filled zeros. |

**Result:** all open claims verified.

## Pass 24 (2026-10-14)

Checker: fact-checker. Wave E revisions (build.md Pre-flight read after the code). Method: read Demo.tsx against each open claim, including every reachable branch and the state after Reset/Start over; re-ran the numbers in node with ports of the lesson's own functions (mulberry32 copied from src/kit/random.ts). No web sources were needed: no learner sentence below rests on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own node: recurrence fills the 8 x 7 grid, corner 4, trace BCBA; step note matches (e.g. cell 1,1 'A != B: larger of up (0) and left (0) = 0'; Next row lands on A vs A, 'Diagonal 0 + 1 = 1'). CLRS not opened; sentence rests on the derivation. |
| c4 | verified | Own brute force over all subsequences of every prefix pair: L[i][j] equals the LCS length of the first i letters of ABCBDAB and first j of BDCABA for all 56 cells (0 mismatches). Stage label 'Best for ABC vs BD.' uses A.slice(0,i), B.slice(0,j). |
