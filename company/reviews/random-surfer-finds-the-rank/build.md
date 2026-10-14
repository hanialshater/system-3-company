# Build note: random-surfer-finds-the-rank

Builder: ncm-c · 2026-10-14 · from brief cs.algorithms, Course NCM #1 (simulation run), accepted version.

- Graph A->B, B->C, C->A, D->C, E->C; each click jumps to a uniform page (any of 5) with probability 0.15, else follows the one link. Seeded mulberry32 seed 146, two draws per click (jump test, jump target), start on A, count the page reached. Totals after n clicks do not depend on which buttons got there.
- My own run (node mirror, scratchpad ncmc/check.mjs): 100,000 clicks gives A 31,211, B 29,645, C 33,220, D 2,948, E 2,976 (A 0.3121, C 0.3322). Power iteration: A 0.3123, B 0.2955, C 0.3322, D = E = 0.0300. All within 0.005, as the brief requires. Seed 146 was the first tried (the brief author's number), not picked; seeds 7, 2026, 14 agree to 0.001.
- Controls: 1 click (note says jumped or followed, current page ringed), +1,000 clicks, Run to 100,000, Reset. Each page shows its share and a bar; readouts show A and C.
- Milestones `first-clicks`, `long-run` (100,000 reached). The reveal quotes the 100,000-click state (the seeded run the learner reached), so a Reset afterwards cannot make it quote zero.
- The why on stage: in-link counts are printed on each page, and C's only arrow goes to A, so the learner can see where A's visits come from; the reveal points at it (claim c4).
- Not run here: next build, typecheck, QA, walkthrough (per dispatch). Syntax-only TypeScript transpile passed. All 5 claims `unverified`.

## Pre-flight v3

Changes for r6 (knows-pagerank-basics, revise): new neutral title (the v2 title "One link, almost three links' worth" stated the answer). Each arrow's width and a small label now show the share of all clicks that followed it, so C to A is visibly heavy (28.1%) and D to C, E to C thin (2.5%); the reveal points at them (the told cause). The 100,000-click run is recorded, and after Reset the line under the stage reads "Your 100,000 run: A 31.2%, C 33.2%. Arrows C→A 28.1%, D→C 2.5%, E→C 2.5%." The "1 in" label for B moved left of the node, off the A to B arrow. Not changed: the first single click is a jump under seed 146 (minor; changing the seed would change every quoted number and the verified c1/c2 pair). Not built, typechecked or QA'd (batch instruction).

1. **Title and hook.** "Where does the clicker spend its time?" / "A random clicker roams five pages. Does the page with 3 in-links get 3 times the visits?" No: neither says whether A is near C.
2. **Options.** "About a third", "About half", "Almost the same": all verbal, none numbered.
3. **Locked stage.** Five pages with "1 in / 1 in / 3 in / 0 in / 0 in", A and C tinted (the two asked about), every arrow the same width, no edge labels, shares "–". Nothing matches "Almost the same".
4. **Reveal values.** 100,000 clicks, A 31.2%, C 33.2%: (b) milestone long-run; on the readouts and node labels, or on the recorded line after Reset. C to A 28.1%, D to C 2.5%, E to C 2.5%: (b) same milestone; arrow labels at 100,000, and all three in the recorded line after Reset. 0.312 / 0.332: told, computed PageRank (c2), not quoted as seen.
5. **QA path.** 1 click (first-clicks), +1,000 clicks, Run to 100,000 (long-run), Reset. Both milestones in three presses; no animation.
6. **Reset.** Reveal after Reset (traced from code, not run): "After 100,000 clicks your surfer spent 31.2% of its time on A and 33.2% on C. Three in-links against one, yet almost the same share. / Look at the arrows: C to A carried 28.1% of all clicks. A's one link comes from C, the busiest page, so a visit to C is followed by a trip to A unless the surfer jumps. D to C and E to C carried 2.5% and 2.5%: the surfer reaches D and E only by jumping. / Those shares are PageRank: the long-run fraction of time a random surfer who sometimes jumps spends on each page. Computed directly: A 0.312, C 0.332." After Reset the arrows are back to equal width, but the recorded line shows every quoted value. "Look at the arrows" reads best if the learner opens the reveal before Reset; after Reset the line carries it.
