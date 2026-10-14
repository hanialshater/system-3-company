# Spec: hailstone-27-climbs

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #71 · wireframe: `hailstone-27-climbs.svg`

**Format: Storyboard / scrub.** One line chart of the value over steps. The learner steps or runs 27 to 1, then scrubs back through the run they made. The start chips add neighbours as thin lines on the same axes. The scrubber is over the learner's own run, not a pre-baked timeline: it covers only the steps already taken.

## Brief check (re-run in node, 2026-10-14)
Rule: even → n/2, odd → 3n + 1, stop at 1; a step is one application.
- 27: **111 steps, peak 9,232 at step 77.** 26: 10 steps (peak 40). 28: 18 steps (peak 52). 97: 118 steps (peak 9,232 at step 84), the longest start under 100. **The brief is right.**
- 97 and 27 share a peak because 97's run passes through 94, which 27 reaches at step 6. This is not on the stage or in the reveal, and it needs no claim.

## Stage at 390×844 (~380 px at predict, ~520 px in explore)
1. Rule line (muted, 9 words): "Even: halve it. Odd: times 3, plus 1. Stop at 1."
2. **Chart**, 342 × 240 px. x axis: steps 0–120 (ticks 0, 40, 80, 120). y axis: value, **linear**, and it **grows to fit the highest value drawn so far** (rounded up to 100, 1,000 or 10,000, three ticks), never shrinking. At 27's peak it reads 0, 5,000, 10,000. A linear axis is honest and makes the point: 26's whole run is a flat smear along the bottom, and 27's is a mountain. **27's run is always the 2 px `--fg` line** (the question's run, pinned). Any other start is a `--muted` line: 1.5 px while its chip is active, 1 px otherwise. A dot marks each step while a run has fewer than 20 steps. (Wireframe check: 97's run is 27's shifted 7 steps right, so if the active run were the bold one, the QA path would end with 97's mountain drawn over 27's and the reveal's subject would be the faint line. Pinning 27 avoids that.) Runs are named in the table, not by end labels (they all end at 1 on the floor, where labels would collide). The y tick labels sit in a 40 px left gutter.
3. **Cursor**: a vertical line at the scrubbed step, with its readout above the chart: "Start 27 · step 77 · value 9,232".
4. **Runs table** (readouts), one row per start that has reached 1: "27 · 111 steps · peak 9,232". It has four rows at most.
5. Controls, below.

Stage words at the busiest moment: rule line 11 + readout labels 3 + table labels 4 + axis labels 2 = 20.

## Controls, in DOM order (7)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Step" | applies the rule once to the current start: the line grows by one step, and the cursor moves to it. Disabled at 1 |
| 2 | Control | "Run to 1" | computes the rest at once, then draws it point by point within 400 ms (frames may be skipped; instant under reduced motion). The cursor ends on the last step. Disabled at 1 |
| 3 | Slider | "Scrub" (aria-label "Step to show") | range 0 … steps taken so far, default = the last step. Moving it moves the cursor and the readout. Disabled while no step has been taken |
| 4–7 | Control chips | "26" · "27" · "28" · "97" (group "Start") | start: **27** active and disabled. Switching keeps the old run as a thin line and starts the new number at step 0. **If the old run had reached 1**, the new start is run to 1 at once, as #2 |

All 7 controls render at first paint, disabled while `locked`, class `.tap` (44 px; the slider thumb ≥ 44 px). No reset: the chips restart, and the runs table keeps every finished run.

QA path (each control once, DOM order): Step (27 → 82) · Run to 1 (111 steps, peak 9,232: milestone `27-at-1`) · Scrub (at max, so two left arrows: cursor at step 109, value 4) · 26 (replayed: 10 steps, flat along the floor: milestone `another-start`) · 27 (re-enabled; replayed: the mountain again) · 28 (18 steps) · 97 (118 steps, peak 9,232). The table holds all four runs. The stage ends on 97, with 27's line still drawn.

## States
- **Predict:** empty axes, the 27 chip active, the cursor readout "Start 27 · step 0 · value 27", one dot at (0, 27), table empty. **Answer visibility:** the question asks for a step count, so the x axis is the risk. While locked and until the first run reaches 1, the x axis carries only the word "steps" and no tick labels, so options A (under 30) and B (111) cannot be read off it. The y axis starts at 0–100 and only grows as values are drawn, so it gives no hint of the climb or of an end.
- **On unlock:** nothing moves until a press. Exploration hint: "Step a few times, then run 27 to 1."
- **27, first few steps:** 82, 41, 124, 62, 31, 94: the y axis already stretches from 100 to 1,000.
- **27 at 1:** the mountain, with the highest point at step 77 (9,232). The x ticks appear. Table row "27 · 111 steps · peak 9,232".
- **Scrubbing:** the cursor walks back along the learner's own run, and the readout changes with every step.
- **26 / 28:** short runs (10 and 18 steps) that never leave the floor at this scale. They sit next to 27's mountain.
- **97:** 118 steps, also topping out at 9,232.
- **Reveal:** the stage stays as left: 27 bold, 97 active (1.5 px muted, cursor and readout on it), 26 and 28 thin. The table holds every run. The reveal quotes only rows the table has: "27 took 111 steps and climbed to 9,232 before falling to 1. Its neighbours were tiny: 26 took 10 steps, 28 took 18. 97 took 118. The start number tells you almost nothing about the run. Every start that computers have checked reaches 1. But nobody has proved that every start does: the Collatz conjecture is still open."

Milestones (`minInteractions=2`): `27-at-1`, `another-start` (any other start reaches 1).

## Shown, not told
The learner's own presses build the mountain, and two chips put 26's and 28's flat lines under it. "Tiny rule, wildly different runs" is a picture of three lines from three neighbouring numbers.

## Colour and access
Current run `--fg` 2 px; earlier runs `--muted` 1 px. Runs are named by the table, not by hue. Chart `aria-label`: "Start 27: 111 steps, highest value 9,232 at step 77".

## Notes for others
- **Builder:** step count = number of rule applications to reach 1 (27 → 111). The x tick labels stay hidden until the first run ends (answer visibility).
- **Brief owner (cm-cs-algorithms):** claim (3) (checked to about 2^68, Barina 2021) is marked "check before building". The reveal says "every start computers have checked" without a number, so the stage does not wait on that check. If the number is verified, the claim may add it.
- No illustration (CS).
