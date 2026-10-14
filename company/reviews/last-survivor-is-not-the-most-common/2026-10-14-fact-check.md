# Fact-check: last-survivor-is-not-the-most-common (2026-10-14)

Board: W-657. Lesson: src/demos/cs/last-survivor-is-not-the-most-common/ (status draft, version 1).

Checker: fact-checker. I did not write these claims. Method: I read Demo.tsx and model.ts on every reachable path before reading the claims: locked state, presets in any order, Reset, seeds, the milestones that gate the reveal, and the reveal's dynamic strings. Then I re-ran every number in node 22 (--experimental-strip-types) from copies of the lesson's own code. CS lessons use a copy of model.ts. Life lessons use the non-JSX top of Demo.tsx cut out with sed, plus a copy of src/kit/random.ts. Independent loops cross-check where noted. Scripts: artifacts/fact-check-wave-j/wj-cs-life/. I did not use the dev server. No walkthrough transcript exists for this slug yet, so the stage was read from code. Web: only PyPI, npm and GitHub raw are reachable, and every source verdict below names the file I opened.

Unrecorded claims: I compared the hook, question, options, stage text, reveal and recall against the claims list and found none unrecorded.

Reachable paths covered: Run stream 1, Step from any position, Count again (only when done), Run stream 2 (sets counted), and Reset (back to stream 1, position 0). Stream 2 can only be shown complete. The trace survives Reset, and the three milestones gate the reveal.

Source opened: acl2/acl2 books/demos/majority-vote.lisp (GitHub raw), written by J Moore. It gives the full MJRTY citation and the mechanised theorems majority-is-correct and exists-majority-implies-majority, for exactly the lesson's rule.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran run() and did both by hand: stream 1 A1 A2 A3 A2 A1 A0 C1 (final C, counter 1); stream 2 A1 A2 A1 A2 A1 A2 A3 (final A, counter 3). |
| c2 | verified | Counted: stream 1 A 3, B 2, C 2 (majority needs 4 of 7); stream 2 A 5, B 1, C 1. mostCommon() returns A for stream 1 (ties B/C do not matter). The stage prints 'C: 2 of 7 · not a majority · A had 3' and 'A: 5 of 7 · majority'. |
| c3 | verified | Derivation: each decrement pairs one candidate copy with one different item, and a majority item outnumbers all others together. Opened: the ACL2 proof by Boyer and Moore (acl2/acl2 books/demos/majority-vote.lisp, GitHub raw). Its theorem majority-is-correct proves that if an element occurs more than half the time, the function returns it, and the function is exactly this rule (at 0 the next item becomes the candidate with count 1). |
| c4 | verified | Stream 1 is a counterexample: survivor C (2 of 7) is neither a majority nor the most common item (A, 3). The ACL2 file's corollary is conditional on a majority existing, so a second pass is needed to check. |
| c5 | verified | Opened acl2/acl2 books/demos/majority-vote.lisp (written by J Moore, 2008): it cites 'MJRTY - A Fast Majority Vote Algorithm', R.S. Boyer and J Moore, in R.S. Boyer (ed.), Automated Reasoning: Essays in Honor of Woody Bledsoe, Kluwer, 1991, pp. 105-117, which matches the source field exactly. The theorem majority-is-correct covers 'finds a majority if there is one'. |

**Result:** verified 5.
