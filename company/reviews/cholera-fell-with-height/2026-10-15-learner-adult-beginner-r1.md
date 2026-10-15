*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: cholera-fell-with-height
lesson version: v2
boundary: adult beginner (the brief's own boundary). Knows that cholera hit poor, crowded parts of Victorian London. Does not know how strongly deaths fell with height in Farr's table, or that height and water supply went together. Has heard "correlation is not causation" as a slogan but has never used it. (The brief's learner field was read before the walk, as the role's input; nothing else until the findings below were written.)
Screenshots seen: yes (artifacts/walkthroughs/cholera-fell-with-height/sheet.png, recorded 2026-10-15T10:04:45.309Z, production build on http://localhost:3590, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke: step 4, "One company's districts only", against the reveal.** Steps 1-3 build the story well:
   - low districts lose 92 per 10,000;
   - high districts lose 20;
   - colour by water company, and the low districts are mostly red (central Thames).
   I now think "so maybe it was the water, not the height". Then step 4 keeps only the central-Thames districts, and the readout says "CENTRAL THAMES: still falls with height". As a beginner I conclude: with the water held fixed, height still matters, so height is a real cause. Then the reveal says "this table alone cannot say which mattered" and never mentions what I just saw. The last thing I did points one way and the closing sentence points another, and I cannot reconcile them. (The step-4 scatter suggests why: the red dots all sit below about 50 feet, so the high districts have no central-Thames comparison. But nothing tells me that.)
2. **What the prediction felt like.** It felt fair. "About half as many" is the cautious beginner pick and "About the same" is the sceptic's pick. The locked stage shows only axes, and the hook does not size the effect.
3. **Did the reveal answer the question I actually had?** No. My question after step 4 was "so is it height after all?" The reveal answers the question I had after step 3.
4. **Reading the chart.** The x-axis is not even: 0, 20, 50, 100 and 350 are spaced as if on a compressed scale, and nothing says so. I first read the 80-feet-and-up cluster as being "near 100" in linear space. A small caption ("height axis squeezed above 100 ft") would help. The locked frame also shows a stray white strip at the bottom of the stage, which looks like an empty readout box cut off.
5. **Trust sheet.** The served build shows "4/5 claims checked" (c4, the step-4 readout, NOT YET CHECKED). I was told the claims are verified; the build may predate the fact-check.

Verdict reason: step 4 tells the learner that deaths "still fall with height" within one water company, and the reveal then says the table cannot separate height from water without addressing that step. The required last action contradicts the takeaway as a beginner reads it.

Concrete fixes (pick one):
- Make step 4 show why it cannot separate them. For example, the readout says "Central Thames only: still falls, but no central-Thames district is above about 50 ft", and the reveal adds a clause: "even within one company, the high districts are missing, so the table cannot tell height from water."
- Or cut step 4 and end on the water-company colouring, which is the state the reveal actually explains.
- Caption the squeezed x-axis.

## After reading build.md / meta.json

- The misconception ("a pattern as strong as this shows the cause") and the objective (the table alone cannot say whether height or water mattered) are exactly where finding 1 breaks. Step 4 is the one stage action that, read naively, *supports* the misconception.
- build.md v2 shows the readout was shortened from "Central Thames only: r = −0.68: still falls" to "still falls with height" to stop a 17 px stage crop. The shortening kept the half of the message that misleads. The fix needs to restore the missing half ("but nothing high to compare"), not the r value.
- meta.json lists all 5 claims verified; the served build shows 4/5.
