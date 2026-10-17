# EXP-002 predictions (must be complete and committed before session 1)

owner: chief-of-staff (P-list extraction; any role except analytics-steward) · analytics-steward (gate) · date opened: 2026-10-17
run kit: company/experiments/EXP-002-run-kit.md

**Gate.** No session may start until both lines below are filled in and committed. A participant file whose
`predictions commit:` is blank, or names a commit later than the session's date, is excluded from the
borrowed-mind measure (the analytics steward will refuse to report it: company/roles/analytics-steward.md, Authority).

predictions complete: (blank: not yet)
predictions commit: (blank: the hash of the commit that filled this file)

## P-list: borrowed-mind confusion predictions (pooled, shuffled, unlabelled)

How to fill it (chief of staff, or a dispatched role that is not analytics-steward, which does the matching):

1. For each of the five lessons in the run kit, open every file in its meta.json `evidence.simulatedLearner`
   at today's commit. Copy **verbatim** every item under "Where understanding first broke" and every numbered
   item under "Problems". Do not paraphrase, merge or add.
2. Give each item an id `P-01`, `P-02`, … in a **random** order across all five lessons (shuffle, for example
   `node -e` with Math.random over the list). Remove the lesson name and slug from the item text; leave every other
   word.
3. Write the pooled list below. Write the key (P-id → slug, review file) in **`predictions-key.md` beside this
   file, in the same commit**, under a heading saying the matcher must not open it before the match is filed.
   (The key is on disk because the disk is the memory; blindness is by procedure, not by hiding the file.)
4. Fill the two lines at the top and commit.

| P-id | Predicted confusion (verbatim, lesson name removed) |
|---|---|
| (not yet written) | |

## Steward's committed predictions

The primary predictions are in company/experiments/EXP-002-real-learner-recall.md (§ Committed prediction,
2026-10-12). The predictions for the two added measures (unaided explanation, transfer) are in the run kit
(§ Committed prediction (Amendment A)), committed 2026-10-17 before any session. Nothing here may be edited once
session 1 has happened; a correction is a new dated line below that names what it corrects.
