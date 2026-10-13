# Build note: costly-resistance (demo-builder, 2026-10-13)

- Title "Drug gone. Do resistant cells go too?" (a question; it does not name the answer).
- Design: a dish of 400 cells, red = resistant (round(400 r)). Chips: Gen 5, 10, 20, 60; cost 5% / 1% / 10% slower (default 5%). Deterministic: r_g = 0.1 x 0.95^g / (0.9 + 0.1 x 0.95^g).
- Brief check reproduced: 3.8% at generation 20 (15 of 400 cells). 0.51% at 60 (2 cells). The option "About 4%" is computed from the stage.
- Gate: milestones "gen-20" and "gen-60" at the 5% cost. The generation chips come before the cost chips, so the QA path reaches both. The reveal quotes only those two states.
- After screenshots: shares under 1% now show two decimals (10% cost at gen 60 read "0.0%", which contradicted "never quite reaches zero"; now 0.02%).
- "A model, not treatment advice" is in the reveal; c3 (compensating mutations) is a source claim for the fact-checker. Claims unverified.
