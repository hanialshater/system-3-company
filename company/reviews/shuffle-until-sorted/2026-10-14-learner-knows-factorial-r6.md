*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): shuffle-until-sorted
lesson version: v1
boundary: knows n cards can be put in order n! ways (lesson route-explosion); does not know that shuffle-and-check needs about n! tries on average (from meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/shuffle-until-sorted/sheet.png)
Verdict: launch

## 1. From the artifact
- Hook and title fit and are neutral. Predict: 5 / 25 / 120 is a real spread. "About 5" (one per card) and "About 25" (5 squared) are honest wrong guesses. The locked stage shows 4 3 5 1 2, "Shuffles: 0" and a table of "?". Nothing leaks.
- Explore: "Shuffle" reshuffles the 5 cards. "Shuffle until sorted" ends on green 1–5 with ticks and "Sorted after 183 shuffles". "Average of 100 runs" draws a bar per run with a dashed "average 113" line, and the tallest bars are capped with arrowheads. Switching to 3 and 4 cards fills the table: 7, 22, 113. Growing much faster than the card count is visible in the table.
- Where it thinned: the cause, "5 cards can be ordered 120 ways and only one is sorted", is told in the reveal with 5! = 120. Nothing on stage counts or stands for the orders. I can see the wait grows fast (7, 22, 113), but the stage never shows why it is 6, 24, 120. A learner can match 7≈6, 22≈24, 113≈120 only after the reveal hands them the factorials.
- "Rows with two or three ticks came and went": on this path I saw ticks only on the final sorted row. The single "Shuffle" press (5 3 2 1 4) had no ticks. Unless the run-until-sorted animation showed partial ticks (not visible in the frames), the reveal quotes something I did not see.
- Layout: from step 3 on, the stage scrolls and the cards are cut off at the top. On the reveal only the histogram's lower edge and the table are visible. The histogram has no axis label (what is a bar? what is an arrowhead?).
- Reveal: 183, 113, 2–695, 7, 22 all match. About 105 words.

## 2. Earlier findings

No earlier learner review exists (only a fact-check). The boundary is taken from meta.json. At this boundary the learner already knows n! counts orders, so my section-1 concern that "120 orders" is only told is mostly covered by prior knowledge. The learner can match 7/22/113 against the 6/24/120 they can compute.

## 3. Show the why you promised

The doesNotKnow item ("shuffle-and-check needs about n! tries on average") is on stage. The learner makes the 3-, 4- and 5-card averages (7, 22, 113) appear, and the reveal points at them next to 3! = 6, 4! = 24 and 5! = 120. The 1-in-n! chance per shuffle is shown in a weaker way, through the per-card ticks that appear when a card happens to land in place. The 10-card figure (3.6 million) is told context, which is allowed.

## 4. New findings

- Should fix: "Rows with two or three ticks came and went" is printed whatever the learner saw. On this path the one manual shuffle had no ticks. Say it only if a partial-tick row occurred, or reword it.
- Should fix: from step 3 on, the cards scroll off the top of the stage. On the reveal only the bottom of the histogram shows.
- Minor: the histogram needs a short label ("each bar = one run; arrow = off the chart").
- Minor: an n! column in the table (6 / 24 / 120) would let the stage say what the reveal says.
- No FATAL.
