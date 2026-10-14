# Spec: ways-to-make-ten

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #19 · wireframe: `ways-to-make-ten.svg`

**Format: Storyboard, stepped** (the brief's Storyboard / scrub, with the scrubber replaced by row steps). The idea is a process with an order: the table is built one coin kind at a time, and the order of the loops is the lesson. Each key frame is one finished row, so the learner stops at named moments ("with 1s", "with 1s and 2s", "with 1s, 2s and 5s"). A scrubber cannot be used: QA moves a slider two arrow presses, and a frame chip that lands on the last frame would jump to the answer cell.

## Designer's node check (2026-10-14, re-run of the brief)
Combinations, one coin kind per row, cell = above + (same row, c to the left):
- coin 1: `1 1 1 1 1 1 1 1 1 1 1`
- coins 1, 2: `1 1 2 2 3 3 4 4 5 5 6`
- coins 1, 2, 5: `1 1 2 2 3 4 5 6 7 8 10`. The 10 cell is 6 (above) + 4 (five to the left) = **10**.
- The 10 mixes, (fives, twos, ones): (0,0,10) (0,1,8) (0,2,6) (0,3,4) (0,4,2) (0,5,0) (1,0,5) (1,1,3) (1,2,1) (2,0,0).
Order matters, one row, cell = sum of cells 1, 2 and 5 to the left: `1 1 2 3 5 9 15 26 44 75 128`, so **128**.
The brief's numbers are correct.

**Brief problem (interaction, not content):** the brief has the learner tap each of the 3 × 11 cells. That is 30 taps after the prefilled column, too many for a 60-second card and not reachable on the QA path (each control pressed once). This spec keeps "one cell at a time" as control 1 and adds a fill per row. What the lesson teaches is unchanged.

## Stage at 390×844 (~300 px at predict, ~520 px in explore)
1. Model line (muted): "Each cell: ways without this coin (above) plus ways using one more (c cells left)." (14 words)
2. **Table**, 366 px wide: a 36 px row-label column plus 11 columns of 30 px for totals 0–10 (header row). Rows, top to bottom:
   - "none" (muted, prefilled): `1 0 0 0 0 0 0 0 0 0 0`, so the coin-1 row has an "above";
   - coin 1, coin 2, coin 5 (the label is a coin glyph with its value). Column 0 is prefilled with 1 ("no coins") in each coin row. Every other cell is blank until filled. The 10 cell of the coin-5 row shows "?" while locked.
   - "any order" row, hidden until control 5.
3. When a cell fills, two arrows point into it: one from above, one from c cells to the left in its own row. A formula line under the table shows the last fill: "Total 10 with 1, 2, 5: 6 above + 4 five left = 10". This is a readout and is not counted against stage words.
4. **Mix strip**, below the formula line, 60 px high: one tiny coin stack per way for the cell just filled (5 = large disc, 2 = medium, 1 = small). It shows at most 10 stacks, ~32 px each. For the coin-5 row's 10 cell, it shows the learner's 10 mixes.

Stage words: model line 14 + "none" + "any order" = 17.

## Controls, in DOM order (5)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control `.tap` | "Fill one cell" | fills the next empty cell in reading order (the first press: coin 1, total 1), with its arrows, formula and mix strip. Disabled when the three coin rows are full |
| 2 | Control `.tap` | "Fill the 1-coin row" | fills the rest of the coin-1 row cell by cell (≤ 35 ms per cell, ≤ 400 ms; instant under reduced motion). Every value stays. Disabled once the row is full |
| 3 | Control `.tap` | "Add the 2-coin row" | enabled once the coin-1 row is full; fills the coin-2 row the same way. Disabled once full |
| 4 | Control `.tap` | "Add the 5-coin row" | enabled once the coin-2 row is full; fills the coin-5 row; the last cell is the 10 cell, with its two arrows, the formula and 10 stacks in the mix strip. Disabled once full |
| 5 | Control `.tap` | "Let order matter" | enabled once the coin-5 row is full. Adds the "any order" row and fills it cell by cell (three arrows per cell: from 1, 2 and 5 to the left), ending at 128. The mix strip switches to **total 3**: table "1+1+1, 1+2" against any order "1+1+1, 1+2, 2+1", with "2+1" outlined as "same coins, new order". One-shot; disabled after, and the row persists into the reveal |

Why controls 3 and 4 are not jumps: each fills one row of the algorithm, cell by cell, using only cells already on the stage. Neither can run before the row above it exists. One row per coin kind is the idea itself ("adding coins one kind at a time"). No control shows the 10 cell without building the rows that produce it. QA re-queries enabled state before each press, so controls that become enabled in order are reached (`tests/qa/contract.spec.ts`, step 3). All 5 controls exist at first render, disabled while `locked`.

QA path: Fill one cell (coin 1, total 1 = 1) · Fill the 1-coin row (all 1s) · Add the 2-coin row (… 6) · Add the 5-coin row (… 10; the mix strip shows 10 stacks) · Let order matter (any-order row to 128; the total-3 strip shows the double count). Both milestones are reached.

## States
- **Predict:** the header 0–10, the "none" row, column 0 of each coin row (1s), and every other cell blank. The 10 cell shows "?". The formula line and mix strip are empty. Controls disabled.
- **Coin-1 row:** all 1s, one way each (all ones). The mix strip shows one stack.
- **Coin-2 row:** values climb by one every two totals. Each cell's left arrow reaches two cells back.
- **Coin-5 row:** totals from 5 up gain from five cells back. The 10 cell is 6 + 4 = 10, and the strip shows ten different stacks, no two the same coins.
- **Let order matter:** the any-order row runs ahead: 9 at 5, 26 at 7, 128 at 10. At total 3 the strip shows 1+2 and 2+1 counted separately.
- **Reveal:** stage unchanged: the full table, the any-order row and the total-3 strip. Reveal text (≤ 90 words), quoting the learner's cells: "Your table reached 10 at total 10: 6 ways without a 5, plus 4 that use one more 5. Adding one coin kind per row builds every mix in one fixed order, so each mix is counted once. When order mattered, the same coins in a new order counted again (1+2 and 2+1 at total 3), and your row climbed to 128."

Milestones (`minInteractions=2`): `ten-filled` (the coin-5 row's 10 cell filled), `orders-counted` (the any-order row filled). The brief unlocks at the 10 cell. This spec also requires the any-order row, because the reveal quotes 128, and the reveal may quote only states the learner reached. If the learning designer prefers to unlock at the 10 cell, drop `orders-counted` and cut the 128 sentence unless that row exists.

## Shown, not told
The 10 is read off the learner's own cell, built from the two cells the arrows point at, and the ten stacks are the ten mixes. The over-count is shown at a size a person can check (total 3: two mixes against three sequences), and the 128 is the learner's own row. The reveal only names the rule (one coin kind per loop).

## Colour and access
Coin glyphs differ in **size and printed value** (5 large, 2 medium, 1 small). Hue is not the cue. Filled cells `--bg-2` with `--fg` numbers; the just-filled cell outlined `--fg` 2 px. Arrows `--muted`, with the active pair in `--fg`. "Any order" row values in `--warn` text (text-safe). The outlined "2+1" stack uses a dashed `--bad-fill` border plus its caption. The table is a real `<table>` with row and column headers, so screen readers read "coins 1, 2, 5, total 10: 10". The 10 cell is ~30 px wide but is not a control, so the 44 px rule does not apply to cells; all controls are 44 px (`.tap`). No illustration (CS).
