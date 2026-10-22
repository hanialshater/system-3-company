# Build note: pick-two-or-pick-four

builder: demo-builder (Meta M6, order O-9) · 2026-10-22 · v1 · brief: company/domains/briefs/math.discrete.md, Wave J, brief 5 (check D5) · design: company/reviews/pick-two-or-pick-four/design.md

- Intent: `subsets(6, k)` in Demo.tsx enumerates every group; counters, the grid and "groups of 3: 20" are lengths of those lists, never typed. A module-load check confirms the 15 complements of the pairs are 15 different fours covering every four (the matching claim c2 states).
- Deviations from the brief, for cm-math:
  1. **Stage budget (brief: 37, over).** Pair chips are drawn as six dots each (two filled = go, four hollow = stay), no letters: the brief's own suggested picture change. Busiest frame (after All pairs and Groups of 3): friend letters A–F 6, "go" "stay" 2, "pairs seen: … of" 3, "fours seen: … of" 3, "groups of" 2, "Next pair" 2, "All pairs" 2, "Groups of 3" 2, "Reset" 1 = 23 (numerals 0). The 3 × 5 grid is kept.
  2. Counters before the first pair read "pairs seen: 0" / "fours seen: 0" with no total, so the locked frame does not show 15 = 15. Empty grid slots draw nothing, for the same reason.
  3. "go" / "stay" are band labels (once each), and the four stayers sit in a dashed box together, so "outlined together as a group of 4" holds for any pair without moving friends out of order.
  4. Predict question in second person ("You have 6 friends. You can take 2 of them on a trip, or else 4 of them. Which choice gives more possible groups to take?").
- Title and hook are mine: "Pick two or pick four" / "Six friends, one trip. Is there more choice in taking 2 or in taking 4?"

## Pre-flight v1

1. Title and hook: "Pick two or pick four" / "Six friends, one trip. Is there more choice in taking 2 or in taking 4?" Neither says which, or "same".
2. Options: "Taking 2" / "Taking 4" / "The same": same precision, none carries a count.
3. Locked stage: six friends in the stay band (no box, nothing in go), "pairs seen: 0", "fours seen: 0", empty grid area, all controls disabled. No total, no 15, no 20.
4. Reveal values: "Every pair you picked left exactly four behind" = milestone `one` (pair in go, four boxed in stay; the last pair is re-shown at the reveal); "15 pairs, 15 fours" = milestone `all` (counters "15 of 15" twice and 15 chips, recorded and re-shown at the reveal); "Groups of 3 … 20" printed only if "Groups of 3" was pressed (recorded), and then "groups of 3: 20" is on the stage at the reveal.
5. QA path: Next pair (one), All pairs (all), Groups of 3, Reset: both milestones by press 2. In a 390×844 browser run each press changed the stage and the reveal button was enabled; the only console error is the environment-wide `/api/account/me` 404.
6. Reset: after the four presses (Reset last), the reveal read: "Every pair you picked left exactly four behind, and each four left behind exactly one pair. So the groups match one to one: 15 pairs, 15 fours. Choosing who goes is the same as choosing who stays. | Groups of 3 are the most, 20, where goers and stayers are the same size. In general, choosing k of n has as many ways as choosing n − k." The stage beside it: A, B go and C–F boxed in stay; "pairs seen: 15 of 15", "fours seen: 15 of 15"; 15 chips; "groups of 3: 20".
7. Phone fit: `node tools/reveal-fit.mjs --url http://localhost:3109 pick-two-or-pick-four --shots` on a production build of this worktree: verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, thumb false, phoneFit true; reveal 72 words (tool count); stage 325 px (picture 88, controls 88, text 95). Screenshot artifacts/reveal-fit/pick-two-or-pick-four.png (git-ignored).

## Measurement v1 (demo-builder, 2026-10-22)

- Sizes: friend letters 15 units → ~12.7 px at 390; band labels 13 units → ~11 px; counters 0.82rem = 13.1 px; "groups of 3" 14.4 px; chip dots 6.4 px circles (no text). Controls ≥ 44 px.
- `tsc --noEmit`: clean. `next build`: exit 0 (tsconfig.json include rewrite reverted). Registry regenerated with `npm run registry`.
- Official QA is code's qa stage; not run by me.
