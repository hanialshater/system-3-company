*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): early-fatality-count
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows doubling time and that reports lag behind events; does not know that a ratio of two counts, one of them lagged, is pulled far below the true share while cases grow)
Screenshots seen: yes (artifacts/walkthroughs/early-fatality-count/sheet.png, recorded 2026-10-14T18:53)
Verdict: launch (pass)

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "About 1 in 50"; tapped Day 90, Day 135; slid back to day 125; opened reveal.

1. **The prediction is genuine and fair.** The setup says "exactly 2 in 100 die", so "1 in 50" is the trap; the lag and the 5-day doubling are both given, so a learner with my boundary could in principle reason to 1 in 400. That makes it a real test, not a trick.
2. **The chart carries the mechanism.** Green bars (cases) and red dots (deaths, ×50) are the same hump shifted 15 days right, with a "15 days" marker. Seeing the death hump trail the case hump is "the lag" made visible.
3. **The readout journey works:** day 45 annotated "1 in 405", day 90 "1 in 53", day 135 "1 in 50". The ratio climbing to the truth once the outbreak ends is the payoff.
4. **Where I needed one more step: "cases so far" vs "cases 15 days ago".** The reveal's "8 times fewer (three doublings)" gives 50 × 8 = 400, which matches. I followed it, but only because I know 15 ÷ 5 = 3 doublings; the stage does not show it. For my boundary this is fine.
5. I never saw the day-45 readout live: the walkthrough's day 45 shows "?" (locked), and afterwards it is only an annotation on the chart. A learner who starts by sliding back to day 45 would see it live; the panel sends me forward instead. Small.
6. The case curve rises and falls with no reason given (the outbreak just ends). Acceptable in a "made-up outbreak".
7. Reveal fits: 1 in 405, 1 in 50 and day 125 are on stage. Trust link "0/4 claims checked" (fact-checker's lane).

Fixes (optional): have the panel suggest sliding back to day 45 once, so the 1 in 405 is read live.

Verdict reason: the lagged-ratio effect is computed on stage from a model I was told, shown by two shifted humps, and the reveal's arithmetic matches what I can check.

## After reading the brief (meta.json)

- doesNotKnow is delivered. The knows items (doubling, lags) are exactly what finding 4 relies on.
