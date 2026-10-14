# Fact-check: keep-the-error-feedback (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read the lesson Demo.tsx (thin wrapper) and the shared engine first (src/components/lifehacks/StudyLesson.tsx: Stage / FileStage, both buttons, faded non-matching rows, result count, observation() used by the reveal; src/lib/lifehacks/studyModels.ts fileResult / reconstructionMatches; the fixture in src/lib/lifehacks/studyCatalog.ts), then meta.json claims and the recall card (src/components/Feed.tsx), then source fields. No Reset or animation on this path. Google Help pages (support.google.com) are unreachable from this sandbox, so no claim below is verified on them.

| Claim | Verdict | Basis |
|---|---|---|
| recall | verified | Convention and logic: an attempt count or a bare "wrong" carries no position information, while a side-by-side comparison marks each position; the stage does exactly this (reconstructionMatches gives a per-position true/false and each attempt box turns green or red after Check). The keyed option (index 1) is the only one that locates the error. No empirical learning claim is made. |

**Result:** the one open claim verified. No disputes.
