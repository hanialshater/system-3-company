# Build note: only-the-needed-trader-profits

- Builder: ncm-e03 (demo-builder), 2026-10-14, v1 draft. Brief: company/domains/briefs/economics.markets.md, Course NCM #20 (accepted version, with its Edited notes: values on the stage, "can earn only if").
- Intent: one network (2 sellers, 3 traders, 2 buyers). "Take out T1/T2/T3" removes one trader at a time; the highlighted route shows which trader carries each trade (T2 picks up seller 1's trade when T1 is out). Each trader, once tested, is tagged "−0 trades" or "−1 trade"; readouts give trades made and value created.
- Milestones: spare-out (T1 or T2 taken out) and needed-out (T3). QA's DOM order (T1, T2, T3, All back) reaches both.
- Numbers re-run in my own code: trades() brute-forces seller–buyer pairs; FULL 2, LOST [0, 0, 1], matching the brief.
- Profit itself is not simulated: the competition (c3) and the one-directional theorem (c5) are told in claimed sentences; the stage shows the cause (a rival on the same route vs none). The reveal footnote says being needed allows a profit, not guarantees it.
- Misconception (most connections) is answered by noting every trader has two links (c2).
- Not run (per dispatch): next build, QA, walkthrough, tsc. Needs local QA before status review.
