# Fact-check: size-is-not-recency (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read the lesson Demo.tsx (thin wrapper) and the shared engine first (src/components/lifehacks/StudyLesson.tsx: Stage / FileStage, both buttons, faded non-matching rows, result count, observation() used by the reveal; src/lib/lifehacks/studyModels.ts fileResult / reconstructionMatches; the fixture in src/lib/lifehacks/studyCatalog.ts), then meta.json claims and the recall card (src/components/Feed.tsx), then source fields. No Reset or animation on this path. Google Help pages (support.google.com) are unreachable from this sandbox, so no claim below is verified on them.

| Claim | Verdict | Basis |
|---|---|---|
| recall | verified | Convention and logic: size and name fields are not modification timestamps, so sorting by them need not put the last-changed file first; the fixture shows it: by size movie (90MB, d1), slides, notes; by day notes (d9), slides, movie (own node, same as fileResult "sort"). The keyed option (index 2, "Date modified, newest first") is the only field that records change time. |

**Result:** the one open claim verified. No disputes.
