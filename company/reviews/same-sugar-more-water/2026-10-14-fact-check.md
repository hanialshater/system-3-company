# Fact-check: same-sugar-more-water (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx learner-visible text (static and dynamic) before claim sources, then re-derived each claim with own node scripts (scratchpad fc19b2: kmp.mjs, radix.mjs, hull.mjs) or by hand; book sources I could not open are marked as from memory per claim, with the number confirmed another way.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | IUPAC Gold Book A00295 (via search result summary; site not directly reachable): amount concentration = amount of constituent divided by the volume of the mixture, unit mol dm^-3 = mol/L; source Green Book 2nd ed. p. 42. Demo.tsx conc() = mol / (mixture mL / 1000), and the reveal divides by the 500 mL of mixture. |

**Result:** every claim in this lesson is now verified.
