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
