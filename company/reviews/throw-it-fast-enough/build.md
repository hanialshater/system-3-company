# Build note: throw-it-fast-enough

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: Newton's mountain on a to-scale Earth. Flights come from model.ts (velocity-Verlet under GM/r^2, dt = 1 s), which the stage draws and the claims quote. Heights exaggerated 40x (stated on stage) so a 10 km peak is visible; distances round the planet are to scale.
- Why a 10 km peak: launched from exactly ground level every sub-orbital throw lands at once, so the brief's "ignore the mountain height" cannot be drawn. Circular speed at 10 km is 7899 m/s, so the answer stays "about 7.9 km/s" (c1).
- Slider stops 0.79, 4, 7, 7.6, 7.8, 7.85, 7.9 km/s; default 7.8 so two arrow presses (QA path) reach the loop. The speed number shows '?' until the loop closes (brief's unusual format).
- Question reworded to "the slowest throw that never lands", because 79 km/s also never lands (it escapes).
- Earned reveal: milestone 'loop'. Reveal quotes the fastest landing throw the learner saw and the loop time (85 min).
- After screenshots: model chip overlapped the orbit line at the bottom; moved to top-left.
- c5 (ISS 7.7 km/s) differs slightly from NASA's rounded "17,500 mph" (7.8 km/s); flagged for the fact-checker.
