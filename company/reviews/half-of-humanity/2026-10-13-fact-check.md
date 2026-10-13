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

## Fact-check pass 2 (independent second check, 2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | unverified | Checker could not reach the UN WPP portal either (egress blocked: population.un.org, data.un.org, Wikipedia, OWID all 403). Partial corroboration only: populationpyramids (UN WPP 2024 based) lists India 1,450,935,802 and China 1.42 billion; INED's WPP 2024 table gives 2025 values (Nigeria 238, Brazil 213, Bangladesh 176, Russia 144, Ethiopia 135, Mexico 132 million) consistent with the 2024 values here given 1-2% growth; world 8.2 billion confirmed. The lesson conclusion (seven countries, 51.4%) is robust to these ranges, but every value still needs a direct compare with the WPP 2024 table by someone with access. Demo.tsx has Japan 123.75 vs the claim's rounded 124 (fine). |

Stage check: c2, c3, c4, c5 were already verified by an earlier pass and are unchanged.

## Pass 3 (2026-10-13)

c1 left unverified. Search corroboration of UN WPP 2024 mid-2024 values: India 1,450.94M, USA 345.4, Indonesia 283.5, Pakistan 251.3, Nigeria 232.7 (populationpyramids, WPP 2024 based), Brazil 212.0, Bangladesh 173.6, Russia 144.8, Ethiopia 132.1 (top-10 listing), China 1.42 billion. Not corroborated: Mexico 130.86, Japan 123.75, Egypt 116.54, Philippines 115.84, DR Congo 109.28, and world 8,162 to the thousand. The conclusion is robust (top 6 = 3,983M = 48.8%; top 7 = 4,195M = 51.4% of 8,162M), but the UN table itself was still unreachable, so the direct compare is still owed. Not a dispute; needs someone with access to population.un.org.

## Pass 4 (2026-10-13)

Checker: fact-checker. Scope: claims still open after builder revisions (v2 rewrites, claim fixes) or never checked. I wrote none of these claims except where marked "added". Method: re-derived numbers in node from the lesson model code (scratch scripts in the session scratchpad), compared each claim with the stage and reveal text, checked sources by web search where reachable.

| Claim | Verdict | Text (short) | Basis |
|---|---|---|---|
| c1 | unverified | Populations in mid-2024 (millions): India 1,451, China 1,419, USA 345, Indonesia 283, Paki... | Pass 4: egress still blocked (population.un.org, data.un.org, ourworldindata.org, api.worldbank.org all 403 via proxy). Only new corroboration: UN WPP 2024 world total for 2024 = 8,161,972,573 (Iberdrola-hosted extract of the WPP 2024 regional tables) matches 'world 8,162'. Country values still need a direct compare with the WPP 2024 table. |

## Result (pass 4)
0 verified, 0 disputed, 1 left unverified, 0 added unverified.


## Pass 5

Checker: fact-checker. c1 left unverified. population.un.org is still unreachable (page fetch fails at DNS; web search returns only aggregators). Corroboration, not a direct compare: populationpyramids (WPP 2024-based) lists India 1,450,935,802; US 345.4M; Indonesia 283.5M; Pakistan 251.3M; Nigeria 232.7M; Brazil 212.0M, all consistent with the list. Needs someone with access to the WPP 2024 table.

## Pass 6

c1 left unverified: population.un.org unreachable again (HTTPS CONNECT 403). Corroboration from earlier passes stands; every country value still needs a direct compare with the WPP 2024 table.
