*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7): selfish-routes-cost-a-third-more
lesson version: v3
boundary: adult-beginner (meta.json learner field). Knows that drivers pick the faster road and that a road slows as more drivers use it. Does not know that the selfish equilibrium can be worse on average than a planner's split (up to 4/3 with delays proportional to traffic). Same mind as r6.
Screenshots seen: yes (artifacts/walkthroughs/selfish-routes-cost-a-third-more/sheet.png, 5 frames)
Verdict: revise

## 1. From the artifact (written before reading r6)

- Predict: the options "No, 60 is best" / "Yes, to 45" / "Yes, to 30" are at the same precision. The locked chart now shows only the selfish point (100%, 60 min). Good, no curve.
- **Main finding (No answer before the commit):** the locked stage shows a button labelled **"Half on each"** next to "All on B (selfish)". The stem gives both delay rules, so "half on each" turns straight into 0.5 × 60 + 0.5 × 30 = 45. The button is a labelled target: it names the planner's split before I commit. Then, in Explore, it hands me the optimum in one tap, so I never look for the bottom myself.
- **Follow-on:** because the curve is hidden and the QA path visits only 90%, 100% and 50%, nothing on stage shows that 45 is the *lowest*. The reveal is careful ("the lowest average you found was 45"), but the right option says "to 45" as if it were the best. I took that on trust. If the learner had to find the bottom with the slider (with the trail showing it rise again below 50%), the stage would show both the minimum and why it is the minimum.
- What works: the caption at 50% ("B takes 30 min, A takes 60, so drivers on A want to switch") shows the planner's split isn't stable. The new line "Of 100 drivers, at 50% on B: 5 more join, saving 135 min; the 50 on B lose 150" is a stand-in for the cost that joiners don't feel, and the reveal points at it. It is dense, though. I had to read it twice to see that "lose 150" beats "save 135" and that this is the point.
- Reveal: 60, 45, 30, 135 and 150 are all on stage or in the readouts when it opens. 4/3 and "the worst it can ever be" are told context. The reveal frame still crops the chart off the top.

## 2. Earlier findings (r6, on v2)

1. The locked stage drew the whole curve with its minimum at 45: **fixed** (the curve is gone; the trail draws as you move). A smaller leak remains: the "Half on each" preset (main finding).
2. The cause (each joiner slows everyone already on B, which the joiner doesn't feel) was told, not shown: **fixed** (the "5 more join ... lose" line), with the density caveat above.
3. The reveal crops the top of the chart: **not fixed**.

## 3. After reading the brief

- doesNotKnow: "selfish can be worse than a planner's split" is shown (60 vs 45). "Up to 4/3" is told in one claimed sentence, which is acceptable as a bound no stage can show.
- To fix (builder's call): remove or rename the "Half on each" preset so it doesn't name the optimum before the commit. Or keep it out of the locked frame and let the slider trail find the bottom. Also make sure the stage shows the average rising again below 50%.
