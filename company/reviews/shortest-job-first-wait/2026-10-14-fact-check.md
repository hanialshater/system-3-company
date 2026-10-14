# Fact-check: shortest-job-first-wait (2026-10-14)

## Pass 10 (2026-10-14)

Checker: fact-checker (did not write these claims; any claim marked 'recorded by the fact-checker' is a quote of the builder's stage text). Method: no walkthrough transcript exists for this lesson yet, so I read Demo.tsx as rendered text (every learner-visible string, including dynamic ones) before the claim sources, then re-derived every number in my own node scripts (own copies of mulberry32 and of each algorithm; scratchpad fc10/a.mjs, b.mjs, c.mjs, d.mjs) and checked citations. Egress to most publisher pages is blocked, so book passages I could not open are said so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 0 + 8 + 12 + 14 = 34 (node). |
| c2 | verified | 0 + 1 + 3 + 7 = 11; 11/34 = 0.324 (node). Over all 24 orders min 11, max 34. |
| c3 | verified | Exchange argument re-derived: total wait = sum of d_i x (jobs behind i), minimised by sorting ascending. Smith, NRLQ 3(1-2):59-66 (1956), single-machine total completion time = total wait + fixed sum of durations. |
| c4 | verified | Starvation under non-preemptive SJF with continual short arrivals; Silberschatz et al., CPU scheduling. |

**Result:** all claims in this pass verified.
