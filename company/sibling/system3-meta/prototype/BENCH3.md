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

## Results (run 2026-10-21, 17:13-17:37 UTC; scored after the run, predictions above unchanged)

The record is in `live/bench3-record/`:
- action logs and per-session usage, with the S-id mapping used for `supervisor.mjs usage`;
- both `serve` logs, the hidden rubric, and both packs (as judged, without their `## Changes` notes);
- the fact-checks and judges, with `judge-key.txt`.

The org evaluator's second pack is in `live/orgeval-2/`.

| Measure | Current method (B2) | Meta B2 | **A, kickoff** | **B, no kickoff** |
|---|---|---|---|---|
| Agent sessions to a shipped pack | 24 | 15 | 18 | 22 |
| Agent tokens | 1,449,456 | 1,012,025 | **1,218,857 (84%)** | 1,409,043 (97%) |
| Wall time, set-up to last ship | 12 min 19 s | 20 min 14 s | **18 min 10 s (1.47×)** | 23 min 0 s (1.87×) |
| Typed commands, launches excluded | 1 | 20 | **3** (init, batch, serve) | 3 |
| Typed commands per wake | 0 | 1 | **0** | 0 |
| Revise loops | 5 + 1 | 4 | **3** | 6 (Round 5 four times, PACK once, Round 4 once) |
| Hidden rubric | 6/6 | 7/7 | 7/7 | 7/7 |
| Code clash check on the shipped pack | - | - | 0 | 0 |
| Fact-check: wrong / misleading / nitpick | 0 / 0 / 1 | 0 / 0 / 3 | 0 / 2 / 2 | 0 / 0 / 6 |
| Blind judges (6 criteria × 2 orderings) | - | - | **9 wins** | 1 win (2 ties) |
| "Would publish" | 0/2 | 2/2 | 2/2 | 2/2 |

**Scoring:**
- **D1 refuted: 84% of the current method, against ≤ 60% (refuted above 80%).**
  - A also cost more than Meta did in Benchmark 2 (1.22M against 1.01M), even with fewer loops (3 against 4).
  - The reason is sessions. Every session costs about 60-70k, whatever it does: 18 sessions × 68k ≈ 1.22M.
  - The fixed cost of a session dominates. The adaptive cap gave every launch a cap of 1, because items arrived one at a time. So each revise and each re-check was a session of its own. Benchmark 2's caps drained 2-3 items per session.
- **D2 wrong (1.47× against ≤ 1.0×), not refuted (> 1.5×), barely.**
  - Taking STYLE off the gate helped: 18 min against Benchmark 2's 20.
  - The critical path is now the revise chain on the hardest round. That is Round 5 in both arms; in A it took 2 loops.
- **D3 right.** 0 commands per wake. 3 commands in all: init, batch, and `serve` under a monitor. Every launch was taken verbatim from the outbox.
- **D4 right on the logged numbers.** Code caught 13 defects before hand-in (self-checks), against 3 for the reader and 2 escapes, which is 72%.
  - Caveat: a failed self-check is one run, not one defect. One draft can fail twice for the same reason, so 72% is an upper bound.
  - Either way it is above the 25% that would refute D4.
- **D5 mostly right.**
  - A had half B's revise loops (3 against 6).
  - Both judges preferred A, in both orderings (9 of 12 criteria).
  - Escapes are a draw within grader noise. Fact-checker 1 called A's Venus line "thick clouds trap the heat" misleading. Fact-checker 2 called the identical line in B a nitpick.
    - A: 2 misleading and 2 nitpicks.
    - B: 6 nitpicks, plus a format escape (a 4-word answer in shipped Round 3) caught only at PACK.
  - So the kickoff pays on loops and on quality. It does not pay on facts.
- **D6 right.** 0 cross-round or within-round clashes by the code check, on both packs.

**What the ablation shows (n = 1 per arm; the kickoff is the only difference):**
1. **The kickoff halves the rework.**
   - B's Round 5 looped four times. Each fix created the next defect: a giveaway, then a pronoun answer, then a clue that answered itself.
   - Two of those loops came from fixes the reader itself suggested.
   - A's decided topics and fact ownership up front, so its rounds started from settled ground.
2. **The kickoff costs 3 sessions (215k) and saves 4.** Net, it cut tokens by 13% and time by 21%.
3. **Quality favours the kickoff.** The judges' reasons point to coverage (A answered across 7 of 8 planets; B was heavy on Jupiter), to why lines that add a new idea, and to a cleaner difficulty climb.
4. **The same false claim escaped for the third time.** "Thick clouds trap the heat" on Venus appeared in Benchmark 2 and in both arms here.
   - Nothing carries a known escape from one run to the next. Room memory is per run.
   - That is a learning gap the org evaluator should own: a company list of known escapes, carried as `banned` phrases into every later order's checks.

**Tool findings in this run (fix after the run, with tests):**
- **The giveaway check refuses common-word answers.** "The Sun" could not be an answer because "Sun" appears in other rounds, so B's writer replaced a listed fact.
  - The within-round check should require a distinctive word, as the cross-round check does.
- **PACK's split counts `## Changes` as part of Round 5.** A change note that quotes an answer fails as a giveaway. The split should end at the next heading.
- **`lineMaxWords` with prefix `**Q`** counts the leftover "1.**" as a word. A's chair had to code 17 for a 16-word decision.
- **The orgeval learning row** attributes PACK's catch of Round 3's answer to the PACK builder, not to Round 3's author.

**My errors:** none in this run. I took every launch from the outbox file, checking each with a diff against the last brief for the same role.

**Next:**
1. Fix the four tool findings.
2. **Cost is sessions now.** Let `serve` batch a role's queued revise and re-check work when a second item is due within a minute, rather than launching at once.
3. Add a company escape list that seeds the `banned` checks.

**After the run:**
- Three of the four tool findings are fixed in `state.mjs`, with a test that fails on the old code (66 tests):
  - the bold label tail;
  - common-word answers;
  - a split section now ends at the next heading.
- The orgeval attribution finding is still open.
