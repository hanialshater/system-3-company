---
id: colour-roles
name: Colour roles
kind: visual
status: kit-supported
owner: visual-designer
kit: globals.css tokens
variants: chart-style
seeded: seeded by design-engineer; design lead to confirm
---

# Colour roles

Colour by role: --bg, --fg, --muted, --line, --accent, --good, --bad, --warn and one --domain colour per category.

_Seeded by design-engineer on 2026-10-13 from company/design/system.md; design lead to confirm._

## When to use
- Every colour on the stage.

## When not to
- Hard-coded hex colours in a lesson's CSS.

## Anatomy
- Tokens in globals.css.
- Light and dark via prefers-color-scheme.
- Domain colour from content/domains.json.

## Rules
- Use the tokens, not hex values.
- Never carry meaning by colour alone.
- Check contrast in both themes.

## Open questions
- Colours too close for colour-blind learners (known gap).
