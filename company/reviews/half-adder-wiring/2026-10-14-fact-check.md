# Fact-check: half-adder-wiring (2026-10-14)

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: (2).toString(2) = '10'; 0,1,2,3 = 0,1,10,11; rightOn() compares carry with floor((a+b)/2) and sum with (a+b) mod 2. |
| c2 | verified | Truth tables: XOR = a^b, AND = a&b, OR = a/b (apply() in Demo.tsx); RULE text shown for the selected sum and carry gates ('OR: 1 if either is 1' = at least one). |

**Result:** all claims in this pass verified.

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc21b/). Sources: opened where the proxy allowed (web search only; oeis.org, wikipedia.org, publisher PDFs blocked); citations I could not open are marked, and no verdict rests on an unopened source alone. E&K chapter placements are from memory (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node: (2).toString(2) = '10'; goal (carry, sum) = 00, 01, 01, 10. Predict question and stage goal row (Demo PAIRS) match. |
| c2 | verified | Own truth tables: AND 0001, OR 0111, XOR 0110 on 00,01,10,11; RULE strings and predict options state these rules. Patterson & Hennessy appendix lettering varies by edition, not opened; definitions do not depend on it. |
| c4 | verified | Own node: sum digits 0,1,1,0 = XOR; OR(1,1) = 1 vs goal 0; carry 0,0,0,1 = AND. Reveal text matches. |

**Result:** all open claims verified; lesson has no unverified or disputed claims from this pass.
