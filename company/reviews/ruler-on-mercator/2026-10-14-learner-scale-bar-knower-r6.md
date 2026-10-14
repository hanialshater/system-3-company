*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: ruler-on-mercator (r6)
lesson version: v1
boundary: the lesson's own. Knows that maps have scale bars; has never seen that on a world map a scale bar is true only along one line.
Screenshots seen: yes (artifacts/walkthroughs/ruler-on-mercator/sheet.png, 6 frames, recorded 2026-10-14 against build 3 on localhost:3470; walk chose option 1 "1,000 km")

## 1. From the artifact (written before reading any earlier review)

- **No answer before the commit: pass.** Title "A ruler on a world map" and hook "Maps come with a scale bar. Slide one north on a world map and measure again." are neutral. Options "1,000 km / 2,000 km / 4,000 km" are all numbered at the same precision. Locked stage: yellow bar at the equator, YELLOW BAR ON THE GROUND 2,000 km, MAP STRETCH 1.00×, green "true 2,000 km" equal to yellow. A "60°N" button is visible but carries no value. Nothing matches 1,000.
- **Prediction felt like:** a real guess, and for my boundary the natural pick is 2,000 km ("a scale bar is a scale bar"). Someone who half-remembers "maps stretch near the poles" might pick 4,000 (stretched = more ground), which is a good trap.
- **Explore:** slider and buttons give 1,999 km at 2°N, 1,732 km / 1.15× at 30°N, 1,000 km / 2.00× at 60°N. "Show me why" stayed "Try it first" until 60°N, so the question's own case is the milestone. The yellow bar keeps its screen length while the green dashed "true 2,000 km" grows to twice as long. That pair is the idea, shown.
- **Where understanding first broke:** for a moment at 60°N, deciding which bar is "wrong": green is longer, and the small pale caption ("Green: a true 2,000 km here") is what settles it. "MAP STRETCH" is guessable. "Mercator" is only a label.
- **The reveal quotes what you saw: one failure.** "1,000 km" and "stretched twice as much" match the readouts that are still on the stage at reveal time (1,000 km, 2.00×), at the stage's rounding. "The green bar showed ... twice as long" refers to the bar pair. In the reveal frame the map is scrolled so the 60°N bars are cut off at the top, but they are on the stage. Failure: "about 2.9 at 70°" is a MAP STRETCH value this stage would compute, but I never reached 70° and no milestone requires it. It is a stage number I did not see. "1 / cos(latitude)" is a told formula.
- **Show the why you promised: soft.** "It is the same north–south as east–west, which is why shapes look right while sizes do not": the stage has only a horizontal bar, so nothing stands for the north–south half. That is outside the brief's stated gap (scale true only along one line), so it is told context rather than a broken promise.
- **Did the reveal answer my question?** Yes: "A single scale bar on a world map is only true along one line" is the question the yellow/green pair raised.

## 2. After reading the earlier review (2026-10-13-learner-adult-beginner.md)

- Different boundary (adult map user); its launch verdict was written without the launch reviewer seeing the screenshots.
- It listed "2.9 at 70°" as told and minor. Under "The reveal quotes what you saw" a stage-type value the learner never reached is a finding. Otherwise I agree with it: odd locked crop with a tiny bar, small pale legend, north–south told.

## Findings (problems, not fixes)

1. The reveal names "about 2.9 at 70°", a stretch value the learner never saw on the stage and no milestone gates.
2. The yellow/green legend is small and pale; at 60°N it takes a moment to see which bar is the truth.
3. The locked map is a tight crop with the bar tiny at the bottom; in the reveal frame the 60°N bars sit above the visible part of the stage.

Verdict: revise (finding 1 is the only rule failure and it is narrow; the core idea is shown and both quoted numbers are visible at reveal; no fatal flaw seen)
