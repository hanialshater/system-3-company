# Benchmark 1: a 5-page story book, Meta tools vs the current method (predictions committed before the run)

owner: chief-of-staff, for System 3 Meta · date: 2026-10-21 · founder: "Get back when you have a working solution benchmarked against current method. Use writing small story book as a proxy task for the companies."

## The task (the same brief for both arms)

A picture book for ages 4-6 about **Pip, a small fox who is afraid of the dark and learns that the night has its own friends**. It comes in two parts:
- **A story bible** (`BIBLE`): characters, setting, and a page plan with one beat per page.
- **Five pages** (`PAGE1`…`PAGE5`): each page follows its beat, has a `# Title` first line and 120-220 words, uses simple sentences, and keeps characters consistent with the bible.

**The same hidden acceptance rubric (code) judges both books:**
- the bible has its sections and a 5-beat plan;
- each page has its title line and 120-220 words;
- each page mentions Pip, has reading ease ≥ 75, and uses no banned words.

**The same blind judge** compares the two books: two fresh judge sessions, A/B order swapped, who see neither arm's name nor its process.

## Arms

**Current method** (how System 3 Company runs today), in `live/bench1-baseline/`:
- **Sessions:** one agent session per task. The editor writes the bible; one writer session per page; one reader session per page check (plus the bible); a writer and reader session per revision.
- **Coordination:** the orchestrator dispatches every session by hand with a written brief. Agents update a markdown board (`board.md`) themselves.
- **Acceptance:** the editor reads the finished book in one session and accepts or sends pages back.
- **WBR:** an agent writes it from the board.

**Meta tools**, in `live/bench1-meta/` with the `storybook` spec:
- **Set-up (code):** goals at company, org and lane level (with why, what, success and due); a project; lane and company channels.
- **Kickoff:** a meeting in the story room. The two writers and the editor write private positions on the arc and the tone, then reveal them; the editor decides, and the actions become tracker items.
- **Orders:** the bible, then `PAGE1`-`PAGE5` ordered `--after` it, with declared text checks as test1.
- **Supervisor:** `supervisor.mjs watch` does test1, UAT (the hidden rubric), ship and the launch plan.
- **Agent sessions:** writers and the reader drain their queues.
- **Close:** a WBR (page 0 by code, positions from the editor, summary by the chief of staff) and a goal review by code.

**Measured the same way in both arms:**
- agent tokens, from the harness per session;
- wall time, from the first dispatch to the book accepted;
- orchestrator actions, meaning every agent launch and every manual step;
- revisions;
- final rubric results;
- the judges' verdicts;
- whether the status report's numbers are true (checked by code against the record).

## Committed predictions

| # | Prediction | would_be_wrong_if |
|---|---|---|
| B1 | Meta agent tokens per accepted page ≤ 70% of the current method | > 90% |
| B2 | Meta wall time is not much worse: ≤ 1.5× the current method. The current method runs five writers in parallel, while Meta drains two sessions and gates pages on the bible | Meta > 2× slower |
| B3 | Meta orchestrator actions ≤ 50% of the current method | > 75% |
| B4 | Quality no worse: Meta's final rubric pass rate ≥ the current method's, and the judges prefer Meta or tie in at least one of the two orderings | Meta's pass rate lower, or both judges prefer the current method |
| B5 | The Meta WBR's numbers are 100% true; the current method's agent-written WBR has at least one number that the record contradicts | the Meta WBR has a wrong number |
| B6 | Meta's revise loops per page ≤ the current method's | Meta has more than 1.5× as many |

## Results (run 2026-10-21, 14:03-14:21 UTC; scored after the run, predictions above unchanged)

The record is in `live/bench1-record/`: action logs, per-session harness usage, supervisor outputs, the hidden rubric, both WBRs and the judges' tables. The books are in `live/bench1-baseline/work/` and `live/bench1-meta/work/` (Meta's shipped copies are in `shipped/`).

| Measure | Current method | Meta | Meta / current |
|---|---|---|---|
| Agent sessions to an accepted book | 25 | 9 | 36% |
| Agent tokens to an accepted book | 1,481,983 | 562,439 | 38% |
| Tokens per accepted item (6 items) | 247,000 | 93,740 | **38%** |
| With the WBR session | 1,550,986 | 630,638 | 41% |
| Wall time, first dispatch to accepted | 14 min 44 s | 13 min 05 s | 0.89× |
| Orchestrator actions (all) | 27 | 45 | **167%** |
| of which agent launches | 26 | 10 | 38% |
| Revisions (writer or editor sessions) | 5 | 0 | - |
| Revise verdicts | 8 (6 reader, 2 editor acceptance) | 0 | - |
| Hidden rubric | 6/6 | 6/6 | same |
| Blind judges (5 criteria × 2 orderings) | 0/10 | **10/10** | - |

Where each arm's tokens went:
- **Current method.** Seven sessions wrote the book: the bible and 5 pages. Eighteen more checked and repaired it.
  - The bible gave no pronouns, so two writers made Hoot "she" and three made him "he". That took a bible revision, 1 page fix and 4 re-checks.
  - The pages were also written in different tenses. Readers called the mix "outside the rules". The editor caught it at acceptance, and it cost 2 more writer sessions, 2 re-checks and a second acceptance read.
- **Meta.** The kickoff took 3 sessions (180k): 2 private positions and the editor's decision. It settled pronouns, names, the refrain and the boundary before anyone wrote.
  - The writers then drained their pages, 3 in one session and 2 in another, and every page passed first time.
  - One session (63k) was spent because the supervisor's drain cap of 4 left PAGE5 for a separate reader session.

Scoring:
- **B1 right.** Meta used 38% of the tokens per accepted item, against the ≤ 70% predicted.
- **B2 right.** Meta was faster (0.89×), not slower. The bible gate cost less than the current method's repair loops.
- **B3 wrong.** Meta took 45 orchestrator actions to the current method's 27, against the ≤ 50% predicted. The cause:
  - 20 of Meta's 45 actions are mechanical bookkeeping by hand: `supervisor.mjs launched` (6), restarting `watch` (6) and recording usage (8). 15 more are set-up commands: init, channels, goals, the project, the kickoff, orders.
  - Judgment launches were 38% of the current method's.
  - The bookkeeping is code's to do: a launcher that records the launch and the usage and restarts the watch (next item below).
- **B4 right, strongly.** Both books pass the rubric. Both blind judges prefer Meta on all five criteria, in both orderings. Both named consistency and earned pacing, which the kickoff decided.
- **B5 half right.** Every Meta WBR number is computed by code and matches the record. Two examples: tokens per shipped item, 562,439 / 6 = 93,740; refusals, 2 `refuse` events.
  - The current method's WBR has no number the record contradicts, so the second half was wrong. It hedged instead: "at least 11 reader checks" when there were 12, "at least 5 loops". It said why: the board overwrites history. So it is honest, but it is not a measurement.
- **B6 right.** Meta needed 0 revise loops; the current method needed 8 revise verdicts.

What Benchmark 1 found wrong with the tools, all fixed in the same commit (46 tests):
- **`leave_with` dropped `META_LIVE_DIR`** (writer-1). The copied command would have written to the wrong state.
- **A closed meeting kept its room booked** (the WBR chair). The kickoff's booking blocked the WBR.
  - `closeMeeting` now releases the booking.
  - `wbr open` takes `--start`.
- **Orders could not join a project** (the WBR chair). The roadmap showed PRJ-1 at "0/0 done" while 6 orders had shipped. `order new --project --goal` now mirrors both onto the tracker item.
- **Goals were green with nothing measured** (the WBR chair). The founder's review saw G-1 green with `current: null`. Two fixes:
  - A success criterion can now name a `source` (`shipped:<prefix>`, `done:<label>`), and code measures it. The owner cannot type over it.
  - Green but unmeasured is now an exception that rolls up to the founder.
- **The meeting view lacked the whiteboard** (the editor, mid-run).

**My orchestrator error:** the PAGE1 order text said "continues from page 0's beat", a slip in my template. The writer noticed it and ignored it.

**Caveats:**
- n = 1 book, one model family for writers and judges.
- The current method's bible could have been better with a better brief; Meta's advantage is that the meeting forced the questions.
- Meta has no whole-book read before shipping. Here no defect slipped through (the judges rated it more consistent), but a book-level check belongs in UAT.

**Next:**
1. A `launch` command that does launched + usage + watch, to fix B3.
2. Drain cap = the queue when it is small.
3. A book-level UAT read.
4. Benchmark 2 on a different proxy task, so the result is not one story.
