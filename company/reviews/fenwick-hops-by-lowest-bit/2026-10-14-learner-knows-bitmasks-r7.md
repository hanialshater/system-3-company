*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): fenwick-hops-by-lowest-bit
lesson version: v2
boundary: knows-bitmasks (knows bit masks and two's complement; does not know that x & −x gives a hop that makes prefix sums and updates both take about log n cells). Same tag as r6.
Screenshots seen: yes (artifacts/walkthroughs/fenwick-hops-by-lowest-bit/sheet.png, 7 frames)
Verdict: revise

## 1. From the artifact (written before reading r6 or the brief)

- Hook "Running totals are quick to read but slow to change. One bit trick makes both quick." sets a real tension. Options 13 / 3 / 1, all bare numbers. The locked stage draws the cells as bars (16 over everything, 8 over 1–8, 12 over 9–12, 13 alone) with cell 13 boxed. A careful reader could count the bars covering 1–13, but that is reading the representation, not a label pointing at "3". No leak.
- Read side, shown well: "Cell 13 covers 13. Clear its lowest 1 bit: hop to 12." with "13=1101 → 12=1100" under the bars. "Hop to 0" fills bars 13, 12, 8 green, the line grows to "13=1101 → 12=1100 → 8=1000 → 0=0000", and the caption says "Cells 13, 12, 8 cover 1–13: sum 61". With my boundary I can see each hop clears one 1 bit and the three bars tile 1–13.
- Update side, now shown: "Change position 1" outlines bars 1, 2, 4, 8, 16 in red and every Σ cell in red; readouts FENWICK CELLS CHANGED 5, Σ ROW CHANGED 16. The hook's "slow to change" lands on the stage.
- **Where it loses me (main finding):** pressing "Change position 1" wipes the read: the green bars and the binary line "13=1101 → 12=1100 → 8=1000 → 0=0000" disappear, and CELLS READ / SUM go back to 0 / 0. Only "1–13: 3 reads" stays. The reveal then names "cells 13, 12, 8 (1101, 1100, 1000)", "13, 9–12, 1–8" and "(61)", none of which is on the stage when it opens. In the reveal frame the stage shows CELLS READ 0 and SUM 0 next to text that says I read 3 cells for a sum of 61. Against "The reveal quotes what you saw" (quoted state still visible), this is a revise.
- Moderate: the up hop is not in binary. The down hop shows "13=1101 → 12=1100", but the up hop 1 → 2 → 4 → 8 → 16 appears only as red outlines, and "hopped up the other way" (add the lowest bit) is told in the reveal. My boundary can guess it from the powers of two, but the stage never shows 1 + 1 = 2, 2 + 2 = 4.
- Moderate: the stored cell values are never drawn. SUM went 9 → 61, but I never see what cell 12 or cell 8 holds (21 and 31), so "3 reads gave the sum" is a readout I take on trust, not an addition I watched.
- Minor: "Change position 1" does not say what the change is (+1? set to?) and no number on the stage changes value. The red boxes mean "touched", which is enough for counting, but it reads oddly.
- Minor: "Sum 1–15" and "Sum 1–7" only move the outline to cell 15 / 7 and zero the readouts; the caption still says "Change position 1…". A learner who presses them may think they did nothing.
- Reveal ~95 words, ends on "about log2 n hops, not n". Good ending.

## 2. Earlier findings (r6, read after section 1)

1. Revise, update path told only: FIXED. Red outlines on 1, 2, 4, 8, 16 and the Σ row, readouts 5 vs 16, gated before the reveal.
2. Moderate, binary of every down hop: FIXED ("13=1101 → 12=1100 → 8=1000 → 0=0000").
3. Minor, blank "Read cell , hop down" label: FIXED (button now reads "Read one cell, hop down").
4. Minor, Sum 1–15 / Sum 1–7 only reset to a new target: NOT FIXED (still only move the outline; now they also leave a stale caption).

## 3. New findings

1. **Revise:** the read trace the reveal quotes (cells 13, 12, 8; 1101, 1100, 1000; sum 61) is erased by "Change position 1", the required next step. Keep the read trace (green bars, binary line, CELLS READ 3, SUM 61) visible while the update is shown, or quote only what is still on the stage.
2. Moderate: show the up hop in binary or as "+ lowest bit" (1 → 2 → 4 → 8 → 16) on the stage, as the down hop is.
3. Moderate: the Fenwick cell values are not drawn, so the sum is not something the learner sees added.
4. Minor: Sum 1–15 / 1–7 leave a stale caption and zeroed readouts.
- No FATAL.
