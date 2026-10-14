*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): one-odd-loop-blocks-two-camps
lesson version: v1
boundary: knows "two camps = friends inside, enemies across"; does not know that a network with missing links splits into two camps exactly when every loop has an even number of enemy links (from meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/one-odd-loop-blocks-two-camps/sheet.png)
Verdict: revise

## 1. From the artifact
- Title "The big loop looks fine. Is it?" signals "no, it isn't". With the hook's "Does that mean two camps can form?", the phrasing pushes toward "No". Mild leak.
- Predict, where understanding first broke: nothing on the stage or in the stem says what a "camp" rule is (friends in the same camp, enemies in opposite camps), and nothing says which lines are enemy links. I infer that the red dashed lines are enemies and the green solid lines friends, but there is no legend. Without the rule, "Can they split into two camps?" is a guess about an undefined game.
- Locked stage: a hexagon A–F with a cross link A–D, red dashed A–B and D–E. "?" readouts. Nothing leaks.
- Explore: "Big ring" highlights the hexagon: "2 enemy links, even". "Right loop" highlights A–B–C–D–A: "1 enemy link, odd". "Left loop" likewise: 1, odd. "Try all 64 splits": "0 of 64 splits work. Best try still breaks 1 link", and the nodes split into filled-blue vs dotted. "Move enemy D-E to C-D": "2 of 64 work", loop count "0, even". The counts and the 0/64 vs 2/64 contrast are on stage, and they carry the "what".
- The why ("walk round one: every enemy link switches camp, so after one switch you come back to A in the other camp") is told in the reveal only. The stage never walks a loop, and never shows the camp flipping at each enemy link and clashing back at A. The best-try colouring shows which link breaks, but nothing says that blue vs dotted are the two camps or which link is the broken one.
- Reveal: 2 even, 1 each, 0 of 64, 2 of 64 all match. Cropped at the top (A is hidden) over the reveal.

## 2. Earlier findings

No earlier learner review exists (only a fact-check). The boundary is taken from meta.json. This learner already knows the camp rule, so my "the rule is never stated" point drops to a minor legend issue (which lines are enemies).

## 3. Show the why you promised

The objective asks the learner to explain that "each enemy link on a loop switches camp, so a loop with an odd number of enemy links returns you to the start in the wrong camp". On stage the learner sees the counts (odd/even) and the outcome (0/64), but not the mechanism. No walk round the loop flips the camp at each red link and arrives back at A in the other camp. Under the decision, this cause is told only, which is a revise. A stand-in on the existing graph: when a loop is selected, step a token round it, tinting each node by camp and flipping the tint at each red link, so the learner sees A come back the wrong colour (and the right colour after the move to C-D). The reveal would then point at that.

## 4. New findings

- Blocking (top finding): the switch-camp-per-enemy-link mechanism is told, not shown (section 3).
- Should fix: add a two-word legend (red dashed = enemies, green = friends), and label the best-try colouring as the two camps, with the broken link marked.
- Should fix: the title "The big loop looks fine. Is it?" leans toward "No". Consider something more neutral.
- Should fix: the graph is cropped at the top over the reveal.
- No FATAL.
