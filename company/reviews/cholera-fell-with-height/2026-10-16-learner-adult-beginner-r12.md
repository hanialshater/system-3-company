*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: cholera-fell-with-height
lesson version: v3
boundary: adult beginner (meta.json learner field, read before the walk as the role's input). Knows that cholera hit poor, crowded parts of Victorian London. Does not know how strongly deaths fell with height above the Thames in Farr's table, or that height and water supply went together so the table cannot separate them.
Screenshots seen: yes (artifacts/walkthroughs/cholera-fell-with-height/sheet.png, recorded 2026-10-16T09:25:41.118Z, production build of HEAD c2923c9 on http://localhost:3591, phone viewport)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke: it did not break at the r1 point.** The r1 break was step 4 ("still falls with height" read as "height is a real cause"). The step-4 readout now says "Central Thames only: still falls, but none is high (max 22 ft)". In the step-4 frame all the red dots sit at or left of the 20 ft tick, and the 80 ft+ dashed band has no red dot near it. So the last thing I do now *shows* the gap: within one water company there is nothing high to compare. The reveal's "none on that water was high, so height and water went together, and this table alone cannot say which mattered" names the gap I just saw. The last action and the takeaway now agree.
2. **What the prediction felt like.** Fair. With 92 in the question, "about half as many" is the cautious pick and "about the same" is the sceptic's. The locked stage shows axes only. I picked "About the same" and got a plain "Not quite", with the 5x shown on the stage before the reveal says it.
3. **Did the reveal answer the question I actually had?** Yes. After step 4 my question was "so is it height or water?", and the reveal's second paragraph answers it ("cannot say which"). "Where it stops" (one year, by district) is short and fair.
4. **Still open, not blocking (from r1): the uneven x-axis.** 0, 20, 50, 100 and 350 sit almost evenly spaced and nothing says the axis is squeezed. A beginner may read "80 ft and up" as a wide band. It does not change the takeaway, which rests on the readouts. A short caption would still help.
5. **Small: the locked frame** still shows a thin white strip at the bottom of the stage (an empty readout box, cut off). It is cosmetic.
6. **Trust sheet** now reads 5/5 checked on the served build, and c4's text matches the step-4 readout word for word.
7. **Framing (for the cultural route, not judged here).** The lesson names districts and water companies, not a group of people. Whether a place-tied epidemic is on the sensitive route is localization-lead's ruling (W-889), and this review does not decide it.

Verdict reason: the r1 contradiction between step 4 and the reveal is gone. Step 4 now shows that no central-Thames district is high, which is the reason the reveal gives, so no finding blocks a first-time learner.

## After reading meta.json (build.md not read)

- The objective (a steep fall, about 5 times fewer, and the table alone cannot separate height from water) is what the walk delivered. Finding 1 is where r1 broke, and v3 fixes it the way r1 suggested: it restores the missing half of the readout ("none is high"), not the r value.
- The misconception ("a pattern as strong as this shows the cause") is now met by the stage before the reveal, not only in the reveal text.
- The squeezed-axis caption (finding 4) is a note for demo-builder, not a condition of this verdict. Slot 4 still needs the two neighbour answers (W-795, W-889) named in the five decision. They are not this role's call.
