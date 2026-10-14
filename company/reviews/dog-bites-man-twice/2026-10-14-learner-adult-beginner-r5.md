*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): dog-bites-man-twice
lesson version: v2
boundary: adult beginner; has heard "attention" and "vectors"; can't compute a dot product.
Screenshots seen: yes (artifacts/walkthroughs/dog-bites-man-twice/sheet.png, plus 01-predict.png)
Verdict: launch

## 1. From the artifact

- Predict: the question gives the three toy vectors and asks whether "bites" gathers the same summary in both orders. The locked stage shows the three words, the plot and two empty readouts. Nothing leaks. But the locked stage renders shrunk: the word chips and the plot labels ("man", "bites", "dog", axis ticks) are very small on a phone, about a third of their explore-time size.
- Explore: "Swap dog and man" fills both readouts with (0.79, 0.79), and the arrow lands on the ring from the first order. That is the core idea, shown on stage: same set of words, same arrow. "Position tags: on" relabels the chips "#1 #2 #3" and the readouts split to (1.30, 0.89) vs (1.62, 0.59), with the arrow moving off the old ring. The contrast is visible without reading the reveal.
- Reveal: it repeats the two numbers I saw and says "attention sees which words are present, not where". That answers the question I actually had. What it does not answer is *why* the weights ignore order. The stage never shows the attention scores or weights, so "weighted by attention" stays a black box. For this boundary the claim (same words means same blend) is still graspable from the equal readouts.

## 2. Earlier findings (r2 review, v1)

1. Locked chart is a tiny thumbnail: **not fixed**, minor (still shrunk at predict; legible once unlocked).
2. meta.json version not bumped: **fixed** (now version 2).
3. Findings fixed in r2 (paired readouts, jargon, ring label, reveal chart size): still fixed.

## 3. New findings

- Minor: the caption says "Blue arrow" but the arrow is drawn purple/lilac in every frame. There is only one arrow, so a learner will probably map it, but the label is wrong.
- Minor: the locked-stage plot is drawn at reduced scale, so its labels are hard to read at predict time (01-predict.png).
- Minor: the weights are never shown. A learner who wants to know *why* order does not matter has only "attention sees which words are present" to go on. Showing the three weights (0.21 / 0.58 / 0.21) next to the chips would let the stage carry that too.
- No FATAL.
