*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): a-star-heads-for-goal
lesson version: v3
boundary: adult learner who has done the earlier lessons: knows cheapest-first search settles cells in order of cost so far, and has watched a search spread in rings; does not know that a guess of the distance left can focus it, or why an honest underestimate keeps the shortest route (meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/a-star-heads-for-goal/sheet.png, 7 frames; 04-step-3.png opened alone to check the crop)
Verdict: revise

## 1. From the artifact

- Predict: hook "Add a guess of the steps left. Does the search still flood?" is neutral now. The locked grid shows S and G with "Guess at S: 6" above it. 7 can be worked out from the rule; nothing leaks.
- Explore, open grid: "Settle to goal" settles the middle row, "7 settled · route 6". My prediction held.
- Explore, wall: with the guess, 16 settled, route 10; with no guess, 46 settled, route 10. The table puts "16 · route 10" next to "46 · route 10", so "fewer cells, same route length" is now seen.
- **Where it loses me (main finding):** with the wall on, the stage is scrolled. In frames 04 to 06 the top two grid rows and the line "Guess at S: 6. Route: 10." are cut off. In the reveal frame the grid is gone completely, and only the legend, table and controls show. Yet the reveal says "Look at the line above the grid: at S the guess said 6 steps left, and with the wall the route took 10." For the brief's second gap item (an honest underestimate keeps the shortest route), that line is the only thing on stage that shows it. On a phone I never saw it with the wall on, so "too low, never too high" is in practice told. Fix: keep the guess-vs-route numbers in view, for example in the table cell ("guess 6 · route 10") or pinned under the grid, and keep the grid visible at reveal.
- Even when it is visible, the underestimate is one static number: nothing on stage changes when the guess is low. That may pass under the told-vs-shown rule, because the table shows the guarantee held. But the reveal has to point at something I can see.
- Minor: the open-grid "No guess" cell stays "?" on this path, so the objective's 7-vs-31 open contrast isn't seen. The wall contrast (16 vs 46) carries the same idea, so this is not a blocker.
- Minor: settle-order numbers sit under the route line (2, 3, 4, 10 to 14, 15, 16) and are hard to read. "16" overlaps the G ring.
- Minor: the tie-break sentence is told context, which is fine.

## 2. Earlier findings (r5, v2)

1. Hook stated the result: **fixed**.
2. Guarantee told, not shown (wall no-guess stayed "?"): **mostly fixed**. The table now shows 46 · route 10 vs 16 · route 10. The guess-vs-route line exists but is off screen (main finding above).
3. Dashed and circle marks unlabelled: **fixed** ("Numbers: settle order. Dashed: waiting to settle.").
4. Reveal frame crops the grid: **not fixed, worse**. The grid is entirely out of view at reveal, and the reveal now points at the cropped line.

## 3. New findings

- The open no-guess run is no longer on the QA path (minor, see above).
- No FATAL.
