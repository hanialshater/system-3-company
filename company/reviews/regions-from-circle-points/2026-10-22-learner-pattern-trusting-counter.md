*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: regions-from-circle-points
lesson version: v2
boundary: can join points with straight lines and count pieces, and knows 6 people make 15 pairs; does not know that a pattern holding five times can still break, and expects 2, 4, 8, 16 to continue as 32
Screenshots seen: yes (artifacts/walkthroughs/regions-from-circle-points/sheet.png, recorded 2026-10-22T13:05:29.236Z)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke: it did not.** Each chip adds one point and fills one column of the table (points, lines, crossings, pieces). By 5 points I had watched 1, 2, 4, 8, 16 appear and expected 32. Then 6 points gave 31. Because the table is laid out as a sum, I could check the reveal's rule myself in every column: 1+0+0, 1+1+0, 1+3+0, 1+6+1, 1+10+5 and 1+15+15. The rule is told in the reveal, but the table I had just filled in confirms it.
2. **Drawing check (traced).** In the 6-point frame I counted 15 red crossing dots. None is shared by three lines: near the middle, the three long diagonals form a small shaded triangle instead of meeting at one point, so the "unevenly" condition in the question is visible. The 4-point frame shows one crossing and 8 pieces (4 caps and 4 triangles). The 5-point frame shows 5 crossings, which matches the readout.
3. **What the prediction felt like.** The question gives the doubling sequence and offers 32, so 32 was the strong pull. The walkthrough chose 30. Nothing on the stage explains 30 (the evenly spaced case). A learner who picked 30 because "something must go wrong" is told 31 but not why 30 is wrong. That is acceptable, because the question already rules out lines meeting at one spot.
4. **Whether the reveal answered my question.** My question was "why 31 and not 32?". The reveal answers it with numbers I had already seen: 1 + 15 + 15. It ends with the lesson's point, "Five matching cases are evidence, not a proof." The line "crossings come from groups of four" is stated, not shown. The 4-point frame (four points give one crossing) is the only support for it on the stage. This is a note, not a block.
5. **Note (not blocking): the 31 pieces cannot really be counted by hand.** The alternating two-tone shading helps, but on a phone, counting 31 pieces in the 6-point frame is impractical. The panel says "count the pieces", yet in practice the learner trusts the readout. Because the reveal's rule can be checked from the table, this does not undermine the lesson.
6. **Fit and controls.** At phone width the reveal fits under the shrunken circle and the table. After Reset the table keeps every column, so the milestone values survive while the circle goes back to 1 point. All targets are full-size chips.

Verdict reason: no finding blocks a first-time learner. The break from 32 to 31 is seen in the learner's own table, and the 1 + lines + crossings rule can be checked against every column. Findings 3–5 are notes only.

## After reading build.md / meta.json

- Not read (this stage reads only the walkthrough and the template).
