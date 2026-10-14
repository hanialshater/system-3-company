# Decision: usage plan upgraded from 5× to 20×; concurrency caps raised

owner: chief-of-staff · date: 2026-10-14 · status: accepted (founder: "I upgraded from 5x to 20x, we have more usage limit")

## Context
Usage limits stopped every running agent three times on 2026-10-13. The founder inbox item F-02 (usage budget and split) was open. The founder has now upgraded the plan from 5× to 20×.

## Decision
- **Concurrency:** up to **30 agents** at once. That was about 8. Up to **10 on the inherited (Opus) model**, which was 3. Builders and revision builders default to Sonnet. Reviewers, fact-checkers, designers, leads and R&D use the inherited model.
- **Split, until the founder sets a different one:** about 40% review, fact-check, QA and publishing; 40% building and revising lessons; 20% teams (R&D, design, tools, backend).
- **If usage limits still bite:** resume stopped agents from their transcripts. Drop to 15 at once and record it in the next WBR.

## Objections
- *More parallel agents mean more merge conflicts and more chances of a stale build.* Answer: every builder works in its own worktree. Merges follow the checklist, including the published-lesson check. Review servers are rebuilt after each merge round.

## Would be wrong if
The stop rate (`node tools/ops-health.mjs`) goes above 20%, or merge or QA incidents rise in the next ops review.
