# Fact-check: temperature-reshapes (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones and reachable fallback branches) against each claim, then re-ran the numbers in my own node scripts (scratchpad fc22/). Network to primary sources is blocked (Wikipedia, Google Patents, NIST, Cornell and other hosts return 403); where a claim rests on a source, the basis says whether it was corroborated by search snippets, taken from my own knowledge (Easley & Kleinberg chapter placement), or not checked.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own node softmax of 2,1,0: T 0.5 -> 86.7%, T 1 -> 66.5%, T 4 -> 41.9% (the buttons Cool 0.5, Warm 1, Hot 4); reveal prints pct(probs(T)[0]). |
| c4 | verified | Reveal sentence matches; 2,1,0 / 0.5 = 4,2,0 and / 4 = 0.5,0.25,0; chances 41.9/32.6/25.4 at T 4 drift toward 1/3 (33.7/33.3/33.0 at T 100, own run). |
| c6 | verified | pick() sets T and calls draw20 with probs(t) on the shared rng(31) stream; reveal prints drawsAt[0.5] and drawsAt[4] (gate requires both visits). Own re-run: order 0.5 then 4 gives 17/3/0 and 9/6/5; sampling frequencies over 100k draws match the chances (0.421/0.328/0.251 at T 4). |
| c9 | verified | Stage row label '{score}÷{T}={div(score)}' (2 dp), e.g. 2÷0.5=4, 1÷4=0.25; probs() exponentiates score / T. |

**Result:** all open claims verified; lesson has no unverified or disputed claims.
