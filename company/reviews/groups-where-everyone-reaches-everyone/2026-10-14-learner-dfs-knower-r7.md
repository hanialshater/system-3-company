*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r7, wave F): groups-where-everyone-reaches-everyone
lesson version: v2
boundary: dfs-knower (knows depth-first search and that one-way edges can give an order; has never heard of strongly connected groups or Kosaraju's two passes)
Screenshots seen: yes (artifacts/walkthroughs/groups-where-everyone-reaches-everyone/sheet.png)
Verdict: launch

## Findings (written from the walkthrough before reading meta.json or earlier reviews)

Path walked: chose "2"; Pass 1: finish order; Reverse roads; Pass 2: next group; Pass 2: all groups; Shrink groups; Start over; opened reveal.

1. **The idea is on the stage.** Pass 1 labels each town with its finish place (6 = 1st ... 7 = 7th). The arrows flip on "Reverse roads". Pass 2 floods yellow {7}, then blue {1, 2, 3}, then pink {4, 5, 6}. The status line says "3, 7 already coloured", which shows the key fact: the reversed roads out of a new group (4 to 3, 6 to 7) hit towns that already have a colour, so the flood stops at the group's edge. "Shrink groups" draws the two loops as circles with 7 outside them and the arrows 3 to 4 and 7 to 6 between them, "No loop". A learner who knows DFS sees why the method works, not only that it does. My hand trace of the finish order and the floods matches the stage.
2. **The wrong guess is answered.** "2" (7 joins the right loop) is answered on stage by 7 staying yellow and outside the pink circle, and in the reveal: "no road leads into 7".
3. **The reveal quotes what was seen, and it survives Reset.** After "Start over" the stage keeps a "Last run:" trace with the three groups and the shrunk order. The reveal's groups, roads and order all match it.
4. **No answer before the commit: passes.** Options 2 / 3 / 7 are all bare numbers. The locked stage is the uncoloured map with "Pass 2: no groups yet".
5. **Minor (phone layout):** with six buttons, the GROUPS / ROADS readouts are clipped at the bottom of the stage from step 4 on, and in the reveal frame the map has scrolled almost off the top. The "Last run" trace carries the reveal, so it does not block.
6. **Minor:** the card says 75S, over the 60-second budget. The question can also be answered by eye (two triangles plus 7), so the predict tests seeing the groups, not the method. The method then becomes the payoff, which is acceptable for this boundary.

## After reading the brief and the r6 review

r6 (v1) findings:
1. {7} and {1, 2, 3} shared one colour: **fixed** (yellow, blue, pink).
2. "The groups form an ordering" told only: **fixed** ("Shrink groups" draws the blobs with only the joining arrows, "No loop").
3. "4 cannot reach back" read against reversed roads: **fixed** (Shrink restores "ROADS as given", and the reveal says "In the roads as given").
4. QA path could not reach the reveal: **fixed** ("Pass 2: all groups"; the recorded path reached the reveal).
5. No reason on stage for finish order or for starting from the last to finish: **partly fixed**. The "already coloured" line and the reveal's second paragraph carry the why. Acceptable for this objective.
6. 75 s chip: **not fixed**, minor, product-owner item.

Verdict reason: a first-time learner with this boundary gets the idea from the stage. Remaining items are minor (clipped readouts on phone, 75 s).
