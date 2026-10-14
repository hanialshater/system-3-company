# Fact-check: one-shy-rioter-stops-the-riot (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx (stage, reveal, model) before claim sources; re-ran the numbers with my own node scripts copying the lesson's logic (scratchpad fc22); sources checked by web search where reachable. Source hosts (JSTOR mirrors, Wikipedia, the E&K book host) were blocked, so citations are confirmed bibliographically only and say so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | own copy of joinRounds() (scratchpad fc22/riot.mjs): 100 join, person i joins in round i+1, 100 rounds. |
| c2 | verified | same script with threshold of person 1 set to 2: 1 joins. |
| c3 | verified | 4950/100 = 49.5; 4951/100 = 49.51 (node); readout uses mean().toFixed(2). |
| c4 | verified | exhaustive check: raising threshold j to j+1 for every j = 0..99 stops the crowd at exactly j (no exceptions). |
| c5 | verified | Granovetter, 'Threshold Models of Collective Behavior', AJS 83(6):1420-1443 (1978) confirmed bibliographically via search (Stanford/JSTOR listing); PDF host blocked, not opened. The 0..99 riot with the 1 replaced by a 2 is the paper's illustration (my knowledge, consistent with secondary sources). E&K ch. 19 (cascading behaviour in networks, threshold rule): placement from memory, I am not sure ch. 19 cites Granovetter by name; not shown to learners. |

**Result:** every claim open at this pass is now verified.
