*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): running-median-two-heaps
lesson version: v2
boundary: knows-heaps. Knows a heap hands back its top fast (heap-bubble-up) and what a median is; has never seen that a max-heap of the lower half and a min-heap of the upper half keep the median at their tops (meta.json learner field, same boundary as r6).
Screenshots seen: yes (artifacts/walkthroughs/running-median-two-heaps/sheet.png, build 4 at :3480)
Verdict: launch

## Findings (written from the walkthrough, before the brief or the previous review)

Walked the phone transcript and sheet.png (5 frames). Chose option 1 ("0").

1. **The prediction is a real bet for someone who knows heaps.** "0" is tempting: 3 is smaller than 5, it just drops into the lower heap. Seeing that the size rule forces 5 across is the small surprise. Options 0 to 3 are bare numbers; the locked stage shows the four tiles, two empty halves and "SIZES 0 | 0". Nothing points at 1. Met: no answer before the commit.
2. **The crossing is captioned, but it happens inside "Feed the rest".** One tap takes 15, 1 and 3 together. I see the end state (lower 3 over 1, upper 5 over 15, median 4) and the caption "3 ≤ 5: into the lower half. Lower is too big: 5 moves up." I did not watch 5 move. The log row "3 → lower, 5 crosses · median 4" is bold and stays. Good enough for this boundary; a learner who taps "Next number" four times sees each step.
3. **The why is on the stage.** The log is the argument: four arrivals, "nothing crosses" three times, "5 crosses" once, and a median read straight off the tops each time (5, 10, 5, 4). "At most one move per arrival" is visible as a pattern in the log, and "median = one top or the mean of both" is visible in the 10 and the 4.
4. **Start over leaves the log behind an empty stage.** After Start over the halves are empty and SIZES reads 0 | 0, but the four log lines and "Show me why" remain. The reveal then quotes 5 crossing and medians 5, 10, 5, 4: the log still shows them, so the reveal is consistent, but an empty stage next to a full log looks like a stale screen.
5. **The log n claim is told.** "About log n steps: around 19 levels for a million numbers" is a sentence; the heaps on stage are two levels deep. For someone who knows heaps that is context they already have, so it does not need to be shown.
6. **Text load.** Caption plus four log lines plus labels is near 40 words on stage after Feed the rest; the log is the useful part.

Where understanding first broke: it did not break. The only wobble was the jump over the key step in "Feed the rest".

## After reading the brief and the r6 review

doesNotKnow ("two heaps keep the median at their tops") is on the stage: the median slot sits between the two tops and the log reads each median off them. The prediction now asks how many numbers cross, which puts "you must re-sort" at risk. Show the why: met. No answer before the commit: met. The reveal quotes what you saw: met, via the log that survives Start over.

| r6 finding | Status |
|---|---|
| Top: the prediction (medians) does not touch the idea | fixed (now "how many stored numbers must cross when 3 arrives"; 0 is a real wrong guess) |
| Gate lets the method be skipped: Feed the rest hides the 15 and 1 arrivals | partly fixed: Feed the rest still jumps, but every arrival now leaves a log row ("nothing crosses" / "5 crosses") that stays on the stage |
| Minor: after Start over the reveal sits beside an empty stage | partly fixed: the reveal now quotes the log, which survives; the empty halves beside a full log still look stale (finding 4) |
| Minor: nothing heap-like visible; "never re-sorts" not contrasted on stage | partly fixed: the crossings log stands for "at most one move"; log n stays told context (fine for this boundary) |
| Minor: hook reads as a topic question | fixed (now a cost question) |

Why launch: a learner with this boundary can see from the log and the two tops that each arrival costs one insert and at most one crossing, and that the median never needs a sort. Claims are 4/6 checked (fact-checker gate before publish).
