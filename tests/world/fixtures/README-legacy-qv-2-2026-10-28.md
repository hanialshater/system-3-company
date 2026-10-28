# World M1: second amendment for R-LEGACY-QV (brief section 10a, rulings 4 and 5)

Owner: qa-tester. Date: 2026-10-28. Board item: W-2179. Registered by: EXP-012 P1.1 and P1.7.

`m1-histories-legacy-qv-2-2026-10-28.json` holds **8 histories with 28 cases**. Its checksum is `m1-histories-legacy-qv-2-2026-10-28.json.sha256`. It sits beside `m1-histories.json` and `m1-histories-legacy-qv-2026-10-28.json`, which are untouched; section 10a overrules no row in either. The M1 test loads all three files. The freeze terms are the same: edited after the maker's first commit under `src/`, it is void.

## The rulings, as written in 10a

- **4.** A counted legacy account row is not rewritten with its pinned version on sync. Stored rows, the browser's store and the export keep `source` and `qv` null. The pin is applied only when the state is derived.
- **5.** "Pre-M1" is read from the record's `at`, not its arrival. A null-source, null-`qv` record with `at` at or after M1's release time is no evidence: it makes nothing Understood and sets no cue, and it is still kept and synced. A record dated before release follows the legacy rule even if it syncs later.

Written from section 10a and 3.2 only; no M1 code exists. I checked the expected states by hand against the rulings.

## What the file adds

`how_to_read` in the JSON defines two new `expect` keys, `stored_records` and `export` (per device, the recall rows kept, with `source` and `qv` shown), and says how a late-arriving record (`at_ms` before `now_ms`) and a device-held record behave.

## Coverage

| Item | Histories |
|---|---|
| Ruling 4, not rewritten (stores, export, after a question change, beside a new answer) | `legacy-qv-counted-account-row-is-not-rewritten-on-sync`, `legacy-qv-counted-row-stays-null-beside-a-new-answer`, `legacy-qv-record-at-release-is-kept-and-synced`, `legacy-qv-pre-release-record-syncing-late-follows-the-legacy-rule` |
| Ruling 5, release minus 1 ms (correct gives Understood, wrong gives the cue) | `legacy-qv-record-one-ms-before-release-arriving-later-follows-the-legacy-rule`, `legacy-qv-pre-release-record-syncing-late-follows-the-legacy-rule` |
| Ruling 5, at release (no evidence, wrong sets no cue) | `legacy-qv-record-at-release-arriving-later-is-no-evidence`, `legacy-qv-record-at-release-does-not-disturb-an-earlier-counted-one`, `legacy-qv-record-at-release-is-kept-and-synced` |
| Ruling 5 with ruling 2: a late record is judged by its own time | `legacy-qv-late-record-is-judged-by-its-own-time-for-condition-2` |

## Readings I chose

1. The last row combines ruling 5 with 10a ruling 2. A record made before a pre-M1 question change never counts, even if it arrives after M1. If head-of-product reads this differently, only that row changes.
2. Reveals are not covered by ruling 5. Every reveal here is dated before release.
