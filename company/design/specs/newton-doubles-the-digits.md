# Spec: newton-doubles-the-digits

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #70 · wireframe: `newton-doubles-the-digits.svg`

**Format: Storyboard / scrub** (as briefed). The process is a short sequence of updates, and the payoff is a pattern down the sequence: correct digits 1, 1, 3, 6, 12. The stage is a **ladder**, one row per update. Each row shows the guess with its correct digits highlighted, plus a bar whose length is the number of correct digits. The bars roughly double. A scrubber picks one rung for the **magnifier**, a number line showing g, 2/g and their average. That makes "one too big, one too small, the average lands between" visible at the rung the learner chooses.

## Brief check (re-run in node, 2026-10-14, double precision, against √2 = 1.41421356237309504880)
| update | g | error | correct significant digits |
|---|---|---|---|
| 0 | 1 | 0.41 | 1 |
| 1 | 1.5 | 0.086 | 1 |
| 2 | 1.4166666666666665 | 0.0025 | 3 |
| 3 | 1.4142156862745097 | 2.1e-6 | 6 |
| 4 | 1.4142135623746899 | 1.6e-12 | **12** |
| 5 | 1.4142135623730949 | 2.2e-16 | 15 (the limit of a double) |
| 6 | no change | | |

**The brief is right.** Answer A (4) holds: 12 digits after 4 updates. The "digits" bar is a log-scale error bar in disguise (−log₁₀ of the error, rounded to correct digits). Counting digits is the version a learner can read.

## Stage at 390×844 (~330 px at predict, ~520 px in explore)
1. Rule line (muted, 11 words): "Update: g becomes the average of g and 2 ÷ g."
2. **Ladder**: one row per update, 32 px tall. Left: "#4". Middle: g printed to 16 significant digits in a monospace face, correct digits bold `--fg` on a `--good` tint, the rest `--muted`. Right: **digits bar**, 8 px per correct digit (12 digits = 96 px), with the count as a number at its end. Row 0 (g = 1) is present from the start.
3. **Magnifier** (~110 px, under the ladder) for the rung selected by the scrubber: a number line with ticks for g (above), 2/g (above), and √2 (below, a fixed ring), plus the new average as a filled dot. The line is rescaled so the gap g − 2/g spans ~240 px. A zoom label ("×1,000") shows the scale. As the rungs go down, the zoom labels jump: ×1 → ×10 → ×1,000 → ×1,000,000.
4. Controls, see below.

Stage words at the busiest moment: rule line 11 + magnifier labels "g", "2 ÷ g", "√2", "zoom" (5) + row labels (numbers) = 16.

## Controls, in DOM order (3)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Update g" | appends the next rung (its bar grows over 150 ms) and moves the scrubber to it. After the rung where g stops changing, it is disabled |
| 2 | Control | "Update until it stops changing" | appends every remaining rung in order (60 ms each, ≤ 360 ms), ending with a muted row "#6 no change". Disabled when done |
| 3 | Slider | "Look at update" (0 … last rung) | selects the rung shown in the magnifier and outlines that row. Disabled until there is a rung 1. It never removes rungs |

All 3 render at first paint, disabled while `locked`. The buttons have class `.tap`; the slider thumb is ≥ 44 px. QA skips the slider while it is disabled. By the time QA reaches it, #1 has run, so it is enabled.

**Not a jump to the answer.** #2 adds the rungs one by one, and the 12 is reached in passing on rung 4.

QA path (each control once, DOM order): Update g (rung 1: 1.5, 1 digit) · Update until it stops changing (rungs 2–5 + "no change"; bars 3, 6, 12, 15; milestone `four-updates`) · Look at update (two ArrowLeft presses from the max, 6 → 4: the magnifier shows rung 4, where g and 2/g agree to 12 digits, at a zoom of about ×10¹¹; rung 6 in the magnifier reads "same as #5"). QA leaves rung 4 selected: the answer rung.

## States
- **Predict:** rung 0 only (g = 1, 1 digit, short bar). Magnifier shows rung 0 (g = 1, 2/g = 2, √2 between). No empty rungs are drawn ahead.
- **On unlock:** exploration hint: "Update a few times and watch the bold digits."
- **Rungs 1–3:** bars 1, 3, 6. The magnifier at rung 1 shows 1.5 and 1.333…, with the average just right of √2.
- **Rung 4:** a 12-digit bar, about twice rung 3's.
- **Rung 5:** 15 digits, where the double runs out. Rung 6 "no change".
- **Reveal:** stage as left (rung 4 selected on the QA path). Reveal quotes the ladder: "Your guesses had 1, 3, 6, then 12 correct digits: 12 after four updates, not twelve." Then the payoff: when g is too big, 2/g is too small, so the average lands much nearer; the new error is about the old error squared (claim 2). Rung 5 earns one sentence: "The fifth update hit the limit of the computer's numbers."

Milestones (`minInteractions=1`): `four-updates` (rung 4 exists).

## Shown, not told
The learner reads the doubling off bar lengths they grew. The magnifier lets them see why: g and 2/g squeeze √2 from both sides, and the zoom label jumps by ever larger factors.

## Colour and access
Correct digits are bold **and** tinted, so they read without colour. Bars `--domain` with the digit count as text. Magnifier marks: g and 2/g as ticks with text labels, √2 as a ring, the average as a filled dot. Ladder `aria-label`: "Update 4: 12 correct digits".

## Notes for others
- **Builder:** count correct digits by comparing the 17-significant-digit string of g with "1.41421356237309504880" (the table above). Do not compare against `Math.SQRT2`: at rung 5 that shows 16 or 17 matching digits, which is wrong. The magnifier's zoom is a power of ten chosen so g − 2/g spans 150–300 px.
- **Brief owner (cm-cs-algorithms):** the log-scale error bar becomes a "correct digits" bar (the same quantity, easier to read). The teaching is unchanged.
- No illustration (CS).
