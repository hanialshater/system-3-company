# World M1: amendment rows for R-LEGACY-QV

Owner: qa-tester. Date: 2026-10-28. Board item: W-2178. Registered by: EXP-012 P1.1 and P1.7 (`company/experiments/EXP-012-lessons-world-milestones.md`).

`m1-histories-legacy-qv-2026-10-28.json` holds **13 histories with 31 cases** for the condition head-of-product added in World brief section 10, R-LEGACY-QV. Its checksum is `m1-histories-legacy-qv-2026-10-28.json.sha256`.

## Beside the first table, not in it

- `m1-histories.json` (50 histories, 195 cases), its `.sha256` and `README.md` are untouched. Section 10 says the condition changes no existing row: no history there has a null-`qv` recall followed by a question change.
- The M1 test loads both files. A case in either one that differs makes P1.1 wrong.
- The same freeze applies: committed before the M1 maker's first commit under `src/`; edited after that, it is void. A correction goes in a newer dated file. The maker does not edit it; a row the maker thinks is wrong goes to qa-tester and head-of-product as an objection.

## The ruling, as written

Once engineering's writer proof (3.2 rule 6) exists, a null-`qv` recall counts as the question version current when M1 is released, pinned per lesson in the M1 record. It stops counting once that lesson's question changes after M1. It never counts if the question changed after the record's time but before M1.

## Written from the ruling only

Source: the brief's section 10 and section 3.2, nothing else. No M1 code was read and none exists. A throwaway model written from the same text agreed with every expected state of the 11 single-device histories; the two two-device histories were checked by hand. The model is not committed, so it cannot be copied into the build.

## What the file adds to the vocabulary

`how_to_read` in the JSON gives it in full. In short: `m1_release_at_ms` and the `m1_release` event mark the release; `pre_m1` holds what existed before (records, and question changes with times); `at_release` is what engineering's M1 record must show (`pinned_qv` per lesson, and the lessons whose question changed after their record and before M1).

## What it covers

| Item | Histories |
|---|---|
| Counts while the question is unchanged | `legacy-qv-counts-when-the-question-never-changed`, `legacy-qv-a-later-answer-in-the-new-format-decides`, `legacy-qv-latest-of-two-null-recalls-wins` |
| Condition 1: a change after M1 stops it | `legacy-qv-stops-counting-when-the-question-changes-after-m1`, `legacy-qv-wrong-recall-cues-then-a-later-change-clears-the-cue`, `legacy-qv-pins-are-per-lesson`, `legacy-qv-a-change-before-the-record-does-not-block-it`, `legacy-qv-two-devices-account-row-counts-then-stops` |
| Condition 2: a change between the record and M1 never counts | `legacy-qv-question-changed-between-record-and-m1-never-counts`, `legacy-qv-wrong-recall-before-a-pre-m1-change-gives-no-cue`, `legacy-qv-pins-are-per-lesson`, `legacy-qv-two-devices-account-row-changed-before-m1` |
| Other rules still apply | `legacy-qv-keeps-the-24-hour-gap` (86,399,999 ms and 86,400,000 ms), `legacy-qv-needs-the-writer-proof` |
| Two devices, account rows with null `source` and `qv` | the two `two-devices` histories |

## Readings I chose (head-of-product may overrule; each names the row it changes)

1. A null-`qv` recall made after a question change is not blocked: the change came before the record, not after it. Only `legacy-qv-a-change-before-the-record-does-not-block-it` depends on this.
2. Condition 2 is permanent for the record. Once a question change between the record and M1 stops it counting, it never counts again. Only answers with a source and a version restore the state.
3. The writer proof is checked first and on its own: without it nothing counts, changed or not.

## Not asserted (the ruling is silent)

- Whether a counted legacy account row is rewritten with its pinned version when it syncs. No row asserts a synced record's `qv`.
- A null-`qv` recall that reaches the account from an old client after M1. The ruling speaks of pre-M1 records.

If M1's design needs either one decided, that is a question for head-of-product, and a new dated file follows.
