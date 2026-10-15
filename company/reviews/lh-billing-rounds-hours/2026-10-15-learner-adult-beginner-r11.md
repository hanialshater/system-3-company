*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-billing-rounds-hours
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Apply billing increments and ceiling rules to fractional duration.)
Screenshots seen: yes (artifacts/walkthroughs/lh-billing-rounds-hours/sheet.png, recorded 2026-10-15T21:36:17.653Z)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Hourly"; tapped Test A; Test B; slid Duration 3.5 -> 4.5 h; opened reveal.

1. **The prediction needs a little work, which is good.** The hook tells me the rounding rule (3.5 h billed as 4), so I computed 4 × €4 = €16 vs €20 for a day. Not a trick, but a real calculation, and the "Equal" option becomes true at 4.5 h.
2. **The slider is the best part.** Moving to 4.5 h makes both €20; I could see that a bit more time flips the answer to Daily. That is the practical lesson: the cheaper plan depends on where the rounding lands.
3. **The reveal answers my question:** "A rounds each begun hour upward; B rounds each begun day upward. Apply the declared rounding rule before multiplying by its price."
4. Notes (not blocking): the expressions "(4×ceil(3.5))" and "(20×ceil((3.5÷24)))" use "ceil", which a beginner does not know; "round up" in words would read better. The reveal could say outright "past 5 hours, Daily is cheaper" rather than leaving it to the slider. "Full scale:€32" is builder-speak.

Verdict reason: the comparison is computed and shown for both plans, the slider exposes the crossover, and the reveal states the rounding rule the learner needed.

## After reading the brief (meta.json)

- Objective "apply billing increments and ceiling rules to fractional duration" is shown; the boundary (basic arithmetic) does not include "ceil", so the expressions should say "round up" (non-blocking note).
- Notes for demo-builder: state the crossover in the reveal.
