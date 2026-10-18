# Reviewer memory boundary: evaluators read craft at start, and prior verdicts only after their own findings

owner: evaluation-steward · date: 2026-10-17 · status: **proposed** · class: evaluator independence (steward ruling, interpreting protected rule 1 of `company/reviews/README.md`; codifying it in that file needs an amendment) · route: external assessment §2 "context-independence tension" (`company/reviews/org/2026-10-17-external-assessment.md`, lines 300-314: "evaluation-steward decides the reviewer-context boundary") → tools-lead builds the reader → chief of staff puts it in evaluator briefs → steward audits

## The tension

F-39 (`company/decisions/2026-10-16-founder-agent-memory-basics.md`) tells every agent to read its role memory first.
The independence rules (`company/reviews/README.md` rule 1, artifact before account) and the pattern
`company/knowledge/patterns/fresh-checker-for-drafted-wording.md` ("a new instance, with no memory of the draft") require
an evaluator to meet the artifact without the earlier account. Role memory is shared by every run of a role. So a "fresh"
fact-checker that reads `fact-checker` memory first can read that a previous run disputed the very claim it is about to
check.

That is not hypothetical. At `c31c1fab`, the run entries of the five evaluator roles hold 281 did/learned/know/open lines.
24 of them name a lesson slug together with an outcome word (verdict, revise, launch, verified, disputed, held, pass, fail,
withdrawn). By role: fact-checker 14 of 104, learner-evaluator 4 of 51, qa-tester 4 of 103, accessibility-reviewer 2 of 23,
pedagogy-critic 0 of 0. One example is `company/roles/memory/fact-checker/2026-10-16-88f0-lhfix-r3.md`: "batch-by-setup
c1/c2 disputed, waiting on cm-lifehacks wording". I counted these with a slug-and-keyword match, and I did not read every
line by hand.

## Proposed ruling

1. **Who.** fact-checker, learner-evaluator, qa-tester, pedagogy-critic and accessibility-reviewer, whenever they review a
   lesson (a "review run"). Other runs of these roles, such as tooling, audits or pattern work, read memory as F-39 says.
2. **At start, craft only.** A review run reads its role memory in the craft-only form (mechanism below). That form
   keeps procedural craft: how to run the walkthrough, harness pitfalls, verdict vocabulary, source-handling habits,
   mistakes not to repeat. It leaves out every line that names a lesson or a lesson's review folder, and every `did:` line.
3. **Prior verdicts wait.** The run does not read, for the lesson under review, any earlier verdict, finding or builder
   account until its own findings are **written to disk**. That covers the full role memory, other review records in
   `company/reviews/<slug>/`, `build.md`, the board, and dispatch history. Once they are written, it may read
   everything, and it labels what follows "After reading prior records". This extends rule 1's "After reading the brief"
   from the builder's account to the company's own earlier verdicts.
4. **Offboarding is unchanged.** F-39's entry is still written, and it may name the lesson. The filter is on reading, not
   writing, so memory keeps its value for non-review runs and for the steward's audits.
5. **What it does not do.** It does not make two runs of the same model independent witnesses. That is EXP-001
   condition C (`company/experiments/EXP-001-planted-false-claim.md`). It does not stop an agent from opening a file it
   was told not to open. The receipts below make that visible after the fact; they do not prevent it.

## Mechanism (tools-lead builds; ordinary surface)

- **`node tools/memory.mjs read <role> --craft-only[=<slug>]`.** It prints the four kept sections (Lessons, Mistakes not to
  repeat, Standing context, Open threads) and the unmerged run entries, with these filtered out:
  - every `did:` line;
  - every line that contains any slug under `src/demos/*/` or any path `company/reviews/<slug>/`;
  - with `=<slug>`, also any line that names the lesson's title (from its `meta.json`) or one of its claim ids. This
    catches a lesson mentioned without its slug.
  - A footer gives the counts kept and dropped, and the sha256 of the full memory it filtered (the "memory revision").
  - Compaction runs first, as in `read`. `--craft-only` never writes the memory.
- **A read receipt.** Every `read` appends one event through the existing spool (`tools/lib/events-spool.mjs`):
  `{ type: "memory-read", role, run, mode: "full" | "craft-only", slug, revision, ts }`. `--run=<runkey>` is optional on
  `read` and required with `--craft-only`, so that the receipt and the offboarding entry share one run id (the assessment's
  "record the memory revision read and the offboarding path under the same run id").
- **Generated prompts.** `tools/org` generates `.claude/agents/<role>.md` and the onboarding "read your memory" line. For the
  five roles it says: for a review run, `read <role> --craft-only=<slug> --run=<runkey>`; full `read` only after the
  findings file exists. That generator change belongs to tools-lead, and `.claude/agents/` is not a protected path.
- **The record header.** A review record names `memory: craft-only <revision>` on its first lines, next to the `built from`
  it already names.
- **Tests (tests/memory/).**
  - A planted entry `- open: zz-fixture-slug verdict revise (company/reviews/zz-fixture-slug/x.md)` in a fixture role is
    absent from `--craft-only` output and present in `read`.
  - A craft line with no slug survives.
  - `--craft-only` without `--run` exits 2.
  - The receipt is written exactly once per read.
  - `did:` lines never appear.

## What would prove it is used

1. **Receipts per review record.** For every learner, fact-check, QA, pairwise and a11y record committed after the
   tool ships, there is a `memory-read` event with `mode: craft-only` and the same run id. Any `mode: full` event for that
   run has a timestamp after the findings file's first commit. Target: 100% of dispatched review runs within 7 days of the
   brief change. The steward samples 10 records at each constitutional review and counts them.
2. **The header line.** The record's `memory: craft-only <revision>` equals the receipt's revision.
3. **A leak canary.** Once per cycle, the steward's audit plants a fixture line naming a lesson that is in review and
   gives it a false verdict, for example "verdict fatal: reveal contradicts c3". Within a cycle, no review record of that
   lesson may repeat the planted finding. A record that repeats it shows the boundary leaked (a COE). This canary is
   different from EXP-001: it tests memory leakage, not claim checking.
- would_be_wrong_if: receipts show craft-only reads, yet review records keep echoing earlier verdicts at the same rate as
  before. Then the leak runs through another channel, such as briefs, the board or review folders, and the brief rules
  matter more than memory. Or: the craft-only form drops so much that evaluators repeat mistakes the memory recorded. Then
  the slug filter is too blunt and the role needs a "craft" section of its own, written without slugs.

## Until the tool exists (interim, procedural, weaker)

Evaluator briefs say: "Run `node tools/memory.mjs read <role>`. Read only the Lessons, Mistakes and Standing context
sections until your findings file is written. Skip Unmerged run entries until then. In your record, write
`memory: sections read before findings: <list>`." The reader still prints the run entries, so this rests on compliance.
It is labelled as interim in every brief.

## Objections (recorded with the proposal; answered at ratification)

| # | Objection | Current answer |
|---|---|---|
| R1 | A slug filter drops craft that is attached to an example lesson (e.g. "drag-only sliders fail R4; see knot QA"). | Accepted cost. A craft lesson worth keeping should be restated without the slug. The would_be_wrong_if above tests whether the cost is real. |
| R2 | The steward decides this boundary and also audits evaluator independence (fresh-checker pattern known_failure 3). | Status stays proposed until head-of-product or the constitutional review board accepts it. The steward does not self-ratify. |
| R3 | An agent with Bash can still `cat` the memory file. | True. The receipt and header make a full read before findings visible after the fact. Prevention would need per-role filesystem capabilities (assessment §1 finding 5), which is out of scope here. |

## Next steps (board items requested, not created: the board is chief-of-staff-only)

- tools-lead: `memory.mjs read --craft-only[=<slug>] --run=` plus the receipt and tests; the generator change for the five roles.
- chief of staff: put the interim line in evaluator briefs now.
- evaluation-steward: first receipt audit, and the leak canary, one cycle after the tool ships. Then an amendment to
  `company/reviews/README.md` (rule 1) if the receipts hold.
