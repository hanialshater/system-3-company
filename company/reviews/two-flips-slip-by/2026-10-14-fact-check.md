# Fact-check: two-flips-slip-by (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (did not write or build these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) against each claim, then re-derived every number in my own node scripts (session scratchpad fc4/). Books cited from memory were not opened; rows say where a verdict rests on derivation instead.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Demo CHECK = sum mod 2 and passes() = even count; matches the definition of even parity (Tanenbaum and Wetherall 5e, 3.2.2, from memory, not opened). |
| c3 | verified | node: all 255 non-empty flip patterns on 1011010+0: passes iff flip count even (0 mismatches). |
| c5 | verified | DATA has four 1s, check 0 (node); stage legend says "four 1s", "check: 0". Last clause read as "cannot reliably guard": true, since any even number of flips passes. |

**Result:** all claims verified (c2, c4 from 2026-10-13 still verified). Lesson fully verified.
