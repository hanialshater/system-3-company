# UI concepts

owner: design-lead (Ines) · tool: `/hq/design` (design-engineer) · seeded 2026-10-13

One file per **UI concept**: a lesson format, an interaction pattern or a visual style. These are
design patterns, not curriculum concepts. Curriculum concepts live in `content/curriculum/`, and the
category managers inspect them at `/hq/curriculum`.

## Frontmatter

```
---
id: slider-drives-live-chart        # the file name without .md
name: Slider drives a live chart
kind: interaction                   # format | interaction | visual
status: proposed                    # proposed | approved | kit-supported | retired
owner: interaction-designer         # a role id
kit: Slider (chart by hand)         # the kit component, or "by hand"
references: why-seven-wins, ...     # optional: reference lesson slugs (always listed as users)
variants: preset-buttons            # optional: concepts to compare it with in the inspector
seeded: ...                         # present while the entry is unconfirmed
---
```

The body has five sections: **When to use**, **When not to**, **Anatomy**, **Rules**, **Open questions**.

## Proposing a concept
1. Add `company/design/concepts/<id>.md` with `status: proposed`.
2. Add a mockup (an SVG, a PNG or a markdown sketch) in `company/design/specs/`, named `<id>.*`.
3. The design lead approves it in design review and changes the status. `kit-supported` needs the
   platform engineer's kit component. `retired` keeps the file, so old lessons still resolve.

## How the inspector reads these
- **Lessons using a concept:** detected from each lesson's `Demo.tsx` (and `styles.module.css` for
  some visual concepts) by the heuristics in `src/lib/hq-design.ts`. Each detector has a stated
  confidence, and the inspector shows which signal matched for every lesson.
- **Specimen:** the live rendering is in `src/app/hq/design/specimens.tsx`. A new concept shows a
  placeholder until the design engineer adds one.
- **Seeded entries** (frontmatter `seeded:`) were written by the design engineer from
  `formats.md`, `system.md`, `illustration.md` and real lessons. Remove the line once the design
  lead has confirmed the entry.
