# Spec: long-cord-knots-itself

owner: interaction-designer (Rafael) · 2026-10-13 · status: draft, for design review · brief: `company/domains/briefs/lifehacks.md` #5 · wireframe: `long-cord-knots-itself.svg`

**Format: Simulation run.** The idea is a probability that depends on length; one trial says nothing. The learner runs batches of 20 at lengths they choose, and their own dots trace the curve before the published curve is shown.

## Change from the brief (interaction designer's call)
The brief's length slider + "tumble once" + "tumble 20 times" becomes **one row of length chips, each of which tumbles 20 at that length.** Reasons: (1) the milestone needs batches at two lengths, which the QA path (each control once, in order) can only reach if choosing a length *is* the run; (2) a slider moved two arrow presses never gets from 3 m to a short length; (3) fewer controls. "Tumble once" is dropped: a single trial is shown anyway, as one of the 20 icons.

## Stage at 390×844 (~330 px at predict, ~480 px in explore)
1. Setup line (muted): "30 cm box · 1 turn per second · 10 s · one string type." (11 words)
2. **Tally chart**, full width, ~200 px. x: "String length" 0–3 m. y: "Knotted, of 20" 0–20. Each batch adds a dot at (length, knotted) with its value printed ("9/20"). Repeated batches at one length stack as separate dots (honest scatter). Clipped batches are drawn as a ring, not a dot, labelled "clipped".
3. **Last batch strip**: 20 small string icons in two rows of 10 (~30 px tall): knotted = coil with an overhand crossing **and** a small "K" tick; clear = plain wave. A caption: "Last: 3 m, 9 of 20 knotted."
4. Controls, then `Readout`s: "Batches" and "Seed" (the disclosed seed).

## Controls, in DOM order (6)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1–5 | Control chips | "0.3 m" · "0.5 m" · "1 m" · "2 m" · "3 m" (group "Tumble 20 at") | each press: select length, draw 20 seeded trials from the published probability at that length, add a dot, refill the strip. Never disabled after unlock (pressing again runs the next seed) |
| 6 | Control toggle | "Ends clipped: off" / "on" (`aria-pressed`) | redraws the box icon with the ends joined; while on, every trial is "not knotted" (closed loop: no new knot) |

Probabilities (builder reads Raymer & Smith 2007 Fig. 2, records values in meta): about 0 at 0.3 m, low at 0.5 m, rising through 1 m, ~0.5 at 2 m and 3 m. Seeds: mulberry32, seed n for the n-th batch; if a seed is chosen so the first 3 m batch looks typical, disclose it (`disclose-chosen-seeds`).

QA path: 0.3 m → 0.5 m (milestone) → 1 m → 2 m → 3 m → clipped on. Five dots trace the rise and level-off. The stage at the reveal shows them; the clipped toggle is on, ready but not yet run (the box icon shows joined ends).

## States
- **Predict:** empty chart with axes, setup line, empty strip, chips disabled. Question at 3 m.
- **First batch:** one dot and 20 icons. The learner can count the knots.
- **Second length:** two dots; the gap between them is the first hint of the curve.
- **Clipped batch:** a ring at 0/20 at that length.
- **Reveal:** the published curve appears as a dashed `--muted` line labelled "Raymer & Smith 2007, this setup", through or near the learner's dots. Reveal quotes the learner's own dots: "You saw 0 of 20 knot at 0.3 m and 9 of 20 at 3 m."

Milestones (`minInteractions=2`): `batch-1`, `batch-other-length` (a batch at a second distinct length).

## Shown, not told
The curve is never drawn until the learner's dots have already made it. The reveal adds only the published line and the mechanism (a free end weaving through a coil).

## Colour and access
Dots `--domain` with value labels; clipped rings `--accent` outline + "clipped" text; knotted icons differ by shape and the "K" tick, not colour. Chips 44 px high (five chips at ~62 px wide fit 340 px with 8 px gaps). Values are integers out of 20.

## Illustrations
Hero 1:1 (plain cord, not a powered cable): predict phase only, 96×96 slot top right beside the setup line; removed on unlock. Render only once accepted (a 404 fails QA).

## For the learning designer / cm-lifehacks
Dropping the 4 m end and "tumble once" changes no claim. The reveal's "longer tumbling or floppier string knots more" has no control on the stage, so it must stay reveal text backed by claim (2), or be cut.
