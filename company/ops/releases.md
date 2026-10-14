# Release log

owner: release-manager

Only the release manager adds or edits entries in `company/ops/releases.json`: on every production
deploy, and when a deploy is rolled back. Everyone else reads it, at `/hq/releases` (HQ, dev and
`HQ_PUBLIC=1` only) or in the file.

backfill: the first five entries (2026.10.14.1 to .5) were drafted by hq-engineer from `git log --grep='\[deploy\]'`,
the commit ranges between releases, `company/ops/progress.md` and the launch-review records. They are
to be confirmed by release-manager. There are no files in `company/ops/deployments/` yet, so nothing
there backed them. Text marked "(inferred)" is a guess from commit messages, not a record.

## Version scheme

Calendar versioning: `YYYY.MM.DD.n`. The date is the UTC date of the release commit; `n` counts
production releases made that UTC day, starting at 1 (`2026.10.14.1`, `2026.10.14.2`, ...).
A version names a deploy, not a code change: a redeploy of the same content (for example after Vercel
skipped a build) is a new release and says so in its summary.

## The file

`company/ops/releases.json` is `{ owner, scheme, releases: [...] }`, **append-only, oldest first**. The page
shows newest first. Each entry:

| Field | Meaning |
|---|---|
| `version` | `YYYY.MM.DD.n`; its date part must equal `date`'s UTC day |
| `date` | UTC ISO timestamp of the release commit, ending in `Z` |
| `commit` | the full 40-character hash of the `[deploy]` commit |
| `target` | `production` |
| `approved_by` | `{ who, record }`: the founder, and a pointer to the record (progress.md entry, commit message, inbox item) |
| `summary` | one line |
| `added.features` | app, HQ, kit and infrastructure changes since the previous release |
| `added.lessons.published` / `.in_review` | `{ count, slugs }` for lessons whose status became `published` or `review` (newly on the feed) |
| `added.fixes` | fixes |
| `added.known_issues` | known issues and holds (what did not ship, what is unverified) |
| `backfill` | only on drafted entries awaiting confirmation |

`npm run test:hq` validates the file (shape, order, unique versions, full hashes, counts equal slugs).

## Adding an entry on each deploy

1. After the founder-approved `[deploy]` commit, run `node tools/release-draft.mjs --commit=<sha>` (the previous release is the last entry). It prints a draft and writes nothing: features are the commit subjects since the last release, lessons come from `status` changes in `meta.json`.
2. Edit the draft: keep only app/HQ/kit changes under features, write the summary, fill `approved_by` (the founder, with the record), list fixes and known issues. Say what is inferred.
3. Append it to `releases.json` (end of the list), run `npm run test:hq`, and commit it with the deploy record.
4. On a rollback, add a new entry (new version) saying which version was rolled back; do not edit old entries except to correct a mistake, and say so.

"Next release (unreleased)" on the page is computed from `git log <last release commit>..HEAD`; it needs no upkeep.
