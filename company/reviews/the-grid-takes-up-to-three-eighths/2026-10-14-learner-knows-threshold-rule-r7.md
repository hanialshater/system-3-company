*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): the-grid-takes-up-to-three-eighths
lesson version: v2
boundary: knows the threshold rule q from cluster-stops-the-cascade (adopt once at least a share q of neighbours have); does not know that each network has a largest q a small seed can beat, or that it depends on the network's shape. (Same boundary as r6.)
Screenshots seen: yes (artifacts/walkthroughs/the-grid-takes-up-to-three-eighths/sheet.png, 11 frames, build 4 at localhost:3480)
Verdict: launch

## 1. From the artifact (written before reading r6)
- **Predict is clean.** Title "How picky can a grid be?" and hook "Can a big enough start beat any threshold?" are questions. Options 1/2 / 3/8 / 1/4 are all fractions. The locked stage shows a plain 5x5 block on the grid with no neighbour numbers and no result. The q row (1/4, 3/8, 2/5, 1/2, 3/5) holds all three options plus two more, so no option is singled out. 1/2 is the natural wrong guess.
- **The why is on the stage.** After Run, every cell beside the block shows its count of adopting neighbours: 3 on the sides, 2 near corners, 1 off corners. The caption gives the rule ("stuck: newcomers see at most 3 of 8; they need 4"). 1/4 and 3/8 fill the grid (1,521 / 1,521); 2/5, 1/2 and 3/5 stay at 25. Having 2/5 on the row puts the cutoff between 3/8 and 2/5.
- **Size and shape are both on the required path.** "7x7 block" at 3/5 shows the same 3s and stalls at 49 ("they need 5"). "Line at 1/2", the q where the grid stuck, takes all 201, with "1/2" labels under the two seeds after Reset. A results table (5x5 / 7x7 / Line by q) keeps every run.
- **Reveal** quotes 1,521, 25, 49 and 201, all in the table when it opens. It points at the 3 / 2 / 1 numbers and ends on "cascade capacity: 1/2 for a line, 3/8 for this grid". About 110 words.
- Minor (quotes what you saw): Reset was last, so at the reveal the stage shows the line at round 0 (2 / 201). The block with its 3 / 2 / 1 numbers ("the numbers beside the block show why") is not drawn then; the table holds the outcomes.
- Minor: the 7x7 block was run only at 3/5, but the reveal says "above 3/8 ... your 7x7 block stalled too". A learner who wants "however big" needs to try it at 2/5 on their own.
- Minor: on grid frames the ADOPTED / ROUND readouts are cut off at the bottom of the stage, and the results table is very small on a phone.
- No fatal flaw.

## 2. Earlier findings (r6), read after section 1
| r6 finding | Status |
|---|---|
| Top: the line spreading at 1/2 is told, not shown | fixed: "Line at 1/2" is on the path, takes 201 / 201, and the reveal points at it |
| Run jumps to the end; the "corners see 3 too" moment is told | fixed: the reveal no longer claims it; the side/corner numbers carry the why |
| Reset and ADOPTED / ROUND cut off on the phone | not fixed (still minor) |
| Trust link 0/5 | fact-checker's lane (now 3/5) |

## 3. Against the brief
Version read from meta.json (version 2) after section 1. build.md not read.
