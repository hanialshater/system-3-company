# Build notes: midnight-sun-line

## v1 (2026-10-13, wave 2)
- Map: orthographic globe (geoOrthographic, rotate [-antisolar longitude, -60], fitted 320 x 220), 1:110m countries. The view follows the antisolar meridian, so the Sun is fixed and the Earth turns with the "Time at the town" slider.
- Night side: geoCircle of radius 90 centred on the antisolar point (antisolar lon, -23.44). Day length comes from cos H = -tan(lat) tan(23.44). Both use the same declination constant, so the picture and the readout agree. The "Toy: geometric Sun, no air" label is on the stage.
- The brief answer holds: 66.56 N (shown as 66.6). Recomputed: 65 N gives 21.12 h, 66.5 N gives 23.42 h, 66.56 N and up give 24 h.
- Key state: the town at 66.6 N with "Sun sets? No", and one place south of the line where it sets. Milestones: "edge" (lat within 66.56 to 66.71) and "south" (lat < 66.06). The chips 66.6 / 65 / 80 come first in DOM order.
- Locked: the daylight and sun-sets readouts show "?".
- Brief claim 3 (Tromso dates) is not used. The refraction caveat appears in the reveal without a number (claim c4).
- Iteration: at a 50 N viewpoint the Arctic was small on the phone, so I tilted the view to 60 N.

## Revision v2

Batch 06, 2026-10-14, from the latest learner review and fact-check. Question defines June 21 and latitude. The 66.6 N chip is replaced by 65, 70 and 80 so no button lands on the answer; the milestones are 'sets' (65) and 'never sets' (70). A 24-cell day strip shows the whole day's sunlight at the town, so 'never sets' is seen all round the clock. Reveal says why 23.4 N is not the answer (Tropic of Cancer). New claims c5 and c6, unverified.
Claims edited are unverified and need a fact-check pass. QA and walkthrough not run (machine out of memory); the chief of staff runs them after merge.

## Pre-flight v4

2026-10-14, board W-266 (decision company/decisions/2026-10-14-reveal-fits-with-its-picture.md). Applied cm-geography's reveal text as given.
- Reveal: two paragraphs. P1 unchanged (keeps the seen.sets / seen.never quote and its fallbacks). P2 is now the gap-is-the-tilt sentence, then the lit-all-day sentence, then "That line is the Arctic Circle, not the Tropic of Cancer (23.4°N), where the noon Sun is overhead." The no-air caveat is cut. The stage caption still says "Toy: no air".
- Word count of the rendered reveal (node split on whitespace, with sets 65.0°N and never 70.0°N): 81. The budget is 90 or fewer.
- Claims: c4 withdrawn (no learner sentence carries it now). c3, c5 and c7 reset to unverified for the fact-checker: c3 keeps its wording, c5 is reworded with "around June 21", c7 is shortened to match P2. c1 left alone (verified). Version 3 to 4. Status published to review (the coordinator asked for this so the launch gate is not broken; release-manager republishes).
- Open point for cm-geography / fact-checker: the c5 claim says "around June 21", but the predict question still reads "June 21 is the longest day in the north". I did not change the question because W-266 did not ask for it.
- Pre-flight 7 (phone fit): NOT MEASURED. Build, QA and walkthrough were not allowed this session, so I have no stage-top crop in px and no check that the orange gap is on screen at 390x844. Estimate only: the old reveal was about 120 words with a 99 px crop, so cutting about 40 words (about 4 to 5 lines at about 23 px) should bring the crop to about 0 px. That still has to be confirmed with tools/reveal-fit.mjs.
- tsc --noEmit: pass. npm run check: pass (638 lessons, 0 warnings).

## Pre-flight v5

2026-10-14, board W-274 (cm-geography-earth-climate ruling on FC pass 29, company/reviews/midnight-sun-line/2026-10-14-fact-check.md). Applied the ruling's exact strings; nothing else in the lesson changed.
- Predict question: "Around June 21 the north has its longest day. ..." (rest and options unchanged; no answer leaked).
- Reveal P2 last sentence: "That line is the Arctic Circle, not the Tropic of Cancer (23.4°N), where the noon Sun is overhead on the June solstice." P1 and the rest of P2 unchanged.
- Word count of the rendered reveal (node split on whitespace, sets 65.0°N, never 70.0°N): 85. Budget 90 or fewer.
- Claims: c5 reworded to the ruling's text and reset to unverified (source line added: "Reworded W-274; FC pass 29 dispute resolved in text, pending opened-reference re-check (W-275)."). c7 claim text "In June" -> "On the June solstice", reset to unverified (learner sentence unchanged). New c8 records the hook "In June the far north gets a Sun that never sets." as unverified. c3 left held (unverified) and untouched, per the ruling. Version 4 to 5. Status stays review.
- Pre-flight 7 (phone fit): NOT MEASURED. Build, QA and walkthrough were not allowed this session. The reveal grew 4 words (81 to 85), about one extra line at most at 390 px; v4's fit was itself never measured. Confirm with tools/reveal-fit.mjs.
- tsc --noEmit: pass. npm run check: pass (638 lessons, 3456 claims, 0 warnings).
