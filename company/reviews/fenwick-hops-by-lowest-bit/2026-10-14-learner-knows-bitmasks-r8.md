*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8, build 5 walkthrough): fenwick-hops-by-lowest-bit
lesson version: v3 (meta.json version 3; the walkthrough shows the v3 up-hop line and claim c7)
boundary: knows-bitmasks (knows bit masks and two's complement; does not know that x & −x gives a hop that makes prefix sums and updates both take about log n cells). Same tag as r6/r7.
Screenshots seen: yes (artifacts/walkthroughs/fenwick-hops-by-lowest-bit/sheet.png, 8 frames; 08-reveal.png opened at full size)
Verdict: revise

## 1. From the artifact (written before reading build.md)

- No answer before the commit: pass. Title "Add up 13 numbers in how many reads?", hook about running totals vs one bit trick, options 13 / 3 / 1 (bare numbers). Locked stage: the bar picture with cell 13 boxed, readouts 0. Nothing labels 3.
- The read path is shown well, and the r7 blocking defect is fixed: after "Change position 1" the green bars 13, 12, 8, the binary trail "13=1101 → 12=1100 → 8=1000 → 0=0000" and CELLS READ 3 / SUM 61 stay on stage (frame 04). The new line "Change position 1, hop up by adding the lowest 1 bit: 1=00001 → 2=00010 → … → 16=10000" shows the up hop in binary (r7 moderate fixed). The Seen line "1–13: cells 13=1101 (13), 12=1100 (9–12), 8=1000 (1–8): 9 + 21 + 31 = 61, 3 reads" gives the cell values as an addition (r7 moderate fixed).
- **Main finding (The reveal fits with its picture): the whole bar picture is off screen when the reveal opens.** In 08-reveal.png the stage starts at the up-hop caption; the cell bars, the 16 numbers and the Σ row are above the card's visible top. The reveal points at them: "Their ranges, 13, 9–12, 1–8, tile 1–13 with no gaps" (the bars) and "the running-total row under the numbers changed all 16" (the red Σ row). Neither is on screen. The quoted values survive in text (Seen line, readouts 5 / 16), so the quote rule holds, but the picture that makes "tile with no gaps" visible is gone. Reveal is ~89 words, so the fix is folding stage text (the caption, Seen line, four readouts and six buttons stack under the picture), not cutting the reveal.
- Moderate: the Sum 1–13 / 1–15 / 1–7 buttons (the last three QA presses) clear the green read bars and zero CELLS READ / SUM, so at the reveal the readouts say "CELLS READ 0, SUM 0" right above a reveal that says I read 3 cells for 61. The Seen line carries the numbers, but the two disagree on screen for a moment.
- Minor (from r7, not fixed): "Change position 1" still does not say what the change is.
- Labels inside the picture read fine during explore (frames 02–07). At the reveal the picture is not visible at all, so I cannot judge label size there.

## 2. Earlier findings (r7), read after section 1

1. Revise, "Change position 1" erased the read trace: FIXED.
2. Moderate, up hop not in binary: FIXED.
3. Moderate, cell values not drawn: FIXED in the Seen line (9 + 21 + 31).
4. Minor, Sum 1–15 / 1–7 stale caption and zeroed readouts: caption fixed; readouts still zero (now moderate, see above).

## 3. After reading build.md (Pre-flight v3)

- Pre-flight 5 says "When the reveal opens the Seen line, the up line and the 5 / 16 readouts are on the stage". True, but it does not consider the picture. There is no Pre-flight item 7 (phone fit); the build was "not seen in a browser".
- Verdict: revise, one blocking finding (picture off screen while the reveal points at its bars and Σ row). No FATAL.
