# Operational readiness: F-39 agent memory (onboarding, memory, offboarding)

```
change: every role gets a personal memory file (company/roles/memory/<role>.md) read at the start of every run and appended to at the end through tools/memory.mjs; the generated agent template carries both steps; npm run check warns on missing or oversized memory
change-tier: 1 (tools, generated docs, records) + 2 (package.json, one script line: commit c7b9c22)
paths: tools/memory.mjs, tools/org/memory-policy.mjs, tools/org/generate.mjs, tests/memory/memory.test.mjs, .claude/agents/*.md, company/roles/*.md, company/roles/memory/**, package.json, company/ops/changelog.md
author: tools-lead
self-check: tools-lead (the tier-1 part)
approved-by: (tier-2 part: principal-engineer-ops, not yet; the author does not write this line)
board: none written by me (the batch forbids board.json); F-39 slot tools-f39-agent-memory
risks: proposes one (see 7); closes none
links: decision company/decisions/2026-10-16-founder-agent-memory-basics.md (4b1eb81; points 5-6 at 3be6878 and 5555556 on the main line, not on this branch); branch f39-agent-memory
```

Why two tiers: everything but `package.json` is tools outside the gates, generated docs or records (paths.json: `company/**`, `.claude/agents/**` tier 0; `tools/memory.mjs` and `tools/org/**` match no rule, so tier 1). `package.json` is tier 2 by rule (class build), even though the change is one script line and no dependency. It is its own commit (c7b9c22) so it can wait for principal-engineer-ops, or be reverted, without the rest. **Until it is approved, the warning runs only as `node tools/memory.mjs check`; `npm run check` is unchanged on main.** I do not approve my own record.

## What it does

- `tools/org/memory-policy.mjs`: the one policy for every role. Threshold 50 KB (the founder replaced "150 lines or 12 KB" with 50 KB and no line limit, 5555556), target 25 KB after compaction, 12 lines per entry.
- `tools/memory.mjs read | add | compact | check | init` (no dependencies). How the parallel write works is in company/roles/memory/README.md: one O_EXCL file per run, merged under a per-role lock.
- `tools/org/generate.mjs`: the agent template's first step is now "read your onboarding doc, then your memory (testimony, not truth). A dispatch brief does not replace either step." Its last step is the offboarding `add`, and the report names the entry's path. The illustrator stand-in gets the same steps. The onboarding docs get working-agreement item 7 (there was no item 7 before). The generator creates a missing memory file for any new role and never overwrites one. Regenerated: 99 onboarding docs, 98 agents.
- 99 memory files. 98 have a seed of up to 5 dated lines (365 in all), each citing a record on disk that names the role: the latest retros, COEs, rulings, reviews, decisions, the POC map and WBRs. The founder's file has no seed (a human role). Strand managers get their briefs file, their charter line and the WBR context, plus NCM or sign-off lines where a record names them.

## Wiring coverage (what I could and could not wire)
- Wired: all 99 roles in tools/org/roles.mjs (97 agents through the template, the illustrator stand-in through its own text, the founder's file without an agent).
- **Not wired: the Press roles** (`vp-books`, `*-system-3`, `review-*` and the rest of press/org/roles.mjs). They are not in this repo's roles.mjs. They live in the sibling repo /home/user/System3 (`press/org/generate.mjs`, with its own agent template at line ~101), which is outside this worktree and outside my scope. The same three edits apply there: read `press/roles/memory/<id>.md` after onboarding, offboard by `add`, and a check. That repo also needs a memory tool, or it can call this one with `S3_MEMORY_DIR`, but this one validates role ids against this repo's roles.mjs. Owner: vp-books (lane 20, POC map), through chief-of-staff-ceo-office.
- No "sibling roles" exist in roles.mjs here. company/sibling/ holds only the Press snapshot and a founder brief.

## Objections (F-39's table, answered)

| Objection | Raised by | Answer |
|---|---|---|
| Memory files can carry stale beliefs forward (testimony, not truth). | chief-of-staff | **Built in, not closed.** The read step says "testimony, not truth: check a line's cited file before you act on it". `add` refuses a learned, mistake, know or open line that cites no file, W-n or commit. Every line is dated, compaction keeps the dates, and the seed header says open threads are as of the record's date. What stays open: nothing checks that a cited file still says what the line says. Leonie's review (chief-of-staff-ceo-office) is the check F-39 names. |
| Parallel runs of the same role may write the same file at once. | chief-of-staff | **Solved by design and tested.** A run never writes the shared file. `add` creates its own `<role>/<date>-<runkey>.md` with O_EXCL (8 parallel processes with the same run key make 8 files; test 7). Across worktrees, each branch adds a different file, so merges do not conflict. Only `compact` rewrites `<role>.md`: under a per-role lock, by rename, and it deletes only the run files it merged. The remaining risk is that two branches each run `compact` on the same role (an add that crosses the threshold compacts in place). Then the merge conflicts on `<role>.md`, and the integrator keeps both sides, because nothing has been deleted. Hence the rule: `compact` belongs to the integrator on main. |
| Reading memory adds tokens to every run. | chief-of-staff | **Bounded, and to be measured.** Today the 99 files total 223 KB, about 2.3 KB each (≈ 600 tokens a read). The cap is now 50 KB (about 12k tokens) by the founder's later point 5. That is larger than the original "~150 lines", so the worst case is about 4 times what the objection assumed. After compaction a memory is ≤ 25 KB. Measure: the ledger's tokens per run for a role before and after its memory passes 10 KB. That needs the WBR owner (analytics-steward) to add the cut. I have not done it. |
| (points 5-6) One threshold for all, enforced by the tool. | founder | **Done.** One constant (`tools/org/memory-policy.mjs`). Past 50 KB, `read` and `add` compact first; `add --no-compact` refuses with "compact first". `memory.mjs check` warns on any file over the threshold. Tests: just under (no compaction), just over (archive written, ≤ 25 KB, every lesson kept with its citation), refusal, check warns and exits 0. |

## The check (tier 1; the tier-2 line is the same one script line)
1. **What can fail.** (a) An agent skips the steps: the template now states them, but a brief can still tell it otherwise. Nothing detects a run that did not offboard. (b) Run files pile up unmerged if nobody runs `compact`. `read` shows them all, and they count toward the threshold, so at 50 KB the next read compacts anyway. (c) Two branches compact the same role and conflict (see objection 2). (d) A wrong seed line. Each cites its record, and I wrote them from the record lines, but 365 lines by one author are testimony. Only agents see any of this. Learners never do.
2. **How we would know.** `node tools/memory.mjs check` (and `npm run check` once c7b9c22 is approved): missing files and files over the threshold. A pending run-file count is visible in `read`. No meter yet for "runs that did not offboard". A cheap one would be dispatch events whose role has no run file dated that day. That is for hq-engineer or the WBR, and I propose it as a risk (7).
3. **How to roll back.** `git revert c7b9c22` drops the check line. `git revert 09c3ecd` and the seed and record commits drop the rest; the memory files are records, so reverting loses only the seeds. No data outside the repo. No founder needed.
4. **Capacity.** One read per run (≈ 600 tokens today, up to about 12k at the threshold). One small file per run, 1 KB or less, in git. `check` reads 99 files in about 0.1 s. `npm run test:memory`: 7 tests, about 4 s. No server, no build, no CI minutes beyond the check.
5. **Security.** No route, no network. Role ids are validated against roles.mjs, run keys are slugged (`[a-z0-9-]`, 60 chars), so `add` cannot write outside `company/roles/memory/`. Memory text is data. An injected instruction in a memory line is still only testimony, and the read step says so.
6. **Data.** Writes company/roles/memory/** only: role names, file paths, short notes. No learner data.
7. **Risks.** Proposed for principal-engineer-ops (who writes the register): "Agents skip onboarding or offboarding and nothing detects it" (likelihood 3, impact 2, owner tools-lead, mechanism: none yet). It closes when a meter compares dispatches with offboarding entries.

## Tested (worktree /home/user/s3c-mem, branch f39-agent-memory)
- `node --test tests/memory/*.test.mjs`: 7 pass, 0 fail.
- `npm run check`: passed, 969 lessons, 99 roles, 5 warnings (lifehacks disputed claims, not from this change), then `memory: 99 role memory file(s) within 50 KB`.
- `npx tsc --noEmit`: exit 0 (with node_modules linked from the main checkout for the run; this worktree has none of its own, and the link was removed and never committed).
- `node tools/org/generate.mjs`: 99 onboarding docs, 98 agents. A second run changes nothing.
