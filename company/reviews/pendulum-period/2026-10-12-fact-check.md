# Fact-check: pendulum-period

date: 2026-10-12 · reviewer: fact-checker · inputs: meta.json claims, `artifacts/walkthroughs/pendulum-period/transcript.md`, Demo.tsx (read only to list visible sentences)
working: `artifacts/scratch/fc-pendulum.mjs` (independent RK4 at 1/6000 s, AGM exact period, series)

## Claim verdicts

| Claim | Verdict | Working |
|---|---|---|
| c1 ideal pendulum period independent of mass | **verified** | Tangential equation m L theta'' = -m g sin(theta): m cancels. Numeric check with m kept in the force law: period 2.02145 s for both 0.1 kg and 2 kg. Idealisation (point mass, light string, no drag) is stated in the claim. |
| c2 T = 2 pi sqrt(L/g) for small swings; 1 m gives about 2.0 s | **verified** | 2 pi sqrt(1/9.81) = 2.00607 s. |
| c3 four times the length doubles the period | **verified** | T proportional to sqrt(L); RK4 at the same 20 degree amplitude: T(1 m)/T(0.25 m) = 1.99999999999 (2.0215 / 1.0107 s). |
| c4 sim integrates full equation from 20 degrees; period about 0.8% longer than small-angle | **verified** | Series 1 + theta0^2/16 + 11 theta0^4/3072 = 1.007669; exact 2K(k)/pi with k = sin(10 deg) = 1.007669 (AGM). 0.77%, which rounds to 0.8%. Demo.tsx does RK4 on theta'' = -(g/L) sin(theta) at 1/600 s and my independent RK4 reproduces its readouts (2.02, 2.67, 2.86 s). The Thornton and Marion section number (4.4) is not confirmed online; the formula is. |
| c5 mass cancels: pulled harder in exact proportion to being harder to speed up | **verified** | Weight m g and inertia m both scale with m; the ratio g is mass-independent. This is the standard equivalence-of-masses explanation. |
| c6 Galileo reported equal-length pendulums swing in step whatever the weight | **verified** (with a wording note) | Two New Sciences, First Day, contains the pendulum-length law and the lead-and-cork pendulum comparison (Museo Galileo, Cambridge BJHS article). Historians debate whether Galileo actually performed it; "reported" is correct, "saw" (reveal) is stronger. |

## Unrecorded claims found (added to meta.json as `unverified`)

- c7: "Gravity pulls 20 times harder on 2 kg than on 100 g, and 2 kg is also 20 times harder to speed up" (reveal; 2/0.1 = 20).
- c8: exact numbers shown: 1 m gives 2.02 s (Yours/Ghost readouts and reveal), 0.25 m about 1 s, 1.75 m 2.67 s, 2.00 m 2.86 s. My script gives 2.0215, 1.0107, 2.6741, 2.8588.
- c9: recall: a swing with an adult twice as heavy still takes about 3 s (a swing with a rider is not a point mass; idealisation recorded in the source field).

Seen and covered: "A 1 m pendulum with a 100 g weight takes about 2 seconds per back-and-forth" (c2; "back-and-forth" = full period), "out of step with the ghost" captions (c3).

## Fixes routed to demo-builder (phrased as problems)

1. The reveal says "Galileo saw the same with lead and cork", but the ledger claim (c6) says "reported"; the ledger is the weaker and safer wording, and some historians doubt the experiment was run as described. The lesson text outruns its claim.
2. The reveal and stage present mass independence as something the learner just observed ("every weight stayed locked to the ghost"). In this simulation mass does not enter the equation at all (Demo.tsx header: the slider only changes bob size), so the locking is true by construction, not a measurement. The reveal does not say that the result is for an ideal pendulum (no air drag, point-like bob); real heavy and light bobs of equal size can differ slightly through drag and buoyancy. A learner can leave thinking the sim demonstrated the physics.
3. "per swing" in the reveal and "back-and-forth" in the predict mean a full period, while in everyday speech a "swing" can be one way (half a period). The 2.02 s figure is only right for the full period.
4. The 2.02 s readout is the exact period at a 20 degree release, while c2 says 2.0 s for small swings; both are right but the lesson never says the release angle, so the 0.8% gap is unexplained to the learner. Minor.
5. Recall: "playground swing ... adult twice as heavy ... about 3 seconds" applies a point-mass model to a rider on a seat; the answer is right under "sits the same way" but a seated adult's centre of mass sits at a different distance, so it is approximate.

Status after this check: c1-c6 verified, none disputed; c7-c9 await an independent checker.
