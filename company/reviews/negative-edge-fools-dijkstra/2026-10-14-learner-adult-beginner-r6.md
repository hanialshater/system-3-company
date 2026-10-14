*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): negative-edge-fools-dijkstra
lesson version: v3
boundary: adult learner who has done cheapest-is-not-shortest: knows settling the cheapest town first, and that road costs add along a route; does not know that a settled label is final only when no road is negative, or that checking every road repeatedly makes no such assumption (meta.json learner field; same as r5).
Screenshots seen: yes (artifacts/walkthroughs/negative-edge-fools-dijkstra/sheet.png, 8 frames; integrated build 3 at localhost:3470)
Verdict: launch

## 1. From the artifact (written before reading the earlier review)

- Predict: the hook no longer gives the answer away ("Cheapest-first settles each town for good. This map has one road that gives money back."). The stem still lists every road, so adding 3 − 2 = 1 is open to anyone who does it. A learner who trusts "settles for good" says 2, as I did. The trap is thin but honest.
- Top panel, "Cheapest first": I tap S, A, B, C in turn. Locks appear. Settling B shows the −2 road offering "1" crossed out against A's locked 2, with a red "too late". C is priced 4 from the locked A and locks at 4. The failure of the lock is seen, not told.
- Bottom panel, "Check every road": the roads now carry numbers #1 to #4 (S→A, A→C, S→B, B→A), and the caption says each pass checks them in that order. Pass 1 lights the roads and gives A 1, B 3, C 4. Here I see C priced from the old A (#2 before #4) and A fixed afterwards. Pass 2 lowers C to 3. The numbers now match "checks every road once, in order", and the knock-on error (C 4 → 3) is shown on stage.
- Reveal: it quotes exactly what I saw ("locked A at 2 ... too late"; "road #2 priced C at 4 from the old A ... Pass 2 ... lowered C to 3") and names the assumption ("no later road can make a settled town cheaper"). "Bellman-Ford keeps no locks ..." is one told context sentence. About 95 words.
- Show the why you promised: both doesNotKnow items are on stage. The lock fails at the "too late" mark. Re-checking without locks is the two passes, where A drops to 1 and C to 3. The reveal points at both. Pass.
- Minor (layout, carried from r5): two copies of the map stack on a phone. In frames 01 to 05 the Pass buttons are below the fold of the stage. At reveal the top panel ("too late") is scrolled off while the first reveal sentence describes it. The learner has to hold the top map in memory. This strains "one representation on a phone", but each panel tells its own half in sequence, so it is not a block for me.
- Minor: the stage text at once (two panel titles, two captions) is near the 25-word budget.
- No FATAL. The values check out: pass 1 gives A 1, C 4; pass 2 gives C 3.

## 2. Earlier findings (r5 review, v2)

1. Pass 1 left C at ∞ although "every road" was checked, so road order was invisible: **fixed** (roads numbered #1 to #4, and pass 1 now gives C 4).
2. "A corrected version still leaves C at 4" was told, not run: **fixed** (pass 1 shows A corrected to 1 with C still 4).
3. Hook said the lock gets undone: **fixed** (neutral hook). The stem still lists every cost, so the sum is open (minor).
4. Two stacked panels, Pass buttons below the fold, reveal scrolls the top panel off: **not fixed** (minor, see above).
5. 0/6 claims checked (routed): **fixed** (6/6).

## 3. New findings

- None beyond the minors above.
