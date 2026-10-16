# Build note: electron-speed-in-a-wire

Builder: demo-builder (builder-wavej-pr1, project wave-j), 2026-10-16. Brief: `company/domains/briefs/physics.md` round 4 (Wave J), #61. Status draft → review (QA contract and reveal-fit passed locally); every claim unverified.

Built as briefed: one circuit picture (battery, switch, 2 m of wire to the bulb, return wire) full of faint dots for the free electrons, one tinted electron at the switch, and a ruler of the wire's first 30 cm folded under the circuit. The first 30 cm of the top wire and the ruler share one tint so the ruler reads as that stretch magnified. Every dot shifts by the same distance as the tinted one, which stands for the cause (all electrons start moving together). Presets set the time since switch-on (1 s, 1 min, 1 h); each press tweens the dots and marker for 380 ms; milestones fire on the press.

Departures: title and hook written here ("How fast does one electron go?" / "A lamp lights the moment you flip its switch. So how quick are the electrons?"). The wait presets are disabled until "Switch on" (QA presses in DOM order, so Switch on enables them first). Reveal says "about 10 ns (10 billionths of a second)" so it uses the stage's "~10 ns" rounding. The reveal names the faint dots instead of the brief's "the wire is already full of free electrons" told sentence. The AC-mains sentence is in claim c6 only, not on the stage. Ruler labels cut to 0 and 30 cm for the text budget.

Open item for cm-physics (not fixed): stage text counts 26 words locked and 41 at the 1 h state, counting every number and unit token (labels switch/battery/bulb/2 m, "lit after ~10 ns" or "2 m trip: 7.6 h", marker label, caption, and the brief's four-value Seen row). The budget is 25. The brief's Seen row and labels alone exceed it; which to cut is a teaching call.

## Pre-flight v1

1. **Title and hook.** "How fast does one electron go?" / "A lamp lights the moment you flip its switch. So how quick are the electrons?" The hook states the instant-light premise that drives the misconception; it names no speed or time.
2. **Options.** "Under a millionth of a second", "About one second", "Several hours": none uses a digit, all at the same vague precision.
3. **Locked stage.** Circuit with the switch open, dark bulb, faint dots, tinted electron at the switch, "2 m" dimension, ruler 0 to 30 cm with the marker at 0, caption. No time, speed or distance moved.
4. **Reveal values.** "10 ns": milestone switch-on (Seen "lit: ~10 ns"). "4.4 mm": milestone one-minute (Seen "1 min: 4.4 mm"). "26 cm": milestone one-hour (Seen "1 h: 26 cm"). "7.6 h": milestone one-hour (Seen "trip: 7.6 h", label "2 m trip: 7.6 h"). "0.07 mm a second": constant V_DRIFT (claim c3), the rate, not a state. "2 m": the question's route, constant.
5. **QA path.** DOM order: Switch on (switch-on), Wait 1 s (no milestone, marker "+0.07 mm"), Wait 1 min (one-minute), Wait 1 h (one-hour, the question's case). Four presses reach all three milestones. At the reveal the 1 h state ("2 m trip: 7.6 h", marker "+26 cm") and the Seen row "lit: ~10 ns · 1 min: 4.4 mm · 1 h: 26 cm · trip: 7.6 h" are on the stage.
6. **Reset.** No Reset control; the Seen row is never cleared and every preset can be revisited. Reveal on the QA path: "Your bulb lit about 10 ns (10 billionths of a second) after the switch. Your tinted electron crept only 4.4 mm in a minute and 26 cm in an hour: the 2 m trip takes 7.6 h. The faint dots are the wire's free electrons, there all along. Closing the switch pushed on all of them at once, so the ones in the bulb moved straight away. Each only drifts, about 0.07 mm a second."
7. **Phone fit.** `tools/reveal-fit.mjs` (committed copy, clean stamp, tool commit 79c22aa, HEAD a926418) at 390×844 against a production build (`NEXT_DIST_DIR=.next-wj`, port 3821), 2026-10-16: verdict fit, crop 0 px, hiddenBelow 0, namedHidden 0 (named: switch, bulb, 10), phoneFit true, picScale 1, 81 reveal words including the verdict line (about 76 in the body). Output `artifacts/reveal-fit/wj-pr1-physics.json` (gitignored). Builder probe: stage top 174 px, reveal bottom 712 of 844, smallest SVG label 10.5 px, every press changed the stage, no console errors.

## QA

Computer-use QA, unmodified `tests/qa/contract.spec.ts`, `QA_BASE_URL=http://localhost:3821 QA_ONLY=electron-speed-in-a-wire,second-speaker-decibels,what-pushes-the-car`, production build of the worktree at a926418 plus the final label edits (committed with this note), 2026-10-16: phone and desktop passed (6/6, default timeouts). This is the builder's local pass, not the qa-tester's record.

## v2 (2026-10-16, demo-builder, lane 2 r3 B3, W-1256 / W-1185)

Inputs: FC pass 55 (`2026-10-16-fact-check.md`, findings 1-3), cm-physics rulings R1, R3, R5 (`company/ops/dispatch-requests/2026-10-16-r3-physics.md`), the stage-word decision and its Ruling 2 (`company/decisions/2026-10-16-stage-word-budget-counting.md`: spaced units after a number count 0).

- **FC 55 finding 1 (c5 scope) / R3: done.** c6's idealisations now include "The bulb's filament is drawn as the same wire." Claim text only; nothing on the stage changed. c6 reset to `unverified`. c5's text is unchanged.
- **FC 55 finding 2 (sources) / R5: done.** OpenStax University Physics (bundle commit 2300d5b) added to the `source` field: vol 2 m58730 on c1, c2, c4, c6; m58730 and vol 2 m58454 on c5 (the modules FC 55's note quotes for each claim). c3's note quotes no module (own derivation), so its source is unchanged. Source-only change: c1, c2, c4, c5 keep `verified`.
- **FC 55 finding 3:** nothing to do (no unrecorded claims).
- **R1 cuts E1-E3: not applied, not needed.** See the count below.

### Stage word budget

Counted from the rendered stage (production build, port 3463, 390x844, every text node inside `data-testid="stage"` that is visible and not aria-hidden), at every frame of the QA path plus revisits and the open reveal. Rule: a token with a letter is 1; numerals 0; a unit symbol directly after a number is 0, spaced or not (Ruling 2 (a)).

| Frame | Counted words | Total |
|---|---|---|
| locked / open | battery, switch, bulb (3); caption "in copper wire. Tinted dot: one electron." (8; "1 A", "1 mm²" are 0); "Seen:", "lit:", "trip:" (3; "1 min:", "1 h:" are a number and its unit); "Switch on" (2), "Wait" x3 (3) | 18 |
| **after Switch on (busiest)** | as above, "Switched on" (2), plus marker "lit after ~10 ns" (2) | **20** |
| Wait 1 h | as above, marker "2 m trip: 7.6 h" ("trip:" 1) | 19 |
| Wait 1 s / 1 min, reveal | ruler label "+0.07 mm" / "+4.4 mm" are 0 | 18 |

Busiest frame 20 words, under 25. Nothing on this stage is manipulated stimulus. If "A" in "1 A" were read as a word it would be 21. cm-physics' R1 estimate (about 33) counted spaced units at 1; Ruling 2 now counts them 0, so no R1 cut is needed and none was made. The Seen row and caption are unchanged.

### Checks (2026-10-16, worktree s3c-phys3, branch wj-phys-r3b3)

- Production build `NEXT_DIST_DIR=.next-phys3 npm run build`: passed (tsconfig.json change reverted).
- `tools/reveal-fit.mjs --width 390 --height 844 --strict` (clean stamp, tool commit 79c22aa, HEAD 6838dba plus this change uncommitted): verdict fit, crop 0, hiddenBelow 0, namedHidden 0, phoneFit true, thumb false, 81 reveal words. The reveal text did not change in v2.
- Local contract QA (`tests/qa/contract.spec.ts`, QA_ONLY three slugs, `--workers=2`, against port 3463): phone and desktop passed.
- Status stays `review`. c6 is now unverified, so the lesson is gate-blocked until the fact-checker re-checks c6 (expected).
