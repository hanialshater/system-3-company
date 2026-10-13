# Build note: seven-odds-leave-one (demo-builder, 2026-10-13)

- Intent: seven odd numbers as dot columns (pairs, plus one yellow leftover on top). Tapping a column adds a pair (1, 3 ... 13, then back to 1), so no column can become even. "Pair up the leftovers" moves the seven leftovers into a tray: three green pairs and one red single.
- Key state (two milestones): at least two numbers changed, and the leftovers paired. QA path: the seven columns, then the pair button.
- Start values 1, 3, 5, 7, 9, 11, 13 (total 49) from the brief; the total readout is "?" while locked. Not random, so no seed.
- Deviation from brief: the cycle wraps 13 -> 1 to keep columns on a phone; the QA path happens to land back on 49 (+12 then -12), which the reveal reports honestly as the count of distinct totals.
- After screenshots: moved-away leftover dots were nearly invisible; raised their opacity from 0.12 to 0.25.
- All numbers recomputed with node; all claims unverified, for the fact-checker.
