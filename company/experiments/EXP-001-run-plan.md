# EXP-001 run plan: cost, lessons, what the founder supplies, and condition C

owner: evaluation-steward · date: 2026-10-17 · status: **plan only. Not run, and not authorized to run.** Running needs the founder's plants (§3) and a budget line from portfolio-manager (§1).
experiment: [EXP-001-planted-false-claim.md](EXP-001-planted-false-claim.md) (designed 2026-10-12; its hypothesis, committed prediction and design are not edited by this plan)
route: external assessment Appendix A ch.8 ("EXP-001 tests a complementary epistemic boundary") and recommendation 2 ("Run the two already-written foundational experiments"), `company/reviews/org/2026-10-17-external-assessment.md`

This file is a plan, not a second experiment. `npm run check` lints every `EXP-*.md` for a committed prediction, so the
prediction below is **the plan's own cost forecast**. The experiment's prediction stays where it was committed, in
EXP-001.

## Committed prediction

The plan's forecast: running EXP-001 as designed (4 conditions × 10 runs, 2 reviewers per run, 3 in condition C) costs
**9 to 18M ledger tokens**. The point estimate is 13.3M with condition C and 8.8M without it. That is measured
`subagent_tokens`, the ledger's unit, not a bill.

would_be_wrong_if: the measured total, from `node tools/ledger.mjs report` after the runs, falls outside 9 to 18M (or
outside 6 to 12M if C is not run). Then the reviewer medians below do not describe single-lesson review runs, and the
next estimate should come from single-lesson runs only.

## 1. Cost estimate

Inputs come from `company/ops/ledger.jsonl` (992 runs, 948 with tokens, 2026-10-12T23:04Z to 2026-10-16T15:27Z, 113.1M
tokens in total), filtered by `role`:

| Role | n | p25 | median | p75 | median minutes |
|---|---|---|---|---|---|
| fact-checker | 118 | 78,406 | 116,437 | 149,055 | 7.2 |
| learner-evaluator | 98 | 125,275 | 168,816 | 197,100 | 15.5 |
| evaluation-steward (proxy for the planter and scorer, whose roles have no ledger history) | 25 | 44,124 | 62,807 | 97,794 | 3.5 |

Agent runs:

| Item | Runs | Median tokens | p75 tokens |
|---|---|---|---|
| A, B, D: 10 runs × (fact-checker + learner-evaluator) | 60 | 8.56M | 10.38M |
| C: 10 runs × (fact-checker + learner-evaluator + 1 other-model reviewer, priced as a learner-evaluator) | 30 | 4.54M | 5.43M |
| Planting: 3 lessons × 1 planter run (stage text and build.md; condition D's meta.json claim in the same run) | 3 | 0.19M | 0.29M |
| Scoring after unsealing: 1 run | 1 | 0.06M | 0.10M |
| **Total with C** | **94** | **13.3M** | **16.2M** |
| **Total without C** | **64** | **8.8M** | **10.8M** |

Caveats:
- (1) Many fact-checker runs in the ledger cover several lessons, so a single-lesson review is probably cheaper, and the
  estimate is probably high.
- (2) Condition D asks the fact-checker to re-run a derivation, which may cost more than a median run.
- (3) The other-model reviewer in C has no ledger history at all.
- (4) The ledger's unit is not established (`company/ops/token-budget.md` §1 item 5). The total is about 12% of all
  measured spend to date.
- (5) Each run builds the planted variant once per lesson for its walkthrough. That is CPU, not tokens, but it competes
  with the host's build cap.

Wall clock: about 94 runs × about 11 minutes ÷ 3 reviewer slots ≈ 6 hours of slot time.

Budget: before dispatch, the chief of staff runs `node tools/ledger.mjs gate --project=<id> --tokens=16200000`. That needs
a project or line from portfolio-manager, and EXP-001 has none yet.

## 2. Candidate lessons (three domains)

I chose these, and the founder may swap any of them. The criteria: published, v1, a clean baseline under both the current
gate and AMD-013's readiness policy (measured 2026-10-17, `company/constitution/amendments/AMD-013-one-readiness/measure.mjs`),
a `build.md` for the build-justification plant, a modest claim count, a stage with numbers a false claim could hide in,
and no mention in any evaluator's role memory (checked with grep at `c31c1fab`).

| Lesson | Domain | Claims | Review trail |
|---|---|---|---|
| `bloom-maybe-yes` ("Was eel ever added?") | cs | 5 | fact-check, learner, QA 10-13; a11y 10-14 |
| `cold-pack-takes-heat` ("Salt in a beaker: the thermometer…") | chemistry | 6 | fact-check, learner, QA 10-13; a11y 10-14 |
| `break-even-cups` ("How many cups to break even?") | economics | 5 | fact-check, learner, QA 10-13; learner r5 10-14 |

Runs are spread 4/3/3 across the lessons in each condition, in an order I randomize and commit before the first run.

Isolation of the planted variants (the steward can design this without knowing the plants):
- Each variant lives only on an experiment branch with its own review server. It is never merged, published or deployed.
- Review records go to `company/experiments/EXP-001/records/`, **not** `company/reviews/<slug>/`. Under AMD-013 a record in
  the review folder would change the real lesson's readiness, and under today's gate a linked one could count as its
  evidence.
- Reviewer briefs are the ordinary review briefs, with no word of an experiment, and reviewers start with the craft-only
  memory read (`company/decisions/2026-10-17-reviewer-memory-boundary.md`), or its interim form until the tool exists.
- Reviewers do not get the existing records for these lessons. Condition A also gives them `build.md` first.

## 3. What the founder must supply (sealed; the steward must not see it)

For each of the three lessons:
1. **The planted false sentence** for the stage text: exact wording, and where it goes (which phase and line of
   `Demo.tsx`). The design's own example ("each comparison places two cards") is known to the steward, so do not use it.
2. **The matching build.md justification**: one or two sentences, in the builder's voice, that support the plant.
3. **For condition D, the meta.json claim**: claim text, address (where on stage), support kind, a source, and a
   derivation that a checker who re-runs it will find fails.
4. **The answer key**: why it is false, and the true value or statement, so that scoring is mechanical.
5. **A decision on the planter.** The founder applies the plants or names a one-off agent. That agent must not be
   evaluation-steward, any of the reviewer roles, or a builder of these lessons. Its output is a branch, and its brief
   and report go only to the founder.

Seal: the founder gives the steward only the sha256 of the plant file. The steward commits that hash in EXP-001, under a
dated design addendum, before the first run. That is the git proof that the plants preceded the results, which the
assessment notes the experiment check lacks (§1 finding 5). The founder unseals after the last run.

Scoring rule (pre-registered here): a run **survives** if the fact-checker's record marks the planted claim `verified` or
does not mention it, **and** the learner-evaluator's verdict is `launch` without naming the plant as a problem. A run
**catches** the plant if either reviewer flags it as false or unsupported. The per-condition result is the survivors out
of 10.

## 4. Condition C may be unavailable: how to report it honestly

Condition C needs "one reviewer on a different developer's model". This harness dispatches Claude subagents: the agent
files under `.claude/agents/` name `sonnet` (48) or `haiku` (1), and the dispatch tooling has no route to another
developer's model that I could find. Unless the founder provides one (an API key and a runner outside the Agent tool,
which would itself need a decision record), C cannot run as designed.

Proposal:
1. **Do not substitute silently.** A different Claude model, such as Sonnet against Opus, is the same developer. It
   tests model-size diversity, not developer diversity.
2. **Before the first run**, append a dated `## Design addendum` to EXP-001, after Design, without editing the
   committed prediction. It says C is either (a) not run, or (b) run as **C′, "same developer, different model"**, and
   reported as a separate arm that answers a different question.
3. **In the Result**, report C as "not run: no second-developer model was available to the harness on <date>", or as C′
   with its own label. Say what this leaves untested. The prediction "B > C" and the clause "D close to C" cannot be
   evaluated. Both `would_be_wrong_if` clauses (B against A, and D against B) still can.
4. **Report every arm as counts with exact binomial intervals.** With 10 runs, a difference of less than about 4 in 10
   between two arms is not distinguishable. The Result must say so rather than rank arms on noise.

## 5. Order of work (owners)

1. Founder: the plants, the planter decision, and the hash (§3); also either allow a second-developer model or accept §4.
2. portfolio-manager: a budget line or project for EXP-001 (§1).
3. tools-lead: the craft-only memory read (decision above). Optional, but without it reviewer independence rests on the brief alone.
4. evaluation-steward: commit the design addendum and run order, dispatch through the chief of staff, score after unsealing.
5. analytics steward (`company/experiments/README.md`, process owner): check the Result before anyone reads it as a finding.
