*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r5, first learner review): queue-or-stack-same-search
lesson version: v2
boundary: from the brief: an adult who has seen breadth-first spread in waves (wave-from-the-corner), depth-first go deep (maze-depth-first) and knows queue = first in first out, stack = last in first out; does not know they are one algorithm with one line changed.
Screenshots seen: yes (artifacts/walkthroughs/queue-or-stack-same-search/sheet.png, 4 frames, plus 04-reveal.png opened singly)
Verdict: revise

## 1. From the artifact

- Predict: Nothing / The order places are visited / It no longer reaches every place: a real choice. Locked stage: two identical graphs (Queue, Stack), each with A taken and to-do "B C". No leak.
- Explore: "Take next" makes the difference visible at once: the queue takes B from the front, the stack takes C from the top; to-do lists read "C D E" and "B F". "Take the rest" finishes both: Order A B C D E F versus A C F E B D, both "to do: empty", with hop counts under each node. That is the idea, and I see it.
- **Where it loses me: the reveal stage breaks.** In the reveal frame the stage is drawn at several times its size and cropped: giant nodes "6", "6", "4", fragments "ps", "2 hops", "3 hops", and "Order: A C F E B" cut at the right edge. Confirmed in 04-reveal.png. The learner reads the reveal under a picture that no longer makes sense.
- **Second break: "Look at E" cannot be followed.** Once visited, each node shows its visit number instead of its letter (queue's E reads "5", stack's E reads "4"). The reveal asks me to look at E, 2 hops versus 3 hops, but no node on the finished stage says E. I have to reconstruct it from the starting picture. Keep the letter on the node (number as a badge) so E can be found.
- Tiny print: hop labels ("1 hop", "2 hops") and to-do chips are very small on phone.
- "Take the rest" jumps from step 1 to the end; the ring-by-ring versus deep-first pattern is visible only in the final orders, not as it unfolds (minor; "Take next" is there for a learner who wants it).
- Status chip reads DRAFT and the trust link "0/5 claims checked": nothing the learner reads is verified yet (fact-checker's item).

## 2. Earlier findings

No earlier learner review exists for this lesson (only a fact-check file).

## 3. New findings

- Reveal-state stage rendered oversized and cropped (blocking).
- Visited nodes lose their letters, so the reveal's "Look at E" points at nothing (blocking with the above).
- Tiny labels; 0/5 claims checked. No FATAL: the idea is shown well up to the final explore frame.
