# Build notes: fingernail-ocean

## v1 (2026-10-13, wave 2)
- Map: Equal Earth rotated to centre on 30 W (geoEqualEarth().rotate([30, 0]), 320 x 170), 1:110m countries in a custom SVG, because WorldMap cannot leave a country out.
- Toy, labelled on the stage: South America (the 1:110m shapes of its 13 countries and territories, plus the French Guiana part of the France MultiPolygon) is rotated about the Earth's axis by (2.5 cm/yr x time) / (R cos 10 degrees). The stated km is exact along 10 S and smaller farther south. It is not a plate reconstruction. A dashed ghost marks today's position. Panama is left in place. The land polygon could not be used for the shape: at 1:110m it joins the Americas, and Africa to Eurasia.
- Brief answer holds by arithmetic: 3,000 km / 2.5 cm a year = 120 million years (TARGET_MYR in Demo.tsx).
- Fingernail rate: I recall about 3.5 mm/month (about 4 cm a year), so the hook and question say "about as fast as". Claim c2 is flagged.
- Key state: 3,000 km of new ocean on the readout, with the strip of new ocean visible. One milestone, "ocean". The controls are add-time chips (+100, +20, +5 million years, then Back to today). +100 then +20 lands exactly on 120, so QA reaches the key state on its second press.
- Locked: the "New ocean" readout shows "?".
- Iteration: the QA phone shot ends on "Back to today", where the moved shape covers its ghost. That is expected, and I made no change.

## v2 (claim fix 2026-10-13)

Claim c2 disputed (question attributed 2.5 cm/yr to fingernails; nails grow about 4 cm/yr). Predict question reworded to 'Plates move about 2.5 cm a year, the same order as fingernail growth (about 4 cm a year).' Claim rewritten; unverified.

## v3 (2026-10-14, answering 2026-10-14-learner-drift-knower-r6.md)
- Time steps are now +1, +10, +100 million years (powers of ten), and a first button "Run to 3,000 km" sets exactly the question's case. The locked buttons no longer sum to the right option and to nothing else (finding 3): 12 = 10+1+1, 120 = 100+10+10, and the run button names the question's distance, not a time. MAX is 300 million years so every button can be pressed once after the run.
- The milestone fires only at exactly 3,000 km and records "120 million years → 3,000 km of new ocean" on a stage Seen line. "Back to today" does not clear it, so after Reset the stage still shows the quoted state (finding 1).
- The caption now shows the rate the reveal quotes: "Toy: South America slides west at 2.5 cm a year = 25 km per million years. Dashed: today." (finding 2). "Equal Earth" is dropped from the caption. Claims unchanged in substance (c1 already says 25 km per million years), so none were reset.

## Pre-flight v3
1. Title and hook: "An ocean at fingernail speed" / "Continents creep at the pace your nails grow. How long does that take to build an ocean?" No option follows from them.
2. Options: "12 million years" / "120 million years" / "1.2 billion years". All numbered, same precision.
3. Locked stage: buttons "Run to 3,000 km", "+1 / +10 / +100 million years", "Back to today" (disabled); Time 0 million years; New ocean "?"; Seen "nothing yet". Nothing says 120.
4. Reveal values: 120 million years and 3,000 km (b) milestone `ocean`, recorded on the Seen line; 25 km per million years (a) a constant shown in the caption; 2.5 cm a year (the question and caption); "about 2 metres" in a lifetime is told (claim c4).
5. QA path: Run to 3,000 km (reaches `ocean`, records), +1 (121), +10 (131), +100 (231), Back to today (0). The Seen line still reads "120 million years → 3,000 km of new ocean".
6. Reset: "Back to today" is the last press. Reveal: "120 million years. You saw it, and the Seen line keeps it: 120 million years made 3,000 km of new ocean. 3,000 km is 300 million cm, and at 2.5 cm a year each million years adds only 25 km, the rate under the map. / A speed you could never see in a lifetime, about 2 metres in one, becomes an ocean once geological time multiplies it. Real spreading in the Atlantic varies ... this stage is a toy that slides one continent due west at an average rate." (Composed from the code, not from a run.)

## Pre-flight v4 (demo-builder, 2026-10-14, wave H batch 1, r8 drift-knower: rate pointer before the commit, 101 words; W-344)

Fixes: the caption shows only "Toy: South America rides its plate west at 2.5 cm a year. Dashed: today." while locked; "= 25 km per million years" appears after the commit (r8 finding 1: the conversion is what the question tests). "rides its plate" ties the moving continent to the question's "plates" (r8 moderate). Reveal: the last sentence ("Real spreading in the Atlantic varies … this stage is a toy …") is cut (r8 finding 2; the board item named it as the candidate; the caption keeps "Toy"); c3 withdrawn with a note. cm-geography may want the 2-4 cm range back; there is room for about one line.
1. Title and hook: unchanged ("An ocean at fingernail speed").
2. Options: "12 million years", "120 million years", "1.2 billion years".
3. Locked stage: map with today's South America, caption with 2.5 cm a year only (no km per million years), buttons, "Time 0 million years", "New ocean ?", "Seen: nothing yet". Nothing matches 120.
4. Reveal values: unchanged from v3 (120 and 3,000 from the Seen record; 25 km from the caption, shown after the commit).
5. QA path: unchanged (Run to 3,000 km fires the milestone; +1/+10/+100, Back to today). Seen line and caption on stage at the reveal.
6. Reset: Back to today; Seen line keeps "120 million years → 3,000 km of new ocean". Reveal: "120 million years. You saw it, and the Seen line keeps it: 120 million years made 3,000 km of new ocean. 3,000 km is 300 million cm, and at 2.5 cm a year each million years adds only 25 km, the rate under the map. / A speed you could never see in a lifetime, about 2 metres in one, becomes an ocean once geological time multiplies it."
7. Phone fit: reveal-fit 390x844 (dev :3530): crop 0 px (was 0), hiddenBelow 0, namedHidden 0, 74 words (was 108 by the tool; r8 hand count 101), stage 388 px, window 618; the map is now drawn at 143/170 px (was 80/170, the 40% floor the r8 learner found hard to see). On screen at the reveal: map with the dashed outline, caption with the 25 km rate, Seen line, readouts.
- meta.json 3 -> 4; c1 and c5 reopened (unverified), c3 withdrawn. c2, c4 unchanged. Not run: build, QA, walkthrough.
