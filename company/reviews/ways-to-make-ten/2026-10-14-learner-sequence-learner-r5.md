*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r5 wave, first learner review): ways-to-make-ten
lesson version: v2
boundary (from meta.json learner field): knows filling a table from smaller cases (the blocked-cell-routes lesson); does not know that counting combinations means fixing an order of coins, or that adding one coin kind at a time counts each mix once. (Filename tag "sequence-learner": this learner arrives from blocked-cell-routes.)
Screenshots seen: yes (artifacts/walkthroughs/ways-to-make-ten/sheet.png, 7 frames)
Verdict: revise

Process note: I looked up the boundary, version and status in meta.json before writing section 1 (I needed the boundary, as there is no earlier review). I read only the learner field, version, status and claim statuses, not the brief's objective or build.md. My section 1 findings were formed from the transcript and sheet before that lookup.

## 1. From the artifact

- Predict: the hook says "Coins 1, 2 and 5 can make 10 in one count, or in 128 if you count the order too." That tells me 128 is the order-counting answer, so with the question's "1+2 is the same as 2+1" I can strike 128 before thinking. And "make 10 in one count" is garbled: it can be read as "10 ways in one way of counting", which leaks the answer 10. Either reading, the hook does the prediction's work. The question itself is clear (5+5 and 2+2+2+2+2 count; order doesn't).
- Locked stage: a full empty table with "?" in the target cell; the caption "Each cell: ways without this coin (above) plus ways using one more (c cells left)" is the rule in compressed form. For a learner who has filled a routes table, the shape is familiar; "c cells left" is cryptic ("c" is never said to be the coin's value).
- Explore: "Fill one cell" shows the arrow pair (above + c left) with the sum "0 above + 1 one left = 1". "Fill the 1-coin row": all 1s. "Add the 2-coin row": 1 1 2 2 3 3 4 4 5 5 6, "1 above + 5 two left = 6", and below the table tiny coin-glyph groups for each mix. "Add the 5-coin row": ends at 10, "6 above + 4 five left = 10", and ten coin groups. The ten groups are the best thing here: I can count the mixes. But on phone the glyphs are a few pixels each; I can count groups, not read them.
- "Let order matter" adds an "any order" row (1 1 2 3 5 9 15 26 44 75 128) with "75 + 44 + 9 = 128". The rule for this row (sum of the cells 1, 2 and 5 to the left) is never stated; the caption at the top still describes the other rule. The total-3 comparison ("Table, total 3: 2 ways / Any order, total 3: 3 ways / 2+1: same coins, new order") is the right picture for "why order inflates the count", but it is tiny and its label is clipped ("2+1: same coins, n").
- Where understanding broke: the key idea, "adding one coin kind per row builds every mix in one fixed order, so each mix is counted once", is in the reveal only. On the stage, I watched numbers add up; nothing showed that a row never puts a 2 after a 5, i.e. that each mix is built in one fixed order.
- Reveal: 6 + 4 = 10 and 128 match the stage. Readable.
- Chip says DRAFT; trust link reads 0/5 claims checked.

## 2. Earlier findings

No earlier learner review exists (only 2026-10-14-fact-check.md).

## 3. Notes against the learner field

- meta.json lists 5 verified claims, but the served build shows 0/5 and DRAFT; the build on port 3450 may predate the fact-check. Route to product-owner/fact-checker to confirm.
- The doesNotKnow "counting combinations means fixing an order of coins" is the idea most told and least shown.

## 4. What would move this to launch

- Top: fix the hook. Remove "128" and the "in one count" phrasing (e.g. "Coins 1, 2 and 5. How many different mixes make 10?").
- Show the fixed order: when a 2-coin row cell is filled, draw its mixes as "1s first, then 2s" (e.g. 1+1+2+2+2+2) and, at "Let order matter", show the same mix in a reordered form (2+1+2...) flagged as "new order, counted again".
- Make the coin glyphs large enough to read on phone, or show three or four mixes at a time.
- State the any-order row's rule on stage when it appears ("any order: add the cells 1, 2 and 5 to the left").
- Say what "c" is ("c = the coin's value").
- No FATAL.
