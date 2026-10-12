# Build note: coin-greedy-trap (demo-builder, 2026-10-12)

- Design intent: three rows on one card (You / Greedy / Fewest), coins 1, 3, 4. The learner builds 6 by tapping coins, then reveals greedy (4+1+1) and the fewest (3+3). Targets 8 (greedy right) and 10 (greedy wrong) stop the takeaway becoming 'greedy is always bad'.
- Reveal gate (minInteractions 2): interact() only when greedy is shown on a target where it loses and when the better answer is seen (by the learner's own coins or 'Fewest possible', which unlocks after greedy).
- Coin buttons are disabled when they would overshoot the target, so the tray never goes past it.
- After screenshots: the 'Target:' label wrapped to a line by itself; the targets now have their own row.
