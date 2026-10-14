# Learner review (final): new-road-slower-trip (division only)

date: 2026-10-14 - reviewer: learner-evaluator (borrowed mind: can divide and add; believes a new road cannot hurt; no Braess, no equilibrium) - version: walkthrough at c9e4df0d, phone, option 0 ("About 40 min", the trap). Current reveal text read from Demo.tsx.
Screenshots seen: yes (sheet.png all 5 frames; 01-predict.png in full). Hypotheses only.

**Verdict for the current version: launch.**

## 1. Findings from the artifact (before meta.json, earlier reviews, build.md)

**Idea the learner lacks:** when every driver picks their own fastest route, a free link can leave everyone slower, and nobody can fix it alone.

- **Answer visible before predicting?** No. Title ("One free link, two busy routes") and hook ("How long is a trip?") are neutral. The stem gives all numbers. The locked stage shows 20 / 0 / 20, so "40" is computable and is the natural trap; nothing gives 80. Options 75 and 80 both sit above 65, a mild hint that "worse" is on the table.
- **What the prediction felt like.** Arithmetic, not guessing. Picking 40 felt solid and step 1 confirmed it (After: new route 40 with the quicker marker, switch back 65). That is a good trap.
- **Where understanding first broke.** Step 3. Run moves everyone to 4,000 and the new route reads 80 while "Switch back" reads 85. The busy-road labels (4,000 cars, 40 on both) explain 80, and the learner sees Before link 65 beside it on the same stage. The "Switch back" tile is labelled in the caption ("one driver leaving the new route") and the quicker-trip marker is explained ("quicker trip"). The earlier unexplained-marker problem is gone.
- **Told vs shown.** Shown: cars and minutes on each road at 0, 1,000, 4,000 on the new route; "Before link 65" next to "New route 80"; "Switch back 85". Told: "every one of them lost 15 minutes" (a subtraction of numbers on the stage) and the name "Braess's paradox". The brief's gap ("a free road can raise everyone's time because each picks the best for themselves", and the equilibrium) is on the stage as 65 versus 80 plus 85, so passes the 2026-10-14 decision.
- **Residual gap.** Run jumps from 1,000 to 4,000 in one press; the learner never sees drivers deciding step by step, and the number "Switch back 85" is the only sign that nobody wants to leave. A learner who skims the tiles may read 85 as a second answer. The reveal says "switching back would take 85, so nobody leaves", which closes it, but it does not say which road a switcher would use.
- **Reveal quotes only reached states.** Yes: 40 vs 65 (step 1) and 4,000 (reached); the 2,000 sentence is conditional on having seen 2,000 (the script saw 1,000 and skipped it). Pass.
- **Other branches.** Correct pick (80) gets "Your prediction held", others "Not quite". The learner who picked 65 or 75 hits the same body, which is addressed by the numbers. A learner who never pressed Run is gated out of the reveal by the milestones.
- **Phone.** Predict stage: the graph is small, edge labels and "2,000 cars" are about 9 to 10 px at this viewport (01-predict.png): legible but fine print, and the four control tiles and four buttons fill the stage. Reveal stage is scaled but keeps A, S, E, B and the 65 tile. The sheet shows the control row on the stage fully visible (no clipping).

**Top remaining finding:** the all-at-once Run hides the moment each driver decides, so "nobody gains by leaving" rests on one tile (Switch back 85); and the stage text on a phone is small.

## 2. Compared with meta.json (after section 1)

doesNotKnow (a free road can raise everyone's time; equilibrium) is on the stage as 65 vs 80 and 85. The objective's "both busy roads carry all 4,000, each 40" is on the stage as the labels and the reveal quotes them. The misconception (a new road never hurts, at worst unused) is confronted by the 40 then 80 reversal.

## 3. Earlier findings (previous reviews, then build.md)

- Title and hook gave away "worse": **fixed**.
- Reveal named the paradox without the why: **fixed** (cars labels, 40 + 0 + 40).
- "Old route 85" misread: **renamed** "Switch back", defined in the stage caption: **fixed**.
- Marker meaning unexplained: **fixed** (caption "the quicker trip").
- 65 only in the reveal text: **fixed** ("Before link 65" tile on the stage).
- Reveal frame cropped node A: **fixed** (A and S visible).
- Hero illustration not built (build.md): not a learner finding; routed to visual-designer by the builder.
