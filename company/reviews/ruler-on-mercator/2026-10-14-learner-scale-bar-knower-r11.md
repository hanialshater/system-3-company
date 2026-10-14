# Learner review r11: ruler-on-mercator (screenshot re-review)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

lesson version: v3
Verdict: launch

reviewer: learner-evaluator (borrowed mind), 2026-10-14
boundary: scale-bar-knower (the lesson's own; same as r6/r8/r9). Knows that maps have scale bars; does not know that on a world map a scale bar is true only along one line.
artifact: `WALKTHROUGH_URL=http://localhost:3590 npm run walkthrough -- ruler-on-mercator` against a release build I started on :3590. transcript.md read first, then sheet.png.

**Screenshots: I looked at the screenshots.** sheet.png (all 6 frames) was read as an image. Because the reveal says the green bar "was twice as long", I measured the bars in the screenshots: at 60°N (05-step-4.png) yellow spans about 129 px and green dashed about 261 px (2.0×); at 30°N (04-step-3.png) green is about 153 px against 129 (about 1.19×, readout 1.15×). The picture matches the words. This review is written from what the images show. It answers the publish hold (company/ops/publish-holds.json).

path walked: chose 1,000 km; slider to 2°N; Equator; 30°N; 60°N; reveal.

## Findings (written before reading meta.json)

- **Prediction:** a scale-bar knower expects 2,000 km (a bar is a bar); 4,000 km is the "stretched map covers more" confusion; 1,000 km needs the right idea. Good tension. The stage before commit shows only the equator case (2,000 km, stretch 1.00×), so nothing is given away.
- **The idea is drawn:** the yellow "same bar" keeps its screen length while the green dashed "true 2,000 km here" bar grows: same at the equator, a little longer at 30°N, twice as long at 60°N (measured above). The readouts move with it (1,732 km / 1.15×; 1,000 km / 2.00×). Shown, not told.
- **Weak spot (not a blocker):** "one scale bar is true along only one line" is the general claim; the stage shows three latitudes and leaves "only one line" (the equator, here) to the reveal. For this boundary it follows from the three cases, but it is said, not seen.
- **Weak spot:** the 30°N value (1,732 km) is never connected to anything; it is a pass-through. Fine.
- **Layout:** in the reveal the controls collapse into "Show controls ▼", and the bars and readouts stay visible. No clipping in any frame. The trust link reads "5/6 claims checked"; after reading meta, the sixth is withdrawn, not unchecked.

## After reading the brief

Objective (same on-screen length covers less ground away from the equator, half at 60°; one scale bar true along one line) is what the stage shows, with the general rule told. The misconception "a scale bar measures the same everywhere" is broken by the green bar doubling. No false claim, dead control or reinforced misconception seen in the images or the transcript.
