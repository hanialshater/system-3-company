# Build note: twenty-then-ten-off

builder: demo-builder (sonnet builder, EXP-003 model comparison) · 2026-10-13

- Intent: one price bar; each discount cuts its percent of the price at that moment, with the working shown ("10% of $80 = $8 off").
- Milestones: both discounts applied ($72, 28%) and "Swap order" pressed (still $72). Reveal quotes both orders.
- Controls: 20% off, 10% off, Swap order (enabled once both applied), Reset.
- Total discount readout hidden while locked.

## Revision v2 (wave C)

No code change: the 28.000000000000004% artefact was already removed in v2 (TOTAL_PCT is rounded; verified in the built page). Remaining options are all round numbers.
