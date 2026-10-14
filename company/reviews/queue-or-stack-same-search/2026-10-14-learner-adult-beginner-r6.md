*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): queue-or-stack-same-search
lesson version: v3
boundary: from the brief: an adult who has seen breadth-first spread in waves (wave-from-the-corner) and depth-first go deep (maze-depth-first), and knows queue = first in first out and stack = last in first out; does not know they are one algorithm with one line changed. (Same as r5.)
Screenshots seen: yes (artifacts/walkthroughs/queue-or-stack-same-search/sheet.png, 4 frames; integrated build 3 at localhost:3470)
Verdict: launch

## 1. From the artifact (written before reading the earlier review)

- Predict: three real options (Nothing / The order places are visited / It no longer reaches every place). The locked stage has two identical six-place maps, Queue and Stack, each with A taken and to-do "B C". The caption "One difference: take from the front, or the top" says the two runs share one procedure. That is the doesNotKnow "one algorithm, one line changed", stated on the stage itself. No leak of the outcome. The hook's "see what shifts" leans slightly away from "Nothing" (minor).
- Explore: "Take next" splits them at once. The queue takes B from the front (to-do C D E), the stack takes C from the top (to-do B F), and the taken chip is outlined. "Take the rest" finishes both: Order A B C D E F against A C F E B D, both to-do empty. Nodes keep their letters and carry a small visit-number badge plus a hop count. E is circled with a dashed ring: "2 hops" on the queue side, "3 hops" on the stack side.
- Ring by ring is visible: the queue's badges 1, then 2 and 3 on the 1-hop pair, then 4 to 6 on the 2-hop row. The stack's badges zig-zag down the right side. The reveal points at the circled E and at the badges.
- Reveal: "Both lists reached all six places" (seen), the two orders (seen), "Same steps; only which waiting place came next changed" (pointing at the caption), E 2 hops vs 3 (seen and circled). "Taking ring by ring is why a queue finds routes with the fewest hops" is one sentence, but it points at the ring-by-ring badges and the circled E that the stage just showed. Show the why you promised: pass. The reveal stage now renders at normal size.
- Minor: hop labels, badges and to-do chips are very small on a phone (two maps side by side at half width).
- Minor: "Take the rest" jumps from the first step to the end, so the deep-first path is read off badges afterwards, not watched. A learner can keep pressing "Take next" instead, but the QA path does not.
- Minor: in the reveal frame the stage caption is cropped at the top edge.
- No FATAL. Orders and hop counts check out against the drawn edges (A–B, A–C, B–D, B–E, C–F, E–F).

## 2. Earlier findings (r5 review, v2)

1. Reveal-state stage oversized and cropped: **fixed**.
2. Visited nodes lost their letters, so "Look at E" pointed at nothing: **fixed** (letters kept, number badges, E circled).
3. Tiny labels: **not fixed** (minor).
4. "Take the rest" jumps to the end: **not fixed** (minor).
5. 0/5 claims checked (routed): **fixed** (5/5).

## 3. New findings

- Minor: hook "see what shifts" hints that something changes.
