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
