# Fact check: spaced-beats-cram

## Pass LH-1 (pre-merge, read-only)

Checker: fact-checker (Ingrid). Date: 2026-10-14. Read via git show origin/codex/lifehacks-200; nothing checked out or run from the PR. Learner-visible text: src/lib/lifehacks/studyCatalog.ts plus the stage component. External hosts are proxy-blocked here (403 on CONNECT), so cited pages were not opened unless stated.

**What I checked.** Curves are cram=exp(-day/7), spaced=exp(-day/18): day 1 87% vs 95%, day 30 1% vs 19%, day 0 both 100% (run); the stage labels them illustrative and the reveal states they are chosen constants. Cepeda et al. 2006, Psych Bull 132(3), 354-380: 839 assessments, 317 experiments, 184 articles, confirmed from several indexed copies of the abstract (PubMed/USF/York snippets); the PubMed URL itself is proxy-blocked. Rawson & Kintsch 2005 (JEP 97(1) 70-80): ERIC page unreachable; the immediate-test/delayed-test reversal is confirmed by a peer-reviewed secondary account (Greving & Richter 2019, PMC6333692). Roediger & Karpicke 2006 abstract confirmed via search record. Advisory: the "Next morning" marker shows spaced ahead (95% vs 87%) which the lesson itself says is not established (c5); it is labelled illustrative, so no dispute.

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Hook, question, keyed option and stipulation match studyCatalog.ts for this slug (re-read); convention only. |
| c2 | verified | "Research on verbal recall supports distributed practice" matches Cepeda et al. 2006 (meta-analysis, 839 assessments/317 experiments). Curves are disclaimed as illustrative. Source host unreachable; abstract confirmed via multiple search-indexed copies, not the cited URL. |
| c3 | verified | Result computed in studyModels.ts/StudyLesson.tsx from the visible state; re-run in node where the stage computes a number (see section summary). |
| c4 | verified | Answer "Distributed sessions" and its rationale match c2. |
| c5 | verified | Massed rereading better on an immediate test, distributed better on a 2-day delayed test: confirmed via secondary peer-reviewed summary (Greving & Richter 2019); cited ERIC EJ688037 page unreachable (403), so the primary abstract was not opened. |

Unrecorded learner-visible factual sentences: None found beyond the hook and title, which restate the prediction scenario recorded in c1.

Verdicts apply to meta.json after the merge (machine-readable: company/reviews/lifehacks-200/fact-check-B6.json). Independence: I did not write or edit this lesson.
