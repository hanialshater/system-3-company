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

## v2 (2026-10-16, demo-builder, lane 2 r3 B3, W-1256 / W-1185)

Inputs: FC pass 55 (`2026-10-16-fact-check.md`, findings 1-4), cm-physics rulings R1, R2, R5 (`company/ops/dispatch-requests/2026-10-16-r3-physics.md`), the stage-word decision and its Ruling 2.

- **FC 55 finding 1 (c4 wording) / R2: done.** The reveal's last sentence now reads "So 120 dB is not two 60 dB speakers; it is a million times one speaker's power." c4's text quotes the new sentence and says "the sound power of one 60 dB speaker"; its source note no longer explains what "their" meant. c4 reset to `unverified`.
- **FC 55 finding 2 (c1 terms):** no change (not a dispute; no ruling asked for one).
- **FC 55 finding 3 (sources) / R5: done.** OpenStax University Physics (bundle 2300d5b) added to `source`: vol 1 m58377 'Sound Intensity' on c1 and c3; vol 1 m58372 'Interference of Waves' and m58377 on c5. R5's line lists "c1 m58377 and m58372"; I put m58372 on c5, not c1, because FC 55's notes quote m58372 only for c5 (interference) and it does not support c1's definition of the decibel. cm-physics may move it. c2 and c4 quote no module. c1, c3, c5 keep `verified` (source only).
- **FC 55 finding 4:** nothing to do.
- **R1: no cut** (count below).

### Stage word budget

Counted from the rendered stage (production build, port 3463, 390x844, visible non-aria-hidden text inside `data-testid="stage"`), every frame of the QA path, a revisit and the reveal. Ruling 2 (a): a unit after a number is 0; a unit standing alone is 1.

| Item | Words |
|---|---|
| "you", "meter" | 2 |
| meter "60 dB" ... "70 dB"; bar value "1 µW/m²"; ticks 0, 10 | 0 |
| bar title "sound power reaching you, µW/m²" (the unit stands alone, so 1) | 5 |
| caption "Identical speakers, same distance, no echoes." | 6 |
| "Seen:", "power" (the "×2: 63 dB" values are 0) | 2 |
| controls "2 speakers", "4 speakers", "10 speakers" | 3 |
| **Total, every frame** | **18** |

Under 25; no stimulus on this stage. The caption is unchanged.

### Checks (2026-10-16)

- Production build passed; reveal-fit 390x844 strict (clean stamp, tool 79c22aa): verdict fit, crop 0, hiddenBelow 0, namedHidden 0, phoneFit true, thumb false, 72 reveal words including the verdict line (v1: 71 by the same tool; R2 replaces "their" with "one speaker's", +1 word, not the +2 R2 estimated).
- `grep -c "a million times one speaker's power" src/demos/physics/second-speaker-decibels/Demo.tsx` = 1.
- Local contract QA, phone and desktop: passed.
- Status stays `review`; with c4 unverified the lesson is gate-blocked until the fact-checker re-checks c4 (expected).
