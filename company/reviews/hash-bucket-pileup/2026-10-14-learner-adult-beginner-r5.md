*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): hash-bucket-pileup
lesson version: v2
boundary: an adult who uses a phone and a laptop daily and has never programmed; comfortable with everyday apps and basic arithmetic.
Screenshots seen: yes (artifacts/walkthroughs/hash-bucket-pileup/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: "Ten slots fill up fast", with the hook "How soon do two keys land in the same slot?" The question defines a hash table in one line, which is right for the boundary. 2 / 5 / 9 split intuitions well: 9 is the "fill it up first" belief. The title "fill up fast" leans towards the low answers. That is a mild leak, but it doesn't pick between 2 and 5. The locked stage (empty row, empty histogram) leaks nothing.
- Explore: "Next key" drops key 1 into slot 4. "Drop until a collision" fills to key 4 and marks the shared slot red ("Collision at key 4!"). The histogram ("key number that first collided") gets a bar. "+20 tables" fills it: by key 4: 11, by key 5: 15, of 21. The picture of keys stacking in one slot while most slots are empty is clear and does the work.
- Reveal: "In your 21 tables, 15 had a collision by key 5" was seen. "1 × 0.9 × 0.8 × 0.7 = 0.504" is told. Only the 0.504 itself appeared on stage, in a caption, and the shrinking factors were never shown. "A 70% chance of a collision with half the slots still empty" was seen as 15/21 and in the picture.
- Snags:
  - My own run showed 11 of 21 tables collided by key 4, which is more than half. The reveal says that at 4 keys a collision is "just under even". With no word about sampling noise, a careful learner sees their data contradicting the reveal.
  - The caption "Chance 4 random keys all land in different slots: 0.504" appears at the very moment four keys did not land in different slots, so it reads as a contradiction.
  - The step-1 caption "Chance 1 random key all land in different slots: 1" is awkward.
  - In the histogram the tallest bar's count label (key 4) is hidden behind the summary text line, and red vs grey bars are not explained. It reads as "by key 5" vs "later", but that is never said.

## 2. Earlier findings (2026-10-13 review, v1, verdict revise)

1. Chart axis and colours unlabelled: **axis fixed** ("key number that first collided (bar height: tables)"); **colours not fixed** (red vs grey still unexplained, minor).
2. No running total, so the question can't be answered from the stage: **fixed**. "Collided by key 4: 11. By key 5: 15." is a running total, and 15 of 21 is readable as more than half.
3. 15-of-21 and every probability told: **mostly fixed**. Bar counts and the running total are on stage, and the 0.504 / 0.1512 no-collision chances appear in captions. The multiplying chain is still told (new finding 2).
4. "Hash table" ungrounded; HashMap jargon: **fixed**. A one-line definition is in the question, and HashMap is gone from the reveal.
5. Nothing explains that tables vary: **not fixed**. It now bites harder, because the running total at key 4 can top half (new finding 1).
6. Reveal clipped at the card bottom: **fixed**. It fits on phone.

## 3. New findings

1. Minor: the reveal's "just under even at 4 keys" can contradict the learner's own tables (here 11/21 by key 4). One line would fix it, for example "your tables wobble; the exact chance is 0.504 that none collide".
2. Minor: the "0.9 × 0.8 × 0.7" chain is told. A caption that shows the running product as each key drops ("× 0.9", "× 0.8"...) would put it on stage.
3. Minor: the "all land in different slots" caption at the moment of collision reads as a contradiction. "Before this key, the chance of no collision yet was 0.504" would be clearer.
4. Minor: the histogram's red/grey colours are unexplained, and the tallest bar's label is covered.
5. Routed, not mine: the trust link reads 4/6 claims checked (fact-checker); the 70 s chip (product-owner).
6. No FATAL. The core idea (collisions come early, with half the slots empty) comes from the stage.
