*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): insertion-by-hand
lesson version: v3
boundary: an adult who uses a phone and a laptop daily and has never programmed (comfortable with everyday apps and basic arithmetic).
Screenshots seen: yes (artifacts/walkthroughs/insertion-by-hand/sheet.png, integrated build 3 at :3470)
Verdict: launch

## 1. From the artifact

- Predict: the hook "Five cards, one method. Is the work always the same?" is neutral. The locked stage shows "Make a prediction to start", the reversed hand, and SLIDES ? / PAIRS OUT OF ORDER ?. Nothing leaks. 4 is the natural beginner guess, and I took it.
- Explore: one manual slide moves 3 past 5, with SLIDES 1 and PAIRS 9 and a "slid 1" tag. "Finish this hand" now plays out slide by slide. The mid-run frame shows SLIDES 5 / PAIRS 5 with "slid 2, slid 2, slid 1" tags, so the two counters can be watched moving in lockstep, not just before and after. The log keeps 54321 → 10. Loading 31452 shows pairs 4, 12354 shows pairs 1, and 12345 shows pairs 0 and gives "Sorted, in 0 slides. It began with 0 pairs out of order."
- Reveal: "You finished 54321 in 10, 12345 in 0" matches the log. "The pair counter fell by one with every slide" points at what I watched. The 4,950 figure for 100 cards is a told extension, and it is claimed.

## 2. Earlier findings (r5, v2)

1. PAIRS OUT OF ORDER showed 10 on the locked stage: **fixed** (shows "?").
2. The "falls by one with every slide" lockstep was seen only once: **mostly fixed**. Finish now animates, and both counters can be seen moving together during the run. Still only one slide is manual.
3. The middle hands (31452, 12354) didn't have to be finished: **not fixed**, minor. The gate "two different hands" is met by the trivially sorted 12345 (0 slides), so the middle case where work = 4 is never required.
4. 75 s chip: **not fixed** (product-owner item).

## 3. New findings

- Minor: what a "pair out of order" is (a doesNotKnow item) has a stand-in, the counter, but nothing points at a particular pair. When a card slides, briefly marking the card it passed would make "fixes one pair" visible as well as countable.
- Minor: requiring 31452 (4 slides) as the second hand, instead of allowing 12345, would test the rule on a middle case. That is the case a sceptic needs.
- Minor: the reveal is about 115 words, near the budget. On the reveal frame the stage is scrolled and the top of the cards is cropped.
- No FATAL.
