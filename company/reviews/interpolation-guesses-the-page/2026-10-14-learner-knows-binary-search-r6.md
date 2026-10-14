*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): interpolation-guesses-the-page
lesson version: v2
boundary: knows-binary-search (from meta.json learner.knows: binary search opens the middle of a sorted list; does not know you can aim by value, or that aiming backfires on unevenly spread data).
Screenshots seen: yes (artifacts/walkthroughs/interpolation-guesses-the-page/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: "100 sorted values: 10, 20, 30 … 1000. You find 730 by guessing its position from its value. How many looks?" 1 / 7 / 10. The locked stage shows the straight line of dots and the "find 730" dashed level, with the counters at "?". The question is easy for anyone who reads "10, 20, 30" as "730 is at position 73". The surprising half of the lesson (cubes are worse than halving) is not part of the prediction, so a learner who holds "the middle is always fastest" is never asked to commit to it.
- Explore: "Guess" on the even list: one aim line, look 1, "found at position 73", Halving 6. "Values: even" toggles to cubes and the curve bends up hard. Presets 729,000 / 1,000 / 9,261. "Guess until found" on 9,261: Looks 21 vs Halving 5, with the dashed aim line running from the range end well above the dots. A tally keeps "Even · 730: 1 look (halving 6)" and "Cubes · 9,261: 21 looks (halving 5)" side by side. That contrast is the idea, and it is visible.
- "Guess until found" jumps to the end, so only the last aim line is on screen. The reveal's "each aim fell short" describes 21 aims I watched as one. The single "Guess" button was there on cubes, but the hint did not ask me to step it a few times first.
- The hint says "find 1,000 and 9,261", but the gate opened without a guess on 1,000. Fine for the idea; the hint slightly over-asks.
- Minor: on cubes the y-axis top label is cut to "00,000" (1,000,000).
- Reveal: points at what was seen (1 look vs halving 6; 21 looks vs halving 5; "the straight aim line runs above them"). The dictionary line is told context and fits.

Told vs shown check (brief): doesNotKnow "aim at a position from the value" is the first look landing on 73; "aiming backfires on uneven data" is 21 vs 5 with the aim line above the curve. Both shown.

## 2. Earlier findings

No earlier learner review exists. Boundary taken from meta.json.

## 3. New findings

- Moderate (not a blocker): the prediction tests only the easy even case. Asking about the cubes (for example "On cubes, aiming vs halving for 9,261: fewer / same / more looks?") would put the misconception on the line.
- Minor: have the hint ask for two or three single "Guess" presses on cubes before "Guess until found", so "each aim fell short" is something the learner watched.
- Minor: the cropped "00,000" axis label; the chart scrolls mostly off at reveal.
- No FATAL.
