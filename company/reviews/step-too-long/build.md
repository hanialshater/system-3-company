# Build note: step-too-long

- Intent: one bowl f(x) = x² with the ball's trail of positions and dashed jumps. Step-size buttons 0.1, 0.4, 0.5, 1.0, 1.1 (each restarts at x = 1; the active one re-enables as a reset once stepped), then Step and "To step 5". Readouts: distance from bottom and per-step factor |1 − 2η|. Caps at 6 steps to stay on the plot.
- Brief asked for a slider; buttons used so the QA path reaches η = 1.1 and then steps (a slider gets only two arrow presses).
- Key state: η > 1 and at least 2 steps (milestone "widening-zigzag"), reached on the QA path by 1.1 → Step → To step 5. Readouts hidden while locked.
- Node check: η = 1.1 → -1.2, 1.44, -1.728, 2.0736, -2.4883; 0.4 → 0.0003 after 5; 0.5 → 0 in one step; 1.0 → ±1. Option "About 2.5" computed from path().
