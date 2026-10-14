# Spec: two-stacks-make-a-queue

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #34 · wireframe: `two-stacks-make-a-queue.svg`

**Format: Storyboard / scrub.** The payoff is about time. One removal is slow (the pour), and the next three are instant. The learner has to stand on the frame where the pour happens and then on the frames where it does not. The question fixes the script (add 1 to 4, then remove four times), so the scrubber is an **operation tape** with one tile per operation. Only the next tile is live, so every press is one operation, there is a one-press QA path, and no button jumps ahead.

## Brief check (node, 2026-10-14)
Push 1, 2, 3, 4 onto the in-stack. Remove 1: the out-stack is empty, so all four are poured in one pour (4, 3, 2, 1 popped, landing with 1 on top) and 1 leaves. Removes 2 to 4 need no pour, and 2, 3, 4 leave. Each item is moved exactly once, there is 1 pour, and the order is 1 2 3 4. **The brief is correct.**

## Stage at 390×844 (~300 px at predict, ~480 px in explore)
1. Model line (muted): "Remove pops the out-stack. Only when it is empty, pour the whole in-stack over." (15 words)
2. **Three columns**, 358 × 230 px:
   - left: a "Waiting" tray (items 1 to 4 that have not been added yet);
   - centre: the **in-stack** and the **out-stack**, two upright tubes 4 items tall, labelled "in" and "out", with a curved "pour" arrow from the top of in to out that lights up only during a pour;
   - right: a "Left the queue" tray, filling top to bottom in leaving order.
   - Each item is a 40 px tile with its number and a badge "moved ?" at predict, which becomes "moved 0" once the item is added and counts each pour.
3. Readout row: "Pours: 0 · Left: —". Removes that need no pour flash the text "out not empty: no pour" (≤ 450 ms, then it stays muted until the next press).
4. Operation tape: two rows of 4 tiles, the add row then the remove row.

## Controls, in DOM order (8)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1–4 | Control tiles (`.tap`, ~84 × 44) | "Add 1" · "Add 2" · "Add 3" · "Add 4" | Push that item onto the in-stack (badge "moved 0") |
| 5–8 | Control tiles | "Remove" (with a small ordinal: 1st to 4th) | Pour if the out-stack is empty (items slide over one at a time, ≤ 400 ms total, each badge +1, Pours +1), then pop the top of out into the "Left" tray |

Tile k is enabled only when the tape is at operation k−1. Played tiles stay enabled and scrub back to the frame after that operation. The current tile is disabled with `className="active"`. All 8 render at first paint, disabled while `locked`. There is no reset and no "play all".

QA path: Add 1 to 4 (setup) · Remove (the pour: milestone 1) · Remove · Remove · Remove (all four left in order 1 2 3 4, Pours still 1: milestone 2).

## States
- **Predict:** items 1 to 4 in the Waiting tray, empty tubes, "moved ?" badges, "Pours: ?". All tiles are disabled.
- **Adds 1 to 4:** the items drop into the in-stack one by one, with 4 on top. Badges say "moved 0".
- **Remove 1st:** the pour arrow lights up. 4, 3, 2, 1 slide across, each badge goes to "moved 1", "Pours: 1", and 1 leaves for the right tray.
- **Removes 2nd to 4th:** "out not empty: no pour". 2, then 3, then 4 leave. Badges and Pours do not change.
- **Reveal:** the stage pins the furthest frame reached (normally all four in the Left tray, every badge "moved 1", "Pours: 1"). The reveal quotes only frames visited: "Your one pour moved 4 items, each once. The next three removals moved nothing." Then the idea: each item is poured at most once in its life, so one slow removal pays for the fast ones and the average cost stays constant. Same accounting as list doubling.

Milestones (`minInteractions=2`): `poured` (the first Remove is played) and `all-out` (the fourth Remove is played).

## Shown, not told
The badges are the answer, and the learner watches each one go from 0 to 1 during the pour and then stay at 1 through three more removals. The flash "no pour" on removals 2 to 4 is the moment the misconception ("flip on every removal") fails in front of them.

## Answer hygiene
The locked stage shows "moved ?" and "Pours: ?". The title avoids "once" (for example "A queue from two stacks"). The tape has no tile past the question's eight operations, so nothing lands on the end state in one press.

## Colour and access
Tubes `--line` on `--bg-2`, items `--domain` fill with `--bg` ink, and badges `--muted` text that turns `--fg` when they change. The pour arrow is `--warn-fill`, lit only during a pour and paired with the "Pours" readout, so colour is never the only cue. Under reduced motion the pour is instant (badge changes still shown). `aria-live="polite"` on the readout row.

## Considered and left out
A second panel with the naive "pour back after every removal" queue would make the misconception's cost visible. But it changes the lesson to a comparison, and that is the learning designer's call, not mine. It is not in this spec.
