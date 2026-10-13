# Fact-check: sunk-cost-exit (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; algebra checked numerically in artifacts/scratch/fc-aiecongeo/sunk.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Stop: -S = -$80,000. |
| c2 | verified | Finish: -80,000 - 30,000 + 20,000 = -$90,000; $10,000 worse. |
| c3 | verified | Gap = B - 30,000 for S = 10,000, 80,000, 200,000 alike (-$10,000 each at B = 20,000). |
| c4 | verified | Gap > 0 iff B > 30,000 (B = 30,000 ties; B = 35,000 gives +$5,000). |
| c5 | verified | Chip and reveal label it a simple model with dollars only. The sunk-cost principle (Mankiw, Principles; also standard decision theory) is a definition of what to count, supported here by the cancellation in c3, so I rely on the derivation. |

Stage check: slider ranges are spent $0-150k, benefit $0-60k; the reveal's 'the choice flipped only when finishing brought in more than the $30,000 it costs' matches the model. Unrecorded claims: none.
