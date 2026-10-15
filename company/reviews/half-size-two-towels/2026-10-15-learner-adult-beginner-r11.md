*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): half-size-two-towels
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: Splitting a flat rectangle preserves the combined front-and-back face area. It adds edges, but does not double the large faces; separating folded layers is a different operation.)
Screenshots seen: yes (artifacts/walkthroughs/half-size-two-towels/sheet.png, recorded 2026-10-15T21:32:44.959Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "One rectangle"; tapped Two halves; slid Width 80 -> 82; opened reveal.

1. **The options do not fit the question.** "Does splitting this sheet add face area?" is a yes/no question, but the choices are "One rectangle / Two halves / Same outcome". I had to translate "Two halves" into "yes, splitting adds area". The correct answer is "Same outcome", which works, but the first two options are confusing as answers.
2. **Where understanding first broke: the Two halves drawing shows the halves stacked.** The picture for "Two halves" is two boards lying one on top of the other. Stacked halves would hide faces, the opposite of the claim. I could not tell whether the halves hang side by side.
3. **The one-rectangle area is never shown.** I saw 1.92 m² for two halves, but never 1.92 m² for one rectangle, so "same outcome" is told, not seen. Toggling back was possible but the lesson never invites it, and the reveal says only "The current two halves setting gives 1.97m²".
4. On the phone, the locked stage cuts off the "Both-face area ?" readout at the bottom edge. Small label "1pieces" is a typo.
5. Reveal text is clear and the edge/thickness hedge is honest. "Separating folded layers is a different operation" is a good pointer.

Verdict reason: the stage never shows the one-rectangle area beside the two-halves area, and the two-halves picture looks like a stack, so the "same area" point is told rather than shown.

## After reading the brief (meta.json)

- Objective matches the reveal text. The stage does not show the "same area" comparison (finding 3), and the drawing may teach the opposite (finding 2).
- Fix route: demo-builder (side-by-side drawing of the halves; show both areas after unlock; yes/no-style option wording; fix "1pieces" and the clipped readout).
