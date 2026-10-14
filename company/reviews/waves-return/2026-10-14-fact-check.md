# Fact-check: waves-return (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (did not write or build these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) against each claim, then re-derived every number in my own node scripts (session scratchpad fc4/). Books cited from memory were not opened; rows say where a verdict rests on derivation instead.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own SIRS Euler run (dt 0.01, beta 0.4, gamma 0.2, L 100, I0 0.001): daily-snapshot peaks on days 34,185,329,473,617,761 with S 50.68, 50.17, 50.00...; day 900 S 50.00%, I 2.38%. Cross-check: endemic I* = (1-1/R0)/(1+gamma L) = 2.38%. |
| c3 | verified | dI/dt = (beta S - gamma) I = 0 at S = gamma/beta = 1/R0 = 0.5; effective reproduction R0 x S = 1 at half. Also ran L = 50 and 200: settles at 50.0% / 49.8% S. |

**Result:** all claims verified. Lesson fully verified.

## Pass 22 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each open claim; re-ran the numbers in node with own re-implementations of the lesson's model (mulberry32 copied from src/kit/random.ts); web sources by search only (the proxy blocked every primary host tried: dl.acm.org, wikipedia, os-book.com, nasa.gov, university hosts). Search-result text is marked as such below.

Walkthrough transcript exists (08:20Z); v4 text checked against Demo.tsx.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own re-implementation of simulate(100): peaks on days 34, 185, 329, 473, 617, 761; pctS prints 50.7%, 50.2%, 50.00%, 50.00%, 50.00%, 50.00%; day 900 S = 0.500012 (50.00%), I = 2.4%. 0.05-point two-decimal rule matches pctS (/x - 0.5/ < 0.0005). |
| c7 | verified | trend() threshold /S - 0.5/ < 0.0001 = 0.01 points. Own node over every slider day (step 5): 0 cases where the grow/shrink text disagrees with the sign of beta S - gamma; no day shows 50.00% with grow/shrink text. Note: days 880-885 print '50.01% susceptible, ... cases holding steady' (inside the stated 0.01-point band). |
