# Fact-check: two-cells-sum-any-range (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: cs/two-cells-sum-any-range v1. Method: read Demo.tsx first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node: running totals of 3 1 4 1 5 9 2 6 are 3, 4, 8, 9, 14, 23, 25, 31; Demo prefix() and 'Next total' (truth[built.length]) produce the same row. |
| c2 | verified | Own node: all 36 ranges l..r equal P[r] − P[l−1] (P0 = 0); days 3-7: 25 − 4 = 21 = 4 + 1 + 5 + 9 + 2. Paths: checkRange records only from a complete, non-stale row; if the learner presses 'Day 3 + 1' before building, the reveal quotes the edited values (26 − 4 = 22 = 5 + 1 + 5 + 9 + 2), still true and on the trace line. Reset does not clear qSeen. |
| c3 | disputed | The arithmetic of building holds (7 additions; adds is always N − 1). But 'after that any range costs two reads and one subtraction' is not true of every range, and the stage shows the exception: a range starting at day 1 reads one total and subtracts nothing (readout 'Days 1–6: total 23 · reads 1 · adding: 6 numbers'). The stage opens at from 1, to 6, so this is the first range the learner sees. 8 of the 36 ranges start at day 1. The reveal repeats it: 'Any range costs one subtraction, however long.' Fix (builder; owner decides wording): 'at most two reads and one subtraction' in the claim and reveal, or define the zero total P0 on the stage so day-1 ranges also read two cells. Blocks publishing. |
| c4 | verified | Own node: adding 1 to day 3 changes totals 3..8, 6 of 8. Traced every order: edit before build, edit mid-build (row mixes old and new totals) and repeated edits always count 6 stale against the new truth (built totals from day 3 on are always from a smaller day-3 value). staleSeen is recorded only from a complete row; the reveal prints it. |

Dispute c3 is on the board as W-499 (demo-builder). After the fix, a fact-checker re-checks it.

## Pass 36 (2026-10-14, W-637 re-check after the pass 35 fixes)

Checker: fact-checker (fresh instance per the W-280 ruling; drafted none of this wording, and was not a pass 35 session). Artifact: cs/two-cells-sum-any-range v2. Order: read Demo.tsx first, then the claim text, then the source fields, this file's Pass 35 table and build.md. Numbers re-run in node (and Python where noted) from copies of the lesson logic and independent re-implementations; no dev server, no screenshots (QA and reveal-fit are W-638, not this pass). Web sources could not be opened (tc39.es DNS failure), so nothing here rests on an unopened source. Scripts: session scratchpad fc36/.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own node over all 36 ranges of 3 1 4 1 5 9 2 6: building P = 3 4 8 9 14 23 25 31 takes 7 additions; every range equals P[r] - P[l-1] (or P[r] when l = 1) against brute-force sums, 36/36; max reads 2, max subtractions 1; 8 ranges start at day 1 (1 read, 0 subtractions). Demo readout prints 'reads 1' / 'reads 2' accordingly; reveal 'Any range costs at most one subtraction, however long.' matches. |
