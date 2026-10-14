*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r8): one-crowded-bucket
lesson version: v3
boundary: knows-counting-sort (meta.json learner: knows counting sort tallies values instead of comparing them; does not know that bucket sort is fast only when values spread evenly across buckets). Same tag as r7.
Screenshots seen: yes (artifacts/walkthroughs/one-crowded-bucket/sheet.png, 5 frames, build 5 walkthrough; 05-reveal.png opened at full size)
Verdict: revise

## 1. From the artifact (written before reading build.md)

Path walked: chose "About 1, as before"; Drop into buckets; Sort buckets; Clumped; opened reveal.

- **No answer before the commit: pass.** Options "About 1, as before" / "About 10" / "About 30" are at the same precision. Locked stage: hand row, ten empty buckets, readouts 0 / ? / ?. The title "one of them crowded" and the hook "always fast?" lean away from "About 1", but they do not choose between 10 and 30. Note only.
- **Show the why: pass.** Spread: nine buckets, 64 and 70 together, 1 comparison. Clumped: a tower of ten in 41-50 with a test count on each tile, a "Seen, clumped: 1+1+3+3+2+6+3+6+5 = 30" row, and the spread result kept on its own Seen row. The tower plus tallies is the cause, drawn.
- **Reveal quotes what you saw: pass in content.** 9 buckets, 64 & 70, 1 comparison, 41-50, the sum and 30 are all on the two Seen rows when the reveal opens.
- **The reveal fits with its picture: fail (revise).** In 05-reveal the stage top is cropped: the instruction line, the hand row and the top of the 41-50 tower (tiles 49 and 50) are above the screen. Only the bottom of the bucket chart (about 150 px tall) shows. The reveal names "42 and 44 made 6 tests each", which are tile tallies on that picture; at the reveal they are about 3 px (kit shrink) and not readable. The Seen rows carry the sum, so the argument survives, but the rule asks for stage-top crop 0.
- **Text budget: fail.** About 111 words, over 90. The told restatement ("Each newcomer slid past every bigger number already there ... 42 and 44 made 6 tests each. Both runs are on the Seen rows.") duplicates the Seen row.

## 2. Earlier findings (r7, v2)

1. Tower top cropped at the reveal, tallies uncheckable: **partly fixed**. The sum is now a Seen row, so it can be checked, but the stage top (and the tower top) is still cropped at 390x844.
2. Spread layout quoted after the clumped view replaced it: **fixed** ("Seen, spread" row).

## 3. New findings

1. **Revise (top):** at 390x844 the open reveal crops the stage top (instruction line, hand row, tower tiles 49-50 off screen), and the reveal is about 111 words. Bring the reveal to 90 words or less (for example, drop the "42 and 44 made 6 tests each" clause, which names labels that are 3 px at the reveal, and "Both runs are on the Seen rows") and fold stage text so the stage top is on screen. Measure crop 0 and record it in Pre-flight item 7. cm-cs picks the cut.
2. Kit (W-287): tile tallies about 3 px at the reveal. Not counted as a lesson revise.
- No FATAL.

## 4. After reading build.md

Pre-flight v3 says "Both rows and the tower are on stage at the reveal" and that the phone scroll is "the kit fix in progress; not worked around here". In build 5 the tower is still cropped. Under the 2026-10-14 fit decision this is the lesson's to fix (cut text, fold stage text), not the kit's. No item 7. Findings unchanged.
