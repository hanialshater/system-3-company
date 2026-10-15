# Build note: cue-needs-a-boundary

Kept from evaluators until they report.

## Revision v2 (W-608, engines v2, 2026-10-14, demo-builder)

- engine: 2. Content patch r9 batch D block 12 applied as written (company/reviews/lifehacks-200/content-patch-r9-batch-d.md). Engine changes and W-611 choices: company/reviews/lifehacks-200/engines-v2-build-W-608.md.
- Claims now unverified: c1, c2, recall, seen. New: lifehacks.cue-needs-a-boundary.seen (the engine's first reveal sentence). Nothing marked verified.
- **Fallback applied:** the recall family stays (W-610 has not ruled on the files-family move). candidates {a:3, b:1} puts "Answers this cue fits: 3 ; 1" on the stage, but the stage still cannot show recall failing (the patch says so). Format stays single-card.
- Reveal fit 390x844: crop 0 px, hiddenBelow 0 px, namedHidden 0, 47 measured words, phoneFit true (artifacts/reveal-fit/w608-v2*.json).
- QA contract (dev :3530, --timeout=900000 --workers=1): phone and desktop passed (artifacts/qa-w608).

## W-844 seen dispute: NOT applied (2026-10-15, demo-builder)

- The fix 'drop the Match row for recall lessons that declare candidates' needs an engine change. recallColumn in src/lib/lifehacks/engine-v2.ts always returns a result row ['Match', ...] (StudyColumn.result is required), and StudyLessonV2.tsx renders it; there is no per-lesson switch in the spec. So the engine cannot do it per lesson today, and I left the lesson, the engine and the seen claim unchanged.
- Today only this lesson declares candidates (studyCatalog.ts), so a candidates-gated change would touch only it in practice, but it is still a shared-engine change (type, reveal sentence and stage), which needs its own readiness self-check and owner decision. Routes: W-610 (files family, interaction-designer) or an engine change in engine-v2.ts by its owner, then demo-builder.
