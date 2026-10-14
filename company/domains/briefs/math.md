# Mathematics: ranked lesson briefs

owner: cm-math · written 2026-10-12 · curriculum: `content/curriculum/math.json` (30 concepts)

Ranking logic: demand-3 concepts without a lesson first (portfolio rule), then demand-2 by prerequisite order, then
demand-1 and unusual-format explorations. Existing lessons (not repeated here): exponential-growth, odd-numbers-make-squares.
`place-value` is assumed, not taught (brief 5 relies on it). Every prediction answer below was recomputed; the check is on the line.
Misconception-first vs wonder-first: briefs 1, 3, 4, 8, 19, 20 are wonder-first (the picture is the surprise); the rest are misconception-first.
Nothing here is learning evidence; all confidence is untested until human learners see the lessons.

### 1. two-squares-become-one · concept: pythagoras-by-rearrangement · intro · demand 3
- Learner knows: area of a square is side times side; what a right angle is / does not know: that a^2 + b^2 = c^2, or any proof of it.
- Misconception: Pythagoras is a formula to memorise, with no reason it should be true.
- Prediction: "A right triangle has legs 3 and 4. How long is the long side?" options: 5 / 7 / 3.5 (answer: A). Check: 3^2 + 4^2 = 9 + 16 = 25 = 5^2; 7 would need 49, 3.5 would need 12.25.
- Interaction: one square of side a+b holds four identical right triangles; the learner slides the triangles between two arrangements (corners vs. pairs) with one control, and the leftover empty area changes from two squares to one tilted square. Legs fixed at 3 and 4 so areas read 9, 16, 25.
- Payoff: the empty space is the same region either way, so the two small squares must equal the big one.
- Claims to check: (1) Four copies of a right triangle with legs a, b inside a square of side a+b leave empty area a^2+b^2 in one arrangement and c^2 in the other; derivation: (a+b)^2 - 4(ab/2) in both. (2) 3-4-5: 9+16=25, recompute. (3) Rearrangement proof is classical (Euclid I.47 is a different proof; this dissection appears in Nelsen, Proofs Without Words, p. 3).

### 2. fifty-up-fifty-down · concept: percent-change-asymmetry · intro · demand 3
- Learner knows: what a percentage of a number is / does not know: that percent changes multiply rather than add.
- Misconception: a 50% rise followed by a 50% fall gets you back to where you started.
- Prediction: "A price of 100 rises 50%, then falls 50%. Where does it end?" options: 100 / 75 / 125 (answer: B). Check: 100 x 1.5 = 150; 150 x 0.5 = 75.
- Interaction: a rectangle with width (1 + p) and height (1 - p); the learner drags p from 0 to 100% and sees the area, which is the final price, shrink below the starting unit square. No text on stage beyond the percentage readout.
- Payoff: the gain and loss are percentages of different bases, and (1+p)(1-p) = 1 - p^2 is always below 1.
- Claims to check: (1) (1+p)(1-p) = 1 - p^2 (expand). (2) p = 50%: 1.5 x 0.5 = 0.75. (3) p = 10%: 1.1 x 0.9 = 0.99, a 1% net loss (recompute). 

### 3. gauss-staircase · concept: triangular-numbers · intro · demand 3
- Learner knows: adding whole numbers / does not know: the pairing trick or the closed form n(n+1)/2.
- Misconception: adding 1 to 100 needs 100 separate additions, with no shortcut.
- Prediction: "What is 1 + 2 + 3 + ... + 10?" options: 50 / 55 / 110 (answer: B). Check: 10 x 11 / 2 = 55 (also pairs 1+10, 2+9, ... five pairs of 11).
- Interaction: a staircase of dots with columns 1..n (n slider 3 to 12); a tap flips a copy and snaps it on to make an n by (n+1) rectangle.
- Payoff: two staircases make a rectangle, so one staircase is half of n x (n+1).
- Claims to check: (1) Sum 1..n = n(n+1)/2 (induction or the rectangle count). (2) n = 10 gives 55, n = 100 gives 5050 (recompute). (3) Gauss anecdote is not claimed; leave it out unless sourced.

### 4. circle-slices-to-rectangle · concept: circle-area-unrolled · core · demand 3
- Learner knows: circumference = pi x diameter (assumed from pi-from-rolling) / does not know: the area formula or why it has a radius squared.
- Misconception: a circle of radius r fills about the same area as a square of side 2r, or its area formula is arbitrary.
- Prediction: "A circle of radius 10 sits snugly inside a 20 by 20 square (area 400). About how much of the square does it fill?" options: 25% / 78% / 95% (answer: B). Check: pi x 10^2 = 314.2; 314.2 / 400 = 0.785.
- Interaction: slider for number of slices (4, 8, 16, 32, 64); the slices alternate up and down into a bumpy rectangle whose width approaches half the circumference (pi x r) and height r.
- Payoff: more slices straighten the edge, so area = pi r x r.
- Claims to check: (1) Circumference C = 2 pi r (definition of pi). (2) Rearranged slices approach a rectangle pi r by r (limit; derivation). (3) pi x 100 / 400 = 0.785 (recompute).

### 5. digits-are-logs · concept: logarithm-as-digit-count · core · demand 3
- Learner knows: doubling and place value / does not know: logarithms by name.
- Misconception: a number that doubles 100 times has around 100 digits, or the count of digits is unpredictable.
- Prediction: "How many digits does 2 multiplied by itself 100 times (2^100) have?" options: 21 / 31 / 100 (answer: B). Check: 100 x log10(2) = 30.10, so 31 digits; 2^100 = 1,267,650,600,228,229,401,496,703,205,376 (31 digits).
- Interaction: a doubling counter n (slider 0 to 100) with a growing digit strip; marks show that every 10 doublings (x1024, about x1000) add about 3 digits.
- Payoff: digits grow in a steady line while the number explodes; a logarithm is that digit count.
- Claims to check: (1) 2^10 = 1024. (2) 2^100 = 1267650600228229401496703205376 and has 31 digits (compute with exact arithmetic). (3) log10(2) = 0.30103 (calculator, derivation by 2^10 ~ 10^3).

### 6. seventy-two-doubling · concept: rule-of-72 · core · demand 2
- Learner knows: doubling and percentages / does not know: how growth rate links to doubling time.
- Misconception: at 8% a year, money doubles in 100/8 = 12.5 years (simple interest thinking).
- Prediction: "Money grows 8% a year, compounded. About how long to double?" options: 12.5 years / 9 years / 6 years (answer: B). Check: ln 2 / ln 1.08 = 9.006 years; 1.08^9 = 1.999.
- Interaction: rate slider 1% to 20%; a doubling clock fills; a marker shows 72/rate beside the true time.
- Payoff: simple and compound differ; 72 divided by the rate is a close shortcut.
- Claims to check: (1) 1.08^9 = 1.999 (recompute). (2) Exact doubling time = ln 2 / ln(1+r). (3) 72/r is within about 1 year for rates 4% to 12% (tabulate).

### 7. double-the-size · concept: area-scaling · core · demand 2
- Learner knows: area as tiles covered / does not know: that area scales with the square of length.
- Misconception: doubling every length of a shape doubles its area.
- Prediction: "A 12-inch round pizza vs. a 6-inch one: how many 6-inch pizzas equal the 12-inch in area?" options: 2 / 4 / 3 (answer: B). Check: pi x 6^2 / (pi x 3^2) = 36/9 = 4.
- Interaction: scale slider 1x to 4x on a shape; unit-sized copies tile it and a counter shows k x k copies.
- Payoff: each length doubles in two directions, so area quadruples.
- Claims to check: (1) Area ratio = k^2 for similar plane figures. (2) Circle area pi r^2 with r = 6 and 3 (recompute). 

### 8. nines-without-end · concept: repeating-nine · core · demand 2
- Learner knows: 1/3 = 0.333... (prereq fractions-as-division, infinite-series-halves) / does not know: that 0.999... is a number equal to 1.
- Misconception: 0.999... is a hair less than 1.
- Prediction: "How far is 0.999... (nines forever) from 1?" options: a tiny positive gap / exactly zero / it shrinks but never reaches zero (answer: B). Check: the gap after n nines is 10^-n, below every positive number, so the limit gap is 0; also 3 x 0.333... = 0.999... and 3 x 1/3 = 1.
- Interaction: each tap adds a nine and zooms the number line 10x on the gap to 1; the gap always fills the screen, until the learner asks for "all of them".
- Payoff: no positive gap survives, so the two names are one number.
- Claims to check: (1) Gap after n nines = 10^-n (recompute). (2) 9/10 + 9/100 + ... = 1 (geometric series, sum = a/(1-r) = 0.9/0.9). (3) 3 x (1/3) = 1.

### 9. one-boss-moves-the-mean · concept: mean-vs-median · intro · demand 2
- Learner knows: how to average / does not know: the median as a middle value or why it resists outliers.
- Misconception: the average is the typical person.
- Prediction: "Five salaries (thousands): 30, 35, 40, 45, 50. The top one jumps to 500. What changes?" options: both mean and median / only the mean / only the median (answer: B). Check: mean 40 becomes (30+35+40+45+500)/5 = 130; median stays 40.
- Interaction: five draggable dots on a number line with mean and median markers; the learner drags the largest dot.
- Payoff: the median only cares about order; the mean cares about size.
- Claims to check: (1) mean 40 -> 130 (recompute). (2) median 40 before and after. 

### 10. one-recipe-for-sixty · concept: prime-factorization · intro · demand 2
- Learner knows: multiplication and divisibility / does not know: that every number factors into primes in only one way.
- Misconception: a number can be broken into primes in different ways, depending on where you start.
- Prediction: "How many different prime recipes does 60 have (ignoring order)?" options: 1 / 2 / 3 (answer: A). Check: 6 x 10 = 2x3x2x5; 4 x 15 = 2x2x3x5; 2 x 30 = 2x2x3x5; always 2,2,3,5.
- Interaction: the learner chooses any split at each node of a factor tree; branches end at primes; a tally shows the leaves collected.
- Payoff: every path converges on the same multiset of primes.
- Claims to check: (1) 60 = 2 x 2 x 3 x 5 (recompute). (2) Fundamental theorem of arithmetic (Euclid, Elements VII and IX; Hardy and Wright, ch. 2).

### 11. tear-the-corners · concept: angle-sum-triangle · intro · demand 2
- Learner knows: what an angle and a straight line are / does not know: the angle sum of a triangle.
- Misconception: a triangle's angles depend on its shape; a fatter triangle has more total turn.
- Prediction: "Tear off the three corners of any triangle and line them up around a point. They form..." options: a right angle / a straight line / depends on the triangle (answer: B). Check: alternate angles with a parallel through the apex give a + b + c = 180 degrees.
- Interaction: drag any vertex to reshape the triangle; a tap rotates the three corner wedges to meet along a line. No numbers needed.
- Payoff: whatever the shape, the corners always fill a straight line.
- Claims to check: (1) Angles sum to 180 degrees in the plane (Euclid I.32). (2) Does not hold on a sphere (do not claim in lesson).

### 12. scoops-in-three-cups · concept: fraction-division · core · demand 2
- Learner knows: fractions as parts of a whole (fractions-as-division) / does not know: why dividing by a fraction multiplies.
- Misconception: dividing always makes a number smaller.
- Prediction: "How many 1/4-cup scoops fit in 3 cups?" options: 12 / 3/4 / 7 (answer: A). Check: 3 / (1/4) = 3 x 4 = 12; four scoops per cup.
- Interaction: a tank of 3 cups; a scoop-size control (1, 1/2, 1/3, 1/4, 1/5) re-slices the tank; counter of scoops.
- Payoff: dividing by 1/n asks how many fit, which is n times as many.
- Claims to check: (1) a / (1/n) = a x n (recompute). (2) 3 / (1/4) = 12.

### 13. plus-and-minus-chips · concept: negative-numbers · intro · demand 2 [exploration]
- Learner knows: counting and subtraction / does not know: negatives as cancelling opposites.
- Misconception: a negative number is just a positive one with a sign painted on, with no arithmetic meaning.
- Prediction: "You hold 5 plus-chips and 3 minus-chips. What is the total?" options: 8 / 2 / -2 (answer: B). Check: three plus/minus pairs cancel to zero, leaving 5 - 3 = 2.
- Interaction: no slider and no number line; the learner taps a plus-chip and minus-chip to annihilate them, and can add chips. Exploration format: pure chip manipulation.
- Payoff: a plus and minus chip together are zero, so negatives are debts that cancel.
- Claims to check: (1) p plus-chips and m minus-chips total p - m (recompute). (2) The chip model is standard in teaching integers (cite NCTM; verifier to find a primary source).

### 14. minus-times-minus · concept: negative-times-negative · core · demand 2
- Learner knows: negatives as opposites (brief 13) / does not know why -3 x -2 = 6.
- Misconception: two negatives multiplied should stay negative; "minus times minus is plus" is an arbitrary rule.
- Prediction: "What is (-3) x (-2)?" options: -6 / 6 / -5 (answer: B). Check: the pattern 3x(-2) = -6, 2x(-2) = -4, 1x(-2) = -2, 0x(-2) = 0, (-1)x(-2) = 2, (-2)x(-2) = 4, (-3)x(-2) = 6; each step down adds 2.
- Interaction: the learner steps the first factor down from 3 using a control; products plot as dots in a column, rising by 2 each step through zero.
- Payoff: the pattern must continue unbroken, which forces the positive.
- Claims to check: (1) Each step of the first factor changes the product by +2 (recompute). (2) Consistency with the distributive law forces (-a)(-b) = ab (derivation: (-a)(b + (-b)) = 0).

### 15. thirteen-pigeons · concept: pigeonhole-principle · core · demand 2 [exploration]
- Learner knows: counting / does not know: the guarantee that more items than boxes forces a repeat.
- Misconception: sharing a box is only likely, never certain, with so few items.
- Prediction: "How many people must be in a room to guarantee two share a birth month?" options: 12 / 13 / 24 (answer: B). Check: 12 people can each take a different month; the 13th must repeat a month.
- Interaction: the learner builds the model: drag pigeons into 12 labelled month boxes, trying to avoid any shared box; the 13th will not fit. No slider.
- Payoff: certainty from counting alone, with no probability.
- Claims to check: (1) 12 distinct months exist. (2) n+1 items in n boxes forces a box with two (proof: if all boxes held at most one, there would be at most n items).

### 16. paths-by-adding · concept: pascals-triangle · core · demand 2 [exploration]
- Learner knows: addition / does not know: that route counts add and form Pascal's triangle.
- Misconception: counting routes means listing them all; the counts are too irregular to predict.
- Prediction: "On a 3-by-3 block grid, how many shortest routes go corner to corner (moving only east or north)?" options: 6 / 9 / 20 (answer: C). Check: C(6,3) = 720 / (6 x 6) = 20; also by adding neighbours: the corner values are 1,3,6,10 along the edge and 20 in the end.
- Interaction: the learner taps each intersection to fill its count by adding the two counts before it (the machine checks). Learner builds the model. No slider.
- Payoff: each count is the sum of two, which is how Pascal's triangle grows.
- Claims to check: (1) Routes to a point = routes from west + routes from south. (2) The 3-by-3 count is 20 (enumeration or C(6,3)).

### 17. steeper-is-not-taller · concept: slope-as-rate · core · demand 1 [exploration]
- Learner knows: reading a simple graph / does not know: slope as rise per run.
- Misconception: a line that climbs higher is steeper.
- Prediction: "Ramp A rises 3 over a run of 12. Ramp B rises 2 over a run of 4. Which is steeper?" options: A / B / the same (answer: B). Check: 3/12 = 0.25; 2/4 = 0.5; B is double.
- Interaction: the learner drags the end of a ramp to make it match a target steepness shown only as a car speed on a hidden track; no equation on stage. Exploration: demand 1.
- Payoff: steepness is the ratio, not the height gained.
- Claims to check: (1) slope = rise/run (definition). (2) 3/12 = 0.25 and 2/4 = 0.5 (recompute).

### 18. distance-is-area · concept: area-under-curve · stretch · demand 2
- Learner knows: slope as rate (brief 17) / does not know: that total change is the area under the rate graph.
- Misconception: to find distance you need a formula that mentions position, not speed alone.
- Prediction: "A car speeds up steadily from 0 to 20 m/s over 10 s. How far does it go?" options: 200 m / 100 m / 20 m (answer: B). Check: triangle area = 1/2 x 10 x 20 = 100 m (average speed 10 x 10 s).
- Interaction: a strip-count slider (1 to 20) fills the area under the speed line with bars; the total distance readout approaches 100.
- Payoff: area under a rate is the accumulated amount.
- Claims to check: (1) Distance = integral of speed; for constant acceleration = average speed x time. (2) 0.5 x 10 x 20 = 100 (recompute). (3) Right-sum with 10 strips gives 110 (recompute: sum 2k for k=1..10 = 110 per unit width 1), so the readout must state it overshoots.

### 19. no-fraction-fits · concept: sqrt2-irrational · stretch · demand 2
- Learner knows: the diagonal of a unit square is sqrt 2 (pythagoras-by-rearrangement), proof by contradiction idea / does not know why no fraction equals sqrt 2.
- Misconception: with big enough whole numbers some fraction will hit it exactly.
- Prediction: "Can the diagonal of a unit square be written exactly as a fraction of two whole numbers?" options: yes, with big enough numbers / no, never / only with a calculator (answer: B). Check: if sqrt 2 = p/q in lowest terms then p^2 = 2q^2, so p is even, so q is even too, contradicting lowest terms.
- Interaction: the learner picks q; the lesson shows 2q^2 beside the nearest square (q = 5: 50 vs 49; q = 12: 288 vs 289, off by 1; never equal). Near misses, never a hit. 
- Payoff: 2q^2 is never a perfect square; the near misses are the proof's shadow, and contradiction closes the gap.
- Claims to check: (1) 2 x 12^2 = 288 and 17^2 = 289 (recompute). (2) The parity argument above (derivation). (3) Do not claim the near-miss table proves it; it only illustrates.

### 20. product-plus-one · concept: infinitude-of-primes · stretch · demand 2
- Learner knows: primes and prime recipes (brief 10) / does not know Euclid's argument.
- Misconception: after enough primes you must run out, or the largest known list is complete.
- Prediction: "Multiply the primes 2, 3, 5, 7, 11, 13 and add 1, giving 30031. Which is true?" options: it is prime / it is divisible by one of 2 to 13 / it is composite with a prime factor not in the list (answer: C). Check: 2x3x5x7x11x13 = 30030, so 30031 leaves remainder 1 on division by each; 30031 = 59 x 509.
- Interaction: the learner taps primes into a list (any set), the lesson shows product+1 and its prime factors, always outside the list (2,3,5 gives 31; 2,3,5,7 gives 211; 2,3,5,7,11 gives 2311; all prime).
- Payoff: any finite list misses a prime, so the primes never end.
- Claims to check: (1) 30030 + 1 = 30031 = 59 x 509 (recompute). (2) 31, 211 and 2311 are prime (trial division). (3) Euclid, Elements IX.20. (4) Do not say product+1 is always prime; it is not.

### 21. pentagon-gap · concept: tiling-polygons · intro · demand 1 [exploration]
- Learner knows: shapes and angles / does not know: the 360-degree test for tilings.
- Misconception: if a shape is regular and neat, it must tile a floor.
- Prediction: "Can regular pentagons cover a floor with no gaps or overlaps?" options: yes / no / only if some are rotated (answer: B). Check: a regular pentagon's corner is 108 degrees; 3 x 108 = 324 (gap 36), 4 x 108 = 432 (overlap), and 360 is never reached.
- Interaction: no slider and no text; the learner places pentagons around a point and sees a wedge-shaped gap; then triangles (6 x 60), squares (4 x 90) and hexagons (3 x 120) close.
- Payoff: a shape tiles only if its corners fill exactly 360 degrees.
- Claims to check: (1) Interior angle = (n-2) x 180 / n: 60, 90, 108, 120 (recompute). (2) Only triangles, squares and hexagons tile among regular polygons (Grunbaum and Shephard, Tilings and Patterns).

### 22. seven-odds-leave-one · concept: parity-rules · intro · demand 1 [exploration]
- Learner knows: odd and even / does not know: why the rules for adding odds and evens hold.
- Misconception: odd and even rules are facts to memorise, or "depends".
- Prediction: "Add seven odd numbers (any odd numbers). Is the total even or odd?" options: even / odd / depends on which (answer: B). Check: each odd = pairs plus one leftover dot, so seven leftovers form three pairs and one more; e.g. 1+3+5+7+9+11+13 = 49.
- Interaction: the learner builds numbers as dot columns (tap to add dots), trying to make the total even with seven odd numbers; leftover dots pair up visibly. No text, no slider.
- Payoff: pairing shows parity: a leftover dot per odd number, and the leftovers decide.
- Claims to check: (1) Sum of n odd numbers has the parity of n (derivation: each is 2k+1). (2) 1+3+...+13 = 49 (recompute; also 7^2 by odd-numbers-make-squares).

## Round 2 (briefs 23-55) · written 2026-10-12 · curriculum now 56 concepts

Every prediction answer below was recomputed in `artifacts/scratch/cm-math-r2/check.mjs` (all pass). Each "Key state" is the
moment the reveal should unlock on (earn-the-reveal): the builder calls `interact()` only for steps toward it, and the stage numbers
must match the question. Nothing here is learning evidence. Briefs 23-55 on concepts that already have a round-1 brief take a different angle (noted).

### 23. powers-of-two-plus-one · concept: sum-of-powers-of-two · core · demand 2
- Learner knows: doubling (exponential-growth) / does not know: that 1+2+4+...+2^(n-1) is one less than 2^n.
- Misconception: the total of the doubling blocks is some unpredictable big number, not tied to the next block.
- Prediction: "Add 1 + 2 + 4 + 8 + 16 + 32 + 64 + 128. What is the total?" options: 255 / 256 / 254 (answer: A). Check: 2^8 - 1 = 255.
- Key state: the learner has added one extra unit block and watched it merge 1+1, 2+2, ... into a single 256 block; the gap between the pile and 256 is exactly 1.
- Interaction: a row of blocks sized 1 to 128; one control adds a single extra unit and cascades the merges one step per tap.
- Payoff: the pile is always one short of the next doubling.
- Claims to check: (1) 1+2+...+128 = 255 (recompute). (2) Sum of 2^k, k=0..n-1, is 2^n - 1 (geometric series, or the merge argument).

### 24. square-a-plus-b · concept: binomial-square · core · demand 2
- Learner knows: area of a square and rectangle / does not know: that (a+b)^2 has two equal cross rectangles.
- Misconception: (a+b)^2 = a^2 + b^2.
- Prediction: "What is 13 x 13, thought of as (10+3) squared?" options: 169 / 109 / 130 (answer: A). Check: 100 + 2x30 + 9 = 169; 109 is the missing-cross-term answer.
- Key state: the split is at 10 and 3 and all four regions (100, 30, 30, 9) are visible and shaded.
- Interaction: a square of side 13 with a draggable split on the side; the four regions relabel with their areas.
- Payoff: the two strips in the middle are the term the wrong formula forgets.
- Claims to check: (1) (a+b)^2 = a^2 + 2ab + b^2 (expand). (2) 13^2 = 169 and 10^2+3^2 = 109 (recompute).

### 25. fifty-one-times-forty-nine · concept: difference-of-squares · core · demand 2
- Learner knows: rectangle area / does not know: a^2 - b^2 = (a-b)(a+b).
- Misconception: nearby products like 51 x 49 need long multiplication and have no relation to 50 x 50.
- Prediction: "51 x 49 is how far from 50 x 50 = 2500?" options: exactly 1 less (2499) / exactly equal / 100 less (answer: A). Check: 51 x 49 = 2499 = 50^2 - 1.
- Key state: the learner has moved the 1-wide strip from the right edge of the 50-square to the bottom, producing a 51 x 49 rectangle with a one-cell notch missing.
- Interaction: a 50 x 50 grid (drawn as a block); a drag moves a strip of width d from one side to the other; the notch d x d appears.
- Payoff: sliding a strip makes a rectangle that is always short by the small square.
- Claims to check: (1) (a+d)(a-d) = a^2 - d^2 (expand). (2) 51 x 49 = 2499 (recompute).

### 26. euclid-square-cutting · concept: euclid-gcd · core · demand 2 [exploration]
- Learner knows: rectangles tile with squares / does not know: Euclid's repeated-cutting method for the greatest common divisor.
- Misconception: finding the biggest shared tile size needs guessing or listing all factors.
- Prediction: "A 48 by 18 floor is covered with identical square tiles, no cutting. Biggest tile side?" options: 6 / 9 / 12 (answer: A). Check: gcd(48,18) = 6; 48/9 and 18/12 are not whole numbers.
- Key state: after repeated cuts (two 18-squares leave 12 x 18; one 12-square leaves 12 x 6; two 6-squares) the leftover is itself a 6 x 6 square.
- Interaction: the learner taps to cut the biggest square off the remaining rectangle; the remainder shrinks until it is a square. Exploration format: no slider, no equation.
- Payoff: the last square that fits exactly is the biggest shared tile.
- Claims to check: (1) gcd(48,18) = 6 (recompute). (2) Euclid, Elements VII.2: gcd(a,b) = gcd(b, a mod b).

### 27. scramble-the-digits · concept: divisibility-by-nine · core · demand 2
- Learner knows: place value / does not know: that a number's remainder on division by 9 equals its digit sum's.
- Misconception: divisibility is a property you must test by dividing; rearranging digits would randomly change it.
- Prediction: "7254 is divisible by 9. Scramble its four digits any way you like. Is the new number still divisible by 9?" options: always / never / sometimes (answer: A). Check: digit sum 7+2+5+4 = 18 for every arrangement; 4725, 2547, 5472 are all multiples of 9.
- Key state: the learner has swapped digits at least twice and the leftover count (each place worth 1 plus a multiple of 9) stayed at 18 each time.
- Interaction: digit tiles drag between place-value slots; under each place, its 9s are peeled off and the leftover ones are tallied.
- Payoff: every 10, 100, 1000 is a multiple of 9 plus 1, so only the digit sum matters.
- Claims to check: (1) 10^k - 1 is divisible by 9 (999...9). (2) 7254, 4725, 2547, 5472 divisible by 9 (recompute). (3) Do not claim the converse for other digits.

### 28. binary-fingers · concept: binary-counting · intro · demand 2 [exploration]
- Learner knows: place value / does not know: that two states per place count up to 2^n.
- Misconception: ten fingers can show only ten, or at best a hundred, numbers.
- Prediction: "Each of 10 fingers is either up or down. How many different numbers (0 included) can you show?" options: 10 / 100 / 1024 (answer: C). Check: 2^10 = 1024; the largest is 1023.
- Key state: all ten fingers are up and the readout shows 1023 (so 0 to 1023 is 1024 numbers).
- Interaction: ten tappable fingers with place values 1, 2, 4, ..., 512; the learner taps to make a target number. Exploration: no slider.
- Payoff: each finger doubles the count, so ten two-state fingers give 1024 numbers.
- Claims to check: (1) 2^10 = 1024 and 1+2+...+512 = 1023 (recompute). (2) Binary representation is unique (standard; prove by induction).

### 29. sieve-crossing-out · concept: sieve-primes · intro · demand 2
- Learner knows: multiples and primes (prime-factorization) / does not know why crossing out 4 primes is enough up to 100.
- Misconception: finding all primes to 100 means testing divisibility by every smaller number.
- Prediction: "To find every prime up to 100 by crossing out multiples, which primes must you cross out multiples of?" options: 2, 3, 5, 7 / all primes up to 50 / 2, 3, 5, 7, 11, 13 (answer: A). Check: a composite n <= 100 has a prime factor <= sqrt(n) <= 10, so 2, 3, 5, 7 suffice; 25 numbers survive (all prime).
- Key state: multiples of 2, 3, 5 and 7 are struck on a 10 x 10 grid and exactly 25 numbers remain; striking 11's multiples would change nothing.
- Interaction: the learner taps 2, 3, 5, 7 in any order to strike their multiples; a counter shows survivors.
- Payoff: a composite has a small factor, so four sweeps clear a hundred numbers.
- Claims to check: (1) There are 25 primes <= 100 and the survivors are exactly them (recompute). (2) Every composite n has a prime factor <= sqrt n (derivation: n = ab, one of a, b <= sqrt n). (3) Sieve credited to Eratosthenes (do not date in lesson).

### 30. rabbit-ratio · concept: fibonacci-ratio · core · demand 1 [exploration]
- Learner knows: division as a ratio / does not know: that consecutive-term ratios converge to a fixed number.
- Misconception: the ratios of a growing sequence keep growing, or depend on the start.
- Prediction: "In 1, 1, 2, 3, 5, 8, 13, ..., each term is the sum of the last two. Divide each term by the one before it. Where do the ratios head?" options: 1.5 / 1.618 / 2 (answer: B). Check: 89/55 = 1.6182, 144/89 = 1.6180; limit (1+sqrt 5)/2.
- Key state: the learner has started the sequence from two different pairs (e.g. 1,1 and 1,3) and the ratio dots land in the same place.
- Interaction: choose the first two numbers; step the sequence; ratio dots on a number line zigzag inward.
- Payoff: the rule, not the start, sets the ratio.
- Claims to check: (1) 89/55 = 1.61818 (recompute). (2) Limit = (1+sqrt 5)/2 for any positive start (derive from x = 1 + 1/x). (3) Do not claim the golden ratio appears in nature or art.

### 31. shadow-height · concept: similar-triangles · core · demand 2
- Learner knows: ratios and area scaling / does not know: that same-shape triangles have proportional sides.
- Misconception: a longer shadow means "add the extra" (additive), not multiply.
- Prediction: "A 2 m stick casts a 3 m shadow. At that moment a tree casts a 21 m shadow. How tall is the tree?" options: 14 m / 20 m / 31.5 m (answer: A). Check: 2/3 x 21 = 14; 20 is the add-the-difference error, 31.5 is the inverted ratio.
- Key state: the tree's shadow is dragged to 21 m and the two triangles, drawn nested at the same corner, share the sun-ray line.
- Interaction: one overlay, both triangles from a common corner; drag the shadow length and watch the stick triangle scale along the ray.
- Payoff: same angle, so the same height-to-shadow ratio.
- Claims to check: (1) Similar triangles have equal ratios (AA similarity). (2) 2/3 x 21 = 14 (recompute). (3) Parallel sun rays: say "approximately" for real sun.

### 32. cube-the-size · concept: volume-scaling · core · demand 2
- Learner knows: area scaling (brief 7) / does not know: that volume scales with the cube of length.
- Misconception: a cube three times as wide has three times the volume, or weight.
- Prediction: "A 2-inch solid cube weighs 1 kg. A 6-inch cube of the same material weighs..." options: 3 kg / 9 kg / 27 kg (answer: C). Check: (6/2)^3 = 27.
- Key state: the scaled cube is filled by exactly 3 x 3 x 3 small cubes and the counter reads 27.
- Interaction: scale slider 1x to 4x; unit cubes layer into the big cube one layer at a time.
- Payoff: each of the three directions triples, so volume goes 3 x 3 x 3.
- Claims to check: (1) Volume ratio = k^3 for similar solids. (2) (6/2)^3 = 27 (recompute).

### 33. thales-corner · concept: thales-right-angle · core · demand 2 [exploration]
- Learner knows: triangle angles sum to 180 (brief 11) / does not know: that every triangle on a diameter is right-angled.
- Misconception: the angle changes as the point moves, so it is sometimes sharper.
- Prediction: "Join a point P on a circle to both ends of a diameter. The angle at P is..." options: 60 degrees / 90 degrees / depends on where P is (answer: B). Check: with centre O, triangles OPA and OPB are isosceles; angles x, x and y, y give 2x + 2y = 180, so x + y = 90.
- Key state: the learner has dragged P to at least three places and the right-angle marker never changes.
- Interaction: drag P around a circle; a right-angle square mark and no number. Exploration: no equation.
- Payoff: the angle never moves, whatever the position.
- Claims to check: (1) Thales' theorem (Euclid III.31). (2) The isosceles derivation above. (3) Holds for P not equal to A or B.

### 34. exterior-turns · concept: polygon-angle-sum · core · demand 2
- Learner knows: angle sum 180 for triangles / does not know: that exterior angles of any convex polygon sum to 360.
- Misconception: more sides means more total turning.
- Prediction: "Walk around a polygon, turning at each corner until you face the way you started. Total turning?" options: 180 degrees / 360 degrees / depends on the number of sides (answer: B). Check: a regular n-gon turns 360/n per corner: 3 x 120, 5 x 72, 8 x 45, all 360.
- Key state: the learner has set the sides to at least three different values and the turn-per-corner times corners reads 360 each time.
- Interaction: sides slider 3 to 12; a walker dot traces the polygon with the heading arrow; readout of turn per corner.
- Payoff: the same one full spin, cut into more, smaller turns.
- Claims to check: (1) Exterior angle sum of a convex polygon is 360 (full turn). (2) 3 x 120 = 5 x 72 = 8 x 45 = 360 (recompute). (3) Interior sum = (n-2) x 180 follows.

### 35. up-hill-down-hill · concept: harmonic-average-speed · core · demand 2
- Learner knows: speed = distance / time / does not know: that time, not distance, is what averages.
- Misconception: 30 km/h up and 60 km/h down average 45 km/h.
- Prediction: "You drive 60 km uphill at 30 km/h and 60 km back down at 60 km/h. Average speed for the round trip?" options: 45 km/h / 40 km/h / 50 km/h (answer: B). Check: 120 km over (2 h + 1 h) = 40 km/h.
- Key state: the downhill speed is set to 60 and two time bars (2 h and 1 h) sit side by side, the long one visibly dominating.
- Interaction: one slider for downhill speed (30 to 120); two bars show hours spent each way and the readout shows the round-trip speed.
- Payoff: you spend more time going slowly, so slow speed counts more.
- Claims to check: (1) 60/30 = 2 h and 60/60 = 1 h (recompute). (2) 120/3 = 40 (recompute). (3) Average speed over equal distances is the harmonic mean 2ab/(a+b) = 2 x 1800 / 90 = 40.

### 36. handshakes-halve · concept: handshake-counting · core · demand 2
- Learner knows: triangular numbers (brief 3) / does not know: why n(n-1)/2 counts pairs.
- Misconception: n people shake n x n times, or n x (n-1) times.
- Prediction: "10 people each shake hands once with everyone else. How many handshakes?" options: 100 / 90 / 45 (answer: C). Check: 10 x 9 / 2 = 45; 90 counts each handshake twice.
- Key state: ten people on a circle and all 45 chords drawn, with a tally showing 9 + 8 + ... + 1.
- Interaction: add people one at a time; each new person draws a line to everyone already present.
- Payoff: each handshake is shared by two people, so divide by two.
- Claims to check: (1) Pairs from n = n(n-1)/2. (2) 9+8+...+1 = 45 = 10 x 9 / 2 (recompute).

### 37. bridge-parity · concept: euler-path-parity · core · demand 1 [exploration]
- Learner knows: odd and even / does not know: that a one-pass walk needs at most two odd junctions.
- Misconception: if I try hard enough I can find a route crossing every bridge once.
- Prediction: "Konigsberg has 4 land areas and 7 bridges. Can you cross every bridge exactly once?" options: yes / no / only starting from an island (answer: B). Check: bridge counts 5, 3, 3, 3; all four are odd, and a walk allows at most two odd places (start and end). Sum 14 = 2 x 7.
- Key state: the learner has attempted routes, got stuck, and the junctions with odd bridge counts are highlighted (four of them).
- Interaction: tap bridges to trace a route; used bridges grey out; a second map with one bridge removed (two odd areas) lets the learner succeed. Exploration: build and test, no slider.
- Payoff: each pass through a place uses two bridges, so odd places can only be start or end.
- Claims to check: (1) Degrees of the Konigsberg graph are 5, 3, 3, 3 (Euler 1736). (2) Path exists iff 0 or 2 odd vertices (connected graph; Euler / Hierholzer). (3) The city is now Kaliningrad and the layout changed (do not claim).

### 38. infinite-hotel · concept: countable-infinity · stretch · demand 1 [exploration]
- Learner knows: pigeonhole: finite boxes force a repeat (brief 15) / does not know: that infinite rooms behave differently.
- Misconception: a full hotel is full, even with infinitely many rooms.
- Prediction: "A hotel has infinitely many rooms, all full. One more guest arrives. Can everyone have a room, with no one thrown out?" options: yes / no / only if someone leaves (answer: A). Check: move guest in room n to room n+1 for every n; room 1 is free.
- Key state: the learner has pressed "everyone moves up one" and room 1 is empty while no guest lacks a room.
- Interaction: a row of rooms that continues off-screen; tap to shift every guest one room right; a new guest steps into room 1. Exploration: no slider.
- Payoff: with infinitely many rooms, adding one does not use any up.
- Claims to check: (1) The map n -> n+1 is one-to-one from the rooms into the rooms and misses room 1. (2) With 12 rooms the same move fails (pigeonhole). (3) Hilbert's hotel is a thought experiment; say so.

### 39. diagonal-escapes-the-list · concept: cantor-diagonal · stretch · demand 1 [exploration]
- Learner knows: the hotel idea (brief 38) / does not know: that some infinite collections cannot be listed.
- Misconception: all infinite sets are the same size, so any infinite collection can be listed.
- Prediction: "Someone claims their list contains every infinite string of 0s and 1s. Can you write one string that is not in the list?" options: no, the list is complete / yes, always / only if the list is short (answer: B). Check: flip the k-th digit of the k-th string; the new string differs from string k at place k, for every k.
- Key state: the learner has flipped the diagonal digit in each of the visible rows (8 x 8) and the new string differs from every row.
- Interaction: tap each diagonal cell to flip it; the new string builds beneath the grid; no slider.
- Payoff: the new string disagrees with every listed string somewhere, so the list was never complete.
- Claims to check: (1) The diagonal construction (Cantor 1891). (2) The grid shows only 8 rows; the argument is for the infinite list. (3) Do not claim "some infinities are bigger" beyond the argument.

### 40. halving-powers · concept: zero-exponent · core · demand 2
- Learner knows: repeated doubling / does not know: why 2^0 = 1.
- Misconception: anything to the power zero is zero, or nothing.
- Prediction: "2^3 = 8, 2^2 = 4, 2^1 = 2. Following the pattern, what is 2^0?" options: 0 / 1 / 2 (answer: B). Check: each step down divides by 2; 2/2 = 1; the next, 1/2, is 2^-1.
- Key state: the learner has stepped the exponent down to 0 and the block stack has halved from 2 to a single unit block.
- Interaction: a stack of blocks; one step-down control halves it per tap and continues past 0 to 1/2, 1/4.
- Payoff: the pattern of halving forces 2^0 = 1.
- Claims to check: (1) 2^n / 2 = 2^(n-1) (rule). (2) 2/2 = 1. (3) Consistent with a^m x a^n = a^(m+n) (derivation: a^0 x a^n = a^n).

### 41. fence-for-biggest-pen · concept: isoperimetric-rectangle · core · demand 2
- Learner knows: perimeter and area / does not know: that perimeter fixes neither shape nor area.
- Misconception: same fence, same pen area; or longer thin shapes hold more.
- Prediction: "20 m of fence makes a rectangular pen. Which shape holds the most area?" options: 1 by 9 / 5 by 5 / 4 by 6 (answer: B). Check: areas 9, 25, 24; with width w the area is w(10-w), maximal at w = 5.
- Key state: the learner has dragged the width through 5 and the area readout peaked at 25 while perimeter stayed 20.
- Interaction: drag a corner to change width w; height becomes 10 - w; shaded area and a fixed-length fence outline.
- Payoff: for a fixed perimeter, the square wins.
- Claims to check: (1) w(10-w) = 25 - (w-5)^2 <= 25 (expand). (2) 1x9 = 9, 5x5 = 25, 4x6 = 24 (recompute).

### 42. clock-after-a-hundred · concept: clock-arithmetic · core · demand 2
- Learner knows: addition and odd/even / does not know: that remainders make wrap-around arithmetic.
- Misconception: 100 hours later on a 12-hour clock means counting 100 steps one by one; no shortcut.
- Prediction: "It is 9 o'clock. What time will it be 100 hours later?" options: 1 o'clock / 4 o'clock / 9 o'clock (answer: A). Check: 100 = 8 x 12 + 4; 9 + 4 = 13, which is 1 o'clock. (4 o'clock is the error of reading the remainder as the time.)
- Key state: the learner has taken 8 full laps (96 hours) and 4 more hours; the hand ends at 1.
- Interaction: a clock with a +12 lap control and a +1 hour control; a lap counter and the hand position.
- Payoff: full laps change nothing; only the remainder moves the hand.
- Claims to check: (1) 100 = 8 x 12 + 4 (recompute). (2) (9 + 100) mod 12 = 1 (recompute).

### 43. domino-chain · concept: induction-dominoes · stretch · demand 1 [exploration]
- Learner knows: sums 1 to n (brief 3) / does not know: what proof by induction is.
- Misconception: proving a statement for every n needs checking each n.
- Prediction: "The first domino falls, and any falling domino knocks over the next. Which dominoes fall?" options: only the first few / all of them / only the even ones (answer: B). Check: domino 1 falls; if k falls, then k+1 falls; so 2, 3, 4, ... each follows.
- Key state: the learner has run the chain once to the last visible domino and also removed one link, so the chain stops at that gap.
- Interaction: tap to push the first domino; tap a gap between two to remove the link and push again. Exploration: build and break the chain.
- Payoff: a start plus a rule that carries it forward covers all numbers.
- Claims to check: (1) Induction principle (Peano axioms; standard). (2) The domino picture is an analogy, not a proof. (3) Apply to 1+...+n = n(n+1)/2 only in the reveal if sourced; otherwise omit.

### 44. triangle-is-half · concept: triangle-area-half · intro · demand 2
- Learner knows: rectangle area / does not know: that every triangle is half a rectangle, however slanted.
- Misconception: a lopsided triangle has a different area from a straight one on the same base.
- Prediction: "A triangle has base 6 and height 4, with the top corner far off to one side. Its area?" options: 24 / 12 / 10 (answer: B). Check: 6 x 4 / 2 = 12.
- Key state: the apex has been dragged along the height line past the ends of the base and the shaded area still reads 12.
- Interaction: drag the apex left and right on a line parallel to the base; the triangle area stays fixed against a surrounding 6 x 4 rectangle.
- Payoff: sliding the top along a parallel line does not change the area.
- Claims to check: (1) Area = base x height / 2 for any triangle. (2) 6 x 4 / 2 = 12 (recompute).

### 45. add-the-slices · concept: fraction-addition · intro · demand 2
- Learner knows: unit fractions / does not know: why unlike fractions need equal-sized pieces to be added.
- Misconception: 1/2 + 1/3 = 2/5 (add tops and bottoms).
- Prediction: "What is 1/2 + 1/3?" options: 2/5 / 5/6 / 1/5 (answer: B). Check: 3/6 + 2/6 = 5/6; 2/5 = 0.4, less than 1/2 alone.
- Key state: both pieces have been re-cut into sixths (3 sixths and 2 sixths) on one bar and the total reads 5 pieces of 6.
- Interaction: one bar; drag a cutting control that re-slices both fractions into the same size pieces; pieces then count.
- Payoff: you can only add pieces of the same size.
- Claims to check: (1) 1/2 + 1/3 = 5/6 (recompute). (2) 2/5 < 1/2, so the wrong rule cannot be right.

### 46. side-of-the-square · concept: sqrt-as-side · intro · demand 2
- Learner knows: square area / does not know: square root as the side that gives an area.
- Misconception: the square root of 50 is 25 (halving), or must be a whole number.
- Prediction: "A square floor has area 50 square metres. Its side is..." options: 25 m / just over 7 m / 10 m (answer: B). Check: 7^2 = 49 and 8^2 = 64, so between 7 and 8; sqrt 50 = 7.07.
- Key state: the learner has dragged the side until the area readout shows about 50 (side 7.07).
- Interaction: one slider for the side of a square (1 to 10); area readout updates; a target outline of area 50.
- Payoff: root means the side, which need not be whole.
- Claims to check: (1) sqrt 50 = 7.0711 (recompute). (2) 7^2 = 49 < 50 < 64 = 8^2.

### 47. stack-of-cubes · concept: sum-of-cubes · stretch · demand 1 [exploration]
- Learner knows: triangular numbers (brief 3) / does not know: that 1^3 + ... + n^3 is a perfect square.
- Misconception: sums of cubes have no pattern.
- Prediction: "What is 1^3 + 2^3 + 3^3 + 4^3?" options: 100 / 64 / 30 (answer: A). Check: 1 + 8 + 27 + 64 = 100 = 10^2 = (1+2+3+4)^2.
- Key state: the learner has placed 1, 2, 3 and 4 copies of the 1x1, 2x2, 3x3 and 4x4 squares into one square of side 10 (area 100) with nothing left over.
- Interaction: tile the big square from the available piles; the learner builds the model by placing. No slider.
- Payoff: the sum of the first n cubes is the square of the sum of 1 to n.
- Claims to check: (1) Sum of cubes 1..n = (n(n+1)/2)^2 (induction). (2) 1+8+27+64 = 100 (recompute). (3) The tiling is for n = 4 only; do not claim it proves the general case.

### 48. two-colours-enough · concept: two-color-map · core · demand 1 [exploration]
- Learner knows: odd and even / does not know: that straight cuts give maps with two colours.
- Misconception: maps need many colours, or four.
- Prediction: "Draw straight lines across a page. How many colours do you need so touching regions differ?" options: 2 / 3 / 4 (answer: A). Check: flip the colour on one side of each new line; two regions touching across one line differ by exactly that flip.
- Key state: the learner has drawn three lines, flipped one side of the last line, and every touching pair now differs.
- Interaction: tap to add a line; one control flips the colours on one side of it. Exploration: the learner builds the colouring.
- Payoff: each region's colour is the odd-or-even count of lines that have it on their far side.
- Claims to check: (1) Regions cut by lines are 2-colourable (induction on lines). (2) Do not conflate with the four-colour theorem.

### 49. pi-is-three-and-a-bit · concept: pi-from-rolling · intro · demand 2
- Learner knows: circle, diameter / does not know: that the rim is always a bit over three diameters.
- Misconception: circumference is two or four diameters, or depends on the circle.
- Prediction: "A wheel 1 metre across rolls one full turn. How far does it go?" options: 2 m / about 3.14 m / 4 m (answer: B). Check: pi x 1 = 3.14.
- Key state: the wheel has rolled exactly one turn and three diameter-bars lay along the ground with a little extra (0.14) left over.
- Interaction: a turns slider drives the wheel along a ruler marked in wheel-widths; a second wheel (half size) shows the same ratio.
- Payoff: the ratio is the same for every circle; it is three and a bit.
- Claims to check: (1) C = pi x d (definition of pi). (2) pi is about 3.14159 (reference). (3) Rolling without slipping: distance equals circumference.

### 50. add-a-zero · concept: place-value · intro · demand 2
- Learner knows: place value for whole numbers (brief 5 assumes this) / does not know: that times ten shifts digits, not appends a zero. Angle: breaks the "add a zero" rule with decimals.
- Misconception: multiplying by 10 means adding a zero to the end.
- Prediction: "What is 3.5 x 10?" options: 3.50 / 35 / 30.5 (answer: B). Check: 3.5 x 10 = 35; 3.50 equals 3.5 and 30.5 is a concatenation error.
- Key state: the learner has slid the digits one column left of the decimal point and the readout shows 35.
- Interaction: digit tiles in a place-value table; one control shifts all digits left or right a column.
- Payoff: times ten moves each digit up one place.
- Claims to check: (1) 3.5 x 10 = 35 (recompute). (2) 3.50 = 3.5 (value unchanged by trailing zero).

### 51. three-pizzas-four-people · concept: fractions-as-division · intro · demand 2
- Learner knows: sharing equally / does not know: that 3/4 is also 3 divided by 4.
- Misconception: 3/4 and 3 / 4 are different kinds of things.
- Prediction: "3 pizzas shared equally among 4 people. Each person gets..." options: 3/4 of a pizza / 4/3 of a pizza / 1/4 of a pizza (answer: A). Check: 3 / 4 = 0.75; 4 x 3/4 = 3.
- Key state: all three pizzas are cut into quarters and each person holds three quarters.
- Interaction: tap each pizza to cut it in 4, tap a slice to hand it to a person; counts per person show.
- Payoff: sharing 3 among 4 is the fraction 3/4.
- Claims to check: (1) a / b = a/b (definition). (2) 3 / 4 = 0.75 and 4 x 0.75 = 3 (recompute).

### 52. split-the-sum · concept: multiplication-as-area · intro · demand 2
- Learner knows: single-digit products / does not know: that a hard product splits into easy ones.
- Misconception: 13 x 7 must be done as a single step; bigger factors need a different method.
- Prediction: "What is 13 x 7?" options: 91 / 81 / 101 (answer: A). Check: 10 x 7 + 3 x 7 = 70 + 21 = 91.
- Key state: the 13-wide rectangle has been cut at 10, showing 70 and 21 side by side.
- Interaction: a draggable cut on a 13 x 7 rectangle; the learner places it at 10; the two areas add up.
- Payoff: a rectangle can be cut anywhere, so pick the cut that makes easy products.
- Claims to check: (1) a(b+c) = ab + ac. (2) 13 x 7 = 91 (recompute).

### 53. seesaw-mean · concept: mean-vs-median · intro · demand 1 [exploration]
- Learner knows: mean and median (brief 9) / does not know: that the mean is the balance point. Angle: weights on a seesaw rather than outliers.
- Misconception: the balancing point is the middle number (median).
- Prediction: "Equal weights sit at 1, 2, 3 and 10 on a plank. Where does the pivot go to balance it?" options: 2.5 / 4 / 6.5 (answer: B). Check: mean = 16 / 4 = 4; the median is 2.5; 6.5 is the midrange.
- Key state: the learner has moved the pivot until the plank is level, at 4.
- Interaction: drag the pivot under a plank with four equal weights; the plank tilts toward the heavier side. Exploration: no numbers on stage until level.
- Payoff: the mean is where the plank balances.
- Claims to check: (1) Sum of deviations from the mean is zero (derive). (2) (1+2+3+10)/4 = 4 and median 2.5 (recompute). (3) Equal weights assumed.

### 54. straight-across-saves · concept: pythagoras-by-rearrangement · intro · demand 3
- Learner knows: that a^2 + b^2 = c^2 (brief 1) / does not know: how much walking a diagonal saves. Angle: the formula used, not proved.
- Misconception: a diagonal is only a little shorter than the two sides added.
- Prediction: "You walk 300 m east then 400 m north. Walking straight across instead, how much shorter?" options: 100 m / 200 m / 350 m (answer: B). Check: sqrt(300^2 + 400^2) = 500; 700 - 500 = 200.
- Key state: the learner has moved the destination to (300, 400) and both the path bar (700) and the straight bar (500) are on screen.
- Interaction: drag the destination on a grid; two bars compare the L-route and the straight route.
- Payoff: the diagonal is shorter by a large share, by a rule you can compute.
- Claims to check: (1) sqrt(300^2 + 400^2) = 500 (recompute). (2) 700 - 500 = 200. (3) Straight path assumes flat ground.

### 55. zeno-half-steps · concept: infinite-series-halves · core · demand 2
- Learner knows: halves / does not know: that infinitely many halves can add to a finite total.
- Misconception: adding infinitely many things must give infinity.
- Prediction: "Add 1/2 + 1/4 + 1/8 + 1/16 + ... forever. The total is..." options: grows without limit / exactly 1 / exactly 2 (answer: B). Check: after n terms the sum is 1 - 2^-n; after 6 terms 63/64.
- Key state: the learner has shaded six halves of a unit square and the remaining white sliver is 1/64.
- Interaction: tap to shade half of what remains of a unit square; the shaded total shows as a fraction.
- Payoff: the pieces always fit inside the square, so the total is at most 1.
- Claims to check: (1) Sum of 2^-k, k=1..n, = 1 - 2^-n (recompute for n = 6: 63/64). (2) The infinite sum is 1 (limit of the above). (3) Brief 8 uses the same series; the angle here is the picture, not 0.999...

## Batch 2026-10-14 (cm-math): close the last gap, then three demand-3 number-sense misconceptions

Why these next: `proof-by-contradiction` was the only math concept with no lesson (coverage 64/65). The other three are new demand-3 concepts. Each one targets a misconception that is well documented in maths-education research and that a single stage can break. The research citations are the reason I ranked them. They are **not** learner claims, and no learner sentence depends on them. Every learner claim below is settled by a derivation a fact-checker can re-run in node. All numbers were re-run in node on 2026-10-14. Phone fit for all four: one representation on the stage, and the reveal (≤ 90 words, counted below) points only at things that are still on stage when it opens. Nothing here is learning evidence.

### 56. two-right-angles-never-meet · concept: proof-by-contradiction · core · demand 2 · format: Single card
- Learner knows: a flat triangle's corners add to 180° (tear-the-corners) / does not know: proof by contradiction as a method, that is, assuming the thing and following it until it breaks.
- Misconception: "No triangle has two right angles" is a rule you are told, not something you can show. A tall enough triangle might manage it.
- Prediction (stage text ≤ 25 words): "On a flat page, can a triangle have two right angles?" options: A. Yes, if it is tall enough / B. Yes, if its base is short enough / C. No, never (answer: C). All three options are worded at the same precision.
- Check: base 1, right angle at the left end, angle B at the right end. The sides meet at height tan B, and the top corner is 90° − B. Re-run: B = 80° gives height 5.67 and top 10°; B = 85° gives 11.43 and 5°; B = 89° gives 57.29 and 1°; B = 89.9° gives 572.96 and 0.1°. At B = 90° the two sides are parallel.
- Stage: a fixed base along the bottom, with its left corner locked at 90° and a vertical side. The learner drags one dial for the right corner's angle (60° to 90°). Its side tilts upward, and the meeting point climbs off the top of the card. A readout shows "meet at: N bases up" and "top corner: N°". At 90° the meeting readout reads "never" and the two sides stand parallel. The stage says "flat page". Controls: one dial.
- Key state: right corner at 89° (meet at 57 bases up, top corner 1°), then 90° (sides parallel, top corner 0°).
- Reveal (67 words): "Suppose a triangle had two right angles. Those two corners already use all 180°, leaving 0° for the third. You watched it happen: at 89° the sides met 57 bases up with a 1° tip; at 90° they stood parallel and never met. The assumption leads to an impossible triangle, so the assumption is false. That is proof by contradiction: assume it, follow it, hit a wall."
- Planned claims:
  1. The corners of a triangle on a flat plane add to 180°. support: derivation (draw the parallel through the top corner: alternate angles); source: Euclid, Elements I.32 (statement), checkable by derivation.
  2. With a right angle at one end of a base of length b and angle B at the other, the sides meet at height b·tan B, and the top corner is 90° − B. support: derivation (right triangle: opposite/adjacent = tan B); source: node: tan(89°) = 57.29.
  3. Two lines both perpendicular to the same line never meet on a flat plane. support: derivation (if they met, the triangle formed would have corners summing above 180°, against claim 1); source: Euclid I.27–28.
  4. If an assumption leads to something impossible, the assumption is false (proof by contradiction). support: definition; source: any logic text (definition, no number to check).
- Not claimed: anything about spheres. A triangle on a globe can have two or three right angles, so the stage text says "flat page". If the reviewer wants that contrast, it goes in recall, not in the reveal.
- curriculum: `{"primary":"math:proof-by-contradiction","also":["math:angle-sum-triangle"],"prerequisites":["math:angle-sum-triangle"],"level":"core","strand":"discrete","references":[],"tags":["proof","contradiction","angles"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: tear-the-corners shows that the angle sum is 180°. This lesson uses that fact as the wall a contradiction hits. no-fraction-fits (sqrt2-irrational) and product-plus-one (infinitude-of-primes) are contradiction proofs carried out in algebra. Here the learner sees the contradiction itself: the meeting point runs away. overlap.mjs: check before build.

### 57. times-can-shrink · concept: multiplying-below-one · intro · demand 3 · format: Single card
- Learner knows: multiplication as a rectangle's area (split-the-sum); decimals as parts of 1 / does not know: that multiplying by a number below 1 gives a smaller result.
- Misconception: Multiplying always makes bigger. (Rationale, not a learner claim: "multiplication makes bigger" is a documented intuitive model; Fischbein, Deri, Nello & Marino 1985, J. Research in Mathematics Education 16(1); Bell, Swan & Taylor 1981.)
- Prediction (stage text ≤ 25 words): "Multiply 0.6 by 0.7. Where does the answer land?" options: A. Above 0.7 / B. Between 0.6 and 0.7 / C. Below 0.6 (answer: C). All three options are ranges, worded at the same precision.
- Check: 0.6 × 0.7 = 0.42, which is below 0.6. In hundredths: 60 × 70 = 4,200 ten-thousandths = 0.42. Re-run: 0.6 × 0.5 = 0.3, 0.6 × 1 = 0.6, 0.6 × 1.5 = 0.9.
- Stage: a 1-by-1 unit square outlined on a 2-by-2 grid. A shaded rectangle has width 0.6 (fixed, labelled) and a height the learner drags from 0 to 2 in 0.1 steps. A readout shows "0.6 × h = area". The 0.6-wide strip of the unit square stays outlined, so the learner sees the shaded part sit inside it (h < 1), fill it (h = 1) or overflow it (h > 1). Controls: one height handle, which is also a slider for keyboard.
- Key state: h = 0.7, area 0.42, shaded rectangle inside the 0.6 strip. The learner also visits h = 1 (area 0.6) and h > 1.
- Reveal (58 words): "You set the height to 0.7, and the shaded area read 0.42: smaller than 0.6 and smaller than 0.7. Multiplying by 0.7 keeps seven tenths of the 0.6 strip, so it shrinks it. At height 1 the area stayed 0.6; only above 1 did it grow. Times makes bigger only when the other number is bigger than 1."
- Planned claims:
  1. 0.6 × 0.7 = 0.42. support: derivation (60 × 70 = 4,200; ÷ 10,000); source: node.
  2. For a positive number a, a × b is smaller than a exactly when b < 1, equal when b = 1, and larger when b > 1. support: derivation (a·b − a = a(b − 1), which has the sign of b − 1); source: algebra, re-run in node for b = 0.5, 1, 1.5.
  3. The area of a rectangle with sides x and y is x × y, also when the sides are not whole numbers. support: derivation (cut into hundredth squares: 60 × 70 squares of 1/10,000); source: node.
- curriculum: `{"primary":"math:multiplying-below-one","also":["math:multiplication-as-area"],"prerequisites":["math:multiplication-as-area"],"level":"intro","strand":"algebra","references":[],"tags":["multiplication","decimals","number sense"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: split-the-sum (multiplication-as-area) cuts whole-number rectangles to make easy products. scoops-in-three-cups (fraction-division) is division by a fraction. This lesson asks when a product grows or shrinks. The insight is the sign of b − 1, shown as the shaded part inside or outside the strip.

### 58. more-digits-not-bigger · concept: decimal-magnitude · intro · demand 3 · format: Single card
- Learner knows: place value for whole numbers (add-a-zero); that 0.5 is a half / does not know: how to compare decimals of different lengths.
- Misconception: The decimal with more digits is bigger, so 0.125 > 0.25 > 0.3 ("longer is larger"). (Rationale, not a learner claim: Resnick, Nesher, Leonard, Magone, Omanson & Peled 1989, J. Research in Mathematics Education 20(1); Steinle & Stacey's decimal comparison test.)
- Prediction (stage text ≤ 25 words): "Which of these is largest: 0.3, 0.25 or 0.125?" options: A. 0.125 / B. 0.25 / C. 0.3 (answer: C). Every option is an exact number from the question.
- Check: in thousandths, 0.3 = 300, 0.25 = 250, 0.125 = 125, so 0.3 > 0.25 > 0.125. Re-run sort: [0.125, 0.25, 0.3]. 0.05 < 0.1.
- Stage: three horizontal bars on one shared 0-to-1 scale, with tenth ticks. The learner taps a number's digits one at a time. The first digit after the point adds tenth-blocks, the second adds hundredth-slivers (one tenth as wide), and the third adds thousandth-hairlines. A tap builds one digit for one bar. Controls: three "build next digit" buttons, one per number, so six presses in total.
- Key state: all three bars fully built. 0.3 is three tenth-blocks and is the longest; 0.25 is two blocks plus five slivers; 0.125 is one block, two slivers and five hairlines.
- Reveal (57 words): "You built the bars digit by digit. 0.3 got three tenth-blocks. 0.25 got only two, and its five hundredth-slivers added 0.05, less than the one more block it needed. 0.125 got one block. Each place is worth a tenth of the one before, so compare from the first digit: extra digits only add smaller and smaller pieces."
- Planned claims:
  1. 0.3 = 3/10, 0.25 = 25/100 and 0.125 = 125/1000. support: definition (decimal notation); source: node.
  2. 0.3 > 0.25 > 0.125 (300 > 250 > 125 thousandths). support: derivation; source: node.
  3. Each decimal place is worth one tenth of the place to its left. support: definition (place value); source: definition.
  4. Five hundredths (0.05) is less than one tenth (0.1). support: derivation; source: node.
- curriculum: `{"primary":"math:decimal-magnitude","also":["math:place-value"],"prerequisites":["math:place-value"],"level":"intro","strand":"algebra","references":[],"tags":["decimals","place value","number sense"]}`
- Needs interaction-designer spec: no. Tell the builder: the three bars share one scale and sit in one panel, so this is one representation.
- Differs from nearest: add-a-zero (place-value) shifts digits when multiplying by 10. This lesson compares decimals of different lengths, and the insight is that later digits are worth less. nines-without-end is about one infinite decimal, not about comparing.

### 59. six-students-per-professor · concept: equation-from-words · core · demand 3 · format: Single card
- Learner knows: reading and evaluating an expression like 6 × P / does not know: how to turn a "times as many" sentence into an equation, or that letters stand for numbers of things, not for the things.
- Misconception: "Six times as many students as professors" is written 6S = P, reading the letters as labels ("6 students, 1 professor"). (Rationale, not a learner claim: the students-and-professors problem; Clement, Lochhead & Monk 1981, American Mathematical Monthly 88(4), "Translation difficulties in learning mathematics".)
- Prediction (stage text ≤ 25 words): "A college has six times as many students as professors. S = number of students, P = number of professors. Which equation is right?" options: A. 6S = P / B. S = 6P / C. 6S = 6P (answer: B). That is 24 words of stage text.
- Check: P = 2, S = 12 (six per professor). S = 6P gives 12 = 12 (true); 6S = P gives 72 = 2 (false); 6S = 6P gives 72 = 12 (false). Re-run in node.
- Stage: a row of professor icons (P slider 1 to 5) and a grid of student icons (S slider 0 to 30). Below them is one equation, which the learner switches between A, B and C with a three-way toggle. The equation is shown with today's counts substituted ("12 = 6 × 2") and lit true or false. Controls: P slider, S slider, equation toggle.
- Key state: P = 2 and S = 12, with each equation visited. Only S = 6P is lit true, and it stays true when P changes and S is set to six per professor.
- Reveal (60 words): "With 2 professors and 12 students you saw S = 6P read 12 = 12, while 6S = P read 72 = 2. The letters count people; they are not labels. 6S = P actually says professors outnumber students six to one. The smaller group gets the multiplier: multiply the professors by 6 and you get the number of students."
- Planned claims:
  1. With P = 2 and S = 12, S = 6P gives 12 = 12, and 6S = P gives 72 = 2. support: derivation; source: node.
  2. "Six times as many students as professors" means S = 6P for every positive number of professors. support: definition (translation of "times as many"); source: derivation.
  3. For positive counts, 6S = P means there are six professors for every student (P/S = 6). support: derivation; source: algebra.
- curriculum: `{"primary":"math:equation-from-words","also":[],"prerequisites":[],"level":"core","strand":"algebra","references":[],"tags":["algebra","variables","equations"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: no math lesson teaches turning words into an equation. economics and cs lessons use formulas but never ask which way round a "times as many" sentence goes. The insight is that a letter is a count.
