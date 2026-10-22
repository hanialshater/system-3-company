# Fact-check: one-link-back-grows-the-core v1

checker: fact-checker · date: 2026-10-22 · verdict: **pass**

Read in this order: artifacts/walkthroughs/one-link-back-grows-the-core/transcript.md and its screenshots, then meta.json claims, Demo.tsx and the brief (company/domains/briefs/cs.systems.md #8). I did not read build.md or design.md.

## Re-derivations

I recomputed the strongly connected components in node over the edge list in Demo.tsx (`BASE` plus the back links). It agrees with the trust sheet's edge list:
- none: {A,B,C,D}, with E, F, G, H, I, J each alone → core 4
- I → F: {A,B,C,D,E,F,H,I}, with G and J alone → core 8
- J → G: {A,B,C,D,G,J}, with E, F, H and I alone → core 6
- both: all 10 → core 10

The stage readouts, the chip traces (✓ 8, 6, 10, 4) and the filled nodes in 02-step-1.png match. The loops named in the reveal exist edge by edge: F→E→A→B→C→H→I→F and J→G→B→C→D→J. "G still can't be reached from the core": G has no in-links unless J→G is added. "J can't click back": J has no out-links unless J→G is added. Both are true.

General rule (c3): the core reaches u and v reaches the core. After u → v is added, a page w is in the core's SCC iff the core ⇝ w ⇝ the core. A new path through the edge exists iff v ⇝ w ⇝ u, so w lies on a cycle through u → v. The rule holds.

Source for c2: E&K's table of contents lists §13.3 "The Web as a Directed Graph" (it defines strongly connected components) and §13.4 "The Bow-Tie Structure of the Web" (https://www.cs.cornell.edu/home/kleinber/networks-book/). The sentence is also true straight from the definition of an SCC.

## Claim status changes

| claim | new status | note |
|---|---|---|
| cs.one-link-back-grows-the-core.c1 | verified | I recomputed the SCCs in node from the Demo.tsx edges: 4 / 8 / 6 / 10. Both loops checked edge by edge. |
| cs.one-link-back-grows-the-core.c2 | verified | True by the SCC definition. E&K ch. 13 TOC confirms §13.3 (directed graph, SCCs) and §13.4 (bow-tie). |
| cs.one-link-back-grows-the-core.c3 | verified | Derived: w joins iff v ⇝ w ⇝ u. On the stage this gives c1's sets. |
| cs.one-link-back-grows-the-core.c4 | verified | A disclosure: the stage is a 10-node toy graph. |

## Unrecorded claims

None. The hook, predict premise, readouts, traces, reveal and recall map to c1–c4.

## Advisory (not blocking)

c3's wording "not every IN and OUT page" means "not necessarily every". If every IN and OUT page lay on such a loop, all of them would join. The lesson's stage never shows that case, so I verify the claim as written.
