# Build note: bird-on-the-wire

Builder: demo-builder (wave-i-physics), 2026-10-14. Brief: `company/domains/briefs/physics.electricity.md` round 3 #2. Status draft; every claim unverified.

**Safety line:** the reveal's "Never approach real power lines: current can jump across air." (claim c5) must be approved before publish by a reader other than its author (brief; W-361 precedent). I did not approve it and cannot.

Departures from the brief: the voltmeter probe is three buttons (Foot 1, Foot 2, Across feet), with each lead drawn to the two points it compares; ground is the second point for a single foot. The current arrow's width follows log10 of the current (0.2 µA to 1.1 A spans seven orders of magnitude, so a linear width would be invisible at one end), and it carries a "bird 0.2 µA" / "bird 1.1 A" label. The AC idealisation (c6) is in the claims and the code header, not on the stage, to stay inside the 25-word text budget. The bird's 10 kΩ resistance is illustrative (brief).

## Pre-flight v1

1. **Title and hook.** "The bird on the 11,000 V line" / "Birds perch on bare power lines every day. What voltage is across one?" Neither says how much voltage is across it or why the bird survives.
2. **Options.** "About 11,000 V", "About 5,500 V", "Less than 1 V": all numbered, all approximate.
3. **Locked stage.** Pole, insulator, line labelled "11,000 V · 200 A", the bird on the line, and a voltmeter showing "voltmeter / ? V" with no leads. No current arrow, no record lines.
4. **Reveal values.** "11,000 V at each foot": milestone "feet" (both feet probed; stage "seen: feet 11,000 V"). "0.003 V between them … the 7 cm": recorded on the latest across-the-feet reading (milestone "across"; it updates live as the slider moves in that mode; stage "across 7 cm 0.003 V"). "200 A": a given, on the line label. "jumped to 11,000 V": milestone "pole"; stage "to pole 11,000 V" and the meter "foot–pole 11,000 V".
5. **QA path.** Foot 1, Foot 2 ("feet"), Across feet ("across", 5 cm 0.002 V), slider two presses (6, then 7 cm; the record becomes 0.003 V at 7 cm), Wing on pole ("pole"). All 3 milestones. When the reveal opens, all three record lines, the meter and the current arrow are visible.
6. **Reset.** There is no Reset control. Reveal from the QA-path run: "Your voltmeter read 11,000 V at each foot, and only 0.003 V between them: the 7 cm of wire between the feet drops almost nothing, even with 200 A flowing. Current needs a voltage difference to push it, so almost none goes through the bird. When you put a wing on the grounded pole, the difference jumped to 11,000 V. Voltage is always between two points. Never approach real power lines: current can jump across air."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 bird-on-the-wire`: fit, crop 0 px (it was 4 px in the first build, fixed by keeping control labels on one line), hiddenBelow 0, namedHidden 0, 84 reveal words, phoneFit true. Screenshot: `artifacts/reveal-fit/bird-on-the-wire.png`. Everything the reveal names (record lines, meter, wing on pole) is visible.

Stage text at most about 23 words. No console errors in the locked frame. Not run: next build, computer-use QA, walkthrough (per the task).
