---
id: side-by-side
name: Side-by-side comparison
kind: format
status: approved
owner: design-lead
kit: by hand (kit <Compare> proposed)
references: lru-eviction-order, race-down-the-ramp
variants: before-after
seeded: seeded by design-engineer; design lead to confirm
---

# Side-by-side comparison

Two panels, A and B, driven by one shared control, with the difference highlighted.

_Seeded by design-engineer on 2026-10-13 from company/design/formats.md; design lead to confirm._

## When to use
- Two methods, two rules or two cases where the contrast is the idea.

## When not to
- The learner must watch two moving places at once on a phone (the demo standard asks for one representation on a phone).
- The two cases differ only by a number (use a toggle).

## Anatomy
- Two panels labelled A and B.
- One shared control under both.
- The difference highlighted (colour plus a label).

## Rules
- One control drives both panels.
- The difference is never carried by colour alone.
- Panels stack vertically below 400 px.

## Open questions
- How does this square with 'one representation on a phone'?
- API for the proposed kit <Compare>: two render props or one with a side argument?
