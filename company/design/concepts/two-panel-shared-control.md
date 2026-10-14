---
id: two-panel-shared-control
name: Two-panel shared control
kind: interaction
status: approved
owner: interaction-designer
kit: by hand
references: race-down-the-ramp
variants: toggle-before-after
seeded: seeded by design-engineer; design lead to confirm
---

# Two-panel shared control

One control drives two panels at once so the learner sees the difference.

_Seeded by design-engineer on 2026-10-13 from company/design/formats.md (side-by-side anatomy) and real lessons in src/demos (pattern seen in Demo.tsx); design lead to confirm._

## When to use
- A/B comparisons.

## When not to
- Phones where both panels would be too small to read.

## Anatomy
- Two panels.
- One control below both.
- A difference marker.

## Rules
- The shared control is below both panels, not inside one.
- Panels stack under 400 px.

## Open questions
- Detection is weak: two-panel layouts are written in many ways.
