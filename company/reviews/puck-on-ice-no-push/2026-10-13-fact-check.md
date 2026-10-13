# Fact-check: puck-on-ice-no-push, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c6+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 With no friction and no push, a puck moving at 2 m/s keeps moving at 2... | verified | Zero net force -> constant velocity: 2 m/s for 10 s = 20 m. |
| c2 Kinetic friction slows a sliding puck at a steady rate mu g, so it sto... | verified | Kinetic friction mu m g gives deceleration mu g; stops at t = v/(mu g), distance v^2/(2 mu g). Coulomb model is a standard approximation. |
| c3 On the lanes, high friction (mu = 0.10) stops the puck in 2.0 m; mediu... | verified | v^2/(2 mu g): mu = 0.10 -> 2.04 m ("2.0"); 0.03 -> 6.80 m (stops after 6.8 s, within the 10 s run); 0.01 -> stops only after 20.4 s, so at 10 s: speed 1.02 m/s, position 15.10 m. All as stated. Stage mid-run readings at 1 s for mu = 0.03 and 0.01 also consistent with x = v t - mu g t^2/2. |
| c4 The friction values (0.10, 0.03, 0.01, 0) are illustrative, not measur... | verified | Illustrative values, labelled as such (0.01 is lower than real steel on ice would be only for specialised surfaces; the lesson says illustrative). |
| c5 A force changes motion; without one, motion carries on. Friction is th... | verified | Newton's first law; friction is the everyday force that stops sliding objects. Standard. Statement "a force changes motion" should read net force, but the lesson context (single force) is clear. |

Disputed: none. Withdrawn: none.

Recall (space probe coasts at 15 km/s) correct in the idealisation of no significant forces (far from stars and planets). Deterministic model.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
5 verified, 0 disputed, 0 added unverified.
