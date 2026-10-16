# Build note: second-speaker-decibels

Builder: demo-builder (builder-wavej-pr1, project wave-j), 2026-10-16. Brief: `company/domains/briefs/physics.md` round 4 (Wave J), #62. Status draft → review (QA contract and reveal-fit passed locally); every claim unverified.

Built as briefed: ten speaker slots (dashed when empty), the listener with a dB meter, and a sound-power bar in µW/m² from 0 to 10, which is the cause: it grows in proportion to the number of speakers while the meter barely moves. Starts with one speaker (1 µW/m², 60 dB), a state no preset produces. Presets 2, 4, 10 speakers; the bar tweens for 380 ms and the meter reads 60 + 10 log10 of the tweened power, rounded to whole dB; milestones fire on the press.

Departures: title and hook written here ("Two speakers, how many decibels?" / "One speaker reads 60 dB. Add an identical second one. What does the meter say?"). Bar scale labelled only 0 and 10 (ticks every 2) for the text budget. Claim c4 notes that "a million times their power" means one speaker's power (500,000 times two speakers'); cm-physics may prefer "a million times one speaker's power".

Open item for cm-physics (not fixed): stage text counts 24 words at the start and 30 at 10 speakers, counting every number and unit token (labels you/meter, meter value, bar title, bar value, scale, caption, Seen row). The budget is 25.

## Pre-flight v1

1. **Title and hook.** "Two speakers, how many decibels?" / "One speaker reads 60 dB. Add an identical second one. What does the meter say?" Neither states or hints at a sum.
2. **Options.** "63 dB", "90 dB", "120 dB": all numbered, same precision.
3. **Locked stage.** One speaker, nine dashed slots, listener, meter "60 dB", bar at "1 µW/m²" on a 0 to 10 scale, caption, empty Seen row. Nothing reads 63.
4. **Reveal values.** "60": the starting state (claim c1), still the reference. "63 dB": milestone two (Seen "power ×2: 63 dB"). "66 dB": milestone four (Seen "×4: 66 dB"). "70 dB": milestone ten (Seen "×10: 70 dB"). "10 dB", "3 dB", "120 dB", "a million": told rule and arithmetic (claims c3, c4), not states.
5. **QA path.** DOM order: 2 speakers (two, the question's case), 4 speakers (four), 10 speakers (ten). Three presses reach all three. At the reveal the 10-speaker state (bar 10 µW/m², meter 70 dB) and the Seen row "power ×2: 63 dB · ×4: 66 dB · ×10: 70 dB" are on the stage.
6. **Reset.** No Reset control; the Seen row is never cleared. Reveal on the QA path: "Your second speaker doubled the sound power reaching you, and the meter went from 60 to only 63 dB. Four speakers read 66 dB and ten read 70 dB: ten times the power adds just 10 dB. Decibels count multiplications, not amounts: every doubling adds 3 dB and every tenfold adds 10. So 120 dB is not two 60 dB speakers; it is a million times their power."
7. **Phone fit.** `tools/reveal-fit.mjs` (clean stamp, tool commit 79c22aa) at 390×844 on a production build, port 3821, 2026-10-16: verdict fit, crop 0 px, hiddenBelow 0, namedHidden 0 (named: meter, 10), phoneFit true, picScale 1, 71 reveal words including the verdict line. Output `artifacts/reveal-fit/wj-pr1-physics.json` (gitignored). Builder probe: stage top 174 px, reveal bottom 681 of 844, smallest SVG label 10.5 px, every press changed the stage, no console errors.

## QA

Computer-use QA, unmodified `tests/qa/contract.spec.ts`, `QA_ONLY=electron-speed-in-a-wire,second-speaker-decibels,what-pushes-the-car` on a production build at port 3821, 2026-10-16: phone and desktop passed (6/6, default timeouts). Builder's local pass, not the qa-tester's record.
