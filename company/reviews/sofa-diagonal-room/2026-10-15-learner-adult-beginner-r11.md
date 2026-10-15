*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): sofa-diagonal-room
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know The rectangle’s diagonal is longer than either edge. A thin rod can fit along it when it is too long for the width; area alone does not answer a length-fit question.)
Screenshots seen: yes (artifacts/walkthroughs/sofa-diagonal-room/sheet.png, recorded 2026-10-15T21:34, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Along edge"; tapped On diagonal; slid Room width from 120 to 122 cm; opened reveal.

1. **The prediction gives itself away.** A 140 cm rod and a 120 × 90 cm rectangle: the rod is longer than both edges, so "along edge" is impossible on the numbers in the question. The real surprise (the diagonal is 150 cm, longer than either side) would only be a surprise if the rod were, say, 125 cm and a learner thought the 120 cm edge was the limit.
2. **Where understanding first broke: "Length margin".** I guessed it means "diagonal minus rod" (150 − 140 = 10). The term is not explained, and the along-edge margin (−20 cm, does not fit) never appears because I was only sent to the second layout.
3. **The title says sofa; the reveal says it is not about sofas.** The slug and the room framing suggest moving a sofa; the reveal then says "not a sofa manoeuvring guarantee". The stage is a flat rectangle with a line, so the honest frame is "a thin rod in a box", and the room wording sets up a promise the lesson withdraws.
4. **The selected button looks reversed.**
5. **The reveal's reasoning is right and clear**: the diagonal is longer than either edge, and area does not answer a length question.

Fixes (for the builder):
- Show both margins (edge −20 cm, diagonal +10 cm).
- Label the margin ("room to spare").
- Choose numbers where the edge looks almost long enough, so the prediction has tension.

Verdict reason: the along-edge result never appears and "length margin" is unexplained, so the reveal's "11.6cm" answers a contrast the learner did not see.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds, which matches finding 1: the prediction has no real trap.
- Fix route: demo-builder (show both options' results side by side, fix the selected-button look, reveal wording); Life Hacks category manager for whether the brief names a real beginner belief.
