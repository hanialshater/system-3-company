# Learner review r11: shrinking-degree (screenshot re-review)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

lesson version: v4
Verdict: launch

reviewer: learner-evaluator (borrowed mind), 2026-10-14
boundary: degrees-knower (same tag as r6/r8). Knows latitude and longitude are measured in degrees; does not know a degree of longitude covers less ground away from the equator.
artifact: `WALKTHROUGH_URL=http://localhost:3590 npm run walkthrough -- shrinking-degree` against a release build I started on :3590. transcript.md read first, then sheet.png.

**Screenshots: I looked at the screenshots.** sheet.png (all 6 frames) was read as an image, and I opened 04-step-3.png (60°N) at full size to compare the drawn box with the dashed equator box. This review is written from what the images show. It answers the publish hold (company/ops/publish-holds.json).

path walked: chose 111 km; slider to 2°N; Equator; 60°N; 80°N; reveal.

## Findings (written before reading meta.json)

- **Prediction:** 111 km (a degree is a degree) is exactly what this mind believes; 56 and 28 are half and quarter. Real tension.
- **The narrowing is drawn:** on the globe the 10° × 10° box at 60°N, between Oslo and Helsinki, is visibly a tall tapered shape about half the width of the dashed equator box (about 42 px vs 75 px in the full-size frame), and at 80°N it is a thin sliver. The meridian grid lines converge toward the top of the globe. The readouts carry the numbers: 1° longitude 111.2 → 55.6 → 19.3 km while 1° latitude stays 111 km. Shown, not told.
- **Weak spot (not a blocker): the view moves with the box.** The orthographic globe re-centres as the box goes north, so the dashed equator box ends up near the bottom edge, squashed flat by perspective. A careful learner may wonder whether the equator box "shrank too". The width comparison still holds on screen, and the 1° LATITUDE readout staying at 111 km answers it in numbers, but the picture invites the question.
- **Weak spot:** "lines of longitude all meet at the poles" is the cause; the pole itself is off the top of the globe at 60°N and only near the edge at 80°N, so the meeting point is implied by the converging grid rather than seen.
- Reveal fits; no clipping. 7/7 claims checked.

## After reading the brief

Objective (meridians meet at the poles, so a degree of longitude shrinks with latitude, half at 60°, while a degree of latitude stays about 111 km) is what the stage and readouts show. The misconception "a degree is a fixed distance everywhere" is broken by the 1° LONGITUDE readout next to the unchanged 1° LATITUDE one. No false claim, dead control or reinforced misconception seen in the images or the transcript.
