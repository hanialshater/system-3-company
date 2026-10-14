# Fact-check: ten-to-one-buffer (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage, readouts, reveal), then re-derived or re-ran each claim in my own scripts (scratchpad fc1); sources corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Derivation: Ka = [H+][A-]/[HA], so [A-] = [HA] gives [H+] = Ka, pH = pKa (Henderson-Hasselbalch, which the stage uses). Buffer capacity beta = 2.303 C Ka[H+]/(Ka + [H+])^2 is largest at pH = pKa, so the mixture resists pH change. Matches the IUPAC definition of a buffer solution (I could not open the Gold Book; host blocked). Stage question uses the same wording. |

**Result:** every claim verified or withdrawn.

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc21b/). Sources: opened where the proxy allowed (web search only; oeis.org, wikipedia.org, publisher PDFs blocked); citations I could not open are marked, and no verdict rests on an unopened source alone. E&K chapter placements are from memory (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own node: pH(b, a) = 4.76 + log10(b/a); 10:10, 100:100, 1:1, 3:3, 30:30 all give 4.76; 100:10 gives 3.76; ratio x10 changes pH by exactly 1. Demo v3 milestone 'scaled-equal' fires only for equal amounts other than 10 after the 100:10 state; reveal quotes that amount. |

**Result:** all open claims verified; lesson has no unverified or disputed claims from this pass.
