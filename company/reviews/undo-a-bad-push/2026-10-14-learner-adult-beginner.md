*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: undo-a-bad-push
lesson version: v1
boundary: an adult beginner who can read a small diagram of pipes; has never heard of network flow; would "just push water where it fits".
Screenshots seen: yes (sheet.png, 6 frames, phone viewport)

## 1. From the artifact

- Prediction: "What is the most water that can flow from s to t?" 1 / 2 / 3. Looking at the diamond, two pipes leave s and two enter t, so a beginner who glances answers 2 and is right. The surprise the hook promises ("You can still be one short") is about a greedy push getting stuck, but the question does not ask about that. A learner who answers 2 gets "prediction held" and meets the stuck state as a curiosity, not a broken belief. (The walkthrough chose 1, so I saw the "Not quite" path.)
- Explore: the first push along s → a → b → t lights the zig-zag and the text says "Every forward route now has a full pipe". The two refusals ("pipe s→a is full", "pipe b→t is full") make the stuck state clear and convincing. Good.
- Where understanding first broke: the fix is a pre-written button, "s → b, send back a–b, a → t". The key idea (you may cancel earlier flow) is handed to me as a menu item rather than found. I tap it and get 2; I do not know why "sending back" is allowed in a pipe network. The orange dashed a–b after the undo is the only visual.
- "cut: 2 pipes leave s" appears with a dashed curve: a nice touch, but "cut" is a new word, and "no flow is bigger than the smallest cut" in the reveal is told.
- Reveal values (1, 2, s → b → a → t) all seen. No unvisited values. Ford–Fulkerson named, fine.
- Phone: reveal text fully visible; the "Total 2" label at the top of the stage is cut off on the reveal frame. Minor. Badge 70S.
- Reveal earned: "greedy can get stuck at 1" yes; "undo fixes it" shown but not discovered; the cut bound told.

Fixes (owner: builder):
1. Make the prediction test the misconception, e.g. "You push s → a → b → t first, then keep pushing along any open route. Where do you end up?" (1 / 2 / it depends), so the stuck 1 is the surprise.
2. Consider letting the learner tap the a–b pipe to "send it back" rather than offering the whole repaired route as one button.

## 2. After reading the brief

- Misconception: "push along any open route until none is left and you have the most". The prediction question asks the max-flow number instead, which the diagram makes easy, so the misconception is not committed to before the explore. The explore itself demonstrates the misconception failing well; the recall tests it directly.
- Objective otherwise delivered (stuck at 1, send back for 2, cut of 2), with the cut part told.
- 4 claims verified by others; I cannot vouch for them.

Verdict: revise
