# Courses (category management)

owner: courses-lead (Amara) · since 2026-10-14 · decision: company/decisions/2026-10-14-courses-org.md

A **course** is a curriculum someone else wrote (a book, a university course) that we cover with 60-second demos. A subject category asks "what is worth teaching in physics?". A course asks "which ideas in this book can a learner predict and then see, in its order?".

## How a course works
1. **Adopt.** The work goes into `content/works.json` with its chapters. The head of courses names a course manager (`cm-course-<id>`).
2. **Acquire and map.** The course manager reads the work, using it as a map only, and writes `content/courses/<id>/chapters.json`. That file lists every section with its concepts, marks each `demoable: true|false` with a reason, and records the covering lessons (existing, briefed or built). The rule for what can have a demo: a learner can make a prediction that the stage can then show, in 60 seconds, with a checkable answer. Pure definitions, history and surveys usually can't.
3. **Dedupe.** `node tools/meta.mjs coverage --work=<work>`, the subject briefs files and `node tools/overlap.mjs`. Prefer adding a `curriculum.references` row to an existing lesson over a new lesson.
4. **Brief** the gaps in `company/courses/<id>/briefs.md`, in the standard brief shape (concept, misconception, prediction, a node-checked answer, a format from company/design/formats.md, and curriculum primary, also and references). Each concept goes into the owning subject's curriculum map with `course: <id>`.
5. **Build and verify** through the normal pipeline: interaction designer (non-default formats), builder, fact-checker, learner review, QA and release.
6. **Coverage.** `company/courses/<id>/coverage.md` records demo-able sections covered over demo-able sections, by chapter, refreshed after every wave. Target for NCM: ≥ 80% of demo-able sections.

## Courses
| id | work | manager | status |
|---|---|---|---|
| ncm | easley-kleinberg-2010 *Networks, Crowds, and Markets* | cm-course-ncm (Jonah) | mapping |
