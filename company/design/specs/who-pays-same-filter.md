# Spec: who-pays-same-filter

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/economics.markets.md`, "## Course: NCM (2026-10-14)" #5 · wireframe: `who-pays-same-filter.svg`

**Format: Side-by-side comparison** (as briefed), shown as two full-width panels stacked on the phone. Both panels draw the same scene: a factory, smoke, a laundry, a filter slot on the chimney and one $-a-year ruler. Top panel: **"Right to pollute"** (the prediction's case). Bottom panel: **"Right to clean air"** (the factory is liable). Two columns of 175 px would squeeze the ruler to ~140 px, too short to read the offer marks, so the panels stack. The learner plays the laundry in the top panel and makes offers. In the bottom panel they choose for the factory. In both panels the hands find the same thing: the filter goes on, and the panel's **Total** drops from −$300 to −$100. Only the money arrow changes direction.

## Brief check (re-run in node, 2026-10-14)
Smoke damage D = $300 a year, filter F = $100 a year.
- **Right to pollute, no deal:** factory $0, laundry −$300, total −$300.
- Offer **$50**: factory would net 50 − 100 = −$50, so it refuses. Offer **$200**: factory +$100, laundry −$200 (better than −$300). Deal, filter fitted, total −$100. Offer **$350**: laundry −$350, worse than living with the smoke (−$300), so the laundry won't pay.
- On a whole-dollar grid, both sides gain strictly at offers from **$101 to $299**. At exactly $100 or $300 one side is indifferent, so the brief's "anything from $100 to $300" is right as a closed range with ties.
- **Factory liable:** paying damages gives factory −$300, laundry $0 (compensated), total −$300. Fitting the filter gives factory −$100, laundry $0, total −$100. The factory fits the filter.
- In both cases the filter is fitted and the total cost is $100. Matches the brief's check and claims 1–3.
- **The prediction survives design, with one wording fix flagged.** The stem says "$300 a year" but just "a filter costs $100", so the learner can't tell whether $100 is one-off or yearly, and the stage's ruler is $ a year. Proposed stem (25 words, node count): "Smoke costs a laundry $300 a year; a filter, $100 a year. The factory may legally pollute. If they bargain freely, is the filter fitted?" Options and answer (B) unchanged. Routed to cm-economics-markets. If they decline, the stage label reads "filter $100" with no "a year", and the ruler caption reads "$" (the teaching does not change).
- **Leak risk (for design review):** the locked stage shows "Offer $50 / $200 / $350" chips, so it shows that the laundry can pay. That does not answer the question: the stem already says "bargain freely", and option A's believer expects the factory to refuse every offer. But it does nudge toward B. If design review wants it, the chips' prices can stay hidden ("Offer ?") until the commit. This is not a contract change, because the controls still exist at first paint.

## Stage at 390×844 (~250 px at predict for the scenes and controls, ~500 px in explore)
1. **Model line** (muted, top of stage, 7 words): "Simplified: two sides, free bargaining, costs known." This is the simplification label, and it stays visible through the reveal. Claim 4 (fails with costly bargaining or many parties) is told in the reveal, one claimed sentence.
2. **Panel 1 "Right to pollute"** (~210 px):
   - **Scene** (60 px tall): a factory block on the left with a chimney and an empty dashed filter slot labelled "filter $100 a year". A grey smoke ribbon drifts right onto a laundry block (a washing line with three shirts), which carries a "smoke $300 a year" tag. The names "Factory" and "Laundry" sit under the blocks (panel 1 only; panel 2 has the same layout).
   - **Ruler** (300 px, $0–$375 at 0.8 px per $): tick at $100 marked with a filter glyph, tick at $300 marked with a smoke glyph. Offer marks appear above the ruler: ✗ (in `--bad`, with an outline) or ✓ (in `--good`, filled), each with its $ amount.
   - **Ledger** row (numbers only): factory net under the factory, laundry net under the laundry, and **Total** at the right with a small bar (0.4 px per $; −$300 is 120 px, −$100 is 40 px).
   - **Money arrow** (after a deal): "$200" arrow from the laundry to the factory, drawn on the scene.
   - Offer chips (controls 1–3) sit under the panel.
3. **Panel 2 "Right to clean air"** (~190 px): the same scene, ruler and ledger. Its ledger starts as "?" because the factory has not chosen. Choice buttons (controls 4–5) sit under it.
4. Both rulers share one scale and one x-origin, so the two Total bars line up and the learner can compare their lengths.

Stage words at the busiest moment (reveal state): model line 7 + panel titles 7 ("Right to pollute", "Right to clean air") + "Factory", "Laundry" 2 + "filter … a year", "smoke … a year" 6 + "Total" ×2 = 2, total 24. Numbers and glyphs are not counted. The "both gain" band label is the 25th word. If the visual designer needs a word, drop "a year" from the panel-2 tags (they repeat panel 1).

## Controls, in DOM order (5), each pressable once
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control (panel 1) | "Offer $50" | puts a ✗ mark at $50 on ruler 1, left of the filter tick. The factory label briefly reads "−$50 for me" (fades, ≤ 400 ms). Smoke and ledger stay (factory $0, laundry −$300, total −$300). Disabled after use |
| 2 | Control (panel 1) | "Offer $200" | **deal.** ✓ at $200. The filter slot fills (solid filter glyph), the smoke ribbon stops at the chimney, and the "$200" arrow is drawn from the laundry to the factory. The band from $100 to $300 is shaded and labelled "both gain". Ledger: factory +$100, laundry −$200, Total −$100 (the bar shrinks from 120 to 40 px). Disabled after use |
| 3 | Control (panel 1) | "Offer $350" | ✗ at $350, right of the smoke tick. The laundry label briefly reads "−$350: worse than smoke" (fades). If a deal stands it stays: the filter stays on and the ledger is unchanged. Disabled after use |
| 4 | Control (panel 2) | "Pay $300 damages" | if no filter yet: smoke flows, a "$300" arrow runs from the factory to the laundry, and the ledger shows factory −$300, laundry $0, Total −$300. If the filter is already fitted: a ✗ at $300 only, and the filter stays. Disabled after use |
| 5 | Control (panel 2) | "Fit $100 filter" | ✓ at $100. The filter slot fills and the smoke stops. A "$100" arrow runs from the factory to the filter, and any damages arrow is removed (its ✗ stays at $300). Ledger: factory −$100, laundry $0, Total −$100. Disabled after use |

Rule the builder encodes, one line in the code and none on the stage: a side keeps the best outcome it has seen. A deal needs both sides to gain, and a refused option leaves only its mark. The order of presses therefore never undoes a fitted filter, and the reveal state does not depend on the order.

All 5 render at first paint, are disabled while `locked`, and use `.tap` (44 px). Panel 1 chips are 3 × 108 px with an 8 px gap; panel 2 buttons are 2 × 166 px. There is no reset and no toggle: both panels keep their outcome into the reveal.

QA path (each control once, DOM order): Offer $50 (✗) · Offer $200 (✓, filter on, Total −$100: milestone `deal-struck`) · Offer $350 (✗, filter stays) · Pay $300 damages (✗ at $300, because the filter in panel 2 is not fitted yet: smoke, Total −$300) · Fit $100 filter (filter on, Total −$100: milestone `liable-fits`). Every press changes the SVG (marks, arrows, ledger). Fades are decoration: the marks stay, so QA's 450 ms check sees a change. Every number in the question and the reveal ($100, $200, $300, −$100 twice) is on the stage at the end of the path.

## States
- **Predict:** both scenes with smoke flowing and empty filter slots, rulers with the $100 and $300 ticks, no marks, no band. Panel 1 ledger shows factory $0, laundry −$300, Total −$300 (the question's data). Panel 2 ledger shows "?". Nothing shows a filter fitted.
- **On unlock:** nothing moves until a press. Exploration hint: "Make offers as the laundry, then choose for a liable factory."
- **Deal struck (panel 1):** filter on, the $200 arrow from laundry to factory, band "both gain", Total −$100.
- **Factory liable, filter chosen (panel 2):** filter on, the $100 arrow from factory to filter, Total −$100. The two Total bars are now the same 40 px. Both filters are on, and the arrows point opposite ways.
- **Reveal:** the stage stays as left. Reveal (≈ 95 words, written from the stage, gated on both milestones):
  "Not quite. / Your prediction held. With the right to pollute, your $200 offer got the filter fitted: it sits in the shaded band, above the $100 filter, so the factory gains, and below the $300 the smoke costs the laundry, so the laundry gains. With the factory liable, it fitted the filter itself: $100 beats $300 of damages. Look at the two Totals: −$100 both times. The right decided only who pays, the laundry or the factory. This is the Coase theorem. It holds when bargaining is free; with costly bargaining or many people, it can fail."
  If the learner pressed $50 or $350, the builder may add a clause: "your $50 / $350 fell outside it". That clause appears only when that mark exists.

Milestones (`minInteractions=2`): `deal-struck` (only the $200 offer reaches it), `liable-fits`. The gate requires exactly the state the reveal explains: the filter fitted in **both** panels, both Totals at −$100, and the band drawn. The ✗ offers are exploration and are not gated, and the reveal mentions them only if they exist.

## Shown, not told
The brief's doesNotKnow is "the efficient fix happens whoever holds the right; only who pays changes". The why behind it is that the filter saves $300 for $100, so there is $200 of gain to share. On the stage it is the shaded band between the filter tick and the smoke tick: the learner's ✓ lands inside it, and any ✗ lands outside. "Only who pays changes" is shown as two Total bars of the same length, with money arrows pointing opposite ways. The reveal points at the band, the Totals and the arrows. It does not assert anything the stage lacks.

## Labels (exact)
Panel titles "Right to pollute", "Right to clean air". Tags "filter $100 a year", "smoke $300 a year". Names "Factory", "Laundry". Ledger "Total". Band "both gain". Controls "Offer $50", "Offer $200", "Offer $350", "Pay $300 damages", "Fit $100 filter". Model line "Simplified: two sides, free bargaining, costs known." Signs are always shown (+$100, −$200, $0) and use a true minus (U+2212).

## Colour and access
Smoke is a `--muted` ribbon with a wave pattern, and a fitted filter is a solid `--fg` block with a mesh pattern (not colour alone). ✓ marks are `--good`, filled and round; ✗ marks are `--bad`, outlined and crossed (the shape carries the meaning). The band is a `--good` tint at low opacity with its text label. Money arrows are `--domain` with the amount as text. Ledger and Total in `--fg`, with Total bars in `--bg-2` and a `--fg` outline. `aria-live` on each ledger. Stage `aria-label` at the end: "Right to pollute: laundry paid $200, filter fitted, total cost $100. Right to clean air: factory fitted the $100 filter, total cost $100."

## Claims this spec adds
None beyond the brief. The ledger numbers (+$100 / −$200; −$100 / $0) and the rejected offers follow from claims 1–2 and can be recorded as derivations under them ("an offer of $50 leaves the factory −$50; an offer of $350 leaves the laundry worse than the $300 smoke"). The model line is lesson framing, but the builder should record "the model assumes two parties, costless bargaining and known costs" as a lesson-rule claim, tied to claim 4.

## Notes for others
- **Builder:** compute every net from D = 300 and F = 100. Do not hard-code. The deal test is strict (factory gain > 0 and laundry net > −300). Keep the two rulers on one x-origin. Fades must not be the only change a press makes.
- **Brief owner (cm-economics-markets):** please take or reject the stem fix "$100 a year" (see Brief check). Otherwise the brief is unchanged. Option B ("the laundry pays for it") matches the stage: the laundry's $200 covers the $100 filter.
- **Visual designer:** the picture is the two equal Total bars plus the opposite money arrows. If space is short, keep those and shrink the scenes.
- **Illustration:** factory and laundry blocks are simple shapes; no illustration request is needed for v1.
