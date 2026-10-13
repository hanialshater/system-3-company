# Build note: flip-twenty-percent

- Brief 46 (label-noise-ceiling). Retitled "Grading a model that is never wrong" (the slug is internal; the title does not give 80%).
- Adapted: exactly n of 100 key labels are flipped (not random 20%), so the score is exactly 100 − n and the stage never shows 79% or 81% against a question that says 80%. Flipped items are the first n of a mulberry32(seed 1) shuffle, untuned; the choice of items changes no number.
- Stage: one 10 × 10 grid of test questions; after scoring, green = model matches key, red = key is wrong (caption says so). Locked and before scoring: grey dots, readouts "–".
- Controls in DOM order: Score the never-wrong model (one-shot), key-flipped slider (0-40%, step 10, starts at 20). Readouts: key errors, model's score.
- Key states (milestones): "scored-at-question" (scored at 20%: 80%) and "noise-changed-after-score". QA path: score at 20 → slider 30 → 40 (70%, 60%), so option C's 60% is visited.
- Two classes are not modelled: the model gives the true answer, so a flipped key always disagrees.
