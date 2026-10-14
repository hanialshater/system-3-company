# Fact-check: flaw-to-lawn (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each claim; re-derived by hand or in node (scratch scripts re-implementing or extracting the lesson model); web sources where named.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | F/L, L/A, A/W, W/N all differ; Hamming distance 4. Matches predict question text. |
| c2 | verified | Own node BFS over single-letter insert/delete/replace (alphabet FLAWN): LAWN first reached at depth 2; not reachable in 1 (lengths equal, 4 mismatches). Hand-traced Demo.tsx back-pointers: (4,4) left = insert N, then match W, A, L, then up = delete F. Stage text "delete F, keep L A W, insert N = 2". |
| c3 | verified | Hand-filled recurrence: rows 0 1 2 3 4 / 1 1 2 3 4 / 2 1 2 3 4 / 3 2 1 2 3 / 4 3 2 1 2, same as builder and Demo.tsx D. Copying the diagonal on a match is safe because D[i-1][j-1] <= D[i-1][j]+1 and D[i][j-1]+1 (adjacent cells differ by at most 1). Wagner & Fischer, JACM 21(1):168-173, 1974; CLRS 3e Problem 15-5 / 4e Problem 14-5 (edit distance, with a more general operation set). Sources cited from memory, recurrence confirmed by derivation. |
| c4 | verified | Deleting F gives LAW, aligned with L A W of LAWN; one insert of N finishes. Hamming count cannot shift. |
| c5 | verified | Cell (i,j) = distance between prefixes; recurrence uses only (i-1,j-1), (i-1,j), (i,j-1). 25 cells vs exponentially many edit sequences. |
| c6 | verified | (4+1)^2 = 25; given row 0 and column 0 = 9 cells; 16 inner, = CELLS = R*C in Demo.tsx. |
| c7 | verified | Spell correction ranks candidates by minimum edit distance (Jurafsky & Martin, SLP 3rd ed. draft, ch. 2 "Minimum Edit Distance", which also notes alignment use in computational biology); Needleman-Wunsch (J. Mol. Biol. 48:443-453, 1970) fills the same prefix-by-prefix grid with different scores. "This grid" read as "this kind of grid"; acceptable in a muted aside. Sources from memory. |
