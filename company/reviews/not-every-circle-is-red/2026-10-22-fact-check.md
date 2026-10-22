# Fact-check: not-every-circle-is-red (v1)

checker: fact-checker · date: 2026-10-22
Read first: artifacts/walkthroughs/not-every-circle-is-red/transcript.md and screenshots 01–07, then meta.json claims, Demo.tsx and brief company/domains/briefs/math.discrete.md:482-499. build.md / design.md not read.

## Method
- Re-derived each row's truth function from Demo.tsx `SENTENCES` (blue = true): "Not every circle is red" = ¬∀¬b = ∃b; "No circle is red" = ∀b; "Some circle is not red" = ∃b; "Some circle is red" = ∃¬b. Rows 1 and 3 are the same function, so they agree in all 16 colourings; row 2 agrees with row 1 only in all-red and all-blue (differs in 14).
- Ran `node company/domains/briefs/checks/math-wave-j-check.mjs`: D2 allRed F,F,F,T; oneBlue T,F,T,T; noneRed T,T,T,F. Matches claim c2 and the marks in screenshots 01 (all red), 02 (one blue), 05 (all blue), and the kept columns in 07.
- Checked the kept "one blue" column: the first non-all-red state after taps from all red always has exactly one blue (each tap toggles one circle), so the label "1 blue, 3 red" and its dots (screenshot 05/07) are right.
- "=" match marks in screenshots agree with the truth values in each state.
- Reveal, hook, recall and trust sheet: every factual sentence is covered by c1–c3. Recall answer ("At least one train was not on time") follows from c1; "At least one train was on time" is correctly not the answer.

## Claims

| claim | new status | note |
|---|---|---|
| math.not-every-circle-is-red.c1 | verified | ¬∀x P(x) ≡ ∃x ¬P(x) (quantifier negation, classical logic); stage rows 1 and 3 share one truth function in Demo.tsx. |
| math.not-every-circle-is-red.c2 | verified | Re-derived by hand and by D2 script output; stage marks match in walkthrough screenshots 01, 02, 05, 07. |
| math.not-every-circle-is-red.c3 | verified | ¬∀x ¬P(x) ≡ ∃x P(x); also visible on stage: rows 2 and 4 are opposite in every state shown. |

## Unrecorded claims
None found.

## Minor (not blocking)
- c1 and c3 carry support "convention"; the brief says "definition". Both are definitions of quantifier negation; no change required.

Verdict: pass
