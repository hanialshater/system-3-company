# Operational readiness: publish-ready flags (W-1319)

change: tools/publish-ready.mjs knows every flag (--link, --publish, --help, -h); --help prints usage and exits 0, anything else prints usage and exits 2 before any file is read; meta.json is written only on --link or --publish
change-tier: 1
paths: tools/publish-ready.mjs, tests/publish/publish-ready-flags.test.mjs, company/ops/changelog.md
author: tools-lead
self-check: tools-lead
board: W-1319
risks: none
links: batch company/ops/dispatch-requests/2026-10-16-r5-tools.md#B4; branch tools-r5-b4

## What happened

The tool read `process.argv.includes("--publish")` and ignored every other argument, so `--help`, a typo or a plain list run all did the default: link learner-review files into `meta.evidence.simulatedLearner` and rewrite meta.json. Head-of-product's r5 list-only run (company/ops/dispatch-requests/2026-10-16-r5-product.md, objection 2) wrote one r14 path into each of 8 Life Hacks meta.json files; the chief of staff kept them in **1e04f17** ("Life Hacks evidence: link r14 learner reviews in 8 meta.json files"). The board title says `--help`; the record says a plain run. Both took the same path.

## Decision: the list-only run writes nothing (in scope, my call)

The brief says writes happen only on the explicit write flag the tool already has. `--publish` is that flag, and the plain run is documented as "list candidates" and used as a read by reviewers (head-of-product B1's brief treats it as a read). So the plain run is now read-only and prints `N review file(s) not yet linked as evidence (read-only run; --link writes them)`. Linking still happens:
- on `--publish`, first, in the same pass, as before. The `company publish` gate needs a non-empty `simulatedLearner`, and it still gets it, so **no publish behaviour changes**.
- on the new `--link`, for linking without publishing (what step 2 of the CoS checklist relied on).

Which lessons are listed does not change (W-1049 is untouched): the candidate decision reads review files from `company/reviews/<slug>/`, never `meta.evidence`. Checked: old and new tool on a scratch copy of src/, company/reviews and publish-holds.json print identical holds and candidates (only the first line differs).

## Self-check

1. **What can fail.** A caller who relied on the plain run to link evidence for lessons not yet ready stops getting links. Who sees it: agents only (status coverage, evidence lists). Worst: none for learners; publish still links first.
2. **How we would know.** The plain run prints the count of unlinked files on its first line.
3. **Roll back.** `git revert <sha>`, seconds, no data loss.
4. **Capacity.** None.
5. **Security.** None.
6. **Data.** Writes less: meta.json only on --link/--publish. No learner data.
7. **Risks.** None added or closed.

## Asks

- chief-of-staff: company/ops/chief-of-staff-checklist.md step 2 says the plain run "links learner reviews as evidence". That is no longer true: the plain run is read-only. Step 2 should read `node tools/publish-ready.mjs --link` if the links are wanted without publishing (step 3, `--publish`, still links first). The checklist is yours to edit.
