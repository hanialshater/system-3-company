# Number & Algebra briefs (cm-math-algebra)

Ranked briefs for this strand, in the same format as `math.md` (`### N. slug · concept: <id> · level · demand N`). `tools/claim.mjs next math` hands these out after the domain's own list. Check every brief's answer in node before adding it.

## Wave J (cm-math, 2026-10-14)

Five new concepts, none taught yet (`npm run company -- coverage math` showed 72/72 covered, so every concept below is new to the map and added to `content/curriculum/math.json` with `subarea: "algebra"`). Ranked demand 3 first, then by prerequisite order. Every number is recomputed by `node company/domains/briefs/checks/math-wave-j-check.mjs` (labels A1 to A5); a fact-checker needs no web access for any learner-facing claim. Dedupe: grepped `src/demos/**/meta.json` and every `company/domains/briefs/*.md` for equals sign, both sides, divide by zero, inequality, proportional, geometric series; `node tools/overlap.mjs` lists no pair on these concepts.
Shared build rules for this batch (demo-standard): stage text ≤ 25 words at any moment; reveal ≤ 90 words and fits with its picture at 390×844 (stage-top crop 0 px); every SVG label ≥ 10 px (numbers on the stage 12 px); tap targets ≥ 44 px (`.tap`). Every control is a preset button or a Step, never a slider whose range must be swept. **QA path:** pressing each control once in DOM order, waiting 450 ms, reaches every milestone, including the question's own case; the control order below is the DOM order. The chip for the state already on screen is drawn active and disabled, so no enabled press is a no-op. Reveal values are recorded when their milestone fires, so Reset cannot change them.

### 1. the-equals-sign-balances · concept: equals-as-balance · intro · demand 3 · format: Single card
- Learner knows: adding whole numbers; the equals sign from school sums / does not know: that "=" says the two sides are the same amount, not "the answer comes next".
- Misconception: "=" is an instruction to write the answer, so in 8 + 4 = □ + 5 the box is 12 (the sum so far) or 17 (all the numbers added). (Rationale, not learner text: the open-equation item reported by Falkner, Levi & Carpenter 1999, *Teaching Children Mathematics* 6(4); not checked, never quoted.)
- Prediction (stage text ≤ 25 words): "8 + 4 = □ + 5. What number goes in the box?" options: A. 7 / B. 12 / C. 17 (answer: A). All three options are numbers.
- Check (A1): box 7 gives 12 = 12 (true); box 12 gives 12 vs 17 (false); box 17 gives 12 vs 22 (false).
- Stage: a balance beam. Left pan: 8 blocks and 4 blocks (two labelled stacks). Right pan: the box and 5 blocks. Under the beam, a readout "left 12 · right 17". Controls in DOM order: "Box = 12", "Box = 17", "Box = 7", Reset. Each chip fills the box with that many blocks, tips the beam towards the heavier side and updates the readout. The locked frame shows the box empty and the beam drawn level-less (resting on its stop), so no value is pointed to.
- Milestones: (1) the beam tipped with a wrong value in the box (record which: 12 or 17, and the right total); (2) the beam level with 7. QA path: chip 1 fires (1), chip 3 fires (2).
- Reveal (draft, 72 words; {w} and {w+5} are the first wrong value the learner tried and its right total): "With {w} in the box the right side came to {w+5}, and the beam tipped: {w+5} is not 12. With 7 it went level, 12 on both sides. The equals sign does not mean 'the answer comes next'. It says both sides are the same amount, like a level beam. So 8 + 4 = 7 + 5 is true, and reading left to right is only one way to check it."
- Phone fit: beam stage ≤ 220 px tall, one chip row, reveal 72 words.
- Planned claims:
  1. 8 + 4 = 12 and 7 + 5 = 12, so 8 + 4 = 7 + 5. support: derivation; source: arithmetic (A1).
  2. With 12 or 17 in the box the right side is 17 or 22, not 12. support: derivation; source: A1.
  3. "a = b" states that a and b are the same number (the meaning of equality). support: definition; source: derivation.
- curriculum: `{"primary":"math:equals-as-balance","also":[],"prerequisites":[],"level":"intro","strand":"algebra","references":[],"tags":["algebra","equations","equals-sign"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: `math/six-students-per-professor` turns words into an equation (what the letters mean); this one is about what "=" means. `lifehacks` and `economics` lessons use equations but never ask what the sign says. No lesson draws a balance.

### 2. adding-squashes-the-photo · concept: multiplicative-scaling · intro · demand 3 · format: Single card
- Learner knows: width and height of a rectangle; multiplying by 1.5 / does not know: that a shape is kept by keeping the ratio of its sides, so each side is multiplied by the same number, not increased by the same amount.
- Misconception: to enlarge a 4 by 6 photo without distorting it you add the same amount to each side (6 by 8). (Rationale, not learner text: additive reasoning in ratio tasks, Hart 1981, *Children's Understanding of Mathematics 11–16*, "Mr Short and Mr Tall"; not checked, never quoted.)
- Prediction (stage text ≤ 25 words): "A 4 by 6 photo is enlarged so its short side is 6. To keep the same shape, its long side must be…" options: A. 8 / B. 9 / C. 12 (answer: B).
- Check (A2): 6 ÷ 4 = 1.5, so the long side is 6 × 1.5 = 9; ratio 9 ÷ 6 = 1.5 = 6 ÷ 4. Adding 2 gives 6 by 8, ratio 1.33; adding 4 gives 8 by 10, ratio 1.25; × 2 gives 8 by 12, ratio 1.5.
- Stage: the 4 by 6 photo (a simple face drawn inside it so distortion is visible) anchored at its bottom-left corner, with a dashed ray from that corner through the original top-right corner. The enlarged photo is drawn over it, corner dot on or off the ray. Readout: "6 by 8 · long ÷ short = 1.33". Controls in DOM order: "+2 each side", "×1.5 each side", "+4 each side", "×2 each side", Reset.
- Milestones: (1) an added enlargement seen off the ray; (2) a multiplied enlargement seen on the ray with short side 6 (the question's case, 6 by 9). QA path: chips 1 and 2 fire both.
- Reveal (draft, 72 words): "Adding 2 to each side gave 6 by 8: the corner left the dashed line and the face went wide, because 8 ÷ 6 is 1.33, not 1.5. Multiplying each side by 1.5 gave 6 by 9, and the corner stayed on the line. A shape is kept by its ratio, so every side is multiplied by the same number. Adding the same amount grows the short side by a bigger share."
- Phone fit: the largest frame (8 by 12) sets the stage scale; at 18 px per unit the stage is 220 px tall.
- Planned claims:
  1. 4 by 6 enlarged so the short side is 6 keeps its shape only at 6 by 9 (ratio 1.5). support: derivation; source: A2.
  2. 6 by 8 has ratio 1.33 and 8 by 10 has 1.25, not 1.5. support: derivation; source: A2.
  3. Two rectangles have the same shape exactly when their side ratios are equal; then their top-right corners lie on one line through the shared bottom-left corner. support: derivation (similar triangles); source: geometry.
  4. Adding the same amount d to sides a < b raises the short side by d/a and the long side by d/b, a bigger fraction of the short side. support: derivation.
- curriculum: `{"primary":"math:multiplicative-scaling","also":["math:similar-triangles"],"prerequisites":["math:multiplication-as-area"],"level":"intro","strand":"algebra","references":[],"tags":["ratio","proportion","scaling"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: `math/double-the-size` shows area grows by the square of the scale factor (it assumes the shape is kept); `math/shadow-height` uses equal ratios to find a height. This one is the step before both: why "keep the shape" means multiply, not add.

### 3. divide-six-by-zero · concept: division-by-zero · intro · demand 3 · format: Single card
- Learner knows: 6 ÷ 2 = 3 and that division asks "how many of these make that" / does not know: why 6 ÷ 0 has no answer, rather than being 0 or "infinity".
- Misconception: 6 ÷ 0 = 0 (dividing by nothing leaves nothing), or it is a very large number called infinity.
- Prediction (stage text ≤ 25 words): "Division asks how many scoops fill the jug. What is 6 ÷ 0?" options: A. 0 / B. Infinity / C. No number works (answer: C). Builder: keep the three options in plain words of similar length; "No number works" must not be the only option with a full sentence (write A as "It is 0", B as "It is infinity").
- Check (A3): scoops of 3, 1, 0.5 and 0.1 fill 6 in 2, 6, 12 and 60 scoops. For any number q, q × 0 = 0 (checked for 1, 10, 100, 1,000,000), never 6, so no q satisfies q × 0 = 6.
- Stage: a jug marked 0 to 6 and a scoop drawn at its size. Controls in DOM order: "Scoop 3", "Scoop 1", "Scoop 0.1", "Scoop 0", "Check: ? × 0", Reset. A size chip pours scoops until the jug is full and shows "6 ÷ 0.1 = 60 scoops". "Scoop 0" pours and the counter climbs to "1,000 scoops: 0 of 6 filled" (one Step-free animation that settles within 450 ms, or jumps straight to the 1,000 state). "Check" shows three lines: "6 × 0 = 0", "1,000 × 0 = 0", "1,000,000 × 0 = 0".
- Milestones: (1) two non-zero scoop sizes seen (counts grow as scoops shrink); (2) the zero scoop poured; (3) the check shown. QA path: chips 1, 2, 4, 5 fire all three.
- Reveal (draft, 71 words): "6 ÷ a scoop size asks how many scoops fill the jug. Your scoops of 3, 1 and 0.1 took 2, 6 and 60: smaller scoops, more of them, with no ceiling. A scoop of 0 filled nothing after 1,000 tries, and the check showed why: any number times 0 is 0, never 6. So 6 ÷ 0 is not 0, and no huge number works either. It is left undefined." (Builder: name only the scoop sizes the learner pressed.)
- Phone fit: jug ≤ 200 px tall beside the counter; one row of 5 chips wraps to two rows at 390 px; check lines are part of the counter panel.
- Planned claims:
  1. 6 ÷ 3 = 2, 6 ÷ 1 = 6, 6 ÷ 0.5 = 12, 6 ÷ 0.1 = 60. support: derivation; source: A3.
  2. a ÷ b is the number q with q × b = a. support: definition; source: arithmetic.
  3. q × 0 = 0 for every number q, so no q gives q × 0 = 6; 6 ÷ 0 is undefined. support: derivation.
  4. As the scoop size shrinks towards 0, 6 ÷ size grows without bound, so no single number is the answer. support: derivation (6 ÷ s > N whenever s < 6/N).
- curriculum: `{"primary":"math:division-by-zero","also":["math:fractions-as-division"],"prerequisites":["math:fractions-as-division"],"level":"intro","strand":"algebra","references":[],"tags":["division","zero","number-sense"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: `math/scoops-in-three-cups` divides by a fraction with the same scoop picture; this one pushes the scoop to 0 and shows the answer escaping. Build after it if both are in flight, so the scoop drawing is reused.

### 4. minus-one-flips-the-order · concept: inequality-sign-flip · core · demand 2 · format: Single card
- Learner knows: negative numbers on a number line; "2 < 5" / does not know: why multiplying both sides of an inequality by a negative number flips the sign while adding or multiplying by a positive keeps it.
- Misconception: an inequality behaves like an equation: do the same to both sides and it stays true as written, so 2 < 5 gives −2 < −5.
- Prediction (stage text ≤ 25 words): "2 < 5. Multiply both sides by −1. Which is true?" options: A. −2 < −5 / B. −2 > −5 / C. −2 = −5 (answer: B).
- Check (A4): ×2 gives 4 and 10 (4 < 10); −3 gives −1 and 2 (−1 < 2); ×(−1) gives −2 and −5 (−2 > −5); ×(−2) gives −4 and −10 (−4 > −10).
- Stage: a number line −10 to 10 (ticks every 1, labels every 5 at 10 px, about 17 px per unit at 390 px), a circle at 2 and a square at 5 (shape tells them apart, not colour), and a readout "circle 2 < square 5". Each chip applies to the original pair (not cumulative), animates the two dots along arcs to their new places and rewrites the readout with the true sign. Controls in DOM order: "× 2", "− 3", "× (−1)", "× (−2)", Reset.
- Milestones: (1) a change that keeps the order (×2 or −3); (2) the question's case ×(−1), with the circle now right of the square. QA path: chips 1 and 3.
- Reveal (draft, 67 words): "Times 2 moved the dots to 4 and 10, and the circle stayed on the left. Times −1 mirrored both through 0: the circle landed on −2 and the square on −5, to its left. So −2 > −5. Multiplying by a negative mirrors the line, and a mirror swaps left and right, so the sign flips. Adding, subtracting or multiplying by a positive keeps the order."
- Phone fit: one number line band ≤ 120 px tall plus the readout.
- Planned claims:
  1. 2 × (−1) = −2 and 5 × (−1) = −5, and −2 > −5. support: derivation; source: A4.
  2. If a < b and c < 0 then ac > bc; if c > 0 then ac < bc; a + c < b + c for every c. support: derivation (b − a > 0, so (b − a)c < 0 when c < 0).
  3. Multiplying by −1 reflects the number line through 0. support: derivation.
- curriculum: `{"primary":"math:inequality-sign-flip","also":["math:negative-numbers"],"prerequisites":["math:negative-numbers"],"level":"core","strand":"algebra","references":[],"tags":["inequalities","negative-numbers","algebra"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: `math/minus-times-minus` shows why (−)(−) = + with patterns; `math/plus-and-minus-chips` adds signed chips. Neither touches order; this one shows the mirror that flips an inequality.

### 5. quarters-add-to-a-third · concept: geometric-series-quarters · core · demand 1 · format: Single card with Step
- Learner knows: 1/2 + 1/4 + 1/8 + … gets ever closer to 1 (`math/zeno-half-steps`) / does not know: that the quarters series 1/4 + 1/16 + 1/64 + … approaches 1/3, and that a picture with three equal colours proves it.
- Misconception: an endless sum of quarters heads for 1/2 (a quarter is half of a half, so the sum is half of the halves series) or for some untidy number like 3/8.
- Prediction (stage text ≤ 25 words): "1/4 + 1/16 + 1/64 + … forever. What does the total get closer and closer to?" options: A. 1/2 / B. 3/8 / C. 1/3 (answer: C).
- Check (A5): partial sums 0.25, 0.3125, 0.328125, 0.33203125, 0.3330078125, 0.333251953125 after 1 to 6 terms; 1/3 − sum after n terms = (1/3)(1/4)^n. At each level the corner square splits into 4 equal squares: 3 coloured (one each of three colours) and 1 left to split, so the three colours always cover equal areas and the leftover shrinks to 0.
- Stage: a square. Level n splits the current leftover corner into four; one quarter is filled solid (the series colour, `var(--domain)`), one hatched, one dotted, one left blank for the next level. Readout: "Solid: 0.3125 of the square" (4 decimals). Controls in DOM order: "Step" (adds one level), "To level 6", Reset. Locked frame: the plain square, no colours.
- Milestones: (1) at least two levels drawn by Step or preset; (2) level 6 reached (readout 0.3333). QA path: Step then To level 6.
- Reveal (draft, 66 words): "By level 6 the solid pieces covered 0.3333 of the square. At every level the corner split into four: one solid, one hatched, one dotted, one left over. The three patterns always matched, and the leftover corner shrank toward nothing, so each pattern ends with a third of the square. That is 1/4 + 1/16 + 1/64 + … = 1/3, read straight off the picture."
- Phone fit: square 240 px; at level 6 the smallest piece is 240/64 ≈ 3.75 px wide, fine as texture; patterns must still read at level 4 (15 px).
- Planned claims:
  1. 1/4 + 1/16 + … + 1/4^6 = 0.333251953125 (shown 0.3333). support: derivation; source: A5.
  2. 1/3 − (1/4 + … + 1/4^n) = (1/3)(1/4)^n, which goes to 0. support: derivation (geometric series a/(1 − r) with a = r = 1/4).
  3. At every level the three coloured pieces are equal squares, so each pattern covers the same total area. support: derivation (construction).
- curriculum: `{"primary":"math:geometric-series-quarters","also":["math:infinite-series-halves"],"prerequisites":["math:infinite-series-halves"],"level":"core","strand":"algebra","references":[],"tags":["series","visual-proof","fractions"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: `math/zeno-half-steps` sums halves to 1 by walking; this one gets a non-obvious limit (1/3) from symmetry alone, a proof without words. The overlap is the idea of a limit, not the insight.
