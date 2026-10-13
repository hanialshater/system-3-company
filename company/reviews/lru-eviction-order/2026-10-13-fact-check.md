# Fact-check: lru-eviction-order (2026-10-13)

Checker: fact-checker (this session did not write or build these claims). Method: each claim re-derived with the lesson's own MODEL code run in node (scripts in the session scratchpad), Demo.tsx reveal and predict text read against the claims, sources checked by search where cited.

## Verdicts

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | simulation; recomputed or source confirmed, see Evidence |
| c2 | verified | simulation; recomputed or source confirmed, see Evidence |
| c3 | verified | convention; recomputed or source confirmed, see Evidence |
| c4 | verified | source; recomputed or source confirmed, see Evidence |
| c5 | verified | source; recomputed or source confirmed, see Evidence |

## Evidence
simulate(5,"lru") evicts B (last uses B2, C3, A4); simulate(5,"fifo") evicts A; 4 misses, 1 hit in both.

## Wording fixes (recommendations only; builder owns Demo.tsx)
None needed.

## Not verified by me
None; every claim above is checked.

## Pass 5

Checker: fact-checker (did not write these claims; builder-revised claims checked as rewritten). Claims set to verified: c4, c6.

Added during the pass (builder revision at 17:50): c4 rewritten, c6 new. Node LRU/FIFO simulation on A B C A D with 3 slots: LRU evicts B (leaves A,C,D), FIFO evicts A (leaves B,C,D); both 1 hit / 4 misses; a following B hits under FIFO only, a following A hits under LRU only. Denning 2005 CACM 48(7) and Silberschatz 10.4.4-10.4.5 / Redis eviction docs are real. I flipped c1-c6 before noticing the revision; each is checked here.
