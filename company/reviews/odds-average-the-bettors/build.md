# Build note: odds-average-the-bettors

builder: demo-builder (ncm-e00) · 2026-10-14 · brief: Course NCM #6

- Intent: one 100% pool bar split into money on A (bettor 1, bettor 2) and on B (bettor 1, bettor 2); the A/B boundary is a solid line labelled "odds 70%", and a dashed line marks the simple average of beliefs. Each segment's width is the money behind a belief, which is the stand-in for "wealth-weighted".
- Stage text and chip say each bettor splits ALL their money by belief (brief edit). No house cut.
- Milestones: "equal" (equal money: odds land on the simple average) and "richer2" (bettor 2 richer: odds slide toward 40%; preset gives 50%). Presets in DOM order: Equal money, Bettor 2 richer, Start values; then four sliders (money step $50, belief step 10%).
- Log-utility (Kelly) sentence told once in the muted model line, claimed as c4 (source, unverified).
- Not run here: build, tsc, QA. Watch on a phone: two rows of two sliders may wrap to four rows; check the stage height.

## Revision v2 (wave E r6, 2026-10-14)

r6 (odds graduate, revise): the hook "The odds don't say 60%. Whose opinion counts more?" struck the misconception's option before the commit. Fixes:
- Title "Two bettors, one set of odds" (was "The odds average the bettors"). Hook "One bettor says 80%, another 40%. What do the odds say?".
- Third milestone, start: the question's own case ($300 at 80%, $100 at 40%) must be shown, either with "Start values" or the sliders. minInteractions 3.
- The equal-money and bettor-2-richer states are recorded when first reached, and the reveal quotes the records (money, odds, simple average, bettor 2's belief), not constants. The first paragraph appears only once the start state is recorded.
- A "Seen:" line keeps all three odds on stage, since the slider presses after them change the bar: "Seen: equal money 60% · bettor 2 richer 50% · start 70%".
- Bettor key under the bar (swatches for bettor 1's and bettor 2's money; "left of the line: on A").
- Claims unchanged in text (none reworded); no claim reopened. Not run: build, QA, walkthrough, tsc.

## Pre-flight v2

1. Title and hook: "Two bettors, one set of odds" / "One bettor says 80%, another 40%. What do the odds say?" Neither rules out 60%, 70% or 80%.
2. Options: "60%", "70%", "80%". All whole percents.
3. Locked stage: empty pool bar labelled "On A" and "On B", the model chip, the key, "Seen: nothing yet", readouts "?". No divider, no dashed average, no number.
4. Reveal values: $240, $40, $280 of $400, 70% and 60%: (b) milestone start, constants that equal the recorded start state (the reveal prints them only after that milestone); equal-money odds and average: (b) milestone equal, recorded; bettor-2-richer money, odds, belief and average: (b) milestone richer2, recorded. All three odds stay on the "Seen:" line.
5. QA path: Equal money (equal), Bettor 2 richer (richer2), Start values (start), then four sliders, two presses each (they change the bar but not the records). All three milestones reached, including the question's own case. The "Seen:" line is on stage at the reveal.
6. Reset: "Start values" is the only reset and is itself a milestone. The records never clear. Reveal on the QA path: "$300 × 80% = $240 and $100 × 40% = $40 put $280 of the $400 pool on A, so the odds said 70%, not the simple average of 60%. / With equal money ($200 each) the solid line sat on the dashed one: odds 60%, simple average 60%. With bettor 2 holding $300 to bettor 1's $100, the odds slid to 50%, toward bettor 2's 40%, while the dashed average stayed at 60%. Each opinion counts in proportion to the money behind it: the implied chance is the wealth-weighted average belief. / A simplified model: no house cut, each bettor splits all their money by belief, as a bettor maximising the logarithm of their wealth would."

## Pre-flight v3

r7 top finding: the reveal opened on "$240 + $40 = $280 of $400, 70%" while, after slider play, the stage showed 87% / 80% and the trace kept only "start 70%". Fixes: three "Seen" rows under the legend record every value the reveal quotes, at the milestone that fires them: "Seen, start: $240 + $40 = $280 of $400 on A, odds 70%, average 60%", "Seen, equal $200 each: odds 60%, average 60%", "Seen, bettor 2 $300 at 40% vs $100: odds 50%, average 60%". The reveal's first sentence is now built from START and the same pool() (no typed numbers). The "Simple average" readout is hidden until the commit (r7 finding 3). Bar labels split onto two lines (bettor, $) so the $40 sliver gets a label. No claim text changed.

1. **Title and hook.** "Two bettors, one set of odds" / "One bettor says 80%, another 40%. What do the odds say?" No percentage for the odds given or ruled out.
2. **Options.** "60%" / "70%" / "80%": all numbered, same precision.
3. **Locked stage.** Model chip, empty pool track labelled "On A" / "On B", the colour legend, "Seen: nothing yet", one readout "Implied chance of A ?". No line, no average marker, no simple-average readout.
4. **Reveal values.** $300, 80%, $240, $100, 40%, $40, $280, $400, 70%, 60%: (b) milestone "start" (the question's own case), on stage in the start Seen row. "$200 each", 60%, 60%: (b) milestone "equal", in its Seen row. "$300 to $100", 50%, "bettor 2's 40%", 60%: (b) milestone "richer2", in its Seen row. All use the stage's pct() rounding.
5. **QA path.** DOM order "Equal money" (equal), "Bettor 2 richer" (richer2), "Start values" (start): 3 milestones in 3 presses; the four sliders then move the live bar and readouts but not the Seen rows, which are on the stage when the reveal opens.
6. **Reset.** "Start values" is the reset; the Seen rows survive it and slider play. Reveal from that run: "$300 × 80% = $240 and $100 × 40% = $40 put $280 of the $400 pool on A, so the odds said 70%, not the simple average of 60%. With equal money ($200 each) the solid line sat on the dashed one: odds 60%, simple average 60%. With bettor 2 holding $300 to bettor 1's $100, the odds slid to 50%, toward bettor 2's 40%, while the dashed average stayed at 60%. Each opinion counts in proportion to the money behind it: the implied chance is the wealth-weighted average belief."

Not seen in a browser (no build/QA this wave).

## v4 (demo-builder, 2026-10-14, answering 2026-10-14-learner-odds-graduate-r8.md, board W-312)
- Fit (top finding): at 390x844 the open reveal had the pool bar, both lines and all Seen rows off screen (tool: crop 423 px; "400", "simple average", "80%", "equal money" hidden; 116 words). Stage 684 -> 337 px:
  - Removed the readout row ("Implied chance of A", "Simple average"): the picture's own "odds N%" and "simple average N%" labels carry the same numbers, and the readouts were what showed 87% / 80% beside a reveal quoting 70%.
  - Removed three of the four sliders (bettor 1 money, both beliefs). Kept "Bettor 2 money" ($50-$400), the variable the lesson is about. Preset buttons on one row ("Equal money", "Bettor 2 richer", "Start").
  - Picture 320x150 -> 320x110 (thinner bar, labels kept at 10-15 px). The "odds" label now sits on the side of the solid line away from the dashed one (it used to be crossed by it).
  - Seen rows: the equal and richer records share one line ("Equal $200 each: 60% (avg 60%) · 2 richer, $300 at 40% vs $100: 50% (avg 60%)"); the start record is "Seen, start: $240 + $40 = $280 of $400: 70% (avg 60%)".
- Reveal ~108 -> 80 words (tool 116 -> 84 with the verdict). Cut the muted model note (the chip states the model; claim c4, the log-wealth sentence, withdrawn) and shortened the equal / richer sentences. Every number kept in the reveal is on the Seen rows.
- Not fixed: stage text is still over 25 words (chip, legend, Seen rows, about 45 words). The Seen rows are what make the reveal honest; folding them into the bar as marks is a picture redesign, put on the board for design-lead.
- After the QA path the slider has moved bettor 2 to $200, so the live picture reads "odds 64%" while the reveal's first paragraph says "the odds said 70%" (past tense, on the Seen row). Learners who play see a live state the reveal does not describe; the record they need is on screen.

## Pre-flight v4
1-3. Unchanged from v3, except the locked stage has no readout ("Implied chance of A ?" is gone; the bar's "On A" / "On B" have no values until the commit).
4. Reveal values: as v3, minus "$200 each" and "simple average 60%" in the equal sentence (now "(60%)"); all on the Seen rows.
5. QA path: "Equal money" (equal), "Bettor 2 richer" (richer2), "Start" (start), then the slider two steps ($100 -> $200). Seen rows unchanged by the slider.
6. Reveal from that run: "$300 × 80% = $240 and $100 × 40% = $40 put $280 of the $400 pool on A, so the odds said 70%, not the simple average of 60%. / With equal money the solid line sat on the dashed one (60%). With bettor 2 richer ($300 to $100), the odds slid to 50%, toward bettor 2's 40%, while the dashed average stayed at 60%. Each opinion counts in proportion to the money behind it: the implied chance is the wealth-weighted average belief."
7. Phone fit (`node tools/reveal-fit.mjs --url http://localhost:3530 odds-average-the-bettors`, dev server, 2026-10-14): before crop 423 px, namedHidden 4, 116 words; after crop 0 px, hiddenBelow 0, namedHidden 0, 84 words (80 without the verdict). Stage 337 px (picture 110, controls 85, text 76), reveal 247 px, window 618 px (about 13 px spare). Chip, bar, both lines with their labels, the legend and both Seen lines are on screen with the reveal's last line.
