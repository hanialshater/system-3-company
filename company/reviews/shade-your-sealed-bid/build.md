# Build note: shade-your-sealed-bid (ncm-e01, 2026-10-14)

Built from brief #10 in company/domains/briefs/economics.markets.md (Course: NCM, accepted version). No spec or wireframe existed.

- Stage: expected-profit chart over bids $0-$80. Each bid tried leaves a dot; the full curve (dashed) appears only after the learner reaches the best bid, $40. Preset bids $80/$60/$50/$40 (the current one is active and disabled) and a $1-step slider. Readouts: win chance, keep if you win, expected. Milestone `best-bid` (bid exactly $40); QA reaches it via the $40 preset.
- Re-ran in node: (80 - b) * min(b,50)/50 maximised at $40 ($32); $30 at $50, $20 at $60, $0 at $80. Seeded Monte Carlo of the rival's bid gives 31.98 at $40.
- Added beyond the brief, as claim c3: from $80 down to $50 you still win every time, which explains why shaving starts out free. Bids above $80 are not offered.
- Not run (per instruction): next build, tsc, QA, walkthrough. Types checked by eye only. All claims unverified.
