*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): ways-to-make-ten
lesson version: v3
boundary: knows filling a table from smaller cases (lesson blocked-cell-routes); does not know that counting combinations means fixing an order of coins, or that adding one coin kind at a time counts each mix once. (Tag "sequence-learner", as in r5.)
Screenshots seen: yes (artifacts/walkthroughs/ways-to-make-ten/sheet.png, 7 frames)
Verdict: launch

## 1. From the artifact
- Hook and title are neutral and fit. Predict: 4 / 10 / 128, and the stem rules out order ("1+2 is the same as 2+1"). The option 128 later turns out to be the "order matters" count, which is a good distractor. The locked stage shows the empty table (none row 1,0,0..., first column 1s, "?" at the end). Nothing leaks.
- Where it first got hard: the stage rule "Cell = ways above (no coin c) + ways c cells left (one more c). c = the coin." is dense notation at the very start. I could follow it only after "Fill one cell" drew the two arrows (above, and c cells left) into the new cell with "0 above + 1 one left = 1". Once those arrows appear, the rule is clear.
- Explore: filling rows coin by coin, the arrows and the sum line ("1 above + 5 two left = 6", "6 above + 4 five left = 10") make the recurrence visible at the cell I care about. The mix strip under the table shows actual coin piles in fixed order (1s, then 2s, then 5s), which stands for "each mix built one way". "Let order matter" adds a row that climbs 1, 1, 2, 3, 5, 9 ... 128, and an inset at total 3 shows 2+1 dashed in red as "new order, counted again". That is the contrast the lesson is about, on stage.
- Legibility: the table is 12 columns of small digits, and the coin-pile strip and the "Table, total 3" inset are very small text on a phone frame. The red "2+1: new order, counted again" is the key label and it is tiny.
- Text: at step 5 the stage holds the rule line, the sum line, two inset captions and the red label, which is over the 25-word budget.
- Reveal: "6 ways without a 5, plus 4 that use one more 5" and "1+2 and 2+1 at total 3 ... 128" both point at things I saw. The reveal is short.

## 2. Earlier findings (v2 review, r5)

1. Hook leaked 128 / "in one count": **fixed**. It is now "Coins 1, 2 and 5. How many different mixes make 10?"
2. Fixed coin order not shown, only told: **fixed**. The mix strip is captioned "in one order: 1s, 2s, 5s", and "Let order matter" shows 2+1 dashed in red as "new order, counted again".
3. Coin glyphs too small to read on a phone: **not fixed**. The strip and the total-3 inset are still very small. Now should-fix, not blocking, because the captions carry the meaning.
4. Any-order row's rule not stated: **fixed** ("Any order: add the cells 1, 2 and 5 to the left in this row").
5. "c" undefined: **fixed** ("c = the coin").
6. Clipped "2+1" label: **fixed** (shown in full).
7. DRAFT / 0/5 claims: the chip now reads 6/6 claims checked. Status is not my call.

## 3. Show the why you promised

Both doesNotKnow items have stand-ins on stage. "Fixing an order of coins" is the mix strip's fixed 1s-then-2s-then-5s piles. "One coin kind at a time counts each mix once" is the row-by-row build, with arrows and the sum line at the target cell. The reveal points at both ("6 ways without a 5, plus 4 that use one more 5"; "1+2 and 2+1 at total 3").

## 4. New findings

- Should fix: legibility of the mix strip and the total-3 inset on a phone (carried over from r5).
- Minor: stage text at step 5 is over the 25-word budget.
- Minor: the opening rule line is dense until the first arrows appear. Consider showing it only after "Fill one cell".
- No FATAL.
