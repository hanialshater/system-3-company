# Build notes: mercator-greenland

## v1 (2026-10-12, founding session)
Exemplar for the geo kit: a rigid rotation on the sphere slides Greenland south, and the Mercator map shrinks it.

## v2 (2026-10-12): answering the fact-check and the learner review
- c3 disputed (the question said ~15× but the map was clipped at 80°N, so the stage showed 10.7×): the map now extends to about 85°N, and the question's number is computed from the same projection, so they cannot disagree.
- Slider started at its maximum and ran "backwards": it is now "Slide Greenland south", from 0 up to the equator.
- The title and hook gave the answer away: now "How big is Greenland?". Option 3 is no longer a strawman.
- "Projection" is now named in the reveal. The footnote that showed areas before the reveal was removed (claim c11 withdrawn). The dashed ghost is explained.
- Rejected: hiding the 1/cos² law. It is the why, and the stage shows its effect.

## v3 (revision, 2026-10-13)
Inputs: 2026-10-12-fact-check.md, 2026-10-12-learner-adult-beginner.md (both of v1), v2 notes above. The v2 design is kept.

- c3 (the old FATAL candidate): re-measured on the v2 map with d3-geo (scratch script). The map now reaches 85.6°N, so Greenland is drawn whole (y 18.8–98.9 inside 0–236). The real-position ratio is 15.39, shown as "about 15" in the question. One mismatch remained: at the start, the readout used Greenland rotated to exactly 73°N (15.0×), not the shape the question measures (15.4×). It now uses the unmoved shape, so the question and the readout come from one shape. c3's source has been updated and it stays unverified until the fact-checker re-checks it.
- Earn the reveal (this lesson is a documented case): `minInteractions={2}` counted any two actions. It is now gated on two milestones: `slid` (Greenland moved south at all) and `true-size` (Greenland within 10° of the equator on Mercator, or the Equal Earth map shown). Either route shows the two shapes at about the same size.
- L5 shrinking reads as "the country shrinks": the footnote now says "Same land, same true size. Dashed outline: where Greenland really is." (claim c10).
- Brief note: latitude in degrees is not familiar. The equator is now drawn and labelled, and the slider shows "13° (now 60°N)".
- L8 ratio chip clipped (v1): not reproduced in the v3 phone screenshots.
- Already done in v2 and not reopened: slider direction, title/hook leak, footnote areas, ghost outline explained, "projection" named in the reveal. Still rejected: removing the 1/cos² law (see v2).

Trade-off for the QA contract: the contract nudges the slider 2° (`slid`) and then presses "Show Equal Earth map" (`true-size`), so it opens the gate. A learner who only nudges the slider must either reach the equator or look at the other map.
