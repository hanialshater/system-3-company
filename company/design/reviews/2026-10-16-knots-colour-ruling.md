# Colour ruling: unknot-game tint and tricolour-check arc sets (W-1580)

visual-designer (Kiri) · 2026-10-16 · board W-1580 · inputs: `company/design/specs/unknot-game.md` (the tint), `company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md` (T3, finding 7) · tokens read from `src/app/globals.css`; math `--domain` `#7c9cff` from `content/domains.json`

**Method (rerun: `node company/design/reviews/2026-10-16-knots-colour-check.mjs`).**
- Contrast is WCAG 2.x relative luminance on `--bg-3` (the stage): dark `#1f2430`, light `#eceff6`.
- Colour vision: Machado, Oliveira and Fernandes (2009) matrices, severity 1.0 (full dichromacy), applied in linear sRGB to every colour including the stage. I then took WCAG contrast of each simulated colour on the simulated stage, and CIEDE2000 (dE) between simulated pairs.
- Reading dE: under about 10 two colours are easily confused for a small stroke; over 20 they are distinct; over 40 plainly different.
- These are simulations of dichromacy by a published model, not a test with colour-blind people, and not an accessibility ruling (that is the accessibility reviewer's). Untested with learners.

## 1. Unknot-game tint: confirmed, with one scope note

**Ruling: `--domain` in dark; `color-mix(in srgb, var(--domain) 70%, #000)` in light = `#576db3` for math. No token value changes.**

| Theme | Colour | Contrast on stage (normal / deut / prot / trit) | dE against the `--fg` strand (normal / deut / prot / trit) |
|---|---|---|---|
| dark | `#7c9cff` | 5.95 / 5.70 / 6.34 / 6.11 | 28.5 / 30.5 / 27.9 / 27.2 |
| light | `#576db3` | 4.30 / 4.47 / 4.03 / 4.20 | 32.7 / 32.0 / 34.0 / 32.7 |
| light, raw pastel (for contrast) | `#7c9cff` | 2.26 | fails 3:1, as the spec says |

- The spec's number holds: 3:1 is cleared with room (lowest 4.03:1, protanopia).
- Tint against the plain strand: dE 27 to 34 in every vision type, and the lightness gap is large (L* 47 against 8 in light, 66 against 95 in dark). So the tinted strand stays distinguishable from `--fg` without hue.
- The cue does not rest on hue anyway: the 3-unit width and the caption carry it (design-lead condition). Hue is the third cue.
- **Scope note.** 70% is cleared for math only. Across all 14 domain colours in `content/domains.json`, 70% gives under 3:1 for probability (2.85) and life (2.94). If the tint ever becomes a shared kit class, use **60%** (`#4a5e99` for math): the lowest of the 14 domains is 3.73:1. For this lesson, 70% stays (4.30:1 reads calmer than 5.46:1 and is already clear).
- The spec asks whether to add a stage token. **No new token.** `--domain` is set per card, so a root-level derived token cannot exist (system.md Tokens and contrast). The light-mode mix needs a `prefers-color-scheme` rule, which an inline style cannot carry. That is a CSS change, so it goes to the platform engineer (board item below). I do not ship CSS.
- Proposed rule for the platform engineer, for `src/app/globals.css` (not applied by me):
  ```css
  .knot-tint { stroke: var(--domain); }
  @media (prefers-color-scheme: light) {
    .knot-tint { stroke: color-mix(in srgb, var(--domain) 70%, #000); }
  }
  ```
  Width 3 stays an SVG attribute on the same path, not in CSS.

## 2. Tricolour-check arc sets: contrast passes T3; colour-vision check finds a real gap

Contrast (T3, at least 3:1 on the stage) **passes** in both themes and in all three vision types:

| Set | Contrast, normal | Lowest under any simulated vision |
|---|---|---|
| dark `#E69F00 #56B4E9 #E87FBF` | 6.89 / 6.72 / 6.07 | 5.29 |
| light `#A65E00 #0068A8 #B0337A` | 4.32 / 5.15 / 5.07 | 3.95 |

**But under colour-vision deficiency, pairs of arcs collapse** (dE per pair; arcs numbered 1, 2, 3 in the order listed):

| Set | Deuteranopia | Protanopia | Tritanopia |
|---|---|---|---|
| dark | 2-3: 12.6 | 2-3: **8.8** | 1-3: **8.8** |
| light | 2-3: 18.4 | 2-3: **9.7** | 1-3: **8.0** |

The three colours in each set also sit at almost the same lightness (dark L* 67 to 71, light L* 42 to 47), so lightness gives no help.

**Why it matters.** The lesson asks whether the arcs show one colour or three. The number label tells the learner which arc is which, **not which colour it is**. T3 and the contact sheet said "the labels carry arc identity, not the hues", but the check being taught is about hue identity. For a learner with protanopia, arcs 2 and 3 can look like the same colour, so a valid three-colour trefoil can look like a failure, or the reverse. This is the exact misreading the lesson's rule cannot afford.

**Ruling.**
1. The current sets stay legal for contrast but are **not cleared for colour identity**. They may ship only with a second cue that names each colour independently of hue.
2. **Second cue (required): the label ring shows the colour's letter (A, B, C), not the arc number, with the arc colour as the ring**, or a different dash or marker per colour. This matches the learning designer's (B,A,A) notation in the QA path. The choice and the wording are the interaction designer's; the condition is mine. T3a (labels at least 12 units from every crossing) is unchanged.
3. **Better sets (recommended, optional if the second cue ships).** Computed by searching Okabe-Ito hues (and darkened versions for light) for the largest worst-case dE over all four vision types, each at least 3:1 on the stage:

| Theme | Set | Worst pair dE, all vision types | Lowest contrast under any vision |
|---|---|---|---|
| dark | `#56B4E9` `#F0E442` `#D55E00` | 23.8 (was 8.8) | 3.13 |
| light | `#0072B2` `#C24E00` `#6B6B6B` | 21.1 (was 8.0) | 3.63 |

   The light set uses a neutral grey as the third colour because a yellow that clears 3:1 on `--bg-3` is brown and merges with the vermillion under protanopia (dE 2.3 to 4.9 in the sets I tried). Pairings tried and rejected: `#0068A8 #8A6A00 #B84A00` (dE 1.8 under deuteranopia), `#4590BA #004A74 #C24E00` (2.81:1 under protanopia).
   Both sets still need the number or letter label (T3). Neither is a token: they are lesson-local arrays, so nothing in `globals.css` changes.
4. The design lead decides between the current and recommended sets (she owns the batch picture rulings); I recommend the new ones.

## Token changes

**None to existing tokens** (`--bg-3`, `--fg`, `--domain` stay as they are in both themes). One addition proposed for the platform engineer (the `.knot-tint` rule above).

## Objections and what happened to each

None received. I did not review how the tint looks in a built lesson (none is built); this is a computed ruling only.

## What I believe, and how sure

- `#576db3` clears 3:1 on `--bg-3` and is distinct from `--fg` under all three simulated deficiencies: **sure** (computed, script reruns).
- The current arc sets fail to separate some pairs under protanopia and tritanopia: **fairly sure**. The simulation is a model of full dichromacy, which is harsher than most real colour vision deficiency (most people have anomalous trichromacy). dE 8 to 10 under full dichromacy would mean less severe loss for anomalous types. I have not tested with learners.
- The recommended sets would hold: **fairly sure** on the numbers, **not seen** in a rendered lesson.

## Next moves

| Move | Owner |
|---|---|
| Decide arc set and the second cue (letters A/B/C in the ring) for tricolour-check; add to its spec | interaction-designer, with design-lead |
| Add `.knot-tint` to `src/app/globals.css` (or the kit), or tell the builder to use another way to carry the light-mode mix | platform-engineer |
| Rule on whether the colour-vision method here is enough, or whether colour identity needs a review | accessibility-reviewer |
