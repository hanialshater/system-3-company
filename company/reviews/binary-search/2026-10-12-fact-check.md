# Fact-check: binary-search

fact-checker · 2026-10-12 · inputs: `src/demos/cs/binary-search/meta.json` (c1–c4), `artifacts/walkthroughs/binary-search/transcript.md`, and the learner-visible strings in `Demo.tsx` (prediction, stage messages, reveal) plus the recall card.

**Result: 4 recorded claims verified, 0 disputed. 2 unrecorded claims found and added as `unverified` (c5, c6); both true by my working. Nothing blocks on accuracy; c5 and c6 need a checker other than me.**

## Method

Script `artifacts/scratch/fc2-binary-search.mjs` (node) runs the lesson's own rule (`mid = floor((lo+hi)/2)`, same as "Pick the middle") against every possible secret and also checks the closed forms.

```
c1 max guesses n=1000: 10   floor(log2 1000)+1 = 10
guesses distribution: 1:1 2:2 3:4 4:8 5:16 6:32 7:64 8:128 9:256 10:489
c2 worst remaining after wrong guess 1..10: 500, 250, 125, 62, 31, 15, 7, 3, 1, 0
c3 log2(1e6)=19.9316 -> 20 ; log2(1e9)=29.8974 -> 30
c3 exhaustive max guesses n=1e6: 20 ; sampled (2e6 secrets) n=1e9: 30 ; halving count 1e6: 20, 1e9: 30
c4 maxGuesses(2n) == maxGuesses(n)+1 for every n<=3000 (exhaustive): true ; formula n<=1e6: true
recall: maxGuesses(2000) = 11
wrong guess leaves <= floor(m/2) for every m<=2000: true
```

## Recorded claims

- **c1 (at most 10 guesses for 1 to 1,000): VERIFIED.** Exhaustive over all 1,000 secrets: max 10 (489 secrets need exactly 10). Matches floor(log2 1000)+1 = 10. The count assumes each guess answers "higher / lower / right" (a three-way outcome), which is the game as played. Source note: Knuth TAOCP Vol. 3, 6.2.1 was not opened (no book access); course notes found by search state the same floor(lg N)+1 bound. The verdict rests on my enumeration.
- **c2 (500, 250, 125, 62, 31, 15, 7, 3, 1): VERIFIED.** The worst-case remaining set after each wrong guess, computed over every reachable interval, is exactly that sequence, then 0. Nine wrong guesses leaves 1 number, so the tenth guess must be right. Stage check: the transcript's first guess at 500 and answer "lower" leaves 499 (the best case of that branch); the reveal says "In the worst case", so the 500 is the other branch. Consistent.
- **c3 (a million: 20; a billion: 30): VERIFIED.** Exhaustive for 1e6 (max 20); for 1e9 a 2-million-secret sample reached 30 and the halving count is 30, which equals the exact bound.
- **c4 (doubling adds exactly one guess): VERIFIED.** Exhaustive for n up to 3,000 and by formula up to a million.

Cited values: Knuth TAOCP citation not opened (see c1). None of the verdicts depends on it.

## Unrecorded claims (added to meta.json as `unverified`)

| id | Where the learner sees it | Sentence | My working |
|---|---|---|---|
| c5 | Reveal | "A guess in the middle of what is still possible rules out half of it, whichever way the answer goes." | A wrong guess leaves at most floor(m/2), so at least half (counting the guess itself) is ruled out. Checked for every m up to 2000 |
| c6 | Recall card | 2,000 sorted names, check the middle each time: at most 11 checks | floor(log2 2000)+1 = 11; exhaustive over 2,000 positions: max 11 |

Checked and not claims: the options "About 50 / About 100 / About 500" are distractors. "Size barely matters" and "Each guess halves the haystack" are framing; the second is the same as c5. The live messages ("Higher than 500", "Lower than 500", "N was already ruled out. A wasted guess.", "numbers still possible" counts) were read in the code and match the transcript: a guess below the secret is "higher", ruled-out is `g < lo || g > hi`, and the count is `hi - lo + 1`.

## Fixes routed to demo-builder (problems, not tests)

None required for accuracy.

- F1 (minor, wording). The reveal's "rules out half of it" is exact only on average; with an odd or even count one side is a number larger (500 vs 499). Learners watching 1,000 become 499 may notice. The sentence "at least half" would be literally true. Optional.
- F2. c5 and c6 are my additions and need a checker other than me before they count as verified.
