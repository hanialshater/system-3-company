---
id: before-after
name: Before / after toggle
kind: format
status: approved
owner: design-lead
kit: by hand
references: heavy-but-floats, point-one-is-26-percent
variants: side-by-side
seeded: seeded by design-engineer; design lead to confirm
---

# Before / after toggle

One stage with a toggle; the after state persists into the reveal.

_Seeded by design-engineer on 2026-10-13 from company/design/formats.md; design lead to confirm._

## When to use
- One change with a visible effect.

## When not to
- The change is continuous (use a slider).
- There are more than two states.

## Anatomy
- One stage.
- A two-state toggle (aria-pressed).
- The after state stays on screen at reveal time.

## Rules
- The toggle states are named in words, not only by colour.
- No reset that empties the stage before the reveal.

## Open questions
- Should 'before' remain visible as a ghost when 'after' is on?
