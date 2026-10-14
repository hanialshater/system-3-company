# Spec: bracket-order-sets-the-bill

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #49 · wireframe: `bracket-order-sets-the-bill.svg`

**Format: Side-by-side comparison** (as briefed), stacked as two full-width panels on the phone. The same three matrices start each panel: (AB)C on top, A(BC) below. Each matrix is a box **drawn to scale** (2 px per row or column), so the middle product is a shape the learner can see. AB is a 10×5 sliver; BC is a 30×60 slab. The two panels share one cost axis, so 4,500 and 27,000 are two bar lengths on the same ruler. Side by side in two columns would not fit: C alone is 120 px wide at that scale.

## Brief check (re-run in node, 2026-10-14)
- (AB)C: A·B = 10·30·5 = 1,500, then (AB)·C = 10·5·60 = 3,000. **Total 4,500.**
- A(BC): B·C = 30·5·60 = 9,000, then A·(BC) = 10·30·60 = 18,000. **Total 27,000 = 6 × 4,500.**
- **The brief is right.** Answer C holds. Both end with a 10×60 matrix (claim 2).

## Stage at 390×844 (~420 px at predict, ~500 px in explore)
1. Rule line (muted, 13 words): "A p×q times a q×r costs p·q·r multiplications. Same answer either order."
2. **Panel 1 "(AB)C"** (~150 px tall): boxes A (10×30, drawn 60 w × 20 h), B (30×5, 10 w × 60 h), C (5×60, 120 w × 10 h) in a row, sizes labelled under each box. After its step 1, A and B merge (200 ms) into AB (10×5, 10 w × 20 h), and the step's cost appears beside it: "10·30·5 = 1,500". After step 2, the result R (10×60) appears with "+ 10·5·60 = 3,000".
3. **Panel 2 "A(BC)"**: the same boxes. Step 1 merges B and C into BC (30×60, 120 w × 60 h): "30·5·60 = 9,000". Step 2: R (10×60), "+ 10·30·60 = 18,000".
4. **Shared cost axis** under the panels: one bar per panel on a common scale of 0–27,000 across 330 px. The bar grows by each step's cost, labelled with the running total ("4,500" / "27,000"). Tick marks every 4,500, so "6 of the top bar" can be counted.
5. Controls, see below: each panel's two buttons sit directly under that panel.

Stage words at the busiest moment: rule line 13 + panel names 2 + two step costs shown per panel (labels are numbers) + totals 2 = 17.

## Controls, in DOM order (4)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Multiply A·B" | panel 1 step 1. A and B merge into AB (10×5); cost 1,500 added to bar 1. Then disabled |
| 2 | Control | "Then (AB)·C" | panel 1 step 2. Disabled until #1 is done. Result 10×60; bar 1 reaches 4,500 |
| 3 | Control | "Multiply B·C" | panel 2 step 1. B and C merge into the 30×60 slab; cost 9,000. Then disabled |
| 4 | Control | "Then A·(BC)" | panel 2 step 2. Disabled until #3 is done. Result 10×60; bar 2 reaches 27,000 |

All 4 render at first paint, disabled while `locked`, class `.tap`. QA skips disabled controls and re-queries before each press, so #2 is enabled by the time QA reaches it (after #1), and #4 likewise after #3. No reset: both priced orders stay on the stage.

QA path (each control once, DOM order): Multiply A·B (1,500) · Then (AB)·C (4,500; milestone `ab-first-priced`) · Multiply B·C (9,000: the slab appears, already twice the whole top bill) · Then A·(BC) (27,000; milestone `bc-first-priced`).

## States
- **Predict:** both panels show A, B, C to scale with sizes. Bars empty, no totals, no tick labels beyond "0". The box shapes are visible (they are the question's data), but no product box is drawn.
- **On unlock:** exploration hint: "Price both orders, one multiplication at a time."
- **Top done:** a small AB box and a short bar of 4,500.
- **Bottom step 1:** the 30×60 slab dominates the panel; bar 2 is already at 9,000.
- **Both done:** both panels end on the same 10×60 box R (a "same matrix" ✓ label between them). Bar 2 is exactly 6 ticks of 4,500.
- **Reveal:** stage as left. Reveal quotes the totals: "Your top order cost 4,500, the bottom 27,000: six times as much for the same 10×60 answer. The difference is the middle box: 10×5 against 30×60." Then: trying every split of every sub-chain finds the cheapest order (claim 3, CLRS 14.2).

Milestones (`minInteractions=2`): `ab-first-priced`, `bc-first-priced`.

## Shown, not told
The learner makes each middle box with their own press and sees its size before seeing its price. The 30×60 slab looks expensive before the 9,000 appears, so the reveal names a shape they have already judged.

## Colour and access
Input boxes `--bg-2` with `--fg` outline. Middle products `--domain` tint. Result R hatched, so it is not colour alone. Box sizes in 12 px text under each box. Bars `--domain` with the total as text. Panel `aria-label`: "A times B first: 1,500 then 3,000, total 4,500".

## Notes for others
- **Builder:** the scale is 2 px per unit, so the 30×60 slab is 120×60 px; check that it fits in a 366 px panel next to A (60 px) with gaps. A 10 px box (B's width, C's height) is still visible. Costs use thousands separators.
- **Brief owner (cm-cs-algorithms):** the brief's two bracket buttons become two steps each, so the middle product exists on the stage before its price. The teaching is unchanged.
- No illustration (CS).
