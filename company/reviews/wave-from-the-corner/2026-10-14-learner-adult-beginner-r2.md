*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (round 2): wave-from-the-corner
lesson version: v1
boundary: an adult beginner who uses map apps; assumes finding the shortest route means comparing routes.
Screenshots seen: yes (sheet.png, 17 frames, phone viewport). Re-review after the kit fix for clipped reveals (W-135); written fresh from this walkthrough.

## 1. From the artifact

- Prediction: corner to corner of an open 5 × 5 grid, moves up/down/left/right: 5 / 8 / 10. Quick and fair; 5 (cells per side) is the natural slip and I made it.
- Explore: "Next ring" labels the two neighbours 1; "All rings" floods the grid with distances 1 … 8 and "G reached at ring 8: 8 steps." The numbered grid is the whole idea in one picture. Strong.
- Walls: on my path (the QA order) I tapped cells left to right from the top, which walled S into its corner after a few taps; the stage said "Walls block every way to G" and then nothing else happened. So on this path I never saw the wave bend around a wall, while the reveal says "Walls only bend the wave; the labels stay true distances." That sentence describes something I did not see. A real learner would place walls more sensibly, so this is partly a walkthrough-path artefact, but nothing guides the learner to a useful wall (e.g. a short barrier) either.
- The reveal frame shows my walled-in grid while the text talks about "the open grid": a mismatch between picture and words at the moment of reading.
- Reveal values: ring 8 and the 4-across-4-down split were seen. "70 different shortest routes" is told (never shown, fine as a flourish).
- Phone clipping (the reason for round 2): fixed. The full reveal including "That is breadth-first search" and the trust link is visible. Badge 70S.
- Where understanding first broke: the walls step, which on this path produced only a dead end.
- Reveal earned: yes for "the wave labels distances; G's label is the answer"; "walls only bend it" not earned on this path.

Fixes (owner: builder, optional): seed one suggested wall or a "Try a wall" preset that bends the wave (e.g. a 3-cell barrier), and re-run the rings automatically after a wall is placed; when walls seal S, offer "Remove walls".

## 2. After reading the brief

- Objective (ring-by-ring labels give the distance; found without listing routes) is delivered by "All rings". The "walls only bend the wave" clause is the one part my path did not earn; it is a secondary clause and the recall does not depend on it.
- 4 claims verified by others; I cannot vouch for them. Round-1 clipping resolved on this build.

Verdict: launch
