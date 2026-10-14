*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): shoelace-order-matters
lesson version: v2
boundary: knows how to read the coordinates of a point on a grid (meta.json learner field, same as r6); has never seen the shoelace formula, signed area, or the idea that an edge contributes a strip.
Screenshots seen: yes (artifacts/walkthroughs/shoelace-order-matters/sheet.png, 9 frames, build 4 at localhost:3480)
Verdict: launch

## 1. From the artifact (written before reading r6)
- **Predict is clean.** Title "Same four corners, new order" and hook "A 4 by 3 rectangle has area 12. Reorder its corners: what does the formula say?" are neutral. Options 12 / 0 / 24 are all bare numbers. The locked stage shows four empty corner dots and the grid, no values. "12, same corners" is the natural wrong guess.
- **The why is on the stage.** Tapping the question's order shades a pink strip under (0,0) → (4,3) marked −6, adds nothing for the vertical edge, then a teal strip under (4,0) → (0,3) marked +6. The caption changes to "The path crosses itself: the + and − strips cancel to 0" and SIGNED AREA reads 0. I can see the bow-tie and the two signed strips overlapping.
- **The sign half is now on the required path.** "Go round ↺" draws a teal rectangle "+12: anticlockwise, +" and "Go round ↻" a pink one "−12: clockwise, −". The "Your orders" list keeps all three results (0, 12, −12), and the reveal button only lit after both.
- **Reveal** quotes 0, −6, +6, 12 and −12, all from my taps, and the three results are still listed on the stage when it opens. It ends on the idea (order matters, sign gives direction, crossing paths cancel). About 105 words.
- Minor (quotes what you saw): at the reveal the stage shows the −12 rectangle, so the −6 / +6 strips the reveal names are no longer drawn. They survive only as the "0" line in "Your orders".
- Minor: the "two triangles of area 3, one traced each way round" are not drawn as such; what I see is a red strip and a green strip overlapping in a brown triangle. A learner can work it out, but the "3" is told.
- Minor: "+ going left, − going right" is a convention given as a caption; nothing shows why left is +. For this boundary that is acceptable told context.
- Minor: stage text (caption, eight coordinate labels, seven buttons, readouts, orders list) is over 25 words.
- No fatal flaw.

## 2. Earlier findings (r6), read after section 1
| r6 finding | Status |
|---|---|
| 1. Title "no area" and hook "says 0?" give the answer | fixed: "Same four corners, new order" and a neutral hook |
| 2. Sign / direction and 12 / −12 told, not required | fixed: both "Go round" orders are on the gated path and listed in "Your orders" |
| 3. Reset before reveal leaves an empty stage under "the bow-tie you drew" | fixed: Reset now comes before the go-round orders, and the orders list keeps the 0 |
| 4. Hyphen vs minus in "-12" | fixed: reveal uses "−12" |

## 3. Against the brief
Version read from meta.json (version 2) after section 1. build.md not read.
