*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r5, first learner review): two-stacks-make-a-queue
lesson version: v2
boundary: adult beginner who has done the prerequisite lessons (a stack gives back the last thing added, a queue the first; an occasional big copy can average out, as in list doubling); has not seen a queue built from two stacks.
Screenshots seen: yes (artifacts/walkthroughs/two-stacks-make-a-queue/sheet.png)
Verdict: revise

## 1. From the artifact

- Predict: "Removing all four, how many times is each item poured?" Options: Once / Four times / Once per removal before it. The third option is hard to parse; I had to read it as "item k is poured k−1 times". The locked stage shows four waiting tiles, each tagged "moved ?", an "in" and an "out" column with a "pour" arrow, and "Pours: ? · Left: —". The setup is clear.
- Explore: Add 1-4 stacks them in "in" (1 at the bottom), each "moved 0". "Remove 1st" fires "Out is empty: pour all of in over". The pour arc lights, 1 leaves, and 2/3/4 sit in "out" tagged "moved 1". The next three removes say "out not empty: no pour". At the end: "Pours: 1 · Left: 1 2 3 4", every tile "moved 1". The per-tile "moved" counters are a good device.
- Where it lost me: the tape is all adds, then all removes. In that order there is only ever one pour, so "each item poured once" is the only possible outcome, and the hook's worry ("flipping everything" every time) is never really tested. The claim the lesson exists for, "each item is poured at most once in its life ... average cost stays constant", covers mixed orders, and I never saw a second pour. With the prerequisite I can guess it generalises, but the stage doesn't show it.
- Reveal: "one pour moved 4 items, each once" and "left in order 1 2 3 4" were on stage. The amortised claim and "the same accounting as list doubling" are told.

## 2. Earlier findings

None: this is the first learner review of this lesson.

## 3. New findings

- Top (revise): show an interleaved tape, for example add 1, add 2, remove, add 3, add 4, remove, remove, remove. A second pour happens (moving 3 and 4), yet no tile's "moved" counter ever passes 1. That is the moment that answers "flipping everything?", and today it isn't on stage. In this build a learner can't interleave on purpose, or isn't invited to (the panel says "Play the tape: add 1 to 4, then remove four times").
- Minor: reword option 3 ("Once for every item removed before it") or replace it with "Once per removal", the actual worry.
- Minor: in the reveal frame the instruction and the in/out columns are cramped and scrolled. The trust link reads 0/4 claims checked and the chip says DRAFT (fact-checker's lane, then launch).
- No FATAL.
