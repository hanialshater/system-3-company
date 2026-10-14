```yaml
id: fit-means-legible
confidence: ""     # new 2026-10-14 (crit candidate 4, W-514, with the legibility floor). Cases came from the same day as the rule; no case it did not produce.
context: Any rule that says a picture or label must be "on screen" at the phone size (390x844), including the reveal's picture.
problem: "On screen" can be met by scaling until the label is a few pixels high. The letter of the rule holds and the learner cannot read what the reveal points at.
therefore:
  - Fit is picture AND readable labels. A label that carries meaning has a floor (10 px; 8 px if aria-hidden decoration, company/design/system.md W-289).
  - When fit and floor conflict, the floor wins and the remaining crop goes to a per-lesson fix (fold at the reveal, redraw, cut words), never to a smaller picture.
  - A reviewer reading frames asks "can I read the number the reveal cites?", not only "is it there?".
would_be_wrong_if: Learners read 4-5 px labels as easily as 10 px ones on a phone (a real-device read test), or lessons held to the floor lose pairwise to shrunk ones.
documented_cases:
  - "Kit fit 1a879c6: svg labels below 9 px in 347 of 433 shrunk lessons, median 4.9 px (principal-engineer, engineering/reviews/2026-10-14-W-237-reveal-stage-crop.md). After the floor f244779: smallest meaning label 2.6 px -> 10.0 px, 0 of 595 under 10 px."
  - "penalty-kick-mix: predict frame scaled until the table is unreadable (demo crit 2026-10-14, pair 4)."
  - "who-pays-same-filter: the reveal's top panel redrawn so small the shaded band it cites cannot be read (pair 6)."
known_failure:
  - "Blind spot in the measured fix: <tspan> sizes are not measured and 5 lessons give tspan a class, so '0 labels under 10 px' is not yet proved for them (W-339 review, W-352)."
  - "Floor gives back the gain: lessons fully fitting 398 -> 176; about 284 still crop and go the slow per-lesson route (W-264..W-267). The pattern's cost is real."
  - "The 10 px figure is a ruling, not a measurement of learners. Whether a design-lead ruling that 'on screen includes legible' stands is still open for the head-of-product (crit 2026-10-14, pair 6)."
part_of: demo-standard
may_call: measure-the-fit
```
