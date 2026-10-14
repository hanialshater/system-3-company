# Build note: fenwick-hops-by-lowest-bit

builder: algo2-b1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Single card. The classic Fenwick picture: 16 numbers (digits of pi) in a row. Each cell i is a bar over the positions it covers, raised by log2(lowbit). "Read cell i, hop down" fills that bar and the numbers it covers; "Hop to 0" finishes the run. Chips: Sum 1-13 / 1-15 / 1-7. "Change position 1: hop up" outlines cells 1, 2, 4, 8, 16, one per press, and cycles. Milestones: one-hop, tiled (reached 0 from 13).

## Answers re-run in node
- 13 -> 12 -> 8 (ranges 13, 9-12, 1-8), cells 9 + 21 + 31 = 61 = sum of the first 13. 15 reads 4 cells; 7 reads 3. Update from 1: 1, 2, 4, 8, 16. Recall: 22 reads 22, 20, 16.

## Known gaps
- The cell numbers sit at the right end of each bar in 9 px text, which may be small on a phone.
- The Fenwick 1994 citation comes from the brief and has not been opened. All claims are unverified.

## Pre-flight v2

builder: demo-builder (wave E revisions, batch 4) · 2026-10-14 · answers r6 learner review `2026-10-14-learner-knows-bitmasks-r6.md`

Changes: every hop's binary stays on stage as a trail ("13=1101 → 12=1100 → 8=1000 → 0=0000"), so "Hop to 0" no longer hides the second hop; the read button is "Read one cell, hop down" and never relabels (the blank-cell bug is gone); the update side is on stage: "Change position 1" outlines the 5 Fenwick cells in red and a new Σ row of plain running totals under the numbers, all 16 outlined, with readouts "Fenwick cells changed 5" and "Σ row changed 16"; finished sums are listed ("1–13: 3 reads"). Milestones: one-hop, tiled (1–13 reaches 0), update.

1. **Title and hook.** "Add up 13 numbers in how many reads?" / "Running totals are quick to read but slow to change. One bit trick makes both quick." Neither names a count. No.
2. **Options.** "13" / "3" / "1". All bare numbers. Yes.
3. **Locked stage.** The 16 bars at their levels, the 16 numbers and positions, the Σ row of running totals, cell 13 outlined as the target, readouts all 0, caption "Cell i covers the last (i & −i) numbers up to i. Add up 1–13." No trail, no green bars, no "3".
4. **Reveal values.** "cells 13, 12, 8 (1101, 1100, 1000)", "ranges 13, 9–12, 1–8", "3 reads", "(61)": (b) recorded at milestone tiled, read from the sums record. "1 → 2 → 4 → 8 → 16", "5 Fenwick cells", "all 16": (b) milestone update; the red outlines and both readouts stay until another update. "about log2 n": told context, claim c5.
5. **QA path.** DOM order: Read one cell, hop down (one-hop), Hop to 0 (tiled), Change position 1 (update): 3 of 3 in the first three presses. Then Sum 1–13 is disabled (already the target), Sum 1–15 and Sum 1–7 change the target. When the reveal opens the red outlines, "Fenwick cells changed 5", "Σ row changed 16" and the list "1–13: 3 reads" are on the stage. The green bars for 13 are cleared by Change position 1, so the 1–13 tiling survives only as the list line and in the reveal's quoted record.
6. **Reset.** There is no Reset; the Sum buttons clear the read bars but not the sums list or the update marks. Expected reveal after the QA path: "From 13 = 1101 you read cells 13, 12, 8 (1101, 1100, 1000): each hop cleared one 1 bit. Their ranges, 13, 9–12, 1–8, tile 1–13 with no gaps, so 3 reads gave the sum of 13 numbers (61). / The lowest 1 bit of an index is the length of its cell's range. Changing position 1 hopped up the other way, 1 → 2 → 4 → 8 → 16: 5 Fenwick cells changed, while the running-total row under the numbers changed all 16. Both directions take about log2 n hops, not n." (Read from the code; this batch does not run QA.)

## Pre-flight v3

r7 findings: "Change position 1" wiped the read trace the reveal quotes; up hop not in binary; cell values never shown; Sum 1–15 / 1–7 left a stale update caption. Fixes: the update no longer clears the read; its own line "Change position 1, hop up by adding the lowest 1 bit: 1=00001 → 2=00010 → 4=00100 → 8=01000 → 16=10000" sits under the trail (new claim c7, unverified); the read caption no longer turns into the update caption; the history line is now "Seen: 1–13: cells 13=1101 (13), 12=1100 (9–12), 8=1000 (1–8): 9 + 21 + 31 = 61, 3 reads", which survives Sum 1–15 / 1–7. "Change position 1" is disabled once pressed (no dead press). Not done: the button still does not say what the change is (minor).

1. **Title and hook.** "Add up 13 numbers in how many reads?" / "Running totals are quick to read but slow to change. One bit trick makes both quick." No count given or implied.
2. **Options.** "13" / "3" / "1", all bare numbers.
3. **Locked stage.** The cell bars (classic Fenwick picture) with cell 13 outlined, the 16 numbers, the Σ row, caption "Cell i covers the last (i & −i) numbers up to i. Add up 1–13." No label, line or value says 3; readouts read 0.
4. **Reveal values.** "13 = 1101", cells 13, 12, 8, their binary, ranges 13, 9–12, 1–8, "3 reads", "(61)": (b) recorded in `sums` at milestone "tiled" (question's own case), shown in the Seen line. "1 → 2 → 4 → 8 → 16", "5 Fenwick cells", "all 16": (b) milestone "update", shown in the up line and the readouts 5 / 16. "log2 n": general (claim c5).
5. **QA path.** DOM order: "Read one cell, hop down" (one-hop), "Hop to 0" (tiled), "Change position 1" (update): all 3 milestones in 3 presses. Then Sum 1–13 / 1–15 / 1–7 each change the outline and caption. When the reveal opens the Seen line, the up line and the 5 / 16 readouts are on the stage.
6. **Reset.** No Reset control; the state-clearers are the Sum buttons, which keep the Seen line and the up line. Reveal from that run: "From 13 = 1101 you read cells 13, 12, 8 (1101, 1100, 1000): each hop cleared one 1 bit. Their ranges, 13, 9–12, 1–8, tile 1–13 with no gaps, so 3 reads gave the sum of 13 numbers (61). The lowest 1 bit of an index is the length of its cell's range. Changing position 1 hopped up the other way, 1 → 2 → 4 → 8 → 16: 5 Fenwick cells changed, while the running-total row under the numbers changed all 16. Both directions take about log2 n hops, not n."

Not seen in a browser (no build/QA this wave).

## Pre-flight v4 (demo-builder, 2026-10-14, wave H batch 1, r8 knows-bitmasks: bar picture off screen at the reveal; W-340, W-329)

Fixes: the binary read trail, the counts ("1–13: 3 cells read, sum 61", "Fenwick cells changed: 5", "Σ: plain running totals · changed: 16") and the up hop ("Change position 1: hop up by adding the lowest 1 bit" / "1=00001 → … → 16=10000") are drawn inside the picture (viewBox 320x176 -> 320x212, in the free space above cell 16 and under the Σ row). The four readouts and the Seen line are gone; the finished caption carries the cell values ("Cells 13, 12, 8 cover 1–13: 9 + 21 + 31 = 61."). Picture labels 9 -> 10 px (cell numbers, positions, Σ row; drawn at about 1.06, so about 10.6 px). The Sum 1–13 / 1–15 / 1–7 targets are removed: on the QA path they cleared the 1–13 trace and zeroed CELLS READ / SUM beside a reveal that quotes 3 reads and 61 (r8 moderate), and they cost a control row. The target is always 1–13; once read and update are done every control is disabled. Reveal 93 -> 78 words (tool count): same values, "the running-total row under the numbers" -> "the Σ row".
Design change, not only compaction: dropping the other targets removes "try 1–15 (4 reads) or 1–7 (3 reads)" exploration. Board item for design-lead to judge it.
1. Title and hook: unchanged.
2. Options: "13", "3", "1".
3. Locked stage: bars with cell 13 outlined, numbers, Σ row, "1–13: 0 cells read, sum 0", "Fenwick cells changed: 0", caption "Cell i covers the last (i & −i) numbers up to i. Add up 1–13." Nothing says 3.
4. Reveal values: 13 = 1101, cells 13, 12, 8, binary, ranges, 3 reads, 61: (b) tiled, kept on stage as green bars, trail, count line and caption (no control clears them any more). 1 → 2 → 4 → 8 → 16, 5, 16: (b) update, red outlines, picture count lines and up lines.
5. QA path: Read a cell, hop down (one-hop), Hop to 0 (tiled), Change position 1 (update); then no enabled controls. All quoted state on stage at the reveal.
6. Reset: no Reset and no state-clearer. Reveal: "From 13 = 1101 you read cells 13, 12, 8 (1101, 1100, 1000): each hop cleared one 1 bit. Their ranges, 13, 9–12, 1–8, tile 1–13 with no gaps: 3 reads for 13 numbers (61). / An index's lowest 1 bit is its cell's range length. Changing position 1 hopped up, 1 → 2 → 4 → 8 → 16: 5 cells changed, against all 16 in the Σ row. Both ways take about log2 n hops, not n."
7. Phone fit: reveal-fit 390x844 (dev :3530): crop 0 px (was 278), hiddenBelow 0, namedHidden 0 (was 3: 12, 13, 61), 78 words (was 93), stage 359 px (picture 212, not shrunk), window 594. On screen at the reveal: caption, trail, counts, all cell bars (green 13/12/8, red 1/2/4/8/16), numbers, Σ row, up lines, buttons.
- Open (minor, r7/r8): "Change position 1" still does not say what the change is.
- meta.json 3 -> 4; c1, c2, c3, c4, c5, c7 reopened (unverified); c6 unchanged; interactions drop preset-buttons. Not run: build, QA, walkthrough.
