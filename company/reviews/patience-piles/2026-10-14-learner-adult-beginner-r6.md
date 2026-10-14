*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): patience-piles
lesson version: v3
boundary: an adult beginner who has played patience/solitaire and can sort by hand; can find a rising run by eye in a short list but has no method.
Screenshots seen: yes (artifacts/walkthroughs/patience-piles/sheet.png, 6 frames)
Verdict: launch

## 1. From the artifact

- Predict: unchanged and clear. "Pick cards left to right, skipping any, so each is bigger than the last", with 3 / 4 / 5. The locked stage shows the row 3 1 4 1 5 9 2 6 and an empty "new" pile. No leak.
- Explore: "Deal one by the rule" put 3 on a new pile ("3 → a new pile (no piles yet)"). "Deal the rest" now deals card by card with a caption for each. At 1.2 s it read "4 → a new pile: every top is smaller", with 1 already sitting on 3. So I watch the rule decide the interesting cards, not just the trivial one.
- "Trace from last pile" draws green arrows 6 → 5 → 4 → 1 across piles 4 to 1, and lights 1 4 5 6 in the card row. The caption reads "Each arrow: the smaller top on the pile to the left when that card landed". That is the back-pointer half of the why, drawn. Piles are now headed "pile k · top", so the arrow no longer means two things.
- The reveal points at what I saw: "4 piles", "as your trace drew". The other half of the why ("at most one card from each pile, since each pile goes downward") is visible in the piles (3 under 1 under 1; 4 under 2; 9 under 6), but nothing on stage says it. The objective asks for it, so I flag it. It is a short step from a picture I am looking at, so I do not block on it.
- QA path ends on "Trace back from pile 1", which replaces the 4-arrow trace with a one-card trace. At reveal, the stage no longer shows the arrows the reveal mentions (minor; a learner who stops at the last-pile trace keeps them).
- "3 4 5 9 is another" is told but checkable in the row by eye. It also answers the misconception (the run need not start at the smallest card).

## 2. Earlier findings (v2 review, r5)

1. "Deal the rest" hid 7 of 8 rule applications: **fixed** (animated, captioned per card).
2. Back-links not drawn; "←" collided with "points back": **fixed** (arrows drawn in the trace; top marked by the pile heading).
3. One example only for "always": **not fixed** (minor, acceptable in 60 s).
4. 70 s chip: **not fixed** (product-owner item).

## 3. New findings

- Minor: when the trace is drawn, a one-line stage hint for the upper bound, such as tinting each pile as "one card max" or the caption "a run takes ≤ 1 card per pile (each pile falls)", would make the second half of the objective shown, not only told.
- Minor: per-card captions during "Deal the rest" go by quickly. A slightly slower pace, or keeping "Deal one" active, helps a reader.
- Minor: re-tracing from pile 1 erases the full trace that the reveal refers to.
- No FATAL.
