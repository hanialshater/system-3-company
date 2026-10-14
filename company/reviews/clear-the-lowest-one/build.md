# Build note: clear-the-lowest-one

builder: algo2-b1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Single card. Three 8-bit rows: x (each bit is a toggle), x - 1 (bits that changed from x are highlighted) and the AND (the cleared bit in red). Decimal values sit at the right, with a trail 10110 -> ... below. The buttons come first in DOM order: x = x & (x - 1), Repeat until 0, Back to 10110, Try 11111111; the 8 bit toggles follow. Milestones: one-clear, zero.

## Answers re-run in node
- 10110 -> 10100 -> 10000 -> 0 (3). 255 -> 8. 2^30 -> 1 repeat; 31 right shifts to reach 0. 22 - 1 = 10101.

## Known gaps
- The brief's misconception ("minus 1 changes only the last digit, as in decimal") is false in decimal too (100 - 1 = 99), so the hook does not repeat it. The reveal says "not a last-digit change".
- 2^30 appears only in the reveal, because it does not fit in 8 bits. The K&R exercise citation comes from the brief and has not been opened. All claims are unverified.

## Pre-flight v2

builder: demo-builder (wave E revisions, batch 4) · 2026-10-14 · answers r6 learner review `2026-10-14-learner-knows-bit-masks-r6.md`

Changes: the "1 bits in x" readout is gone (the ones count now appears only in the finished-runs list, after a run reaches 0); the locked caption no longer states the mechanism; the third option names its reason like the others; the power-of-two test is a stage run ("Run from 10000", labelled "(power of two)"); 255 is a run button and a milestone; the 2^30 / right-shift sentence is dropped; the reveal points at the 10100 − 1 = 10011 frame. Milestones: one-clear, start-zero (a run from 10110 reaches 0), pow2 (a non-start run of one repeat), long-run (a run of 5+ repeats).

1. **Title and hook.** "Minus one, then AND" / "Subtract 1, AND the two, and repeat until x is 0. What does the count of repeats measure?" Every option is a "what it measures" answer (positions, 1 bits, 0 bits), so the hook favours none. No.
2. **Options.** "5, one per bit position" / "3, one per 1 bit" / "2, one per 0 bit". All numbered, all with a reason. Yes.
3. **Locked stage.** Caption "Press x = x & (x − 1) and watch the three rows."; rows x / x − 1 / AND as plain bits with decimals 22 / 21 / 20 (no green, red or ring until the first press); trail "10110"; Repeats 0. No ones count and no finished-runs list. Nothing matches "3, one per 1 bit".
4. **Reveal values.** "From 10110 it took 3 repeats: 10110 → 10100 → 10000 → 0": (b) recorded at milestone start-zero, read from the runs list. "10100 − 1 = 10011": (b) 10100 is the first press's result (one-clear), read from the recorded start run. "10000 has one 1 bit, and one repeat gave 0": (b) pow2, read from the runs list (any one-repeat run is quoted with its own start). "11111111 took 8": (b) long-run, read from the runs list (the longest run is quoted with its own start and count).
5. **QA path.** DOM order: x = x & (x − 1) (one-clear, 10110 → 10100), Repeat until 0 (start-zero), Run from 10000 (pow2), Run from 11111111 (long-run): 4 of 4 in the first four presses. Back to 10110 and the 8 bit toggles follow. The finished-runs list ("10110: 3 repeats, 1 bits: 3", "10000: 1 repeat, 1 bits: 1 (power of two)", "11111111: 8 repeats, 1 bits: 8") stays on the stage whatever is pressed after.
6. **Reset.** There is no Reset; "Back to 10110" and the toggles change x and the trail but never the runs list the reveal reads. Expected reveal after the QA path: "From 10110 it took 3 repeats: 10110 → 10100 → 10000 → 0. Each time exactly one bit vanished, the lowest 1, so the repeats counted the ones. / Minus 1 is not a last-digit change: 10100 − 1 = 10011, three digits flipped. The lowest 1 becomes 0 and every 0 below it becomes 1. The AND keeps only bits the two share, so it clears that one bit. / 10000 has one 1 bit, and one repeat gave 0. That is the test: x > 0 is a power of two exactly when one repeat gives 0. 11111111 took 8, one per 1 bit again." (Read from the code, not from a browser run: this batch does not run QA.)
