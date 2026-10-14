# Spec: heapify-from-the-bottom

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #29 · wireframe: `heapify-from-the-bottom.svg`

**Format: Side-by-side comparison.** Two ways to build the same max-heap from the same 7 cards: bottom up (sift each parent down) against one by one (insert and bubble up). The misconception is "building costs n insertions". Only a second tree, built the other way with its own swap counter, can show that the two methods cost different amounts.

## Answer check (designer node run, 2026-10-14)
Array 1 2 3 4 5 6 7 in level order (root 1; children 2, 3; leaves 4–7).
- Bottom up: parent at position 3 (card 3) swaps with 7 (1 swap). Position 2 (card 2) swaps with 5 (1). Root (card 1) swaps with 7, then with 6 (2). **4 swaps**, heap **7 5 6 4 2 1 3**. 4 is the maximum over all 5,040 orders.
- One by one: inserting 1…7 costs +0 +1 +1 +2 +2 +2 +2 = **10 swaps**, heap 7 4 6 1 3 2 5. 10 is also the maximum over all orders for insertion.
- **The brief's answer is right.**

**Brief problem (payoff wording):** "half the nodes are leaves and never move" is false in this very run. Cards 7, 5 and 6 start at leaves and move up, and 1 and 3 end at leaves. What is true is that **no sift starts at a leaf**: leaf positions do no work of their own, and a node one level up sinks at most once. The reveal below uses the true version. cm-cs should correct the payoff line and the claim wording.
**Interaction change:** "sift down one level at a time" would need two presses on the root, and QA presses each control once. Here one tap sifts a parent all the way down, animating each swap (120 ms per level) and counting it. The swaps stay visible, one by one.

## Stage at 390×844 (~470 px)
1. Rule line (muted, 14 words): "Cards 1–7; the biggest must sit on top. Tap a parent to sift it down."
2. Two panels side by side, each 175 × 300:
   - **Bottom up** (left): the tree with 1 at the root. The three parent nodes are 44 px round `Control` buttons. The leaves are plain 32 px circles (not controls). Under each parent, after its sift, a badge shows how far it sank ("↓1", "↓2"). Readout "Swaps: ?", then a muted note: at predict "parents: 3, then 2, then 1"; once both lower parents are done, "top unlocks: its children are fixed"; at the end, "no work started at a leaf".
   - **One by one** (right): a ghost tree of 7 dashed slots. Readout "Swaps: ?" and a queue line "next: 1 2 3 4 5 6 7". After the inserts it becomes "climbs: +0 +1 +1 +2 +2 +2 +2". Under the panel are two buttons.

Stage words ≈ 24 (rule, panel titles, note), not counting readouts.

## Controls, in DOM order (5)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control (tree node, position 3) | the card at that spot, aria "Sift down the third parent" | sifts that card down to its place. Each swap animates (≤ 120 ms per level) and adds 1 to Swaps. Becomes disabled and "done" (muted ring). Enabled from unlock |
| 2 | Control (tree node, position 2) | aria "Sift down the second parent" | same. Enabled from unlock |
| 3 | Control (root) | aria "Sift down the top" | enabled only when both lower parents are done (bottom-up order is the brief's method). Sinks 1 two levels (2 swaps, 240 ms). This is the key state: 7 5 6 4 2 1 3, Swaps 4 |
| 4 | Control | "Insert next" | adds the next card at the first empty slot and bubbles it up, animating each swap. The climb is appended to the line |
| 5 | Control | "Insert the rest" | inserts the remaining cards in order, one after another, in ≤ 400 ms total (instant under reduced motion), each swap counted. Disabled when the queue is empty. This is the comparison run, not the asked answer, and it lands on 10, the distractor |

The DOM order is the sift order (3, 2, root), not top-to-bottom. Visual focus order follows the DOM, and the aria labels say which parent. All five controls render at first paint, disabled while `locked`. There is no reset, because the reveal needs both trees.

QA path: position 3 (1 2 7 4 5 6 3, Swaps 1) · position 2 (1 5 7 4 2 6 3, Swaps 2) · root (7 5 6 4 2 1 3, Swaps 4; milestone 1) · Insert next (card 1 placed, +0: the stage changes, since the card appears) · Insert the rest (7 4 6 1 3 2 5, Swaps 10; milestone 2).

## States
- **Predict:** the left tree is 1 / 2 3 / 4 5 6 7 with parents disabled. The right is a ghost tree. Both say "Swaps: ?". The hook ("Seven cards, biggest on top" / "Build a heap: one card at a time, or all at once?") names no number.
- **After the two lower parents:** 7 and 5 have risen, "↓1" sits under each lower parent, Swaps 2, and the root's ring is now enabled.
- **After the root:** 1 sinks past 7, then past 6. "↓2" sits at the root. Heap 7 5 6 4 2 1 3, Swaps 4. The leaves carry no badge: nothing was sifted there.
- **One by one:** each new card is the biggest so far and climbs to the top, or as high as the tree allows. Climbs +0 +1 +1 +2 +2 +2 +2, Swaps 10.
- **Reveal:** the stage stays as left (both trees built, both counters). The reveal quotes them:
  > Bottom up took 4 swaps: 3 and 2 sank one level each, then 1 sank two from the top. The four bottom spots have no children, so no sift started there. One by one took 10: every new card was the biggest so far and climbed as high as the tree allowed. In any heap about half the spots are leaves and a quarter sit one level up, so building from the bottom stays under 2n swaps. (≈ 72 words)

Milestones (`minInteractions=2`): `heap-built` (root sifted, Swaps 4), `inserted-all` (queue empty, Swaps 10). The reveal names 10 only because the milestone guarantees the learner made it.

## Shown, not told
The badges are the payoff: ↓1, ↓1, ↓2 on the three parents, nothing on the four leaves, against seven insert climbs that keep getting longer. The learner counts the work by position before the reveal names the half-and-quarter pattern.

## Colour and access
Active parent: 2.5 px `--fg` ring. Done: muted ring. Disabled root: `--muted` number plus the note text (not colour alone). The swap being animated is drawn in `--domain` with an `--fg` arrow. Parent nodes are 44 × 44 tap targets. Leaves are 32 px, which is fine because they are not controls. Bottom-row spacing at 175 px panel width is 43 px, so the 32 px circles do not touch. No illustration.

## Claims this spec adds
The two traces above (simulation). "No sift starts at a leaf" replaces the brief's "leaves never move" (derivation). "Under 2n swaps" is brief claim 2 (CLRS 6.3). The total is at most the sum of node heights, which is under n (4 of 7 here); 2n is the brief's loose form, and it is true.
