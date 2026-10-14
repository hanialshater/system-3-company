*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): compound-interest
lesson version: v4
boundary: adult who remembers school arithmetic; new to compounding; expects straight-line growth
Screenshots seen: yes (artifacts/walkthroughs/compound-interest/sheet.png, 7 frames)
Verdict: launch

## 1. From the artifact

- Predict: the stem gives the 10-year anchor ($1,967). The three options match the three ways a beginner might extend it: plain 7% ($3,800), the first decade's pace ($4,900), and compounding ($15,000). I picked $3,800, the natural linear guess. The locked stage shows only the first decade, and the later decade chips show "?". Nothing leaks beyond the anchor the stem already gives.
- Layout: in the predict frame the chart renders as a thumbnail, roughly a quarter of its explore size, with no y-axis labels. In explore it is full size. It looks like a sizing bug in the locked state.
- Explore: the jumps to 20, 30 and 40 fill the decade chips: +$967, +$1,903, +$3,743, +$7,362. Each is about double the one before, and the learner can see that without arithmetic. The top layer ("interest on past interest") visibly takes over the area. The dashed "first-decade pace: $4,900" line and the "PLAIN 7% ONLY $3,800" readout sit next to $14,974. Both wrong options are placed on stage. This answers my wrong guess directly.
- Where it is thinnest: the legend "7% of $1,000" for the plain-interest layer reads like a single amount ($70) rather than "7% of $1,000 every year". This is a small wording snag.
- Reveal: every number was on stage. "Doubles every ten years" is visible in the chips. The model caveat is stated.
- Minor: the chip reads 70S.

## 2. Earlier findings (r2 review)

1. N1: the locked y-axis topped out at $15k, the correct option: **fixed**. The locked chart has no y labels. It is now drawn too small, though (see below).
2. N2: the $4,900 dashed-line end had no number: **fixed** ("first-decade pace: $4,900" is labelled at 40 years).

## 3. New findings

- Should fix (layout): the locked-state chart is a thumbnail. Make it the same size as in explore, with the y-axis hidden or kept to the first decade.
- Minor: change the legend "7% of $1,000" to "7% of $1,000 each year" or "plain interest".
- Minor: 70 s chip (product-owner item).
- No FATAL. The doubling decade chips and the swelling top layer show the idea on stage, and both wrong guesses are placed visibly beside the true balance.
