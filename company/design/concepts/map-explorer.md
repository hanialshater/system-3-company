---
id: map-explorer
name: Map explorer
kind: format
status: kit-supported
owner: design-lead
kit: WorldMap (kit/geo)
references: mercator-greenland, three-giants-in-africa
variants: map-projection-switch
seeded: seeded by design-engineer; design lead to confirm
---

# Map explorer

A world map with a named projection and move-the-thing controls.

_Seeded by design-engineer on 2026-10-13 from company/design/formats.md; design lead to confirm._

## When to use
- Geography, projections, distances, anything where position on the globe is the idea.

## When not to
- The map is decoration for a non-spatial idea.

## Anatomy
- WorldMap with a named projection.
- Move-the-thing controls (slider or drag).
- Readouts in real units (km, degrees).

## Rules
- Name the projection on the stage.
- Distances come from geoDistance, not from pixels.

## Open questions
- Do we need a standard projection label component?
