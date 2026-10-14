# Fact-check: hidden-third-cause, 2026-10-14

## Pass 19

Checker: fact-checker. Scope: every claim with status unverified. Method: read Demo.tsx so stage and claim agree, then re-derived or re-simulated independently in node; CLRS 4th ed. cited by section.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c3 inside a 3-degree band the link mostly disappears | verified | Ran model.ts (seed 2024) under node --experimental-strip-types: overall r 0.827; 28 bands, mean 0.047, min -0.19, max 0.30, 30-45 days; 67 of seeds 1-2000 keep every band within +/-0.25. Theory 0.75/15.75 = 0.048. Note: band 29-32 reads 0.30, labelled "weak" by word(); still far below 0.83. |
| c5 correlation in [-1, +1]; stage thresholds | verified | Pearson r bounded by Cauchy-Schwarz; word() in Demo.tsx uses >= 0.6 strong, >= 0.3 weak, >= 0.1 very weak, else none, as stated. |

Result: 2 verified, 0 disputed, 0 withdrawn. All claims in this lesson are now verified.
