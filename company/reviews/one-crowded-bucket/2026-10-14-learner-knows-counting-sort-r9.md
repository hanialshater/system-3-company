*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): one-crowded-bucket
lesson version: v4
boundary: knows-counting-sort (from meta.json learner: knows counting sort tallies values instead of comparing them; does not know that bucket sort is fast only when values spread evenly across buckets)
Screenshots seen: yes (artifacts/walkthroughs/one-crowded-bucket/sheet.png and 05-reveal.png, recorded 2026-10-14T15:07)
Verdict: launch

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "About 1, as before"; tapped "Drop", "Sort", "Clumped"; opened reveal.

1. **Where the idea I lack first appears: the question.** "Each bucket is insertion-sorted" assumes I know what insertion sort costs on ten items. My boundary is counting sort, not insertion sort. So "About 10" against "About 30" is a guess for me, not a prediction. The stage answers it (small numbers on each tile: its tests), and the reveal says "each newcomer slid past every bigger number already there". So the gap is covered after the commit. Hypothesis: a learner without insertion sort cannot tell 10 from 30 before the reveal.
2. **The payoff is shown.** The spread hand lands in 9 buckets with only 64 and 70 sharing ("1" on the 70 tile). The clumped hand piles into one column, and each tile carries its test count. "Seen, clumped: all 10 in 41-50; 1+1+3+3+2+6+3+6+5 = 30" is on the stage.
3. **The sum is in arrival order; the tiles are in sorted order.** Reading the column top-down gives 1, 2, 3, –, 5, 3, 6, 1, 6, 3, not 1+1+3+3+2+6+3+6+5. I could not match the reveal's sum to the picture term by term without re-deriving the arrival order from the struck-through hand. Small, but it is the line the reveal quotes.
4. Tapping "Clumped" seems to drop and sort in one go (step 3 lands at 30 comparisons), so I never watched the crowded insertion sort happen. For the clumped hand, the action that carries the lesson is the one I skip.
5. **The reveal fits with its picture.** In 05-reveal the stage top (struck clumped hand), the crowded column with its counts, both "Seen" lines and the last reveal line are on screen. 75 words.
6. The trust link reads "5/6 claims checked" (fact-checker's lane).

Verdict reason: the gap (even spread is what makes it fast) is shown by contrast and quoted. The rough edges are in the explore, not the reveal.

## After reading build.md (Pre-flight v4) and the r8 review

- r8's fit revise is fixed: the release frame matches Pre-flight 7 (crop 0, tower and both Seen rows on screen).
- Pre-flight 5 confirms that "Clumped" does drop and sort in one press (my finding 4). That is a QA-path convenience, and it costs the learner the chance to watch the crowded sort. Hypothesis for learning-designer, not a blocker.
- The builder notes there are only a few px to spare at the reveal. A longer Seen line on another path could tip it.
- Fix route: none required for launch. The arrival-order sum against sorted-order tiles (finding 3) is a minor for demo-builder.
