```yaml
id: draw-the-base
confidence: ""     # new 2026-10-14 (crit candidate 1, W-514). Two pairs, one simulated witness (pedagogy-critic), same day. No case it did not produce.
context: A lesson whose idea is "the second change acts on a different amount" (successive discounts, up then down, chained percentages).
problem: Stages that draw only totals plus a formula move the mechanism into the reveal's prose. The learner is told "the second percentage acts on what remains" and nothing on screen is what remains.
therefore:
  - Name the base the second step acts on (the $8 chunk, the lost corner) and draw it before the reveal names it.
  - If the stage can only show results, the reveal must not claim a mechanism about the bases.
  - A swap or replay that answers "does order matter?" with a recorded run beats an explanation.
would_be_wrong_if: Pairwise or real-learner comparison finds lessons that draw only totals teach the base idea as well as lessons that draw the base, or the bespoke lessons won for another reason (see data-driven-engines).
documented_cases:
  - "lh-sequential-discounts (A) vs twenty-then-ten-off (B): B draws the $8 of $80 before the reveal; A's receipts are blank outlines. B preferred. company/reviews/lh-sequential-discounts/2026-10-14-pairwise.md"
  - "lh-discount-round-trip (A) vs fifty-up-fifty-down (B): B's lost 25 is a red corner the reveal points at; A never shows EUR 20 off and EUR 16 back. B preferred. company/reviews/lh-discount-round-trip/2026-10-14-pairwise.md"
excluded_cases: [sock-pairs-not-all-combinations]   # its fault is a missing central count, not a base; arguably the same family, but not claimed until a second reader says so
known_failure:
  - "Confound: both losing lessons also use the shared Life Hacks receipt template, so 'base not drawn' and 'template' cannot be told apart from two pairs. Also B in pair 1 lacks A's decision framing, so drawing the base is not sufficient for the better lesson."
part_of: demo-standard
may_call: numbers-from-the-stage
```
