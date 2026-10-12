# Fact-check: merge-sort-payoff

fact-checker · 2026-10-12 · inputs: `src/demos/cs/merge-sort-payoff/meta.json` (claims c1–c3),
`artifacts/walkthroughs/merge-sort-payoff/transcript.md` (recorded 2026-10-12T23:03Z), and the
learner-visible strings in `Demo.tsx` (prediction, stage messages, reveal). `meta.json`'s recall
card was also checked, since a learner sees it.

**Result: 3 recorded claims verified, 0 disputed, 0 withdrawn. 5 unrecorded claims found, all
true by my working, added to `meta.json` as `unverified` (c4–c8). None is wrong, so nothing
blocks on accuracy. Because I wrote c4–c8, someone other than me has to verify them.**

## Method

Each number was recomputed by a script, not read from the source line. The script (Python,
run 2026-10-12):

- brute-forces the maximum comparisons of a standard two-pointer merge over every way to split
  distinct values into two sorted piles (4+4, and every split of 10);
- evaluates the top-down Merge Sort worst-case recurrence
  W(1) = 0, W(n) = W(⌈n/2⌉) + W(⌊n/2⌋) + n − 1, and checks it against the closed form
  n⌈log₂n⌉ − 2^⌈log₂n⌉ + 1 for every n from 2 to 4096;
- builds an adversarial input for n = 1000 (recursive even/odd unmerge) and counts the
  comparisons an instrumented Merge Sort actually makes on it;
- bounds bottom-up Merge Sort (1s → 2s → 4s → …, the schedule the reveal describes) for n = 1000
  by summing (p + q − 1) over every merge;
- runs 2,000 random permutations of 1,000 items as a sanity check.

Output:

```
4+4 max: 7
1+9 / 2+8 / 3+7 / 4+6 / 5+5 max: 9 each
top-down W(1000): 8977
closed form (n=1000, ceil(log2 n)=10): 8977
closed form matches W for n<=4096: True
bottom-up worst-case bound, n=1000: 8985
max over 2000 random perms (top-down): 8761
constructed worst input: 8977 comparisons, output sorted
C(1000,2) = 499500; C(8,2) = 28
```

## Recorded claims

### c1: Merging two sorted lists with n elements in total takes at most n−1 comparisons. VERIFIED

Re-derived: every comparison sends exactly one element to the output for good. When one list
runs out, at least one element (the last of the other list) is left, and the rest are appended
without comparing. So at most n − 1 elements leave by comparison, which means at most n − 1
comparisons. Brute force agrees for n = 8 (max 7) and n = 10 (max 9). The bound is tight for
every n ≥ 1 with interleaved piles, though c1 as written claims only the upper bound.

Stage check: the reveal makes the same claim for n = 8 ("at most 7"). The prediction makes a
*stronger* claim, that 7 is the most you could **ever** need, which also requires tightness.
That claim is recorded separately as c4.

Source note: the Knuth citation (TAOCP Vol. 3, §5.2.4) was not opened. The verdict rests on the
re-derivation, not on the citation.

### c2: Merge Sort sorts 1,000 items in fewer than 10,000 comparisons in the worst case. VERIFIED

Re-derived: the recurrence gives W(1000) = 8,977, which matches the closed form
1000·10 − 1024 + 1 = 8,977 in the source line. An input built to be worst-case makes an
instrumented top-down Merge Sort do exactly 8,977 comparisons, so the bound is reached. 8,977 is
less than 10,000.

Difference between claim and stage: the reveal describes bottom-up merging ("Merge them into 2s,
then 4s, then 8s"), while the 8,977 in the source line is the top-down (halving) worst case. For
n = 1000 the two schedules differ, because 1000 is not a power of 2. The bottom-up worst case is
at most 8,985, so the sentence on stage is still true. The source line just does not derive the
schedule the learner is shown (see fix F1). The stage also leaves out "in the worst case" ("For
1,000 cards that takes fewer than 10,000 comparisons"). Read as "always", it is still true,
because the worst case is under 10,000.

Source note: the closed form was checked by recomputation for n ≤ 4096. I did not confirm the
TAOCP section number. The verdict rests on the derivation, not on "Knuth says so".

### c3: Comparing every one of 1,000 cards with every other takes 499,500 comparisons. VERIFIED

1000 · 999 / 2 = 499,500 unordered pairs. On stage this becomes "Comparing every card with every
other card would take 499,500", which is the same count. The implied contrast with a naive sort is
fair: selection sort makes exactly n(n−1)/2 comparisons, and insertion sort makes that many in
the worst case.

## Unrecorded claims found (learner-visible, previously not in the ledger)

All five are true by my working. Each one was added to `meta.json` as `unverified`, with its
working in `source`. Because I wrote them, I cannot verify them. They need a check by someone else.

| New id | Where the learner sees it | Sentence | My working |
|---|---|---|---|
| c4 | Predict (answer "7"), reveal | "what is the most comparisons you could ever need?" → 7 | Upper bound from c1. It is reached: brute force over all 70 splits of 8 values gives max 7 |
| c5 | Reveal; stage message | "once a pile empties, the rest just slides over for free" / "One pile is empty. The rest needs no comparisons." | The remaining pile is sorted and larger than everything already placed |
| c6 | Recall card (meta.json `recall`) | 10 cards in two sorted piles → at most 9 comparisons; "Every comparison places one card for good, and the last card needs none." | c1 with n = 10; brute force reaches 9 for every split from 1+9 to 5+5 |
| c7 | Hook; reveal | "Splitting cards into piles looks like extra work. It isn't." / "The splitting is setup." | Merge Sort splits by position and makes no comparisons doing it. Every comparison is in a merge |
| c8 | Reveal | "Single cards are already sorted piles." | Convention: a list of length 1 is sorted by definition |

Checked and not claims: the distractors "16" and "28" are answer options, not assertions. 28 is
C(8,2), so a learner who counts every pair would pick it, which suits a distractor. "The merge is
the payoff" is framing. The stage messages "That one is bigger. Compare the two tops again." and
"Merged with N comparisons." are computed live. I read the code to confirm they are accurate:
pile values are distinct (generated through a Set), so "bigger" is never a tie. A wrong tap does
not increase the counter, and "Slide the rest" adds 0. The transcript (step 1: wrong tap,
counter stays at 0) is consistent with this.

## Required fixes, routed to demo-builder

None of these is a false claim, and none blocks launch on accuracy.

- **F1 (c2 source does not match what the stage shows).** The reveal teaches the bottom-up
  schedule (2s, 4s, 8s), but c2's derivation is for top-down halving. Do one of these: (a) extend
  c2's `source` to cover the schedule on stage (for n = 1000 the bottom-up worst case is ≤ 8,985,
  from summing p + q − 1 over each pass; it is still < 10,000), or (b) change the reveal wording
  so it does not name a schedule. Either is fine for accuracy. Pick whichever the design wants.
- **F2 (review the new claim text).** c4–c8 were added by the fact-checker so that every
  learner-visible factual sentence has an address. Check that each one's `text` matches what the
  lesson means to assert. If you reword one, keep its `id`. After that, a checker other than
  this one has to verify c4–c8. Until then they appear as UNVERIFIED on the trust sheet and in
  `claims --open`.
- **F3 (citation hygiene, optional).** c1 and c2 cite "Knuth, TAOCP Vol. 3, 5.2.4". I did not
  confirm the section. Both claims are verified on re-derivation, so the citation is not
  load-bearing. Either confirm the section with a page or equation number, or describe it as
  further reading.

## Second check of c4–c8

fact-checker (second instance, did not write c4–c8) · 2026-10-12 · inputs: `src/demos/cs/merge-sort-payoff/meta.json`, `Demo.tsx`, `artifacts/walkthroughs/merge-sort-payoff/transcript.md`, and the section above for what was claimed. I wrote my own script (`artifacts/scratch/fc2-merge-sort-second.mjs`, node) instead of re-running the first checker's, and ran it on the stage's own logic (copied the lesson's `deal()` generator).

**Result: c4, c5, c6, c7, c8 all VERIFIED. 0 disputed. meta.json updated (`status: verified`, `checkedBy: fact-checker`, `checkedOn: 2026-10-12`); no claim text changed.**

```
c4  4+4 of 8: 70 splits, max 7, min 4 ; interleaved witness (A = 1st,3rd,5th,7th smallest): 7
    lesson deals (200 seeds): min 4, max 7 ; seed 7 piles [10,20,21,23] / [4,5,18,36] -> 7 (as in the transcript)
    information bound: C(8,4) = 70 outcomes, ceil(log2 70) = 7  (any comparison method needs at least 7 in the worst case)
c5  all 256 splits of 8: after a pile empties the rest is sorted and larger than everything placed, comparisons + rest = 8
c6  10 cards, pile sizes 1+9, 2+8, 3+7, 4+6, 5+5: max 9 in every case ; C(10,2) = 45 (the distractor)
c7  instrumented top-down merge sort on 1,000 values: 8,415 value comparisons, all inside the merge loop; the split uses index slicing and calls no comparison
    W(1000) = 8,977 < 10,000
c8  a one-element list has no adjacent pair out of order (vacuously sorted): true
```

- **c4: VERIFIED.** Upper bound n - 1 = 7, reached by interleaved piles. The stronger reading, "7 is the most you could ever need", also holds for any merging method (information bound 7), so the predict answer is exact, not just for the stage's procedure.
- **c5: VERIFIED.** When a pile empties, every remaining card exceeds the last card of the emptied pile (that card was placed because it was smaller than the other pile's top) and the pile is sorted, so appending is correct with no further comparisons. Stage check: the code's `take()` and `slideRest()` add 0 to the counter once one side is empty, and the message "One pile is empty. The rest needs no comparisons." appears exactly when one side is empty and the merge is not done.
- **c6: VERIFIED.** Bound 9 for n = 10 and reached for every split, so "some piles need all 9" is true. The recall `why` ("Every comparison places one card for good, and the last card needs none") is a correct short form of the c1 argument.
- **c7: VERIFIED as worded** (comparisons). Splitting by position looks at no values. Wording problem: the hook "Splitting ... looks like extra work. It isn't." speaks of work, not comparisons; splitting does cost index arithmetic or copying in a real implementation, so "isn't extra work" is true in comparisons only. Routed as F4 below.
- **c8: VERIFIED** (convention). Length-0 and length-1 lists are sorted by definition. Consistent with the reveal.

Additional observations from the second check:
- The first checker's F1 (c2's derivation covers top-down halving, the reveal shows bottom-up) still stands; not re-opened here.
- The reveal sentence "Each comparison looks at only the two top cards, and the smaller one goes into the row for good" is the c1 mechanism; I found it correct against the code (a wrong tap is rejected without counting) but it is not a separately recorded claim. I did not add it (it is covered by c1 and c6, and I was asked only to check c4–c8).

### Fixes routed to demo-builder

- **F4 (hook wording, c7).** The hook says splitting "isn't" extra work, while the claim recorded and verified is that splitting costs no comparisons. A learner may read the hook as "splitting costs nothing". Reword the hook, or widen the claim, so they say the same thing.
