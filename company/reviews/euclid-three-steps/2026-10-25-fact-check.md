# Fact-check: euclid-three-steps (W-2037, 2026-10-25)

Checker: fact-checker, a fresh instance. I wrote, built and edited none of these claims. Lesson status published, version 2.
Trigger: commit be3a6d58b ("Clarify learner copy across 696 demos") changed c5's text from "…so no list holds every
prime" to "…so no finite list holds every prime" and reset c5 to unverified.

Method: `npm run walkthrough -- euclid-three-steps` does not run here (`@playwright/test` is not installed), so I read
Demo.tsx's learner-visible text first (predict, captions, SVG labels, reveal) and wrote my findings before opening
meta.json. Derivations re-run in my own node script (BigInt trial division), not the lesson's `factor()`.

Findings from the artifact, before the account: the reveal's second paragraph reads "Any finite list gets the same three
steps, so no finite list holds every prime. This is Euclid's proof in the Elements, Book IX, Proposition 20." The
visible captions ("Every listed prime divides the block. Not the +1.", "Remainder 1 every time.", "Its primes are not
on your list.") and the dynamic numbers (7, 31, 211 prime; 30031 = 59 × 509; rows (N − 1)/p × p, r 1) are all correct.

Text drift: `git show be3a6d58b` and every later commit touching this lesson change no claim text other than c5's.
c1 to c4 and c6 are unchanged since their checks (2026-10-14, c6 2026-10-15), so they keep their verdicts.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Text matches Demo.tsx verbatim. For any finite list of primes p1..pk, P = p1…pk is a multiple of each pi, so P + 1 leaves remainder 1 on each (c3); P + 1 ≥ 2, so its least divisor above 1 is a prime, and it is off the list (c4). So no finite list of primes holds every prime. The edit narrows the conclusion to exactly what the argument proves. Own node: remainder 1 and every prime factor off-list for each prefix list of the first 0 to 15 primes, and for 3, 5 / 2, 7, 13 / 5, 11, 17 (16 = 2^4, 183 = 3 × 61, 936 = 2^3 × 3^2 × 13). Hardy and Wright not opened; not relied on. |
| c1–c4, c6 | unchanged | Text not edited since their checks; not re-opened. |

**Result:** 1 verified, 0 disputed, 0 withdrawn. Nothing in this lesson is open.
