*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-standby-days-add-up
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Convert a small stated constant load into a multiday energy quantity.)
Screenshots seen: yes (artifacts/walkthroughs/lh-standby-days-add-up/sheet.png, recorded 2026-10-15T21:32:35.305Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "24h/day"; tapped Test A, Test B; slid Days 365 to 367; opened reveal.

1. **Where understanding first broke: the prediction is a non-question.** "The same 2W load for 24 hours a day or 1 hour a day: which uses more energy over a year?" Nobody would pick 1h/day or Equal. The hook even says they are "different annual totals".
2. **What the prediction felt like.** Automatic. The interesting thing (a 2W standby costs about 17.5 kWh a year, which at the caption's €0.30/kWh is roughly €5) is never asked or computed; the €0.30/kWh sits in the caption unused, so I wondered why it was there.
3. **The slider does nothing useful.** It starts at 365 and the walk moved it to 367 days. Two extra days changes 17.52 to 17.616 kWh. Exploring did not teach me anything.
4. **Whether the reveal answered my question.** It explains the formula (watts × hours × days ÷ 1000), which I did not ask about. "kWh" is never explained for a beginner; I can follow it only as "the unit on the bill".
5. Graphs: the two rising lines are clear and share a scale.

Verdict reason: no plausible wrong prediction, an unused price in the caption and a slider that barely moves; ask about the size of the yearly amount or cost instead.

## After reading the brief (meta.json)

- Objective "convert a small stated constant load into a multiday energy quantity": the formula is shown, but the prediction (24h vs 1h) does not require the conversion (finding 1). The €0.30/kWh tariff in the caption is never used on stage or in the reveal.
- Fix route: demo-builder (prediction about the size of the yearly kWh or cost; slider range that makes exploring meaningful, e.g. hours/day or watts rather than 365 to 367 days).
