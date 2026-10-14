*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): seesaw-sit-closer
lesson version: v3
boundary: adult-beginner. Knows equal children at equal distances balance and that weight in newtons is mass × 9.81; has not met torque, or that balance needs equal torques, not equal weights (meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/seesaw-sit-closer/sheet.png, all 3 frames)
Verdict: revise

## 1. From the artifact

- Hook and predict: "Can the lighter child balance?" / "Can the lighter one ever win?" is a real tension. The options are 4.0 / 2.0 / 1.0 m, and 1.0 m catches the "lighter means sit closer" guess.
- **Where it loses me (top): the locked stage prints the rule that answers the question.** Under the plank, before I commit, the stage reads "turning effect = kg × 9.81 × m from the middle", with a 785 N·m bar for the 40 kg side and "20 KG SIDE ?" beside it. A learner who reads the stage can set 20 × 4 = 40 × 2 and pick 4.0 m by arithmetic. The prediction then tests reading, not intuition (board pattern W-154, same shape as the "SHORTCUT 72 ÷ RATE" leak found earlier in seventy-two-doubling). The formula is the right stand-in for the why once the stage unlocks. It should not be readable before then.
- Explore: one slider move puts the 20 kg child at 4.0 m. The plank levels, a second orange bar grows to 785 N·m, and PLANK reads "level". The two equal bars are a good picture of "same turning effect". In this run I saw no unequal state. The plank went from tipped (alone) to level in one move.
- Reveal: "At 3.0 m the bars were unequal (589 N·m against 785 N·m) and the 40 kg side went down." In this run I never saw 3.0 m. The transcript shows "not on yet" and then 4.0 m. If the slider passed 3.0 m in transit, it did not show long enough to see (W-150).
- Minor: the stage's own text (plank labels "2 m", "4 m", the formula line, "Light plank, pivot in the middle. Kids in kg.") is set very small, roughly 7–8 px on a phone. The readouts below are legible.
- Minor: "9.81" and "N·m" are unexplained for this learner. Kilograms times metres would carry the idea without them, but they are not wrong.

## 2. Earlier findings (r5 review, v2)

1. The locked stage showed the 20 kg child off the plank while the slider said 3.0 m: **fixed**. Locked, the slider reads "not on yet" and the child waits on the ground, so picture and control agree.
2. The learner never saw an unbalanced plank with both children on it, and the reveal quoted a position never visited (top in r5): **partly fixed, not visible in this artifact**. The reveal now quotes 3.0 m. A code comment in Demo.tsx says the child sits at 3.0 m on the tipped plank when the stage unlocks, and the gate needs a "tried-other" milestone. The walkthrough has no frame of that unlocked 3.0 m state, so from the artifact I cannot confirm a learner sees 589 vs 785. If the unlock frame does show it, this finding is fixed. The walkthrough owner could add a post-commit frame so reviewers can see it.
3. "N·m" and 785 were unexplained: **partly fixed**. The formula is now on stage, but see the top finding: it is visible while locked.

## 3. After reading the brief

- doesNotKnow "torque: turning effect = force × distance" and "balance needs equal torques": the paired bars and the level plank stand for both, and the reveal points at them. Once unlocked, that meets "Show the why you promised".
- **Top finding (revise):** that same formula ("turning effect = kg × 9.81 × m from the middle"), with the 40 kg side's 785 N·m, is readable before the prediction. Torque is the very thing the brief says this learner does not know, and the stage hands it over before they guess. The misconception ("only equal weights balance") never gets a fair chance to be wrong. Hiding the formula line until unlock, as was done for the 72 shortcut, would remove the leak. That is the builder's call.
- No FATAL.
