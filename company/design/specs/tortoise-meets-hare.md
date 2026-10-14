# Spec: tortoise-meets-hare

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #10 · wireframe: `tortoise-meets-hare.svg`

**Format: Storyboard / scrub.** The payoff is a moment: the tick when the two markers share a box, and the gap counting down to it (3, 2, 1, 0). Time is the axis, and the learner has to stop on that frame. The scrubber is a **tick tape**: one tile per tick, and only the next tile is live, so each press is exactly one tick. This gives a one-press QA path without any jump button.

## Brief check (node, 2026-10-14)
Boxes 1 to 7, the last arrow 7 → 3 (tail 2, loop 5), both markers start on box 1. Ticks 1 to 5: slow is on 2, 3, 4, 5, 6 and fast on 3, 5, 7, 4, 6. **They meet on box 6 at tick 5.** From tick 2 (both in the loop) the fast marker is 3, 2, 1, 0 boxes behind. With the last arrow to nowhere, fast reaches box 7 at tick 3 and has no arrow to follow, so the list halts with no loop. Tails 0 to 10 × loops 1 to 10 always meet. **The brief is correct.** The loop has length 5, which is odd, so seeing the meeting also answers option B.

## Stage at 390×844 (~300 px at predict, ~470 px in explore)
1. Model line (muted): "Slow moves 1 box per tick, fast moves 2. Nothing else is remembered." (13 words)
2. **The chain**, 358 × 170 px: boxes 1 and 2 in a row on the left (the tail), then boxes 3 to 7 in a ring on the right. Boxes are 40 px rounded squares with their number. Arrows between them. The last arrow, from 7, goes back to 3, or it ends in a short stub with a bar ("nowhere").
3. **Markers**: slow is a filled circle labelled "slow"; fast is a filled triangle labelled "fast". When both are on one box they sit side by side and the box gets a thick outline. Last tick's positions show as faint outlines (one tick of trail only).
4. Readout row: "Tick 0 · Gap ? · Memory: 2 markers". Gap reads "fast is N behind" once both are in the loop, and "—" before that.
5. Tick tape (two rows of four), then the arrow toggle.

## Controls, in DOM order (9)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1–8 | Control tiles (`.tap`, ~84 × 44) | "1" … "8" (group label "Tick") | Tile k is enabled only when the stage is at tick k−1, so a press moves exactly one tick. Played tiles stay enabled and scrub back to that tick. The current tile is disabled with `className="active"`. When the run halts (they meet, or fast reaches the end) later tiles are disabled and the halt text shows |
| 9 | Control toggle (`.tap`, full width) | "Last arrow: to box 3" / "Last arrow: nowhere" (`aria-pressed`) | Redraws the last arrow and carries the current tick to the other list, capped where that list halts |

There are 8 tiles, so the length of the tape does not hint at tick 5. No reset: the toggle and scrub-back do that job, and nothing empties the stage. All 9 controls render at first paint, disabled while `locked`.

QA path: tiles 1–5 (tick 5, same box: milestone 1) · tiles 6–8 disabled, so QA skips them · toggle (nowhere: replays to tick 3, where fast stops at box 7: milestone 2).

## States
- **Predict:** the chain with the arrow 7 → 3, both markers on box 1, "Tick 0 · Gap ?". All tiles and the toggle are disabled. Nothing has moved, and the stage does not mark any box as special.
- **Ticks 1–2:** fast runs ahead into the ring. At tick 2 the gap readout appears: "fast is 3 behind".
- **Ticks 3–4:** fast laps round. Gap 2, then 1, and the gap number pulses on each change.
- **Tick 5:** both are on box 6, which gets a thick outline. "Gap 0", and the halt text says "Same box at tick 5: loop found". Tiles 6–8 are disabled.
- **Toggle to nowhere:** the arrow from 7 becomes a stub. The stage replays to tick 3: fast is on box 7 with nowhere to go, and the halt text says "Fast hit the end at tick 3: no loop".
- **Reveal:** the stage **pins the learner's loop run at its meeting** (label "Your run: tick 5, box 6") if they reached it. The toggle shows "to box 3". The reveal quotes only reached states: "Your fast marker was 3, then 2, then 1 box behind, then on the same box at tick 5." It adds "With no loop it hit the end at tick 3" only if `no-loop` was reached. Then the idea: inside the loop the gap closes by exactly one per tick, so it cannot skip zero, and two markers are all the memory needed. Credit Floyd (claim 2).

Milestones (`minInteractions=2`): `met` (loop list, slow and fast on one box) and `no-loop` (nowhere list, fast reaches the end). Call `interact()` only for these and for tile presses toward them.

## Shown, not told
The learner presses each tick and watches the gap readout count down 3, 2, 1, 0. That countdown answers options B and C before the reveal says anything. "Memory: 2 markers" stays fixed through the run, while the misconception expects a growing list of visited boxes.

## Answer hygiene
Title and hook are written without "meet" or "catch" as a promise (for example "Two runners, no notebook"). The locked stage shows no gap number and no highlighted box. The tape runs to 8, not 5.

## Colour and access
Boxes `--line` on `--bg-2`. Slow `--domain`, fast `--warn-fill` with `--bg` ink. Shape (circle vs triangle) and the text labels carry identity, so colour is never the only cue. The meeting box gets a 3 px `--fg` outline plus the halt text. Under reduced motion moves are instant; otherwise they settle in ≤ 300 ms. `aria-label` on the chain: "Tick 5: slow on box 6, fast on box 6".

## Claims this spec adds
Positions per tick, the gap 3 → 0, and the halt at tick 3 in the no-loop list (simulation, re-run by the builder). "Memory: 2 markers" is a derivation: the algorithm stores only the two positions.
