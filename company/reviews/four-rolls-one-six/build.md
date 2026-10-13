# Build note: four-rolls-one-six (demo-builder, 2026-10-13)
- Intent: 1,000 seeded players (seed 1654, untuned) roll four times. Bars show the no-six group after each roll (1,000, 844, 701, 581, 477); a dashed line shows the "add 1/6 per roll" prediction (833, 667, 500, 333).
- Gate: 1 milestone, all four rolls. "Roll 1".."Roll 4" each enable the next, so QA presses all four in DOM order; "Start over" is last.
- Options 67% / 52% / 33% are computed (4/6, 1 - (5/6)^4, 2/6). The reveal quotes the stage's seeded counts and the exact 51.8%.
- The de Mere double-six puzzle is not used (seed year is only a label).
