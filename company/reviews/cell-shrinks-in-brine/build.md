# Build note: cell-shrinks-in-brine (demo-builder, sonnet build, EXP-003, 2026-10-13)

- Retitled "A cell in a stronger bath" (the slug and brief title say "shrinks").
- Design: one cell drawn with area proportional to volume; dashed ring = starting size; shade = concentration. Preset bath buttons 0.60, 0.15, 0.90, 0.30 then a slider. Volume at balance = 0.30 / bath, computed once (vol()) for stage, question and reveal.
- Model label ("Toy cell: only water crosses") is on the locked stage; walls and non-water bulk ignored, stated in the reveal and c3.
- Gate: milestone "stronger-bath" fires only when the bath equals the question's 0.60, which the first button sets, so the learner has seen volume 0.50 before the reveal. Result volume hidden while locked.
- Reveal quotes the 0.60 result plus any other baths the learner tried.
- Claims all unverified.
