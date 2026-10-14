# Build note: income-in-dollars

- Intent: one scatter drawn at the same scale on both axes ("1 year = $1"), so in dollars everyone collapses onto a vertical line and the distance circle is literally a circle. Unit buttons: dollars, $100s, $1,000s.
- Key state: income in $1,000s, where the nearest link flips from B to A (milestone "thousands"). The link, circle and distance readouts are hidden while locked, since in dollars they show the answer.
- The ten unlabelled people were placed by hand so only A or B is ever nearest (checked in node at each unit). The flip happens near $265; that unit is not offered.

## Revision v2 (wave C, 2026-10-14)

- Review (v1): hook stated the lesson, dollar distances never shown, '1 year = $100' caption confusing, 31.6 vs 1000 unreconciled. Fix: neutral hook; no unit is selected until tapped, so dollars is a button and the dollar readouts are seen (gates dollars and $1,000s); caption reads '1 year of age counts like $X of income'; a line shows age gap, income gap and distance for A and B.
- Edited claims were reset to unverified and match the stage text; version bumped, format added where missing. Local QA (contract spec, phone and desktop) passes; walkthrough sheet looked at.

## Revision v3 (wave C builder 13, 2026-10-14)

- Review (r2): the locked dollar-unit plot showed B touching 'you'. Fix: no points are drawn until the learner taps a unit; the locked and pre-tap stage shows only axes and 'Pick a unit to place everyone'.
- Edited claims were reset to unverified and match the stage text; version bumped. Local QA run; walkthrough sheet looked at.
