# Learner review r11: eratosthenes-shadow (screenshot re-review)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

lesson version: v6
Verdict: launch

reviewer: learner-evaluator (borrowed mind), 2026-10-14
boundary: round-earth-360 (same tag as r6/r9). Knows the Earth is round and a full circle is 360°; does not know how the size of the Earth was first measured, or that a shadow angle and one distance are enough.
artifact: `WALKTHROUGH_URL=http://localhost:3590 npm run walkthrough -- eratosthenes-shadow` against a release build I started on :3590 (nothing was listening there). transcript.md read first, then sheet.png.

**Screenshots: I looked at the screenshots.** sheet.png (all 5 frames) loaded and was read as an image, and I opened 02-step-1.png and 05-reveal.png at full size to check the angle labels and the reveal layout. This review is written from what the images show, not only from the transcript. It answers the publish hold (company/ops/publish-holds.json: earlier verdict written without seeing the screenshots).

path walked: chose 7 times; The story: 7.2°; Modern: 7.11°, 843 km; slider to 7.13°; reveal.

## Findings (written before reading meta.json)

- **Prediction:** 7 (from 7.2) and 360 (from the circle) are the guesses this mind reaches for; 50 needs the 360 ÷ 7.2 step. Real tension.
- **What the images show:** a cross-section circle with 50 tick marks round the rim once 7.2° is set (so "count the arcs" is literally countable), the pole at Alexandria with its shadow angle labelled 7.2°, the same 7.2° labelled at the centre between two dashed radii, and three orange dashed vertical "Sunlight" lines. The readouts "Arcs round the circle 50" and "Circumference 250,000 stadia" sit either side. The layout fits the phone frame; no clipping or overlap in any frame.
- **Where the idea first runs out (same as r9):** the step "shadow angle = centre angle" is the one this boundary lacks. At 7.2° the two angles are thin slivers, and the parallel-sunlight lines are thin dashes; the picture shows the same number twice, and the reveal states the reason (parallel rays). The locked 20° frame shows the geometry more clearly than the 7.2° frames. Told with a visual stand-in, not derived; acceptable for 60 seconds.
- **Weak spot (not a blocker): reveal numbers vs stage numbers.** After the slider move the stage reads 50.5 arcs / 42,564 km at 7.13°, while the reveal text quotes 50.6 / 42,684 km (the preset). The "Seen:" line under the slider records the preset values, so it reconciles, but a reader glancing from text to picture sees two different circumferences.
- **Honest hedges land:** "Syene, in the story", "Nobody knows a stadion's exact length" and "within 7% of the true 40,008 km" (42,684 / 40,008 ≈ 1.067) keep the story from overclaiming.

## After reading the brief

Objective (parallel sunlight → shadow angle = centre angle → circumference = 360/angle × distance) is what the stage shows, with the parallel-rays step told by the reveal and drawn as dashes. The misconception (needs satellites or voyages) is answered by "only a shadow and a distance". No false claim, dead control or reinforced misconception seen in the images or the transcript.
