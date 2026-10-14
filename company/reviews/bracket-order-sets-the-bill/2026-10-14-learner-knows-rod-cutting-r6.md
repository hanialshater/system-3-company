*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): bracket-order-sets-the-bill
lesson version: v2
boundary: knows-rod-cutting (from meta.json learner.knows: has built tables of smaller answers for rod cutting; does not know that the same matrix product can cost 6 times more in a different bracketing). Assumed to know what a matrix is but not to have priced a product.
Screenshots seen: yes (artifacts/walkthroughs/bracket-order-sets-the-bill/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: the hook "Same three matrices, same answer. Same cost?" is a real question. The locked stage shows the three shapes drawn to scale (A 10×30 box, B 30×5 tall sliver, C 5×60 long strip) for both orders, and the cost axis is empty. Nothing leaks. "Equal" is the natural guess and I took it.
- One weakness: the stem gives the p·q·r rule and all the sizes, so a careful learner can work out 6x before committing. That makes the prediction an arithmetic task rather than a gut call. "About 2x" is a decent distractor, but "6x" is a suspiciously specific option.
- Explore: four buttons, one multiplication each. "Multiply A·B" collapses A and B into a tiny AB 10×5 box with "10·30·5 = 1,500". "Then (AB)·C" gives R 10×60 for 4,500 in total. "Multiply B·C" makes a big filled BC 30×60 slab for 9,000 at once, and the bottom bar passes the whole top bill at that moment. "Then A·(BC)" reaches 27,000 and "✓ same 10×60 as above". The cause (the middle product's size) is drawn as the box, and the cost bars on one axis make the 6x visible.
- Reveal: points at what was seen: 4,500 vs 27,000, "the middle box you made first: 10×5 against 30×60", the slab alone cost 9,000. The last sentence (try every split point, shortest sub-chains first) is told context about the general algorithm; it is outside the brief's gap.

Told vs shown check (brief): doesNotKnow "the same product costs 6 times more in a different bracketing" is the two bars. The objective's "the bracketing changes the size of the middle product and so the cost" is the AB sliver vs the BC slab. Both shown.

## 2. Earlier findings

No earlier learner review exists. Boundary taken from meta.json.

## 3. New findings

- Minor: the p·q·r rule and the sizes in the stem let a learner calculate the answer before committing. Consider leaving the rule on the stage only (it is already there) and asking for a gut call.
- Minor: the DP sentence ("trying every split point of every sub-chain ...") is the bridge to the prerequisite (rod cutting) but nothing on stage stands for it. That is fine under the scope rule; a recall question should not lean on it.
- Minor: in the reveal frame the top half of the stage (the (AB)C row) scrolls off; the bars stay visible.
- No FATAL.
