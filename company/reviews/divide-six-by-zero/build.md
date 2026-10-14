# Build note: divide-six-by-zero

builder: demo-builder (builder-wavej-math) · 2026-10-14 · v1 draft · brief: company/domains/briefs/math.algebra.md, Wave J, brief 3

- Intent: a jug marked 0 to 6 (29 px per unit), a scoop drawn at its size beside it, and a counter panel on the right. A size chip fills the jug with alternating bands of that scoop's size; the panel logs "6 ÷ 3 = 2" etc. "Scoop 0" leaves the jug empty with "0 of 6" in red, a dashed flat scoop and the log row "0: 0 of 6 after 1,000" (jumps straight to the 1,000 state, no animation). "Check: ? × 0" adds "6 × 0 = 0", "1,000 × 0 = 0", "1,000,000 × 0 = 0" to the panel.
- Chips in brief order: Scoop 3, Scoop 1, Scoop 0.1, Scoop 0, Check: ? × 0, Reset. Check is active and disabled once shown.
- Milestones (minInteractions 3): "two-sizes" (two non-zero sizes poured), "zero-poured", "checked".
- Trace: the log and check lines stay through Reset (which only empties the jug and removes the scoop).
- Reveal: names only the non-zero sizes the learner poured, sorted large to small, with their counts.
- Options as the brief asks: "It is 0" / "It is infinity" / "No number works".
- Title and hook are mine: "What is 6 ÷ 0, really?" / "6 ÷ 2 is 3 because three 2s make 6. Ask the same question about 0." (hook claim c5).

## Pre-flight v1

1. Title and hook: neither says undefined, infinity or 0 as an answer.
2. Options: "It is 0" / "It is infinity" / "No number works": three short plain phrases, none numbered beyond the 0 in A.
3. Locked stage: an empty jug with marks 0 to 6 and the panel header "6 ÷ scoop = scoops". No scoop, no log.
4. Reveal values: the sizes and counts (recorded on each pour, log rows); 1,000 tries (milestone "zero-poured"; log row); the check (milestone "checked"; three lines).
5. QA path: Scoop 3, Scoop 1 (two-sizes), Scoop 0.1, Scoop 0 (zero-poured), Check (checked), Reset: all three by press 5.
6. Reset: reveal reads "6 ÷ a scoop size asks how many scoops fill the jug. Your scoops of 3, 1 and 0.1 took 2, 6 and 60: smaller scoops, more of them, with no ceiling. A scoop of 0 filled nothing after 1,000 tries, ..."; log and check lines still on the stage.
7. Phone fit: see the measurement section below.
