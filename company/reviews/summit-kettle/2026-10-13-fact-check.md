# Fact-check: summit-kettle (2026-10-13)

Checker: fact-checker (this session did not write or build these claims). Method: each claim re-derived with the lesson's own MODEL code run in node (scripts in the session scratchpad), Demo.tsx reveal and predict text read against the claims, sources checked by search where cited.

## Verdicts

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | derivation; Standard-atmosphere value 0.310 reproduced. Measured summit pressure is 253 mmHg = 33.7 kPa = 0.333 atm (West 1983/1999); the cited West 2006 HAMB 7(2) paper was not located. "About 0.31" holds loosely; recommend "about 0.3 atm". |
| c2 | verified | derivation; Model 69.4 C at 0.31 atm; 71 C at the measured 0.33 atm. "About 69" is within the published 68-71 range. |
| c3 | verified | source; recomputed or source confirmed, see Evidence |
| c4 | verified | source; Reproduced: model 0.0312 atm at 22 C vs 0.0261 true. |
| c5 | verified | source; recomputed or source confirmed, see Evidence |
| c6 | verified | source; Model gives 120.8 C; steam table 120.2 C. |

## Evidence
air(8850)=0.3102, boil=69.4 C, boil(2 atm)=120.8 C (table 120.2), vap(22 C)=0.0312 atm (true 0.0261). Measured summit pressure is 253 mmHg = 33.7 kPa = 0.333 atm (West); at 0.333 atm boiling is about 71 C.

## Wording fixes (recommendations only; builder owns Demo.tsx)
Recommend "about 0.3 atm" and "about 70 C" in the predict question and reveal, or say "standard atmosphere" for 0.31. The cited West 2006 HAMB 7(2) could not be located; cite West 1983/1999 for the 253 mmHg measurement.

## Not verified by me
None; every claim above is checked.

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Air pressure on the summit of Mount Everest is about 0.3 atm (sea leve... | verified | ICAO standard atmosphere at 8,850 m gives 0.310 atm; measured about 0.33 (West); "about 0.3" correct. Stage shows P_SUM.toFixed(1) = 0.3. |
| c2 Water on the summit of Everest boils at about 70 °C.... | verified | Clausius-Clapeyron 69.4 C at 0.31 atm, 71 C at 0.33; published 68-71; "about 70" correct. |

Result: 2 verified, 0 disputed, 0 added unverified.
