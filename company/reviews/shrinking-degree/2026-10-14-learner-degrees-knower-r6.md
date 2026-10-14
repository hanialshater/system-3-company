*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: shrinking-degree (r6)
lesson version: v1
boundary: the lesson's own. Knows that latitude and longitude are measured in degrees; has never seen that a degree of longitude covers less ground away from the equator.
Screenshots seen: yes (artifacts/walkthroughs/shrinking-degree/sheet.png, 6 frames, recorded 2026-10-14 against build 3 on localhost:3470; walk chose option 1 "111 km", ended at 80°N)

## 1. From the artifact (written before reading any earlier review)

- **No answer before the commit: fails on the hook.** Options "111 km / 56 km / 28 km" are all numbered at the same precision. The locked stage shows the box at the equator, 1° OF LONGITUDE HERE 111.2 km and 1° OF LATITUDE 111 km. Nothing drawn matches 56. But the hook "A degree of longitude *sounds like* a fixed distance. Carry one north and measure it." tells me the fixed-distance answer (111 km) is the wrong one before I commit. For my boundary, 111 km is the honest guess, and the hook takes it away. That leaves a coin-flip between halving (56) and quartering (28), which is a guess about the size of the shrink, not about whether it shrinks.
- **Prediction felt like:** with the hook read, a trick question: "not 111, so which smaller one?"
- **Explore:** the slider and buttons move the yellow box north. At 60°N it sits between the Oslo and Helsinki labels and visibly narrows against the dashed equator box; the readout goes 111.2 → 55.6 km while 1° OF LATITUDE stays 111 km. At 80°N it is a thin sliver, 19.3 km. "Show me why" unlocked at 60°N, the question's own case. Converging grid lines are drawn on the globe.
- **Where understanding first broke:** the box is 10° by 10° but the readouts speak of 1°, so I have to scale in my head. "Orthographic projection (a globe)" is jargon; the parenthesis saves it.
- **The reveal quotes what you saw: fails.**
  1. "At 60°N one degree of longitude is 55.6 km": when the reveal opens (frame 06) the stage shows 80°N and 19.3 km. 55.6 km is not visible (no trace or row keeps it). It is milestone-recorded (it did not drift to 19.3), but it is gone from the stage.
  2. "About 19 km at 80°N": the stage shows 19.3 km. "About 19" is not the stage's rounding.
  3. "Zero at the pole" is a state the slider cannot reach (it stops at 80°N); told.
  "You watched the box narrow as it went north" is true of what I did. In the reveal frame the map is scrolled and the box is off the visible part of the stage.
- **Show the why you promised: soft.** "Lines of longitude all meet at the poles" is the cause. The converging grid lines on the globe stand for it, but nothing on the stage points at them; the reveal tells it.
- **Did the reveal answer my question?** Mostly: "the gap between them shrinks with latitude" answers "why narrower?", and the fixed 111 km latitude tile answers "is it all degrees?".

## 2. After reading the earlier review (2026-10-13-learner-adult-beginner.md)

- Different boundary (adult map user, no definition of latitude/longitude); its launch verdict was written without the launch reviewer seeing the screenshots.
- It said the hook "signals 'not fixed' without a number" and moved on. Under "No answer before the commit" a phrase that rules out the trap option is a pointer. It said 55.6 and 19.3 "are on the stage"; true during explore, not both at reveal time, and the reveal says "about 19", not 19.3.
- Agreement: 10° box vs 1° readout, pole and cosine told, projection jargon.

## Findings (problems, not fixes)

1. The hook "sounds like a fixed distance" rules out 111 km before the commit.
2. The reveal's 55.6 km at 60°N is not on the stage when the reveal opens (stage at 80°N, 19.3 km).
3. The reveal's "about 19 km" does not use the stage's rounding (19.3 km); "zero at the pole" cannot be reached on the stage.
4. The box is 10° wide but the readouts are per 1°.

Verdict: revise (finding 1 breaks "No answer before the commit"; findings 2–3 break "The reveal quotes what you saw"; no fatal flaw seen)
