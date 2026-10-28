# World M1: QA's table of learner histories

Owner: qa-tester. Date: 2026-10-28. Registered by: EXP-010 P1.1 and P1.2 (`company/experiments/EXP-010-lessons-world-milestones.md`).

`m1-histories.json` holds **50 learner histories with 195 cases**. A case is one step of a history plus the state the World must show after it. The state, qualifying-recall and suggested-next functions must agree with every case. One differing case makes P1.1 wrong.

## Where it comes from

Only the brief (`company/product/2026-10-28-world-brief.md`, sections 3 and 5), EXP-010, and EDD-018 section 3 and Addendum A. No M1 code was read, and none exists. The expected answers are the brief's rules applied by hand. A throwaway reference model written from the same rules agreed with all of them, and it is not committed, so it cannot be copied into the build.

## Frozen

- Committed before the M1 maker's first commit under `src/`. `m1-histories.json.sha256` pins the file.
- Edited after that commit, the table is void (EXP-010 P1.1). A correction goes in a new file with a dated amendment.
- The maker does not edit this table or the checksum. A row the maker thinks is wrong goes to qa-tester and head-of-product as an objection. It is never fixed in place.

## What it covers

`coverage_index` in the JSON maps each item to its histories.

| Required item | Histories |
|---|---|
| 3.2 rules 1 to 6 | source 6, gap 8, version 3, answered 1, no double credit 4, old records 4 |
| 86,399,999 ms and 86,400,000 ms (P1.2) | `gap-one-ms-short`, `gap-exact`, plus the same pair on a DST clock change, on wrong answers and on seal opening |
| practice never yields Understood | `practice-never-yields-understood`, `practice-answer-cannot-clear-a-wrong-cue` |
| an old question version never counts | `old-question-version-never-counts`, `version-change-drops-understood-to-explored` |
| wrong answer returns to Explored, history kept | `wrong-answer-sends-back-to-explored`, `wrong-first-then-correct`, `two-devices-later-wrong-wins` |
| time alone never lowers a state | `time-alone-never-lowers-a-state` (400 days) |
| Unknown shows no state and no count (P1.4) | five histories: blocked, unreadable, ownership settling, lost readability, account switch |
| account synced across two devices (P1.5) | six histories, with `source` and `qv` checked on the receiving device |
| pre-M1 record, null source and qv (P1.7) | `pre-m1-records-*` and `two-devices-account-rows-without-source` |
| each 3.4 branch | explicit choice, due revisit, first unexplored, open seal attempt, optional practice |

## Rulings needed before the build

Five lines of the brief and the EDD can be read two ways. The table picks one reading and says so in `rulings_needed`. head-of-product should rule on each before the maker starts. A ruling that differs from the table means a new file, written before the maker starts.

1. **R-LEGACY-QV.** Does a pre-M1 recall with a null `qv` match the current question version when engineering's proof exists?
2. **R-MERGE-FIRST.** After a sync, is the first reveal the earliest across devices?
3. **R-EXPLORED-INCLUDES-UNDERSTOOD.** Does "every lesson Explored" for a seal include Understood lessons?
4. **R-SEAL-DUE.** EDD-018 section 3 requires the sampled questions to be due for a seal. Brief 3.3 does not. With the EDD's condition, a due lesson wins branch 2 of 3.4 and branch 4 is never reached. The table follows the brief.
5. **R-SEAL-UNCHECKED.** Founder decision F2 lets seals appear on unchecked islands. No M1 case depends on an island being checked. M3's table must say.

## Running it

The file is data. Whoever writes the M1 test (the maker, in `tests/world/`) loads the histories, applies each step in order, and compares each step's `expect`. The `how_to_read` block in the JSON gives the event vocabulary. Times are real elapsed milliseconds from each history's `t0`.
