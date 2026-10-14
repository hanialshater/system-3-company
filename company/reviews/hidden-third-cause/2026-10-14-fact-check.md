# Fact-check: hidden-third-cause, 2026-10-14

## Pass 19

Checker: fact-checker. Scope: every claim with status unverified. Method: read Demo.tsx so stage and claim agree, then re-derived or re-simulated independently in node; CLRS 4th ed. cited by section.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c3 inside a 3-degree band the link mostly disappears | verified | Ran model.ts (seed 2024) under node --experimental-strip-types: overall r 0.827; 28 bands, mean 0.047, min -0.19, max 0.30, 30-45 days; 67 of seeds 1-2000 keep every band within +/-0.25. Theory 0.75/15.75 = 0.048. Note: band 29-32 reads 0.30, labelled "weak" by word(); still far below 0.83. |
| c5 correlation in [-1, +1]; stage thresholds | verified | Pearson r bounded by Cauchy-Schwarz; word() in Demo.tsx uses >= 0.6 strong, >= 0.3 weak, >= 0.1 very weak, else none, as stated. |

Result: 2 verified, 0 disputed, 0 withdrawn. All claims in this lesson are now verified.

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed and state-dependent ones) before the claim sources; re-ran every number in my own node scripts (scratchpad fc21/); checked sources by web search where reachable (most hosts, including the Easley-Kleinberg book site, are blocked; sources not opened are marked in each row).

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own re-implementation (fc21/htc.mjs), seed 2024: r = 0.827 over 365 days; theory 75 / 90 = 0.833. Readout 'Link, all days' shows it from the locked state (value hidden only when banded and locked). |
| c3 | verified | Own run per band [s, s+3), s = 5..32: 10 -> 0.07, 26 -> -0.02; min -0.19 (18), max 0.30 (29), mean 0.046, 30-45 days each. 'Far flatter': fitted band slopes all have /b/ <= 0.30 against 0.85 for all days (own fit), so the line claim holds directly, not only via r. |
| c5 | verified | Pearson r in [-1, +1] (Cauchy-Schwarz); key text 'Link: +1 rise together, 0 none' matches Demo; labels match word(): >= 0.6 strong, >= 0.3 weak, >= 0.1 very weak, else none. |
| c6 | verified | model.ts: sales = temp + noise, sunburn = temp + noise. Own run: days >= 28 C average sales 30.9, sunburn 31.7; days < 12 C average 8.2, 7.9; so hot dots sit top right, cool bottom left. Dot fill mixes --bad (red) at (temp - 5)/30 with --muted (#9aa3b5 / #5d6578, grey). |

**Result:** all open claims verified.
