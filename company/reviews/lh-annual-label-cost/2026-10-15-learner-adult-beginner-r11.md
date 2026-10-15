*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-annual-label-cost
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Translate a stated annual energy figure into a multiyear running-cost model.)
Screenshots seen: yes (artifacts/walkthroughs/lh-annual-label-cost/sheet.png, recorded 2026-10-15T21:35:17.814Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "200kWh/year"; tapped Test A; Test B; slid Years 2 -> 4; opened reveal.

1. **The prediction tests nothing.** Same price per kWh, 200 vs 350 kWh a year: which costs less over two years? The smaller one, obviously. I did not have to think.
2. **Where understanding first broke: the hook's question is never answered as a number.** The hook asks "How does that difference repeat over years?" The stage shows €120 vs €210 and then €240 vs €420, but never the difference (€90, then €180), and the reveal never says "the gap grows by €45 every year". I had to subtract myself to find the point.
3. **The charts work.** Two small cost-over-years lines on the same scale, the steeper one for B, update with the Years slider. The expression under each value (200×2×0.3) is helpful.
4. Reveal: "Multiply annual energy by years and the stated unit price" is a formula, not an insight. The interesting real-world idea (a cheaper appliance with a higher label can cost more over its life) is not here.
5. "Full scale:€1,050; illustrative:200-or-350kWh/year;€0.30/kWh;constant years." is a run-on builder line visible on stage.

Verdict reason: the prediction is a gimme, and the year-on-year difference the hook asks about is never shown or stated.

## After reading the brief (meta.json)

- Objective "translate a stated annual energy figure into a multiyear running-cost model" is shown (€120/€210, €240/€420). The prediction does not test it, because "which is lower" is decided by 200 < 350 alone (finding 1).
- Fix route: demo-builder (ask for the multi-year cost or the gap, e.g. "how much more does B cost over 4 years?"; show the difference).
