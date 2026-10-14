---
id: toggle-before-after
name: Toggle (before / after)
kind: interaction
status: approved
owner: interaction-designer
kit: Control with aria-pressed (by hand)
references: heavy-but-floats
variants: preset-buttons
seeded: seeded by design-engineer; design lead to confirm
---

# Toggle (before / after)

A two-state switch, shown as a pressed button or a segmented pair.

_Seeded by design-engineer on 2026-10-13 from company/design/formats.md (before/after anatomy) and real lessons in src/demos (pattern seen in Demo.tsx); design lead to confirm._

## When to use
- Two named states of one system.

## When not to
- More than two states (use preset buttons or a slider).

## Anatomy
- A Control with aria-pressed, or two Controls as a segmented pair.
- The state named in words.

## Rules
- aria-pressed reflects the state.
- Both states are named, not only coloured.

## Open questions
- One toggle component in the kit?
