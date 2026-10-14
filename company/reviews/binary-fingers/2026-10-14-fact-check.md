# Fact-check: binary-fingers (2026-10-14)

## Pass 22

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-ran each number in my own node scripts (copies of the lesson's logic plus independent re-implementations) or checked the source. Sources marked "not opened" were checked against my own knowledge only; Easley & Kleinberg chapter titles were confirmed through web-search results (library-catalogue tables of contents), as the book's host and mirrors are blocked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node: sum of VALUES = 1023 = 2^10-1; cell 1023 is row 15, column 63 of the 64x16 grid (last cell). |
| c3 | verified | Own node: the 1024 patterns give 1024 distinct sums 0..1023. Counting +1 visits n+1 each time, so no skip or repeat. |
| c4 | verified | Doubling argument correct; 2^10 = 1024. |
| c5 | verified | 8+4+2+1 = 15; 16 = 10000 in binary; stage caption at 16 matches. |
| c6 | verified | Demo.tsx: 1024 cells, cell k is number k, made-set cells lit; 'Numbers made' = made.size. Current number is drawn in a darker shade but is in the set. |

**Result:** 5 verified, 0 disputed, 0 withdrawn.
