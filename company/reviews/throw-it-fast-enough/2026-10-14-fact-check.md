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

## Pass 27 (2026-10-14, re-check of pass 26 disputes and rewordings, W-256)

Checker: fact-checker (wrote and built none of these claims). Method: read the pass 26 dispute, then the new Demo.tsx on every reachable branch, including the exact path that failed in pass 26, plus Reset and reduced motion where they exist. Then I re-ran the numbers in my own node scripts (session scratchpad fc27/). No builds. External source hosts were refused (proxy 403 / DNS), so nothing below is verified on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Pass 26 dispute resolved. Ran model.ts fly() in node: fell 17.638 to 17.643 km (17.6) for 7.0 to 7.9 km/s; groundAway 13.858, 16.333, 17.202, 17.423, 17.646 km. 0.79 and 4.0 km/s land at 46 s and 53 s (minute = null). I ran the v6 reveal for every possible fastest landing: 0.79 and 4.0 give 'your 7.9 km/s throw fell 17.6 km'; 7.0 to 7.85 give 'your X and 7.9 km/s throws both fell 17.6 km'. The failing path (Home to 0.79, track click on 7.9) now reads correctly. |

**Result:** 1 verified, 0 disputed, 0 held unverified. W-248 (demo-builder) can close.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Read v7 Demo.tsx and model.ts first. Derivation: for a circular orbit, v²/R = g, so v = √(gR) = √(9.81 × 6.371e6) = 7905.7 m/s, which rounds to 7.9 km/s. The reveal prints kms(V_CIRC_SURFACE) = '7.91 km/s', also about 7.9. Own run of the transpiled model.ts: the 7.9 km/s stop (circular speed at the peak 7899.5 m/s) never lands and comes back round in 85 min. |
| c2 | verified | Own run of the transpiled model.ts FLIGHTS (velocity Verlet, dt 1 s, GM = gR²): landings at 36, 212, 686, 1,269, 2,245 and 3,209 km for 0.79, 4.0, 7.0, 7.6, 7.8 and 7.85 km/s; 7.9 km/s gives lands = false, time 85 min ('never: back round in 85 min'). The slider format shows kms(v) whenever the stage is unlocked, so every throw's speed is visible after the commit. |
| c4 | verified | SVG text: 'No air. 10 km peak.' and 'Heights ×40.' (two lines; the claim joins them). hPx uses EXAG = 40. model.ts: a spherical R_E, central 1/r² gravity, no rotation term and no drag term. There is no stage or reveal text about spin or shape in v7, matching 'no longer told'. |
| c6 | verified | Own run of model.ts: minute.fell = 17.6 km for 7.0, 7.6, 7.8, 7.85 and 7.9 km/s; groundAway = 13.9, 16.3, 17.2, 17.4 and 17.6 km. minute is null for 0.79 and 4.0 km/s (both land before t = 60 s). The reveal branch: near = the fastest landing tried (the 'landed' milestone guarantees one). With near.minute and an equal km1(fell), it says 'your X and 7.9 km/s throws both fell'; otherwise 'your 7.9 km/s throw fell'. Both branches match the claim. |

**Result:** 4 verified, 0 disputed, 0 held unverified.
