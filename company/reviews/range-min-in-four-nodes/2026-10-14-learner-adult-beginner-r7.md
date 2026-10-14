*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r7, wave F): range-min-in-four-nodes
lesson version: v2
boundary: adult-beginner (knows halving a problem and keeping a tree of results; has never met a segment tree or range queries)
Screenshots seen: yes (artifacts/walkthroughs/range-min-in-four-nodes/sheet.png)
Verdict: revise

## Findings (written from the walkthrough before reading meta.json or earlier reviews)

Path walked: chose "10"; Positions 3 to 12; Combine the lit nodes; From slider to 5; To slider to 14; Change the value at 9; opened reveal.

1. **The idea is on the stage.** "Positions 3 to 12" lights four nodes: leaf 3, the block over 4 to 7, the block over 8 to 11, and leaf 12. The readouts say POSITIONS 10, NODES USED 4. A first-time learner sees 10 values covered by 4 boxes, and sees that the small boxes sit only at the ragged ends. Dragging the range keeps the count at 4 to 5. "Change the value at 9" outlines the 5 nodes on the path to the top and rewrites them (2 to 6 to 5 up the path). Both halves of the idea (few nodes to query, few to update) are shown.
2. **The reveal quotes a state that is no longer on the stage (revise).** The reveal names "[3], [4 to 7], [8 to 11] and [12]". By then the stage shows range 5 to 14 with a different lit set and NODES USED 5, and nothing records the 3-to-12 cover (no trace row). The milestone keeps the number honest, but "The reveal quotes what you saw" also asks that the quoted state still be visible as a trace, row or readout when the reveal opens. A learner who dragged the sliders has to remember four blocks from three steps ago. The "5 to 14 needed 5" sentence does match the stage.
3. **No answer before the commit: passes.** Title "Smallest of ten: how many looks?" and hook are questions. Options 10 / 4 / 2 are bare numbers. The locked stage lights only the root (range 0 to 15, 1 node), which is not an option.
4. **Minor:** after the slider moves, MINIMUM goes back to "?" and the learner has to press Combine again. The QA path never recombined, so the reveal frame shows "MINIMUM ?". It is not wrong, but it looks unfinished.
5. **Minor:** "Change the value at 9" does not say what the new value is (2 became 8). A learner has to spot the changed leaf. The rewritten nodes are outlined, which is enough to carry the point.
6. "At most about 2 log₂ n" and "no range needs more than 6" are told context. The second is a claim to check.

## After reading the brief and the r6 review

r6 (v1) findings:
1. Title "Ten values, four looks" gave the answer: **fixed** ("Smallest of ten: how many looks?").
2. Hook "far fewer" pointed away from 10: **fixed** (the hook is now a neutral question).
3. Readouts cropped below the controls: **fixed** (the readouts sit above the buttons in every frame).
4. Reveal quoted "1 to 14 needs 6", a range never visited: **fixed** (now quotes "your last range, 5 to 14, needed 5").
5. "(0-based)" in the stem: **fixed**.

New blocking item: the question's own cover ([3], [4 to 7], [8 to 11], [12]) is quoted in the reveal but is gone from the stage once the learner drags the range. Fix route: demo-builder (keep a trace of the 3-to-12 cover visible, or relight it at reveal). The idea is otherwise carried by the stage.
