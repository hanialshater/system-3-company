# Fact-check: half-of-humanity (2026-10-13)

Checker: fact-checker. Method: Demo.tsx text (the walkthrough never reached the reveal); geometry and sums recomputed with topojson-client and d3-geo against src/kit/geo/countries-110m.json in artifacts/scratch/fc-aiecongeo/pop.mjs, run from repo root.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | LEFT UNVERIFIED | I could not open the UN WPP 2024 table (no network to population.un.org or Wikipedia from this environment). Web searches confirm the source, the revision (WPP 2024, 237 countries and areas, mid-year estimates), the ranking India, China, USA, Indonesia, Pakistan, Nigeria, Brazil, Bangladesh, and a world total of about 8.2 billion. They do not return the 15 individual figures. The numbers in Demo.tsx match what I remember of the table to two decimals, but my memory is the same kind of memory the builder used, so it is not an independent check. Someone with access to the WPP 2024 download (population.un.org/wpp, 'Total population, as of 1 July', medium variant, 2024) must compare all 15 values and the world total 8,161.97. |
| c2 | verified (arithmetic; depends on c1) | Re-summed: top 6 = 3,983.13 M = 48.80%; top 7 = 4,195.12 M = 51.40% of 8,161.97 M. The country order is descending as listed. Robustness: crossing half at the seventh country survives errors of about 2.8% in the world total or 3.4% in the seven-country sum, far more than the differences between published estimates, so the headline (seven, about half) is safe even if some c1 digits are off. The one-decimal figures (48.8, 51.4) are only as good as c1. |
| c3 | verified | 193 UN member states + 2 observer states = 195; 'about two hundred' is a fair rounding. |
| c4 | verified | Savric, Patterson & Jenny (2018), Int. J. Geographical Information Science 33(3):454-465 define Equal Earth as equal-area. Checked numerically: projected area divided by spherical area is constant to within about 0.6% across all 176 non-Antarctic shapes (min 9,985, max 10,048). |
| c5 | verified, loose | 110m shapes: seven countries 34.20 M km2 over 135.02 M km2 (all countries except Antarctica) = 25.3%. The 110m shapes slightly understate real areas; using published total areas the real share is nearer 26%, so 'about 25%' is right to a point and 'about a quarter' is safer. The reveal rounds to 25. |

## Other findings
- The walkthrough transcript says 'The reveal never unlocked': the harness tapped only six countries (India to Nigeria) and the reveal unlocks on crossing half at the seventh (Brazil). The lesson works as designed; the walkthrough run did not reach the reveal, so the reveal text above was checked from Demo.tsx, not from rendered output. Route to qa-tester/whoever owns tools/walkthrough.mjs to raise its step budget for this lesson.
- Reveal sentence 'You crossed half with N countries, because you did not add them strictly largest first' is conditional learner-state text, not a fact claim.
