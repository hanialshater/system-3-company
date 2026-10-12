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
