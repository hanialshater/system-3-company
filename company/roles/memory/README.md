# Role memory (F-39)

owner: tools-lead (the mechanism) · each `<role>.md`: that role · decision: [F-39](../../decisions/2026-10-16-founder-agent-memory-basics.md) · readiness: [2026-10-16-f39-agent-memory](../../engineering/readiness/2026-10-16-f39-agent-memory.md)

Every role has one memory file here, `<role>.md`: lessons, mistakes not to repeat, standing context, open threads, then dated entries. It is testimony, not truth. It never holds claims or verdicts; those stay in records.

| Step | Who | How |
|---|---|---|
| Onboard | every run, first | read `company/roles/<role>.md`, then `node tools/memory.mjs read <role>` (the memory plus run entries not yet merged) |
| Offboard | every run, last | `node tools/memory.mjs add <role> --run=<runkey> --did="…" --learned="… (file)" --know="… (file)" --open="… (file)"` (at most 12 lines; learned, mistake, know and open lines must cite a file, W-n or a commit) |
| Merge | the integrator on main (chief of staff), or any run of a single-instance role | `node tools/memory.mjs compact <role>` or `compact --all` |
| Check | `npm run check` | `node tools/memory.mjs check`: warnings only (missing file, over the threshold) |

**Parallel runs never write the same file.** `add` creates `<role>/<date>-<runkey>.md` with O_EXCL (`-2`, `-3` … on a clash), so 8 builders of one role leave 8 files and no lost entry, in one checkout or across worktrees (each branch adds a different file, so merges do not conflict). `compact` takes a per-role lock (`<role>/.lock`, stale after 10 min), appends the run files to Entries in name order, writes the memory with a rename, and only then deletes the run files it merged. A run file whose heading is already in the memory is not added twice.

**Threshold (one for every role, `tools/org/memory-policy.mjs`):** 50 KB, counting unmerged run files. Past it, `read` and `add` compact first (`add --no-compact` refuses with "compact first"). Compaction archives the oldest entries until the memory is at or under 25 KB, and lifts each archived entry's `learned:`, `mistake:`, `know:` and `open:` lines, dated and with their citations, into the four kept sections. Narrative (`did:`), closed items (`[closed]`, struck through, or an open thread named by a later `closed:` line) go to `<role>.archive-<date>.md` here. Nothing is deleted. If the kept sections alone are over 25 KB, the tool says so and the role's next holder merges lessons by hand.
