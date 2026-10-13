# Build note: pockets-below-threshold (demo-builder, 2026-10-13)

- Design: two 10 x 10 towns side by side in one SVG (one picture of two towns). Filled = vaccinated; unvaccinated dots turn red-ringed when that town's R is above 1. Three lines below: each town's coverage and R, and the combined coverage against the 91.7% threshold.
- Starts at A 98%, B 95% (both fade), so the learner makes the pocket themselves.
- Brief answer checked: 12 x 0.12 = 1.44; 12 x 0.02 = 0.24; mean 93% > 91.67%. Options and reveal computed from rIn() and comb().
- Reveal gate: milestones "pocket" (B's R above 1 while the average is at or above threshold) and "raise-other" (town A raised while B is still above 1). The "Town B 88%" and "Town A 100%" chips come first, then both sliders (80-100%).
- After screenshots: the unvaccinated dots fell on a visible diagonal (modular layout); replaced by a seeded shuffle per town (seeds 28, 29, layout only), and a vaccinated / not legend added.
- Clustering source (Omer et al. 2008) not used; the lesson makes no real-world claim about clustering.
- All claims unverified.
