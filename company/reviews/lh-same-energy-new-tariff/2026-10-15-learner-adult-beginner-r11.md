*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-same-energy-new-tariff
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Distinguish a cost change from an energy-use change.)
Screenshots seen: yes (artifacts/walkthroughs/lh-same-energy-new-tariff/sheet.png, recorded 2026-10-15T21:37, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Peak"; tapped Test A, Test B; slid Energy 3 to 5kWh; opened reveal.

1. **Where understanding first broke: there is nothing to predict.** "The same 3kWh billed at €0.40 or €0.20: which is cheaper?" The cheaper rate is cheaper. I picked "Peak" only because the walk forced option 1.
2. **The idea in the title is not what is asked.** "Same energy, different tariff" and the hook ("changes its price while leaving its energy unchanged") point at a real belief: that running a load off-peak uses less energy. The prediction asks about cost, not energy, so that belief is never tested. The words "peak" and "off-peak" appear only on the buttons; the question never says the cheaper rate is the off-peak one.
3. **The charts carry a confusing label.** Both axes read "€4.8", which looks like a price. €1.2 and €0.6 should be €1.20 and €0.60.
4. **Does the reveal answer my question?** It says the cost changes because the price changes and the energy stays the same, plus a sensible caveat. That is right, but it answers a question I was not asked.

Fixes (for the builder):
- Ask the energy question: "You move the 3kWh wash to off-peak. How much energy does it use now?" (less, same, more), then show the cost.
- Name peak/off-peak in the question; two-decimal money.

Verdict reason: the prediction compares two prices for the same amount, which no one gets wrong, and the belief the title targets (moving saves energy) is never tested.

## After reading the brief (meta.json)

- Objective: distinguish a cost change from an energy-use change. Confirms finding 2: the prediction is about cost only, so the energy side of the distinction is never tested.
- Fix route: demo-builder (energy question first).
