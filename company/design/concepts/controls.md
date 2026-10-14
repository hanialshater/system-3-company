---
id: controls
name: Controls and tap targets
kind: visual
status: kit-supported
owner: visual-designer
kit: Control, Slider, Readout, Row
variants: typography-scale
seeded: seeded by design-engineer; design lead to confirm
---

# Controls and tap targets

Kit controls: tap targets at least 44 px, sliders 28 px high, active state in the domain colour.

_Seeded by design-engineer on 2026-10-13 from company/design/system.md; design lead to confirm._

## When to use
- Every interactive element on a stage.

## When not to
- Raw <button> or <input> elements (they miss data-qa and the styling).

## Anatomy
- Control (button).
- Slider (label, live value, 28 px track).
- Readout.
- Row.

## Rules
- Tap targets at least 44 px.
- Every control carries data-qa="control".
- Disabled while locked.

## Open questions
- Is the Control at 44 px today on every phone?
