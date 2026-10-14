# Build note: one-percent-a-day

builder: demo-builder (demo-builder-books-1) · 2026-10-14 · v1 draft · brief: company/domains/briefs/books.md #2 · format: single card (today; multi-card later per brief)

- Intent: one chart of skill over 365 days. A solid curve compounds the daily gain, a dashed line adds it without compounding (1 + g × days), and once added a green practice curve (illustrative power law, skill = day^0.4, 10.6× at day 365) stays drawn. The y axis rescales to the largest curve, so at 2% a day the practice curve visibly flattens to nothing next to 1,377×. Readouts: "Compounded, day 365" and "Practice curve". Chip: "Practice curve: illustrative, skill ∝ day^0.4".
- Controls in DOM order: daily-gain slider (0.1% to 2%, starts at 0.5%), "Add practice curve", "Compound at 1%" (the question's own case, last). The slider also reaches the 1% milestone if the learner lands on 1.0%.
- Deviation from the brief: the brief's "curve toggle" is a one-way "Add practice curve" button, so the curve the reveal points at ("as your practice curve showed") cannot be toggled away before the reveal opens. The slider still moves the compounded and added curves while the practice curve is shown.
- Milestones (minInteractions 2): "practice" (10.59× recorded), "compound" (g = 1.0%: 37.78× recorded).

## Pre-flight v1

1. Title and hook: "Get 1% better every day" / "Each day builds on the last. Where does a year of small gains leave you?" Neither names 4.7, 37.8 or 365.
2. Options: "About 4.7 times" / "About 37.8 times" / "About 365 times": same form, all numbered.
3. Locked stage: empty axes ("day 0", "day 365"), legend "compounded / no compounding", chip, readouts "?" and "–", slider at 0.5%. No curve, no end values.
4. Reveal values: 37.8× (milestone "compound", recorded; on the chart and readout at the end of the QA path); 10.6× (milestone "practice", recorded; the practice curve and its end label stay drawn); 4.7× is the question's option, also drawn as the dashed line's end label at 1%.
5. QA path: slider 0.5 → 0.7%, Add practice curve (practice), Compound at 1% (compound). Both milestones by press 3; both curves and their end labels on the chart when the reveal opens.
6. Reset: there is no Reset control; the last press leaves the question's case on screen. Reveal reads "At 1% a day the compounded curve reached 37.8×, not 4.7×. ... as your practice curve showed (10.6× after a year). ..."
7. Phone fit: see "Measurement" below.

## Measurement
