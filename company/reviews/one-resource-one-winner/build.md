# Build note: one-resource-one-winner (demo-builder, 2026-10-13)

- Retitled "Two plants, one nutrient" (the slug "one winner" gives the answer).
- Design: 100 dot sites (A filled with the domain colour, B red, 1 dot = 0.1 unit of plant) over a nutrient bar with break-even ticks for A (2) and B. Chips: Day 20 / 100 / 400; B needs 5 / 3 / 1.
- Model (chemostat-style, deterministic Euler 0.01 day): supply 10, washout and death 0.1/day, growth 0.5 R/(K+R). B starts eight times as common (A 0.5, B 4), so "the common one wins" is a live wrong answer. Day 400: A 80 dots, B 0, nutrient 2.0; with B needing 1, B 90, A 0, nutrient 1.0. The brief's numbers (A = 18.0) used a different supply; the outcome is the same.
- "Break-even" is defined on the locked stage.
- Gate: milestones "a-wins" (day 400 with B at 5) and "b-needs-less" (day 400 with B at 1). The QA path is Day 20, 100, 400, then B 3, B 1. The reveal quotes only those two end states.
- Coexistence with several nutrients is stated (c4) so the lesson does not overreach. Claims unverified.
