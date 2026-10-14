# Fact-check: tortoise-meets-hare, 2026-10-14

Checker: fact-checker (wrote none of these claims). Read Demo.tsx (and model.ts where present) before checking each claim; re-ran numbers with own node scripts.

## Pass 19

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 | verified | Own node trace (th.mjs): slow 2,3,4,5,6; fast 3,5,7,4,6; meet on box 6 at tick 5. Matches at()/haltTick() in Demo.tsx and the reveal. |
| c2 | verified | Same trace, gap (slow - fast) mod 5 on boxes 3-7: 3, 2, 1, 0 at ticks 2-5. Matches gapOf() readout. |
| c3 | verified | Derivation: per tick fast moves 2, slow 1, so the ring distance changes by exactly 1 and, from a whole number, reaches 0 without skipping. |
| c4 | verified | Trace with no 7->3 arrow: slow 2,3,4, fast 3,5,7; box 7 has no next at tick 3; stage halts there. |
| c5 | verified | Own script over tails 0-10 x loops 1-10 (110 cases): 0 failures to meet. |
| c6 | verified | Floyd attribution corroborated by a secondary source citing Knuth TAOCP Vol. 2 p. 7, ex. 6 (one other secondary source numbers it ex. 7); Knuth itself not opened. "Two markers" true by the code: only two positions stored. |

Disputes: none. Suggested source tweak (builder, optional): cite "TAOCP Vol. 2, 3.1, exercises 6-7".

Result: 6 verified, 0 disputed, 0 withdrawn.
