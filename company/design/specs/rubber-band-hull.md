# Spec: rubber-band-hull

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #40 · wireframe: `rubber-band-hull.svg`

**Format: Storyboard (step-through).** The payoff is a process: one pass round the pins, where each new pin is a frame and a right turn is the moment something is thrown away. The learner's taps *are* the timeline: each tap is the next frame, and the frames stay on the board (kept pins on the band, popped pins crossed out with the turn that popped them). No slider: a scrubber would let QA's two arrow presses leave the stage mid-walk, and the reveal must show the closed band.

## Brief check (re-run in node, 2026-10-14)
Pins (0,0) (6,0) (8,3) (7,7) (2,8) (-1,4) (3,3) (4,5) (2,2) (5,2).
- Monotone chain: **6 hull pins**: (-1,4) (0,0) (6,0) (8,3) (7,7) (2,8). The answer B) 6 is right.
- The walk this spec uses (Graham scan from the lowest pin, (0,0), pins in angle order, pop on any non-left turn) gives the same 6. Angle order: (6,0) (8,3) (5,2) (2,2) (3,3) (7,7) (4,5) (2,8) (-1,4). Pops: (5,2) when (2,2) arrives, (2,2) when (3,3) arrives, (3,3) when (7,7) arrives, (4,5) when (2,8) arrives. All four are strict right turns (cross products −3, −5, −20, −13), so no straight-line case needs explaining. At most one pop per tap. Closing turns back to (0,0) are left.
- **Brief problem: the extremes are 5 pins, not 4.** (0,0) and (6,0) tie for lowest. Leftmost (-1,4), rightmost (8,3), top (2,8), bottom (0,0) *and* (6,0). A learner who applies the misconception carefully counts 5 and finds no matching option (A is 4). The brief's line "the four extremes are only 4 of them" hides the tie. Suggested fix for the brief owner (a content change, not mine to make): move (6,0) to (6,1). Node: still 6 hull pins, same four pops, and the extremes become 4 distinct pins with (6,1) and (7,7) as the two the misconception misses. Until the owner decides, this spec uses the brief's pins and the reveal names the tie (below).

## Stage at 390×844 (~400 px at predict, ~470 px in explore)
1. Rule line (muted, 18 words, after unlock): "Start at the lowest pin. Tap pins in order round it. A right turn drops the last pin." At predict only: "10 pins. A rubber band goes round them all." (9 words)
2. **Board**, 350 × 320 px, a faint square grid (no axis numbers). x from −1 to 8, y from 0 to 8, about 34 px a unit. Closest pair, (2,2) and (3,3), is 48 px apart, so 44 px hit circles do not overlap. Pins are 10 px dots; each of the 9 non-start pins sits under a transparent 44 × 44 button (the control).
3. After unlock: the start pin is labelled "start"; the other nine get small order numbers 1–9 (angle order), and a faint sweep ray points from the start to the next pin, which glows.
4. **The band so far**: a thick `--domain` polyline from the start through the kept pins. The newest corner shows a turn mark: a curved arrow, `--good` "left: keep" or `--bad` "right: drop".
5. Readouts under the board (one line): "On band: 4 · Dropped: 1" and, once closed, "Band closed on 6 pins".
6. Legend (muted, 7 words): "↺ left turn: keep · ↻ right turn: drop".

## Controls, in DOM order (9)
| # | Kind | Label (aria) | Behaviour |
|---|---|---|---|
| 1–9 | Control (transparent 44 px button over a pin, `.tap`) | "Pin 1" … "Pin 9", in angle order: (6,0) (8,3) (5,2) (2,2) (3,3) (7,7) (4,5) (2,8) (-1,4) | **The next pin:** joins the band; the turn at the previous corner is checked; if it is a right turn, that corner flashes `--bad` for 250 ms and its pin drops (hollow, crossed, with a small "↻" left beside it). One check, at most one drop per tap here, settled within 450 ms. The pin is then disabled. **Any later pin:** the next pin pulses and the line reads "Pin 4 is next: the walk goes round in order." (the stage text changes, so the press is not a no-op). After pin 9, the band closes back to the start by itself, and the inside fills with a light tint |

The DOM order is the walk order, so QA pressing each control once in DOM order walks the whole scan correctly. There is no "finish" or "show band" button: the band closes only on the learner's own ninth tap. No reset, so nothing empties the closed band before the reveal. 9 controls is within QA's 16. All exist at first paint, disabled while `locked`.

The brief's "drag a pin to change the band" is dropped: drag is not on the QA path, and a second idea (moving pins) would crowd a 60-second card.

QA path: Pin 1 (band 2) · Pin 2 (band 3) · Pin 3 (band 4) · Pin 4 (right turn, pin 3 drops: milestone `first-drop`) · Pin 5 (drops 4) · Pin 6 (drops 5) · Pin 7 · Pin 8 (drops 7) · Pin 9 (band closes on 6: milestone `closed`).

## States
- **Predict:** 10 identical pins on the faint grid. No band, no numbers, no order, no marks on the leftmost/rightmost/top/bottom pins (marking them would suggest option A), readout "On band: ?". The pins carry no coordinates.
- **Explore, pins 1–3:** the band runs from the start along the bottom, up to the right-hand pin, then back in to pin 3 (left turns, all kept).
- **Pin 4:** the band would bend right at pin 3; it flashes and drops. The learner sees an inside pin rejected by a turn, not by its position.
- **Pins 5–8:** pin 4 and pin 5 drop in turn; pin 6 (top right, (7,7)) is kept although it is no "most-left, right, top or bottom" pin; pin 7 drops when pin 8 arrives.
- **Pin 9 and close:** the band closes on 6 pins. Every pin was tapped, so the stage shows **6 on the band, 4 dropped**, each dropped pin crossed with its "↻". Readout "Band closed on 6 pins". The count appears only here.
- **Reveal:** the stage stays closed. Small arrows (← → ↑ ↓; two ↓ for the tied bottom pins) appear beside the extreme pins, so the reveal's comparison is on the board. Reveal quotes the learner's walk: "Your band closed on 6 pins. The leftmost, rightmost, top and bottom pins are only 5 of them here (two tie for bottom), and pin 6 is none of those: the band turns there. Your walk dropped 4 pins, each at a right turn." Then the idea: sort once, then one pass of left-or-right checks (claims 2 and 3). If the brief owner moves (6,0) to (6,1), the sentence becomes "only 4 of them" and pins 1 and 6 are the two it misses.

Milestones (`minInteractions=2`): `first-drop` (a right turn has dropped a pin), `closed` (the band has closed).

## Shown, not told
The learner never hears "convex". They tap, watch an inside pin get thrown out by a right turn, and see the band close on a corner (pin 6) that no "extreme" rule would pick. The reveal adds the arrows on the extremes over the band the learner made, so the gap between the misconception and the result is on the board.

## Colour and access
Band `--domain` (graphic, 3:1), labels and numbers `--fg`; turn marks are arrow *shapes* plus "keep"/"drop" words, with colour only a second cue; dropped pins are hollow and crossed. Order numbers 12 px. Each pin button has `aria-label` "Pin 4, next" / "Pin 4, dropped at a right turn". Board `aria-label`: "Band closed on 6 pins, 4 dropped".

## Notes for others
- **Builder:** the angle sort ties nothing here (no two pins share an angle from (0,0)), but the code should sort ties by distance and pop on cross ≤ 0, as checked. Hit buttons sit over the SVG in a positioned wrapper; the 48 px closest-pair gap must hold at 390 px.
- **Brief owner (cm-cs-algorithms):** the extremes tie (above). The brief's check uses monotone chain but its key state describes a walk from the lowest pin; this spec uses the walk (Graham scan). Both give 6.
- No illustration (CS).
