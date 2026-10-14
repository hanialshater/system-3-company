# Fact-check: probing-clusters-grow (2026-10-14)

## Pass 10 (2026-10-14)

Checker: fact-checker (did not write these claims; any claim marked 'recorded by the fact-checker' is a quote of the builder's stage text). Method: no walkthrough transcript exists for this lesson yet, so I read Demo.tsx as rendered text (every learner-visible string, including dynamic ones) before the claim sources, then re-derived every number in my own node scripts (own copies of mulberry32 and of each algorithm; scratchpad fc10/a.mjs, b.mjs, c.mjs, d.mjs) and checked citations. Egress to most publisher pages is blocked, so book passages I could not open are said so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node exhaustive over 10 hash values with 2, 3, 4, 7 full: slot 0: 1, 1: 1, 5: 4, 6: 1, 8: 2, 9: 1. |
| c2 | verified | CLRS 3rd ed. 11.4: an empty slot preceded by i full slots is filled next with probability (i + 1)/m; c1 is the m = 10 case. |
| c3 | verified | CLRS 3rd ed. 11.4 names it primary clustering; Knuth TAOCP Vol. 3, 6.4. |
| c4 | verified | Knuth 6.4 formula (1 + 1/(1 - a)^2)/2 is the linear-probing unsuccessful-search approximation; own node sim (m = 1000) gives 2.46, 11.98, 40.1 probes at a = 0.5, 0.8, 0.9 against 2.50, 13.0, 50.5: grows as stated. Own mulberry32 seed 2 run: probes 2, 3, 5, 5, 3, 6. |
| c5 | verified | Own mulberry32(2) hashes 7, 3, 2, 5, 8, 6; keys 2 and 3 land in slots 5 and 6; run 2..8 = 7 after key 3. Seeds 1-8 reach a run of 5 after 3, 3, 4, 3, 3, 3, 2, 3 inserts, as the source says. Chosen seed disclosed. |

**Result:** all claims in this pass verified.
