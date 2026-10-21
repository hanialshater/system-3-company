# Benchmark 3: the Benchmark 2 task on the current tools, and the kickoff ablation (predictions committed before the run)

owner: vp-meta (ISS-1, ISS-3, answered yes with the founder's approval) · run by chief-of-staff · date: 2026-10-21

## Why

The org evaluator's first evaluation (live/orgeval-1/evaluation.md) asked for two things:
- a fixed task, so that runs can be compared across time (ISS-1);
- a direct test of whether the kickoff meeting helps (ISS-3).

This run re-runs Benchmark 2's task with the same brief, the same hidden rubric, the same fact-check and the same blind judges.

## Arms

The task is the same as Benchmark 2: STYLE, ROUND1-5 and PACK.

**What both arms share:**
- the `storybook` spec;
- one `batch` set-up;
- `serve` under a monitor, with briefs launched as the outbox files hold them;
- the same base checks on every order: title, words, required markers, banned words, reading ease, and `distinctAnswers` (across rounds for each round; within and across sections for PACK);
- STYLE is a deliverable but not a gate: the rounds do not wait for it.

**A, kickoff:**
- The kickoff meeting MTG-1 (two writers and the editor) decides topics, fact ownership, format and limits.
- The chair carries the checkable decisions as `--rules`, and delegation waits for the meeting.

**B, no kickoff (ablation):**
- The same orders, with no meeting. The editor delegates at once, and the writers coordinate through what is on disk: STYLE when it exists, and the other rounds.
- No rules beyond the base checks.

**The current method's numbers are Benchmark 2's**, the same task and rubric, not re-run: 24 sessions, 1,449,456 tokens, 12 min 19 s, 5 revise loops plus 1 acceptance round sent back, 0 wrong or misleading facts, 1 nitpick.

**Measured as before.** Self-checks are now logged, so code's catches before hand-in count. The org evaluator gets a second pack with the new runs.

## Committed predictions

| # | Prediction | would_be_wrong_if |
|---|---|---|
| D1 | A's agent tokens to the shipped pack ≤ 60% of the current method's (≤ 870k) | > 80% (> 1.16M) |
| D2 | A's wall time ≤ 1.0× the current method's (≤ 12 min 19 s), now that STYLE is not a gate | > 1.5× |
| D3 | A needs 0 typed commands per wake, and ≤ 4 typed commands in all, launches excluded | any per wake, or > 6 in all |
| D4 | Code catches at least half of A's defects (self-checks, test1), counting reader, orderer and integration catches too | < 25% |
| D5 | The kickoff pays: A has fewer revise loops than B and no more escapes, and the judges prefer A over B in at least one ordering | B is no worse than A on loops, escapes and judges |
| D6 | A ships 0 cross-round or within-round clashes by the code check | any |
