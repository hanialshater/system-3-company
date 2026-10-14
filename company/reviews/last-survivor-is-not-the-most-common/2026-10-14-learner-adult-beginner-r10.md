*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): last-survivor-is-not-the-most-common
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows keeping a running count; does not know that one candidate and one counter find an item filling more than half a stream, and only that: with no such item the survivor means nothing until a second pass checks it)
Screenshots seen: yes (artifacts/walkthroughs/last-survivor-is-not-the-most-common/sheet.png, recorded 2026-10-14T18:56)
Verdict: launch (pass)

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "A"; tapped Run stream 1, Count again, Run stream 2, Reset; opened reveal.

1. **The prediction is genuine** in a specific way: the rule is given, so a careful learner could trace it, but most will pick "A" because A is the most common. That is exactly the misconception, and the walkthrough learner fell into it.
2. **The trace under each tile is excellent.** "A:1 A:2 A:3 A:2 A:1 A:0 C:1" lets me see the counter being eaten by the Bs and the first C, and C taking over at zero. I can verify every step.
3. **"Count again" is the key move.** "C: 2 of 7 · not a majority · A had 3" says plainly that the survivor is not the most common. Stream 2 ("A: 5 of 7 · majority") is the contrast case where it works.
4. **Where I needed something I was not given: why anyone would do this.** I know running counts; my obvious alternative is "just count every item". The lesson never says the point of one candidate and one counter (it needs almost no memory and one pass over a huge stream). Without that, the method looks like a worse way to count, and "a second pass checks" looks like admitting it.
5. "Each −1 cancels two different items" is the reason a majority survives; the reveal says it, and stream 2's "that many copies cannot all be cancelled" makes it make sense. Good.
6. Fit: the reveal opens after Reset, so stream 1's trace is cleared; the summary line keeps "C (2 of 7; A had 3) · A (5 of 7)". Readable.
7. Trust link "0/5 claims checked" (fact-checker's lane).

Fixes (optional): one clause of motivation in the hook or reveal ("with room for only one counter, as in a huge stream").

Verdict reason: the misconception (survivor = most common) is broken by a trace I can check, and the second pass and the majority case are both on stage.

## After reading the brief (meta.json)

- doesNotKnow is delivered in full. Finding 4 is about motivation, which the brief does not ask for but a beginner will want.
