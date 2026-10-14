# Spec: ties-keep-their-order

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #1 · wireframe: `ties-keep-their-order.svg`

**Format: Side-by-side comparison** (as briefed). Both lanes start from the same four cards in the same order, and the only thing that differs is the method. Running both at once keeps "same list, same key" true on the stage. The difference the learner has to see is one moment: a swap throws Ana past Cal. Two panels sharing the cards show that moment beside a lane where it never happens.

## Designer's node check (2026-10-14, re-run of the brief)
Start: Ana (B), Ben (A), Cal (B), Dee (A); sort by grade, A before B.
- Slide left past higher grades only (insertion): step 1 `Ben Ana Cal Dee` · step 2 `Ben Ana Cal Dee` (Cal stays: Ana is not higher) · step 3 `Ben Dee Ana Cal`. Inside B: **Ana, Cal**.
- Swap the first smallest remaining into the front (selection): swap 1 `Ben Ana Cal Dee` · swap 2 `Ben Dee Cal Ana` (Ana goes from 2nd to 4th, past Cal) · swap 3 `Ben Dee Cal Ana` (Cal is already the smallest; swap with itself). Inside B: **Cal, Ana**.
The brief's outputs are correct. Note: after step 1 the two lanes are **identical** (`Ben Ana Cal Dee`). The divergence happens only on swap 2, so the QA path must reach swap 2 (it does, below).

**Title:** the title must not state the outcome. The slug "ties-keep-their-order" states only the stable half and pushes toward option A, so it must not be the card title. Proposed title: "Who leads the Bs?"

## Stage at 390×844 (~300 px at predict, ~470 px in explore)
1. Model line (muted): "Same four cards. Sort by grade only, A before B." (10 words)
2. **Two lanes**, side by side, each ~175 px wide. Lane header (muted, ≤ 6 words): left "Slide left past higher grades", right "Swap smallest grade to front". Method names (insertion, selection, stable) appear only in the reveal.
3. Each lane is a **trail**: the start row, then one row per step (at most 4 rows × 40 px). A card is 38 × 34 px: name on top, grade large, and a small badge with its **original position** (1–4). The B cards also differ in fill: Ana solid, Cal hatched (the brief's "ties coloured by original position"; the badge carries it, so colour is never the only cue). The A cards are outlined, no fill.
4. In each new row the moved card has a short arrow from its old slot. When a card moves past a card **with the same grade**, both are outlined in `--bad` and the row gets a 3-word tag: "Ana passed Cal".
5. Under each lane, a result line: "Inside B: ?" until the lane is finished, then "Inside B: Ana, Cal · name order kept" or "Inside B: Cal, Ana · name order lost".

Stage words: model line 10 + lane headers 9 + the 3-word passing tag = 22. The result lines are readouts and are not counted.

## Controls, in DOM order (3)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control `.tap` | "Slide next card" (left lane) | one insertion step: the next card slides left past every card with a **higher** grade, never past an equal one. Adds one row to the left trail. Disabled after step 3 |
| 2 | Control `.tap` | "Swap smallest to front" (right lane) | one selection step: the first card with the smallest grade in the unsorted part swaps with the front of that part. Adds one row to the right trail. Disabled after swap 3 |
| 3 | Control `.tap` | "Both: rest of the steps" | runs every remaining step of both lanes, appending each row as the step buttons would (≤ 120 ms per row, ≤ 360 ms; instant under reduced motion). Disabled when both lanes are finished |

Control 3 is not a jump: it adds the same rows, in order, and the result lines appear only after the last row. The pass ("Ana passed Cal") is drawn in its own row and stays on the stage. Controls 1 and 2 sit under their own lanes (~165 px wide each), and control 3 is full width below both. All three exist at first render, disabled while `locked`.

QA path: Slide (left row 1: `Ben Ana Cal Dee`) · Swap (right row 1: the same order, so the lanes look alike) · Both: rest (left rows 2–3 end `Ben Dee Ana Cal`; right row 2 is tagged "Ana passed Cal", and the lane ends `Ben Dee Cal Ana`). Both milestones are reached.

## States
- **Predict:** both lanes show only the start row `Ana Ben Cal Dee` with badges 1–4. The result lines read "Inside B: ?". No sorted order appears anywhere on the stage. Controls are disabled.
- **Explore, step 1 in each lane:** Ben moves to the front in both. The lanes agree, which is what the misconception expects.
- **Left steps 2–3:** Cal stays put (no higher grade on its left; the row shows Cal with a small "stays" mark). Then Dee slides past Cal and Ana and stops behind Ben. Ana (1) is still ahead of Cal (3).
- **Right swap 2:** Dee swaps with Ana. Ana's arrow jumps over Cal, both are outlined, and the row is tagged "Ana passed Cal". Swap 3: Cal swaps with itself (the row repeats, with "already smallest").
- **Reveal:** stage unchanged: both full trails with both result lines. Reveal text (≤ 90 words), quoting the rows the learner reached: "Both lanes put the As before the Bs. Sliding never moved a card past an equal one, so the Bs kept name order: Ana, Cal. On swap 2, swapping threw Ana past Cal: Cal, Ana. A sort that never lets equal items pass is called stable (sliding is insertion sort; swapping is selection sort). That is why sorting a spreadsheet by name and then by grade keeps names in order inside each grade."

Milestones (`minInteractions=2`): `slide-done` (left lane finished), `swap-done` (right lane finished).

## Shown, not told
The learner watches the same first move happen in both lanes, then sees one swap carry Ana over Cal in their own right-hand lane, and the result lines read the two B orders off the trails. The reveal only names it: stable, insertion, selection. The spreadsheet sentence matches what the left result line already says ("name order kept").

## Colour and access
A cards: `--line` outline on `--bg-2`. B cards: `--warn-fill` with `--bg` ink; Ana solid, Cal hatched, plus the position badge. Passing outline is `--bad-fill` with the tag text in `--bad`. Arrows are `--fg`. Each trail row has an `aria-label` ("Swap 2: Ben, Dee, Cal, Ana. Ana passed Cal"). Controls 44 px high (`.tap`).

## Notes for the builder
No randomness. The selection step must pick the **first** smallest (strict less-than), or swap 2 changes; this is the rule the brief's script used. No illustration (CS).
