# Fact-check: queue-or-stack-same-search (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each claim; re-derived by hand or in node (scratch scripts re-implementing or extracting the lesson model); web sources where named.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Hand-simulated Demo.tsx run(): queue (shift) A B C D E F; stack (pop) A, push B C, pop C, push F, pop F, push E, pop E, pop B, push D, pop D = A C F E B D. |
| c2 | verified | Both orders contain all of A-F; graph is connected. |
| c3 | verified | Queue: E added from B, hops 2. Stack: E added from F (F from C), hops 3, path A-C-F-E. True shortest A-E = 2 (A-B-E). Stage hop labels come from the same hops record. |
| c4 | verified | CLRS 3e section 22.2, Lemma 22.3 / Corollary 22.4 (queue holds at most two consecutive distances, nondecreasing) and Theorem 22.5 (BFS computes shortest-path distances); 4e section 20.2, Theorem 20.5. Cited from memory; confirmed on this graph by the c3 simulation (queue order is by hop count 0,1,1,2,2,2). |
| c5 | verified | Demo.tsx run(fromTop): single loop; only branch is todo.pop() vs todo.shift(). Note for builder (no stage impact): the source says stack order "equals recursive DFS order"; true only if recursive DFS visits neighbours in reverse alphabetical order (alphabetical recursive DFS gives A B D E F C). The stage only says "going deep first", which holds. |
