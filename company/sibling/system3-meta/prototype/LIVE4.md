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

## Results (run 2026-10-21, 16:44-16:57 UTC; scored after the run, predictions above unchanged)

The record is in `live/live4-record/`: actions, usage, the `serve` event stream, the acceptance tests and the shipped pack. The outbox briefs are in `live/live4/outbox/`.

| Measure | Value |
|---|---|
| Orders | 4 (ROUND1-3, PACK), all shipped; 11 min 31 s from set-up to the last ship |
| Agent sessions and tokens | 11 sessions, 772,707 tokens (3 kickoff, 8 in rooms) |
| Typed commands per wake | **0**: every launch came from the `serve` stream; 11 launches |
| Typed commands in all, launches excluded | 7 (init, batch twice, serve three times, usage once); 4 without my errors |
| Rules from the kickoff that became checks | 5 rules, applied to orders 7 times: each round's own animals required, other rounds' animals banned, per-line word limits, extra banned words |
| Revise loops | 1 (ROUND3, at the reader) |
| Hidden rubric | 4/4 |
| Cross-round clashes in the shipped pack (code) | 0 |

**Scoring:**
- **L4-1 refuted: 7 typed commands, against ≤ 4.** All three extra ones were my errors:
  - the set-up batch was refused because a lane goal needs a parent. Nothing was saved, as designed;
  - I started `serve` without `--acceptance` and restarted it;
  - I killed the wrong process while restarting.

  The run needed no command per wake, which is what the fix was for. Without my errors the count is 4.
- **L4-2 wrong.** The chair did carry its checkable decisions as rules, 5 of them, and the writers' self-checks enforced them. But ROUND3 went back at the reader for two decided rules the chair had not carried: "numbers as digits" and an intro line outside the decided format.
  - The first could have been a rule: a ban on the number words.
  - The second could not, because no check expressed "only these kinds of line".
  - Fixed during the run: `allowedLines`, and a chair brief that asks for every checkable format decision.
- **L4-3 right.** The pack shipped with 0 repeated or given-away answers by the code check, and no hand fix for a clash.
  - PACK itself fixed two Round 3 facts the reader had passed (a hermit crab's "soft body"; sea stars "with no gills").
  - The pack's reader noted one clash inside Round 2, which no check covers: the shark clue also fits the whale shark. Cross-round checks don't look within one round.
- **L4-4 wrong as run, not as built.** `serve` ran to "done" by itself, missed no launch and planned every session. It needed restarts only because of my errors above. It now refuses to run twice on one state (pid guard).

**Fixed during the run** (60 tests):
- `allowedLines`;
- minutes written to `live/<dir>/minutes/<MTG>.md` on close, and briefs point there and forbid state files: one reader read `state.json` to find the kickoff;
- `check` lists its rules in plain words: three agents believed banned words matched inside longer words, and one carried that belief in room memory;
- a pid guard for `serve`;
- the minutes list what each rule tightened;
- `supervisor.mjs usage` takes session ids and `--outside`, so a batch can't misattribute meeting work.

**My errors:**
- the refused set-up;
- `serve` started without acceptance;
- the wrong process killed;
- a hand-retyped brief: I wrote "starting with ROUND3" for ROUND1. The room's pack overrode it, and the reader noticed. Launch from the outbox file, never retype it.

**Next:**
1. A within-round answer check.
2. A launcher that hands the outbox file to the agent unchanged.
3. Run Benchmark 2's task again on these tools, to measure the change in cost and wall time.
