# Spec: unknot-game

owner: interaction-designer (Rafael) · 2026-10-16 · board W-1568 · status: draft, for design review · brief: `company/domains/briefs/math.discrete.md` "Knots, batch 1" §3 (with "Designer's proposals (W-1569)", all three accepted) · design note: `company/reviews/unknot-game/design.md` · picture rulings: `company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md` (S1 to S4, tint condition; block (b) lifted for this lesson) · kit: `src/kit/knots/README.md` rules 1, 2(a), 4 · mockup: `unknot-game.svg`, rendered by `knots-batch1-mockups.mjs` (run from the repo root; it imports only the kit)

**Format: single card, two chips.** One fixed knot picture, tap a crossing to switch it, one switch at a time. The tally is how the learner finds that no crossing is special; the tint is how they see why each switch works.

## Numbers this spec relies on (rerun: `node company/design/specs/knots-batch1-mockups.mjs`, and K3, K8, K15 in `company/domains/briefs/checks/knots-check.mjs`)
- Every single switch frees the knot: 3 of 3 on 3₁, 4 of 4 on 4₁ (`simplify` status `'unknot'`). The unswitched pictures are `'minimal'`. `'unknown'` never occurs (K3, K8).
- After every single switch, `moves(q)` offers an R2 (2 per switch on 3₁, 1 on 4₁; K15). In all 7 states the **first** R2 contains the tapped crossing, and of its two edges exactly one is over at both of the R2's crossings and the other is under at both (script output; the design lead found the same, finding 8).

## Stage (top to bottom; knot 290 px wide on a 360 phone, 320 on a 390 phone)
1. **Readout** (`role="status"`, `aria-live="polite"`): `'unknot'` → tick glyph in `--good-fill` + "Plain loop"; `'minimal'` → "Still a knot". Nothing else, ever (rule 4).
2. **Knot picture.** `draw(q, { layout: L, gap: 0.5 })`, L = `layout(knot(n).pd)` computed once per chip (rule 1), q = the knot or `crossingChange(pd, i)`. Default `size`/`margin`, `viewBox="-8 -8 116 116"`, stroke 2, `stroke-linecap="butt"`, `--fg` (S1, S2). The picture never moves on a tap (U2).
3. **Caption line**, space always reserved so nothing jumps: after a switch that gives a plain loop, a short tint swatch + "On top twice: it slides off". Empty otherwise.
4. **Tally**: "Freed by one switch", then **two rows, both always shown**: "Trefoil ○○○ 0 of 3" and "Figure-eight ○○○○ 0 of 4". A mark fills (`--good-fill` disc, dark tick) the first time that crossing alone gives a plain loop. Kept across Reset and chip changes. Both rows are shown so the trefoil's "3 of 3" is still on the stage when the QA path ends on the figure-eight (see QA path).
5. **Controls row**: Reset · Trefoil · Figure-eight.

Stage words at the busiest frame: Plain loop 2 + caption 5 + "Freed by one switch" 4 + Trefoil 1 + "3 of 3" 3 + Figure-eight 1 + "0 of 4" 3 + Reset 1 + chips 2 = 22 (≤ 25).

## The tint (the "why" on the stage)
- **Which strand.** In the switched diagram q, take `moves(q).filter(m => m.type === 'R2')[0]` (deterministic: the first). Of its two `edges`, tint the one that sits in slot 1 or 3 (an over slot) of `q[c]` at **both** of the move's `crossings`. That edge is the strand on top twice in a row. The other edge (under at both) stays plain `--fg`. Tinting both edges (the whole lens) is **not cleared** (design lead, brief 3 ruling).
- **How.** Same stored path from the same `draw` call, nothing new drawn: stroke `var(--domain)` in dark; in light `color-mix(in srgb, var(--domain) 70%, #000)` (about #576db3, so it clears 3:1 on `--bg-3`, which the raw pastel does not). **Width 3 units** instead of 2, so hue is not the only cue (design-lead condition), plus the caption. The caption's swatch uses the same colour. The tint must not use `--good-fill`, which belongs to the tick and the tally. Exact token is the visual designer's to confirm; the two conditions (not hue alone, ≥ 3:1 in both themes) are not.
- **Read only.** `moves` and the PD tuple are read; `apply` is never called; `simplify` is read for status only (block (a)).
- **What the learner sees.** The tinted strand always runs into the crossing they just tapped (all 7 states), passes over it and over the neighbouring crossing, and the other strand of the lens is broken at both ends. "On top twice" is visible as gaps in the other strand, not only said.
- Motion: tint appears with the switch, 150 ms fade at most; instant under reduced motion.

## Controls, in DOM order
| # | Control | Behaviour |
|---|---|---|
| 1..c | One `<button data-qa="control">` per crossing (3 on 3₁, 4 on 4₁), absolutely placed over the SVG at the crossing centre, 44 px circle (S3; fits at 260 px and up, contact sheet finding 2). `aria-label="Crossing k: switch"`, `aria-pressed` | Tap an unswitched crossing: restore any other switched crossing first, then switch this one (one switch at a time). Tap the switched crossing again: restore it ("Still a knot", tint off). |
| c+1 | Reset | Restore the switch. Tallies stay. **Disabled when nothing is switched** (so it is never a dead control). |
| c+2 | Chip "Trefoil" | Show 3₁ unswitched. **Disabled while it is the current knot** (`aria-pressed="true"`). |
| c+3 | Chip "Figure-eight" | Show 4₁ unswitched. Disabled while current. |

Visual hit affordance: each crossing button shows a faint 44 px ring in `--line`; the switched one a 2 px `--fg` ring. During predict the buttons are disabled (dashed rings in the mockup) and the tally and caption are hidden; the picture and "Still a knot" are shown.

Why this DOM order: `tests/qa/contract.spec.ts` counts the controls once, then presses index 0, 1, 2 … re-querying each time. Chips go **last** because switching to 4₁ adds a fourth crossing button and shifts every later index; chips first would also spend the path on 4₁ and never fill the trefoil row. The current chip must be disabled, or pressing it changes nothing and fails "every control does something".

## QA path (each control once, DOM order; 6 controls counted on 3₁)
1. Crossing 1 → plain loop, tint, Trefoil 1 of 3 (`firstFree`).
2. Crossing 2 → crossing 1 restored, crossing 2 switched, 2 of 3.
3. Crossing 3 → 3 of 3 (`allThree`).
4. Reset → crossing 3 restored, "Still a knot", tint off. Tallies stay.
5. Chip Trefoil → disabled, skipped.
6. Chip Figure-eight → 4₁ unswitched. Stage at reveal: 4₁, "Still a knot", Trefoil row 3 of 3, Figure-eight row 0 of 4.

`minInteractions = 2`; key state `allThree`. Every value the reveal quotes ("3 of 3") is on the stage when it opens.

## Reveal (design note's script, unchanged; cm-math-discrete owns the words)
"Each crossing you switched freed the trefoil on its own: 3 of 3. No crossing was special. After each switch, the tinted strand lay on top at two crossings in a row, so it slides off, and the twist left over falls out. …" "The tinted strand" refers to the tint this spec defines (one strand), so the sentence and the picture agree.

## Shown, not told
The learner taps three different crossings and watches three marks fill: no special crossing is a count they made. Each time, one strand lights up running over two crossings while the other strand is cut at both: "on top twice" is a picture before it is a caption.

## Mockup (`unknot-game.svg`)
Dark row: predict, first tap, third tap (allThree), figure-eight top-left switch, end of QA path. Light row: the last four. Bottom strip: all 7 single switches, light theme, tapped crossing ringed. Every picture is the kit's `draw` at S1 with stroke S2. Not a visual design.

## Open, and whose
- Tint token in light mode (`--domain` 70 % with black) and whether to add it as a stage token: visual designer.
- Design review of this spec and of the built lesson's walkthrough sheet (S4): design lead.
- A check label for "first R2 contains the tapped crossing; one edge over at both, one under at both" beside K15: cm-math-discrete (the script here prints it; the brief's check does not yet).
