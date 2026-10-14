*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): bad-start-kmeans
lesson version: v2
boundary: an adult with school-level maths and science, new to the topic (knows "average" and "nearest"; has never seen k-means or any clustering algorithm).
Screenshots seen: yes (artifacts/walkthroughs/bad-start-kmeans/sheet.png, all 8 frames)
Verdict: launch

## 1. From the artifact

- Predict: the hook is now "Same four points, same algorithm. Where does the grouping end up?", which does not give the answer away. The stem gives enough of the algorithm to simulate it by hand. The obvious answer, {0, 4} and {6, 10}, is the wrong one, so the prediction makes a fair surprise.
- Explore: one "Step" from 0 and 4 shows the orange centre at about 6.67 with lines from 4, 6 and 10, and the caption says "Settled: another step changes nothing". Step and "Run until settled" grey out. Then "Start at 2 and 8" gives {0, 4} {6, 10} at 16.0. The "Ends so far" log puts the two endings side by side (18.7 vs 16.0), so the contrast the lesson depends on is on the stage before the reveal.
- The label "SQUARED DISTANCE (LOWER = TIGHTER)" now says which way is better. I could follow "16 beats 18.7" without the reveal.
- Reveal: it explains why 4 stays (2.67 from one centre vs 4 from the other) using a picture I had already seen, and "from 2 and 8 you saw..." refers to something I actually did. "Usually run from several starts" is still told rather than shown, but it follows from two starts that ended differently.

## 2. Earlier findings (v1 review, 2026-10-13)

1. Explore path showed the start not mattering: **fixed** (the "Start at 2 and 8" button plus the "Ends so far" log).
2. Good start (2 and 8) and cost 16 never shown: **fixed**.
3. Total squared distance undefined: **mostly fixed** ("lower = tighter"). The leftover issue is new finding 1.
4. Intermediate step skipped: **acceptable now**. One step lands on the state the reveal describes (centre at 6.67) and the stage shows it, so nothing the reveal mentions is unseen.
5. Hook leaked the answer: **fixed**.

## 3. New findings

1. Minor: after nudging the start arrows, the stage reads "After 0 steps" with SQUARED DISTANCE 41.0 or 60.0 and a GROUPS value. A beginner may read these as outcomes next to the 18.7/16.0 endings. The "Ends so far" log keeps endings separate, so this is minor. Greying the number or labelling it "before any step" would remove the doubt.
2. Minor: "Start at 0 and 4" and "Start at 2 and 8" do the same job as the nudge arrows. The arrows are optional, and the panel does not ask for them.
- No FATAL.
