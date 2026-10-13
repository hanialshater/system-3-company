# Build note: halved-risk-one-in-thousand (demo-builder, 2026-10-13)
- Intent: 1,000 people as dots; risk chips 2 / 20 / 200 per 1,000; pill toggle. Red = case, green ring = spared. Counts are exact arithmetic (model.ts); the seed (2024) only places dots.
- Gate: 2 milestones, pill on at 2 in 1,000 (spares 1) and pill on at 200 in 1,000 (spares 100). The pill toggle is first in DOM order, so QA reaches both (pill, 20, 200).
- Question numbers (2 -> 1) and options (1, 10, 500) come from cases()/spared(). The pill is declared hypothetical (c5).
