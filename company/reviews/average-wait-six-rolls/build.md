# Build note: average-wait-six-rolls (demo-builder, 2026-10-13)
- Retitled "Waiting for a six".
- Stage: one histogram of rolls needed for 1,000 seeded players (mulberry32 seed 6, untuned), bars 1..24 and a pooled 25+. A dashed marker highlights and counts the bars beyond it.
- Controls in DOM order: "Roll for 1,000 players", "Mark 6 rolls", "Mark 4 rolls" (4 = halfDoneBy(), computed). Gate: "six" and "four". The brief's draggable marker became two buttons so QA visits both values the reveal names.
- "Median" is never used; the reveal says "half were done by roll 4", which the learner sees as 491 beyond the 4 marker.
- Numbers: the run's average is 5.9 (shown), the question's 6 is the exact mean (c1); the option 33% is pct((5/6)^6).
