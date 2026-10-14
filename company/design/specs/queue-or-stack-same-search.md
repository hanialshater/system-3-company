# Spec: queue-or-stack-same-search

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #3 · wireframe: `queue-or-stack-same-search.svg`

## Brief problem (route to cm-cs before build)
**The brief's stack order is wrong for the graph as drawn.** On the undirected graph A-B, A-C, B-D, B-E, C-F, E-F from A, with neighbours added in alphabetical order, the stack visits **A C F E B D**, not A C F B E D. The brief's order is what you get if the edges are one-way (A→B, …, E→F), so F has no way on to E. The queue order A B C D E F is right. Designer's node check (2026-10-14, both "mark when added" and "mark when taken" give the same stack order here):

| Take | Queue: took · to-do after | Stack: took · to-do after |
|---|---|---|
| 1 | A · B C | A · B C |
| 2 | B · C D E | C · B F |
| 3 | C · D E F | F · B E |
| 4 | D · E F | E · B |
| 5 | E · F | B · D |
| 6 | F · (empty) | D · (empty) |

Claim (1) in the brief must change to A C F E B D. The answer (B) and the payoff stand. This spec uses the corrected order.

**Second note for the fact-checker:** the stack search here marks a place when it is added to the to-do list (so the list never holds a place twice). That is "one line changed" from BFS, but in general it is not exactly recursive DFS order. On this graph both give A C F E B D. The learner-facing wording should say "goes deep first", not "is exactly DFS".

## Why this format: Side-by-side comparison (changed from the brief's Before / after toggle)
The misconception is "they are two different algorithms". The learner has to see the *same* steps applied to the *same* graph, with one difference. The brief's toggle "switches the strip type and resets the run", which empties the first run before the second exists. The learner must then hold one visit order in memory to compare, and the stage at the reveal would show only one run. Two panels driven by one shared button keep both runs on screen, step for step, so the moment they part (take 2: B versus C) is seen, not remembered. The catalogue lists comparison for "two methods, where the misconception is that they behave the same".

## Stage at 390×844 (~300 px at predict, ~460 px in explore)
1. Rule line (muted, 17 words): "Same search: take a place, add its unseen neighbours. One difference: take from the front, or the top."
2. **Two panels side by side**, each ~178 × 250 px, titled "Queue" and "Stack".
   - The same 6-node graph in each, laid out in rings from A: A at the top, B and C in the middle row, D E F at the bottom (E-F is the bottom-row edge). Node circles 30 px.
   - A visited node is filled and carries its visit number (1–6) inside, and below it **hops**: the length of the route by which the search found it (the edge it was added from is drawn thick). Unvisited nodes are hollow.
   - Under the graph: the **to-do strip**, a row of letter tiles in the order they were added. Queue panel: an arrow and "front" on the left end. Stack panel: an arrow and "top" on the right end. During explore, the tile that will be taken next is outlined.
   - Under the strip: "Order: A C F …" (letters taken so far).
3. Below both panels: the two controls, full width.

## Controls, in DOM order (2)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Take next" | both panels take one place: the queue from its front, the stack from its top. The taken node fills and gets its number and hops; its unseen neighbours join the strip (alphabetical). Disabled once both strips are empty |
| 2 | Control | "Take the rest" | enabled only after "Take next" has been pressed once, so the split at take 2 is always seen by the learner's own press first. Plays the remaining takes one at a time, about 70 ms apart (all within 400 ms; instant under reduced motion), every intermediate state drawn. Disabled when both strips are empty |

No reset and no toggle: nothing empties the stage. Both controls render at first paint, disabled while `locked`, with `.tap` (44 px).

QA path: Take next (queue takes B, stack takes C: milestone 1) · Take the rest (both strips empty, all six visited in both: milestone 2). The reveal stage holds both complete runs.

"Take the rest" is not a jump to the answer: the answer (the order changes) is already on the stage after the learner's own first press. What it finishes is the evidence against option C (both runs still reach all six), and it draws every take on the way.

## States
- **Predict:** both panels identical. A is taken (filled, "1", hops 0), strips read "B C" in both, order line "Order: A". No next-tile outline while locked, so nothing hints which end is used. Controls disabled.
- **Take next (take 2):** queue takes B (front), strip "C D E"; stack takes C (top), strip "B F". The panels now differ for the first time.
- **Takes 3–6:** queue fills the middle row, then the bottom row, left to right: hops 0 1 1 2 2 2. Stack dives C → F → E, then comes back up for B, then D: hops 0 1 2 3 1 2. The thick edges show the stack reached E through F (A-C-F-E, 3 hops), while the queue reached it through B (A-B-E, 2 hops).
- **Reveal:** stage unchanged: both graphs fully numbered, both order lines complete, both strips empty. The reveal quotes the learner's states: "Both lists reached all six places. The queue took A B C D E F, ring by ring. The stack took A C F E B D, going deep first. Same steps; only which waiting place came next changed. Look at E: the queue found it 2 hops from A, the stack 3. Taking ring by ring is why breadth-first finds fewest-hop routes."

Milestones (`minInteractions=2`): `split` (the two runs have taken different places, i.e. take 2 done), `both-done` (both strips empty with all six visited).

## Shown, not told
The learner presses one button and sees one picture split into two orders. The ring layout makes "ring by ring" visible as rows filling in, and the hops numbers make "fewest-hop routes" a thing they can point at (E: 2 versus 3). The reveal only names BFS and DFS for what they watched.

## Answer visibility
Locked stage: the two panels are identical (A taken, "B C" in both strips), no next-tile outline, order lines "A". Title must not say "same search" or "order" (the slug does; it appears only in the URL). No axis.

## Colour and access
Visited fill `--domain` with `--bg` ink for the number; hollow nodes `--line`. Thick discovery edges `--fg`, other edges `--line`. The next tile has a 2 px `--fg` outline plus the "front"/"top" arrow: shape and position, not colour. Each panel's `aria-label`: "Queue: took A B C, to-do D E F". Numbers are integers.

## Claims this spec touches
Claim (1) corrected as above (simulation). Claims (2) and (3) unchanged. The rule line is a claim about both runs (derivation from the code).
