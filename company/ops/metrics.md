# Metrics

owner: analytics-steward (definitions) · chief-of-staff (collection) · command: `npm run metrics` (`-- --md` for records)

Two kinds of numbers, never mixed:

## A. Company health (what the repo can tell us)

| Metric | Definition | Healthy | Why it matters |
|---|---|---|---|
| Lessons by status | count per draft / review / published / retired | review queue < 2 waves deep | Throughput without a backlog of unchecked work |
| Claims verified % | verified ÷ all claims on non-retired lessons | rising each wave | A lesson cannot publish on unchecked claims |
| Disputed claims | count | 0 open for > 1 wave | A dispute blocks a launch; it must be answered |
| Fact-checked / learner-reviewed / QA pass | lessons with each record | = lessons in review | Gates coverage |
| Fatal rate | lessons with a learner verdict "fatal" ÷ reviewed | falling each wave | Is the builder brief learning from the reviews? |
| Build / check tokens per lesson | from `ops/waves.json` | check ≤ build | Thesis 1: checking is the bottleneck |
| Merge QA failures | contract failures on the integrated tree after a wave | 0 | Parallel branches that pass alone and fail together |
| Board age | days the oldest open item has waited | < 7 | Things that get forgotten |
| Rituals on cadence | `company rituals` shows nothing overdue | yes | Mechanisms that keep running |

## B. Learning (what only real learners can tell us)

| Metric | Definition | Status |
|---|---|---|
| Prediction commit rate | predictions ÷ lesson views | needs deployed traffic |
| First-revisit recall | correct first revisits ÷ first revisits | needs deployed traffic (EXP-002) |
| Borrowed-mind hit rate | real confusion points predicted by learner reviews | EXP-002 |

Until B has data, every claim that the company "works" is about A.

## C. Founder leverage: founder attention per accepted outcome

Added 2026-10-17 by analytics-steward, from the external assessment
(company/reviews/org/2026-10-17-external-assessment.md, §6, §7 and Appendix B "Founder leverage").
Computed by `npm run metrics` (tools/lib/founder-leverage.mjs). It is a measure of the **company**, not of
learning: it says nothing about whether anyone learned, which stays in B.

**What the number is taken to mean.** How much founder attention the company consumes for each piece of work an
independent party accepted. The claim it tests: the company is becoming less dependent on the founder's intervention
as it grows. Falling *correction* and *routing* per accepted outcome supports that claim. *Decision* per outcome is
reported, not targeted: the founder keeps every approval right (deploys, budgets, amendments), and fewer decisions
must never mean an agent silently assuming authority it was not given.

**Three founder counts, kept separate, never summed into one score.** Each founder message (a `founder` event, from
the transcript backfill) gets exactly one class:

| Class | Counts | Examples |
|---|---|---|
| `decision` | Purposeful founder decisions | Approving a deploy, a budget top-up, a new floor; setting direction or priority |
| `correction` | Avoidable clarification or correction | "That is not what I asked", repeating an instruction, catching a wrong claim, "what is your plan?" because the plan was not visible |
| `routing` | Recovery or routing work | Chasing a stuck run, telling the company who should do what, untangling a broken checkout, restarting a session |

When a message mixes classes, pick the one that cost the founder the most; when unsure, `correction` (the
pessimistic reading). A question that is pure curiosity ("how is the company doing?") with no correction in it is
`decision` only if it changes what the company does next; otherwise `correction` if the answer should already have
been visible in `company status`. Minutes are recorded only when the founder says them; an agent never estimates them.

**Accepted outcomes, by task class.** Acceptance is by someone other than the maker.

| Task class | Accepted when | Source |
|---|---|---|
| Checked lesson published | status `published`, and the current version has a fact-check record, only `launch` learner verdicts, and a QA pass record | meta.json + company/reviews/<slug>/ (computed) |
| Adopted library improvement | a kit, pattern or tool change is used in an active run after it merged, and the adopting owner says so | an event with `accepted: "library"` |
| Verified operational fix | a fix is shown active (installed and firing, not just merged: assessment case 3) by a role other than its author | an event with `accepted: "opfix"` |

**Period.** Both sides over the same period: all of the log to the day of the run, and since 2026-10-17 (below). In
the all-of-log view the lesson count is the stock on that day, so a lesson published then retired drops out. The WBR reads the change between two WBRs, not the level.

**Who writes it, and how cheaply.**
- The **chief of staff**, in the same turn as answering a founder message, appends one classification event:
  `node tools/events.mjs add --type=founder --room=lobby --actor=chief-of-staff --corrects=<tx-id> --class=decision|correction|routing [--minutes=N] --summary="class: <class>"`.
  The log is append-only (company/ops/events.md), so the message is never edited; the newest classification wins.
- The **accepting role** (not the author) writes `--accepted=library|opfix` on its own `verify` or `note` event.
- Lesson acceptance needs nobody to write anything.

**The 167 founder messages before 2026-10-17 are `unclassified`.** They mix direction, approvals, questions and
corrections; classifying them after the fact would be guessing the result. They are not backfilled.

**When the ratio is printed.** Metrics prints two views: all of the log (counts only in practice, because the 167
are unclassified) and **since 2026-10-17**, when classification began (`CLASSIFY_FROM` in
tools/lib/founder-leverage.mjs). In the second view lessons are dated by the first `publish` event that names them
(a launch-review event can list a lesson it held, so a held lesson may be dated early). The per-outcome ratio prints
only when at least 80% of founder messages in the view are classified; below that, the three counts and
"not computed" with the reason.

**What would count against the claim "the company needs less founder attention per outcome".**
- Correction + routing per accepted outcome not falling across three consecutive WBRs once the ratio prints.
- Accepted outcomes rising only in the lesson class while library and opfix stay at 0 (the measure would then be
  production volume, not leverage).
- A fall in founder decisions that coincides with an agent acting on authority the founder holds (any unapproved
  deploy, budget or amendment): that is lost oversight, not leverage, and it voids the read for that period.
- Classification done by the role whose work is being judged drifting toward `decision`: the steward samples ten
  classifications per WBR against the message text.

**Not measured yet.** Founder minutes (only if the founder offers them); coordinator tokens (excluded from the
ledger); whether an accepted lesson taught anyone anything (B, EXP-002).
