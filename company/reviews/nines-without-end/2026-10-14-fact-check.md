# Fact-check: nines-without-end, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c5 You added some nines, and the gap went from 0.1 down to 0.00...01 (one... | verified | gap(n) = 10^-n (string 0.0..01); for any r > 0 some 10^-n < r (Archimedean), so only 0 is below all of them among non-negatives. Note: the stage says "cut it to a tenth"; the claim paraphrase "one tenth smaller" could read as -10%; the stage wording is the right one. |

Result: 1 verified, 0 disputed.

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc21b/). Sources: opened where the proxy allowed (web search only; oeis.org, wikipedia.org, publisher PDFs blocked); citations I could not open are marked, and no verdict rests on an unopened source alone. E&K chapter placements are from memory (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | 1/3 = 0.333... (long division remainder 1 repeats); 3 x 3 = 9 per digit, no carries, so 0.999...; 3 x 1/3 = 1. Stage forever-view check line text matches. |
| c5 | verified | Demo gap(n) = 10^-n ('0.' + (n-1) zeros + '1'); reveal and caption strings match the claim; Archimedean argument: for r > 0, some 10^-n < r, so no positive number is below every gap. |
| c6 | verified | Own check: named(z) = 10^-(z+1); 10^-n < 10^-(z+1) iff n >= z + 2; z = 5: 0.000001 beaten by 7 nines, gap 0.0000001 (named(z+1)). Matches beatenBy() and caption. |

**Result:** all open claims verified; lesson has no unverified or disputed claims from this pass.
