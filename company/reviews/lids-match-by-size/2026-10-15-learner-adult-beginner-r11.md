*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lids-match-by-size
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: This fit test compares the opening diameter with lid diameter. A matching colour supplies no geometric constraint; the selected equal-diameter example meets the simplified size condition.)
Screenshots seen: yes (artifacts/walkthroughs/lids-match-by-size/sheet.png, recorded 2026-10-15T21:35:12.661Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Match colour" (wrong); tapped "Match diameter"; slid Opening diameter 18 to 20 cm; opened reveal.

1. **Where understanding first broke: I could not tell which layout was on.** After I tapped "Match diameter", the stage highlighted the "Match colour" button (white, bold) and greyed "Match diameter". The readout said "Opening=18cm · lid=18cm, mismatch 0cm", so I read it as "matching by colour gives a perfect fit", the opposite of the lesson. The reveal's "the current match diameter setting" told me which one was active only afterwards.
2. **The picture contradicts the numbers.** With opening and lid both 18 cm, the lid circle is drawn visibly larger than the opening circle. No colour is involved anywhere (a white circle and a beige one), so "match colour" has nothing on screen to compare.
3. **What the prediction felt like.** No decision. Nobody picks a lid by colour over size; the title "Fit needs diameter, not a colour" also gives the answer.
4. **Whether the reveal answered my question.** "The current match diameter setting gives 0cm" is robotic and the colour layout's failure is never shown. The final note (rim, seal and shape matter too) is the most useful line.

Verdict reason: the selected-state styling points at the wrong layout, the lid is drawn larger than an equal-size opening, and the colour case never fails on screen; fix the stage before re-walking.

## After reading the brief (meta.json)

- The meta.json learner.doesNotKnow field holds reveal text ("This fit test compares ... simplified size condition") rather than a knowledge gap; the boundary is under-specified. Route to the category manager.
- Stage defects (selected-state styling, lid drawn larger at equal diameters) are for demo-builder; worth a QA look since a reviewer can read the stage as teaching the opposite.
