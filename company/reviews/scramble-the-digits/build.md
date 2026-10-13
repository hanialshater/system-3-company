# Build note: scramble-the-digits (demo-builder, 2026-10-13)

- Intent: 7254 as four digit tiles in the 1000s, 100s, 10s and 1s places. Tap a tile, then another, to swap them. Under each place: its value as nines plus 1 (1000 = 999 + 1 ...), and that digit's leftover ones as dots. Readouts: the leftover total (always 18) and the quotient by 9 of the number on screen.
- Key state (two milestones): two swaps that make two new numbers. QA path: tiles 1-2 (swap), 3-4 (swap) gives 2754 then 2745.
- Numbers: question from START; quotient and leftover readouts computed from the digits on screen; "?" while locked.
- Deviation from brief: drag between slots became tap-to-pick, tap-to-swap (QA cannot drag; the pick step changes the caption so it is observable).
- After screenshots: the "999 + 1" labels lacked the place they split; each now reads "1000s / = 999 + 1".
- All numbers recomputed with node (all 24 orderings are multiples of 9); all claims unverified, for the fact-checker. The lesson does not claim the converse for other divisors (brief note).
