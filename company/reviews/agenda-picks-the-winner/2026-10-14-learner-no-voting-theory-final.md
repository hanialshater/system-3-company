# Learner review (final): Who sets the order wins (boundary: no-voting-theory)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

Seen: walkthrough at c9e4df0d (phone), sheet.png (all 5 frames). Demo.tsx reveal read: one text, built from the three agenda runs, no per-choice branches (pinned stage always shows the predicted agenda, vote 1 A vs B). Boundary: knows a two-way vote goes to the option with more votes and what a ranking is.

## Findings (artifact first)

**Idea the learner lacks:** majorities can go in a circle, so no option is the favourite and the order of votes decides.

1. **Answer visible before predicting?** Title "Who sets the order wins" and hook "Change only the order of the votes" give the idea before the prediction. The prediction itself (who wins A vs B, then C) cannot be read off from those; it needs counting. So the idea is leaked, the answer is not.
2. **The question has rules the learner is not told.** "Who wins?" assumes each voter votes for the one they rank higher in each vote, and that the majority wins. The learner may ask "do voters vote strategically?". The assumption appears only at the end of the reveal ("as long as each voter votes for the option they like better in every vote"), after I needed it. The locked stage shows only the three rankings.
3. **Where understanding first broke:** the first guess (A, "voter 1 likes A best") is wrong; frame 02 shows A beats B 2-1, then C beats A 2-1, C wins. Counting is possible by hand but the stage does it for me, with vote lines showing the tallies. Frames 03 and 04 show the other two agendas elect A and B. The three winners are the surprise, and it lands.
4. **Told vs shown:** the cause (each option beats one rival and loses to another, 2 to 1) is on stage as a triangle of arrows filling in pair by pair, "3 of 3 pairs seen". The reveal points at it ("the group's majorities loop"). Shown, not only told. "The option held back to the last vote won every time" is read off three runs. Met.
5. **Reveal stage vs reveal text (earlier top finding): fixed.** The stage is now pinned to the asked agenda ("Your question: A vs B, then C ... Winner: C") beside "Not quite: it was C".
6. **Reveal quotes only reached states:** gate requires all three agendas, so all three outcomes quoted were seen.
7. **What I still ask:** is this a trick of these voters, or does it happen with real elections? The lesson claims only these rankings, no caveat on how common cycles are. The reveal's "whoever sets the order of the votes picks the winner" is true here; read generally it overreaches. It is scoped by "no option is the majority favourite", but a learner will carry it as a general law.
8. **Empty stage region** under the triangle in frames 02-04 (large blank space); layout only.
9. Walkthrough shows "2/5 claims checked" in the trust line while meta lists claims verified; the artifact predates a re-check (not investigated; fact-checker's gate).

## Earlier findings (r2) checked

Reveal stage disagreed with headline: **fixed**. Tidy last sentence: now one long sentence ending in the voting assumption; readable but heavy. Other minors unchanged.

## Verdict for the current version: **launch with notes**

Top remaining finding: the sincere-voting assumption the answer depends on arrives only as the last clause of the reveal, so the prediction is asked without its rules; title and hook also give away that order matters. Screenshots seen.
