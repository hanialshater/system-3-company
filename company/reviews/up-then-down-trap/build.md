# Build note: up-then-down-trap

builder: demo-builder · 2026-10-12

- Intent: no slider; tiles +50%, −50%, +100%, −33⅓% build a bar path from $100. Task: land on exactly $100.
- Brief's task is impossible with ±50% tiles alone (1.5^a × 0.5^b = 1 only at a = b = 0), so I added +100% and −33⅓% tiles: these are the payoff.
- Reveal gated on two events (minInteractions 2): a path containing +50% and −50%, and returning to exactly $100 after 2+ moves.
- After screenshots: hint now says 'start over' so a learner stuck at $75 knows to reset.
