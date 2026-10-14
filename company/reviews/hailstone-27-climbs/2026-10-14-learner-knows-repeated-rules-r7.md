*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7): hailstone-27-climbs
lesson version: v2
boundary: knows-repeated-rules. Knows a rule can be applied repeatedly; does not know that tiny rules give wildly different run lengths, or that nobody has proved they all stop.
Screenshots seen: yes (artifacts/walkthroughs/hailstone-27-climbs/sheet.png)
Verdict: revise

## 1. From the artifact (written before reading the r6 review or meta.json)

- Predict: the options are now three bands of the same kind ("Under 30 / 30 to 100 / Over 100"). The locked stage shows 27 at step 0 on a 0–100 axis with a table of "?". No answer before the commit: pass. "Under 30" is a real, tempting wrong answer.
- Explore: Step (27 → 82) makes the rule concrete. "Run to 1" rescales to 10,000 and draws the jagged climb to 9,232. That is the surprise, and the stage carries it. The table fills cell by cell: 26 → 10/40, 28 → 18/52, 97 → 118/9,232. The line "No known formula fills a ?. Run it." with the "?" cells is a decent on-stage stand-in for "you can't predict it, you must run it".
- At the 10,000 scale the 26 and 28 traces still sit flat on the baseline, so the table does the contrast work, not the picture.
- 97's trace overlays 27's, shifted right. I can see they share a shape.
- Reveal: 111, 9,232, 10, 18 and 118 all match the table, which is still on stage. **But "at 94 it lands on 27's path" names a number I never saw.** No readout, label or step shows 94. I can't tell whether 94 is a step or a value: "97 took 118: at 94" reads like step 94. That breaks "every number the reveal names … is still visible on the stage".
- Reveal layout: the plot's top (the peaks) is cropped in the reveal frame, so the 9,232 climb the reveal opens with is half off screen.
- "Nobody has proved every start reaches 1": the reveal ties it to the "?" table ("Each ? stayed a ? until you ran that start"). That's better than a bare told sentence. But "no formula gives the count" and "nobody has proved they all stop" are different claims, and a learner may merge them.
- Would a first-time learner get the main idea (tiny rule, wildly different runs) from the stage? Yes, from the 27 climb and the table.

## 2. Earlier findings (r6)

1. Exact "111" option among bands gave the answer away: **fixed**.
2. "Unproved" was told only: **mostly fixed**. The "?" table and "No known formula fills a ?" line now stand for unpredictability, and the reveal points at them. The leap from "no formula" to "unproved for all starts" is still told.
3. Stage cropped (start buttons mid-explore, peaks on reveal): **partly fixed**. The buttons are visible in later frames, but the reveal still crops the plot top.
4. 26/28 traces invisible at the 10,000 scale: **not fixed** (minor).
5. 97 overlapping 27 unexplained: **fixed in words**, but with a number (94) the stage never shows. See below.

## 3. New findings

- **Revise (top):** the reveal's "at 94 it lands on 27's path" quotes a value not on the stage and reads ambiguously (step or value). Mark the join point on the 97 trace, or drop the number and point at the overlapping traces.
- Should fix: the reveal frame crops the top of the plot, where the peak it names sits.
- Minor: 26 and 28 traces flat at the 10,000 scale.
- No FATAL.
