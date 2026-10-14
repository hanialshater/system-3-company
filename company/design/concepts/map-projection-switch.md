---
id: map-projection-switch
name: Map projection switch
kind: interaction
status: kit-supported
owner: interaction-designer
kit: WorldMap projection prop
references: mercator-greenland
variants: toggle-before-after
seeded: seeded by design-engineer; design lead to confirm
---

# Map projection switch

Switch the same map between two named projections.

_Seeded by design-engineer on 2026-10-13 from real lessons in src/demos (pattern seen in Demo.tsx); design lead to confirm._

## When to use
- Projection distortion is the idea.

## When not to
- The projection is incidental (keep one, name it).

## Anatomy
- A WorldMap.
- A toggle naming both projections.
- A shape or circle that shows distortion.

## Rules
- Both projection names on the stage.
- The switch keeps the learner's selection.

## Open questions
- Animate between projections, or cut?
