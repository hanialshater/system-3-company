# Build note: humidity-evaporation-gap

Kept from evaluators until they report.

## Revision v2 (r11 fix plan wave W2, TP-1/TP-2/TP-8, 2026-10-15, demo-builder)

- engine: 2 (Seen table, both columns after the prediction, comparison reveal). Prediction line from company/decisions/2026-10-15-lifehacks-r11-fix-plan.md applied as written; correct option is 3 of 3 (TP-8).
- W-1074: the slider is now the humid room's humidity and column B is 40 points lower, so 80% vs 40% at the start (model offset was 30; value is now 100 − humidity). Idea rewritten without vapour-pressure words. [a bit]/[a lot] filled as words ('A bit weaker' / 'A lot weaker'), so no option is the only numbered one. Hook condensed from the question (the plan gives none). Title 'Humid air narrows the gap' hints the answer (listed). Recall why still says 'Normalised gap' (flagged).
- First reveal sentence at the start: "Humid room: 80 % humidity, drying push 20 of 100. Drier room: 40 %, push 60. At the same warmth the drier room pushes 3 times as hard."
- Claims: all reset to unverified (new: lifehacks.humidity-evaporation-gap.seen). Nothing marked verified.
- QA contract (QA_ONLY, port 3701, release build): phone and desktop passed.
