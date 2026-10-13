# Fact-check: keeping-the-bad-gene (2026-10-13)

Checker: fact-checker (independent). Script: artifacts/scratch/fc-problife/l6.mjs. Stage text from the walkthrough transcript; the recursion q' = pq / (p^2 (1-s) + 2pq) read from Demo.tsx and re-implemented.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Overdominance with fitnesses AA = 1-s, Aw = 1, ww = 1-t has stable equilibrium q = s/(s+t); s = 0.15, t = 1 gives 0.15/1.15 = 0.1304 (13%). Local slope of the map at q* is 0.85 < 1, so the equilibrium is stable. |
| c2 | verified | From 1% w: 13.00% at generation 50 (round(100q) = 13 from generation 35 on); from 50% w: 13.05% at generation 50 (13 from generation 19). No-copy survival 95%: equilibrium 4.76%, 5.0% at generation 60 from the 50% start; from the 1% start it is 3.7% at generation 50 and 4.1% at generation 60, so the stage shows 4 of 100 there, "near 5%" is the equilibrium rather than a value reached by generation 60 from the rare start. 70%: 23.08% at generation 30 from either start. A finite population check (N = 20,000) lands at 12.8% after 60 generations. |
| c3 | verified | Rare w sits almost only in Aw (fitness 1, above the population mean p^2(1-s) + 2pq), so it rises; common w produces ww (fitness 0) more often, so it falls: the sign of the change flips at q*. Matches the recursion. |
| c4 | verified | Allison (1954), BMJ 1: 290-294, and Aidoo et al. (2002), Lancet 359: 1311-1312, are the standard references that sickle-cell trait protects against severe malaria. The lesson says its numbers differ from the real case. |
| c5 | verified (convention) | Stated on the stage ("Survival: no w 85%, one w 100%, two w 0%") and in the reveal ("made-up species, random mating, huge population"). |

Non-blocking: reveal says "the ring ended at the same place: 13 of 100 copies" for both starts at generation 60; true at the default 85% setting (13.03% and 13.04%). No unrecorded claims found.
