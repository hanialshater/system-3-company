# Build note: one-circle-fewer-introductions (demo-builder, wave-i-probability, 2026-10-14)

Brief: `company/domains/briefs/probability.chance.md` Round 3 item 2. Status draft, version 1. Claims c1-c5 unverified.

- Stage: five friend circles each labelled "10%" (never change), a strip of 20 weeks with the circle's meeting weeks filled and "then 0.1/q each", one bar "Chance you are introduced this week" = q(1 - (1 - 0.1/q)^5). After the first chip press a dashed tick marks "41%: 5 separate circles"; every share visited leaves a labelled mark on the bar, so the reveal's 34% and 10% stay on stage.
- Departure from the brief: the slider is four preset chips (Meets 100% / 50% / 25% / 10%; the current chip is active and disabled). A slider gets two arrow presses on the QA path and could not reach 10%; chips reach both milestones and every chip visibly changes the stage. If interaction-designer prefers the slider, a step button would be needed.
- Milestones: "half" (50%) and "tenth" (10%).
- Node checks: 0.40951, 0.33616, 0.23056, 0.1; mulberry32(7), 10,000 weeks at q = 0.5: 34.0%.

## Pre-flight v1
1. **Title and hook.** "Five friends, one circle" / "Mutual friends could introduce you. Does it matter if they all know each other?" A yes/no question; no direction stated.
2. **Options.** "Separate circles give better odds" / "The same either way" / "One circle gives better odds": same form, none numbered.
3. **Locked stage.** Five "10%" circles (stated in the question), "Weeks the circle meets: 20 of 20 · then 10% each" with all weeks filled, an empty bar with 0% and 100% ends, chips disabled. No bar fill, no value, no 41% tick.
4. **Reveal values.** "41%" and "59%": told arithmetic (claim c1); 41% is also on stage as the separate-circles tick, drawn after the first chip press. "34%": (b) milestone half, left as a mark on the bar. "10% of weeks to 10%": (b) milestone tenth, the bar itself at the end of the QA path. "each friend alone stayed at 10%": the five fixed circles.
5. **QA path.** Meets 100% is disabled (current), Meets 50% (milestone half), Meets 25%, Meets 10% (milestone tenth): both milestones in 3 presses. At the reveal the bar shows 10% with marks 34% and 23% and the 41% tick.
6. **Reset.** No reset control (chips set the state directly; marks are a trace and are never cleared). Reveal on the QA run: "Friends in five separate circles give you 41%: you miss only if all five fail, and 0.9 to the fifth is 59%. In one circle that meets half the weeks, the bar fell to 34%, and at 10% of weeks to 10%, though each friend alone stayed at 10%. Their chances rise and fall together: in the weeks the circle stays home, all five fail at once. Friends who share a circle are not independent tries, so counting them separately overstates your odds."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 one-circle-fewer-introductions` (dev server, 2026-10-14): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, 86 words with the verdict (83 reveal, constant across branches). Stage 277 px (picture 149, controls 78, text 18), reveal 253 px, window 618 px. Screenshot `artifacts/reveal-fit/one-circle-fewer-introductions.png`.

Not run: next build, QA, walkthrough (per task). tsc and check pass.
