# Build note: most-cases-vaccinated (demo-builder, 2026-10-12)

- Design: 1,000 people with expected counts (no chance); the vaccinated fill the grid from the left, so a big, sparsely-red block sits beside a small, densely-red one. Cases stay hidden until the prediction is locked in.
- Reveal gate: the learner must visit 90% and 100% (start 80%, step 10). Added the Orenstein 1985 screening formula as the claim behind the 'compare risk per person' sentence, in place of the CM's 'Brown et al.' citation, which was never verified.
- After screenshots (all): stage SVG capped at 27dvh and the lesson body set to not shrink, because readouts were clipped or text overlapped on the phone; long readout labels shortened so they stay on one line.

## v2 (revision 2026-10-13)

- Hook and title gave the answer ("Half the cases were vaccinated") -> "Vaccinated people on the case list" / "In a mostly vaccinated town, who fills the list of cases?". Option set no longer has a lone matching number: 5%, 25%, 47%, 90%.
- Stage opened at 80% while the question said 90% -> the stage opens at the question's 90% (START, one constant used by stage and reveal). The slider is replaced by chips 0/50/90/100% so the 100% jump no longer skips anything.
- The 0% baseline (500 cases) was never shown -> milestones "nobody" (0%) and "everybody" (100%) gate the reveal; both reached on the QA path in DOM order. The reveal quotes 90% (opening state), 0% and 100% from town().
- The question packed four numbers and a hidden division -> it now says "5%" directly, so the beginner multiplies 900 x 5% and 100 x 50%.
- Claims: new c5 (the numbers quoted), unverified. Existing claims unchanged.
