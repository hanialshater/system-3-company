# Fact-check: flat-rate-costs-nearly-double (2026-10-14)

Board: W-679. Lesson: src/demos/economics/flat-rate-costs-nearly-double/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx on every reachable path before I read the claims: locked state, each control in every order, Reset, the sliders' full range, and the dynamic strings in the stage, Seen line and reveal. Then I re-ran every number in node from my own copies of the lesson logic (scripts in artifacts/fact-check-wave-j/wj-econ-phys-math-geo/; the geography models were run from type-stripped copies of model.ts and solar.ts). No economics check script exists under company/domains/briefs/checks/, so I re-ran the brief's inline Check lines (company/domains/briefs/economics.md #60-#64). The dev server was not used (the dispatcher's instruction). Web: only PyPI, npm, GitHub raw files and public git clones were reachable. Sources opened for this batch: None needed: every claim is arithmetic, a derivation or a lesson rule.

Unrecorded claims: I compared every learner-visible sentence (title, hook, question, options, stage labels, Seen line, reveal, recall) with the claims list. None found. The recall question was checked against the claims it rests on (see the notes).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation, re-run (artifacts/fact-check-wave-j/wj-econ-phys-math-geo/flat.mjs, copy of loan()): flat interest 10,000 x 0.10 x 2 = 2,000; payment (10,000 + 2,000)/24 = 500.00. Code path: the 'flat' milestone records only at the 2-year term, so the reveal's $2,000 is always this case. |
| c2 | verified | Derivation: the lesson's bisection gives r = 1.5131% a month, and my independent Newton solve gives 1.51308%; 12 x r = 18.157%, shown as 18.2% (APR convention, labelled 'monthly rate, times 12' in the claim). For the record, the effective annual rate (1 + r)^12 - 1 is 19.75%; the question's options (10/14/18%) are unaffected. artifacts/fact-check-wave-j/wj-econ-phys-math-geo/flat.mjs. |
| c3 | verified | Derivation: stepping b <- b(1 + r) - 500 twelve times from 10,000 gives 5,449.31; the stage dot and the reveal print $5,449. artifacts/fact-check-wave-j/wj-econ-phys-math-geo/flat.mjs. |
| c4 | verified | Derivation: under the flat rule charged = 10,000 x 0.10 / 12 = 83.33 every month (loan().charged, first and last month both 83.33); the balance falls to 0 at month 24. |
| c5 | verified | Derivation, standard annuity: payment 461.45, interest 1,074.78 (24 x 461.45 - 10,000); 1,074.78 / 2,000 = 0.54, 'about half'. artifacts/fact-check-wave-j/wj-econ-phys-math-geo/flat.mjs. |
| c6 | verified | Derivation: 1 year 17.972% (shown 18.0%), 2 years 18.157% (18.2%), 3 years 17.918% (17.9%). The slider reaches only these three terms. artifacts/fact-check-wave-j/wj-econ-phys-math-geo/flat.mjs. |
| c7 | verified | Lesson rule, checked against the code: loan() has level payments and no fee term; the reveal says 'A made-up loan with level payments and no fees'. |

**Result:** no disputes. All claims verified.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status draft, version 2. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own node re-run (bisection on 10,000 = 500 x (1 - (1 + r)^-24)/r): r = 1.513%/month (18.16% a year); balance after 12 payments 5,449.31 (54%); straight-line 10,000 - 12 x 416.67 = 5,000. 1- and 3-year terms: half-term balances 5,222.84 (52%) and 5,663.02 (57%). The stage dot at month 6 x years now says 'about half owed' and the reveal 'by month 12 you owed only about half': both true at 54%. |
| c4 | verified | Demo.tsx loan(): in flat mode charged = LOAN x QUOTE / 12 = 83.33 for every month while bal falls to 0; the bars are drawn red (s.bar) in flat mode and labelled 'flat: $83 a month'. Reveal 'the red interest bars stayed at $83 a month' matches. |

**Result (Pass 41):** 2 verified, 0 disputed, 0 unverified (held).
