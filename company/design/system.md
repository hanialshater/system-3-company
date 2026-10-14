# Design system (v0)

owner: visual-designer (Kiri), with the accessibility reviewer · implemented by: platform-engineer in `src/app/globals.css` and `src/kit/`

v0 records what exists today, so later changes are deliberate:
- **Colour roles:** `--bg`, `--fg`, `--muted`, `--line`, `--accent`, `--good`, `--bad`, `--warn`, plus one `--domain` colour per category (`content/domains.json`). Light and dark mode via `prefers-color-scheme`.
- **Type:** system UI sans. The stage text budget is ≤ 25 words, and the reveal is ≤ 90 words (the same budget as `company/product/demo-standard.md`, set by decision `company/decisions/2026-10-14-reveal-fits-with-its-picture.md`).
- **Controls:** `Control`, `Slider`, `Readout`, `Row` from `src/kit/controls.tsx`. Tap targets ≥ 44 px. Sliders 28 px high.
- **Charts and diagrams:** label the axes on the stage, name the model ("Toy model", the projection), show the answer readouts as "?" while locked.
- **Motion:** settle within 450 ms (the QA wait), and respect `prefers-reduced-motion`.
- **Known gaps** (from reviews):
  - reveal text clipped on phones (W-061);
  - overlapping labels;
  - floats printed unrounded (60.000000000000014);
  - colours that are too close for colour-blind learners.

## Tokens and contrast (v1, 2026-10-14, K1/K6 of the a11y audit)

Contrast is WCAG 2.x, computed from the hex values. Text needs 4.5:1; large text and graphics 3:1.

| Token | Dark | Light | Dark on bg / bg-2 / bg-3 | Light on bg / bg-2 / bg-3 |
|---|---|---|---|---|
| `--bg` / `--bg-2` / `--bg-3` | #0d0f14 / #161a22 / #1f2430 | #f6f7fb / #ffffff / #eceff6 | | |
| `--fg` | #eef1f7 | #141824 | 16.9 / 15.4 / 13.7 | about 16 or more |
| `--muted` | #9aa3b5 | #5d6578 | 7.6 / 6.9 / 6.1 | 5.5 / 5.8 / 5.1 |
| `--good` (text) | #4fd1a5 | #09704d | 10.0 / 9.1 / 8.1 | 5.3 / 5.7 / 4.9 |
| `--warn` (text) | #f6c453 | #7d5200 | 11.8 / 10.7 / 9.6 | 6.1 / 6.5 / 5.7 |
| `--bad` (text) | #ff7a7a | #b8222a | 7.6 / 6.9 / 6.2 | 5.9 / 6.3 / 5.5 |
| `--good-fill`, `--warn-fill`, `--bad-fill` | #4fd1a5 / #f6c453 / #ff7a7a | same | fills, borders and tints only | |

(Light values for good, warn and bad are estimates from the first candidates, #0b7a55 / #8a5a00 / #c0262d, which measured 4.6 to 5.5; the shipped values are slightly darker, so they are at least as high.)

Rules:
- `--good`, `--warn`, `--bad` are **text-safe**. Use `--*-fill` for shapes, borders and tints. In light mode the old bright values were 1.6 to 2.5:1 as text.
- White text on the mid-green or yellow fills fails (about 2.9:1 and 1.4:1). Put dark ink (`--bg`) on bright fills, or use `--fg` outside the shape.
- `--domain` is a pastel (1.1 to 2.4:1 on light). As text in light mode, mix it: `color-mix(in srgb, var(--domain) 45%, #000)` gives 5.8 to 7.9:1 on all ten domains (now also fixes Probability's 4.48). A `--domain-ink` token cannot be set on `:root`, since `--domain` is set per card; open item for the platform engineer.
- `.chip.on` and `.primary` use #0d0f14 on `--domain`: 7.3 to 11.8:1.
- The locked stage is no longer dimmed (K6). The old opacity .55 took `--fg` to 3.7:1 (light) and `--muted` to 2.2:1 and 2.8:1. Only disabled controls are dimmed, which WCAG exempts.
- Stage SVG text should use `--fg`/`--muted` or the text-safe semantic colours, never `--domain` or a hard-coded pastel in light mode. Lessons still doing so are listed in the 2026-10-14 re-scan (builders).

## Accessibility: minimum text size in lesson pictures (W-289, 2026-10-14, accessibility reviewer)

**Ruling.** When the kit shrinks a picture at the reveal (390×844 phone), no SVG label may end up smaller than these rendered sizes:

| Label kind | Floor (rendered CSS px) | Constant for W-287 |
|---|---|---|
| Meaning-carrying: anything the reveal or stage names, axis and category names, values, legends, node labels | **10 px** | `SVG_TEXT_FLOOR_PX = 10` |
| Decorative or redundant: tick numbers, grid labels, anything inside `aria-hidden="true"` | 8 px | `SVG_DECOR_FLOOR_PX = 8` |

Per picture, scale floor = `max(0.4, 10 / smallest meaning-carrying <text> px)`, applied to the smallest label that is not `aria-hidden`. If that gives 1 or more, do not shrink. A label already below 10 px at natural size is never shrunk further (k = 1). A picture with no text keeps 0.4. This replaces the 9 px placeholder in the W-237 review.

**Authoring target (new and revised lessons, not a kit floor):** meaning-carrying SVG labels render at 11 px or more at natural size on a 390 px phone.

**Reasoning.**
- WCAG 2.x sets no pixel minimum. 1.4.4 (Resize Text) requires text to be readable at 200% without loss, and 1.4.10 (Reflow) requires no two-dimensional scrolling at 320 px. The intent is that a learner can always get readable text. Pinch-zoom is the learner's only escape once the kit has shrunk a picture, and unlike before the shrink they can no longer scroll up to the unshrunk label. So the kit must not take the readable size away.
- Platform minimums: iOS about 11 pt (11 CSS px) as the smallest caption style, Android 12 sp for small text. Both are for text a person reads alone. Diagram labels are short words next to a shape, so the shrink floor sits one step under those, at 10 px. The authoring target of 11 px matches iOS.
- Why not 11 or 12 as the kit floor: the probe (`company/engineering/reviews/2026-10-14-W-237-probe.json`) shows the natural smallest label is under 11 px in 288 of 390 measured pictures and under 10 px in 183. An 11 px floor would not be a shrink rule, it would condemn most existing labels, and that is a backlog for builders, not a number the kit can enforce.
- Cost, estimated from the probe's per-picture heights and smallest label (433 shrunk lessons): lessons the fit fully resolves are about 97 at 8 px, 66 at 9, 44 at 10 and 36 at 11 (261 today). The rest is the per-lesson route in decision `2026-10-14-reveal-fits-with-its-picture.md` (W-264 to W-267). That is the honest price of "never fix it by shrinking text" in `demo-standard.md`.
- Decorative labels get a lower floor because losing them costs the learner nothing they need. Meaning is never carried by a decorative label; if a label is needed to answer the question, it is meaning-carrying and is not `aria-hidden`.
- Limit: the 10 px number is a judgement, not a measurement. I did not test it with learners or on a device.

Objection: the head of product may still decide that no labelled picture shrinks at all (floor 1). That is stricter than this ruling and compatible with it.

## Fold at the reveal (W-330, 2026-10-14, design-lead; decided, not built)

Decision: `company/decisions/2026-10-14-reveal-fits-with-its-picture.md`, "Amendment, W-330". Until the
platform engineer ships it, builders do nothing new.
- A lesson may opt a `Row` in to folding. Opt in only rows the reveal does not quote (no control state,
  readout, label or chip the reveal names). Rows inside the picture never fold.
- At the reveal, only if stage + reveal overflow the card, the kit folds all opted-in rows first (before any
  picture shrink), and shows one **"Show controls"** button where the first folded row was: full stage
  width, at least 44 px tall, `aria-expanded`. Pressed, the rows come back in DOM order, at full size,
  state kept; the label becomes "Hide controls".
- Rows are hidden with `display: none` only. Never collapse by height, scale, opacity or visibility (that
  shrinks tap targets and fails the QA contract's 24 px check).
