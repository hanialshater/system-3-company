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

## Revision v4 (wave E r6, 2026-10-14)

r6 (adult beginner, revise; also named in decision 2026-10-14-reveal-quotes-what-you-saw as "reached but not seen"): the QA sweep passed 7.85 km/s in one step, so the learner never saw a throw land, yet the reveal said "your 7.85 km/s throw". Fixes inside my scope:
- Step buttons around the slider, in DOM order Slower, slider, Faster (fixed labels; each disabled at its end stop). From the 7.8 start, pressing each once visits 7.6 (lands), then 7.8 and 7.85 (land, two arrow presses), then 7.9 (the loop). The learner moves to three landing throws before the orbit, and each lands on screen for one QA wait.
- A line under the Lands readout keeps the fastest landing the learner moved to: "Your fastest landing, 7.85 km/s: 3,209 km away; ground curved away 17.4 km in 1 min." (The speed shows only after the loop, as the slider does.) The reveal points at it. Its 17.4 is the same value it quotes against the loop's 17.6.
- Tangent line, one-minute drop and model chip drawn larger (chip 9 -> 11 px, line 1 -> 1.5, drop 2.5 -> 3.5).
- Not changed, for the learning designer (decision 2026-10-14-reveal-quotes-what-you-saw, Board section): the slider's top stop is still the answer, and 79 km/s cannot be tested. Stops above 7.9 need a different drawing at heights x40.
- No claim text changed. Not run: build, QA, walkthrough, tsc.

## Pre-flight v4

1. Title and hook: "Throw it so fast it never lands" / "Throw a ball hard enough and it misses the whole planet. How hard is hard enough?" They name the event, not the speed. All three options "never land" at some speed, so the title does not choose between them.
2. Options: "About 790 m/s", "About 7.9 km/s", "About 79 km/s". All "About" plus a number.
3. Locked stage: the planet, the peak, the chip "No air. 10 km peak. Heights ×40.", and the slider with speed "?". Lands shows "?". There is no arc, no line and no number. One leak remains: the slider thumb sits one stop from the right end, which hints that the answer is near the top of the range (see the note above).
4. Reveal values: 7.9 km/s and 85 min: (b) milestone loop, read from the loop flight, which is on stage at the reveal. 7.85 km/s, 3,209 km and 17.4 km: (b) the fastest landing the learner moved to (tried, recorded when moved to), shown on the "Your fastest landing" line. 17.6 km fell: (b) the loop flight's caption on stage. √(gR) = 7.91 km/s: told, claimed (c1, "about 7.9").
5. QA path: Slower (7.6, landed), slider ArrowRight x2 (7.8, 7.85), Faster (7.9, loop). Both milestones reached, and the question's own case (the slowest throw that never lands) is the loop. At the reveal the orbit, its caption, the ghost arcs and the fastest-landing line are all on stage.
6. Reset: there is no Reset. tried only grows. Reveal on the QA path: "At 7.9 km/s your ball never landed: the readout showed it back round at the peak after 85 minutes. Your fastest landing, at 7.85 km/s, came down 3,209 km away (the line under the readout). / The ball was falling the whole time: in the first minute your 7.85 km/s and 7.9 km/s throws both fell 17.6 km below the dashed straight line. What changed was the ground. Under your 7.85 km/s throw it curved away 17.4 km; under 7.9 km/s it curved away 17.6 km, as fast as the ball fell. That is an orbit: about √(gR) = 7.91 km/s near the ground. / No air, round non-spinning Earth. The ISS orbits at about 7.7 km/s, 400 km up."

## v5 (2026-10-14): speed on every throw, slider past the answer

Problems (learner r7): the throw speed read "?" on every throw that landed, so "how hard" could not be tied to "how far", and the reveal's "your fastest landing, at 7.85 km/s" named a speed shown only after the orbit; the slider's top stop was exactly 7.9 km/s (the answer), and 79 km/s could not be tried; "1 min" overlapped the "Heights ×40" header; the reveal frame crops the planet (kit phone-scroll fix in progress, not worked around).
Changes: the slider shows the speed of every throw after the commit ("?" only while locked). Two stops past 7.9: 9.0 km/s (an oval orbit that leaves the picture and comes back round after 144 min; first minute fell 17.7 km, ground curved away 22.9 km) and 79 km/s (escapes: "never: escapes", caption "Too fast to stay: it flies off into space."). model.ts gains `escapes` (energy test at the throw; integration stops at 4 R_E). The "loop" milestone fires only at 7.9 km/s, the slowest stop that never lands, so the reveal's 7.9 numbers are always ones the learner saw. Header moved below the planet (viewBox height 262 -> 276). c2 reworded and unverified; c7 new. Version 4 -> 5.
Not run here: next build, QA, walkthrough, tsc (caller's order).

## Pre-flight v5

1. Title and hook: "Throw it so fast it never lands" / "Throw a ball hard enough and it misses the whole planet. How hard is hard enough?" They say such a speed exists; all three options are speeds, so none is singled out.
2. Options: "About 790 m/s", "About 7.9 km/s", "About 79 km/s": all "About" plus a number, a factor of 10 apart.
3. Locked stage: planet, peak, header "No air. 10 km peak. Heights ×40.", slider "Throw speed ?", readout "Lands ?". The slider now runs to 79 km/s, so its end does not mark 7.9.
4. Reveal values: "7.9 km/s … after 85 minutes" (b) loop milestone (7.9 stop only), slider and Lands readout; "fastest landing, at 7.85 km/s, came down 3,209 km away" (b) landed milestone, the fastest-landing line (speed now always shown); "fell 17.6 km below the dashed line" (b) the 7.9 caption; "curved away 17.4 km" (b) fastest-landing line; "17.6 km" at 7.9 (b) caption; √(gR) = 7.91 km/s and the ISS line told context (c1, c5).
5. QA path: Slower (7.6, lands 1,269 km) -> slider two arrow presses (7.8, 7.85, lands 3,209 km) -> Faster (7.9, loop). Lands readout, caption and fastest-landing line visible at the reveal.
6. Reset: no Reset; the fastest-landing line keeps the fastest landing moved to. Reveal from that run: "At 7.9 km/s your ball never landed: the readout showed it back round at the peak after 85 minutes. Your fastest landing, at 7.85 km/s, came down 3,209 km away (the line under the readout). The ball was falling the whole time: in the first minute your 7.85 km/s and 7.9 km/s throws both fell 17.6 km below the dashed straight line. What changed was the ground. Under your 7.85 km/s throw it curved away 17.4 km; under 7.9 km/s it curved away 17.6 km, as fast as the ball fell. That is an orbit: about √(gR) = 7.91 km/s near the ground. No air, round non-spinning Earth. The ISS orbits at about 7.7 km/s, 400 km up." If a learner then moves on to 9.0 or 79 km/s, the reveal's 7.9 sentences are still history they saw (the loop milestone is gated on 7.9), and the fastest-landing line is unchanged.

## v6 (2026-10-14): W-248, the reveal names only throws whose fall was shown

Problem (FC pass 26, c6 disputed): the reveal said "your {fastest landing} and 7.9 km/s throws both fell 17.6 km", taking the fall from the 7.9 flight only. A slider jump (7.8 -> 0.79 -> 7.9) made it say "your 0.79 km/s and 7.9 km/s throws both fell 17.6 km", but that throw landed at 46 s and its caption read "Landed within the first minute."
Change: the fastest landing is named in that sentence only when it has a first-minute record (`near.minute`) whose fall rounds to the same km1 value as the loop's. Otherwise the sentence reads "in the first minute your 7.9 km/s throw fell 17.6 km below the dashed straight line." The "Under your … throw it curved away …" clause was already gated on `near.minute`. c6 text updated and set back to unverified. Version 5 -> 6.
Not run: next build, QA, walkthrough (caller's order). Ran tsc and check.

## Pre-flight v6

1. Title and hook unchanged ("Throw it so fast it never lands" / "… How hard is hard enough?"); they name no speed.
2. Options unchanged: "About 790 m/s", "About 7.9 km/s", "About 79 km/s".
3. Locked stage unchanged: planet, peak, header, slider "?", Lands "?". No number.
4. Reveal values: 7.9 km/s, 85 min (b) loop milestone, slider and readout; fastest landing speed and distance (b) the fastest-landing line; "fell 17.6 km" (b) the 7.9 caption, and for the fastest landing only if its own caption showed a 17.6 km fall (7.0-7.85 km/s); "curved away X km" (b) fastest-landing line, only when it has a minute record; √(gR) and ISS told (c1, c5).
5. QA path unchanged: Slower (7.6) -> slider x2 (7.8, 7.85) -> Faster (7.9). Reveal text identical to v5 on that path.
6. Jump path: 7.8 -> Home (0.79, lands 36 km) -> track click 7.9. Reveal: "At 7.9 km/s your ball never landed: the readout showed it back round at the peak after 85 minutes. Your fastest landing, at 0.79 km/s, came down 36 km away (the line under the readout). / The ball was falling the whole time: in the first minute your 7.9 km/s throw fell 17.6 km below the dashed straight line. What changed was the ground. Under 7.9 km/s it curved away 17.6 km, as fast as the ball fell. That is an orbit: about √(gR) = 7.91 km/s near the ground." Same for 4.0 km/s. Every value is one the learner saw on stage.

## Pre-flight v7 (demo-builder, 2026-10-14, wave H batch 7, learner r8 / W-331)

Changes: reveal 124 → 78 words as measured (72 body words + verdict). Cut the muted line "No air, round non-spinning Earth. The ISS orbits at about 7.7 km/s, 400 km up." (c5 withdrawn; cm-physics to confirm the cut; "No air" stays on the stage label). Cut "the readout showed it back round at the peak after", "(the line under the readout)", "What changed was the ground", "near the ground". Picture: viewBox 276 → 260 tall; header "No air. 10 km peak. / Heights ×40." moved to two lines at the top left (clear of the peak and "1 min", which sit at x ≥ 153); svg labels 11 → 13 px so the card's reveal fit can shrink the picture to 200/260 while labels stay at 10 px. c1, c2, c4, c6 reworded, unverified.

1. Title and hook: unchanged.
2. Options: unchanged ("About 790 m/s", "About 7.9 km/s", "About 79 km/s").
3. Locked stage: planet, peak, two-line header, slider "?", Lands "?". No number.
4. Reveal values: 7.9 km/s and 85 min (b) loop milestone, slider and Lands readout; fastest landing speed, distance and "curved away 17.4 km" (b) the fastest-landing line; "fell 17.6 km" (b) the first-minute caption, and for the fastest landing only when its own record has the same fall (v6 condition kept); √(gR) told (c1).
5. QA path unchanged: Slower (7.6) → slider ×2 (7.8, 7.85) → Faster (7.9). At the reveal the dashed line, red 1-min tick, "1 min", first-minute caption, Lands readout and fastest-landing line are on screen.
6. Reset: no reset control (unchanged). QA-path reveal text: "At 7.9 km/s your ball never landed: back round in 85 min. Your fastest landing, 7.85 km/s, came down 3,209 km away. / It kept falling: in the first minute your 7.85 km/s and 7.9 km/s throws both fell 17.6 km below the dashed line. Under 7.85 km/s the ground curved away 17.4 km; under 7.9 km/s, 17.6 km, as fast as the ball fell. That is an orbit: √(gR) ≈ 7.91 km/s."
7. Phone fit (tools/reveal-fit.mjs, localhost:3530 dev server, 2026-10-14): crop 180 px → 0 px; hiddenBelow 0; namedHidden 0; phoneFit true; stage 440 → 389 px; picture fitted 200/260 (labels 13 px × 0.77 = 10 px). Screenshot: artifacts/reveal-fit/throw-it-fast-enough.png (looked at: planet top, peak, dashed line, 1 min tick and the reveal's last line all on screen). The dashed line and tick are small at this scale; W-287 (kit) is still the route for picture size at the reveal. Not run: build, QA, walkthrough.
