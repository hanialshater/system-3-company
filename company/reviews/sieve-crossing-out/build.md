# Build note: sieve-crossing-out (demo-builder, 2026-10-13)

- Intent: 1 to 100 on a 10 x 10 grid. Buttons 2, 3, 5, 7 and 11 each cross out that prime's multiples (2p, 3p ...); the sweeping prime turns green, the last sweep's multiples are ringed, and the caption says how many were newly crossed out. 11 is there to be found idle.
- Key state (two milestones): 2, 3, 5 and 7 swept (25 left), then 11 swept with nothing new. QA path: the five prime buttons in order, then Start over (the reveal reads its own flags, not the reset grid).
- Numbers: survivors are counted from the same struck set the grid draws; FINAL_LEFT (25) is computed, not typed. Readout "?" while locked; 1 is drawn dashed as neither prime nor crossed.
- After screenshots: the title "Four sweeps find every prime" and its hook gave away the answer; now "Which primes do the sieving?" with a hook on the misconception. A separate phone screenshot of the swept grid (25 left, 11's multiples ringed) reads clearly.
- All numbers recomputed with node; all claims unverified, for the fact-checker. The Eratosthenes attribution (c4) cites Nicomachus; the lesson does not date it.
