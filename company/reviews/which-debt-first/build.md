# Build note: which-debt-first

builder: demo-builder · 2026-10-13

- Intent: one graph of interest paid so far, month by month. Two tiles pick which debt gets the $300 first; each tile draws its whole run at once (no animation), and the other order, once run, stays dashed beside it with its total.
- Milestones: both orders run. The tiles are the only controls, so QA's two presses reach both.
- Readouts for each order's total stay "?" until that order is run; nothing is drawn while locked.
- The stage shows totals rounded to dollars ($793, $1,095), so the reveal's difference ($302) is computed from those rounded totals; the exact difference ($301.37) is in claim c3.
- Leftover cash in the month a debt is cleared goes to the other debt (the brief's "then the other"); recorded in c1.
- Changed from the brief: plotted cumulative interest instead of total owed, because the two total-owed lines differ by at most a few hundred dollars on a $5,000 scale and look the same on a phone.
