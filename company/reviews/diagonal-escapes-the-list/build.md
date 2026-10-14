# Build note: diagonal-escapes-the-list (demo-builder, 2026-10-13)

- Intent: the first 8 rows and 8 places of a claimed complete list of endless 0-1 strings, with "…" on each row and "the list goes on forever" below. The 8 diagonal digits (yellow outline) are the controls. Tapping row k's place-k digit crosses it out and writes the opposite digit into place k of "your" string underneath. That row's number turns green.
- Key state (one milestone): all 8 diagonal digits flipped, so the new string differs from every row shown. The diagonal controls are in DOM order, so QA's single pass flips all 8.
- Rows come from mulberry32(1891). The seed is arbitrary, not chosen for the result (disclosed in c2), and node confirms the 8 rows are distinct and the new string is 01000110.
- Locked: the readout shows "?", and the new string is all "?" until flips.
- The stage says "place" and "row" rather than "diagonal"/"index". The reveal names Cantor's diagonal argument and claims no more than "no list holds them all".
- After screenshots: the first draft's mid-run caption named only the first flipped row. It now counts the rows done.
- All claims unverified, for the fact-checker.

## Revision v2

From the adult-beginner learner review. The learner now chooses: first tap writes the opposite digit, a second tap copies it (row turns red: not escaping that row). Added 'Try row 1,000,000' (enabled once all 8 are flipped) to show the endless case. Reveal quotes what was done and is shorter so the conclusion survives the phone fold. c2 edited, c4 added.
All new or edited claims are unverified, for the fact-checker.
