# Fact-check: moon-hammer-feather, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c7+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Without air, every object falls with the same acceleration whatever it... | verified | m a = m g -> a = g for all m. Standard. |
| c2 Gravity at the Moon's surface is 1.62 m/s^2. | verified | Moon surface gravity 1.62 m/s^2 (NASA Moon fact sheet value; also the standard 1.62). I did not reach the NASA host from this sandbox; the figure is undisputed in every reference I saw. |
| c3 Released from 1.5 m on the Moon with no air, both land 1.36 s later. | verified | sqrt(2*1.5/1.62) = 1.3608 s; Euler integration at 1e-6 s gives 1.3608 s. |
| c4 With air switched on (an imagined Moon with Earth-like air), the feath... | verified | Deterministic model, no seeds. Closed form for quadratic drag, t = acosh(exp(kH))/sqrt(g k): feather (k = 9.81 /m) 3.865 s; hammer (k = 0.5*1.2*0.01/m) 1.3612 s at 5 kg, 1.3622 at 1.5 kg, 1.3649 at 0.5 kg. Independent small-step Euler agrees to 1e-6. So "about 3.9 s" and "about 1.36 s" hold. The feather drag is a labelled illustrative choice (terminal speed 1 m/s in Earth air), so 3.9 s is a property of the assumed feather, not of feathers in general. |
| c5 Air pushes back hard on something light and wide, which is why a feath... | verified | Drag deceleration = rho C_d A v^2/(2m): large for light, wide objects. Standard. |
| c6 On the Moon in 1971, Apollo 15 astronaut David Scott dropped a hammer ... | verified | Apollo 15, 2 August 1971, Commander David Scott, hammer and feather landed together (NSSDC "Apollo 15 Hammer-Feather Drop" page and the Apollo 15 Preliminary Science Report SP-289 as quoted by it; confirmed via search summaries, the NASA hosts themselves were not reachable). The ALSJ URL cited (a15.clsout3) was not opened. |

Disputed: none. Withdrawn: none.

Recall (vacuum chamber: bowling ball and feather land together) correct. Walkthrough never unlocked the reveal; read it from Demo.tsx: all of its factual sentences are c1, c3, c5, c6.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
6 verified, 0 disputed, 0 added unverified.
