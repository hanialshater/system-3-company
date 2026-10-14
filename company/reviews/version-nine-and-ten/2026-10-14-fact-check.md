# Fact check: version-nine-and-ten

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Read via git show origin/codex/lifehacks-200; nothing checked out or run from the PR. Learner-visible text: src/lib/lifehacks/studyCatalog.ts plus the stage component. External hosts are proxy-blocked here (403 on CONNECT), so cited pages were not opened unless stated.

**What I checked.** Plain string sort gives v10, v2, v9; padded v02, v09, v10 (run). The padded-sort core is correct. The statement "many real file browsers already use natural numeric sorting" is an external factual claim with no supporting source: the cited Google Drive search-help page is about search filters. Windows documents StrCmpLogicalW (digits compared as numbers; used for natural ordering of names) but I could not open Microsoft Learn (403), so I could not verify that browsers adopt it.

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Hook, question, keyed option and stipulation match studyCatalog.ts for this slug (re-read); convention only. |
| c2 | unverified | Fixture part verified (v02<v09<v10 versus v10<v2<v9). The sentence "many real file browsers already use natural numeric sorting" has no valid source: Drive search help is off-topic. FIX: cite https://learn.microsoft.com/en-us/windows/win32/api/shlwapi/nf-shlwapi-strcmplogicalw (natural ordering of digit runs) and soften to "some file browsers, such as Windows File Explorer, already sort digit runs numerically" once opened from a connected host. |
| c3 | verified | Result computed in studyModels.ts/StudyLesson.tsx from the visible state; re-run in node where the stage computes a number (see section summary). |
| c4 | unverified | Answer "v09 and v10" verified; the rationale repeats the unsourced "many real file browsers" sentence and cites Drive search help, which does not support it. Same fix as c2. |

Unrecorded learner-visible factual sentences: "Many real file browsers already use natural numeric sorting" is inside c2/c4 but unsourced (see above).

Verdicts apply to meta.json after the merge (machine-readable: company/reviews/lifehacks-200/fact-check-B6.json). Independence: I did not write or edit this lesson.
