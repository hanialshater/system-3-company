# Spec: gray-code-one-flip

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #66 · wireframe: `gray-code-one-flip.svg`

**Format: Side-by-side comparison, as one ladder with two columns.** Binary and Gray counts sit side by side in one table, one row per number, 0 at the top, and the rows appear as the learner counts. Each row marks the lamps that flipped since the row above. The brief's "two rows of three lamps that flash" would show only the current step, and the learner would have to remember eleven flashes. The ladder keeps every flip on the stage, so both totals at the reveal are sums the learner can see.

## Brief check (re-run in node, 2026-10-14)
g = n XOR (n >> 1), 3 bits, n = 0 … 7.
- Gray: 000 001 011 010 110 111 101 100. Flips per step: binary 1 2 1 3 1 2 1 (**total 11**), Gray 1 1 1 1 1 1 1 (**total 7**). 3 → 4: binary 011 → 100 flips 3, Gray 010 → 110 flips 1. **The brief is right.**

## Stage at 390×844 (~340 px at predict, ~420 px in explore)
1. Rule line (muted, 11 words): "Gray code: g = n XOR (n shifted right one place)."
2. **Ladder table**, 8 rows × 30 px (240 px) plus a header. Columns: "n" (0–7) · **Binary** (three 18 px lamps: filled = 1, hollow = 0, with the digit beside) · flips · **Gray** (three lamps) · flips. In each new row, the lamps that changed from the row above get a 2 px `--fg` ring, and the flips column shows the count. Rows not yet counted are blank. The newest row is outlined.
3. **Totals row** under the ladder: "Total flips: 0" in each column.
4. Controls, below.

Stage words at the busiest moment: rule line 11 + headers 4 + totals 4 = 19.

## Controls, in DOM order (2)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Next number" | adds the next row: n + 1 in both codes, the changed lamps ringed, the flip counts and totals updated. Disabled after 7 |
| 2 | Control | "Count to 7" | adds the remaining rows one at a time, about 50 ms each (≤ 400 ms; instant under reduced motion). Every row's rings are drawn |

Both controls render at first paint, disabled while `locked`, class `.tap` (44 px). No reset: the full ladder is the reveal's picture.

QA path (each control once, DOM order): Next number (row 1: 1 flip each) · Count to 7 (rows 2–7, through 3 → 4: milestones `three-to-four` and `at-seven`; totals 11 and 7).

## States
- **Predict:** header and row 0 only (000 · 000), totals at 0. No blank row outlines for rows 1–7, so the ladder's length is not a hint. Gray's column header is present and empty below row 0.
- **On unlock:** nothing moves until a press. Exploration hint: "Count up and watch how many lamps change each time."
- **Rows 1–3:** binary 1, 2, 1 flips; Gray 1, 1, 1.
- **Row 4 (3 → 4):** binary rings all three lamps (011 → 100); Gray rings one (010 → 110). The flips column reads 3 beside 1.
- **Row 7:** totals "Total flips: 11" and "Total flips: 7". The Gray flips column is a straight run of 1s.
- **Reveal:** the stage stays as left. The reveal: "Going from 3 to 4, binary flipped all three lamps (011 to 100); Gray flipped one (010 to 110). Counting 0 to 7, binary made 11 flips, Gray made 7: exactly one per step. That matters for a sensor reading a dial. If it reads halfway between two marks, a Gray reading can be off by one position, never a jumble of bits. Rotary encoders use Gray code for this reason."

Milestones (`minInteractions=2`): `three-to-four`, `at-seven`.

## Shown, not told
The learner sees three rings in one row on the binary side and a column of single rings on the Gray side. "One bit per step" is the shape of the Gray column, and the totals only count it.

## Colour and access
Lamps: filled vs hollow plus the printed digit; flipped lamps ringed (shape). No colour carries meaning alone. Ladder `aria-label`: "Counted to 7: binary 11 flips, Gray 7 flips".

## Notes for others
- **Builder:** the encoder sentence in the reveal is a claim (application, sourced). The patent number in claim (3) is marked "check before building" in the brief. The reveal does not quote it.
- **Brief owner (cm-cs-algorithms):** two lamp rows that flash become one ladder that keeps every step (the brief's flash is the ring). Teaching unchanged.
- No illustration (CS).
