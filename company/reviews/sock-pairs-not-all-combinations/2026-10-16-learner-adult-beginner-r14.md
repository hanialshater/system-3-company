*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: sock-pairs-not-all-combinations
lesson version: v2
boundary: adult beginner. Packs bags, owns a drawer of cords and a sock pile, does school arithmetic (add, subtract, multiply). Has no physics of moments, no combinatorics (has never seen n(n-1)/2), and has never seen these household hacks framed as counts.
Screenshots seen: yes (artifacts/walkthroughs/sock-pairs-not-all-combinations/sheet.png, recorded 2026-10-16T11:17:05Z, lhw3 at 99d6f2d, production build, phone viewport, option 1 chosen)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Walked from the transcript cut at the trust-sheet appendix (steward ruling R1) and sheet.png. Path: option 1, A, B, slider.

1. **Where understanding first broke.** At "Six plain socks, ... no marks". If they are plain and look alike, any two make a pair, so why would I "try" pairings at all? The lesson explains this only in its last line ("pairs that look alike but are not interchangeable"). Until then the premise makes no sense to me. Second break: I answered 3 because I read "how many pairings" as "how many pairs are there". The question does not clearly separate "pairs that exist" from "pairings you could test".
2. **What the prediction felt like.** Ambiguous, then deflating. The locked stage draws every sock joined to every other one (15 lines). On a phone I could not count them, but someone patient could, so the answer is drawn before the commit. "Not quite: it was 15" felt like losing on wording, not on an idea.
3. **Did the reveal answer my question?** It answered a counting question I did not have. My real question was "how many tries would it take me?" When I actually do it, I pick a sock and test it against the others (at most 5), then at most 3, then 1: at most 9 tries, not 15. The reveal moves from "15 pairings exist" to the hack (mark your pairs) as if I would test all 15. A careful beginner would call that overstated. The 5 + 4 + 3 + 2 + 1 sum is clear, and so is "ten socks give 45".

Verdict reason: the premise (plain socks that are still not interchangeable) is explained only after the reveal, and the lesson treats "15 pairings exist" as "15 tries", when sequential matching needs at most 9.

## After reading build.md / meta.json

- The brief's misconception is "six loose socks need only a handful of checks", and its doesNotKnow says the "checks grow fast". That treats "15 pairings exist" as "15 checks", which is the gap I named. Matching one sock at a time needs at most 5 + 3 + 1 = 9 checks for 6 socks (and grows about as N²/4, still fast). The model formula (c3, N(N−1)/2) counts candidate pairs, not checks. The claim text is verified as arithmetic, but the step from it to "checks" is the learner-facing problem.
- The r11 point (15 never shown) is fixed: the complete graph is drawn. It is now drawn before the commit, though.
