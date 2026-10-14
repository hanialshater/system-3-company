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

## v4 (2026-10-14, answering 2026-10-14-learner-no-projections-r6.md)
- Options are all numbered now: "Greenland about 15× Congo" / "Greenland about 1× Congo" / "Congo about 4× Greenland" (finding 1).
- Hook rewritten to "Greenland or DR Congo: which has more land? Slide Greenland south and compare." It no longer says the size is an appearance (finding 2). Claim c9 ("Wall maps make Greenland look enormous") withdrawn with the sentence.
- Gates are now `equator` (Greenland within 10° of the equator on Mercator) and `equal` (the equal-area map shown). A new first control, "Slide to the equator", reaches the first in one press, so the QA path actually makes the slide the reveal describes. Each gate records the ratio the readout printed onto a stage line, "Seen: Mercator 15.4× at 73°N, 0.9× at the equator · equal-area 0.9×" (ratios as recorded at the press; the 15.4 and 0.9 figures are from the r6 walkthrough, not a fresh run). The reveal quotes that line; "more than ten times" and 1/cos² are gone from it (finding 3). Claim c4 reworded, unverified.
- Mercator's purpose is now drawn: an orange dashed line of one constant compass bearing (a rhumb line, 50°W 45°S to 50°E 62°N) is straight on Mercator and bent on the equal-area map, and the reveal points at it (finding 4). New claim c13, unverified.
- Finding 5 (Greenland clipped at the top of the Equal Earth oval): on the new path Greenland is near the equator when the equal-area map is shown, so the two shapes sit side by side. If a learner shows the equal-area map with Greenland at 73°N it is still compressed near the top; not changed.
- The toggle reads "Show equal-area map"; the caption names the map in use.

## Pre-flight v4
1. Title and hook: "How big is Greenland?" / "Greenland or DR Congo: which has more land? Slide Greenland south and compare." Neither points to an option.
2. Options: "Greenland about 15× Congo" / "Greenland about 1× Congo" / "Congo about 4× Greenland". All numbered, same "about N×" form.
3. Locked stage: Mercator map, Greenland at its real place, readout 15.4× (the question's own number), equator line, orange bearing line, Seen "Mercator 15.4× at 73°N". Nothing marks "about 1×".
4. Reveal values: 2.17 and 2.34 million km² told (claims c1, c2); 15.4× at the start (a) the unmoved shape, also on the Seen line; ratio at the equator (b) milestone `equator`, recorded; equal-area ratio (b) milestone `equal`, recorded; "straight on it and bent on the equal-area map" (a) the line on whichever map is shown, and both maps are seen on the required path.
5. QA path: "Slide to the equator" (reaches `equator`), slider two presses (back to 2°N), "Show equal-area map" (reaches `equal`). All on the Seen line at reveal; the equal-area map with its bent line is on screen.
6. Reset: no Reset control; sliding back north does not clear the records. Reveal: "They are about the same size, and Congo is slightly bigger: Greenland is about 2.17 million km², DR Congo about 2.34 million. Your Seen line: on Mercator the drawn ratio went from 15.4× at 73°N to 0.9× at the equator, and the equal-area map gave 0.9×. The land never changed as you slid it; the map did. Every flat map is a projection, and Mercator stretches areas more the farther they are from the equator. / Mercator was made for sailors: it keeps angles true, so the orange line of one compass bearing is straight on it and bent on the equal-area map, which keeps sizes true instead. No flat map can keep both." (Ratios as recorded; composed from the code, not from a run.)

## v5 (2026-10-14, answering 2026-10-14-learner-no-projections-r8.md, board W-321)
- Fit (top finding): at 390x844 the open reveal had the whole map off screen (tool: crop 294 px, "equator" label hidden, 121 words incl. the verdict line). Fixed by compaction, not by shrinking text:
  - Mercator map 236 -> 200 px tall (equator at y 160, rows to about 40°S); the equal-area map is fitted to 320x158, its own oval height, so there is no empty band under it. c3 and c13 reopened (map extent and line clipping changed).
  - "Slide to equator" and the map toggle ("Equal-area map" / "Mercator map") share one row; the slider ("Slide south", output "60°N") shares a row with the readout, now labelled "Greenland ÷ Congo". The map's name moved into the picture as an 11 px label (bottom-left on Mercator, top-left on equal-area).
  - Caption shortened to "Orange: one compass bearing. Dashed: its true place." (one line; also fixes the r8 minor "caption cut at the stage bottom"). Stage margins on the two text lines tightened.
  - Equator label 9 -> 11 px (10 px floor).
- Reveal ~105 -> 80 words (tool 121 -> 87 with the 7-word verdict line). Kept every quoted value (15.4x at 73°N, 0.9x at the equator, equal-area 0.9x, the orange line straight/bent) and both areas (one clause now). Cut: "Every flat map is a projection" (the word "projection" is kept on Mercator), "as you slid it", "which keeps sizes true instead". No claim's meaning changed; cm-geography may still swap which told clause goes (r8 asked for their call).
- Open: if a learner flips back to the Mercator map before the reveal, the taller map (200 px vs 158) will crop the stage top by roughly 40 px; the measured QA path ends on the equal-area map.

## Pre-flight v5
1-6. Unchanged from v4 except the reveal text: "They are about the same size; Congo is slightly bigger (2.17 vs 2.34 million km²). On your Seen line, Mercator went from 15.4× at 73°N to 0.9× at the equator; equal-area gave 0.9×. The land never changed; the map did. Mercator, a projection, stretches areas more the farther they are from the equator. / Made for sailors, it keeps angles true: the orange compass-bearing line is straight on it, bent on the equal-area map. No flat map can keep both." Every number is on the Seen line at the reveal.
7. Phone fit (`node tools/reveal-fit.mjs --url http://localhost:3530 mercator-greenland`, dev server, 2026-10-14): before crop 294 px, namedHidden 1 (equator), 121 words; after crop 0 px, hiddenBelow 0, namedHidden 0, 87 words (80 without the verdict line). Stage 329 px (picture 158, controls 85, text 42), reveal 267 px, window 618 px. At the reveal the equal-area map with the bent orange line, the equator label, the readout and the Seen line are on screen with the reveal's last line.
