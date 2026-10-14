*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): merge-sort-payoff
lesson version: v4
boundary: adult who remembers school arithmetic, new to the topic (knows what a sorted list is and how to compare two numbers; not recursion, Merge Sort or big-O).
Screenshots seen: yes (artifacts/walkthroughs/merge-sort-payoff/sheet.png, plus a probe that skipped "Where did the piles come from?" and went straight to Take 4, then Finish for me)
Verdict: revise

## 1. From the artifact

- Predict: the hook and question agree ("most comparisons you could ever need"). Options 7 / 16 / 28 are all tempting. The locked stage shows the two piles and an empty 8-slot row. Nothing leaks.
- Explore: "Where did the piles come from?" now opens a stacked view of all three earlier rounds, each with its cost: "Split into 8 single cards: 0 comparisons", "Merge singles into pairs: 4", "Merge pairs into piles A and B: 6", and "So far 0 + 4 + 6 = 10. The last merge adds at most 7." After the final merge the line reads "Whole sort: 0 + 4 + 6 + 7 = 17, against 28 for every pair." The probe showed the reveal stays locked if the rounds are skipped, so the why of splitting is now on the gated path.
- Where understanding first broke: with the rounds open, the merge feedback line falls off the bottom of the stage on the phone. In frames 02 to 04 "Which top card is smaller?" and "The other top card is smaller, so it goes first. Each ..." are cut at the stage edge. The second one defines what counts as a comparison, and a learner who tapped the wrong card is exactly the one who needs it. The rounds stack, the piles and the row also mean watching two places at once. The rounds sit above and the piles below, and the stack takes over half the stage.
- The rounds' 4 and 6 are given, not done: the learner merges only the last round. They are labelled clearly, so this is acceptable, but "Your stacked rounds" in the reveal oversells it a little.
- Reveal: about 131 words, over the 120-word budget. "The merge on screen took 7" is honest. The 1,000-card / 10,000 / 499,500 figures are told, which the standard allows ("big numbers go in the reveal"). "28 for every pair" appears on stage as a told number, never counted, which is fine as context.
- Minor: "75s" chip (product-owner item); trust link 10/12 (fact-checker's lane).
- No FATAL.

## 2. Earlier findings (r5 review, v3)

1. Why splitting pays was only told; rounds were optional: **fixed**. All rounds are stacked with per-round costs and a running total against 28, and the gate needs them (probe: the reveal stays locked without them).
2. "Next round" left as a dangling control in the reveal: **fixed** (replaced by "Hide the rounds" / "New piles").
3. Earlier v2 items: hook and question match (**fixed**). "Finish for me" means the learner places one card of eight (**still true**, minor). Wrong-tap wording (**fixed in text, but now clipped off the visible stage**, see above). 10,000 and 499,500 told (**accepted** as reveal-only big numbers).

## 3. Top finding (revise)

- With the rounds open, the stage is taller than the phone card. The merge prompt and the wrong-tap explanation of what a comparison is are cut off, so the one sentence that fixes a wrong tap is not visible. This is also the one-representation rule at work: the rounds stack and the live merge compete for one stage.
- Second: the reveal is over the 120-word budget (about 131).

Brief check (show the why): the objective asks why a merge needs at most n − 1 comparisons (on stage: COMPARISONS and PLACED move together, and "One pile is empty. The rest needs no comparisons." appears) and why that makes splitting worthwhile (on stage: the stacked round costs and the 17 against 28). The stage now holds both. The revise is about visibility and budget, not about a told-only cause.
