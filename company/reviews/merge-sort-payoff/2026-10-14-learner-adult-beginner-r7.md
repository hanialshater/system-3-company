*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): merge-sort-payoff
lesson version: v5
boundary: adult-beginner (remembers school arithmetic; knows what a sorted list is and how to compare two numbers; has not met recursion, Merge Sort or big-O). Same tag as r6.
Screenshots seen: yes (artifacts/walkthroughs/merge-sort-payoff/sheet.png, 6 frames)
Verdict: launch

## 1. From the artifact (written before reading r6 or the brief)

- Hook and predict: "Two sorted piles must become one sorted row. How many comparisons can that cost?" and the question "what is the most comparisons you could ever need?" agree. 7 / 16 / 28 are all bare numbers and all tempting (16 = 4 × 4 feels natural; 28 = every pair). The locked stage shows the two piles, an empty 8-slot row, and a greyed "Where did the piles come from?". No leak.
- Step 1 (Where did the piles come from?): the stage now leads with the live prompt "Which top card is smaller?", then the three earlier rounds with costs (0, 4, 6) and "So far 0 + 4 + 6 = 10. The last merge adds at most 7." The why of splitting is on the stage. But the caption says "at most 7" before I have merged anything, so the stage tells me the merge's cost before I find it. I had already committed, so it does not break "No answer before the commit", but it takes the small discovery away (minor).
- Step 2 (wrong tap on 10): 10 turns red and the prompt explains: "The other top card is smaller, so it goes first. Each card placed while both piles have cards is one comparison." That sentence is now at the top of the stage and readable. This is the definition I need, at the moment I need it. However in that frame the COMPARISONS / PLACED readouts are pushed below the stage edge on the phone, so I lose the counter while reading the feedback (minor).
- Step 3 (Take 4): COMPARISONS 1, PLACED 1/8. The two counters move together.
- Step 4 (Finish for me): "Merged with 7 comparisons." COMPARISONS 7, PLACED 8/8, and "Whole sort: 0 + 4 + 6 + 7 = 17, against 28 for every pair." The 7-vs-8 gap shows the last card goes free. I did not watch that last card slide, because Finish for me did 6 placements at once (minor; I placed 1 card of 8 myself).
- Reveal: "The merge on screen took 7" and "4 and 6 ... 17, against 28" are all still on the stage when it opens (merged row, counters, "Your sort: 0 + 4 + 6 + 7 = 17, against 28."). The 1,000-card numbers are told, which the standard allows in the reveal. About 110 words, ends on "The splitting is setup. The merge is the payoff."
- "28 for every pair" is never counted on the stage; it is a told number. As a beginner I accept it ("every pair of 8" is 28 if I count), but nothing shows it. Context, not the gap.
- Still two places to watch: the rounds stack on top, the live merge below. The stack is now compact and the prompt sits above both, so it works, but the stage is near the phone height limit.
- Minor: "75S" chip on a 60-second product.

## 2. Earlier findings (r6, read after section 1)

1. Top: merge prompt and the wrong-tap explanation clipped off the stage with rounds open: FIXED. The prompt now sits at the top of the stage and is fully readable in frames 02 to 04. (A smaller version remains: on a wrong tap the readouts are pushed below the edge.)
2. Reveal over the 120-word budget (~131): FIXED (~110 words).
3. Carried minor, "Finish for me" means the learner places one card of eight: NOT FIXED (still minor).
4. "Your stacked rounds" overselling: FIXED (reveal now says "The rounds before the last merge cost 4 and 6").

## 3. New findings

1. Minor: "The last merge adds at most 7" is on the stage before the learner merges; it pre-empts the merge's own discovery.
2. Minor: on a wrong tap, the COMPARISONS / PLACED readouts drop below the stage edge on the phone.
3. Minor: the last card sliding free is not watched when Finish for me runs.
- No FATAL. A first-time learner can see, on the stage, that each comparison places one card (7 comparisons for 8 placed) and that the whole sort's rounds add to 17.
