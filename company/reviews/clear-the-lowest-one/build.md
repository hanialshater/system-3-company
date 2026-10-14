# Build note: clear-the-lowest-one

builder: algo2-b1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Single card. Three 8-bit rows: x (each bit is a toggle), x - 1 (bits that changed from x are highlighted) and the AND (the cleared bit in red). Decimal values sit at the right, with a trail 10110 -> ... below. The buttons come first in DOM order: x = x & (x - 1), Repeat until 0, Back to 10110, Try 11111111; the 8 bit toggles follow. Milestones: one-clear, zero.

## Answers re-run in node
- 10110 -> 10100 -> 10000 -> 0 (3). 255 -> 8. 2^30 -> 1 repeat; 31 right shifts to reach 0. 22 - 1 = 10101.

## Known gaps
- The brief's misconception ("minus 1 changes only the last digit, as in decimal") is false in decimal too (100 - 1 = 99), so the hook does not repeat it. The reveal says "not a last-digit change".
- 2^30 appears only in the reveal, because it does not fit in 8 bits. The K&R exercise citation comes from the brief and has not been opened. All claims are unverified.
