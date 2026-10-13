# Fact-check: twice-as-hot-not-twice-as-fast (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c1 | Verified: (3/2)kT per molecule gives v_rms = sqrt(3kT/m), proportional to sqrt(T). |
| c2 | Verified: with m = 28.97 g/mol / N_A, v_rms = 508.2 m/s at 300 K, 718.8 at 600 K, 1,016.5 at 1,200 K (28.96 g/mol gives 508.3, 718.9, 1,016.6). Reveal's 'about 510 to about 720' is the stage's 10 m/s rounding. |
| c3 | Verified: sqrt(2) = 1.414; sqrt(1200/300) = 2, so doubling the speed needs four times the kelvins. |
| c4 | Verified: 300 K = 27 C (26.85), 600 K = 327 C, 1,200 K = 927 C; 27 C to 54 C is 300 K to 327 K, a speed ratio of sqrt(327/300) = 1.044, which is not 'twice as hot' in the sense that matters. |
| c5 | Verified (representation): Demo.tsx scales every on-screen speed by sqrt(T/300); the 30-molecule box is illustrative. The spread of start speeds is a fixed seeded draw, not a claim. |

Recall (200 K to 800 K gives 2x) is correct. Deterministic. No unrecorded claims.
