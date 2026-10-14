*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r8): range-min-in-four-nodes
lesson version: v4
boundary: adult-beginner. Knows halving a problem and keeping a tree of results; has never met a segment tree or range queries (meta.json learner field, same tag as r7).
Screenshots seen: yes (artifacts/walkthroughs/range-min-in-four-nodes/sheet.png, 7 frames, recorded 2026-10-14T11:13Z, build 5 walkthrough)
Verdict: revise

## 1. From the artifact (written before reading build.md)

Path: chose "10"; Positions 3 to 12; Combine the lit nodes; From → 5; To → 14; Change the value at 9; reveal.

- **No answer before the commit: pass.** Title and hook are questions. Options 10 / 4 / 2 are bare numbers. The locked tree lights only the root (NODES USED 1), which is not an option.
- Explore: 3 to 12 lights leaf 3, [4 to 7], [8 to 11] and leaf 12, with POSITIONS 10, NODES USED 4. Combine gives "Minimum of 3 to 12 is 2, from 4 stored nodes". Dragging to 5 to 14 lights 5 nodes, and the old 3-to-12 cover stays as dashed outlines. Change at 9 outlines its path to the top. Both halves of the idea (few nodes to ask, few to rewrite) are on the stage.
- **The r7 top finding is fixed.** The row "Seen (first combine): 3 to 12 = [3] + [4 to 7] + [8 to 11] + [12], 4 nodes, minimum 2" stays on the stage after the sliders move, and it is visible in the reveal frame.
- **The reveal fits with its picture: fail (revise).** At 390×844 the reveal frame starts at the readout values ("10 5 ?"). The whole tree is off screen. The reveal points at things only the tree shows: "dashed when not lit", "the ragged ends need small nodes; the middle is covered by big aligned ones", and "only the 5 nodes on its path to the top were rewritten". None of these can be seen when the reveal opens. The reveal body is about 128 words (133 with the verdict line), well over 90.
- Labels: tree node digits and position numbers are readable in the explore frames. At the reveal the tree is cropped, not shrunk.
- Minor (carried): after a slider move MINIMUM goes back to "?", so the reveal frame shows "MINIMUM ?". It looks unfinished.
- Minor: "Change the value at 9" still does not say the new value until after the press. The status line now says "changed from 2 to 8", which is enough.
- Told context: "at most about 2 log₂ n", "No range of these 16 positions needs more than 6", "The same tree works for maximum or sum".

## 2. Earlier findings (r7, v2)

1. 3-to-12 cover quoted but gone from the stage: **fixed** (Seen row plus dashed trace).
2. MINIMUM "?" after slider: **not fixed** (minor).
3. Changed value not stated: **fixed** (status line).

## 3. New findings

1. **Revise:** the reveal body is about 128 words (> 90), and at 390×844 the tree is off screen when the reveal opens, but the reveal names the dashed nodes, the small end nodes and the 5 path nodes. Cut to ≤ 90 words and get stage-top crop 0 with the tree visible. Told context (the 2 log₂ n sentence, "no range needs more than 6", "maximum or sum") is the first candidate; the category manager decides which sentence goes.
2. Minor: MINIMUM reads "?" at the reveal after the sliders moved.
- No FATAL.

## 4. After reading build.md

Pre-flight v4 covers the Seen-row and dash logic (W-244) and says build, QA and walkthrough were not run. There is no item 7 (phone fit). Findings unchanged.
