# Fact-check: fingernail-ocean (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: 3e8 cm / 2.5 = 1.2e8 years; 25 km per million years. |
| c2 | disputed | The predict question reads 'Plates move about as fast as fingernails grow, 2.5 cm a year', which attributes 2.5 cm a year to fingernails. Yaemsiri et al. 2010 (checked via search): fingernails grow 3.47 mm/month, about 4.2 cm a year, so 2.5 cm is about 40% too low for nails. Fix: 'Plates move about 2.5 cm a year, the same order as fingernail growth (about 4 cm)'. |
| c3 | verified | Mid-Atlantic Ridge full spreading rates of roughly 2 to 4 cm a year, slower in the north, are standard (USGS This Dynamic Earth). |
| c4 | verified | node: 2.5 cm*80 = 200 cm. |
| c5 | verified | Stage labels itself a toy (muted line). |

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c2 Plates move about 2.5 cm a year, the same order as fingernail growth (... | verified | Predict question now reads "Plates move about 2.5 cm a year, the same order as fingernail growth (about 4 cm a year)." Fingernails 3.47 mm/month (Yaemsiri 2010) = 4.2 cm a year; plate speeds of a few cm a year. Claim and stage now agree. |

Result: 1 verified, 0 disputed, 0 added unverified.
