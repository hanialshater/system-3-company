# Build note: only-the-needed-trader-profits

- Builder: ncm-e03 (demo-builder), 2026-10-14, v1 draft. Brief: company/domains/briefs/economics.markets.md, Course NCM #20 (accepted version, with its Edited notes: values on the stage, "can earn only if").
- Intent: one network (2 sellers, 3 traders, 2 buyers). "Take out T1/T2/T3" removes one trader at a time; the highlighted route shows which trader carries each trade (T2 picks up seller 1's trade when T1 is out). Each trader, once tested, is tagged "−0 trades" or "−1 trade"; readouts give trades made and value created.
- Milestones: spare-out (T1 or T2 taken out) and needed-out (T3). QA's DOM order (T1, T2, T3, All back) reaches both.
- Numbers re-run in my own code: trades() brute-forces seller–buyer pairs; FULL 2, LOST [0, 0, 1], matching the brief.
- Profit itself is not simulated: the competition (c3) and the one-directional theorem (c5) are told in claimed sentences; the stage shows the cause (a rival on the same route vs none). The reveal footnote says being needed allows a profit, not guarantees it.
- Misconception (most connections) is answered by noting every trader has two links (c2).
- Not run (per dispatch): next build, QA, walkthrough, tsc. Needs local QA before status review.

## Pre-flight v2 (demo-builder, 2026-10-14, fact-check pass 24 fixes)

c5 was held: the general theorem rests on BEKT 2009, which nobody here can open.
- The reveal now says "On this network, the only trader that can earn a profit is the one whose removal lost value: T3." The general "Being needed allows a profit; it does not guarantee one." is gone, so the muted line reads "A simplified model with invented values."
- c5 is reworded to match and set to unverified. It now rests on c1, c3 and c4 together with the stage's trade counts.
- No mechanics changed, so every control pressed once in DOM order behaves as before. Not run: build, QA, walkthrough.
