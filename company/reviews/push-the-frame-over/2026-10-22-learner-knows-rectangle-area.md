*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: push-the-frame-over
lesson version: v3
boundary: knows that a rectangle's area is width × height and that a shape's sides and perimeter can be measured; does not know that a parallelogram's area is base × height, so believes a frame that keeps its sides keeps its area.
Screenshots seen: yes (artifacts/walkthroughs/push-the-frame-over/sheet.png, recorded 2026-10-22T13:06:34.551Z)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: it did not break. The upright frame (01-predict) shows sides 3 and 4, the dashed height h along the left side, and "area 12.0". "Lean to 60°" drops the dashed h inside the frame and the readout to "height 2.60 · area 10.4" while "sides 4 and 3 · perimeter 14" stays put; "Lean to 30°" halves it to 1.50 and 6.0. The constant top line against the changing bottom line is exactly the contrast my misconception needs.
2. What the prediction felt like: "It stays the same" is the honest answer from my boundary (nothing got longer or shorter); "It grows" is a weak distractor but harmless. The locked stage shows only the upright 12.0, so nothing is given away.
3. Whether the reveal answered my question: yes. My question after seeing 6.0 was "where did the area go if no side changed?". "Cut and slide" (04-step-3) answers it in the picture: the left triangle is left as an empty outline, the same triangle appears filled at the right end, and the filled shape is a rectangle whose top edge (4 wide, I checked against the base: both span the same width) sits at the dashed h. The chip records "✓ 4 × 1.50 = 6.0". The reveal then names the rule (base × height, not base × slanted side) and the limiting case (pushed flat, area goes to nothing).
4. Notes (not blocking):
   - When the reveal opens after the DOM-order path ending on "Upright", the stage shows the upright 12.0 frame, while the reveal talks about height 1.50, area 6.0 and the cut-and-slid rectangle. 1.50 and 6.0 survive on the "Cut and slide ✓ 4 × 1.50 = 6.0" chip, so every quoted number is still on screen, but the rectangle "4 wide and only 1.50 tall" is not; a learner has to remember the picture. Acceptable because the learner saw it one tap earlier.
   - The word "parallelogram" appears for the first time in the reveal's rule sentence; the stage never names the leaning frame as one. Most learners at this boundary know the word, but the rule would land more directly as "a leaning frame's (a parallelogram's) area…".
   - At 04-step-3 the "Lean to 30°" chip stays highlighted and "Cut and slide" is marked only by its ✓ line; the cut state is clear from the picture, so this reads fine.

Verdict reason: no finding blocks a first-time learner; the readout keeps sides and perimeter fixed while height and area fall, and the cut-and-slide picture shows the 4 × 1.50 rectangle the reveal names.

## After reading build.md / meta.json

- Not read (this stage reads only the walkthrough and the template). The version stamp is not in the walkthrough; the leave check named meta.json as v3, the version this walkthrough was recorded for, so the stamp is v3.
