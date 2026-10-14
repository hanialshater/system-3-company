*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): wheel-needs-four-colours
lesson version: v1
boundary: adult who knows backtracking tries a choice and undoes it on a dead end (four-queens-pruning) and has never thought about map colouring or odd rings.
Screenshots seen: yes (artifacts/walkthroughs/wheel-needs-four-colours/sheet.png, 14 frames)
Verdict: revise

## 1. From the artifact

- Hook: "Surely three colours keep every neighbour different?" is a fair bait toward 3. The title is neutral. The locked stage shows the blank wheel (C plus regions 1 to 5) and "Touching regions must differ". Nothing leaks. The colour buttons are cut off at the bottom of the locked frame.
- Explore: "Let backtracking try 3" coloured C red and the ring blue, yellow, blue, yellow. Region 5 was outlined red with "region 5: no colour left" and "6 dead ends, no colouring. Region 5 touches all 3 colours." The two colours alternating round the ring, with the last region meeting both, is visible on the wheel. That's the core cause, and it's shown well.
- "Allow a 4th colour" added purple. Picking region 5 and trying red, blue and yellow gave "red clashes with region C", "blue clashes with region 1" and "yellow clashes with region 4", each with the clashing neighbour outlined. That's a good hands-on check. Purple completed 6/6 with no clashes.
- "6 dead ends" is a number only. I never saw backtracking undo anything, so "tried every other choice" is taken on trust. For this boundary, who already knows backtracking, that's acceptable.
- Reveal: it points at what I saw (ran out at region 5, centre takes one colour, two alternate, the last meets both). **"With four regions round the centre, three colours are enough" is told, and I never saw a ring of four.** Without that contrast, I can't tell that *oddness* is the reason and not "rings are just hard". "Five is odd" is asserted, but the even case that would make parity visible isn't on the stage.

## 2. Earlier findings

No earlier learner review. Boundary taken from meta.json → learner.

## 3. New findings

- **Revise (show the why you promised):** the objective asks the learner to explain the odd-ring failure *while a ring of four needs only three*. The four-ring contrast appears only as told text. Reuse the same wheel with a "Ring of 4 / Ring of 5" toggle (same stage, no second panel), and make "3 colours on a ring of 4" a milestone. Then the reveal can point at the 4-ring that worked. This is a judgment call. The odd-ring failure itself is shown well; what's missing is the parity contrast the objective names.
- Minor: the locked frame crops the colour row.
- Minor: "6 dead ends" could get one visible undo (for example, flash the last retried region) so backtracking is seen and not just counted.
- Minor: the last reveal sentence (no fast method for big maps) is told context. It's fine if claimed.
- No FATAL.
