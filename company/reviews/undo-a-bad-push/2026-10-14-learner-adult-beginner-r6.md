*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): undo-a-bad-push
lesson version: v3
boundary: adult beginner who knows paths in a graph and that a greedy choice can fail (coin-greedy-trap); has never heard of network flow or cuts; would "just push water where it fits".
Screenshots seen: yes (artifacts/walkthroughs/undo-a-bad-push/sheet.png)
Verdict: launch

## 1. From the artifact

- Hook and predict: the hook is now neutral ("Push water down any open route until none is left. Is that the most?"). The question fixes the greedy rule. "1: stuck" is right under that rule, and "2" is the greedy believer's answer. The locked stage shows the diamond with five 0/1 pipes. Nothing leaks.
- Explore: s → a → b → t fills three pipes ("Total 1. Every forward route has a full pipe."). s → a → t and s → b → t each fail with the full pipe named. I watch myself get stuck. The rescue is now a row "Send 1 back along: s→a s→b a→b a→t b→t", so I choose the pipe. s→a gives "Back along s→a only returns water to s. Total still 1." a→b makes the pipe drop to 0/1 (brown dashed), s–b and a–t fill, and the stage reads "Water went s → b, back along a–b, then a → t: total 2". A dashed "cut: 2 pipes leave s" curve appears. The before and after of a–b emptying is the moment, and it is mine to find.
- Where it could still lose a beginner: one tap on "a→b" does both the undo and the new route. The learner never pushes s → b → a → t themselves, so "taking water back" and "a new route opens" arrive as one event. The stage sentence names both halves, which helps. Minor.
- Reveal: it quotes the stage (stuck at 1, a–b dropped to 0/1, total 2) and points at the dashed cut line. "All water must cross that line, so no flow can beat 2" is one told sentence resting on the drawn cut. It ends on the idea.
- Minor: on the reveal frame the graph's top (including "Total 2") scrolls off the phone card, as in r5.
- Minor: 70s chip (product-owner item); trust link 1/4 claims checked (fact-checker's lane).
- No FATAL.

## 2. Earlier findings (r5 review, v2)

1. Hook "You can still be one short" leaked the answer: **fixed** (neutral hook).
2. The rescue was a pre-named route, and the caption said routes may go backwards: **fixed**. The learner picks which pipe to send back along, wrong choices explain themselves, and the caption hint is gone.
3. Min-cut bound and Ford–Fulkerson told as a second idea: **fixed**. The name is dropped and the bound is one sentence pointing at the drawn cut.
4. Graph top cropped on the reveal frame: **not fixed** (minor).
5. Trust link: now 1/4 checked (it was 2/4). The claims were probably reset by the v3 edits. Fact-checker's lane.

## 3. Brief check (show the why)

- doesNotKnow 1 (sending flow back can increase the total): shown. The learner sends a–b back and sees the total go 1 to 2, and the reveal points at a–b dropping to 0/1.
- doesNotKnow 2 (max flow = min cut): the cut is drawn on stage with "2 pipes leave s", both full, and the reveal points at it. It meets the told-vs-shown rule at this example's scale.
