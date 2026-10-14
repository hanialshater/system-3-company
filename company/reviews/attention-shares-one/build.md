# Build note: attention-shares-one

- Intent: one circle with three word arrows whose thickness tracks their weight, a dashed query arrow on a slider, a red blend arrow, and one 100% stacked bar beneath, so "shares of one total" is visible.
- Percentages and the stacked bar are hidden while locked (A's 44.6% is the answer).
- Script check found my own draft claim "no word can exceed 66.5%" was false (70.0% at 336 degrees); removed.
- After screenshots: weight labels merged into the word labels; the query label moved to a legend so it never collides with A, B or C.

## Revision v3 (wave C, 2026-10-14)

- Review (v1): jargon in the stem, reveal numbers never on stage, one nudge unlocked the reveal, hook leaked. Fix: stem defines scores and shares in plain words; scores shown on stage; two buttons (query on A, query midway) gate the reveal so both quoted states are visited; blend arrow named in the legend; neutral hook; softmax introduced as a name in the reveal.
- Edited claims were reset to unverified and match the stage text; version bumped, format added where missing. Local QA (contract spec, phone and desktop) passes; walkthrough sheet looked at.
