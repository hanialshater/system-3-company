# Fact-check: throw-it-fast-enough (2026-10-14)

## Pass 22

Checker: fact-checker (did not write these claims). Scope: the claims left unverified after the wave D wording reopen. Method: read Demo.tsx (and model.ts where used) against each sentence, then re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc22-5); sources opened where reachable, otherwise marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Ran model.ts fly() in node (strip-types): at t = 60 s fell = 17.638-17.643 km (km1 -> 17.6) for 7.0-7.9 km/s; groundAway 13.86, 16.33, 17.20, 17.42, 17.65 km -> 13.9, 16.3, 17.2, 17.4, 17.6; 0.79 and 4.0 km/s land at t = 46 s and 53 s (36 and 212 km), so minute = null for them ('Landed within the first minute.'). Cross-check: g(R/(R+P))^2 t^2/2 = 17.60 km. |

**Result:** every claim in this pass verified.

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims open after the wave G revision. Method: read Demo.tsx (and model.ts) for every reachable branch, Reset and reduced motion before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc26-b1/). No build run.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | model.ts fly() in node: 36, 212, 686, 1,269, 2,245, 3,209 km; 7.9 back round at 84.6 min (85). |
| c6 | **disputed** | Numbers hold (fell 17.6 km for 7.0-7.9; groundAway 13.9/16.3/17.2/17.4/17.6). But the reveal says 'your {fastest landing} and 7.9 km/s throws both fell 17.6 km' using the 7.9 flight's fall. A native range slider allows Home / track click: 7.8 -> 0.79 (landed) -> 7.9 (loop) gives 'your 0.79 km/s and 7.9 km/s throws both fell 17.6 km', false (it landed at 46 s). Same for 4.0. Fix: drop near from that sentence when near.minute is null. |
| c7 | verified | fly(9000): back round 143.8 min (144), fell 17.7, groundAway 22.9, apex about 5,429 km; fly(79000): escapes (11.17 km/s escape speed), 'never: escapes'. |

**Result:** 1 claim disputed; publishing blocked until the builder fixes it and a fact-checker re-checks.
