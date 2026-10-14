# Build note: throw-it-fast-enough

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: Newton's mountain on a to-scale Earth. Flights come from model.ts (velocity-Verlet under GM/r^2, dt = 1 s), which the stage draws and the claims quote. Heights exaggerated 40x (stated on stage) so a 10 km peak is visible; distances round the planet are to scale.
- Why a 10 km peak: launched from exactly ground level every sub-orbital throw lands at once, so the brief's "ignore the mountain height" cannot be drawn. Circular speed at 10 km is 7899 m/s, so the answer stays "about 7.9 km/s" (c1).
- Slider stops 0.79, 4, 7, 7.6, 7.8, 7.85, 7.9 km/s; default 7.8 so two arrow presses (QA path) reach the loop. The speed number shows '?' until the loop closes (brief's unusual format).
- Question reworded to "the slowest throw that never lands", because 79 km/s also never lands (it escapes).
- Earned reveal: milestone 'loop'. Reveal quotes the fastest landing throw the learner saw and the loop time (85 min).
- After screenshots: model chip overlapped the orbit line at the bottom; moved to top-left.
- c5 (ISS 7.7 km/s) differs slightly from NASA's rounded "17,500 mph" (7.8 km/s); flagged for the fact-checker.

## Revision v2
Learner review (2026-10-13) findings:
- Never saw a throw land or the landing creep round the planet: earlier landing throws now stay on screen as faint arcs with their landing dots, and the loop milestone (the reveal) counts only after at least two landing throws have been seen. The stage opens on the 7.8 km/s throw, so the QA path (two arrow presses: 7.85, then 7.9) still reaches the loop.
- The reveal's "7.8 km/s ... came down X km" is now a throw the learner has actually seen (the opening state counts).
- Locked picture description no longer says where the ball lands.
- NOT done, and why: (a) the slider's maximum is still the answer: speeds above 7.9 km/s make elliptical orbits with an apogee hundreds of km up, which at x40 height exaggeration runs off the stage; that needs a different drawing (learning-designer call). (b) The zoomed 5 m / 8 km inset for the best idea in the lesson (c3) is still told in the reveal.

## Revision v3 (wave D r5, 2026-10-14)

Gate needs a landing throw the learner moved to, then the loop (the starting landing no longer counts). Cause on stage: a dashed straight sideways line, a red one-minute tick from that line to the ball, and a caption comparing the fall (17.6 km for every throw) with how far the ground curved away (13.9 to 17.6 km). Lap time on the Lands readout. Speed label fixed (7.85 no longer prints as 7.8). The 5 m / 8 km sentence is dropped (c3 removed). Added c6. Still open: the slider's top stop is the answer (stops above 7.9 cannot be drawn at heights x40).
Edited claims are unverified for the fact-checker. Not run here: build, QA, walkthrough, tsc (shared machine); syntax checked only.
