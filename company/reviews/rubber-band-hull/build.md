# Build note: rubber-band-hull

builder: algo-pair-12 · 2026-10-14 · status: draft (not self-verified; all claims unverified)

Built from `company/design/specs/rubber-band-hull.md` (+ svg) and brief #40, with the spec's fix applied: pin (6,0) moved to (6,1).

## Answer check (node)
Pins (0,0) (6,1) (8,3) (7,7) (2,8) (-1,4) (3,3) (4,5) (2,2) (5,2). Monotone chain: 6 hull pins. Graham scan from (0,0): same 6; drops (5,2), (2,2), (3,3), (4,5) on cross products -3, -5, -20, -13, one drop at most per tap. Extremes are 4 distinct pins: (-1,4) (8,3) (2,8) (0,0); the band also touches (6,1) and (7,7). Closest pair (2,2)/(3,3) is 1.41 units = 48 px.

## Built as specced
Storyboard by taps: nine 44 px buttons over the pins in angle order (DOM order = walk order), no slider, no reset, no finish button. Band closes only on the ninth tap. Turn marks "keep" / "drop", dropped pins hollow and crossed with a "↻". Reveal draws the extreme arrows on the board. Milestones first-drop and closed, minInteractions 2.

## Choices and deviations
- The spec says no two pins share an angle from (0,0). Not true: (2,2) and (3,3) are collinear with (0,0). The code sorts ties nearer first and pops on cross <= 0, as the spec's note asked; the spec's trace still holds.
- The legend line ("left turn: keep / right turn: drop") is dropped: with the rule line and readout it would put stage text over 25 words, and the turn marks already say keep / drop in words.
- Reveal wording follows the spec's note for the moved pin: "only 4 of them", pins 1 and 6 are the two the extremes miss.
- Out-of-order taps change the rule line to "Pin N is next" (a state change, so QA does not see a dead press).
- references empty: CLRS 3rd ed. ch. 33 is cited in claims, but works.json has only the 4th edition, which dropped computational geometry.

## Checks skipped
next build, QA, walkthrough and full tsc were not run (machine out of memory, coordinator order). Narrow tsc on both Demo.tsx passed; npm run check passed.
