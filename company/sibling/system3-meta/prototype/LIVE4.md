# Live run 4: the three Benchmark 2 fixes, live (predictions committed before the run)

owner: chief-of-staff, for System 3 Meta · date: 2026-10-21 · founder: "Ok go ahead with the 3 fixes"

**Task:** an "Ocean Animals Quiz" for ages 8-10:
- ROUND1-3, four questions each (`**Qn.**`, `**Answer:**`, one-sentence `**Why:**`);
- PACK, which assembles them;
- no style-sheet order: the kickoff's decisions, carried as `--rules`, are the style.

**Set-up:** the Meta arm only, `storybook` spec.
- `batch` creates channels, a goal with code-measured criteria, the kickoff meeting and the orders.
- The rounds carry `distinctAnswers` across rounds; PACK carries it across its sections.
- `supervisor.mjs serve` runs under a monitor. I launch what it streams and record usage once at the end.

| # | Prediction | would_be_wrong_if |
|---|---|---|
| L4-1 | Typed orchestrator commands, launches excluded: ≤ 4 (init, batch, serve, usage) | > 6 |
| L4-2 | The chair carries at least one checkable decision as `--rules`, and no round is sent back at the check for a reason a code check could have caught | a check-stage revise names a word limit, required text, banned word or repeated answer |
| L4-3 | PACK ships with 0 repeated or given-away answers by the code check, and no hand fix | the check passes something the reader then flags as a cross-round giveaway |
| L4-4 | `serve` runs from start to done with no restart | it needs a restart or misses a launch |
