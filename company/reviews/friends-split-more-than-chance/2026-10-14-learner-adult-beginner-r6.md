*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6): friends-split-more-than-chance
lesson version: v1
boundary: adult-beginner (meta.json learner field). Knows groups and proportions. Does not know that the yardstick for "friends sort by group" is the cross-group share that random pairing would give (about 2pq).
Screenshots seen: yes (artifacts/walkthroughs/friends-split-more-than-chance/sheet.png)
Verdict: fatal

## 1. From the artifact

- Predict: the hook names the idea (a number needs a yardstick) and the question asks for the yardstick. 33% (going by people: 10 of 30) is the natural trap, and the options are real beliefs. The locked stage shows the real class network with 9 crossing lines in yellow, and an empty histogram with a "real class: 9" marker. No leak of 46%.
- Explore: "Draw a random class" redraws the network (26 crossing, 58%) and drops a bar into the histogram. "Draw 1,000 more" builds a hump around 20 to 22 crossings, far right of the red "real class: 9" line. AVERAGE CROSSING reads 46% and WITH 9 OR FEWER reads 0. The gap between the hump and the real class is the evidence, and I could see it. Good.
- **Where it broke: after "Start over" the reveal reports false things.** The walked path pressed Start over before "Show me why". The reveal then says "Your 0 random classes crossed groups 0% of the time on average, close to ... 46%" and "the fewest was 45". It had drawn none; 0% is not close to 46%; and 45 is the total number of friendships, not a minimum. The reveal reads the live, reset state instead of what the learner saw. Every learner who resets before revealing reads nonsense.
- Told, not shown: "The yardstick is pairs, not people: each of the 10 can pair with 20 people in the other group", and the "200 of 435 possible pairs" count. Nothing on stage counts possible pairs. The learner who guessed 33% (people) is told why it is 46% (pairs), but never sees pairs counted. The histogram shows *that* chance gives about 46%, not *why* it is not 33%.
- Reveal stage: the network is scrolled off, and the readouts show 0 / – / 0.

## 2. After reading the brief

- The objective's numbers are "about 46% (200 of 435 pairs)". The 46% is **shown** (the AVERAGE CROSSING readout and the histogram hump). The *why* behind the yardstick is **told only**: pairs, not people, 200 of 435. That is the brief's own doesNotKnow ("cross-group share random pairing would give"), and the misconception is the people-based 33%. Under "Show the why you promised", even without the fatal this would be a revise. A stand-in on the existing stage could be a count of possible cross pairs (10 × 20 = 200) beside all pairs (435), tied to the network.

## 3. Earlier findings

None (first learner review; only a fact-check exists in the folder).

## 4. Findings

1. **FATAL: the reveal states false things after Start over.** The text below appeared on the walked path:
   > Your 0 random classes crossed groups 0% of the time on average, close to the 200 of 435 possible pairs that cross (46%). ... None of your random classes had 9 or fewer; the fewest was 45.

   "0% ... close to 46%" and "the fewest was 45" are false, and they are on a learner-reachable path (draw, reset, reveal). The reveal must quote what the learner saw (for example, keep the record from before the reset), or the reset must not be possible after the gate. This blocks launch until it is fixed. Route to demo-builder; fact-checker should re-check the claims behind the reveal's first paragraph (c1 to c6 in meta.json) against the reset path.
2. **Revise: the pairs yardstick is told, not shown** (section 2).
3. Minor: the reveal stage scrolls the network off and shows reset readouts.
4. What works: the histogram against the red real-class line is a strong, honest picture of "far from chance".
