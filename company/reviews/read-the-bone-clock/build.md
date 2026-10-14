# Build note: read-the-bone-clock
- Intent: the decay curve is not shown before the prediction (it would let a learner read off 17,100); it traces only as far as the learner drags, and a pin with the age drops at each halving line.
- Used NUBASE2020's 5,700 y; noted 5,730 and the Libby 5,568 convention in the claim.
- After screenshots: kept the big "% left" headline above the chart so one glance answers "how much is left"; half-lives readout as the counting aid.

## Revision v2
Fixes from the v1 learner review: hook no longer asks 'eight half-lives?'; the question defines carbon-14 and half-life; the 1/2, 1/4, 1/8 gridlines appear only after the prediction. The reveal quotes three pins, so it now unlocks only once the bone has been aged to 17,100 years (1/8 left): interact() fires on first reaching it, by dragging or with 'Run the clock until 1/8 is left' (auto, 160 ms steps; needed because the QA contract only taps each control once). Reveal wording is unconditional. c1 reworded (unverified). The clipped stat card in the locked view is stage layout in the kit/phone view (W-135); I checked the walkthrough sheet.
