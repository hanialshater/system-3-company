*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: connect-the-towns-cheaply
lesson version: v1
boundary: adult beginner (can add; has not seen the coin-greedy lesson for certain; never heard of spanning trees or Kruskal).
Screenshots seen: yes

## From the artifact
- First needed an idea I didn't have: the hook's "Greedy failed with coins" assumes a previous lesson; without it the question "should you trust cheapest first?" has no doubt behind it.
- Prediction too easy: the three cheapest cables (AB 1, CD 1, BC 2) already connect all four towns without a loop, so 4 is the obvious answer. The case never puts greedy at risk.
- Told, not shown: the loop rule is the whole idea, but no loop is refused while it matters. BD, AC, AD are refused only after "All four towns joined for 4", so the refusals look like tidying up, not a decision. "A skipped loop never blocks a better choice later" (the contrast with coins) is reveal text only.
- Shown well: green laid cables, red dashed refused ones, struck-through chips, running total.
- Layout: on the phone reveal the last paragraph is cut off at "Cheapest first, skipping loops, always gives the" ; the Kruskal sentence and the coins contrast are not visible.

## Fix suggested
Choose costs where a cheap cable would close a loop before all towns are joined (e.g. make AC the second-cheapest), so the refusal is visible mid-build and the total is less obvious; fix the reveal clipping.

## After reading the brief
Learner field assumes coin-greedy-trap and knowing what a loop is. With that, the hook works, but the prediction still does not test greedy. Claims 5/5 checked.

Verdict: revise
