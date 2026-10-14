# Fact check: size-is-not-recency

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Read via git show origin/codex/lifehacks-200; nothing checked out or run from the PR. Learner-visible text: src/lib/lifehacks/studyCatalog.ts plus the stage component. External hosts are proxy-blocked here (403 on CONNECT), so cited pages were not opened unless stated.

**What I checked.** Items movie "90MB d1", notes "2MB d9", slides "8MB d5". Sort by size gives movie, slides, notes; sort by day (descending) gives notes, slides, movie (run). The correct answer "Modified day" for the latest file only holds if a larger day number means later, but nowhere in the learner-visible text is that stated: "d1" could be read as "1 day ago", which would make the movie the latest file. The recall answer depends on this unrecorded convention.

| Claim | Verdict | Note |
|---|---|---|
| c1 | disputed | The prediction asks for the latest file and keys "Modified day" as correct, but the day-number direction is not stated anywhere the learner sees (caption on the sort stage is just "Exercise records"; rows read "90MB d1"). FIX (builder): state the convention in the stage caption or row text, e.g. caption "d = day modified; higher = more recent", or render rows as "day 9 (latest)". Then re-verify. |
| c2 | verified | Principle and keyed answer re-derived from the fixture and rules in studyModels.ts (node run); sentence matches the learner-visible reveal. |
| c3 | verified | Result computed in studyModels.ts/StudyLesson.tsx from the visible state; re-run in node where the stage computes a number (see section summary). |
| c4 | disputed | Same dependency as c1: the keyed answer "Modified day" needs the stated convention that a higher day number is later. FIX as c1. SOURCE-FIX: Drive search help is also off-topic for this claim. |

Unrecorded learner-visible factual sentences: The day-number direction ("higher d = later") is a learner-needed convention with no claim and no visible statement.

Verdicts apply to meta.json after the merge (machine-readable: company/reviews/lifehacks-200/fact-check-B6.json). Independence: I did not write or edit this lesson.
