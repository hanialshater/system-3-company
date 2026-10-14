*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): shoelace-order-matters
lesson version: v1
boundary: knows how to read the coordinates of a point on a grid (meta.json learner field); has never seen the shoelace formula, signed area, or the idea that an edge contributes a strip.
Screenshots seen: yes (artifacts/walkthroughs/shoelace-order-matters/sheet.png, 7 frames; plus my own probe on the same server tapping the anticlockwise and clockwise orders, which gave 12 and −12)
Verdict: revise

## 1. From the artifact (written before reading the brief)

- **Hook and title give the answer away.** Title: "Same four corners, no area". Hook: "List its corners in another order and the formula says 0?" The question then asks what the formula gives for another order, with 0 as option 2. A learner who reads the card top to bottom has been told "0" twice before predicting. The wrong guess I was meant to make ("12, the same corners") is only open to someone who skips the hook. This is the W-154 pattern, in the hook rather than the stage.
- Predict otherwise: the question gives the corners and says that, listed in order, the shoelace area is 12. "Shoelace" is never explained, but it doesn't need to be at this point.
- Explore (QA path, the question's second order): tapping (0,0) → (4,3) shades a pink triangle under the edge and marks it −6. The caption says "Each edge adds the strip under it: + going left, − going right." (4,3) → (4,0) is vertical and adds nothing. (0,3) closes the path. The edge (4,0) → (0,3) shades a teal +6, the path crosses itself, and the caption says "the + and − strips cancel to 0". SIGNED AREA 0. That is a clear picture of why the bow-tie gives 0: I see the two strips and their signs. This is the best part of the lesson.
- The reveal opens after this one order. "Then try your own" in the panel is optional.
- **The sign half is told on the gated path.** The reveal says: "listed round the boundary, the same four corners give 12; the other way round, -12. The sign tells you the direction, positive when the corners go anticlockwise." On the QA path I saw neither 12 nor −12 on the stage. The 12 was only stated in the question. My probe shows the stage can do it ("Closed path, signed area 12: anticlockwise, +" and "-12: clockwise, −"), but nothing requires it and the reveal does not depend on it.
- Reveal frame on the QA path: "Reset order" is the next control, so the stage has been cleared (0 of 4) while the reveal says "the bow-tie you drew". A real learner who does not reset keeps the bow-tie. This is a QA-path effect (minor).
- Bow-tie arithmetic: the two triangles meet at (2, 1.5) and each has area 3, so the reveal's "two triangles of area 3" checks out. The −6 and +6 strips match the drawn triangles.
- Minor: "-12" in the reveal uses a hyphen where the stage uses a true minus (−).
- No FATAL.

## 2. After reading the brief (meta.json learner, objective, misconception only)

No earlier learner review exists (only a fact-check; build.md not read).

Show the why you promised (decision 2026-10-14-told-vs-shown), item by item against doesNotKnow:
1. "The shoelace sum gives area only if the corners are listed in order round the boundary": **shown** by the 0 from the crossing order with its ± strips. The in-order 12 is only stated in the question, not tapped on the required path.
2. "Its sign tells you which way round the corners go": **told only on the gated path.** The stage can show +12 anticlockwise and −12 clockwise, but the reveal unlocks without either. Under the rule this is a revise. The objective itself says the learner reads "12, -12 and 0", so the gate should require all three orders (or at least one closed rectangle each way). The reveal should then quote the values the learner made.

## 3. Findings

1. **Revise (top):** the title ("no area") and the hook ("the formula says 0?") state the answer before the prediction. Make the hook a neutral question.
2. **Revise:** the sign/direction doesNotKnow and the 12 / −12 values are told, not required. Gate the reveal on a clockwise and an anticlockwise rectangle, as the objective says, and point the reveal at them.
3. Minor: on the QA path "Reset order" follows the four corners, so the reveal reads over an empty stage. Placing Reset after a step that still needs it, or keeping the last path drawn faintly, would avoid this.
4. Minor: hyphen vs minus sign in "-12".
