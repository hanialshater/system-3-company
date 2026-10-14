*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7, wave F): a-star-heads-for-goal
lesson version: v4
boundary: adult-beginner. Adult learner who has done the earlier lessons: knows cheapest-first search settles cells in order of cost so far, and has watched a search spread in rings; does not know that a guess of the distance left can focus it, or why an honest underestimate keeps the shortest route (meta.json learner field, same tag as r6).
Screenshots seen: yes (artifacts/walkthroughs/a-star-heads-for-goal/sheet.png, 7 frames)
Verdict: launch

## 1. From the artifact (written before reading r6 or the brief)

- Hook "Add a guess of the steps left. Does the search still flood?" is a question. Options 7 / 25 / 49 all numbered, same precision. Locked stage shows S, G and "Guess at S: 6"; 7 can be reasoned from the score rule but nothing on the stage marks the middle row or the number 7. No leak.
- Open grid: "Settle to goal" numbers the middle row 1 to 7 and the table fills "7 settled · route 6". The search going straight at G is seen, not told.
- Wall on: the guided run bends round the wall (16 settled, route 10); "No guess" floods the grid (46 settled, route 10). The table holds both side by side: fewer cells, same route length. That is the payoff, on the stage.
- The line under the table changes from "Real route with the wall: ?" to "10" once the wall run finishes, next to "Guess at S: 6". That is the stand-in for "the guess is too low, never too high", and it is still visible in the reveal frame. The reveal says "Look at the line under the table" and it is there.
- Reveal values (7, 6, 46, 16, 10, guess 6) all match readouts on the stage at reveal time.
- Weak spot, not a blocker: the underestimate is shown as one instance (6 vs 10), never contrasted with an overestimate, so "never too high, so it never makes a shorter route look worse" is still a told mechanism resting on one visible case. For this boundary it is enough to anchor the sentence.
- Minor: the grid is scrolled out of the reveal frame; only the table and line remain. Since the reveal now points at the table and line, this no longer hurts.
- Minor: the open-grid "No guess" cell stays "?" on the QA path, so the objective's 7-vs-31 contrast is not seen; the wall contrast (16 vs 46) carries it.
- Minor: settle-order numbers under the route line (10 to 14, 16 over the G ring) are hard to read.
- Minor: the locked frame crops the table at the bottom of the stage ("No guess ? ?" half cut).

## 2. Earlier findings (r6, v3)

1. Main: guess-vs-route line cut off above the grid while the reveal pointed at it: **fixed**. The line moved under the table, is visible at reveal, and the reveal text now says "under the table".
2. Underestimate is one static number: **partly fixed**. It now appears when the wall run finishes (the learner makes it change), which meets "Show the why you promised" at its minimum. Not contrasted.
3. Open-grid no-guess stays "?": **not fixed** (minor).
4. Settle numbers hidden under the route line: **not fixed** (minor).
5. Grid gone in the reveal frame: **not fixed**, but no longer load-bearing.

## 3. Verdict

launch. A first-time learner with this boundary sees the guided search head straight for the goal and, with the wall, settle 16 cells to the flood's 46 for the same 10-step route, with the low guess shown next to the real route. No FATAL.
