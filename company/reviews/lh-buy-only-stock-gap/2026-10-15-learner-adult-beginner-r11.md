*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-buy-only-stock-gap
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Calculate nonnegative replenishment after counting available stock.)
Screenshots seen: yes (artifacts/walkthroughs/lh-buy-only-stock-gap/sheet.png, recorded 2026-10-15T21:36:29.593Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Gap"; tapped Test A; Test B; slid Required 12 -> 14; opened reveal.

1. **The prediction tests nothing.** "A orders only the gap; B orders the whole requirement. Which order is smaller?" The gap is smaller by definition. The hook ("Seven in stock and twelve needed: how many are missing?") is a subtraction a child can do.
2. **Where understanding first broke: "max(0,(12-7))".** The working under the answer uses "max(0, ...)", a spreadsheet function I do not know. The reveal explains it ("prevents a negative order when stock already covers demand") but the stage never lets me see that case: the slider went 12 -> 14, and I never saw stock exceed need and the order drop to 0.
3. **The real-life mistake is not set up.** The belief worth testing is "I forgot I already had some" or "the stock I have is not all usable", and neither is in play: the stock is fixed at 7 and declared usable.
4. The drawings (two lists with curved arrows, filled boxes) do not tell me which is stock and which is the order.
5. "Ignore-stock" as B's label is clear; "Full scale:20items; usable stock=7; no hidden commitments" is builder text on stage.

Verdict reason: the question answers itself (a gap is smaller than the whole), and the one non-obvious case the reveal mentions (stock covers the need, order 0) is never shown.

## After reading the brief (meta.json)

- Objective "calculate nonnegative replenishment after counting available stock": the nonnegative part is never exercised on the walked path (finding 2), and the count is a given, not something the learner does.
- Fix route: demo-builder (let Required go below 7 so the order hits 0; ask "how many to order?" rather than "which is smaller"; replace max(0, …) with words).
