# Fact-check: next-word-tally (2026-10-14)

## Pass 22

Checker: fact-checker (did not write these claims). Scope: the claims left unverified after the wave D wording reopen. Method: read Demo.tsx (and model.ts where used) against each sentence, then re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc22-5); sources opened where reachable, otherwise marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Read sample(), finish() and append() in Demo.tsx: sample draws with probability count/total; finish() makes at most 20 draws per press (each draw is one word; the auto full stop is not a draw); mat, fish and rug have '.' as their only follower, so append() ends the sentence. Own node port (fc22-5/nwt.mjs) with rng(7): cat, sat, Let it finish gives 'the cat sat on the fish .' after 3 draws, isNew = true, pair counts 2,1,2,2,1,1. |
| c7 | verified | pairsOf/isNew/finished in Demo.tsx: the pair list shows only for a finished sentence; interact() is called only when a finished sentence is new; the reveal quotes newOnes[0] (first new sentence). Own exhaustive search over every hand-built sentence up to 13 picks (123 sentences): minimum pair count 1 (including the word-to-full-stop pair). |

**Result:** every claim in this pass verified.
