# Build note: stop-when-it-looks-significant (demo-builder, 2026-10-13; sonnet build, EXP-003)
- Retitled "Test a fair coin after every flip". Hook says the 5% test flags 1 in 20 and asks whether checking changes it, without the 29%.
- Stage: 20 z-score lines vs a +-1.96 band, red dot at the first crossing in "every flip" mode. Controls: Look every flip, Look only at the end, Count all 100 coins. Gate: milestones every, end, hundred. The reveal's 100-coin counts (23 and 5) are the same walks() the stage counts; exact 28.5% / 5.7% from the DP in model.ts.
- Seeds untuned (6000 + i). Over 300 seed sets: peeking 28.3 (15-40), end-only 5.8 (0-13). The 20 shown lines flag 6 and 0, so the 20-line readout is not close to the rates; the 100-coin count is, and the reveal says another set would differ.
- Brief gave end-only as 0.057 "about 6": confirmed 0.0569 (|S| >= 20 at n = 100).
- Armitage et al. (1969) cited as to-be-checked in claim 5.
