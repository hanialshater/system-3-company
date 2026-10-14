*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): range-min-in-four-nodes
lesson version: v1
boundary: adult who knows halving a problem and keeping a tree of results (merge-sort-payoff, heapify-from-the-bottom) and has never met a segment tree or range queries.
Screenshots seen: yes (artifacts/walkthroughs/range-min-in-four-nodes/sheet.png, 7 frames)
Verdict: revise

## 1. From the artifact

- **The title gives the answer.** "Ten values, four looks" sits above the question "how many stored nodes do you combine?" (10 / 4 / 2). Anyone who reads the title picks 4. The hook ("A tree needs far fewer") also rules out 10. Together the title and hook leave one sensible option.
- Locked stage: the 5-level tree of minimums over 16 leaves, with the whole root lit for 0 to 15 ("NODES USED 1"). It's a clear picture. The stem's "(0-based)" is programmer jargon for this boundary; the position labels under the leaves do the job without it.
- Explore: "Positions 3 to 12" lit exactly [3], [4 to 7], [8 to 11], [12] and showed NODES USED 4 for 10 positions. "Combine the lit nodes" gave "Minimum of 3 to 12 is 2, from 4 stored nodes." Dragging From to 5 kept 4 nodes. Dragging To to 14 made 5 nodes. "Change the value at 9" outlined the 5 rewritten nodes from leaf to root, with the stage line saying so. Both doesNotKnow items (range = a few stored nodes; an update touches only its path) are on the stage, and I made both happen.
- The readout row (POSITIONS / NODES USED / MINIMUM) is cut off at the bottom of the stage in every explore frame. I only saw the values in the reveal frame.
- Reveal: the four nodes, "ragged ends need small nodes" and "5 nodes on its path" all point at things I saw. "1 to 14 needs 6, and no range needs more than 6" is a range I never selected (I saw 5 to 14 = 5). "About 2 log₂ n" is told, which is acceptable as context for the bound, but log₂ is unexplained for this boundary.

## 2. Earlier findings

No earlier learner review. Boundary taken from meta.json → learner.

## 3. New findings

- **Revise:** retitle so it doesn't state the answer. For example "Ten values, how many looks?" or "The smallest of ten, fast". Optionally soften the hook's "far fewer".
- Minor: the readouts are cropped below the controls while exploring. Move them above the sliders or shrink the tree.
- Minor: "1 to 14 needs 6" quotes a range the learner never visited. Either cite one they did (5 to 14 → 5) or make 1 to 14 a preset.
- Minor: drop "(0-based)" from the stem; the leaf labels already show it.
- No FATAL.
