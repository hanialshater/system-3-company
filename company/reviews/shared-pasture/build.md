# Build note: shared-pasture

builder: demo-builder · 2026-10-12

- Intent: the learner plays one herder: Add a cow / Keep, then 'Others choose' (nine herders, fixed rule: add if it raises their own income).
- Brief error: its payoff says group income falls to 0 at 20 cows. With 10 self-interested herders the rule stops at 18 cows (income 36), so the lesson says 100 → 36 (claim c4).
- interact() fires only when the others respond, so the reveal waits until the learner has seen the crash. Reveal wording adapts if they chose Keep.
- After screenshots: your cow (domain colour) was invisible on the green field; now amber with a legend dot. Cow placement uses a seeded shuffle (it was diagonal before).
