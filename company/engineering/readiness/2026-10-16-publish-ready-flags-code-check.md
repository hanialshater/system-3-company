# Code check: tools r5 B4, publish-ready flags (W-1319), 2026-10-16

reader: principal-engineer (CEO office), lane 7 (the item's checked-by)
subject: branch tools-r5-b4 at 9efa9d4, read in a scratch detached worktree (removed after)
record: company/engineering/readiness/2026-10-16-publish-ready-flags.md (on the branch)
tier: 1 (tools/publish-ready.mjs is not a protected path; no gate logic touched). This is a code check, not an engineering review.

## Verdict

**Merge.** Confidence: high.

## What I checked

1. **Tests.** `npm run test:publish` at 9efa9d4: 13 pass, 0 fail.
2. **Unknown flags refused before any read.** `parseArgs` runs first in `main()`; any argument outside
   `--link --publish --help -h` (typos, positionals, `--publish=yes`) prints usage to stderr and exits 2 before ROOT
   is resolved or a file is opened. `--bogus` gave exit 2 by hand.
3. **Candidate list unchanged.** Old (9efa9d4~1) and new tool, each run on its own scratch copy of `src/`,
   `company/reviews/` and `publish-holds.json`:
   - against the real tree: identical holds and candidates (0 candidates, 0 unlinked); only line 1 differs.
   - against a harder fixture (every `simulatedLearner` emptied, 3 lessons set to `review` with a fresh
     `Verdict: launch` on their current version): identical output after line 1, 3 candidates on both, 1751
     unlinked files reported. The decision reads `company/reviews/<slug>/`, never `meta.evidence`, so this is expected.
4. **Plain run is read-only.** On that fixture the new plain run left `src/` byte-identical (diff -r against the
   unrun copy). `--link` then produced exactly the writes the old default run made (diff -r equal).
5. **`--publish` links before it publishes.** Linking happens in the scan loop; `company publish` is spawned only
   after the loop. With a stub `tools/company.mjs` that reads the lesson's meta.json at publish time, every
   candidate had a non-empty `simulatedLearner` (2, 3, 3) when "published". The real gate's need is met.

## Notes (none block)

- `meta.evidence.simulatedLearner = ...` on `--link` would throw if a meta.json had no `evidence` object. The old
  code had the same behaviour, and no lesson today lacks `evidence` (checked: 0). Not a regression.
- The record's ask stands: company/ops/chief-of-staff-checklist.md step 2 should say `--link`. Owner: chief-of-staff.
