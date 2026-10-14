# Fact-check: broker-between-two-groups (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx (stage, reveal, model) before claim sources; re-ran the numbers with my own node scripts copying the lesson's logic (scratchpad fc22); sources checked by web search where reachable. Source hosts (JSTOR mirrors, Wikipedia, the E&K book host) were blocked, so citations are confirmed bibliographically only and say so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | own adjacency (scratchpad fc22/broker.mjs): degrees 5,6,6,5,5,5,4,4,3,3,4; stranger pairs Hana 0, Bo 4. |
| c2 | verified | independent betweenness by enumerating all shortest paths (not Brandes): 0,10,10,0,0,0,7,7,0,0,24; all 24 cross pairs have every shortest path through Bo; Hana 0. |
| c3 | verified | same script: nodes 1 and 2 (degree 6) score 10 = 20 pairs x 1/2. |
| c4 | verified | Burt, Structural Holes, Harvard UP (1992) confirmed bibliographically via search (SSRN listing); not opened. E&K ch. 3 section 3.5 'Closure, structural holes, and social capital' from memory (confident). The stage shows Bo out-brokering the two best-connected people, which supports 'can matter more'. |

**Result:** every claim open at this pass is now verified.
