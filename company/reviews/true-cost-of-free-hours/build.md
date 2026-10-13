# Build note: true-cost-of-free-hours

builder: demo-builder · 2026-10-13

- Intent: one stacked bar, $50 fee + hours × $20 given up; a switch sets the alternative to work or nothing paid.
- Milestones (useMilestones): 3 hours with work as the alternative ($110), and the alternative switched to nothing paid. Slider starts at 1 h so QA's two arrow presses land on 3.
- Total and given-up block hidden while locked; numbers recomputed (50 + 3 × 20 = 110).
- After screenshots: the total label sat inside the ghost block in 'nothing paid' mode; moved above the solid bar.
