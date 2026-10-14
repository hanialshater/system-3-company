# Build note: near-the-wall

- Intent: one grid of 200 dots, each a random point in a d-dimensional cube; filled = within 5% of a face in at least one dimension. Dimension buttons 1-D, 2-D, 10-D, 100-D, then "New 200 points" (next seed). Readouts: near-a-wall count and the exact share 1 − 0.9^d. Model chip on the stage.
- Key state: viewing 10-D (milestone "saw-10d"), reached by the second button on the QA path. Readouts and fills are hidden while locked.
- Seeds: stage draws use seeds 1, 2, 3, ... in order (untuned; seed 1 at 10-D gives 132/200). The reveal quotes the learner's latest 10-D draw and the spread over 500 seeds (108-149 of 200), computed live by spread().
- Numbers re-computed in node from the lesson's own model: exact 10%, 19%, 65.1%, 99.997%.


## Revision v2

Review: stage never showed the box; nearest-neighbour line told; reveal clipped. Changes: 1-D and 2-D now draw the actual points in a line/square with the 5% edge band shaded (10-D and 100-D keep the tally grid); nearest-neighbour paragraph and claim c4 removed (nothing on the stage shows distance); reveal shortened. Version 2.
