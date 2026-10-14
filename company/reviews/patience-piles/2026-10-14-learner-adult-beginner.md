*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: patience-piles
lesson version: v1
boundary: an adult beginner who has played patience/solitaire; can find a rising run by eye in a short list but has no method.
Screenshots seen: yes (sheet.png, 5 frames, phone viewport)

## 1. From the artifact

- Prediction: "Cards 3 1 4 1 5 9 2 6 ... longest possible?" 3 / 4 / 5. A fair, quick guess; I chose 3 (I spotted 3 4 5 and stopped). Good: the card row is right there to look at.
- Explore: "Deal one by the rule" shows "3 → a new pile", then "Deal the rest" jumps to four finished piles. I never saw why 4 went on a new pile, or why 2 went on pile 2; the rule ("leftmost pile whose top is not smaller") is applied 7 times off-screen. The deal is the method, and I watched only its first card.
- Pile display: each column is labelled "pile 1 · top" above a stack 1 / 1 / 3. I cannot tell whether the top card is the one drawn first or last. The label "top" sits above all cards.
- Where understanding first broke: the trace-back. The walked path tapped "Trace back from pile 1" and got "Traced back from pile 1: 1." A one-card "run". Nothing told me to tap pile 4, which is the tap that would show a 4-card run. The panel never mentions tracing at all.
- Reveal quotes "1 4 5 6" and "3 4 5 9" as longest runs. Neither was ever highlighted on the stage on my path: the reveal quotes runs I never visited. The link "4 piles = run of 4" is therefore told, and the "every card points back to pile k − 1" argument is told with no pointers ever drawn.
- Phone: reveal fully visible; card row at the top of the stage is in view. Badge 70S.
- Reveal earned: "4" yes (I can check 1 4 5 6 against the row myself); "the number of piles always measures it" no.

Fixes (owner: builder):
1. Make the panel say "Tap the last pile to trace a run back", or auto-trace from the last pile when dealing ends, highlighting the 4 cards in the row.
2. Let "Deal the rest" animate card by card (or make "Deal one" the main path) so the rule is seen at least a few times.
3. Quote in the reveal the run the learner's trace produced, not a fixed example.
4. Make the "top" of each pile unambiguous (label the top card, not the column).

## 2. After reading the brief

- Objective has three parts: 4 piles (shown), at most one card per pile (told), back-pointers give a run as long as the pile count (told; the back-pointer trace exists but the walked path does not reach the useful one). The recall question tests exactly the told link.
- Misconception ("longest run starts at the smallest number") is addressed only by one sentence in the reveal; the prediction options do not test it.
- 5 claims verified by others; I cannot vouch for them.

Verdict: revise
