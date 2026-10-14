# Fact-check: throw-it-fast-enough (2026-10-14)

## Pass 22

Checker: fact-checker (did not write these claims). Scope: the claims left unverified after the wave D wording reopen. Method: read Demo.tsx (and model.ts where used) against each sentence, then re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc22-5); sources opened where reachable, otherwise marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Ran model.ts fly() in node (strip-types): at t = 60 s fell = 17.638-17.643 km (km1 -> 17.6) for 7.0-7.9 km/s; groundAway 13.86, 16.33, 17.20, 17.42, 17.65 km -> 13.9, 16.3, 17.2, 17.4, 17.6; 0.79 and 4.0 km/s land at t = 46 s and 53 s (36 and 212 km), so minute = null for them ('Landed within the first minute.'). Cross-check: g(R/(R+P))^2 t^2/2 = 17.60 km. |

**Result:** every claim in this pass verified.
