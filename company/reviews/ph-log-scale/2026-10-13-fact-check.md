# Fact-check: ph-log-scale (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c7 | Verified: round values give 10^(5-2) = 1,000 exactly; the measured-range extremes give 10^(4.85-2.6) = 178 and 10^(5.13-2.0) = 1,349, so 'roughly 200 to 1,300' is a fair rounding (178 is rounded up to 200, a loose 'roughly'). The reveal and predict both frame 1,000 as the round-value answer. |
| c8 | Verified: [H+] = 10^(-pH), so lower pH means more hydrogen ions; the stage caption 'Lower pH, more ions' and slider label 'slide right for more acid' are consistent, as are the transcript readouts (pH 4: 10x, pH 2: 1,000x, pH 7: 1/100). |

c6 is withdrawn; I confirmed no pH 0 / pH 14 sentence remains in the reveal or stage text. c1-c5 were already verified; recall (pH 4 vs 7 is 1,000x) is correct. Deterministic. No unrecorded claims.

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c6 | withdrawn | Confirmed withdrawn: no 10^14 / pH 0-14 sentence on the stage or reveal (grep of Demo.tsx). Arithmetic 10^14 is right anyway. |
