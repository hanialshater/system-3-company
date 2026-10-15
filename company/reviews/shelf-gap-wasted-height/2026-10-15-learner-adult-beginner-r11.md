*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): shelf-gap-wasted-height
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: The illustration subtracts box height from shelf clearance. Adjusting unused gap can create useful room elsewhere, provided the new opening still fits the box and hand allowance.)
Screenshots seen: yes (artifacts/walkthroughs/shelf-gap-wasted-height/sheet.png, recorded 2026-10-15T21:36)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Fixed tall gap"; after lock-in the stage showed Unused height 23 cm (35 cm gap, 12 cm box); tapped Adjust gap (3 cm, a second shelf drawn); slid Gap to 37 (still 3 cm); opened reveal. (The recorded sheet starts after the first tap. I checked the lock-in state in a separate browser probe of the same build.)

1. **Where understanding first broke: the Gap slider contradicts the picture in adjust mode.** After "Adjust gap", the drawing shows the shelf lowered to just above the box, yet the slider still reads "Gap 35cm", and I moved it to "37cm" with no change at all ("Unused height 3cm"). Which gap is 37 cm? The control and the drawing disagree, and I could not tell what "adjust" had set the gap to.
2. **The needed clearance is counted as waste.** In adjust mode, "Unused height 3cm" is exactly the hand allowance ("hand allowance=3cm"), the space I need to get the box out. Calling it "unused" suggests I should remove it too, while the reveal says the opening must "still fit the box and hand allowance".
3. **The 23 → 3 cm contrast is good,** and the second shelf appearing in the freed space is a nice picture of "useful room elsewhere".
4. "Same outcome" is an odd option. **Selected-state styling is inverted.** The shelf strength/mounting caveat is good.

Fixes (for the builder):
- In adjust mode, show the adjusted gap (15 cm) on the control or disable it; or let the slider set the adjusted gap and show the unused height rising.
- Split the readout: "box 12 + hand room 3 = needs 15; wasted 20" vs "wasted 0".

Verdict reason: in adjust mode the Gap control reads 35–37 cm while the drawing shows a lowered shelf and the result never changes, and the readout labels the needed hand allowance as "unused".

## After reading the brief (meta.json)

- The objective includes "provided the new opening still fits the box and hand allowance". The stage labels that allowance "unused" (finding 2), which works against the objective's own condition.
- The trust-sheet worked example uses a 20 cm box and a 40 cm gap (17 cm unused), while the stage has a 12 cm box and a 35 cm gap. Route: fact-checker (consistency).
- Fix route: demo-builder (slider in adjust mode; readout split).
