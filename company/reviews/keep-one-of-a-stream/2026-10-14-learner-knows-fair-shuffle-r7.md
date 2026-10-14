*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): keep-one-of-a-stream
lesson version: v2
boundary: knows-fair-shuffle. Knows what a fair shuffle is (fair-shuffle-trap); has never seen that you can pick a uniform random item from a stream of unknown length in one pass (meta.json learner field, same boundary as r6).
Screenshots seen: yes (artifacts/walkthroughs/keep-one-of-a-stream/sheet.png, build 4 at :3480)
Verdict: launch

## Findings (written from the walkthrough, before the brief or the previous review)

Walked the phone transcript and sheet.png (6 frames). Chose option 1 ("1/2").

1. **The prediction is honest.** Options 1/2, 1/4, 1/8 are bare fractions at the same precision. The locked stage shows item 1 kept with a full bar and empty slots; nothing points at 1/4. Knowing a fair shuffle, I suspect "fair" (1/4), but the 1/i rule makes item 1 look like it faces the smallest odds of being replaced, so 1/2 is a live wrong guess.
2. **The why is on the stage.** Under every bar there is "gets in × stays" (1 × 1/4, 1/2 × 2/4, 1/3 × 3/4, 1/4 × 1), and the readout "Item 1 stays: 1 × 1/2 × 2/3 × 3/4" spells the survival product. I can see the trade-off the reveal names: later items have a smaller chance to get in and fewer draws to survive. The draw line ("Item 2: draw 0.627, needs under 1/2: keep item 1") makes the single run concrete.
3. **"Rest of the stream" skips item 3.** From item 2 it jumps straight to item 4, so I never saw the bars at 1/3 each. The product readout covers it, but the "every bar equal after each item" pattern is shown at 1, 2, 4 and 5 only. Minor.
4. **The dashes are confusing at item 5.** After the 5th item each bar has a dashed line, the reveal says "Every bar reached 1/4 at item 4 (the dashes)", but the label sitting on the dashes reads "1/5" (that is the new bar value, drawn right on the dash). On the phone the line that explains the dashes is clipped at the right edge: "dashes: 1/4 at item ‹". So the one visual the reveal points at for the 1/4 answer is labelled with the wrong number in effect, and its explanation is cut off.
5. **The reveal quotes what I saw.** 1/2, 2/3, 3/4, 1/4, "1/3 × 3/5" for item 3, and 195, 197, 191, 214, 203 are all on the stage when the reveal opens. It ends on the idea (one item in memory, no need to know the length).
6. **Text load.** The stage carries a header sentence, labels under every bar, a formula line and a draw line: over 25 words at once from step 3 on, in small type.

Where understanding first broke: it did not break on the idea. It wobbled at item 5, matching "the dashes" to 1/4 when the dashes carry a "1/5" label.

## After reading the brief and the r6 review

The brief's gap is "a uniform pick from a stream of unknown length in one pass". v2 shows both halves: the "gets in × stays" line under every bar stands for why it is fair, and "A 5th item arrives" shows the same rule carrying on to 1/5 without knowing the length. Show the why: met. No answer before the commit: met. The reveal quotes what you saw: met, with the dash label problem in finding 4.

| r6 finding | Status |
|---|---|
| Top: "smaller chance to get in, fewer draws to survive" told, not shown | fixed (every bar now carries gets-in × stays, e.g. "1/3 × 3/4", and the reveal points at item 3's) |
| Unknown length told, stream always 4 | fixed ("A 5th item arrives" takes every bar to 1/5 with the same rule) |
| Minor: bars vs the one random "kept" run read as a contradiction | fixed (stage line "Bars: chance each is kept") |
| "Rest of the stream" skips the 1/3-each state | not fixed (minor now, the per-bar products cover it; my finding 3) |
| Claims unchecked | partly: 2/7 checked (fact-checker) |

Why launch: a learner with this boundary can read the fairness argument off the bars themselves. Worth fixing before publish, but not blocking: the "1/5" labels sitting on the 1/4 dashes and the clipped "dashes: 1/4 at item ‹" line on a phone (finding 4). The claims must be verified before publish (fact-checker gate).
