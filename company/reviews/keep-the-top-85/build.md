# Build note: keep-the-top-85

- Brief 41 (top-p-sampling). Retitled "Drop rare words: who gets their chance?" (the slug's "85" is fine; the title does not name 50%).
- Stage: five sorted bars for invented odds after "I ate" (pizza 45, rice 30, soup 15, cake 6, glue 4). Dashed outline = original odds; filled bar = rescaled share; cut words read "cut". Locked: originals only (they are in the question), no rescaled bars or readouts.
- Controls in DOM order: p slider (40-100, step 5, starts at 75), "Draw 20 words". Readouts: words kept, pizza now.
- Key states (milestones): "p-question" (slider at exactly 85) and "drew-with-cut" (a draw while some word is cut). QA path: slider 75 → 80 → 85, then Draw 20 at 85 (draw set 1: pizza 12, rice 5, soup 3, cake 0, glue 0).
- Node check: keptCount(85) = 3, sum 90, pizza 45/90 = 50%. p = 75 keeps 2 (pizza 60%); p = 80 also keeps 3.
- Draws: mulberry32(seed = draw number), untuned; the reveal only quotes the cut words' count (0), which holds for every seed by construction.
- Reveal quotes only 85 / 90 / 50% (visited) and the learner's own last draw.
