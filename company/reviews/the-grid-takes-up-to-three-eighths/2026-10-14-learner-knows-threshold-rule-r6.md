*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): the-grid-takes-up-to-three-eighths
lesson version: v1
boundary: knows the threshold rule q from cluster-stops-the-cascade (adopt once at least a share q of neighbours have); does not know that each network has a largest q a small seed can beat, or that it depends on the network's shape. (From meta.json learner field; there is no earlier learner review.)
Screenshots seen: yes (artifacts/walkthroughs/the-grid-takes-up-to-three-eighths/sheet.png)
Verdict: revise

## 1. From the artifact
- Predict: good pull. "1/2" feels safe because "half your neighbours" sounds easy to reach from a big block. The locked stage shows a plain 5×5 block on a big grid, with no neighbour numbers and no result. Nothing leaks 3/8.
- Shown very well: after Run, every cell around the block gets a number of adopting neighbours. Sides read 3, cells next to corners 2, diagonal-off-corner cells 1. The caption says "Stuck: newcomers see at most 3 of 8; they need 4". At 1/4 and 3/8 the grid fills (1,521 / 1,521). At 2/5, 1/2 and 3/5 it stays at 25. "Bigger block: 7×7" shows the same 3s and stays stuck ("they need 5" at 3/5). The why behind 3/8 is on the picture. The bigger block's numbers make "size doesn't help" visible, not told.
- **Top finding: the line half of the idea is told, not shown.** The reveal ends: "On the line each newcomer sees 1 of 2, so it spread for any q up to 1/2 … cascade capacity: 1/2 for a line, 3/8 for this grid." On the recorded path the line was only ever run at q = 3/5, where it stalls ("they need 2"). Then Reset. I never saw the line spread at 1/2, the very q where the grid stalled. That contrast is the "depends on the network's shape" half of the brief's doesNotKnow. The "1/2 · 1/2" labels are on stage, so the cause is visible, but the outcome is not. Gate the reveal on running the line at q = 1/2 (or have "Line" switch to 1/2 and run), and have the reveal point at it ("at 1/2 the grid stuck and your line took all 201").
- Minor: Run jumps straight to the end. "The sides grow, and then the corners see 3 too" is the reveal's account of how 3/8 wins, but the recorded path never used Step, so the corner moment wasn't seen. Consider defaulting Run at 3/8 to a two-round animation or prompting Step.
- Minor: on the phone frame the control rows wrap, so "Reset" and the ADOPTED / ROUND readouts are cut off at the bottom of the stage in several frames.
- Minor: trust link 0/5 claims checked (fact-checker lane).
- No FATAL.

## 2. Earlier findings
None: this is the first learner review.

## 3. Against the brief (read after section 1)
Objective, grid part ("sees at most 3 of 8 … takes the grid at 3/8 and stalls above it however big it is"): shown. Line part ("on a line a newcomer sees 1 of 2, so the limit there is 1/2"): the 1-of-2 labels are shown, but the line taking everything at 1/2 is told only. doesNotKnow "depends on the network's shape" needs that side-by-side outcome, so this is a revise under "Show the why you promised" and earn-the-reveal.
