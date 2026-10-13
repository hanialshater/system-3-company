# Build note: clock-after-a-hundred (demo-builder, 2026-10-13)

- Intent: one 12-hour clock starting at 9. A row of twelve step chips adds time in the order 100 = 8 × 12 + 4: eight "+12" chips (the hand spins one full lap and lands on 9 again; a lap dot fills) then four "+1" chips (10, 11, 12, 1). Only the next chip is enabled, so the in-order QA path reaches 96 h and then 100 h.
- Key states (two milestones): eight laps done with the hand still on 9, and all 100 hours added (hand on 1). All numbers derive from START, TOTAL and LAP.
- Why chips, not a "+12" button pressed eight times: QA presses each control once, and the question's 100 hours must be on the QA path.
- Caption: before the first step it defines "+12 is one full lap"; after laps "96 hours = 8 full laps. The hand is back on 9."; after hours "96 + 4 = 100 hours. The hand is 4 past 9: 1 o'clock."
- Reveal names the 4 o'clock error (leftover read as the time). Title avoids the answer.
- After screenshots: the clock reads clearly on the phone; the spin is a 0.35 s transition and settles within QA's wait.
- All claims unverified, for the fact-checker.
